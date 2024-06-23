"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import '../app/globals.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { Button } from './Button';
interface CaruselListType {
    id: number;
    text: string;
    title: any;
    description: string;
}
export default function HeroCarusel() {
    const heroData = [
        {
            id: 1,
            text: "Welcome to GreenShop",
            title: <h2 className='mb-[5px] font-black text-[70px] leading-[70px] text-[#3D3D3D]'>Let's Make a Better <span className='text-[#46A358]'>Planet</span></h2>,
            description: "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!"
        },
        {
            id: 2,
            text: "Welcome to GreenShop",
            title: <h2 className='mb-[5px] font-black text-[70px] leading-[70px] text-[#3D3D3D]'>Let's Make a Better <span className='text-[#46A358]'>Planet</span></h2>,
            description: "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!"
        },
        {
            id: 3,
            text: "Welcome to GreenShop",
            title: <h2 className='mb-[5px] font-black text-[70px] leading-[70px] text-[#3D3D3D]'>Let's Make a Better <span className='text-[#46A358]'>Planet</span></h2>,
            description: "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!"
        }
    ]
    return (
        <>
            <div className='hidden md:block'>
                <Swiper pagination={{
                    dynamicBullets: true,
                }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }} modules={[Pagination, Autoplay]} className="mySwiper">
                    {heroData.map((item: CaruselListType) => (
                        <SwiperSlide key={item.id} className='pt-[68px] pb-[85px] flex items-center justify-start'>
                            <div className='w-[530px] text-left'>
                                <p className='mb-[7px] text-[14px] font-medium leading-[16px]'>{item.text}</p>
                                {item.title}
                                <p className='mb-[44px] font-normal text-[14px] leading-[24px]'>{item.description}</p>
                                <Button bgColor={false} buttonWidth={140} title='SHOP NOW' />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
