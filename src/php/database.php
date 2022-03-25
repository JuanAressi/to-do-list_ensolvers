<?php
    function connection() {
        // Connection vars.
        $server = 'db';
        $user = 'root';
        $pass = '123456';
        $db = 'db_todolist';
        
        // Create the connection.
        $conexion = new mysqli($server, $user, $pass, $db);

        return $conexion;
    }
?>