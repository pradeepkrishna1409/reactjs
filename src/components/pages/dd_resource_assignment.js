import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dd_resource_assignment = () => {
  const [resources, setResource] = useState([]);

  useEffect(() => {
    loadResources();
  }, []);

  

  const loadResources = async () => {
    const result = await axios.get("http://localhost:4000/resource_assignment");
    console.log(" user is ", result.data['data'])
    setResource(result.data);
  };

  return (
    
    
    <div className="container">
    <div className="py-4">
      <table class="table border shadow">
        <thead class="thead-dark">
          <tr>

          <th>Action</th>
            <th scope="col">Resource</th>
            <th scope="col">AME Function</th>
            <th scope="col">Project</th>

            <th scope="col">Product Assessment Allocation</th>
            <th scope="col">BRD Allocation</th>
            <th scope="col">Proto Allocation</th>


            <th scope="col">Dev Commit Allocation</th>
            <th scope="col">HVT Allocation</th>
            <th scope="col">EVT Allocation</th>


            <th scope="col">DVT Allocatione</th>
            <th scope="col">PVT Allocatione</th>
            <th scope="col">Street Allocation</th>


          </tr>
        </thead>
        <tbody>
          {resources.map((resources, index) => (
            <tr>

            <td>
            <Link class="btn btn-primary mr-2" to={`/users/${resources.Project}`}>
              View
            </Link>
            <Link
              class="btn btn-outline-primary mr-2"
              to={`/users/edit/${resources.Project}`}
            >
              Edit
            </Link>
            <Link
              class="btn btn-danger"
            >
              Delete
            </Link>
          </td>
              
              <td>{resources.Project}</td>
              <td>{resources.Product_Family}</td>
              <td>{resources.Device_Type}</td>
              <td>{resources.Product_Family}</td>
              <td>{resources.Street_Date}</td>
              <td>{resources.Product_Assessment_Date}</td>
              <td>{resources.BRD_Date}</td>
              <td>{resources.Proto_Date}</td>
              <td>{resources.Dev_Commit_Date}</td>
              <td>{resources.HVT_Date}</td>
              <td>{resources.EVT_Date}</td>
              <td>{resources.DVT_Date}</td>
              <td>{resources.PVT_Date}</td>
              <td>{resources.MTE_Actual}</td>
              <td>{resources.MTM_Actual}</td>
              <td>{resources.MDE_Actual}</td>
              <td>{resources.MTS_Actual}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Dd_resource_assignment;