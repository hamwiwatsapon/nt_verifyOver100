"use client";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import React, { ChangeEvent,} from 'react';

interface IProps {
    updateID: (event: ChangeEvent<HTMLInputElement>) => void;
    updateMsisdn: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: SubmitEvent) => void;
}

const VerifyForm: React.FC<IProps> = ({ updateID, updateMsisdn, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-4">
        <div key="flat" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 text-3xl">
            <Input type="number" variant="flat" label="หมายเลขบัตรประชาชน" fullWidth isRequired radius="md" size="lg" maxLength={13} id="cardnumber" onChange={updateID} required/>
            <Input type="text" variant="flat" label="หมายเลขโทรศัพท์มือถือ" fullWidth isRequired radius="md" size="lg" maxLength={10} id="msisdnd" onChange={updateMsisdn} required/>
          </div>
            <Button className="text-3xl" type="submit" color="warning" fullWidth>รับรหัส OTP</Button>
      </div>
    </form>
  );
}

export default VerifyForm;
