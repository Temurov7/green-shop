import React from "react";

interface TypeButton {
    title: string;
    icon?: any;
    iconPosition?: "prev" | "next",
    buttonWidth: number;
    bgColor?: boolean;
    onClick?: () => void;
}

export const Button: React.FC<TypeButton> = ({ title, icon, iconPosition, buttonWidth, bgColor, onClick }) => {
    return (
        <button type="submit" onClick={onClick} style={{ width: `${buttonWidth}px` }} className={`${bgColor ? "bg-transparent" : "bg-[#46A358]"}  py-[8px] rounded-[6px] hover:opacity-90 duration-300 ${icon && iconPosition ? "py-[8px]" : "py-[13px]"} flex items-center justify-center gap-[4px]`}>
            {icon && iconPosition == "prev" && icon}
            <span className={`font-medium text-[12px] leading-[14px]  ${bgColor ? "text-[#46A358]" : "text-white"}`}>{title}</span>
            {icon && iconPosition == "next" && icon}
        </button>
    )
}