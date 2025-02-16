import { CgMenuGridO } from "react-icons/cg";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="relative px-9 py-4 text-slate-400 font-medium">
      {/* Decorative Layer for Menu */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        {/* Background Element 1 */}
        <div className="absolute -left-16 -top-16 w-44 h-44 bg-gradient-to-b from-[#f86300] to-[#ffa32b] opacity-50 rounded-full"></div>

        {/* Background Element 2 */}
        <div className="absolute mr-2 right-0 -top-20 w-20 h-64 rounded-l-sm bg-gradient-to-b from-[#f86300] to-[#ffa32b]  opacity-40 rounded-full"></div>
      </div>

      <motion.div
        initial={{ y: -200, opacity: 0, scale: 0 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex justify-between align-middle my-div"
      >
        <div className="my-auto">
          <CgMenuGridO size={25} />
        </div>
        <div className="hidden md:flex gap-8 pl-24">
          <button>HOME</button>
          <button>ABOUT</button>
          <button>CONTACT</button>
        </div>
        <div className="my-auto">
          <div className="py-3 px-10 bg-gradient-to-b from-[#ffaf00] to-[#E74E00] text-slate-200 cursor-pointer rounded-lg">Sign up</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
