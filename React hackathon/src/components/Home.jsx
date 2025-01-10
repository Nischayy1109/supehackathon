
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import bgImg from "../assets/bgimg.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleChatNavigation = () => {
    navigate("/chat");
  };

  // Split text into individual letters for animation
  const headingText = "Welcome to Langflow App".split("");

  return (
    <>
      <div className="relative w-full h-screen text-[#E5E5E5] flex flex-col justify-start overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "invert(1)",
            opacity: 0.2,
          }}
        ></div>

        {/* Navbar */}
        {/* <Navbar /> */}

        {/* Main Content */}
        <div className="flex-grow flex flex-col items-center justify-center relative mt-[50px]">
          {/* Animated Heading */}
          <motion.div
            className="flex justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            {headingText.map((letter, index) => (
              <motion.span
                key={index}
                className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
                variants={{
                  hidden: { opacity: 0, y: "20px" },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {letter === " " ? "\u00A0" : letter} {/* Handle spaces */}
              </motion.span>
            ))}
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="max-w-[90%] sm:max-w-[65%] lg:max-w-[40%] mx-auto mt-6 text-[#4B5563] text-lg sm:text-xl"
            initial={{ y: "50px", opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            Let's get started for your queries!
          </motion.p>
        </div>

        {/* Call to Action Button */}
        <div className="w-full flex justify-center items-center mb-96 relative inter-regular">
         <motion.button
            className="bg-[#1D3C50] text-[#F5F5F5] font-semibold w-[130px] md:w-[160px] h-[50px] flex justify-center items-center text-[15px] md:text-lg transition-all duration-200 ease-in-out transform shadow-md hover:shadow-lg hover:bg-slate-500 hover:text-[#2D2D2D] hover:scale-105"
             initial={{ opacity: 0 }}
             animate={{
               opacity: 1,
             }}
             transition={{
               duration: 0.4,
               ease: "easeInOut",
               delay: 1.2,
             }}
             onClick={handleChatNavigation}
           >
             Chat Now <span className="ml-2">&rarr;</span>
           </motion.button>
         </div>
      </div>
      <style jsx="true">{`
        /* Hide Scrollbar */
        body {
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Home;


