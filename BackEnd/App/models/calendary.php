<?php

require __DIR__.'/../../connection.php';

class CalendaryModel{
    public static function post($data){
        try {
            $con = Connection::doConnection();
            
            $sql = "INSERT INTO calendarios(id_usuario, id_evento) VALUES (?,?)";
            
            $stmt = $con->prepare($sql);
            $stmt->bindValue(1, $data['myId']);
            $stmt->bindValue(2, $data['eventId']);
            $stmt->execute();

            return $con->lastInsertId();

        } catch (\Throwable $th) {
            echo $th;
        }
    }

    public static function get($data){
        try {
            $con = Connection::doConnection();
            $sql = "SELECT eventos.id as id, calendarios.id as calendarioId, usuarios.id as usuarioId ,title ,description ,author ,datestimes ,name as authorName FROM calendarios INNER JOIN eventos ON eventos.id = id_evento INNER JOIN usuarios ON usuarios.id = id_usuario WHERE id_usuario = ?";
            
            $stmt = $con->prepare($sql);
            $stmt->bindValue(1, $data);
            $stmt->execute();

            return $stmt->fetchAll((PDO::FETCH_ASSOC));

        } catch (\Throwable $th) {
            echo $th;
        }
    }

    public static function delete($data){
        try {
            $con = Connection::doConnection();
            
            $sql = "DELETE FROM calendarios WHERE id = ?";
            
            $stmt = $con->prepare($sql);
            $stmt->bindValue(1, $data);
            $stmt->execute();

            return $stmt->rowCount();

        } catch (\Throwable $th) {
            echo $th;
        }
    }
}