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
                'folder_id' => null,
                'name' => $item_name,
            ];
        }

        echo json_encode($response);
    }

    // Edit item.
    function editItem($post) {
        // Get the $post data.
        $item_id = $post['item_id'];
        $folder_id = isset( $post['folder_id'] ) ? $post['folder_id'] : '';
        $item_name = isset( $post['item_name'] ) ? $post['item_name'] : '';
        $checked = isset( $post['checked'] ) ? $post['checked'] : '';

        // Adjust values.
        $folder_id = str_replace( 'folder-', '', $folder_id );
        $item_id = str_replace( 'element-', '', $item_id );

        $folder_sql = '';
        $name_sql = '';
        $checked_sql = '';
        
        if ( $folder_id !== '' ) {
            $folder_sql = "`folder_id` = '$folder_id'";
        } else {
            $folder_sql = "`folder_id` = null";
        }

        if ( $item_name !== '' ) {
            if ( $folder_id !== '' ) {
                $name_sql = ", `name` = '$item_name'";
            } else {
                $name_sql = " `name` = '$item_name'";
            }
        }

        if ( $checked !== '' ) {
            $checked_sql = ", `checked` = $checked";
        }

        // Create the conection to db.
        $conection = connection();

        if ( $conection->connect_error ) {
            die("Connection failed: " . $conection->connect_error);            
        }

        // Create sql consult.
        $sql = "UPDATE `item` SET $folder_sql $name_sql $checked_sql WHERE `item`.`id` = $item_id";

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
                'name' => $folder_name,
            ];
        }

        echo json_encode($response);        
    }

    // Edit item.
    function editFolder($post) {
        // Get the $post data.
        $folder_id = $post['folder_id'];
        $folder_name = $post['folder_name'];

        // Adjust values.
        $folder_id = str_replace( 'folder-', '', $folder_id );

        // Create the conection to db.
        $conection = connection();

        if ( $conection->connect_error ) {
            die("Connection failed: " . $conection->connect_error);            
        }

        // Create sql consult.
        $sql = "UPDATE `folder` SET `name` = '$folder_name' WHERE `folder`.`id` = $folder_id";

        // Make the query;
        $result = $conection->query($sql);
    }

    // Delete folder.
    function deleteFolder($post) {
        // Get the $post data.
        $folder_id = $post['folder_id'];

        // Adjust values.
        $folder_id = str_replace( 'folder-', '', $folder_id );

        // Create the conection to db.
        $conection = connection();

        if ( $conection->connect_error ) {
            die("Connection failed: " . $conection->connect_error);            
        }

        // Create sql consult.
        $sql = "DELETE FROM `folder` WHERE `folder`.`id` = $folder_id";

        // Make the query;
        $result = $conection->query($sql);

        // Select al the childs of the folder.
        $sql = "SELECT * FROM `item` WHERE `folder_id` = $folder_id";

        // Make the query;
        $result = $conection->query($sql);

        // Delete the inner items.
        if ( $result ) {
            while ( $row = $result->fetch_object() ) {
                deleteItem( ['item_id' => 'element-' . $row->id] );
            }
        }
    }