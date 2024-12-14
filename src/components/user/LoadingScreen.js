import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        const simulateLoading = () => {
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += Math.random() * 10;
                
                if (currentProgress > 100) {
                    currentProgress = 100;
                    clearInterval(interval);
                    
                    setTimeout(() => {
                        setAnimationComplete(true);
                        setTimeout(onLoadingComplete, 500);
                    }, 500);
                }
                
                setProgress(currentProgress);
            }, 70);

            return () => clearInterval(interval);
        };

        simulateLoading();
    }, [onLoadingComplete]);

    return (
        <motion.div 
            initial={{ opacity: 1 }}
            animate={{ 
                opacity: animationComplete ? 0 : 1,
                scale: animationComplete ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center 
                       bg-gradient-to-br from-[#A5D6A7] via-[#80CBC4] to-[#4DB6AC] 
                       min-h-screen overflow-hidden"
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    duration: 0.5
                }}
                className="flex flex-col items-center space-y-6"
            >
                <a 
                    href='/' 
                    className="flex items-center gap-4 group"
                >
                    <motion.img
                        src="/assets/images/logo-preview.png"
                        alt="Logo"
                        whileHover={{ 
                            rotate: [0, -10, 10, -10, 0],
                            scale: 1.1 
                        }}
                        className="w-20 h-20 object-contain transition-transform 
                                   duration-300 group-hover:scale-110"
                    />
                    <motion.span 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-extrabold text-[#0a3915] 
                                   uppercase tracking-wider hidden md:inline-block 
                                   drop-shadow-lg"
                    >
                        Wisdom's Beacon
                    </motion.span>
                </a>

                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '24rem' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-96 h-2 bg-white/30 rounded-full overflow-hidden shadow-inner"
                >
                    <motion.div 
                        animate={{ 
                            width: `${progress}%`,
                            background: `linear-gradient(90deg, 
                                #FF6B6B, 
                                #4ECDC4, 
                                #45B7D1)`
                        }}
                        transition={{ 
                            duration: 0.5, 
                            ease: "easeInOut" 
                        }}
                        className="h-full rounded-full shadow-lg transform origin-left"
                    />
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 text-2xl font-semibold text-[#0a3915]/80 
                               tracking-wide"
                >
                    {Math.round(progress)}% Loading
                </motion.div>
            </motion.div>

            {/* Particle Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ 
                            opacity: 0, 
                            x: Math.random() * window.innerWidth, 
                            y: Math.random() * window.innerHeight 
                        }}
                        animate={{ 
                            opacity: [0, 0.5, 0],
                            y: [0, Math.random() * 100, window.innerHeight],
                            x: [
                                Math.random() * window.innerWidth, 
                                Math.random() * window.innerWidth, 
                                Math.random() * window.innerWidth
                            ]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            repeatType: "loop"
                        }}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default LoadingScreen;