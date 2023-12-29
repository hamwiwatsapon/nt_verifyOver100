"use client";
import { 
    Table, 
    TableHeader, 
    TableCell, 
    TableBody, 
    TableRow, 
    TableColumn 
} from "@nextui-org/table"
import { Input } from "@nextui-org/input"
interface IProps {
    data: string;
    msisdn: string;
}

const ResultForm: React.FC<IProps> = ({ data, msisdn }) => {
    const customerData = data.customerData;
    const customerName = customerData.customer_search[0].customer_full_name;
    const customerMsisdn = msisdn;
    return (
        <div className="grid grid-cols-4 gap-4 w-full sticky top-0">
            <div className="col-span-4 w-full bg-white text-black text-2xl text-center rounded-md">
                ข้อมูลของผู้ใช้: {customerName} หมายเลขโทรศัพท์: {customerMsisdn}
            </div>
            <div className="col-span-2 w-full">
                <Table 
                    className="font-nt text-black w-auto"
                    color="primary"
                    selectionMode="single" 
                    aria-label="msisdn in system"
                    
                >
                    <TableHeader>
                        <TableColumn>เบอร์โทรศัพท์ในระบบ</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Tony Reichert</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div>
            </div>
            <div>
                <Table 
                        className="font-nt text-black w-auto"
                        color="primary"
                        aria-label="msisdn in system"
                        
                    >
                        <TableHeader>
                            <TableColumn>เบอร์ที่ต้องการเพิ่มเข้าระบบ</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell><Input /></TableCell>
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
                    >
                        <TableHeader>
                            <TableColumn>หมายเลขที่เป็นเจ้าของ</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>0811631114</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>0811631114</TableCell>
                            </TableRow>
                        </TableBody>
                </Table>
            </div>
            <div>
                <Table 
                        className="font-nt text-black w-auto"
                        color="primary"
                        aria-label="msisdn in hand"
                        selectionMode="single" 
                    >
                        <TableHeader>
                            <TableColumn>หมายเลขที่ไม่เกี่ยวข้อง</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>0811631114</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>0811631114</TableCell>
                            </TableRow>
                        </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ResultForm;
