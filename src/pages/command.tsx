import {Lang} from '../model/i18n'
import {Layout} from '../layout/layout'
import {Header} from '../layout/header'
import {Sidebar} from '../layout/sidebar'
import {Footer} from '../layout/footer'
import {findCommand, findGroup} from '../model/commands'

const CodeBlock = ({code}: {code: string}) => (
    <div class="relative group">
        <pre class="bg-gray-900 text-green-300 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{code}</pre>
        <button onclick={`navigator.clipboard.writeText(${JSON.stringify(code)})`}
                class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-md">
            Copy
        </button>
    </div>
)

export const CliCommandRef = ({lang, group: groupName, name}: {lang: Lang, group: string, name: string}) => {
    const isEn = lang === 'en'
    const cmd = findCommand(groupName, name)
    const group = findGroup(groupName)
    const activePath = `/cli/command/${groupName}/${name}`

    if (!cmd || !group) {
        return (
            <Layout title="Command not found — lifectl CLI Docs" lang={lang}>
                <Header lang={lang}/>
                <div class="flex flex-1 max-w-[90rem] mx-auto w-full">
                    <Sidebar lang={lang} activePath={activePath}/>
                    <main class="flex-1 px-6 py-16 text-center">
                        <h1 class="text-2xl font-bold text-gray-900 mb-2">{isEn ? 'Command not found' : 'ไม่พบคำสั่ง'}</h1>
                        <a href={`/cli?lang=${lang}`} class="text-green-600 hover:underline text-sm">{isEn ? '← Back to overview' : '← กลับหน้าหลัก'}</a>
                    </main>
                </div>
                <Footer lang={lang}/>
            </Layout>
        )
    }

    // Sibling commands for prev/next navigation
    const siblings = group.commands
    const idx = siblings.findIndex(c => c.name === name)
    const prev = idx > 0 ? siblings[idx - 1] : null
    const next = idx < siblings.length - 1 ? siblings[idx + 1] : null

    const cmdUrl = (cmdName: string) =>
        groupName === 'ai agent'
            ? `/cli/command/ai/agent/${cmdName}`
            : `/cli/command/${groupName}/${cmdName}`

    return (
        <Layout title={`lifectl ${groupName} ${name} — CLI Docs`} lang={lang} activePath={activePath}>
            <Header lang={lang}/>
            <div class="flex flex-1 max-w-[90rem] mx-auto w-full">
                <Sidebar lang={lang} activePath={activePath}/>

                <main class="flex-1 min-w-0 px-6 py-8 max-w-4xl">
                    {/* Breadcrumb */}
                    <nav class="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                        <a href={`/cli?lang=${lang}`} class="hover:text-green-600 transition-colors">lifectl</a>
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                        <span class="text-gray-500">{groupName}</span>
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                        <span class="font-medium text-gray-700">{name}</span>
                    </nav>

                    {/* Title */}
                    <div class="mb-8">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 font-mono">
                                {groupName}
                            </span>
                        </div>
                        <h1 class="text-3xl font-bold text-gray-900 font-mono mb-3">
                            lifectl {groupName} {name}
                        </h1>
                        <p class="text-gray-500 text-base leading-relaxed">{cmd.desc[lang]}</p>
                    </div>

                    {/* Synopsis */}
                    <section class="mb-8">
                        <h2 class="text-base font-semibold text-gray-700 mb-3 uppercase tracking-wider text-xs">{isEn ? 'Synopsis' : 'รูปแบบคำสั่ง'}</h2>
                        <CodeBlock code={cmd.synopsis}/>
                    </section>

                    {/* Parameters */}
                    {cmd.params && cmd.params.length > 0 && (
                        <section class="mb-8">
                            <h2 class="text-base font-semibold text-gray-700 mb-3 uppercase tracking-wider text-xs">{isEn ? 'Arguments' : 'อาร์กิวเมนต์'}</h2>
                            <div class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                <table class="min-w-full text-sm">
                                    <thead>
                                        <tr class="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                                            <th class="px-5 py-3 text-left font-medium">{isEn ? 'Argument' : 'อาร์กิวเมนต์'}</th>
                                            <th class="px-5 py-3 text-left font-medium">Type</th>
                                            <th class="px-5 py-3 text-left font-medium">{isEn ? 'Required' : 'จำเป็น'}</th>
                                            <th class="px-5 py-3 text-left font-medium">{isEn ? 'Description' : 'คำอธิบาย'}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-50">
                                        {cmd.params.map(p => (
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-5 py-3 font-mono text-xs text-green-700">&lt;{p.name}&gt;</td>
                                                <td class="px-5 py-3 font-mono text-xs text-gray-500">{p.type}</td>
                                                <td class="px-5 py-3">
                                                    {p.required
                                                        ? <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-50 text-red-600 border border-red-100">{isEn ? 'Required' : 'จำเป็น'}</span>
                                                        : <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-50 text-gray-500 border border-gray-200">{isEn ? 'Optional' : 'ไม่บังคับ'}</span>
                                                    }
                                                </td>
                                                <td class="px-5 py-3 text-gray-600">{p.desc[lang]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {/* Options */}
                    {cmd.options && cmd.options.length > 0 && (
                        <section class="mb-8">
                            <h2 class="text-base font-semibold text-gray-700 mb-3 uppercase tracking-wider text-xs">{isEn ? 'Options' : 'ตัวเลือก'}</h2>
                            <div class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                <table class="min-w-full text-sm">
                                    <thead>
                                        <tr class="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                                            <th class="px-5 py-3 text-left font-medium">Flag</th>
                                            <th class="px-5 py-3 text-left font-medium">Type</th>
                                            <th class="px-5 py-3 text-left font-medium">Default</th>
                                            <th class="px-5 py-3 text-left font-medium">{isEn ? 'Description' : 'คำอธิบาย'}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-50">
                                        {cmd.options.map(opt => (
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-5 py-3">
                                                    <span class="font-mono text-xs text-green-700">{opt.flag}</span>
                                                    {opt.alias && <span class="font-mono text-xs text-gray-400 ml-1">{opt.alias}</span>}
                                                </td>
                                                <td class="px-5 py-3 font-mono text-xs text-gray-500">{opt.type}</td>
                                                <td class="px-5 py-3 font-mono text-xs text-gray-400">{opt.default ?? '—'}</td>
                                                <td class="px-5 py-3 text-gray-600 text-sm">{opt.desc[lang]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {/* Examples */}
                    {cmd.examples && cmd.examples.length > 0 && (
                        <section class="mb-8">
                            <h2 class="text-base font-semibold text-gray-700 mb-3 uppercase tracking-wider text-xs">{isEn ? 'Examples' : 'ตัวอย่าง'}</h2>
                            <div class="space-y-4">
                                {cmd.examples.map(ex => (
                                    <div>
                                        <p class="text-sm text-gray-500 mb-2">{ex.desc[lang]}</p>
                                        <CodeBlock code={ex.code}/>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Prev / Next navigation */}
                    <div class="flex items-center justify-between pt-8 border-t border-gray-100 mt-8">
                        {prev ? (
                            <a href={`${cmdUrl(prev.name)}?lang=${lang}`}
                               class="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                                <span class="font-mono">{groupName} {prev.name}</span>
                            </a>
                        ) : <div/>}
                        {next ? (
                            <a href={`${cmdUrl(next.name)}?lang=${lang}`}
                               class="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors">
                                <span class="font-mono">{groupName} {next.name}</span>
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                            </a>
                        ) : <div/>}
                    </div>
                </main>

                {/* Right TOC */}
                <aside class="hidden xl:block w-52 shrink-0 py-8 pr-4">
                    <div class="sticky top-20">
                        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{isEn ? 'On this page' : 'ในหน้านี้'}</p>
                        <nav class="flex flex-col gap-1">
                            <a href="#synopsis" class="text-xs text-gray-500 hover:text-green-600 transition-colors py-1">{isEn ? 'Synopsis' : 'รูปแบบคำสั่ง'}</a>
                            {cmd.params && cmd.params.length > 0 && <a href="#arguments" class="text-xs text-gray-500 hover:text-green-600 transition-colors py-1">{isEn ? 'Arguments' : 'อาร์กิวเมนต์'}</a>}
                            {cmd.options && cmd.options.length > 0 && <a href="#options" class="text-xs text-gray-500 hover:text-green-600 transition-colors py-1">{isEn ? 'Options' : 'ตัวเลือก'}</a>}
                            {cmd.examples && cmd.examples.length > 0 && <a href="#examples" class="text-xs text-gray-500 hover:text-green-600 transition-colors py-1">{isEn ? 'Examples' : 'ตัวอย่าง'}</a>}
                        </nav>
                    </div>
                </aside>
            </div>
            <Footer lang={lang}/>
        </Layout>
    )
}
