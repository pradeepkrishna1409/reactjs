import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditProject = () => {
  let history = useHistory();
  const { project_name } = useParams();

  const [project_name, setProjectName] = useState({
    projects : '' ,
    program: '' ,
    device_type: '' ,
    ame_engagement: '' ,
    product_assessment_date: '' ,
    brd_date : '' ,
    proto_date: '' ,
    dev_commit_date: '' ,
    hvt_date: '' ,
    evt_date: '' ,
    dvt_date: '' ,
    pvt_date: '' ,
    street_date: '' ,
    mte_actual: '' ,
    mtm_actual: '' ,
    mde_actual: '' ,
    mts_actual: '' 
  });

  const { projects  ,
    program ,
    device_type ,
    ame_engagement ,
    product_assessment_date ,
    brd_date  ,
    proto_date ,
    dev_commit_date ,
    hvt_date ,
    evt_date ,
    dvt_date ,
    pvt_date ,
    street_date ,
    mte_actual ,
    mtm_actual ,
    mde_actual ,
    mts_actual  } = project_name;

  const onInputChange = e => {
    setProjectName({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/users/${project_name}`, user);
    history.push("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${project_name}`);
    setUser(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Project</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Project Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Family"
              name="username"
              value={username}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Device Type"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter AME Engagement"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Street Date"
              name="website"
              value={website}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
          <input
            type="date"
            className="form-control form-control-lg"
            placeholder="Enter Product Assessment Date"
            name="website"
            value={website}
            onChange={e => onInputChange(e)}
          />
        </div>


        <div className="form-group">
        <input
          type="date"
          className="form-control form-control-lg"
          placeholder="Enter BRD Date"
          name="website"
          value={website}
          onChange={e => onInputChange(e)}
        />
      </div>


      <div className="form-group">
      <input
        type="date"
        className="form-control form-control-lg"
        placeholder="Enter Street Date"
        name="website"
        value={website}
        onChange={e => onInputChange(e)}
      />
    </div>


    <div className="form-group">
    <input
      type="date"
      className="form-control form-control-lg"
      placeholder="Enter Proto Date"
      name="website"
      value={website}
      onChange={e => onInputChange(e)}
    />
  </div>


  <div className="form-group">
  <input
    type="date"
    className="form-control form-control-lg"
    placeholder="Enter Dev Commit Date"
    name="website"
    value={website}
    onChange={e => onInputChange(e)}
  />
</div>

<div className="form-group">
<input
  type="date"
  className="form-control form-control-lg"
  placeholder="Enter Dev Commit Date"
  name="website"
  value={website}
  onChange={e => onInputChange(e)}
/>
</div>


<div className="form-group">
<input
  type="date"
  className="form-control form-control-lg"
  placeholder="Enter Dev Commit Date"
  name="website"
  value={website}
  onChange={e => onInputChange(e)}
/>
</div>


<div className="form-group">
<input
  type="date"
  className="form-control form-control-lg"
  placeholder="Enter Dev Commit Date"
  name="website"
  value={website}
  onChange={e => onInputChange(e)}
/>
</div>


<div className="form-group">
<input
  type="date"
  className="form-control form-control-lg"
  placeholder="Enter Dev Commit Date"
  name="website"
  value={website}
  onChange={e => onInputChange(e)}
/>
</div>

<div className="form-group">
<input
  type="date"
  className="form-control form-control-lg"
  placeholder="Enter Dev Commit Date"
  name="website"
  value={website}
  onChange={e => onInputChange(e)}
/>
</div>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;