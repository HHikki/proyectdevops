import React, { useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const SearchP = ({
  onSearch,
  onFilterChange,
  placeholder = "Buscar publicaciones...",
}) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("todos");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value, filter);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    if (onFilterChange) onFilterChange(query, value);
  };

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        value={query}
        onChange={handleInputChange}
        style={{ flex: 1 }}
      />
      <Select
        value={filter}
        onChange={handleFilterChange}
        style={{ width: 120 }}
      >
        <Option value="todos">Todos</Option>
        <Option value="publicadas">Publicadas</Option>
        <Option value="borradores">Borradores</Option>
        {/* Puedes agregar más opciones aquí */}
      </Select>
    </div>
  );
};

export default SearchP;
