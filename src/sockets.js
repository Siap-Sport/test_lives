//Servidor - consola  
const { Conectados } = require('./classes/classes.js')

module.exports = function( io ){
    
    let totalConectados = [0]

    io.on( 'connection' , socket => { //socket es la informacion del usuario que llega al servidor cuando se conecta un nuevo usuario
        console.log('Un nuevo usuario conectado');

        let newUser = 1;
        
        let claseDB = new Conectados( 100 );
        // claseDB.guardarDB( newUser )
        
        socket.on('disconnect' , data => {
              /*   if(!socket.nickName ) return;
                nickNames.splice(nickNames.indexOf(socket.nickName) , 1);
                updateNickName(); */
                console.log('Usuario desconectado');
        })  
        
    })
    
}