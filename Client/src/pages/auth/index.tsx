import { useEthereum } from "../../context/contractContext"
import ConnectMetamask from "./connection"
import Login from "./login"

const Auth = () => {
    const { account } = useEthereum();
  return (
      <div>
          {
              account !=null ? <Login /> : <ConnectMetamask/>
          }
          
          
    </div>
  )
}

export default Auth
