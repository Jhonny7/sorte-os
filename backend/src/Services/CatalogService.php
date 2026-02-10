<?php
namespace App\Services;

use App\Daos\CatalogDao;
use App\Dto\PaginationParams;
use App\Exceptions\BadRequestException;

class CatalogService {
    protected $catalogDao;

    public function __construct() {
        $this->catalogDao = new CatalogDao();
    }

    public function getAllCatalogs() {
        return $this->catalogDao->findAll();
    }

    public function getCatalogById(int $id) {
        return $this->catalogDao->findById($id, [
            'id',
            'id_catalog_type',
            'id_parent',
            'priority',
            'extra',
            'url',
            'name',
            'description',
            'enable'
        ]);
    }

    public function createCatalog(array $data) {
        $data['id_company'] = 8;

        if (empty($data['id_catalog_type'])) {
            throw new BadRequestException("El campo 'id_catalog_type' es obligatorio");
        }
        if (empty($data['name'])) {
            throw new BadRequestException("El campo 'name' es obligatorio");
        }

        $data['enable'] = $data['enable'] ?? true;
        $data['create_at'] = $data['create_at'] ?? date('Y-m-d H:i:s');

        return $this->catalogDao->create($data);
    }

    public function updateCatalog(array $data) {
        return $this->catalogDao->update($data);
    }

    public function getPaginatedCatalogs(PaginationParams $params) {
        return $this->catalogDao->paginate($params);
    }

    public function deleteCatalogsByIds(array $ids): int {
        return $this->catalogDao->deleteByIds($ids);
    }
}
