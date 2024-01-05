"use client";
import { useState } from "react";
import {Checkbox, Button, Image} from "@nextui-org/react";
import { 
    Table, 
    TableHeader, 
    TableCell, 
    TableBody, 
    TableRow, 
    TableColumn 
} from "@nextui-org/table"
import { Input } from "@nextui-org/input"
import add  from "../ui/icons/add.png"

interface IProps {
    data: string;
    msisdn: string;
}

const ResultForm: React.FC<IProps> = ({ data, msisdn }) => {
    const customerData = data;
    const countArray = customerData.length
    const customerName = customerData[0].customer_full_name;
    const customerIDCARD = customerData[0].id_card_number;
    const customerDataWithCheckbox = customerData.map(data => ({
        ...data,
        checked: false
    }));

    const [rows, setRows] = useState(customerDataWithCheckbox);
    const [otherTable, setOtherTable] = useState([]);

    const handleCheckbox = (e: event) => {
        // Get the subscriber number from the checkbox value
        let subscriberNumber = e.target.value;
    
        // Create a new array where each row is a copy of the original row,
        // but the row with the matching subscriber number has `checked` set to the checkbox state
        let updatedRows = rows.map(row => 
            row.subscriber_number === subscriberNumber ? { ...row, checked: e.target.checked } : row
        );
    
        // Update the state with the new array
        setRows(updatedRows);
    }

    const handleAddButton = () => {
        // Get the input value by id
        var input = document.getElementById("other_input").value;
        if (input!=="") {
            // Add the input value to the table data array
            setOtherTable([...otherTable, input]);
        }
    };

    const handleDecreaseButton = (index) => {
        let newData = [...otherTable]; // create a copy of the data
        newData.splice(index, 1); // remove the item at the given index
        setOtherTable(newData); // update the state with the new data
    };
    
    return (
            <div className="grid grid-cols-3 gap-2 w-full sticky top-0 bg-white rounded-lg p-5 w-a4 h-a4 text-black print:text-sm print:w-a4 print:h-a4">
                <div className="row-start-1 col-span-3 w-full bg-white text-black text-xl text-center rounded-md justify-center flex flex-row">
                    <div className="mr-5">
                        <h2>ข้อมูลผู้ใช้บริการ: {customerName}</h2>
                    </div>
                    <div className="mr-5">
                        <h2>หมายเลขบัตรประชาชน: {customerIDCARD}</h2>
                    </div>
                    <Button className="justify-self-end print:hidden" onPress={()=>{window.print()}} color="warning">พิมพ์</Button>
                </div>
                <div className="row-start-2 col-span-2 w-full print:hidden">
                    <Table 
                        className="font-nt text-black w-auto"
                        color="primary"
                        aria-label="msisdn in system"
                        id="list_data"
                    >
                        <TableHeader>
                            <TableColumn>เบอร์โทรศัพท์ในระบบ ข้อมูลทั้งหมด {countArray} หมายเลข</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {rows && rows.map((row, index) => {
                                if (row.service_type_name === "my Prepaid" || row.service_type_name === "my" || row.service_type_name === "my Postpaid") {
                                    return (
                                        <TableRow key={row.subscriber_number}>
                                            <TableCell>
                                                <Checkbox size="sm" onChange={handleCheckbox} value={row.subscriber_number}>0{row.subscriber_number}</Checkbox>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            })}
                        </TableBody>
                    </Table>
                </div>
                <div className="row-span-2 absolote ">
                    <Table 
                            className="font-nt text-black w-fi"
                            color="primary"
                            aria-label="msisdn in system"
                            id="other"
                        >
                            <TableHeader>
                                <TableColumn>เบอร์ที่ถือครองอื่นๆ</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {otherTable.map((item, index) => (
                                    <TableRow key={index+1}>
                                        <TableCell className="flex flex-row justify-between content-center items-center">
                                            {item}
                                            <Button className="print:hidden" isIconOnly color="danger" onPress={() => handleDecreaseButton(index)}>
                                                -
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                    <TableRow key={0} >
                                        <TableCell className="flex flex-row justify-between content-center items-center print:hidden">
                                            <Input size="sm" id="other_input"  maxLength={10} type="text"/>
                                            <Button isIconOnly color="success" onPress={handleAddButton}>
                                                Add
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                            </TableBody>
                    </Table>
                </div>
                <div className="">
                    <Table 
                            className="font-nt text-black w-auto"
                            color="primary"
                            aria-label="msisdn in hand"
                            id="handle"
                        >
                            <TableHeader>
                                <TableColumn>หมายเลขที่เป็นเจ้าของ</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {rows && rows.map((row, index) => {
                                    if (row.checked === true && (row.service_type_name === "my Prepaid" || row.service_type_name === "my" || row.service_type_name === "my Postpaid")) {
                                        return (
                                            <TableRow key={row.subscriber_number}>
                                                <TableCell className="justify-between">
                                                    0{row.subscriber_number}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                })}
                            </TableBody>
                    </Table>
                </div>
                <div className="">
                    <Table 
                            className="font-nt text-black w-auto"
                            color="primary"
                            aria-label="msisdn in hand"
                            id="not_own"
                        >
                            <TableHeader>
                                <TableColumn>หมายเลขที่ไม่เกี่ยวข้อง</TableColumn>
                            </TableHeader>
                            <TableBody>
                            {rows && rows.map((row, index) => {
                                if (row.checked === false && (row.service_type_name === "my Prepaid" || row.service_type_name === "my" || row.service_type_name === "my Postpaid")) {
                                    return (
                                        <TableRow key={row.subscriber_number}>
                                            <TableCell className="justify-between">
                                                0{row.subscriber_number}

                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            })}
                            </TableBody>
                    </Table>
                </div>
                <div className="row-start-4 text-center text-md m-10">
                    <p className="mb-4">สำหรับพนักงาน</p>
                    <p>................................................</p>
                    <p>(..............................................)</p>
                </div>
                <div className="row-start-4 text-center text-md m-10">
                    <p className="mb-4">ลงชื่อ</p>
                    <p>................................................</p>
                    <p>{customerName}</p>
                </div>
                <div className="row-start-4 text-center text-md m-10">
                    <p className="mb-4">ลงชื่อ</p>
                    <p>................................................</p>
                    <p>{customerName}</p>
                </div>
                <div className="flex flex-col row-start-5 col-span-full m-10 p-5 text-center w-full print:block print:break-before-page">
                    <div>
                        <h3 className="m-20">
                            หนังสือยืนยันการถือครองเลขหมายโทรศัพท์เคลื่อนที่
                        </h3>
                    </div>
                    <div>
                        <p className="indent-20 text-left">
                            ข้าพเจ้า นาย/นาง/น.ส. {customerName}  ขอยืนยันการถือครองเลขหมายโทรศัพท์เคลื่อนที่ ขอยืนยันการถือครองเลขหมายโทรศัพท์เคลื่อนที่ จำนวน........... เลขหมายและขอยืนยันความรับผิดชอบต่อการใช้งานเลขหมายที่ถือครองทุกเลขหมาย 
                        </p>
                    </div>
                    <div className="text-center flex justify-end mt-10 mr-20">
                        <div className="w-fit">
                            <p>
                                ลงชื่อ........................................................
                            </p>
                            <p>
                                ผู้ถือครองเลขหมาย
                            </p>
                            <p>
                                ({customerName})
                            </p>
                        </div>
                    </div>
                    <p className="print:text-sm">
                        <br />
                        <br />
                        หากท่านมีความประสงค์สอบถามข้อมูลเพิ่มเติมกรุณาติดต่อ Contact Center หมายเลขโทรศัพท์ 0-2401-2222 หรือ 1888
                    </p>
                </div>
            </div>
    );
};

export default ResultForm;
