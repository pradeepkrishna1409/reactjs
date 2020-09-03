const express = require( 'express' );
const path = require( 'path' );
const connect = require( '../server/db' );

const router = express.Router();

connect()
    .then((connection) => {
        router.get( '/', function( req, res ) {
            connection.query( `         				SELECT
            projects AS 'Project',
            program AS 'Product_Family',
            device_type AS 'Device_Type',
            ame_engagement AS 'AME_Engagement',
            street_date AS 'Street_Date',
            product_assessment_date AS 'Product_Assessment_Date',
            brd_date AS 'BRD_Date',
            proto_date AS 'Proto_Date',
            dev_commit_date AS 'Dev_Commit_Date',
            hvt_date AS 'HVT_Date',
            evt_date AS 'EVT_Date',
            dvt_date AS 'DVT_Date',
            pvt_date AS 'PVT_Date',
            mte_actual AS 'MTE_Actual',
            mtm_actual AS 'MTM_Actual',
            mde_actual AS 'MDE_Actual',
            mts_actual AS 'MTS_Actual',
            edit_tmstmp AS 'Modified_Date'
        FROM
            (SELECT
                b.projects AS projects,
                    program AS program,
                    device_type AS device_type,
                    ame_engagement AS ame_engagement,
                    DATE_FORMAT(street_date, '%m/%d/%y') AS street_date,
                    DATE_FORMAT(product_assessment_date, '%m/%d/%y') AS product_assessment_date,
                    DATE_FORMAT(brd_date, '%m/%d/%y') AS brd_date,
                    DATE_FORMAT(proto_date, '%m/%d/%y') AS proto_date,
                    DATE_FORMAT(dev_commit_date, '%m/%d/%y') AS dev_commit_date,
                    DATE_FORMAT(hvt_date, '%m/%d/%y') AS hvt_date,
                    DATE_FORMAT(evt_date, '%m/%d/%y') AS evt_date,
                    DATE_FORMAT(dvt_date, '%m/%d/%y') AS dvt_date,
                    DATE_FORMAT(pvt_date, '%m/%d/%y') AS pvt_date,
                    b.edit_tmstmp,
                    CASE
                        WHEN YEAR(b.street_date) = YEAR(CURDATE()) THEN 1
                        ELSE 2
                    END AS year_flg,
                    mte_actual,
                    mtm_actual,
                    mde_actual,
                    mts_actual
            FROM
                sandchart.project_schedule_react b
            INNER JOIN (SELECT
                projects, MAX(edit_tmstmp) AS edit_tmstmp
            FROM
                sandchart.project_schedule_react
            GROUP BY projects) a ON a.projects = b.projects
                AND a.edit_tmstmp = b.edit_tmstmp
            ORDER BY year_flg , street_date) a `, ( err, results ) => {
                if( err ) {
                    return res.status( 500 ).send( 'error in query' );
                }

                res.json( results );
            });
        });


        router.put( '/:project', function( req, res ) {
            const project = req.body;

            console.log( req.params.project );

            query_txt = `update project_schedule_react set device_type = '${project.Product_Family}'   where projects = '${req.params.project}' `

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

            query_txt = `insert into sandchart.project_schedule_react (projects, program, device_type) 
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

            query_txt = `delete from  project_schedule_react  where projects = '${req.params.project}' `

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