//Cliente
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

    const $enLinea = $('#enLinea');
    const $like = $("#like")
    const $likeP = $("#likeP")
    const $dislikeDos = $("#dislikeMal");
    const $dislikeImprimir = $("#dislikeP")
    const $pintarDislike = document.querySelector('#dislikeMal')
    let   comprovarDatos = false;
    
    
    
    
    

    $like.click( e => {
        e.preventDefault()
        socket.emit('like' , 1 )
    } )
    
    

    $dislikeDos.click( e => {
        e.preventDefault()
            comprovarDatos = sessionStorage.getItem('00000-154554-siap-spor-145546565')
            if( comprovarDatos === null ){
                socket.emit('dislike' , 1)
                sessionStorage.setItem('00000-154554-siap-spor-145546565' , true);
            }

            pintarlo( true )
    } )


    let pintarlo = ( x ) => {
        if( x == true ){
            $pintarDislike.setAttribute("style" , "color : rgb(243, 128, 128)")
        }
    }

    comprovarDatos = sessionStorage.getItem('00000-154554-siap-spor-145546565');
    console.log(comprovarDatos);
    if( comprovarDatos == "true" ){
        pintarlo( true )
    }
    
  
    
/* 
    if( comprovarDatos == "true" ){
        console.log('pintar');
    } */
    
    
    
    
    socket.on('enVivo' , data => {
        $enLinea.html(`En linea : ${data}`)
    })
    

    
    
    

  
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

     socket.on('imprimirLikes' , data => {
         if(data[0] == 0){
             $likeP.html('');  
        }else{
            $likeP.html(`${data}`)
        }
     })

     socket.on('imprimirDislikes' , data => {
        if(data[0] == 0){
            $dislikeImprimir.html('');  
        }else{
            $dislikeImprimir.html(`${data}`);  
       }
     })
     
     socket.on('userNames' , data => {
         let html = '';
         for (let i = 0 ; i < data.length; i++ ){
             html += `<p>${data[i]}`
         }

         $users.html(html)
     }  )
     


} )