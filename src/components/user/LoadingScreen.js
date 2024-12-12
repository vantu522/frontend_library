import React, { useEffect, useState } from "react";


const LoadingScreen = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const simulateLoading = () => {
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += Math.random() * 10;
          
          if (currentProgress > 100) {
            currentProgress = 100;
            clearInterval(interval);
            
            // Gọi callback khi loading hoàn tất
            setTimeout(() => {
              onLoadingComplete();
            }, 500);
          }
          
          setProgress(currentProgress);
        }, 100);
  
        return () => clearInterval(interval);
      };
  
      simulateLoading();
    }, [onLoadingComplete]);
  
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#A5D6A7]">
        <a className="flex items-center gap-4" href='/'>
          <img
            src="/assets/images/logo-preview.png"
            alt="Logo"
            className="w-16 h-16 object-contain transition-transform duration-300 hover:scale-105"
          />
          <span className="text-3xl font-bold text-gray color-[#0a3915] uppercase tracking-wider hidden md:inline-block">
            Wisdom's Beacon
          </span>
        </a>
        <div className="w-96 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#e37678] transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div> 
        
        <div className="mt-4 text-lg text-gray-600">
          {Math.round(progress)}%
        </div>
      </div>
    );
  };

export default LoadingScreen;