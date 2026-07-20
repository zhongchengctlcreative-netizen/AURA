export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  type: 'headphones' | 'earbuds' | 'speakers';
  image: string;
  features: string[];
  specs: {
    driver: string;
    frequencyResponse: string;
    batteryLife: string;
    connectivity: string;
  };
  soundProfile: 'bass-heavy' | 'balanced' | 'treble-focused';
  rating: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  productId: string;
}
