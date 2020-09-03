import Plot from 'react-plotly.js';
import React, { useState, useEffect } from "react";
import { Container, Card } from '@material-ui/core';
import axios from "axios";

const Sandchart = () => {
    const [ data, setState ] = useState( '' );
  
    const loadUsers = async () => {
        const result = await axios.get("/sandchart");
        console.log(" user is ", result.data['data'])
        setState ( state => ({columns : state.columns, data : result.data}
        ));
      };
  
    useEffect(function() {
        console.log( 'making an api call since value has changed to ' + data );
        loadUsers()
    }, [ data ] )



    return (
    <Container >
      <Plot
        data={data}
        layout={ {width: 800, height: 600, title: 'A Fancy Plot'} }
      />
      </Container>
    );
  
}


export default Sandchart 