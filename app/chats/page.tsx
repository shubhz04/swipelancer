'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Send } from "lucide-react";

// Dummy user list for the left side
const chatUsers = [
    { id: 1, name: "Anil", lastSeen: "2:02pm", avatarSrc: "/user.jpg" },
    // Add more users as needed
];

export default function ChatUI() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [currentChatUser, setCurrentChatUser] = useState(chatUsers[0]); // Initialize with the first user

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: "You", text: input, time: "Now" }]);
        setInput("");
    };

    interface ChatUser {
        id: number;
        name: string;
        lastSeen: string;
        avatarSrc: string;
    }

    interface Message {
        sender: string;
        text: string;
        time: string;
    }

    const handleUserClick = (user: ChatUser): void => {
        setCurrentChatUser(user);
        // In a real application, you would fetch the chat history for this user here
        setMessages([
            { sender: user.name, text: "Hello!", time: "10:00am" },
            { sender: "You", text: "Hi Priya!", time: "10:01am" },
            // ... Load actual messages for the selected user
        ]);
    };

    return (
        <div className="flex h-screen">
            {/* Left side - List of Chat Users */}
            <div className="ml-20  w-1/4 bg-gray-100 border-r overflow-y-auto">
                <div className="p-4 font-semibold text-gray-700 ">Chats</div>
                <ScrollArea className="h-[calc(100vh - 56px)]">
                    {chatUsers.map((user) => (
                        <button
                            key={user.id}
                            className={`flex items-center space-x-3 p-3 w-full hover:bg-gray-200 ${currentChatUser?.id === user.id ? "bg-gray-200" : ""
                                }`}
                            onClick={() => handleUserClick(user)}
                        >
                            <Avatar className="bg-blue-400">
                                <AvatarImage src={user.avatarSrc} alt={user.name} />
                                ) : (
                                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>

                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">Last seen, {user.lastSeen}</p>
                            </div>
                        </button>
                    ))}
                </ScrollArea>
            </div>

            {/* Right side - Chat UI */}
            <div className="flex-1 flex flex-col bg-white shadow-md">
                {currentChatUser && (
                    <div className="flex items-center space-x-3 border-b p-4">
                        <Avatar className="bg-blue-400">
                            <AvatarImage src={currentChatUser.avatarSrc} alt={currentChatUser.name} />
                            ) : (
                            <AvatarFallback></AvatarFallback>

                        </Avatar>
                        <div>
                            <p className="font-semibold">{currentChatUser.name}</p>
                            <p className="text-xs text-gray-500">Online - Last seen, {currentChatUser.lastSeen}</p>
                        </div>
                    </div>
                )}
                <ScrollArea className="flex-grow p-4 space-y-2 overflow-auto">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}
                        >
                            <p
                                className={`px-3 py-2 rounded-lg text-white text-sm ${msg.sender === "You" ? "bg-blue-500" : "bg-gray-300 text-black"
                                    }`}
                            >
                                {msg.text}
                            </p>
                            <span className="text-xs text-gray-400">{msg.time}</span>
                        </div>
                    ))}
                </ScrollArea>
                <div className="flex items-center border-t p-3 space-x-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here..."
                    />
                    <Button onClick={sendMessage} size="icon" className="-my-1">
                        <Send size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}