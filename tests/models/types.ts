export interface PageDetails {
  products: ProductDetails[];
  url: string;
  navLinks: string[];
}

export interface ProductDetails {
  title: string;
  link: string;
  description: string;
  price: string;
}
