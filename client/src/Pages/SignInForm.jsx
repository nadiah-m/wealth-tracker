import { useState, useEffect, useContext } from "react";
import { useFormik, validateYupSchema } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../App";

export const SignInForm = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [message, setMessage] = useState("");

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
          const result = response.data.data;
          console.log("user is logged in ", result);
          const loginmsg = "You are logged in";
          setMessage(loginmsg);
          let user = {
            userID: "",
            username: "",
            password: "",
            isLoggedIn: true,
          };
          user = {
            ...user,
            userID: result._id,
            username: result.username,
            password: result.password,
          };
          console.log(user);
          setUserContext(user);
        }
      });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched?.username && formik.errors?.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
      {message}
    </>
  );
};
