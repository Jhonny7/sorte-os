<?php
use Slim\Factory\AppFactory;
//controllers
use App\Controllers\UserController;
use App\Controllers\CatalogController;
use App\Controllers\AuthController;
use App\Middleware\AuthMiddleware;
use Slim\Middleware\ErrorMiddleware;
use App\Middleware\CustomErrorHandler;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/Config/Database.php';

$app = AppFactory::create();

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);

    return $response
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});


// Rutas públicas
$app->get('/test/ping', function ($request, $response) {
    $response->getBody()->write(json_encode(['status' => 'ok']));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/user/login', [AuthController::class, 'login']);
$app->post('/auth/token', [AuthController::class, 'getToken']);
$app->post('/auth/updateToken', [AuthController::class, 'updateToken']);

$app->group('/user', function($group) {
    $group->get('', [UserController::class, 'getAll']);
    $group->post('/paginated', [UserController::class, 'getPaginated']);
    $group->get('/{id}', [UserController::class, 'getById']);
    $group->post('', [UserController::class, 'create']);
    $group->put('', [UserController::class, 'update']);
    $group->delete('', [UserController::class, 'deleteBulk']);
    $group->post('/bulk-upload', [UserController::class, 'bulkUpload']);
})->add(new AuthMiddleware());

$app->group('/catalog', function($group) {
    $group->get('', [CatalogController::class, 'getAll']);
    $group->post('/paginated', [CatalogController::class, 'getPaginated']);
    $group->get('/{id}', [CatalogController::class, 'getById']);
    $group->post('', [CatalogController::class, 'create']);
    $group->put('', [CatalogController::class, 'update']);
    $group->delete('', [CatalogController::class, 'deleteBulk']);
})->add(new AuthMiddleware());

// Middleware de errores global
$customErrorHandler = new CustomErrorHandler(
    $app->getCallableResolver(),
    $app->getResponseFactory()
);

$errorMiddleware = new ErrorMiddleware(
    $app->getCallableResolver(),
    $app->getResponseFactory(),
    true,  // Mostrar detalles en desarrollo
    false,
    false
);
$errorMiddleware->setDefaultErrorHandler($customErrorHandler);
$app->add($errorMiddleware);

$app->run();
