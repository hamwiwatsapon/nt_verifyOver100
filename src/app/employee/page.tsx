"use client";
import NTlogo from "@/app/ui/NTlogo";
import OTPForm from "@/app/ui/OTPForm";
import VerifyForm from "@/app/ui/employee/VeriftForm";
import MsisdnForm from "@/app/ui/employee/MsisdnForm";
import ResultForm from "@/app/ui/ResultForm";
import { Link } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { SetStateAction, useState } from "react";
import { unstable_noStore as noStore } from 'next/cache';
import { useRouter } from 'next/navigation';

const Customer = () => {
  noStore();
  const router = useRouter();
  const [msisdn, setMsisdn] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [isGenOtp, setIsGenOtp] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [otpInput, setInputOtp] = useState("");
  const [otpData, setOtpData] = useState({});
  const [customerData, setCustomerData] = useState([]);
  
  const updateEmployeeID = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEmployeeId(event.target.value);
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
  };

  const checkEmployeeId = async () => {
    let formData = new FormData();
    formData.append('EmployeeId', employeeId);
    await fetch('/api/auth/employee', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status===200) {
          setIsEmployee(true);
        }
      })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const otpSend = async () => {
    let formData = new FormData();
    formData.append('msisdn', msisdn);
    await fetch('/api/msisdn', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        setOtpData(data.otpData);
        setIsGenOtp(true);
        setCustomerData(data.customerData.customer_search)
        console.log(data.customerData.customer_search)
        alert(`Check your sms to verify otp.`)
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
    await checkEmployeeId();
  };
  const handleSubmitMsisdn = async (event: React.FormEvent) => {
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
  <div class="fixed top-20 right-20">
      <Link size="lg" isBlock href="/" color="foreground">
      <svg class="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg> กลับหน้าหลัก 
      </Link>
  </div>
  {isVerify 
      ? <main className="flex min-h-screen min-w-screen">
          <ResultForm data={customerData} msisdn={msisdn}/>
        </main>
      : (
        <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24 bg-gradient-to-tr from-yellow-100 via-yellow-400 to-yellow-500">
          <div className="z-10 max-w-10xl w-full items-center justify-between font-nt text-sm lg:flex flex-col">
            <NTlogo />
            <h1 className="mb-10 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl"> ระบบยืนยันตัวตนสำหรับผู้มีเบอร์โทรศัพท์หลายหมายเลข</h1>
            <div className="items-center">
              {isGenOtp
                ? <OTPForm genRef={otpData.reference} handleInputChange={handleInputOtp} handleSubmit={handleSubmitOTP}/>
                : isEmployee
                  ? <MsisdnForm updateMsisdn={updateMsisdn}  handleSubmit={handleSubmitMsisdn} />
                  : <VerifyForm updateEmployeeID={updateEmployeeID} handleSubmit={handleSubmitVer} />
              }
            </div>
          </div>
        </main>
  )}
</NextUIProvider>

  )
}

export default Customer;