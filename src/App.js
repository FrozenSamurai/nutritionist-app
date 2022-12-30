import "./App.css";
import app from "./firebase/FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import SignIn from "./components/SignIn";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Route, Routes, useNavigate } from "react-router-dom";
import MainScreen from "./components/MainScreen";
import Dashboard from "./components/Dashboard";
import Protected from "./components/Protected";
import History from "./components/History";
import { BarLoader } from "react-spinners";

function App() {
  const db = getDatabase(app);
  const auth = getAuth(app);

  const [nutrients, setNutrients] = useState({});
  const [userCred, setUserCred] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [currentData, setCurrentData] = useState({});
  const [allEnteredData, setAllEnteredData] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        setUserCred(user);
        setIsSignedIn(true);
        const db = getDatabase();
        onValue(ref(db, `/users/${user.uid}`), (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          setUserDetails(data);
          navigate("/dashboard");
        });
        // ...
      } else {
        // User is signed out
        setIsSignedIn(false);
        navigate("/signin");
        // ...
      }
    });
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <>
            <div className="w-screen h-screen flex justify-center items-center">
              <BarLoader color="#000" loading={true} size={150} />
            </div>
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <SignIn
            setUserCred={setUserCred}
            setUserDetails={setUserDetails}
            setIsSignedIn={setIsSignedIn}
          />
        }
      />
      {/* <Route
        path="/home"
        element={
          <Home
            nutrients={nutrients}
            setNutrients={setNutrients}
            userDetails={userDetails}
            userCred={userCred}
            setCurrentData={setCurrentData}
            currentData={currentData}
            allEnteredData={allEnteredData}
            setAllEnteredData={setAllEnteredData}
          />
        }
      /> */}

      <Route
        path="/main"
        element={
          <Protected isSignedIn={isSignedIn}>
            <MainScreen
              nutrients={nutrients}
              setNutrients={setNutrients}
              userDetails={userDetails}
              userCred={userCred}
              setCurrentData={setCurrentData}
              currentData={currentData}
              allEnteredData={allEnteredData}
              setAllEnteredData={setAllEnteredData}
            />
          </Protected>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Protected isSignedIn={isSignedIn}>
            <Dashboard
              userDetails={userDetails}
              setIsSignedIn={setIsSignedIn}
            />
          </Protected>
        }
      />
      <Route
        path="/history"
        element={
          <Protected isSignedIn={isSignedIn}>
            <History
              nutrients={nutrients}
              setNutrients={setNutrients}
              userDetails={userDetails}
              userCred={userCred}
              setCurrentData={setCurrentData}
              currentData={currentData}
              allEnteredData={allEnteredData}
              setAllEnteredData={setAllEnteredData}
            />
          </Protected>
        }
      />
      <Route
        path="/history-recall"
        element={
          <Protected isSignedIn={isSignedIn}>
            <div className="w-screen h-screen flex flex-col justify-center items-center text-4xl font-bold font-firaCode">
              <h1 className="w-fit ">Coming Soon!!</h1>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go Black
              </button>
            </div>
          </Protected>
        }
      />
    </Routes>
  );
}

export default App;
