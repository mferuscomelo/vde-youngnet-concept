export type IcsItem = { uid: string; start: string; end: string; summary: string; description?: string; location?: string; url?: string }
export function compactDate(iso: string): string
export function addDays(iso: string, n: number): string
export function buildICS(items: IcsItem[], opts: { name: string; now?: Date }): string
export function eventToItem(
  e: { id: string; slug: string; start: string; end: string; title_de: string; title_en: string; description_de: string; description_en: string; location: string | null },
  opts?: { lang?: 'de' | 'en'; origin?: string; placeLabel?: (k: string) => string },
): IcsItem
