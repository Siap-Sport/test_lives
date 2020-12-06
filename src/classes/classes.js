let fs = require('file-system')

class Conectados{

    constructor( user ){

        this.datosJson = require('../db/conectados.json');
        this.resetearDB();
        this.user = user;
    }
    
    cargarFecha(){
        let today = new Date();
        let fechaHoy = `${ today.getDate() }-${ today.getMonth() + 1}-${ today.getFullYear() }`
        return fechaHoy
    }

    resetearDB(){

        let datoFecha = this.datosJson[this.datosJson.length - 1];
        let fechaHoy = this.cargarFecha()

        if( datoFecha.fecha === fechaHoy) {
            this.reemplazarDatosDB()
        }else{

             let newFecha = this.cargarFecha()

           let datosCero = {
                "conectadosDB" : 1,
                "fechaDB" : newFecha 
            }
            
            this.guardarDB( datosCero )
        }


    };
    
    reemplazarDatosDB(){

        let sumarConectadods = this.datosJson[this.datosJson.length - 1]["conectados"] += 1;
        this.datosJson[this.datosJson.length - 1]["conectados"] + sumarConectadods;
        
        let jsonDataString = JSON.stringify( this.datosJson )
        fs.writeFileSync("src/db/conectados.json" ,  jsonDataString ) 
        
    }

    guardarDB( numero , fechaHoy ){

        
        let datosConnected = {
            "conectados" : numero.conectadosDB , 
            "fecha" : numero.fechaDB
        }

        this.datosJson.push(datosConnected)
        console.log(this.datosJson);
        
        let jsonDataString = JSON.stringify( this.datosJson )
        fs.writeFileSync("src/db/conectados.json" ,  jsonDataString ) 

        // this.resetearDB()

         
    }
    
}

module.exports = {

    Conectados
    
}