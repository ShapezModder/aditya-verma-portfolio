"use client";

import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import { motion } from "framer-motion";
import { hoverLift, scaleIn } from "@/lib/animations";

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;

  let ratingIcons = [];
  for (let index = 0; index < star; index++) {
    ratingIcons.push(
      <motion.span
        key={index}
        className="text-yellow"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      >
        {starIcon}
      </motion.span>,
    );
  }

  return (
    <motion.div
      className="w-full"
      whileHover={hoverLift}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scaleIn(0.1)}
    >
      <div className="group relative overflow-hidden rounded-sm bg-white p-8 shadow-two transition-all duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8">
        <motion.div
          className="mb-5 flex items-center space-x-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {ratingIcons}
        </motion.div>
        <p className="mb-8 border-b border-body-color border-opacity-10 pb-8 text-base leading-relaxed text-body-color transition-colors duration-300 group-hover:text-primary dark:border-white dark:border-opacity-10 dark:text-white dark:group-hover:text-primary">
          &quot;{content}
        </p>
        <div className="flex items-center">
          <motion.div
            className="relative mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:ring-primary"
            whileHover={{ scale: 1.1 }}
          >
            <Image src={image} alt={name} fill />
          </motion.div>
          <div className="w-full">
            <h3 className="mb-1 text-lg font-semibold text-dark transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary lg:text-base xl:text-lg">
              {name}
            </h3>
            <p className="text-sm text-body-color">{designation}</p>
          </div>
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={false}
        />
      </div>
    </motion.div>
  );
};

export default SingleTestimonial;
