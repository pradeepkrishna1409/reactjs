import React, { useState, useEffect } from "react";
import MaterialResource from "./Material_Resource"
import MaterialTableDemo from "./Material_Project"
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
//import '../../assets/App.css';

const Home = () => {
    const [value,setValue]=useState('proj');
    const handleSelect=(e)=>{
      console.log(e);
      setValue(e)
    }
   

  useEffect(function() {
      console.log( 'making an api call since value has changed to ' + value );
  }, [ value ] )

  let el;

  switch( value ) {
      case 'proj':
          el = <MaterialTableDemo />
          break;
      case 'res':
          el = <MaterialResource />
          break;
  }

  return (
    <React.Fragment>

    <DropdownButton
    dropup center-block
    style={{ marginLeft: 120, marginTop: 15, marginBottom: 15, width : 25 }}
    title="Table Name"
    variant="success"
    onSelect={handleSelect}
    className="my-custom-dropdown"
    >
            <Dropdown.Item eventKey="proj">Project Schedule</Dropdown.Item>
            <Dropdown.Item eventKey="res">Resource Assignment</Dropdown.Item>
    </DropdownButton>
      {el}  
    </React.Fragment>

    
);
}

export default Home;