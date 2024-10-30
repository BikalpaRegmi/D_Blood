import { useEffect, useState } from "react";
import Nav from "../../components/nav";
import Details from "./details";
import { useEthereum } from "../../context/contractContext";
import { useNavigate, useParams } from "react-router-dom";

interface DetailType {
 id: string | null;
  name: string | null;
  bloodType: string | null;
  dateOfBirth: null | string;
  gender: null | string;
  medicalReport: string | undefined;
  emergencyContact: null | string;
  myAddress: null | string;
}

const Profile :React.FC = () => {
  const [detail, setDetail] = useState<DetailType | undefined>(undefined);
  const { contract, account } = useEthereum();
  const { id } = useParams();
  const navigate = useNavigate();
  const getDetail = async () => {
    try {
      const res = await contract?.profile(id);
      setDetail(res);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetail();
  }, [account, contract]);

  useEffect(() => {
    if(account?.toLowerCase() === id?.toLowerCase() ) navigate('/myProfile')
  },[id])

  return (
    <div>
      <Nav />
     
        <Details detail={detail} />
    
    </div>
  );
};

export default Profile;
