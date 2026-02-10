<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\CatalogService;
use App\Dto\ApiResponse;
use App\Dto\PaginationParams;
use App\Utils\CaseConverter;

class CatalogController
{
    protected $catalogService;

    public function __construct()
    {
        $this->catalogService = new CatalogService();
    }

    public function getAll(Request $request, Response $response, array $args): Response
    {
        $catalogs = $this->catalogService->getAllCatalogs();
        $camelData = CaseConverter::toCamelCaseArray($catalogs->toArray());
        $response->getBody()->write(ApiResponse::success($camelData, 'Catálogos obtenidos correctamente'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function getById(Request $request, Response $response, array $args): Response
    {
        try {
            $catalog = $this->catalogService->getCatalogById($args['id']);
            $camelData = CaseConverter::toCamelCaseArray($catalog->toArray());
            $response->getBody()->write(ApiResponse::success($camelData, 'Catálogo encontrado'));
            return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
        } catch (\Exception $e) {
            $response->getBody()->write(ApiResponse::error('Catálogo no encontrado', 404));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
    }

    public function create(Request $request, Response $response, array $args): Response
    {
        $content = $request->getBody()->getContents();
        $data = json_decode($content, true);

        $snakeData = CaseConverter::toSnakeCaseArray($data);
        $catalog = $this->catalogService->createCatalog($snakeData);

        $camelData = CaseConverter::toCamelCaseArray($catalog->toArray());
        $response->getBody()->write(ApiResponse::success($camelData, 'Catálogo creado correctamente', 201));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, array $args): Response
    {
        $content = $request->getBody()->getContents();
        $data = json_decode($content, true);

        $snakeData = CaseConverter::toSnakeCaseArray($data);

        try {
            $catalog = $this->catalogService->updateCatalog($snakeData);
            $camelData = CaseConverter::toCamelCaseArray($catalog->toArray());
            $response->getBody()->write(ApiResponse::success($camelData, 'Catálogo actualizado correctamente'));
            return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getPaginated(Request $request, Response $response, array $args): Response
    {
        $content = $request->getBody()->getContents();
        $body = json_decode($content, true);

        $params = new PaginationParams(is_array($body) ? $body : []);
        $data = $this->catalogService->getPaginatedCatalogs($params);

        // aquí $data es un array con items y pagination
        $camelData = CaseConverter::toCamelCaseArray($data);

        $response->getBody()->write(ApiResponse::success($camelData, 'Catálogos paginados correctamente'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function deleteBulk(Request $request, Response $response, array $args): Response
    {
        $content = $request->getBody()->getContents();
        $body = json_decode($content, true);

        if (!isset($body['ids']) || !is_array($body['ids'])) {
            throw new \App\Exceptions\BadRequestException('Debe proporcionar un array válido de IDs.');
        }

        $deletedCount = $this->catalogService->deleteCatalogsByIds($body['ids']);

        $camelData = CaseConverter::toCamelCaseArray(['deleted' => $deletedCount]);
        $response->getBody()->write(ApiResponse::success($camelData, 'Catálogos eliminados correctamente'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}
