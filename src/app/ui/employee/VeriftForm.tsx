"use client";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import React, { ChangeEvent,} from 'react';

interface IProps {
    updateEmployeeID: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: SubmitEvent) => void;
}

const VerifyForm: React.FC<IProps> = ({ updateEmployeeID, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 max-w-5xl">
        <div key="flat" className="mb-6 md:mb-0 gap-4 text-sm ">
            <Input type="text" label="หมายเลขประจำตัวพนักงาน" isRequired radius="md" size="lg" maxLength={10} id="em" onChange={updateEmployeeID} required/>
        </div>
        <Button className="text-3xl" type="submit" color="warning" >เข้าสู่ระบบ</Button>
      </div>
    </form>
  );
}

export default VerifyForm;
