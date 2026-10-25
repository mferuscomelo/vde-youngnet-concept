import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import type { ReactNode } from 'react'
import { AttributionControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { fmt, useT } from '../i18n'
import { common } from '../i18n/common'
import { GERMANY_CENTER } from '../lib/places'

// Simple CSS dot markers: avoids Leaflet's default image paths, which break under bundlers.
const icon = (color: string) =>
  L.divIcon({
    className: '',
    html: `<span style="display:block;width:18px;height:18px;border-radius:50%;background:#fff;border:5px solid ${color};box-shadow:0 1px 6px rgb(0 0 0 / 0.3)"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  })

export type MapPoint = { id: string; lat: number; lng: number; label: string; color?: string; popup: ReactNode }

/**
 * OpenStreetMap tiles via the standard tile server. Fine for a low-traffic
 * prototype under the OSMF tile usage policy (attribution shown, no bulk use);
 * a production site should use a commercial or self-hosted tile provider.
 */
export function MapView({ points, missing = 0, height }: { points: MapPoint[]; missing?: number; height?: number }) {
  const t = useT(common)
  // Jitter points that share coordinates so every marker stays clickable.
  const seen = new Map<string, number>()
  const placed = points.map((p) => {
    const k = `${p.lat},${p.lng}`
    const n = seen.get(k) ?? 0
    seen.set(k, n + 1)
    return n === 0 ? p : { ...p, lat: p.lat + 0.06 * Math.sin(n * 2.1), lng: p.lng + 0.09 * Math.cos(n * 2.1) }
  })
  return (
    <div className="stack" style={{ gap: 'var(--space-2)' }}>
      <div role="region" aria-label={t.map.label}>
        <MapContainer center={GERMANY_CENTER} zoom={window.innerWidth < 640 ? 5 : 6} attributionControl={false} scrollWheelZoom={false} className="map" style={height ? { height } : undefined}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* OSM attribution is required; Leaflet's own prefix is dropped */}
          <AttributionControl prefix={false} />
          {placed.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={icon(p.color ?? 'var(--color-blue)')} title={p.label} alt={p.label}>
              <Popup>{p.popup}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {missing > 0 && <p className="small muted">{fmt(t.map.noCoords, { n: missing })}</p>}
    </div>
  )
}
