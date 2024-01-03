"use client";
import { useState } from "react";
import {Checkbox} from "@nextui-org/react";
import { 
    Table, 
    TableHeader, 
    TableCell, 
    TableBody, 
    TableRow, 
    TableColumn 
} from "@nextui-org/table"
import { Input } from "@nextui-org/input"
import 

interface IProps {
    data: string;
    msisdn: string;
}

const ResultForm: React.FC<IProps> = ({ data, msisdn }) => {
    const customerData = [
        {
            "customer_acct_number": "11117795",
            "customer_full_name": "นายพงควัฒน์ คชศรีสวัสดิ์",
            "id_card_number": "1709900747421",
            "bill_acct_number": "9200259721",
            "tax_number": "1709900747421",
            "ba_tax_number": "1709900747421",
            "billing_address_name": "พงควัฒน์ คชศรีสวัสดิ์ ",
            "subscriber_number": "964579993",
            "subscriber_property": "8966002109170232798",
            "css_cat_id": null,
            "start_date": "2023-05-19T12:50:15.000Z",
            "end_date": null,
            "status": "Active",
            "service_type_name": "my",
            "ref_subscr_no": "3769485"
        },
        {
            "customer_acct_number": "7113854",
            "customer_full_name": "พงควัฒน์ คชศรีสวัสดิ์",
            "id_card_number": "1709900747421",
            "bill_acct_number": "9200101553",
            "tax_number": "1709900747421",
            "ba_tax_number": "1709900747421",
            "billing_address_name": "พงควัฒน์ คชศรีสวัสดิ์ (01000591) พปค. ส่วนปฏิบัติการระบบ Real Time Charging ปป.",
            "subscriber_number": "864639011",
            "subscriber_property": "8966022306010463718",
            "css_cat_id": null,
            "start_date": "2020-12-01T00:00:01.000Z",
            "end_date": null,
            "status": "Active",
            "service_type_name": "my",
            "ref_subscr_no": "3397425"
        },
        {
            "customer_acct_number": "7113854",
            "customer_full_name": "พงควัฒน์ คชศรีสวัสดิ์",
            "id_card_number": "1709900747421",
            "bill_acct_number": "700503370",
            "tax_number": "1709900747421",
            "ba_tax_number": "1709900747421",
            "billing_address_name": "พงควัฒน์ คชศรีสวัสดิ์ ",
            "subscriber_number": "5030212497@home",
            "subscriber_property": "5030212497",
            "css_cat_id": null,
            "start_date": "2020-09-17T00:00:00.000Z",
            "end_date": null,
            "status": "Active",
            "service_type_name": "C internet (On Net)",
            "ref_subscr_no": "3345935"
        }
    ]

    const customerName = customerData[0].customer_full_name;
    const customerMsisdn = `0964579993`;
    const customerIDCARD = customerData[0].id_card_number;
    const customerDataWithCheckbox = customerData.map(data => ({
        ...data,
        checked: false
    }));

    const [rows, setRows] = useState(customerDataWithCheckbox);


    const handleCheckbox = (event) => {
        // Get the subscriber number from the checkbox value
        let subscriberNumber = event.target.value;
    
        // Create a new array where each row is a copy of the original row,
        // but the row with the matching subscriber number has `checked` set to the checkbox state
        let updatedRows = rows.map(row => 
            row.subscriber_number === subscriberNumber ? { ...row, checked: event.target.checked } : row
        );
    
        // Update the state with the new array
        setRows(updatedRows);
    }

    const handleInput = (event) => {

    }

    return (
        <div className="grid grid-cols-3 gap-4 w-full sticky top-0 bg-white rounded-lg p-5 w-a4 h-a4 text-black">
            <div className="col-span-3 w-full bg-white text-black text-2xl text-center rounded-md justify-center flex flex-row">
                <div className="mr-5">
                    <h1>ข้อมูลผู้ใช้บริการ: {customerName}</h1>
                </div>
                <div className="mr-5">
                    <h1>หมายเลขบัตรประชาชน: {customerIDCARD}</h1>
                </div>
                <div>
                    <h1>หมายเลขโทรศัพท์: {customerMsisdn}</h1>
                </div>
            </div>
            <div className="col-span-2 w-full">
                <Table 
                    className="font-nt text-black w-auto"
                    color="primary"
                    selectionMode="single" 
                    aria-label="msisdn in system"
                    id="list_data"
                >
                    <TableHeader>
                        <TableColumn>เบอร์โทรศัพท์ในระบบ</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {rows && rows.map((row, index) => {
                            if (row.service_type_name === "my") {
                                return (
                                    <TableRow>
                                        <TableCell className="justify-between">
                                            <Checkbox size="sm" onChange={handleCheckbox} value={row.subscriber_number}>0{row.subscriber_number}</Checkbox>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </div>
            <div>
                <Table 
                        className="font-nt text-black w-auto text-2xl"
                        color="primary"
                        aria-label="msisdn in system"
                        id="other"

                    >
                        <TableHeader>
                            <TableColumn>เบอร์ที่ถือครองอื่นๆ</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>
                                    <Input size="md"/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                </Table>
            </div>
            <div >
                <Table 
                        className="font-nt text-black w-auto"
                        color="primary"
                        aria-label="msisdn in hand"
                        selectionMode="single" 
                        id="handle"
                    >
                        <TableHeader>
                            <TableColumn>หมายเลขที่เป็นเจ้าของ</TableColumn>
                        </TableHeader>
                        <TableBody>
                        {rows && rows.map((row, index) => {
                            if (row.checked === true && row.service_type_name === "my") {
                                return (
                                    <TableRow>
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
            <div>
                <Table 
                        className="font-nt text-black w-auto"
                        color="primary"
                        aria-label="msisdn in hand"
                        selectionMode="single"
                        id="not_own"
                    >
                        <TableHeader>
                            <TableColumn>หมายเลขที่ไม่เกี่ยวข้อง</TableColumn>
                        </TableHeader>
                        <TableBody>
                        {rows && rows.map((row, index) => {
                            if (row.checked === false && row.service_type_name === "my") {
                                return (
                                    <TableRow>
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
            <div>
            </div>
            <div className="text-center text-2xl">
                <p className="mb-4">ลงชื่อ</p>
                <p>...................................................</p>
                <p>{customerName}</p>
            </div>
            <div className="text-center text-2xl">
                <p className="mb-4">ลงชื่อ</p>
                <p>...................................................</p>
                <p>{customerName}</p>
            </div>
            <div className="text-center text-2xl">
                <p className="mb-4">สำหรับพนักงาน</p>
                <p>...................................................</p>
                <p>( ................................................... )</p>
            </div>
        </div>
    );
};

export default ResultForm;
