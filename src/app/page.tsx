"use client";

import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Sparkles,
  Lock,
  Unlock,
  ChevronRight,
  Moon,
  Star,
  Zap,
  X,
} from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const [pandaRunning, setPandaRunning] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [pandaPosition, setPandaPosition] = useState(-150);
  const [peekPanda, setPeekPanda] = useState(false);
  const [cursorHearts, setCursorHearts] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [unlockProgress, setUnlockProgress] = useState(0);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [kissCount, setKissCount] = useState(0);
  const [showLoveBubble, setShowLoveBubble] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<
    { id: number; x: number }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNightMode, setIsNightMode] = useState(false);
  const [bambooCount, setBambooCount] = useState(0);

  // New States
  const [introStep, setIntroStep] = useState(0);
  
  // Photo Logic States
  const [showPhotoMessage1, setShowPhotoMessage1] = useState(false);
  const [showPhotoMessage2, setShowPhotoMessage2] = useState(false);
  const [activeModal, setActiveModal] = useState<1 | 2 | null>(null);
  
  const [showGallery, setShowGallery] = useState(false);
  const [bothPhotosClicked, setBothPhotosClicked] = useState(false);

  // Typewriter Effect States
  const [typewriterLines, setTypewriterLines] = useState<string[]>([]);
  const [currentTypewriterLine, setCurrentTypewriterLine] = useState(0);
  const [currentTypewriterChar, setCurrentTypewriterChar] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showConfession, setShowConfession] = useState(false);

  const idRef = useRef(0);
  const loveBubbleRef = useRef<HTMLDivElement>(null);

  // Typewriter message lines
  const typewriterMessageLines = [
  "Talking to you somehow makes my mood better, even on normal days 🍯🐼",
  "You have this very calm and genuine vibe, and I really like that about you 🙂",
  "Every time you laugh or get excited while talking, this monkey feels a little happier 💗"
];

  // ✅ YOUR GALLERY PHOTOS - REPLACE THESE URLs
  const galleryPhotos = [
    "/images/gallery1.jpg",  // Replace with your photo 1
    "/images/gallery2.jpg",  // Replace with your photo 2
    "/images/gallery3.jpg",  // Replace with your photo 3
    "/images/gallery4.jpg",  // Replace with your photo 4
    "/images/gallery5.jpg",  // Replace with your photo 5
  ];

  // Dark mode calculation
  const [nightOpacity, setNightOpacity] = useState(0);

  // Panda run-in & Intro Sequence Logic
  useEffect(() => {
    const pandaTimer = setTimeout(() => {
      setPandaRunning(true);

      let position = -150;
      const interval = setInterval(() => {
        position += 0.8;
        setPandaPosition(position);

        // Dark mode transition
        const progress = (position + 150) / 250;
        const opacity =
          progress > 0.3 ? Math.min((progress - 0.3) * 1.5, 0.95) : 0;
        setNightOpacity(opacity);

        if (position > 110) {
          clearInterval(interval);
          setPandaRunning(false);
          setNightOpacity(0.95);
          setTimeout(() => setPeekPanda(true), 500);

          // Start Intro Sequence
          startIntroSequence();
        }
      }, 40);

      return () => clearInterval(interval);
    }, 800);

    return () => clearTimeout(pandaTimer);
  }, []);

  const startIntroSequence = () => {
    setTimeout(() => {
      setIntroStep(1);
    }, 1000);

    setTimeout(() => {
      setIntroStep(2);
    }, 3500);

    setTimeout(() => {
      setIntroStep(3);
    }, 6000);

    setTimeout(() => {
      setIntroStep(4);
      setShowCard(true);
    }, 8500);
  };

  // Typewriter effect for Page 2
  useEffect(() => {
    if (currentPage === 2 && !isTyping && typewriterLines.length < typewriterMessageLines.length) {
      setIsTyping(true);
      setTypewriterLines([]);
      setCurrentTypewriterLine(0);
      setCurrentTypewriterChar(0);
    }
  }, [currentPage]);

  // Handle typing effect
  useEffect(() => {
    if (!isTyping || currentTypewriterLine >= typewriterMessageLines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = typewriterMessageLines[currentTypewriterLine];
    
    if (currentTypewriterChar < currentLine.length) {
      const timer = setTimeout(() => {
        setCurrentTypewriterChar(prev => prev + 1);
        const typedSoFar = currentLine.substring(0, currentTypewriterChar + 1);
        setTypewriterLines(prev => {
          const newLines = [...prev];
          newLines[currentTypewriterLine] = typedSoFar;
          return newLines;
        });
      }, 40);

      return () => clearTimeout(timer);
    } else {
      // Move to next line after a pause
      const timer = setTimeout(() => {
        if (currentTypewriterLine < typewriterMessageLines.length - 1) {
          setCurrentTypewriterLine(prev => prev + 1);
          setCurrentTypewriterChar(0);
        } else {
          setIsTyping(false);
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isTyping, currentTypewriterLine, currentTypewriterChar]);

  // Monitor photos to unlock the continue button
  useEffect(() => {
    if (showPhotoMessage1 && showPhotoMessage2) {
      setBothPhotosClicked(true);
    }
  }, [showPhotoMessage1, showPhotoMessage2]);

  const openCardWithHearts = () => {
    setIsOpen(true);
    const newHearts = Array.from({ length: 35 }, (_, i) => i);
    setHearts(newHearts);

    const floatHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
    }));
    setFloatingHearts(floatHearts);

    setTimeout(() => setHearts([]), 3500);
    setTimeout(() => setFloatingHearts([]), 5000);
  };

  const handleUnlockClick = () => {
    if (isUnlocking || unlockProgress >= 100) return;

    setIsUnlocking(true);
    const interval = setInterval(() => {
      setUnlockProgress((prev) => {
        const newProgress = prev + 25;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            openCardWithHearts();
            createBambooShower();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsUnlocking(false);
    }, 500);
  };

  const createBambooShower = () => {
    const bambooCount = 50;
    const newHearts = Array.from({ length: bambooCount }, (_, i) => i + 100);
    setHearts((prev) => [...prev, ...newHearts]);
    setBambooCount((prev) => prev + bambooCount);
    setTimeout(() => setHearts((prev) => prev.filter((h) => h < 100)), 3000);
  };

  const handleKissClick = () => {
    const newKissCount = kissCount + 1;
    setKissCount(newKissCount);
    
    // Show confession after 20 kisses
    if (newKissCount >= 20 && currentPage === 2 && !showConfession) {
      setShowConfession(true);
      createBambooShower();
    }
    
    setShowLoveBubble(true);
    
    const kissX = Math.random() * 80 + 10;
    const kissY = Math.random() * 80 + 10;

    const newHeart = {
      x: kissX,
      y: kissY,
      id: idRef.current++,
    };

    setCursorHearts((prev) => [...prev.slice(-10), newHeart]);

    setTimeout(() => {
      setShowLoveBubble(false);
      setCursorHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);

    if (kissCount >= 3 && currentPage === 1) {
      setCurrentPage(2);
      createBambooShower();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isOpen) return;

    const newHeart = {
      x: e.clientX,
      y: e.clientY,
      id: idRef.current++,
    };

    setCursorHearts((prev) => [...prev.slice(-20), newHeart]);

    setTimeout(() => {
      setCursorHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  // Handle photo clicks
  const handlePhoto1Click = () => {
    setShowPhotoMessage1(true);
    setActiveModal(1);
  };

  const handlePhoto2Click = () => {
    setShowPhotoMessage2(true);
    setActiveModal(2);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderModal = (modalNumber: 1 | 2) => {
    const isModal1 = modalNumber === 1;
    
    return (
      <div 
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
        onClick={closeModal}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />
        
        {/* Modal Content */}
        <div 
          className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-black border-2 border-pink-500/40 rounded-3xl shadow-2xl p-8 transform transition-all animate-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="flex items-start gap-4">
            <div className="text-4xl shrink-0">{isModal1 ? "💌" : "🌙"}</div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-pink-300 mb-4">
                {isModal1 ? "A Small Thought 💭" : "A Quiet Moment ✨"}
              </h3>
              <p className="text-lg text-gray-100 leading-relaxed whitespace-pre-line">
                {isModal1 
                  ? `"In a very short time, you somehow became very special to this Panda 🐼🙂\n\nTalking to you always makes things feel a little lighter."`
                  : `"I really enjoy our talks, our silly jokes, and the quiet moments\n\nwhen everything feels easy with you 🌙💗"`
                }
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              onClick={closeModal}
              className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-full font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPage1 = () => (
    <div className="text-center space-y-8 max-w-md relative min-h-[500px] flex flex-col justify-start pt-2 pb-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
          👇 Tap the photos below 👇
        </h2>
        <p className="text-lg text-pink-200 font-medium drop-shadow-md">
          Read this story by tapping each photo ✨
        </p>
      </div>

      {/* Photos Section */}
      <div className="flex justify-center gap-6 py-4">
        {/* ✅ Photo 1 - REPLACE WITH YOUR IMAGE */}
        <div
          className={`relative w-36 h-44 rounded-xl overflow-hidden cursor-pointer border-4 shadow-2xl transition-all duration-300 hover:scale-105 group ${showPhotoMessage1 ? "border-green-500 shadow-green-500/40" : "border-pink-500 shadow-pink-500/30"}`}
          onClick={handlePhoto1Click}
        >
          <img
            src="/images/photo1.jpg"  // ⬅️ CHANGE THIS TO YOUR PHOTO
            alt="Our Special Memory 1"
            className="w-full h-full object-cover"
          />
          {showPhotoMessage1 && (
            <div className="absolute inset-0 bg-green-500/20 animate-pulse" />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm text-white text-xs py-2 font-medium">
            {showPhotoMessage1 ? "✓ Read" : "Tap me"}
          </div>
        </div>

        {/* ✅ Photo 2 - REPLACE WITH YOUR IMAGE */}
        <div
          className={`relative w-36 h-44 rounded-xl overflow-hidden cursor-pointer border-4 shadow-2xl transition-all duration-300 hover:scale-105 group ${showPhotoMessage2 ? "border-green-500 shadow-green-500/40" : "border-pink-500 shadow-pink-500/30"}`}
          onClick={handlePhoto2Click}
        >
          <img
            src="/images/photo2.jpg"  // ⬅️ CHANGE THIS TO YOUR PHOTO
            alt="Our Special Memory 2"
            className="w-full h-full object-cover"
          />
          {showPhotoMessage2 && (
            <div className="absolute inset-0 bg-green-500/20 animate-pulse" />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm text-white text-xs py-2 font-medium">
            {showPhotoMessage2 ? "✓ Read" : "Tap me"}
          </div>
        </div>
      </div>

      {/* Spacer for scrolling feel */}
      <div className="h-8"></div>

      {/* Final Message after both photos */}
      {bothPhotosClicked && (
        <div className="space-y-8 animate-slide-up pb-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="space-y-4 text-lg text-white leading-relaxed">
              <p>
                You have a very gentle way of making people feel comfortable,
                and I'm really glad I got to know you 💗
              </p>
              <p>
                Thank you for being you, and for letting me be a part of your
                world 🐒💕
              </p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent animate-pulse drop-shadow-lg">
              With a small smile,
              <br />
              Your Shree 💕
            </p>
          </div>

          {/* Continue button */}
          <div className="pt-6 pb-4">
            <button
              className="w-full px-10 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto group border-2 border-pink-400 drop-shadow-lg animate-bounce-slow"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPage(2);
              }}
            >
              Continue Reading
              <ChevronRight
                className="group-hover:translate-x-2 transition-transform"
                size={24}
              />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {activeModal === 1 && renderModal(1)}
      {activeModal === 2 && renderModal(2)}
    </div>
  );

  const renderPage2 = () => (
    <div className="h-full flex flex-col max-w-2xl mx-auto animate-fade-in relative">
      {/* Confession Screen (Overlay) */}
      {showConfession && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-md rounded-3xl animate-fade-in">
          <div className="text-center space-y-6 max-w-lg">
            <div className="text-7xl animate-bounce-slow">💝</div>
            
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-300 drop-shadow-2xl">
              A Final Confession
            </h2>
            
            <div className="space-y-4 text-xl text-white/90 leading-relaxed">
              <p>Every time I talk to you, I feel very comfortable and happy ✨</p>
              <p>You have this beautiful way of making simple moments feel special 💖</p>
              <p>I really enjoy having you in my life.</p>
            </div>
            
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <p className="text-2xl text-pink-200 font-bold">
                "You've slowly become someone I think about almost every day 🌙💭"
              </p>
              <p className="text-lg text-gray-300 mt-4">
                - Tumche SHREE🐵💕
              </p>
            </div>
            
            <button
              onClick={() => setShowConfession(false)}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full font-bold shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-pink-400"
            >
              Back to Message
            </button>
          </div>
        </div>
      )}
      
      {/* Top Section: The Message - Full width */}
      <div className="flex-1 flex flex-col justify-center space-y-8 overflow-y-auto px-4 py-2">
        
        <div className="relative text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="text-6xl animate-bounce-slow">🐵💖</div>
        </div>

        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-300 drop-shadow-lg text-center leading-tight px-2">
          A Few Things This Monkey Likes About You🙂
        </h2>

        {/* Typewriter Message Area - Full width */}
        <div className="space-y-8 text-lg leading-relaxed min-h-[300px]">
          {typewriterLines.map((line, index) => (
            <div 
              key={index}
              className={`p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-500 ${
                index === currentTypewriterLine ? "scale-[1.02] border-pink-500/30" : ""
              }`}
            >
              <p className="text-xl text-white">
                {line}
                {index === currentTypewriterLine && isTyping && (
                  <span className="ml-1 animate-pulse">|</span>
                )}
              </p>
            </div>
          ))}
          
          {/* Show typing indicator if not all lines are typed */}
          {isTyping && typewriterLines.length < typewriterMessageLines.length && (
            <div className="flex items-center gap-2 text-pink-300">
              <div className="text-xl">🖋️</div>
              <div className="text-lg animate-pulse">Writing something special...</div>
            </div>
          )}
          
          {/* All lines typed - show completion message */}
          {!isTyping && typewriterLines.length === typewriterMessageLines.length && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-md border border-green-500/30 shadow-xl animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="text-3xl">✨</div>
                <p className="text-xl text-white">
                  That's all from my heart... for now 💗
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Kisses and Buttons - Fixed */}
      <div className="mt-auto pt-6 space-y-6 pb-4 w-full px-2">
        
        {/* Virtual Kisses Section */}
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-300 drop-shadow-lg mb-4">
            💋 SEND ME VIRTUAL KISSES! 💋
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleKissClick}
              className="text-6xl animate-bounce hover:scale-125 transition-transform duration-200 hover:text-rose-500"
            >
              💋
            </button>
            <div className="text-left">
              <p className="text-lg text-gray-300">
                Kisses collected:{" "}
                <span className="text-2xl font-bold text-pink-300">
                  {kissCount}
                </span>
              </p>
              <p className="text-sm text-pink-200">
                {kissCount >= 20 ? "💝 Okay… confession unlocked 💝" : 
                 kissCount >= 15 ? "😄 Are you trying to make me fall for you?" : 
                 kissCount >= 10 ? "💗 You're making this monkey blush" : 
                 kissCount >= 5 ? "🙂 Okay… I'm smiling now" : 
                 "🥰 Send more kisses!"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center px-4">
          <button
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPage(1);
            }}
          >
            ← Go Back
          </button>
          <button
            className="px-8 py-4 bg-gradient-to-r from-white to-gray-300 text-gray-900 rounded-full font-bold shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/50 drop-shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              setShowGallery(true);
            }}
          >
            Close & Cuddle
          </button>
        </div>
      </div>
    </div>
  );

  if (showGallery) {
    return (
      <div className="fixed inset-0 z-[100] overflow-hidden">
        {/* Valentine Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
          {/* Animated Hearts Background */}
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-float-valentine text-pink-200/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 30 + 20}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
              }}
            >
              {Math.random() > 0.5 ? "❤️" : "💖"}
            </div>
          ))}
          
          {/* Floating Sparkles */}
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-twinkle text-yellow-300/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 10 + 10}px`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
          {/* Header - On Top */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl mb-4">
              Our Memories Gallery 💕
            </h2>
            <p className="text-2xl md:text-3xl text-rose-700 font-medium drop-shadow-lg">
              Some moments are small, but they stay in heart forever 📸✨
            </p>
            <p className="text-lg text-pink-600 mt-4 italic">
              - With love from your Shree 🐒💖
            </p>
          </div>

          {/* Photo Grid - Bigger Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-4 overflow-y-auto max-h-[60vh] pb-8">
            {galleryPhotos.map((src, i) => (
              <div
                key={i}
                className="relative group animate-gallery-float"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {/* Photo Container */}
                <div className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl border-8 border-white/90 backdrop-blur-sm">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-red-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                  
                  {/* Photo */}
                  <img
                    src={src}
                    alt={`Memory ${i + 1}`}
                    className="w-full h-full object-cover relative z-10"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex flex-col justify-end p-6">
                    <div className="text-white text-center">
                      <p className="text-2xl font-bold mb-2">Memory #{i + 1}</p>
                      <p className="text-sm opacity-90">A moment I'll always cherish 💝</p>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 text-white text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                    ❤️
                  </div>
                  <div className="absolute top-4 right-4 text-white text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                    ✨
                  </div>
                </div>
                
                {/* Floating Label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full shadow-lg border-2 border-white/50 whitespace-nowrap text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500">
                  Click to view larger
                </div>
              </div>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="flex gap-6 mt-12">
            <button
              onClick={() => setShowGallery(false)}
              className="relative group px-8 py-3 bg-gradient-to-r from-white to-gray-100 text-gray-800 rounded-full font-bold shadow-xl hover:scale-105 transition-all duration-300 border-2 border-white/80 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <X size={24} />
                Close Gallery
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button
              onClick={() => {
                setIsOpen(false);
                setShowGallery(false);
                setCurrentPage(1);
              }}
              className="relative group px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full font-bold shadow-xl hover:scale-105 transition-all duration-300 border-2 border-pink-400/50 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                💌 Back to Card
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Decorative Bottom Text */}
          <div className="mt-12 text-center">
            <p className="text-lg text-rose-700/70 font-medium">
              Each photo holds a memory, each memory holds my heart 💗
            </p>
            <p className="text-sm text-pink-600/60 mt-2">
              - Every moment with you is special -
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden transition-colors duration-1000 ${isNightMode ? "dark" : ""}`}
      onMouseMove={handleMouseMove}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 transition-colors duration-1000" />

      {/* Night mode overlay controlled by panda position */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: nightOpacity }}
      />

      {/* Floating background bamboo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className={`absolute animate-float transition-colors duration-1000 ${nightOpacity > 0.5 ? "text-green-500/30" : "text-green-600/20"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
            }}
          >
            🎋
          </div>
        ))}
      </div>

      {/* Night sky stars */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity: nightOpacity }}
      >
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="absolute text-yellow-200/80 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 6 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Running Panda */}
      {pandaRunning && (
        <div
          className="fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-75"
          style={{ left: `${pandaPosition}%` }}
        >
          <div className="text-8xl animate-panda-run">🐼</div>
          <div className="flex gap-2 absolute -bottom-2 left-10">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="text-xl text-green-500/60 animate-dust rotate-12"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                🍃
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Peekaboo Panda */}
      {peekPanda && !isOpen && introStep < 4 && (
        <div className="fixed bottom-10 right-10 text-7xl animate-peek z-40 hover:scale-110 transition-transform duration-300 cursor-pointer">
          🐼
        </div>
      )}

      {/* Intro Messages Display */}
      {introStep >= 1 && introStep < 4 && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-30 max-w-lg w-full px-4 text-center">
          {introStep === 1 && (
            <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] animate-slide-up">
              From your Monkey 🐒 to my favorite Panda 🐼
            </p>
          )}
          {introStep === 2 && (
            <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] animate-slide-up">
              Talking to you makes my days brighter 🙂
            </p>
          )}
          {introStep === 3 && (
            <p className="text-2xl md:text-3xl font-bold text-pink-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] animate-slide-up">
              Some stories begin very quietly… 💗
            </p>
          )}
        </div>
      )}

      {/* Love Bubble */}
      {showLoveBubble && (
        <div
          ref={loveBubbleRef}
          className="fixed z-50 animate-love-bubble pointer-events-none"
        >
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full shadow-lg border border-white/20 text-lg font-bold">
            Mwah! 💋 Love Received!
          </div>
        </div>
      )}

      {/* Floating Hearts & Bamboo Animation */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed top-0 pointer-events-none z-20 animate-float-up"
          style={{
            left: `${heart.x}%`,
            animationDelay: `${heart.id * 0.2}s`,
          }}
        >
          <div className="text-green-500/60 text-xl rotate-12">
            {Math.random() > 0.7 ? "🎋" : "🍃"}
          </div>
        </div>
      ))}

      {/* Cursor hearts when open */}
      {cursorHearts.map((h) => (
        <div
          key={h.id}
          className="fixed pointer-events-none animate-cursor-heart z-40"
          style={{
            left: h.x - 12,
            top: h.y - 12,
          }}
        >
          {Math.random() > 0.5 ? "❤️" : "🐼"}
        </div>
      ))}

      {/* Main */}
      <main
        className={`flex-1 flex items-center justify-center p-4 relative z-10 transition-all duration-700 ${showCard ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="max-w-4xl w-full flex flex-col items-center gap-10">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1
              className={`text-5xl md:text-6xl font-bold transition-colors duration-1000 ${nightOpacity > 0.5 ? "text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" : "bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent"}`}
            >
              Happy Valentine's Day
            </h1>
            <p
              className={`text-lg md:text-xl transition-colors duration-1000 ${nightOpacity > 0.5 ? "text-gray-200 font-medium drop-shadow-md" : "text-gray-600"}`}
            >
              To the one who quietly became very special to this Monkey 🫠💗
            </p>
          </div>

          {/* Card */}
          <div className="relative w-full max-w-lg h-[720px] cursor-pointer perspective-1000 group">
            <div
              className={`absolute inset-0 bg-gray-800/20 dark:bg-white/20 rounded-3xl blur-xl transition-all duration-500 ${isOpen ? "scale-105" : "group-hover:scale-105"}`}
            />

            <div
              className={`relative w-full h-full transition-all duration-[1200ms] preserve-3d ${isOpen ? "rotate-y-180" : ""}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-[#f8f8f8] to-[#eeeeee] dark:from-gray-900/90 dark:to-black/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center backface-hidden border-4 border-gray-200 dark:border-gray-700 transition-colors duration-1000 ${isOpen ? "opacity-0" : "opacity-100"}`}
              >
                <div className="absolute top-6 left-6 text-3xl opacity-20">
                  🐼
                </div>
                <div className="absolute bottom-6 right-6 text-3xl opacity-20">
                  🎋
                </div>
                <div className="absolute inset-8 rounded-2xl border-2 border-green-400/20 pointer-events-none" />

                <div className="relative mb-8">
                  <div className="relative">
                    <div className="w-44 h-44 rounded-full border-4 border-gray-300 dark:border-gray-700 p-4">
                      <div
                        className="w-full h-full rounded-full border-4 border-transparent transition-all duration-300"
                        style={{
                          background: `conic-gradient(#ec4899 ${unlockProgress * 3.6}deg, rgba(236, 72, 153, 0.1) 0deg)`,
                        }}
                      >
                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center shadow-inner">
                          <button
                            onClick={handleUnlockClick}
                            className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                              isUnlocking
                                ? "bg-gradient-to-br from-pink-500 to-rose-500 scale-110 animate-pulse"
                                : "bg-gradient-to-br from-gray-100 to-white dark:from-gray-700 dark:to-gray-800 hover:scale-105 hover:shadow-xl"
                            }`}
                            disabled={unlockProgress >= 100}
                          >
                            <div className="relative">
                              {unlockProgress >= 100 ? (
                                <>
                                  <Unlock
                                    className="text-pink-500 dark:text-pink-400"
                                    size={40}
                                  />
                                  <div className="absolute -inset-4 bg-pink-500/20 rounded-full blur-xl" />
                                </>
                              ) : (
                                <>
                                  <Lock
                                    className="text-gray-600 dark:text-gray-300"
                                    size={40}
                                  />
                                  <div className="absolute -inset-4 bg-gray-400/10 rounded-full blur-xl" />
                                </>
                              )}
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>

                    {unlockProgress < 100 && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-lg border border-gray-300 dark:border-gray-600">
                          {isUnlocking
                            ? "Opening something special..."
                            : "Click to discover a small secret"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white drop-shadow-sm">
                  Panda's Heart Locked
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-2 font-medium">
                  Opens only for my special samuu🙂💝
                </p>
                <p className="text-sm bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent font-bold">
                  {unlockProgress >= 100
                    ? "Access Granted! ❤️"
                    : `Heart Unlock: ${unlockProgress}%`}
                </p>
              </div>

              {/* Inside */}
              <div
                className={`absolute inset-0 rounded-3xl shadow-2xl p-10 flex flex-col items-center justify-center backface-hidden rotate-y-180 border-4 transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
                style={{
                  background:
                    currentPage === 1
                      ? "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)"
                      : "linear-gradient(135deg, #000000 0%, #0f0f0f 50%, #000000 100%)",
                  borderColor:
                    currentPage === 1
                      ? "rgba(255, 105, 180, 0.2)"
                      : "rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 text-3xl opacity-20">
                  🎋
                </div>
                <div className="absolute bottom-4 left-4 text-3xl opacity-20">
                  🐼
                </div>

                {/* Heart burst animation */}
                {hearts.map((heart) => (
                  <div
                    key={heart}
                    className="absolute animate-heart-burst"
                    style={{
                      left: "50%",
                      top: "50%",
                      animationDelay: `${heart * 25}ms`,
                      fontSize: `${18 + Math.random() * 25}px`,
                      color: Math.random() > 0.5 ? "#ff69b4" : "#00ff88",
                    }}
                  >
                    {Math.random() > 0.5 ? "💖" : "🎋"}
                  </div>
                ))}

                <div className="relative">
                  <div className="absolute -inset-4 bg-pink-500/10 rounded-full blur-xl opacity-30 animate-ping-slow" />
                  <div className="text-6xl mb-4 animate-heartbeat">
                    {currentPage === 1 ? "🐼🐒" : "💋🌟"}
                  </div>
                </div>

                {currentPage === 1 ? renderPage1() : renderPage2()}
              </div>
            </div>
          </div>

          {/* Text below card - Only show before unlocking */}
          {!isOpen && introStep === 4 && (
            <div className="text-center space-y-3 animate-fade-in">
              <p
                className={`text-2xl md:text-3xl font-bold transition-colors duration-1000 ${nightOpacity > 0.5 ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" : "text-gray-800"}`}
              >
                🎋 Hold the lock to discover a small surprise
              </p>
              <p
                className={`text-lg md:text-xl transition-colors duration-1000 ${nightOpacity > 0.5 ? "text-pink-200 font-medium drop-shadow-sm" : "text-gray-600"}`}
              >
                Talking to you is my favorite kind of distraction 🌙🙂
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 dark:text-gray-200 text-sm relative z-10 transition-colors duration-1000">
        <p className="font-medium">Made with 💖 for us samushree 🫶</p>
      </footer>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-25px) rotate(10deg);
            opacity: 0.6;
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0.3) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up 5s ease-out forwards;
        }

        @keyframes float-valentine {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(30px, -50px) rotate(10deg) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translate(10px, -80px) rotate(5deg) scale(1.2);
            opacity: 0.4;
          }
          75% {
            transform: translate(-20px, -60px) rotate(-5deg) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
        }
        .animate-float-valentine {
          animation: float-valentine 15s ease-in-out infinite;
        }

        @keyframes gallery-float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(1deg);
          }
          66% {
            transform: translateY(-8px) rotate(-1deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        .animate-gallery-float {
          animation: gallery-float 8s ease-in-out infinite;
        }

        @keyframes panda-run {
          0%,
          100% {
            transform: translateY(0) rotate(-5deg);
          }
          50% {
            transform: translateY(-12px) rotate(5deg);
          }
        }
        .animate-panda-run {
          animation: panda-run 0.25s infinite;
        }

        @keyframes dust {
          0% {
            transform: translateX(0) scale(1) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translateX(-40px) scale(0.2) rotate(180deg);
            opacity: 0;
          }
        }
        .animate-dust {
          animation: dust 0.5s infinite;
        }

        @keyframes heart-burst {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
                calc(-50% + ${(Math.random() - 0.5) * 350}px),
                calc(-50% + ${(Math.random() - 0.5) * 350}px)
              )
              scale(0);
            opacity: 0;
          }
        }
        .animate-heart-burst {
          animation: heart-burst 1.4s forwards;
        }

        @keyframes peek {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-peek {
          animation: peek 2s infinite;
        }

        @keyframes cursor-heart {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -90px) scale(0.2);
            opacity: 0;
          }
        }
        .animate-cursor-heart {
          animation: cursor-heart 1.2s forwards;
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1.15);
          }
          75% {
            transform: scale(1.1);
          }
        }
        .animate-heartbeat {
          animation: heartbeat 1.4s infinite;
        }

        @keyframes slide-up {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        @keyframes scale-up {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-up {
          animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes love-bubble {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(-10deg);
            opacity: 0;
          }
          20% {
            transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
            opacity: 1;
          }
          40% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          80% {
            transform: translate(-50%, -120px) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -150px) scale(0.5);
            opacity: 0;
          }
        }
        .animate-love-bubble {
          animation: love-bubble 1.5s ease-out forwards;
          left: 50%;
          top: 50%;
        }

        @keyframes ping-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.3;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        @keyframes typewriter-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}