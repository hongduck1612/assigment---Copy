'use client';
import { useState, useEffect } from 'react';
import ProductCard from '../component/ProductCard';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('asc');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch('http://localhost:3000/products');
            const newProducts = await res.json();
            setProducts(newProducts);
        }
        fetchProducts();
    }, []);

    const handleSort = (products) => {
        return [...products].sort((a, b) => {
            if (sortOption === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    }

    const filterProducts = (products) => {
        if (!filter) return products;
        return products.filter(product => product.categoryId === filter);
    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    }

    const handleSortAndFilter = (products) => {
        const filteredProducts = filterProducts(products);
        return handleSort(filteredProducts);
    }

    return (
        <div className="container my-3">
            <div>
                <div className="d-flex justify-content-between mx-1">
                    <div className="p-1 w-auto">
                        <h5 className="text-success">DANH SÁCH SẢN PHẨM</h5>
                    </div>
                    <select className="form-select w-auto" onChange={handleSortChange}>
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                    <select className="form-select w-auto" onChange={handleFilterChange}>
                        <option value="">Tất cả</option>
                        <option value="66758da7cb0dded448a58ba7">MSI</option>
                        <option value="66758e26cb0dded448a58ba8">ACER</option>
                    </select>
                </div>
                <div className="row">
                    <ProductCard data={handleSortAndFilter(products)} />
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}
