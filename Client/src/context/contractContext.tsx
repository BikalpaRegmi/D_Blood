import { ethers } from "ethers";
import {  createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import abi from '../byteCode/abi.json';

interface EthereumContextType {
    signer: ethers.Signer | null;
    provider: ethers.BrowserProvider | null;
    contract: ethers.Contract | null;
    account: string | null;
    setState : Dispatch<SetStateAction<EthereumContextType>>,
}

interface childrenProps{
    children: ReactNode;
}

declare global{
    interface Window{
        ethereum: any;
    }
}

const EthereumContext = createContext<EthereumContextType | undefined>(undefined);

export const EthererumContextProvider = ({ children } :childrenProps) => {
    const [state, setState] = useState<EthereumContextType>({
        signer: null,
        provider: null,
        contract: null,
        account: null,
        setState:()=>{},
    });

    const template = async () => {
        const contractAddress: string =
          "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
        const byteCode: any = abi.abi;
        const ethereum = window.ethereum;
        
        if (ethereum) {
            const account = await ethereum.request({
                method: "eth_requestAccounts",
            });

            window.ethereum.on("accountsChanged", () => {
              window.location.reload();
            });
            
            const provider: ethers.BrowserProvider = new ethers.BrowserProvider(ethereum);
            const signer: ethers.Signer = await provider.getSigner();
            const contract: ethers.Contract = new ethers.Contract(contractAddress, byteCode, signer);

            setState((prev) => ({
                ...prev,
                account: account[0],
                provider: provider,
                signer: signer,
                contract: contract,
            }))
        }
        else {
            window.location.href = "https://metamask.io/download/";
        }
    }
    useEffect(() => {
        template();
    }, []);
    return (<>
        <EthereumContext.Provider value={state}>
             {children}
     </EthereumContext.Provider>
    </>)
}

export const useEthereum = () => {
    const context = useContext(EthereumContext);
    if (!context) throw new Error("Plz wrap ue code on Provider");
    return context;
}