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
