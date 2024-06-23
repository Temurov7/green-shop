import Image from 'next/image'
import React from 'react'

function Shop() {
  return (
    <div className='container mx-auto'>
      <div className='flex mt-[127px] mb-[128px] flex-col'>
      <h2 className='text-[17px] text-[#46A358] font-bold leading-[16px] mb-[12px]'>Releted Products</h2>
      <span className='w-full border-[0.3px] border-[#46A358] border-opacity-50 mb-[44px]'></span>
      <ul className='flex flex-wrap items-center gap-[37px]'>
        <li className='w-[219px] bg-[#FBFBFB] flex flex-col py-[6px] px-[14px]'>
          <Image src={'/beach.png'} className='mx-auto' width={190} height={243} alt='Beach img'/>
          <p className='text-[#3D3D3D] text-[15px] leading-[16px] mt-[12px]'>Beach Spider Lily</p>
          <span className='text-[#46A358] text-[16px] leading-[16px] font-bold mt-[5px]'>$129.00</span>
        </li>
        <li className='w-[220px] bg-[#FBFBFB] flex flex-col py-[6px] px-[14px]'>
          <Image src={'/blushing.png'} className='mx-auto' width={212} height={212} alt='Blushing img'/>
          <p className='text-[#3D3D3D] text-[15px] leading-[16px] mt-[12px]'>Blushing Bromeliad</p>
          <span className='text-[#46A358] text-[16px] leading-[16px] font-bold mt-[5px]'>$139.00</span>
        </li>
        <li className='w-[219px] bg-[#FBFBFB] flex flex-col py-[6px] px-[14px]'>
          <Image src={'/aluminum.png'} className='mx-auto' width={212} height={212} alt='Aluminum img'/>
          <p className='text-[#3D3D3D] text-[15px] leading-[16px] mt-[12px]'>Aluminum Plant</p>
          <span className='text-[#46A358] text-[16px] leading-[16px] font-bold mt-[5px]'>$179.00</span>
        </li>
        <li className='w-[219px] bg-[#FBFBFB] flex flex-col py-[6px] px-[14px]'>
          <Image src={'/nest.png'} className='mx-auto' width={213} height={213} alt='Nest Fern img'/>
          <p className='text-[#3D3D3D] text-[15px] leading-[16px] mt-[12px]'>Bird's Nest Fern</p>
          <span className='text-[#46A358] text-[16px] leading-[16px] font-bold mt-[5px]'>$99.00</span>
        </li>
        <li className='w-[219px] bg-[#FBFBFB] flex flex-col py-[6px] px-[14px]'>
          <Image src={'/chinese.png'} className='mx-auto' width={213} height={213} alt='Chinese img'/>
          <p className='text-[#3D3D3D] text-[15px] leading-[16px] mt-[12px]'>Chinese Evergreen</p>
          <span className='text-[#46A358] text-[16px] leading-[16px] font-bold mt-[5px]'>$39.00</span>
        </li>
      </ul>
         <Image src={'/ellipse.png'} className='mx-auto' width={56} height={12} alt='Ellipse img'/>
      </div>
    </div>
  )
}

export default Shop