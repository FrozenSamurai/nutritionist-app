import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import ForgotPassModal from "./ForgotPassModal";
import "./Signin.css";

const SignIn = ({ setUserDetails, setUserCred, setIsSignedIn }) => {
  const navigate = useNavigate();

  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [userNames, setUserNames] = useState([]);

  const container = document.getElementById("container");
  const Username = document.getElementById("Username");

  // console.log("signin");

  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, "identity"), (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      let usernames = [];
      Object.keys(data).map((key) => {
        usernames.push(String(key).toLowerCase());
      });
      setUserNames(usernames);
    });
  }, []);

  const LoginUser = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        setUserCred(user);
        setIsSignedIn(true);
        const db = getDatabase();
        onValue(ref(db, `/users/${user.uid}`), (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          setUserDetails(data);
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        setIsLoading(false);
      });
  };
  const NewUser = (email, password) => {
    if (!userNames.includes(name.toLowerCase())) {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          setUserCred(user);
          setIsSignedIn(true);
          const db = getDatabase();

          //add user's details
          const userDetails = {
            email: email,
            name: name,
            role: "Nutritionist",
          };
          set(ref(db, "users/" + user.uid), { ...userDetails });
          //add username to identities

          set(ref(db, "identity/" + name), user.uid);

          onValue(ref(db, `/users/${user.uid}`), (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            setUserDetails(data);
            navigate("/dashboard");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode, errorMessage);
          setIsLoading(false);
        });
    }
  };
  return (
    <div
      className="
     min-h-screen w-full h-full bg-opacity-50 flex justify-center items-center font-firaCode bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url(assets/background.jpg)",
      }}
    >
      <div className="container my-5" id="container">
        <div
          className="form-container sign-up-container"
          onKeyDown={(e) => {
            if (e.key === "Enter" && name && email && password && gender) {
              NewUser(email, password);
            }
          }}
        >
          <div className="main-div">
            <h1 className="font-bold m-0">Create Account</h1>
            <span className="text-[12px]">
              or use your email for registration
            </span>
            <input
              type="text"
              id="Username"
              placeholder="Username"
              className="input-fields"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                // e.target.classList.add("error add-shadow");
              }}
              onBlur={(e) => {
                if (userNames.includes(e.target.value.toLowerCase())) {
                  console.log("error");
                  alert(
                    "Username already exists\nPlease try a different Username"
                  );
                  Username.classList.add("error");
                  Username.classList.add("add-shadow");
                  // Username.style.boxShadow = "0 0 0 0.2rem red";
                  setTimeout(() => {
                    Username.classList.remove("error");
                    // Username.classList.remove("add -shadow");
                  }, 400);
                } else {
                  Username.classList.remove("error");
                  Username.classList.remove("add-shadow");
                }
              }}
            />
            <input
              type="email"
              placeholder="Email"
              className="input-fields"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-fields"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              className="flex items-center space-x-2 w-full"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <h1 className="font-semibold">Gender:</h1>

              <div className="flex justify-center items-center">
                <input type="radio" value="Male" id="Male" name="gender" />
                <label htmlFor="Male">Male</label>
              </div>
              <div className="flex justify-center items-center">
                <input type="radio" value="Female" id="Female" name="gender" />
                <label htmlFor="Female">Female</label>
              </div>
              <div className="flex justify-center items-center">
                <input type="radio" value="Other" id="Other" name="gender" />
                <label htmlFor="Other">Other</label>
              </div>
            </div>
            <button
              className={
                name && email && password && gender
                  ? "active:scale-95 focus:outline-none"
                  : "disabled:opacity-50 disabled:cursor-not-allowed"
              }
              style={{
                borderRadius: "20px",
                border: "1px solid #ff4b2b",
                backgroundColor: "#ff4b2b",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "12px 45px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "transform 80ms ease-in",
              }}
              disabled={!(name && email && password && gender)}
              onClick={() => {
                NewUser(email, password);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div
          className="form-container sign-in-container"
          onKeyDown={(e) => {
            if (e.key === "Enter" && email && password) {
              LoginUser(email, password);
            }
          }}
        >
          <div className="main-div">
            <h1 className="font-bold m-0">Sign in</h1>

            <span className="text-[12px]">or use your account</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="input-fields"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input-fields"
            />
            <h1
              className="text-[#333] text-sm mx-[15px] my-3 hover:text-red-400 cursor-pointer"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Forgot your password?
            </h1>
            <button
              className={
                email && password
                  ? "active:scale-95 focus:outline-none"
                  : "disabled:opacity-50 disabled:cursor-not-allowed"
              }
              style={{
                borderRadius: "20px",
                border: "1px solid #ff4b2b",
                backgroundColor: "#ff4b2b",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "12px 45px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "transform 80ms ease-in",
              }}
              disabled={!(email && password)}
              onClick={() => {
                LoginUser(email, password);
              }}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="font-bold m-0">Welcome Back!</h1>
              <p
                className="text-sm font-[100] "
                style={{
                  letterSpacing: "0.5px",
                  margin: "20px 0 30px",
                }}
              >
                To keep connected with us please login with your personal info
              </p>
              <button
                className="active:scale-95 focus:outline-none ghost"
                style={{
                  borderRadius: "20px",
                  border: "1px solid ",
                  // backgroundColor: "#ff4b2b",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "12px 45px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  transition: "transform 80ms ease-in",
                }}
                id="signIn"
                onClick={() => {
                  container.classList.remove("right-panel-active");
                }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="font-bold m-0">Hello, Friend!</h1>
              <p
                className="text-sm font-[100] "
                style={{
                  letterSpacing: "0.5px",
                  margin: "20px 0 30px",
                }}
              >
                Enter your personal details and start journey with us
              </p>
              <button
                className="active:scale-95 focus:outline-none ghost"
                style={{
                  borderRadius: "20px",
                  border: "1px solid",
                  // backgroundColor: "#ff4b2b",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "12px 45px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  transition: "transform 80ms ease-in",
                }}
                id="signUp"
                onClick={() => {
                  container.classList.add("right-panel-active");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <ForgotPassModal setShowModal={setShowModal} />}
      {isLoading && (
        <div className="w-full fixed h-full bg-black bg-opacity-50 z-[1000]">
          <div className="w-full h-full flex justify-center items-center flex-col space-y-5">
            <SyncLoader color="#fff" />
            <h1 className="text-xl text-white">Please wait...</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
