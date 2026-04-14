import {Lang} from '../model/i18n'
import {COMMAND_GROUPS} from '../model/commands'

export const Sidebar = ({lang, activePath}: {lang: Lang, activePath?: string}) => {
    const items = COMMAND_GROUPS.map(group => ({
        group,
        commands: group.commands,
    }))

    const navContent = (
        <nav class="p-3 flex flex-col gap-4">
            {/* Getting started */}
            <div>
                <div class="px-3 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Getting Started</div>
                <a href={`/cli?lang=${lang}`}
                   class={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${activePath === '/' ? 'cmd-active' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                    <svg class="w-3.5 h-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    {lang === 'th' ? 'ภาพรวม' : 'Overview'}
                </a>
                <a href={`/cli?lang=${lang}#installation`}
                   class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors">
                    <svg class="w-3.5 h-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    {lang === 'th' ? 'การติดตั้ง' : 'Installation'}
                </a>
            </div>

            {/* Command groups */}
            {items.map(({group, commands}) => (
                <div>
                    <div class="px-3 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span class="w-3.5 h-3.5 flex items-center justify-center" dangerouslySetInnerHTML={{__html:
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">${group.icon}</svg>`
                        }}/>
                        {group.name}
                    </div>
                    {commands.map(cmd => {
                        const path = `/cli/command/${group.name}/${cmd.name}`
                        const isActive = activePath === path
                        return (
                            <a href={`${path}?lang=${lang}`}
                               class={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${isActive ? 'cmd-active' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                                <svg class="w-3 h-3 shrink-0 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                                <span class="font-mono text-xs">{cmd.name}</span>
                            </a>
                        )
                    })}
                </div>
            ))}
        </nav>
    )

    return (
        <>
            {/* Desktop sidebar */}
            <aside id="cliSidebar"
                   class="hidden lg:flex flex-col w-56 shrink-0 border-r border-gray-100 bg-gray-50/50 h-[calc(100vh-56px)] overflow-y-auto sticky top-14">
                {navContent}
            </aside>

            {/* Mobile overlay */}
            <div id="cliSidebarOverlay" class="fixed inset-0 bg-black/40 z-40 hidden lg:hidden"></div>

            {/* Mobile drawer */}
            <div id="cliSidebarDrawer"
                 class="fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform -translate-x-full transition-transform duration-300 z-50 flex flex-col lg:hidden overflow-y-auto">
                <div class="p-4 flex justify-between items-center border-b border-gray-100">
                    <span class="font-semibold text-sm text-gray-800">lifectl CLI Docs</span>
                    <button id="cliSidebarClose" class="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors text-xl leading-none">&times;</button>
                </div>
                {navContent}
            </div>

            <script dangerouslySetInnerHTML={{__html: `
                const _toggle = document.getElementById('sidebarToggleMobile');
                const _drawer = document.getElementById('cliSidebarDrawer');
                const _overlay = document.getElementById('cliSidebarOverlay');
                const _close = document.getElementById('cliSidebarClose');
                const openDrawer = () => { _drawer.classList.remove('-translate-x-full'); _overlay.classList.remove('hidden'); };
                const closeDrawer = () => { _drawer.classList.add('-translate-x-full'); _overlay.classList.add('hidden'); };
                if (_toggle) _toggle.onclick = openDrawer;
                if (_close) _close.onclick = closeDrawer;
                if (_overlay) _overlay.onclick = closeDrawer;
            `}}/>
        </>
    )
}
