/**
 * 开发时记得把 /static/js/custon.js 里面的重定向关闭
 * 升级到这v2后， /en 路径兼容参考 https://github.com/facebook/docusaurus/issues/4723, 暂时还不完美
 */

module.exports = {
  title: 'PlatON',
  tagline: 'PlatON',
  url: 'https://luo-dahui.github.io/',
  baseUrl: process.env.BASE_URL || '/alaya-devdocs/',
  organizationName: 'luo-dahui',
  projectName: 'Docs',
  scripts: [
    'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML',
    'https://cdn.jsdelivr.net/npm/mermaid@8.4.0/dist/mermaid.min.js',
    '/alaya-devdocs/js/custom.js'
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        label: 'English'
      },
      'zh-CN': {
        label: '中文'
      }
    }
  },
  favicon: 'img/logo.png',
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'log',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: './docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: ({ locale, versionDocsDirPath, docPath }) => {
            // Link to Crowdin for French docs
            if (locale !== 'en') {
              // return `https://github.com/AlayaNetwork/alaya-devdocs/tree/master/website/translated_docs/${locale}/${docPath}`;
              return `https://github.com/zfamz/alaya-devdocs/tree/v2/website/i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`
            }
            // Github 的英文文档链接
            return `https://github.com/zfamz/alaya-devdocs/tree/v2/website/docs/${docPath}`
          }
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/customTheme.css'), require.resolve('./src/css/custom.css')]
        }
      }
    ]
  ],
  plugins: [],
  themeConfig: {
    // hideableSidebar: true,
    colorMode: {
      // defaultMode: 'dark',
      disableSwitch: true
      // respectPrefersColorScheme: true,
    },
    // 高亮
    prism: {
      defaultLanguage: 'javascript'
      // theme: require('prism-react-renderer/themes/dracula')
    },
    sidebarCollapsible: true,
    image: 'img/undraw_online.svg',
    navbar: {
      // title: 'PlatON',
      style: 'dark',
      // hideOnScroll: true,
      logo: {
        src: 'img/alaya-logo.svg'
      },
      items: [
        {
          type: 'search',
          position: 'right'
        },
        {
          type: 'localeDropdown',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      copyright: `COPYRIGHT  © ${new Date().getFullYear()} Alaya NETWORK.`,
      // logo: {
      //   src: 'img/alaya-logo.svg',
      //   href: 'https://www.platon.network/en'
      // },
      links: [
        {
          items: [
            {
              label: 'Alaya network',
              img: 'img/alaya-logo.svg',
              href: 'https://www.alaya.network/en',
              hrefzh: 'https://www.alaya.network/'
            }
          ]
        },
        {
          items: [
            {
              label: 'Alaya network',
              href: 'https://www.alaya.network/en',
              hrefzh: 'https://www.alaya.network/'
            },
            {
              label: 'LatticeX.Foundation',
              href: 'https://latticex.foundation/home',
              hrefzh: 'https://latticex.foundation/home'
            },
            {
              label: 'Forum',
              href: 'https://forum.latticex.foundation/',
              hrefzh: 'https://forum.latticex.foundation/'
            }
          ]
        }
      ]
    },
    algolia: {
      apiKey: '93629ff7f338d13b29e1e4bae7615d17',
      indexName: 'alaya',
      resultsFooterComponent: null
      // contextualSearch: true,
      // algoliaOptions: {
      //   hitsPerPage: 10
      // }
    }
  }
}
