<?php
namespace App\Dto;

class ApiResponse
{
    public static function success($data, string $message = 'Operación exitosa', int $code = 200): string
    {
        return json_encode([
            'code' => $code,
            'status' => 'success',
            'data' => $data,
            'message' => $message,
        ]);
    }

    public static function error(string $message, int $code = 400, $data = null): string
    {
        return json_encode([
            'code' => $code,
            'status' => 'error',
            'data' => $data,
            'message' => $message,
        ]);
    }
}
