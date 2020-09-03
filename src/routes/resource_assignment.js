const express = require( 'express' );
const path = require( 'path' );
const connect = require( '../server/db' );

const router = express.Router();

connect()
    .then((connection) => {
        router.get( '/', function( req, res ) {
            connection.query( `         			            select
                b.resource as "Resource",
                ame_resource_group as "AME Function",
                b.project as "Project",
                product_assessment as "Product Assessment Allocation",
                brd as "BRD Allocation",
                proto as "Proto Allocation",
                dev_commit as "Dev Commit Allocation",
                hvt as "HVT Allocation",
                evt as "EVT Allocation",
                dvt as "DVT Allocation",
                pvt as "PVT Allocation",
                street as "Street Allocation",
                b.edit_tmstmp as "Modified Date" 
                from sandchart.resource_assignment_react b inner join
                (select project, resource, max(edit_tmstmp)
                as edit_tmstmp from sandchart.resource_assignment_react
                    group by project, resource) a
                on a.project = b.project
                and a.resource = b.resource
                and a.edit_tmstmp=b.edit_tmstmp
                order by b.resource; `, ( err, results ) => {
                if( err ) {
                    return res.status( 500 ).send( 'error in query' );
                }

                res.json( results );
            });
        });
        
        router.put( '/:project', function( req, res ) {
            const project = req.body;

            console.log( req.params.project );

            query_txt = `update resource_assignment_react set device_type = '${project.Product_Family}'   where projects = '${req.params.project}' `

            console.log( query_txt );

            connection.query(query_txt, ( err, results ) => {
                 if( err ) {
                         return res.status( 500 ).send( err.message);
                     }
                    
                     res.json( results );

             });

            console.log( project );


        });


        router.post( '/', function( req, res ) {
            const project = req.body;

            console.log( req.params.project );

            query_txt = `insert into sandchart.resource_assignment_react (projects, program, device_type) 
            values ('${project.Project}', '${project.Product_Family}','${project.Device_Type}' ) `

            console.log( query_txt );

            connection.query(query_txt, ( err, results ) => {
                 if( err ) {
                         return res.status( 500 ).send( err.message);
                     }
                    
                     res.json( results );

             });

            console.log( project );


        });



        router.delete( '/:project', function( req, res ) {
            const project = req.body;

            console.log( req.params.project );

            query_txt = `delete from  resource_assignment_react  where projects = '${req.params.project}' `

            console.log( query_txt );

            connection.query(query_txt, ( err, results ) => {
                 if( err ) {
                         return res.status( 500 ).send( err.message);
                     }
                    
                     res.json( results );

             });

            console.log( project );


        });
    });

module.exports = router;