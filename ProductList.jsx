
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  // Track which items have been added to disable/change button state
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/57/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2018/02/23/21/02/peace-lily-3176657_1280.jpg",
          description: "Removes toxins and blooms beautiful white flowers.",
          cost: "$18"
        },
        {
          name: "Boston Fern",
          image: "https://cdn.pixabay.com/photo/2020/07/01/15/22/fern-5360010_1280.jpg",
          description: "Adds humidity to indoor spaces and purifies air.",
          cost: "$14"
        },
        {
          name: "Rubber Plant",
          image: "https://cdn.pixabay.com/photo/2020/04/18/10/37/rubber-plant-5058778_1280.jpg",
          description: "Easy to grow and excellent at removing toxins.",
          cost: "$20"
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/09/15/21/aloe-vera-3304481_1280.jpg",
          description: "Healing properties and great for indoor air.",
          cost: "$10"
        }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://cdn.pixabay.com/photo/2016/04/19/21/11/lavender-1339675_1280.jpg",
          description: "Calming scent, used in aromatherapy.",
          cost: "$16"
        },
        {
          name: "Jasmine",
          image: "https://cdn.pixabay.com/photo/2017/03/24/19/18/jasmine-2172260_1280.jpg",
          description: "Sweet fragrance that blooms during evenings.",
          cost: "$22"
        },
        {
          name: "Rosemary",
          image: "https://cdn.pixabay.com/photo/2016/09/28/19/33/rosemary-1701351_1280.jpg",
          description: "Aromatic herb with a woodsy scent.",
          cost: "$10"
        },
        {
          name: "Mint",
          image: "https://cdn.pixabay.com/photo/2016/08/21/20/00/mint-1610667_1280.jpg",
          description: "Refreshing aroma and great for teas.",
          cost: "$8"
        },
        {
          name: "Lemon Balm",
          image: "https://cdn.pixabay.com/photo/2019/07/19/19/30/lemon-balm-4349282_1280.jpg",
          description: "Citrus scent that relieves stress.",
          cost: "$12"
        },
        {
          name: "Eucalyptus",
          image: "https://cdn.pixabay.com/photo/2020/04/30/19/54/eucalyptus-5113886_1280.jpg",
          description: "Refreshing menthol-like fragrance.",
          cost: "$25"
        }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div className="product-list-container">
      <div className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <span>Catalog</span>
          <span className="cart-badge">Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</span>
        </div>
      </div>

      <div className="product-grid-section">
        {plantsArray.map((categoryObj, index) => (
          <div key={index} className="category-section">
            <h2>{categoryObj.category}</h2>
            <div className="plant-list">
              {categoryObj.plants.map((plant, plantIndex) => (
                <div key={plantIndex} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="plant-image" />
                  <h3>{plant.name}</h3>
                  <p className="plant-desc">{plant.description}</p>
                  <p className="plant-price">{plant.cost}</p>
                  <button
                    className={`add-to-cart-btn ${addedToCart[plant.name] ? 'added' : ''}`}
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
