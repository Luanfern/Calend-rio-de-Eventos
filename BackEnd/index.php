<?php

$dados = file_get_contents("php://input");
$dados = json_decode($dados);
$dados['status'] = 'ok';
$dados['id'] = '1';
$dados = json_encode($dados);
echo $dados;