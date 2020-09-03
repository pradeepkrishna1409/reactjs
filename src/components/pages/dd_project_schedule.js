import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dd_project_schedule = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:4000/project_schedule");
    console.log(" user is ", result.data['data'])
    setUser(result.data);
  };


  return (
    
    
    <div className="container">
    <div className="py-4">
      <table class="table border shadow">
        <thead class="thead-dark">
          <tr>

          <th>Action</th>
            <th scope="col">Project</th>
            <th scope="col">Product Family</th>
            <th scope="col">Device Type</th>

            <th scope="col">AME Engagement</th>
            <th scope="col">Street Date</th>
            <th scope="col">Product Assessment Date</th>


            <th scope="col">BRD Date</th>
            <th scope="col">Proto Date</th>
            <th scope="col">Dev Commit Date</th>


            <th scope="col">Dev Commit Date</th>
            <th scope="col">EVT Date</th>
            <th scope="col">DVT Date</th>


            <th scope="col">PVT Date</th>
            <th scope="col">MTE Actual</th>
            <th scope="col">MTM Actual</th>



            <th scope="col">MDE Actual</th>
            <th scope="col">MTS Actual</th>


          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>

            <td>
            <Link class="btn btn-primary mr-2" to={`/users/${user.Project}`}>
              View
            </Link>
            <Link
              class="btn btn-outline-primary mr-2"
              to={`/users/edit/${user.Project}`}
            >
              Edit
            </Link>
            <Link
              class="btn btn-danger"
            >
              Delete
            </Link>
          </td>
              
              <td>{user.Project}</td>
              <td>{user.Product_Family}</td>
              <td>{user.Device_Type}</td>
              <td>{user.Product_Family}</td>
              <td>{user.Street_Date}</td>
              <td>{user.Product_Assessment_Date}</td>
              <td>{user.BRD_Date}</td>
              <td>{user.Proto_Date}</td>
              <td>{user.Dev_Commit_Date}</td>
              <td>{user.HVT_Date}</td>
              <td>{user.EVT_Date}</td>
              <td>{user.DVT_Date}</td>
              <td>{user.PVT_Date}</td>
              <td>{user.MTE_Actual}</td>
              <td>{user.MTM_Actual}</td>
              <td>{user.MDE_Actual}</td>
              <td>{user.MTS_Actual}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Dd_project_schedule;