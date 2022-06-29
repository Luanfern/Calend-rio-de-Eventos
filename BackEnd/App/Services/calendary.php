<?php

require __DIR__.'/../models/calendary.php';

class Calendary{

    //[] => url param | [] => post param

    public static function cancelParticipate($idEventParticiping){
        try {
            $result = CalendaryModel::delete($idEventParticiping);
            if ($result != 0) {
                $dados['status'] = 'ok';
            }else{
                $dados['status'] = 'erro';
            }
        } catch (\Throwable $th) {
            throw $th;
        }

        $dados = json_encode($dados);
        echo $dados;

    }

    public static function participate($vazio, $data){
        $data = json_decode($data, true);
        try {
            $result = CalendaryModel::post($data);
            if ($result != 0) {
                $dados['status'] = 'ok';
                $dados['id'] = $result;
            }else{
                $dados['status'] = 'erro';
                $dados['id'] = '0';
            }
        } catch (\Throwable $th) {
            throw $th;
        }

        $dados = json_encode($dados);
        echo $dados;
    }

    public static function listAllEventsCalendary($idAccount){
        
        //erro = Sem eventos para mostrar. -> return = ''
        //ok = Eventos para mostrar. -> return = lista de eventos
        
        try {
            $result = CalendaryModel::get($idAccount);
            if (count($result) == 0) {
                $dados['status'] = 'erro';
                $dados['return'] = 'vazio';
            }else{
                $dados['status'] = 'ok';
                $dados['return'] = $result;
            }
        } catch (\Throwable $th) {
            throw $th;
        }

        $dados = json_encode($dados);
        echo $dados;
    }
}