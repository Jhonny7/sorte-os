<?php
namespace App\Services;

use App\Daos\UserDao;
use App\Dto\PaginationParams;
use App\Exceptions\BadRequestException;
use PhpOffice\PhpSpreadsheet\IOFactory;

class UserService {
    protected $userDao;

    public function __construct() {
        $this->userDao = new UserDao();
    }

    public function getAllUsers() {
        return $this->userDao->findAll();
    }

    public function getUserById( $id ) {
        return $this->userDao->findById( $id, [ 'id', 'username', 'email', 'custom_data' ] );
    }

    public function createUser( array $data ) {
        $companyId = ( int ) $_ENV[ 'COMPANY_ID' ];
        $admin = ( int ) $_ENV[ 'ADMIN' ];
        $required = [ 'name', 'last_name', 'username', 'password', 'timezone' ];

        foreach ( $required as $field ) {
            if ( empty( $data[ $field ] ) ) {
                throw new BadRequestException( "El campo '$field' es obligatorio" );
            }
        }

        $data[ 'password' ] = password_hash( $data[ 'password' ], PASSWORD_BCRYPT );
        $data[ 'id_company' ] = $companyId;
        $data[ 'id_user_type' ] = $admin;
        return $this->userDao->create( $data );
    }

    public function updateUser( array $data ) {
        return $this->userDao->update( $data );
    }

    public function getPaginatedUsers( PaginationParams $params ) {
        return $this->userDao->paginate( $params );
    }

    public function deleteUsersByIds( array $ids ): int {
        return $this->userDao->deleteByIds( $ids );
    }

    public function processExcelFile( $file, int $userId ) {
        $spreadsheet = IOFactory::load( $file->getStream()->getMetadata( 'uri' ) );
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray();

        $processed = [];
        $hasErrors = false;

        foreach ( $rows as $index => $row ) {
            if ( $index === 0 ) continue;
            // Saltar encabezado

            $userData = [
                'name' => $row[ 0 ],
                'last_name' => $row[ 1 ],
                'username' => $row[ 2 ],
                'email' => $row[ 3 ],
                'timezone' => $row[ 4 ],
                'password' => $row[ 5 ],
                'id_company' => ( int ) $_ENV[ 'COMPANY_ID' ],
                'id_user_type' => ( int ) $_ENV[ 'ADMIN' ],
            ];

            try {
                $this->validateUserData( $userData );
                $userData[ 'password' ] = password_hash( $userData[ 'password' ], PASSWORD_BCRYPT );
                $userData[ 'error' ] = null;

            } catch ( \Throwable $e ) {
                $userData[ 'error' ] = $e->getMessage();
                $hasErrors = true;
            }

            $processed[] = $userData;
        }

        if ( $hasErrors ) {
            \App\Models\BulkUpload::create( [
                'module' => 'users',
                'data' => json_encode( $processed ),
                'user_create' => $userId,
                'is_valid'=>false
            ] );

            throw new \App\Exceptions\BadRequestException( 'Se encontraron errores. Ningún usuario fue creado.' );
        }else{
            \App\Models\BulkUpload::create( [
                'module' => 'users',
                'user_create' => $userId,
                'is_valid'=>true
            ] );
        }

        foreach ( $processed as $userData ) {
            $this->userDao->create( $userData );
        }

        return [ 'created' => count( $processed ) ];
    }

    private function validateUserData(array $data): void {
    $required = ['name', 'last_name', 'username', 'password', 'timezone'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            throw new \App\Exceptions\BadRequestException("El campo '$field' es obligatorio");
        }
    }

    $companyId = (int) $_ENV['COMPANY_ID'];

    if (
        isset($data['email'], $data['username']) &&
        \App\Models\User::where('id_company', $companyId)
            ->where(function ($query) use ($data) {
                $query->where('email', $data['email'])
                      ->orWhere('username', $data['username']);
            })->exists()
    ) {
        throw new \App\Exceptions\BadRequestException("Email o username ya registrados en la compañía $companyId");
    }
}
}