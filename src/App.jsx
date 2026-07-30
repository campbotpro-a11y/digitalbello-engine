import { useState, useCallback } from "react";

const apiKey = import.meta.env.VITE_GROK_API_KEY || "";

const BRAND = {
  positioning: "The beginner-friendly AI opportunity guide for anyone who wants to earn online using AI and smartphones",
  audience: "Global beginners aged 18–35, mobile-first, curious about AI income, low technical experience",
  tone: "Relatable, practical, conversational, empowering — not corporate",
  competitors: ["Justin Welsh", "Dan Koe", "Rowan Cheung", "Alex Hormozi"],
  contentPillars: ["AI Tools", "AI Income", "Beginner Education", "Mindset", "Proof & Results"],
};

const TYPES = [
  { id: "authority",  label: "Authority Post",     icon: "⚡", color: "#FF6B35" },
  { id: "story",      label: "Story / Case Study", icon: "📖", color: "#7C3AED" },
  { id: "list",       label: "List / Carousel",    icon: "📋", color: "#0EA5E9" },
  { id: "tutorial",   label: "Tutorial",           icon: "🎓", color: "#10B981" },
  { id: "reel",       label: "Reel Script",        icon: "🎬", color: "#F59E0B" },
  { id: "hidden",     label: "Hidden Resources",   icon: "🔍", color: "#EC4899" },
  { id: "contrarian", label: "Contrarian Take",    icon: "🔥", color: "#EF4444" },
  { id: "mindset",    label: "Mindset Post",       icon: "🧠", color: "#8B5CF6" },
];

const DAILY_TOPICS = [
  { hook: "Learn AI from ZERO. For FREE.\nIn just 30 days?\nHere is the exact roadmap 👇", theme: "30-day AI beginner roadmap" },
  { hook: "🚨 BREAKING: Claude can now map out a full month of posts in a single conversation.\nNo more guessing what to post next.\n7 PROMPTS INSIDE ⬇️", theme: "Claude prompts for content creators" },
  { hook: "BREAKING: Claude can now build your side hustle a WEBSITE that looks professional. For free. 🤑\nSteal these prompts 👇", theme: "Claude website-building prompts" },
  { hook: "Turn Claude Into Your Personal Life OS!\n7 Prompts To Organize Your Goals, Habits, Schedule, Tasks, and Digital Life 👇", theme: "Claude life organisation prompts" },
  { hook: "200 REEL IDEAS so you never run out of content (2026 Edition) 👇", theme: "200 reel ideas for AI creators" },
  { hook: "11 AI Tools for Building a One-Person AI Company 👇", theme: "AI tools for solo entrepreneurs" },
  { hook: "🚨 BREAKING: Claude can now teach you the foundations of ANY skill for free.\nHere are 8 prompts to master REAL Skills Fast 👇", theme: "Claude skill-learning prompts" },
  { hook: "I gave ChatGPT $0 and 20 minutes.\nHere is the digital product it helped me build from scratch 👇", theme: "Build a digital product with ChatGPT" },
  { hook: "5 free AI websites that feel too powerful to be legal.\nThey replace tools that cost $100/month 👇", theme: "5 free AI tools replacing paid software" },
  { hook: "Most people use ChatGPT wrong.\nHere is the one shift that changes everything 👇", theme: "ChatGPT prompt strategy for beginners" },
  { hook: "AI will not replace you.\nBut someone who learned THIS skill this weekend might 👇", theme: "Future of work and AI opportunity" },
  { hook: "13 TOP VIRAL AI TOOLS & TIPS this week ✅\nSave this before you scroll 👇", theme: "Weekly viral AI tools roundup" },
  { hook: "7 ChatGPT prompts that replace tools people pay $50/month for.\nSave this before you scroll 👇", theme: "ChatGPT prompts replacing paid tools" },
  { hook: "If you have a smartphone and internet, you already have everything you need.\nHere is the honest beginner roadmap 👇", theme: "Smartphone-only beginner AI income roadmap" },
  { hook: "Claude can now edit your video after installing these 7 tools.\nHere is exactly how 👇", theme: "Claude AI video editing setup" },
  { hook: "BREAKING: Claude can now write, design, and launch your digital product in one afternoon.\nHere are the exact steps 👇", theme: "Launch a digital product with Claude" },
  { hook: "Stop buying courses.\nThese 6 free AI tools will teach you more in 7 days than most courses teach in 3 months 👇", theme: "Free AI tools that replace paid courses" },
  { hook: "I asked ChatGPT to train my mind like a millionaire.\nHere is what it said 👇", theme: "ChatGPT mindset and discipline prompts" },
  { hook: "Seedance 2.0 Video Prompt Writing Guide 👇\nCreate scroll-stopping videos with these exact structures", theme: "AI video prompt writing guide" },
  { hook: "The internet changed the rules.\nHere are 5 AI income streams anyone can start with zero experience 👇", theme: "5 beginner AI income streams" },
  { hook: "Nobody tells you this about ChatGPT.\nBut it is the most powerful thing it can do 👇", theme: "Hidden ChatGPT feature for beginners" },
  { hook: "Google is not promoting these websites.\nBecause they replace tools people pay for.\n7 free AI sites inside 👇", theme: "7 hidden free AI websites" },
  { hook: "You do not need a job.\nYou need a digital product.\nHere is how to build one in 24 hours 👇", theme: "Build and sell a digital product fast" },
  { hook: "20 Books That Will Rewire How You Think About Money 👇\nAI summary of each inside", theme: "AI summaries of money mindset books" },
  { hook: "BROKE at 29. STABLE by 35.\nHere is the exact roadmap I wish someone gave me 👇", theme: "Financial turnaround roadmap using AI" },
  { hook: "8 AI tools every freelancer needs in 2026.\nMost people have never heard of #3 👇", theme: "AI tools for freelancers 2026" },
  { hook: "Claude can now be your personal business coach.\n10 prompts to build your strategy from scratch 👇", theme: "Claude as business coach prompts" },
  { hook: "This free AI tool saved me 7 hours this week.\nAnd nobody is talking about it 👇", theme: "Underrated time-saving AI tool" },
  { hook: "What if I told you ChatGPT can write your entire email marketing sequence?\n5 prompts that do it in minutes 👇", theme: "ChatGPT email marketing prompts" },
  { hook: "I tested 10 AI image tools so you do not have to.\nHere are the 3 worth your time 👇", theme: "Best free AI image generation tools" },
  { hook: "The old way of freelancing is dead.\nHere is how AI changed the game for one-person businesses 👇", theme: "AI freelancing strategy for 2026" },
  { hook: "7 prompts that turn Claude into your personal content machine.\nPost every day without burning out 👇", theme: "Claude daily content generation prompts" },
  { hook: "Most beginners waste their first 3 months with AI.\nHere is what to do instead 👇", theme: "Avoid beginner AI mistakes" },
  { hook: "ChatGPT just became the best business partner you never paid for.\n6 prompts that prove it 👇", theme: "ChatGPT as business partner prompts" },
  { hook: "You can now build a landing page with Claude in under 10 minutes.\nNo code. No money. Here is how 👇", theme: "Build a landing page with Claude" },
  { hook: "Transformation video is going viral right now.\nHere is the exact AI prompt that creates it 👇", theme: "Viral transformation video AI prompt" },
  { hook: "100 side hustle ideas powered by AI.\nFiltered for beginners with no money to invest 👇", theme: "100 AI-powered side hustle ideas" },
  { hook: "Claude can now summarise an entire book in 3 minutes.\nHere are 5 prompts to extract only what matters 👇", theme: "Claude book summary prompts" },
  { hook: "It is Monday. Let us start it with a gift.\n6 free AI tools dropping this week that will save you hours 👇", theme: "Monday free AI tools gift post" },
  { hook: "The biggest lie about making money online.\nAnd what actually works in 2026 👇", theme: "Truth about online income in 2026" },
  { hook: "I gave Claude 7 tools and it started editing my videos automatically.\nHere is the exact setup 👇", theme: "Claude automated video editing setup" },
  { hook: "This ChatGPT prompt builds your entire personal brand strategy.\nIn under 5 minutes 👇", theme: "ChatGPT personal brand strategy prompt" },
  { hook: "Passive income with AI is real.\nBut not how most people think.\nHere is the honest breakdown 👇", theme: "Honest AI passive income breakdown" },
  { hook: "The 3-step system I use to create a week of content in 45 minutes.\nAll with free AI tools 👇", theme: "Weekly content system using AI" },
  { hook: "11 ChatGPT prompts that do the work of a full marketing team 👇", theme: "ChatGPT marketing team replacement prompts" },
  { hook: "Your phone is a money-making machine.\nYou just need to know these 5 AI apps 👇", theme: "5 AI apps to earn from your smartphone" },
  { hook: "Claude just became the best copywriter in the world.\nAnd it works for free.\n8 prompts inside 👇", theme: "Claude copywriting prompts" },
  { hook: "The fastest way to learn any AI skill in 2026.\nNo course needed 👇", theme: "Fast AI skill learning system" },
  { hook: "I built an entire online business using only AI tools and my phone.\nHere is exactly what I did 👇", theme: "Full AI-powered online business on mobile" },
  { hook: "What nobody tells you when you start with AI.\nThe truth after 12 months 👇", theme: "Honest 12-month AI journey reflection" },
];

const DAILY_FORMATS = [
  { label: "Prompts List",   color: "#0EA5E9", icon: "📋" },
  { label: "Step-by-Step",  color: "#10B981", icon: "🎓" },
  { label: "Tools Roundup", color: "#EC4899", icon: "🔍" },
  { label: "Mindset Take",  color: "#8B5CF6", icon: "🧠" },
];

const GROK_MODEL = "grok-3-mini-fast";
