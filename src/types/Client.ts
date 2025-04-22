export interface Client {
    id: string;
    name: string;
    email: string;
    password: string;
    itemsInCart: string[]; //names of product
  }