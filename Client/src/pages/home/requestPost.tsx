import React, { useRef, useState } from "react";
import { useEthereum } from "../../context/contractContext";
import axios from "axios";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

interface reqType {
  requestId: null | string;
  details: null | string;
  image: null | string;
}

const RequestPost = () => {
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const { contract, account } = useEthereum();
  const [req, setReq] = useState<reqType>({
    requestId: Date.now().toString(),
    details: null,
    image: null,
  }); 

  const [file, setFile] = useState<File | null>();
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const FileRef = useRef<null | HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setReq((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast("Creating Request plz wait...");
    try {
      const formData: FormData = new FormData();
      if (file != null) formData.append("file", file);

      const res: any = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: import.meta.env.VITE_Pinata_api_key,
            pinata_secret_api_key: import.meta.env.VITE_Pinata_secret_api_key,
          },
        }
      );
      const imgUrl = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;

      if (account) {
        const updatedData = {
          ...req,
          image: imgUrl,
       
        }
        const transaction = await contract?.CreateRequest(updatedData.requestId, updatedData.details, updatedData.image);
        console.log(transaction);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <>
      {showCreate ? (
        <div className="bg-slate-100 w-full px-4 py-6 md:px-0">
          <div className="max-w-lg mx-auto shadow-lg p-6 bg-white rounded-lg relative">
            <h1 className="text-center text-2xl font-bold text-red-600 mb-4">
              Create Request
            </h1>
            <button
              onClick={() => setShowCreate(false)}
              className="absolute top-3 right-3 font-bold text-lg text-gray-600 hover:text-gray-800"
            >
              X
            </button>
            <div className="mb-4">
              <textarea required
                className="w-full border border-gray-300 rounded-md p-2 text-lg resize-none focus:outline-none focus:ring focus:border-red-300"
                name="details"
                placeholder="Please enter request details"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <button
                onClick={() => FileRef.current?.click()}
                className="font-bold text-lg px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
              >
                Select Image
              </button>
              <input
                type="file"
                ref={FileRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const selectedFile = e.target.files && e.target.files[0];
                  setFile(selectedFile);
                  if (selectedFile)
                    setPreviewUrl(URL.createObjectURL(selectedFile));
                }}
                className="hidden"
              />

              <button
                onClick={handleSubmit}
                className="font-bold text-lg px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
              >
                Post Request (100 BKS)
              </button>
            </div>

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full  object-cover border border-gray-200 rounded-md mt-4"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full text-center mt-6">
          <button
            onClick={() => setShowCreate(true)}
            className="text-2xl font-bold text-white bg-red-800 py-2 px-6 rounded-md hover:bg-red-900 transition-colors"
          >
            Create Request +
          </button>
        </div>
      )}
      <ToastContainer/>
    </>
  );
};

export default RequestPost;
