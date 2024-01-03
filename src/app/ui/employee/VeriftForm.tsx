"use client";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import React, { ChangeEvent,} from 'react';

interface IProps {
    updateID: (event: ChangeEvent<HTMLInputElement>) => void;
    updateMsisdn: (event: ChangeEvent<HTMLInputElement>) => void;
    updateEmployeeID: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: SubmitEvent) => void;
}

const VerifyForm: React.FC<IProps> = ({ updateEmployeeID, updateID, updateMsisdn, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 max-w-5xl">
        <div key="flat" className="grid grid-cols-3 gap-4 mb-6 md:mb-0 gap-4 text-3xl ">
            <Input type="text" variant="flat" label="หมายเลขประจำตัวพนักงาน" fullWidth isRequired radius="md" size="lg" maxLength={10} id="cardnumber" onChange={updateEmployeeID} required/>
            <Input type="text" variant="flat" label="หมายเลขบัตรประชาชนของผู้ใช้บริการ" fullWidth isRequired radius="md" size="lg" maxLength={13} id="msisdnd" onChange={updateID} required/>
            <Input type="text" variant="flat" label="หมายเลขโทรศัพท์ของผู้ใช้บริการ" fullWidth isRequired radius="md" size="lg" maxLength={10} id="msisdnd" onChange={updateMsisdn} required/>
          </div>
            <Button className="text-3xl" type="submit" color="warning" fullWidth>รับรหัส OTP</Button>
      </div>
    </form>
  );
}

export default VerifyForm;
