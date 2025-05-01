// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'TabooLib',
    url: 'https://tabooproject.org',
    baseUrl: '/TabooLib-guide/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'taboolib', // Usually your GitHub org/user name.
    projectName: 'taboolib', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".

    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    plugins: [],

    themes: [
        // ... Your other themes.
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                indexPages: false,
                hashed: true,
                language: ["en", "zh"],
                highlightSearchTermsOnTargetPage: true,
            },
        ],
    ],

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    routeBasePath: "/",
                },
                blog: false,
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                hideOnScroll: false,
                title: 'TabooLib',
                items: [
                    {
                        href: '/',
                        label: '首页',
                        position: 'left',
                    },
                    {
                        href: '/intro',
                        label: '阅读文档',
                        position: 'left',
                    },
                    {
                        href: '/kether-list',
                        label: 'Kehter 语句',
                        position: 'left',
                    },
                    {
                        href: 'https://github.com/8aka-Team/TabooLib-guide',
                        label: 'GitHub',
                        position: 'right',
                    },
                ]
            },
            footer: {
                copyright: `Copyright © ${new Date().getFullYear()} <b>8aka-Team</b> All Rights Reserved.`,
            },
            prism: {
                theme: themes.github,
                darkTheme: themes.dracula,
                additionalLanguages: ['java', 'kotlin', 'groovy', 'properties'],
            },
        }),
};

module.exports = config;
