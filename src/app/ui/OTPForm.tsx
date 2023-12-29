"use client";
import {Button} from "@nextui-org/button";
import React, { ChangeEvent,} from 'react';
import { unstable_noStore as noStore } from 'next/cache';

interface Props {
    handleInputChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    genRef: string;
    handleSubmit: (event: SubmitEvent) => void;
}

const OTPForm: React.FC<Props> = ({ handleInputChange, genRef, handleSubmit }) => {
    noStore();
    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-4 justify-center text-center">
                <h2 className="mb-2 text-3xl font-extrabold text-gray-800 md:text-4xl lg:text-5xl">รหัส OTP ref={genRef}</h2>
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        <div className="w-16 h-16 mr-2">
                            <input 
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                            type="text" 
                            name="otp1" 
                            id="otp1"
                            required
                            maxLength={1}
                            onChange={(event) => handleInputChange(event, 0)}
                            />
                        </div>
                        <div className="w-16 h-16 mr-2">
                            <input 
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                            type="text" 
                            name="otp2" 
                            id="otp2"
                            required
                            maxLength={1}
                            onChange={(event) => handleInputChange(event, 1)}
                            />
                        </div>
                        <div className="w-16 h-16 mr-2">
                            <input 
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                            type="text" 
                            name="otp3" 
                            id="otp3"
                            required
                            maxLength={1}
                            onChange={(event) => handleInputChange(event, 2)}
                            />
                        </div>
                        <div className="w-16 h-16 mr-2">
                            <input 
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                            type="text" 
                            name="otp4" 
                            id="otp4"
                            required
                            maxLength={1}
                            onChange={(event) => handleInputChange(event, 3)}
                            />
                        </div>
                        <div className="w-16 h-16 mr-2">
                            <input 
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                            type="text" 
                            name="otp5" 
                            id="otp5"
                            required
                            maxLength={1}
                            onChange={(event) => handleInputChange(event, 4)}
                            />
                        </div>
                </div>
                <Button className="text-3xl" color="warning" type="submit" >ยืนยัน</Button>
                <Button className="text-3xl" color="warning" type="button" onPress={()=>{window.location.reload();}} >ส่ง OTP อีกครั้ง</Button>
            </div>
        </form>
    );
}

export default OTPForm;