import React from 'react';
import MenuItem from './MenuItem';

export default function MenuCategory({ title, icon, items, onAddToCart }) {
  return (
    <div className="menu-category">
      <div className="category-title">
        {icon} {title}
      </div>
      {items.map((item) => (
        <MenuItem
          key={item.id}
          name={item.name}
          desc={item.desc}
          price={item.price}
          image={item.image}
          itemData={item}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}