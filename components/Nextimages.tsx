import Image from 'next/image'
import React from 'react'


interface NextImagesType {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export const Nextimages:React.FC<NextImagesType> = ({alt, height, src, width}) => {
  return (
    <Image src={src} alt={alt} width={width} height={height} priority={true}/>
  )
}


