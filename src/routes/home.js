const express = require( 'express' );
const path = require( 'path' );

const router = express.Router();

router.get( '/', function( req, res ) {
    // res.json({
    //     x: 100
    // });

    // res.send( 'hello' );

    res.sendFile( path.join( __dirname, '..', 'public', 'home.html' ) );
});

module.exports = router;