// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
    future: {
        experimental_faster: true,
    },
    title: 'TabooLib',
    url: 'https://taboo.8aka.org',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: '8aka-Team', // Usually your GitHub org/user name.
    projectName: 'TabooLib-Guide', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".

    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    plugins: [
        'docusaurus-plugin-image-zoom',
        [
            '@docusaurus/plugin-client-redirects',
            {
                redirects: [
                    {
                        from: '/plugin-store',
                        to: '/plugin-catalog',
                    },
                ],
            },
        ],
    ],

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
            zoom: {
                selector: '.markdown :not(em) > img',
                background: {
                    light: 'rgb(255, 255, 255)',
                    dark: 'rgb(36 36 36 / 80%)',
                },
            },
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
                        label: 'Kether 语句',
                        position: 'left',
                    },
                    {
                        href: '/plugin-catalog',
                        label: '插件汇总',
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
                style: 'dark',
                links: [
                    {
                        title: '文档',
                        items: [
                            {
                                label: '驿站主页',
                                to: 'https://8aka.org',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/8aka-Team/NitWikit',
                            },
                        ],
                    },
                    {
                        title: '交流',
                        items: [
                            {
                                label: 'QQ 群',
                                href: 'https://qm.qq.com/q/dENGavSflK',
                            },
                        ],
                    },
                ],
            },
            prism: {
                theme: themes.github,
                darkTheme: themes.dracula,
                additionalLanguages: ['java', 'kotlin', 'groovy', 'properties'],
            },
        }),
};

module.exports = config;
