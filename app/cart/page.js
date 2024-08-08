'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity, applyCoupon, resetCoupon } from '../../redux/slices/cartslice';
import { useMemo } from 'react';

const coupons = {
    '123456': 1000000,
    '1234567': 2000000,
    '12345678': 3000000,
    '123456789': 4000000,
    'toanku': 5000000,
    'toanku1': 6000000,
    'toanku2': 7000000,
    'toanku3': 8000000
};

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart?.items) || [];
    const discount = useSelector((state) => state.cart?.discount) || 0;
    const dispatch = useDispatch();
    const [couponCode, setCouponCode] = useState('');

    const total = useMemo(() => cartItems.reduce((total, item) => total + (item.basePrice + item.additionalPrice) * item.quantity, 0), [cartItems]);

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (coupons[couponCode]) {
            dispatch(applyCoupon({ coupon: couponCode, discountAmount: coupons[couponCode] }));
        } else {
            dispatch(resetCoupon());
            alert('Invalid coupon code');
        }
    };

    return (
        <>
            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__product">Tên Sản Phẩm</th>
                                            <th>Giá</th>
                                            <th>Số Lượng</th>
                                            <th>Tổng</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item._id}>
                                                <td className="shoping__cart__item">
                                                    <h5>{item.name}</h5>
                                                    {item.option && <p>Option: {item.option}</p>}
                                                </td>
                                                <td className="shoping__cart__price">
                                                    {(item.basePrice + item.additionalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </td>
                                                <td className="shoping__cart__quantity">
                                                    <div className="quantity">
                                                        <div className="pro-qty">
                                                            <input
                                                                min="1"
                                                                type="number"
                                                                value={item.quantity}
                                                                onChange={(e) => dispatch(updateCartItemQuantity({ _id: item._id, quantity: parseInt(e.target.value) }))}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="shoping__cart__total">
                                                    {((item.basePrice + item.additionalPrice) * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </td>
                                                <td className="shoping__cart__item__close">
                                                    <button className="btn btn-danger" onClick={() => dispatch(removeFromCart(item._id))}>Xóa</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="shoping__continue">
                                <div className="shoping__discount">
                                    <h5>Mã giảm giá</h5>
                                    <form onSubmit={handleApplyCoupon}>
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="Nhập mã giảm giá"
                                        />
                                        <button type="submit" className="site-btn">Áp dụng</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="shoping__checkout">
                                <h5>Giỏ hàng</h5>
                                <ul>
                                    <li>Tổng tiền hàng <span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></li>
                                    {discount > 0 && <li>Giảm giá <span>-{discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></li>}
                                    <li>Tổng tiền thanh toán <span>{(total - discount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></li>
                                </ul>
                                <button className="primary-btn">THANH TOÁN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartPage;
