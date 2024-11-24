import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
export const RegisterForm = () => {
  const [csrfToken,setCsrfToken]=useState("")
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required"),
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(/^[0-9]{10}$/),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password must be at least 15 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%?&])[A-Za-z\d@.#$!^%?&]{6,15}$/,
        "letters error"
      ),
    cpassword: Yup.string()
      .required("confirm Password is required")
      .oneOf([Yup.ref("password"), null, "Password do not match"]),
  
  });

  const initialValues = {
    name: "",
    age: "",
    mobile: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const handelSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
try{
    const response=await axios.post("/save",{_csrf:csrfToken})
    console.log(response.data)
  }
  catch(err)
  {
    console.log(err);
  }
   

  };

useEffect(()=>
{
  const getCsrfToken=async ()=>
  {
    const response=await axios.get("/csrftoken")
    console.log(response)
    setCsrfToken(response.data.csrfToken)
    
  }
  getCsrfToken()
  
},[])


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handelSubmit}
    >
      {/* isSubmitting(),values ,error}*/}
      {(formik) => (
        <div className="container w-25 bg-info p-3">
          <span>
            {formik.isSubmitting ? "Successfully submited" : "Failed"}
          </span>
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Field type="text" className="form-control" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <Field
                type="number"
                size={3}
                name="age"
                className="form-control"
              />
              <ErrorMessage name="age" component="div" />
            </div>
            
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile No.
              </label>
              <Field
                type="tel"
                size={13}
                className="form-control"
                name="mobile"
              />
              <ErrorMessage name="mobile" component="div" />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <Field
                type="email"
                name="email"
                className="form-control"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
              <ErrorMessage name="email" component="div" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field type="password" className="form-control" name="password" />{" "}
              <ErrorMessage name="password" component="div" />
            </div>

            <div className="mb-3">
              <label htmlFor="c-password" className="form-label">
                Confirm Password
              </label>
              <Field
                type="password"
                className="form-control"
                name="cpassword"
              />
              <ErrorMessage name="cpassword" component="div" />
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn btn-primary"
            >
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
