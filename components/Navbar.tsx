"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";

interface TypeLink {
    id: number;
    title: string;
    path: string;
    isActive: boolean;
}

export const Navbar = () => {
    const pathname = usePathname()
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
            isActive: pathname.includes("/shop") ? true : false
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
    return (
        <nav className="hidden md:block">
            <ul className="flex items-center gap-[50px]">
                {navList.map((item: TypeLink) => (
                    <Link key={item.id} className={`${item.isActive ? "font-bold border-b-[3.5px] text-[20px] border-[#46A358] " : "font-normal text-[16px]"} pb-[31px]   leading-[20.11px] text-[#3D3D3D]`} href={item.path}>{item.title}</Link>
                ))}
            </ul>
        </nav>
    )
}