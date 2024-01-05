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
import { Link } from "@nextui-org/react";
import { ChangeEvent, SetStateAction } from "react";

interface Customer {
    customer_full_name: string;
    id_card_number: string;
    subscriber_number: string;
    service_type_name: string
  }
  
interface IProps {
    data: Customer[];
    msisdn: string; // replace with the actual type of msisdn
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

    const [rowsData, setRowsData] = useState(customerDataWithCheckbox);
    const [addTable, setAddTable] = useState<string[]>([]);
    const [inputAdd, setInputAdd] = useState("");
    const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        // Get the subscriber number from the checkbox value
        let subscriberNumber = event.target.value;
    
        // Create a new array where each row is a copy of the original row,
        // but the row with the matching subscriber number has `checked` set to the checkbox state
        let updatedRows = rowsData.map(row => 
            row.subscriber_number === subscriberNumber ? { ...row, checked: event.target.checked } : row
        );
    
        // Update the state with the new array
        setRowsData(updatedRows);
    }

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInputAdd(event.target.value);
    }

    const handleAddButton = () => {
        // Get the input value by id
        setAddTable(prevState => [...prevState , `${inputAdd}`]);
    };

    const handleDecreaseButton = (index: number) => {
        let newData = [...addTable]; // create a copy of the data
        newData.splice(index, 1); // remove the item at the given index
        setAddTable(newData); // update the state with the new data
    };
    
    const tableOther = () => {
        return (
                addTable && addTable.map((item, index) => (
                    <TableRow key={item}>
                        <TableCell className="flex flex-row justify-between content-center items-center">
                            {item.toString()}
                            <Button className="print:hidden" isIconOnly color="danger" onPress={() => handleDecreaseButton(index)}>
                                -
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
        );
    }
    

    return (
            <div className="grid grid-cols-3 gap-2 w-full sticky top-0 bg-white p-5 w-a4 h-a4 text-black print:text-sm print:w-a4 print:h-a4">
                <div className="row-start-1 col-span-3 w-full bg-white text-black text-xl text-center rounded-md justify-center flex flex-row">
                    <div className="mr-5">
                        <h2>ข้อมูลผู้ใช้บริการ: {customerName}</h2>
                    </div>
                    <div className="mr-5">
                        <h2>หมายเลขบัตรประชาชน: {customerIDCARD}</h2>
                    </div>
                    <Button className="justify-self-end print:hidden" onPress={()=>{window.print()}} color="warning">พิมพ์</Button>
                    <div className="print:hidden fixed top-0 right-0">
                        <Link size="lg" isBlock href="/" color="foreground">
                        <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg> กลับหน้าหลัก 
                        </Link>
                    </div>
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
                        {rowsData && rowsData
                            .filter(row => row.service_type_name === "my Prepaid" || row.service_type_name === "my" || row.service_type_name === "my Postpaid")
                            .map((row, index) => (
                                <TableRow key={row.subscriber_number}>
                                    <TableCell>
                                        <Checkbox size="sm" onChange={handleCheckbox} value={row.subscriber_number}>0{row.subscriber_number}</Checkbox>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
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
                                {tableOther()}
                                <TableRow key={100} >
                                    <TableCell className="flex flex-row justify-between content-center items-center print:hidden">
                                        <Input size="sm" id="other_input"  maxLength={10} type="text" onChange={handleInputChange}/>
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
                                {rowsData && rowsData
                                .filter(row => row.checked === true || row.service_type_name === "my Prepaid" || row.service_type_name === "my" || row.service_type_name === "my Postpaid")
                                .map((row, index) => (
                                    <TableRow key={row.subscriber_number}>
                                        <TableCell>
                                            <Checkbox size="sm" onChange={handleCheckbox} value={row.subscriber_number}>0{row.subscriber_number}</Checkbox>
                                        </TableCell>
                                    </TableRow>
                                ))
                                }
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
                            {rowsData && rowsData
                                .filter(row => row.checked === false || row.service_type_name === "my Prepaid" || row.service_type_name === "my" || row.service_type_name === "my Postpaid")
                                .map((row, index) => (
                                    <TableRow key={row.subscriber_number}>
                                        <TableCell>
                                            <Checkbox size="sm" onChange={handleCheckbox} value={row.subscriber_number}>0{row.subscriber_number}</Checkbox>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
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
