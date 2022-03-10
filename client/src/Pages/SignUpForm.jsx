import { useState, useEffect, useContext } from "react";
import { useFormik, validateYupSchema } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


export const SignUpForm = () => {
  const [allUsernames, setAllUsernames] = useState([]);
  const [message, setMessage] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  useEffect(() => {
    const fetchAllUsernames = async () => {
      const result = await axios.get("/api/users/allusername");
      setAllUsernames(result?.data?.data);
    };
    fetchAllUsernames();
    console.log(allUsernames);
  }, []);

  const validateSchema = (usernames) => {
    const allUsernames = [];
    usernames.map((username) => {
      return allUsernames.push(username.username);
    });
    const allEmails = [];
    usernames.map((useremail) => {
      return allEmails.push(useremail.email);
    });
    console.log("emails", allEmails);
    const schema = Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(6, "Username must be at least 6 characters")
        .notOneOf(allUsernames, "This username is taken"),
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required")
        .notOneOf(allEmails, "This email is already registered. Please log in"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password required"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords does not match")
        .required("Please confirm password"),
    });
    return schema;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validateSchema(allUsernames),
    onSubmit: async (values) => {
      const body = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      // console.log("submitted values: ", values);
      axios({
        method: "post",
        url: "/api/users/signup",
        headers: { "Content-Type": "application/json" },
        data: body,
      }).then((response) => {
        if (response.data.status === "not ok") {
          console.log(response.data.message);
        } else {
          const result = response.data;
          console.log("result", result);
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
          localStorage.setItem("userContext", JSON.stringify(user));
          setUserContext(user);
          setMessage("You have successfully signed up. Please log in");
        }
      });
    },
  });

  return (
    <div className="container-sm mt-5">
      <h4>Sign Up</h4>
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
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <div className="text-danger">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
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
          <br />
          <div className="px-5 mt-0 align-self-center">
            <label htmlFor="repeatPassword" className="form-label">
              Repeat Password
            </label>
            <input
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repeatPassword}
            />
            <div className="text-danger">
              {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
                <div>{formik.errors.repeatPassword}</div>
              ) : null}
            </div>
          </div>
          <br />
          <div className="d-grid col-4 mx-auto mt-0 p-5">
            <button type="submit" className="btn btn-secondary">
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-success">{message}</div>
      </div>
    </div>
  );
};
