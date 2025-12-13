import { Flame, Clock, TrendingUp, Sparkles, MapPin } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "ending-soon", label: "Ending Soon", icon: Clock },
  { id: "just-launched", label: "Just Launched", icon: Flame },
  { id: "near-goal", label: "Almost Funded", icon: MapPin },
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center py-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            activeCategory === category.id
              ? "bg-emerald-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <category.icon className="w-4 h-4" />
          {category.label}
        </button>
      ))}
    </div>
  );
}
