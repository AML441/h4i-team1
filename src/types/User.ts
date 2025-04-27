import { Item } from "../types/Item";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "vendor"; 
}

export interface Client extends User {
  role: "client";
  itemsInCart: Item[];
}

export interface Vendor extends User {
  role: "vendor"; 
}