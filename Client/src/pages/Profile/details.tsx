import { useEthereum } from "../../context/contractContext";
import MyPosts from "./posts";

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

const Details:React.FC<DetailProps> = ({detail}) => {
  const { account } = useEthereum();
  
  return (
    <div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-bold">{detail?.name}</h1>
                  <p className="text-gray-700">{`${account?.slice(
                    0,
                    3
                  )}...${detail?.id?.slice(detail?.id.length - 3)}`}</p>
                 
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Details
                  </span>
                  <ul>
                    <li className="mb-2">BloodType : {detail?.bloodType}</li>
                    <li className="mb-2">Date Of Birth : {detail?.dateOfBirth}</li>
                    <li className="mb-2">Gender : {detail?.gender}</li>
                    <li className="mb-2">Emergency Contact : {Number(detail?.emergencyContact)}</li>
                    <li className="mb-2">
                      Medical Report :{" "}
                      <a
                        href={detail?.medicalReport}
                        target="_blank"
                      >
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
            <MyPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
