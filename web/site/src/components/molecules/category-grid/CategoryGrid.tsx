import "./category-grid.scss";

interface Category {
  id: string;
  name: string;
  image: string;
  icon?: string;
}

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
}

function CategoryGrid({ categories, onCategoryClick }: CategoryGridProps) {
  return (
    <div className="categories-grid">
      {categories.map((category) => (
        <div
          key={category.id}
          className="category-card"
          onClick={() => onCategoryClick(category.id)}
        >
          <div className="category-thumb">
            <img src={category.image} alt={category.name} />
          </div>
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </div>
  );
}

export default CategoryGrid;
