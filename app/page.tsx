"use client"
import HeroCarusel from "@/components/HeroCarusel";
import HeroMobileCarusel from "@/components/HeroMobileCarusel";
import { RangeSlider } from "@/components/RangeSlider";
import { URL } from "../service/resquest";
import axios from "axios";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import TabsList from "@/components/TabsList";
import { Product } from "@/components/Product/Product";
import { Pagination, Popover } from "antd";
import { BlogPostsCard } from "@/components/BlogPostsCard";
import { Button } from "@/components/Button";
import Image from "next/image";
import { RightArrowVector } from "@/assets/Icon";
interface CategoryListType {
  category_id: string;
  category_name: string;
}

interface sizeTypeCategory {
  size_id: number;
  size_name: string;
}

interface TagNavbarType {
  tag_id: number;
  tag_name: string;
  path:string | null;
}

function Home() {
  const token = window.localStorage.getItem("token");
  const [arrow, setArrow] = useState('Show');
  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  const [categoryList, setCategoryData] = useState<Array<CategoryListType>>([])
  const sizecategoryList: sizeTypeCategory[] = [
    {
      size_id: 1,
      size_name: "Small",
    },
    {
      size_id: 2,
      size_name: "Medium",
    },
    {
      size_id: 3,
      size_name: "Large",
    },
  ]
  const tagNavbar: TagNavbarType[] = [
    {
      tag_id: 1,
      tag_name: "All Plants",
      path:null
    },
    {
      tag_id: 2,
      tag_name: "New Arrivals",
      path:"new-arrival"
    },
    {
      tag_id: 3,
      tag_name: "Sale",
      path:"sale"
    }
  ]
  const [plantProduct, setPlantProduct] = useState<Array<any>>([])
  const [tagNavbarId, setTagNavbarId] = useState<string | null>("")
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [sizeCategoryId, setSizeCategoryId] = useState<string | null>(null)
  const [sizeRangeValue, setSizeRangeValue] = useState<Array<number> | null | string>(null)
  const [sortCategoryProduct, setSortCategoryProduct] = useState("")
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)


  useEffect(() => {
    axios.get(`${URL}/categories?page=1&limit=100`).then(res => {
      setCategoryData(res.data.categories)
    })
  }, [])

  useEffect(() => {
    axios.get(`${URL}/products`, {
      params: {
        page: page,
        limit: 10,
        name: null,
        category: categoryId,
        size: sizeCategoryId,
        status:tagNavbarId,
        min_price: sizeRangeValue ? sizeRangeValue[0] : null,
        max_price: sizeRangeValue ? sizeRangeValue[1] : null,
      },
      headers: token ? {
        "Authorization": "Bearer " + token
      } : {}
    })
      .then(res => {
        setIsLoading(false)
        setLimit(res.data.total_count)
        setPlantProduct(res.data.products)
      })
      .catch(err => {
        setIsLoading(false)
      })
  }, [categoryId, sizeCategoryId, sizeRangeValue, tagNavbarId, page, refresh])


  return (
    <>
      <section className="pt-[12px] pb-[46px]">
        <div className="container px-5 md:px-0">
          <HeroCarusel />
          <HeroMobileCarusel />
        </div>
      </section>
      <section className="mb-[94px]">
        <div className="container">
          <div className="flex justify-between gap-[50px]">
            <div className="w-[25%] bg-[#FBFBFB]">
              <div className="px-[15px] pt-[14px]">
                <h2 className="text-[18px] font-bold leading-[16px]">Categories</h2>
                <ul className="pl-[12px] flex flex-col gap-[15px] mt-[20px] mb-[36px]">
                  {categoryList &&
                    Array.isArray(categoryList) &&
                    categoryList.length > 0 &&
                    categoryList.map((item: CategoryListType) => (
                      <li
                        onClick={() => {
                          setIsLoading(true)
                          setTimeout(() => {
                            setCategoryId(item.category_name)
                          }, 500);
                        }}
                        className={`flex items-center justify-between cursor-pointer ${categoryId == item.category_name
                          ? "text-[#46A358] font-bold" : ""}`}
                        key={item.category_id}>
                        <span>{item.category_name}</span>
                      </li>
                    ))}
                </ul>
                <h2 className="text-[18px] font-bold leading-[16px] mb-[20px]">Price Range</h2>
                <RangeSlider setSizeRangeValue={setSizeRangeValue}/>
                <h2 className="text-[18px] font-bold leading-[16px] mt-[46px]">Size</h2>
                <ul className="pl-[12px] flex flex-col gap-[15px] mt-[20px] mb-[36px]">
                  {sizecategoryList?.map((item: sizeTypeCategory) => (
                    <li
                      onClick={() => setSizeCategoryId(item.size_name)}
                      className={`flex items-center justify-between cursor-pointer ${sizeCategoryId == item.size_name ? "text-[#46A358] font-bold" : ""}`} key={item.size_id}>
                      <span>{item.size_name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={"#"}>
                <img src="/plant-aside.png" alt="Plant Aside" width={480} height={470} />
              </Link>
            </div>
            <div className="w-[75%]">
              <div className="flex items-center justify-between">

                <ul className="flex items-center gap-[37px] ">
                  {tagNavbar.map((item: TagNavbarType) => (
                    <li
                      className={`cursor-pointer 
                      ${tagNavbarId == item.path ? "text-[#46A358] text-[15px] font-bold" : ""

                        }`}
                      onClick={() => {
                        setIsLoading(true)
                        setTimeout(() => {
                          setTagNavbarId(item.path)
                        }, 500);
                      }}
                      key={item.tag_id}
                    >
                      {item.tag_name}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center">
                  Short by:
                  <Popover placement="bottom" title={""} content={<ul className="space-y-3 w-[100px] text-center">
                    <li className="hover:scale-110 duration-300 hover:font-semibold cursor-pointer">Title sort</li>
                    <li className="hover:scale-110 duration-300 hover:font-semibold cursor-pointer">Price sort</li>
                  </ul>} arrow={mergedArrow}>
                    <h2>Default sorting</h2>
                  </Popover>
                </div>
              </div>
              <ul className="mt-[31px] flex gap-[30px] flex-wrap">
                {isLoading
                  ? "Loading...."
                  : plantProduct?.length
                    ? plantProduct.map((item:any) => (
                      <Product refresh={refresh} setRefresh={setRefresh} key={item.product_id} item={item}/>
                    )) : "Empty...."}
              </ul>
              <div className="mt-[90px] flex justify-end">
                <Pagination onChange={(e) => {
                  setIsLoading(true)
                  setTimeout(() => {
                    setPage(e)
                  }, 500);
                }} defaultCurrent={page} total={limit} />
              </div>
            </div>
          </div>
        </div>
      </section>







      <section className="mb-[138px]">
        <div className="container flex items-center justify-between">
          <div className="w-[586px] relative bg-[#FBFBFB] flex flex-col items-center">
            <Image className="absolute left-0 top-0 bottom-0 my-auto" src={"/summerCactusImage.png"} alt="Summer Cactus img" width={292} height={292} />
            <div className="w-[292px] flex flex-col items-end bg-[#FBFBFB] mr-[-50%] pt-[37px] pb-[46px] pr-[30px] text-right">
              <h2 className="mb-[10px] text-[#3D3D3D] font-black text-[18px] leading-6 ">SUMMER CACTUS & SUCCULENTS</h2>
              <p className="text-[#727272] mb-[12px] text-[14px] leading-6">We are an online plant shop offering a wide range of cheap and trendy plants</p>
              <Button buttonWidth={140} title="Find More" bgColor={false} icon={<RightArrowVector />} iconPosition="next" />
            </div>
          </div>

          <div className="w-[586px] relative bg-[#FBFBFB] mb-[50px] flex flex-col items-center">
            <Image className="absolute left-0 top-0 bottom-0 my-auto" src={"/summerCactusImage2.png"} alt="Plant" width={292} height={292} />
            <div className="w-[292px] flex flex-col items-end bg-[#FBFBFB] mr-[-50%] pt-[37px] pb-[46px] pr-[30px] text-right">
              <h2 className="mb-[10px] text-[#3D3D3D] font-black text-[18px] leading-6 ">STYLING TRENDS & MUCH MORE</h2>
              <p className="text-[#727272] mb-[12px] text-[14px] leading-6">We are an online plant shop offering a wide range of cheap and trendy plants</p>
              <Button buttonWidth={140} title="Find More" bgColor={false} icon={<RightArrowVector />} iconPosition="next" />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-[100px]">
        <div className="container px-5">
          <h2 className="text-[#3D3D3D] text-center font-bold text-[30px] leading-4 mb-[15px]">Our Blog Posts</h2>
          <p className="text-[#727272] text-[14px] text-center leading-6 mb-[35px]">We are an online plant shop offering a wide range of cheap and trendy plants. </p>

          <div className="flex items-center justify-between">
            <BlogPostsCard title="Cactus & Succulent Care Tips" description="Cacti are succulents are easy care plants for any home or patio." src="/blogImageCard1.png" topTitle="September 12  I Read in 6 minutes" />
            <BlogPostsCard title="Top 10 Succulents for Your Home" description="Best in hanging baskets. Prefers medium to high light." src="/blogImageCard2.png" topTitle="September 13  I Read in 2 minutes" />
            <BlogPostsCard title="Cacti & Succulent Care Tips" description="Cacti and succulents thrive in containers and because most are.." src="/blogImageCard3.png" topTitle="September 15  I Read in 3 minutes" />
            <BlogPostsCard title="Best Houseplants Room by Room" description="The benefits of houseplants are endless. In addition to.." src="/blogImageCard4.png" topTitle="September 15  I Read in 2 minutes" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
