import React, { useState, useEffect } from "react";
import Dd_project_schedule from "./dd_project_schedule"
import Dd_resource_assignment from "./dd_resource_assignment"
import MaterialResource from "./Material_Resource"
import MaterialTableDemo from "./Material_Project"
import DatePicker from "react-datepicker";
import BuildSchedule from "./BuildSchedule"
import BuildScheduleTab from "./BuildScheduleTab"
import Sandchart from "./Sandchart"

const Visualization = () => {
  const [ value, setValue ] = useState( 'BC' );
  const [ ame_value, setAMEValue ] = useState( 'mde' );
  const [ dt_value, setDateValue ] = useState( '' );

  const onSelect = ( event ) => {
      console.log( event.target.value );
      setValue( ( event.target.value ) );
      setAMEValue( ( event.target.ame_value ) );
  };


  useEffect(function() {
      console.log( 'making an api call since value has changed to ' + value );
  }, [ value ] )

  let el;

  switch( value ) {
      case 'BC':
          el = <BuildSchedule />
          break;
        case 'BC-T':
            el = <BuildScheduleTab />
            break;
      case 'RA':
          el = <Sandchart />
          break;
  }

  return (
    <React.Fragment>

    <label for="business" style={{'margin-left': '30%','margin-top': '4%', 'font-size': '120%'}}>Chart Type
    <div class="three columns" >
      <select onChange={onSelect} value={value}>
      <option value={'BC'}>Project Timeline - Gantt Chart</option>
      <option value={'BC-T'}>Project Timeline - Table</option>
      <option value={'PLR'}>Product Line Report</option>
      <option value={'RA'}>Headcount Allocation - Sand Chart</option>
      <option value={'RL'}>Individual Assignment</option>
      </select>
      </div>
      </label>

        <label for="business" style={{'margin-left': '30%','margin-top': '4%', 'font-size': '120%'}}>AME Role
        <div class="three columns" >
          <select onChange={onSelect} value={ame_value}>
          <option value={'mde'}>MDE</option>
          <option value={'mte'}>MTE</option>
          <option value={'mtm'}>MTM</option>
          <option value={'mda'}>MDA</option>
          <option value={'all'}>ALL</option>
          </select>
          </div>
          </label>

          


      {el}  
    </React.Fragment>

    
);
}

export default Visualization;