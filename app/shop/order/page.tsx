"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { URL } from '@/service/resquest';
import Link from 'next/link';

interface BasketPageListType {
  basket: boolean;
  category_id: string;
  cost: number;
  count: number;
  discount: number;
  image_url: string[];
  liked: boolean;
  product_description: string;
  product_id: string;
  product_name: string;
  product_status: string;
  short_description: string;
  size: string[];
  tags: string[];
}


function Page() {
  const token = window.localStorage.getItem("token");
  const [basketPageList, setBasketPageList] = useState<BasketPageListType[]>([]);
  const [couponDiscount, setCouponDiscount] = useState<number>(0)
  const [couponBuy, setCouponBuy] = useState<string>("")

  useEffect(() => {
    axios.get(`${URL}/basket`, {
      params: {
        page: 1,
        limit: 100
      },
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(res => {
      setBasketPageList(res.data.ProductId);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [token]);
  

  const productDec = (productId: string) => {
    setBasketPageList((dec) =>
      dec.map((item) =>
        item.product_id === productId && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const productInc = (productId: string) => {
    setBasketPageList((inc) =>
      inc.map((item) =>
        item.product_id === productId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const couponApply = () => {
    if (couponBuy === 'DISCOUNT10') {
      setCouponDiscount(10);
    } else {
      setCouponDiscount(0);
    }
  };

  const basketSubtotal = basketPageList.reduce((acc, item) => acc + item.cost * item.count, 0);
  const basketTotal = basketSubtotal - couponDiscount + 16;


  return (
    <div className='container mx-auto'>
      <div className='flex justify-between'>
      <table className="mb-[200px]">
        <thead className="thead">
          <tr className='flex items-center'>
            <th className="text-[16px] leading-[16px] text-[#3D3D3D] font-medium">Products</th>
            <th className="text-[16px] leading-[16px] text-[#3D3D3D] font-medium ml-[258px]">Price</th>
            <th className="text-[16px] leading-[16px] text-[#3D3D3D] font-medium ml-[108px]">Quantity</th>
            <th className="text-[16px] leading-[16px] text-[#3D3D3D] font-medium ml-[97px]">Total</th>
            <th className="text-[16px] leading-[16px] text-[#3D3D3D] font-medium ml-[124px]"></th>
          </tr>
        </thead>
        <tbody className="tbody translate-y-[10px]">
          {basketPageList.map((item) => (
            <tr className='flex items-center justify-between pr-[26px] bg-[#FBFBFB]'>
              <td className='flex items-center gap-[14px] '>
                <Image src={item?.image_url[0]} alt="Image" width={70} height={70} />
                <td className='flex flex-col gap-1'>{item.product_name}
                  <p className='text-[16px] text-[#727272] font-normal'>SKU: 1995751877966</p>
                </td>
              </td>
              <td className='text-[16px] text-[#727272] font-medium'>${item.cost * item.count}.00</td>
              <td className='flex items-center gap-[14px]'>
                <button onClick={() => productDec(item.product_id)} className='w-[22px] h-[25px] bg-[#46A358] rounded-[50px] text-white text-center'>-</button>
                <button className='text-[#3D3D3D] text-[17px] font-normal leading-[10px]'>{item.count}</button>
                <button onClick={() => productInc(item.product_id)} className='w-[22px] h-[25px] bg-[#46A358] rounded-[50px] text-white text-center'>+</button>
              </td>
              <td className='text-[#46A358] text-[16px] font-bold leading-[16px]'>${item.cost * item.count}.00</td>
              <td>
                <button>
                  <Image src={'/delete.svg'} alt="Delete Image" width={24} height={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-[320px] flex flex-col'>
        <h2 className='text-[#3D3D3D] text-[18px] leading-[16px] font-bold'>Cart Totals</h2>
        <span className='w-full bg-[#46A358] h-[0.3px] opacity-50 block mt-[11px] mb-[11px]'></span>
        <p className='text-[#3D3D3D] text-[14px] leading-[16px] font-normal mb-[8px]'>Coupon Apply</p>
        <label className='flex relative border-[1px] border-[#46A358] rounded-l-[3px] items-center mb-[30px]'>
          <input onChange={(e) => setCouponBuy(e.target.value)} className='py-[12px] pl-[9px] pr-[52px] outline-none placeholder:text-[#A5A5A5] placeholder:text-[14px]' type="number" value={couponBuy} placeholder='Enter coupon code here...'/>
          <button onClick={couponApply} className='py-[15.9px] absolute right-0 text-white font-bold text-[15px] leading-[16px] pl-[35px] pr-[25px] rounded-r-[3px] bg-[#46A358] w-[102px]'>Apply</button>
        </label>
        <div className='flex items-center justify-between  mb-[15px]'>
          <p className='text-[#3D3D3D] text-[15px] leading-[16px] font-normal'>Subtotal</p>
          <span className='text-[#3D3D3D] text-[18px] leading-[16px] font-medium'>${basketSubtotal}.00</span>
        </div>
        <div className='flex items-center justify-between  mb-[21px]'>
          <p className='text-[#3D3D3D] text-[15px] leading-[16px] font-normal'>Coupon Discount</p>
          <span className='text-[#3D3D3D] text-[18px] leading-[16px] font-normal'>${couponDiscount}.00</span>
        </div>
        <label className=' flex flex-col justify-between mb-[26px]'>
          <div className='flex items-center justify-between'>
          <p className='text-[#3D3D3D] text-[15px] leading-[16px] font-normal'>Shiping</p>
          <span className='text-[#3D3D3D] text-[18px] leading-[16px] font-medium'>$16.00</span>
          </div>
          <p className='text-[#46A358] text-[12px] leading-[16px] font-normal mt-[8px]'>View shipping charge</p>
        </label>
        <div className='flex items-center justify-between  mb-[29px]'>
          <p className='text-[#3D3D3D] text-[16px] leading-[16px] font-bold'>Total</p>
          <span className='text-[#46A358] text-[18px] leading-[16px] font-bold'>${basketTotal}.00</span>
        </div>
        <Link href={"/shop/checkout"} className='text-[15px] text-[#fff] leading-[16px] font-bold py-[12px] text-center bg-[#46A358] rounded-[3px]  mb-[14px]'>Proceed To Checkout</Link>
        <Link href="/" className='text-[#46A358] font-normal text-[15px] leading-[16px] text-center'>Continue Shopping</Link>
      </div>
      </div>
      <div>
        <div className='container mx-auto'>
          <div className='flex mt-[127px] mb-[128px] flex-col'>
            <h2 className='text-[17px] text-[#46A358] font-bold leading-[16px]'>Releted Products</h2>
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
    </div>
  );
}

export default Page;
