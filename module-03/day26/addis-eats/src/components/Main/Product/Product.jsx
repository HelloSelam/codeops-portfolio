import React from 'react'
import './Product.css'
import Dish from './Dish'

const dishes = [
  { id: 1, name: "Doro Wat", price: 350 },
  { id: 2, name: "Shiro", price: 180 },
  { id: 3, name: "Kitfo", price: 450 },
  { id: 4, name: "Tibs", price: 400 },
];

function Product() {
  return (
    <div className='menu'>
      <h2>Menu</h2>
    
      <div className="dish-list">
        {dishes.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
          />
        ))}
      </div>
    </div>
  )
}

export default Product
