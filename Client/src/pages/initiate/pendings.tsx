import { useEthereum } from "../../context/contractContext"

const Pendings = () => {
    const { account } = useEthereum();
  return (
    <div>
      <div className="w-full h-full py-10 flex flex-col gap-4 items-center justify-center bg-gray-900 dark:bg-white">
        <div className="md:text-4xl sm:text-3xl text-2xl text-center font-serif font-extrabold border-b-2 dark:border-blue-500 rounded-b-md mb-6 border-yellow-500 text-white dark:text-black">
          Your Pending Requests
        </div>

        <div className="sm:w-[70%] w-[94%] mx-auto dark:bg-gray-300 bg-gray-700 p-4 rounded-md flex sm:gap-4 gap-2 items-center justify-center">
          <div className="w-[80%] flex flex-col gap-1">
            <div className="text-lg font-semibold font-serif text-white dark:text-black">
              Samuel Abera ( <i>{`${account?.slice(0,3)}...${account?.slice(account.length-3)}`}</i> )
            </div>
            <p className="text-sm mt-3 dark:text-gray-600 text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              reiciendis earum quasi
            </p>
            <button className="text-[12px] hover:underline text-semibold dark:text-gray-700 text-gray-400 text-right">
              {`View Request -->`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pendings
