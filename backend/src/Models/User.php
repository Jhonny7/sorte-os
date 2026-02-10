<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model {
    protected $table = 'core.users'; // tabla en BD
    public $timestamps = false; // si no tienes `created_at` y `updated_at`

    // si la PK no se llama 'id':
    // protected $primaryKey = 'tu_pk';

    protected $fillable = [
        'id_user_type',
        'id_company',
        'uuid',
        'token',
        'name',
        'last_name',
        'language',
        'height',
        'width',
        'username',
        'password',
        'email',
        'url_img',
        'timezone',
        'verification_code',
        'monetize',
        'country',
        'phone',
        'monetize_url',
        'id_stripe',
        'notifications',
        'custom_data',
    ];
}
