import { useEffect, useState } from "react"
import { useEthereum } from "../context/contractContext";

interface detailsState{
    name: string | null,
    owner : string | null,
}

const Nav = () => {
    const [shownav, setShowNav] = useState<boolean>(false);
    const [details, setDetails] = useState<detailsState>({
        name: null,
        owner:null,
    })

    const { contract } = useEthereum();

    const handleNav = () => {
        if (!shownav) setShowNav(true);
        else setShowNav(false);
    }

    const getDetails = async () => {
        try {
            
            const name:string = await contract?.name();
            const owner:string = await contract?.owner();
            setDetails({ name, owner });
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDetails();
    },[contract])

    return (
      <div className=" shadow-md">
        <header className="pb-6 bg-white lg:pb-0">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0">
                <a href="#" title="" className="flex">
                     <h1 className="text-3xl font-bold text-red-700">{details.name}</h1>
                </a>
              </div>

              <button
                onClick={handleNav}
                type="button"
                className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
              >
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8h16M4 16h16"
                  />
                </svg>

                <svg
                  className="hidden w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
             
                <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                  <a
                    href="#"
                    title=""
                    className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Features{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Solutions{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Resources{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Pricing{" "}
                  </a>
                </div>
              
              <a
                href="#"
                title=""
                className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700"
                role="button"
              >
                {" "}
                Get started now{" "}
              </a>
            </nav>

                             {shownav && (
            <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
                        <div className="flow-root">
                <div className="flex flex-col px-6 -my-2 space-y-1">
                  <a
                    href="#"
                    title=""
                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Features{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Solutions{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Resources{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Pricing{" "}
                  </a>
                </div>
              </div>
              <div className="px-6 mt-6">
                <a
                  href="#"
                  title=""
                  className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700"
                  role="button"
                  >
                  {" "}
                  Get started now{" "}
                </a>
              </div>
            </nav>
                ) }
          </div>
        </header>
      </div>
    ); 
        
}

export default Nav
