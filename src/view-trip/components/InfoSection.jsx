import React from 'react'
import { IoShareSocialSharp } from "react-icons/io5";
import { Button } from '@/components/ui/button';


function InfoSection({trip}) {
  console.log(trip?.userSelection?.noOfDays);
  
  return (
    <div >
      
        <img src='/placeholder.jpg' className='h-[700px] w-full object-cover  rounded-xl mt-0'/>
        <div className='flex justify-between items-center'> 
          <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl text-gray-700'>{trip?.userSelection?.location}</h2>
              <div className='flex gap-5'>
               <h2 className='p-1 px-3 mb-1 bg-gray-300 rounded-full text-gray-700 text-xs md:text-md'> 📅 : {trip.userSelection?.noOfDays} Days</h2>
                <h2 className='p-1 px-3 mb-1 bg-gray-300 rounded-full text-gray-700 text-xs md:text-md '>💰 : {trip.userSelection?.budget} budget</h2>
                <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-700 text-xs md:text-md '>🥂No. of Travelers: {trip.userSelection?.traveler}</h2>
              </div>
            </div>
            <Button><IoShareSocialSharp /></Button>
        </div>
    </div>
  )
}

export default InfoSection