import { useEffect, useState } from "react";
import { useEthereum } from "../../context/contractContext"
import MyPosts from "./myPost";

interface MyDetail {
  id: string | null;
  name: string | null;
  bloodType: string | null;
  dateOfBirth: null | string;
  gender: null | string;
  medicalReport:   string |undefined; 
  emergencyContact: null | string;
  myAddress: null | string;

}

const MyDetails = () => {
  const { contract, account } = useEthereum();
  const [myDetail, setMyDetail] = useState<MyDetail>({
    id: null,
    name: null,
    bloodType: null,
    dateOfBirth: null,
    gender: null,
    medicalReport: undefined,
    emergencyContact: null,
    myAddress:null,
  })
  
  const getAccountDetail = async () => {
    const data = await contract?.profile(account);
    setMyDetail(data);
  }
  
  useEffect(() => {
    if(account && contract)
      getAccountDetail();
  }, [account, contract]);

  return (
    <div>
      
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-bold">{myDetail.name }</h1>
                  <p className="text-gray-700">{`${myDetail.id?.slice(
                    0,
                    3
                  )}...${myDetail.id?.slice(myDetail.id.length - 3)}`}</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <a
                      href="#"
                      className="bg-red-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Balance
                    </a>
                    <a
                      href="#"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                    >
                      Edit Profile
                    </a>
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Details
                  </span>
                  <ul>
                    <li className="mb-2">BloodType : {myDetail.bloodType }</li>
                    <li className="mb-2">Date Of Birth : {myDetail.dateOfBirth }</li>
                    <li className="mb-2">Gender : {myDetail.gender}</li>
                    <li className="mb-2">Emergency Contact : { Number(myDetail.emergencyContact) } </li>
                    <li className="mb-2 bg-slate-100">
                      Medical Report :{" "}
                      <a
                        href={myDetail.medicalReport}
                        target="_blank"
                      >
                        <img
                          src={myDetail.medicalReport}
                          alt=""
                          className="mt-2 mx-auto"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          <MyPosts/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDetails;
