<?php

require __DIR__.'/../models/login.php';

class Login{

    public static function loginAction($vazio, $data){
        //LOGIN

            // ci = credenciais invalidas. -> id = 0
            // ok = login relizado com sucesso. id = id do banco
            // erro = Erro de conexão;
        $data = json_decode($data, true);
        try {
            $result = LoginModel::post($data);
            if (count($result) == 0) {
                $dados['status'] = 'ci';
                $dados['id'] = '0';
            }else{
                $dados['status'] = 'ok';
                $dados['id'] = $result[0]["id"];
            }
        } catch (\Throwable $th) {
            $dados['status'] = 'erro';
            $dados['id'] = 'Erro de conexão';
        }

        $dados = json_encode($dados);
        echo $dados;
    }

}