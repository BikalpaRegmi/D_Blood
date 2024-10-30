import { useEffect, useState } from "react";
import { useEthereum } from "../../context/contractContext"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface pendingType {
  text: string | null;
  requestId: string | null;
  commentatorId: string | null;
  commentatorName: string | null;
  requestor: string | null;
}

const Pendings = () => {
  const { contract , account } = useEthereum();
  const [pendingsReq, setAllPendings] = useState<pendingType[]>([]);
  const navigate = useNavigate();

  const pendings = async () => {
    try {
      const res = await contract?.getAllPendingRequests();
      const newRes = await Promise.all(res.map(async (curval: pendingType) => {
        const profile = await contract?.profile(curval.commentatorId);
        const requestor = await contract?.allRequests(curval.requestId);
        
        return {
          text: curval.text,
          requestId: curval.requestId,
          commentatorId: curval.commentatorId,
          commentatorName: profile?.name || "Unknown",
          requestor: requestor?.requestor || "none",
          
        };
      }));
      setAllPendings(newRes);

      console.log(newRes)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRelease = async (donor:string |null, requestId:null|string) => {
    try {
      await contract?.releaseBks(donor, requestId);;
      toast.success("Releasing Bks plz wait...");
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    pendings();
  }, [contract]);

  return (
    <div>
      <div className="w-full h-full py-10 flex flex-col gap-4 items-center justify-center bg-gray-900 dark:bg-white">
        <div className="md:text-4xl sm:text-3xl text-2xl text-center font-serif font-extrabold border-b-2 dark:border-blue-500 rounded-b-md mb-6 border-yellow-500 text-white dark:text-black">
          Your Pending Requests
        </div>

        <div className="sm:w-[70%] w-[94%] mx-auto dark:bg-gray-300 bg-gray-700 p-4 rounded-md flex sm:gap-4 gap-2 items-center justify-center">
          {
            pendingsReq.length>0 ? pendingsReq.map((curval, index) => {
              return (
                
                <div className="w-[80%] flex flex-col gap-1" key={index}>

              <div className="text-lg font-semibold font-serif text-white dark:text-black">
                   ( <i>{`${curval.requestor?.slice(0,3)}...${curval.requestor?.slice(curval.requestor.length-3)}`}</i> )
            </div>
            <p className="text-md mt-3 dark:text-gray-600 text-gray-300">
              {curval.requestor?.toLowerCase()==account?.toLowerCase() ?  `${curval.text} release BKS if you receive Blood.` : `${curval.text?.slice(4,curval.text.length)} with ${curval.requestor?.slice(0,3)}...${curval.requestor?.slice(curval.requestor.length-3 , curval.requestor.length)} Plz provide the blood quickly.` }
                  </p>
                  <div className=" justify-around mt-3 flex buttons">
                    {
                      account?.toLowerCase() === curval.requestor?.toLowerCase() ?
                        <button onClick={() => handleRelease(curval.commentatorId, curval.requestId)} className="font-bold hover:font-semibold bg-green-700 py-1 rounded-lg px-3 text-white">Release BKS</button>
                        : ''
       }
            <button onClick={()=>navigate(`/post/${curval.requestId}`)} className="text-[12px] hover:underline text-semibold dark:text-gray-700 text-gray-400 text-right">
              {`View Request -->`}
            </button>
                  </div>
          </div>
          )
        }) : 'You have no pending requests at current moment'
            }
        </div>
      </div><ToastContainer/>
    </div>
  );
}

export default Pendings
