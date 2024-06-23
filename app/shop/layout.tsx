"use client"
import { usePathname } from 'next/navigation';
import React from 'react'

function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()
    return (
        <div className='container'>
            <h2 className='py-[30px] font-bold text-[15px] leading-[16px] text-[#3D3D3D]'>Home <span className='font-normal'>/ Shop {pathname.includes("order") ? " / Shopping Cart" : ""}</span></h2>
            {children}
        </div>
    )
}

export default layout