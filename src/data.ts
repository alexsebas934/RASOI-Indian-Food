import { MenuItem, Review } from "./types";

// Import our custom high-resolution generated culinary photos
export const GENERATED_IMAGES = {
  butterChicken: "/src/assets/images/hero_butter_chicken_1779589199615.png",
  cocktailBar: "/src/assets/images/luxury_cocktail_bar_1779589221880.png",
  samosas: "/src/assets/images/samosa_appetizer_1779589241717.png"
};

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: "s1",
    name: "Golden Tandoori Samosas",
    price: 10.00,
    description: "Flaky crisp pastry envelopes spiced organic potatoes, sweet green peas, crushed ginger, coriander, and royal garam masala spices. Accompanied by Sami's handcrafted sweet tamarind swirl and cool mint dips.",
    category: "starters",
    image: GENERATED_IMAGES.samosas,
    tags: ["Vegan Option", "House Favorite", "Artisanal Preparation"]
  },
  {
    id: "s2",
    name: "Tandoori Paneer Tikka Skewers",
    price: 14.00,
    description: "Cubes of firm milk cheese marinated overnight in sour yogurt, direct-ground cumin, roasted garlic, and freshly cut mint leaves. Pierced and roasted over high heat in our authentic tandoori brick oven.",
    category: "starters",
    image: "https://images.unsplash.com/photo-1567184109411-471744d0e3a9?auto=format&fit=crop&q=80&w=600",
    tags: ["Vegetarian", "Gluten Free"]
  },
  {
    id: "s3",
    name: "Crispy Amritsari Fish Pakoras",
    price: 15.00,
    description: "Tender locally-sourced white fish strips coated in a light, gluten-free, seasoned chickpea batter with crushed carom seeds and yellow turmeric, fried until perfectly gold and airy.",
    category: "starters",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
    tags: ["Gluten Free", "Crispy"]
  },

  // Curries
  {
    id: "c1",
    name: "Award-Winning Butter Chicken (Murgh Makhani)",
    price: 18.00,
    description: "Succulent free-rage chicken slow-rendered in a luxurious, velvety gravy of ripe organic tomatoes, pure clarified butter (ghee), toasted premium fenugreek leaves, and local cream. Possesses a fascinating, magical aroma.",
    category: "curries",
    image: GENERATED_IMAGES.butterChicken,
    tags: ["All-Time Best Seller", "Gluten Free", "Rich & Creamy"],
    spicy: true
  },
  {
    id: "c2",
    name: "Rasoi Signature Chicken Tikka Masala",
    price: 18.00,
    description: "Clay-oven roasted chicken breast chunks swimming in an intensely flavored, spiced onion-tomato ragu, toasted with dry ginger, red capsicums, and freshly powdered cumin seeds.",
    category: "curries",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600",
    tags: ["Top Guest Choice", "Gluten Free"],
    spicy: true
  },
  {
    id: "c3",
    name: "Slow-Braised Shahi Lamb Rogan Josh",
    price: 20.00,
    description: "Thick grass-fed lamb cutlets slow-braised for six hours in intense Kashmiri chili oils, caramelized red shallots, black cloves, soft cardamom pods, and a touch of yogurt.",
    category: "curries",
    image: "https://images.unsplash.com/photo-1547825407-2d060104b7f8?auto=format&fit=crop&q=80&w=600",
    tags: ["Gluten Free", "Deep Spice Flavor"],
    spicy: true
  },
  {
    id: "c4",
    name: "Tandoori Grilled Lamb Chops",
    price: 22.00,
    description: "Premium French-cut lamb ribs massaged with green papaya extract, mountain malt vinegar, nutmeg, and smoked garam masala. Roasted on direct handcharcoal.",
    category: "curries",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=600",
    tags: ["Chef Special", "Premium Cut"],
    spicy: true
  },

  // Breads & Sides
  {
    id: "b1",
    name: "Hand-Stretched Butter Garlic Naan",
    price: 5.00,
    description: "Traditional soft yeast-leavened flatbread slapped against the scorching clay walls of our tandoor, brushed with warm grass-fed ghee (clarified butter) and showered with minced garlic and fine herbs.",
    category: "breads",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600", // Glistening naan placeholder
    tags: ["Freshly Baked", "Voted Top Star"]
  },
  {
    id: "b2",
    name: "Saffron Royal Basmati Rice",
    price: 5.00,
    description: "Fluffy extra-long luxury aged basmati rice infused with premium Kashmiri saffron stigmas, roasted cloves, and whole green cardamom pods.",
    category: "breads",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    tags: ["Gluten Free", "Fragrant"]
  },
  {
    id: "b3",
    name: "Chana Masala (Spiced Chickpeas)",
    price: 14.50,
    description: "Soft tender garbanzo beans slow-simmered in a rustic, pungent onion and dried mango powder infusion, fresh green chilies, and hand-ground black salts.",
    category: "breads",
    image: "https://images.unsplash.com/photo-1585938338392-50a59970d2ee?auto=format&fit=crop&q=80&w=600",
    tags: ["Gluten Free", "Vegan", "Authentic"]
  },

  // Boutique Drinks
  {
    id: "dr1",
    name: "Saffron cardamon Lassi",
    price: 7.00,
    description: "Thick creamy Greek yogurt whipped gently with organic mango pulp, ground green cardamom seeds, fresh saffron infusion, and a touch of wild honey.",
    category: "bar",
    image: "https://images.unsplash.com/photo-1571006682855-397121631711?auto=format&fit=crop&q=80&w=600",
    tags: ["Creamy & Sweet", "Cooling"]
  },
  {
    id: "dr2",
    name: "Tasveer Cardamom Old Fashioned",
    price: 15.00,
    description: "Premium bourbon whiskey infused in house with roasted green cardamom pods, and a dash of sweet orange bitters. Stirred over a solid crystal clear hand-carved ice sphere. Experience our gorgeous bar!",
    category: "bar",
    image: GENERATED_IMAGES.cocktailBar,
    tags: ["Rasoi Bar Select", "Smokey & Spicy"]
  },
  {
    id: "dr3",
    name: "Himalayan Rose Gin & Tonic",
    price: 14.00,
    description: "Boutique floral dry gin, premium light tonic, splashed with edible rosewater extract, decorated with dried climbing rose petals and juniper berries, crisp and refreshing.",
    category: "bar",
    image: "https://images.unsplash.com/photo-1524350302444-030f1d187515?auto=format&fit=crop&q=80&w=600",
    tags: ["Boutique Craft", "Refreshing"]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Aura Silvera",
    rating: 5,
    date: "1 year ago",
    text: "When you arrive the smell of their meals takes your breath away, their flavors are fascinating and magical. It is an environment full of love and peace. Absolutely extraordinary customer care.",
    avatarLetter: "A",
    reviewCount: 11
  },
  {
    id: "r2",
    author: "Mauricio Acahua",
    rating: 5,
    date: "1 year ago",
    text: "Sami Number 1 in service to customers! Warm hospitality, incredibly delicious Indian dishes, fresh and perfectly spiced. Highly recommend local family enterprise.",
    avatarLetter: "M",
    reviewCount: 1
  },
  {
    id: "r3",
    author: "Teresa Cebrero",
    rating: 5,
    date: "1 year ago",
    text: "Excellent service and very tasty and fresh food. The Butter Chicken is exceptionally smooth and goes elegantly with the freshly baked tandoori hot Garlic Naan. High rating perfectly deserved!",
    avatarLetter: "T",
    reviewCount: 17
  }
];
