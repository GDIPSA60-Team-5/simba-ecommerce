import { useState } from "react";
import axios from "axios";

import { useProducts } from "../../feature/book-list";


const API_URL = "api/products";

const ManageBooks = () => {
    const { products, loading, error } = useProducts();
    const [newProduct, setNewProduct] = useState({ name: "", price: 0 });

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            window.location.reload(); // Reload or re-fetch to update UI
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const handleCreate = async () => {
        try {
            await axios.post(API_URL, newProduct);
            setNewProduct({ name: "", price: 0 });
            window.location.reload();
        } catch (err) {
            console.error("Create failed", err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Books</h1>
            {/* Create Book */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Add New Book</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Book Name"
                        className="border p-2 rounded w-1/2"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        className="border p-2 rounded w-1/4"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    />
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create
                    </button>
                </div>
            </div>
            {/* Table */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="min-w-full bg-white border rounded shadow">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{p.id}</td>
                                <td className="py-2 px-4 border-b">{p.name}</td>
                                <td className="py-2 px-4 border-b">${p.price}</td>
                                <td className="py-2 px-4 border-b">
                                    {/* You can add Update logic with modal or inline editing */}
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    hi
                </table>
            )}
        </div>
    );
};

export default ManageBooks;
