import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Cookies from "universal-cookie";

const Nav = ({ setIsAuth, setRoom }) => {
  const signOutUser = async () => {
    try {
      // Sign out the user using Firebase authentication
      await signOut(auth);

      // Remove the authentication token stored in cookies
      const cookies = new Cookies();
      cookies.remove("auth-token");

      // Reset state variables
      setIsAuth(false);
      setRoom(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <nav className="h-[80px] bg-[#264653] flex shadow-md items-center">
      <div className="  w-full sm:max-w-7xl flex  max-w-lg  justify-between mx-auto">
        <div className="text-white text-xl md:text-3xl  uppercase tracking-[20px ] font-semibold">
          <p>Chat App</p>
        </div>
        <div className="text-white font-medium">
          <button
            onClick={signOutUser}
            className="bg-[#2a9d8f] p-3 rounded-xl hover:bg-purple-800"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
