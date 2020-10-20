//cliente
$( function() {

    const socket = io();
    
    //Obteniendo los elementos del dom desde la interfaz
     const $messageForm = $('#message-form');
     const $messageBox = $('#message');
     const $chat = $('#chat');

    //Obteniendo los elementos del dom desde la interfas - Nick name form
    const $nickForm =  $('#nickForm');
    const $nickError =  $('#nickError');
    const $nickName =  $('#nickName');

    const $users = $('#userNames');
     
    $nickForm.submit( e => {
        e.preventDefault()
        // console.log('enviando...');
        socket.emit('new user' , $nickName.val() , function (data){
            if( data ){
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else{
                $nickError.html(`
                <div class="alert alert-danger"> 
                Ese usuario ya existe
                </div>
                `)
            } // Data los esta reiviendo del servidor

            $nickName.val('')
            
        }) // Aqui envio datos al servidor
    })
    

     //Eventos
     $messageForm.submit( e => {

        e.preventDefault();
        socket.emit('send message' , $messageBox.val())
        $messageBox.val('');
        
     });
    

     socket.on('new message' , function( data ){  //Este es el evento que se encarga de escuchar este mensaje , el que proviende de sockets
        $chat.append( '<b>' + data.nick + '</b>' + ': ' + data.msg  + '<br/>')

        //  localStorage.setItem( 'num' , num );
     })
     socket.on('userNames' , data => {
         let html = '';
         for (let i = 0 ; i < data.length; i++ ){
             html += `<p>${data[i]}`
         }

         $users.html(html)
     }  )
     
} )