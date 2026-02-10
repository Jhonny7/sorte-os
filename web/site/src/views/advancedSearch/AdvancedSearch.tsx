import { useEffect, useRef, useState } from "react";
import { useAdvancedSearchPresenter } from "./AdvancedSearch.presenter";
import "./advancedSearch.scss";
import SearchBar from "@/components/molecules/search-bar/SearchBar";
import CategoryGrid from "@/components/molecules/category-grid/CategoryGrid";

export default function AdvancedSearch() {
  const {
    state,
    handleBusinessClick,
    handleBackToCategories,
    handleBackToBusinesses,
    handleSearchInputChange,
    handleCategoryClick,
  } = useAdvancedSearchPresenter();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        setIsScrolled(scrollTop > 20); // Se activa después de 20px de scroll
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [state.selectedCategory, state.selectedBusiness]); // Agregar dependencias para re-registrar el evento

  return (
    <div className="advanced-search-container" ref={containerRef}>
      <div className={`search-header ${isScrolled ? "scrolled" : ""}`}>
        <header className="header">
          <button
            onClick={
              state.selectedBusiness && state.menu.length > 0
                ? handleBackToBusinesses
                : (state.selectedCategory && state.businesses.length > 0) ||
                  (state.businesses.length > 0 &&
                    !state.selectedCategory &&
                    state.searchQuery)
                ? handleBackToCategories
                : () => {} // Vista por defecto no tiene acción de back
            }
            className="header-back"
            aria-label="Regresar"
          >
            ←
          </button>
          <h1 className="search-title">
            {state.selectedBusiness && state.menu.length > 0
              ? `Menú de ${state.selectedBusiness.name}`
              : "Búsqueda avanzada"}
          </h1>
        </header>
        <SearchBar
          searchQuery={state.searchQuery}
          onSearchInputChange={handleSearchInputChange}
        />
      </div>

      {/* Contenido scrolleable */}
      <div className="scrollable-content">
        {state.isLoading ? (
          <div className="loading">Cargando...</div>
        ) : state.selectedBusiness && state.menu.length > 0 ? (
          // Menú de negocio seleccionado
          <div className="menu-grid">
            {state.menu.map((item) => (
              <div key={item.id} className="menu-card">
                <img src={item.image} alt={item.name} className="menu-img" />
                <div className="menu-content">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="menu-price">${item.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (state.selectedCategory && state.businesses.length > 0) ||
          (state.businesses.length > 0 &&
            !state.selectedCategory &&
            state.searchQuery) ? (
          // Negocios de la categoría seleccionada o por búsqueda
          <>
            <h2>
              Negocios{" "}
              {state.selectedCategory
                ? `de ${state.selectedCategory.name}`
                : "encontrados"}
            </h2>
            <div className="businesses-grid">
              {state.businesses.map((business) => (
                <div
                  key={business.id}
                  className="business-card"
                  onClick={() => handleBusinessClick(business.id)}
                >
                  <img
                    src={business.image}
                    alt={business.name}
                    className="business-img"
                    onError={(e) => {
                      // Imagen de respaldo si falla la carga
                      e.currentTarget.src =
                        "https://via.placeholder.com/300x140?text=Negocio";
                    }}
                  />
                  <div className="business-info">
                    <h3>{business.name}</h3>
                    <p>
                      {business.time} min • {business.distance} km
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : state.noResults &&
          state.searchQuery &&
          state.businesses.length === 0 ? (
          // No se encontraron negocios
          <div className="no-results">
            <p>Lo sentimos, no encontramos resultados para tu búsqueda</p>
            <p>Intenta con otros términos o explora nuestras categorías</p>
          </div>
        ) : (
          // Vista por defecto con categorías
          <CategoryGrid
            categories={state.categories}
            onCategoryClick={handleCategoryClick}
          />
        )}
      </div>
    </div>
  );
}
