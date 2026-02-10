import React, { useState, useEffect, useRef } from 'react';
import {
  type AdvancedSearchState,
  type Category,
  type Business,
  type MenuItem
} from './AdvancedSearch.model';

const CATEGORIES_URL = '/categories.json';
const BUSINESSES_URL = '/businesses.json';
const MENU_PREFIX = '/menus_'; 

export const useAdvancedSearchPresenter = () => {
  const [state, setState] = useState<AdvancedSearchState>({
    searchQuery: '',
    categories: [],
    businesses: [],
    menu: [],
    selectedCategory: null,
    selectedBusiness: null,
    isLoading: false,
    noResults: false,
  });

  // Cache de negocios para evitar múltiples fetch
  const businessesCache = useRef<Business[] | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch categorías al montar
  useEffect(() => {
    setState(prev => ({ ...prev, isLoading: true }));
    fetch(CATEGORIES_URL)
      .then(res => res.json())
      .then((categories: Category[]) => {
        setState(prev => ({ ...prev, categories, isLoading: false }));
      });
  }, []);

  // Fetch negocios al montar (para búsqueda en tiempo real)
  useEffect(() => {
    fetch(BUSINESSES_URL)
      .then(res => res.json())
      .then((businesses: Business[]) => {
        businessesCache.current = businesses;
      });
  }, []);

  // --- SEARCH BAR LOGIC (debounce en tiempo real, inmediato con Enter) ---
  useEffect(() => {
    // Solo buscar si hay texto y no está en modo menú o negocio
    if (state.searchQuery.trim() && !state.selectedCategory && !state.selectedBusiness) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        doSearch(state.searchQuery);
      }, 400);
    } else if (!state.searchQuery && !state.selectedCategory && !state.selectedBusiness) {
      setState(prev => ({ ...prev, businesses: [], noResults: false }));
    }
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [state.searchQuery]);

  // Función para buscar negocios por categoría, nombre de negocio y por menú (usada por debounce y Enter)
  const doSearch = async (queryString: string) => {
    setState(prev => ({ ...prev, isLoading: true, noResults: false }));
    const query = queryString.trim().toLowerCase();
    const allBusinesses = businessesCache.current || [];

    // Coincidencia por categoría o nombre del negocio
    const matchMeta = allBusinesses.filter(b =>
      b.category.toLowerCase().includes(query) ||
      b.name.toLowerCase().includes(query)
    );

    // Para los que no coincidieron por meta, revisar su menú
    const remaining = allBusinesses.filter(b => !matchMeta.some(m => m.id === b.id));
    const matchedByMenu: Business[] = [];
    await Promise.all(
      remaining.map(async (b) => {
        try {
          const res = await fetch(`${MENU_PREFIX}${b.id}.json`);
          if (!res.ok) return;
          const menu: MenuItem[] = await res.json();
          const has = menu.some(item => item.name.toLowerCase().includes(query));
          if (has) matchedByMenu.push(b);
        } catch { /* empty */ }
      })
    );

    const combined = [...matchMeta, ...matchedByMenu];
    setState(prev => ({
      ...prev,
      businesses: combined,
      isLoading: false,
      noResults: combined.length === 0,
    }));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (!state.searchQuery.trim()) return;
    doSearch(state.searchQuery);
  };

  // Buscar negocios por categoría (cuando se selecciona una categoría)
  const handleCategoryClick = (categoryId: string) => {
    const category = state.categories.find(c => c.id === categoryId);
    if (!category) return;

    setState(prev => ({
      ...prev,
      isLoading: true,
      selectedCategory: category,
      businesses: [],
      menu: [],
      selectedBusiness: null,
      searchQuery: '',
      noResults: false
    }));

    const allBusinesses = businessesCache.current || [];
    const filtered = allBusinesses.filter(b => b.category === categoryId);
    setState(prev => ({ ...prev, businesses: filtered, isLoading: false }));
  };

  // Buscar menú por negocio
  const handleBusinessClick = (businessId: string) => {
    const business = state.businesses.find(b => b.id === businessId);
    if (!business) return;

    setState(prev => ({
      ...prev,
      isLoading: true,
      selectedBusiness: business,
      menu: []
    }));

    fetch(`${MENU_PREFIX}${businessId}.json`)
      .then(res => res.json())
      .then((menu: MenuItem[]) => {
        setState(prev => ({ ...prev, menu, isLoading: false }));
      });
  };

  const handleBackToCategories = () => {
    setState(prev => ({
      ...prev,
      selectedCategory: null,
      businesses: [],
      menu: [],
      selectedBusiness: null,
      searchQuery: '',
      noResults: false
    }));
  };

  const handleBackToBusinesses = () => {
    setState(prev => ({
      ...prev,
      menu: [],
      selectedBusiness: null
    }));
  };

  return {
    state,
    handleCategoryClick,
    handleBusinessClick,
    handleBackToCategories,
    handleBackToBusinesses,
    handleSearchInputChange,
    handleSearch,
  };
};
