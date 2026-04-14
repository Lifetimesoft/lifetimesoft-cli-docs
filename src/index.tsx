import {Hono} from 'hono'
import {CliHome} from './pages/index'
import {CliCommandRef} from './pages/command'
import {getLang} from './model/i18n'

const app = new Hono()

// All routes under /cli prefix (mounted as sub-path of lifetimesoft-docs)
app.get('/', (c) => {
    const lang = getLang(c.req.query('lang'), c.req.header('Accept-Language'))
    return c.html(<CliHome lang={lang}/>)
})

app.get('/command/:group/:name', (c) => {
    const lang = getLang(c.req.query('lang'), c.req.header('Accept-Language'))
    const group = c.req.param('group')
    const name = c.req.param('name')
    return c.html(<CliCommandRef lang={lang} group={group} name={name}/>)
})

export default app
