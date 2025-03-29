"use client";

import { useRef, useState } from "react";
import ProfileCard from "../profileCard";
// Sample data (replace with your actual data)
const cardData = [
  {
    id: 1,
    name: "Vansh Deo",
    title: "Video Editor",
    description: "Swipe right if you love a good montage—because I turn moments into masterpieces.",
    rating: 4,
    bgColor: "green-700",
  },
  {
    id: 2,
    name: "Ayush Gupta",
    title: "Web Developer",
    description: "Building responsive and user-friendly websites is my passion.",
    rating: 5,
    bgColor: "blue-500",
  },
  {
    id: 3,
    name: "Priya Sharma",
    title: "Graphic Designer",
    description: "Creating visually appealing and impactful designs.",
    rating: 3,
    bgColor: "purple-600",
  },
  // Add more card data here
];


export default function SwipeCard() {
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
    alignItems: "center",
    backgroundColor: isExpanded ? "rgba(0, 0, 0, 0.5)" : "rgba(219, 218, 218, 0.47)",
    transition: "background-color 0.3s ease-in-out",
    position: "relative",
    zIndex: 0
  };

  // reset handle
  const handleReset = () => {
    if (profileCardRef.current) {
      profileCardRef.current.handleCardExit(); // Call resetCard method
    }
  };

  // Callback to handle swipe
  const handleCardSwiped = (index: number, dir: string) => {
    alert(`Card at index ${index} was swiped ${dir}!`);
    setSwiped(false);
  };
  return (
    <div style={parentContainerStyle} onClick={handleReset} >

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
          onCardSwiped={(dir: string) => handleCardSwiped(index, dir)}
          style={{
            position: "absolute",
            top: `${index * 20}px`, // Offset each card by 20px on the Y-axis
            zIndex: cardData.length - index, // Higher index cards appear on top
            transform: `scale(${1 - index * 0.05})`, // Apply scaling for stacking effect
          }}
        />
      ))}


    </div>
  );
}