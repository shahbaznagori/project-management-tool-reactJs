import { useState } from "react";

const FilterStatus = ({ categories, onFilterChange }: { 
  categories: string[];
  onFilterChange: (category: string) => void;
}) => {
  const [selected, setSelected] = useState("All");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onFilterChange(value);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="font-medium text-gray-700 ">Filter:</label>
      <select
        value={selected}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2 bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer"
      >
        <option value="All">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterStatus