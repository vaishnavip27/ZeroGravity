import Faq from "./Faq";
import { motion } from "framer-motion";

const FaqComponent = () => {
  return (
    <div className="md:flex gap-32 my-12 md:my-28">
      <div className="md:w-1/2">
        <motion.h1
          initial={{ x: -200, y: 200, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="md:text-[2.6rem] text-3xl text-center md:text-start md:leading-normal font-bold text-slate-300"
        >
           DISCOVERY ZONE
        </motion.h1>
        <motion.p
          initial={{ x: -200, y: 200, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-gray-400 font-universolight my-4 text-center md:text-start text-lg"
        >
          Explore the fascinating world of zero gravity through our curated
          insights. Uncover the mysteries of weightlessness, its effects on
          human life, and its role in shaping our future among the stars.
        </motion.p>
      </div>
      <motion.div
        initial={{ x: 200, y: 200, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className="md:w-1/2"
      >
        <Faq />
      </motion.div>
    </div>
  );
};

export default FaqComponent;
