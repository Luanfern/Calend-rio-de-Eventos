<?php

class Event{

    //[] => url param | [] => post param
    public static function listAllEvents($idAccount){
        //LISTA DE EVENTOS

            //erro = Sem eventos para mostrar. -> return = ''
            //ok = Eventos para mostrar. -> return = lista de eventos

            $dados['status'] = 'ok';
            $dados['return'] = json_decode('[{"id": 1, "title": "dasdasdasd", "description": "description1description1description1description1", "author": "authorName1", "datestimes": [{"2022-06-27":"00:00 até 00:00"}, {"2022-06-28":"00:00 até 00:00"}]}, {"id": 2, "title": "title2", "description": "description1description1description1description1", "author": "authorName1", "datestimes": [{"2022-06-27":"00:00 até 00:00"}, {"2022-06-28":"00:00 até 00:00"}]}, {"id": 3, "title": "title3", "description": "description1description1description1description1", "author": "authorName1", "datestimes": [{"2022-06-27":"00:00 até 00:00"}, {"2022-06-28":"00:00 até 00:00"}]}]');
            $dados = json_encode($dados);
            echo $dados;

    }

    public static function getUniqueEvent($idUnique){
        //EVENTO UNICO

            //erro = Sem evento. -> return = ''
            //ok = Evento para mostrar. -> return = evento

            $dados['status'] = 'ok';
            $dados['return'] = json_decode('{"id": 1, "title": "dasdasdasd", "description": "description1description1description1description1", "author": "authorName1", "datestimes": [{"2022-06-27":"00:00 até 00:00"}, {"2022-06-28":"00:00 até 00:00"}]}');
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