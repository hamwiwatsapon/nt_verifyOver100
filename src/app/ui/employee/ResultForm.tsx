"use client";
import React, { useState, ChangeEvent, useEffect, SetStateAction } from "react";
import { Checkbox, Button, Input, Image } from "@nextui-org/react";
import Iframe from 'react-iframe'
import { 
    Table, 
    TableHeader, 
    TableCell, 
    TableBody, 
    TableRow, 
    TableColumn 
} from "@nextui-org/table"
import swal from "sweetalert";


interface Customer {
    customer_full_name: string;
    id_card_number: string;
    subscriber_number: string;
    service_type_name: string
  }
  
interface IProps {
    data: Customer[];
    employee: string;
}


  
const ResultForm: React.FC<IProps> = ({ data, employee }) => {
    const customerData = data;
    const customerIDCARD = customerData[0].id_card_number;
    const employeeId = employee;
	
	// State update on page //
    const [inputAdd, setInputAdd] = useState<string>("");
    const [isVerify, setIsVerify] = useState(false);
    // End state update on page //
	
	const url = `https://rtcapp.mybynt.com/nt_verifyUploadFile/form_upload_file.php?id_card=${customerIDCARD}`
    const [infoData, setInfoData] = useState({
        id_card: customerIDCARD,
        fname: "",
        lname: "",
        address_1: "",
        address_2: "",
        address_3: "",
        address_4: "",
        address_5: "",
        address_6: "",
        address_7: "",
        address_8: "",
        verify_status: "CUST_APPROVE",
        ref_employee: employeeId,
    });

    const [msisdnTable, setMsisdnTable] = useState(
        customerData
            .filter(row => 
                row.service_type_name === "my Prepaid" || 
                row.service_type_name === "my" || 
                row.service_type_name === "my Postpaid"
            )
            .map(row => ({
                id_card: customerIDCARD,
                msisdn: `0${row.subscriber_number}`,
                type_select: 'not_owned'
            }))
    );

    // Fetch data on database //
    const fetchData = async () => {
    try {
        const response = await fetch('api/db-query/customerFetch', {
        method: 'POST',
        body: JSON.stringify({
            customerData: {
            id_card: customerIDCARD
            }
        })
        });
        const data = await response.json();
        if (data.status === 200) {
            setInfoData(data.customerData[0]);
            setMsisdnTable(data.msisdnData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    };
    /* ---------------------------- */

    useEffect(() => {
        fetchData();
        handleCheckFile();
    }, []);



    const handleFormInputChange = (event: { target: { id: string; value: SetStateAction<string>; }; }) => {
        setInfoData(prevState => ({
            ...prevState,
            [event.target.id]: event.target.value
        }));
    };

    const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        // Get the subscriber number from the checkbox value
        let subscriberNumber = event.target.value;
        // Update the row with the matching subscriber number
        let updatedRows = msisdnTable.map(row => 
            row.msisdn === subscriberNumber ? { ...row, type_select: event.target.checked ? 'owner' : 'not_owned' } : row
        );
        // Update the state with the new array
        setMsisdnTable(updatedRows);
    }

    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsData = msisdnTable.map(row => ({...row, type_select: event.target.checked ? 'owner' : 'not_owned'}));
        setMsisdnTable(newRowsData);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value !== "") {
        setInputAdd(event.target.value);
		}
    };

    const handleAddRow = () => {
        setMsisdnTable(prevData => [...prevData, {id_card:customerIDCARD ,msisdn:inputAdd, type_select:'other'}]);
    };

    const handleDeleteRow = (msisdnToDelete: string) => {
        setMsisdnTable(prevData => prevData.map((row) => {
            if (row.msisdn === msisdnToDelete) {
              return {...row, type_select: "delete"};
            }
            return row;
          }));
    };

    const handleVerify = async () => {
        await fetch('/api/db-query/verify', {
            method: 'POST',
            body: JSON.stringify({ customerData: infoData, msisdnData: msisdnTable, ref_employee: employeeId }),
            
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    swal("ยืนยันข้อมูลสำเร็จ","กรุณาตรวจสอบข้อมูลอีกครั้ง", "success")
                } else {
                    swal("การยืนยันข้อมูลมีความผิดคลาด","กรุณารอการตรวจสอบ", "error")
                }
            })
            .catch((error) => {
                swal("การยืนยันข้อมูลมีความผิดคลาด","กรุณารอการตรวจสอบ", "error")
                console.error('Error:', error)
            });
    }

    const handleCheckFile = async () => {
        await fetch('/api/db-query/checkFileUpload', {
            method: 'POST',
            body: JSON.stringify({ id_card: customerIDCARD }),
            
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    setIsVerify(true)
                } else {
                    setIsVerify(false)
                }
            })
            .catch((error) => console.error('Error:', error));
        
    }
    const handlePrint = async () => {
        window.print();
        await fetch('/api/db-query/employeeInsert', {
            method: 'POST',
            body: JSON.stringify({ customerData: infoData, msisdnData: msisdnTable, ref_employee: employeeId }),
            
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    swal("บันทึกช้อมูลสำเร็จ","กรุณาตรวจสอบข้อมูลอีกครั้ง", "success")
                } else {
                    swal("บันทึกข้อมูลผิดพลาด","กรุณารอการตรวจสอบ", "error")
                }
            })
            .catch((error) => {
                swal("บันทึกข้อมูลผิดพลาด","กรุณารอการตรวจสอบ", "error")
                console.error('Error:', error)
            });
        await handleCheckFile();
    };
	
    return (
            <div className="w-full bg-white p-5 w-a4 h-a4 print:text-sm justify-center items-center shadow-md border-black">
                <div className="mb-2 w-full justify-between items-center flex flex-row">
                    <div className="text-red-500 text-xl print:hidden m-5 bottom-0">
                        <p>
                            *** นำเอกสาร พร้อมบัตรประชาชนตัวจริง ยืนยันตัวตนได้ที่ศูนย์บริการ NT ใกล้บ้าน 
                        สามารถค้นหาได้ที่ <a className="text-blue-500" href="https://www.ntplc.co.th/servicecenter" target="_blank">https://www.ntplc.co.th/servicecenter</a>
                        </p>
                    </div>
                    <div>
                        <Button className="print:hidden text-1xl" onPress={handlePrint} color="warning">พิมพ์เอกสาร และบันทึกข้อมูล</Button>
                    </div>
                </div>

                <div className="w-full bg-white text-black text-xl text-center rounded-md justify-center flex flex-row print:hidden">
                        <form id="information" className="p-0 m-0 w-full mb-5">
                            <div className="flex flex-row">
                                <Input className="mr-2 mb-2" value={infoData?.fname} id="fname" label="ชื่อ" isRequired onChange={handleFormInputChange}/>
                                <Input className="mr-2 mb-2" value={infoData?.lname} id="lname" label="นามสกุล" isRequired onChange={handleFormInputChange}/>
                                <Input className="mr-2 mb-2" value={infoData?.id_card} id="lname" label="หมายเลขบัตรประชาชน" isRequired isReadOnly onChange={handleFormInputChange}/>
                            </div>
                            <div className="flex flex-row">
                                <Input className="mr-2 mb-2" value={infoData?.address_1} id="address_1" label="บ้านเลขที่" isRequired onChange={handleFormInputChange}/>
                                <Input className="mr-2 mb-2" value={infoData?.address_2} id="address_2" label="อาคาร/หมู่บ้าน" onChange={handleFormInputChange}/>
                                <Input className="mr-2 mb-2" value={infoData?.address_3} id="address_3" label="ซอย" onChange={handleFormInputChange}/>
                                <Input className="mr-2 mb-2" value={infoData?.address_4} id="address_4" label="ถนน" onChange={handleFormInputChange}/>
                                <Input className="mr-2 mb-2" value={infoData?.address_5} id="address_5" label="จังหวัด" isRequired onChange={handleFormInputChange}/>
                                <Input className="mr-2 mb-2" value={infoData?.address_6} id="address_6" label="อำเภอ/เขต" isRequired onChange={handleFormInputChange}/>
                                <Input className="mr-2 mb-2" value={infoData?.address_7} id="address_7" label="ตำบล/แขวง" isRequired onChange={handleFormInputChange}/>
                                <Input className="mr-2 mb-2" value={infoData?.address_8} id="address_8" label="รหัสไปรษณีย์" isRequired onChange={handleFormInputChange}/>
                            </div>
                        </form>
                </div>
                <div className="flex flex-row w-full">
                    <div className="col-span-2 w-full print:hidden justify-center mb-5 mr-5">
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
                                            เบอร์โทรศัพท์ในระบบทั้งหมด {msisdnTable.filter(row => row.type_select === "owner" || row.type_select === "not_owned").length} เลขหมาย (กรุณาเลือกเบอร์ที่ถือครอง)
                                        </div>
                                        <div>
                                            <Checkbox className="" size="sm" onChange={handleCheckAll}>เลือกทั้งหมด</Checkbox>
                                        </div>
                                    </div>
                                </TableColumn>
                            </TableHeader>
                            <TableBody>
                            {msisdnTable && msisdnTable
                                .filter((row) => (row.type_select === 'owner' || row.type_select === 'not_owned'))
                                .map((row) => (
                                    <TableRow key={row.msisdn}>
                                        <TableCell>
                                            <Checkbox isSelected={row.type_select === 'owner'} size="sm" onChange={handleCheckbox} value={row.msisdn}>{row.msisdn}</Checkbox>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                            </TableBody>
                        </Table>
                    </div>
                    <div className="print:hidden w-full mb-5 flex flex-col">
                        <div className="w-full">
                            <table 
                                    className="font-nt text-black w-full"
                                    color="primary"
                                    aria-label="msisdn in system"
                                    id="other"
                                >
                                <thead>
                                    <tr>เบอร์ที่ถือครองอื่นๆ</tr>
                                </thead>
                                <tbody>
                                {msisdnTable && msisdnTable
                                    .filter((row) => (row.type_select === 'other'))
                                    .map((row) => (
                                        <tr key={row.msisdn}>
                                            <td className="flex flex-row justify-between content-center items-center print:hidden">
                                                {row.msisdn}                                        
                                            <Button className="ml-2" isIconOnly color="danger" onPress={() => handleDeleteRow(row.msisdn)}>
                                                -
                                            </Button>
                                            </td>
                                            
                                        </tr>
                                    ))
                                }
                                    <tr key="addbut">
                                        <td className="flex flex-row justify-between content-center items-center print:hidden">
                                            <Input size="sm" id="other_input" maxLength={10} type="text" onChange={handleInputChange}/>
                                            <Button className="ml-2" isIconOnly color="success" onPress={handleAddRow}>
                                                Add
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="text-red-500 print:hidden">*** กรณีสำหรับเบอร์ที่ถือครองอื่นๆ กรุณานำ SIM CARD ตัวจริงมายืนยันตัวตนที่ศูนย์บริการ NT</div>
                        <div className="print:hidden">
                            <Iframe className='w-full print:hidden' 
                            width="200px" 
                            height="325px"
                            id=""
                            scrolling="auto"
                            display="block"
                            position="relative"
                            url={url}
                            />
                        </div>
                    <div className="mb-5 print:hidden">
                        <Button className="self-end" fullWidth color="success" onPress={handleVerify} isDisabled={!isVerify}>
                            ยืนยันข้อมูลถูกต้อง
                        </Button>
                    </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
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
                                {msisdnTable && msisdnTable
                                    .filter((row) => (row.type_select === 'owner'))
                                    .map((row) => (
                                        <TableRow key={row.msisdn}>
                                            <TableCell>
                                                {row.msisdn}
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
                                {msisdnTable && msisdnTable
                                    .filter((row) => (row.type_select === 'not_owned'))
                                    .map((row) => (
                                        <TableRow key={row.msisdn}>
                                            <TableCell>
                                                {row.msisdn}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                                </TableBody>
                        </Table>
                    </div>
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
                            ข้าพเจ้า{infoData?.fname} {infoData?.lname}  ขอยืนยันการถือครองเลขหมายโทรศัพท์เคลื่อนที่ ขอยืนยันการถือครองเลขหมายโทรศัพท์เคลื่อนที่ จำนวน {msisdnTable.filter(row => row.type_select === "owner" || row.type_select === "other").length} เลขหมายและขอยืนยันความรับผิดชอบต่อการใช้งานเลขหมายที่ถือครองทุกเลขหมาย 
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
                                ({infoData?.fname} {infoData?.lname})
                            </p>
                        </div>
                    </div>
                    <h1 className="mt-10 mb-2">หมายเลขที่ยืนยันเป็นเจ้าของ</h1>
                    <div className="grid grid-cols-5">
                        {msisdnTable && msisdnTable
                        .filter((row) => (row.type_select === 'owner'))
                        .map((row) => (
                            <div className="mr-5" key={row.msisdn}>{row.msisdn}</div>
                        ))}
                    </div>
                    { msisdnTable.filter(row => row.type_select === "other").length > 0 && 
                        <>
                            <h1 className="mt-10 mb-2">เบอร์ที่ถือครองอื่นๆ</h1>
                            <div className="grid grid-cols-5">
                                {msisdnTable && msisdnTable
                                .filter((row) => (row.type_select === 'other'))
                                .map((row) => (
                                    <div className="mr-5" key={row.msisdn}>{row.msisdn}</div>
                                ))}
                            </div>
                        </>
                    }
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
