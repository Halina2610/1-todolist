import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { useAppDispatch, useAppSelector } from "state/store/store";
import { LoginParamsType } from "api/todolistApi";
import { useNavigate } from "react-router-dom";
import { loginTC } from "state/thunks/thunkAuth";

export const Login = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const formik = useFormik<LoginParamsType>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: Partial<LoginParamsType> = {};

      if (!values.email.length) {
        errors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Invalid email format";
      }

      if (!values.password.length) {
        errors.password = "Password is required";
      } else if (values.password.length < 3) {
        errors.password = "Password should be at least 3 characters long";
      }

      return errors;
    },
    onSubmit: (values) => {
      formik.resetForm();
      dispatch(loginTC(values));
    },
  });

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item xs={3}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl style={{ width: "100%" }}>
              <FormLabel>
                <p>
                  To log in get registered{" "}
                  <a
                    href={"https://social-network.samuraijs.com/"}
                    target={"_blank"}
                  >
                    here
                  </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
              </FormLabel>
              <FormGroup>
                <TextField
                  label={"Email"}
                  margin={"normal"}
                  type={"email"}
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email ? (
                  <p style={{ color: "red" }}>{formik.errors.email}</p>
                ) : null}

                <TextField
                  {...formik.getFieldProps("password")}
                  type="password"
                  label="Password"
                  margin="normal"
                />
                {formik.errors.password ? (
                  <p style={{ color: "red" }}>{formik.errors.password}</p>
                ) : null}

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.rememberMe}
                      {...formik.getFieldProps("rememberMe")}
                    />
                  }
                  label={"Remember me"}
                />

                <Button type={"submit"} variant={"contained"} color={"primary"}>
                  Login
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
