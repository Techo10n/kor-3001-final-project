"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight, RefreshCw, Check } from "lucide-react";
import { TITLES } from "@/lib/data";

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'matching'>('flashcards');

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-center">
      {/* Tab Selector */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1.5 rounded-full inline-flex gap-1">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={clsx(
              "px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer",
              activeTab === 'flashcards'
                ? "bg-white text-primary shadow-sm scale-105"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            )}
          >
            단어 카드 (Flashcards)
          </button>
          <button
            onClick={() => setActiveTab('matching')}
            className={clsx(
              "px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer",
              activeTab === 'matching'
                ? "bg-white text-primary shadow-sm scale-105"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            )}
          >
            짝 맞추기 (Matching)
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'flashcards' ? (
          <FlashcardGame key="flashcards" />
        ) : (
          <MatchingGame key="matching" />
        )}
      </AnimatePresence>
    </div>
  );
}

function FlashcardGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextCard = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TITLES.length);
  };

  const prevCard = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TITLES.length) % TITLES.length);
  };

  const currentCard = TITLES[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-8"
    >
      <div className="flex items-center gap-8 w-full justify-center">
        <button
          onClick={prevCard}
          className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="w-full max-w-3xl h-[32rem] perspective-1000">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <Flashcard
              key={currentIndex}
              front={currentCard.title}
              back={currentCard.situation}
              direction={direction}
            />
          </AnimatePresence>
        </div>

        <button
          onClick={nextCard}
          className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <p className="text-gray-500 font-medium">
        {currentIndex + 1} / {TITLES.length}
      </p>
    </motion.div>
  );
}

function Flashcard({ front, back, direction }: { front: string; back: string; direction: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -50 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="w-full h-full relative transform-style-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-lg border-2 border-primary/20 flex flex-col items-center justify-center p-8">
          <span className="text-lg text-primary font-bold mb-6 uppercase tracking-wider">호칭 (Title)</span>
          <span className="text-5xl font-bold text-gray-800 whitespace-pre-line leading-relaxed">{front}</span>
          <span className="absolute bottom-8 text-gray-400 text-base">Click to flip</span>
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full backface-hidden bg-primary/10 rounded-3xl shadow-lg border-2 border-primary flex flex-col items-center justify-center p-8"
          style={{ transform: "rotateY(180deg)" }}
        >
          <span className="text-lg text-primary-dark font-bold mb-6 uppercase tracking-wider">상황 (Situation)</span>
          <span className="text-3xl font-medium text-gray-800">{back}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

type MatchingItem = {
  id: string;
  text: string;
  type: 'situation' | 'title';
  matchId: string;
};

function MatchingGame() {
  const [leftItems, setLeftItems] = useState<MatchingItem[]>([]);
  const [rightItems, setRightItems] = useState<MatchingItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<Set<string>>(new Set());

  const startNewGame = useCallback(() => {
    // 1. Shuffle and pick 5 random items
    const shuffled = [...TITLES].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    // 2. Create left (situation) and right (title) items
    const left: MatchingItem[] = selected.map((item, idx) => ({
      id: `left-${idx}`,
      text: item.situation,
      type: 'situation',
      matchId: `pair-${idx}`,
    }));

    const right: MatchingItem[] = selected.map((item, idx) => ({
      id: `right-${idx}`,
      text: item.title,
      type: 'title',
      matchId: `pair-${idx}`,
    }));

    // 3. Shuffle right items
    const shuffledRight = [...right].sort(() => 0.5 - Math.random());

    setLeftItems(left);
    setRightItems(shuffledRight);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairs(new Set());
    setWrongPair(new Set());
  }, []);

  // Initial game start
  useEffect(() => {
    const timer = setTimeout(() => {
      startNewGame();
    }, 0);
    return () => clearTimeout(timer);
  }, [startNewGame]);

  const handleCardClick = (item: MatchingItem) => {
    if (matchedPairs.has(item.matchId) || wrongPair.size > 0) return;

    if (item.type === 'situation') {
      setSelectedLeft(item.id === selectedLeft ? null : item.id);
      // Check match if right is selected
      if (selectedRight) {
        checkMatch(item.id, selectedRight);
      }
    } else {
      setSelectedRight(item.id === selectedRight ? null : item.id);
      // Check match if left is selected
      if (selectedLeft) {
        checkMatch(selectedLeft, item.id);
      }
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    const leftItem = leftItems.find(i => i.id === leftId);
    const rightItem = rightItems.find(i => i.id === rightId);

    if (leftItem && rightItem && leftItem.matchId === rightItem.matchId) {
      // Match!
      setMatchedPairs(prev => new Set(prev).add(leftItem.matchId));
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      // No match - show error state then clear
      setWrongPair(new Set([leftId, rightId]));
      setTimeout(() => {
        setWrongPair(new Set());
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex justify-end">
        <button
          onClick={startNewGame}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors shadow-sm cursor-pointer"
        >
          <RefreshCw size={18} />
          <span>New Game</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8 md:gap-12">
        {/* Left Column (Situations) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-500 mb-4">상황 (Situation)</h3>
          {leftItems.map((item) => {
            const isSelected = selectedLeft === item.id;
            const isMatched = matchedPairs.has(item.matchId);
            const isWrong = wrongPair.has(item.id);
            return (
              <MatchingCard
                key={item.id}
                item={item}
                isSelected={isSelected}
                isMatched={isMatched}
                isWrong={isWrong}
                onClick={() => handleCardClick(item)}
              />
            );
          })}
        </div>

        {/* Right Column (Titles) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-500 mb-4">호칭 (Title)</h3>
          {rightItems.map((item) => {
            const isSelected = selectedRight === item.id;
            const isMatched = matchedPairs.has(item.matchId);
            const isWrong = wrongPair.has(item.id);
            return (
              <MatchingCard
                key={item.id}
                item={item}
                isSelected={isSelected}
                isMatched={isMatched}
                isWrong={isWrong}
                onClick={() => handleCardClick(item)}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function MatchingCard({
  item,
  isSelected,
  isMatched,
  isWrong,
  onClick
}: {
  item: MatchingItem;
  isSelected: boolean;
  isMatched: boolean;
  isWrong: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      whileHover={!isMatched && !isWrong ? { scale: 1.02 } : {}}
      whileTap={!isMatched && !isWrong ? { scale: 0.98 } : {}}
      onClick={onClick}
      animate={isWrong ? { x: [-5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.4 }}
      className={clsx(
        "p-4 rounded-xl border-2 cursor-pointer flex items-center justify-center min-h-[80px]",
        isMatched
          ? "bg-primary/10 border-primary text-primary-dark opacity-50 cursor-default"
          : isWrong
            ? "bg-red-50 border-red-400 text-red-600 shadow-sm"
            : isSelected
              ? "bg-primary/5 border-primary shadow-md ring-2 ring-primary/20"
              : "bg-white border-gray-100 hover:border-primary/50 hover:shadow-sm text-gray-700"
      )}
    >
      <div className="flex items-center gap-3">
        {isMatched && <Check size={18} className="text-primary" />}
        <span className={clsx("font-medium", isMatched && "line-through")}>
          {item.text}
        </span>
      </div>
    </motion.div>
  );
}
