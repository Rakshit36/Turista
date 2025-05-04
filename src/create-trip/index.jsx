import { SelectBudgetOptions } from '@/constants/options';
import { SelectTravelsList } from '@/constants/options';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AI_PROMPT } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import handleGoogleSignIn, { db } from "../components/Google_sign";
import { setDoc, doc } from 'firebase/firestore';
import Loader from '@/components/Loader';

function CreateTrip() {
  const [place, setPlace] = useState('');
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const onGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.noOfDays || !formData?.traveler || !formData?.budget) {
      toast("Please fill all details or check your data");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const tripDetails = await result?.response?.text();

    setLoading(false);
    SaveAiTrip(tripDetails);

    const tripData = {
      userId: user.uid,
      email: user.email,
      location: formData?.location,
      noOfDays: formData?.noOfDays,
      traveler: formData?.traveler,
      budget: formData?.budget,
      generatedTrip: tripDetails,
      timestamp: new Date(),
    };

    localStorage.setItem('generatedTrip', JSON.stringify(tripData));

    toast.success("Trip saved successfully!");
    console.log("Trip Data:", tripDetails);
  };

  const SaveAiTrip = async (TripData) => {
    try {
      setLoading(true);
      const docId = Date.now().toString();
      const user = JSON.parse(localStorage.getItem('user'));

      let parsedTrip;
      try {
        parsedTrip = JSON.parse(TripData);
      } catch (e) {
        toast.error("Trip data is invalid.");
        console.error("Trip parsing error:", e);
        setLoading(false);
        return;
      }

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTrip,
        userEmail: user?.email,
        id: docId,
      });

      setLoading(false);
      navigate('/view-trip/' + docId);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to save trip");
      console.error("Error saving trip:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-screen flex justify-center items-start pt-10 overflow-hidden">

      {loading ? <Loader /> :
      
      <>
      
      {/* Blurred Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          // backgroundImage: "url('/bg2.jpeg')",
          backgroundColor: "white",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px)",
          transform: "scale(1.1)"
        }}
        
      ></div>

      {/* Main Content */}
      <div className='relative z-10 w-full max-w-6xl px-5 py-10 bg-white/90 rounded-lg shadow-lg'>
        <h2 className='font-bold text-3xl text-blue-500'>Tell us your travel preferences 🏕️🌴</h2>
        <p className='mt-3 text-gray-500 text-xl'>
          Just provide basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>

        <div className='mt-20 flex flex-col gap-9'>

          {/* Destination Input */}
          <div>
            <h2 className='text-xl my-3 font-medium text-blue-500'>What is Your Destination?</h2>
            <GooglePlacesAutocomplete
              className='w-full border-2 border-blue-400 rounded-lg p-2 text-lg bg-blue-200 text-blue-600'
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              onPlaceSelected={(place) => {
                if (!place || !place.formatted_address) {
                  console.error("Invalid place selected:", place);
                  return;
                }
                setPlace(place.formatted_address);
                handleInputChange('location', place.formatted_address);
              }}
              options={{ types: ['(cities)'] }}
            />
          </div>

          {/* Number of Days */}
          <div>
            <h2 className='text-xl my-3 font-medium text-blue-500 '>How many days are you planning your trip?</h2>
            <input
              type="number"
              placeholder='Ex: 3'
              className='w-full border-2 border-blue-400 rounded-lg p-2 text-lg bg-blue-200 text-blue-600'
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
          </div>

          {/* Travel Companion Selection */}
          <div>
            <h2 className='text-xl my-3 font-medium text-blue-600'>Who do you plan on traveling with on your next adventure?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5 cursor-pointer text-blue-700'>
              {SelectTravelsList.map((item, index) => (
                <div key={index}
                  className={`p-4 border-2 border-blue-300 rounded-lg hover:shadow-lg cursor-pointer ${
                    formData?.traveler === item.people ? "shadow-lg border-black" : ""
                  }`}
                  onClick={() => handleInputChange('traveler', item.people)}
                >
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <div>
                    <h3 className='text-lg font-bold'>{item.title}</h3>
                    <p className='text-gray-500'>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Selection */}
          <div>
            <h2 className='cursor-pointer text-xl my-3 font-medium text-blue-600'>What is your Budget?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5 text-blue-700'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                    formData?.budget === item.title ? "shadow-lg border-black" : ""
                  }`}
                  onClick={() => handleInputChange('budget', item.title)}
                >
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <div>
                    <h3 className='text-lg font-bold'>{item.title}</h3>
                    <p className='text-gray-500'>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Trip Button */}
          <Button
            disabled={loading}
            className="bg-blue-700"
            onClick={localStorage.getItem("user") ? onGenerateTrip : handleGoogleSignIn}
          >
            Generate Trip
          </Button>

        </div>
      </div>

      </>
    }
   
    </div>
  );
}

export default CreateTrip;
