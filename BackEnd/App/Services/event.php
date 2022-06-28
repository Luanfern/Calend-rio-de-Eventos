<?php

require __DIR__.'/../models/event.php';

class Event{

    //[] => url param | [] => post param
    public static function listAllEvents($idAccount){
        //LISTA DE EVENTOS

            //erro = Sem eventos para mostrar. -> return = ''
            //ok = Eventos para mostrar. -> return = lista de eventos

            try {
                $result = EventModel::getAll($idAccount);
                if (count($result) == 0) {
                    $dados['status'] = 'erro';
                    $dados['return'] = 'vazio';
                }else{
                    $dados['status'] = 'ok';
                    $dados['return'] = $result;
                }
            } catch (\Throwable $th) {
                $dados['status'] = 'erro';
                $dados['return'] = 'Erro de conexão';
            }

            $dados = json_encode($dados);
            echo $dados;

    }

    public static function getUniqueEvent($idUnique){
        //EVENTO UNICO

            //erro = Sem evento. -> return = ''
            //ok = Evento para mostrar. -> return = evento
            
            try {
                $result = EventModel::get($idUnique);
                if (count($result) == 0) {
                    $dados['status'] = 'erro';
                    $dados['return'] = 'Sem evento';
                }else{
                    $dados['status'] = 'ok';
                    $dados['return'] = $result;
                }
            } catch (\Throwable $th) {
                $dados['status'] = 'erro';
                $dados['return'] = 'Erro de conexão';
            }

            $dados = json_encode($dados);
            echo $dados;

    }

    public static function createEvent($vazio, $data){
        //CADASTRO DE EVENTO

            //erro = Evento ja criado -> id = 0
            //ok = cadastro realizado com sucesso. -> id = id do banco

            $dados['status'] = 'ok';
            $dados['idEvent'] = '1';
            $dados = json_encode($dados);
            echo $dados;


    }

    public static function deleteEvent($idUnique){
        //DELETAR DE EVENTO

            //erro = Erro ao deletar
            //ok = Deletado com sucesso

            $dados['status'] = 'ok';
            $dados = json_encode($dados);
            echo $dados;


    }

    public static function updateEvent($vazio, $data){
        //ATUALIZAÇÃO DE EVENTO

            //erro = Erro ao atualizar evento
            //ok = atualização realizada com sucesso

            $dados['status'] = 'ok';
            $dados = json_encode($dados);
            echo $dados;

    }

}