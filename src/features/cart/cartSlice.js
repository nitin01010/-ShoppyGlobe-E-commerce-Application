import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: [],
    productsInCart: []
  },
  reducers: {
    setProducts: (state, action) => {
      state.value.push(...action.payload);
    },
    addToCart: (state, action) => {
      const existing = state.productsInCart.find(
        item => item.id === action.payload.id
      );

      if (existing) {
        // bump the stored qty, or start at 2 if it wasn't tracked yet
        existing.qty = (existing.qty || 1) + 1;
      } else {
        // first time we see this id → save it with qty = 1
        state.productsInCart.push({ ...action.payload, qty: 1 });
      }
    },
    incrementQty: (state, action) => {
      const { id, qty } = action.payload;     // payload: { id, qty }
      const product = state.productsInCart.find(p => p.id === id);
      if (product) {
        product.qty = qty;                    // overwrite with the new value
      }
    },
    changeQty: (state, action) => {
      const { id, qty } = action.payload;
      const index = state.productsInCart.findIndex(p => p.id === id);
      if (index !== -1) {
        if (qty <= 0) {
          // 👋 remove the product entirely
          state.productsInCart.splice(index, 1);
        } else {
          // 📝 just update its quantity
          state.productsInCart[index].qty = qty;
        }
      }
    },
  }
})

export const { setProducts, addToCart, removeFromCart, incrementQty, changeQty } = cartSlice.actions

export default cartSlice.reducer