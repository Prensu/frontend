import { useContext, useMemo, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { navigate, addOrder, user } = useContext(ShopContext);

  const paymentOptions = useMemo(
    () => [
      {
        key: "stripe",
        label: "Card / UPI",
        helper: "Cards, UPI & netbanking via Stripe",
        icon: assets.stripe_logo,
        tag: "Recommended",
      },
      {
        key: "razorpay",
        label: "Pay via Razorpay",
        helper: "UPI, wallets & netbanking",
        icon: assets.razorpay_logo,
      },
      {
        key: "cod",
        label: "Cash on Delivery",
        helper: "Pay when the package arrives",
        icon: null,
        tag: "Popular",
      },
    ],
    []
  );

  return (
    <motion.div
      className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-10 pt-10 pb-16 px-5 sm:px-6 lg:px-8 min-h-[80vh] border-t border-gray-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Left Side */}
      <div className="flex-[1.05] flex flex-col gap-6 w-full bg-white border rounded-2xl shadow-md p-6">
        <Title text1="DELIVERY" text2="DETAILS" className="text-2xl" />
        <div className="text-sm text-gray-600 rounded-lg bg-gray-50 border p-4">
          <p className="font-semibold text-gray-800">Signed in</p>
          <p>{user?.name || "Guest"}</p>
          <p>{user?.email}</p>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name (for the package)"
            className="input-field"
            defaultValue={user?.name || ""}
          />
          <input
            type="tel"
            placeholder="Phone (for delivery updates)"
            className="input-field"
          />
          <input
            type="text"
            placeholder="City / Area"
            className="input-field"
          />
          <textarea
            placeholder="Delivery notes (landmark, gate code, leave at door, etc.)"
            className="input-field min-h-[96px] resize-none"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-[0.95] space-y-6 w-full mt-10 lg:mt-0">
        {/* Cart Total */}
        <div className="shadow-lg p-6 rounded-2xl bg-white hover:shadow-black transition-shadow duration-300">
          <CartTotal />
        </div>

        {/* Payment Method */}
        <div className="shadow-sm border rounded-2xl p-6 bg-white space-y-4">
          <Title text1="PAYMENT" text2="METHOD" className="text-2xl" />
          <p className="text-sm text-gray-500">Secure checkout — choose what works best for you.</p>
          <div className="space-y-4">
            {paymentOptions.map((option) => {
              const active = paymentMethod === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setPaymentMethod(option.key)}
                  className={`w-full border rounded-xl px-5 py-4 flex items-center justify-between gap-4 transition-all duration-150 ${
                    active
                      ? "border-black bg-gray-50 ring-2 ring-black/10 shadow-sm translate-y-[-1px]"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-4 h-4 rounded-full border mt-1 flex-shrink-0 ${
                        active ? "bg-black border-black" : "bg-white border-gray-300"
                      }`}
                    />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 leading-tight">{option.label}</p>
                      <p className="text-sm text-gray-600 leading-tight">{option.helper}</p>
                    </div>
                    {option.tag && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-900 text-white">
                        {option.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {option.icon ? (
                      <img src={option.icon} alt={option.helper} className="h-6" />
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">COD</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Place Order Button */}
        <div className="w-full text-end pt-2">
          <button
            onClick={() => {
              const placed = addOrder(paymentMethod.toUpperCase());
              if (placed) {
                navigate("/orders");
              }
            }}
            className="bg-black text-white px-10 py-4 text-sm font-semibold rounded-lg shadow-lg hover:shadow-black transition-all duration-300"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceOrder;
