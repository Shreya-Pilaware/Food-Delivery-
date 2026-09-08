export const CATEGORIES = [
  { id: 'all', name: 'All Dishes', icon: 'Utensils', badge: '16+' },
  { id: 'pizza', name: 'Artisan Pizzas', icon: 'Pizza', badge: 'Hot' },
  { id: 'burger', name: 'Gourmet Burgers', icon: 'Beef', badge: 'Popular' },
  { id: 'asian', name: 'Asian & Bowls', icon: 'Soup', badge: 'Fresh' },
  { id: 'salads', name: 'Healthy Salads', icon: 'Salad', badge: 'Fit' },
  { id: 'tacos', name: 'Tacos & Wraps', icon: 'Sandwich', badge: 'Tasty' },
  { id: 'desserts', name: 'Sweet Desserts', icon: 'Cake', badge: 'Sweet' },
  { id: 'drinks', name: 'Craft Beverages', icon: 'Coffee', badge: 'Cold' },
];

export const INITIAL_FOOD_ITEMS = [
  {
    id: 'food-1',
    name: 'Truffle Mushroom Gourmet Burger',
    category: 'burger',
    price: 14.99,
    rating: 4.9,
    reviewCount: 184,
    prepTime: '20-25 min',
    calories: '680 kcal',
    isVeg: false,
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    description: 'Black Angus beef patty topped with sautéed wild mushrooms, creamy black truffle aioli, Swiss cheese, and arugula on a toasted brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    tags: ['Best Seller', 'Chef Special'],
    customizations: [
      {
        name: 'Choose Cheese',
        required: true,
        options: [
          { name: 'Aged Swiss Cheese', price: 0 },
          { name: 'Smoked Gouda', price: 1.00 },
          { name: 'Sharp Cheddar', price: 0 }
        ]
      },
      {
        name: 'Extra Add-ons',
        required: false,
        options: [
          { name: 'Crispy Bacon', price: 2.50 },
          { name: 'Extra Truffle Aioli', price: 1.25 },
          { name: 'Caramelized Onions', price: 0.99 }
        ]
      }
    ],
    reviews: [
      { id: 'r1', user: 'Alex M.', rating: 5, comment: 'Hands down the best burger in town! The truffle flavor is heavenly.', date: '2 days ago' },
      { id: 'r2', user: 'Sophia K.', rating: 5, comment: 'Juicy patty, warm fresh brioche bun. 10/10 recommendation!', date: '1 week ago' }
    ]
  },
  {
    id: 'food-2',
    name: 'Neapolitan Margherita Pizza',
    category: 'pizza',
    price: 16.50,
    rating: 4.8,
    reviewCount: 240,
    prepTime: '15-20 min',
    calories: '750 kcal',
    isVeg: true,
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    description: 'Authentic wood-fired Neapolitan sourdough crust topped with San Marzano tomato sauce, fresh Fior di Latte mozzarella, basil leaves, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    tags: ['Wood-Fired', 'Vegetarian'],
    customizations: [
      {
        name: 'Crust Style',
        required: true,
        options: [
          { name: 'Classic Neapolitan Sourdough', price: 0 },
          { name: 'Gluten-Free Crust', price: 3.00 },
          { name: 'Garlic Butter Stuffed Crust', price: 2.50 }
        ]
      },
      {
        name: 'Extra Toppings',
        required: false,
        options: [
          { name: 'Extra Buffalo Mozzarella', price: 2.99 },
          { name: 'Roasted Garlic Clouder', price: 1.50 },
          { name: 'Chili Honey Drizzle', price: 1.00 }
        ]
      }
    ],
    reviews: [
      { id: 'r3', user: 'David R.', rating: 5, comment: 'Perfect crispy yet chewy crust. Simplicity done right.', date: 'Yesterday' }
    ]
  },
  {
    id: 'food-3',
    name: 'Tonkotsu Pork Ramen Bowl',
    category: 'asian',
    price: 15.99,
    rating: 4.9,
    reviewCount: 156,
    prepTime: '15-25 min',
    calories: '620 kcal',
    isVeg: false,
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    description: 'Rich 12-hour simmered pork bone broth, hand-crafted ramen noodles, tender chashu pork belly, soft-boiled ajitsuke egg, wood ear mushrooms, and nori seaweed.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    tags: ['Comfort Food', 'Top Pick'],
    customizations: [
      {
        name: 'Spice Level',
        required: true,
        options: [
          { name: 'Mild Original Broth', price: 0 },
          { name: 'Spicy Garlic Oil (Medium)', price: 0.50 },
          { name: 'Fire Chili Oil (Hot!)', price: 1.00 }
        ]
      },
      {
        name: 'Extras',
        required: false,
        options: [
          { name: 'Extra Chashu Slice', price: 3.00 },
          { name: 'Extra Seasoned Egg', price: 1.50 },
          { name: 'Extra Bamboo Shoots', price: 1.00 }
        ]
      }
    ],
    reviews: [
      { id: 'r4', user: 'Kenji T.', rating: 5, comment: 'Authentic flavor, rich savory broth. Piping hot on delivery!', date: '3 days ago' }
    ]
  },
  {
    id: 'food-4',
    name: 'Fresh Salmon & Avocado Poke Bowl',
    category: 'asian',
    price: 16.99,
    rating: 4.8,
    reviewCount: 112,
    prepTime: '12-15 min',
    calories: '480 kcal',
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    description: 'Sustainably sourced sushi-grade Norwegian salmon cubes, hass avocado, edamame, cucumber ribbon, pickled ginger, mango chunks, and sesame soy sauce over sushi rice.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    tags: ['Healthy', 'Gluten-Free'],
    customizations: [
      {
        name: 'Base Selection',
        required: true,
        options: [
          { name: 'Seasoned Sushi Rice', price: 0 },
          { name: 'Brown Organic Rice', price: 0.50 },
          { name: 'Mixed Salad Greens', price: 0 }
        ]
      }
    ],
    reviews: [
      { id: 'r5', user: 'Elena V.', rating: 5, comment: 'So fresh and light! The salmon melts in your mouth.', date: '4 days ago' }
    ]
  },
  {
    id: 'food-5',
    name: 'Smokey Bacon & Cheddar Burger',
    category: 'burger',
    price: 15.49,
    rating: 4.7,
    reviewCount: 198,
    prepTime: '20 min',
    calories: '820 kcal',
    isVeg: false,
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    description: 'Double smash patty, thick smoked bacon strips, melted sharp cheddar, crispy fried onion rings, and house hickory BBQ glaze.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    tags: ['Double Smash', 'BBQ Lover'],
    customizations: [
      {
        name: 'Patty Count',
        required: true,
        options: [
          { name: 'Double Smash Patty', price: 0 },
          { name: 'Triple Smash (+ $3.50)', price: 3.50 }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'food-6',
    name: 'Four Cheese Quattro Formaggi Pizza',
    category: 'pizza',
    price: 17.99,
    rating: 4.8,
    reviewCount: 94,
    prepTime: '18 min',
    calories: '890 kcal',
    isVeg: true,
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    description: 'Rich white pizza loaded with Creamy Mozzarella, Gorgonzola Dolce, Aged Parmesan, and Fresh Ricotta drizzled with rosemary truffle oil.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    tags: ['Cheesy', 'Vegetarian'],
    customizations: [],
    reviews: []
  },
  {
    id: 'food-7',
    name: 'Slow-Cooked Birria Beef Tacos (3 pcs)',
    category: 'tacos',
    price: 13.99,
    rating: 4.9,
    reviewCount: 310,
    prepTime: '15 min',
    calories: '640 kcal',
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    description: 'Three crispy corn tortilla tacos stuffed with melted Oaxaca cheese, 8-hour braised shredded beef birria, cilantro, onions, served with a rich side broth for dipping.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    tags: ['Trending', 'Gluten-Free'],
    customizations: [
      {
        name: 'Extra Consomé Broth',
        required: false,
        options: [
          { name: 'Extra Dipping Consomé Bowl', price: 2.00 }
        ]
      }
    ],
    reviews: [
      { id: 'r6', user: 'Carlos M.', rating: 5, comment: 'The broth dipping is unbelievable! Pure flavor explosion.', date: '5 days ago' }
    ]
  },
  {
    id: 'food-8',
    name: 'Crispy Falafel & Roasted Garlic Hummus Wrap',
    category: 'tacos',
    price: 11.49,
    rating: 4.6,
    reviewCount: 82,
    prepTime: '12 min',
    calories: '430 kcal',
    isVeg: true,
    isVegan: true,
    isGlutenFree: false,
    isPopular: false,
    description: 'Golden herb-crusted chickpea falafels, house garlic hummus, pickled red onions, cucumber salad, and tahini drizzle rolled inside warm pita bread.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    tags: ['100% Vegan', 'Fiber Rich'],
    customizations: [],
    reviews: []
  },
  {
    id: 'food-9',
    name: 'Mediterranean Quinoa & Feta Bowl',
    category: 'salads',
    price: 12.99,
    rating: 4.7,
    reviewCount: 75,
    prepTime: '10 min',
    calories: '360 kcal',
    isVeg: true,
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    description: 'Organic fluffy quinoa, English cucumber, cherry tomatoes, Kalamata olives, crumbled Greek feta, toasted pine nuts, and lemon herb vinaigrette.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    tags: ['Superfood', 'Vegetarian'],
    customizations: [],
    reviews: []
  },
  {
    id: 'food-10',
    name: 'Grilled Herb Chicken Caesar Salad',
    category: 'salads',
    price: 13.49,
    rating: 4.6,
    reviewCount: 128,
    prepTime: '12 min',
    calories: '490 kcal',
    isVeg: false,
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    description: 'Crisp Romaine lettuce hearts tossed with garlic sourdough croutons, shaved Parmigiano-Reggiano, tender lemon-thyme chicken breast, and classic anchovy Caesar dressing.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['High Protein', 'Classic'],
    customizations: [],
    reviews: []
  },
  {
    id: 'food-11',
    name: 'Warm Belgian Chocolate Lava Cake',
    category: 'desserts',
    price: 8.49,
    rating: 4.9,
    reviewCount: 260,
    prepTime: '10 min',
    calories: '440 kcal',
    isVeg: true,
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    description: 'Rich dark Belgian chocolate sponge cake with a molten oozing center, served with a scoop of Madagascar vanilla bean gelato and fresh raspberries.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    tags: ['Decadent', 'Must Try'],
    customizations: [
      {
        name: 'Gelato Flavor',
        required: true,
        options: [
          { name: 'Vanilla Bean Gelato', price: 0 },
          { name: 'Salted Caramel Gelato', price: 1.00 },
          { name: 'No Ice Cream', price: 0 }
        ]
      }
    ],
    reviews: [
      { id: 'r7', user: 'Samantha B.', rating: 5, comment: 'Warm, gooey chocolate center. Absolutely irresistible!', date: '3 days ago' }
    ]
  },
  {
    id: 'food-12',
    name: 'New York Baked Strawberry Cheesecake',
    category: 'desserts',
    price: 8.99,
    rating: 4.8,
    reviewCount: 145,
    prepTime: '5 min',
    calories: '510 kcal',
    isVeg: true,
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    description: 'Classic creamy graham cracker crust cheesecake topped with vibrant house-made wild strawberry reduction and fresh mint.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    tags: ['Classic NY', 'Sweet'],
    customizations: [],
    reviews: []
  },
  {
    id: 'food-13',
    name: 'Salted Caramel Cold Brew Coffee',
    category: 'drinks',
    price: 5.49,
    rating: 4.7,
    reviewCount: 104,
    prepTime: '5 min',
    calories: '180 kcal',
    isVeg: true,
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    description: 'Slow-steeped Arabica cold brew coffee layered with buttery salted caramel syrup, oat milk, and topped with dense caramel cold foam.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    tags: ['Craft Coffee', 'Refreshing'],
    customizations: [
      {
        name: 'Milk Choice',
        required: true,
        options: [
          { name: 'Oat Milk', price: 0 },
          { name: 'Almond Milk', price: 0 },
          { name: 'Whole Dairy Milk', price: 0 }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'food-14',
    name: 'Fresh Passionfruit & Mint Sparkler',
    category: 'drinks',
    price: 4.99,
    rating: 4.8,
    reviewCount: 118,
    prepTime: '5 min',
    calories: '120 kcal',
    isVeg: true,
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    description: 'Crushed passionfruit pulp, fresh lime juice, muddled mint leaves, and sparkling mineral water over ice.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    tags: ['Zero Mocktail', 'Vegan'],
    customizations: [],
    reviews: []
  },
  {
    id: 'food-15',
    name: 'Spicy Pepperoni & Hot Honey Pizza',
    category: 'pizza',
    price: 17.49,
    rating: 4.9,
    reviewCount: 220,
    prepTime: '18 min',
    calories: '830 kcal',
    isVeg: false,
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    description: 'Crispy cup-and-char pepperoni slices, pickled jalapeños, mozzarella, plum tomato sauce, and hot habanero honey drizzle.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    tags: ['Sweet & Spicy', 'Best Seller'],
    customizations: [],
    reviews: []
  },
  {
    id: 'food-16',
    name: 'Pad Thai Noodles with King Prawns',
    category: 'asian',
    price: 16.49,
    rating: 4.8,
    reviewCount: 142,
    prepTime: '18 min',
    calories: '590 kcal',
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    description: 'Stir-fried flat rice noodles with jumbo king prawns, egg, bean sprouts, crushed peanuts, tamarind glaze, and fresh lime wedge.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
    tags: ['Thai Classic', 'Gluten-Free'],
    customizations: [],
    reviews: []
  }
];

export const PROMO_COUPONS = {
  'WELCOME10': { discountPercent: 10, minSpend: 15, label: '10% OFF on order over $15' },
  'YUMMY20': { discountPercent: 20, minSpend: 25, label: '20% OFF on order over $25' },
  'FREEDELIVERY': { fixedDiscount: 2.99, minSpend: 20, label: 'Free Delivery ($2.99 OFF)' }
};

export const INITIAL_ORDERS = [
  {
    id: 'ORD-9821',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'Delivered',
    customerName: 'Shreya',
    customerPhone: '+1 (555) 234-5678',
    deliveryAddress: '742 Evergreen Terrace, Apt 4B, Springfield',
    paymentMethod: 'Credit Card (**** 4242)',
    items: [
      { id: 'food-1', name: 'Truffle Mushroom Gourmet Burger', price: 14.99, quantity: 2, selectedOptions: ['Aged Swiss Cheese', 'Crispy Bacon'] },
      { id: 'food-13', name: 'Salted Caramel Cold Brew Coffee', price: 5.49, quantity: 2, selectedOptions: ['Oat Milk'] }
    ],
    subtotal: 40.96,
    discount: 8.19,
    tax: 2.62,
    deliveryFee: 0,
    total: 35.39,
    timeline: [
      { status: 'Order Placed', time: '2 hours ago', completed: true },
      { status: 'Preparing', time: '1 hr 45 min ago', completed: true },
      { status: 'Out for Delivery', time: '1 hr 20 min ago', completed: true },
      { status: 'Delivered', time: '1 hour ago', completed: true }
    ]
  }
];
