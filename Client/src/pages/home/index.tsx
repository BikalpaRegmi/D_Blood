import Nav from "../../components/nav"
import { useEthereum } from "../../context/contractContext"
import HomePage from "./home"
import Auth from "../auth";

const Home = () => {
    const { account  } = useEthereum();
    
  return (
      <div>
          {account != null ? (<>
          
          <Nav/>
        <HomePage />
        
      </>)
        : <Auth/>}
          
          
    </div>
  )
}

export default Home
