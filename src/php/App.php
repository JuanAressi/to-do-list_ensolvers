<?php
    // Item methods.
    // Get all items.
    function getAllItems() {
        // Create the conection to db.
        $conection = connection();

        if ( $conection->connect_error ) {
            die("Connection failed: " . $conection->connect_error);            
        }

        // Create sql consult.
        $sql = "SELECT * FROM `item`";

        // Make the query;
        $result = $conection->query($sql);

        if ( $result ) {
            // Loop into all results.
            while ( $row = $result->fetch_object() ) {
                $item[] = $row;
            }
        }

        // Response to frontend.
        $response = [];
        if ( $result ) {
            $response = [
                'status' => 'ok',
                'items' => $item,
            ];
        }

        echo json_encode($response);
    }

    // Add item.
    function addItem($post) {
        // Get the $post data.
        $folder_id = $post['folder_id'];
        $item_name = $post['item_name'];
        $checked   = $post['checked'];

        // Create the conection to db.
        $conection = connection();

        if ( $conection->connect_error ) {
            die("Connection failed: " . $conection->connect_error);            
        }

        // Create sql consult.
        $sql = "INSERT INTO `item` (`folder_id`, `name`, `checked`) VALUES ($folder_id, '$item_name', $checked)";

        // Make the query;
        $result = $conection->query($sql);

        // Response to frontend.
        $response = [];
        if ( $result === true ) {
            $response = [
                'id' => $conection->insert_id,
            ];
        }

        echo json_encode($response);
    }


    // Edit item.
    function editItem($post) {
        // Get the $post data.
        $item_id = $post['item_id'];
        $item_name = $post['item_name'];

        // Adjust values.
        $item_id = str_replace( 'element-', '', $item_id );

        // Create the conection to db.
        $conection = connection();

        if ( $conection->connect_error ) {
            die("Connection failed: " . $conection->connect_error);            
        }

        // Create sql consult.
        $sql = "UPDATE `item` SET `name` = '$item_name' WHERE `item`.`id` = $item_id";

        // Make the query;
        $result = $conection->query($sql);
    }


    // Delete item.
    function deleteItem($post) {
        // Get the $post data.
        $item_id = $post['item_id'];

        // Adjust values.
        $item_id = str_replace( 'element-', '', $item_id );

        // Create the conection to db.
        $conection = connection();

        if ( $conection->connect_error ) {
            die("Connection failed: " . $conection->connect_error);            
        }

        // Create sql consult.
        $sql = "DELETE FROM `item` WHERE `item`.`id` = $item_id";

        // Make the query;
        $result = $conection->query($sql);
    }


    // Get all items.
    function getAllFolders() {
        // Create the conection to db.
        $conection = connection();

        if ( $conection->connect_error ) {
            die("Connection failed: " . $conection->connect_error);            
        }

        // Create sql consult.
        $sql = "SELECT * FROM `folder`";

        // Make the query;
        $result = $conection->query($sql);

        if ( $result ) {
            // Loop into all results.
            while ( $row = $result->fetch_object() ) {
                $folder[] = $row;
            }
        }

        // Response to frontend.
        $response = [];
        if ( $result ) {
            $response = [
                'status' => 'ok',
                'folders' => $folder,
            ];
        }

        echo json_encode($response);
    }

    // Folder methods
    function addFolder($post) {
        // Get the $post data.
        $folder_name = $post['folder_name'];

        // Create the conection to db.
        $conection = connection();

        if ( $conection->connect_error ) {
            die("Connection failed: " . $conection->connect_error);            
        }

        // Create sql consult.
        $sql = "INSERT INTO `folder` (`name`) VALUES ('$folder_name')";

        // Make the query;
        $result = $conection->query($sql);

        // Response to frontend.
        $response = [];
        if ( $result === true ) {
            $response = [
                'id' => $conection->insert_id,
            ];
        }

        echo json_encode($response);        
    }