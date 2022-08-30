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
                <div className='flex gap-base'>
                    <RiStackLine className='text-xl' />
                    <span>Height</span>
                </div>
            </div>
            <div className='flex flex-col items-center justfiy-center  p-base border rounded-md bg-gray-500 font-bold'>
                <div className='flex gap-base'>
                    <img
                        src='data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg=='
                        alt='Red dot'
                    />
                    <span>Area</span>
                </div>
            </div>
        </div>
    );
}
