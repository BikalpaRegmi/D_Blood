import { useEthereum } from "../../context/contractContext";
import { CiShare2 } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MyActivities from "./myActivities";
import Modal from "../../components/deletePostModal";
import { useRequests } from "../../context/PostContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook, FaWhatsappSquare } from "react-icons/fa";

interface MyDetail {
  id: string | null;
  name: string | null;
  bloodType: string | null;
  dateOfBirth: null | string;
  gender: null | string;
  medicalReport: string | undefined;
  emergencyContact: null | string;
  myAddress: null | string;
}

const MyPosts = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const { account , contract } = useEthereum();
  const [showPost, setShowPost] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const { myPosts } = useRequests();
    const [openShare, setOpenShare] = useState<string | null>(null);
  const [myDetail, setMyDetail] = useState<MyDetail>({
    id: null,
    name: null,
    bloodType: null,
    dateOfBirth: null,
    gender: null,
    medicalReport: undefined,
    emergencyContact: null,
    myAddress: null,
  });

  const getAccountDetail = async () => {
    const data = await contract?.profile(account);
    setMyDetail(data);
  };
 
  const handleDelete = async (requestId:string) => {
    try {
      await contract?.deleteRequest(requestId);
      toast('Deleting post may require a minute plz wait')
      setOpen(false);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (account && contract) getAccountDetail();
  }, [account, contract]);

  return (
    <div className="col-span-4 sm:col-span-9">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="headings border-b-2 pb-1 flex justify-around">
          <h1
            onClick={() => setShowPost(true)}
            className="cursor-pointer hover:underline"
          >
            My Posts
          </h1>
          <h1
            onClick={() => setShowPost(false)}
            className="cursor-pointer hover:underline"
          >
            My Activities
          </h1>
        </div>
      </div>
      {showPost ? (
        <div className="contrainer  w-full">
          {
            myPosts
              .map((curval: any) => {
                return (
                  <div key={curval.requestId} className="posts">
                    <div className="posts mx-auto h-[581px] md:h-[555px] mb-24 mt-9 border-b-4 bg-slate-50 px-5 md:w-4/6">
                      <div className="top flex pb-1 justify-between">
                        <div className="name_address flex flex-col">
                          <span className="flex gap-3">
                            <b>You</b>
                            <small className="mt-[3px]">
                              {myDetail.myAddress}
                            </small>
                          </span>
                          <small>{`${myDetail.id?.slice(
                            0,
                            9
                          )}...${myDetail.id?.slice(
                            myDetail.id.length - 9
                          )}`}</small>
                        </div>

                        <div className="threedots relative">
                          <p
                            className="text-4xl cursor-pointer"
                            onClick={() => {
                              menu ? setMenu(false) : setMenu(true);
                            }}
                          >
                            ...
                          </p>
                          {menu ? (
                            <div className=" flex flex-col absolute right-1">
                              <button
                                onClick={() => setOpen(true)}
                                className="w-28 bg-gray-900 text-white cursor-pointer hover:text-slate-200 mb-0.5 "
                              >
                                Delete Post
                              </button>
                              <button
                                onClick={() =>
                                  navigate(`/post/${curval.requestId}`)
                                }
                                className="w-28 bg-blue-900 text-white cursor-pointer hover:text-slate-200 mb-0.5 "
                              >
                                Details
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="details mt-1 mb-1 border-b-2 pb-1 border-red-600">
                        <p>
                          {curval.details.slice(0, 45)}...
                          <Link to={`/post/${curval.requestId}`}>
                            {" "}
                            <u className="text-slate-500 cursor-pointer">
                              {" "}
                              view more{" "}
                            </u>
                          </Link>
                        </p>
                      </div>
                      <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="text-center w-56">
                          <div className="mx-auto my-4 w-48">
                            <h3 className="text-lg font-black text-orange-700">
                              Confirm Delete Post
                            </h3>
                            <p className="text-sm text-gray-500">
                              Deleting Request Post will costs you 3 BKS as a
                              penalty !
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <button
                              className="btn btn-danger hover:bg-slate-50 text-red-700 font-bold w-full"
                              onClick={() => {
                                handleDelete(curval.requestId);
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="btn font-semibold hover:bg-slate-50 text-green-600 btn-light w-full"
                              onClick={() => setOpen(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </Modal>
                      <div className="img">
                        <img
                          src={curval.image}
                          alt=""
                          className="w-full border-b-2 cursor-pointer border-red-600 h-[410px]"
                          onClick={() => navigate(`/post/${curval.requestId}`)}
                        />
                      </div>
                      <div
                        onClick={() => navigate(`/post/${curval.requestId}`)}
                        className="comments text-sm ml-auto w-24 pr-1 text-slate-500 hover:underline cursor-pointer"
                      >
                        {curval.comments.length} Comments
                      </div>

                      <div className="bottom flex justify-around">
                        <button
                          onClick={() =>
                            openShare === null
                              ? setOpenShare(curval.requestId)
                              : setOpenShare(null)
                          }
                          className="bg-green-800 flex justify-around w-20  md:w-40 text-lg text-white"
                        >
                          Share <CiShare2 className="text-xl mt-1" />
                        </button>

                        {openShare === curval.requestId ? (
                          <div className="icons flex gap-5 justify-end">
                            <FacebookShareButton
                              url={`http://localhost:5173/post/${curval.requestId}`}
                              hashtag="#help #blood #dblood"
                            >
                              <FaFacebook className="w-9 text-3xl" />
                            </FacebookShareButton>

                            <WhatsappShareButton
                              url={`http://localhost:5173/post/${curval.requestId}`}
                              title="Plz help this person"
                            >
                              <FaWhatsappSquare className="w-9 text-3xl" />
                            </WhatsappShareButton>

                            <TwitterShareButton
                              hashtags={['help' , 'urgent' , 'bloodneeded']}
                              url={`http://localhost:5173/post/${curval.requestId}`}
                            >
                              <FaSquareXTwitter className="w-9 text-3xl" />
                            </TwitterShareButton>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                );
              })} 
        </div>
      ) : (
        <MyActivities />
      )}
      <ToastContainer/>
    </div>
  );
};

export default MyPosts;
