'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UpdatedSearchFilterBarProps {
  onFilterClick?: () => void;
  filterButtonText?: string;
  placeholderText?: string;
}

export const SearchFilterBar = ({
  onFilterClick,
  filterButtonText = 'Todas',
  placeholderText = 'Buscar evento',
}: UpdatedSearchFilterBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(currentQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }

    router.push(`/?${params.toString()}`);
  };

  useEffect(() => {
    setSearchQuery(currentQuery);
  }, [currentQuery]);

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
           grow 
            h-full 
            px-4 
            sm:px-6 
            text-base 
            text-gray-700 
            placeholder-gray-400 
            focus:outline-none
          "
        />

        <button
          type="submit" // Mudança: Agora o botão de busca principal é o SUBMIT
          aria-label="Buscar"
          className="
            hidden
            shrink-0 
            h-full 
            px-6 
            sm:px-8 
            font-semibold 
            text-white 
            bg-blue-600 // Mudança de cor para destacar a ação principal
            hover:bg-blue-700 
            transition 
            duration-150 
            ease-in-out 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-600 
            focus:ring-offset-2
          "
        >
          Buscar
        </button>

        <button
          type="button"
          onClick={onFilterClick}
          aria-label={`Filtrar por ${filterButtonText}`}
          className="
            shrink-0 
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
