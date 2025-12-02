interface SearchFilterBarProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  filterButtonText?: string;
  placeholderText?: string;
}
export type { SearchFilterBarProps };
