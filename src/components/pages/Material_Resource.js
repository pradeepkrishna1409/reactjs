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


export default function MaterialResource() {

  const [state, setState] = React.useState({
    columns: [
      { title: 'Resource', field: 'Resource' },
      { title: 'AME Function', field: 'AME Function' },
      { title: 'Project', field: 'Project'  },
      {
        title: 'Product Assessment Allocation',field: 'Product Assessment Allocation'
      },
      {
        title: 'BRD Allocation',field: 'BRD Allocation'
      },
      {
        title: 'Proto Allocation',field: 'Proto Allocation'
      },
      {
        title: 'Dev Commit Allocation',field: 'Dev Commit Allocation'
      },
      {
        title: 'HVT Allocation',field: 'HVT Allocation'
      },
      {
        title: 'EVT Allocation',field: 'EVT Allocation'
      },
      {
        title: 'DVT Allocation',field: 'DVT Allocation'
      },
      {
        title: 'PVT Allocation',field: 'PVT Allocation'
      },
      {
        title: 'Street Allocation',field: 'Street Allocation'
      },
    ]
  });

  useEffect(() => {
    loadUsers();
  }, []);

  

  const loadUsers = async () => {
    const result = await axios.get("/headcount/resource_assignment");
    console.log(" user is ", result.data['data'])
    setState ( state => ({columns : state.columns, data : result.data}
    ));
  };

  const tableIcons = {
    Add: () => 'Add Resource',
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
    <Container maxWidth="lg">
    <MaterialTable
    localization={{
      pagination: {
          labelDisplayedRows: '{from}-{to} of {count}'
      },
      toolbar: {
          nRowsSelected: '{0} row(s) selected'
      },
      header: {
          actions: 'Actions'
      },
      body: {
          emptyDataSourceMessage: 'No records to display',
          filterRow: {
              filterTooltip: 'Filter'
          }
      }
  }}
    options={{
        addRowPosition: "first",
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 30 ,50, 75, 100 ],
        toolbar: true,
        paging: true,
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF'
        },
        }}
      icons={tableIcons}
      title="Resources"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
        {
            console.log( " newData is " , newData);

            return axios.post(
                `headcount/resource_assignment/`,
                newData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then( resp => { 
                    setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      })
                    })
                .catch( error => alert( error.message ) )
          },
        
        onRowUpdate: (newData, oldData) => {

            console.log( " newData is " , newData);
            console.log( " oldData is " , oldData);

            return axios.put(
                `/headcount/resource_assignment/${oldData.Resource}`,
                newData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then( resp => { 
                    if (oldData) {
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                 } )
                .catch( error => alert( error.message ) )


          },
        onRowDelete: (oldData) =>
           {
            console.log( " oldData is " , oldData);

            return axios.delete(
                `/headcount/resource_assignment_del/${oldData.Resource}`
            )
                .then( resp => { 
                    if (oldData) {
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                        });
                    }
               } )
                .catch( error => alert( error.message ) )
          },
      }}
    />
    </Container>
  );
}
