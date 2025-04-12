import { Button } from '@/components/ui/button'
import React from 'react'
import { IoLocationSharp } from "react-icons/io5";


function PlaceCardItem({place}) {
  return (
    <div className='border border-gray-300 rounded-xl p-2 mt-2 flex gap-5 hover:scale-105 transition-all
        hover:shadow-md cursor-pointer'>
        <img src="/placeholder.jpg" 
        className='w-[130px] h-[110px] rounded-xl' />
        <div>
            <h2 className='font-bold text-md text-black'>• {place.placeName}</h2>
            <p className='text-gray-600 text-xs py-3'>{place.placeDetails}</p>
            <h2 className='text-sm text-blue-600 ' > Travelling time:  {place.travelTime}</h2>
            <Button
                 className="p-2 h-6 w-7 bg-blue-500"
                 onClick={() => window.open('https://www.google.com/maps?q='+place.placeName, '_blank')}>
                <IoLocationSharp className="text-white text-md" />
            </Button>

        </div>
    </div>
  )
}

export default PlaceCardItem