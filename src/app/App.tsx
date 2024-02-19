import React, { memo, useEffect } from "react";
import "./App.css";
import { Header } from "featchers/header/Header";
import { Todolists } from "featchers/todolists/Todolists";
import { Login } from "featchers/auth/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Error404 } from "featchers/error404/error404";
import { useAppDispatch } from "app/store";
import { CircularProgress } from "@mui/material";
import { initializeAppTC } from "featchers/auth/auth-thunk";
import { useSelector } from "react-redux";
import { selectIsInitialized } from "app/app.selectors";

export const App = memo(() => {

  const isInitialized = useSelector(selectIsInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30%",
        }}
      >
        <CircularProgress size={"100px"} />
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Todolists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error404" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/error404" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
});
