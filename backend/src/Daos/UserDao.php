<?php

namespace App\Daos;

use App\Dto\PaginationParams;
use App\Exceptions\BadRequestException;
use App\Exceptions\NotFoundException;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserDao
{
    public function findAll()
    {
        return User::all();
    }

    public function findById($id, array $fields = ['*'])
    {
        $companyId = (int) $_ENV['COMPANY_ID'];
        $user = User::where('id', $id)
            ->where('id_company', $companyId)
            ->select($fields)
            ->first();
        $user['custom_data'] = json_decode($user['custom_data']);
        return $user;
    }

    public function create(array $data)
    {
        $companyId = (int) $_ENV['COMPANY_ID'];
        if (
            isset($data['email'], $data['id_company']) &&
            (int)$data['id_company'] === $companyId
        ) {
            $exists = \App\Models\User::where('id_company', $companyId)
                ->where(function ($query) use ($data) {
                    $query->where('email', $data['email'])
                        ->orWhere('username', $data['username']);
                })->exists();

            if ($exists) {
                throw new BadRequestException("El email ya está registrado en la compañía $companyId");
            }
        }

        if (isset($data['custom_data']) && is_array($data['custom_data'])) {
            $data['custom_data'] = json_encode($data['custom_data']);
        }
        return User::create($data);
    }

    public function findUser(string $login, string $password): ?User
    {
        $companyId = (int)($_ENV['COMPANY_ID'] ?? 8);

        $user = User::where('id_company', $companyId)
            ->where(function ($query) use ($login) {
                $query->where('username', $login)
                    ->orWhere('email', $login);
            })
            ->first();

        if (!$user) {
            return null;
        }

        $password = trim($password);

        if (!password_verify($password, $user->password)) {
            return null;
        }

        return $user;
    }


    public function paginate(PaginationParams $params)
    {
        $query = User::query();
        //xdebug_break();
        if ($params->fields !== null) {
            $query->select($params->fields);
        }

        // Filtros
        foreach ($params->filters as $field => $value) {
            if (is_array($value)) {
                // Filtro por rango
                if (isset($value['from'])) {
                    $query->where($field, '>=', $value['from']);
                }
                if (isset($value['to'])) {
                    $query->where($field, '<=', $value['to']);
                }
            } else {
                // Filtro normal con lógica OR/AND
                if ($params->filterLogic === 'or') {
                    $query->orWhere($field, 'ILIKE', "%$value%");
                } else {
                    $query->where($field, '=', $value);
                }
            }
        }

        // Filtros fijos siempre con AND
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
            //'query' => $query->toSql(),
            'pagination' => [
                'page' => $params->page,
                'limit' => $params->limit,
                'total' => $total,
                'pages' => ceil($total / $params->limit),
            ]
        ];
    }

    public function update(array $data)
    {
        if (empty($data['id'])) {
            throw new BadRequestException("El campo 'id' es obligatorio para actualizar");
        }

        $user = User::find($data['id']);
        if (!$user) {
            throw new NotFoundException("Usuario no encontrado");
        }

        $companyId = (int) $_ENV['COMPANY_ID'];

        if (
            isset($data['email']) || isset($data['username'])
        ) {
            $query = User::where('id_company', $companyId)
                ->where('id', '!=', $data['id']);

            $query->where(function ($q) use ($data) {
                if (isset($data['email'])) {
                    $q->orWhere('email', $data['email']);
                }
                if (isset($data['username'])) {
                    $q->orWhere('username', $data['username']);
                }
            });

            if ($query->exists()) {
                throw new BadRequestException("El email o username ya está registrado en la compañía");
            }
        }

        if (isset($data['password'])) {
            $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        }

        if (isset($data['custom_data']) && is_array($data['custom_data'])) {
            $data['custom_data'] = json_encode($data['custom_data']);
        }

        $user->fill($data);
        $user->save();

        return $user;
    }

    public function deleteByIds(array $ids): int
    {
        return \App\Models\User::whereIn('id', $ids)->delete();
    }
}
