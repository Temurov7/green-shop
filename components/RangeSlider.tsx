"use client"
import { Slider } from 'antd'
import React, { useState } from 'react'

interface SizeRangeType {
    setSizeRangeValue:(value:number[]) => void;
}

export const RangeSlider:React.FC<SizeRangeType> = ({setSizeRangeValue}) => {
    const [values, setValues] = useState<number[]>([22,543])
    const onChangeComplete = (value:number[]) => {
        setValues(value)
        setSizeRangeValue(value)
    };
    return (
        <div>
            <Slider
                range
                step={1}
                min={39}
                max={1500}
                defaultValue={values}
                onChangeComplete={onChangeComplete}
            />
            <div>
                <p>
                    <span className='text-[15px] leading-[16px]'>Price:</span>
                    <span className='font-semibold text-[#46A358]'>{Array.isArray(values) ? values[0] : values}$</span>
                    -
                    <span className='font-semibold text-[#46A358]'>{Array.isArray(values) ? values[values.length - 1] : values}$ </span>
                </p>
            </div>
        </div>
    )
}
export default RangeSlider