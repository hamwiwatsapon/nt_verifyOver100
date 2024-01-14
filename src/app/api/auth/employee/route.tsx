import { NextResponse } from "next/server";
import axios from 'axios';
import fs from 'fs';

export async function POST(req:Request) {
  const formData = await req.formData();
  const EmployeeId = formData.get('EmployeeId');
  const url = `https://customerapi.cattelecom.com/app/customerapi/v200/user/${EmployeeId}`
  try {
    const res = await axios.get(url, {headers: {apikey: process.env.PROD_API_KEY}})
    const time = new Date();
    const formattedTime = time.toLocaleString().replace(/T/, ' ').replace(/\..+/, '');
    const log = `${formattedTime}|${EmployeeId}|EMPLOYEE|SUCCESS\n`
    fs.appendFile('./log/login.log', log, () => {});
    return NextResponse.json({ status: res.status });
  } catch (err) {
    const time = new Date();
    const formattedTime = time.toLocaleString().replace(/T/, ' ').replace(/\..+/, '');
    const log = `${formattedTime}|${EmployeeId}|EMPLOYEE|INVALID MSISDN\n`
    fs.appendFile('./log/login.log', log, () => {});
    return NextResponse.json({ status: 500, err: err });
  }
}

