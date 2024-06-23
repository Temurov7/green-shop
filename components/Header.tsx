"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { BasketIcon, FacebookIcon, GoogleIcon, HamburgerBtn, LoginIcon, SearchIcon } from '@/assets/Icon'
import { Button } from './Button'
import { usePathname } from 'next/navigation'
import { Badge, Input, Modal } from 'antd'
import axios from 'axios'
import { URL } from '@/service/resquest'
import toast, { Toaster } from 'react-hot-toast'
interface TypeLink {
    id: number;
    title: string;
    path: string;
    isActive: boolean;
}
function Header() {
    const token = window.localStorage.getItem("token")
    const pathname = usePathname()
    const [loginRegister, setLoginRegister] = useState<boolean>(false)
    const navList = [
        {
            id: 1,
            title: 'Home',
            path: '/',
            isActive: pathname == "/" ? true : false
        },
        {
            id: 2,
            title: 'Shop',
            path: '/shop',
            isActive: pathname == "/shop" ? true : false
        },
        {
            id: 3,
            title: 'Plant Care',
            path: '/plant',
            isActive: pathname == "/plant" ? true : false
        },
        {
            id: 4,
            title: 'Blogs',
            path: '/blogs',
            isActive: pathname == "/blogs" ? true : false
        }
    ]
    const [showSearchInput, setShowSearchInput] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const handleSearchChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value == "") {
            setTimeout(() => {
                setShowSearchInput(false)
            }, 2000)
        }
        console.log((e.target as HTMLInputElement).value);
    }
    const closeModal = (e: React.MouseEvent) => {
        if ((e.target as HTMLButtonElement).id == "modal-wrapper") {
            setOpenModal(false);
        }
    }
    const cancelModal = (e: React.MouseEvent) => {
        if ((e.target as HTMLButtonElement).id == "modal-cancel") {
            setOpenModal(false);
        }
    }

    const [isModalLoginCard, setIsModalLoginCard] = useState<string>("Login")

    const [addLoginEmail, setAddLoginEmail] = useState<string>("")
    const [addLoginPassword, setAddLoginPassword] = useState<string>("")

    // login start

    const loginModalCardOpen = () => {
        const data = {
            password: addLoginPassword,
            usernameoremail: addLoginEmail,
        }
        try {
            axios.post(`${URL}/login`, data).then(res => {
                window.localStorage.setItem("token", res.data.access_token)
                toast.success("Hello " + res.data.first_name)
                setLoginRegister(false)
                setAddLoginPassword("")
                setAddLoginEmail("")
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    // login end

    const [addRegisterEmail, setAddRegisterEmail] = useState<string>("")
    const [addRegisterFirstName, setAddRegisterFirstName] = useState<string>("")
    const [addRegisterLastName, setAddRegisterLastName] = useState<string>("")
    const [addRegisterPassword, setAddRegisterPassword] = useState<string>("")


    const registerModalCardOpen = () => {
        const data = {
            email: addRegisterEmail,
            firstName: addRegisterFirstName,
            lastName: addRegisterLastName,
            password: addRegisterPassword,
        }
        try {
            axios.post(`${URL}/register`, data).then(res => {
                setIsModalLoginCard("registerVerify")
                setAddLoginEmail(addRegisterEmail)
            })
        }
        catch (err) {
            console.log(err);

        }
    }

    //forgot start login

    const [forgotEmailLogin, setForgotEmailLogin] = useState<string>("")

    const forgotLoginBtnClick = () => {
        axios.post(`${URL}/forgot/${forgotEmailLogin}`).then(res => {
            setIsModalLoginCard("forgotVerify")
        })
    }

    //forgot end

    //Forgot OTP start
    const [forgotCardOtpCode, setForgotCardOtpCode] = useState<string>("")

    const forgotCardOtpBtnClick = () => {
        axios.post(`${URL}/verify`, {}, {
            params: {
                email: forgotEmailLogin,
                otp: forgotCardOtpCode,
            }
        }).then(res => {
            setAddLoginEmail(forgotEmailLogin)
            setIsModalLoginCard("createNewLogin")
        })
    }

    //Forgot OTP end

    // reset passsword start
    const [resetPasswordValue, setResetPasswordValue] = useState<string>("")

    const resetBtnClick = () => {
        const data = {
            email: forgotEmailLogin,
            new_password: resetPasswordValue,
            otp: forgotCardOtpCode
        }
            axios.put(`${URL}/reset-password`, data).then(res => {
                setIsModalLoginCard("Login")
            })
    }


    //reset password end

    // register verify  start

    const [registerVerifyCode, setRegisterVerifyCode] = useState<string>("")
    const registerVerifyBtnClick = () => {
        const data = {
            email: addRegisterEmail,
            code: registerVerifyCode,
        }
        try {
            axios.post(`${URL}/users/verify`, {}, {
                params: data
            }).then(res => {
                setIsModalLoginCard("Login")
                setAddRegisterEmail("")
                setAddRegisterFirstName("")
                setAddRegisterLastName("")
                setAddRegisterPassword("")
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    // register verify  end


    //Basket Part Start
    const [headerBasketList, setHeaderBasketList] = useState<any>()
    useEffect(() => {
        if (token) {
            axios.get(`${URL}/basket`, {
                params: {
                    page: 1,
                    limit: 100
                },
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(res => {
                setHeaderBasketList(res.data.ProductId)
            })
        }
    }, [])

    //Basket Part End

    return (
        <header className='pt-[41px]  md:pt-[25px]'>
            <Toaster position="top-center" reverseOrder={false} />
            <div className='container pb-[17px]  px-[24px] gap-[8px] md:gap-0 md:px-0 md:pb-0 flex items-center justify-between  border-b-[1px] border-[#A2D0AB]'>
                <Link className='pb-[17px] hidden md:block' href={'/'}>
                    <Image className='w-[150px] h-[34px]' src="/logo.svg" width={150} height={34} alt='Site Logo' priority={true} />
                </Link>
                <Navbar />
                <div className='hidden md:flex items-center pb-[17px] gap-[30px]'>
                    <button className='flex items-center' onClick={() => setShowSearchInput(true)}>
                        {!showSearchInput && <SearchIcon />}
                        <input onChange={handleSearchChangeInput} className={`${showSearchInput ? "py-[11px] pl-[41px] w-[300px]" : "w-[0px]"} search-input duration-300 outline-none focus:shadow text-[14px] font-normal leading-[16px] bg-[#F8F8F8] rounded-[10px]`} type="text" placeholder='Find your plants' name='plant-search' autoComplete='off' aria-label='Find your plants' />
                    </button>
                    <Badge style={{ color: "white", backgroundColor: "green" }} size='small' count={headerBasketList?.length}>
                        <Link href={'/shop/order'}>
                            <BasketIcon />
                        </Link>
                    </Badge>
                    <Button onClick={() => setLoginRegister(true)} bgColor={false} buttonWidth={100} title='Login' iconPosition='prev' icon={<LoginIcon />} />
                </div>
                <input className={`md:hidden py-[11px] pl-[41px] w-[90%] search-input duration-300 outline-none focus:shadow text-[14px] font-normal leading-[16px] bg-[#F8F8F8] rounded-[10px]`} type="text" placeholder='Find your plants' name='plant-search' autoComplete='off' aria-label='Find your plants' />
                <button onClick={() => setOpenModal(false)} className='md:hidden w-[45px] h-[45px] bg-[#46A358] rounded-[14px] flex items-center justify-center opacity-90'>
                    <HamburgerBtn />
                </button>
            </div>
            <div onClick={closeModal} id='modal-wrapper' className={`${openModal ? "left-0" : "left-[-100%]"} modal fixed duration-500 top-0 z-[2] backdrop-blur-md bg-transparent h-[100vh] w-full`}>
                <div className={`absolute w-[80%] h-[100vh] bg-[#61d077] duration-500 ${openModal ? "right-0" : "right-[-200%]"} p-10 flex flex-col gap-5`}>
                    <button onClick={() => setOpenModal(false)}>
                        <img src={"/x-square.svg"} alt="" width={40} height={40} />
                    </button>
                    {navList.map((item: TypeLink) => (
                        <Link onClick={() => setOpenModal(false)} key={item.id} className={`font-bold text-[30px] pb-[31px]   leading-[20.11px] text-white text-center`} href={item.path}>{item.title}</Link>
                    ))}
                </div>
            </div>
            <Modal open={loginRegister} onCancel={() => setLoginRegister(false)}>
                <div className='mt-[25px]'>
                    <ul className='flex items-center space-x-3 justify-center text-[22px] font-semibold'>
                        <li className={`${isModalLoginCard == "Login" ? "text-green-500" : ""}`} onClick={() => setIsModalLoginCard("Login")}>Login</li>
                        <li className='w-[2px] h-[16px] bg-black '></li>
                        <li className={`${isModalLoginCard == "Register" ? "text-green-500" : ""}`} onClick={() => setIsModalLoginCard("Register")}>Register</li>
                    </ul>
                </div>
                {isModalLoginCard == "Login" &&
                    <div className='flex flex-col mt-[53px] items-center'>
                        <p className='text-center text-[#3D3D3D] text-[13px] leading-[16px] mb-[14px]'>Enter your username and password to login.</p>
                        <input value={addLoginEmail} onChange={(e) => setAddLoginEmail(e.target.value)} className='w-[300px] outline-none rounded-[5px] border-[1px] border-[#EAEAEA] py-[12px] pl-[14px] font-normal text-[14px] mb-[17px] leading-[16px] placeholder:text-[#A5A5A5]' type="email" placeholder='almamun_uxui@outlook.com' />
                        <label className='flex flex-col justify-end'>
                            <input value={addLoginPassword} onChange={(e) => setAddLoginPassword(e.target.value)} className='w-[300px] outline-none rounded-[5px] border-[1px] border-[#EAEAEA] py-[12px] pl-[14px] font-normal text-[14px] mb-[14px] leading-[16px] placeholder:text-[#A5A5A5]' type="password" placeholder='***********' />
                            <button type='submit' onClick={() => setIsModalLoginCard("forgotEmail")} className='text-end flex items-end justify-end  text-[14px] text-[#46A358] leading-[16px] font-normal'>Forgot Password?</button>
                        </label>
                        <button onClick={loginModalCardOpen} className='w-[300px] rounded-[5px] border-none bg-[#46A358] text-[16px] text-white font-bold leading-[16px] py-[14px] text-center mt-[27px]'>Login</button>
                        <div className='flex w-[300px] items-center justify-between mt-[46px]'>
                            <span className='w-[101px] h-[1px] bg-[#EAEAEA] block'></span>
                            <p className='text-[#3D3D3D] text-[13px] font-normal leading-[16px]'>Or login with</p>
                            <span className='w-[101px] h-[1px] bg-[#EAEAEA] block'></span>
                        </div>
                        <div className='w-[300px] rounded-[5px] border-[1px] border-[#EAEAEA] py-[10px] flex items-center justify-center gap-[10px] mt-[27px]'>
                            <GoogleIcon />
                            <p className='text-[#727272] text-[13px] font-medium leading-[16px] text-center'>Login with Google</p>
                        </div>
                        <div className='w-[300px] rounded-[5px] border-[1px] border-[#EAEAEA] py-[10px] flex items-center justify-center gap-[10px] mt-[15px]'>
                            <FacebookIcon />
                            <p className='text-[#727272] text-[13px] font-medium leading-[16px] text-center'>Login with Facebook</p>
                        </div>
                    </div>
                }
                {isModalLoginCard == "Register" &&
                    <div className='flex flex-col mt-[53px] items-center'>
                        <p className='text-center text-[#3D3D3D] text-[13px] leading-[16px] mb-[14px]'>Enter your email and password to register.</p>
                        <input value={addRegisterEmail} onChange={(e) => setAddRegisterEmail(e.target.value)} className='w-[300px] outline-none rounded-[5px] border-[1px] border-[#EAEAEA] py-[12px] pl-[14px] font-normal text-[14px] mb-[17px] leading-[16px] placeholder:text-[#A5A5A5]' type="email" placeholder='Enter your email address' />
                        <input value={addRegisterFirstName} onChange={(e) => setAddRegisterFirstName(e.target.value)} className='w-[300px] outline-none rounded-[5px] border-[1px] border-[#EAEAEA] py-[12px] pl-[14px] font-normal text-[14px] mb-[14px] leading-[16px] placeholder:text-[#A5A5A5]' type="text" placeholder="First Name" />
                        <input value={addRegisterLastName} onChange={(e) => setAddRegisterLastName(e.target.value)} className='w-[300px] outline-none rounded-[5px] border-[1px] border-[#EAEAEA] py-[12px] pl-[14px] font-normal text-[14px] mb-[14px] leading-[16px] placeholder:text-[#A5A5A5]' type="text" placeholder="Last Name" />
                        <input value={addRegisterPassword} onChange={(e) => setAddRegisterPassword(e.target.value)} className='w-[300px] outline-none rounded-[5px] border-[1px] border-[#EAEAEA] py-[12px] pl-[14px] font-normal text-[14px] mb-[14px] leading-[16px] placeholder:text-[#A5A5A5]' type="password" placeholder="Password" />
                        <Button onClick={registerModalCardOpen} buttonWidth={320} title='Register' bgColor={false} />
                        <div className='flex w-[300px] items-center justify-between mt-[46px]'>
                            <span className='w-[101px] h-[1px] bg-[#EAEAEA] block'></span>
                            <p className='text-[#3D3D3D] text-[13px] font-normal leading-[16px]'>Or register with</p>
                            <span className='w-[101px] h-[1px] bg-[#EAEAEA] block'></span>
                        </div>
                        <div className='w-[300px] rounded-[5px] border-[1px] border-[#EAEAEA] py-[10px] flex items-center justify-center gap-[10px] mt-[27px]'>
                            <GoogleIcon />
                            <p className='text-[#727272] text-[13px] font-medium leading-[16px] text-center'>Continue with Google</p>
                        </div>
                        <div className='w-[300px] rounded-[5px] border-[1px] border-[#EAEAEA] py-[10px] flex items-center justify-center gap-[10px] mt-[15px]'>
                            <FacebookIcon />
                            <p className='text-[#727272] text-[13px] font-medium leading-[16px] text-center'>Continue with Facebook</p>
                        </div>
                    </div>
                }
                {isModalLoginCard == "forgotVerify" &&
                    <div className='flex flex-col items-center space-y-5'>
                        <Input.OTP value={forgotCardOtpCode} onChange={(e) => setForgotCardOtpCode(e)} length={6} size='large' />
                        <button type='submit' onClick={forgotCardOtpBtnClick} className='w-[300px] rounded-[5px] border-none bg-[#46A358] text-[16px] text-white font-bold leading-[16px] py-[14px] text-center mt-[27px]'>Enter your code</button>
                    </div>
                }
                {isModalLoginCard == "createNewLogin" && 
                        <div className='flex flex-col items-center space-y-5'>
                        <Input value={resetPasswordValue} onChange={(e) => setResetPasswordValue(e.target.value)} placeholder='Enter your new Password' size='large' />
                        <button type='submit' onClick={resetBtnClick} className='w-[300px] rounded-[5px] border-none bg-[#46A358] text-[16px] text-white font-bold leading-[16px] py-[14px] text-center mt-[27px]'>Get New Password</button>
                    </div>    
                }
                {isModalLoginCard == "forgotEmail" &&
                    <div className='flex flex-col items-center space-y-5'>
                        <Input value={forgotEmailLogin} onChange={(e) => setForgotEmailLogin(e.target.value)} placeholder='Enter your Email' size='large' />
                        <button type='submit' onClick={forgotLoginBtnClick} className='w-[300px] rounded-[5px] border-none bg-[#46A358] text-[16px] text-white font-bold leading-[16px] py-[14px] text-center mt-[27px]'>Send your Email code</button>
                    </div>
                }
                {isModalLoginCard == "registerVerify" &&
                    <div className='flex flex-col items-center space-y-5'>
                        <Input.OTP value={registerVerifyCode} onChange={(e) => setRegisterVerifyCode(e)} length={6} size='large' />
                        <button type='submit' onClick={registerVerifyBtnClick} className='w-[300px] rounded-[5px] border-none bg-[#46A358] text-[16px] text-white font-bold leading-[16px] py-[14px] text-center mt-[27px]'>Enter your code</button>
                    </div>
                }
            </Modal>
        </header>
    )
}

export default Header