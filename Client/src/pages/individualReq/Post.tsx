import { useState } from "react";
import Nav from "../../components/nav"
import { useEthereum } from "../../context/contractContext";

const Post = () => {
    const { account } = useEthereum();
    const [showCommentMenu, setShowCommentMenu] = useState<boolean>(false);
  return (
    <div>
      <Nav />
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12">
            <div className="relative lg:mb-12">
              <div className="md:pl-12 px-2 md:pr-6">
                <img
                  className="relative"
                  src="https://images.pexels.com/photos/6629401/pexels-photo-6629401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
              </div>
            </div>

            <div className="top 2xl:pl-16">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
                    Bikalpa Regmi
                          </h2>
              <p className="text-md mb-5 leading-relaxed text-gray-900 mt-1">
               Hetauda-4 , Hupra , Nepal
              </p>
              <p className="text-lg leading-relaxed text-gray-900 mt-1">
             <b>Account : </b>  {account}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-gray-900">
               <b>Posted on : </b> 2024-4-4 2pm
                          </p>
                          
              <p className="mt-6 text-md leading-relaxed text-gray-900">
               <b>Description : </b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dignissimos nam doloribus molestiae voluptates. Veniam adipisci officia totam facere necessitatibus, atque porro praesentium magni tempore mollitia impedit numquam, suscipit molestiae nostrum harum ab eos soluta sint officiis nisi.
              </p>
                              <h1 className="text-xl mt-5 font-bold"> Comments : </h1>
                          <div className="comments overflow-y-scroll h-[333px] mx-auto mt-3 border-y-2 border-red-600">

                              <div className="cmnt mb-5 border-b-2">                          
                              <span className="flex  justify-between">                                
                                  <p className="text-xl font-sans"> Bikalpa Regmi</p>
                                  <p className="text-xl font-bold cursor-pointer" onClick={()=>{showCommentMenu ? setShowCommentMenu(false) : setShowCommentMenu(true)}}>...</p>
                                  </span>
                                  <div className="flex flex-col w-40 absolute md:right-9 right-4">
                                      {
                                          showCommentMenu ? <>
                                          <button className="border-b-2 text-white bg-green-900">Delete Comment</button>
                                  <button className="border-b-2 text-white bg-purple-900">Initiate</button>
                                  <button className="border-b-2 text-white bg-red-900">View Profile</button> </>
                                              : ''
                                }
                                  </div>
                              <p className="mt-3">Hii i am intrested Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, mollitia. Quis hic id dolorem assumenda numquam placeat non magni? Hic sapiente itaque repudiandae porro quo reiciendis, eius totam eos aperiam iure ea nam fugit consectetur cumque labore commodi possimus perferendis, unde voluptatibus, enim nisi! Facere dolores distinctio incidunt fugit! Molestiae.</p>
                              </div>

                          </div>
                          <div className="flex justify-between">
                              
                          <input type="text" className="w-[400px] border-2 pl-2" placeholder="Enter Comment"/>
                          <button className="text-lg bg-red-600 px-5 text-white">Add Comment</button>
                          </div>
            </div>
          </div>
              </div>
      </section>
    </div>
  );
}

export default Post
