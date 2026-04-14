import {Lang} from '../model/i18n'
import {Layout} from '../layout/layout'
import {Header} from '../layout/header'
import {Sidebar} from '../layout/sidebar'
import {Footer} from '../layout/footer'
import {COMMAND_GROUPS} from '../model/commands'

const CodeBlock = ({code}: {code: string}) => (
    <div class="relative group">
        <pre class="bg-gray-900 text-green-300 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{code}</pre>
        <button onclick={`navigator.clipboard.writeText(${JSON.stringify(code)})`}
                class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-md">
            Copy
        </button>
    </div>
)

export const CliHome = ({lang}: {lang: Lang}) => {
    const isEn = lang === 'en'

    return (
        <Layout title="lifectl CLI — Lifetime Soft Docs" lang={lang} activePath="/">
            <Header lang={lang}/>
            <div class="flex flex-1 max-w-[90rem] mx-auto w-full">
                <Sidebar lang={lang} activePath="/"/>

                <main class="flex-1 min-w-0 px-6 py-8 max-w-4xl">
                    {/* Hero */}
                    <div class="mb-10">
                        <div class="flex items-center gap-2 mb-3">
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                                CLI Reference
                            </span>
                            <span class="text-xs text-gray-400">v0.0.3</span>
                        </div>
                        <h1 class="text-3xl font-bold text-gray-900 mb-3">lifectl</h1>
                        <p class="text-gray-500 text-base leading-relaxed max-w-2xl">
                            {isEn
                                ? 'The official command-line tool for Lifetime Soft. Manage authentication, AI agents, and more directly from your terminal.'
                                : 'เครื่องมือ command-line อย่างเป็นทางการของ Lifetime Soft จัดการการยืนยันตัวตน AI Agent และอื่นๆ ได้โดยตรงจาก terminal'}
                        </p>
                    </div>

                    {/* Installation */}
                    <section id="installation" class="mb-12">
                        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg class="w-5 h-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            {isEn ? 'Installation' : 'การติดตั้ง'}
                        </h2>
                        <div class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <div class="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                                <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">npm</span>
                            </div>
                            <div class="p-5">
                                <CodeBlock code="npm install -g @lifetimesoft/lifectl"/>
                                <p class="mt-3 text-sm text-gray-500">
                                    {isEn ? 'Requires Node.js 18 or later.' : 'ต้องการ Node.js 18 ขึ้นไป'}
                                </p>
                            </div>
                        </div>

                        <div class="mt-4 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <div class="px-5 py-3 border-b border-gray-100 bg-gray-50">
                                <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">{isEn ? 'Verify installation' : 'ตรวจสอบการติดตั้ง'}</span>
                            </div>
                            <div class="p-5">
                                <CodeBlock code="lifectl --version"/>
                            </div>
                        </div>
                    </section>

                    {/* Quick start */}
                    <section class="mb-12">
                        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg class="w-5 h-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            {isEn ? 'Quick Start' : 'เริ่มต้นใช้งาน'}
                        </h2>
                        <div class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <div class="p-5 space-y-4">
                                {[
                                    {step: '1', label: isEn ? 'Login to your account' : 'เข้าสู่ระบบ', code: 'lifectl auth login'},
                                    {step: '2', label: isEn ? 'Check your status' : 'ตรวจสอบสถานะ', code: 'lifectl auth status'},
                                    {step: '3', label: isEn ? 'Push your first agent' : 'Push agent แรก', code: 'lifectl agent push'},
                                    {step: '4', label: isEn ? 'List your agents' : 'ดูรายการ agent', code: 'lifectl agent list'},
                                ].map(item => (
                                    <div class="flex gap-4">
                                        <div class="w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                            {item.step}
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-sm font-medium text-gray-700 mb-1.5">{item.label}</p>
                                            <CodeBlock code={item.code}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Command groups */}
                    <section class="mb-12">
                        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg class="w-5 h-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                            {isEn ? 'Command Reference' : 'คำสั่งทั้งหมด'}
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {COMMAND_GROUPS.map(group => (
                                <div class="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-green-200 hover:shadow-md transition-all">
                                    <div class="flex items-center gap-2 mb-3">
                                        <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center" dangerouslySetInnerHTML={{__html:
                                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">${group.icon}</svg>`
                                        }}/>
                                        <span class="font-mono font-semibold text-gray-800">lifectl {group.name}</span>
                                    </div>
                                    <p class="text-sm text-gray-500 mb-4">{group.desc[lang]}</p>
                                    <div class="flex flex-wrap gap-2">
                                        {group.commands.map(cmd => {
                                            const cmdUrl = group.name === 'ai agent'
                                                ? `/cli/command/ai/agent/${cmd.name}`
                                                : `/cli/command/${group.name}/${cmd.name}`
                                            return (
                                                <a href={`${cmdUrl}?lang=${lang}`}
                                                   class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono bg-gray-50 text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors">
                                                    {cmd.name}
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Global options */}
                    <section class="mb-12">
                        <h2 class="text-xl font-bold text-gray-900 mb-4">{isEn ? 'Global Options' : 'ตัวเลือกทั่วไป'}</h2>
                        <div class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <table class="min-w-full text-sm">
                                <thead>
                                    <tr class="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                                        <th class="px-5 py-3 text-left font-medium">Option</th>
                                        <th class="px-5 py-3 text-left font-medium">{isEn ? 'Description' : 'คำอธิบาย'}</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-50">
                                    {[
                                        {flag: '--help, -h', desc: isEn ? 'Show help for a command' : 'แสดงความช่วยเหลือสำหรับคำสั่ง'},
                                        {flag: '--version, -v', desc: isEn ? 'Show CLI version' : 'แสดง version ของ CLI'},
                                        {flag: '--json', desc: isEn ? 'Output results as JSON' : 'แสดงผลเป็น JSON'},
                                    ].map(row => (
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-5 py-3 font-mono text-xs text-green-700">{row.flag}</td>
                                            <td class="px-5 py-3 text-gray-600">{row.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>

                {/* Right TOC */}
                <aside class="hidden xl:block w-52 shrink-0 py-8 pr-4">
                    <div class="sticky top-20">
                        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{isEn ? 'On this page' : 'ในหน้านี้'}</p>
                        <nav class="flex flex-col gap-1">
                            {[
                                {href: '#installation', label: isEn ? 'Installation' : 'การติดตั้ง'},
                                {href: '#quick-start', label: isEn ? 'Quick Start' : 'เริ่มต้นใช้งาน'},
                                {href: '#command-reference', label: isEn ? 'Command Reference' : 'คำสั่งทั้งหมด'},
                                {href: '#global-options', label: isEn ? 'Global Options' : 'ตัวเลือกทั่วไป'},
                            ].map(item => (
                                <a href={item.href} class="text-xs text-gray-500 hover:text-green-600 transition-colors py-1">{item.label}</a>
                            ))}
                        </nav>
                    </div>
                </aside>
            </div>
            <Footer lang={lang}/>
        </Layout>
    )
}
