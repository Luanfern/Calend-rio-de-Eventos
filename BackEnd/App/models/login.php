<?php

require __DIR__.'/../../connection.php';

class LoginModel{
    public static function post($data){
        try {
            $con = Connection::doConnection();
            
            $sql = "SELECT id FROM usuarios WHERE (name = :login OR email = :login) AND password = :pass";
            
            $stmt = $con->prepare($sql);
            $stmt->bindValue(":login", $data['login']);
            $stmt->bindValue(":pass", $data['senha']);
            $stmt->execute();

            return $stmt->fetchAll();

        } catch (\Throwable $th) {
            echo $th;
        }
    }
}