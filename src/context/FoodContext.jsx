import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_FOOD_ITEMS, CATEGORIES } from '../data/mockData';

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foodItems, setFoodItems] = useState(() => {
    const saved = localStorage.getItem('flavorcraft_food_items');
    return saved ? JSON.parse(saved) : INITIAL_FOOD_ITEMS;
  });

  useEffect(() => {
    localStorage.setItem('flavorcraft_food_items', JSON.stringify(foodItems));
  }, [foodItems]);

  const addFoodItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: `food-${Date.now()}`,
      rating: newItem.rating || 5.0,
      reviewCount: 1,
      reviews: [],
      isPopular: newItem.isPopular || false
    };
    setFoodItems((prev) => [itemWithId, ...prev]);
  };

  const editFoodItem = (id, updatedFields) => {
    setFoodItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteFoodItem = (id) => {
    setFoodItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleStock = (id) => {
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, outOfStock: !item.outOfStock } : item
      )
    );
  };

  const addReview = (foodId, reviewObj) => {
    setFoodItems((prev) =>
      prev.map((item) => {
        if (item.id === foodId) {
          const newReviews = [reviewObj, ...(item.reviews || [])];
          const newCount = newReviews.length;
          const avgRating = (
            newReviews.reduce((sum, r) => sum + r.rating, 0) / newCount
          ).toFixed(1);
          return {
            ...item,
            rating: parseFloat(avgRating),
            reviewCount: newCount,
            reviews: newReviews
          };
        }
        return item;
      })
    );
  };

  return (
    <FoodContext.Provider
      value={{
        foodItems,
        categories: CATEGORIES,
        addFoodItem,
        editFoodItem,
        deleteFoodItem,
        toggleStock,
        addReview
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
