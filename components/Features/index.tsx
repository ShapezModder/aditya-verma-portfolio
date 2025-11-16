"use client";

import { motion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

const Features = () => {
  const { ref, controls } = useScrollAnimation(0.1);

  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Main Features"
            paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
            center
          />

          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={staggerContainer(0.1, 0.2)}
            className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
          >
            {featuresData.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={fadeIn("up", index * 0.1)}
              >
                <SingleFeature feature={feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Features;
