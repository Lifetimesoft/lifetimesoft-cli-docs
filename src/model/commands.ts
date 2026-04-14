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
    name: string
    group: string
    synopsis: string
    desc: { en: string; th: string }
    params?: Param[]
    options?: Option[]
    examples?: Example[]
    notes?: { en: string; th: string }[]
}

export type CommandGroup = {
    name: string
    icon: string
    desc: { en: string; th: string }
    commands: Command[]
}

// ─── auth ────────────────────────────────────────────────────────────────────

const authCommands: Command[] = [
    {
        name: 'login',
        group: 'auth',
        synopsis: 'lifectl auth login',
        desc: {
            en: 'Authenticate with Lifetime Soft. Opens a browser window to complete the OAuth login flow, then stores the access token and refresh token in ~/.lifectl/config.json. If a valid token already exists it skips the browser step; if only a refresh token is present it silently refreshes first.',
            th: 'ยืนยันตัวตนกับ Lifetime Soft เปิดเบราว์เซอร์เพื่อทำ OAuth login จากนั้นบันทึก access token และ refresh token ไว้ที่ ~/.lifectl/config.json หากมี token ที่ยังใช้งานได้อยู่จะข้ามขั้นตอนเบราว์เซอร์ หากมีเพียง refresh token จะ refresh อัตโนมัติ',
        },
        notes: [
            {
                en: 'Tokens are stored at ~/.lifectl/config.json',
                th: 'Token ถูกเก็บที่ ~/.lifectl/config.json',
            },
            {
                en: 'Login session expires after 5 minutes if the browser flow is not completed.',
                th: 'Session หมดอายุใน 5 นาทีหากไม่ทำ login ในเบราว์เซอร์ให้เสร็จ',
            },
        ],
        examples: [
            {
                desc: { en: 'Login interactively (opens browser)', th: 'เข้าสู่ระบบแบบ interactive (เปิดเบราว์เซอร์)' },
                code: 'lifectl auth login',
            },
        ],
    },
    {
        name: 'logout',
        group: 'auth',
        synopsis: 'lifectl auth logout',
        desc: {
            en: 'Revoke the current session on the server and remove all stored credentials from ~/.lifectl/config.json.',
            th: 'ยกเลิก session ปัจจุบันบน server และลบ credentials ทั้งหมดออกจาก ~/.lifectl/config.json',
        },
        examples: [
            {
                desc: { en: 'Logout from current session', th: 'ออกจากระบบ' },
                code: 'lifectl auth logout',
            },
        ],
    },
]

// ─── ai agent ────────────────────────────────────────────────────────────────

const agentCommands: Command[] = [
    {
        name: 'push',
        group: 'ai agent',
        synopsis: 'lifectl ai agent push',
        desc: {
            en: 'Package the current directory as a .tar.gz archive and upload it to the Lifetime Soft agent registry. Reads agent.json in the current directory for the agent name, version, and metadata. Files listed in .agentignore are excluded from the archive.',
            th: 'แพ็กเกจ directory ปัจจุบันเป็น .tar.gz และอัปโหลดไปยัง registry อ่านข้อมูลจาก agent.json ในปัจจุบัน ไฟล์ที่ระบุใน .agentignore จะถูกยกเว้น',
        },
        notes: [
            {
                en: 'Requires agent.json in the current directory with at least name and version fields.',
                th: 'ต้องมี agent.json ใน directory ปัจจุบัน โดยมีอย่างน้อย name และ version',
            },
            {
                en: 'Agent name format: my-agent or namespace/my-agent. Only lowercase letters, numbers, and hyphens are allowed.',
                th: 'รูปแบบชื่อ agent: my-agent หรือ namespace/my-agent ใช้ได้เฉพาะตัวพิมพ์เล็ก ตัวเลข และขีดกลาง',
            },
            {
                en: 'Version must follow semver format: x.y.z',
                th: 'Version ต้องเป็น semver: x.y.z',
            },
        ],
        examples: [
            {
                desc: { en: 'Push agent from current directory', th: 'Push agent จาก directory ปัจจุบัน' },
                code: 'lifectl ai agent push',
            },
        ],
    },
    {
        name: 'pull',
        group: 'ai agent',
        synopsis: 'lifectl ai agent pull <name>',
        desc: {
            en: 'Download the latest version of an agent from the registry and extract it to ~/.lifectl/agents/<name>/<version>/. Updates the local registry at ~/.lifectl/agents/registry.json.',
            th: 'ดาวน์โหลด agent version ล่าสุดจาก registry และแตกไฟล์ไปที่ ~/.lifectl/agents/<name>/<version>/ อัปเดต registry ที่ ~/.lifectl/agents/registry.json',
        },
        params: [
            {
                name: 'name',
                type: 'string',
                required: true,
                desc: {
                    en: 'Agent name, optionally scoped with a namespace (e.g. my-agent or myorg/my-agent)',
                    th: 'ชื่อ agent อาจมี namespace (เช่น my-agent หรือ myorg/my-agent)',
                },
            },
        ],
        examples: [
            {
                desc: { en: 'Pull the latest version of an agent', th: 'ดึง agent version ล่าสุด' },
                code: 'lifectl ai agent pull my-agent',
            },
            {
                desc: { en: 'Pull a scoped agent', th: 'ดึง agent ที่มี namespace' },
                code: 'lifectl ai agent pull myorg/my-agent',
            },
        ],
    },
    {
        name: 'run',
        group: 'ai agent',
        synopsis: 'lifectl ai agent run <name[:version]> [--name <alias>]',
        desc: {
            en: 'Pull the agent if not already local, run the install script (once), then spawn a new detached container process using the start script from agent.json. Prints the container ID on success. Similar to docker run.',
            th: 'ดึง agent หากยังไม่มีในเครื่อง รัน install script (ครั้งเดียว) จากนั้น spawn container process แบบ detached โดยใช้ start script จาก agent.json แสดง container ID เมื่อสำเร็จ คล้ายกับ docker run',
        },
        params: [
            {
                name: 'name[:version]',
                type: 'string',
                required: true,
                desc: {
                    en: 'Agent name and optional version tag (e.g. my-agent or my-agent:1.0.0)',
                    th: 'ชื่อ agent และ version ที่ต้องการ (เช่น my-agent หรือ my-agent:1.0.0)',
                },
            },
        ],
        options: [
            {
                flag: '--name',
                type: 'string',
                desc: {
                    en: 'Assign a human-readable alias to the container',
                    th: 'กำหนดชื่อ alias ให้กับ container',
                },
            },
        ],
        notes: [
            {
                en: 'The process runs detached in the background. Use lifectl ai agent logs to view output.',
                th: 'Process รันแบบ detached ในพื้นหลัง ใช้ lifectl ai agent logs เพื่อดู output',
            },
            {
                en: 'Allowed runtimes for scripts: node, python, python3, deno, bun, npx, ts-node, tsx',
                th: 'Runtime ที่อนุญาตสำหรับ script: node, python, python3, deno, bun, npx, ts-node, tsx',
            },
        ],
        examples: [
            {
                desc: { en: 'Run the latest version', th: 'รัน version ล่าสุด' },
                code: 'lifectl ai agent run my-agent',
            },
            {
                desc: { en: 'Run a specific version', th: 'รัน version ที่ระบุ' },
                code: 'lifectl ai agent run my-agent:1.0.0',
            },
            {
                desc: { en: 'Run with a container alias', th: 'รันพร้อมตั้งชื่อ container' },
                code: 'lifectl ai agent run my-agent --name my-bot',
            },
        ],
    },
    {
        name: 'start',
        group: 'ai agent',
        synopsis: 'lifectl ai agent start <containerId>',
        desc: {
            en: 'Start a previously stopped container by its container ID. The container must already exist (created by run). Similar to docker start.',
            th: 'เริ่ม container ที่หยุดอยู่โดยใช้ container ID container ต้องถูกสร้างไว้แล้วจาก run คล้ายกับ docker start',
        },
        params: [
            {
                name: 'containerId',
                type: 'string',
                required: true,
                desc: {
                    en: '12-character hex container ID (from lifectl ai agent ps)',
                    th: 'container ID 12 ตัวอักษร hex (จาก lifectl ai agent ps)',
                },
            },
        ],
        examples: [
            {
                desc: { en: 'Start a stopped container', th: 'เริ่ม container ที่หยุดอยู่' },
                code: 'lifectl ai agent start a1b2c3d4e5f6',
            },
        ],
    },
    {
        name: 'stop',
        group: 'ai agent',
        synopsis: 'lifectl ai agent stop <name|containerId>',
        desc: {
            en: 'Stop a running container. Accepts either a container ID, agent name, or alias. If a stop script is defined in agent.json it is called first; otherwise the process is killed by PID.',
            th: 'หยุด container ที่กำลังรัน รับ container ID, ชื่อ agent หรือ alias หากมี stop script ใน agent.json จะเรียกก่อน มิฉะนั้นจะ kill process ด้วย PID',
        },
        params: [
            {
                name: 'name|containerId',
                type: 'string',
                required: true,
                desc: {
                    en: 'Container ID, agent name, or alias',
                    th: 'Container ID, ชื่อ agent หรือ alias',
                },
            },
        ],
        examples: [
            {
                desc: { en: 'Stop by container ID', th: 'หยุดด้วย container ID' },
                code: 'lifectl ai agent stop a1b2c3d4e5f6',
            },
            {
                desc: { en: 'Stop by agent name', th: 'หยุดด้วยชื่อ agent' },
                code: 'lifectl ai agent stop my-agent',
            },
            {
                desc: { en: 'Stop by alias', th: 'หยุดด้วย alias' },
                code: 'lifectl ai agent stop my-bot',
            },
        ],
    },
    {
        name: 'restart',
        group: 'ai agent',
        synopsis: 'lifectl ai agent restart <name|containerId>',
        desc: {
            en: 'Stop and then immediately start a container. Accepts container ID, agent name, or alias.',
            th: 'หยุดและเริ่ม container ใหม่ทันที รับ container ID, ชื่อ agent หรือ alias',
        },
        params: [
            {
                name: 'name|containerId',
                type: 'string',
                required: true,
                desc: {
                    en: 'Container ID, agent name, or alias',
                    th: 'Container ID, ชื่อ agent หรือ alias',
                },
            },
        ],
        examples: [
            {
                desc: { en: 'Restart a container', th: 'Restart container' },
                code: 'lifectl ai agent restart my-agent',
            },
        ],
    },
    {
        name: 'ps',
        group: 'ai agent',
        synopsis: 'lifectl ai agent ps [--name <name>] [--status <status>]',
        desc: {
            en: 'List all containers (running and stopped). Shows container ID, agent ID, name/alias, version, status, PID, and start time. Similar to docker ps.',
            th: 'แสดงรายการ container ทั้งหมด (ทั้งที่รันอยู่และหยุดแล้ว) แสดง container ID, agent ID, ชื่อ/alias, version, status, PID และเวลาเริ่ม คล้ายกับ docker ps',
        },
        options: [
            {
                flag: '--name',
                type: 'string',
                desc: {
                    en: 'Filter by agent name or container alias',
                    th: 'กรองตามชื่อ agent หรือ alias ของ container',
                },
            },
            {
                flag: '--status',
                type: 'running | stopped',
                desc: {
                    en: 'Filter by container status',
                    th: 'กรองตามสถานะของ container',
                },
            },
        ],
        examples: [
            {
                desc: { en: 'List all containers', th: 'แสดงรายการ container ทั้งหมด' },
                code: 'lifectl ai agent ps',
            },
            {
                desc: { en: 'List only running containers', th: 'แสดงเฉพาะ container ที่กำลังรัน' },
                code: 'lifectl ai agent ps --status running',
            },
            {
                desc: { en: 'Filter by agent name', th: 'กรองตามชื่อ agent' },
                code: 'lifectl ai agent ps --name my-agent',
            },
        ],
    },
    {
        name: 'list',
        group: 'ai agent',
        synopsis: 'lifectl ai agent list',
        desc: {
            en: 'List all agents that have been pulled to the local machine. Shows agent ID, name, version, runtime, and pull date. Similar to docker image ls.',
            th: 'แสดงรายการ agent ทั้งหมดที่ดึงมาไว้ในเครื่อง แสดง agent ID, ชื่อ, version, runtime และวันที่ดึง คล้ายกับ docker image ls',
        },
        examples: [
            {
                desc: { en: 'List all pulled agents', th: 'แสดงรายการ agent ที่ดึงมาแล้ว' },
                code: 'lifectl ai agent list',
            },
        ],
    },
    {
        name: 'logs',
        group: 'ai agent',
        synopsis: 'lifectl ai agent logs <name|containerId> [-n <lines>] [-f]',
        desc: {
            en: 'Show the log output of a container. Reads from the container log file at ~/.lifectl/containers/<id>/agent.log. Supports log rotation (up to 5 rotated files, 10 MB each).',
            th: 'แสดง log output ของ container อ่านจาก ~/.lifectl/containers/<id>/agent.log รองรับ log rotation (สูงสุด 5 ไฟล์, 10 MB ต่อไฟล์)',
        },
        params: [
            {
                name: 'name|containerId',
                type: 'string',
                required: true,
                desc: {
                    en: 'Container ID, agent name, or alias',
                    th: 'Container ID, ชื่อ agent หรือ alias',
                },
            },
        ],
        options: [
            {
                flag: '-n, --lines',
                type: 'number',
                default: '50',
                desc: {
                    en: 'Number of lines to show from the end of the log',
                    th: 'จำนวนบรรทัดที่จะแสดงจากท้าย log',
                },
            },
            {
                flag: '-f, --follow',
                type: 'boolean',
                default: 'false',
                desc: {
                    en: 'Stream new log lines in real time (like tail -f). Exits automatically when the container stops.',
                    th: 'แสดง log แบบ real-time (เหมือน tail -f) หยุดอัตโนมัติเมื่อ container หยุด',
                },
            },
        ],
        examples: [
            {
                desc: { en: 'Show last 50 lines', th: 'แสดง 50 บรรทัดล่าสุด' },
                code: 'lifectl ai agent logs my-agent',
            },
            {
                desc: { en: 'Show last 100 lines', th: 'แสดง 100 บรรทัดล่าสุด' },
                code: 'lifectl ai agent logs my-agent -n 100',
            },
            {
                desc: { en: 'Follow log output in real time', th: 'ติดตาม log แบบ real-time' },
                code: 'lifectl ai agent logs my-agent -f',
            },
            {
                desc: { en: 'Follow by container ID', th: 'ติดตาม log ด้วย container ID' },
                code: 'lifectl ai agent logs a1b2c3d4e5f6 -f',
            },
        ],
    },
    {
        name: 'rma',
        group: 'ai agent',
        synopsis: 'lifectl ai agent rma <name[:version]>',
        desc: {
            en: 'Remove a pulled agent from the local machine. If a version is specified only that version is removed; otherwise all versions are removed. Fails if any running containers reference the agent. Similar to docker rmi.',
            th: 'ลบ agent ที่ดึงมาออกจากเครื่อง หากระบุ version จะลบเฉพาะ version นั้น มิฉะนั้นลบทุก version จะล้มเหลวหากมี container ที่กำลังรันอ้างถึง agent นี้ คล้ายกับ docker rmi',
        },
        params: [
            {
                name: 'name[:version]',
                type: 'string',
                required: true,
                desc: {
                    en: 'Agent name and optional version (e.g. my-agent or my-agent:1.0.0)',
                    th: 'ชื่อ agent และ version ที่ต้องการลบ (เช่น my-agent หรือ my-agent:1.0.0)',
                },
            },
        ],
        examples: [
            {
                desc: { en: 'Remove all versions of an agent', th: 'ลบ agent ทุก version' },
                code: 'lifectl ai agent rma my-agent',
            },
            {
                desc: { en: 'Remove a specific version', th: 'ลบ version ที่ระบุ' },
                code: 'lifectl ai agent rma my-agent:1.0.0',
            },
        ],
    },
    {
        name: 'rm',
        group: 'ai agent',
        synopsis: 'lifectl ai agent rm <containerId>',
        desc: {
            en: 'Remove a stopped container and its data directory. The container must be stopped first. Similar to docker rm.',
            th: 'ลบ container ที่หยุดแล้วและ data directory ของมัน container ต้องหยุดก่อน คล้ายกับ docker rm',
        },
        params: [
            {
                name: 'containerId',
                type: 'string',
                required: true,
                desc: {
                    en: '12-character hex container ID',
                    th: 'container ID 12 ตัวอักษร hex',
                },
            },
        ],
        examples: [
            {
                desc: { en: 'Remove a stopped container', th: 'ลบ container ที่หยุดแล้ว' },
                code: 'lifectl ai agent rm a1b2c3d4e5f6',
            },
        ],
    },
]

// ─── Export ───────────────────────────────────────────────────────────────────

export const COMMAND_GROUPS: CommandGroup[] = [
    {
        name: 'auth',
        icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        desc: {
            en: 'Authentication commands — login and logout',
            th: 'คำสั่งสำหรับการยืนยันตัวตน — เข้าสู่ระบบและออกจากระบบ',
        },
        commands: authCommands,
    },
    {
        name: 'ai agent',
        icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
        desc: {
            en: 'Manage AI agents — push, pull, run, stop, logs, and more',
            th: 'จัดการ AI Agent — push, pull, run, stop, logs และอื่นๆ',
        },
        commands: agentCommands,
    },
]

export function findCommand(group: string, name: string): Command | undefined {
    // group may contain spaces e.g. "ai agent"
    return COMMAND_GROUPS.find(g => g.name === group)?.commands.find(c => c.name === name)
}

export function findGroup(group: string): CommandGroup | undefined {
    return COMMAND_GROUPS.find(g => g.name === group)
}
