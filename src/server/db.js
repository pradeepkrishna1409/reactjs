const mysql = require( 'mysql' );

function connect() {
    return new Promise(( resolve, reject ) => {
        const connection = mysql.createConnection({
            host:'amemdh-prod.cluster-c9gq1dvivkhu.us-east-1.rds.amazonaws.com',
            database:'sandchart',
            user:'admin',
            password:'12MibFXC9dededPHfJ'
        });
    
        connection.connect(function(error){
            if( !!error ) {
                console.log(error);
                reject( error );
            } else {
                console.log('Connected!:)');
                resolve( connection );
            }
        });
    });
}

module.exports = connect;