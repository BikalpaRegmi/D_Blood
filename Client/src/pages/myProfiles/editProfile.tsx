import { useEffect, useState } from "react";
import Nav from "../../components/nav"
import { useEthereum } from "../../context/contractContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface EditType {
    name: string,
      bloodType: string,
      dateOfBirth: string,
      medicalReport: string,
      emergencyContact: number,
      myAddress:string,
      gender:string,
}

const EditProfile = () => {
    const [previewImg, setPreviewImg] = useState<string>();
    const [file, setFile] = useState<File>();
    const [previousDetail, setPreviousDetail] = useState<EditType>({
      name: "",
      bloodType: "",
      dateOfBirth: "",
      medicalReport: "",
      emergencyContact: 0,
      myAddress:'',
      gender:'',
    });

     const [edit, setEdit] = useState<EditType>(previousDetail);
    
    const { contract, account } = useEthereum();
    const navigate = useNavigate();

    const getPreviousDetail = async() => {
        const getDeta = await contract?.profile(account);
        if (getDeta) {  
            const set =  {
                name: getDeta.name,
                bloodType: getDeta.bloodType,
                dateOfBirth: getDeta.dateOfBirth,
          medicalReport: getDeta.medicalReport,
          emergencyContact: Number(getDeta.emergencyContact),
          myAddress: getDeta.myAddress,
          gender:getDeta.gender,
            }
            setPreviousDetail(set);
          setEdit(set);
          
    }
    }
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (file !=null) {
                const selectedFile: FormData = new FormData();
                selectedFile.append('file', file);
                const res: any = await axios.post(
                    "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    selectedFile,
                    {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      pinata_api_key: import.meta.env.VITE_Pinata_api_key,
                      pinata_secret_api_key: import.meta.env.VITE_Pinata_secret_api_key,
                    },
                }
            );
         const imgUrl:string = 'https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash;
                setEdit((prev) => ({
                    ...prev, medicalReport:imgUrl,
            }))
        }         
            
const transact = await contract?.EditMyProfile(
  edit.name,
  edit.bloodType,
  edit.dateOfBirth,
  edit.gender,
  edit.medicalReport,
  edit.emergencyContact,
  edit.myAddress
          );
          await transact.wait();
            navigate('/myProfile');

        } catch (error) {
            console.log(error)
        }
    }
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEdit((prev) => ({
         ...prev,
         [e.target.name] : e.target.value
     }))
    }
    useEffect(() => {
        getPreviousDetail();
    }, [account]);

    return (
      <div>
        <Nav />
        <div className="bg-white  border-4 rounded-lg shadow relative m-10">
          <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold">Edit Profile</h3>
            <button
              type="button"
              onClick={() => navigate('/myProfile')}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="product-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">
                    {" "}
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="product-name"
                    onChange={handleChange}
                    placeholder={previousDetail.name}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">
                    Blood Type
                  </label>
                  <select
                    name="bloodType"
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  >
                    <option value="">Select Bood Type</option>
                    <option value="O +ve">O +ve</option>
                    <option value="O -ve">O -ve</option>
                    <option value="A -ve">A -ve</option>
                    <option value="A +ve">A +ve</option>
                    <option value="B -ve">B -ve</option>
                    <option value="B +ve">B +ve</option>
                    <option value="AB -ve">AB -ve</option>
                    <option value="AB +ve">AB +ve</option>{" "}
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    onChange={handleChange}
                    name="dateOfBirth"
                    id="brand"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder={previousDetail.dateOfBirth}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="number"
                    name="emergencyContact"
                    onChange={handleChange}
                    id="price"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">
                    {" "}
                    Address
                  </label>
                  <input
                    type="text"
                    name="myAddress"
                    onChange={handleChange}
                    id="product-name"
                    placeholder={previousDetail.myAddress}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">
                    {" "}
                    Medical Report
                  </label>
                  <input
                    type="file"
                    name="medicalReport"
                    id="product-name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const selectedFile = e.target.files && e.target.files[0];
                      if (selectedFile) {
                        setFile(selectedFile);
                        setPreviewImg(URL.createObjectURL(selectedFile));
                      }
                    }}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  />
                  {file ? (
                    <img src={previewImg} alt="" className="mx-auto" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 rounded-b">
                <button
                  className="text-white bg-red-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  type="submit"
                >
                  Save all
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default EditProfile
