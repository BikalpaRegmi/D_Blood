import { ethers } from "ethers";
import Nav from "../../components/nav"
import { useEthereum } from "../../context/contractContext"
import MyTokenDetails from "./myTokenDetails"
import { useEffect, useState } from "react";

const Token = () => {
  const { account, contract } = useEthereum();
    const [totalBks, setTotalBks] = useState<number>();

  const buyBks = async(total:number) => {
    const balance = await contract?.buyBks({ value: ethers.parseEther(`${total}`) });
    await balance.wait();
    window.location.reload();
  }

  const getTotalBks = async () => {
    const res = await contract?.balances(account);
    setTotalBks(res);
  };

  useEffect(() => {
    getTotalBks();
  }, [contract, account]);

  return (
      <div>
          <Nav/>
      <MyTokenDetails totalBks={totalBks!} buyBks={buyBks} />
    </div>
  )
}

export default Token
