import { useEthereum } from "../../context/contractContext"
import RequestPost from "./requestPost"
import { FaFacebook, FaRegComment, FaWhatsappSquare } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/deletePostModal";
import { useRequests } from "../../context/PostContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FacebookShareButton , WhatsappShareButton , TwitterShareButton} from "react-share";
import { FaSquareXTwitter } from "react-icons/fa6";

const HomePage = () => {
  const [menu, setMenu] = useState<number | null>(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { posts } = useRequests();
  const { account, contract } = useEthereum();
  const [newPost, setNewPost] = useState<any>();
  const [openShare, setOpenShare] = useState<string | null>(null);

  const handleDelete = async(requestId:string) => {
    await contract?.deleteRequest(requestId);
    toast('Deleting Post may take a minute plz wait');
  }

 useEffect(() => {
   setNewPost(posts);
 }, [posts]);
  
  const handleBloodTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
      const bloodType = e.target.value;
  const postAfterFilter =
    bloodType === "all"
      ? posts
      : posts.filter((data: any) => data.bloodType === bloodType);
    setNewPost( postAfterFilter );
  }


  return (
    <div className="relative">
      <RequestPost />
      
      <div className="contrainer px-2 w-full">
        {
       newPost &&  newPost.map((curval:any , index:any)=>{
          return (
            <div
              key={curval.requestId}
              className="posts mx-auto h-[555px] mb-24 mt-9 border-b-4 bg-slate-50 px-5 md:w-1/2"
            >
              <div className="top flex pb-1 justify-between">
                <div className="name_address flex flex-col">
                  <span className="flex gap-3">
                    <b>{curval.name}</b>
                    <small className="mt-[3px]">{curval.addr}</small>
                  </span>
                  <small>{`${curval.requestor?.slice(
                    0,
                    9
                  )}...${curval.requestor?.slice(
                    curval.requestor.length - 9
                  )}`}</small>
                </div>

                <div className="threedots relative">
                  <p
                    className="text-4xl cursor-pointer"
                    onClick={() => {
                      setMenu(menu === index ? null : index);
                    }}
                  >
                    ...
                  </p>
                  {menu === index ? (
                    <div className=" flex flex-col absolute right-1">
                      <button
                        onClick={() => navigate(`/profile/${curval.requestor}`)}
                        className="w-28 bg-orange-900 text-white cursor-pointer hover:text-slate-200 mb-0.5 "
                      >
                        View Profile
                      </button>
                      {curval.requestor.toLowerCase() ===
                      account?.toLowerCase() ? (
                        <button
                          onClick={() => setOpen(true)}
                          className="w-28 bg-gray-900 text-white cursor-pointer hover:text-slate-200 mb-0.5 "
                        >
                          Delete Post
                        </button>
                      ) : (
                        ""
                      )}
                      <button
                        onClick={() => navigate(`/post/${curval.requestId}`)}
                        className="w-28 bg-blue-900 text-white cursor-pointer hover:text-slate-200 mb-0.5 "
                      >
                        Details
                      </button>
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
                              onClick={() => handleDelete(curval.requestId)}
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
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="details mt-1 mb-1 border-b-2 pb-1 border-red-600">
                <p>
                  {curval.details}
                  <Link to={`/post/${curval.requestId}`}>
                    {" "}
                    <u className="text-slate-500 cursor-pointer"> view more </u>
                  </Link>
                </p>
              </div>

              <div className="img">
                <img
                  src={curval.image}
                  alt=""
                  className="w-full cursor-pointer border-b-2 border-red-600 h-[400px]"
                  onClick={() => navigate(`/post/${curval.requestId}`)}
                />
              </div>
              <div
                onClick={() => navigate(`/post/${curval.requestId}`)}
                className="comments text-sm ml-auto w-24 pr-1 text-slate-500 hover:underline cursor-pointer"
              >
                {curval.comments.length} comments
              </div>

              <div className="bottom flex justify-around">
                <button
                  onClick={() => navigate(`/post/${curval.requestId}`)}
                  className="bg-red-700 w-44  md:w-64 text-lg flex justify-around  text-white"
                >
                  Comment <FaRegComment className="text-xl mt-1" />
                </button>
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
              </div>
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
          );
        })
        }
        </div>
        
        <div className="absolute hidden sm:block top-16 right-3">
        <select onChange={handleBloodTypeChange} name="FilterByBlood" id="">
          <option value="all">Filter by blood type</option>
          <option value="all">All</option>
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

      <div className="hidden md:block absolute top-16 left-3">
        <h1 className="text-3xl w-64 flex flex-col">
          {" "}
          Hello, <b>Bikalpa Regmi</b>
        </h1>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default HomePage
