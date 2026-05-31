import React, { useState, useRef, useEffect } from "react";
import { Message, SpiceLevel } from "../types";
import { Sparkles, Send, Sparkle, Bot, User, Phone, Check, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TasteConciergeProps {
  onAddSpecialItem?: (itemId: string, spiceLevel?: SpiceLevel) => void;
}

export default function TasteConcierge({ onAddSpecialItem }: TasteConciergeProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Namaste, my friend! I am Sami, your host at Rasoi. The moment you open our doors here in Menifee, the magical aroma of fresh cardamom, sizzling ghee, and hot garlic tandoori naan fills the air. It is my greatest joy to guide your palate. Tell me, are you seeking something mild, creamy, and comfortable, or perhaps a fierce, adventurous heat? Do you have any allergies or dietary wishes?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedHeat, setSelectedHeat] = useState<string>("");
  const [dietRestriction, setDietRestriction] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: "🥘 Describe your best Butter Chicken pairing", text: "What is your absolute favorite way to pair and serve your Butter Chicken and Garlic Naan?" },
    { label: "🌶️ Help me brave the extra spicy curries!", text: "I love intense spicy food! Tell me about your Lamb Rogan Josh and how spicy you can make it." },
    { label: "🌾 Recommend safe Gluten-Free options", text: "I have a gluten sensitivity. Which appetizers, signature curries and sides should I order?" },
    { label: "🥟 Tell me about the Golden Combos & Sides", text: "What is included in COMBO 2 and why is it our most loved option?" }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      // Package payload to send to Express API route /api/concierge
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          userPreferences: {
            heat: selectedHeat,
            diet: dietRestriction,
            mood: "luxurious dining seeker"
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact server");
      }

      const data = await response.json();
      
      const machineMsg: Message = {
        id: `gem-${Date.now()}`,
        role: "model",
        text: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, machineMsg]);
    } catch (e) {
      console.error(e);
      // Fallback response for graceful recovery
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "model",
          text: "Forgive me, my dear friend. The rich fumes in my kitchen are briefly clouding our internet connection. However, please know that you can always experience our warm hospitality and order directly by calling me at (951) 449-2165. For immediate dining, my highest recommendation is our golden Butter Garlic Naan aligned with our rich, creamy slow-simmered Butter Chicken!",
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(inputText);
    }
  };

  return (
    <div id="concierge-section" className="bg-luxury-sand border border-gold-850/40 rounded-2xl overflow-hidden shadow-2xl gold-glow grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
      
      {/* Sidebar Preference Controls */}
      <div className="lg:col-span-4 p-6 bg-luxury-black/60 border-b lg:border-b-0 lg:border-r border-gold-850/40 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="p-2 rounded-lg bg-gold-850/30 text-gold-500 border border-gold-600/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            <h4 className="font-heading text-2xl tracking-wide text-gold-100">AI Taste Concierge</h4>
          </div>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Let Sami's digital assistant decode your cravings. Customize your preferences below to fine-tune our recipes around you before chatting.
          </p>

          {/* Preferred Spice Selector */}
          <div className="mb-5">
            <label className="block text-xs uppercase tracking-widest text-gold-400 font-semibold mb-2">Preferred Heat Level</label>
            <div className="grid grid-cols-2 gap-2">
              {["Gentle & Mild", "Warm Medium", "True Indian Hot", "Sami's Desi Heat"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedHeat(selectedHeat === lvl ? "" : lvl)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-300 text-left ${
                    selectedHeat === lvl
                      ? "bg-gold-500/20 text-gold-200 border-gold-500"
                      : "bg-luxury-black/30 text-gray-400 border-gold-850/30 hover:border-gold-850/70 hover:text-gray-200"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedHeat === lvl ? "bg-gold-500 animate-pulse" : "bg-gray-600"}`} />
                    {lvl}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Dietary restriction */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-gold-400 font-semibold mb-2">Dietary Alignments</label>
            <div className="grid grid-cols-2 gap-2">
              {["Gluten Free", "Vegan Friendly", "Halal Compliant", "Dairy Sensitivity"].map((diet) => (
                <button
                  key={diet}
                  onClick={() => setDietRestriction(dietRestriction === diet ? "" : diet)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-300 text-left ${
                    dietRestriction === diet
                      ? "bg-gold-500/20 text-gold-200 border-gold-500"
                      : "bg-luxury-black/30 text-gray-400 border-gold-850/30 hover:border-gold-850/70 hover:text-gray-200"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {dietRestriction === diet ? (
                      <Check className="w-3 h-3 text-gold-500" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                    )}
                    {diet}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sami's Promise Note */}
        <div className="p-4 bg-gold-850/10 rounded-xl border border-gold-850/20 mt-4">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-gold-300 uppercase tracking-wider">
            <Sparkle className="w-3.5 h-3.5 text-gold-500" />
            <span>Sami’s Culinary Oath</span>
          </div>
          <p className="text-xs text-gray-400 italic leading-relaxed">
            "Every dish we bring is structured with custom-ground whole spices and cooked lovingly as if for my own children. Your joy is our soul."
          </p>
          <div className="mt-3 flex items-center gap-1.5 font-heading text-xs text-gold-200">
            <span>📞 Call us anytime: </span>
            <a href="tel:9514492165" className="underline hover:text-gold-400 font-sans font-bold">(951) 449-2165</a>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-8 flex flex-col justify-between max-h-[640px]">
        {/* Chat Messages */}
        <div className="p-6 overflow-y-auto flex-1 h-[420px] bg-luxury-black/30 flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 max-w-[85%] ${
                msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-gold-850/30 border-gold-500 text-gold-300"
                    : "bg-luxury-sand border-gold-850 text-gold-500"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4 text-gold-400" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400 font-semibold font-sans">
                    {msg.role === "user" ? "You (Guest)" : "Sami — Host"}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gold-800/20 border border-gold-850/40 text-gray-200 rounded-tr-none"
                      : "bg-luxury-sand/80 border border-gold-850/30 text-gray-300 rounded-tl-none font-sans"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="self-start flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-luxury-sand border border-gold-850 flex items-center justify-center animate-spin">
                <RefreshCw className="w-4 h-4 text-gold-400" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-semibold mb-1">Sami is crafting a response...</div>
                <div className="bg-luxury-sand/40 border border-gold-850/20 p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1.5 py-1">
                    <span className="w-2 h-2 rounded-full bg-gold-500 animate-bounce delay-100" />
                    <span className="w-2 h-2 rounded-full bg-gold-500 animate-bounce delay-200" />
                    <span className="w-2 h-2 rounded-full bg-gold-500 animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        {messages.length === 1 && (
          <div className="px-6 py-2 bg-luxury-black/40 border-t border-gold-850/20">
            <span className="text-[11px] uppercase tracking-widest text-gold-400 font-bold block mb-2">
              ✨ Prompt Sami directly about our Menifee secrets:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((p) => (
                <button
                  key={p.label}
                  onClick={() => handleSendMessage(p.text)}
                  className="px-3 py-1.5 text-xs text-left text-gray-300 bg-luxury-sand border border-gold-850/30 hover:border-gold-500/50 hover:bg-gold-500/5 rounded-full transition-all duration-300 cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-4 bg-luxury-black/60 border-t border-gold-850/40 flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={
              selectedHeat || dietRestriction
                ? `Ask Sami a question with your customized constraints configured...`
                : "Ask Sami about flavors, ingredients, levels of spice, or bar drinks..."
            }
            className="flex-1 px-5 py-3 h-12 text-sm bg-luxury-sand text-gray-100 border border-gold-850/40 focus:border-gold-500 rounded-xl focus:outline-none transition-all placeholder:text-gray-500 shadow-inner"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || loading}
            className="h-12 w-12 flex items-center justify-center bg-gradient-to-r from-gold-600 to-gold-400 text-luxury-black rounded-xl hover:shadow-lg disabled:opacity-40 hover:from-gold-500 hover:to-gold-300 cursor-pointer duration-300 shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}
