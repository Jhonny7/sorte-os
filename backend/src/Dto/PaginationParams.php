<?php
namespace App\Dto;

class PaginationParams {
    public int $page;
    public int $limit;
    public string $orderBy;
    public string $orderDir;
    public array $filters;
    public string $filterLogic;
    public ?array $fields;
    public array $fixedFilters;

    public function __construct(array $query = []) {
        $this->page         = isset($query['page']) ? max(1, (int)$query['page']) : 1;
        $this->limit        = isset($query['limit']) ? max(1, (int)$query['limit']) : 10;
        $this->orderBy      = $query['order_by'] ?? 'id';
        $this->orderDir     = strtolower($query['order_dir'] ?? 'asc') === 'desc' ? 'desc' : 'asc';
        $this->filters      = $query['filters'] ?? [];
        $this->fixedFilters = $query['fixed_filters'] ?? [];
        $this->filterLogic  = strtolower($query['filter_logic'] ?? 'and');

        if (isset($query['fields'])) {
            $rawFields = trim((string)$query['fields']);
            $this->fields = $rawFields === '*' ? null : array_map('trim', explode(',', $rawFields));
        } else {
            $this->fields = null;
        }
    }

    public function offset(): int {
        return ($this->page - 1) * $this->limit;
    }
}
