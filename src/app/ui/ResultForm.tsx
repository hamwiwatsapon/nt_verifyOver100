"use client";
import { useState } from "react";
import {Checkbox, Button} from "@nextui-org/react";
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
import React, { ChangeEvent, SetStateAction } from "react";
import Image from 'next/image'

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
    const [count, setCount] = useState(0);
    const [countAdd, setCountAdd] = useState(0);
    const customerName = customerData[0].customer_full_name;
    const customerIDCARD = customerData[0].id_card_number;
    const customerDataWithCheckbox = customerData.map(data => ({
        ...data,
        checked: false
    }));

    const [rowsData, setRowsData] = useState(customerDataWithCheckbox);
    const [tableData, setTableData] = useState<string[]>([]);
    const [inputAdd, setInputAdd] = useState<string>("");
    const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        // Get the subscriber number from the checkbox value
        let subscriberNumber = event.target.value;
    
        // Create a new array where each row is a copy of the original row,
        // but the row with the matching subscriber number has `checked` set to the checkbox state
        let updatedRows = rowsData.map(row => 
            row.subscriber_number === subscriberNumber ? { ...row, checked: event.target.checked } : row
        );
        
        if (event.target.checked) {
            setCount(count + 1);
        } else {
            setCount(count - 1);
        }

        // Update the state with the new array
        setRowsData(updatedRows);
    }

    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsData = rowsData.map(row => ({
            ...row,
            checked: event.target.checked,
        }));
        
        setRowsData(newRowsData);
        
        if (event.target.checked) {
            setCount(countArray);
        } else {
            setCount(0);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value !== "") {
        setInputAdd(event.target.value);
		}
    };

    const handleAddRow = () => {
        setTableData(prevData => [...prevData, inputAdd]);
        setCountAdd(countAdd + 1);
    };

    const handleDeleteRow = (index: number) => {
        setTableData(prevData => prevData.filter((_, i) => i !== index));
        if (count !== 0) {
            setCountAdd(countAdd - 1);
        }
    };

    const handlePrint = async () => {
        window.print();
        let formData = new FormData();
        formData.append('customerName', customerName);
        formData.append('customerIDCARD', customerIDCARD);
        await fetch('/api/printTrack', {
        method: 'POST',
        body: formData,
        })
        .then(response => response.json())
        .catch((error) => {
        console.error('Error:', error);
        })
    };
	
    return (
            <div className="grid grid-cols-3 gap-2 w-full sticky top-10 bg-white p-5 w-a4 h-a4 text-black print:text-sm">
                <div className="row-start-1 col-span-3 w-full bg-white text-black text-xl text-center rounded-md justify-center flex flex-row print:hidden">
                    <div className="mr-5">
                        <h2>ข้อมูลผู้ใช้บริการ: {customerName}</h2>
                    </div>
                    <div className="mr-5">
                        <h2>หมายเลขบัตรประชาชน: {customerIDCARD}</h2>
                    </div>
                    <Button className="justify-self-end print:hidden" onPress={handlePrint} color="warning">พิมพ์</Button>
                    <div className="print:hidden fixed top-0 right-0">
                        <Link className="print:hidden" size="lg" isBlock href="/" color="foreground">
                            กลับหน้าหลัก 
                            <svg className="h-8 w-8 text-black print:hidden"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
                                <path stroke="none" d="M0 0h24v24H0z"/>  
                                <polyline points="5 12 3 12 12 3 21 12 19 12" />
                                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  
                                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                            </svg> 
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
                            <TableColumn>
                                <div className="justify-between flex flex-row">
                                    <div>
                                        เบอร์โทรศัพท์ในระบบ ข้อมูลทั้งหมด {countArray} หมายเลข
                                    </div>
                                    <div>
                                        <Checkbox className="" size="sm" onChange={handleCheckAll}>เลือกทั้งหมด</Checkbox>
                                    </div>
                                </div>
                            </TableColumn>
                        </TableHeader>
                        <TableBody>
                        {rowsData && rowsData
                            .filter(row => row.service_type_name === "my Prepaid" || row.service_type_name === "my" || row.service_type_name === "my Postpaid")
                            .map((row, index) => (
                                <TableRow key={row.subscriber_number}>
                                    <TableCell>
                                        <Checkbox  isSelected={row.checked} size="sm" onChange={handleCheckbox} value={row.subscriber_number}>0{row.subscriber_number}</Checkbox>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                </div>
                <div className="row-span-2 absolote print:hidden">
                    <table 
                            className="font-nt text-black w-fi ml-10"
                            color="primary"
                            aria-label="msisdn in system"
                            id="other"
                        >
						<thead>
							<tr>เบอร์ที่ถือครองอื่นๆ</tr>
						</thead>
						<tbody>
						<>
							{tableData.map((row, index) => (
								<tr key={row}>
									<tr className="flex flex-row justify-between content-center items-center">
										{row.toString()}
										<Button className="print:hidden" isIconOnly color="danger" onPress={() => handleDeleteRow(index)}>
											-
										</Button>
									</tr>
								</tr>
							))}
						</>
							<tr key="addbut">
								<td className="flex flex-row justify-between content-center items-center print:hidden">
									<Input size="sm" id="other_input" maxLength={10} type="text" onChange={handleInputChange}/>
									<Button isIconOnly color="success" onPress={handleAddRow}>
										Add
									</Button>
								</td>
							</tr>
						</tbody>
                    </table>
                </div>
                <div className="print:hidden">
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
                                .filter(row => row.checked === true && (row.service_type_name === "my Prepaid" || row.service_type_name === "my" || row.service_type_name === "my Postpaid"))
                                .map((row, index) => (
                                    <TableRow key={row.subscriber_number}>
                                        <TableCell>
                                            0{row.subscriber_number}
                                        </TableCell>
                                    </TableRow>
                                ))
                                }
                            </TableBody>
                    </Table>
                </div>
                <div className="print:hidden">
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
                                .filter(row => row.checked === false && (row.service_type_name === "my Prepaid" || row.service_type_name === "my" || row.service_type_name === "my Postpaid"))
                                .map((row, index) => (
                                    <TableRow key={row.subscriber_number}>
                                        <TableCell>
                                            0{row.subscriber_number}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                            </TableBody>
                    </Table>
                </div>
                <div className="flex flex-col row-start-1 text-xl col-span-full p-5 text-center w-full mt-10 print-only">
                    <div className="fixed top-0 right-0">
                        <Image 
                        className='print-only'
                        src="/NT-logo.png"
                        width={150}
                        height={100} 
                        alt="NT logo" 
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="mb-20">
                            หนังสือยืนยันการถือครองเลขหมายโทรศัพท์เคลื่อนที่
                        </h3>
                    </div>
                    <div>
                        <p className="indent-20 text-left">
                            ข้าพเจ้า นาย/นาง/น.ส. {customerName}  ขอยืนยันการถือครองเลขหมายโทรศัพท์เคลื่อนที่ ขอยืนยันการถือครองเลขหมายโทรศัพท์เคลื่อนที่ จำนวน {count+countAdd} เลขหมายและขอยืนยันความรับผิดชอบต่อการใช้งานเลขหมายที่ถือครองทุกเลขหมาย 
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
                    <h1 className="mt-10 mb-2">หมายเลขที่ยืนยันเป็นเจ้าของ</h1>
                    <div className="grid grid-cols-5">
                        {rowsData && rowsData
                        .filter(row => row.checked === true && (row.service_type_name === "my Prepaid" || row.service_type_name === "my" || row.service_type_name === "my Postpaid"))
                        .map((row, index) => (
                            <div className="mr-5" key={row.subscriber_number}>0{row.subscriber_number}</div>
                        ))}
                    </div>
                    {tableData.length !== 0 && (
                        <>
                            <h1 className="mt-10 mb-2">เบอร์ที่ถือครองอื่นๆ</h1>
                            <div className="grid grid-cols-5">
                                {tableData.map((row, index) => (
                                    <div className="mr-5" key={row.toString()}>{row.toString()}</div>
                                ))}
                            </div>
                        </>
                    )}
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
