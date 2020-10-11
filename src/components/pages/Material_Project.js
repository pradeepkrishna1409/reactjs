import MaterialTable from 'material-table';
import Table from '@material-ui/core/Table';
import Container from '@material-ui/core/Container';
import React, { useState, useEffect } from "react";
import axios from "axios";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Loader from 'react-loader-spinner'
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import 'moment-timezone';
import { TablePagination } from "@material-ui/core";



export default function MaterialProject({ children, Pagesize , SetPagesize, searchTerm , setsearchTerm}) {
  const [state, setState] = React.useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  //const [rowsPerPage, setRowsPerPage] = useLocalStorage("page_set", 20);


  const handleChangeRowsPerPage = event => {SetPagesize(+event.target.value); console.log( 'page size = ', +event.target.value );}; 

  console.log( 'rendering material project; page size = ', Pagesize );


  useEffect(() => {
    loadUsers();
    console.log(" use effect called ")
  }, []);


  let options_set= {
    addRowPosition: "first",
    pageSize: Pagesize,
    pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
    toolbar: true,
    paging: true,
    searchFieldStyle: {
      width: "24ch",
      color: "red"
    },
    searchText:searchTerm,
    searchFieldAlignment : "right",
    headerStyle: {
      backgroundColor: '#01579b',
      color: '#FFF',
      position: 'sticky', top: 0 

    },
    filtering: true,
    maxBodyHeight: '1500px' 
  }

  console.log( 'options_set = ', options_set );


  const loadUsers = async () => {

    const result = await axios.get("/headcount/project_schedule");
    console.log(" user is ", result.data)
    setState(result.data)

    setDataFetched(true)

    const pf = await axios.get("/headcount/product_family");
    console.log(" type pf is ", typeof pf.data)
    console.log(" pf is ", pf.data)

    var pf_res = pf.data.reduce(function (map, obj) {
      console.log("obj is ", obj)
      map[obj.program_name] = obj.program_name;
      return map;
    }, {});

    console.log("pf_res is ", pf_res)

  };

  const tableIcons = {
    //Add: () => 'Add Project',
    Add: forwardRef((props, ref) => (
      <Fab ref={ref} {...props} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    )),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


  const toolbarStyle = {
    minHeight: '80px',
  };

  const moment = require('moment');
  moment().tz("America/Los_Angeles").format();


  return (

    <div style={{ marginLeft: 0 }}>
    <Container maxWidth="false">

    <div>
      {!dataFetched ? <Loader type="Puff" color='Teal'  style={{ width:"1" , position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} /> :
        <div style={{ maxWidth: "100%", paddingTop: "12px" }}>
          <MaterialTable  
          toolbar = {{
            minHeight: '10px'
          }}
            localization={{
              pagination: {
                labelDisplayedRows: '{from}-{to} of {count}'
              },
              toolbar: {
                nRowsSelected: '{0} row(s) selected'
              },
              header: {
                actions: 'Modify'
              },
              body: {
                emptyDataSourceMessage: 'No records to display',
                filterRow: {
                  filterTooltip: 'Filter'
                },
                addTooltip: '+'
              }
            }}
            components={{
              Pagination: props => (
                <TablePagination
                  {...props}
                  rowsPerPageOptions={[5, 10, 20, 30, 50, 75, 100]}
                  rowsPerPage={Pagesize}
                  //updates pagination, but no re-size
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              )
            }}
            options={options_set}
            icons={tableIcons}
            title="Project Schedule"        
            columns={[
              { title: 'Project', field: 'Project', editable: 'onAdd' },
              {
                title: 'Product Family', field: 'Product_Family', lookup: {
                  "Advanced Products": "Advanced Products",
                  "E-Readers": "E-Readers",
                  "Echo": "Echo",
                  "Emerging & Jumpstart": "Emerging & Jumpstart",
                  "Fire TV": "Fire TV",
                  "Health & Wellness": "Health & Wellness",
                  "Tablets": "Tablets",
                  "N/A" : "N/A"
                }
              },
              {
                title: 'Device Type', field: 'Device_Type', lookup: {
                  "Accessory": "Accessory",
                  "Device": "Device",
                  "N/A" : "N/A"
                }
              },
              {
                title: 'AME Engagement',
                field: 'AME_Engagement',
                lookup: {
                  "High": "High",
                  "Low": "Low",
                  "Medium": "Medium",
                  "Fixed" : "Fixed",
                  "N/A" : "N/A"
                }
              },
              { title: 'Street Date', field: 'Street_Date', type: "date", filtering: false  },
              { title: 'Product Assessment Date', field: 'Product_Assessment_Date', type: "date", filtering: false },

              { title: 'BRD Date', field: 'BRD_Date', type: "date" , filtering: false},

              { title: 'Proto Date', field: 'Proto_Date', type: "date" , filtering: false},

              { title: 'Dev Commit Date', field: 'Dev_Commit_Date', type: "date", filtering: false },

              { title: 'HVT Date', field: 'HVT_Date', type: "date", filtering: false },

              { title: 'EVT Date', field: 'EVT_Date', type: "date", filtering: false },

              { title: 'DVT Date', field: 'DVT_Date', type: "date" , filtering: false},

              { title: 'PVT Date', field: 'PVT_Date', type: "date", filtering: false },

              { title: 'MTE Plan', field: 'MTE_Actual', filtering: false },

              { title: 'MTM Plan', field: 'MTM_Actual', filtering: false },

              { title: 'MDE Plan', field: 'MDE_Actual', filtering: false },

              { title: 'MTS Plan', field: 'MTS_Actual', filtering: false },
            ]}
            data={state}
            editable={{
              onRowAdd: (newData) => {
                console.log(" newData is ", newData);

                return axios.post(
                  `/headcount/project_schedule`,
                  newData,
                  {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                )
                  .then(resp => {
                    setState((prevState) => {
                      const newProducts = [...state];
                      
                      if (newData.AME_Engagement == 'High'  &&  newData.program == 'Jumpstart') {

                        newData.MTE_Actual = "1"
                        newData.MTM_Actual = "1"
                        newData.MTS_Actual = "0"
                        newData.MDE_Actual = "0.5"

                      }

                      else if (newData.AME_Engagement == 'Medium'  &&  newData.program == 'Jumpstart') {

                        newData.MTE_Actual = "0.75"
                        newData.MTM_Actual = "1"
                        newData.MTS_Actual = "0"
                        newData.MDE_Actual = "0.5"

                      }

                      else if (newData.AME_Engagement == 'Low'  &&  newData.program == 'Jumpstart') {

                        newData.MTE_Actual = "0.15"
                        newData.MTM_Actual = "0.25"
                        newData.MTS_Actual = "0"
                        newData.MDE_Actual = "0.01"

                      }

                      else if (newData.AME_Engagement == 'Medium'  &&  newData.program != 'Jumpstart') {

                        newData.MTE_Actual = "1.50"
                        newData.MTM_Actual = "1.50"
                        newData.MTS_Actual = "0.5"
                        newData.MDE_Actual = "1.50"

                      }

                      else if (newData.AME_Engagement == 'High'  &&  newData.program != 'Jumpstart') {

                        newData.MTE_Actual = "2"
                        newData.MTM_Actual = "2"
                        newData.MTS_Actual = "1"
                        newData.MDE_Actual = "2"


                      }

                      else if (newData.AME_Engagement == 'Low'  &&  newData.program != 'Jumpstart') {

                        newData.MTE_Actual = "0.50"
                        newData.MTM_Actual = "1"
                        newData.MTS_Actual = "0.25"
                        newData.MDE_Actual = "0.50"

                      }


                      newProducts.push(newData);
                      
                      setState([...newProducts]);
                    })

                    NotificationManager.success(`${newData.Project} Project was added`, 'Successful!', 5000);

                  })
                  .catch(error => alert(error.message))
              },

              onRowUpdate: (newData, oldData) => {

                console.log(" newData is ", newData);
                console.log(" oldData is ", oldData);

                return axios.put(
                  `/headcount/project_schedule`,
                  newData,
                  {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                )
                  .then(response => {
                    if (oldData) {
                      let product = oldData

                      setState((prevState) => {
                        const newProducts = [...state];
                        const index = product.tableData.id;
                        newProducts[newProducts.indexOf(oldData)] = newData;
                        setState([...newProducts]);
                      });
                    }

                    NotificationManager.success(`${oldData.Project} Project was edited`, 'Successful!', 2000);

                  })
                  .catch(error => alert(error.message))


              },
              onRowDelete: (oldData) => {
                console.log(" oldData is ", oldData);
                let product = oldData
                return axios.delete(`/headcount/project_schedule_del/${oldData.Project}`)
                  .then(response => {
                    const newProducts = [...state];
                    const index = product.tableData.id;
                    newProducts.splice(index, 1);
                    setState([...newProducts]);
                    NotificationManager.success(`${oldData.Project} Project was deleted`, 'Successful!', 2000);
                  })
                  .catch(error => {
                    alert(error.message);
                  })

              },
            }}
          />
        </div>
      }
      </div>
      </Container>
      </div>


  );
}

