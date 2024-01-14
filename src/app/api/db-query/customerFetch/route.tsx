import mysql2 from 'mysql2/promise';
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  const data = await req.json();
  const customerData = data?.customerData;

  interface connection {
    host: string,
    port: number,
    database: string,
    user: string,
    password: string
  }

  try {
    const db = await mysql2.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    })
  
    if (db) {
      const report = `SELECT * FROM vf_report WHERE id_card = '${customerData?.id_card}'`
      const [rowsReport, fieldsReport] = await db.execute(report)
      const rowsReportData = rowsReport as mysql2.RowDataPacket[];
      const msisdnList = `SELECT * FROM vf_msisdn_in_report WHERE id_card = '${customerData?.id_card}'`
      const [rowsMsisdn, fieldsMsisdn] = await db.execute(msisdnList)
      const rowsMsisdnData = rowsMsisdn as mysql2.RowDataPacket[];
      await db.end();
      if (rowsReportData.length > 0 && rowsMsisdnData.length > 0) {
        return NextResponse.json({status: 200, msisdnData: rowsMsisdnData, customerData: rowsReportData})
      } else {
        return NextResponse.json({status: 404})
      }
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json({ status: 500, text:"Connection Error"}); 
  }
  
}

