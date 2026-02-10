<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Catalog extends Model
{
    protected $table = 'core.catalog';
    public $timestamps = false;

    protected $fillable = [
        'id_catalog_type',
        'id_company',
        'id_parent',
        'priority',
        'extra',
        'url',
        'create_at',
        'id_user_created',
        'update_at',
        'id_user_updated',
        'name',
        'description',
        'enable',
    ];

    // Si la PK no es "id", declara la tuya:
    // protected $primaryKey = 'id';
}
