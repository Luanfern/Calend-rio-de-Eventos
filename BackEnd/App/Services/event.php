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
            $data = json_decode($data, true);
            $dados = $data['data'];
            $newArray['idAuthor'] =str_replace('"','',$data['idAuthor']);
            $newArray['title'] =str_replace('"','',$dados['title']);
            $newArray['description'] =str_replace('"','',$dados['description']);
            unset($dados['title'], $dados['description']);
            $arrayDateTemp = [];
            $index = 0;
            foreach ($dados as $key => $dates) {
                $index++;
                array_push($arrayDateTemp, json_encode($dates));
                if ($index % 3 == 0) {
                    $datestimes[][str_replace('"', '', $arrayDateTemp[0])] = str_replace('"', '', $arrayDateTemp[1])." at&eacute; ".str_replace('"', '', $arrayDateTemp[2]);
                    $arrayDateTemp = [];
                }
            }
            $newArray['datestimes'] = json_encode($datestimes);
            unset($dados);
            try {
                $result = EventModel::post($newArray);
                if ($result != 0) {
                    $dados['status'] = 'ok';
                    $dados['idEvent'] = $result;
                }else {
                    $dados['status'] = 'erro';
                    $dados['idEvent'] = '0';
                }
            } catch (\Throwable $th) {
                $dados['status'] = 'erro';
                $dados['return'] = 'Erro de conexão';
            }

            $dados = json_encode($dados);
            echo $dados;


    }

    public static function deleteEvent($idUnique){
        //DELETAR DE EVENTO

            //erro = Erro ao deletar
            //ok = Deletado com sucesso
            try {
                $result = EventModel::delete($idUnique);
                if ($result > 0) {
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

    public static function updateEvent($vazio, $data){
        //ATUALIZAÇÃO DE EVENTO

            //erro = Erro ao atualizar evento
            //ok = atualização realizada com sucesso
            $data = json_decode($data, true);
            $dados = $data;
            $newArray['id'] =str_replace('"','',$dados['id']);
            $newArray['title'] =str_replace('"','',$dados['title']);
            $newArray['description'] =str_replace('"','',$dados['description']);
            unset($dados['title'], $dados['description'], $dados['id']);
            $arrayDateTemp = [];
            $index = 0;
            foreach ($dados as $key => $dates) {
                $index++;
                array_push($arrayDateTemp, json_encode($dates));
                if ($index % 3 == 0) {
                    $datestimes[][str_replace('"', '', $arrayDateTemp[0])] = str_replace('"', '', $arrayDateTemp[1])." at&eacute; ".str_replace('"', '', $arrayDateTemp[2]);
                    $arrayDateTemp = [];
                }
            }
            $newArray['datestimes'] = json_encode($datestimes);
            unset($dados);
            try {
                $result = EventModel::update($newArray);
                if ($result > 0) {
                    $dados['status'] = 'ok';
                }else {
                    $dados['status'] = 'erro';
                }
            } catch (\Throwable $th) {
                $dados['status'] = 'erro';
            }

            $dados = json_encode($dados);
            echo $dados;

    }

}