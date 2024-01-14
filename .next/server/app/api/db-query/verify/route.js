(()=>{var e={};e.id=141,e.ids=[141],e.modules={3878:e=>{function r(e){var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}r.keys=()=>[],r.resolve=r,r.id=3878,e.exports=r},517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},1808:e=>{"use strict";e.exports=require("net")},7282:e=>{"use strict";e.exports=require("process")},2781:e=>{"use strict";e.exports=require("stream")},1576:e=>{"use strict";e.exports=require("string_decoder")},9512:e=>{"use strict";e.exports=require("timers")},4404:e=>{"use strict";e.exports=require("tls")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},8023:(e,r,s)=>{"use strict";s.r(r),s.d(r,{headerHooks:()=>f,originalPathname:()=>$,patchFetch:()=>E,requestAsyncStorage:()=>c,routeModule:()=>_,serverHooks:()=>l,staticGenerationAsyncStorage:()=>p,staticGenerationBailout:()=>m});var t={};s.r(t),s.d(t,{POST:()=>u});var a=s(5419),d=s(9108),i=s(9678),o=s(8033),n=s(8070);async function u(e){let r=await e.json(),s=r?.customerData,t=r?.msisdnData;r?.ref_employee;try{let e=await o.createConnection({host:process.env.MYSQL_HOST,database:process.env.MYSQL_DB,user:process.env.MYSQL_USERNAME,password:process.env.MYSQL_PASSWORD});if(e){let r=`SELECT id_card FROM vf_report WHERE id_card = '${s?.id_card}'`,[a,d]=await e.execute(r);if(0===a.length){let r=`
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
          '${s?.id_card}', 
          '${s?.fname}', 
          '${s?.lname}', 
          '${s?.address_1}', 
          '${s?.address_2}', 
          '${s?.address_3}', 
          '${s?.address_4}', 
          '${s?.address_5}', 
          '${s?.address_6}', 
          '${s?.address_7}', 
          '${s?.address_8}', 
          'EMPLOYEE_APPROVE',
          '${s?.employeeId}'
        )`;for(let s of(await e.execute(r),t)){let r=`INSERT INTO vf_msisdn_in_report VALUES ('${s.id_card}', '${s.msisdn}', '${s.type_select}')`;await e.execute(r)}return await e.commit(),await e.end(),n.Z.json({status:200,response:"Insert"})}{let r=`
        UPDATE vf_report 
        SET 
          fname='${s?.fname}', 
          lname='${s?.lname}', 
          address_1='${s?.address_1}', 
          address_2='${s?.address_2}', 
          address_3='${s?.address_3}', 
          address_4='${s?.address_4}', 
          address_5='${s?.address_5}', 
          address_6='${s?.address_6}', 
          address_7='${s?.address_7}', 
          address_8='${s?.address_8}',
          verify_status='EMPLOYEE_APRROVE',
          ref_employee='${s?.employeeId}'
        WHERE id_card = '${s?.id_card}'`;for(let s of(await e.execute(r),t)){let r=`UPDATE vf_msisdn_in_report SET type_select = '${s.type_select}' WHERE id_card = '${s.id_card}' AND msisdn = '${s.msisdn}'`;await e.execute(r)}return await e.commit(),await e.end(),n.Z.json({status:200,response:"Update"})}}}catch(e){return console.log(e),n.Z.json({status:500,text:"Connection Error"})}}let _=new a.AppRouteRouteModule({definition:{kind:d.x.APP_ROUTE,page:"/api/db-query/verify/route",pathname:"/api/db-query/verify",filename:"route",bundlePath:"app/api/db-query/verify/route"},resolvedPagePath:"D:\\Billone\\NT\\nt_verifyOver100\\src\\app\\api\\db-query\\verify\\route.tsx",nextConfigOutput:"",userland:t}),{requestAsyncStorage:c,staticGenerationAsyncStorage:p,serverHooks:l,headerHooks:f,staticGenerationBailout:m}=_,$="/api/db-query/verify/route";function E(){return(0,i.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:p})}}};var r=require("../../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[638,206,146],()=>s(8023));module.exports=t})();