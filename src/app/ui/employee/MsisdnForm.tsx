"use client";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import React, { ChangeEvent,} from 'react';

interface IProps {
    updateMsisdn: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const MsisdnForm: React.FC<IProps> = ({ updateMsisdn, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} className="justify-center items-center w-full">
      <div className="flex flex-col gap-4 max-w-5xl">
        <div key="flat" className="mb-6 md:mb-0 text-sm ">
            <Input type="text" label="หมายเลขโทรศัพท์" isRequired radius="md" size="lg" maxLength={10} id="em" onChange={updateMsisdn} required/>
        </div>
        <Button className="text-3xl" type="submit" color="warning" >รับรหัส OTP</Button>
      </div>
    </form>
  );
}

export default MsisdnForm;
