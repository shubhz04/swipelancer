"use client";

import { useRef, useState } from "react";

import { ProfileData } from "@/types/profileCard";
import ProfileCard from "../profileCard";
import { motion } from "framer-motion";
import pattern from "@/public/pattern2.png";
import  { useRouter } from "next/navigation";

// Sample data (replace with your actual data)
const cardData: ProfileData[] = [
  {
    id: 1,
    UID: "67e878f061cbc9dac125f590",
    name: "Vansh Deo",
    title: "Video Editor",
    description: "Experienced video editor skilled in cinematic and social media content creation.",
    rating: 4,
    bgColor: "green-700",
    tagline: "Swipe right if you love a good montage—because I turn moments into masterpieces.",
    isFreelancer : true
    
  },
  {
    id: 2,
    UID: "67e878f061cbc9dac125f590",
    name: "Ayush Gupta",
    title: "Video Editor",
    description: "Your Average Video Editor From Asansol.",
    rating: 4,
    bgColor: "blue-700",
    tagline: " Videos or scripts, i got you covered",
    isFreelancer : true
    
  }
];


export default function ProfileSwipeCard() {
  const router = useRouter();
  const dummyUserID = "67e878f061cbc9dac125f590";
  const dummyContractID = "67e87c482919593720d9561b"

  const [isMatchFound, setisMatchFound] = useState(false);
  const [swiped, setSwiped] = useState(false);
  const [swiping, setSwiping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const profileCardRef = useRef<any>(null);

  const parentContainerStyle: React.CSSProperties = {
    width: isExpanded ? "100%" : "100%",
    height: "100vh",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    backgroundColor: isExpanded || isMatchFound ? "rgba(0, 0, 0, 0.5)" : "rgba(154, 149, 149, 0.47)",
    transition: "background-color 0.3s ease-in-out",
    position: "relative",
    //backgroundImage: `url(${pattern.src})`,

    backgroundRepeat: "repeat",
    backgroundSize: "500px",
    opacity: 1,
    zIndex: 0,

  };
  const popupCard: React.CSSProperties & { position: "absolute" } = {
    position: "absolute",
    width: 400,
    height: 400,
    backgroundColor: "rgb(105, 219, 128)",
    borderRadius: "7%",
    zIndex: 20,

  };
  const matchBackground: React.CSSProperties & { position: "absolute" } = {
    position: "absolute",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex", // Make it a flex container
    alignItems: "center", // Center content vertically
    justifyContent: "center", // Center content horizontally
    zIndex: 19
  };
  // reset handle
  const handleReset = () => {
    if (profileCardRef.current) {
      profileCardRef.current.handleCardExit(); // Call resetCard method
    }
  };

  const cardContainerStyle: React.CSSProperties = {
    position: "relative", // Needed for absolute positioning of cards
    width: "300px", // Adjust as needed for the base width of your cards
    height: "400px", // Adjust as needed based on your card content
  };

  // Callback to handle swipe
  const handleCardSwiped = async (index: number, dir: string, cardData: ProfileData) => {
    console.log(`Card at index ${index} was swiped ${dir}! with name ${cardData.name}`);
    // send api request here
    if (dir == "right") {
      console.log(`User ID : ${dummyUserID} swiped for userID : ${cardData.UID}`)
      try {
        const response = await fetch("/api/match/swipe/owner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: dummyUserID,
            targetUserID: cardData.UID,
            contractID: dummyContractID,
          }),
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (response.ok) {
          if (result.success == true && result.match == true) {
            setisMatchFound(true);
          }
          console.log("Swipe action was successful!");
        } else {
          console.error("Swipe action failed:", result.message);
        }
      } catch (error) {
        console.error("Error while making the API request:", error);
      }
    }
    // reset the swiped state afterwards
    setSwiped(false);

  };
  return (
    <>
      <div style={parentContainerStyle} onClick={handleReset} >
        <div style={cardContainerStyle}>
          {cardData.map((card, index) => (
            <ProfileCard
              key={card.id}
              ref={profileCardRef} // Assign ref to each card
              swiped={swiped}
              setSwiped={setSwiped}
              swiping={swiping}
              setSwiping={setSwiping}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              cardData={card}
              onCardSwiped={(dir: string) => handleCardSwiped(index, dir, card)}
              style={{
                position: "absolute",
                top: `${index * 3}px`, // Offset each card by 20px on the Y-axis
                zIndex: cardData.length - index, // Higher index cards appear on top
                transform: `scale(${1 - index * 0.05})`, // Apply scaling for stacking effect
              }}
            />
          ))}
        </div>
      </div>
      {isMatchFound && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.1,
            scale: { type: "spring", visualDuration: 0.4 },
          }}
          style={matchBackground}
        >
          {/* Cross button at the top-right */}


          {/* Popup content */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            style={popupCard}
            className="flex flex-col items-center justify-center text-center p-6"
          > <button
            className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full p-2 px-3 shadow-md"
            onClick={() => setisMatchFound(false)} // Close the popup
          >
              ✕
            </button>
            {/* Match Found Text */}
            <span className="text-white text-2xl font-bold mb-4">
              Match Found !!
            </span>

            {/* Continue Chatting Button */}
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
              onClick={() => router.push("/chats")} // Replace with actual navigation logic
            >
              Start Chatting
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}