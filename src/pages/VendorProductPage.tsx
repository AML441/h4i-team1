import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // adjust path if needed

type Order = {
  productId: string;
  quantity: number;
};

export default function VendorProductPage() {
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchOrders() {
      const snapshot = await getDocs(collection(db, "orders"));
      const allOrders: Order[] = snapshot.docs.map(doc => doc.data() as Order);

      const counts: Record<string, number> = {};
      allOrders.forEach(order => {
        if (!counts[order.productId]) {
          counts[order.productId] = 0;
        }
        counts[order.productId] += order.quantity;
      });

      setProductCounts(counts);
    }

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Product Orders</h1>
      {Object.entries(productCounts).map(([id, count]) => (
        <div key={id} className="mb-2 p-2 border rounded bg-white shadow">
          <strong>Product ID:</strong> {id} <br />
          <strong>Total Ordered:</strong> {count}
        </div>
      ))}
    </div>
  );
}