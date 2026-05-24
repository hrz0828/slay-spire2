import type { Locale } from '@/lib/i18n';

export type InfoPageSlug =
  | 'about'
  | 'contact'
  | 'privacy-policy'
  | 'terms'
  | 'editorial-policy';

type LocalizedText = Record<Locale, string>;
type LocalizedParagraphs = Record<Locale, string[]>;

export type InfoPage = {
  slug: InfoPageSlug;
  title: LocalizedText;
  description: LocalizedText;
  updatedAt: string;
  sections: Array<{
    heading: LocalizedText;
    body: LocalizedParagraphs;
  }>;
};

export const contactEmail = 'hanruizhao001@gmail.com';

export const infoPages: InfoPage[] = [
  {
    slug: 'about',
    updatedAt: '2026-05-24',
    title: {
      zh: '关于我们',
      en: 'About Us',
    },
    description: {
      zh: '了解杀戮尖塔 2 攻略站的内容定位、资料来源和维护方式。',
      en: 'Learn about the purpose, sources, and maintenance process behind Slay the Spire 2 Guide.',
    },
    sections: [
      {
        heading: { zh: '网站定位', en: 'What This Site Covers' },
        body: {
          zh: [
            '杀戮尖塔 2 攻略站是一个非官方玩家资料站，面向需要快速查阅卡牌、遗物、职业构筑、Boss 机制和路线决策的玩家。',
            '我们优先整理可执行的攻略内容：新手如何完成首次通关、每个阶段应补足什么能力、怎样用卡牌和遗物协同提高稳定性。',
          ],
          en: [
            'Slay the Spire 2 Guide is an unofficial player resource for cards, relics, class plans, boss mechanics, and run decision-making.',
            'The site prioritizes practical guide content: how beginners can reach a first clear, what each act asks from a deck, and how card and relic synergies improve consistency.',
          ],
        },
      },
      {
        heading: { zh: '内容方法', en: 'Content Method' },
        body: {
          zh: [
            '页面内容会结合游戏内描述、公开版本信息、实战复盘和玩家常见问题整理。对于早期测试版本中可能变化的信息，我们会在后续版本中持续修订。',
            '本网站不隶属于 Mega Crit，也不是官方公告渠道。涉及商标、游戏名称和素材归其各自权利人所有。',
          ],
          en: [
            'Pages are built from in-game text, public version information, run reviews, and common player questions. Early-access details can change, so guide pages are revised as the game evolves.',
            'This site is not affiliated with Mega Crit and is not an official announcement channel. Game names, trademarks, and related assets belong to their respective owners.',
          ],
        },
      },
    ],
  },
  {
    slug: 'contact',
    updatedAt: '2026-05-24',
    title: {
      zh: '联系我们',
      en: 'Contact',
    },
    description: {
      zh: '提交内容修正、版权问题、合作与网站反馈。',
      en: 'Send corrections, copyright concerns, collaboration requests, and site feedback.',
    },
    sections: [
      {
        heading: { zh: '联系邮箱', en: 'Email' },
        body: {
          zh: [
            `如需反馈攻略错误、请求删除内容、报告版权问题或提出合作建议，请发送邮件至 ${contactEmail}。`,
            '为了方便处理，请在邮件中说明相关页面链接、问题描述、建议修改方式，以及必要的权利证明或截图。',
          ],
          en: [
            `For guide corrections, content removal requests, copyright concerns, or collaboration inquiries, email ${contactEmail}.`,
            'Please include the relevant page URL, a clear description of the issue, suggested corrections, and any necessary proof or screenshots.',
          ],
        },
      },
      {
        heading: { zh: '处理范围', en: 'What We Review' },
        body: {
          zh: [
            '我们会优先处理事实错误、过时版本说明、误导性攻略建议、页面无法访问、隐私请求和版权请求。',
            '普通攻略建议会根据资料完整度和玩家需求排期更新，无法保证所有建议都会立即发布。',
          ],
          en: [
            'We prioritize factual errors, outdated version notes, misleading advice, broken pages, privacy requests, and copyright requests.',
            'General guide suggestions are scheduled based on source quality and player demand, so not every suggestion can be published immediately.',
          ],
        },
      },
    ],
  },
  {
    slug: 'privacy-policy',
    updatedAt: '2026-05-24',
    title: {
      zh: '隐私政策',
      en: 'Privacy Policy',
    },
    description: {
      zh: '说明本站如何处理访问数据、Cookie、广告和第三方服务。',
      en: 'How this site handles access data, cookies, advertising, and third-party services.',
    },
    sections: [
      {
        heading: { zh: '我们收集的信息', en: 'Information We Collect' },
        body: {
          zh: [
            '本站主要提供公开攻略内容。我们不会要求用户注册账号，也不会主动收集敏感个人信息。',
            '服务器、托管平台或安全服务可能会自动记录基础访问日志，例如 IP 地址、浏览器类型、访问时间、请求页面和错误信息，用于安全、统计和故障排查。',
          ],
          en: [
            'This site mainly provides public guide content. We do not require account registration and do not intentionally collect sensitive personal information.',
            'Hosting, server, or security services may automatically record basic access logs such as IP address, browser type, visit time, requested pages, and error information for security, analytics, and troubleshooting.',
          ],
        },
      },
      {
        heading: { zh: 'Cookie 与广告', en: 'Cookies and Advertising' },
        body: {
          zh: [
            '本站可能使用 Google AdSense 或类似广告服务展示广告。广告合作方可能使用 Cookie 或类似技术，根据访问情况、设备信息或兴趣信号投放和衡量广告。',
            '用户可以在浏览器设置中限制或删除 Cookie，也可以通过 Google 的广告设置管理个性化广告偏好。',
          ],
          en: [
            'This site may use Google AdSense or similar advertising services. Advertising partners may use cookies or similar technologies to deliver and measure ads based on visits, device information, or interest signals.',
            'You can limit or delete cookies in your browser settings and manage personalized ad preferences through Google ad settings.',
          ],
        },
      },
      {
        heading: { zh: '第三方链接', en: 'Third-Party Links' },
        body: {
          zh: [
            '本站可能链接到游戏商店、官方公告、社区资料或其他第三方页面。第三方网站拥有自己的隐私政策，本站不控制其内容和数据处理方式。',
          ],
          en: [
            'This site may link to game stores, official announcements, community resources, or other third-party pages. Those sites have their own privacy policies, and we do not control their content or data practices.',
          ],
        },
      },
      {
        heading: { zh: '联系我们', en: 'Contact' },
        body: {
          zh: [`如需提出隐私相关请求，请发送邮件至 ${contactEmail}。`],
          en: [`For privacy-related requests, email ${contactEmail}.`],
        },
      },
    ],
  },
  {
    slug: 'terms',
    updatedAt: '2026-05-24',
    title: {
      zh: '使用条款',
      en: 'Terms of Use',
    },
    description: {
      zh: '使用本站内容、链接和攻略建议时适用的基本条款。',
      en: 'Basic terms that apply when using this site, its links, and guide recommendations.',
    },
    sections: [
      {
        heading: { zh: '内容用途', en: 'Use of Content' },
        body: {
          zh: [
            '本站内容仅用于游戏攻略、资料查询和学习交流，不构成官方说明、商业承诺或保证结果的服务。',
            '你可以分享本站链接，但未经许可不得批量复制、镜像或将内容包装成误导性的官方资料。',
          ],
          en: [
            'Site content is provided for game guides, reference, and learning. It is not official documentation, a commercial guarantee, or a promise of in-game results.',
            'You may share links to this site, but you may not bulk copy, mirror, or present the content as misleading official material without permission.',
          ],
        },
      },
      {
        heading: { zh: '准确性与更新', en: 'Accuracy and Updates' },
        body: {
          zh: [
            '由于游戏版本可能调整，卡牌、遗物、敌人和构筑建议可能随时间变化。我们会尽力维护内容，但不保证所有页面始终完全准确。',
            '使用攻略建议时，请结合你当前游戏版本、角色、卡组状态和个人熟练度判断。',
          ],
          en: [
            'Because game versions can change, card text, relic behavior, enemies, and build recommendations may shift over time. We work to maintain pages but cannot guarantee every page is always complete or current.',
            'Use guide advice together with your current game version, character, deck state, and personal familiarity.',
          ],
        },
      },
      {
        heading: { zh: '责任限制', en: 'Limitation of Liability' },
        body: {
          zh: [
            '本站不对因使用或无法使用本站内容而产生的损失承担责任，包括游戏进度、账号、设备、网络或第三方服务相关问题。',
          ],
          en: [
            'We are not responsible for losses caused by using or being unable to use this site, including issues related to game progress, accounts, devices, networks, or third-party services.',
          ],
        },
      },
    ],
  },
  {
    slug: 'editorial-policy',
    updatedAt: '2026-05-24',
    title: {
      zh: '编辑原则与免责声明',
      en: 'Editorial Policy and Disclaimer',
    },
    description: {
      zh: '说明本站如何撰写、更新和标注攻略内容。',
      en: 'How this site writes, updates, and labels guide content.',
    },
    sections: [
      {
        heading: { zh: '原创与修订', en: 'Original Writing and Revisions' },
        body: {
          zh: [
            '本站攻略以原创整理为主，目标是把分散的卡牌信息、战斗经验和构筑判断转化成清晰的决策建议。',
            '当游戏补丁、公开资料或玩家反馈显示内容过时，我们会优先修订影响判断的页面，例如 Boss 机制、核心卡牌、遗物收益和新手路线。',
          ],
          en: [
            'Guide pages are written as original summaries that turn card information, combat experience, and build decisions into clear recommendations.',
            'When patches, public information, or player feedback show that content is outdated, we prioritize pages that affect decisions, such as boss mechanics, key cards, relic value, and beginner routing.',
          ],
        },
      },
      {
        heading: { zh: '广告与独立性', en: 'Advertising and Independence' },
        body: {
          zh: [
            '广告展示不会决定具体卡牌评级、构筑推荐或攻略结论。若未来发布赞助内容，我们会在页面中明确标注。',
            '本站是非官方资料站。所有攻略建议代表编辑整理和玩家经验，不代表游戏开发者或发行方立场。',
          ],
          en: [
            'Advertising does not determine card ratings, build recommendations, or guide conclusions. If sponsored content is ever published, it will be clearly labeled.',
            'This is an unofficial resource. Guide recommendations reflect editorial research and player experience, not the position of the game developer or publisher.',
          ],
        },
      },
      {
        heading: { zh: '反馈机制', en: 'Feedback Process' },
        body: {
          zh: [
            `如果你发现页面中存在事实错误、版本过期或表达不清的问题，请通过 ${contactEmail} 联系我们。`,
          ],
          en: [
            `If you find factual errors, outdated version details, or unclear wording, contact us at ${contactEmail}.`,
          ],
        },
      },
    ],
  },
];

export function getInfoPage(slug: string): InfoPage | undefined {
  return infoPages.find(page => page.slug === slug);
}
