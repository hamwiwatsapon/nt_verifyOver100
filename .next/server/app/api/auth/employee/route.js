"use strict";(()=>{var e={};e.id=397,e.ids=[397],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9491:e=>{e.exports=require("assert")},2361:e=>{e.exports=require("events")},7147:e=>{e.exports=require("fs")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},2037:e=>{e.exports=require("os")},1017:e=>{e.exports=require("path")},2781:e=>{e.exports=require("stream")},6224:e=>{e.exports=require("tty")},7310:e=>{e.exports=require("url")},3837:e=>{e.exports=require("util")},9796:e=>{e.exports=require("zlib")},7172:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>h,originalPathname:()=>q,patchFetch:()=>v,requestAsyncStorage:()=>c,routeModule:()=>l,serverHooks:()=>d,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>x});var o={};r.r(o),r.d(o,{POST:()=>n});var a=r(5419),s=r(9108),u=r(9678),p=r(8070),i=r(3567);async function n(e){let t=(await e.formData()).get("EmployeeId"),r=`https://customerapi.cattelecom.com/app/customerapi/v200/user/${t}`,o=await i.Z.get(r,{headers:{apikey:process.env.PROD_API_KEY}});return p.Z.json({status:o.status})}let l=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/auth/employee/route",pathname:"/api/auth/employee",filename:"route",bundlePath:"app/api/auth/employee/route"},resolvedPagePath:"D:\\Billone\\NT\\nt_verifyOver100\\src\\app\\api\\auth\\employee\\route.tsx",nextConfigOutput:"",userland:o}),{requestAsyncStorage:c,staticGenerationAsyncStorage:m,serverHooks:d,headerHooks:h,staticGenerationBailout:x}=l,q="/api/auth/employee/route";function v(){return(0,u.patchFetch)({serverHooks:d,staticGenerationAsyncStorage:m})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[638,721],()=>r(7172));module.exports=o})();