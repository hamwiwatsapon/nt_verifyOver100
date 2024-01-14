"use client";
import NTlogo from "@/app/ui/NTlogo";
import OTPForm from "@/app/ui/OTPForm";
import VerifyForm from "@/app/ui/customer/VeriftForm";
import ResultForm from "@/app/ui/customer/ResultForm";
import { Link, NextUIProvider } from "@nextui-org/react";
import React, { SetStateAction, useState, ChangeEvent } from "react";
import { unstable_noStore as noStore } from 'next/cache';
import swal from 'sweetalert';

const Customer = () => {
  noStore();
  interface OTPData {
    otp: string;
    reference: string;
    timestamp: number;
  }

  interface Customer {
    customer_acct_number:string;
    customer_full_name:string;
    id_card_number:string;
    bill_acct_number:string;
    tax_number:string;
    ba_tax_number:string;
    billing_address_name:string;
    subscriber_number:string;
    subscriber_property:string;
    css_cat_id:string;
    start_date:string;
    end_date:string;
    status:string;
    service_type_name:string;
    ref_subscr_no:string;
  }
  
  const [msisdn, setMsisdn] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [isGenOtp, setIsGenOtp] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpData, setOtpData] = React.useState<OTPData | null>(null);
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  
  const updateID = (event: { target: { value: SetStateAction<string>; }; }) => {
    setCardNum(event.target.value);
  };

  const updateMsisdn = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMsisdn(event.target.value);
  };

  const handleInputOtp = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;
    if (/^\d$/.test(value)) { // checks if the input is a single digit number
        let otpArray = otpInput.split('');
        otpArray[index] = value;
        setOtpInput(otpArray.join(''));
		let nextInput = document.getElementById(`otp${index+2}`)! as HTMLInputElement;
		if (nextInput) {
			  nextInput.value = "";
			  nextInput.focus();
		}
    }
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
        setCustomerData(data.customerData.customer_search || [])
        swal("ส่ง OTP สำเร็จ", "กรุณาตรวจสอบหมายเลข OTP ในกล่องข้อความตามหมายเลขโทรศัพท์", "success")
      } else {
        swal("หมายเลขโทรศัพท์ หรือเลขบัตรประชาชนไม่ถูกต้อง", "กรุณาตรวจสอบเลขหมายอีกครั้ง หรือติดต่อศูนย์บริการ NT https://www.ntplc.co.th/servicecenter", "error");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const handleSubmitVer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    await otpSend();
  };
  

  const handleSubmitOTP = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (otpData !== null && otpInput === otpData.otp && ((Date.now() - otpData.timestamp)/ 60000) < 5) {
      setIsVerify(true)
    } else if (otpData !== null && ((Date.now() - otpData.timestamp)/ 60000) > 5) {
      swal("รหัส OTP หมดอายุ", "กรุณาคลิกส่ง OTP อีกครั้ง", "error")
    } else {
      swal("รหัส OTP ไม่ถูกต้อง", "", "waring")
    }
  };

  return (
  <NextUIProvider>
      {isVerify 
        ? <main className="flex min-h-screen min-w-screen bg-gradient-to-tr from-yellow-100 via-yellow-400 to-yellow-500">
          <ResultForm data={customerData}/>
          </main>
        : (
          <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24 bg-gradient-to-tr from-yellow-100 via-yellow-400 to-yellow-500">
          <div className="z-10 max-w-10xl w-full items-center justify-between font-nt text-sm lg:flex flex-col">
            <NTlogo />
            <h1 className="mb-10 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl">
              ระบบตรวจสอบการถือครองหมายเลขโทรศัพท์
            </h1>
            <div className="min-w-screen">
              {isGenOtp
                ? otpData && <OTPForm genRef={otpData.reference} handleInputChange={handleInputOtp} handleSubmit={handleSubmitOTP}/>
                : <VerifyForm updateID={updateID} updateMsisdn={updateMsisdn} handleSubmit={handleSubmitVer}/>
              }
            </div>
          </div>
          </main>
        )
      }
  </NextUIProvider>
  )
}

export default Customer;