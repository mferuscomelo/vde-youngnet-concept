// City coordinates (public geographic facts) used to place events and sample entries on the map.
export type Place = { label: string; lat: number; lng: number }

export const PLACES: Record<string, Place> = {
  hamburg: { label: 'Hamburg', lat: 53.5511, lng: 9.9937 },
  hannover: { label: 'Hannover', lat: 52.3759, lng: 9.732 },
  berlin: { label: 'Berlin', lat: 52.52, lng: 13.405 },
  dresden: { label: 'Dresden', lat: 51.0504, lng: 13.7373 },
  aachen: { label: 'Aachen', lat: 50.7753, lng: 6.0839 },
  koeln: { label: 'Köln', lat: 50.9375, lng: 6.9603 },
  darmstadt: { label: 'Darmstadt', lat: 49.8728, lng: 8.6512 },
  heidelberg: { label: 'Heidelberg', lat: 49.3988, lng: 8.6724 },
  karlsruhe: { label: 'Karlsruhe', lat: 49.0069, lng: 8.4037 },
  stuttgart: { label: 'Stuttgart', lat: 48.7758, lng: 9.1829 },
  wuerzburg: { label: 'Würzburg', lat: 49.7913, lng: 9.9534 },
  nuernberg: { label: 'Nürnberg', lat: 49.4521, lng: 11.0767 },
  muenchen: { label: 'München', lat: 48.1351, lng: 11.582 },
  frankfurt: { label: 'Frankfurt am Main', lat: 50.1109, lng: 8.6821 },
  leipzig: { label: 'Leipzig', lat: 51.3397, lng: 12.3731 },
  bremen: { label: 'Bremen', lat: 53.0793, lng: 8.8017 },
  dortmund: { label: 'Dortmund', lat: 51.5136, lng: 7.4653 },
  kiel: { label: 'Kiel', lat: 54.3233, lng: 10.1228 },
  rostock: { label: 'Rostock', lat: 54.0924, lng: 12.0991 },
  magdeburg: { label: 'Magdeburg', lat: 52.1205, lng: 11.6276 },
  erfurt: { label: 'Erfurt', lat: 50.9848, lng: 11.0299 },
  freiburg: { label: 'Freiburg', lat: 47.999, lng: 7.8421 },
  saarbruecken: { label: 'Saarbrücken', lat: 49.2402, lng: 6.9969 },
  kassel: { label: 'Kassel', lat: 51.3127, lng: 9.4797 },
  ilmenau: { label: 'Ilmenau', lat: 50.6839, lng: 10.9196 },
}

export function placeLabel(key: string | null): string | null {
  if (!key) return null
  return PLACES[key]?.label ?? null
}

/** Haversine distance in km. */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export const GERMANY_CENTER: [number, number] = [51.1, 10.3]
