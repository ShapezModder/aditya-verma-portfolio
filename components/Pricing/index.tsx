"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const { ref, controls } = useScrollAnimation(0.1);

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Simple and Affordable Pricing"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
          width="665px"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer(0.1, 0.2)}
          className="w-full"
        >
          <motion.div
            variants={fadeIn("up", 0.1)}
            className="mb-8 flex justify-center md:mb-12 lg:mb-16"
          >
            <motion.span
              onClick={() => setIsMonthly(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                isMonthly
                  ? "pointer-events-none text-primary"
                  : "text-dark dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold transition-colors duration-300`}
            >
              Monthly
            </motion.span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <motion.div
                  animate={{
                    x: isMonthly ? 0 : 28,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary"
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </motion.div>
              </div>
            </div>
            <motion.span
              onClick={() => setIsMonthly(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                isMonthly
                  ? "text-dark dark:text-white"
                  : "pointer-events-none text-primary"
              } ml-4 cursor-pointer text-base font-semibold transition-colors duration-300`}
            >
              Yearly
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer(0.1, 0.3)}
          className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div variants={fadeIn("up", 0.1)}>
            <PricingBox
              packageName="Lite"
              price={isMonthly ? "40" : "120"}
              duration={isMonthly ? "mo" : "yr"}
              subtitle="Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim."
            >
              <OfferList text="All UI Components" status="active" />
              <OfferList text="Use with Unlimited Projects" status="active" />
              <OfferList text="Commercial Use" status="active" />
              <OfferList text="Email Support" status="active" />
              <OfferList text="Lifetime Access" status="inactive" />
              <OfferList text="Free Lifetime Updates" status="inactive" />
            </PricingBox>
          </motion.div>
          <motion.div variants={fadeIn("up", 0.2)}>
            <PricingBox
              packageName="Basic"
              price={isMonthly ? "399" : "789"}
              duration={isMonthly ? "mo" : "yr"}
              subtitle="Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim."
            >
              <OfferList text="All UI Components" status="active" />
              <OfferList text="Use with Unlimited Projects" status="active" />
              <OfferList text="Commercial Use" status="active" />
              <OfferList text="Email Support" status="active" />
              <OfferList text="Lifetime Access" status="active" />
              <OfferList text="Free Lifetime Updates" status="inactive" />
            </PricingBox>
          </motion.div>
          <motion.div variants={fadeIn("up", 0.3)}>
            <PricingBox
              packageName="Plus"
              price={isMonthly ? "589" : "999"}
              duration={isMonthly ? "mo" : "yr"}
              subtitle="Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim."
            >
              <OfferList text="All UI Components" status="active" />
              <OfferList text="Use with Unlimited Projects" status="active" />
              <OfferList text="Commercial Use" status="active" />
              <OfferList text="Email Support" status="active" />
              <OfferList text="Lifetime Access" status="active" />
              <OfferList text="Free Lifetime Updates" status="active" />
            </PricingBox>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
