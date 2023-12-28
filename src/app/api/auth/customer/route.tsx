import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req:Request) {
  const formData = await req.formData(); // call the function and await its result
  const idCardNumber = formData.get('idCardNumber'); // get id_card_number from form data
  const msisdn = formData.get('msisdn')
  const msisdn_cut = (msisdn.toString()).replace(/^0+/, '');
  try {
    const url = `https://customerapi.cattelecom.com/dev/customerapi/v200/search/customer?id_card_number=${idCardNumber}&is_active=true&service_types=[150]`
    const res = await axios.get(url, {headers: {apikey: process.env.DEV_API_KEY}})
    const resData = res.data
    const jsonForm = JSON.stringify(resData)
    if (resData && jsonForm.search(`${msisdn_cut}`) >= 0) {
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ status: 401 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error', error: (err as any).message })
  }
}
