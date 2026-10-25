// City coordinates (public geographic facts) used to place events, groups and offices on the map.
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
  luebeck: { label: 'Lübeck', lat: 53.8655, lng: 10.6866 },
  magdeburg: { label: 'Magdeburg', lat: 52.1205, lng: 11.6276 },
  erfurt: { label: 'Erfurt', lat: 50.9848, lng: 11.0299 },
  freiburg: { label: 'Freiburg', lat: 47.999, lng: 7.8421 },
  saarbruecken: { label: 'Saarbrücken', lat: 49.2402, lng: 6.9969 },
  kassel: { label: 'Kassel', lat: 51.3127, lng: 9.4797 },
  ilmenau: { label: 'Ilmenau', lat: 50.6839, lng: 10.9196 },
  bielefeld: { label: 'Bielefeld', lat: 52.0302, lng: 8.5325 },
  braunschweig: { label: 'Braunschweig', lat: 52.2689, lng: 10.5268 },
  chemnitz: { label: 'Chemnitz', lat: 50.8278, lng: 12.9214 },
  cottbus: { label: 'Cottbus', lat: 51.7563, lng: 14.3329 },
  duesseldorf: { label: 'Düsseldorf', lat: 51.2277, lng: 6.7735 },
  essen: { label: 'Essen', lat: 51.4556, lng: 7.0116 },
  krefeld: { label: 'Krefeld', lat: 51.3388, lng: 6.5853 },
  mannheim: { label: 'Mannheim', lat: 49.4875, lng: 8.466 },
  osnabrueck: { label: 'Osnabrück', lat: 52.2799, lng: 8.0472 },
  trier: { label: 'Trier', lat: 49.7499, lng: 6.6371 },
  wuppertal: { label: 'Wuppertal', lat: 51.2562, lng: 7.1508 },
  kaiserslautern: { label: 'Kaiserslautern', lat: 49.4401, lng: 7.7491 },
  konstanz: { label: 'Konstanz', lat: 47.6779, lng: 9.1732 },
  ulm: { label: 'Ulm', lat: 48.4011, lng: 9.9876 },
  offenburg: { label: 'Offenburg', lat: 48.4723, lng: 7.9442 },
  merseburg: { label: 'Merseburg', lat: 51.3547, lng: 11.9928 },
  zwickau: { label: 'Zwickau', lat: 50.7189, lng: 12.4964 },
  bochum: { label: 'Bochum', lat: 51.4818, lng: 7.2162 },
  steinfurt: { label: 'Steinfurt', lat: 52.1505, lng: 7.3364 },
  hagen: { label: 'Hagen', lat: 51.3671, lng: 7.4633 },
  wilhelmshaven: { label: 'Wilhelmshaven', lat: 53.5299, lng: 8.1124 },
  wolfenbuettel: { label: 'Wolfenbüttel', lat: 52.1625, lng: 10.5371 },
  augsburg: { label: 'Augsburg', lat: 48.3705, lng: 10.8978 },
  bayreuth: { label: 'Bayreuth', lat: 49.9456, lng: 11.5713 },
  erlangen: { label: 'Erlangen', lat: 49.5897, lng: 11.0078 },
  ingolstadt: { label: 'Ingolstadt', lat: 48.7665, lng: 11.4258 },
  landshut: { label: 'Landshut', lat: 48.5442, lng: 12.1469 },
  regensburg: { label: 'Regensburg', lat: 49.0134, lng: 12.1016 },
  schweinfurt: { label: 'Schweinfurt', lat: 50.0492, lng: 10.2218 },
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
