<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BulkUpload extends Model {
    protected $table = 'core.bulk_uploads';
    public $timestamps = false;

    protected $fillable = [
        'module',
        'data',
        'user_create',
        'create_at',
        'is_valid'
    ];

    protected $casts = [
        'data' => 'array',
        'create_at' => 'datetime',
        'is_valid' => 'boolean'
    ];
}
