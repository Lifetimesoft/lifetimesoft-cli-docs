export type Lang = 'en' | 'th'

export function getLang(query: string | undefined, acceptLang: string | undefined): Lang {
    if (query === 'th' || query === 'en') return query
    if (acceptLang?.startsWith('th')) return 'th'
    return 'th'
}
