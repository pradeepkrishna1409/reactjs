import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import Table from "./Table";


function Table_project() {
  const columns = useMemo(
    () => [
      {
        Header: "TV Show",
        columns: [
          {
            Header: "Project",
            accessor: "Project"
          },
          {
            Header: "Product Family",
            accessor: "Product_Family"
          }
        ]
      },
    ],
    []
  );

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
    <div className="App">
      <Table columns={columns} data={users} />
    </div>
  );
}


export default Table_project;
