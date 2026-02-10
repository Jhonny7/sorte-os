<?php
namespace App\Middleware;

use Slim\Handlers\ErrorHandler;
use Psr\Http\Message\ResponseInterface as Response;
use App\Exceptions\BadRequestException;

class CustomErrorHandler extends ErrorHandler {
    protected function respond(): Response {
        $exception = $this->exception;

        // Define código según tipo de excepción
        $statusCode = ($exception instanceof BadRequestException) ? 400 : 500;

        $errorInfo = [
            'code' => $statusCode,
            'status' => 'error',
            'message' => $exception->getMessage(),
            'exception' => get_class($exception),
            'file' => $exception->getFile(),
            'line' => $exception->getLine()
        ];

        $response = $this->responseFactory->createResponse();
        $response->getBody()->write(json_encode([
            'code' => $statusCode,
            'status' => 'error',
            'message' => $exception->getMessage(),
            'details' => $errorInfo
        ]));

        return $response->withHeader('Content-Type', 'application/json')
                        ->withStatus($statusCode);
    }
}
