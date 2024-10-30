import { useEffect, useState } from "react";
import { useEthereum } from "../../context/contractContext";

const MyActivities = () => {
  const [activities, setActivities] = useState<string[]>();
  const { contract, account } = useEthereum();

  const getActivities = async () => {
    const res = await contract?.getAllActivities();
    setActivities([...res].reverse());
  }

  useEffect(() => {
    getActivities();
  }, [contract , account]);
    return (
      <div className="col-span-4 sm:col-span-9">
        <div className="contrainer  w-full">
        {activities?.map((activity) => {
          return (
              <div className="posts">
                <div className="posts mx-auto  relative h-40 md:h-64 mb-24 mt-9 border-b-4 bg-slate-50 md:w-4/6">
                  <img
                    src="https://images.pexels.com/photos/7723759/pexels-photo-7723759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 "
                    alt=""
                    className="object-cover h-full  w-full"
                  />
                  <p className=" text-white font-bold absolute w-56 sm:w-80 px-2 right-1 top-1 text-left sm:text-3xl text-xl ">
                    {activity}
                  </p>
                  <b className="text-red-600 absolute right-3 text-xl bottom-1">
                    D Blood
                  </b>
                </div>
              </div>
          );
        })}
        </div>
      </div>
    );
}

export default MyActivities
