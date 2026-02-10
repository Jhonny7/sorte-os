<?php
namespace App\Utils;

class CaseConverter {
    public static function toCamelCaseArray(array $data): array {
        $converted = [];
        foreach ($data as $key => $value) {
            $camel = lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $key))));
            $converted[$camel] = is_array($value) ? self::toCamelCaseArray($value) : $value;
        }
        return $converted;
    }

    public static function toSnakeCaseArray(array $data): array {
        $converted = [];
        foreach ($data as $key => $value) {
            $snake = strtolower(preg_replace('/[A-Z]/', '_$0', $key));
            $converted[$snake] = is_array($value) ? self::toSnakeCaseArray($value) : $value;
        }
        return $converted;
    }
}
