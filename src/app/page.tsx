"use client";
import NTlogo from "@/app/ui/NTlogo";
import VerifyForm from "@/app/ui/VeriftForm";
import { NextUIProvider } from "@nextui-org/react";
import { SetStateAction, useState, useEffect } from "react";
const Home = () => {
  const [msisdn, setMsisdn] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [data, setData] = useState(null);

  const updateID = (event: { target: { value: SetStateAction<string>; }; }) => {
    setCardNum(event.target.value);
  };

  const updateMsisdn = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMsisdn(event.target.value);
  };

  const handleSubmit = async () => {
    // Define the URL
    const url = `/api/auth?id_card_number=${cardNum}`;
  
    // Fetch data from the API
    const response = await fetch(url);
  
    // Check if the request was successful
    if(response.ok) {
      // Parse the response to JSON
      const result = await response.json();
  
      // Handle the data as needed
      console.log(result);
      setData(result);
    } else {
      console.error(`Error: ${response.status}`);
    }
  };
  
  
  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-tr from-yellow-100 via-yellow-400 to-yellow-500">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-nt text-sm lg:flex flex-col">
          <NTlogo />
          <h1 className="mb-10 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl"> ระบบยืนยันตัวตนสำหรับผู้มีเบอร์โทรศัพท์หลายหมายเลข</h1>
          <div>
            < VerifyForm updateID={updateID} updateMsisdn={updateMsisdn} handleSubmit={handleSubmit}/>
          </div>
        </div>
      </main>
    </NextUIProvider>
  )
}

export default Home;