import React, { useEffect } from 'react'
import { IoShareSocialSharp } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';


function InfoSection({trip}) {
  //console.log(trip?.userSelection?.noOfDays);
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location
    };
  
    try {
      const result = await GetPlaceDetails(data);
      console.log('Places response:', result.data);
      // Assuming you're storing places in state:
      // setPlaces(result.data.places || []);
    } catch (error) {
      console.error('API ERROR:', error?.response?.data || error.message);
    }
  };
  
  
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