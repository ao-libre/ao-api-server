## Argentum Online Libre - Server API

API made in Node.js to retrieve information from the server like characters, objects, dats files, etc

Al momento solo funciona con el servidor tanto en modo de base de datos o charfile
Para hacer queries al server usando modo base de datos usen `user`

Para hacer queries al server usando modo charfiles usen `charfiles`, igualmente aqui necesitaran una base de datos ya que basicamente hace un proceso para copiar los datos de los charfiles a una tabla de base de datos mysql llamada `charfiles_worldsave` para luego poder usarla para hacer las queries. Lo mismo con los logs y las cuentas

Tambien envia emails de registro y login

Para que el `ao-server` envie un `request` a la API para poder hacer esta operacion, hay que activarlo en el archivo `server.ini`


## Install and use
Run the following commands:
```
git clone https://github.com/ao-libre/ao-api-server.git
cd ao-api-server
npm install 
npm start
```

Then enter to `http://localhost:1337` and use one of the endpoints that appear in the documentation.


## Instalar como Servicio
En caso que se quiera utilizar la aplicacion como servicio, util para cuando querramos que la aplicacion se inicie al iniciar Windows, debemos instalar el paquete `qckwinsvc` y luego configurarlo de la siguiente forma:


Instalar el paquete:
```
npm install -g qckwinsvc
```

Configurarlo:
```
qckwinsvc --name "AO-API-SERVER" --description "Node.js API para controlar algunas funciones del server Argentum Online Libre VB6" --script "C:\Users\Administrador\Desktop\alkon\ao-api-server\index.js" --startImmediately
```
mas info: https://www.npmjs.com/package/qckwinsvc

## Postman Collection

https://www.getpostman.com/collections/85121eafa43c37d0d7e7


## API Documentation:
https://ao-libre.github.io/ao-api-server/index.html

To update the API Documentation after modifications run this command:
```
apidoc -i apidoc/ -o docs/   
```
