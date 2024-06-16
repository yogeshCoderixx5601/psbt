"use client";
import React, { useState } from "react";
import { useWalletAddress } from "bitcoin-wallet-adapter";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
type InputData = {
  address: string;
  amount: number;
};

const Mint = () => {
    const walletDetails = useWalletAddress();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [submittedData, setSubmittedData] = useState<InputData[]>([]);
  
  console.log(submittedData, "submittedData");

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData([...submittedData, { address, amount }]);
    setAddress("");
    setAmount(0);
  };

  const handleDelete = (index: number) => {
    const newData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(newData);
  };

  const createPsbt = async() => {
    try {
      const paymentDetails = {walletDetails, submittedData};
      const response = await axios.post(
        "http://localhost:3000/api/mint",
        paymentDetails,
      );

      console.log(response.data, "response I get");
     
    } catch (error) {
      console.error("Error creating PSBT:", error);
      
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <form >
        <div className="w-full flex gap-3">
          <div>
            <input
              type="text"
              name="address"
              className="outline-none px-4 py-1 rounded"
              value={address}
              onChange={handleAddress}
            />
          </div>
          <div>
            <input
              type="number"
              name="amount"
              className="outline-none px-4 py-1 rounded"
              value={amount}
              onChange={handleAmount}
            />
          </div>
          <div className="w-full flex">
            <div  className="bg-accent px-4 py-1 rounded cursor-pointer" onClick={handleSubmit}>
              Add
            </div>
          </div>
        </div>
      </form>
      <div className="pt-6 flex flex-col gap-6">
        <div className="text-white text-2xl text-bold">Pending payments</div>
        {submittedData.map((data, index) => (
          <div
            key={index}
            className="w-full flex justify-between gap-6 p-2 border border-accent rounded"
          >
           <div className="w-full flex gap-6">
           <div>
              <p className="text-white">
                <span className="text-accent font-bold text-xl pr-4">
                  Address:
                </span>
                {data.address}
              </p>
            </div>
            <div>
              <p className="text-white">
                <span className="text-accent font-bold text-xl pr-4">
                  Amount:
                </span>
                {data.amount}
              </p>
            </div>
           </div>
            <div className="w-full flex justify-end">
              <div
                className="bg-accent px-4 text-sm  rounded cursor-pointer"
                onClick={() => handleDelete(index)}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>

      {submittedData.length > 0 && (
        <div className="w-full flex justify-end">
          <div className="bg-accent px-4 py-1 rounded cursor-pointer" onClick={createPsbt}>
            Create psbt
          </div>
        </div>
      )}
    </div>
  );
};

export default Mint;

