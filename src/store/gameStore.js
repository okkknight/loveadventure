import { create } from 'zustand';
import { QUESTIONS } from '../data/questions';

const STYLE_ORDER = ['稳住型', '拆题型', '整活型'];

const FEEDBACK_POOLS = {
  '稳住型': [
    {
      observation: '你把场面先接住了。',
      verdict: '像给剧情按了个暂停键，今天先不塌。',
    },
    {
      observation: '你没有上来就硬刚。',
      verdict: '这波很稳，沙发暂时保住。',
    },
    {
      observation: '你先照顾了对方的脸色。',
      verdict: '有点会哄，属于低调续命。',
    },
    {
      observation: '你把火气先拦在门外了。',
      verdict: '这一手像给关系套了个缓冲垫。',
    },
    {
      observation: '你让局面没有继续往下滑。',
      verdict: '稳得像给剧情补了胶带。',
    },
    {
      observation: '你处理得不吵不闹。',
      verdict: '看着平静，其实在偷偷救场。',
    },
    {
      observation: '你把气氛往回拉了一点。',
      verdict: '这局不算惊险，最多有点心虚。',
    },
    {
      observation: '你是那种会先扶住人的。',
      verdict: '说不上惊天动地，但挺能活。',
    },
    {
      observation: '你把回应放得很软。',
      verdict: '今天的恋爱值班表现不错。',
    },
    {
      observation: '你这句有种稳稳的笨拙感。',
      verdict: '不花，但很实用。',
    },
  ],
  '拆题型': [
    {
      observation: '你已经开始现场拆解了。',
      verdict: '脑子开得很快，感情线稍微慢半拍。',
    },
    {
      observation: '你像把题目拖进会议室了。',
      verdict: '有理有据，但恋爱不是答辩。',
    },
    {
      observation: '你很认真地想把事情讲明白。',
      verdict: '逻辑满分，氛围分打了个折。',
    },
    {
      observation: '你开始做结构分析了。',
      verdict: '像在修 bug，不像在哄人。',
    },
    {
      observation: '你抓重点抓得很准。',
      verdict: '就是语气像给对方做汇报。',
    },
    {
      observation: '你对问题的定位很快。',
      verdict: '很聪明，但别把人当案例。',
    },
    {
      observation: '你把路线想得很清楚。',
      verdict: '省时间，省情绪，顺手省了点浪漫。',
    },
    {
      observation: '你进入了问题解决模式。',
      verdict: '思路没毛病，温度差一点点。',
    },
    {
      observation: '你这句像拿着放大镜在看。',
      verdict: '细节是对的，气氛先别碎。',
    },
    {
      observation: '你把答案拆得挺干净。',
      verdict: '有条理，但有点太像复盘会。',
    },
  ],
  '整活型': [
    {
      observation: '你已经把场面拐进综艺分区了。',
      verdict: '好笑是好笑，别把人笑没了。',
    },
    {
      observation: '你这句自带小剧场音效。',
      verdict: '梗很足，风险也很足。',
    },
    {
      observation: '你把尴尬直接转成喜剧效果。',
      verdict: '节目效果拉满，生存率看命。',
    },
    {
      observation: '你像在给这段关系加弹幕。',
      verdict: '很会玩，但记得留个正经出口。',
    },
    {
      observation: '你把气氛弄得有点活泼过头。',
      verdict: '有趣，且有一点点危险。',
    },
    {
      observation: '你把自己丢进了整活模式。',
      verdict: '能救场，也能顺手把场掀了。',
    },
    {
      observation: '你这句很会接梗。',
      verdict: '梗是有了，认真也别掉线。',
    },
    {
      observation: '你把局面抬成了段子。',
      verdict: '笑点在线，正题先别下班。',
    },
    {
      observation: '你像在用喜剧拆炸弹。',
      verdict: '胆子大，手也快，情绪未必跟得上。',
    },
    {
      observation: '你已经把火花搓出来了。',
      verdict: '精彩程度够，稳定性略飘。',
    },
  ],
};

function pickFeedback(style) {
  const pool = FEEDBACK_POOLS[style] ?? FEEDBACK_POOLS['稳住型'];
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

const RESULT_POOLS = {
  '稳定续命型选手': {
    summary: [
      '你属于那种先把情绪接住，再慢慢解决问题的人。场面一般不会炸，但你偶尔会默默把自己也顺手哄了。',
      '你大多数时候都能稳住局面，像给关系装了个减震器。别说，挺有用，就是有时会把自己也减得有点累。',
      '你不是最会讲话的那个，但通常是最先让人不那么难受的那个。属于低调但很能活的类型。',
      '你处理问题的方式比较柔和，先安抚，再推进。恋爱里这种人不一定最耀眼，但往往最耐用。',
      '你会先看对方脸色，再决定怎么出手。节奏不快，但很少把局面越搞越糟。',
      '你的风格像慢慢煮汤，不爆炸，但很能熬。只要别把所有锅都自己背了就行。',
      '你比较擅长把事情按下来，给关系留个缓冲区。说白了，就是比较会活。',
      '你属于那种不抢戏，但一出手就能把场面稳住的人。听着不酷，实际上挺强。',
      '你在关系里更像灭火器，不是燃料。虽然不热闹，但很关键。',
      '你给人的感觉是“可以放心交给你一点”。这已经很厉害了，别谦虚。',
    ],
    advice: [
      '可以继续稳，但别把“我来扛”当成默认设置。你也值得被照顾。',
      '稳住很好，偶尔也要把自己放进被安抚名单里。',
      '别每次都先哄别人，自己的情绪也得排个队。',
      '温柔是优点，但别温柔到把边界都顺手让出去。',
      '可以接住对方，也记得给自己留一点喘气位。',
      '会哄人很加分，但不是所有问题都得你一个人背。',
      '稳是稳了，记得偶尔也把需求说出来，不然太像隐形劳模。',
      '你的风格适合慢慢来，别被别人催成“现场速成班”。',
      '别老想着把局面修好，关系不是永动机，累了就得停。',
      '你已经很会照顾气氛了，剩下的可以留一点给自己。',
    ],
  },
  '恋爱逻辑工程师': {
    summary: [
      '你很会分析，像一边说话一边已经把事情拆成了流程图。问题是，恋爱很多时候不是流程，是情绪。',
      '你属于脑子跑得比嘴更快的人，认真是真的认真，就是有时像在给感情做答辩。',
      '你总能很快找到问题核心，这点很强。代价是，偶尔会让场面听起来像在开复盘会。',
      '你一出手就想把逻辑捋顺，效率很高，气氛略紧。好在你不是故意气人，只是太想讲明白。',
      '你很擅长把事情拆开看，像拿着放大镜追答案。只是对方有时想要的不是答案，是先被理解。',
      '你是会认真解决问题的类型，属于“方法论很强，表情管理稍微差一点”。',
      '你说的话通常没毛病，但有时听起来像在汇报工作。这个技能在职场很好用，在恋爱里要慎重。',
      '你容易进入“我先给你分析一下”的模式。聪明是聪明，就是略像开会。',
      '你在把问题拆开这件事上很有天赋，唯一的问题是别拆得把情绪也顺手拆没了。',
      '你不是不会哄，只是经常哄着哄着就开始讲道理了。',
    ],
    advice: [
      '分析可以，前面最好先补一句“我懂你不舒服”。',
      '少一点开会感，多一点人味，成功率会高很多。',
      '建议先接情绪，再讲方案，不然容易像在做项目评审。',
      '你的逻辑已经很能打了，接下来只差一点温柔包装。',
      '别急着给答案，先让对方知道你是在听她，不是在做题。',
      '你可以很会分析，但不要把每次聊天都开成复盘。',
      '想得明白是优点，讲得太明白有时就成了压力。',
      '如果能把“解决问题”前面加上“先抱一下”，会顺很多。',
      '你有脑子也有耐心，缺的主要是一点“先不分析”的克制。',
      '别让自己变成恋爱版说明书，偶尔也要有点人类温度。',
    ],
  },
  '气氛急救员': {
    summary: [
      '你很会把场面往轻松里带，像自带弹幕。问题是，弹幕太密的时候，正题会被你顺手盖过去。',
      '你是能把冷场救活的人，但也很容易把局面一起点燃。节目效果满分，安全系数看天。',
      '你一开口就有点喜剧体质，别人还在紧张，你已经在给这段关系加段子了。',
      '你属于那种能让场面活起来的人。代价是，别人有时分不清你是在哄还是在玩。',
      '你有把尴尬变笑点的天赋，听着很酷，实际上也有一点点危险。',
      '你总能把气氛抬起来，像自带小剧场灯光。只是有些题目不太适合演喜剧。',
      '你很会接梗，也很会跑偏，属于恋爱里的“气氛发动机”。',
      '你能让局面不至于太沉，但偶尔也会顺手把火苗吹大一点。',
      '你是那种会让人先笑出来的人。接着怎么收场，就看运气了。',
      '你不是不会认真，只是认真前总要先抖一个包袱。',
    ],
    advice: [
      '可以整活，但别让对方觉得你只会整活。',
      '先把笑点丢出去没问题，后面记得补一句正经的。',
      '梗是有了，别让它把事情本体盖住。',
      '轻松可以有，认真也别下线，不然容易翻车成综艺事故。',
      '你很会救场，但救完记得把正题捞回来。',
      '把气氛搞活是本事，把事情搞明白也得跟上。',
      '有趣是加分项，别把它当成唯一技能。',
      '可以带节奏，但别带着带着把人带懵了。',
      '你适合把局面逗热一点，不适合一直拿梗当答案。',
      '先笑再说没问题，关键时刻还是得落回正经。',
    ],
  },
  '温柔解决方案提供商': {
    summary: [
      '你既会接住情绪，也会顺手把问题理一理，属于那种不让人太慌的类型。',
      '你在照顾感受和解决问题之间找到了一个还不错的位置，挺成熟，也挺会活。',
      '你不是最吵的那一个，但常常是最能把局面稳住的人。',
      '你有点温柔，也有点主意，像是会先抱一下再带路。',
      '你处理事情的姿势比较顺，既不乱跑，也不乱怼。',
      '你属于那种能把关系往前推进一点点的人，不惊天动地，但很耐看。',
      '你既会照顾情绪，也不会把问题完全晾着，平衡感不错。',
      '你会让人觉得“跟你说话不太累”，这很值钱。',
      '你做事的风格像一条平缓的坡，舒服，没什么惊吓。',
      '你有一种“可以放心跟你商量”的气质，挺难得。',
    ],
    advice: [
      '先确认对方需不需要建议，别把帮忙直接开成套餐。',
      '你已经很会照顾了，偶尔也要允许自己少背一点。',
      '可以温柔，但别温柔到把自己的边界也一起递出去。',
      '继续保持这种顺手接住人的能力，真的很好用。',
      '别总想着当完美方案，偶尔当个会陪的人也行。',
      '你很适合把事情聊开，但记得别把对方聊成流程图。',
      '比起立刻解决，有时候先陪一会儿更能加分。',
      '你已经比很多人会处理了，别再偷偷自我加压。',
      '温柔和效率都不错，别忘了给自己留点体力。',
      '可以接住问题，也别忘了接住你自己。',
    ],
  },
  '甜梗续命大师': {
    summary: [
      '你既会哄，也会逗，恋爱体验感通常不会差。就是有时甜得太顺手，容易把严肃问题也顺便糖化。',
      '你很会把气氛变软，属于那种小情绪在你这里容易被融化掉的人。',
      '你像一颗带梗的糖，入口挺快乐，但别把所有味道都做成甜的。',
      '你在关系里很会制造轻松感，别人跟你相处通常不会太有压力。',
      '你既有可爱，也有一点小机灵，属于会让人想多看两眼的类型。',
      '你能把场面哄得很顺，偶尔还会顺手把自己也哄开心。',
      '你有种“会玩也会哄”的气质，挺讨喜。',
      '你让关系不太容易冷掉，像随身带了暖手宝。',
      '你很容易把小尴尬化成小开心，熟练得像有脚本。',
      '你这类人通常很好接近，但也要小心把正经事哄成玩笑。',
    ],
    advice: [
      '糖分够了以后，记得补一点认真，不然容易甜过头。',
      '可以可爱，但别把严肃题也一起萌混过去。',
      '先逗一逗没问题，关键时刻还是要落一句正经的。',
      '别让自己只剩“好玩”这个标签，稳定感也很重要。',
      '会哄人很加分，但别哄到把重点哄飞了。',
      '你可以很暖，但别暖到把边界都融化掉。',
      '轻松感很好，记得给关系留一点靠谱的底色。',
      '甜归甜，别让对方觉得你只会发糖。',
      '你很会把气氛变好，但别把事情变没。',
      '继续有趣，也继续认真，这样会更可爱。',
    ],
  },
  '危险边缘试探者': {
    summary: [
      '你是那种很会接梗、也很会拆题的人，问题是经常在“该认真”那一秒又拐去玩笑。',
      '你聪明、有梗、反应快，属于很容易把局面带热的那类人。只是热过头也会有点危险。',
      '你往往一半像分析师，一半像喜剧演员，合体效果挺猛，稳定性稍微飘一点。',
      '你不是不会处理，而是常常想把处理过程也做成段子。',
      '你在场面里很活跃，但有时活跃到让人分不清你是在哄还是在演。',
      '你有种“明明在认真，却像在开玩笑”的天赋。',
      '你能把场子撑起来，也能把正题带歪一点点。',
      '你有趣得很明显，靠谱得有点看心情。',
      '你这类人通常不无聊，但经常让对方想问：你到底在认真还是在营业？',
      '你像一把带闪光的刀，锋利是锋利，拿的时候也得小心。',
    ],
    advice: [
      '少一点抢答，多一点停顿，情绪题别急着上段子。',
      '可以玩，但别让对方觉得自己在跟脱口秀演员吵架。',
      '先收一收，别把局面逗得太活，正题还得回来。',
      '梗能救场，但不能无限续命，认真要跟上。',
      '你很会带节奏，问题是有些题不需要节奏，只需要靠谱。',
      '别总想着把气氛抬高，有时候低一点反而更稳。',
      '可以幽默，但别幽默到让人怀疑你没听懂。',
      '留一点正经出口，不然容易把自己也绕进去。',
      '如果要整活，记得先确认对方是不是笑得出来。',
      '你已经很会玩了，再加一点稳，战斗力会高很多。',
    ],
  },
  '恋爱多线程玩家': {
    summary: [
      '你会在稳住、分析和整活之间来回切换，状态在线时很会，状态飘的时候也很会把自己送进高危区。',
      '你今天像这个风格，明天像那个风格，主打一个谁来都能接两句。',
      '你不是固定路线的人，优点是灵活，缺点是有时自己都不知道下一秒会切哪条线。',
      '你属于很会随机应变的那类人，问题是手感一飘，就容易变成大型现场试错。',
      '你什么都能来一点，像把不同人格装进了同一个聊天框。',
      '你很难被一两个标签完全概括，毕竟你自己也挺会变。',
      '你像一套混合型打法，正常时很强，乱起来也挺有戏。',
      '你常常在稳、拆、整之间跳来跳去，恋爱体验感比较丰富，精神状态也比较丰富。',
      '你最大的特点就是不单调，最小的代价是偶尔会有点乱。',
      '你属于“什么场景都敢接一下”的类型，机动性很高。',
    ],
    advice: [
      '别总想着三种都来一点，关键时刻还是得先选一个稳的。',
      '灵活很好，但别把自己切成三个互相抢麦的版本。',
      '可以切风格，别切到对方看不懂你到底想干嘛。',
      '你会很多，但也别让自己每次都像临场抽卡。',
      '混合打法很强，前提是别把情绪题打成实验局。',
      '先找一个最像人的版本出来，再考虑加花。',
      '你很会变通，偶尔也需要一点稳定锚点。',
      '场面可以多线程，认真最好还是单线程。',
      '别让自己太像“什么都会一点”，那样容易显得有点飘。',
      '你已经够会应对了，再学会收一点，会更强。',
    ],
  },
};

function pickResultText(title, key) {
  const pool = RESULT_POOLS[title]?.[key] ?? RESULT_POOLS['稳定续命型选手'][key];
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

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
      summary: pickResultText('恋爱多线程玩家', 'summary'),
      advice: pickResultText('恋爱多线程玩家', 'advice'),
    };
  }

  if (topCount >= 5 && diffTopSecond >= 2) {
    if (topStyle === '稳住型') {
      return {
        title: '稳定续命型选手',
        summary: pickResultText('稳定续命型选手', 'summary'),
        advice: pickResultText('稳定续命型选手', 'advice'),
      };
    }
    if (topStyle === '拆题型') {
      return {
        title: '恋爱逻辑工程师',
        summary: pickResultText('恋爱逻辑工程师', 'summary'),
        advice: pickResultText('恋爱逻辑工程师', 'advice'),
      };
    }
    return {
      title: '气氛急救员',
      summary: pickResultText('气氛急救员', 'summary'),
      advice: pickResultText('气氛急救员', 'advice'),
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
        summary: pickResultText('温柔解决方案提供商', 'summary'),
        advice: pickResultText('温柔解决方案提供商', 'advice'),
      };
    }

    if (names.includes('稳住型') && names.includes('整活型')) {
      return {
        title: '甜梗续命大师',
        summary: pickResultText('甜梗续命大师', 'summary'),
        advice: pickResultText('甜梗续命大师', 'advice'),
      };
    }

    if (names.includes('拆题型') && names.includes('整活型')) {
      return {
        title: '危险边缘试探者',
        summary: pickResultText('危险边缘试探者', 'summary'),
        advice: pickResultText('危险边缘试探者', 'advice'),
      };
    }
  }

  if (topStyle === '稳住型') {
    return {
      title: '稳定续命型选手',
      summary: pickResultText('稳定续命型选手', 'summary'),
      advice: pickResultText('稳定续命型选手', 'advice'),
    };
  }

  if (topStyle === '拆题型') {
    return {
      title: '恋爱逻辑工程师',
      summary: pickResultText('恋爱逻辑工程师', 'summary'),
      advice: pickResultText('恋爱逻辑工程师', 'advice'),
    };
  }

  return {
    title: '气氛急救员',
    summary: pickResultText('气氛急救员', 'summary'),
    advice: pickResultText('气氛急救员', 'advice'),
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
      ...pickFeedback(option.style),
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
