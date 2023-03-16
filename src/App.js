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
import HistoryRecall from "./components/HistoryRecall";
import EditFoodItems from "./components/EditFoodItems";
import EditMain from "./components/editOption/EditMain";
import UserInfo from "./components/UserInfo";

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
    if (window.innerWidth > 450) {
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
    }
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <>
            <div className="xl:flex hidden w-screen h-screen justify-center items-center">
              <BarLoader color="#000" loading={true} size={150} />
            </div>
            <div className="flex xl:hidden w-screen h-screen justify-center items-center font-semibold text-xl">
              Please Use a Bigger screen or Laptop.
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
        path="/info"
        element={
          <Protected isSignedIn={isSignedIn}>
            <UserInfo
              userDetails={userDetails}
              setIsSignedIn={setIsSignedIn}
              setCurrentData={setCurrentData}
              currentData={currentData}
              allEnteredData={allEnteredData}
              setAllEnteredData={setAllEnteredData}
              userCred={userCred}
            />
          </Protected>
        }
      />
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
              setCurrentData={setCurrentData}
              currentData={currentData}
              allEnteredData={allEnteredData}
              setAllEnteredData={setAllEnteredData}
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
            <HistoryRecall
              setCurrentData={setCurrentData}
              currentData={currentData}
            />
          </Protected>
        }
      />
      <Route
        path="/edit-fooditems"
        element={
          <Protected isSignedIn={isSignedIn}>
            <EditFoodItems />
          </Protected>
        }
      />
      <Route
        path="/edit-recall"
        element={
          <Protected isSignedIn={isSignedIn}>
            <EditMain
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
    </Routes>
  );
}

export default App;
