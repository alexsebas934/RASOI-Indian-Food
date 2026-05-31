import { MenuItem, Review } from "./types";

export const getAbsoluteUrl = (url?: string): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  if (typeof window !== "undefined") {
    return `${window.location.origin}${cleanPath}`;
  }
  return cleanPath;
};

export const GENERATED_IMAGES = {
  // Combos
  comboOneClassics: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1200",
  comboTwoFeast: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1200",
  
  // Appetizers (Vegetarian)
  samosas: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=1200",
  alooTikki: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
  samosaChaat: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800",
  chiliPaneer: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
  springRolls: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800",
  hakkaNoodles: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800",
  gobiManchurian: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&q=80&w=1200",

  // Appetizers (Non-Vegetarian)
  chiliChicken: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=1200",
  tandooriChicken: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800",
  tikkaFries: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=800",

  // Biryanis
  goatBiryani: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
  chickenBiryani: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800",
  vegetableBiryani: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&q=80&w=800",

  // Vegetarian Main Entree
  alooGobi: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800",
  butterPaneer: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&q=80&w=800",
  malaiKofta: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800",
  matarPaneer: "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&q=80&w=800",
  mixedVeg: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
  shahiPaneer: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
  palakPaneer: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800",
  dalMakhni: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",

  // Non-Vegetarian Entree
  tikkaMasala: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1200",
  butterChicken: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=1200",
  goatCurry: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
  lambCurry: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
  chickenCurry: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",

  // Breads & Sides
  garlicNaan: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=1200",
  paratha: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
  roti: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800"
};

export const MENU_ITEMS: MenuItem[] = [
  // Combos
  {
    id: "combo2",
    name: "COMBO 2 (Butter Chicken & Tikka Masala Feast)",
    price: 16.99,
    description: "Indulge in rich, aromatic butter chicken paired with our savory roasted chicken tikka masala, accompanied by a full garlic naan and fluffy basmati rice. Voted #3 Most Liked!",
    category: "combos",
    image: GENERATED_IMAGES.comboTwoFeast,
    tags: ["#3 Most Liked", "DoorDash Favorite", "Best Value", "Huge Portions!"],
    spicy: true
  },
  {
    id: "combo1",
    name: "COMBO 1 (Choice of Culinary Classics)",
    price: 14.99,
    description: "Choose your perfect Indian favorites: flavorful Tikka Masala, butter chicken variations, vegan lentils, delicious lamb curry, or creamy coconut chicken. Comes complete with aromatic basmati rice.",
    category: "combos",
    image: GENERATED_IMAGES.comboOneClassics,
    tags: ["Customizable", "Highly Filling", "Value Star"],
    spicy: true
  },

  // Appetizers (Vegetarian & Non-Vegetarian)
  {
    id: "samosas",
    name: "Golden Samosas (2pcs)",
    price: 6.99,
    description: "A crispy, golden, triangle-shaped savory pastry stuffed with our exquisitely spiced mixture of potatoes, onions, and a rich, traditional blend of aromatic Indian spices. Voted the ultimate appetizer!",
    category: "appetizers",
    image: GENERATED_IMAGES.samosas,
    tags: ["19 reviews", "7 photos", "2 Pieces", "Crowd Favorite"],
    spicy: true
  },
  {
    id: "aloo_tikki",
    name: "Aloo Tikki (2pcs)",
    price: 10.99,
    description: "Popular, delicious, exceptionally crisp, and highly flavorful North Indian street food style potato patties infused with roasted ginger, green chilis, and spice herbs.",
    category: "appetizers",
    image: GENERATED_IMAGES.alooTikki,
    tags: ["2 Pieces", "Street Food Star", "Vegetarian", "Crispy & Hot"],
    spicy: true
  },
  {
    id: "samosa_chaat",
    name: "Samosa Chaat",
    price: 9.99,
    description: "Crispy chopped samosas piled beautifully and served fresh with warm chickpea curry, sweetened yogurt dollops, tangy tamarind, mint-coriander chaat chutneys, and fine sev.",
    category: "appetizers",
    image: GENERATED_IMAGES.samosaChaat,
    tags: ["Tangy Delight", "Sweet & Spicy", "Aesthetic Star"],
    spicy: true
  },
  {
    id: "chili_paneer",
    name: "Chili Paneer",
    price: 12.99,
    description: "Delectable cubes of fresh, soft tandoori cottage cheese (paneer) wok-tossed with sweet bell peppers, red onions, garlic, and a spicy, salty, tangy, and mildly sweet Indo-Chinese sauce.",
    category: "appetizers",
    image: GENERATED_IMAGES.chiliPaneer,
    tags: ["Spicy Paneer", "Indo-Chinese Fusion"],
    spicy: true
  },
  {
    id: "spring_roll",
    name: "Vegetable Spring Roll (4pcs)",
    price: 4.99,
    description: "Four pieces of crispy, light golden fried spring rolls stuffed with seasoned shredded cabbage, sweet carrots, and baby corn vegetables. Perfect for a quick bite!",
    category: "appetizers",
    image: GENERATED_IMAGES.springRolls,
    tags: ["4 Pieces", "Light Star", "Vegan-Friendly", "Super Crispy"]
  },
  {
    id: "hakka_noodles",
    name: "Wok Hakka Noodles",
    price: 13.99,
    description: "Savory stir-fried noodles tossed beautifully in high flames with garlic oil, crisp cabbage juliennes, scallions, bell peppers, carrots, and rich soy sauce seasoning.",
    category: "appetizers",
    image: GENERATED_IMAGES.hakkaNoodles,
    tags: ["1 photo", "Indo-Chinese", "Wok Stir-fried"]
  },
  {
    id: "gobi_manchurian",
    name: "Gobi Manchurian",
    price: 11.99,
    description: "Exquisite crispy fried cauliflower florets tossed in a rich, sweet, mildly tangy, and slightly spicy sauce made with authentic chili glaze, vinegar, fresh ginger, and minced garlic.",
    category: "appetizers",
    image: GENERATED_IMAGES.gobiManchurian,
    tags: ["Vegetarian Specialty", "Tangy Cauliflower", "Highly Liked"],
    spicy: true
  },
  {
    id: "chili_chicken",
    name: "Chili Chicken",
    price: 12.99,
    description: "Juicy chicken bites coated in a thick, spiced batter and fried until crispy, then tossed with peppers and scallions in a garlicky chili luscious Indo-Chinese gravy.",
    category: "appetizers",
    image: GENERATED_IMAGES.chiliChicken,
    tags: ["1 review", "Crowd Favorite", "Garlicky Hot"],
    spicy: true
  },
  {
    id: "tandoori_chicken",
    name: "Spiced Tandoori Chicken",
    price: 12.99,
    description: "Tender chicken legs and breasts marinated overnight in spiced yogurt, fresh mint, lemon juice, and red tandoori seasoning, then clay-roasted to absolute perfection in our traditional tandoor.",
    category: "appetizers",
    image: GENERATED_IMAGES.tandooriChicken,
    tags: ["4 reviews", "2 photos", "Clay Oven Specialty", "Smoky Bliss"],
    spicy: true
  },
  {
    id: "chicken_tikka_fries",
    name: "Chicken Tikka Fries",
    price: 13.99,
    description: "A fun and delicious modern favorite: premium golden fries topped, layered, and mixed with succulent boneless pieces of clay-roasted chicken marinated in spiced yogurt and drizzled with tikka sauce.",
    category: "appetizers",
    image: GENERATED_IMAGES.tikkaFries,
    tags: ["1 review", "1 photo", "Ultimate Comfort Food", "Sami's Fusion Star"],
    spicy: true
  },

  // Main Entrees (Vegetarian)
  {
    id: "aloo_gobi",
    name: "Aloo Gobi",
    price: 12.99,
    description: "A classic semi-dry North Indian curry made with fresh potatoes (aloo) and cauliflower (gobi) florets, sauteed with whole spices, tomatoes, fresh cumin, coriander, and turmeric.",
    category: "entrees",
    image: GENERATED_IMAGES.alooGobi,
    tags: ["1 photo", "Vegetarian Comfort", "Cumin Aromatic"],
    spicy: true
  },
  {
    id: "butter_paneer",
    name: "Butter Paneer Masala",
    price: 12.99,
    description: "A rich, creamy, and mildly spicy curry made with fresh melt-in-the-mouth paneer cheese cubes cooked in butter, whole spices, roasted onions, vine-ripened tomatoes, and cashews.",
    category: "entrees",
    image: GENERATED_IMAGES.butterPaneer,
    tags: ["3 reviews", "2 photos", "Cashew Tomato Rich Base", "Deluxe Vegetarian"],
    spicy: true
  },
  {
    id: "malai_kofta",
    name: "Creamy Malai Kofta",
    price: 12.99,
    description: "A truly decadent vegetarian dish consisting of delicious crispy paneer and potato dumplings (koftas) stuffed with dry fruits, gently simmered in an ultra-luxurious creamy sweet gold gravy.",
    category: "entrees",
    image: GENERATED_IMAGES.malaiKofta,
    tags: ["1 review", "1 photo", "Sweet & Rich", "Chef Special Dumpling"],
    spicy: true
  },
  {
    id: "matar_paneer",
    name: "Matar Paneer",
    price: 12.99,
    description: "Spiced North Indian curry dish made with sweet fresh green peas (matar) and soft paneer cubes in a flavorful cooked tomato-based gravy seasoned with warm garam masala.",
    category: "entrees",
    image: GENERATED_IMAGES.matarPaneer,
    tags: ["Peas & Cheese", "Classic Curry Comfort", "Perfect with Naan"],
    spicy: true
  },
  {
    id: "mixed_vegetable",
    name: "Spiced Mixed Vegetable",
    price: 12.99,
    description: "An incredibly healthy and colorful mix of seasonal vegetables (cauliflower, green beans, peas, carrots, and potatoes) stir-fried, lightly seasoned, and cooked in a simple curry sauce.",
    category: "entrees",
    image: GENERATED_IMAGES.mixedVeg,
    tags: ["Light & Healthy", "100% Vegan Option", "Fresh Produce"]
  },
  {
    id: "shahi_paneer",
    name: "Shahi Paneer",
    price: 12.99,
    description: "A royal and rich Mughlai dish made with paneer cubes enriched with a smooth, sweet, and mild gravy cooked with curd (yogurt), saffron, cardamoms, and almond-cashew paste.",
    category: "entrees",
    image: GENERATED_IMAGES.shahiPaneer,
    tags: ["1 review", "Royal Mughlai Cookery", "Mild & Nutty Sweet"]
  },
  {
    id: "palak_paneer",
    name: "Palak Paneer",
    price: 12.99,
    description: "Freshly blanched thick spinach (palak) puree slow-simmered with garlic, cumin, and mild spices, finished with soft cubes of paneer cottage cheese and a hint of fresh dairy cream.",
    category: "entrees",
    image: GENERATED_IMAGES.palakPaneer,
    tags: ["Iron Rich Spinach", "Healthy & Savory", "Authentic Punjab Style"],
    spicy: true
  },
  {
    id: "dal_makhni",
    name: "Slow-Cooked Dal Makhni",
    price: 11.99,
    description: "Rich, creamy, and incredibly complex black lentils (urad dal) and red kidney beans (rajma) slow-cooked overnight with ginger, tomatoes, and home-churned white butter.",
    category: "entrees",
    image: GENERATED_IMAGES.dalMakhni,
    tags: ["Black Lentils", "24hr Slow Roast", "Butter-Rich"],
    spicy: true
  },

  // Main Entrees (Non-Vegetarian)
  {
    id: "ctm",
    name: "Chicken Tikka Masala",
    price: 13.99,
    description: "A classic curried masterpiece consisting of charcoal clay-roasted boneless chicken tikka pieces cooked in our legendary, smoky-rich, creamy, and heavily spiced tomato-onion masala sauce.",
    category: "entrees",
    image: GENERATED_IMAGES.tikkaMasala,
    tags: ["14 reviews", "16 photos", "Global Favorite", "Comes with Rice"],
    spicy: true
  },
  {
    id: "butter_chicken",
    name: "Award-Winning Butter Chicken",
    price: 13.99,
    description: "Mouth-watering, tender roasted chicken pieces gently cooked in an incredibly smooth, buttery, savory, sweet tomato cream sauce. Decadently flavorful and highly loved!",
    category: "entrees",
    image: GENERATED_IMAGES.butterChicken,
    tags: ["50 reviews", "24 photos", "#1 Best Seller", "Comes with Rice"],
    spicy: true
  },
  {
    id: "goat_curry",
    name: "Traditional Kashmiri Goat Curry",
    price: 17.99,
    description: "A delicious, deeply aromatic bone-in baby goat meat curry slow-cooked with fresh ginger-garlic, whole cloves, dried kashmiri red chilies, cumin, and onion paste to a meltingly tender finish.",
    category: "entrees",
    image: GENERATED_IMAGES.goatCurry,
    tags: ["7 reviews", "4 photos", "Juicy Bone-in Goat", "Rich & Complex"],
    spicy: true
  },
  {
    id: "lamb_curry",
    name: "Slow-Cooked Lamb Curry",
    price: 17.99,
    description: "Decadently tender hand-trimmed boneless lamb chunks slowly cooked in a rich, traditional cardamom-scented gravy with caramelized onions and yogurt spices.",
    category: "entrees",
    image: GENERATED_IMAGES.lambCurry,
    tags: ["6 reviews", "4 photos", "Boneless Tender Lamb", "Velvety Red Sauce"],
    spicy: true
  },
  {
    id: "chicken_curry",
    name: "Slow-Simmered Chicken Curry",
    price: 13.99,
    description: "Slowly simmered bone-in or boneless tender spring chicken in a traditional home-style curry sauce flavored with yogurt, ripe tomatoes, red onions, garlic, and fresh grated ginger.",
    category: "entrees",
    image: GENERATED_IMAGES.chickenCurry,
    tags: ["4 reviews", "5 photos", "Home-style Recipe", "Healthy & Spicy"],
    spicy: true
  },

  // Biryanis (Main Entrees Category as well!)
  {
    id: "goat_biryani",
    name: "Royal Goat Biryani",
    price: 18.99,
    description: "A grand rice masterpiece packed with aromatic keshri saffron, multi-layered basmati rice, mint, browned onions, and incredibly juicy, spiced bone-in goat locks. Served with cool Raita.",
    category: "entrees",
    image: GENERATED_IMAGES.goatBiryani,
    tags: ["Luxury Saffron", "Bone-in Baby Goat", "Traditional Dum Biryani"],
    spicy: true
  },
  {
    id: "chicken_biryani",
    name: "Classic Chicken Biryani",
    price: 16.99,
    description: "Packed with hand-ground spices, caramelized red onions, layered premium long-grain Basmati rice, and super juicy boneless marinated chicken breast pieces. Cooked slow 'dum' style.",
    category: "entrees",
    image: GENERATED_IMAGES.chickenBiryani,
    tags: ["1 review", "2 photos", "Crowd Champion", "Basmati rice blend"],
    spicy: true
  },
  {
    id: "vegetable_biryani",
    name: "Deccan Garden Vegetable Biryani",
    price: 14.99,
    description: "A highly fragrant vegetarian classic using basmati rice cooked gently with whole bay-leaves, clove-cardamom spices, fresh paneer chunks, garden peas, carrots, cauliflower, and rose-water.",
    category: "entrees",
    image: GENERATED_IMAGES.vegetableBiryani,
    tags: ["Garden Fresh", "Rose Water Scented", "Gluten Free Veggie Meal"],
    spicy: true
  },

  // Breads & Sides
  {
    id: "naan",
    name: "Fresh Tandoori Naan (Plain or Garlic)",
    price: 2.99,
    description: "Single-layer flatbread baked fresh against our clay oven's super hot walls, featuring a beautifully light, tender, and slightly fluffy texture. Dusted with sesame or fresh chopped garlic and heavy butter.",
    category: "sides",
    image: GENERATED_IMAGES.garlicNaan,
    tags: ["56 reviews", "30 photos", "Butter / Garlic Brush", "Tandoor Baked-to-order"]
  },
  {
    id: "paratha",
    name: "Spiced Mixed Paratha (Aloo or Gobi)",
    price: 5.99,
    description: "Flatbread made from whole wheat (atta) dough stuffed perfectly with high seasoned potato mixture (aloo) or grated spicy cauliflower cauliflower (gobi) blend, shallow fried with ghee.",
    category: "sides",
    image: GENERATED_IMAGES.paratha,
    tags: ["Aloo or Gobi Stuffed", "Wheat Flatbread", "Golden Layered"]
  },
  {
    id: "roti",
    name: "Healthy Tawa Roti",
    price: 1.25,
    description: "The lightest everyday flatbread made using simple, nutritious stoneground whole wheat flour cooked on a hot iron skillet (tawa) on dynamic open flames with no extra fat.",
    category: "sides",
    image: GENERATED_IMAGES.roti,
    tags: ["100% Atta Wheat", "Iron Griddle Flatbread", "Super Low Fat"]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Susan M",
    rating: 5,
    date: "9/6/2025",
    text: "Every item my family and I have had has been amazing! Mind blowing! The CHILI CHICKEN WINGS (10pcs) is straight up the best food I've ever had, and their Gobi Manchurian is also so amazing! I tried it for the first time along with the Chicken Tikka Pizza and I was amazed. Every single item I've tried here has been amazing, and the service is always a 13/10. I recommend trying new things here because it's always going to blow your mind. Even if you don't know what to try, the chicken tikka masala and the hotter chicken are fresh and hot, and the portions are HUGE!",
    avatarLetter: "S",
    reviewCount: 5
  },
  {
    id: "r2",
    author: "Meta F",
    rating: 5,
    date: "12/14/2024",
    text: "Excellent staff and food! Wonderful people. The Chicken Tikka Masala is always on point. Super tender and flavorful. Also, their Naan (Plain or Garlic) is really authentic and delicious. Perfect to dip in the masala sauce.",
    avatarLetter: "M",
    reviewCount: 37
  },
  {
    id: "r3",
    author: "Jessica S",
    rating: 5,
    date: "6/12/2025",
    text: "I moved from LA to Riverside and there are really no Indian restaurants. I decided to give this place a try and its pretty good! I got the Butter Chicken and Garlic Naan. The butter chicken was spicy in a seasoning way (not chili hot) with juicy chicken pieces. FYI your order already comes with rice so no need to buy extra unless you want to. If you're nervous just give this place a try!",
    avatarLetter: "J",
    reviewCount: 1
  },
  {
    id: "r4",
    author: "Wendy A",
    rating: 5,
    date: "2/16/2025",
    text: "This is our new favorite place to eat on Sundays. We usually go to the restaurant but today we door dashed and the flavor, quality and warmth of the food did not disappoint. Butter chicken, Tikka Masala and coconut curry chicken have all been absolutely delicious! If youre new to Indian food go with the butter chicken. I cant imagine anyone not loving it. The employees (I believe it's family owned) are kind, generous and welcoming. Thank you for bringing outstanding, authentic food made with love to Menifee.",
    avatarLetter: "W",
    reviewCount: 1
  },
  {
    id: "r5",
    author: "Graham S",
    rating: 5,
    date: "12/11/2024",
    text: "Always delicious, always high quality, always so filling! When you go into the store- they treat you like family!",
    avatarLetter: "G",
    reviewCount: 1
  }
];
