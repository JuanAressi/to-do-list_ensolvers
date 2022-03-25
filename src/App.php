<?php
    $input = isset($_POST["input"]) ? $_POST["input"] : "";

    file_put_contents("./fileToSniff.php", "<?php
        " . $input);

    $route = '/var/www/html/';
    $file = 'fileToSniff.php';

    $cmd_phpcbf = "CodeSniffer/bin/phpcbf fileToSniff.php";

    $result = shell_exec($cmd_phpcbf);

    if (strpos($result, 'ERROR') === 0) {
        // We got the error that we dont have installed the Wordpress Standard.
        $cmd_standard_not_found = 'CodeSniffer/bin/phpcs --config-set installed_paths CodeSniffer/wp-coding-standards/wpcs';

        $result = shell_exec($cmd_standard_not_found);

        $result = shell_exec($cmd_phpcbf);
    } else {
        // We got no errors.
    }
    
    $file_bf = file_get_contents('./fileToSniff.php');
    echo json_encode($file_bf);