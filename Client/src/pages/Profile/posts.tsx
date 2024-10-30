import { useEthereum } from "../../context/contractContext";
import { CiShare2 } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MyActivities from "./activities";

interface postContextType {
  requestor: string | null;
  requestId: string | null;
  details: string | null;
  image: string | null;
  comments: comment[];

}
interface propsType {
  otherPosts: postContextType[];
  details: detailType | undefined;
}

interface detailType {
  id: string | null;
  name: string | null;
  bloodType: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  medicalReport: undefined | string;
  emergencyContact: string | null;
  myAddress: string | null;
}
interface comment {
  commentator: string;
  text: string;
}

const Posts: React.FC<propsType> = ({ otherPosts,details }) => {
  const [menu, setMenu] = useState<boolean>(false);
  const navigate = useNavigate();
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
          {
            otherPosts.map((curval: postContextType) => {
              return (
                <div className="posts" key={curval.requestId}>
                  <div className="posts mx-auto h-[581px] md:h-[555px] mb-24 mt-9 border-b-4 bg-slate-50 px-5 md:w-4/6">
                    <div className="top flex pb-1 justify-between">
                      <div className="name_address flex flex-col">
                        <span className="flex gap-3">
                          <b>{ details?.name}</b>
                          <small className="mt-[3px]">
                            {details?.myAddress}
                          </small>
                        </span>
                        <small>{`${curval.requestor?.slice(0, 9)}...${curval.requestor?.slice(
                          curval.requestor?.length - 9
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
                              onClick={() => navigate(`/post/${curval.requestId}`)}
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
                        {curval.details}
                        <Link to={`/post/${curval.requestId}`}>
                          {" "}
                          <u className="text-slate-500 cursor-pointer">
                            {" "}
                            view more{" "}
                          </u>
                        </Link>
                      </p>
                    </div>

                    <div className="img">
                      <img
                        src={curval.image ? curval.image : ''}
                        className="w-full border-b-2 border-red-600 h-[410px]"
                      />
                    </div>
                    <div
                      onClick={() => navigate(`/post/${curval.requestId}`)}
                      className="comments text-sm ml-auto w-24 pr-1 text-slate-500 hover:underline cursor-pointer"
                    >
                      {curval.comments?.length} comments
                    </div>

                    <div className="bottom flex justify-around">
                      <button className="bg-green-800 flex justify-around w-20  md:w-40 text-lg text-white">
                        Share <CiShare2 className="text-xl mt-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <MyActivities />
      )}
    </div>
  );
};

export default Posts;
