import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookie from "js-cookie"
export const UpdateForm = () => {
  const validationSchema = Yup.object({
    id: Yup.number().required("ID is required"),
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required"),
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(/^[0-9]{10}$/),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
   
  
  });
  
const location=useLocation()
const naviagte=useNavigate()
const person=location.state.person


 

  const handelSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
try{
    const response=await axios.post("/login/update",values)
    if(response.data>0)
    {
      naviagte("/form/welcome")
    }
  }
  catch(err)
  {
    console.log(err);
  }
   

  };

  async function hanndleDelete(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await axios.get(`http://127.0.0.1:8000/login/delete/${id}`);
      naviagte("/form/welcome")
    }
  }


  useEffect(()=>
  {
    if(!Cookie.get("email"))
      {
        naviagte("/form/login")
      }
    console.log(person)
  },[])

  const initialValues = {
    id: person.id,
    name: person.name,
    age: person.age,
    mobile: person.mobile,
    email: person.email,
   
  };

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
              <label htmlFor="id" className="form-label">
                ID
              </label>
              <Field type="text" className="form-control" readonly name="id" />
              <ErrorMessage name="id" component="div" />
            </div>
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

       

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn btn-primary"
            >
              Udpate
            </button>
            <button
              type="button"
             
              className="btn btn-danger"
              onClick={()=>hanndleDelete(person.id)}
            >
              Delete
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
