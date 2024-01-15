"use client";
import {Button} from "@nextui-org/button";
import React, { ChangeEvent,} from 'react';
import { unstable_noStore as noStore } from 'next/cache';

interface Props {
    handleInputChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    genRef: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const OTPForm: React.FC<Props> = ({ handleInputChange, genRef, handleSubmit }) => {
    noStore();
    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-2 justify-center text-center text-md md:text-2xl lg:text-4xl">
                <h2 className="mb-2 text-md font-extrabold text-gray-800 md:text-4xl lg:text-5xl">รหัส OTP ref={genRef}</h2>
                <div className="flex flex-row gap-2 items-center justify-center w-full">
                            <input 
                            className="w-12 h-16 items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                            type="number" 
                            name="otp1" 
                            id="otp1"
                            required
                            maxLength={1}
                            onChange={(event) => handleInputChange(event, 0)}
                            
                            />
                            <input 
                            className="w-12 h-16 items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                            type="text" 
                            name="otp2" 
                            id="otp2"
                            required
                            maxLength={1}
                            onChange={(event) => handleInputChange(event, 1)}
                            />
                            <input 
                            className="w-12 h-16 items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                            type="text" 
                            name="otp3" 
                            id="otp3"
                            required
                            maxLength={1}
                            onChange={(event) => handleInputChange(event, 2)}
                            />
                            <input 
                            className="w-12 h-16 items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                            type="text" 
                            name="otp4" 
                            id="otp4"
                            required
                            maxLength={1}
                            onChange={(event) => handleInputChange(event, 3)}
                            />
                            <input 
                            className="w-12 h-16 items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" 
                            type="text" 
                            name="otp5" 
                            id="otp5"
                            required
                            maxLength={1}
                            onChange={(event) => handleInputChange(event, 4)}
                            />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Button className="text-md self-center w-full" color="warning" type="submit" size="sm" >ยืนยัน</Button>
                    <Button className="text-md self-center w-full" color="warning" type="button" size="sm" onPress={()=>{window.location.reload();}} >ส่ง OTP อีกครั้ง</Button>
                </div>
            </div>
        </form>
    );
}

export default OTPForm;