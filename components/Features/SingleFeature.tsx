"use client";

import { Feature } from "@/types/feature";
import { motion } from "framer-motion";
import { hoverScale, rotateScale } from "@/lib/animations";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <motion.div
      className="w-full"
      whileHover={hoverScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="group relative overflow-hidden rounded-lg p-6 transition-all duration-300 hover:bg-gray-light dark:hover:bg-gray-dark">
        <motion.div
          variants={rotateScale(0.1)}
          className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white"
        >
          {icon}
        </motion.div>
        <h3 className="mb-5 text-xl font-bold text-black transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
        <motion.div
          className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover:w-full"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
        />
      </div>
    </motion.div>
  );
};

export default SingleFeature;
