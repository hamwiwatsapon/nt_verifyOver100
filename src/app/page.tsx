"use client";
import NTlogo from "@/app/ui/NTlogo";
import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter()
  return (
    <NextUIProvider>
      <main className="flex min-h-screen min-w-screen w-full flex-col items-center justify-center p-24 bg-gradient-to-tr from-yellow-100 via-yellow-400 to-yellow-500">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-nt text-sm lg:flex flex-col">
          <NTlogo />
          <h1 className="mb-10 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl"> ระบบยืนยันตัวตนสำหรับผู้มีเบอร์โทรศัพท์หลายหมายเลข</h1>
          <div className="w-auto">
            <Button className="text-3xl m-5 text-center p-5" color="primary" onClick={() => router.push('/customer')}>
              สำหรับผู้ใช้บริการยืนยันตัวตน
            </Button>
            <Button className="text-3xl text-center w-150 m-5 p-5" color="danger" onClick={() => router.push('/employee')}>
              สำหรับพนักงาน
            </Button>
          </div>
        </div>
      </main>
    </NextUIProvider>
  )
}

export default Home;