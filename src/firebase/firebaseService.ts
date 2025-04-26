import { getFirestore, doc, setDoc, updateDoc, collection, addDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";

import { db } from "./firebase"; 
import { Client } from '../types/User';
import { Vendor } from '../types/User';
import { Item } from '../types/Item';

export const createClient = async (clientData: Omit<Client, "id">) => {
    try {
      // add the client (without an ID) and let Firestore create the doc
      const docRef = await addDoc(collection(db, "clients"), clientData);
  
      //firebase should autogenerate a unique id for each user so dw
      await updateDoc(docRef, { id: docRef.id });
  
      console.log("Client created with ID:", docRef.id);
    } catch (error) {
      console.error("Failed to create client:", error);
    }
  };

//add client function just in case it's needed 
export const addClient = async (client: Client) => {
    await setDoc(doc(db, "clients", client.id), client);
};


//this will allow the vendor to add items to the page
//firebase will autogenerate an id for each item
export const addItem = async (item: Omit<Item, "id">) => {
  const docRef = await addDoc(collection(db, "items"), item);
  await updateDoc(docRef, { id: docRef.id });
};

//should allow the vendor to delete the item from the product catalogue
export const deleteItem = async (itemId: string) => {
    try {
      const itemRef = doc(db, "items", itemId);
      await deleteDoc(itemRef);
      console.log(`Item with ID "${itemId}" deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  //clients can add items to cart
export const addItemToCart = async (clientId: string, itemName: string) => {
    try {
      const clientRef = doc(db, "clients", clientId);
      await updateDoc(clientRef, {
        //will add it to the itemsInCart array
        itemsInCart: arrayUnion(itemName),
      });
      console.log(`Item "${itemName}" added to client ${clientId}'s cart`);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  //clients can remove items from the cart
  export const removeItemFromCart = async (clientId: string, itemName: string) => {
    try {
      const clientRef = doc(db, "clients", clientId);
      await updateDoc(clientRef, {
        //will delete it from the itemsInCart array
        itemsInCart: arrayRemove(itemName),
      });
      console.log(`Item "${itemName}" removed from client ${clientId}'s cart`);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
};