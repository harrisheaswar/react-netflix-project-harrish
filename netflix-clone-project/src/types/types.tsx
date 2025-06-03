export interface DropdownMenuProps {
  triggerLabel: React.ReactNode;
  onClose: () => void;
}

export interface Movie {
  id: number;
  title?: string;
  backdrop_path?: string;
  overview?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreWithMovie {
  id: number;
  name: string;
  movies: Movie[];
}
