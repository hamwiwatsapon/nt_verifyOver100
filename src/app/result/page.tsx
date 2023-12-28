"use client";
import NTlogo from "@/app/ui/NTlogo";
import { NextUIProvider } from "@nextui-org/react";
import { unstable_noStore as noStore } from 'next/cache';
import { useRouter } from "next/navigation";
const result = () => {
  noStore();
  route = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    let formData = new FormData();
    fetch('/api/fetchData', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        console.log("DATA")
      } else {
        console.log("FAIL")
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  
  
  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-tr from-yellow-100 via-yellow-400 to-yellow-500">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-nt text-sm lg:flex flex-col">
          <NTlogo />
          <h1 className="mb-10 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl"> ระบบยืนยันตัวตนสำหรับผู้มีเบอร์โทรศัพท์หลายหมายเลข</h1>
          <div>
          </div>
        </div>
      </main>
    </NextUIProvider>
  )
}

export default result;