import mysql2 from 'mysql2/promise';
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  const data = await req.json();
  const id_card = data?.id_card;

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
      const checkFile = `SELECT * FROM vf_file WHERE id_card = '${id_card}'`
      const [rowsFile, fieldsFile] = await db.execute(checkFile)
      const rowsFileData = rowsFile as mysql2.RowDataPacket[];
      await db.end();
      if (rowsFileData.length > 0) {
        return NextResponse.json({status: 200})
      } else {
        return NextResponse.json({status: 401})
      }
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json({ status: 500, text:"Connection Error"}); 
  }
  
}

