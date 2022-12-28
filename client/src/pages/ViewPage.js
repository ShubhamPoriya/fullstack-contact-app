import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ViewPage = () => {
  const [data, setData] = useState({});
  const { _id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/get/${_id}`)
      .then((res) => setData({ ...res.data[0] }));
  }, [_id]);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h4>Contact Details</h4>
        </div>
        <div className="card-body">
          <label>Name</label>
          <span>{data.name}</span>

          <label>Email</label>
          <span>{data.email}</span>

          <label>Phone</label>
          <span>{data.phone}</span>
        </div>
        <Link to="/home">
          <div className="back-btn">Back</div>
        </Link>
      </div>
    </div>
  );
};

export default ViewPage;
