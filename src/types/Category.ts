export interface categoryProps {
    slug: string;
    name: string;
    url: string;
}

export interface HandleClickCategory {
    (slug: string): void;
  }
