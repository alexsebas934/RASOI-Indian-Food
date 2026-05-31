import React, { useState } from "react";
import { MENU_ITEMS, getAbsoluteUrl } from "../data";
import { MenuItem, SpiceLevel } from "../types";
import { Flame, Plus, Check, Star, CornerDownRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InteractiveMenuProps {
  activeCategory: "all" | "combos" | "entrees" | "appetizers" | "sides";
  setActiveCategory: (cat: "all" | "combos" | "entrees" | "appetizers" | "sides") => void;
}

export default function InteractiveMenu({
  activeCategory,
  setActiveCategory,
}: InteractiveMenuProps) {
  const [selectedSpices, setSelectedSpices] = useState<Record<string, SpiceLevel>>({});

  const categories = [
    { id: "all", label: "Full Aromatic Menu" },
    { id: "combos", label: "Featured Combos" },
    { id: "entrees", label: "Main Entrées" },
    { id: "appetizers", label: "Wings & Appetizers" },
    { id: "sides", label: "Breads & Rice" }
  ];

  const filteredItems = activeCategory === "all"
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleSpiceChange = (itemId: string, level: SpiceLevel) => {
    setSelectedSpices((prev) => ({ ...prev, [itemId]: level }));
  };

  return (
    <div id="culinary-menu" className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-gradient-to-r from-gold-600 to-gold-400 text-luxury-black border-gold-400 shadow-[0_4px_20px_rgba(188,130,32,0.25)]"
                : "bg-luxury-sand/80 text-gray-400 border-gold-850/30 hover:border-gold-500 hover:text-gold-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Dishes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => {
            const isSpicyCurry = item.spicy;
            const currentSpice = selectedSpices[item.id] || "Medium";

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group bg-luxury-sand/50 border border-gold-850/30 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gold-500/50 transition-all duration-300 shadow-xl relative gold-glow"
              >
                {/* Image & Price Overlay */}
                <div className="relative h-56 overflow-hidden bg-luxury-black/60">
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent z-10 opacity-70 group-hover:opacity-45 duration-300" />
                  <img
                    src={getAbsoluteUrl(item.image)}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Category Stamp */}
                  <span className="absolute top-4 left-4 bg-luxury-black/80 backdrop-blur-sm text-gold-400 text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-md border border-gold-700/30 z-20">
                    {item.category}
                  </span>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4 bg-luxury-charcoal border border-gold-500/40 px-3 py-1 rounded-xl z-20 shadow-lg">
                    <span className="font-heading text-lg font-bold text-gold-300">${item.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Card Content Description */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-heading text-xl text-gold-100 group-hover:text-gold-300 transition-colors duration-200 leading-tight mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-sans line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Tag Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-gray-400 bg-luxury-black/40 px-2 py-0.5 rounded-md border border-gold-850/20 font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Spice Customization Box for Curries */}
                  {isSpicyCurry && (
                    <div className="p-3 bg-luxury-black/40 rounded-xl border border-gold-850/25 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
                          Specify Spice Level
                        </span>
                        <span className="text-[10px] text-gray-500 italic">Curry standard</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {(["Mild", "Medium", "Hot", "Sami's Desi Heat"] as SpiceLevel[]).map((level) => (
                          <button
                            key={level}
                            onClick={() => handleSpiceChange(item.id, level)}
                            className={`py-1 text-[10px] font-semibold rounded transition-all cursor-pointer ${
                              currentSpice === level
                                ? "bg-gold-500/20 text-gold-300 border border-gold-500/45"
                                : "bg-luxury-sand text-gray-400 border border-transparent hover:border-gold-850/50 hover:text-gray-200"
                            }`}
                          >
                            {level === "Sami's Desi Heat" ? "Desi Hot!" : level}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action DoorDash Order Button */}
                  <a
                    href="https://www.yelp.com/biz/rasoi-indian-food-menifee-2?osq=Restaurant+rasoi"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 bg-luxury-black/70 hover:bg-gradient-to-r hover:from-gold-600 hover:to-gold-400 hover:text-luxury-black text-gold-200 border border-gold-850/50 hover:border-transparent cursor-pointer shadow-md text-center"
                  >
                    <span>Order on DoorDash</span>
                    <CornerDownRight className="w-3.5 h-3.5 text-gold-400 group-hover:text-luxury-black" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
