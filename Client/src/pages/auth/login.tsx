import axios from "axios";
import React, { useState } from "react";
import { useEthereum } from "../../context/contractContext";
import { useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

interface loginDetailProps {
  id: string | null;
  name: string | null;
  bloodType: string | null;
  dateOfBirth: null | string;
  gender: null | string;
  medicalReport: null | string;
  emergencyContact: null | string;
  myAddress: null | string;
}

const Login = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loginDetails, setLoginDetails] = useState<loginDetailProps>({
    id: null,
    name: null,
    bloodType: null,
    dateOfBirth: null,
    gender: null,
    medicalReport: null,
    emergencyContact: null,
    myAddress: null,
  });
  const { contract } = useEthereum();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast("Creating Profile", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const fileData: FormData = new FormData();
    if (file != null) {
      fileData.append("file", file);
    }
    const res: any = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      fileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: import.meta.env.VITE_Pinata_api_key,
          pinata_secret_api_key: import.meta.env.VITE_Pinata_secret_api_key,
        },
      }
    );
    const imageUrl: string =
      "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;
    console.log(imageUrl);

    const updatedLoginDetails = {
      ...loginDetails,
      medicalReport: imageUrl,
    };

   const transaction =  await contract?.LoginUser(
      updatedLoginDetails.name,
      updatedLoginDetails.bloodType,
      updatedLoginDetails.dateOfBirth,
      updatedLoginDetails.gender,
      updatedLoginDetails.medicalReport,
      updatedLoginDetails.emergencyContact,
      updatedLoginDetails.myAddress
   );
  
    await transaction.wait();
    
     navigate('/');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLoginDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
            <div className="absolute inset-0">
              <video
                className="object-cover w-full h-full"
                src="https://media.istockphoto.com/id/2163030084/video/self-drawing-animation-of-continuous-one-line-human-hand-holding-water-drop.mp4?s=mp4-640x640-is&k=20&c=eRgBetcFJXF04XupUNVDPEsfs10tSV1nfQQwlgxMJLE="
                muted
                autoPlay
                loop
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            <div className="relative">
              <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                <h3 className="text-4xl font-bold text-red-900">
                  Join D Blood
                  <br className="hidden xl:block" />
                  Save Each Other
                </h3>
                <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <li className="flex items-center space-x-3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-white">
                      {" "}
                      Utility Token
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-white">
                      {" "}
                      Withdraw anytime
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-white">
                      {" "}
                      Post Unlimited
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-white">
                      {" "}
                      Emergency Contact
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
              <h2 className="text-3xl font-bold leading-tight text-red-800 sm:text-3xl">
                Create Profile to D Blood
              </h2>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Fast & Last name{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>

                      <input
                        type="text"
                        name="name"
                        required
                        onChange={handleChange}
                        id=""
                        placeholder="Enter your full name"
                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Date of Birth
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <input
                        type="date"
                        required
                        name="dateOfBirth"
                        onChange={handleChange}
                        id=""
                        placeholder="Enter email to get started"
                        className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Blood Type :
                    </label>
                    <div className=" relative text-black border-2 focus-within:text-gray-600">
                      <select
                        name="bloodType"
                        required
                        id=""
                        onChange={handleChange}
                      >
                        <option value="">Select blood type</option>
                        <option value="O +ve">O +ve</option>
                        <option value="O -ve">O -ve</option>
                        <option value="A -ve">A -ve</option>
                        <option value="A +ve">A +ve</option>
                        <option value="B -ve">B -ve</option>
                        <option value="B +ve">B +ve</option>
                        <option value="AB -ve">AB -ve</option>
                        <option value="AB +ve">AB +ve</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Address
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <input
                        type="text"
                        name="myAddress"
                        onChange={handleChange}
                        required
                        id=""
                        placeholder="Enter your Address"
                        className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Recent Medical Report
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFile(e.target.files && e.target.files[0])
                        }
                        required
                        placeholder="Enter your Number"
                        className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Emergency Contact
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <input
                        type="number"
                        onChange={handleChange}
                        required
                        name="emergencyContact"
                        id=""
                        placeholder="Enter your Number"
                        className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Gender
                    </label>
                    <div className="mt-2.5 flex justify-around relative text-gray-400 focus-within:text-gray-600">
                      <label htmlFor="" className="flex gap-2">
                        <input
                          type="radio"
                          name="gender"
                          id=""
                          value={"female"}
                          checked={loginDetails.gender === "female"}
                          onChange={handleChange}
                          placeholder="Enter your Blood Type"
                          className="block  py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                        />
                        <p>Female</p>
                      </label>
                      <label htmlFor="" className="flex gap-2">
                        <input
                          type="radio"
                          name="gender"
                          id=""
                          checked={loginDetails.gender === "male"}
                          value={"male"}
                          onChange={handleChange}
                          placeholder="Enter your Blood Type"
                          className="block  py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                        />
                        <p>Male</p>
                      </label>
                      <label htmlFor="" className="flex gap-2">
                        <input
                          type="radio"
                          name="gender"
                          id=""
                          value={"others"}
                          checked={loginDetails.gender === "others"}
                          onChange={handleChange}
                          placeholder="Enter your Blood Type"
                          className="block  py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                        />
                        <p>Others</p>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-3">
                  <button
                    type="submit"
                    className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-red-700 border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-red-700 focus:text-black focus:outline-none"
                  >
                    <div className="absolute inset-y-0 left-0 p-4"></div>
                    Create Account
                  </button>
                </div>
              </form>

              <p className="mt-5 text-sm text-gray-600">
                I agree to all{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Privacy_policy"
                  target="_blank"
                  title=""
                  className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                >
                  Privacy Policy
                </a>{" "}
                &{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Terms_of_service"
                  target="_blank"
                  title=""
                  className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                >
                  Terms of Service.
                </a>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
};

export default Login;
