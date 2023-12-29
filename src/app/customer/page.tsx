"use client";
import NTlogo from "@/app/ui/NTlogo";
import VerifyForm from "@/app/ui/VeriftForm";
import OTPForm from "@/app/ui/OTPForm";
import ResultForm from "@/app/ui/ResultForm";
import { NextUIProvider } from "@nextui-org/react";
import { SetStateAction, useState } from "react";
import { unstable_noStore as noStore } from 'next/cache';
import { useRouter } from 'next/navigation';

const Customer = () => {
  noStore();
  const router = useRouter();
  const [msisdn, setMsisdn] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [isGenOtp, setIsGenOtp] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [otpInput, setInputOtp] = useState("");
  const [otpData, setOtpData] = useState({});

  const updateID = (event: { target: { value: SetStateAction<string>; }; }) => {
    setCardNum(event.target.value);
  };

  const updateMsisdn = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMsisdn(event.target.value);
  };

  const handleInputOtp = (event, index) => {
    const value = event.target.value;
    if (/^[0-9]$/.test(value)) { // checks if the input is a single digit number
        let otpArray = otpInput.split('');
        otpArray[index] = value;
        setInputOtp(otpArray.join(''));
    }
    console.log(otpInput)
};
  const otpSend = async () => {
    let formData = new FormData();
    formData.append('msisdn', msisdn);
    formData.append('idCardNumber', cardNum);
    await fetch('/api/auth/customer', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        setOtpData(data.otpData);
        setIsGenOtp(true);
        alert("Check your sms to verify otp.")
      } else {
        alert(`Id card number or mobile number is invalid. ${data.status}`);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const handleSubmitVer = async (event: React.FormEvent) => {
    event.preventDefault(); 
    await otpSend();
  };
  

  const handleSubmitOTP = async (event: React.FormEvent) => {
    event.preventDefault(); 
    if (otpInput === otpData.otp && ((Date.now() - otpData.timestamp)/ 60000) < 5) {
      setIsVerify(true)
    } else if (((Date.now() - otpData.timestamp)/ 60000) > 5) {
      alert("รหัส OTP หมดอายุกรุณาคลิกส่ง OTP อีกครั้ง")
    } else {
      alert("รหัส OTP ไม่ถูกต้อง")
    }
  };

  return (
    <NextUIProvider>
      <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24 bg-gradient-to-tr from-yellow-100 via-yellow-400 to-yellow-500">
        <div className="z-10 max-w-10xl w-full items-center justify-between font-nt text-sm lg:flex flex-col">
          <NTlogo />
          <h1 className="mb-10 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl"> ระบบยืนยันตัวตนสำหรับผู้มีเบอร์โทรศัพท์หลายหมายเลข</h1>
          <div className="min-w-screen">
          {isVerify 
            ? <ResultForm data={otpData}/>
            : (
                isGenOtp
                ? <OTPForm genRef={otpData.reference} handleInputChange={handleInputOtp} handleSubmit={handleSubmitOTP}/>
                : <VerifyForm updateID={updateID} updateMsisdn={updateMsisdn} handleSubmit={handleSubmitVer}/>
            )
        }
          </div>
        </div>
      </main>
    </NextUIProvider>
  )
}

export default Customer;