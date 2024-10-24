import { useEthereum } from "../../context/contractContext"


const ConnectMetamask = () => {
    const { account } = useEthereum();
    
    const handleClick = () => {
      if (account == null) {
        window.ethereum.request({
          method: "eth_requestAccounts",
        });
        window.location.reload();
      }
    }
  
    
  return (
    <div>
          <section className="text-gray-600 body-font">
              <h1 className="text-center text-5xl text-orange-950 mt-5">Plz connect MetaMask to continue</h1>
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center mx-auto">
            <img
              src="https://miro.medium.com/v2/resize:fit:500/1*PebRDNiK_F4bKB4ToH3FgA.png"
              alt=""
            />
            <button onClick={handleClick} className="flex-shrink-0 text-white bg-orange-700 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-3xl mt-10 sm:mt-0">
              Connect Metamask
            </button>
          </div>
        </div>
          </section>
    </div>
  );
}

export default ConnectMetamask
