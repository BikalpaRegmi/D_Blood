import { useEffect, useState } from "react";
import Nav from "../../components/nav";
import { useEthereum } from "../../context/contractContext";



const Notification = () => {
  const [notifications, setNotification] = useState<string[]>([]);
  const { contract, account } = useEthereum();

  const getNotifications = async () => {
    try {
      const res:string[] = await contract?.getAllNotification();
      console.log(res)
      setNotification([...res].reverse())
     
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [contract, account]);

  return (
    <div>
      <Nav />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          {notifications.length>0 ?  notifications.map((curval, key) => (
            <div
              className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto"
              key={key}
            >
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
                {key + 1}
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  
                  <p className="leading-relaxed">{curval}</p>
                </div>
              </div>
            </div>
          )) : 'No Notifications till now '}
        </div>
      </section>
    </div>
  );
};

export default Notification;
