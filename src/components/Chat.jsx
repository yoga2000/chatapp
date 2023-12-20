import React, { useEffect, useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const Chat = ({ room, setRoom }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  // Function to get room information from localStorage on component mount
  useEffect(() => {
    const storedRoom = localStorage.getItem("chatAppRoom");
    if (storedRoom) {
      setRoom(storedRoom);
    }
  }, []);

  

  // Function to save room information to localStorage whenever it changes
  useEffect(() => {
    if (room) {
      localStorage.setItem("chatAppRoom", room);
    }
  }, [room]);

  useEffect(() => {
    const queryMessage = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: {
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      },
      room: room,
    });
    setNewMessage("");
  };
  const handleDelete = async (messageId) => {
    try {
      await deleteDoc(doc(db, "messages", messageId));
      setMessages(messages.filter((message) => message.id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 ">
      <div className="bg-gray-100  flex flex-col w-full max-w-5xl    ">
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <p className="text-xl font-medium">
            Welcome to :
            <span className="uppercase pl-4 tracking-[10px] text-xl">
              {room}
            </span>
          </p>
          <button
            onClick={() => {
              setRoom(null);
              navigate("/");
            }}
            className="btn btn-primary text-white"
          >
            Create a new room
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {messages.map((message) => (
            <div key={message.id} className="chat chat-start mt-4">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="userPhoto" src={message?.user?.photoURL} />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">
                  {new Date(
                    message?.createdAt?.seconds * 1000
                  ).toLocaleTimeString()}
                </time>
              </div>
              <div className="w-full flex space-x-12 items-center flex-wrap">
                <div className="chat-bubble  ">
                  <p className="break-words font-serif">{message.text}</p>
                </div>
                {auth.currentUser.uid === message.user.uid && (
                  <button
                    className="text-red-500 ml-2 focus:outline-none"
                    onClick={() => handleDelete(message.id)}
                  >
                    <DeleteIcon />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          className="p-4 bg-white sticky bottom-0 flex items-center"
          onSubmit={handleSubmit}
        >
          <input
            className="flex-1 mr-2 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Type your message here"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
            type="submit"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
