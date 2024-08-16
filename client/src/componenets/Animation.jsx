import React from "react";
import { motion, useIsPresent } from "framer-motion";

const Animation = ({ children }) => {
  const isPresent = useIsPresent();
  return (
    <>
      {/* <motion.div
        initial={{ scaleX: 1, opacity: 1 }}
        animate={{
          scaleX: 0,
          opacity: 0.5,
          transition: { duration: 1.6, ease: "circOut" },
        }}
        exit={{
          scaleX: 1,
          opacity: 1,
          transition: { duration: 1.6, ease: "circIn" },
        }}
        style={{
          originX: isPresent ? 0 : 1,
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          background:
            "linear-gradient(202.6deg, #A615BD 11.43%, #3940DB 85.3%)",
          zIndex: 10000,
        }}
      /> */}
      <motion.div
        initial={{
          //  opacity: 0
          scale: 0.6,
        }}
        animate={{
          // opacity: 1
          scale: 1,
          transition: { duration: 0.8, ease: "circOut", type: "spring" },
        }}
        exit={{
          scale: 0.6,
          // opacity: 0
          transition: { duration: 0.8, ease: "circIn", type: "spring" },
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Animation;
