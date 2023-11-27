import { useState, useRef } from "react";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
const cookies = new Cookies();
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateRoom from "./components/CreateRoom";

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Nav setRoom={setRoom} setIsAuth={setIsAuth} />

      {room ? (
        <Routes>
          <Route path="chat" element={<Chat room={room} setRoom={setRoom} />} />
        </Routes>
      ) : (
        <CreateRoom setRoom={setRoom} roomInputRef={roomInputRef} />
      )}
    </BrowserRouter>
  );
};

export default App;
