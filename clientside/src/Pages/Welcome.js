import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie"

export const Welcome = () => {
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState({});
  const location = useLocation();
  const naviagte = useNavigate();

  async function hanndleFetch() {
    try {
      const response = await axios.get("/login/");
      // console.log(response.data);
      setPersons(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function hanndleUpdate(person) {
    naviagte("/form/udpate", { state: { person } });
  }
  async function hanndleDelete(person) {
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await axios.get(`/login/delete/${person.id}`);
      hanndleFetch();
    }
  }

const removeCookie=()=>
{
  console.log("Removing cookie")
  Cookie.remove("email",{path:"/"})
}


  useEffect(() => {
    const p=JSON.parse(Cookie.get("email",{path:"/"}))
    console.log(p)
    if(!p)
    {
      naviagte("/form/login")
    }
    hanndleFetch();
    //  setPerson(location.state.person)
    console.log(person);
  }, []);

  return (
    <>
      <div className="alert alert-primary w-75">
        <h1>Login User {person.name}</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Email-ID</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((p, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.mobile}</td>
                <td>{p.email}</td>
                <th>
                  <button
                    className="btn btn-success"
                    onClick={() => hanndleUpdate(p)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => hanndleDelete(p)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={removeCookie}>Remove</button>
      </div>
    </>
  );
};
