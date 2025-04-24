export default function ClientCartCheckedOut() {
    return (
      <div className="p-10 text-center">
        <h1 className="text-5xl text-purple-600 mb-4">✔️</h1>
        <h2 className="text-xl font-bold mb-2">Items purchased!</h2>
        <p>Thanks for shopping Flutter Box.</p>
        <a href="/catalogue" className="text-purple-500 mt-4 block">
          Back to products
        </a>
      </div>
    );
  }
  