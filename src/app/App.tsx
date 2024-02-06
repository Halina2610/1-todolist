import React, { memo, useEffect } from "react";
import "./App.css";
import { Header } from "featchers/header/Header";
import { TodoLists } from "featchers/todolists/TodoLists";
import { Login } from "featchers/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Error404 } from "featchers/error404/error404";
import { useAppDispatch } from "state/store/store";
import { CircularProgress } from "@mui/material";
import { initializeAppTC } from "state/thunks/authThunk";
import { useSelector } from "react-redux";
import { selectIsInitialized } from "state/selectors/app.selectors";

export const App = memo(() => {

  const isInitialized = useSelector(selectIsInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

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
          <Route path="/" element={<TodoLists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error404" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/error404" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
});
