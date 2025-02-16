import React from "react";
import {motion} from "framer-motion";
import Image from "next/image";


const HeroSection = () => {
  return (
    <div>
      <div className="mt-12">
        <motion.div
          className="absolute top-2/4 left-20 transform -translate-y-1/2 cursor-pointer"
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 0.1,
          }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-8xl font-black bg-gradient-to-r from-gray-300 to-gray-800 bg-clip-text text-transparent group-hover:text-transparent group-hover:-webkit-text-stroke-[1px] group-hover:-webkit-text-stroke-gray-300">
            EQUILIBRIUM
          </h1>
        </motion.div>

        <motion.div
          className="absolute top-[58%] left-20 transform -translate-y-1/2 mt-4 cursor-pointer"
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.3,
          }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-8xl font-black bg-gradient-to-r from-gray-300 to-gray-800 bg-clip-text text-transparent group-hover:text-transparent group-hover:-webkit-text-stroke-[1px] group-hover:-webkit-text-stroke-gray-300">
            MOMENTUM
          </h1>
        </motion.div>

        <motion.div
          className="absolute top-[67%] left-20 transform -translate-y-1/2 mt-4 cursor-pointer"
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          transition={{
            duration: 1.3,
            ease: "easeOut",
            delay: 0.5,
          }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-8xl font-black bg-gradient-to-r from-gray-300 via-[#FA3200] to-gray-800 bg-clip-text text-transparent group-hover:text-transparent group-hover:-webkit-text-stroke-[1px] group-hover:-webkit-text-stroke-gray-300">
            INERTIA
          </h1>
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-0 transform -translate-y-1/2 pointer-events-none"
          initial={{ x: "100%" }}
          whileInView={{ x: "60px" }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 1.4,
          }}
          viewport={{ once: true }}
        >
          <Image
            src="/flower.jpg"
            alt="Cat Image"
            className="w-[490px] h-auto"
            width={200}
            height={300}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
