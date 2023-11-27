import React from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = ({ roomInputRef, setRoom }) => {
  const navigate = useNavigate();

  const buttonHandleClick = () => {
    const enteredRoom = roomInputRef.current.value;
    setRoom(enteredRoom);

    navigate("chat");
  };
  return (
    <div className=" h-screen  flex justify-center items-center   bg-sky-500">
      <div className=" rounded-lg w-full   max-w-md mx-auto  bg-white shadow-xl">
        <div className=" flex  flex-col  items-center p-12">
          <h1 className="text-xl md:text-2xl mb-4">Enter Room Name</h1>
          <input
            type="text"
            placeholder="Type  here"
            className="input input-bordered input-accent w-full max-w-xs mb-6"
            ref={roomInputRef}
          />
          <button
            className="btn btn-wide btn-circle btn-accent text-lg"
            onClick={buttonHandleClick}
          >
            Enter Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
