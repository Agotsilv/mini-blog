import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";

import { useAuthentication } from "./hooks/useAuthentication";

import { AuthProvider } from "./Context/AuthContext";

import "./App.css";

import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import CreatePost from "./Pages/CreatePost/CreatePost";
import Dashboar from "./Pages/Dashboar/Dashboar";
import Search from "./Pages/Search/Search";
import Post from "./Pages/Post/Post";
import EditPost from "./Pages/EditPost/EditPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect (() => {

    onAuthStateChanged(auth, (user) =>
    setUser(user) )

  },[auth])

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post/>}/>

              <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>} />

              <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/login"/>} />
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login"/>} />
              <Route path="/dashboar" element={user ? <Dashboar/> : <Navigate to="/login"/>} />
              
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
