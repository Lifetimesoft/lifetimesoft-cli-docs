import {Lang} from '../model/i18n'

const STATIC = 'https://static.lifetimesoft.com'

export const Layout = ({children, title, lang, activePath}: {
    children: any
    title: string
    lang: Lang
    activePath?: string
}) => {
    return (
        <html lang={lang}>
        <head>
            <title>{title}</title>
            <meta charset="utf-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
            <link type="image/x-icon" href={`${STATIC}/img/favicon.ico`} rel="shortcut icon"/>
            {/* Reuse compiled CSS from lifetimesoft-docs served at /css/style.css */}
            <link rel="stylesheet" href="/css/style.css"/>
            <script defer src="/js/alpine.js"></script>
            <style dangerouslySetInnerHTML={{__html: `
                [x-cloak]{display:none!important}
                .cli-code{font-family:'Courier New',Courier,monospace}
                .cmd-active{background-color:#f0fdf4;color:#15803d;font-weight:600}
            `}}/>
        </head>
        <body>
        <div class="body flex flex-col min-h-screen bg-white">
            {children}
        </div>
        <script dangerouslySetInnerHTML={{__html: `document.getElementById('footer-year').textContent = new Date().getFullYear();`}}/>
        </body>
        </html>
    )
}
