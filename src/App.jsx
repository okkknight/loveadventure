import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { STYLE_ORDER, useGameStore } from './store/gameStore';

const illustrationAssets = {
  home: '/assets/love-home-hero.png',
  question: '/assets/love-question-accent.png',
  feedback: '/assets/love-feedback-peek.png',
  result: '/assets/love-result-accent.png',
  phoneReply: '/assets/love-phone-reply.png',
  detective: '/assets/love-detective.png',
  survivalGuide: '/assets/love-survival-guide.png',
};

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

function StatPill({ label, value, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-white/75 text-[#3b2e26]',
    accent: 'bg-[#fde6da] text-[#9f4728]',
    warm: 'bg-[#fff1d7] text-[#9a6f17]',
    safe: 'bg-[#e4f2ea] text-[#347056]',
  };
  return (
    <div className={cx('inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium', tones[tone])}>
      <span>{label}</span>
      <span className="opacity-80">{value}</span>
    </div>
  );
}

function SectionCard({ children, className = '' }) {
  return (
    <div
      className={cx(
        'rounded-[30px] border border-[rgba(89,70,55,0.09)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,248,241,0.88))] p-5 shadow-soft backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Sparkle({ className = '', tone = '#f2b23d' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M24 4l3.4 11.6L39 19l-11.6 3.4L24 34l-3.4-11.6L9 19l11.6-3.4L24 4Z"
        fill={tone}
        fillOpacity="0.92"
      />
    </svg>
  );
}

function FloatingPlane({ className = '' }) {
  return (
    <svg viewBox="0 0 120 84" className={className} aria-hidden="true">
      <path d="M10 43L109 10 79 74 60 54 10 43Z" fill="#fffaf5" stroke="#d8bfae" strokeWidth="2.3" />
      <path d="M25 40L72 52" fill="none" stroke="#f09c73" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M10 43L60 54" fill="none" stroke="#d8bfae" strokeWidth="2.3" strokeLinejoin="round" />
      <path d="M56 57L79 74" fill="none" stroke="#d8bfae" strokeWidth="2.3" strokeLinejoin="round" />
    </svg>
  );
}

function HeartNote({ className = '' }) {
  return (
    <svg viewBox="0 0 140 120" className={className} aria-hidden="true">
      <path
        d="M24 10h82l18 18v74a12 12 0 0 1-12 12H24a12 12 0 0 1-12-12V22a12 12 0 0 1 12-12Z"
        fill="#fff8ef"
        stroke="#e6d3c4"
        strokeWidth="2.4"
      />
      <path d="M106 10v18h18" fill="#fff1e2" stroke="#e6d3c4" strokeWidth="2.4" />
      <path
        d="M69 76c-17-11-29-21-29-34 0-9 7-16 16-16 6 0 11 3 14 8 3-5 8-8 14-8 9 0 16 7 16 16 0 13-12 23-29 34-2 1-4 1-6 0Z"
        fill="#f48b66"
        fillOpacity="0.15"
        stroke="#f48b66"
        strokeWidth="2.4"
      />
      <path d="M24 90h52" stroke="#ebd7c8" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 100h38" stroke="#ebd7c8" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function CrownMark({ className = '' }) {
  return (
    <svg viewBox="0 0 120 92" className={className} aria-hidden="true">
      <path
        d="M14 58 24 24l22 22 14-26 14 26 22-22 10 34-92 0Z"
        fill="#fff5db"
        stroke="#8d7b60"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M16 58h88" stroke="#8d7b60" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="24" r="4" fill="#f2b23d" stroke="#8d7b60" strokeWidth="2" />
      <circle cx="60" cy="20" r="4" fill="#f2b23d" stroke="#8d7b60" strokeWidth="2" />
      <circle cx="96" cy="24" r="4" fill="#f2b23d" stroke="#8d7b60" strokeWidth="2" />
    </svg>
  );
}

function CameraMascot({ className = '' }) {
  return (
    <svg viewBox="0 0 140 120" className={className} aria-hidden="true">
      <path
        d="M36 35c6-8 15-12 26-12h16c12 0 22 5 28 14 7 10 8 24 4 39-5 17-19 29-36 29H58c-17 0-30-13-35-29-5-16-4-31 13-41Z"
        fill="#fffaf5"
        stroke="#a49382"
        strokeWidth="2.4"
      />
      <circle cx="63" cy="58" r="8" fill="#2f241d" />
      <circle cx="89" cy="58" r="8" fill="#2f241d" />
      <path d="M62 77c4 4 12 4 16 0" fill="none" stroke="#2f241d" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M47 54h-14l-6 8 6 8h14" fill="#fff2e2" stroke="#a49382" strokeWidth="2.2" />
      <path d="M50 51h16" stroke="#a49382" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M33 97c8 8 21 12 37 12 18 0 31-4 39-12"
        fill="none"
        stroke="#d6c0ae"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="98" cy="90" r="7" fill="#f6dfcf" />
      <circle cx="44" cy="26" r="7" fill="#f6dfcf" />
    </svg>
  );
}

function HomeIllustration() {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-[rgba(89,70,55,0.08)] bg-[linear-gradient(180deg,#fffaf5_0%,#fff3e9_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(242,178,61,0.18),transparent_28%),radial-gradient(circle_at_78%_24%,rgba(231,119,79,0.15),transparent_24%),radial-gradient(circle_at_56%_76%,rgba(109,180,139,0.08),transparent_26%)]" />
      <img
        src={illustrationAssets.home}
        alt=""
        aria-hidden="true"
        className="relative h-[260px] w-full select-none object-contain"
        draggable="false"
      />
    </div>
  );
}

function QuestionAccent() {
  return (
    <div className="pointer-events-none absolute right-3 top-3 h-28 w-28 opacity-95">
      <img
        src={illustrationAssets.phoneReply}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full select-none object-contain"
        draggable="false"
      />
      <img
        src={illustrationAssets.question}
        alt=""
        aria-hidden="true"
        className="absolute -left-1 bottom-[-2px] h-11 w-11 select-none object-contain rotate-[-10deg] drop-shadow-[0_8px_18px_rgba(91,72,56,0.12)]"
        draggable="false"
      />
    </div>
  );
}

function FeedbackPeek() {
  return (
    <div className="pointer-events-none absolute right-4 top-4 h-24 w-24 opacity-95">
      <img
        src={illustrationAssets.detective}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full select-none object-contain"
        draggable="false"
      />
      <img
        src={illustrationAssets.feedback}
        alt=""
        aria-hidden="true"
        className="absolute -left-1 bottom-[-6px] h-10 w-10 select-none object-contain rotate-[-8deg] drop-shadow-[0_8px_18px_rgba(91,72,56,0.12)]"
        draggable="false"
      />
    </div>
  );
}

function ResultAccent() {
  return (
    <div className="pointer-events-none absolute right-3 top-2 h-24 w-24 opacity-95">
      <img
        src={illustrationAssets.result}
        alt=""
        aria-hidden="true"
        className="h-full w-full select-none object-contain"
        draggable="false"
      />
    </div>
  );
}

function BubbleButton({ active, children, onClick, variant = 'default', disabled }) {
  const base =
    'w-full rounded-[24px] border px-4 py-4 text-left text-[15px] leading-relaxed transition duration-200 active:scale-[0.99]';
  const variants = {
    default: active
      ? 'border-[#e99a79] bg-[#fff3ec] text-[#8b452e] shadow-bubble'
      : 'border-[rgba(89,70,55,0.10)] bg-white/85 text-[var(--text)] hover:border-[#ddb7a0] hover:bg-white',
    stable: active
      ? 'border-[#e3a191] bg-[#fff4ee] text-[#8b452e] shadow-bubble'
      : 'border-[rgba(89,70,55,0.10)] bg-[#fffdfa] text-[var(--text)] hover:border-[#deb2a0] hover:bg-white',
    analytic: active
      ? 'border-[#97b7d8] bg-[#f3f8fe] text-[#345d83] shadow-bubble'
      : 'border-[rgba(89,70,55,0.10)] bg-[#fcfdff] text-[var(--text)] hover:border-[#bdd0e7] hover:bg-white',
    playful: active
      ? 'border-[#e8bb64] bg-[#fff8e3] text-[#7c5b12] shadow-bubble'
      : 'border-[rgba(89,70,55,0.10)] bg-[#fffdf4] text-[var(--text)] hover:border-[#ead7a2] hover:bg-white',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx(base, variants[variant], disabled && 'cursor-not-allowed opacity-70')}
    >
      {children}
    </button>
  );
}

function getPromptText(prompt) {
  const match = prompt.match(/[“"]([^”"]+)[”"]/);
  return match?.[1] ?? prompt;
}

function formatDisplayTitle(title) {
  if (!title || title.length <= 5) return title;
  const splitIndex = Math.ceil(title.length / 2);
  return `${title.slice(0, splitIndex)}\n${title.slice(splitIndex)}`;
}

function App() {
  const phase = useGameStore((s) => s.phase);
  const questions = useGameStore((s) => s.questions);
  const questionIndex = useGameStore((s) => s.questionIndex);
  const counts = useGameStore((s) => s.counts);
  const feedback = useGameStore((s) => s.feedback);
  const result = useGameStore((s) => s.result);
  const shareStatus = useGameStore((s) => s.shareStatus);
  const startGame = useGameStore((s) => s.startGame);
  const showRules = useGameStore((s) => s.showRules);
  const hideRules = useGameStore((s) => s.hideRules);
  const chooseOption = useGameStore((s) => s.chooseOption);
  const nextQuestion = useGameStore((s) => s.nextQuestion);
  const replay = useGameStore((s) => s.replay);
  const shareResult = useGameStore((s) => s.shareResult);

  const currentQuestion = questions[questionIndex];
  const currentStep = questionIndex + 1;
  const progressPercent = Math.min((currentStep / 10) * 100, 100);

  const total = useMemo(
    () => STYLE_ORDER.reduce((sum, style) => sum + (counts[style] ?? 0), 0),
    [counts],
  );

  const percentages = useMemo(() => {
    const safeTotal = total || 1;
    return STYLE_ORDER.reduce(
      (acc, style) => ({
        ...acc,
        [style]: Math.round(((counts[style] ?? 0) / safeTotal) * 100),
      }),
      {},
    );
  }, [counts, total]);

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 text-[var(--text)] sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(231,119,79,0.18),transparent_26%),radial-gradient(circle_at_84%_10%,rgba(242,178,61,0.14),transparent_22%),radial-gradient(circle_at_50%_92%,rgba(109,180,139,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(89,70,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(89,70,55,0.03)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[430px] items-center">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-x-4 -top-2 h-24 rounded-full bg-[radial-gradient(circle,rgba(231,119,79,0.16)_0%,transparent_70%)] blur-3xl" />
          <div className="pointer-events-none absolute -left-8 top-44 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(242,178,61,0.12)_0%,transparent_68%)] blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(109,180,139,0.08)_0%,transparent_68%)] blur-3xl" />

          <AnimatePresence mode="wait">
            {phase === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <SectionCard className="overflow-hidden">
                  <div className="mb-4 flex items-center justify-between text-sm text-[var(--muted)]">
                    <span>手机端网页小游戏</span>
                    <span>轻量图一乐版</span>
                  </div>
                  <div className="space-y-4 text-center">
                    <div className="mx-auto inline-flex rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-semibold tracking-[0.14em] text-[#a04d2d]">
                      恋爱高危场景测试
                    </div>
                    <h1 className="text-[3.05rem] font-black leading-[0.95] tracking-[-0.06em]">
                      <span className="block text-[var(--text)]">恋爱</span>
                      <span className="block text-[var(--accent)]">求生宝典</span>
                    </h1>
                    <p className="mx-auto max-w-[24ch] text-[15px] leading-7 text-[var(--muted)]">
                      你以为你很会说话。直到恋爱高危场景真的出现。
                    </p>
                  </div>

                  <div className="mt-5">
                    <HomeIllustration />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <StatPill label="10题" value="一局结束" tone="accent" />
                    <StatPill label="3种风格" value="稳住 / 拆题 / 整活" tone="warm" />
                    <StatPill label="目标" value="玩完笑一下" tone="safe" />
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      type="button"
                      onClick={startGame}
                      className="w-full rounded-[22px] bg-[linear-gradient(135deg,var(--accent),#ef8d57)] px-5 py-4 text-[17px] font-semibold text-white shadow-bubble transition hover:translate-y-[-1px] active:scale-[0.99]"
                    >
                      开始求生
                    </button>
                    <button
                      type="button"
                      onClick={showRules}
                      className="w-full rounded-[22px] border border-[rgba(89,70,55,0.12)] bg-white/70 px-5 py-4 text-[15px] font-medium text-[var(--text)] transition hover:bg-white"
                    >
                      查看求生规则
                    </button>
                  </div>
                </SectionCard>

                <div className="grid grid-cols-3 gap-2 text-[12px] text-[var(--muted)]">
                  <div className="rounded-[18px] border border-[var(--border)] bg-white/65 p-3 leading-5 shadow-[0_6px_20px_rgba(91,72,56,0.05)]">
                    不严肃
                  </div>
                  <div className="rounded-[18px] border border-[var(--border)] bg-white/65 p-3 leading-5 shadow-[0_6px_20px_rgba(91,72,56,0.05)]">
                    不复杂
                  </div>
                  <div className="rounded-[18px] border border-[var(--border)] bg-white/65 p-3 leading-5 shadow-[0_6px_20px_rgba(91,72,56,0.05)]">
                    只图一乐
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'rules' && (
              <motion.div
                key="rules"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <SectionCard>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold">求生规则</h2>
                      <p className="text-sm text-[var(--muted)]">一眼看懂，直接开玩。</p>
                    </div>
                    <img
                      src={illustrationAssets.survivalGuide}
                      alt=""
                      aria-hidden="true"
                      className="h-20 w-20 shrink-0 select-none object-contain"
                      draggable="false"
                    />
                  </div>
                  <div className="space-y-3 text-[15px] leading-7 text-[var(--text)]">
                    <p>每局随机 10 道恋爱高危场景题。</p>
                    <p>每题有 3 种求生姿势：稳住、拆题、整活。</p>
                    <p>最后系统会根据你的选择，生成一份恋爱求生报告。</p>
                  </div>
                  <button
                    type="button"
                    onClick={hideRules}
                    className="mt-4 rounded-full bg-white/80 px-3 py-1 text-sm text-[var(--muted)]"
                  >
                    关闭
                  </button>
                </SectionCard>
                <button
                  type="button"
                  onClick={startGame}
                  className="w-full rounded-[22px] bg-[linear-gradient(135deg,var(--accent),#ef8d57)] px-5 py-4 text-[17px] font-semibold text-white shadow-bubble transition hover:translate-y-[-1px] active:scale-[0.99]"
                >
                  我懂了，开始求生
                </button>
              </motion.div>
            )}

            {phase === 'question' && currentQuestion && (
              <motion.div
                key={`q-${currentQuestion.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between px-1">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/70 shadow-[inset_0_1px_2px_rgba(89,70,55,0.06)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),#f39b73)] transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="ml-3 flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(89,70,55,0.08)] bg-white/80 shadow-[0_8px_18px_rgba(91,72,56,0.08)]">
                    <Sparkle className="h-4 w-4" tone="#f2b23d" />
                  </div>
                </div>

                <SectionCard className="relative space-y-4 overflow-hidden">
                  <QuestionAccent />
                  <div className="rounded-[26px] bg-[#fff7ef] px-5 py-6 pr-24 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <p className="text-[1.52rem] font-black leading-[1.38] tracking-[-0.03em] text-[var(--text)]">
                      “{getPromptText(currentQuestion.prompt)}”
                    </p>
                  </div>
                </SectionCard>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <BubbleButton
                      key={`${currentQuestion.id}-${option.style}-${index}`}
                      active={false}
                      onClick={() => chooseOption(index)}
                      disabled={phase !== 'question'}
                      variant={
                        option.style === '稳住型'
                          ? 'stable'
                          : option.style === '拆题型'
                            ? 'analytic'
                            : 'playful'
                      }
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/85 text-[14px] shadow-[0_8px_20px_rgba(91,72,56,0.08)]">
                          {option.style === '稳住型' ? '♡' : option.style === '拆题型' ? '◎' : '✦'}
                        </span>
                        <span className="flex-1 leading-8">{option.text}</span>
                      </div>
                    </BubbleButton>
                  ))}
                </div>

              </motion.div>
            )}

            {phase === 'feedback' && feedback && currentQuestion && (
              <>
                <div className="fixed inset-0 z-30 bg-[rgba(31,22,18,0.28)] backdrop-blur-[2px]" />
                <motion.div
                  key={`fb-${currentQuestion.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] px-3 pb-3"
                >
                  <div className="overflow-hidden rounded-t-[34px] border border-[rgba(89,70,55,0.08)] bg-[var(--surface-strong)] shadow-[0_-10px_30px_rgba(51,37,28,0.12)] backdrop-blur-md">
                    <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[rgba(89,70,55,0.16)]" />
                    <div className="relative px-5 py-5">
                      <div className="relative space-y-4 overflow-hidden rounded-[24px] bg-white/88 p-4 pr-20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                        <FeedbackPeek />
                        <p className="text-[15px] leading-8 text-[#8a5137]">{feedback.verdict}</p>
                      </div>
                    </div>

                    <div className="px-5 pb-5">
                      <button
                        type="button"
                        onClick={nextQuestion}
                        className="w-full rounded-[22px] bg-[linear-gradient(135deg,#3d342d,#625245)] px-5 py-4 text-[17px] font-semibold text-white shadow-bubble transition hover:translate-y-[-1px] active:scale-[0.99]"
                      >
                        {questionIndex === questions.length - 1 ? '生成求生报告' : '下一题看看还能不能活'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {phase === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4"
              >
                <SectionCard className="space-y-4">
                  <div className="relative overflow-hidden rounded-[28px] bg-[#fff8f1] p-4">
                    <ResultAccent />
                    <div className="space-y-2 pr-20">
                      <div className="text-sm font-medium text-[var(--muted)]">恋爱求生宝典</div>
                      <h2 className="whitespace-pre-line text-[1.76rem] font-black leading-[1.04] tracking-[-0.04em]">
                        {formatDisplayTitle(result.title)}
                      </h2>
                      <p className="max-w-[18ch] text-[14px] leading-6 text-[var(--muted)]">
                        你完成了这局恋爱高危场景测试。
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-[24px] bg-[#fff8f1] p-3.5">
                    <div className="text-sm font-semibold text-[#a04d2d]">求生姿势分布</div>
                    {STYLE_ORDER.map((style) => (
                      <div key={style} className="space-y-1">
                        <div className="flex items-center justify-between text-[14px]">
                          <span className="flex items-center gap-2">
                            <span
                              className={cx(
                                'flex h-7 w-7 items-center justify-center rounded-full border text-[12px] shadow-[0_8px_18px_rgba(91,72,56,0.06)]',
                                style === '稳住型' &&
                                  'border-[#cfe0d8] bg-[#eff8f2] text-[#4f8d69]',
                                style === '拆题型' &&
                                  'border-[#c9d9eb] bg-[#f2f7fc] text-[#5c83aa]',
                                style === '整活型' &&
                                  'border-[#f1d7a0] bg-[#fff7df] text-[#a77a19]',
                              )}
                            >
                              {style === '稳住型' ? '◡' : style === '拆题型' ? '⌁' : '✦'}
                            </span>
                            <span>{style}</span>
                          </span>
                          <span className="font-semibold">{percentages[style]}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/80">
                          <div
                            className={cx(
                              'h-full rounded-full',
                              style === '稳住型' && 'bg-[#6db48b]',
                              style === '拆题型' && 'bg-[#f2b23d]',
                              style === '整活型' && 'bg-[#e7774f]',
                            )}
                            style={{ width: `${Math.max(percentages[style], 6)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="mb-2 text-sm font-semibold text-[var(--muted)]">系统评价</div>
                      <p className="text-[14px] leading-6">{result.summary}</p>
                    </div>
                    <div>
                      <div className="mb-2 text-sm font-semibold text-[var(--muted)]">求生建议</div>
                      <p className="text-[14px] leading-6 text-[#8a5137]">{result.advice}</p>
                    </div>
                  </div>
                </SectionCard>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={replay}
                    className="w-full rounded-[22px] bg-[linear-gradient(135deg,var(--accent),#ef8d57)] px-5 py-4 text-[17px] font-semibold text-white shadow-bubble transition hover:translate-y-[-1px] active:scale-[0.99]"
                  >
                    再玩一次
                  </button>
                  <button
                    type="button"
                    onClick={shareResult}
                    className="w-full rounded-[22px] border border-[rgba(89,70,55,0.12)] bg-white/78 px-5 py-4 text-[15px] font-semibold text-[var(--text)] transition hover:bg-white"
                  >
                    分享结果
                  </button>
                </div>

                {shareStatus ? (
                  <div className="text-center text-xs text-[var(--muted)]">{shareStatus}</div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
