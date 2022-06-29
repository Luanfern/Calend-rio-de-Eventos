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

    public static function post($data){
        try {
            $con = Connection::doConnection();
            $sql = "INSERT INTO eventos(title, description, author, datestimes) VALUES (?,?,?,?)";
            $stmt = $con->prepare($sql);
            $stmt->bindValue(1, $data['title']);
            $stmt->bindValue(2, $data['description']);
            $stmt->bindValue(3, $data['idAuthor']);
            $stmt->bindValue(4, $data['datestimes']);
            $stmt->execute();

            return $con->lastInsertId();

        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public static function delete($idDelete){
        try {
            $con = Connection::doConnection();
            $sql = 'DELETE FROM `eventos` WHERE id = :id';
            $stmt = $con->prepare($sql);
            $stmt->bindValue(":id", $idDelete);
            $stmt->execute();

            return $stmt->rowCount();

        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public static function update($data){
        try {
            $con = Connection::doConnection();
            $sql = "UPDATE `eventos` SET `title`= ?,`description`= ?,`datestimes`= ? WHERE id = ?";
            $stmt = $con->prepare($sql);
            $stmt->bindValue(1, $data['title']);
            $stmt->bindValue(2, $data['description']);
            $stmt->bindValue(3, $data['datestimes']);
            $stmt->bindValue(4, $data['id']);
            $stmt->execute();

            return $stmt->rowCount();

        } catch (\Throwable $th) {
            throw $th;
        }
    }
}