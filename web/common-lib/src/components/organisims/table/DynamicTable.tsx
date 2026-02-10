import React, { useEffect, useState } from 'react';
import "./dynamic-table.scss";
import Icon from './../../..//components/atoms/icon/Icon';

interface Column {
    key: string;
    label: string;
    visible?: boolean;
    sortable?: boolean;
    render?: (value: any, row: Record<string, any>) => React.ReactNode;
}

interface DynamicTableProps {
    columns: Column[];
    data: Record<string, any>[];
    moduleTitle?: string;
    selectable?: boolean;
    singleSelection?: boolean;
    keyTag?: string;
    onSelectionChange?: (selectedKeys: any[]) => void;
}

export default function DynamicTable({
    columns,
    data,
    moduleTitle = 'Reporte',
    selectable = false,
    singleSelection = false,
    keyTag = 'id',
    onSelectionChange
}: DynamicTableProps) {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [search, setSearch] = useState('');
    const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

    const visibleColumns = columns.filter(col => col.visible !== false);

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig) return 0;
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredData = sortedData.filter(row =>
        visibleColumns.some(col =>
            String(row[col.key] ?? '')
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    );

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig?.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const toggleSelection = (keyValue: any) => {
        let newSelected;
        if (singleSelection) {
            newSelected = selectedKeys.includes(keyValue) ? [] : [keyValue];
        } else {
            newSelected = selectedKeys.includes(keyValue)
                ? selectedKeys.filter(k => k !== keyValue)
                : [...selectedKeys, keyValue];
        }
        setSelectedKeys(newSelected);
        onSelectionChange?.(newSelected);
    };

    return (
        <div className="table-wrapper">
            <section className='search-content'>
                <section className='search-bar'>
                    <div className='module-title'>
                        {moduleTitle}
                    </div>
                    <div className='searcher'>
                        <div>
                            Buscar
                        </div>
                        <input type="text" placeholder='Filtro...' value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </section>
                <section className='actions'>
                    <button><Icon name='filter_list' />Filtro</button>
                    <button><Icon name='add' />Agregar</button>
                </section>
            </section>

            <section className='content-table'>
                <table className="dynamic-table">
                    <thead>
                        <tr>
                            {selectable && <th className="checkbox-column"></th>}
                            {visibleColumns.map(col => (
                                <th key={col.key} onClick={() => col.sortable && requestSort(col.key)}>
                                    {col.label}
                                    {sortConfig?.key === col.key && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, idx) => (
                            <tr key={idx}>
                                {selectable && (
                                    <td className="checkbox-column">
                                        <input
                                            type={singleSelection ? 'radio' : 'checkbox'}
                                            name="table-selection"
                                            checked={selectedKeys.includes(row[keyTag])}
                                            onChange={() => toggleSelection(row[keyTag])}
                                        />
                                    </td>
                                )}
                                {visibleColumns.map(col => (
                                    <td key={col.key}>
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};
