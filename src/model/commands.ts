export type Param = {
    name: string
    type: string
    required: boolean
    desc: { en: string; th: string }
}

export type Option = {
    flag: string
    alias?: string
    type: string
    default?: string
    desc: { en: string; th: string }
}

export type Example = {
    desc: { en: string; th: string }
    code: string
}

export type Command = {
    name: string          // e.g. "push"
    group: string         // e.g. "agent"
    synopsis: string      // e.g. "lifectl agent push [options]"
    desc: { en: string; th: string }
    params?: Param[]
    options?: Option[]
    examples?: Example[]
}

export type CommandGroup = {
    name: string          // e.g. "agent"
    icon: string          // SVG path string
    desc: { en: string; th: string }
    commands: Command[]
}

export const COMMAND_GROUPS: CommandGroup[] = [
    {
        name: 'auth',
        icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        desc: {
            en: 'Authentication commands — login, logout, and token management',
            th: 'คำสั่งสำหรับการยืนยันตัวตน — เข้าสู่ระบบ ออกจากระบบ และจัดการ token',
        },
        commands: [
            {
                name: 'login',
                group: 'auth',
                synopsis: 'lifectl auth login',
                desc: {
                    en: 'Authenticate with Lifetime Soft. Opens a browser window to complete the login flow and stores credentials locally.',
                    th: 'ยืนยันตัวตนกับ Lifetime Soft เปิดหน้าต่างเบราว์เซอร์เพื่อเข้าสู่ระบบและบันทึก credentials ไว้ในเครื่อง',
                },
                options: [
                    {
                        flag: '--no-browser',
                        type: 'boolean',
                        default: 'false',
                        desc: {
                            en: 'Print the login URL instead of opening a browser',
                            th: 'แสดง URL สำหรับ login แทนการเปิดเบราว์เซอร์',
                        },
                    },
                ],
                examples: [
                    {
                        desc: { en: 'Login interactively', th: 'เข้าสู่ระบบแบบ interactive' },
                        code: 'lifectl auth login',
                    },
                    {
                        desc: { en: 'Print login URL without opening browser', th: 'แสดง URL โดยไม่เปิดเบราว์เซอร์' },
                        code: 'lifectl auth login --no-browser',
                    },
                ],
            },
            {
                name: 'logout',
                group: 'auth',
                synopsis: 'lifectl auth logout',
                desc: {
                    en: 'Remove stored credentials from the local machine.',
                    th: 'ลบ credentials ที่บันทึกไว้ออกจากเครื่อง',
                },
                examples: [
                    {
                        desc: { en: 'Logout from current session', th: 'ออกจากระบบ' },
                        code: 'lifectl auth logout',
                    },
                ],
            },
            {
                name: 'status',
                group: 'auth',
                synopsis: 'lifectl auth status',
                desc: {
                    en: 'Show the current authentication status and logged-in user.',
                    th: 'แสดงสถานะการยืนยันตัวตนและผู้ใช้ที่เข้าสู่ระบบอยู่',
                },
                examples: [
                    {
                        desc: { en: 'Check login status', th: 'ตรวจสอบสถานะการเข้าสู่ระบบ' },
                        code: 'lifectl auth status',
                    },
                ],
            },
        ],
    },
    {
        name: 'agent',
        icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
        desc: {
            en: 'Manage AI agents — push, pull, list, and run agents from the repository',
            th: 'จัดการ AI Agent — push, pull, list และรัน agent จาก repository',
        },
        commands: [
            {
                name: 'push',
                group: 'agent',
                synopsis: 'lifectl agent push [options]',
                desc: {
                    en: 'Package and upload the current agent directory to the Lifetime Soft agent repository. Reads agent.json for metadata.',
                    th: 'แพ็กเกจและอัปโหลด agent directory ปัจจุบันไปยัง repository อ่านข้อมูลจาก agent.json',
                },
                options: [
                    {
                        flag: '--name',
                        alias: '-n',
                        type: 'string',
                        desc: {
                            en: 'Override the agent name (default: from agent.json)',
                            th: 'กำหนดชื่อ agent (ค่าเริ่มต้น: จาก agent.json)',
                        },
                    },
                    {
                        flag: '--version',
                        alias: '-v',
                        type: 'string',
                        desc: {
                            en: 'Override the version (default: from agent.json)',
                            th: 'กำหนด version (ค่าเริ่มต้น: จาก agent.json)',
                        },
                    },
                    {
                        flag: '--public',
                        type: 'boolean',
                        default: 'true',
                        desc: {
                            en: 'Make the agent publicly accessible',
                            th: 'ทำให้ agent เข้าถึงได้สาธารณะ',
                        },
                    },
                ],
                examples: [
                    {
                        desc: { en: 'Push agent from current directory', th: 'Push agent จาก directory ปัจจุบัน' },
                        code: 'lifectl agent push',
                    },
                    {
                        desc: { en: 'Push with a specific version', th: 'Push พร้อมระบุ version' },
                        code: 'lifectl agent push --version 1.2.0',
                    },
                    {
                        desc: { en: 'Push under a namespace', th: 'Push ภายใต้ namespace' },
                        code: 'lifectl agent push --name myorg/my-agent',
                    },
                ],
            },
            {
                name: 'pull',
                group: 'agent',
                synopsis: 'lifectl agent pull <name> [options]',
                desc: {
                    en: 'Download an agent from the repository to the current directory.',
                    th: 'ดาวน์โหลด agent จาก repository มายัง directory ปัจจุบัน',
                },
                params: [
                    {
                        name: 'name',
                        type: 'string',
                        required: true,
                        desc: {
                            en: 'Agent name, optionally scoped (e.g. my-agent or myorg/my-agent)',
                            th: 'ชื่อ agent อาจมี namespace (เช่น my-agent หรือ myorg/my-agent)',
                        },
                    },
                ],
                options: [
                    {
                        flag: '--version',
                        alias: '-v',
                        type: 'string',
                        desc: {
                            en: 'Pull a specific version (default: latest)',
                            th: 'ดึง version ที่ระบุ (ค่าเริ่มต้น: latest)',
                        },
                    },
                    {
                        flag: '--dir',
                        alias: '-d',
                        type: 'string',
                        desc: {
                            en: 'Target directory (default: ./<agent-name>)',
                            th: 'directory ปลายทาง (ค่าเริ่มต้น: ./<agent-name>)',
                        },
                    },
                ],
                examples: [
                    {
                        desc: { en: 'Pull the latest version', th: 'ดึง version ล่าสุด' },
                        code: 'lifectl agent pull my-agent',
                    },
                    {
                        desc: { en: 'Pull a specific version', th: 'ดึง version ที่ระบุ' },
                        code: 'lifectl agent pull my-agent --version 1.0.0',
                    },
                    {
                        desc: { en: 'Pull a scoped agent', th: 'ดึง agent ที่มี namespace' },
                        code: 'lifectl agent pull myorg/my-agent',
                    },
                ],
            },
            {
                name: 'list',
                group: 'agent',
                synopsis: 'lifectl agent list [options]',
                desc: {
                    en: 'List all agents in your repository.',
                    th: 'แสดงรายการ agent ทั้งหมดใน repository ของคุณ',
                },
                options: [
                    {
                        flag: '--json',
                        type: 'boolean',
                        default: 'false',
                        desc: {
                            en: 'Output as JSON',
                            th: 'แสดงผลเป็น JSON',
                        },
                    },
                ],
                examples: [
                    {
                        desc: { en: 'List all agents', th: 'แสดงรายการ agent ทั้งหมด' },
                        code: 'lifectl agent list',
                    },
                    {
                        desc: { en: 'Output as JSON', th: 'แสดงผลเป็น JSON' },
                        code: 'lifectl agent list --json',
                    },
                ],
            },
            {
                name: 'run',
                group: 'agent',
                synopsis: 'lifectl agent run [name] [options]',
                desc: {
                    en: 'Run an agent locally. If no name is given, runs the agent in the current directory.',
                    th: 'รัน agent ในเครื่อง ถ้าไม่ระบุชื่อจะรัน agent ใน directory ปัจจุบัน',
                },
                params: [
                    {
                        name: 'name',
                        type: 'string',
                        required: false,
                        desc: {
                            en: 'Agent name to pull and run (optional)',
                            th: 'ชื่อ agent ที่จะดึงและรัน (ไม่บังคับ)',
                        },
                    },
                ],
                options: [
                    {
                        flag: '--watch',
                        alias: '-w',
                        type: 'boolean',
                        default: 'false',
                        desc: {
                            en: 'Watch for file changes and restart automatically',
                            th: 'ตรวจจับการเปลี่ยนแปลงไฟล์และ restart อัตโนมัติ',
                        },
                    },
                ],
                examples: [
                    {
                        desc: { en: 'Run agent in current directory', th: 'รัน agent ใน directory ปัจจุบัน' },
                        code: 'lifectl agent run',
                    },
                    {
                        desc: { en: 'Run with file watching', th: 'รันพร้อม watch ไฟล์' },
                        code: 'lifectl agent run --watch',
                    },
                    {
                        desc: { en: 'Pull and run a specific agent', th: 'ดึงและรัน agent ที่ระบุ' },
                        code: 'lifectl agent run my-agent',
                    },
                ],
            },
        ],
    },
]

export function findCommand(group: string, name: string): Command | undefined {
    return COMMAND_GROUPS.find(g => g.name === group)?.commands.find(c => c.name === name)
}

export function findGroup(group: string): CommandGroup | undefined {
    return COMMAND_GROUPS.find(g => g.name === group)
}
