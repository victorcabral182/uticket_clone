'use client';

import React, { useState } from 'react';
import { SearchFilterBarProps } from './types';

export const SearchFilterBar = ({
  onSearch,
  onFilterClick,
  filterButtonText = 'Todas',
  placeholderText = 'Buscar evento',
}: SearchFilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="bg-transparent z-40">
      <form
        onSubmit={handleSearchSubmit}
        className="
          flex 
          items-center 
          bg-white 
          rounded-full 
          shadow-lg 
          overflow-hidden 
          w-full 
          mx-auto 
          h-14 
          sm:h-16
        "
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholderText}
          aria-label={placeholderText}
          className="
            flex-grow 
            h-full 
            px-4 
            sm:px-6 
            text-base 
            text-gray-700 
            placeholder-gray-400 
            focus:outline-none
            // Remove o foco do botão nativo do navegador
            // ring-0 
          "
        />

        <button
          type="button" //
          onClick={onFilterClick}
          aria-label={`Filtrar por ${filterButtonText}`}
          className="
            flex-shrink-0 
            h-full 
            px-6 
            sm:px-8 
            font-semibold 
            text-white 
            bg-orange-500 
            hover:bg-orange-600 
            transition 
            duration-150 
            ease-in-out 
            focus:outline-none 
            focus:ring-2 
            focus:ring-orange-500 
            focus:ring-offset-2
          "
        >
          {filterButtonText}
        </button>
      </form>
    </div>
  );
};
