<?php
    require './database.php';
    require './App.php';

    if ( isset ( $_GET['action'] ) ) {
        $action = $_GET['action'];
    }

    if ( isset ( $_POST['action'] ) ) {
        $action = $_POST['action'];        
    }

    switch ( $action ) {
        case 'getAllItems':
            getAllItems();
            break;

        case 'addItem':
            addItem($_POST);
            break;

        case 'editItem': 
            editItem($_POST);
            break;

        case 'deleteItem': 
            deleteItem($_POST);
            break;

        case 'getAllFolders':
            getAllFolders();
            break;
            
        case 'addFolder':
            addFolder($_POST);
            break;

        case 'editFolder':
            editFolder($_POST);
            break;

        case 'deleteFolder':
            deleteFolder($_POST);
            break;
    }