"use client";
import NTlogo from "@/app/ui/NTlogo";
import OTPForm from "@/app/ui/OTPForm";
import VerifyForm from "@/app/ui/employee/VeriftForm";
import MsisdnForm from "@/app/ui/employee/MsisdnForm";
import ResultForm from "@/app/ui/employee/ResultForm";
import { Link, NextUIProvider } from "@nextui-org/react";
import React, { SetStateAction, useState, ChangeEvent } from "react";
import { unstable_noStore as noStore } from 'next/cache';
import swal from 'sweetalert'
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
  const [employeeId, setEmployeeId] = useState("");
  const [isGenOtp, setIsGenOtp] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpData, setOtpData] = React.useState<OTPData | null>(null);
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  
  const updateEmployeeID = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEmployeeId(event.target.value);
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
          swal("เข้าสู่ระบบสำเร็จ", "", "success")
        } else {
          swal("หมายเลขประจำตัวพนักงานไม่ถูกต้อง", "", "error");
        }
      })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const otpSend = async () => {
    let formData = new FormData();
    formData.append('msisdn', msisdn);
    formData.append('EmployeeId', employeeId);
    await fetch('/api/auth/employee/otp', {
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
        swal("หมายเลขโทรศัพท์ไม่ถูกต้อง", "", "error");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const handleSubmitVer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    await checkEmployeeId();
  };
  const handleSubmitMsisdn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    await otpSend();
  };
  

  const handleSubmitOTP = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (otpData !== null &&  otpInput === otpData.otp && ((Date.now() - otpData.timestamp)/ 60000) < 5) {
      setIsVerify(true)
    } else if (otpData !== null && ((Date.now() - otpData.timestamp)/ 60000) > 5) {
      swal("รหัส OTP หมดอายุ", "กรุณาคลิกส่ง OTP อีกครั้ง", "warning")
    } else {
      swal("รหัส OTP ไม่ถูกต้อง", "", "error")
    }
  };
  
  return (
<NextUIProvider>
  {isVerify 
      ? <main className="flex min-h-screen min-w-screen">
          <ResultForm data={customerData} msisdn={msisdn} employee={employeeId}/>
        </main>
      : (
        <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24 bg-gradient-to-tr from-yellow-100 via-yellow-400 to-yellow-500">
          <div className="z-10 max-w-10xl w-full items-center justify-between font-nt text-sm lg:flex flex-col">
            <NTlogo />
            <h1 className="mb-10 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl">ระบบตรวจสอบการถือครองหมายเลขโทรศัพท์</h1>
            <div className="items-center">
              {isGenOtp ?
                  otpData && <OTPForm genRef={otpData.reference} handleInputChange={handleInputOtp} handleSubmit={handleSubmitOTP}/>
                : isEmployee ? 
                    <MsisdnForm updateMsisdn={updateMsisdn}  handleSubmit={handleSubmitMsisdn} />
                    : 
                    <VerifyForm updateEmployeeID={updateEmployeeID} handleSubmit={handleSubmitVer} />
              }
            </div>
          </div>
        </main>
  )}
</NextUIProvider>

  )
}

export default Customer;