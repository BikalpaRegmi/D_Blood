import { useEthereum } from "../../context/contractContext";
import MyPosts from "./posts";

const Details = () => {
  const { account } = useEthereum();

  return (
    <div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-bold">John Doe</h1>
                  <p className="text-gray-700">{`${account?.slice(
                    0,
                    3
                  )}...${account?.slice(account.length - 3)}`}</p>
                 
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Details
                  </span>
                  <ul>
                    <li className="mb-2">BloodType : </li>
                    <li className="mb-2">Date Of Birth : </li>
                    <li className="mb-2">Gender : </li>
                    <li className="mb-2">Emergency Contact : </li>
                    <li className="mb-2">
                      Medical Report :{" "}
                      <a
                        href="https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        target="_blank"
                      >
                        <img
                          src="https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          alt=""
                          className="mt-2"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <MyPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
