"use client";
import NTlogo from "@/app/ui/NTlogo";
import OTPForm from "@/app/ui/OTPForm";
import { unstable_noStore as noStore } from 'next/cache';
import { NextUIProvider } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const otp_page = () => {
  noStore();
  const router = useRouter();
  const [inputOtp, setInputOtp] = useState(Array(5).fill(''));
  const [otpData, setOtpData] = useState({otpKey:0, refKey:"",timestamp:Date.now()})
  const [verify, setVerify] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...inputOtp]; // Copy the current otp state
    newOtp[index] = event.target.value; // Update the value at the specific index
    setInputOtp(newOtp); // Update the otp state
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    let otpString = parseInt(inputOtp.join(''));
    console.log(otpData.otpKey)
    const verifyOTP = (router) => {
      if (otpString === otpData.otpKey) {
        alert('OTP verified successfully!');
        router.push('/result');
      } else {
        alert('Incorrect OTP. Please try again.');
      }
    }
    verifyOTP(router);
  }

  useEffect(() => {
    const genarateRef = () => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const charactersLength = characters.length;
      const length = 5
      for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    const otpGen = Math.floor(10000 + Math.random() * 90000); 
    const refGen = genarateRef(); 
    setOtpData({otpKey:otpGen,refKey:refGen,timestamp:Date.now()});

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = (currentTime - otpData.timestamp) / 1000 / 60;
      if (timeDifference > 5) {
        const otpGen = Math.floor(10000 + Math.random() * 90000); 
        const refGen = genarateRef(); 
        setOtpData({otpKey:otpGen,refKey:refGen,timestamp:Date.now()});
      }
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [])
  
  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-tr from-yellow-100 via-yellow-400 to-yellow-500">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-nt text-sm lg:flex flex-col">
          <NTlogo />
          <h1 className="mb-10 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl"> ระบบยืนยันตัวตนสำหรับผู้มีเบอร์โทรศัพท์หลายหมายเลข</h1>
          <div>
            <OTPForm 
              handleInputChange={handleInputChange} 
              genRef={otpData.refKey}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
    </NextUIProvider>
  )
}

export default otp_page;