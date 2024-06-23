"use client"
import { URL } from '@/service/resquest'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const page = ({ params }: any) => {
  // console.log(params);
  const id = params.id
  const [sinlgleShopData, setSingleShopData] = useState<any>({})
  const [activeShopImg, setActiveShopImg] = useState<string>("")
  useEffect(() => {
    axios.get(`${URL}/product/${id}`).then(res => {
      setSingleShopData(res.data);
      setActiveShopImg(res.data.image_url[0])
    })
  }, [])
  return (
    <div className='container mx-auto'>
      <div className='h-[444px] overflow-hidden flex p-1 mb-[92px]'>
        <div className='w-[9%] h-[444px] overflow-auto  cursor-pointer'>
          {sinlgleShopData?.image_url?.map((item: any, index: number) => (
            <div className='p-1 bg-[#FBFBFB]'>
              <Image className='active:border-[1px] active:border-[#46A358]' onClick={() => setActiveShopImg(item)} key={index} src={item} width={100} height={100} alt='Product Shop img' />
            </div>
          ))}
        </div>
        <div className='w-[80%] flex justify-between gap-[52px] ml-[29px]'>
          <div className='bg-[#FBFBFB] pt-[25px] pr-[23px] pb-[15px] pl-[17px]'>
            <Image src={activeShopImg} width={444} height={444} alt='Product Shop img' />
          </div>
          <div className='flex flex-col p-1 w-[573px]'>
            <h2 className='text-[#3D3D3D] font-bold text-[28px] leading-[16px] w-[222px]'>{sinlgleShopData?.product_name}</h2>
            <div className='mt-[21px] flex justify-between mb-[11px]'>
              <strong className='text-[#46A358] font-bold text-[22px] leading-[16px]'>${sinlgleShopData.cost}.00</strong>
              <Image src={'/stargroup.svg'} width={239} height={16} alt='StarGroup img' />
            </div>
            <span className='w-full h-[0.3px] bg-[#46A358] block opacity-50 mb-[15px]'></span>
            <div className='flex flex-col gap-[10px] mb-[24px]'>
              <p className='text-[#3D3D3D] font-medium text-[15px] leading-[16px]'>Short Description:</p>
              <p className='text-[#727272] text-[14px] font-normal leading-[24px]'>{sinlgleShopData.short_description}</p>
            </div>
            <div className='flex flex-col mb-[23px]'>
              <strong className='mb-[11px] font-medium text-[15px] leading-[16px] text-[#3D3D3D]'>Size:</strong>
              <div className='flex items-center gap-[10px]'>
                <span className='text-[#46A358] font-bold text-[18px] leading-[16px] w-[28px] h-[28px] py-[6px] text-center border-[1px] border-[#46A358] rounded-[50%]'>S</span>
                <span className='text-[#727272] font-medium text-[14px] leading-[16px] w-[28px] h-[28px] py-[6px] text-center border-[1px] border-[#727272] rounded-[50%]'>M</span>
                <span className='text-[#727272] font-medium text-[14px] leading-[16px] w-[28px] h-[28px] py-[6px] text-center border-[1px] border-[#727272] rounded-[50%]'>L</span>
                <span className='text-[#727272] font-medium text-[14px] leading-[16px] w-[28px] h-[28px] py-[6px] text-center border-[1px] border-[#727272] rounded-[50%]'>XL</span>
              </div>
            </div>
            <div>
              <div className='flex'>
                <div className='flex items-center gap-[22px]'>
                  <button className='w-[33px] h-[38px] bg-[#46A358] text-[#fff] rounded-[29px]'>-</button>
                  <button className='text-[#3D3D3D] text-[20px] leading-[10px] font-normal'>1</button>
                  <button className='w-[33px] h-[38px] bg-[#46A358] text-[#fff] rounded-[29px]'>+</button>
                </div>
                <div className='flex items-center gap-[10px] ml-[26px] mb-[24px]'>
                  <button className='w-[130px] rounded-[6px] bg-[#46A358] text-[#fff] py-[10px] text-center text-[14px] leading-[20px] font-bold'>Buy NOW</button>
                  <button className='w-[130px] rounded-[6px] bg-[#FFF] text-[#46A358] border-[1px] border-[#46A358] py-[10px] text-center text-[14px] leading-[20px] font-bold'>Add to cart</button>
                  <button className='w-[40px] h-[40px] rounded-[6px] bg-[#FFF] text-[#46A358] border-[1px] border-[#46A358] py-[10px] flex justify-center'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 18.8873C9.71527 18.8873 9.44077 18.7842 9.22684 18.5968C8.41888 17.8903 7.63992 17.2264 6.95267 16.6408L6.94916 16.6377C4.93423 14.9207 3.19427 13.4378 1.98364 11.9771C0.630341 10.3441 0 8.79578 0 7.10434C0 5.46097 0.563507 3.94485 1.58661 2.83508C2.62192 1.71219 4.04251 1.09375 5.58716 1.09375C6.74164 1.09375 7.79892 1.45874 8.72955 2.1785C9.19922 2.54181 9.62494 2.98645 10 3.5051C10.3752 2.98645 10.8008 2.54181 11.2706 2.1785C12.2012 1.45874 13.2585 1.09375 14.413 1.09375C15.9575 1.09375 17.3782 1.71219 18.4135 2.83508C19.4366 3.94485 20 5.46097 20 7.10434C20 8.79578 19.3698 10.3441 18.0165 11.9769C16.8059 13.4378 15.0661 14.9205 13.0515 16.6374C12.363 17.224 11.5828 17.8889 10.773 18.5971C10.5592 18.7842 10.2846 18.8873 10 18.8873ZM5.58716 2.26532C4.37363 2.26532 3.25882 2.74963 2.44781 3.62915C1.62476 4.52194 1.17142 5.75607 1.17142 7.10434C1.17142 8.52692 1.70013 9.79919 2.88559 11.2296C4.03137 12.6122 5.73563 14.0645 7.70889 15.7462L7.71255 15.7492C8.4024 16.3371 9.18442 17.0036 9.99832 17.7153C10.8171 17.0023 11.6003 16.3347 12.2916 15.7458C14.2647 14.0642 15.9688 12.6122 17.1146 11.2296C18.2999 9.79919 18.8286 8.52692 18.8286 7.10434C18.8286 5.75607 18.3752 4.52194 17.5522 3.62915C16.7413 2.74963 15.6264 2.26532 14.413 2.26532C13.524 2.26532 12.7078 2.54791 11.9872 3.10516C11.3449 3.60199 10.8975 4.23004 10.6352 4.66949C10.5003 4.89548 10.2629 5.03036 10 5.03036C9.73709 5.03036 9.49966 4.89548 9.36478 4.66949C9.10263 4.23004 8.65524 3.60199 8.01285 3.10516C7.29218 2.54791 6.47598 2.26532 5.58716 2.26532Z" fill="#46A358" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='flex flex-col gap-[10px] mb-[18px] mt-[24px]'>
                <p className='text-[15px] font-normal leading-[16px] text-[#727272]'>SKU: 1995751877966</p>
                <p className='text-[15px] font-normal leading-[16px] text-[#727272]'>Categories: Potter Plants</p>
                <p className='text-[15px] font-normal leading-[16px] text-[#727272]'>Tags: Home, Garden, Plants</p>
              </div>
              <div className='flex items-center gap-[16px]'>
                <strong className='text-[#3D3D3D] text-[15px] leading-[16px] font-medium'>Share this products:</strong>
                <div className='flex items-center gap-[16px]'>
                  <button>
                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.875 5H0V7.5H1.875V15H5V7.5H7.25L7.5 5H5V3.9375C5 3.375 5.125 3.125 5.6875 3.125H7.5V0H5.125C2.875 0 1.875 1 1.875 2.875V5Z" fill="#3D3D3D" />
                    </svg>
                  </button>
                  <button>
                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.71737 12.1908C10.378 12.1908 13.4736 7.50111 13.4736 3.4346C13.4736 3.30135 13.4709 3.1688 13.4647 3.03675C14.0656 2.60239 14.588 2.06021 15 1.44331C14.4486 1.6883 13.8552 1.85327 13.2327 1.92765C13.868 1.54669 14.356 0.94378 14.5861 0.225197C13.9914 0.577835 13.3329 0.834082 12.632 0.972271C12.0702 0.374134 11.2704 0 10.3855 0C8.68578 0 7.30747 1.37831 7.30747 3.07718C7.30747 3.31876 7.3346 3.55351 7.38715 3.77887C4.82962 3.65041 2.56162 2.42565 1.04392 0.563675C0.779318 1.01833 0.626969 1.54686 0.626969 2.11037C0.626969 3.17801 1.17034 4.12059 1.99658 4.67216C1.49176 4.65663 1.01748 4.51776 0.602743 4.2871C0.602061 4.2999 0.602061 4.31286 0.602061 4.32634C0.602061 5.81691 1.66305 7.06129 3.07104 7.3433C2.81257 7.41376 2.54063 7.45163 2.25982 7.45163C2.06158 7.45163 1.86879 7.43184 1.6813 7.39619C2.07301 8.61873 3.20923 9.5086 4.55632 9.53368C3.50284 10.3592 2.17588 10.8511 0.734108 10.8511C0.48588 10.8511 0.240893 10.8369 0 10.8084C1.36193 11.6812 2.97908 12.1908 4.71737 12.1908Z" fill="#3D3D3D" />
                    </svg>
                  </button>
                  <button>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.125 1.5625C3.125 2.4375 2.4375 3.125 1.5625 3.125C0.6875 3.125 0 2.4375 0 1.5625C0 0.6875 0.6875 0 1.5625 0C2.4375 0 3.125 0.6875 3.125 1.5625ZM3.125 4.375H0V14.375H3.125V4.375ZM8.125 4.375H5V14.375H8.125V9.125C8.125 6.1875 11.875 5.9375 11.875 9.125V14.375H15V8.0625C15 3.125 9.4375 3.3125 8.125 5.75V4.375Z" fill="#3D3D3D" />
                    </svg>
                  </button>
                  <button>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9 4.09091C7.30168 4.09091 4.98846 4.2365 3.51951 4.34356C3.03167 4.37911 2.65385 4.76529 2.65385 5.23696V5.76996L8.53304 8.85802C8.82344 9.01056 9.17656 9.01056 9.46697 8.85802L15.3462 5.76996V5.23696C15.3462 4.76529 14.9683 4.37911 14.4805 4.34356C13.0115 4.2365 10.6983 4.09091 9 4.09091ZM15.3462 7.01792L10.0273 9.81165C9.38843 10.1472 8.61157 10.1472 7.97268 9.81165L2.65385 7.01792V12.763C2.65385 13.2347 3.03167 13.6209 3.51951 13.6564C4.98846 13.7635 7.30168 13.9091 9 13.9091C10.6983 13.9091 13.0115 13.7635 14.4805 13.6564C14.9683 13.6209 15.3462 13.2347 15.3462 12.763V7.01792ZM3.43083 3.25588C4.90066 3.14876 7.25301 3 9 3C10.747 3 13.0993 3.14876 14.5692 3.25588C15.6676 3.33593 16.5 4.20441 16.5 5.23696V12.763C16.5 13.7956 15.6676 14.6641 14.5692 14.7441C13.0993 14.8512 10.747 15 9 15C7.25301 15 4.90066 14.8512 3.43083 14.7441C2.33237 14.6641 1.5 13.7956 1.5 12.763V5.23696C1.5 4.20441 2.33237 3.33593 3.43083 3.25588Z" fill="#3D3D3D" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mb-[127px]'>
        <div className='flex items-center gap-[30px] border-b-[0.3px] border-[#46A358]'>
          <div className='flex flex-col'>
            <h2 className='text-[#46A358] text-[17px] font-bold leading-[16px] mb-[12px]'>Product Description</h2>
            <span className='w-[161px] h-[3px] bg-[#46A358] block'></span>
          </div>
          <p className='text-[#3D3D3D] font-normal text-[17px] leading-[16px] mb-[12px]'>Reviews (19)</p>
        </div>
        <p className='mt-[18px] text-[14px] text-[#727272] leading-[24px] font-normal'>{sinlgleShopData.product_description}</p>
        <div className='flex flex-col mt-[18px]'>
          <h2 className='text-[#3D3D3D] text-[14px] leading-[24px] font-bold'>Living Room:</h2>
          <p className='text-[#727272] text-[14px] leading-[24px] font-normal'>The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className='flex flex-col mt-[18px]'>
          <h2 className='text-[#3D3D3D] text-[14px] leading-[24px] font-bold'>Dining Room:</h2>
          <p className='text-[#727272] text-[14px] leading-[24px] font-normal'>The benefits of houseplants are endless. In addition to cleaning the air of harmful toxins, they can help to improve your mood, reduce stress and provide you with better sleep. Fill every room of your home with houseplants and their restorative qualities will improve your life.</p>
        </div>
        <div className='flex flex-col mt-[18px]'>
          <h2 className='text-[#3D3D3D] text-[14px] leading-[24px] font-bold'>Office:</h2>
          <p className='text-[#727272] text-[14px] leading-[24px] font-normal'>The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>

      <div className='container mx-auto'>
        <div className='flex mt-[127px] mb-[128px] flex-col'>
          <h2 className='text-[17px] text-[#46A358] font-bold leading-[16px] mb-[12px]'>Releted Products</h2>
          <span className='w-full border-[0.3px] border-[#46A358] border-opacity-50 mb-[44px]'></span>
          <ul className='flex flex-wrap items-center gap-[37px]'>
            <li className='w-[219px] bg-[#FBFBFB] flex flex-col py-[6px] px-[14px]'>
              <Image src={'/beach.png'} className='mx-auto' width={190} height={243} alt='Beach img' />
              <p className='text-[#3D3D3D] text-[15px] leading-[16px] mt-[12px]'>Beach Spider Lily</p>
              <span className='text-[#46A358] text-[16px] leading-[16px] font-bold mt-[5px]'>$129.00</span>
            </li>
            <li className='w-[220px] bg-[#FBFBFB] flex flex-col py-[6px] px-[14px]'>
              <Image src={'/blushing.png'} className='mx-auto' width={212} height={212} alt='Blushing img' />
              <p className='text-[#3D3D3D] text-[15px] leading-[16px] mt-[12px]'>Blushing Bromeliad</p>
              <span className='text-[#46A358] text-[16px] leading-[16px] font-bold mt-[5px]'>$139.00</span>
            </li>
            <li className='w-[219px] bg-[#FBFBFB] flex flex-col py-[6px] px-[14px]'>
              <Image src={'/aluminum.png'} className='mx-auto' width={212} height={212} alt='Aluminum img' />
              <p className='text-[#3D3D3D] text-[15px] leading-[16px] mt-[12px]'>Aluminum Plant</p>
              <span className='text-[#46A358] text-[16px] leading-[16px] font-bold mt-[5px]'>$179.00</span>
            </li>
            <li className='w-[219px] bg-[#FBFBFB] flex flex-col py-[6px] px-[14px]'>
              <Image src={'/nest.png'} className='mx-auto' width={213} height={213} alt='Nest Fern img' />
              <p className='text-[#3D3D3D] text-[15px] leading-[16px] mt-[12px]'>Bird's Nest Fern</p>
              <span className='text-[#46A358] text-[16px] leading-[16px] font-bold mt-[5px]'>$99.00</span>
            </li>
            <li className='w-[219px] bg-[#FBFBFB] flex flex-col py-[6px] px-[14px]'>
              <Image src={'/chinese.png'} className='mx-auto' width={213} height={213} alt='Chinese img' />
              <p className='text-[#3D3D3D] text-[15px] leading-[16px] mt-[12px]'>Chinese Evergreen</p>
              <span className='text-[#46A358] text-[16px] leading-[16px] font-bold mt-[5px]'>$39.00</span>
            </li>
          </ul>
          <Image src={'/ellipse.png'} className='mx-auto' width={56} height={12} alt='Ellipse img' />
        </div>
      </div>
    </div>
  )
}

export default page
