"use client";
import React from "react";
import { usePreloader } from "@/context/PreloaderContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const { loading } = usePreloader();

  const preloaderStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#142B40  ",
    zIndex: 9999,
  };

  const spinnerContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  };



  return (
    <>
      <style>{`
        .flipping {
          width: 250px;
          height: 250px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 0;
        }

        .flipping div {
          animation: flipping-18i5bq 1.5s calc(var(--delay) * 1s) infinite backwards;
          background-color: #D9AA52;
        }

        .flipping div:nth-child(1) {
          --delay: 0.1;
        }

        .flipping div:nth-child(2) {
          --delay: 0.2;
        }

        .flipping div:nth-child(3) {
          --delay: 0.3;
        }

        .flipping div:nth-child(4) {
          --delay: 0.4;
        }

        .flipping div:nth-child(5) {
          --delay: 0.5;
        }

        .flipping div:nth-child(6) {
          --delay: 0.6;
        }

        .flipping div:nth-child(7) {
          --delay: 0.7;
        }

        .flipping div:nth-child(8) {
          --delay: 0.8;
        }

        .flipping div:nth-child(9) {
          --delay: 0.9;
        }

        @keyframes flipping-18i5bq {
          0% {
            transform: perspective(67.2px) rotateX(-90deg);
          }

          50%, 75% {
            transform: perspective(67.2px) rotateX(0);
          }

          100% {
            opacity: 0;
            transform: perspective(67.2px) rotateX(0);
          }
        }
      `}</style>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={preloaderStyle}
          >
            <motion.div
              style={spinnerContainerStyle}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flipping">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}