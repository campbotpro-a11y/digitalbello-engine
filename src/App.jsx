import { useState, useCallback } from "react";

/* ── Read API Key from Render Environment ── */
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

/* ── Brand ── */
const BRAND = {
  positioning: "The beginner-friendly AI opportunity guide for anyone who wants to earn online using AI and smartphones",
  audience: "Global beginners aged 18–35, mobile-first, curious about AI income, low technical experience",
  tone: "Relatable, practical, conversational, empowering — not corporate",
  competitors: ["Justin Welsh", "Dan Koe", "Rowan Cheung", "Alex Hormozi"],
  contentPillars: ["AI Tools", "AI Income", "Beginner Education", "Mindset", "Proof & Results"],
};

const TYPES = [
  { id:"authority",  label:"Authority Post",     icon:"⚡", color:"#FF6B35" },
  { id:"story",      label:"Story / Case Study", icon:"📖", color:"#7C3AED" },
  { id:"list",       label:"List / Carousel",    icon:"📋", color:"#0EA5E9" },
  { id:"tutorial",   label:"Tutorial",           icon:"🎓", color:"#10B981" },
  { id:"reel",       label:"Reel Script",        icon:"🎬", color:"#F59E0B" },
  { id:"hidden",     label:"Hidden Resources",   icon:"🔍", color:"#EC4899" },
  { id:"contrarian", label:"Contrarian Take",    icon:"🔥", color:"#EF4444" },
  { id:"mindset",    label:"Mindset Post",       icon:"🧠", color:"#8B5CF6" },
];

/* 50 unique daily topic seeds */
const DAILY_TOPICS = [
  { hook:"Learn AI from ZERO. For FREE.\nIn just 30 days?\nHere is the exact roadmap 👇", theme:"30-day AI beginner roadmap" },
  { hook:"🚨 BREAKING: Claude can now map out a full month of posts in a single conversation.\nNo more guessing what to post next.\n7 PROMPTS INSIDE ⬇️", theme:"Claude prompts for content creators" },
  { hook:"BREAKING: Claude can now build your side hustle a WEBSITE that looks professional. For free. 🤑\nSteal these prompts 👇", theme:"Claude website-building prompts" },
  { hook:"Turn Claude Into Your Personal Life OS!\n7 Prompts To Organize Your Goals, Habits, Schedule, Tasks, and Digital Life 👇", theme:"Claude life organisation prompts" },
  { hook:"200 REEL IDEAS so you never run out of content (2026 Edition) 👇", theme:"200 reel ideas for AI creators" },
  { hook:"11 AI Tools for Building a One-Person AI Company 👇", theme:"AI tools for solo entrepreneurs" },
  { hook:"🚨 BREAKING: Claude can now teach you the foundations of ANY skill for free.\nHere are 8 prompts to master REAL Skills Fast 👇", theme:"Claude skill-learning prompts" },
  { hook:"I gave ChatGPT $0 and 20 minutes.\nHere is the digital product it helped me build from scratch 👇", theme:"Build a digital product with ChatGPT" },
  { hook:"5 free AI websites that feel too powerful to be legal.\nThey replace tools that cost $100/month 👇", theme:"5 free AI tools replacing paid software" },
  { hook:"Most people use ChatGPT wrong.\nHere is the one shift that changes everything 👇", theme:"ChatGPT prompt strategy for beginners" },
  { hook:"AI will not replace you.\nBut someone who learned THIS skill this weekend might 👇", theme:"Future of work and AI opportunity" },
  { hook:"13 TOP VIRAL AI TOOLS & TIPS this week ✅\nSave this before you scroll 👇", theme:"Weekly viral AI tools roundup" },
  { hook:"7 ChatGPT prompts that replace tools people pay $50/month for.\nSave this before you scroll 👇", theme:"ChatGPT prompts replacing paid tools" },
  { hook:"If you have a smartphone and internet, you already have everything you need.\nHere is the honest beginner roadmap 👇", theme:"Smartphone-only beginner AI income roadmap" },
  { hook:"Claude can now edit your video after installing these 7 tools.\nHere is exactly how 👇", theme:"Claude AI video editing setup" },
  { hook:"BREAKING: Claude can now write, design, and launch your digital product in one afternoon.\nHere are the exact steps 👇", theme:"Launch a digital product with Claude" },
  { hook:"Stop buying courses.\nThese 6 free AI tools will teach you more in 7 days than most courses teach in 3 months 👇", theme:"Free AI tools that replace paid courses" },
  { hook:"I asked ChatGPT to train my mind like a millionaire.\nHere is what it said 👇", theme:"ChatGPT mindset and discipline prompts" },
  { hook:"Seedance 2.0 Video Prompt Writing Guide 👇\nCreate scroll-stopping videos with these exact structures", theme:"AI video prompt writing guide" },
  { hook:"The internet changed the rules.\nHere are 5 AI income streams anyone can start with zero experience 👇", theme:"5 beginner AI income streams" },
  { hook:"Nobody tells you this about ChatGPT.\nBut it is the most powerful thing it can do 👇", theme:"Hidden ChatGPT feature for beginners" },
  { hook:"Google is not promoting these websites.\nBecause they replace tools people pay for.\n7 free AI sites inside 👇", theme:"7 hidden free AI websites" },
  { hook:"You do not need a job.\nYou need a digital product.\nHere is how to build one in 24 hours 👇", theme:"Build and sell a digital product fast" },
  { hook:"20 Books That Will Rewire How You Think About Money 👇\nAI summary of each inside", theme:"AI summaries of money mindset books" },
  { hook:"BROKE at 29. STABLE by 35.\nHere is the exact roadmap I wish someone gave me 👇", theme:"Financial turnaround roadmap using AI" },
  { hook:"8 AI tools every freelancer needs in 2026.\nMost people have never heard of #3 👇", theme:"AI tools for freelancers 2026" },
  { hook:"Claude can now be your personal business coach.\n10 prompts to build your strategy from scratch 👇", theme:"Claude as business coach prompts" },
  { hook:"This free AI tool saved me 7 hours this week.\nAnd nobody is talking about it 👇", theme:"Underrated time-saving AI tool" },
  { hook:"What if I told you ChatGPT can write your entire email marketing sequence?\n5 prompts that do it in minutes 👇", theme:"ChatGPT email marketing prompts" },
  { hook:"I tested 10 AI image tools so you do not have to.\nHere are the 3 worth your time 👇", theme:"Best free AI image generation tools" },
  { hook:"The old way of freelancing is dead.\nHere is how AI changed the game for one-person businesses 👇", theme:"AI freelancing strategy for 2026" },
  { hook:"7 prompts that turn Claude into your personal content machine.\nPost every day without burning out 👇", theme:"Claude daily content generation prompts" },
  { hook:"Most beginners waste their first 3 months with AI.\nHere is what to do instead 👇", theme:"Avoid beginner AI mistakes" },
  { hook:"ChatGPT just became the best business partner you never paid for.\n6 prompts that prove it 👇", theme:"ChatGPT as business partner prompts" },
  { hook:"You can now build a landing page with Claude in under 10 minutes.\nNo code. No money. Here is how 👇", theme:"Build a landing page with Claude" },
  { hook:"Transformation video is going viral right now.\nHere is the exact AI prompt that creates it 👇", theme:"Viral transformation video AI prompt" },
  { hook:"100 side hustle ideas powered by AI.\nFiltered for beginners with no money to invest 👇", theme:"100 AI-powered side hustle ideas" },
  { hook:"Claude can now summarise an entire book in 3 minutes.\nHere are 5 prompts to extract only what matters 👇", theme:"Claude book summary prompts" },
  { hook:"It is Monday. Let us start it with a gift.\n6 free AI tools dropping this week that will save you hours 👇", theme:"Monday free AI tools gift post" },
  { hook:"The biggest lie about making money online.\nAnd what actually works in 2026 👇", theme:"Truth about online income in 2026" },
  { hook:"I gave Claude 7 tools and it started editing my videos automatically.\nHere is the exact setup 👇", theme:"Claude automated video editing setup" },
  { hook:"This ChatGPT prompt builds your entire personal brand strategy.\nIn under 5 minutes 👇", theme:"ChatGPT personal brand strategy prompt" },
  { hook:"Passive income with AI is real.\nBut not how most people think.\nHere is the honest breakdown 👇", theme:"Honest AI passive income breakdown" },
  { hook:"The 3-step system I use to create a week of content in 45 minutes.\nAll with free AI tools 👇", theme:"Weekly content system using AI" },
  { hook:"11 ChatGPT prompts that do the work of a full marketing team 👇", theme:"ChatGPT marketing team replacement prompts" },
  { hook:"Your phone is a money-making machine.\nYou just need to know these 5 AI apps 👇", theme:"5 AI apps to earn from your smartphone" },
  { hook:"Claude just became the best copywriter in the world.\nAnd it works for free.\n8 prompts inside 👇", theme:"Claude copywriting prompts" },
  { hook:"The fastest way to learn any AI skill in 2026.\nNo course needed 👇", theme:"Fast AI skill learning system" },
  { hook:"I built an entire online business using only AI tools and my phone.\nHere is exactly what I did 👇", theme:"Full AI-powered online business on mobile" },
  { hook:"What nobody tells you when you start with AI.\nThe truth after 12 months 👇", theme:"Honest 12-month AI journey reflection" },
];

/* 4 post types rotated for daily variety */
const DAILY_FORMATS = [
  { label:"Prompts List",   color:"#0EA5E9", icon:"📋" },
  { label:"Step-by-Step",  color:"#10B981", icon:"🎓" },
  { label:"Tools Roundup", color:"#EC4899", icon:"🔍" },
  { label:"Mindset Take",  color:"#8B5CF6", icon:"🧠" },
];

/* ── Gemini AI Config ── */
const GEMINI_MODEL = "gemini-2.5-flash";

/* ── Prompts ── */
function sysPrompt() {
  return `You are an elite social media content strategist for DigitalBello.
Brand: ${BRAND.positioning}
Audience: ${BRAND.audience}
Tone: ${BRAND.tone}

RULES:
- Hook stops scroll in 3 seconds
- Globally relatable, no region-specific refs
- Drive SAVES, SHARES, COMMENTS (keyword CTAs)
- Short punchy paragraphs, 1-3 lines max
- 10-15 hashtags including #DigitalBello
- imagePrompt: vivid, NO TEXT IN IMAGE, editorial + digital art

Return ONLY valid JSON, no markdown:
{
  "hook": "scroll-stopping first line",
  "caption": "full post body with \\n line breaks",
  "cta": "call to action",
  "hashtags": ["tag1","tag2"],
  "imagePrompt": "detailed image generation prompt, no text in image",
  "postingTime": "best time WAT",
  "viralTip": "one specific reach tip"
}`;
}

function userPrompt(type, pillar, topic, extra) {
  const desc = {
    authority:"a text-only authority post that establishes expertise",
    story:"a personal story/case study with transformation arc",
    list:"a high-save numbered list with dopamine-triggering items",
    tutorial:"a step-by-step beginner tutorial, immediately actionable",
    reel:"a 30-60 second reel script with hook, fast-cut sections, pattern interrupts",
    hidden:"a hidden resources / secret tools post optimised for saves",
    contrarian:"a contrarian take challenging common beliefs, sparks debate",
    mindset:"a mindset/future-of-work post with emotional urgency",
  };
  return `Generate a complete ${desc[type]} for the "${pillar}" pillar.
Topic: ${topic || pillar + " for beginners"}
Context: ${extra || "globally relatable, beginner-friendly, mobile-first"}
Make it feel human, bold, punchy, real.`;
}

function dailySysPrompt() {
  return `You are an elite AI content strategist for DigitalBello — a global AI education brand for beginners.
Brand: ${BRAND.positioning}
Audience: ${BRAND.audience}
Tone: ${BRAND.tone}

FORMAT RULES (STRICT):
1. Start with the HOOK — bold, punchy, scroll-stopping (1-4 lines)
2. Blank line, then numbered prompts/steps/tips — each is a mini value bomb
3. End with save/share CTA
4. 10-15 hashtags including #DigitalBello

Return ONLY valid JSON, no markdown:
{
  "hook": "viral hook (1-4 lines, ends with 👇 or ⬇️)",
  "items": ["prompt or tip 1", "prompt or tip 2", "..."],
  "cta": "save/share call to action",
  "hashtags": ["tag1","tag2"],
  "imagePrompt": "vivid image generation prompt, NO TEXT IN IMAGE",
  "postingTime": "best WAT time",
  "viralTip": "one tip to maximise reach"
}`;
}

function dailyUserPrompt(seed, format, allUsedThemes) {
  const formatGuide = {
    "Prompts List":  "Give 6-8 numbered copy-paste prompts the reader can use immediately.",
    "Step-by-Step":  "Give 5-7 numbered steps forming a clear beginner workflow.",
    "Tools Roundup": "Give 5-7 numbered AI tools or free resources with one-line descriptions.",
    "Mindset Take":  "Give 5-6 numbered mindset shifts or honest truths about AI and online income.",
  };
  return `Create a viral DigitalBello daily post.

TOPIC SEED: "${seed.theme}"
HOOK: "${seed.hook}"
FORMAT: ${format.label} — ${formatGuide[format.label]}

Make every numbered item feel like copy-paste gold for a beginner.
AVOID these already-used themes: ${allUsedThemes.length > 0 ? allUsedThemes.join(", ") : "none yet"}`;
}

/* ── Utils ── */
function copyText(text, onDone) {
  const fallback = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px";
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand("copy"); } catch(e) {}
    document.body.removeChild(ta);
    onDone();
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(onDone).catch(fallback);
  } else { fallback(); }
}

async function makeImage(prompt) {
  const enc = encodeURIComponent(prompt + ", no text, no watermark, ultra HD, social media visual");
  return `https://image.pollinations.ai/prompt/${enc}?width=1080&height=1080&nologo=true&seed=${Date.now()}`;
}

/* ── Gemini API Helper ── */
async function callGemini(apiKey, systemText, userText, maxTokens = 1000) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemText }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: userText }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: maxTokens,
      }
    }),
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini API error: ${res.status}`);
  }
  
  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return raw.replace(/```json|```/g, "").trim();
}

/* ── Main App ── */
export default function App() {
  const [tab, setTab]         = useState("generate");
  const [type, setType]       = useState(null);
  const [pillar, setPillar]   = useState(null);
  const [topic, setTopic]     = useState("");
  const [extra, setExtra]     = useState("");
  const [loading, setLoading] = useState(false);
  const [imgLoad, setImgLoad] = useState(false);
  const [result, setResult]   = useState(null);
  const [imgUrl, setImgUrl]   = useState(null);
  const [error, setError]     = useState(null);
  const [copied, setCopied]   = useState(null);
  const [history, setHistory] = useState([]);

  const [dailyLoading, setDailyLoading]   = useState(false);
  const [dailyPosts, setDailyPosts]       = useState([]);
  const [dailyImgs, setDailyImgs]         = useState({});
  const [dailyImgLoads, setDailyImgLoads] = useState({});
  const [dailyError, setDailyError]       = useState(null);
  const [usedThemes, setUsedThemes]       = useState([]);
  const [copied4, setCopied4]             = useState({});
  const [activeCard, setActiveCard]       = useState(0);

  const doCopy = (text, key) => copyText(text, () => {
    setCopied(key); setTimeout(()=>setCopied(null),2500);
  });

  const doC4 = (text, key) => copyText(text, () => {
    setCopied4(p=>({...p,[key]:true}));
    setTimeout(()=>setCopied4(p=>({...p,[key]:false})),2500);
  });

  const loadDailyImg = async (idx, prompt) => {
    if (!prompt) return;
    setDailyImgLoads(p=>({...p,[idx]:true}));
    try {
      const url = await makeImage(prompt);
      setDailyImgs(p=>({...p,[idx]:url}));
    } catch(e) { console.error(e); }
    finally { setDailyImgLoads(p=>({...p,[idx]:false})); }
  };

  const generate = useCallback(async () => {
    if (!apiKey) { setError("API key missing. Add VITE_GEMINI_API_KEY to Render environment variables."); return; }
    if (!type || !pillar) return;
    
    setLoading(true); setError(null); setResult(null); setImgUrl(null);
    try {
      const raw = await callGemini(apiKey, sysPrompt(), userPrompt(type, pillar, topic, extra), 1000);
      
      const parsed = JSON.parse(raw);
      const entry = {
        ...parsed,
        contentType: type,
        pillar,
        topic: topic || pillar,
        ts: new Date().toLocaleTimeString(),
        id: Date.now()
      };
      
      setResult(entry);
      setHistory(p => [entry, ...p].slice(0, 20));
      
      setImgLoad(true);
      try { setImgUrl(await makeImage(parsed.imagePrompt)); } catch(e){}
      finally { setImgLoad(false); }
    } catch(e) {
      setError(e.message || "Generation failed — please try again.");
    } finally {
      setLoading(false);
    }
  }, [type, pillar, topic, extra]);

  const generateDaily = useCallback(async () => {
    if (!apiKey) { setDailyError("API key missing. Add VITE_GEMINI_API_KEY to Render environment variables."); return; }
    
    setDailyLoading(true); setDailyError(null);
    setDailyPosts([]); setDailyImgs({}); setDailyImgLoads({});
    setActiveCard(0);

    try {
      const available = DAILY_TOPICS.filter(t => !usedThemes.includes(t.theme));
      const pool = available.length >= 4 ? available : DAILY_TOPICS;
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const seeds = shuffled.slice(0, 4);

      const calls = seeds.map((seed, i) =>
        callGemini(apiKey, dailySysPrompt(), dailyUserPrompt(seed, DAILY_FORMATS[i], usedThemes), 1200)
        .then(raw => {
          const parsed = JSON.parse(raw);
          return {
            ...parsed,
            seed: seed.theme,
            format: DAILY_FORMATS[i],
            ts: new Date().toLocaleTimeString(),
            id: Date.now() + i,
            idx: i,
          };
        })
      );

      const results = await Promise.all(calls);
      setDailyPosts(results);
      setUsedThemes(p => [...p, ...seeds.map(s => s.theme)]);

      results.forEach((post, i) => loadDailyImg(i, post.imagePrompt));
    } catch(e) {
      setDailyError(e.message || "Daily generation failed — please try again.");
    } finally {
      setDailyLoading(false);
    }
  }, [usedThemes]);

  const typeObj = TYPES.find(t => t.id === type);
  
  const fullPost = result
    ? `${result.hook}\n\n${result.caption}\n\n${result.cta}\n\n${result.hashtags?.map(h => `#${h.replace(/^#/, "")}`).join(" ")}\n\n🎨 IMAGE PROMPT:\n${result.imagePrompt}`
    : "";

  const dailyPostText = (post) =>
    `${post.hook}\n\n${post.items?.map((item, i) => `${i + 1}. ${item}`).join("\n\n")}\n\n${post.cta}\n\n${post.hashtags?.map(h => `#${h.replace(/^#/, "")}`).join(" ")}\n\n🎨 IMAGE PROMPT:\n${post.imagePrompt}`;

  return (
    <div style={s.root}>
      <header style={s.header}>
        <div style={s.hRow}>
          <div style={s.logo}>
            <div style={s.logoMark}>DB</div>
            <div>
              <div style={s.logoName}>DigitalBello</div>
              <div style={s.logoSub}>Content Engine · Gemini AI</div>
            </div>
          </div>
          <div style={s.stats}>
            {[
              ["Posts", history.length],
              ["Daily Sets", Math.floor(usedThemes.length / 4)],
              ["Pillars", 5]
            ].map(([l, v], i) => (
              <div key={i} style={s.stat}>
                <span style={s.statV}>{v}</span>
                <span style={s.statL}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={s.tabs}>
          {[
            ["generate", "⚡ Generate"],
            ["daily", "📅 Daily Plan"],
            ["history", `📂 History (${history.length})`]
          ].map(([id, lbl]) => (
            <button
              key={id}
              style={{ ...s.tab, ...(tab === id ? s.tabOn : {}) }}
              onClick={() => setTab(id)}
            >
              {lbl}
            </button>
          ))}
        </div>
      </header>

      <main style={s.main}>
        {tab === "generate" && (
          <div style={s.panel}>
            <div style={s.section}>
              <div style={s.secTitle}>1. Pick a post type</div>
              <div style={s.grid4}>
                {TYPES.map(t => (
                  <button
                    key={t.id}
                    style={{
                      ...s.typeCard,
                      borderColor: type === t.id ? t.color : "transparent",
                      background: type === t.id ? `${t.color}11` : "#fff",
                    }}
                    onClick={() => setType(t.id)}
                  >
                    <span style={{ fontSize: 24 }}>{t.icon}</span>
                    <span style={{ ...s.typeLabel, color: t.color }}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={s.section}>
              <div style={s.secTitle}>2. Content pillar</div>
              <div style={s.grid5}>
                {BRAND.contentPillars.map(p => (
                  <button
                    key={p}
                    style={{
                      ...s.pillBtn,
                      background: pillar === p ? "#111" : "#f3f4f6",
                      color: pillar === p ? "#fff" : "#374151",
                    }}
                    onClick={() => setPillar(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div style={s.section}>
              <div style={s.secTitle}>3. Topic (optional)</div>
              <input
                style={s.input}
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. How to use ChatGPT to write sales copy"
              />
              <div style={{...s.secTitle, marginTop: 12}}>Extra context (optional)</div>
              <input
                style={s.input}
                value={extra}
                onChange={e => setExtra(e.target.value)}
                placeholder="e.g. Target Nigerian students, mention mobile apps only"
              />
            </div>

            <button
              style={{
                ...s.genBtn,
                opacity: !type || !pillar ? 0.5 : 1,
                cursor: !type || !pillar ? "not-allowed" : "pointer",
              }}
              onClick={generate}
              disabled={!type || !pillar || loading}
            >
              {loading ? "✨ Generating with Gemini..." : "⚡ Generate Post"}
            </button>

            {error && <div style={s.errorBox}>{error}</div>}

            {result && (
              <div style={s.resultBox}>
                <div style={s.resultMeta}>
                  <span style={{ ...s.badge, background: typeObj?.color + "22", color: typeObj?.color }}>
                    {typeObj?.icon} {typeObj?.label}
                  </span>
                  <span style={s.badge}>{result.pillar}</span>
                  <span style={s.time}>{result.ts}</span>
                </div>

                <div style={s.hook}>{result.hook}</div>
                <div style={s.caption}>{result.caption}</div>
                <div style={s.cta}>{result.cta}</div>
                <div style={s.tags}>
                  {result.hashtags?.map((h, i) => (
                    <span key={i} style={s.tag}>#{h.replace(/^#/, "")}</span>
                  ))}
                </div>

                {imgLoad && <div style={s.imgLoading}>🎨 Generating image...</div>}
                {imgUrl && (
                  <div style={s.imgWrap}>
                    <img src={imgUrl} alt="generated" style={s.img} />
                  </div>
                )}

                <div style={s.viralTip}>💡 {result.viralTip}</div>
                <div style={s.postingTime}>🕐 Best posting time: {result.postingTime}</div>

                <div style={s.actions}>
                  <button style={s.copyBtn} onClick={() => doCopy(fullPost, "main")}>
                    {copied === "main" ? "✅ Copied!" : "📋 Copy Full Post"}
                  </button>
                  <button style={s.copyBtn} onClick={() => doCopy(result.imagePrompt, "img")}>
                    {copied === "img" ? "✅ Copied!" : "🎨 Copy Image Prompt"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "daily" && (
          <div style={s.panel}>
            <div style={s.dailyHeader}>
              <div style={s.dailyTitle}>📅 Daily Content Plan</div>
              <div style={s.dailySub}>Generates 4 unique posts in parallel using Gemini 2.5 Flash</div>
            </div>

            <button
              style={s.genBtn}
              onClick={generateDaily}
              disabled={dailyLoading}
            >
              {dailyLoading ? "✨ Cooking 4 posts with Gemini..." : "📅 Generate Daily Plan (×4)"}
            </button>

            {dailyError && <div style={s.errorBox}>{dailyError}</div>}

            {dailyPosts.length > 0 && (
              <div style={s.dailyStats}>
                Generated {dailyPosts.length} posts · {usedThemes.length} unique themes used
              </div>
            )}

            <div style={s.dailyGrid}>
              {dailyPosts.map((post, i) => (
                <div
                  key={post.id}
                  style={{
                    ...s.dailyCard,
                    borderLeft: `4px solid ${post.format.color}`,
                    boxShadow: activeCard === i ? "0 8px 30px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={s.dailyCardHeader}
                    onClick={() => setActiveCard(activeCard === i ? -1 : i)}
                  >
                    <div style={s.dailyCardMeta}>
                      <span style={{ fontSize: 20 }}>{post.format.icon}</span>
                      <span style={{ ...s.dailyFmt, color: post.format.color }}>{post.format.label}</span>
                      <span style={s.dailySeed}>{post.seed}</span>
                    </div>
                    <span style={s.chevron}>{activeCard === i ? "▲" : "▼"}</span>
                  </div>

                  {activeCard === i && (
                    <div style={s.dailyCardBody}>
                      <div style={s.hook}>{post.hook}</div>
                      <div style={s.itemsList}>
                        {post.items?.map((item, idx) => (
                          <div key={idx} style={s.itemRow}>
                            <span style={{ ...s.itemNum, background: post.format.color }}>{idx + 1}</span>
                            <span style={s.itemText}>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div style={s.cta}>{post.cta}</div>
                      <div style={s.tags}>
                        {post.hashtags?.map((h, idx) => (
                          <span key={idx} style={s.tag}>#{h.replace(/^#/, "")}</span>
                        ))}
                      </div>

                      {dailyImgLoads[i] && <div style={s.imgLoading}>🎨 Generating image...</div>}
                      {dailyImgs[i] && (
                        <div style={s.imgWrap}>
                          <img src={dailyImgs[i]} alt="daily" style={s.img} />
                        </div>
                      )}

                      <div style={s.viralTip}>💡 {post.viralTip}</div>
                      <div style={s.actions}>
                        <button style={s.copyBtn} onClick={() => doC4(dailyPostText(post), `d${i}`)}>
                          {copied4[`d${i}`] ? "✅ Copied!" : "📋 Copy Post"}
                        </button>
                        <button style={s.copyBtn} onClick={() => doC4(post.imagePrompt, `di${i}`)}>
                          {copied4[`di${i}`] ? "✅ Copied!" : "🎨 Copy Image Prompt"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "history" && (
          <div style={s.panel}>
            <div style={s.secTitle}>📂 Recent Generations</div>
            {history.length === 0 ? (
              <div style={s.empty}>No posts yet. Generate your first one in the ⚡ Generate tab!</div>
            ) : (
              <div style={s.historyList}>
                {history.map((h, i) => (
                  <div key={h.id} style={s.historyCard}>
                    <div style={s.historyMeta}>
                      <span style={{ ...s.badge, background: TYPES.find(t => t.id === h.contentType)?.color + "22", color: TYPES.find(t => t.id === h.contentType)?.color }}>
                        {TYPES.find(t => t.id === h.contentType)?.icon} {TYPES.find(t => t.id === h.contentType)?.label}
                      </span>
                      <span style={s.badge}>{h.pillar}</span>
                      <span style={s.time}>{h.ts}</span>
                    </div>
                    <div style={s.historyHook}>{h.hook}</div>
                    <div style={s.actions}>
                      <button style={s.smallBtn} onClick={() => doCopy(
                        `${h.hook}\n\n${h.caption || h.items?.join("\n\n")}\n\n${h.cta}\n\n${h.hashtags?.map(tag => `#${tag.replace(/^#/, "")}`).join(" ")}`,
                        `h${i}`
                      )}>
                        {copied === `h${i}` ? "✅" : "📋"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const s = {
  root: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    background: "#f8f9fb",
    minHeight: "100vh",
    color: "#111827",
  },
  header: {
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    padding: "20px 24px 0",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  hRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 12,
  },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  logoMark: {
    width: 40, height: 40, borderRadius: 10, background: "#111",
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 16,
  },
  logoName: { fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px" },
  logoSub: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  stats: { display: "flex", gap: 16 },
  stat: { display: "flex", flexDirection: "column", alignItems: "center" },
  statV: { fontWeight: 700, fontSize: 18, color: "#111" },
  statL: { fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" },

  tabs: { display: "flex", gap: 4, borderBottom: "1px solid #e5e7eb" },
  tab: {
    padding: "12px 20px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    color: "#6b7280",
    borderBottom: "2px solid transparent",
    marginBottom: -1,
    transition: "all 0.2s",
  },
  tabOn: {
    color: "#111",
    borderBottomColor: "#111",
    fontWeight: 600,
  },

  main: { maxWidth: 800, margin: "0 auto", padding: "24px 16px 80px" },
  panel: { display: "flex", flexDirection: "column", gap: 20 },

  section: { background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #e5e7eb" },
  secTitle: { fontSize: 13, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 },

  grid4: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 },
  typeCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "16px 8px",
    borderRadius: 12,
    border: "2px solid transparent",
    cursor: "pointer",
    transition: "all 0.15s",
    background: "#fff",
  },
  typeLabel: { fontSize: 12, fontWeight: 600 },

  grid5: { display: "flex", flexWrap: "wrap", gap: 8 },
  pillBtn: {
    padding: "8px 16px",
    borderRadius: 20,
    border: "none",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },

  genBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "16px 24px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },

  errorBox: {
    background: "#fef2f2",
    color: "#991b1b",
    padding: "12px 16px",
    borderRadius: 10,
    fontSize: 13,
    border: "1px solid #fecaca",
  },

  resultBox: {
    background: "#fff",
    borderRadius: 14,
    padding: 24,
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  resultMeta: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
  badge: {
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    background: "#f3f4f6",
    color: "#374151",
  },
  time: { fontSize: 11, color: "#9ca3af", marginLeft: "auto" },
  hook: { fontSize: 18, fontWeight: 700, lineHeight: 1.4, color: "#111" },
  caption: { fontSize: 15, lineHeight: 1.7, color: "#374151", whiteSpace: "pre-line" },
  cta: { fontSize: 15, fontWeight: 600, color: "#111", background: "#f3f4f6", padding: "12px 16px", borderRadius: 10 },
  tags: { display: "flex", flexWrap: "wrap", gap: 6 },
  tag: { fontSize: 12, color: "#0ea5e9", fontWeight: 500 },
  imgLoading: { fontSize: 13, color: "#6b7280", fontStyle: "italic" },
  imgWrap: { borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb" },
  img: { width: "100%", display: "block" },
  viralTip: { fontSize: 13, color: "#059669", background: "#ecfdf5", padding: "10px 14px", borderRadius: 8 },
  postingTime: { fontSize: 12, color: "#6b7280" },
  actions: { display: "flex", gap: 10, marginTop: 4 },
  copyBtn: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.15s",
  },

  dailyHeader: { textAlign: "center", marginBottom: 8 },
  dailyTitle: { fontSize: 20, fontWeight: 700 },
  dailySub: { fontSize: 13, color: "#6b7280", marginTop: 4 },
  dailyStats: { fontSize: 12, color: "#6b7280", textAlign: "center" },
  dailyGrid: { display: "flex", flexDirection: "column", gap: 12 },
  dailyCard: {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    transition: "all 0.2s",
  },
  dailyCardHeader: {
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  dailyCardMeta: { display: "flex", alignItems: "center", gap: 10 },
  dailyFmt: { fontSize: 13, fontWeight: 600 },
  dailySeed: { fontSize: 12, color: "#9ca3af" },
  chevron: { fontSize: 12, color: "#9ca3af" },
  dailyCardBody: { padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 12 },
  itemsList: { display: "flex", flexDirection: "column", gap: 10 },
  itemRow: { display: "flex", gap: 10, alignItems: "flex-start" },
  itemNum: {
    width: 22, height: 22, borderRadius: "50%", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2,
  },
  itemText: { fontSize: 14, lineHeight: 1.6, color: "#374151", flex: 1 },

  historyList: { display: "flex", flexDirection: "column", gap: 10 },
  historyCard: {
    background: "#fff",
    borderRadius: 12,
    padding: 16,
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  historyMeta: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
  historyHook: { fontSize: 14, fontWeight: 600, color: "#111", lineHeight: 1.4 },
  smallBtn: {
    padding: "6px 12px",
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: 12,
  },
  empty: { textAlign: "center", color: "#9ca3af", padding: "40px 20px", fontSize: 14 },
};
                  // ==== PART 2 STARTS HERE ====

  return (
    <div style={s.root}>
      <header style={s.header}>
        <div style={s.hRow}>
          <div style={s.logo}>
            <div style={s.logoMark}>DB</div>
            <div>
              <div style={s.logoName}>DigitalBello</div>
              <div style={s.logoSub}>Content Engine · Gemini AI</div>
            </div>
          </div>
          <div style={s.stats}>
            {[
              ["Posts", history.length],
              ["Daily Sets", Math.floor(usedThemes.length / 4)],
              ["Pillars", 5]
            ].map(([l, v], i) => (
              <div key={i} style={s.stat}>
                <span style={s.statV}>{v}</span>
                <span style={s.statL}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={s.tabs}>
          {[
            ["generate", "⚡ Generate"],
            ["daily", "📅 Daily Plan"],
            ["history", `📂 History (${history.length})`]
          ].map(([id, lbl]) => (
            <button
              key={id}
              style={{ ...s.tab, ...(tab === id ? s.tabOn : {}) }}
              onClick={() => setTab(id)}
            >
              {lbl}
            </button>
          ))}
        </div>
      </header>

      <main style={s.main}>
        {tab === "generate" && (
          <div style={s.panel}>
            <div style={s.section}>
              <div style={s.secTitle}>1. Pick a post type</div>
              <div style={s.grid4}>
                {TYPES.map(t => (
                  <button
                    key={t.id}
                    style={{
                      ...s.typeCard,
                      borderColor: type === t.id ? t.color : "transparent",
                      background: type === t.id ? `${t.color}11` : "#fff",
                    }}
                    onClick={() => setType(t.id)}
                  >
                    <span style={{ fontSize: 24 }}>{t.icon}</span>
                    <span style={{ ...s.typeLabel, color: t.color }}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={s.section}>
              <div style={s.secTitle}>2. Content pillar</div>
              <div style={s.grid5}>
                {BRAND.contentPillars.map(p => (
                  <button
                    key={p}
                    style={{
                      ...s.pillBtn,
                      background: pillar === p ? "#111" : "#f3f4f6",
                      color: pillar === p ? "#fff" : "#374151",
                    }}
                    onClick={() => setPillar(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div style={s.section}>
              <div style={s.secTitle}>3. Topic (optional)</div>
              <input
                style={s.input}
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. How to use ChatGPT to write sales copy"
              />
              <div style={{...s.secTitle, marginTop: 12}}>Extra context (optional)</div>
              <input
                style={s.input}
                value={extra}
                onChange={e => setExtra(e.target.value)}
                placeholder="e.g. Target Nigerian students, mention mobile apps only"
              />
            </div>

            <button
              style={{
                ...s.genBtn,
                opacity: !type || !pillar ? 0.5 : 1,
                cursor: !type || !pillar ? "not-allowed" : "pointer",
              }}
              onClick={generate}
              disabled={!type || !pillar || loading}
            >
              {loading ? "✨ Generating with Gemini..." : "⚡ Generate Post"}
            </button>

            {error && <div style={s.errorBox}>{error}</div>}

            {result && (
              <div style={s.resultBox}>
                <div style={s.resultMeta}>
                  <span style={{ ...s.badge, background: typeObj?.color + "22", color: typeObj?.color }}>
                    {typeObj?.icon} {typeObj?.label}
                  </span>
                  <span style={s.badge}>{result.pillar}</span>
                  <span style={s.time}>{result.ts}</span>
                </div>

                <div style={s.hook}>{result.hook}</div>
                <div style={s.caption}>{result.caption}</div>
                <div style={s.cta}>{result.cta}</div>
                <div style={s.tags}>
                  {result.hashtags?.map((h, i) => (
                    <span key={i} style={s.tag}>#{h.replace(/^#/, "")}</span>
                  ))}
                </div>

                {imgLoad && <div style={s.imgLoading}>🎨 Generating image...</div>}
                {imgUrl && (
                  <div style={s.imgWrap}>
                    <img src={imgUrl} alt="generated" style={s.img} />
                  </div>
                )}

                <div style={s.viralTip}>💡 {result.viralTip}</div>
                <div style={s.postingTime}>🕐 Best posting time: {result.postingTime}</div>

                <div style={s.actions}>
                  <button style={s.copyBtn} onClick={() => doCopy(fullPost, "main")}>
                    {copied === "main" ? "✅ Copied!" : "📋 Copy Full Post"}
                  </button>
                  <button style={s.copyBtn} onClick={() => doCopy(result.imagePrompt, "img")}>
                    {copied === "img" ? "✅ Copied!" : "🎨 Copy Image Prompt"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "daily" && (
          <div style={s.panel}>
            <div style={s.dailyHeader}>
              <div style={s.dailyTitle}>📅 Daily Content Plan</div>
              <div style={s.dailySub}>Generates 4 unique posts in parallel using Gemini 2.5 Flash</div>
            </div>

            <button
              style={s.genBtn}
              onClick={generateDaily}
              disabled={dailyLoading}
            >
              {dailyLoading ? "✨ Cooking 4 posts with Gemini..." : "📅 Generate Daily Plan (×4)"}
            </button>

            {dailyError && <div style={s.errorBox}>{dailyError}</div>}

            {dailyPosts.length > 0 && (
              <div style={s.dailyStats}>
                Generated {dailyPosts.length} posts · {usedThemes.length} unique themes used
              </div>
            )}

            <div style={s.dailyGrid}>
              {dailyPosts.map((post, i) => (
                <div
                  key={post.id}
                  style={{
                    ...s.dailyCard,
                    borderLeft: `4px solid ${post.format.color}`,
                    boxShadow: activeCard === i ? "0 8px 30px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={s.dailyCardHeader}
                    onClick={() => setActiveCard(activeCard === i ? -1 : i)}
                  >
                    <div style={s.dailyCardMeta}>
                      <span style={{ fontSize: 20 }}>{post.format.icon}</span>
                      <span style={{ ...s.dailyFmt, color: post.format.color }}>{post.format.label}</span>
                      <span style={s.dailySeed}>{post.seed}</span>
                    </div>
                    <span style={s.chevron}>{activeCard === i ? "▲" : "▼"}</span>
                  </div>

                  {activeCard === i && (
                    <div style={s.dailyCardBody}>
                      <div style={s.hook}>{post.hook}</div>
                      <div style={s.itemsList}>
                        {post.items?.map((item, idx) => (
                          <div key={idx} style={s.itemRow}>
                            <span style={{ ...s.itemNum, background: post.format.color }}>{idx + 1}</span>
                            <span style={s.itemText}>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div style={s.cta}>{post.cta}</div>
                      <div style={s.tags}>
                        {post.hashtags?.map((h, idx) => (
                          <span key={idx} style={s.tag}>#{h.replace(/^#/, "")}</span>
                        ))}
                      </div>

                      {dailyImgLoads[i] && <div style={s.imgLoading}>🎨 Generating image...</div>}
                      {dailyImgs[i] && (
                        <div style={s.imgWrap}>
                          <img src={dailyImgs[i]} alt="daily" style={s.img} />
                        </div>
                      )}

                      <div style={s.viralTip}>💡 {post.viralTip}</div>
                      <div style={s.actions}>
                        <button style={s.copyBtn} onClick={() => doC4(dailyPostText(post), `d${i}`)}>
                          {copied4[`d${i}`] ? "✅ Copied!" : "📋 Copy Post"}
                        </button>
                        <button style={s.copyBtn} onClick={() => doC4(post.imagePrompt, `di${i}`)}>
                          {copied4[`di${i}`] ? "✅ Copied!" : "🎨 Copy Image Prompt"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "history" && (
          <div style={s.panel}>
            <div style={s.secTitle}>📂 Recent Generations</div>
            {history.length === 0 ? (
              <div style={s.empty}>No posts yet. Generate your first one in the ⚡ Generate tab!</div>
            ) : (
              <div style={s.historyList}>
                {history.map((h, i) => (
                  <div key={h.id} style={s.historyCard}>
                    <div style={s.historyMeta}>
                      <span style={{ ...s.badge, background: TYPES.find(t => t.id === h.contentType)?.color + "22", color: TYPES.find(t => t.id === h.contentType)?.color }}>
                        {TYPES.find(t => t.id === h.contentType)?.icon} {TYPES.find(t => t.id === h.contentType)?.label}
                      </span>
                      <span style={s.badge}>{h.pillar}</span>
                      <span style={s.time}>{h.ts}</span>
                    </div>
                    <div style={s.historyHook}>{h.hook}</div>
                    <div style={s.actions}>
                      <button style={s.smallBtn} onClick={() => doCopy(
                        `${h.hook}\n\n${h.caption || h.items?.join("\n\n")}\n\n${h.cta}\n\n${h.hashtags?.map(tag => `#${tag.replace(/^#/, "")}`).join(" ")}`,
                        `h${i}`
                      )}>
                        {copied === `h${i}` ? "✅" : "📋"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const s = {
  root: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    background: "#f8f9fb",
    minHeight: "100vh",
    color: "#111827",
  },
  header: {
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    padding: "20px 24px 0",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  hRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 12,
  },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  logoMark: {
    width: 40, height: 40, borderRadius: 10, background: "#111",
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 16,
  },
  logoName: { fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px" },
  logoSub: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  stats: { display: "flex", gap: 16 },
  stat: { display: "flex", flexDirection: "column", alignItems: "center" },
  statV: { fontWeight: 700, fontSize: 18, color: "#111" },
  statL: { fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" },

  tabs: { display: "flex", gap: 4, borderBottom: "1px solid #e5e7eb" },
  tab: {
    padding: "12px 20px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    color: "#6b7280",
    borderBottom: "2px solid transparent",
    marginBottom: -1,
    transition: "all 0.2s",
  },
  tabOn: {
    color: "#111",
    borderBottomColor: "#111",
    fontWeight: 600,
  },

  main: { maxWidth: 800, margin: "0 auto", padding: "24px 16px 80px" },
  panel: { display: "flex", flexDirection: "column", gap: 20 },

  section: { background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #e5e7eb" },
  secTitle: { fontSize: 13, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 },

  grid4: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 },
  typeCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "16px 8px",
    borderRadius: 12,
    border: "2px solid transparent",
    cursor: "pointer",
    transition: "all 0.15s",
    background: "#fff",
  },
  typeLabel: { fontSize: 12, fontWeight: 600 },

  grid5: { display: "flex", flexWrap: "wrap", gap: 8 },
  pillBtn: {
    padding: "8px 16px",
    borderRadius: 20,
    border: "none",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },

  genBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "16px 24px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },

  errorBox: {
    background: "#fef2f2",
    color: "#991b1b",
    padding: "12px 16px",
    borderRadius: 10,
    fontSize: 13,
    border: "1px solid #fecaca",
  },

  resultBox: {
    background: "#fff",
    borderRadius: 14,
    padding: 24,
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  resultMeta: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
  badge: {
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    background: "#f3f4f6",
    color: "#374151",
  },
  time: { fontSize: 11, color: "#9ca3af", marginLeft: "auto" },
  hook: { fontSize: 18, fontWeight: 700, lineHeight: 1.4, color: "#111" },
  caption: { fontSize: 15, lineHeight: 1.7, color: "#374151", whiteSpace: "pre-line" },
  cta: { fontSize: 15, fontWeight: 600, color: "#111", background: "#f3f4f6", padding: "12px 16px", borderRadius: 10 },
  tags: { display: "flex", flexWrap: "wrap", gap: 6 },
  tag: { fontSize: 12, color: "#0ea5e9", fontWeight: 500 },
  imgLoading: { fontSize: 13, color: "#6b7280", fontStyle: "italic" },
  imgWrap: { borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb" },
  img: { width: "100%", display: "block" },
  viralTip: { fontSize: 13, color: "#059669", background: "#ecfdf5", padding: "10px 14px", borderRadius: 8 },
  postingTime: { fontSize: 12, color: "#6b7280" },
  actions: { display: "flex", gap: 10, marginTop: 4 },
  copyBtn: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.15s",
  },

  dailyHeader: { textAlign: "center", marginBottom: 8 },
  dailyTitle: { fontSize: 20, fontWeight: 700 },
  dailySub: { fontSize: 13, color: "#6b7280", marginTop: 4 },
  dailyStats: { fontSize: 12, color: "#6b7280", textAlign: "center" },
  dailyGrid: { display: "flex", flexDirection: "column", gap: 12 },
  dailyCard: {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    transition: "all 0.2s",
  },
  dailyCardHeader: {
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  dailyCardMeta: { display: "flex", alignItems: "center", gap: 10 },
  dailyFmt: { fontSize: 13, fontWeight: 600 },
  dailySeed: { fontSize: 12, color: "#9ca3af" },
  chevron: { fontSize: 12, color: "#9ca3af" },
  dailyCardBody: { padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 12 },
  itemsList: { display: "flex", flexDirection: "column", gap: 10 },
  itemRow: { display: "flex", gap: 10, alignItems: "flex-start" },
  itemNum: {
    width: 22, height: 22, borderRadius: "50%", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2,
  },
  itemText: { fontSize: 14, lineHeight: 1.6, color: "#374151", flex: 1 },

  historyList: { display: "flex", flexDirection: "column", gap: 10 },
  historyCard: {
    background: "#fff",
    borderRadius: 12,
    padding: 16,
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  historyMeta: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
  historyHook: { fontSize: 14, fontWeight: 600, color: "#111", lineHeight: 1.4 },
  smallBtn: {
    padding: "6px 12px",
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: 12,
  },
  empty: { textAlign: "center", color: "#9ca3af", padding: "40px 20px", fontSize: 14 },
};
                 
