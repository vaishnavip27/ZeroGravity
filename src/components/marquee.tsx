import Marquee from "react-fast-marquee";
import { HiMiniArrowLongRight } from "react-icons/hi2";

const MyMarquee = () => {
  return (
    <div className="transform rotate-[-3deg] mt-44 text-slate-400">
      <Marquee gradient={false}>
        <p className="text-xl font-normal mx-5">Welcome to Zero Gravity vibes</p>
        <HiMiniArrowLongRight size={54} />
        <p className="text-xxl font-normal mx-5">Zero Gravity</p>
        <HiMiniArrowLongRight size={54} />
        <p className="text-xl font-normal mx-5">Ready to Drift?</p>
        <HiMiniArrowLongRight size={54} />
        <p className="text-xxl font-normal mx-5">Zero Gravity</p>
        <HiMiniArrowLongRight size={54} />
        <p className="text-xl font-normal mx-5">Floating beyond Limits</p>
        <HiMiniArrowLongRight size={54} />
        <p className="text-xxl font-normal mx-5">Zero Gravity</p>
        <HiMiniArrowLongRight size={54} />
      </Marquee>
    </div>
  );
};

export default MyMarquee;
