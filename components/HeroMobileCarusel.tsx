"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import '../app/globals.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { Button } from './Button';
import { BtnArrowIcon } from '@/assets/Icon';
interface CaruselListType {
    id: number;
    text: string;
    title: any;
    description: string;
}
function HeroMobileCarusel() {
    const heroData = [
        {
            id: 1,
            text: "Welcome to GreenShop",
            title: <h2 className='mb-[3px] font-black text-[24px] leading-[29px] text-[#3D3D3D]'>Let's Make a Better <span className='text-[#46A358]'>Planet</span></h2>,
            description: "We are an online plant shop offering a wide range"
        },
        {
            id: 2,
            text: "Welcome to GreenShop",
            title: <h2 className='mb-[3px] font-black text-[24px] leading-[29px] text-[#3D3D3D]'>Let's Make a Better <span className='text-[#46A358]'>Planet</span></h2>,
            description: "We are an online plant shop offering a wide range"
        },
        {
            id: 3,
            text: "Welcome to GreenShop",
            title: <h2 className='mb-[3px] font-black text-[24px] leading-[29px] text-[#3D3D3D]'>Let's Make a Better <span className='text-[#46A358]'>Planet</span></h2>,
            description: "We are an online plant shop offering a wide range"
        }
    ]
    return (
        <div className='md:hidden'>
            <Swiper pagination={{
                dynamicBullets: true,
            }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }} modules={[Pagination, Autoplay]} className="mySwiper">
                {heroData.map((item: CaruselListType) => (
                    <SwiperSlide key={item.id} className='hero-mobile-banner pt-[23px] pb-[26px] flex items-center justify-start'>
                        <div className='w-[206px] text-left'>
                            <p className='mb-[7px] text-[11px] font-medium leading-[16px]'>{item.text}</p>
                            {item.title}
                            <p className='mb-[10px] font-normal text-[12px] leading-[18px]'>{item.description}</p>
                            <Button bgColor={true} buttonWidth={88} iconPosition='next' icon={<BtnArrowIcon />} title='SHOP NOW' />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default HeroMobileCarusel