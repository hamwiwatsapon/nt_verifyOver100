import { NextResponse } from "next/server";
import axios from 'axios';

// To handle a GET request to /api
export async function GET(req:Request) {
  // Do whatever you want
  // const { authData } = req.body;
  try {
    const url = "https://customerapi.cattelecom.com/dev/customerapi/v200/search/customer?id_card_number=3540200546643&is_active=true&service_types=[150]"
    const res = await axios.get(url, {headers: {apikey:"f0b378fc-c03e-42e2-af86-ce712e731c06"}})
    const resData = res.data
    const jsonForm = JSON.stringify(resData)
    if (resData && jsonForm.search("864969771") >= 0) {
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ status: 401 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' })
  }
    
}