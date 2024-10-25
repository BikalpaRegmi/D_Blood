import Nav from "../../components/nav"
import { useEthereum } from "../../context/contractContext"

const MyProfile = () => {
    const { account } = useEthereum();
  return (
    <div>
      <Nav />
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
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <a
                      href="#"
                      className="bg-red-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Balance
                    </a>
                    <a
                      href="#"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                    >
                      Edit Profile
                    </a>
                  </div>
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
                      <a href="https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" target="_blank">
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
                      
            <div className="col-span-4 sm:col-span-9">
                          <div className="bg-white shadow rounded-lg p-6">
                              <div className="headings">
                                  
               <h1>Activities</h1>
               <h1>posts</h1>
                              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile
