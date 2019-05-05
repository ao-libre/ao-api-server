## Argentum Online Libre - Server API

API made in Node.js to retrieve information from the server like characters, objects, dats files, etc

Al momento solo funciona con el servidor tanto en modo de base de datos o charfile
Para hacer queries al server usando modo base de datos usen `user`

Para hacer queries al server usando modo charfiles usen `charfiles`, igualmente aqui necesitaran una base de datos ya que basicamente hace un proceso para copiar los datos de los charfiles a una tabla de base de datos mysql llamada `charfiles_worldsave` para luego poder usarla para hacer las queries.

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


## API Documentation:
https://ao-libre.github.io/ao-api-server/index.html

To update the API Documentation after modifications run this command:
```
apidoc -i apidoc/ -o docs/   
```
