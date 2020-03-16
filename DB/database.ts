import mysql from 'mysql';

const mysqlConexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pruebadb'
});

mysqlConexion.connect( ( err ) => { 
    if (err) {
        console.log( err );
        return
    } else {
        console.log( 'Base de Datos Conectada.' );
    }
 } );

 export default mysqlConexion;
 
