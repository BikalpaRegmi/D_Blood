import { createContext, useContext, useEffect, useState } from "react";
import { useEthereum } from "./contractContext";

interface comment {
  commentator: string;
  text : string,
}

interface postContextType {
  requestor: string | null;
  requestId: string | null;
  details: string | null;
  image: string | null;
  bloodType: string | null;
  comments: comment[];
}

const PostContext = createContext<{ posts: postContextType[]; myPosts:postContextType[] } | undefined>(undefined);

export const PostContextProvider = ({ children }: any) => {
  const [posts, setPosts] = useState<postContextType[]>([]);
  const [myPosts, setmyPosts] = useState<postContextType[]>([]);
  const { contract, account } = useEthereum();

  const getAllPost = async() => {
    const res = await contract?.getAllRequests();
    if (res) {
      const postWithProfile = await Promise.all(res.map(async (curval: any) => {
        //promise .all lekhnu ko karan sabai array ma insert garnu parera
        
        const profile = await contract?.profile(curval.requestor);
        return {
          requestId: curval.requestId || "No ID",
          image:curval.image || 'No img ' ,
          details: curval.details || "No details",
          comments:curval.comments || 'no comments',
          requestor: curval.requestor || "No requestor",
          bloodType : curval.bloodType || 'No blood Type',
          name: profile?.name || "Unknown",
          addr: profile?.myAddress || "Unknown",
        };
      }));
      setPosts(postWithProfile);
    }
  }
  
  const getMyPosts = async () => {
    const res = await contract?.getAllRequests();
    const myReq = res?.filter((allPost: any) => allPost.requestor.toLowerCase() === account?.toLowerCase());
   if(myReq) setmyPosts(myReq);
  }
  
  useEffect(() => {
    getAllPost();
    getMyPosts();
  },[contract , account])
    
    return (<>
      <PostContext.Provider value={{posts , myPosts}}>
        {children}
    </PostContext.Provider>
    </>)
}

export const useRequests = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("PLZ wrap with provider");
  return context;
}