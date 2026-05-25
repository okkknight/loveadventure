import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { STYLE_ORDER, useGameStore } from './store/gameStore';

const assetUrl = (file) => `${import.meta.env.BASE_URL}assets/${file}`;

const illustrationAssets = {
  home: assetUrl('love-home-hero.png'),
  question: assetUrl('love-question-accent.png'),
  feedback: assetUrl('love-feedback-peek.png'),
  phoneReply: assetUrl('love-phone-reply.png'),
  detective: assetUrl('love-detective.png'),
  survivalGuide: assetUrl('love-survival-guide.png'),
};

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
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

function QuoteMark({ className = '' }) {
  return (
    <svg viewBox="0 0 64 44" className={className} aria-hidden="true">
      <path
        d="M18.1 4.2c-7.4 2.4-12.3 8-12.3 16.8 0 5 2 9.1 5.6 11.8 2.8 2 6 2.8 8.9 2.8 4.5 0 8.7-1.9 11.3-5.2 2.2-2.8 3.3-6.5 3.3-10.6 0-1.5-.1-3-.4-4.4h-10.1c0 2.1-.3 3.8-1.1 5.1-.7 1.3-2 2.1-3.9 2.1-2.5 0-4.1-1.8-4.1-4.8 0-3.7 2.2-6.9 6.7-9.2L18.1 4.2Z"
        fill="currentColor"
        fillOpacity="0.34"
      />
      <path
        d="M46.1 4.2c-7.4 2.4-12.3 8-12.3 16.8 0 5 2 9.1 5.6 11.8 2.8 2 6 2.8 8.9 2.8 4.5 0 8.7-1.9 11.3-5.2 2.2-2.8 3.3-6.5 3.3-10.6 0-1.5-.1-3-.4-4.4H38.1c0 2.1-.3 3.8-1.1 5.1-.7 1.3-2 2.1-3.9 2.1-2.5 0-4.1-1.8-4.1-4.8 0-3.7 2.2-6.9 6.7-9.2L46.1 4.2Z"
        transform="translate(-8 0)"
        fill="currentColor"
        fillOpacity="0.23"
      />
    </svg>
  );
}

function ChevronLeft({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M15 5 8 12l7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M9 5 16 12l-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuestionHeader({ currentStep }) {
  return (
    <div className="grid grid-cols-[2rem_1fr_2rem] items-center gap-2 px-1 pt-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(89,70,55,0.08)] bg-white/72 shadow-[0_8px_18px_rgba(91,72,56,0.06)]">
        <ChevronLeft className="h-4 w-4 text-[var(--muted)]" />
      </div>
      <div className="text-center text-[1.08rem] font-medium tracking-[-0.02em] text-[var(--text)]">
        第 {currentStep}/10 题
      </div>
      <div className="flex justify-end">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(89,70,55,0.08)] bg-white/72 shadow-[0_8px_18px_rgba(91,72,56,0.06)]">
          <Sparkle className="h-4 w-4" tone="#e7774f" />
        </div>
      </div>
    </div>
  );
}

function QuestionCard({ prompt, className = '' }) {
  return (
    <div
      className={cx(
        'question-card relative overflow-hidden rounded-[30px] border border-[#ecdccd] bg-[linear-gradient(180deg,#fffdf8_0%,#fff8f1_100%)] p-5 shadow-[0_16px_42px_rgba(89,70,55,0.08)]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(242,178,61,0.07),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(231,119,79,0.07),transparent_24%),radial-gradient(circle_at_56%_88%,rgba(109,180,139,0.05),transparent_20%)]" />
      <div className="pointer-events-none absolute left-4 top-4 text-[#cdbeb1]">
        <QuoteMark className="h-8 w-8" />
      </div>
      <div className="relative z-10 min-h-[176px] pr-24 pt-7 pb-5 sm:pr-28">
        <p className="question-copy max-w-[20ch] whitespace-pre-line text-[1.25rem] font-extrabold leading-[1.62] tracking-[-0.04em] text-[var(--text)] sm:max-w-[22ch] sm:text-[1.32rem]">
          {prompt}
        </p>
      </div>
      <div className="pointer-events-none absolute bottom-[-2px] right-[-2px] h-28 w-28">
        <img
          src={illustrationAssets.phoneReply}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full select-none object-contain opacity-95"
          draggable="false"
        />
      </div>
    </div>
  );
}

function FeedbackCard({ observation, verdict, className = '' }) {
  return (
    <div
      className={cx(
        'relative overflow-hidden rounded-[30px] border border-[#ecdccd] bg-[linear-gradient(180deg,#fffdf8_0%,#fff7ef_100%)] p-5 shadow-[0_16px_42px_rgba(89,70,55,0.08)]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(242,178,61,0.07),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(231,119,79,0.07),transparent_24%),radial-gradient(circle_at_56%_88%,rgba(109,180,139,0.05),transparent_20%)]" />
      <div className="pointer-events-none absolute left-4 top-4 text-[#cdbeb1]">
        <QuoteMark className="h-8 w-8" />
      </div>
      <div className="relative z-10 min-h-[128px] pr-24 pt-7 pb-5 sm:pr-28">
        <div className="max-w-[18.5ch] space-y-2 sm:max-w-[20ch]">
          <p className="text-[0.92rem] leading-[1.55] tracking-[-0.02em] text-[var(--muted)]">
            {observation}
          </p>
          <p className="text-[1.04rem] font-semibold leading-[1.68] tracking-[-0.03em] text-[var(--text)] sm:text-[1.1rem]">
            {verdict}
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[-2px] right-[-2px] h-28 w-28">
        <img
          src={illustrationAssets.detective}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full select-none object-contain opacity-95"
          draggable="false"
        />
      </div>
    </div>
  );
}

function BubbleTail({ side = 'left', variant = 'stable' }) {
  const sideClass = side === 'left' ? '-left-1.5' : '-right-1.5';
  const borderTone =
    variant === 'stable' ? 'rgba(228,161,145,0.65)' : variant === 'analytic' ? 'rgba(149,184,219,0.65)' : 'rgba(232,187,100,0.65)';
  return (
    <div
      aria-hidden="true"
      className={cx(
        'absolute bottom-3 h-4 w-4 rotate-45 rounded-[4px] border bg-inherit shadow-[0_8px_14px_rgba(91,72,56,0.06)]',
        sideClass,
      )}
      style={{
        borderColor: borderTone,
      }}
    />
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

function ResultSeal({ className = '' }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <circle cx="48" cy="48" r="38" fill="#fff9f2" stroke="#e6d3c4" strokeWidth="2.4" />
      <circle cx="35" cy="39" r="3.5" fill="#544335" />
      <circle cx="61" cy="39" r="3.5" fill="#544335" />
      <path d="M35 55c5 6 21 6 26 0" fill="none" stroke="#544335" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M27 29c5-4 11-6 21-6" fill="none" stroke="#f1b59f" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M69 29c-5-4-11-6-21-6" fill="none" stroke="#f1b59f" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="29" cy="49" r="2.3" fill="#f48b66" fillOpacity="0.68" />
      <circle cx="67" cy="49" r="2.3" fill="#f48b66" fillOpacity="0.68" />
    </svg>
  );
}

function CompassIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <circle cx="48" cy="48" r="36" fill="#fff6e7" stroke="#d2b78c" strokeWidth="2.4" />
      <circle cx="48" cy="48" r="24" fill="#fffaf4" stroke="#bda37a" strokeWidth="2.2" />
      <path d="M48 29 58 48 48 67 38 48 48 29Z" fill="#f2b23d" stroke="#8d7b60" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M48 21v8" stroke="#8d7b60" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M48 67v8" stroke="#8d7b60" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M29 48h8" stroke="#8d7b60" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M59 48h8" stroke="#8d7b60" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="48" cy="48" r="3.5" fill="#8d7b60" />
    </svg>
  );
}

function StyleFaceIcon({ style, className = '' }) {
  if (style === '稳住型') {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="#fff5ef" stroke="#ef9e88" strokeWidth="1.6" />
        <path d="M11 17c2.2 0 3.4-1.1 4.5-2.5" fill="none" stroke="#5b4638" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M24.5 14.5c1.1 1.4 2.4 2.5 4.5 2.5" fill="none" stroke="#5b4638" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M14 25c2.2 2.3 9.8 2.3 12 0" fill="none" stroke="#5b4638" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (style === '拆题型') {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="#ecf4fb" stroke="#91b6d7" strokeWidth="1.6" />
        <path d="M12 15c2-2 4.5-2.6 7.8-2.6" fill="none" stroke="#365d83" strokeWidth="2" strokeLinecap="round" />
        <path d="M20.2 12.4c3.2 0 5.5.6 7.8 2.6" fill="none" stroke="#365d83" strokeWidth="2" strokeLinecap="round" />
        <path d="M14.2 25.2c2.2-1.3 4.4-1.9 5.8-1.9s3.6.6 5.8 1.9" fill="none" stroke="#365d83" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#fff2cf" stroke="#e8b55a" strokeWidth="1.6" />
      <path d="M10 14 15 14 18 19 22 12 27 19 30 14" fill="none" stroke="#5f4a1a" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M13 24c2.2 2.1 4.9 3.1 7 3.1s4.8-1 7-3.1" fill="none" stroke="#5f4a1a" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="24" r="1.6" fill="#5f4a1a" />
      <circle cx="24" cy="24" r="1.6" fill="#5f4a1a" />
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
    <div className="relative overflow-hidden rounded-[36px] border border-[#ead8c8] bg-[linear-gradient(180deg,rgba(255,250,243,0.98),rgba(255,244,235,0.98))] px-4 pb-5 pt-5 shadow-[0_18px_42px_rgba(122,92,65,0.09),inset_0_1px_0_rgba(255,255,255,0.9)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(242,178,61,0.16),transparent_22%),radial-gradient(circle_at_84%_18%,rgba(231,119,79,0.14),transparent_20%),radial-gradient(circle_at_56%_76%,rgba(109,180,139,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute left-4 top-4 opacity-90">
        <Sparkle className="h-5 w-5" tone="#f2b23d" />
      </div>
      <div className="pointer-events-none absolute right-5 top-5 rotate-[8deg] opacity-90">
        <div className="rounded-full border border-dashed border-[rgba(135,111,89,0.34)] bg-white/60 px-2 py-2 shadow-[0_10px_18px_rgba(91,72,56,0.06)]">
          <HeartNote className="h-12 w-12" />
        </div>
      </div>
      <div className="pointer-events-none absolute left-4 bottom-8 rotate-[-12deg] opacity-72">
        <FloatingPlane className="h-8 w-8" />
      </div>
      <div className="pointer-events-none absolute right-7 bottom-10 rotate-[12deg] opacity-75">
        <Sparkle className="h-4 w-4" tone="#f09c73" />
      </div>
      <div className="relative">
        <img
          src={illustrationAssets.home}
          alt=""
          aria-hidden="true"
          className="relative mx-auto h-[282px] w-full select-none object-contain drop-shadow-[0_28px_30px_rgba(99,75,56,0.09)]"
          draggable="false"
        />
        <div className="relative mx-auto -mt-1 w-[84%] rounded-[20px] border border-[#ebd9c9] bg-[rgba(255,251,245,0.94)] px-4 py-3 text-center shadow-[0_12px_24px_rgba(91,72,56,0.07)]">
          <div className="pointer-events-none absolute -left-2 top-3 h-4 w-4 rotate-[-12deg] rounded-[4px] bg-[#f4d29a] shadow-[0_2px_6px_rgba(91,72,56,0.08)]" />
          <div className="pointer-events-none absolute -right-2 top-4 h-4 w-4 rotate-[12deg] rounded-[4px] bg-[#f4d29a] shadow-[0_2px_6px_rgba(91,72,56,0.08)]" />
          <p className="text-[14px] leading-7 text-[var(--text)]">
            仅供娱乐
            <br />
            务必当真
          </p>
        </div>
      </div>
    </div>
  );
}

function BubbleButton({ active, children, onClick, variant = 'default', disabled }) {
  const base =
    'relative w-full overflow-hidden rounded-[28px] border px-4 py-[18px] text-left transition duration-200 active:scale-[0.992]';
  const variants = {
    default: active
      ? 'border-[#e99a79] bg-[#fff3ec] text-[#8b452e] shadow-[0_14px_28px_rgba(231,119,79,0.12)]'
      : 'border-[rgba(89,70,55,0.10)] bg-white/90 text-[var(--text)] hover:border-[#ddb7a0] hover:bg-white hover:shadow-[0_12px_26px_rgba(91,72,56,0.08)]',
    stable: active
      ? 'border-[#e3a191] bg-[#fff4ee] text-[#8b452e] shadow-[0_14px_28px_rgba(231,119,79,0.12)]'
      : 'border-[#e8cab8] bg-[linear-gradient(180deg,#fffaf7_0%,#fff4ef_100%)] text-[var(--text)] hover:border-[#deb2a0] hover:bg-white hover:shadow-[0_12px_26px_rgba(91,72,56,0.08)]',
    analytic: active
      ? 'border-[#97b7d8] bg-[#f3f8fe] text-[#345d83] shadow-[0_14px_28px_rgba(140,175,210,0.14)]'
      : 'border-[#c8d9ea] bg-[linear-gradient(180deg,#fbfdff_0%,#f4f8fd_100%)] text-[var(--text)] hover:border-[#bdd0e7] hover:bg-white hover:shadow-[0_12px_26px_rgba(91,72,56,0.08)]',
    playful: active
      ? 'border-[#e8bb64] bg-[#fff8e3] text-[#7c5b12] shadow-[0_14px_28px_rgba(232,187,100,0.13)]'
      : 'border-[#ead7a2] bg-[linear-gradient(180deg,#fffdf5_0%,#fff9e9_100%)] text-[var(--text)] hover:border-[#ead7a2] hover:bg-white hover:shadow-[0_12px_26px_rgba(91,72,56,0.08)]',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx(base, variants[variant], disabled && 'cursor-not-allowed opacity-70')}
    >
      <BubbleTail side={variant === 'analytic' || variant === 'playful' ? 'right' : 'left'} variant={variant} />
      {children}
    </button>
  );
}

function getPromptText(prompt) {
  const match = prompt.match(/[“"]([^”"]+)[”"]/);
  return match?.[1] ?? prompt;
}

function BookIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M5 4.8c0-.97.79-1.8 1.76-1.8H19v16.4H6.76A1.76 1.76 0 0 1 5 17.64V4.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8 6.8h7.2M8 10h7.2M8 13.2h4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 4.8A1.8 1.8 0 0 1 6.8 3H19v16.4H6.8A1.8 1.8 0 0 1 5 17.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
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
                className="relative overflow-hidden rounded-[42px] border border-[#eadbc9] bg-[linear-gradient(180deg,rgba(255,251,245,0.92),rgba(255,245,235,0.98))] px-4 py-5 shadow-[0_18px_50px_rgba(120,90,60,0.1)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(231,119,79,0.14),transparent_18%),radial-gradient(circle_at_82%_15%,rgba(242,178,61,0.14),transparent_16%),radial-gradient(circle_at_18%_84%,rgba(109,180,139,0.08),transparent_20%),radial-gradient(circle_at_84%_86%,rgba(242,178,61,0.08),transparent_18%)]" />
                <div className="pointer-events-none absolute left-2 top-3 -rotate-[10deg] opacity-82">
                  <FloatingPlane className="h-10 w-10" />
                </div>
                <div className="pointer-events-none absolute left-8 top-24 rotate-[-8deg] opacity-55">
                  <Sparkle className="h-4 w-4" tone="#f2b23d" />
                </div>
                <div className="pointer-events-none absolute right-5 top-8 rotate-[12deg] opacity-78">
                  <Sparkle className="h-5 w-5" tone="#f2b23d" />
                </div>
                <div className="pointer-events-none absolute right-8 bottom-32 rotate-[8deg] opacity-78">
                  <div className="rounded-full border border-dashed border-[rgba(145,122,97,0.32)] bg-white/48 px-2 py-2 shadow-[0_8px_16px_rgba(91,72,56,0.05)]">
                    <HeartNote className="h-10 w-10" />
                  </div>
                </div>
                <div className="pointer-events-none absolute left-5 bottom-6 opacity-65">
                  <svg viewBox="0 0 90 28" className="h-8 w-20" aria-hidden="true">
                    <path
                      d="M8 18c7-9 16-9 23 0s16 9 23 0 16-9 23 0"
                      fill="none"
                      stroke="#d9bca8"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="relative flex flex-col items-center text-center">
                  <div className="space-y-2 pt-1">
                    <h1
                      className="text-[clamp(3.4rem,16vw,4.65rem)] font-black leading-[0.84] tracking-[-0.09em]"
                      style={{
                        fontFamily: 'ui-rounded, "SF Pro Rounded", "Arial Rounded MT Bold", system-ui, sans-serif',
                      }}
                    >
                      <span className="block text-[var(--text)] drop-shadow-[0_1px_0_rgba(255,255,255,0.24)]">恋爱</span>
                      <span className="block text-[#ef6f4d] drop-shadow-[0_1px_0_rgba(255,255,255,0.18)]">求生宝典</span>
                    </h1>
                  </div>

                  <div className="mt-4 inline-flex max-w-[92%] items-center justify-center rounded-full border border-[#dbc5a9] bg-[linear-gradient(180deg,#f3e4c8,#ead7b4)] px-5 py-2.5 text-[14px] font-medium text-[#6f5434] shadow-[0_10px_20px_rgba(130,103,72,0.08)] rotate-[-1.5deg]">
                    在爱情这座迷宫里，活着才有糖吃。
                  </div>

                  <div className="mt-4 w-full">
                    <HomeIllustration />
                  </div>

                  <div className="mt-4 flex w-full flex-col gap-3">
                    <button
                      type="button"
                      onClick={startGame}
                      className="w-full rounded-[28px] bg-[linear-gradient(135deg,#f06f4f,#ea5f43)] px-5 py-[18px] text-[18px] font-extrabold tracking-[0.02em] text-white shadow-[0_18px_28px_rgba(231,119,79,0.26),inset_0_1px_0_rgba(255,255,255,0.24)] transition hover:translate-y-[-1px] active:scale-[0.99]"
                    >
                      开始求生
                    </button>
                    <button
                      type="button"
                      onClick={showRules}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-[26px] border border-[rgba(89,70,55,0.12)] bg-[rgba(255,255,255,0.72)] px-5 py-3.5 text-[15px] font-semibold text-[var(--text)] shadow-[0_10px_20px_rgba(91,72,56,0.05)] transition hover:bg-white"
                    >
                      <BookIcon className="h-5 w-5 text-[var(--muted)]" />
                      游戏规则
                    </button>
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
                      <h2 className="text-xl font-bold">怎么玩</h2>
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
                    <p>每局随机 10 道题，选你觉得更顺手的回答。</p>
                    <p>结束后会生成一份轻松的恋爱报告。</p>
                    <p>不用太认真，图一乐就行。</p>
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
                <QuestionHeader currentStep={currentStep} />

                <div className="px-1">
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/78 shadow-[inset_0_1px_2px_rgba(89,70,55,0.05)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#ef8a63_0%,#f6a17b_100%)] transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <QuestionCard prompt={getPromptText(currentQuestion.prompt)} />

                <div className="space-y-3 pt-1">
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
                      <div className="relative z-10 flex items-center gap-3 pr-7">
                        <span
                          className={cx(
                            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-[15px] shadow-[0_10px_20px_rgba(91,72,56,0.08)]',
                            option.style === '稳住型' &&
                              'border-[#ebb8a8] bg-[#fff6f1] text-[#d4704d]',
                            option.style === '拆题型' &&
                              'border-[#bed2e5] bg-[#f6fbff] text-[#6b8db2]',
                            option.style === '整活型' &&
                              'border-[#eed08a] bg-[#fff8e8] text-[#b78a1f]',
                          )}
                        >
                          {option.style === '稳住型' ? '◡' : option.style === '拆题型' ? '⌁' : '✦'}
                        </span>
                        <span className="flex-1 text-[14px] leading-7 text-[rgba(46,36,29,0.86)]">
                          {option.text}
                        </span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-[rgba(231,119,79,0.84)]" />
                      </div>
                    </BubbleButton>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'feedback' && feedback && currentQuestion && (
              <>
                <div className="fixed inset-0 z-30 bg-[rgba(31,22,18,0.22)] backdrop-blur-[2px]" />
                <motion.div
                  key={`fb-${currentQuestion.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] px-3 pb-3"
                >
                  <div className="overflow-hidden rounded-t-[36px] border border-[rgba(89,70,55,0.08)] bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(255,246,237,0.98))] shadow-[0_-12px_32px_rgba(51,37,28,0.10)] backdrop-blur-md">
                    <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[rgba(89,70,55,0.16)]" />
                    <div className="px-4 pb-4 pt-4">
                      <FeedbackCard observation={feedback.observation} verdict={feedback.verdict} />
                    </div>

                    <div className="px-4 pb-4">
                      <button
                        type="button"
                        onClick={nextQuestion}
                        className="w-full rounded-[24px] bg-[linear-gradient(135deg,#ef7e57,#ea6948)] px-5 py-4 text-[16px] font-semibold text-white shadow-[0_18px_30px_rgba(231,119,79,0.24)] transition hover:translate-y-[-1px] active:scale-[0.99]"
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
                <div className="relative overflow-hidden rounded-[30px] border border-[#ecdccd] bg-[linear-gradient(180deg,#fffdf8_0%,#fff8f1_100%)] p-5 shadow-[0_16px_42px_rgba(89,70,55,0.08)]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(242,178,61,0.07),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(231,119,79,0.07),transparent_24%),radial-gradient(circle_at_56%_88%,rgba(109,180,139,0.05),transparent_20%)]" />
                  <div className="pointer-events-none absolute right-4 top-4 text-[#cdbeb1]">
                    <QuoteMark className="h-8 w-8" />
                  </div>

                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-[var(--muted)]">
                        <Sparkle className="h-4 w-4 flex-none" tone="#f2b23d" />
                        <span className="text-[0.92rem] font-medium tracking-[0.06em] uppercase">RESULT</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-center">
                      <div className="text-[1.05rem] font-black leading-tight tracking-[-0.04em] text-[var(--text)] sm:text-[1.18rem]">
                        你的恋爱求生风格是
                      </div>
                      <div className="mx-auto inline-flex max-w-full items-center justify-center rounded-[24px] bg-[linear-gradient(180deg,rgba(255,248,239,0.95),rgba(255,240,228,0.98))] px-5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                        <h2 className="text-balance text-[1.45rem] font-black leading-[1.08] tracking-[-0.05em] text-[#f26e4b] sm:text-[1.62rem]">
                          「{result.title}」
                        </h2>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-[#ecdccd] bg-[rgba(255,255,255,0.88)] p-4 shadow-[0_10px_26px_rgba(96,70,50,0.05)]">
                      <div className="mb-2.5 flex items-end justify-between gap-3">
                        <div className="text-[0.92rem] font-black tracking-[-0.03em] text-[var(--text)]">
                          风格分布
                        </div>
                      </div>

                      <div className="space-y-3">
                        {STYLE_ORDER.map((style) => (
                          <div key={style} className="space-y-2">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={cx(
                                  'flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border shadow-[0_8px_18px_rgba(91,72,56,0.06)]',
                                  style === '稳住型' && 'border-[#efb4a4] bg-[#fff0eb]',
                                  style === '拆题型' && 'border-[#b8d1e7] bg-[#eef5fb]',
                                  style === '整活型' && 'border-[#f0cf8d] bg-[#fff5de]',
                                )}
                              >
                                <StyleFaceIcon style={style} className="h-[30px] w-[30px]" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-[0.92rem] font-semibold text-[var(--text)]">{style}</span>
                                  <span className="text-[1rem] font-black tracking-[-0.04em] text-[var(--text)]">
                                    {percentages[style]}%
                                  </span>
                                </div>
                                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#f4ece6]">
                                  <div
                                    className={cx(
                                      'h-full rounded-full',
                                      style === '稳住型' && 'bg-[#ef7d61]',
                                      style === '拆题型' && 'bg-[#9dbfdf]',
                                      style === '整活型' && 'bg-[#f2bf62]',
                                    )}
                                    style={{ width: `${Math.max(percentages[style], 6)}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[28px] border border-[#ecdccd] bg-[rgba(255,255,255,0.88)] p-4 shadow-[0_10px_26px_rgba(96,70,50,0.05)]">
                      <div className="absolute right-3 top-3">
                        <ResultSeal className="h-11 w-11 drop-shadow-[0_8px_20px_rgba(91,72,56,0.08)]" />
                      </div>
                      <div className="pr-16">
                        <div className="text-[0.92rem] font-black tracking-[-0.03em] text-[var(--text)]">
                          系统评价
                        </div>
                        <p className="mt-2 max-w-[22ch] text-[0.92rem] leading-[1.58] text-[var(--text)] sm:max-w-[24ch]">
                          {result.summary}
                        </p>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[28px] border border-[#ecdccd] bg-[linear-gradient(180deg,#fffdf8_0%,#fff5e7_100%)] p-4 shadow-[0_10px_26px_rgba(96,70,50,0.05)]">
                      <div className="absolute right-3 top-3">
                        <CompassIcon className="h-11 w-11 drop-shadow-[0_8px_20px_rgba(91,72,56,0.08)]" />
                      </div>
                      <div className="pr-16">
                        <div className="text-[0.92rem] font-black tracking-[-0.03em] text-[var(--text)]">
                          求生建议
                        </div>
                        <p className="mt-2 max-w-[22ch] text-[0.92rem] leading-[1.58] text-[var(--text)] sm:max-w-[24ch]">
                          {result.advice}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={replay}
                    className="w-full rounded-[24px] bg-[linear-gradient(135deg,#ef7e57,#ea6948)] px-5 py-4 text-[16px] font-semibold text-white shadow-[0_18px_30px_rgba(231,119,79,0.24)] transition hover:translate-y-[-1px] active:scale-[0.99]"
                  >
                    再玩一次
                  </button>
                  <button
                    type="button"
                    onClick={shareResult}
                    className="w-full rounded-[24px] border border-[rgba(89,70,55,0.12)] bg-white/88 px-5 py-4 text-[15px] font-semibold text-[var(--text)] transition hover:bg-white"
                  >
                    分享结果
                  </button>
                  <div className="pt-0.5 text-center text-[12px] text-[#ba9578]">
                    换个剧本，看看新结局 ~
                  </div>
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
