import React from "react";
interface IContainer{
    children: React.ReactNode;
    className?: any;
}
const Container: React.FC<IContainer> = ({ children, className}) => {
    return <div className={`w-full h-[100vh] bg-[#eff3f4] pt-2 md:pt-2 lg:pt-3 xl:pt-4 px-[6px] md:px-2 lg:px-3 xl:px-4 ${className}`}>{children}</div>;
}
export default Container;