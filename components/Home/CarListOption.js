import { CarListData } from '@/utils/CarListData';
import React, { useState, useContext } from 'react';
import CarListItem from './CarListItem';
import { useRouter } from 'next/navigation';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DesinationContext';
import axios from 'axios';
import dayjs from 'dayjs'; // Day.js library for date formatting

function CarListOption({ distance }) {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const route = useRouter();
  const [activeIndex, setActiveIndex] = useState();

  const bookRide = async (car) => {
    try {
      const departureTime = dayjs().format('YYYY-MM-DD HH:mm:ss'); // Format the current datetime
      const response = await axios.post('/api/rides', {
        route: `From ${source.name} to ${destination.name}`,
        departureTime,
        availableSeats: car.seats || 4, // Provide a default value if car.seats is null
        fare: (car.amount*distance).toFixed(2) || 0,// Provide a default value if car.fare is null
        source: source.name,
        destination: destination.name,
      });
      console.log('Ride booked:', response.data);
      route.push('/payment-confirm'); // Redirect to payment confirmation
    } catch (error) {
      console.error('Error booking ride:', error);
    }
  };

  return (
    <div className='mt-5 p-1.5 overflow-auto h-[345px]'>
      <h2 className='text-[22px] font-bold'>Recommended</h2>
      {CarListData?.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer p-2 px-4 rounded-md 
          border-black
          ${activeIndex === index ? 'border-[3px]' : null}`}
          onClick={() => {
            setActiveIndex(index);
            bookRide(item); // Call bookRide with the selected car
          }}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}
    </div>
  );
}

export default CarListOption;
