"use client"
import { CarType } from '@/types';
import Image from 'next/image';
import * as  React from 'react';
import {CustomButton,CarDetails} from './';
import { calculateCarRent,generateCarImageUrl } from '@/utils/lib';
interface CarCardProps {
    car: CarType
};

export default function CarCard({ car }: CarCardProps) {
    const [isOpen, setOpen] = React.useState<boolean>(false)
    const { city_mpg, year, make, model, transmission, drive } = car
    const carRent = calculateCarRent(city_mpg, year)
    return (
        <div className='car-card group'>
            <div className="car-card__content">
                <h2 className='car-card__content-title'>{make} {model}</h2>
            </div>
            <p className='flex mt-6 text-3xl font-extrabold'>
                <span className='self-start text-sm font-semibold'>
                    $
                </span>
                {carRent}
                <span className='self-end text-sm font-medium'>
                    /year
                </span>
            </p>
            <div className='relative w-full h-40 my-3 object-contain'>
                <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
            </div>
            <div className='relative flex w-full mt-2'>
                <div className='flex group-hover:invisible w-full justify-between text-grey'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/steering-wheel.svg' alt='steel wheel icon' width={20} height={20} />
                        <p className='text-sm'>
                            {transmission === 'a' ? "Automatic" : "Manual"}

                        </p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/tire.svg' alt='tire' width={20} height={20} />
                        <p className='text-sm'>
                            {drive.toUpperCase()}

                        </p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/gas.svg' alt='gas' width={20} height={20} />
                        <p className='text-sm'>
                            {city_mpg} MPG

                        </p>
                    </div>

                </div>
                <div className='car-card__btn-container'>
                    <CustomButton className='w-full py-4 rounded-full bg-primary-blue text-white text-sm leading-normal font-bold text-center' onClick={() => setOpen(true)} icon='/right-arrow.svg' >
                        View More
                    </CustomButton>
                </div>
            </div>

            <CarDetails isOpen={isOpen} closeModal={()=>setOpen(false)} car={car} />
        </div>
    );
};
