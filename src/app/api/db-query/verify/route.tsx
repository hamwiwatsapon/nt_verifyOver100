import mysql2 from 'mysql2/promise';
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  const data = await req.json();
  const customerData = data?.customerData;
  const ref_employee = data?.ref_employee
  const rawMsisdnData = data?.msisdnData;
  const cleanData = new Set(rawMsisdnData);
  const msisdnData = [...cleanData]
  try {
    const db = await mysql2.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    })
  
    if (db) {
      const query = `SELECT id_card FROM vf_report WHERE id_card = '${customerData?.id_card}'`
      const [rows, fields] = await db.execute(query)
      const rowsData = rows as mysql2.RowDataPacket[];
      if (rowsData.length === 0) {
        const insert = `
        INSERT INTO vf_report 
        (
          id_card, 
          fname, 
          lname, 
          address_1, 
          address_2, 
          address_3, 
          address_4, 
          address_5, 
          address_6, 
          address_7, 
          address_8, 
          verify_status,
          ref_employee
        ) VALUES (
          '${customerData?.id_card}', 
          '${customerData?.fname}', 
          '${customerData?.lname}', 
          '${customerData?.address_1}', 
          '${customerData?.address_2}', 
          '${customerData?.address_3}', 
          '${customerData?.address_4}', 
          '${customerData?.address_5}', 
          '${customerData?.address_6}', 
          '${customerData?.address_7}', 
          '${customerData?.address_8}', 
          'EMPLOYEE_APPROVE',
          '${ref_employee}'
        )`
        await db.execute(insert)
        for (let row of msisdnData) {
          const insertMsisdn = `INSERT INTO vf_msisdn_in_report VALUES ('${row.id_card}', '${row.msisdn}', '${row.type_select}')`;
          await db.execute(insertMsisdn);
        }
        await db.commit();
        await db.end();
        return NextResponse.json({ status: 200, response:"Insert"});
      } else {
        const update = `
        UPDATE vf_report 
        SET 
          fname='${customerData?.fname}', 
          lname='${customerData?.lname}', 
          address_1='${customerData?.address_1}', 
          address_2='${customerData?.address_2}', 
          address_3='${customerData?.address_3}', 
          address_4='${customerData?.address_4}', 
          address_5='${customerData?.address_5}', 
          address_6='${customerData?.address_6}', 
          address_7='${customerData?.address_7}', 
          address_8='${customerData?.address_8}',
          verify_status='EMPLOYEE_APRROVE',
          ref_employee='${ref_employee}'
        WHERE id_card = '${customerData?.id_card}'`
        await db.execute(update)

        for (let row of msisdnData) {
          const updateMsisdn = `UPDATE vf_msisdn_in_report SET type_select = '${row.type_select}' WHERE id_card = '${row.id_card}' AND msisdn = '${row.msisdn}'`;
          await db.execute(updateMsisdn);
        }

        await db.commit();
        await db.end();
        return NextResponse.json({ status: 200, response:"Update"}); 
      } 
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json({ status: 500, text:"Connection Error"}); 
  }
  
}

