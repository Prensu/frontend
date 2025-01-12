import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { useState } from 'react';

const policyData = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange Policy",
    description: "We offer hassle-free exchange policy",
  },
  {
    icon: assets.quality_icon,
    title: "7-day return policy",
    description: "We provide a 7-day return policy",
  },
  {
    icon: assets.support_img,
    title: "Best customer support",
    description: "We provide 24/7 customer support",
  },
];

// Reusable Card Component with Mouse Animation
const PolicyCard = ({ icon, title, description }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Border Animation */}
      <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-indigo-600 transition-all duration-500"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-xl pointer-events-none"></div>

      {/* Mouse Animation */}
      {isHovered && (
        <motion.div
          className="absolute w-40 h-40 bg-indigo-200 opacity-50 rounded-full pointer-events-none"
          style={{
            top: mousePos.y - 80,
            left: mousePos.x - 80,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      <motion.img
        src={icon}
        alt={title}
        className="w-14 mb-5 relative z-10 group-hover:scale-125 transition-transform duration-300"
        whileHover={{ rotate: 10 }}
      />
      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300 relative z-10">
        {description}
      </p>
    </motion.div>
  );
};

const OurPolicy = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-12">
        Our Policies
      </h2>
      <motion.div
        className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-6 px-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {policyData.map((policy, index) => (
          <PolicyCard
            key={index}
            icon={policy.icon}
            title={policy.title}
            description={policy.description}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default OurPolicy;
