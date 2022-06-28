<?php

require __DIR__.'/../../connection.php';

class CadastroModel{
    public static function post($data){
        try {
            $con = Connection::doConnection();
            
            $sql = "INSERT INTO usuarios(name, email, password) VALUES (?,?,?)";
            
            $stmt = $con->prepare($sql);
            $stmt->bindValue(1, $data['login']);
            $stmt->bindValue(2, $data['email']);
            $stmt->bindValue(3, $data['password']);
            $stmt->execute();

            return $con->lastInsertId();

        } catch (\Throwable $th) {
            echo $th;
        }
    }
}