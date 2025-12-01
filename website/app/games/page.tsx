"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight, RefreshCw, Check, Star, Shuffle } from "lucide-react";
import { TITLES, GESTURES } from "@/lib/data";

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
            단어 카드
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
            짝 맞추기
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
  const [deck, setDeck] = useState(TITLES);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Derived state for the current list of cards to show
  const currentDeck = showFavoritesOnly
    ? deck.filter(item => favorites.has(item.title))
    : deck;

  const currentCard = currentDeck[currentIndex];

  const nextCard = () => {
    if (currentDeck.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % currentDeck.length);
  };

  const prevCard = () => {
    if (currentDeck.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + currentDeck.length) % currentDeck.length);
  };

  const handleShuffle = () => {
    setDeck([...TITLES].sort(() => 0.5 - Math.random()));
    setDirection(0);
    setCurrentIndex(0);
  };

  const toggleShowFavorites = () => {
    setShowFavoritesOnly(prev => !prev);
    setCurrentIndex(0);
    setDirection(0);
  };

  const toggleFavorite = (title: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(title)) {
        newFavorites.delete(title);
      } else {
        newFavorites.add(title);
      }
      return newFavorites;
    });
  };

  const isCurrentFavorite = currentCard ? favorites.has(currentCard.title) : false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-8"
    >
      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors shadow-sm cursor-pointer text-sm font-medium"
        >
          <Shuffle size={16} />
          <span>섞기</span>
        </button>
        <button
          onClick={toggleShowFavorites}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 border rounded-full transition-colors shadow-sm cursor-pointer text-sm font-medium",
            showFavoritesOnly
              ? "bg-primary/10 border-primary text-primary"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-primary"
          )}
        >
          <Star size={16} className={showFavoritesOnly ? "fill-primary" : ""} />
          <span>즐겨찾기만 보기 ({favorites.size})</span>
        </button>
      </div>

      {currentDeck.length > 0 ? (
        <>
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
                  key={`${currentCard.title}-${currentIndex}`} // Ensure unique key for animation
                  front={currentCard.title}
                  back={currentCard.situation}
                  direction={direction}
                  isFavorite={isCurrentFavorite}
                  onToggleFavorite={() => toggleFavorite(currentCard.title)}
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
            {currentIndex + 1} / {currentDeck.length}
          </p>
        </>
      ) : (
        <div className="h-[32rem] flex flex-col items-center justify-center text-gray-400 gap-4">
          <Star size={48} className="text-gray-300" />
          <p>선택된 즐겨찾기가 없습니다.</p>
          <button
            onClick={toggleShowFavorites}
            className="text-primary hover:underline"
          >
            모든 카드 보기
          </button>
        </div>
      )}
    </motion.div>
  );
}

function Flashcard({
  front,
  back,
  direction,
  isFavorite,
  onToggleFavorite
}: {
  front: string;
  back: string;
  direction: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -50 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-full cursor-pointer group"
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10 cursor-pointer"
          >
            <Star
              size={24}
              className={clsx(
                "transition-colors",
                isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
              )}
            />
          </button>
          <span className="text-lg text-primary font-bold mb-6 uppercase tracking-wider">호칭</span>
          <span className="text-5xl font-bold text-gray-800 whitespace-pre-line leading-relaxed">{front}</span>
          <span className="absolute bottom-8 text-gray-400 text-base">Click to flip</span>
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full backface-hidden bg-primary/10 rounded-3xl shadow-lg border-2 border-primary flex flex-col items-center justify-center p-8"
          style={{ transform: "rotateY(180deg)" }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/50 transition-colors z-10 cursor-pointer"
          >
            <Star
              size={24}
              className={clsx(
                "transition-colors",
                isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400 hover:text-yellow-400"
              )}
            />
          </button>
          <span className="text-lg text-primary-dark font-bold mb-6 uppercase tracking-wider">상황</span>
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



// ... existing imports ...

function MatchingGame() {
  const [gameType, setGameType] = useState<'titles' | 'gestures'>('titles');
  const [leftItems, setLeftItems] = useState<MatchingItem[]>([]);
  const [rightItems, setRightItems] = useState<MatchingItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<Set<string>>(new Set());

  const startNewGame = useCallback((typeOverride?: 'titles' | 'gestures') => {
    const currentType = typeOverride || gameType;
    const dataSource = currentType === 'titles' ? TITLES : GESTURES;

    // 1. Shuffle and pick 5 random items
    const shuffled = [...dataSource].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    // 2. Create left (Korean) and right (English/Meaning) items
    // Left: Title/Gesture (Korean)
    // Right: Situation/Meaning (English/Description)
    const left: MatchingItem[] = selected.map((item, idx) => ({
      id: `left-${idx}`,
      text: item.title, // Korean Title or Gesture Name
      type: 'situation', // Keeping type name for consistency with logic, but represents Left Column
      matchId: `pair-${idx}`,
    }));

    const right: MatchingItem[] = selected.map((item, idx) => ({
      id: `right-${idx}`,
      text: 'situation' in item ? item.situation : item.meaning, // English Situation or Meaning
      type: 'title', // Keeping type name for consistency with logic, but represents Right Column
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
  }, [gameType]);

  // Initial game start
  useEffect(() => {
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-reset when all pairs are matched
  useEffect(() => {
    if (leftItems.length > 0 && matchedPairs.size === leftItems.length) {
      const timer = setTimeout(() => {
        startNewGame();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [matchedPairs, leftItems.length, startNewGame]);

  const handleTypeChange = (newType: 'titles' | 'gestures') => {
    setGameType(newType);
    startNewGame(newType);
  };

  const handleCardClick = (item: MatchingItem) => {
    if (matchedPairs.has(item.matchId) || wrongPair.size > 0) return;

    if (item.type === 'situation') { // Left column
      setSelectedLeft(item.id === selectedLeft ? null : item.id);
      // Check match if right is selected
      if (selectedRight) {
        checkMatch(item.id, selectedRight);
      }
    } else { // Right column
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
      <div className="flex justify-between items-center">
        {/* Game Type Toggle */}
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => handleTypeChange('titles')}
            className={clsx(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer",
              gameType === 'titles'
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            호칭
          </button>
          <button
            onClick={() => handleTypeChange('gestures')}
            className={clsx(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer",
              gameType === 'gestures'
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            몸짓 언어
          </button>
        </div>
        <button
          onClick={() => startNewGame()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors shadow-sm cursor-pointer"
        >
          <RefreshCw size={18} />
          <span>New Game</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8 md:gap-12">
        {/* Left Column (Korean: Title/Gesture) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-500 mb-4">
            {gameType === 'titles' ? '호칭' : '제스처'}
          </h3>
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

        {/* Right Column (English: Situation/Meaning) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-500 mb-4">
            {gameType === 'titles' ? '상황' : '의미'}
          </h3>
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
        "p-4 rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center min-h-[80px] gap-3",
        isMatched
          ? "bg-primary/10 border-primary text-primary-dark opacity-50 cursor-default"
          : isWrong
            ? "bg-red-50 border-red-400 text-red-600 shadow-sm"
            : isSelected
              ? "bg-primary/5 border-primary shadow-md ring-2 ring-primary/20"
              : "bg-white border-gray-100 hover:border-primary/50 hover:shadow-sm text-gray-700"
      )}
    >
      <div className="flex items-center gap-3 text-center">
        {isMatched && <Check size={18} className="text-primary shrink-0" />}
        <span className={clsx("font-medium", isMatched && "line-through")}>
          {item.text}
        </span>
      </div>
    </motion.div>
  );
}
