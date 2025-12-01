"use client";

import { motion } from "framer-motion";
import { MessageCircle, Hand, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-primary-dark">
          호칭과 몸짓 언어
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          한국어의 호칭과 몸짓 언어를 어려운데, 같이 재미있게 배워보세요!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl"
      >
        <FeatureCard
          icon={<MessageCircle size={48} />}
          title="호칭"
          description="상대방을 부르는 올바른 방법을 알아보세요."
          color="bg-primary/20"
          href="/learn"
        />
        <FeatureCard
          icon={<Hand size={48} />}
          title="몸짓 언어"
          description="손짓과 몸짓이 가진 의미를 배워보세요."
          color="bg-secondary/40"
          href="/learn?tab=gestures"
        />
        <FeatureCard
          icon={<Users size={48} />}
          title="연습하기"
          description="게임을 통해 배운 내용을 복습해보세요."
          color="bg-accent/30"
          href="/games"
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  href: string;
}) {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`p-8 rounded-2xl ${color} h-full flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
      >
        <div className="text-gray-700">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    </Link>
  );
}
