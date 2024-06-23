"use client"
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface BasketItem {
  product_id: string;
  product_name: string;
  cost: number;
  count: number;
}

const Checkout: React.FC = () => {
  // const router = useRouter();
  // const { basketPageList, subtotal, total } = router.query;

  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [billingAdreess, setBillingAdreess] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    street: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
    differentAddress: false,
    orderNotes: ''
  });

  // useEffect(() => {
  //   if (basketPageList) {
  //     setBasket(JSON.parse(basketPageList as string));
  //   }
  // }, [basketPageList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBillingAdreess({ ...billingAdreess, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order placed:', billingAdreess);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-[21px]">Billing Adress</h1>
      <form className='flex justify-between items-start mb-[210px]' onSubmit={handleSubmit}>
        <div className="gap-[22px] w-[722px] flex flex-wrap">
          <div className='flex flex-col mb-[30px] w-[350px]'>
            <label>First Name *</label>
            <input type="text" name="firstName" value={billingAdreess.firstName} onChange={handleChange} className="border-[1px] border-[#EAEAEA] rounded-[3px] w-[350px] pl-[13px] py-[12px]" required />
          </div>
          <div className='flex flex-col mb-[30px] w-[350px]'>
            <label>Last Name *</label>
            <input type="text" name="lastName" value={billingAdreess.lastName} onChange={handleChange} className="border-[1px] border-[#EAEAEA] rounded-[3px] w-[350px] pl-[13px] py-[12px]" required />
          </div>
          <div className='flex flex-col mb-[30px] w-[350px]'>
            <label>Country / Region *</label>
            <select name="country" value={billingAdreess.country} onChange={handleChange} className="border-[1px] border-[#EAEAEA] rounded-[3px] w-[350px] pl-[13px] py-[12px]" required>
            </select>
          </div>
          <div className='flex flex-col mb-[30px] w-[350px]'>
            <label>Town / City *</label>
            <input type="text" name="city" value={billingAdreess.city} onChange={handleChange} className="border-[1px] border-[#EAEAEA] rounded-[3px] w-[350px] pl-[13px] py-[12px]" required />
          </div>
          <div className='flex flex-col mb-[30px] w-[350px]'>
            <label>Street Address *</label>
            <input type="text" name="street" value={billingAdreess.street} onChange={handleChange} className="border-[1px] border-[#EAEAEA] rounded-[3px] w-[350px] pl-[13px] py-[12px]" required />
          </div>
          <div className='flex flex-col mb-[30px] w-[350px]'>
            <label>Appartment</label>
            <input placeholder='Appartment, suite, unit, etc. (optional)' type="text" onChange={handleChange} className="border-[1px] border-[#EAEAEA] rounded-[3px] w-[350px] pl-[13px] py-[12px] " required />
          </div>
          <div className='flex flex-col mb-[30px] w-[350px]'>
            <label>State *</label>
            <select name="state" value={billingAdreess.state} onChange={handleChange} className="border-[1px] border-[#EAEAEA] rounded-[3px] w-[350px] pl-[13px] py-[12px]" required>
            </select>
          </div>
          <div className='flex flex-col mb-[30px] w-[350px]'>
            <label>Zip *</label>
            <input type="text" name="zip" value={billingAdreess.zip} onChange={handleChange} className="border-[1px] border-[#EAEAEA] rounded-[3px] w-[350px] pl-[13px] py-[12px]" required />
          </div>
          <div className='flex flex-col mb-[30px] w-[350px]'>
            <label>Email Address *</label>
            <input type="email" name="email" value={billingAdreess.email} onChange={handleChange} className="border-[1px] border-[#EAEAEA] rounded-[3px] w-[350px] pl-[13px] py-[12px]" required />
          </div>
          <div className='flex flex-col mb-[30px] w-[350px]'>
            <label>Phone Number *</label>
            <select name="phone" value={billingAdreess.phone} onChange={handleChange} className="border-[1px] border-[#EAEAEA] rounded-[3px] w-[78px] pl-[13px] py-[12px]">
              <option>+966</option>
            </select>
          </div>
          <div className="flex flex-col w-[350px] mt-[10px]">
            <label>Order Notes (optional)</label>
            <textarea name="orderNotes" value={billingAdreess.orderNotes} onChange={handleChange} className="border-[1px] border-[#EAEAEA] rounded-[3px] w-[350px] pl-[13px] py-[12px]" />
          </div>
        </div>
        <div className="mt-4 flex flex-col w-[405px]">
          <h2 className="text-[17px] text-[#3D3D3D] font-bold mb-[21px]">Your Order</h2>
          <div className='flex justify-between items-center mb-[11px]'>
            <h3 className='text-[#3D3D3D] text-[16px] font-medium'>Products</h3>
            <strong className='text-[#3D3D3D] text-[16px] font-medium'>Subtotal</strong>
          </div>
          <span className='w-full h-[0.3px] bg-[#46A358] bg-opacity-50 block mb-[11px]'></span>
          <table className="mb-[17px]">
            <thead className="thead">
              <tr className='flex items-center'>
              </tr>
            </thead>
            <tbody className="tbody translate-y-[10px]">
                <tr className='flex flex-col gap-[10px]'>
                  <td className='flex items-center gap-[14px] bg-[#FBFBFB]'>
                    <Image src={'/barberton.png'} alt="Image" width={70} height={70} />
                    <td className='flex flex-col gap-1'>Barberton Daisy
                      <p className='text-[16px] text-[#727272] font-normal'>SKU: 1995751877966</p>
                    </td>
                    <td className='text-[#727272] text-[14px] font-normal'>(x 2)</td>
                  <td className='text-[#46A358] text-[16px] font-bold leading-[16px]'>$238.00</td>
                  </td>
                  <td className='flex items-center gap-[14px] bg-[#FBFBFB]'>
                    <Image src={'/barberton.png'} alt="Image" width={70} height={70} />
                    <td className='flex flex-col gap-1'>Barberton Daisy
                      <p className='text-[16px] text-[#727272] font-normal'>SKU: 1995751877966</p>
                    </td>
                    <td className='text-[#727272] text-[14px] font-normal'>(x 2)</td>
                  <td className='text-[#46A358] text-[16px] font-bold leading-[16px]'>$238.00</td>
                  </td>
                  <td className='flex items-center gap-[14px] bg-[#FBFBFB]'>
                    <Image src={'/barberton.png'} alt="Image" width={70} height={70} />
                    <td className='flex flex-col gap-1'>Barberton Daisy
                      <p className='text-[16px] text-[#727272] font-normal'>SKU: 1995751877966</p>
                    </td>
                    <td className='text-[#727272] text-[14px] font-normal'>(x 2)</td>
                  <td className='text-[#46A358] text-[16px] font-bold leading-[16px]'>$238.00</td>
                  </td>
                </tr>
            </tbody>
          </table>
          <p className='flex justify-end mb-[19px]'>Have a coupon code? <b className='text-green-500 flex justify-end'>Click here</b></p>
          <div className='flex flex-col'>
            <div className="flex justify-between mb-[15px]">
              <span>Subtotal</span>
              <span>$2,683.00</span>
            </div>
            <div className="flex justify-between mb-[15px]">
              <span>Coupon Discount</span>
              <span>(-) 00.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shiping</span>
              <span>$16.00</span>
            </div>
            <p className='mt-[8px] text-[12px] text-green-500 mb-[17px] flex justify-end'>View shipping charge</p>
            <span className='w-full h-[0.3px] bg-[#46A358] bg-opacity-50 block mb-[16px] mx-auto'></span>
            <div className="flex justify-between font-bold mb-[47px]">
              <span className='text-[16px] font-bold text-black'>Total</span>
              <strong className='text-[18px] text-green-500 font-bold'>$2,699.00</strong>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-[19px]">Payment Method</h2>
            <div className="flex flex-col gap-2">
              <label className='w-[321px] flex gap-[10px]  border-[1px] border-[#EAEAEA] rounded-[3px] py-[12px] pl-[11px]'>
                <input type="radio" name="payment" value="paypal" required />
                <Image src={'/paypal.png'} alt="Image" width={224} height={26}  />
              </label>
              <label className='w-[321px] flex gap-[10px] border-[1px] border-[#EAEAEA] rounded-[3px] py-[12px] pl-[11px]'>
                <input type="radio" name="payment" value="card" required />
                Credit Card
              </label>
              <label className='w-[321px] flex gap-[10px] border-[1px] border-[#EAEAEA] rounded-[3px] py-[12px] pl-[11px]'>
                <input type="radio" name="payment" value="bank" required />
                Direct Bank Transfer
              </label>
              <label className='w-[321px] flex gap-[10px] border-[1px] border-[#EAEAEA] rounded-[3px] py-[12px] pl-[11px]'>
                <input type="radio" name="payment" value="cod" required />
                Cash on Delivery
              </label>
            </div>
          </div>
          <div className="mt-[49px]">
            <button type="submit" className="bg-green-500 text-white w-[321px] px-6 py-2 rounded">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
