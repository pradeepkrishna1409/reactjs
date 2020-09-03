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


export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Project', field: 'Project' },
      { title: 'Product_Family', field: 'Program' },
      { title: 'Device_Type', field: 'Device Type' },
      {
        title: 'AME_Engagement',
        field: 'AME Engagement',
        value: "High",
        lookup:
        {
          "High": "High",
          "Low": "Low"
        },
      },
      { title: 'Product Assessment Date', field: 'Product Assessment Date', type: "date" },

      { title: 'BRD Date', field: 'BRD Date', type: "date" },

      { title: 'Proto Date', field: 'Proto Date', type: "date" },

      { title: 'Dev Commit Date', field: 'Dev Commit Date', type: "date" },

      { title: 'HVT Date', field: 'HVT Date', type: "date" },

      { title: 'EVT Date', field: 'EVT Date', type: "date" },

      { title: 'DVT Date', field: 'DVT Date', type: "date" },

      { title: 'PVT Date', field: 'PVT Date', type: "date" },

      { title: 'MTE Actual', field: 'MTE Actual' },

      { title: 'MTM Actual', field: 'MTM Actual' },
    ],
    data :[]
  });

  useEffect(() => {
    loadUsers();
  },[]);


  const loadUsers = async () => {

    const result = await axios.get("/headcount/project_schedule");
    console.log(" user is ", result.data)
    setState(state => ({ columns: state.columns, data: result.data }
    ));
  };



  const tableIcons = {
    Add: () => 'Add Project',
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
        title="Projects"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) => {
            console.log(" newData is ", newData);

            return axios.post(
              `/headcount/project_schedule_ins/`,
              newData,
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            )
              .then(resp => {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                })
              })
              .catch(error => alert(error.message))
          },

          onRowUpdate: (newData, oldData) => {

            console.log(" newData is ", newData);
            console.log(" oldData is ", oldData);

            return axios.put(
              `/headcount/project_schedule_upd/${oldData.Project}`,
              newData,
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            )
              .then(resp => {
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              })
              .catch(error => alert(error.message))


          },
          onRowDelete: (oldData) => {
            console.log(" oldData is ", oldData);

            return axios.delete(
              `/headcount/project_schedule_del/${oldData.Project}`
            )
              .then(resp => {
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }
              })
              .catch(error => alert(error.message))
          },
        }}
      />
    </Container>
  );
}
