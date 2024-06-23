import React, { useState } from 'react'
import { Nextimages } from '../Nextimages'
import Link from 'next/link'
import { BasketIcon, LikeIcon, SearchIcon } from '@/assets/Icon';
import axios from 'axios';
import { URL } from '@/service/resquest';
import toast, { Toaster } from 'react-hot-toast';

interface NextimagesType {
  item: any;
  setRefresh: (value: boolean) => void
  refresh: boolean
}

export const Product: React.FC<NextimagesType> = ({ item, setRefresh, refresh }) => {

  const handleLikeProductClick = (id: string) => {
    axios.post(`${URL}/like/${id}`, {}, {
      headers: {
        "Authorization": "Bearer " + window.localStorage.getItem("token")
      }
    }).then(res => {
        setRefresh(!refresh)
        toast.success("Saralanganlarga qo'shildi!")
    })
  }

  const handleBasketProductClick = (id: string) => {
    axios.post(`${URL}/basket`, {
      productId: id
    }, {
      headers: {
        "Authorization": "Bearer " + window.localStorage.getItem("token")
      }
    }).then(res => {
      toast.success("Ma'lumot saqlandi!")
      setRefresh(!refresh)
    })
  }

  return (
    <li className='w-[258px] inline-block'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='bg-[#FBFBFB] pt-[31px] pb-[19px] overflow-hidden product-cards-img relative'>
        <Link href={`/shop/${item?.product_id}`}>
          <Nextimages src={item.image_url ? item.image_url[0] : ""} alt='Product img' width={250} height={250} />
        </Link>
        <ul className='flex items-center gap-[10px] absolute duration-300 left-0 right-0 product-cards-list -bottom-[40px] mx-auto justify-center'>
          <li onClick={() => handleBasketProductClick(item.product_id)} className={`${item.basket ? "text-green-500" : "text-slate-800"} w-[35px] h-[35px] bg-slate-50 cursor-pointer rounded-md flex items-center justify-center`}>
            <BasketIcon />
          </li>
          <li onClick={() => handleLikeProductClick(item.product_id)} className={`w-[35px] h-[35px] bg-slate-50 rounded-md flex items-center justify-center ${item.liked ? "text-red-500" : "text-slate-800"}`}>
            <LikeIcon />
          </li>
          <li className='w-[35px] h-[35px] bg-slate-50 rounded-md flex items-center justify-center'>
            <SearchIcon />
          </li>
        </ul>
      </div>
      <h2 className='text-[16px] leading-[16px] text-[#3D3D3D] mt-[12px] mb-[6px]'>{item.product_name}</h2>
      <p className='text-[18px] leading-[16px] font-bold text-[#46A358]'>${item.cost}.00</p>

    </li>
  )
}
