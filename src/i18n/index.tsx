import { createContext, useContext } from 'react'

export type Lang = 'de' | 'en'
export const LANGS: Lang[] = ['de', 'en']

/** A translation namespace: identical key sets for both languages. */
export type Dict<T> = { de: T; en: T }

export const LangContext = createContext<Lang>('de')

export function useLang(): Lang {
  return useContext(LangContext)
}

/** Pick the current language's strings from a namespace file. */
export function useT<T>(dict: Dict<T>): T {
  return dict[useLang()]
}

/** Build a language-prefixed path, e.g. lp('de', '/events') → '/de/events'. */
export function lp(lang: Lang, path = '/'): string {
  return `/${lang}${path === '/' ? '' : path}`
}

export function useLp() {
  const lang = useLang()
  return (path = '/') => lp(lang, path)
}

/** Simple {name} interpolation. */
export function fmt(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`))
}
