import React from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
function Header() {
    const headerMenu=[
        {
            id:1,
            name:'Ride',
            icon:'/taxi.png'
        },
        {
            id:2,
            name:'Box',
            icon:'/box.gif'
        }
    ]

  return (
    <div className='p-4 pb-3 pl-5 border-b-[2px] 
    border-gray-200 flex items-center justify-between' >
      <div className='flex gap-24 items-center'> 
        <h2><b>Campus Ride</b></h2>
        <div className='flex gap-6 items-center'>
            {
                headerMenu.map((item)=>(
                <div className='flex gap-2 items-center'>
                    <Image src={item.icon} 
                    width={17} height={17}/>
                    <h2 className='text-[14px] font-medium'>{item.name}</h2>
                </div>))
            }
        </div>

      </div>
      <UserButton/>
    </div>
  )
}

export default Header
