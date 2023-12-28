"use client";
import NTlogo from "@/app/ui/NTlogo";
import VerifyForm from "@/app/ui/VeriftForm";
import { NextUIProvider } from "@nextui-org/react";
import { SetStateAction, useState } from "react";
import { unstable_noStore as noStore } from 'next/cache';
import { useRouter } from 'next/navigation';

const Home = () => {
  noStore();
  const router = useRouter();
  const [msisdn, setMsisdn] = useState("");
  const [cardNum, setCardNum] = useState("");

  const updateID = (event: { target: { value: SetStateAction<string>; }; }) => {
    setCardNum(event.target.value);
  };

  const updateMsisdn = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMsisdn(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    let formData = new FormData();
    formData.append('msisdn', msisdn);
    formData.append('idCardNumber', cardNum);
    fetch('/api/auth/customer', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        alert("Check your sms to verify otp.")
        router.push('/otp')
      } else {
        alert("Id card number or mobile number is invalid.");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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