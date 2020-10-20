//Servicor - consola
module.exports = function( io ){

    let nickNames = [];

    io.on( 'connection' , socket => {
        console.log('Un nuevo usuario conectado');

        socket.on('new user' , (data , cb) => {
            console.log(data); // imprimir el nickname del usuario en console
            if ( nickNames.indexOf( data ) != -1){

                cb(false)
                
            }else{
                cb(true)
                socket.nickName =  data;
                nickNames.push(socket.nickName)
                console.log(nickNames);
                updateNickName()

            }
        })


        socket.on('send message' , function( data ){  // Resive el mensaje
            io.sockets.emit('new message' , {    //De aqui envio informacion
                 msg : data,
                 nick : socket.nickName
            }) // Retrasmit el mensaje
        })
        
        socket.on('disconnect' , data => {
                if(!socket.nickName ) return;
                nickNames.splice(nickNames.indexOf(socket.nickName) , 1);
                updateNickName();
        }) 

        function updateNickName (){
            io.sockets.emit('userNames' , nickNames)
        }
        
    })
    
}