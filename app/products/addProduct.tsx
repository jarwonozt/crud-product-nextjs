'use client';

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleSumit(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price,
            })
        });

        setIsMutating(false);
        setTitle("");
        setPrice("");
        router.refresh();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn" onClick={handleChange}>Add Now</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form onSubmit={handleSumit}>
                        <div className="form-control">
                            <label htmlFor="Title" className="label font-bold">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="Title" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="Price" className="label font-bold">Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input w-full input-bordered" placeholder="Price" />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>Close</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Save</button>
                            ) : (
                                <button type="button" className="btn loading">Saving ...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}