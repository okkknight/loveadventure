import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { STYLE_ORDER, useGameStore } from './store/gameStore';

const stickerSheet = '/assets/love-survival-stickers.png';

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
        'rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-soft backdrop-blur-sm',
        className,
      )}
    >
      {children}
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

function StickerArt({ position = 'center', fit = 'contain', className = '', alt = '' }) {
  return (
    <div className={className}>
      <img
        src={stickerSheet}
        alt={alt}
        className={cx('h-full w-full select-none', fit === 'cover' ? 'object-cover' : 'object-contain')}
        style={{ objectPosition: position }}
        draggable="false"
      />
    </div>
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
    <div className="min-h-screen px-4 py-6 text-[var(--text)] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[430px] items-center">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-x-4 -top-2 h-24 rounded-full bg-[radial-gradient(circle,rgba(231,119,79,0.16)_0%,transparent_70%)] blur-3xl" />

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
                  <div className="space-y-3">
                    <div className="inline-flex rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-semibold tracking-[0.14em] text-[#a04d2d]">
                      恋爱高危场景测试
                    </div>
                    <h1 className="text-[2.15rem] font-black leading-[1.02] tracking-[-0.04em]">
                      恋爱求生宝典
                    </h1>
                    <p className="max-w-[28ch] text-[15px] leading-7 text-[var(--muted)]">
                      你以为你很会说话。直到恋爱高危场景真的出现。
                    </p>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-[28px] border border-[rgba(89,70,55,0.08)] bg-[#fffaf5] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <StickerArt
                      alt="恋爱求生宝典素材"
                      className="h-[240px] w-full"
                      fit="contain"
                      position="center"
                    />
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
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">求生规则</h2>
                    <button
                      type="button"
                      onClick={hideRules}
                      className="rounded-full bg-white/80 px-3 py-1 text-sm text-[var(--muted)]"
                    >
                      关闭
                    </button>
                  </div>
                  <div className="space-y-3 text-[15px] leading-7 text-[var(--text)]">
                    <p>每局随机 10 道恋爱高危场景题。</p>
                    <p>每题有 3 种求生姿势：稳住、拆题、整活。</p>
                    <p>最后系统会根据你的选择，生成一份恋爱求生报告。</p>
                  </div>
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
                  <div className="ml-3 h-8 w-8 rounded-full border border-[rgba(89,70,55,0.08)] bg-white/80 shadow-[0_8px_18px_rgba(91,72,56,0.08)]" />
                </div>

                <SectionCard className="relative space-y-4 overflow-hidden">
                  <div className="absolute right-3 top-3 h-20 w-20 opacity-85">
                    <StickerArt alt="" className="h-full w-full" fit="cover" position="77% 24%" />
                  </div>
                  <div className="rounded-[26px] bg-[#fff7ef] px-5 py-6 pr-24 text-left">
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
                      <div className="absolute right-3 top-3 h-[72px] w-[72px]">
                        <StickerArt alt="" className="h-full w-full" fit="cover" position="28% 74%" />
                      </div>
                      <div className="space-y-4 rounded-[24px] bg-white/88 p-4 pr-20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
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
                <SectionCard className="space-y-5">
                  <div className="relative overflow-hidden rounded-[28px] bg-[#fff8f1] p-5">
                    <div className="absolute right-2 top-1 h-20 w-20 rotate-[8deg] opacity-95">
                      <StickerArt alt="" className="h-full w-full" fit="cover" position="78% 78%" />
                    </div>
                    <div className="space-y-2 pr-16">
                      <div className="text-sm font-medium text-[var(--muted)]">恋爱求生宝典</div>
                      <h2 className="text-[1.9rem] font-black leading-[1.04] tracking-[-0.04em]">
                        {result.title}
                      </h2>
                      <p className="text-[15px] leading-7 text-[var(--muted)]">
                        你完成了这局恋爱高危场景测试。
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-[24px] bg-[#fff8f1] p-4">
                    <div className="text-sm font-semibold text-[#a04d2d]">求生姿势分布</div>
                    {STYLE_ORDER.map((style) => (
                      <div key={style} className="space-y-1">
                        <div className="flex items-center justify-between text-[14px]">
                          <span>{style}</span>
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
                      <p className="text-[15px] leading-7">{result.summary}</p>
                    </div>
                    <div>
                      <div className="mb-2 text-sm font-semibold text-[var(--muted)]">求生建议</div>
                      <p className="text-[15px] leading-7 text-[#8a5137]">{result.advice}</p>
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
