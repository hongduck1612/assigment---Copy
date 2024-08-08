import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    coupon: null,
    discount: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find((item) => item._id === action.payload.item._id);
            if (existingItem) {
                existingItem.quantity = Number(existingItem.quantity) + Number(action.payload.quantity);
                existingItem.option = action.payload.option;
                existingItem.additionalPrice = action.payload.additionalPrice;
                existingItem.price += action.payload.additionalPrice;
            } else {
                state.items.push({
                    ...action.payload.item,
                    quantity: action.payload.quantity,
                    option: action.payload.option,
                    additionalPrice: action.payload.additionalPrice,
                    price: action.payload.item.price + action.payload.additionalPrice,
                });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
        updateCartItemQuantity: (state, action) => {
            const item = state.items.find((item) => item._id === action.payload._id);
            if (item) {
                item.quantity = action.payload.quantity;
                item.price = (item.basePrice + item.additionalPrice) * item.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        applyCoupon: (state, action) => {
            const { coupon, discountAmount } = action.payload;
            state.coupon = coupon;
            state.discount = discountAmount;
        },
        resetCoupon: (state) => {
            state.coupon = null;
            state.discount = 0;
        }
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart, applyCoupon, resetCoupon } = cartSlice.actions;

export default cartSlice;
