<?php

class Login{

    public static function loginAction($vazio, $data){
        //LOGIN

            // ci = credenciais invalidas. -> id = 0
            // ok = login relizado com sucesso. id = id do banco

            $dados['status'] = 'ok';
            $dados['id'] = '1';
            $dados = json_encode($dados);
            echo $dados;
    }

}