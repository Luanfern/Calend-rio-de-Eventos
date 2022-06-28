<?php

$router = $_GET['router'];
$router = explode('/', $router);

$postData = file_get_contents("php://input");
/* $postData = json_decode($postData);
$postData = json_encode($postData); */

//$router[0] = onde fazer
//$router[1] = ação para fazer

require_once 'App/Services/'.strtolower($router[0]).'.php';

$service = $router[1];

if (isset($router[2])) {
    $router[0]::$service($router[2], $postData);
}else{
    $router[0]::$service('', $postData);
}