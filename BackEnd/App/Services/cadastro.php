<?php

require __DIR__.'/../models/cadastro.php';

class Cadastro{

    public static function cadastroAction($vazio, $data){
        //CADASTRO

            //du = dados já cadastrados. Tente outro. -> id = 0
            //ok = cadastro realizado com sucesso. -> id = id do banco
            // erro = Erro de conexão;

            $data = json_decode($data, true);
            try {
                $result = CadastroModel::post($data);
                if ($result != 0) {
                    $dados['status'] = 'ok';
                    $dados['id'] = $result;
                }else{
                    $dados['status'] = 'ci';
                    $dados['id'] = '0';
                }
            } catch (\Throwable $th) {
                $dados['status'] = 'erro';
                $dados['id'] = 'Erro de conexão';
            }
            $dados = json_encode($dados);
            echo $dados;
    }

}