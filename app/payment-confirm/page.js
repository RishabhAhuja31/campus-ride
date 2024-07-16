"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function PaymentConfirmation() {
  const [rides, setRides] = useState([]);
  const route = useRouter();

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get('/api/rides');
        setRides(response.data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };
    fetchRides();
  }, []);

  return (
    <div className='bg-[#f1f1f1] flex h-screen items-center justify-center flex-col'>
      <div>
        <h1>Available Rides</h1>
        <ul>
          {rides.map((ride) => (
            <li key={ride.id}>
              {ride.route} - {new Date(ride.departureTime).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <Image src='/uberconfirm.gif' width={500} height={150} className='object-cover mt-4' />

      <h2 className='text-[30px] z-20 mt-4'>Payment Confirmed</h2>
      <h2 className='font-bold text-[23px] mt-2 mb-6'>Ride is Booked Successfully</h2>
      
      <button className='p-2 bg-black text-white px-10 rounded-lg' onClick={() => route.push('/')}>
        Go Home
      </button>
    </div>
  )
}

export default PaymentConfirmation
