import React, { useState, useEffect, useDebugValue } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await axios.get("http://localhost:8080/api/get");
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete contact?")) {
      axios.delete(`http://localhost:8080/api/remove/${id}`);
      toast.success("Contact Deleted Successfully!");
      setTimeout(() => loadData(), 500);
    }
  };

  const updateContact = (id) => {
    axios.put(`http://localhost:8080/api/update/${id}`);
    toast.success("Contact Updated Successfully!");
    setTimeout(() => loadData(), 500);
  };

  const viewContact = (id) => {
    axios.get(`http://localhost:8080/api/get/${id}`);
  };

  return (
    <div className="container">
      <Link to="/addcontact">
        <button className="addcontact-btn">Add Contact</button>
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => {
            return (
              <tr key={key}>
                <th scope="row">{key + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <Link to={`/update/${item._id}`}>
                    <button
                      className="btn btn-edit"
                      onClick={() => updateContact(item._id)}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item._id}`}>
                    <button
                      className="btn btn-view"
                      onClick={() => viewContact(item._id)}
                    >
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
