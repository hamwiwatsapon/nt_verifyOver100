"use client";
import Image from 'next/image'

export default function NTlogo() {
  return (
    <Image 
      className='mb-5'
      src="/NT-logo.png"
      width={1000}
      height={1000} 
      alt="NT logo" 
    />
  );
}
