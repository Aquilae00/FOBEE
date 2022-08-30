import { ReactNode, useEffect, useState } from "react";
import { BiArea } from "react-icons/bi";
import { RiStackLine } from "react-icons/ri";
import Image from "next/image";
import Test from "../assets/area-floor-size-icon.png";
import { PulseLoader } from "react-spinners";
import { Disclosure } from "@headlessui/react";
import { HiChevronUp } from "react-icons/hi";
import { BsLightning } from "react-icons/bs";
import { Recommendations } from "./recommendations";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
interface PopupProps {
    data: { osmid: number; height: number; area?: number; location?: string };
    onClose: () => void;
}
export default function Popup({ data, onClose }: PopupProps): JSX.Element {
    const [isClicked, setIsClicked] = useState(false);
    const Container = ({ children }: { children: ReactNode }) => {
        return (
            <div className="flex flex-col items-center justfiy-center p-base rounded-md bg-gray-500 font-bold bg-opacity-70">
                {children}
            </div>
        );
    };
    return (
        <div className="flex flex-col items-center gap-md">
            <button
                type="button"
                className="self-end p-sm hover:bg-gray-500 hover:bg-opacity-50 rounded-lg hover:text-red-400 "
                onClick={onClose}
            >
                <FaTimes />
            </button>
            <span className="font-semibold text-lg">{data.location}</span>
            <div className="flex justify-center items-center space-x-base">
                <Container>
                    <div className="flex gap-base items-center">
                        <img
                            src="https://raw.githubusercontent.com/Aquilae00/ASDI-Public/main/layer-icon.png"
                            height={50}
                            width={50}
                            className="w-[32px] h-[32px] object-contain"
                        />
                        <span className="text-base opacity-80">Height</span>
                    </div>
                    <div className="space-x-xs">
                        <span className="text-md">{Math.ceil(data.height)}</span>
                        <span className="text-base">m</span>
                    </div>
                </Container>
                <Container>
                    <div className="flex gap-base items-center">
                        <img
                            src="https://raw.githubusercontent.com/Aquilae00/ASDI-Public/main/area-floor-size-icon.png"
                            height={50}
                            width={50}
                            className="w-[32px] h-[32px] object-contain"
                        />
                        <span className="text-base opacity-80">Area</span>
                    </div>
                    <div className="space-x-xs">
                        {data.area ? (
                            <>
                                <span className="text-md">{Math.ceil(data.area)}</span>{" "}
                                <span className="text-base">
                                    m<sup>2</sup>
                                </span>
                            </>
                        ) : (
                            <PulseLoader className="text-base" size={10} />
                        )}
                    </div>
                </Container>
            </div>

            {isClicked ? (
                <>
                    {" "}
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex justify-between items-center px-base py-sm bg-blue-500 bg-opacity-60 rounded-lg w-full">
                                    <span>Energy consumption</span>
                                    <HiChevronUp
                                        className={`${
                                            open ? "rotate-180 transform" : ""
                                        } h-5 w-5 text-blue-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel>
                                    <div className="flex justify-center items-center space-x-base text-green-600 font-semibold">
                                        <BsLightning className="text-2xl" />
                                        <span className="text-xl">629</span>
                                        <span>
                                            kWh/m<sup>2</sup>
                                        </span>
                                    </div>
                                    <div className="flex justify-center items-center gap-base">
                                        <div className="flex justify-center items-center mt-base gap-2">
                                            <div className="w-[10px] h-[10px] rounded-full bg-green-600"></div>
                                            <span>A</span>
                                        </div>
                                        <div className="flex justify-center items-center mt-base gap-2">
                                            <div className="w-[10px] h-[10px] rounded-full bg-green-400"></div>
                                            <span>B</span>
                                        </div>
                                        <div className="flex justify-center items-center mt-base gap-2">
                                            <div className="w-[10px] h-[10px] rounded-full bg-green-200"></div>
                                            <span>C</span>
                                        </div>
                                        <div className="flex justify-center items-center mt-base gap-2">
                                            <div className="w-[10px] h-[10px] rounded-full bg-yellow-500"></div>
                                            <span>D</span>
                                        </div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex justify-between items-center px-base py-sm bg-blue-500 bg-opacity-60 rounded-lg w-full">
                                    <span>Recommendations</span>
                                    <HiChevronUp
                                        className={`${
                                            open ? "rotate-180 transform" : ""
                                        } h-5 w-5 text-blue-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="flex flex-col gap-base">
                                    {Object.keys(Recommendations).map((key: string) => (
                                        <Link href={Recommendations[key].url}>
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-blue-400 bg-opacity-50 px-sm py-xs rounded-md "
                                            >
                                                <h1 className="font-semibold">{key}</h1>
                                                <div className="rounded-full h-[4px] w-[40px] bg-blue-500 my-xs" />
                                                <span>{Recommendations[key].content}</span>
                                            </a>
                                        </Link>
                                    ))}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </>
            ) : (
                <div
                    className="px-base py-sm rounded-lg bg-blue-500 cursor-pointer hover:bg-blue-600"
                    onClick={() => setIsClicked(true)}
                >
                    Calculate energy
                </div>
            )}
        </div>
    );
}
