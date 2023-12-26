"use client";
import {Button} from "@nextui-org/button";

export default function OTPForm() {
  return (
    <div className="w-full flex flex-col gap-4 justify-center text-center">
        <h2 className="mb-2 text-3xl font-extrabold text-gray-800 md:text-4xl lg:text-5xl">รหัส OTP ref=TEST</h2>
       <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            <div className="w-16 h-16 mr-2">
                <input 
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                type="text" 
                name="" 
                id=""
                required
                maxLength={1}
                />
            </div>
            <div className="w-16 h-16 mr-2">
                <input 
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                type="text" 
                name="" 
                id=""
                required
                maxLength={1}
                />
            </div>
            <div className="w-16 h-16 mr-2">
                <input 
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                type="text" 
                name="" 
                id=""
                required
                maxLength={1}
                />
            </div>
            <div className="w-16 h-16 mr-2">
                <input 
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                type="text" 
                name="" 
                id=""
                required
                maxLength={1}
                />
            </div>
            <div className="w-16 h-16 mr-2">
                <input 
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                type="text" 
                name="" 
                id=""
                required
                maxLength={1}
                />
            </div>
        </div>
        <Button className="text-3xl" color="warning" fullWidth >ยืนยัน</Button>
    </div>
  );
}
