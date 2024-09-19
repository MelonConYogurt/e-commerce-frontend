export interface Product {
  id: number;
  attributes: {
    name: string;
    price: number;
    slug: string;
    introduction: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    stocksize10?: number;
    stocksize9?: number;
    stocksize8?: number;
    stocksize7?: number;
    company?: string;
    colors: {
      data: {
        id: string;
        attributes: {
          name: string;
        };
      }[];
    };
    media: {
      data: {
        id: number;
        attributes: {
          url: string;
          formats: {
            small?: {
              url: string;
            };
            medium?: {
              url: string;
            };
            large?: {
              url: string;
            };
          };
        };
      }[];
    };
  };
}
