
const MyTokenDetails = () => {
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
              Hello Bikalpa, You have <b>150 BKS</b>
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
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Transfer
                          </button>
                          
              <button className="ml-4 inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Withdraw
                          </button>
                          
              <button className="ml-4 inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Buy Bks
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyTokenDetails
