(()=>{var e={};e.id=149,e.ids=[149],e.modules={3878:e=>{function s(e){var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}s.keys=()=>[],s.resolve=s,s.id=3878,e.exports=s},517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},1808:e=>{"use strict";e.exports=require("net")},7282:e=>{"use strict";e.exports=require("process")},2781:e=>{"use strict";e.exports=require("stream")},1576:e=>{"use strict";e.exports=require("string_decoder")},9512:e=>{"use strict";e.exports=require("timers")},4404:e=>{"use strict";e.exports=require("tls")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},3326:(e,s,r)=>{"use strict";r.r(s),r.d(s,{headerHooks:()=>m,originalPathname:()=>f,patchFetch:()=>E,requestAsyncStorage:()=>c,routeModule:()=>u,serverHooks:()=>l,staticGenerationAsyncStorage:()=>p,staticGenerationBailout:()=>$});var t={};r.r(t),r.d(t,{POST:()=>_});var d=r(5419),a=r(9108),i=r(9678),o=r(8033),n=r(8070);async function _(e){let s=await e.json(),r=s?.customerData,t=s?.msisdnData,d=s?.ref_employee;try{let e=await o.createConnection({host:process.env.MYSQL_HOST,database:process.env.MYSQL_DB,user:process.env.MYSQL_USERNAME,password:process.env.MYSQL_PASSWORD});if(e){let s=`SELECT id_card FROM vf_report WHERE id_card = '${r?.id_card}'`,[a,i]=await e.execute(s);if(0===a.length){let s=`
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
          '${r?.id_card}', 
          '${r?.fname}', 
          '${r?.lname}', 
          '${r?.address_1}', 
          '${r?.address_2}', 
          '${r?.address_3}', 
          '${r?.address_4}', 
          '${r?.address_5}', 
          '${r?.address_6}', 
          '${r?.address_7}', 
          '${r?.address_8}', 
          'CUST_APPROVE',
          '${d}'
        )`;for(let r of(await e.execute(s),t)){let s=`INSERT INTO vf_msisdn_in_report VALUES ('${r.id_card}', '${r.msisdn}', '${r.type_select}')`;await e.execute(s)}return await e.commit(),await e.end(),n.Z.json({status:200,response:"Insert"})}{let s=`
        UPDATE vf_report 
        SET 
          fname='${r?.fname}', 
          lname='${r?.lname}', 
          address_1='${r?.address_1}', 
          address_2='${r?.address_2}', 
          address_3='${r?.address_3}', 
          address_4='${r?.address_4}', 
          address_5='${r?.address_5}', 
          address_6='${r?.address_6}', 
          address_7='${r?.address_7}', 
          address_8='${r?.address_8}',
          ref_employee='${d}'
        WHERE id_card = '${r?.id_card}'`;for(let r of(await e.execute(s),t))if("delete"===r.type_select){let s=`DELETE FROM vf_msisdn_in_report WHERE id_card = '${r.id_card}' AND msisdn = '${r.msisdn}'`;await e.execute(s)}else if("other"===r.type_select){let s=`INSERT INTO vf_msisdn_in_report (id_card, msisdn, type_select) VALUES ('${r.id_card}', '${r.msisdn}', '${r.type_select}')`;await e.execute(s)}else{let s=`UPDATE vf_msisdn_in_report SET type_select = '${r.type_select}' WHERE id_card = '${r.id_card}' AND msisdn = '${r.msisdn}'`;await e.execute(s)}return await e.commit(),await e.end(),n.Z.json({status:200,response:"Update"})}}}catch(e){return console.log(e),n.Z.json({status:500,text:"Connection Error"})}}let u=new d.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/db-query/employeeInsert/route",pathname:"/api/db-query/employeeInsert",filename:"route",bundlePath:"app/api/db-query/employeeInsert/route"},resolvedPagePath:"D:\\Billone\\NT\\nt_verifyOver100\\src\\app\\api\\db-query\\employeeInsert\\route.tsx",nextConfigOutput:"",userland:t}),{requestAsyncStorage:c,staticGenerationAsyncStorage:p,serverHooks:l,headerHooks:m,staticGenerationBailout:$}=u,f="/api/db-query/employeeInsert/route";function E(){return(0,i.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:p})}}};var s=require("../../../../webpack-runtime.js");s.C(e);var r=e=>s(s.s=e),t=s.X(0,[638,206,146],()=>r(3326));module.exports=t})();