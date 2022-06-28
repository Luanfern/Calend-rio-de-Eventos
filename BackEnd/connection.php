<?php

class Connection{
    public static function doConnection(){
        try {
            return new PDO("mysql:host=localhost;dbname=calendariodeeventos", "root", "");
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}