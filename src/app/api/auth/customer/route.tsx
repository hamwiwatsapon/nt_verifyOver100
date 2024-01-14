import { NextResponse } from "next/server";
import axios from 'axios';
import fs from 'fs';
export async function POST(req:Request) {
  const formData = await req.formData(); // call the function and await its result
  const idCardNumber = formData.get('idCardNumber'); // get id_card_number from form data
  const msisdn = formData.get('msisdn')

  let msisdn_cut = '';
  if (msisdn !== null) {
    msisdn_cut = msisdn.toString().replace(/^0+/, '');
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
    const url = `https://customerapi.cattelecom.com/app/customerapi/v200/search/customer?id_card_number=${idCardNumber}&is_active=true`
    const res = await axios.get(url, {headers: {apikey: process.env.PROD_API_KEY}})
    const resData = res.data
    const jsonFormData = JSON.stringify(resData)
    const OTP = genarateOTP();

    const message = `OTP=${OTP.otp} [Ref: ${OTP.reference}] Please verify in 5 minutes`
    if (resData && jsonFormData.search(msisdn_cut) >= 0) {
      const time = new Date();
      const formattedTime = time.toLocaleString().replace(/T/, ' ').replace(/\..+/, '');
      const log = `${formattedTime}|${idCardNumber}|CUSTOMER|${msisdn}|SUCCESS\n`
      fs.appendFile('./log/login.log', log, () => {});
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
        fs.appendFile('./log/login.log', log, () => {});
        //console.log(OTP)
        return NextResponse.json({ status: 200, otpData: OTP, customerData: resData});
      } 
      return NextResponse.json({ status: 401 });
    }
    const time = new Date();
    const formattedTime = time.toLocaleString().replace(/T/, ' ').replace(/\..+/, '');
    const log = `${formattedTime}|${idCardNumber}|CUSTOMER|${msisdn}|INVALID MSISDN\n`
    fs.appendFile('./log/login.log', log, () => {});
    return NextResponse.json({ status: 401 })
  } catch (err) {
    const time = new Date();
    const formattedTime = time.toLocaleString().replace(/T/, ' ').replace(/\..+/, '');
    const log = `${formattedTime}|${idCardNumber}|CUSTOMER|${msisdn}|INVALID IDCARD\n`
    fs.appendFile('./log/login.log', log, () => {});
    return NextResponse.json({ status: 500 })
  }
}
