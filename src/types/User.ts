export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "vendor"; 
}

export interface Client extends User {
  role: "client";
  itemsInCart: string[];
}

export interface Vendor extends User {
  role: "vendor"; 
}