const express = require( 'express' );
const mysql = require( 'mysql' );
const homeRouter = require( '../routes/home' );
const project_schedule = require( '../routes/project_schedule' );
const resource_assignment = require( '../routes/resource_assignment' );
const connect = require( './db' );
const cors = require( 'cors' );

const app = express();
app.use( cors() );
app.use( express.json() ); // req.body -> data

app.use( /*'/admin',*/ homeRouter );

const PORT = 4000;
app.listen(PORT, function( err ) {
    if( err ) {
        return console.log( error.message );
    }

    console.log( 'started' );
});

connect()
    .then(( connection ) => {
        app.use( '/project_schedule', project_schedule );

    })
    .catch( error => console.log( error.message ) );

connect()
    .then(( connection ) => {
        app.use( '/resource_assignment', resource_assignment );
    })
    .catch( error => console.log( error.message ) );
