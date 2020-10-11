import MaterialTable from 'material-table';
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
import { Select, MenuItem } from "@material-ui/core";
import { TablePagination } from "@material-ui/core";


export default function MaterialResource({ children, Pagesize , SetPagesize}) {
  const [state, setState] = React.useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [projects_list , setProjects] = useState([])
  const [resource_list , setResources] = useState([])

  const handleChangeRowsPerPage = event => {SetPagesize(+event.target.value);}; 
  

  useEffect(() => {
    loadUsers();
  },[]);


  const loadUsers = async () => {

  
    //console.log(" column_fix is ", column_fix)

    axios.all([
      axios.get("/headcount/resource_assignment"), 
      axios.get("/headcount/project_list"), 
      axios.get("/headcount/resource_list")
    ])
    .then(axios.spread((result, pf, pf_resource) => {

      //console.log(" user is ", result.data)
      setState(result.data )
      setDataFetched( true)


    
        var project_list_res = pf.data.reduce(function(map, obj) {
        map[obj.project] = obj.project;
        return map;
        }, {});

        setProjects(project_list_res)
      
       var resources_list_res = pf_resource.data.reduce(function(map, obj) {
          map[obj.employee_full_name] = obj.employee_full_name;
          return map;
          }, {});
      
        setResources(resources_list_res)


      // output of req.
      //console.log('data1', data1, 'data2', data2)
    }));

    //const result = await axios.get("/headcount/resource_assignment");


    //const pf = await axios.get("/headcount/project_list");

  


  };

  const tableIcons = {
    //Add: () => 'Add Resource',
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


  return (

    <Container maxWidth="false">
    {!dataFetched ? <Loader type="Puff" color='Teal' style={{ width:"1" ,position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/> :   
    <div style={{ maxWidth: "100%", paddingTop: "12px" }}>
    <MaterialTable
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
        options={{
          addRowPosition: "first",
          pageSize: Pagesize,
          pageSizeOptions: [5, 10, 20, 30 ,50, 75, 100 ],
          toolbar: true,
          paging: true,
          stickyHeader: true,
          searchFieldStyle: {
            width: "24ch",
            color: "red"
          },
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
            position: 'sticky', top: 0 
          },   
          filtering: true,
          maxBodyHeight: '1500px' 
        }
        }
        icons={tableIcons}
        title="Resource Allocation"
        columns= {[
          { title: 'Resource', field: 'Resource' , editable: 'onAdd', lookup : resource_list } ,
          { title: 'AME Function', field: 'AME Function', editable : 'onAdd',  initialEditValue: 'MDE', filtering: false},
          { title: 'Project', field: 'Project' , editable : 'onAdd' ,  lookup : projects_list},
          {
            title: 'Product Assessment Allocation',field: 'Product Assessment Allocation', filtering: false
          },
          {
            title: 'BRD Allocation',field: 'BRD Allocation', filtering: false
          },
          {
            title: 'Proto Allocation',field: 'Proto Allocation', filtering: false
          },
          {
            title: 'Dev Commit Allocation',field: 'Dev Commit Allocation', filtering: false
          },
          {
            title: 'HVT Allocation',field: 'HVT Allocation', filtering: false
          },
          {
            title: 'EVT Allocation',field: 'EVT Allocation', filtering: false
          },
          {
            title: 'DVT Allocation',field: 'DVT Allocation', filtering: false
          },
          {
            title: 'PVT Allocation',field: 'PVT Allocation', filtering: false
          },
          {
            title: 'Street Allocation',field: 'Street Allocation', filtering: false
          },
        ]}
        data={state}
        editable={{
          onRowAdd: (newData) => {
            console.log(" newData is ", newData);

            return axios.post(
              `headcount/resource_assignment`,
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
                  newProducts.push(newData);
                  setState([...newProducts]);
                })

                NotificationManager.success(`${newData.Resource}'s allocation on Project ${newData.Project} was added`, 'Successful!', 5000);

              })
              .catch(error => alert(error.message))
          },

          onRowUpdate: (newData, oldData) => {

            console.log(" newData is ", newData);
            console.log(" oldData is ", oldData);

            return axios.put(
              `/headcount/resource_assignment`,
              newData,
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            )
              .then(resp => {
                if (oldData) {
                  let product = oldData

                  setState((prevState) => {
                    const newProducts = [...state];
                    const index = product.tableData.id;
                    newProducts[newProducts.indexOf(oldData)] = newData;
                    setState([...newProducts]);
                  });
                  NotificationManager.success(`${oldData.Resource}'s allocation on Project ${oldData.Project} was updated`, 'Successful!', 2000);
                }
              })
              .catch(err => {
                // console.log("Error in CreateBook!");
                NotificationManager.error('Error while Creating new book!', 'Error!');
              })


          },
          onRowDelete: (oldData) => {
            console.log(" oldData is ", oldData);
            let product = oldData
            return axios.delete( `/headcount/resource_assignment_del/${oldData.Resource}` )
                            .then(response => {
                                const newProducts = [...state];
                                const index = product.tableData.id;
                                newProducts.splice(index, 1);
                                setState([...newProducts]);
                                NotificationManager.success(`${oldData.Resource}'s allocation on Project ${oldData.Project} was deleted`, 'Successful!', 2000);
                            })
                            .catch(error => {
                                alert( error.message );
                            })
                                      
          },
        }}
      />  </div>}
    </Container>
  );
}
