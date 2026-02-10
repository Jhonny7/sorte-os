/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "common-lib";
import "./search-bar.scss";

interface SearchBarProps {
  searchQuery: string;
  onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchInputChange,
}: SearchBarProps) {
  return (
    <section className="search-container">
      <Icon name="search" />
      <input
        type="text"
        placeholder="Buscar en Delivery Aldama..."
        value={searchQuery}
        onChange={onSearchInputChange}
        className="search-input"
      />
      {searchQuery && (
        <button
          type="button"
          className="clear-btn"
          onClick={() => onSearchInputChange({ target: { value: "" } } as any)}
        >
          ×
        </button>
      )}
    </section>
  );
}
