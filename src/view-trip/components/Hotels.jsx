import React from 'react'
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  console.log("hotelOptions:", trip?.hotelOptions);

  return (
    <div className='text-black w-full'>
      <h2 className='font-bold text-xl mt-5'>Hotels recommendations</h2>

      <div className='flex flex-wrap mt-4 -mx-2'>
        {trip?.tripData?.hotelOptions?.map((item, index) => (
          <div 
            key={index}
            className='w-full sm:w-1/2 md:w-1/3 px-2 mb-6'
          >
            <Link 
              to={`https://www.google.com/maps/search/?api=1&query=`+item.hotelName+item?.hotelAddress} 
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 h-full'>
                <img 
                  src="/placeholder.jpg" 
                  className='w-full h-[200px] object-cover' 
                  alt="Hotel"
                />
                <div className='p-4 flex flex-col gap-2'>
                  <h2 className='font-medium'>{item.hotelName}</h2>
                  <h2 className='text-xs text-gray-500'>📍{item.hotelAddress}</h2>
                  <h2 className='text-xs text-gray-800'>💵{item.price.range}</h2>
                  <h2 className='text-xs text-gray-800'>{item.rating}⭐️</h2>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hotels
