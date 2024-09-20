export interface Product {
  id: number;
  attributes: {
    name: string;
    price: string;
    slug: string;
    introduction: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    discount?: string;
    sizes: {
      data: {
        size: number;
        stock: number;
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
      };
    }[];
  };
  colors?: {
    data: {
      id: number;
      attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
    }[];
  };
  categories?: {
    data: {
      id: number;
      attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
    }[];
  };
  tags?: {
    data: {
      id: number;
      attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
    }[];
  };
}
