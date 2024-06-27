import React from 'react'
import Image from 'next/image'
import { BeakerIcon } from '@heroicons/react/24/solid'
function CarListItem({car,distance}) {
  return (
    <div>
      <div className='flex items-center justify-between mt-5'>
        <div className='flex items-center gap-5'>
        <Image src={car.image} width={100} height={100}/>
        <div>
            <h2 className='font-semibold text-[18px] flex gap-3 items-center'>{car.name}
            <span className='flex gap-2 font-normal items-center text-[14px]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
</svg>{car.seat}

            </span>
            </h2>
            <p>{car.desc}</p>

        </div>
        </div>
        <h2 className='text-[18px] font-semibold'>Rs.{(car.amount*distance).toFixed(2)}</h2>
        </div>
      </div>
  )
}

export default CarListItem
