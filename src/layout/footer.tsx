import {Lang} from '../model/i18n'

const STATIC = 'https://static.lifetimesoft.com'

export const Footer = ({lang}: {lang: Lang}) => (
    <footer class="bg-green-800 text-white mt-auto pt-12 pb-10">
        <div class="max-w-[90rem] mx-auto px-4">
            <div class="flex flex-col sm:flex-row justify-between gap-8 pb-8 border-b border-green-700">
                <div class="flex flex-col gap-2">
                    <a href={`/cli?lang=${lang}`} class="flex items-center gap-2 font-semibold text-white hover:text-green-200 transition-colors">
                        <img src={`${STATIC}/img/favicon.png`} class="w-7 h-7" alt="logo"/>
                        Lifetime Soft <span class="font-normal text-green-300">CLI Docs</span>
                    </a>
                    <p class="text-sm text-green-300 max-w-xs">
                        {lang === 'th' ? 'เอกสารอ้างอิงสำหรับ lifectl command-line tool' : 'Reference documentation for the lifectl command-line tool'}
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-8 text-sm">
                    <div>
                        <div class="font-semibold text-green-200 mb-3">{lang === 'th' ? 'ติดตามเรา' : 'Follow Us'}</div>
                        <ul class="flex flex-col gap-2 text-green-300">
                            <li>
                                <a href="https://www.youtube.com/@LifeTimeSoft" target="_blank" rel="noopener noreferrer"
                                   class="flex items-center gap-2 hover:text-white transition-colors">
                                    <svg class="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                    YouTube — @LifeTimeSoft
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/lifetimesoftservice" target="_blank" rel="noopener noreferrer"
                                   class="flex items-center gap-2 hover:text-white transition-colors">
                                    <svg class="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    Facebook — lifetimesoftservice
                                </a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/@lifetimesoftservice" target="_blank" rel="noopener noreferrer"
                                   class="flex items-center gap-2 hover:text-white transition-colors">
                                    <svg class="w-4 h-4 text-green-200" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
                                    TikTok — @lifetimesoftservice
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div class="font-semibold text-green-200 mb-3">{lang === 'th' ? 'ลิงก์' : 'Links'}</div>
                        <ul class="flex flex-col gap-2 text-green-300">
                            <li><a href={`/?lang=${lang}`} class="hover:text-white transition-colors">{lang === 'th' ? 'เอกสารหลัก' : 'Main Docs'}</a></li>
                            <li><a href="https://app.lifetimesoft.com/" target="_blank" class="hover:text-white transition-colors">{lang === 'th' ? 'เข้าใช้งาน' : 'Launch App'}</a></li>
                            <li><a href="https://www.lifetimesoft.com/" target="_blank" class="hover:text-white transition-colors">{lang === 'th' ? 'เว็บไซต์' : 'Website'}</a></li>
                        </ul>
                    </div>
                    <div>
                        <div class="font-semibold text-green-200 mb-3">{lang === 'th' ? 'ติดต่อ' : 'Contact'}</div>
                        <ul class="flex flex-col gap-2 text-green-300">
                            <li><a href="mailto:admin@lifetimesoft.com" class="hover:text-white transition-colors">admin@lifetimesoft.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="pt-6 text-sm text-green-400">
                Lifetime Soft © <span id="footer-year"></span> — Made with ♥ for the Lifetime Soft Vision
            </div>
        </div>
    </footer>
)
