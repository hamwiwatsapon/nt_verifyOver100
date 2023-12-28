import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req:Request) {
  const formData = await req.formData(); // call the function and await its result
  const msisdn = formData.get('msisdn')
  const otpGen = formData.get('otpGen')
  const refGen = formData.get('refGen')
  const message = `OTP=${otpGen} [รหัสอ้างอิง:${refGen}] กรุณายืนยันตัวตนภายใน 5 นาที`
  try {
    const url = `http://10.100.75.4/motapi/smssoap.asmx?op=smssoap`
    const res = await axios.post(
      url, 
      {body: `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <smssoap xmlns="http://microsoft.com/webservices/">
            <Username>rtcopr</Username>
            <Password>myRTC@brk</Password>
            <Sender>my</Sender>
            <Destination>'${msisdn}'</Destination>
            <Message>'${}'</Message>
            <Lang>T</Lang>
          </smssoap>
        </soap:Body>
      </soap:Envelope>`}
      )
    const resData = res.data
    const jsonForm = JSON.stringify(resData)
    if (resData && jsonForm.search(`${msisdn}`) >= 0) {
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ status: 401 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error', error: (err as any).message })
  }
}
