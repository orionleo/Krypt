import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants.js"


export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    // console.log({
    //     provider,
    //     signer,
    //     transactionContract
    // });

    return transactionContract;

}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transaction, setTransaction] = useState([]);




    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
        
    }

    const getAllTransactions = async()=>{

        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const transactionContract = getEthereumContract();
            
            const availableTransactions = await transactionContract.getAllTransactions();
            // console.log(availableTransactions);
            const structuredTransactions =availableTransactions.map((transaction)=>({
                addressTo:transaction.receiver,
                addressFrom:transaction.sender,
                timestamp:new Date(transaction.timeStamp.toNumber()*1000).toLocaleString(),
                message:transaction.message,
                keyword:transaction.keyword,
                amount:parseInt(transaction.amount._hex)/(10**18)
            }));
            // console.log(structuredTransactions);
            setTransaction(structuredTransactions);
        } catch (error) {
            console.log(error);
            
        }
    }


    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
            // console.log(accounts);
        } catch (error) {
            console.log(error);
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const { addressTo, amount, keyword, message } = formData;
            const parsedAmount = ethers.utils.parseEther(amount);

            const transactionContract = getEthereumContract();
            // console.log(transactionContract);
            // console.log(formData);
            // console.log(currentAccount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',//21000 gwei, 0.000021
                    value: parsedAmount._hex
                }]
            })

            const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword);
            console.log(transactionHash);
            console.log(keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

            location.reload();


        } catch (error) {
            console.log(error);
        }
    }

    const checkIfTransactionsExist = async()=>{
        try {
            if(ethereum){
                const transactionContract = getEthereumContract();
                const transactionCount = await transactionContract.getTransactionCount();

                window.localStorage.setItem('transactionCount',transactionCount);

            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, [])


    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, transaction,handleChange, sendTransaction ,isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}