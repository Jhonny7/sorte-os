<?php
use Illuminate\Database\Capsule\Manager as Capsule;
use Dotenv\Dotenv;

// Cargar variables del entorno
$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

// Inicializar Eloquent
$capsule = new Capsule();

$capsule->addConnection([
    'driver'    => $_ENV['DB_DRIVER'],
    'host'      => $_ENV['DB_HOST'],
    'database'  => $_ENV['DB_DATABASE'],
    'username'  => $_ENV['DB_USERNAME'],
    'password'  => $_ENV['DB_PASSWORD'],
    'charset'   => $_ENV['DB_CHARSET'],
    'collation' => $_ENV['DB_COLLATION'],
    'prefix'    => $_ENV['DB_PREFIX'],
    'schema'    => 'public'
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();
