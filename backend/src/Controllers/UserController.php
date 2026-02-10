<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\UserService;
use App\Dto\ApiResponse;
use App\Dto\PaginationParams;
use App\Models\User;

class UserController {
    protected $userService;

    public function __construct() {
        $this->userService = new UserService();
    }

    public function getAll( Request $request, Response $response, array $args ): Response {
        $users = $this->userService->getAllUsers();
        $response->getBody()->write( ApiResponse::success( $users, 'Usuarios obtenidos correctamente' ) );
        return $response->withStatus( 200 )->withHeader( 'Content-Type', 'application/json' );
    }

    public function getById( Request $request, Response $response, array $args ): Response {
        $user = $this->userService->getUserById( $args[ 'id' ] );
        if ( !$user ) {
            $response->getBody()->write( ApiResponse::error( 'Usuario no encontrado', 404 ) );
            return $response->withStatus( 404 )->withHeader( 'Content-Type', 'application/json' );
        }
        $response->getBody()->write( ApiResponse::success( $user, 'Usuario encontrado' ) );
        return $response->withStatus( 200 )->withHeader( 'Content-Type', 'application/json' );
    }

    public function create( Request $request, Response $response, array $args ): Response {
        $content = $request->getBody()->getContents();
        $data = json_decode( $content, true );
        $user = $this->userService->createUser( $data );
        $response->getBody()->write( ApiResponse::success( $user, 'Usuario creado correctamente', 201 ) );
        return $response->withStatus( 201 )->withHeader( 'Content-Type', 'application/json' );
    }

    public function update( Request $request, Response $response, array $args ): Response {
        $content = $request->getBody()->getContents();
        $data = json_decode( $content, true );

        try {
            $user = $this->userService->updateUser( $data );
            $response->getBody()->write( ApiResponse::success( $user, 'Usuario actualizado correctamente' ) );
            return $response->withStatus( 200 )->withHeader( 'Content-Type', 'application/json' );
        } catch ( \Exception $e ) {
            throw $e;

        }
    }

    public function getPaginated( Request $request, Response $response, array $args ): Response {
        $content = $request->getBody()->getContents();
        $body = json_decode( $content, true );

        $params = new PaginationParams( is_array( $body ) ? $body : [] );
        $data = $this->userService->getPaginatedUsers( $params );

        $response->getBody()->write( ApiResponse::success( $data, 'Usuarios paginados correctamente' ) );
        return $response->withStatus( 200 )->withHeader( 'Content-Type', 'application/json' );
    }

    public function deleteBulk( Request $request, Response $response, array $args ): Response {
        $content = $request->getBody()->getContents();
        $body = json_decode( $content, true );

        if ( !isset( $body[ 'ids' ] ) || !is_array( $body[ 'ids' ] ) ) {
            throw new \App\Exceptions\BadRequestException( 'Debe proporcionar un array válido de IDs.' );
        }

        $deletedCount = $this->userService->deleteUsersByIds( $body[ 'ids' ] );

        $response->getBody()->write( ApiResponse::success( [ 'deleted' => $deletedCount ], 'Usuarios eliminados correctamente' ) );
        return $response->withStatus( 200 )->withHeader( 'Content-Type', 'application/json' );
    }

    public function bulkUpload(Request $request, Response $response, array $args): Response {
        $uploadedFiles = $request->getUploadedFiles();

        if (!isset($uploadedFiles['file'])) {
            throw new \App\Exceptions\BadRequestException("Archivo no enviado");
        }

        $file = $uploadedFiles['file'];
        $userId = $request->getAttribute('user_id') ?? null;
        $result = $this->userService->processExcelFile($file, $userId);

        $response->getBody()->write(ApiResponse::success($result, 'Carga masiva procesada correctamente'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}
