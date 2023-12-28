import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req:Request) {
  const formData = await req.formData(); // call the function and await its result
  const idCardNumber = formData.get('idCardNumber'); // get id_card_number from form data
  try {
    const url = `https://customerapi.cattelecom.com/dev/customerapi/v200/search/customer?id_card_number=${idCardNumber}&is_active=true&service_types=[150]`
    const res = await axios.get(url, {headers: {apikey: process.env.DEV_API_KEY}})
    const resData = res.data
    const jsonForm = JSON.stringify(resData)
    if (resData) {
      return NextResponse.json({ data: jsonForm });
    }
    return NextResponse.json({ status: 401 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error', error: (err as any).message })
  }
}
