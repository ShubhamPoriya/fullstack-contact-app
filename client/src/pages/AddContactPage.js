import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddContactPage.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
};

const AddContactPage = () => {
  const [newContact, setNewContact] = useState(initialState);
  const { name, email, phone } = newContact;

  const navigate = useNavigate();
  const { _id } = useParams();
  console.log(_id);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/get/${_id}`)
      .then((res) => setNewContact({ ...res.data[0] }));
  }, [_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error("Please enter all fields");
    } else {
      axios
        .post("http://localhost:8080/api/post", {
          name,
          email,
          phone,
        })
        .then(() => {
          setNewContact({ name: "", email: "", phone: "" });
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
      toast.success("Contact Saved Successfully!");
    }
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  return (
    <div className="form-container">
      <h2>Add / Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Full Name"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="abc@gmail.com"
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="number"
          id="phone"
          name="phone"
          placeholder="xxx-xxx-xxxx"
          value={phone || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={_id ? "Update" : "Save"} />
        <Link to="/home">
          <input type="button" value="Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddContactPage;
