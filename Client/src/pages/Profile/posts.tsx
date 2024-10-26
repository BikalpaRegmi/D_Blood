import { useEthereum } from "../../context/contractContext";
import { CiShare2 } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MyActivities from "./activities";

const Posts = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const { account } = useEthereum();
  const [showPost, setShowPost] = useState<boolean>(true);

  return (
    <div className="col-span-4 sm:col-span-9">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="headings border-b-2 pb-1 flex justify-around">
          <h1
            onClick={() => setShowPost(true)}
            className="cursor-pointer hover:underline"
          >
            Posts
          </h1>
          <h1
            onClick={() => setShowPost(false)}
            className="cursor-pointer hover:underline"
          >
            Activities
          </h1>
        </div>
      </div>
      {showPost ? (
        <div className="contrainer  w-full">
          <div className="posts">
            <div className="posts mx-auto h-[581px] md:h-[555px] mb-24 mt-9 border-b-4 bg-slate-50 px-5 md:w-4/6">
              <div className="top flex pb-1 justify-between">
                <div className="name_address flex flex-col">
                  <span className="flex gap-3">
                    <b>Name</b>
                    <small className="mt-[3px]">Hetauda-4 , Kamaldada</small>
                  </span>
                  <small>{`${account?.slice(0, 9)}...${account?.slice(
                    account.length - 9
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
                      <button className="w-28 bg-orange-900 text-white cursor-pointer hover:text-slate-200 mb-0.5 ">
                        View Profile
                      </button>
                      <button className="w-28 bg-gray-900 text-white cursor-pointer hover:text-slate-200 mb-0.5 ">
                        Delete Post
                      </button>
                      <button
                        onClick={() => navigate(`/post/1`)}
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
                  Hii i am suffering from hiv plz help me...
                  <Link to={`/post/1`}>
                    {" "}
                    <u className="text-slate-500 cursor-pointer"> view more </u>
                  </Link>
                </p>
              </div>

              <div className="img">
                <img
                  src="https://images.pexels.com/photos/6629401/pexels-photo-6629401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                  className="w-full border-b-2 border-red-600 h-[410px]"
                />
              </div>
              <div
                onClick={() => navigate(`/post/1`)}
                className="comments text-sm ml-auto w-24 pr-1 text-slate-500 hover:underline cursor-pointer"
              >
                2 Comments
              </div>

              <div className="bottom flex justify-around">
                <button className="bg-green-800 flex justify-around w-20  md:w-40 text-lg text-white">
                  Share <CiShare2 className="text-xl mt-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MyActivities />
      )}
    </div>
  );
};

export default Posts;
