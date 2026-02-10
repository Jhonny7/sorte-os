<?php

namespace App\Controllers;

use App\Daos\UserDao;
use Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Dto\ApiResponse;
use Exception;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWTExceptionWithPayloadInterface;
use Firebase\JWT\Key;

class AuthController
{

    public function getToken(Request $request, Response $response, array $args): Response
    {
        $body = $request->getBody()->getContents();
        $data = json_decode($body, true);

        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (!$username || !$password) {
            $response->getBody()->write(ApiResponse::error('Username y contraseña requeridos', 400));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $userDao = new UserDao();
        $user = $userDao->findUser($username, $password);

        if (!$user) {
            $response->getBody()->write(ApiResponse::error('Credenciales inválidas' . $_ENV['COMPANY_ID'], 401));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        //token de 1minuto ->     time() + 60//

        $payload = [
            'sub' => $user->id,
            'username' => $user->username,
            'iat' => time(),
            'exp' => time() + (60 * 60), // 1 hora de expiración //para dev es 1minuto temporalmente
        ];

        $jwt = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

        $response->getBody()->write(ApiResponse::success(['token' => $jwt], 'Token generado correctamente'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function updateToken(Request $request, Response $response, array $args): Response
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            $response->getBody()->write(ApiResponse::error('Token no proporcionado', 401));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        $token = substr($authHeader, 7);

        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        } catch (ExpiredException $e) {
            $decoded = JWT::jsonDecode(JWT::urlsafeB64Decode(explode('.', $token)[1]));
        } catch (Exception $e) {
            $response->getBody()->write(ApiResponse::error('Token inválido', 401));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        // Puedes verificar el usuario en la BD si quieres aquí también
        $payload = [
            'sub' => $decoded->sub,
            'username' => $decoded->username,
            'iat' => time(),
            'exp' => time() + (60 * 60), // ⏰ Nuevo token por 1 minuto
        ];

        $newToken = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

        $response->getBody()->write(ApiResponse::success(['token' => $newToken], 'Token renovado'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function login(Request $request, Response $response, array $args): Response
    {
        $body = $request->getBody()->getContents();
        $data = json_decode($body, true);

        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (!$username || !$password) {
            $response->getBody()->write(ApiResponse::error('Username y contraseña requeridos', 400));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $userDao = new UserDao();
        $user = $userDao->findUser($username, $password);

        if (!$user) {
            $response->getBody()->write(ApiResponse::error('Credenciales inválidas', 404));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(ApiResponse::success([
            'username' => $user['username'],
            'name' => $user['name'],
            'lastName' => $user['last_name'],
            'email' => $user['email'],
            'urlImg' => $user['url_img'],
            'createAt' => $user['create_at']
        ], 'Usuario encontrado'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}
