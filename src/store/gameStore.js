import { create } from 'zustand';
import { QUESTIONS } from '../data/questions';

const STYLE_ORDER = ['稳住型', '拆题型', '整活型'];

function shuffle(array) {
  const next = [...array];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function createRoundQuestions() {
  return shuffle(QUESTIONS).slice(0, 10).map((question) => ({
    ...question,
    options: shuffle(question.options),
  }));
}

function getEmptyCounts() {
  return {
    '稳住型': 0,
    '拆题型': 0,
    '整活型': 0,
  };
}

function getResultMeta(counts) {
  const entries = STYLE_ORDER.map((style) => [style, counts[style] ?? 0]);
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const [topStyle, topCount] = sorted[0];
  const [, secondCount] = sorted[1];
  const thirdCount = sorted[2][1];
  const diffTopSecond = topCount - secondCount;
  const diffMax = topCount - thirdCount;

  if (diffMax <= 1) {
    return {
      title: '恋爱多线程玩家',
      summary:
        '你会在稳住、分析和整活之间来回切换，状态在线时很会，状态飘的时候也很会把自己送进高危区。',
      advice: '遇到真正危险的题，优先选择稳住。活下来之后，再考虑观点和节目效果。',
    };
  }

  if (topCount >= 5 && diffTopSecond >= 2) {
    if (topStyle === '稳住型') {
      return {
        title: '稳定续命型选手',
        summary:
          '你大多数时候会先接住情绪，再考虑怎么处理问题。你不是最吵的那个，但通常是最能活下来的那个。',
        advice: '继续保持，但别把所有问题都揽到自己身上。会哄人是优点，有边界也是魅力。',
      };
    }
    if (topStyle === '拆题型') {
      return {
        title: '恋爱逻辑工程师',
        summary:
          '你很认真，也确实想解决问题，只是有时候一开口就像在做事故复盘。你的脑子没问题，你只是太想讲道理。',
        advice: '下次输出方案前，先补一句“我知道你现在不太舒服”。这句话能显著提高生存概率。',
      };
    }
    return {
      title: '气氛急救员',
      summary:
        '你擅长用玩笑化解尴尬，小场面经常能靠你救回来。问题是，不是所有高危题都能靠梗蒙混过关。',
      advice: '可以整活，但整完记得认真接一句。先搞笑，再真诚，生存率更高。',
    };
  }

  if (sorted[0][1] === sorted[1][1]) {
    const names = sorted
      .filter(([, count]) => count === topCount)
      .map(([style]) => style)
      .join(' + ');

    if (names.includes('稳住型') && names.includes('拆题型')) {
      return {
        title: '温柔解决方案提供商',
        summary:
          '你既能照顾情绪，也愿意解决问题，是比较成熟的求生路线。只是偶尔会不小心进入“我都是为你好”的频道。',
        advice: '先确认对方需不需要建议。有时候陪着，比立刻解决更有用。',
      };
    }

    if (names.includes('稳住型') && names.includes('整活型')) {
      return {
        title: '甜梗续命大师',
        summary:
          '你既会哄，也会逗，恋爱体验感通常不会太差。轻微小情绪在你这里很容易被化解，但严肃问题不能一直靠可爱混过去。',
        advice: '糖分够了，关键时刻也要拿出一点认真。不然容易从“可爱”滑向“不靠谱”。',
      };
    }

    if (names.includes('拆题型') && names.includes('整活型')) {
      return {
        title: '危险边缘试探者',
        summary:
          '你不是不会聊天，你甚至挺聪明、挺有梗。但你经常在该接情绪的时候，选择分析或者开玩笑。',
        advice: '少一点抢答，多一点停顿。恋爱不是限时答题，沉默两秒通常比乱说一句安全。',
      };
    }
  }

  if (topStyle === '稳住型') {
    return {
      title: '稳定续命型选手',
      summary:
        '你大多数时候会先接住情绪，再考虑怎么处理问题。你不是最吵的那个，但通常是最能活下来的那个。',
      advice: '继续保持，但别把所有问题都揽到自己身上。会哄人是优点，有边界也是魅力。',
    };
  }

  if (topStyle === '拆题型') {
    return {
      title: '恋爱逻辑工程师',
      summary:
        '你很认真，也确实想解决问题，只是有时候一开口就像在做事故复盘。你的脑子没问题，你只是太想讲道理。',
      advice: '下次输出方案前，先补一句“我知道你现在不太舒服”。这句话能显著提高生存概率。',
    };
  }

  return {
    title: '气氛急救员',
    summary:
      '你擅长用玩笑化解尴尬，小场面经常能靠你救回来。问题是，不是所有高危题都能靠梗蒙混过关。',
    advice: '可以整活，但整完记得认真接一句。先搞笑，再真诚，生存率更高。',
  };
}

function createInitialState() {
  return {
    phase: 'home',
    questions: [],
    questionIndex: 0,
    counts: getEmptyCounts(),
    selectedOptionIndex: null,
    feedback: null,
    result: null,
    shareStatus: '',
  };
}

export const useGameStore = create((set, get) => ({
  ...createInitialState(),
  startGame: () => {
    set({
      phase: 'question',
      questions: createRoundQuestions(),
      questionIndex: 0,
      counts: getEmptyCounts(),
      selectedOptionIndex: null,
      feedback: null,
      result: null,
      shareStatus: '',
    });
  },
  showRules: () => set({ phase: 'rules' }),
  hideRules: () => set({ phase: 'home' }),
  chooseOption: (optionIndex) => {
    const state = get();
    if (state.phase !== 'question') return;

    const question = state.questions[state.questionIndex];
    const option = question.options[optionIndex];
    const counts = {
      ...state.counts,
      [option.style]: state.counts[option.style] + 1,
    };
    const feedback = {
      style: option.style,
      observation: option.feedback.observation,
      verdict: option.feedback.verdict,
    };

    const isLast = state.questionIndex === state.questions.length - 1;
    const result = isLast ? getResultMeta(counts) : null;

    set({
      counts,
      selectedOptionIndex: optionIndex,
      feedback,
      result,
      phase: 'feedback',
      shareStatus: '',
    });
  },
  nextQuestion: () => {
    const state = get();
    if (state.phase !== 'feedback') return;

    const isLast = state.questionIndex === state.questions.length - 1;
    if (isLast) {
      set({ phase: 'result' });
      return;
    }

    set({
      phase: 'question',
      questionIndex: state.questionIndex + 1,
      selectedOptionIndex: null,
      feedback: null,
      result: null,
      shareStatus: '',
    });
  },
  replay: () => {
    set({
      phase: 'question',
      questions: createRoundQuestions(),
      questionIndex: 0,
      counts: getEmptyCounts(),
      selectedOptionIndex: null,
      feedback: null,
      result: null,
      shareStatus: '',
    });
  },
  restart: () => {
    set(createInitialState());
  },
  shareResult: async () => {
    const { counts, result } = get();
    if (!result) return;

    const total = STYLE_ORDER.reduce((sum, style) => sum + counts[style], 0) || 1;
    const shareText = [
      `我在《恋爱求生宝典》里测出了【${result.title}】。`,
      `系统评价：${result.summary}`,
      `求生姿势分布：稳住型 ${Math.round((counts['稳住型'] / total) * 100)}%，拆题型 ${Math.round((counts['拆题型'] / total) * 100)}%，整活型 ${Math.round((counts['整活型'] / total) * 100)}%。`,
      '你也来测测自己的求生姿势。',
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({ title: '恋爱求生宝典', text: shareText });
        set({ shareStatus: '已调用分享' });
        return;
      }
    } catch {
      // Ignore and fall through to copy fallback.
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
        set({ shareStatus: '已复制分享文案' });
        return;
      }

      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textarea);
      set({ shareStatus: copied ? '已复制分享文案' : '分享文案已生成，请手动复制' });
    } catch {
      set({ shareStatus: '分享文案已生成，请手动复制' });
    }
  },
}));

export { STYLE_ORDER, createRoundQuestions };
