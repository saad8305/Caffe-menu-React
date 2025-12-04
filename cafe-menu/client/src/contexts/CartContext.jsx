import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
      };
    case 'CLEAR_CART':
      return { items: [] };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    default:
      return state;
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], orders: [] }, () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      const parsed = saved ? JSON.parse(saved) : { items: [], orders: [] };
      return { ...parsed, orders: parsed.orders || [] };
    }
    return { items: [], orders: [] };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state]);
  const addToCart = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const addOrder = (order) => dispatch({ type: 'ADD_ORDER', payload: order });
  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, clearCart, addOrder }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};