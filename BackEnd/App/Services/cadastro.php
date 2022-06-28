<?php

class Cadastro{

    public static function cadastroAction($vazio, $data){
        //CADASTRO

            //du = dados já cadastrados. Tente outro. -> id = 0
            //ok = cadastro realizado com sucesso. -> id = id do banco

            $dados['status'] = 'ok';
            $dados['id'] = '1';
            $dados = json_encode($dados);
            echo $dados;
    }

}