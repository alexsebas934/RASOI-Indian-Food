import React, { useState } from "react";
import { MenuItem, SpiceLevel } from "./types";
import { MENU_ITEMS, REVIEWS } from "./data";
import TasteConcierge from "./components/TasteConcierge";
import InteractiveMenu from "./components/InteractiveMenu";
import ReservationSection from "./components/ReservationSection";
import { 
  Sparkle, 
  Star, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Phone, 
  Clock, 
  UtensilsCrossed, 
  User, 
  MessageSquareCode, 
  Compass, 
  CalendarCheck,
  Flame,
  Globe
} from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [activeCategory, setActiveCategory] = useState<"all" | "combos" | "entrees" | "appetizers" | "sides">("all");

  // Smooth scroll handler
  const scrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black text-gray-100 font-sans selection:bg-gold-500 selection:text-luxury-black">
      
      {/* Dynamic Overlay Floating Booking Tab */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => scrollTo("booking-section")}
          className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-luxury-black text-xs font-black uppercase tracking-widest rounded-full shadow-[0_4px_25px_rgba(188,130,32,0.4)] transition-all duration-300 cursor-pointer"
        >
          <CalendarCheck className="w-4.5 h-4.5" />
          <span>Table Bookings</span>
        </button>
      </div>

      {/* Luxury Navigation Header */}
      <header className="sticky top-0 z-40 bg-luxury-black/90 backdrop-blur-md border-b border-gold-850/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Meta Ratings */}
          <div className="flex items-center gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-left cursor-pointer">
              <span className="font-heading text-2.5xl lg:text-3xl font-extrabold tracking-wide text-gold-300 select-none">
                RASOI
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-gold-500 font-bold -mt-1">
                Authentic Indian Cuisine
              </span>
            </button>
            <div className="hidden lg:flex items-center gap-1 bg-gold-850/20 border border-gold-700/20 px-2.5 py-1 rounded-full text-[10px] text-gold-300 font-semibold font-sans">
              <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
              <span>4.9 (431 Reviews in Menifee, CA)</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <button onClick={() => scrollTo("culinary-menu")} className="hover:text-gold-400 cursor-pointer transition">
              Our Menu
            </button>
            <button onClick={() => { scrollTo("culinary-menu"); setActiveCategory("combos"); }} className="hover:text-gold-400 cursor-pointer transition text-gold-300">
              Featured Combos
            </button>
            <button onClick={() => scrollTo("concierge-section")} className="hover:text-gold-300 cursor-pointer transition flex items-center gap-1 text-gold-400">
              <Sparkle className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
              Taste Concierge
            </button>
            <button onClick={() => scrollTo("booking-section")} className="hover:text-gold-400 cursor-pointer transition">
              Bookings
            </button>
            <button onClick={() => scrollTo("testimonials-section")} className="hover:text-gold-400 cursor-pointer transition">
              Guest Reviews
            </button>
          </nav>

          {/* User Interaction & Cart triggers */}
          <div className="flex items-center gap-3">
            <a 
              href="tel:9514492165" 
              className="hidden lg:flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-sans font-bold border border-gold-850/30 px-3.5 py-2 rounded-xl transition duration-300"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(951) 449-2165</span>
            </a>

            <a
              href="https://www.yelp.com/biz/rasoi-indian-food-menifee-2?osq=Restaurant+rasoi"
              target="_blank"
              rel="noreferrer"
              className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 text-luxury-black font-extrabold text-xs uppercase tracking-widest hover:from-gold-500 hover:to-gold-300 shadow-md hover:shadow-lg transition-all duration-300 select-none flex items-center gap-2 border border-gold-400"
            >
              <ShoppingBag className="w-4 h-4 fill-luxury-black" />
              <span>Order on DoorDash</span>
            </a>
          </div>

        </div>
      </header>

      {/* Dynamic Menu Panel Sub-Section */}
      <section className="pt-16 pb-20 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block">Curated Cuisine</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-gold-100 tracking-wide">
            Explore Tandoori Masterworks
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Click on any aromatic curry, hand-stretched naan flatbread, crispy appetizer, or family combo to view our menu highlights and order directly on our Doordash page.
          </p>
        </div>

        <InteractiveMenu
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[580px] lg:h-[680px] flex items-center py-16 bg-luxury-black overflow-hidden border-b border-gold-850/20">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/90 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-luxury-black to-transparent z-10" />
          
          {/* Loaded direct high-end Butter Chicken Image */}
          <img
            src="/src/assets/images/hero_butter_chicken_1779589199615.png"
            alt="Rasoi Signature Butter Chicken background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 lg:opacity-45 scale-105"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          <div className="lg:col-span-8 space-y-6">
            
            {/* Social Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-luxury-sand border border-gold-850/40 px-4.5 py-2 rounded-2xl shadow-xl">
              <div className="flex text-gold-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <span className="text-xs text-gray-300 font-sans tracking-tight">
                <strong>4.9 Stars</strong> rating by 431 guests on Google
              </span>
            </div>

            {/* Premium Typography heading */}
            <div className="space-y-4">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide text-gold-50/95 leading-[1.1] max-w-4xl">
                Breathtaking <span className="font-serif italic text-gold-300">Aromas</span>, <br />
                Fascinating <span className="font-serif italic text-gold-300">Flavors</span>.
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans max-w-xl">
                The beloved family-owned dining space of Menifee, CA. Fresh, hand-ground masalas and authentic tandoor-charcoal oven ovens filled with warmth, love, and Sami’s signature service.
              </p>
            </div>

            {/* Primary conversion triggers */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <a
                href="https://www.yelp.com/biz/rasoi-indian-food-menifee-2?osq=Restaurant+rasoi"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4.5 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-luxury-black text-xs font-black uppercase tracking-widest rounded-xl hover:shadow-[0_4px_30px_rgba(188,130,32,0.35)] duration-300 text-center cursor-pointer select-none flex items-center justify-center"
              >
                Order Now on DoorDash
              </a>
              <button
                onClick={() => scrollTo("booking-section")}
                className="px-8 py-4.5 bg-luxury-sand hover:bg-luxury-black border border-gold-500/20 hover:border-gold-500 rounded-xl text-xs font-extrabold uppercase tracking-widest text-gold-300 duration-300 text-center cursor-pointer select-none"
              >
                Book a Premium Table
              </button>
              <button
                onClick={() => scrollTo("concierge-section")}
                className="px-6 py-4.5 bg-gold-500/10 hover:bg-gold-500/15 border border-gold-500/30 rounded-xl text-xs font-bold uppercase tracking-widest text-gold-200 duration-300 text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkle className="w-4 h-4 text-gold-500 animate-pulse" />
                Sami’s Taste Concierge
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400 pt-6">
              <span className="flex items-center gap-1.5"><UtensilsCrossed className="w-4 h-4 text-gold-500" /> Dine-in & Bar</span>
              <span className="flex items-center gap-1.5"><ShoppingBag className="w-4 h-4 text-gold-500" /> Curbside Pick up</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gold-500" /> 27738 Encanto Dr, Menifee</span>
            </div>

          </div>

          {/* Quick info panel desktop */}
          <div className="hidden lg:block lg:col-span-4 p-8 bg-luxury-sand/40 border border-gold-850/30 rounded-2xl relative gold-glow">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 mb-1 block">Live Today</span>
            <h3 className="font-heading text-xl text-gold-100 font-bold mb-4">Rasoi Operational Hours</h3>
            <div className="space-y-3.5 text-xs text-gray-300 font-sans">
              <div className="flex justify-between items-center py-1 border-b border-gold-850/10">
                <span>Saturday - Sunday</span>
                <span className="font-bold text-gold-300">11:30 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gold-850/10">
                <span>Monday - Friday</span>
                <span className="font-bold text-gold-300">11:30 AM - 9:30 PM</span>
              </div>
              <div className="flex items-center gap-1.5 text-green-400 bg-green-950/20 border border-green-900/40 p-2.5 rounded-lg mt-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Oven is running hot: Open Closes at 10 p.m.</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gold-850/25 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-850/30 flex items-center justify-center text-gold-400 shrink-0">
                <UtensilsCrossed className="w-4-5 h-4-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase text-gray-500 tracking-wider block">Average cost</span>
                <span className="text-xs font-bold text-gray-300">$10 - 20 per person</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Scroll Highlight (Atmospheric Review Highlight) */}
      <section id="testimonials-section" className="py-16 bg-luxury-black/45 border-b border-gold-850/10 text-center relative">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <div className="flex justify-center">
            <span className="p-2.5 rounded-full bg-gold-850/10 border border-gold-500/25 text-gold-500">
              <Sparkle className="w-6 h-6 text-gold-400" />
            </span>
          </div>
          
          <blockquote className="space-y-4">
            <p className="font-heading text-2xl sm:text-3xl lg:text-4xl text-gold-100 leading-snug italic font-extralight">
              "When you arrive the smell of their meals takes your breath away, <br className="hidden lg:block"/>
              their flavors are fascinating and magical. It is an environment full of love and peace."
            </p>
            <cite className="block text-xs uppercase tracking-widest text-gold-500 font-extrabold not-italic font-sans">
              — Aura Silvera, Trusted Local Guide
            </cite>
          </blockquote>
          
          <div className="flex justify-center gap-1 text-gold-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Combos & Masterpieces Highlight Section */}
      <section id="featured-combos" className="py-20 bg-luxury-sand/20 border-t border-b border-gold-850/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative h-[440px] rounded-2xl overflow-hidden shadow-2xl gold-glow border border-gold-850/30">
            <img 
              src="/src/assets/images/hero_butter_chicken_1779589199615.png" 
              alt="Rasoi Indian Feast Butter Chicken and Garlic Naan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Stamp */}
            <div className="absolute top-6 left-6 bg-luxury-black/90 px-4 py-2 border border-gold-500/40 rounded-xl">
              <span className="font-heading text-gold-300 text-lg">DoorDash Rated 4.5+</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block">Feast Together</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-gold-100 tracking-wide font-light leading-tight">
              Indulge in Family-Sized Premium Combos
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Our signature <strong className="text-gold-300">COMBO 2</strong> merges juicy, slow-cooked butter chicken with our superstar roasted chicken tikka masala, served with rice and a freshly baked, giant garlic naan. Huge portions prepared fresh with hand-charcoal clay-oven baking!
            </p>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              We also feature <strong className="text-gold-300">COMBO 1</strong> allowing you to customize your favorites—from vegan lentils to aromatic lamb curries. No complex configurations: just honest, delicious, and incredibly filling food made with love and served like family.
            </p>

            <button
              onClick={() => {
                scrollTo("culinary-menu");
                setActiveCategory("combos");
              }}
              className="px-6 py-3.5 bg-luxury-black hover:bg-gold-500 text-gold-300 hover:text-luxury-black border border-gold-850/45 hover:border-transparent rounded-xl text-xs font-bold uppercase tracking-widest transition duration-300 flex items-center gap-2 cursor-pointer group"
            >
              <UtensilsCrossed className="w-4 h-4 text-gold-400 group-hover:text-luxury-black" />
              <span>Explore Family Combos</span>
            </button>
          </div>

        </div>
      </section>

      {/* Sami’s Smart AI Taste Concierge Experience Sub-Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold flex items-center justify-center gap-1.5">
            <Sparkle className="w-4 h-4 text-gold-500 animate-pulse" /> Interactive AI Dining Concierge
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl text-gold-100 font-light">
            Consult Host Sami
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Need custom guidance tailored around peanut allergies, gluten limitations, kid-friendly spice thresholds, or cocktail pairings? Chat live with our server-side intelligent assistant.
          </p>
        </div>

        <TasteConcierge />
      </section>

      {/* Luxury Table Reservations Section */}
      <section className="py-20 bg-luxury-sand/10 border-t border-b border-gold-850/15">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block">Secured Seating</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-gold-100 font-light">
              Secure Elegant Table Reservations
            </h2>
            <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
              Plan your wonderful evening out with family and experience our love and peace firsthand. Sami coordinates all bookings with deep warmth.
            </p>
          </div>

          <ReservationSection />
        </div>
      </section>

      {/* Interactive Guest Testimonials Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block">Honest Love Diaries</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-gold-100 font-light">
            The Word on the Streets of Menifee
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-luxury-sand/35 border border-gold-850/20 rounded-2xl flex flex-col justify-between space-y-6 gold-glow shadow-md hover:border-gold-500/30 transition duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-850/25 border border-gold-600/30 font-bold text-gold-300 text-sm flex items-center justify-center font-sans">
                      {rev.avatarLetter}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-200">{rev.author}</h4>
                      <span className="text-[10px] text-gray-500 font-sans block">{rev.reviewCount} local reviews</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500">{rev.date}</span>
                </div>

                <div className="flex text-gold-400 gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                <p className="text-sm text-gray-300 italic leading-relaxed font-sans">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-gold-850/15 flex items-center gap-2 text-[11px] text-gold-400 font-semibold font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span>Verified 4.9 Restaurant Guest</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Royal Location Contacts & Fine-Footer */}
      <footer className="bg-luxury-black border-t border-gold-850/30 pt-16 pb-12 font-sans">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Info */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="font-heading text-3xl font-extrabold tracking-wide text-gold-300">
              RASOI
            </h3>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Savor traditional culinary secrets and modern drinks made lovingly right here in Menifee, California. Family-owned, family-run, and focused on exceptional guest care.
            </p>
            <div className="space-y-2 text-xs text-gray-300">
              <span className="block font-bold">🎯 Address:</span>
              <a 
                href="https://maps.google.com/?q=27738+Encanto+Dr,+Menifee,+CA+92586"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold-400 transition underline flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5 text-gold-500" />
                27738 Encanto Dr, Menifee, CA 92586
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-extrabold text-gold-400 tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-bold">
              <li><button onClick={() => scrollTo("culinary-menu")} className="hover:text-gold-400 transition">Interactive Food Menu</button></li>
              <li><button onClick={() => { scrollTo("culinary-menu"); setActiveCategory("combos"); }} className="hover:text-gold-400 transition">Featured Family Combos</button></li>
              <li><button onClick={() => scrollTo("concierge-section")} className="hover:text-gold-400 transition">AI Flavour Concierge</button></li>
              <li><button onClick={() => scrollTo("booking-section")} className="hover:text-gold-400 transition">Secured Table Reservation</button></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-extrabold text-gold-400 tracking-widest">Touch Bases Directly</h4>
            <p className="text-xs text-gray-400 leading-normal">
              Need immediate help organizing an upscale private catering, hosting a birthday party, or modifying an urgent tandoor order?
            </p>
            <div className="space-y-3 pt-2">
              <a
                href="tel:9514492165"
                className="flex items-center gap-2 p-3 bg-gold-850/15 border border-gold-500/25 rounded-xl hover:bg-gold-500 hover:text-luxury-black text-gold-300 transition duration-300 font-extrabold text-sm justify-center"
              >
                <Phone className="w-4 h-4" />
                <span>Call (951) 449-2165</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 text-xs text-gray-300 justify-center hover:text-gold-400"
              >
                <Globe className="w-4 h-4 text-gold-500" />
                <span>Follow us on Instagram</span>
              </a>
            </div>
          </div>

        </div>

        {/* copyright disclaimer */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gold-850/20 text-center text-[11px] text-gray-500 space-y-2">
          <p>© 2026 Rasoi Indian Food. Cooled in Menifee, California. All Rights Reserved. Sami and Team.</p>
          <div className="flex justify-center gap-4 text-gray-600 font-semibold uppercase tracking-widest text-[9px]">
            <span>Authentic Spices</span>
            <span>•</span>
            <span>Premium Catering</span>
            <span>•</span>
            <span>Bakehouse Tandoor</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
