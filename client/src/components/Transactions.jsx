import React, { useContext } from 'react'

import { TransactionContext } from "../context/TransactionContext.jsx"

import dummyData from '../utils/dummyData.js'
import { shortenAddress } from "../utils/shortenAddress.js"
import useFetch from "../hooks/useFetch.jsx"

const TransactionCard = ({ addressTo, addressFrom, url, timestamp, message, keyword, amount }) => {
  const gifUrl = useFetch({ keyword });
  // console.log(keyword);
  return (
    <div className="bg-[#181918] m-4 flex flex-1
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[340px]
    flex-col p-3 rounded-md hover:shadow-2xl
    ">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="justify-start w-full mb-6 p-2">
          <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://goerli.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="gif"
          className='w-full h-64 2xl:h-96 rounded-medium object-cover shadow-lg'
        />

        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  )
}


function Transactions() {
  const { currentAccount, transaction, isLoading } = useContext(TransactionContext);

  // console.log(transaction);
  if (currentAccount != '') {
    console.log(currentAccount);
    (transaction.reverse().map(ele => {
      console.log(ele.addressFrom, ele.addressTo);
      console.log(currentAccount);
    }));
  }

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className='text-white text-3xl text-cetner my-2'>Latest Transactions</h3>
        )
          : (

            <h3 className='text-white text-3xl text-cetner my-2'>Connect your Account</h3>
          )
        }
        <div className="flex flex-wrap justify-center items-center mt-10">
          {transaction.reverse().filter(transaction => {
            if (currentAccount.toLowerCase() == transaction.addressFrom.toLowerCase() || currentAccount.toLowerCase() == transaction.addressTo.toLowerCase()) return transaction;
          }).map((transaction, i) =>
          (
            <TransactionCard key={i} {...transaction} />
          )
          )}
        </div>
        {/* Latest Transactions */}

      </div>
    </div>
  )
}

export default Transactions