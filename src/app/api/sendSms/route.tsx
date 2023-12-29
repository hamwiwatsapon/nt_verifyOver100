import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req:Request) {
  const formData = await req.formData(); // call the function and await its result
  const msisdn = formData.get('msisdn')
  const genOtp = formData.get('genOtp')
  const genRef = formData.get('genRef')
  console.log(msisdn, genOtp, genRef)
  const message = `OTP=${genOtp} [หมายเลขอ้างอิง: ${genRef}] กรุณายืนยันตัวตนภายใน 5 นาที`
  try {
    const url = `http://10.100.75.4/motapi/smssoap.asmx?op=smssoap`
    const body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
        <smssoap xmlns="http://microsoft.com/webservices/">
            <Username>rtcopr</Username>
            <Password>myRTC@brk</Password>
            <Sender>my</Sender>
            <Destination>${msisdn}}</Destination>
            <Message>${message}</Message>
            <Lang>T</Lang>
        </smssoap>
        </soap:Body>
    </soap:Envelope>`
    
    const res = await axios.post(url, body,{headers: {"Content-Type": "text/xml; charset: utf-8"}})
    if (res.status === 200) {
      return NextResponse.json({ status: 200 });
    } 
    return NextResponse.json({ status: 401 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500, message: 'Internal server error', error: (err as any).message })
  }
}
