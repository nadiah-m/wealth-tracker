import { useState, useEffect, useContext } from "react";
import { useFormik, validateYupSchema } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../App";
import { useNavigate, Link } from "react-router-dom";

export const SignInForm = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      const body = {
        username: values.username,
        password: values.password,
      };
      axios({
        method: "post",
        url: "/api/users/login",
        headers: { "Content-Type": "application/json" },
        data: body,
      }).then((response) => {
        if (response.data.status === "not ok") {
          console.log(response.data.message);
          const newMsg = response.data.message;
          setMessage(newMsg);
        } else {
          const result = response.data;
          console.log("user is logged in ", result);
          const loginmsg = "You are logged in";
          setMessage(loginmsg);
          localStorage.setItem("userContext", JSON.stringify(result));
          setUserContext(result);
          navigate(`/${result?.data?.username}`, { replace: true });
          console.log(result.username);
        }
      });
    },
  });

  return (
    <div className="container mt-5">
      <h4>Log In</h4>
      <div className="row d-flex card mx-auto" style={{ width: "50rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="px-5 mt-5 align-self-center">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            <div className="text-danger">
              {formik.touched?.username && formik.errors?.username ? (
                <div>{formik.errors.username}</div>
              ) : null}
            </div>
          </div>
          <br />

          <div className="px-5 mt-0 align-self-center">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <div className="text-danger">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className="d-grid col-4 mx-auto p-5">
            <button type="submit" className="btn btn-secondary">
              Login
            </button>
          </div>
        </form>
        <div className="text-danger">{message}</div>
        No account?{" "}
        <Link className="text-decoration-none" to="/signup">
          Sign up for an account
        </Link>
      </div>
    </div>
  );
};
