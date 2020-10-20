const http = require( 'http' )
const path = require( 'path' )
const express = require( 'express' );
const socketio = require( 'socket.io' );

const app = express();
const server =  http.createServer( app )
const io = socketio.listen(server)


//Settings
app.set( 'port' , process.env.PORT || 3000 )

require( './sockets' )( io )

// Enviando archivos estaticos

app.use(express.static(path.join(__dirname , 'public'))) ;

// Escuchando el srvidor
server.listen( app.get( 'port' ) , () => {
    console.log('Server in port ' , app.get('port'));
} )