<?php

namespace App\Daos;

use App\Models\Catalog;
use App\Dto\PaginationParams;
use App\Exceptions\BadRequestException;
use App\Exceptions\NotFoundException;

class CatalogDao
{

    public function findAll()
    {
        return Catalog::where('id_company', 8)->get();
    }

    public function findById(int $id, array $fields = ['*'])
    {
        $catalog = Catalog::where('id', $id)
            ->where('id_company', 8)
            ->select($fields)
            ->first();

        if (!$catalog) {
            throw new NotFoundException("Catálogo no encontrado");
        }

        return $catalog;
    }

    public function create(array $data)
    {
        $data['id_company'] = 8;

        if (!isset($data['id_catalog_type'])) {
            throw new BadRequestException("El campo 'id_catalog_type' es obligatorio");
        }

        $catalog = Catalog::create($data);
        return $catalog;
    }

    public function update(array $data)
    {
        if (empty($data['id'])) {
            throw new BadRequestException("El campo 'id' es obligatorio para actualizar");
        }

        $catalog = Catalog::where('id_company', 8)->find($data['id']);
        if (!$catalog) {
            throw new NotFoundException("Catálogo no encontrado");
        }

        $catalog->fill($data);
        $catalog->save();

        return $catalog;
    }

    public function deleteByIds(array $ids): int
    {
        return Catalog::where('id_company', 8)
            ->whereIn('id', $ids)
            ->delete();
    }

    public function paginate(PaginationParams $params)
    {
        $query = Catalog::query()->where('id_company', 8);

        if ($params->fields !== null) {
            $query->select($params->fields);
        }

        foreach ($params->filters as $field => $value) {
            if (is_array($value)) {
                if (isset($value['from'])) {
                    $query->where($field, '>=', $value['from']);
                }
                if (isset($value['to'])) {
                    $query->where($field, '<=', $value['to']);
                }
            } else {
                if (is_string($value)) {
                    if ($params->filterLogic === 'or') {
                        $query->orWhere($field, 'ILIKE', "%$value%");
                    } else {
                        $query->where($field, 'ILIKE', "%$value%");
                    }
                } else {
                    if ($params->filterLogic === 'or') {
                        $query->orWhere($field, '=', $value);
                    } else {
                        $query->where($field, '=', $value);
                    }
                }
            }
        }

        foreach ($params->fixedFilters as $field => $value) {
            $query->where($field, '=', $value);
        }

        $query->orderBy($params->orderBy, $params->orderDir);

        $total = $query->count();
        $items = $query->offset($params->offset())
            ->limit($params->limit)
            ->get();

        return [
            'items' => $items,
            'pagination' => [
                'page' => $params->page,
                'limit' => $params->limit,
                'total' => $total,
                'pages' => ceil($total / $params->limit),
            ]
        ];
    }
}
