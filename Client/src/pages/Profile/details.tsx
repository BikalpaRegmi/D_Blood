import { useEffect, useState } from "react";
import { useEthereum } from "../../context/contractContext";
import Posts from "./posts";
import { useRequests } from "../../context/PostContext";
import { useParams } from "react-router-dom";
import Modal from "../../components/deletePostModal";

interface DetailType {
  id: string | null;
  name: string | null;
  bloodType: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  medicalReport:undefined | string ;
  emergencyContact: string | null;
  myAddress: string | null;
}

interface DetailProps {
  detail: DetailType | undefined;
}

interface comment {
  commentator: string;
  text: string;
}

interface postContextType {
  requestor: string | null;
  requestId: string | null;
  details: string | null;
  image: string | null;
  comments: comment[];
}

const Details:React.FC<DetailProps> = ({detail}) => {
  const [otherPosts, setOtherPosts] = useState<postContextType[]>([]);
  const { posts } = useRequests();
  const { id } = useParams();
  const { contract } = useEthereum();
  const [open, setOpen] = useState<boolean>(false);
  const [balanceToTransfer, setBalanceToTransfer] = useState<number | null>(null);

  const getPostOfUser = () => {
    const newPosts = posts?.filter((curval: postContextType) => curval.requestor?.toLowerCase() == id?.toLowerCase());
    
    setOtherPosts(newPosts);
  }
  
  const handleTransfer = async() => {
    await contract?.transferBKS(id, balanceToTransfer);
    setOpen(false);
    setBalanceToTransfer(null);
    alert('transfer sucessfull'); 
  }
  useEffect(() => {
    getPostOfUser();
  },[ posts])
  return (
    <div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-bold">{detail?.name}</h1>
                  <p className="text-gray-700">
                    {`${detail?.id?.slice(0, 3)}...${detail?.id?.slice(
                      detail?.id.length - 3
                    )}`}{" "}
                  </p>
                  <button onClick={()=>setOpen(true)} className="inline-flex mt-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                    Transfer BKS
                  </button>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Details
                  </span>
                  <ul>
                    <li className="mb-2">BloodType : {detail?.bloodType}</li>
                    <li className="mb-2">
                      Date Of Birth : {detail?.dateOfBirth}
                    </li>
                    <li className="mb-2">Gender : {detail?.gender}</li>
                    <li className="mb-2">
                      Emergency Contact : {Number(detail?.emergencyContact)}
                    </li>
                    <li className="mb-2">
                      Medical Report :{" "}
                      <a href={detail?.medicalReport} target="_blank">
                        <img
                          src={detail?.medicalReport}
                          alt=""
                          className="mt-2"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Posts otherPosts={otherPosts} details={detail} />
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-orange-700">
              Enter amount on BKS 
            </h3>
            <p className="text-sm text-gray-500">
              You will transfer BKS directly on their account.
            </p>
          </div>
          <div className="flex gap-1">
           <input type="number" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setBalanceToTransfer(Number(e.target.value))} className="border-2 border-black pl-1 w-40"/>
            <button
              className="btn font-semibold hover:bg-slate-50 text-green-600 btn-light w-full"
              onClick={handleTransfer}
            >
              Transfer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Details;
