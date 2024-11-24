import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Cookie from "js-cookie"

export const LoginForm = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
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
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handelSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);

    try {
      const response = await axios.post("/login/", values);
      const person=await response.data
     
      if (person) {
        // Cookie.set("email",person.email,{expires:7/*days*/,path:"/"})
        Cookie.set("email",JSON.stringify(person),{expires:7/*days*/,path:"/"})
        navigate("/form/welcome",{state:{person}});
      }
    } catch (err) {
      console.log(err);
    }
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
