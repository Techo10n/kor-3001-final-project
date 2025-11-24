"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { TITLES, GESTURES } from "@/lib/data";

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState<'titles' | 'gestures'>('titles');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tab Selector */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1.5 rounded-full inline-flex gap-1">
          <button
            onClick={() => setActiveTab('titles')}
            className={clsx(
              "px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer",
              activeTab === 'titles'
                ? "bg-white text-primary shadow-sm scale-105"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            )}
          >
            호칭
          </button>
          <button
            onClick={() => setActiveTab('gestures')}
            className={clsx(
              "px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer",
              activeTab === 'gestures'
                ? "bg-white text-primary shadow-sm scale-105"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            )}
          >
            몸짓 언어
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'titles' ? (
          <motion.section
            key="titles"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/20">
                    <th className="p-4 font-bold text-gray-700 w-1/2">상황 (Situation)</th>
                    <th className="p-4 font-bold text-gray-700 w-1/2">호칭 (Title)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {TITLES.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">{item.situation}</td>
                      <td className="p-4 font-bold text-primary whitespace-pre-line">{item.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="gestures"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GESTURES.map((gesture, index) => (
                <GestureCard
                  key={index}
                  title={gesture.title}
                  description={gesture.description}
                  meaning={gesture.meaning}
                />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function GestureCard({
  title,
  description,
  meaning,
}: {
  title: string;
  description: string;
  meaning: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">
        {/* Placeholder for gesture image */}
        <span>이미지 (Image)</span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-primary font-medium mb-2">{meaning}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
