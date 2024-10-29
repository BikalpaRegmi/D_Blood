import { useEffect, useState } from "react";
import Nav from "../../components/nav"
import { useEthereum } from "../../context/contractContext";
import { useParams } from "react-router-dom";

interface comment {
  commentator: string;
  text : string,
}

interface postContextType {
  requestor: string | null;
  requestId: string | null;
  details: string | null;
  image: string | null;
  comments: comment[];
}

const Post = () => {
    const { account , contract } = useEthereum();
  const [showCommentMenu, setShowCommentMenu] = useState<boolean>(false);
  const { id } = useParams();
  const [reqDetail, setReqDetail] = useState<postContextType>();
  const [requestorDetail, setRequestorDetail] = useState<any>();
  
  const getIndividualRequest = async () => {
    const res:any = await contract?.allRequests(id);
    setReqDetail(res);
  }

  const myDetails = async () => {
    
      const data = await contract?.profile(reqDetail?.requestor);
      setRequestorDetail(data);
    
  }

  useEffect(() => {
    getIndividualRequest();
  }, [id, contract]);

  useEffect(() => {
    myDetails();
  }, [reqDetail]);

  return (
    <div>
      <Nav />
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        {requestorDetail && reqDetail && (
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12">
              <div className="relative lg:mb-12">
                <div className="md:pl-12 px-2 md:pr-6">
                  <img
                    className="relative"
                    src={reqDetail.image ? reqDetail.image : ''}
                  />
                </div>
              </div>

              <div className="top 2xl:pl-16">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
                  {requestorDetail.name}
                </h2>
                <p className="text-md mb-5 leading-relaxed text-gray-900 mt-1">
                  {requestorDetail.myAddress}
                </p>
                <p className="text-lg leading-relaxed text-gray-900 mt-1">
                  <b>Account : </b> {requestorDetail.id}
                </p>
                <p className="mt-6 text-lg leading-relaxed text-gray-900">
                  <b>Posted on : </b>{" "}
                  {id && new Date(parseInt(id)).toLocaleString()}
                </p>

                <p className="mt-6 text-md leading-relaxed text-gray-900">
                  <b>Description : </b> {reqDetail.details}
                </p>

                {
                  reqDetail.comments && reqDetail.comments.length > 0 ? reqDetail.comments.map((curval:comment) => {
                    return (<>
                 
                <h1 className="text-xl mt-5 font-bold"> Comments : </h1>
                <div className="comments overflow-y-scroll h-[333px] mx-auto mt-3 border-y-2 border-red-600">
                  <div className="cmnt mb-5 border-b-2">
                    <span className="flex  justify-between">
                      <p className="text-xl font-sans">
                        {" "}
                        {curval.commentator}
                      </p>
                      <p
                        className="text-xl font-bold cursor-pointer"
                        onClick={() => {
                          showCommentMenu
                            ? setShowCommentMenu(false)
                            : setShowCommentMenu(true);
                          }}
                          >
                        ...
                      </p>
                    </span>
                    <div className="flex flex-col w-40 absolute md:right-9 right-4">
                      {showCommentMenu ? (
                        <>
                          <button className="border-b-2 text-white bg-green-900">
                            Delete Comment
                          </button>
                          <button className="border-b-2 text-white bg-purple-900">
                            Initiate
                          </button>
                          <button className="border-b-2 text-white bg-red-900">
                            View Profile
                          </button>{" "}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <p className="mt-3">
                     {curval.text}
                    </p>
                  </div>
                </div>
                  </>)
           })
            : <div><p className="text-xl text-red-700 text-center">No comments till now be the first one to comment</p></div>    }
                <div className="flex justify-between">
                  <input
                    type="text"
                    className="w-[400px] border-2 pl-2"
                    placeholder="Enter Comment"
                  />
                  <button className="text-lg bg-red-600 px-5 text-white">
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Post
