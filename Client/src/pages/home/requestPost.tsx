import { useState } from "react";

const RequestPost = () => {
    const [showCreate, setShowCreate] = useState<boolean>(false);
    
    return (
      <>
        {showCreate ? (
          <div className=" bg-slate-100 delay-200 md:bg-white w-full">
            <div className="md:mx-auto relative shadow-xl md:bg-slate-100 ml-16  w-1/2 ">
              <h1 className="text-center text-xl md:text-3xl pb-3 font-bold text-red-600">
                {" "}
                Create Request{" "}
              </h1>
              <p
                onClick={() => setShowCreate(false)}
                className="absolute md:right-3 top-1 right-[-135px] font-bold bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-full px-2 text-xl"
              >
                X
              </p>
              <div className="textsec md:ml-16">
                <textarea
                  className=" border-2 w-[300px] md:w-[500px] md:h-40 pl-2 text-lg"
                  name=""
                  id=""
                  placeholder="Plz enter request details"
                ></textarea>
              </div>

              <div className="flex  pb-5 mt-3 gap-20 flex-row md:flex-row">
                <div className="image md:ml-16">
                  <button className="font-bold md:text-xl px-1 md:w-auto w-28 hover:bg-green-900 text-white bg-green-700">
                    Select Image{" "}
                  </button>
                </div>

                <div className="post  md:ml-16">
                  <button className="font-bold md:w-auto w-28 md:text-xl px-1 hover:bg-red-900 text-white bg-red-700">
                    Post Request (100 BKS)
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <button
              onClick={() => {
                setShowCreate(true);
              }}
              className="text-2xl  text-white bg-red-800 font-bold p-1 rounded-md ml-[116px] md:ml-[555px] mt-3 "
            >
              CreateRequest +{" "}
            </button>
          </div>
        )}
      </>
    );
}

export default RequestPost
