import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
  const itineraryEntries = Object.entries(trip.tripData?.itinerary || {}).sort(
    ([a], [b]) => {
      const dayA = parseInt(a.replace('day', ''))
      const dayB = parseInt(b.replace('day', ''))
      return dayA - dayB
    }
  )

  return (
<div>
  <h2 className='font-bold text-lg text-black mb-4'>Places To Visit</h2>
  <div className='flex flex-wrap'>

    {itineraryEntries.map(([day, data], index) => (
      <div key={index} className='w-full md:w-1/2 p-4'>
        <div className="rounded-xl p-4 h-full">
          <h2 className='text-md text-black font-semibold capitalize mb-2'>{day}</h2>
          {data.plan?.map((place, i) => (
            <div key={i} className='mb-3'>
              <h2 className='font-medium text-xs text-blue-600 mb-1'>Est Time: {place.travelTime}</h2>
              <PlaceCardItem place={place} />
            </div>
          ))}
        </div>
      </div>
    ))}

  </div>
</div>


  )
}

export default PlacesToVisit
