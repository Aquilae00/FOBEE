import {useEffect, useState} from 'react';
import {BiArea} from 'react-icons/bi';
import {RiStackLine} from 'react-icons/ri';
import Image from 'next/image';
import Test from '../assets/area-floor-size-icon.png';

interface PopupProps {
    data: {osmid: number; height: number; area: number};
}
export default function Popup({data}: PopupProps): JSX.Element {
    return (
        <div className='flex justify-center items-center space-x-sm'>
            <div className='flex flex-col items-center justfiy-center p-base border rounded-md bg-gray-500 font-bold'>
                <div className='flex gap-base items-center'>
                    <img
                        src='https://raw.githubusercontent.com/Aquilae00/FOBEE/main/assets/layer-icon.png?token=GHSAT0AAAAAABVMJH66GQ6G6XO74PB4B74MYYNRBTA'
                        height={50}
                        width={50}
                    />

                    <span className='text-lg'>Height</span>
                </div>
            </div>
            <div className='flex flex-col items-center justfiy-center  p-base border rounded-md bg-gray-500 font-bold'>
                <div className='flex gap-base items-center'>
                    <img
                        src='https://raw.githubusercontent.com/Aquilae00/FOBEE/main/assets/area-floor-size-icon.png?token=GHSAT0AAAAAABVMJH66ESQCTWIRC67BFJRYYYNRFWQ'
                        height={50}
                        width={50}
                    />
                    <span className='text-lg'>Area</span>
                </div>
                <div>
                    <span>{Math.ceil(data.area)}</span>
                    <span className='text-md'>
                        m<sup>2</sup>
                    </span>
                </div>
            </div>
        </div>
    );
}
