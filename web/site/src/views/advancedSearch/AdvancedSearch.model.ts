export interface Category {
    id: string;
    name: string;
    image: string;
    icon?: string; // Icono opcional para la categoría
}

export interface Business {
    id: string;
    name: string;
    category: string;
    image: string;
    time: number;
    distance: number;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export interface AdvancedSearchState {
    searchQuery: string;
    categories: Category[];
    businesses: Business[];
    menu: MenuItem[];
    selectedCategory: Category | null; // Ahora es el objeto completo de categoría
    selectedBusiness: Business | null; // Ahora es el objeto completo de negocio
    isLoading: boolean;
    noResults?: boolean;
}
