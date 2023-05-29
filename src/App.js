import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useState } from "react";
import HomePage from "./pages/HomePage.js";
import NewPost from "./pages/NewPost.js";

export default function App() {

  const [updateApp, setUpdate] = useState();

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage updateApp={updateApp}/>} />
          <Route path="/newPost" element={<NewPost setUpdate={setUpdate}/>} />
        </Routes>
      </BrowserRouter>
  )
}