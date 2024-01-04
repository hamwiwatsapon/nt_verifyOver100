import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req:Request) {
  const formData = await req.formData();
  const EmployeeId = formData.get('EmployeeId');
  const url = `https://customerapi.cattelecom.com/app/customerapi/v200/user/${EmployeeId}`
  const res = await axios.get(url, {headers: {apikey: process.env.PROD_API_KEY}})
  return NextResponse.json({ status: res.status });
}

