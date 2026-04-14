import {Lang} from '../model/i18n'

const STATIC = 'https://static.lifetimesoft.com'

export const Header = ({lang}: {lang: Lang}) => {
    const langLabel = lang === 'th' ? 'English' : 'ภาษาไทย'
    const langTarget = lang === 'th' ? 'en' : 'th'

    return (
        <header class="sticky top-0 z-30 w-full bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
            <nav class="max-w-[90rem] mx-auto px-4 h-14 flex items-center gap-4">
                {/* Mobile sidebar toggle */}
                <button id="sidebarToggleMobile"
                        class="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:bg-gray-100 transition-colors shrink-0">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                    </svg>
                </button>

                {/* Logo */}
                <a href={`/cli?lang=${lang}`} class="flex items-center gap-2 font-semibold text-gray-900 hover:text-green-700 transition-colors shrink-0">
                    <img src={`${STATIC}/img/favicon.png`} class="w-7 h-7" alt="logo"/>
                    <span class="hidden sm:inline text-sm">
                        Lifetime Soft <span class="text-green-600 font-normal">CLI</span>
                        <span class="ml-1.5 text-xs font-normal text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">Docs</span>
                    </span>
                </a>

                {/* Breadcrumb divider */}
                <div class="hidden sm:block h-4 w-px bg-gray-200"></div>

                {/* Back to docs */}
                <a href={`/?lang=${lang}`}
                   class="hidden sm:flex items-center gap-1 text-xs text-gray-400 hover:text-green-600 transition-colors">
                    <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                    Docs Home
                </a>

                <div class="flex-1"></div>

                {/* Search */}
                <div class="hidden md:flex relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" id="globalSearch" placeholder="Search commands..."
                           class="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-48 transition-all"/>
                </div>

                {/* Lang toggle */}
                <a href={`?lang=${langTarget}`}
                   class="text-xs border border-gray-300 rounded-full px-3 py-1.5 text-gray-600 hover:border-green-700 hover:text-green-700 transition-colors">
                    {langLabel}
                </a>

                {/* Launch app */}
                <a href="https://app.lifetimesoft.com/"
                   class="text-sm border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors rounded-full px-4 py-1.5 font-medium hidden sm:block">
                    {lang === 'th' ? 'เข้าใช้งาน' : 'Launch App'}
                </a>
            </nav>
        </header>
    )
}
