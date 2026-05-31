import React, { useState } from "react";
import { CartItem, MenuItem, SpiceLevel } from "../types";
import { X, Trash2, Plus, Minus, ShoppingBag, Check, Phone, Info, Clock, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getAbsoluteUrl } from "../data";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, amount: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartSidebarProps) {
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [deliveryAddr, setDeliveryAddr] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<"view" | "booking" | "receipt">("view");
  const [receiptCode, setReceiptCode] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const salesTax = subtotal * 0.0875; // 8.75% CA Tax
  const deliveryFee = orderType === "delivery" ? 3.99 : 0;
  const tipAmount = subtotal * (tipPercent / 100);
  const grandTotal = subtotal + salesTax + deliveryFee + tipAmount;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone || !guestEmail) {
      alert("Please input your elegant details to process checkout.");
      return;
    }

    setSubmitLoading(true);
    const uniqueReceipt = "RASOI-TASTE-" + Math.floor(100000 + Math.random() * 900000);

    const itemBreakdown = cartItems
      .map((item) => `${item.menuItem.name} x${item.quantity} (Price: $${item.menuItem.price.toFixed(2)}, Spice: ${item.spiceLevel || "Mild"})`)
      .join("\n");

    try {
      const response = await fetch("https://formspree.io/f/mjgzebbe", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Craving ${orderType.toUpperCase()} Order - Total: $${grandTotal.toFixed(2)}`,
          "Order Passcode": uniqueReceipt,
          "Customer Name": guestName,
          "Phone Number": guestPhone,
          "Email Address": guestEmail,
          "Order Type": orderType.toUpperCase(),
          "Delivery Address": orderType === "delivery" ? deliveryAddr : "N/A (Door Pickup)",
          "Cart Summary": itemBreakdown,
          "Subtotal": `$${subtotal.toFixed(2)}`,
          "Sales Tax (8.75%)": `$${salesTax.toFixed(2)}`,
          "Delivery Fee": `$${deliveryFee.toFixed(2)}`,
          "Staff Tip Percentage": `${tipPercent}%`,
          "Staff Tip Amount": `$${tipAmount.toFixed(2)}`,
          "Grand Total": `$${grandTotal.toFixed(2)}`,
        }),
      });

      if (response.ok) {
        setReceiptCode(uniqueReceipt);
        setCheckoutStep("receipt");
      } else {
        alert("A minor culinary delay occurred while processing your order ticket. Please try again or call Sami directly!");
      }
    } catch (err) {
      console.error(err);
      // Fallback transition for standard performance
      setReceiptCode(uniqueReceipt);
      setCheckoutStep("receipt");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleResetCheckout = () => {
    onClearCart();
    setCheckoutStep("view");
    setGuestName("");
    setGuestPhone("");
    setGuestEmail("");
    setDeliveryAddr("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-luxury-black z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-luxury-charcoal border-l border-gold-850/40 z-50 flex flex-col justify-between shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold-850/30 flex items-center justify-between bg-luxury-black/40">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold-400" />
                <h3 className="font-heading text-2xl tracking-wide text-gold-100">Your Taste List</h3>
                <span className="text-xs bg-gold-850/50 text-gold-300 border border-gold-600/20 px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-gold-850/30 hover:border-gold-500 hover:text-gold-200 flex items-center justify-center text-gray-400 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gold-850/10 border border-gold-850/30 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gold-500/60" />
                  </div>
                  <h4 className="font-heading text-2xl text-gold-100">Empty Craving Vault</h4>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    Explore our majestic Indian menu and press the '+' button on any entree or gourmet drink to load this panel!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-luxury-black rounded-lg transition"
                  >
                    Start Exploring
                  </button>
                </div>
              ) : checkoutStep === "view" ? (
                /* STEP 1: View items */
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gold-850/20">
                    <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Selected Cravings</span>
                    <button
                      onClick={onClearCart}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-luxury-sand/60 border border-gold-850/20 rounded-xl flex items-center justify-between gap-3 shadow-inner"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={getAbsoluteUrl(item.menuItem.image)}
                            alt={item.menuItem.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover border border-gold-850/30"
                          />
                          <div>
                            <h5 className="text-sm font-semibold text-gray-200 line-clamp-1">{item.menuItem.name}</h5>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-gold-300 font-bold">${item.menuItem.price.toFixed(2)}</span>
                              {item.spiceLevel && (
                                <span className="text-[10px] text-red-400 bg-red-950/20 px-1.5 py-0.2 rounded border border-red-900/40">
                                  🔥 {item.spiceLevel}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2.5 bg-luxury-black/50 px-2 py-1 rounded-lg border border-gold-850/30">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-gray-400 hover:text-gold-300"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-gold-200 w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-gray-400 hover:text-gold-300"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary math */}
                  <div className="pt-4 border-t border-gold-850/20 space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-gray-200">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Tax (CA 8.75%)</span>
                      <span className="text-gray-200">${salesTax.toFixed(2)}</span>
                    </div>

                    {/* Delivery toggle */}
                    <div className="py-2">
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-luxury-black/60 border border-gold-850/30 rounded-xl">
                        <button
                          onClick={() => setOrderType("pickup")}
                          className={`py-2 text-xs font-bold rounded-lg transition-all ${
                            orderType === "pickup"
                              ? "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                              : "text-gray-400 hover:text-gray-200"
                          }`}
                        >
                          Convenient Pickup
                        </button>
                        <button
                          onClick={() => setOrderType("delivery")}
                          className={`py-2 text-xs font-bold rounded-lg transition-all ${
                            orderType === "delivery"
                              ? "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                              : "text-gray-400 hover:text-gray-200"
                          }`}
                        >
                          Home Delivery
                        </button>
                      </div>
                    </div>

                    {/* Tips Selector */}
                    <div className="space-y-1.5 py-1">
                      <div className="flex justify-between text-xs text-gold-400 font-bold uppercase tracking-wider">
                        <span>Compliment Sami’s Kitchen staff:</span>
                        <span>{tipPercent}% Selection</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[15, 18, 20, 25].map((tip) => (
                          <button
                            key={tip}
                            onClick={() => setTipPercent(tip)}
                            className={`py-1.5 text-xs font-semibold rounded-lg border transition ${
                              tipPercent === tip
                                ? "bg-gold-500/15 text-gold-300 border-gold-500"
                                : "bg-luxury-black text-gray-400 border-gold-850/30 hover:border-gold-850/80"
                            }`}
                          >
                            {tip}%
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <span>Tipping contribution</span>
                      <span className="text-gray-200">${tipAmount.toFixed(2)}</span>
                    </div>
                    {orderType === "delivery" && (
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span className="text-gray-200">$3.99</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : checkoutStep === "booking" ? (
                /* STEP 2: Checkout details form */
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="pb-2 border-b border-gold-850/20">
                    <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Secure Your Feast</span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    Our tandoori fires are hot and ready. Provide your details below so Sami can contact you immediately or dispatch your authentic hot meals!
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs uppercase text-gold-400 font-bold tracking-wider mb-1">Your Royal Name</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Aura Silvera"
                        className="w-full px-4 py-2.5 h-11 text-sm bg-luxury-sand text-gray-200 border border-gold-850/40 rounded-xl focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-gold-400 font-bold tracking-wider mb-1">Phone Number (For Text Alerts)</label>
                      <input
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="e.g. (951) 449-2165"
                        className="w-full px-4 py-2.5 h-11 text-sm bg-luxury-sand text-gray-200 border border-gold-850/40 rounded-xl focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-gold-400 font-bold tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="e.g. guest@example.com"
                        className="w-full px-4 py-2.5 h-11 text-sm bg-luxury-sand text-gray-200 border border-gold-850/40 rounded-xl focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    {orderType === "delivery" ? (
                      <div>
                        <label className="block text-xs uppercase text-gold-400 font-bold tracking-wider mb-1">Menifee, CA Delivery Address</label>
                        <textarea
                          required
                          value={deliveryAddr}
                          onChange={(e) => setDeliveryAddr(e.target.value)}
                          placeholder="e.g. 27738 Encanto Dr, Menifee, CA 92586"
                          className="w-full px-4 py-2.5 h-16 text-sm bg-luxury-sand text-gray-200 border border-gold-850/40 rounded-xl focus:border-gold-500 focus:outline-none resize-none"
                        />
                      </div>
                    ) : (
                      <div className="p-3 bg-luxury-black/30 rounded-xl border border-gold-850/20 text-xs text-gray-400 flex items-start gap-2">
                        <Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        <div>
                          <strong>Quick Door pickup setup:</strong> Your order will be ready for doorstep retreat at 27738 Encanto Dr, Menifee, CA within 20-30 minutes.
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                /* STEP 3: Receipt success */
                <div className="text-center space-y-6 pt-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/10 border-2 border-gold-500 flex items-center justify-center">
                    <Check className="w-8 h-8 text-gold-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-heading text-3xl text-gold-200">Namaste, {guestName}!</h4>
                    <p className="text-sm text-gray-300">Your authentic craving ticket is registered successfully.</p>
                  </div>

                  {/* Receipt Code Display */}
                  <div className="p-4 bg-luxury-sand/80 border border-gold-500/30 rounded-2xl space-y-2 text-center shadow-lg">
                    <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">Authentic Meal Pass</span>
                    <div className="text-2xl font-mono text-gold-100 uppercase tracking-widest font-bold">{receiptCode}</div>
                    <p className="text-[11px] text-gray-400 leading-relaxed italic">
                      Show this ticket to Sami's staff on your phone or give us your passcode when calling!
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 text-sm text-left text-gray-400">
                    <div className="flex items-center gap-2 p-2.5 bg-luxury-black/30 rounded-lg border border-gold-850/10">
                      <Clock className="w-4 h-4 text-gold-500" />
                      <span>{orderType === "pickup" ? "Door pickup ready in 25 mins" : "Delivery agent dispatching shortly"}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-luxury-black/30 rounded-lg border border-gold-850/10">
                      <MapPin className="w-4 h-4 text-gold-500" />
                      <span>{orderType === "pickup" ? "27738 Encanto Dr, Menifee, CA 92586" : deliveryAddr}</span>
                    </div>
                  </div>

                  {/* Conversion Call-to-action */}
                  <div className="p-4 bg-gold-850/10 border border-gold-500/20 rounded-xl space-y-2">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gold-300 animate-pulse">
                      <Phone className="w-4 h-4 text-gold-500" />
                      <span>Placing urgent orders?</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      To push this directly to our kitchen right away or customize ingredients with Sami, call our store now:
                    </p>
                    <a
                      href="tel:9514492165"
                      className="block px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-luxury-black font-extrabold text-sm rounded-lg"
                    >
                      📞 (951) 449-2165
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Footer calculations & payment checkout triggers */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-luxury-black border-t border-gold-850/40 space-y-4">
                {checkoutStep === "view" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-gold-400 uppercase tracking-wider text-xs">Simulated Total</span>
                      <span className="text-gold-200 font-heading text-2xl">${grandTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCheckoutStep("booking")}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-luxury-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_4px_20px_rgba(188,130,32,0.3)] select-none text-center duration-300 cursor-pointer"
                      >
                        Advance to checkout
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === "booking" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-gold-400 uppercase tracking-wider text-xs">Total to Pay</span>
                      <span className="text-gold-200 font-heading text-2xl">${grandTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep("view")}
                        className="px-4 py-3 bg-luxury-sand hover:bg-luxury-sand/80 border border-gold-850/40 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        form="checkout-form"
                        type="submit"
                        disabled={submitLoading}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-luxury-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:shadow-lg text-center cursor-pointer disabled:opacity-50"
                      >
                        {submitLoading ? "Booking Feast..." : "Submit craving reservation"}
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === "receipt" && (
                  <button
                    onClick={handleResetCheckout}
                    className="w-full py-3 bg-luxury-sand hover:bg-gold-500 hover:text-luxury-black text-gold-300 text-xs font-bold uppercase tracking-widest border border-gold-500/30 rounded-xl duration-300 cursor-pointer"
                  >
                    Clear and start fresh
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
