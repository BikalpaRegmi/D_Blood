import { useState } from "react";
import Modal from "../../components/deletePostModal";
import { useEthereum } from "../../context/contractContext";

interface totalBksProps {
  totalBks: number,
  buyBks:(total:number)=>Promise<void>
}

const MyTokenDetails:React.FC<totalBksProps> = ({totalBks , buyBks}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { contract } = useEthereum();

  const withdrawBks = async() => {
    try {
      await contract?.withdraw();
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container  mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 h-64 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src="BKS.png"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Hello Bikalpa, You have <b>{Number(totalBks)} BKS</b>
            </h1>
            <small className="mb-8 leading-relaxed">
              The BKS token is a specialized utility token designed for use
              within our blood donation platform. It facilitates secure and
              transparent transactions between blood donors and recipients,
              creating an incentivized ecosystem for blood donation. Holders of
              BKS tokens can utilize them to post blood requests, reward donors,
              and cover various platform-related activities. With BKS, we aim to
              make the donation process not only more rewarding for contributors
              but also more streamlined and accessible for those in need. The
              token is transferrable, and users can also withdraw or purchase
              BKS to engage actively in the platform’s mission to support
              life-saving blood donations.
            </small>

            <div className="flex mt-5 justify-center">
             

              <button onClick={withdrawBks} className="ml-4 inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Withdraw
              </button>

              <button
                onClick={() => setOpen(true)}
                className="ml-4 inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                Buy Bks
              </button>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
              <div className="text-center w-56">
                <div className="mx-auto my-4 w-48">
                  <h3 className="text-lg font-black text-orange-700">
                    Buy BKS token
                  </h3>
                  <p className="text-sm text-gray-500">
                    100BKS = 0.002eth (sepolia) 50BKS = 0.001eth (sepolia)
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    className="btn btn-danger hover:bg-slate-50 text-red-700 font-bold w-full"
                    onClick={async() => {
                      await buyBks(0.001);
                      setOpen(false);
                    }}
                  >
                    50 BKS
                  </button>
                  <button
                    className="btn font-semibold hover:bg-slate-50 text-green-600 btn-light w-full"
                    onClick={async () => { await buyBks(0.002); setOpen(false);}}
                  >
                    100 BKS
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyTokenDetails
