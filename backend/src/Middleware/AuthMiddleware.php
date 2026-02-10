<?php
namespace App\Middleware;

use App\Dto\ApiResponse;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response as SlimResponse;

class AuthMiddleware {
    public function __invoke( Request $request, RequestHandler $handler ): Response {
        $authHeader = $request->getHeaderLine( 'Authorization' );
        $token = str_replace( 'Bearer ', '', $authHeader );

        if ( !$token ) {
            $response = new SlimResponse();
            $response->getBody()->write( ApiResponse::error( 'Token no proporcionado', 401 ) );
            return $response->withStatus( 401 )->withHeader( 'Content-Type', 'application/json' );
        }

        try {
            $decoded = JWT::decode( $token, new Key( $_ENV[ 'JWT_SECRET' ], 'HS256' ) );
            $request = $request
            ->withAttribute( 'user', $decoded )
            ->withAttribute( 'user_id', $decoded->sub );
        } catch ( ExpiredException $e ) {
            $response = new SlimResponse();
            $response->getBody()->write( ApiResponse::error( 'Token expirado', 401 ) );
            return $response->withStatus( 401 )->withHeader( 'Content-Type', 'application/json' );
        } catch ( \Throwable $e ) {
            $response = new SlimResponse();
            $response->getBody()->write( ApiResponse::error( 'Token inválido', 401 ) );
            return $response->withStatus( 401 )->withHeader( 'Content-Type', 'application/json' );
        }

        return $handler->handle( $request );
    }
}
