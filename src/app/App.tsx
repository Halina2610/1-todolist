import React, { memo, useEffect } from "react";
import "./App.css";
import { Header } from "featchers/header/Header";
import { Todolist } from "featchers/todolists/Todolist";
import { Login } from "featchers/auth/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Error404 } from "featchers/error404/error404";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsInitialized } from "app/app.selectors";
import { useAppDispatch } from "hooks/useAppDispatch";
import { authActions } from "featchers/auth/auth-reducer";
import { selectIsLoggedIn } from "featchers/auth/auth.selectors";

export const App = memo(() => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isInitialized = useSelector(selectIsInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch( authActions.initializedApp());
  }, [dispatch, isInitialized]);

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
          <Route path="/" element={<Todolist />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
});
