import React, { forwardRef, useImperativeHandle } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation } from "framer-motion";
import { Star } from "lucide-react";
import { ProfileData } from "@/types/profileCard";
const cardVariants = {
    initial: {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        width: "20rem",
        height: "auto",
        zIndex: 15,
    },
    expanded: {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        width: "25rem",
        top: "0rem",
        height: "calc(100vh - 6rem)",
        borderRadius: "0rem",
        left: "0",
        zIndex: 15,
        transition: { type: "spring", stiffness: 30, damping: 10 },
    },
    swipedRight: {
        y: -500,
        x: 0,
        rotate: 0,
        opacity: 0,
        scale: 0.9,
        transition: { type: "spring", stiffness: 50, damping: 10 },
    },
    swipedLeft: {
        x: -500,
        y: 100,
        rotate: -30,
        opacity: 0,
        scale: 0.9,
        transition: { type: "spring", duration: 0.2, stiffness: 50, damping: 10 },
    },
};

const ProfileCard = forwardRef(({
    swiped,
    setSwiped,
    swiping,
    setSwiping,
    isExpanded,
    setIsExpanded,
    onCardSwiped, // New prop for swipe callback
    style,
    cardData, // Accept style prop for dynamic positioning
}: {
    swiped: boolean;
    setSwiped: (value: boolean) => void;
    swiping: boolean;
    setSwiping: (value: boolean) => void;
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
    onCardSwiped: (direction: string) => void; // Callback for when the card is swiped
    style?: React.CSSProperties;
    cardData: ProfileData // Optional style prop
}, ref) => {
    const controls = useAnimation();

    // Expose methods to the parent via the ref
    useImperativeHandle(ref, () => ({
        // on card click
        handleCardClick(event: React.MouseEvent) {
            if (!swiped && !swiping) {
                setIsExpanded(true);
                controls.start("expanded", { duration: 0.4 });
                event.stopPropagation();
            }
        },

        // on card exit
        handleCardExit(event: React.MouseEvent) {
            if (!swiped && !swiping) {
                setIsExpanded(false);
                controls.start("initial", { duration: 0.4 });
                event.stopPropagation();
            }
        },



    }));

    const handleCardClick = (event: React.MouseEvent) => {
        if (!swiped && !swiping) {
            setIsExpanded(true);
            controls.start("expanded", { duration: 0.4 });
            event.stopPropagation();
        }
    };
    const handleSwipe = (direction: "left" | "right") => {
        setSwiped(true);
        if (direction === "right") {
            onCardSwiped("right"); // Trigger the callback when swiped
            controls.start("swipedRight");
        } else if (direction === "left") {
            onCardSwiped("left"); // Trigger the callback when swiped
            controls.start("swipedLeft");
        }
    };

    return (
        <motion.div
            animate={controls}
            variants={cardVariants}
            style={{ ...style, margin: 0 }}
            initial="initial"
            drag={!swiped && !isExpanded}
            className="relative cursor-grab shadow-lg"
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDrag={(event, info) => {
                setSwiping(true);
                controls.set({ rotate: info.offset.x * 0.03 });
            }}
            onDragEnd={(event, info) => {
                const threshold = 150;
                if (info.offset.x > threshold) {
                    handleSwipe("right");
                } else if (info.offset.x < -threshold) {
                    handleSwipe("left");
                } else {
                    controls.start({
                        x: 0,
                        y: 0,
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                    });
                }
            }}
        >
            <Card
                className="w-full h-full bg-white rounded-2xl shadow-lg flex-col overflow-hidden"
                onClick={handleCardClick}
            >
                <div className="h-80 bg-green-700"></div>
                <CardContent className="text-center py-4 px-6">
                    <h2 className="font-semibold text-lg">{cardData.name}</h2>
                    <p className="text-sm text-gray-500">{cardData.title}</p>
                    <div className="flex justify-center mt-2">
                        {[...Array(cardData.rating)].map((_, i) => (
                            <Star key={i} className="text-yellow-400 h-5 w-5" fill="currentColor" />
                        ))}
                        {[...Array(5 - cardData.rating)].map((_, i) => (
                            <Star key={i} className="text-gray-400 h-5 w-5" />
                        ))}
                    </div>
                    <p className="text-sm mt-4 text-gray-600">{cardData.description}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
});

export default ProfileCard;