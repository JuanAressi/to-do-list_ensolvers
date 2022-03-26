Readme de To-do List - Ensolvers

El proyecto está desarrollado en:
  * HTML5.
  * CSS3.
  * Bootstrap.
  * JavaScript.
  * PHP version 7.4.
  * MySQL en phpMyAdmin.
  * Docker

Para iniciar el proyecto hay que correr en un bash en la ruta del protecto:
  * docker-compose build
  * docker-compose up

Esto nos compilará los contenedores necesarios.

La app está desarrollada en una SPA en el navegador web, por lo que hay que añadir a la direccion local.todolist en la lista de paginas posibles:
  * En linux, abrir una terminal y correr el comando: sudo nano /etc/hosts/
      * Dentro de este este archivo añadir una linea al principio del achivo: 127.0.0.1   local.todolist

  * Dejo link de referencia de como realizarlo, donde explica como hacerlo en otros sistemas operativos (Windows y MacOS): https://desarrolloweb.com/articulos/modificar-hosts-windows-linux-mac.html


Desde el navegador web acceder a: localhost:8080
  * Aqui hay que crear una base de datos con el nombre de: db_todolist
  * Importar la el archivo db_todolist en la base de datos creada.

Desde el navegador web acceder a: local.todolist

Aqui podemos ya empezar a usar la web app.
  * Podemos ver 2 botones principales uno para añadir carpetas y otro para añadir items individuales.
  * Despues de agregar una carpeta podemos ver 3 iconos:
      * El primero es para añadir elementos a esa carpeta.
      * El segundo es para editar el nombre o para borrar elementos de la carpeta.
      * El tercero es para eliminar la carpeta con sus elementos.

  * Despues de agregar un elemento podemos ver 2 iconos:
      * El primero es para edita el nombre del elemento.
      * El segundo es para eliminar el elemento.

  * Aparte de esto, podemos chequear un item de la lista para marcarla como realizada.


Todos estos eventos realizan una consulta a la base de datos para agregar, modificar o eliminar los elementos o las carpetas.
