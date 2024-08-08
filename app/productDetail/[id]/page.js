'use client';
import { useSelector, useDispatch } from "react-redux";
import cartSlice, { addToCart, removeFromCart, updateCartItemQuantity, clearCart } from "../../../redux/slices/cartslice";
import { useState } from "react";
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function DetailPage({ params }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState('i5');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    console.log(cart);
    const { data: product, error, isLoading } = useSWR(`http://localhost:3000/productdetail/${params.id}`, fetcher, {
        refreshInterval: 6000,
    });

    if (error) return <div>Lỗi load dữ liệu.</div>;
    if (isLoading) return <div>Đang tải</div>;

    const getAdditionalPrice = (option) => {
        switch(option) {
            case 'i5':
                return 20000000;
            case 'i7':
                return 30000000;
            case 'i9':
                return 40000000;
            default:
                return 0;
        }
    };

    const handleAddToCart = () => {
        const additionalPrice = getAdditionalPrice(selectedOption);
        dispatch(addToCart({ item: { ...product, basePrice: product.price }, quantity: quantity, option: selectedOption, additionalPrice: additionalPrice }));
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-6 px-4">
                    <img className="img-fluid" src={`http://localhost:3000/img/${product.img}`} />
                </div>
                <div className="col-6">
                    <h3>Chi tiết sản phẩm</h3>
                    <h4>{product.name}</h4>
                    <p>Giá khởi điểm:</p>
                    <div className="form-group">
                        <label htmlFor="processorOptions">Chọn bộ vi xử lý:</label>
                        <select
                            className="form-control"
                            id="processorOptions"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            <option value="i5">i5 (+20,000,000 VND)</option>
                            <option value="i7">i7 (+30,000,000 VND)</option>
                            <option value="i9">i9 (+40,000,000 VND)</option>
                        </select>
                    </div>
                    <input
                        className="form-control w-25"
                        min="1"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button
                        className="btn btn-primary my-2"
                        onClick={handleAddToCart}
                    >
                        Thêm vào giỏ hàng
                    </button>
                    <h4>Mô tả: </h4>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    );
}
