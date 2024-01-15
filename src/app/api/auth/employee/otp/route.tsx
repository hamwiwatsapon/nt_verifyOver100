import { NextResponse } from "next/server";
import axios from 'axios';
import fs from 'fs';

export async function POST(req:Request) {
  const formData = await req.formData();
  const msisdn = formData.get('msisdn');
  const EmployeeId = formData.get('EmployeeId');
  let msisdn_cut = '';

  if (msisdn !== null) {
    msisdn_cut = msisdn?.toString().replace(/^0+/, '');
  }

  function genarateOTP() {
    let reference = '';
    let otp = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  
    // Generate 6 random digits
    for (let i = 0; i < 5; i++) {
      otp += Math.floor(Math.random() * 10); // generates a random number between 0-9
    }
  
    // Generate 2 random uppercase letters
    for (let i = 0; i < 5; i++) {
        reference += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    let timestamp = Date.now();
    return {otp: otp, reference:reference, timestamp:timestamp};
  }

  try {
    const url = `https://customerapi.cattelecom.com/app/customerapi/v200/search/customer?subscriber_number=${msisdn_cut}&is_active=true`
    const res = await axios.get(url, {headers: {apikey: process.env.PROD_API_KEY}});
    const resData = res.data;
    const idCardNumber = resData.customer_search[0].id_card_number;

    const time = new Date();
    const formattedTime = time.toLocaleString().replace(/T/, ' ').replace(/\..+/, '');

    const url_2 = `https://customerapi.cattelecom.com/app/customerapi/v200/search/customer/fetch?id_card_number=${idCardNumber}&is_active=true`
    const res_2 = await axios.get(url_2, {headers: {apikey: process.env.PROD_API_KEY}});
    const res2Data = res_2.data
    
    const OTP = genarateOTP();
    const message = `OTP=${OTP.otp} [Ref: ${OTP.reference}] Please verify in 5 minutes`
    if (res2Data) {
        const url = `http://10.100.75.4/motapi/smssoap.asmx?op=smssoap`
        const body = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
            <smssoap xmlns="http://microsoft.com/webservices/">
                <Username>rtcopr</Username>
                <Password>myRTC@brk</Password>
                <Sender>my</Sender>
                <Destination>${msisdn}</Destination>
                <Message>${message}</Message>
                <Lang>T</Lang>
            </smssoap>
            </soap:Body>
        </soap:Envelope>`
        const res = await axios.post(url, body,{headers: {"Content-Type": "text/xml; charset: utf-8"}})
        if (res.status === 200) {
          const log = `${formattedTime}|${EmployeeId}|EMPLOYEE|${msisdn}|SUCCESS\n`
          fs.appendFile('./log/login.log', log, () => {});
          // console.log(OTP)
          return NextResponse.json({ status: 200, otpData: OTP, customerData: res2Data});
        } 
        const log = `${formattedTime}|${EmployeeId}|EMPLOYEE|${msisdn}|INVALID\n`
        fs.appendFile('./log/login.log', log, () => {});
        return NextResponse.json({ status: 401 });
      }
  } catch (err) {
    const time = new Date();
    const formattedTime = time.toLocaleString().replace(/T/, ' ').replace(/\..+/, '');
    const log = `${formattedTime}|${EmployeeId}|EMPLOYEE|${msisdn}|ERROR\n`
    fs.appendFile('./log/login.log', log, () => {});
    return NextResponse.json({ status: 500 })
  }
}

