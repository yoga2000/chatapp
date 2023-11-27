import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const Auth = ({ setIsAuth }) => {
  const cookies = new Cookies();
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div className="bg-gradient-to-r from-purple-500 to-violet-700 h-screen">
    //   <p>sign in with google</p>
    //   <button className="btn" onClick={handleSignIn}>
    //     sign in with google
    //   </button>
    // </div>
    <div
      className="hero h-screen bg-cover"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/communication-social-media-icons_23-2150749323.jpg?size=626&ext=jpg&ga=GA1.1.572681896.1700149943&semt=ais)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-[75%]">
          <h1 className="mb-5   text-3xl md:text-5xl font-bold text-amber-400">
            Made for people build productivity
          </h1>
          <div className="mb-5 font-semibold text-white md:text-lg">
            Secure and Instant Messaging Experience secure and real-time
            messaging with end-to-end encryption. Stay connected with your
            contacts no matter where they are.
          </div>
          <div className="mb-5 font-semibold text-white md:text-lg">
            Stay Connected Across Devices Seamlessly switch between your
            desktop, mobile, or tablet. Your conversations sync across all
            devices so you never miss a message.
          </div>
          <div className="mb-5 font-semibold text-white md:text-lg">
            <p className="text-xl">Get Started Now!</p>
            <p>
              Sign in below to dive back into your conversations or sign up to
              join the chat community.
            </p>
          </div>
          <button
            className="btn btn-wide btn-outline btn-warning  text-lg  btn-primary"
            onClick={handleSignIn}
          >
            SIGN IN WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
