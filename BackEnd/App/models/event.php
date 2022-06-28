<?php

require __DIR__.'/../../connection.php';

class EventModel{
    public static function getAll($id){
        try {
            $con = Connection::doConnection();
            if ($id == '') {
                $sql = 'SELECT eventos.id ,title ,description ,author ,datestimes ,name as authorName FROM eventos INNER JOIN usuarios ON eventos.author = usuarios.id';
                $stmt = $con->prepare($sql);
            }else{
                $sql = 'SELECT eventos.id ,title ,description ,author ,datestimes ,name as authorName FROM eventos INNER JOIN usuarios ON eventos.author = usuarios.id WHERE usuarios.id = ?';
                $stmt = $con->prepare($sql);
                $stmt->bindValue(1, $id);
            }
            $stmt->execute();

            return $stmt->fetchAll((PDO::FETCH_ASSOC));
        } catch (\Throwable $th) {
            echo $th;
        }
    }

    public static function get($idEvent){
        try {
            $con = Connection::doConnection();
            $sql = 'SELECT eventos.id ,title ,description ,author ,datestimes ,name as authorName FROM eventos INNER JOIN usuarios ON eventos.author = usuarios.id WHERE eventos.id = ?';
            $stmt = $con->prepare($sql);
            $stmt->bindValue(1, $idEvent);
            $stmt->execute();

            return $stmt->fetch((PDO::FETCH_ASSOC));
        } catch (\Throwable $th) {
            echo $th;
        }
    }
}