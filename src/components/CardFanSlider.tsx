import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  TrendingUp, 
  Building2, 
  Users, 
  History, 
  Link as LinkIcon, 
  Mail, 
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { cardsData } from '../cardsData';

// Map icon names to Lucide icon components
const IconMap: Record<string, React.ComponentType<any>> = {
  Radio,
  TrendingUp,
  Building2,
  Users,
  History,
  Link: LinkIcon,
  Mail,
};

export default function CardFanSlider() {
  const [activeIndex, setActiveIndex] = useState<number>(4); // Default to "Historical Earnings" (index 4)
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Track window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
        setProgress(0); // Reset autoplay progress on manual select
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % cardsData.length);
        setProgress(0); // Reset autoplay progress on manual select
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autoplay and progress bar interval logic
  useEffect(() => {
    // Clear any existing intervals
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    // If auto-play is enabled and user is not hovering, start the cycles
    if (isPlaying && !isHovered) {
      const stepTime = 40; // update progress bar every 40ms
      const totalTime = 4000; // 4 seconds total cycle
      let elapsed = 0;

      progressIntervalRef.current = setInterval(() => {
        elapsed += stepTime;
        setProgress(Math.min((elapsed / totalTime) * 100, 100));
      }, stepTime);

      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % cardsData.length);
        setProgress(0);
      }, totalTime);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isHovered, activeIndex]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setProgress(0); // Reset active timer progress
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cardsData.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
    setProgress(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    if (isMobile && touchStartY.current !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;
      if (Math.abs(diffY) > 40) {
        if (diffY > 0) {
          handleNext(); // Swiped up -> show next item down
        } else {
          handlePrev(); // Swiped down -> show previous item up
        }
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }
    }

    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 40) { // swipe threshold of 40px
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const activeWidth = isMobile ? Math.min(320, windowWidth - 32) : isTablet ? 300 : 320;
  const collapsedWidth = isMobile ? Math.min(320, windowWidth - 32) : isTablet ? 48 : 60;

  const activeHeight = isMobile ? 260 : 320;
  const collapsedHeight = isMobile ? 48 : 320;

  // Maximum number of visible neighbors on either side of active card
  const maxNeighbors = isMobile ? 2 : isTablet ? 2 : 3;

  return (
    <section 
      id="card-slider-section"
      className="relative w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between overflow-hidden font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft background ambient radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.015)_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <header className="mt-16 text-center z-10 px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-light mb-2 text-white tracking-tight"
        >
          <span className="line-through opacity-40 mr-3 font-normal">One</span>a few more things.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#888] text-xs uppercase tracking-[0.25em] font-semibold"
        >
          Market Intelligence Suite
        </motion.p>

        {/* Autoplay controllers and Progress bar */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-md">
            <button 
              onClick={handlePrev}
              className="p-1 rounded-full text-neutral-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer focus-visible:ring-1 focus-visible:ring-emerald-500 outline-none"
              title="Previous card (ArrowLeft)"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded-full text-neutral-500 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center cursor-pointer focus-visible:ring-1 focus-visible:ring-emerald-500 outline-none"
              title={isPlaying ? "Pause autoplay" : "Start autoplay"}
              aria-label={isPlaying ? "Pause automatic slide rotation" : "Start automatic slide rotation"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-emerald-500" aria-hidden="true" /> : <Play className="w-4 h-4 text-neutral-500" aria-hidden="true" />}
            </button>

            {/* Autoplay progress bar indicator */}
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden relative" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Autoplay progress">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75"
                style={{ width: isPlaying && !isHovered ? `${progress}%` : isHovered ? `${progress}%` : '0%' }}
              />
            </div>

            <button 
              onClick={handleNext}
              className="p-1 rounded-full text-neutral-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer focus-visible:ring-1 focus-visible:ring-emerald-500 outline-none"
              title="Next card (ArrowRight)"
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Screen reader only live region to announce active slide changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Active slide: ${cardsData[activeIndex].label}, slide ${activeIndex + 1} of ${cardsData.length}. ${cardsData[activeIndex].description}`}
      </div>

      {/* 3D Fan Slider - Perspective container */}
      <main 
        className="w-full flex justify-center items-center py-12 z-10 px-4 md:px-10 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className={isMobile ? "flex flex-col flex-nowrap items-center justify-center gap-2.5 overflow-visible w-full" : "flex flex-row flex-nowrap items-center justify-center gap-1.5 sm:gap-3 overflow-visible"}
          role="tablist"
          aria-label="Market Intelligence Modules"
          style={{ 
            perspective: '1200px', 
            transformStyle: 'preserve-3d' 
          }}
        >
          {cardsData.map((card, index) => {
            const isActive = index === activeIndex;
            const IconComponent = IconMap[card.iconName] || Radio;

            const isVisible = Math.abs(index - activeIndex) <= maxNeighbors;

            // Match precise rotations from template, scaled with distance dynamically
            let rotateYVal = 0;
            let rotateXVal = 0;
            let zVal = 0;
            let yVal = 0;
            let opacityVal = 1;

            if (index < activeIndex) {
              const diff = activeIndex - index;
              if (isMobile) {
                rotateXVal = 18 - (diff - 1) * 3;
                zVal = -20 * diff;
                yVal = 12 * diff;
              } else {
                // left tilted inward
                rotateYVal = isVisible ? (10 + (diff - 1) * 10) : 45;
                zVal = isVisible ? (-20 * diff) : -150;
              }
              opacityVal = isVisible ? Math.max(1 - diff * 0.15, 0.4) : 0;
            } else if (index > activeIndex) {
              const diff = index - activeIndex;
              if (isMobile) {
                rotateXVal = -(18 - (diff - 1) * 3);
                zVal = -20 * diff;
                yVal = -12 * diff;
              } else {
                // right tilted inward
                rotateYVal = isVisible ? -(10 + (diff - 1) * 10) : -45;
                zVal = isVisible ? (-20 * diff) : -150;
              }
              opacityVal = isVisible ? Math.max(1 - diff * 0.15, 0.4) : 0;
            } else {
              rotateYVal = 0;
              rotateXVal = 0;
              zVal = 40; // Push active card forward in 3D space
              yVal = 0;
              opacityVal = 1.0;
            }

            return (
              <motion.div
                key={card.id}
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(index);
                  }
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${card.id}`}
                id={`tab-${card.id}`}
                tabIndex={isVisible ? 0 : -1}
                aria-label={`Module ${index + 1}: ${card.label}`}
                className={`card relative rounded-2xl cursor-pointer select-none overflow-hidden flex flex-col justify-between transition-all duration-300 backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                  isActive 
                    ? "card-active bg-white/[0.07] border border-white/15 p-5 sm:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),_0_0_40px_rgba(255,255,255,0.02)]" 
                    : (isMobile 
                        ? "card-collapsed bg-white/[0.04] border border-white/[0.08] p-0 hover:bg-white/[0.07] hover:border-white/15 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)]"
                        : "card-collapsed bg-white/[0.04] border border-white/[0.08] py-5 px-0 hover:bg-white/[0.07] hover:border-white/15 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)]"
                      )
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  originX: 0.5,
                  originY: 0.5,
                  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 100%)',
                  borderWidth: isVisible ? undefined : 0,
                }}
                animate={{
                  width: isVisible ? (isActive ? activeWidth : collapsedWidth) : 0,
                  height: isVisible ? (isActive ? activeHeight : collapsedHeight) : 0,
                  rotateY: isMobile ? 0 : rotateYVal,
                  rotateX: isMobile ? rotateXVal : 0,
                  z: zVal,
                  y: isMobile ? yVal : 0,
                  opacity: isVisible ? opacityVal : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 18,
                  mass: 0.9,
                }}
              >
                {/* 1. COLLAPSED CARD CONTENT */}
                <AnimatePresence mode="wait">
                  {!isActive && isVisible && (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute inset-0 w-full h-full pointer-events-none ${
                        isMobile 
                          ? "flex flex-row justify-between items-center px-4" 
                          : "flex flex-col justify-between items-center py-5 px-1"
                      }`}
                    >
                      {isMobile ? (
                        <>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[10px] tracking-wider text-neutral-500">
                              0{index + 1}
                            </span>
                            <span className="font-sans font-medium text-[13px] tracking-[0.02em] text-white/90">
                              {card.label}
                            </span>
                          </div>
                          <div className="text-neutral-400">
                            <IconComponent className="w-4.5 h-4.5 opacity-70" />
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Compact index number */}
                          <span className="font-mono text-[10px] tracking-wider text-neutral-500">
                            0{index + 1}
                          </span>

                          {/* Vertically rotated labels */}
                          <div className="flex-grow flex items-center justify-center">
                            <span 
                              className="vertical-label font-sans font-medium text-[11px] sm:text-[13px] tracking-[0.02em] text-white/70 select-none whitespace-nowrap"
                              style={{ 
                                writingMode: 'vertical-rl', 
                                transform: 'rotate(180deg)' 
                              }}
                            >
                              {card.label}
                            </span>
                          </div>

                          {/* Collapsed Icon indicator */}
                          <div className="text-neutral-400">
                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* 2. EXPANDED CARD CONTENT */}
                  {isActive && (
                    <motion.div
                      key="expanded"
                      role="tabpanel"
                      id={`panel-${card.id}`}
                      aria-labelledby={`tab-${card.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
                      className="w-full h-full flex flex-col justify-between z-10 outline-none"
                    >
                      {/* Top: Header Title + Description */}
                      <div>
                        <div className="flex items-center justify-between mb-3.5">
                          <span className="font-mono text-[10px] text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                            0{index + 1} / 0{cardsData.length}
                          </span>
                        </div>
                        
                        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white mb-2.5">
                          {card.label}
                        </h3>
                        
                        <p className="text-[#888] text-[12px] sm:text-[13px] leading-relaxed font-sans">
                          {card.description}
                        </p>
                      </div>

                      {/* Bottom: Custom Checkbox List and dynamic CTA Button */}
                      <div className="flex flex-col gap-4 mt-auto">
                        {/* Custom interactive-style check option */}
                        <div className="flex items-center gap-2 text-white text-[11px] sm:text-[12px] opacity-90 font-sans">
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border border-white/30 flex items-center justify-center text-[9px] sm:text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                            ✓
                          </div>
                          <span className="truncate">{card.previewText}</span>
                        </div>

                        {/* Card CTA & Icon Footer */}
                        <div className="flex justify-between items-center pt-3 border-t border-white/5">
                          <div className="text-[18px] sm:text-[20px] text-neutral-400 opacity-80">
                            <IconComponent className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-neutral-100" />
                          </div>
                          <button 
                            className="px-3.5 py-1.5 sm:px-4 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-tighter hover:bg-white/20 transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-emerald-500 outline-none"
                            aria-label={`Launch ${card.label} module`}
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Launching ${card.label} module...`);
                            }}
                          >
                            View Data
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Decorative Wave Footer Element (CSS-only dark metallic fluid shape) */}
      <div 
        className="absolute bottom-[-60px] left-[-20%] w-[140%] h-[240px] z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #1a1a1a 0%, #0a0a0a 70%)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '100% 100% 0 0',
          boxShadow: '0 -20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      />

      {/* Footer/Status Bar */}
      <footer className="w-full px-12 py-8 flex justify-between items-end z-10">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#555] font-bold">System Live</span>
        </div>
        <div className="text-[10px] text-[#444] font-mono tracking-tighter">
          ID: MSC-8842 // KEY: 0x9A4F
        </div>
      </footer>
    </section>
  );
}

