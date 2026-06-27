'use client'

import { useEffect, useRef } from 'react'

const ACCENT = '#7B5FFF'
const WA = `https://wa.me/573022915380?text=${encodeURIComponent('Hola! Quiero empezar con la propuesta de servicios para Shine Boutique.')}`

// ── Colombia border coords [lon, lat] ─────────────────────────
const BORDER: [number, number][] = [
  [-71.13,12.45],[-71.95,11.62],[-72.95,11.55],[-73.60,11.25],[-74.25,11.10],
  [-74.85,11.10],[-75.55,10.65],[-75.70,9.45],[-76.20,9.00],[-76.90,8.65],
  [-77.45,8.50],[-77.35,7.90],[-77.90,7.25],[-77.55,6.65],[-77.35,5.60],
  [-77.90,4.40],[-78.40,3.10],[-78.80,2.30],[-78.95,1.55],[-78.20,1.30],
  [-77.70,0.80],[-77.50,0.40],[-76.90,0.35],[-76.40,0.45],[-75.25,-0.15],
  [-74.80,-0.60],[-73.50,-1.20],[-72.40,-2.30],[-71.30,-2.35],[-70.95,-4.10],
  [-69.95,-4.23],[-69.45,-2.80],[-69.40,-1.10],[-69.85,1.08],[-67.85,1.20],
  [-67.10,2.55],[-67.30,3.40],[-67.85,4.10],[-67.45,5.30],[-67.00,6.20],
  [-69.40,6.10],[-70.10,6.95],[-71.10,7.00],[-72.05,7.35],[-72.45,8.35],
  [-72.90,9.25],[-72.45,9.85],[-71.95,10.45],[-71.30,11.20],[-71.13,12.45],
]

const CITIES = [
  { n:'Barranquilla', x:-74.80, y:10.97, hub:true,  lx:12,  ly:-10 },
  { n:'Santa Marta',  x:-74.21, y:11.24, hub:false, lx:12,  ly:4   },
  { n:'Cartagena',    x:-75.51, y:10.39, hub:false, lx:-12, ly:2   },
  { n:'Cúcuta',       x:-72.51, y:7.89,  hub:false, lx:12,  ly:-6  },
  { n:'Bucaramanga',  x:-73.12, y:7.12,  hub:false, lx:12,  ly:8   },
  { n:'Medellín',     x:-75.56, y:6.25,  hub:false, lx:-12, ly:-10 },
  { n:'Manizales',    x:-75.51, y:5.07,  hub:false, lx:-12, ly:-4  },
  { n:'Pereira',      x:-75.69, y:4.81,  hub:false, lx:-12, ly:10  },
  { n:'Ibagué',       x:-75.23, y:4.44,  hub:false, lx:-12, ly:24  },
  { n:'Bogotá',       x:-74.07, y:4.71,  hub:false, lx:12,  ly:-8  },
  { n:'Villavicencio',x:-73.63, y:4.14,  hub:false, lx:12,  ly:10  },
  { n:'Cali',         x:-76.53, y:3.45,  hub:false, lx:-12, ly:10  },
]

// ── Service icons (SVG inline) ────────────────────────────────
function IconMeta()   { return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx={9} cy={12} r={5.5}/><circle cx={15} cy={12} r={5.5}/></svg> }
function IconSearch() { return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx={11} cy={11} r={7}/><line x1={21} y1={21} x2={16.65} y2={16.65}/></svg> }
function IconWa()     { return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg> }
function IconMail()   { return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={5} width={18} height={14} rx={2}/><polyline points="3 7 12 13 21 7"/></svg> }
function IconSpeed()  { return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M4 17a8 8 0 1 1 16 0"/><line x1={12} y1={17} x2={15.5} y2={11.5}/><circle cx={12} cy={17} r={1.2} fill="currentColor" stroke="none"/></svg> }
function IconReport() { return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><line x1={3} y1={21} x2={21} y2={21}/><rect x={5} y={12} width={3.4} height={6}/><rect x={10.3} y={8} width={3.4} height={10}/><rect x={15.6} y={4} width={3.4} height={14}/></svg> }

const SERVICES = [
  { title:'Meta Ads',               Icon:IconMeta,   delay:0,
    desc:'Gestión completa de campañas en Facebook e Instagram: estructura de campañas, segmentación de audiencias, creación y rotación de creativos, pruebas A/B, optimización semanal y escalado de presupuesto según resultados.' },
  { title:'Google Ads',             Icon:IconSearch, delay:70,
    desc:'Campañas de Search (palabras clave) y Shopping (catálogo de productos): investigación de keywords, configuración de conversiones, optimización de pujas y reporte de rendimiento.' },
  { title:'WhatsApp Marketing',     Icon:IconWa,     delay:140,
    desc:'2 campañas mensuales de WhatsApp para base de clientes activos: diseño del mensaje, segmentación de lista y seguimiento de conversiones.' },
  { title:'Klaviyo · Email Marketing', Icon:IconMail, delay:0,
    desc:'Activación y optimización de flujos automáticos: bienvenida, carrito abandonado, post-compra y reactivación. Incluye diseño de emails, segmentación de listas y campañas mensuales.' },
  { title:'Optimización Web',       Icon:IconSpeed,  delay:70,
    desc:'Mejoras continuas al sitio para aumentar la tasa de conversión: velocidad, experiencia móvil, fichas de producto y checkout.' },
  { title:'Reportes Mensuales',     Icon:IconReport, delay:140,
    desc:'Informe completo de resultados: ventas, ROAS, inversión, métricas clave y plan de acción para el siguiente mes.' },
]

const STEPS = [
  { num:'01', label:'Aprobar propuesta',              delay:0   },
  { num:'02', label:'Firma de contrato de servicios', delay:60  },
  { num:'03', label:'Inicio: primera semana del mes', delay:120 },
]

// ── Section divider ───────────────────────────────────────────
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display:'flex', alignItems:'baseline', gap:16, marginBottom:36 }}>
      <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:500, color:'rgba(236,237,239,0.35)' }}>{num}</span>
      <span style={{ fontSize:12.5, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(236,237,239,0.6)' }}>{label}</span>
      <span style={{ flex:1, height:1, background:'rgba(255,255,255,0.08)' }} />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────
export default function ShineProposal() {
  const rootRef     = useRef<HTMLDivElement>(null)
  const counterRef  = useRef<HTMLSpanElement>(null)
  const globeRef    = useRef<HTMLCanvasElement>(null)
  const pedidosRef  = useRef<HTMLSpanElement>(null)
  const convRef     = useRef<HTMLSpanElement>(null)
  const visitorsRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // ── Scroll reveal ─────────────────────────────────────────
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const counter = counterRef.current
    let counted = false

    const runCount = () => {
      counted = true
      const target = 395, dur = 1500, start = performance.now()
      if (counter) counter.textContent = '0'
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1)
        const v = Math.round((1 - Math.pow(1 - t, 3)) * target)
        if (counter) counter.textContent = String(v)
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const reveal = () => {
      const vh = window.innerHeight || 800
      items.forEach(el => {
        if (el.dataset.shown) return
        if (el.getBoundingClientRect().top < vh * 0.9) {
          el.dataset.shown = '1'
          el.style.transitionDelay = (parseInt(el.getAttribute('data-delay') || '0', 10)) + 'ms'
          el.setAttribute('data-in', '')
        }
      })
      if (counter && !counted && counter.getBoundingClientRect().top < vh * 0.92) runCount()
    }

    document.documentElement.classList.add('nm-js')
    window.addEventListener('scroll', reveal, true)
    window.addEventListener('resize', reveal)
    requestAnimationFrame(reveal)
    setTimeout(reveal, 120)
    setTimeout(reveal, 600)

    // ── Live counters ─────────────────────────────────────────
    const ped = pedidosRef.current
    const conv = convRef.current
    const vis = visitorsRef.current
    let p = 312
    if (ped) ped.textContent = String(p)
    const t1 = setInterval(() => { if (Math.random() < 0.65) p++; if (ped) ped.textContent = String(p) }, 2600)
    const t2 = setInterval(() => { if (conv) conv.textContent = (2.9 + Math.random() * 0.7).toFixed(1).replace('.', ',') + '%' }, 3400)
    const t3 = setInterval(() => { if (vis) vis.textContent = String(3 + Math.floor(Math.random() * 6)) }, 2400)

    // ── Globe canvas ──────────────────────────────────────────
    const canvas = globeRef.current
    let rafId = 0
    let globeResize: (() => void) | null = null

    if (canvas) {
      const ctx = canvas.getContext('2d')!
      const lons = BORDER.map(p => p[0]), lats = BORDER.map(p => p[1])
      const minLon = Math.min(...lons), maxLon = Math.max(...lons)
      const minLat = Math.min(...lats), maxLat = Math.max(...lats)
      const geoW = maxLon - minLon, geoH = maxLat - minLat
      let W = 400, H = 400, dpr = 1
      let proj: (lon: number, lat: number) => [number, number] = () => [0, 0]

      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2)
        const r = canvas.getBoundingClientRect()
        W = r.width || 400; H = r.height || 400
        canvas.width = W * dpr; canvas.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        const pad = Math.min(W, H) * 0.14
        const scale = Math.min((W - pad * 2) / geoW, (H - pad * 2) / geoH)
        const ox = (W - geoW * scale) / 2, oy = (H - geoH * scale) / 2
        proj = (lon, lat) => [ox + (lon - minLon) * scale, oy + (maxLat - lat) * scale]
      }
      resize(); globeResize = resize
      window.addEventListener('resize', resize)

      const inside = (lon: number, lat: number) => {
        let c = false
        for (let i = 0, j = BORDER.length - 1; i < BORDER.length; j = i++) {
          const [xi, yi] = BORDER[i], [xj, yj] = BORDER[j]
          if (((yi > lat) !== (yj > lat)) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) c = !c
        }
        return c
      }

      const dots: [number, number][] = []
      for (let lat = minLat; lat <= maxLat; lat += 0.32)
        for (let lon = minLon; lon <= maxLon; lon += 0.32)
          if (inside(lon, lat)) dots.push([lon, lat])

      type Arc    = { to: typeof CITIES[0]; t: number }
      type Ripple = { c:  typeof CITIES[0]; t: number }
      const arcs: Arc[] = [], ripples: Ripple[] = []
      let lastArc = 0, lastRip = 0
      const hub = CITIES.find(c => c.hub)!

      const frame = (t: number) => {
        ctx.clearRect(0, 0, W, H)

        // dots
        ctx.fillStyle = 'rgba(140,116,255,0.30)'
        for (const d of dots) { const [x, y] = proj(d[0], d[1]); ctx.beginPath(); ctx.arc(x, y, 1.5, 0, 6.28); ctx.fill() }

        const [hx, hy] = proj(hub.x, hub.y)

        // spawn arcs & ripples
        if (t - lastArc > 650) { lastArc = t; const tgt = CITIES.filter(c => !c.hub)[Math.floor(Math.random() * 11)]; arcs.push({ to: tgt, t }) }
        if (t - lastRip > 1000) { lastRip = t; CITIES.forEach(c => ripples.push({ c, t: t + Math.random() * 280 })) }

        // arcs
        for (let i = arcs.length - 1; i >= 0; i--) {
          const a = arcs[i], age = (t - a.t) / 1300
          if (age > 1) { arcs.splice(i, 1); continue }
          const [tx, ty] = proj(a.to.x, a.to.y)
          const mx = (hx + tx) / 2, my = (hy + ty) / 2 - 38
          ctx.strokeStyle = `rgba(123,95,255,${(0.12 + 0.45 * (1 - age)).toFixed(3)})`
          ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(hx, hy)
          const up = Math.max(1, Math.floor(22 * age))
          for (let s = 1; s <= up; s++) { const u = s/22, iu = 1-u; ctx.lineTo(iu*iu*hx+2*iu*u*mx+u*u*tx, iu*iu*hy+2*iu*u*my+u*u*ty) }
          ctx.stroke()
          const u = Math.min(age, 1), iu = 1-u
          ctx.fillStyle = '#d2c8ff'; ctx.beginPath(); ctx.arc(iu*iu*hx+2*iu*u*mx+u*u*tx, iu*iu*hy+2*iu*u*my+u*u*ty, 2.3, 0, 6.28); ctx.fill()
        }

        // ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rp = ripples[i], age = (t - rp.t) / 1600
          if (age < 0) continue; if (age > 1) { ripples.splice(i, 1); continue }
          const [px, py] = proj(rp.c.x, rp.c.y)
          ctx.strokeStyle = `rgba(123,95,255,${(0.5*(1-age)).toFixed(3)})`
          ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(px, py, 4 + age * 15, 0, 6.28); ctx.stroke()
        }

        // city markers + labels
        ctx.font = '600 11px Manrope,system-ui,sans-serif'; ctx.textBaseline = 'middle'
        const showL = H > 420
        CITIES.forEach(city => {
          const [px, py] = proj(city.x, city.y)
          const lx = px + city.lx, ly = py + city.ly, right = city.lx < 0
          if (showL) { ctx.strokeStyle='rgba(140,116,255,0.35)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(right?lx+2:lx-2,ly); ctx.stroke() }
          ctx.fillStyle = city.hub ? '#FFFFFF' : '#b6a6ff'
          ctx.shadowColor = '#7B5FFF'; ctx.shadowBlur = city.hub ? 15 : 9
          ctx.beginPath(); ctx.arc(px, py, city.hub ? 5 : 3.4, 0, 6.28); ctx.fill()
          ctx.shadowBlur = 0
          if (showL) {
            ctx.textAlign = right ? 'right' : 'left'
            const tw = ctx.measureText(city.n).width, bx = right ? lx-tw-6 : lx-2
            ctx.fillStyle='rgba(8,9,11,0.55)'; ctx.fillRect(bx,ly-8,tw+8,16)
            ctx.fillStyle = city.hub ? 'rgba(255,255,255,0.98)' : 'rgba(236,237,239,0.88)'
            ctx.fillText(city.n, right ? lx-4 : lx+2, ly)
          }
        })

        rafId = requestAnimationFrame(frame)
      }
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      window.removeEventListener('scroll', reveal, true)
      window.removeEventListener('resize', reveal)
      if (globeResize) window.removeEventListener('resize', globeResize)
      if (rafId) cancelAnimationFrame(rafId)
      clearInterval(t1); clearInterval(t2); clearInterval(t3)
      document.documentElement.classList.remove('nm-js')
    }
  }, [])

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #7B5FFF; color: #08090B; }
        @keyframes nm-pulse { 0%{box-shadow:0 0 0 0 rgba(123,95,255,.55)} 70%{box-shadow:0 0 0 11px rgba(123,95,255,0)} 100%{box-shadow:0 0 0 0 rgba(123,95,255,0)} }
        html.nm-js [data-reveal] { opacity:0; transform:translateY(20px); transition:opacity .6s ease,transform .6s ease; }
        html.nm-js [data-reveal][data-in] { opacity:1; transform:none; }
        .nm-card { border:1px solid rgba(255,255,255,.09); border-radius:20px; padding:30px; background:rgba(255,255,255,.018); transition:border-color .2s,background .2s,transform .2s; }
        .nm-card:hover { border-color:rgba(123,95,255,.35); background:rgba(123,95,255,.04); transform:translateY(-4px); }
        .nm-cta { display:inline-flex; align-items:center; gap:10px; background:#7B5FFF; color:#08090B; font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:18px; text-decoration:none; padding:18px 34px; border-radius:999px; transition:transform .25s,box-shadow .25s; box-shadow:0 8px 40px rgba(123,95,255,.28); position:relative; }
        .nm-cta:hover { transform:translateY(-3px); box-shadow:0 14px 50px rgba(123,95,255,.42); }
        .nm-fl { color:rgba(236,237,239,.6); text-decoration:none; transition:color .2s; }
        .nm-fl:hover { color:#ECEDEF; }
        .nm-fw { color:rgba(236,237,239,.6); text-decoration:none; transition:color .2s; }
        .nm-fw:hover { color:#7B5FFF; }
        @media(max-width:640px){
          .nm-hero-title{font-size:40px!important}
          .nm-bignum{font-size:92px!important}
          .nm-price{font-size:48px!important}
          .nm-grid2{grid-template-columns:1fr!important}
          .nm-pad{padding-left:20px!important;padding-right:20px!important}
          .nm-map-copy{padding:32px 20px 8px!important}
          .nm-map-wrap{min-height:340px!important}
          .nm-livestats{gap:22px 16px!important;padding:24px 20px!important}
        }
        @media(max-width:420px){
          .nm-hero-title{font-size:34px!important}
          .nm-bignum{font-size:74px!important}
          .nm-price{font-size:40px!important}
        }
      `}</style>

      <div ref={rootRef} style={{ background:'#08090B', color:'#ECEDEF', fontFamily:"'Manrope',system-ui,sans-serif", minHeight:'100vh', position:'relative', overflowX:'hidden' }}>

        {/* Dot grid */}
        <div style={{ position:'fixed', inset:0, pointerEvents:'none', backgroundImage:'radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)', backgroundSize:'26px 26px', opacity:.6, zIndex:0 }} />

        {/* Top bar */}
        <div className="nm-pad" style={{ position:'sticky', top:0, zIndex:30, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 32px', background:'rgba(8,9,11,.72)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
          <a href="https://www.nomadastech.com/" target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.nomadastech.com/logo.png" alt="Nómadas Tech" style={{ height:26, width:'auto' }} />
          </a>
          <div style={{ display:'flex', alignItems:'center', gap:18 }}>
            <span style={{ fontSize:12.5, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(236,237,239,.5)' }}>Junio 2026</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:12.5, fontWeight:600, color:ACCENT, padding:'6px 12px', border:'1px solid rgba(123,95,255,.28)', borderRadius:999 }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:ACCENT, boxShadow:`0 0 10px ${ACCENT}` }} />
              Propuesta activa
            </span>
          </div>
        </div>

        <div className="nm-pad" style={{ position:'relative', zIndex:1, maxWidth:980, margin:'0 auto', padding:'0 32px 120px' }}>

          {/* Hero */}
          <header data-reveal style={{ padding:'96px 0 64px', position:'relative' }}>
            <div style={{ position:'absolute', top:40, left:-80, width:360, height:360, borderRadius:'50%', background:ACCENT, filter:'blur(140px)', opacity:.14, pointerEvents:'none' }} />
            <span style={{ display:'inline-block', fontSize:12.5, fontWeight:600, letterSpacing:'.22em', textTransform:'uppercase', color:ACCENT, marginBottom:22 }}>Propuesta de Servicios</span>
            <h1 className="nm-hero-title" style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:72, lineHeight:1.02, letterSpacing:'-.02em', margin:'0 0 22px' }}>Shine Boutique</h1>
            <p style={{ fontSize:18, lineHeight:1.55, color:'rgba(236,237,239,.62)', maxWidth:560, margin:0 }}>
              Estrategia integral de crecimiento digital diseñada por{' '}
              <span style={{ color:'#ECEDEF', fontWeight:600 }}>Nómadas Tech</span>{' '}
              para convertir tráfico en ventas reales y medibles.
            </p>
          </header>

          {/* En vivo */}
          <section data-reveal style={{ marginBottom:120 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:9, fontSize:12.5, fontWeight:600, letterSpacing:'.2em', textTransform:'uppercase', color:ACCENT }}>
                <span style={{ width:9, height:9, borderRadius:'50%', background:ACCENT, animation:'nm-pulse 1.8s infinite' }} />
                En vivo
              </span>
              <span style={{ flex:1, height:1, background:'rgba(255,255,255,.08)' }} />
            </div>

            <div style={{ border:'1px solid rgba(255,255,255,.09)', borderRadius:24, overflow:'hidden', background:'radial-gradient(120% 130% at 85% 0%,rgba(123,95,255,.10),rgba(255,255,255,.012))' }}>
              {/* Live stats */}
              <div className="nm-livestats nm-pad" style={{ display:'flex', flexWrap:'wrap', gap:12, padding:'26px 40px', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
                <div style={{ flex:1, minWidth:150 }}>
                  <div style={{ fontSize:12, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(236,237,239,.5)', marginBottom:8 }}>Pedidos</div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
                    <span ref={pedidosRef} style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:30, fontWeight:700, color:'#FFF' }}>312</span>
                    <span style={{ fontSize:13, fontWeight:600, color:ACCENT }}>▲ +321%</span>
                  </div>
                </div>
                <div style={{ flex:1, minWidth:150 }}>
                  <div style={{ fontSize:12, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(236,237,239,.5)', marginBottom:8 }}>Tasa de conversión</div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
                    <span ref={convRef} style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:30, fontWeight:700, color:'#FFF' }}>3,2%</span>
                    <span style={{ fontSize:13, fontWeight:600, color:ACCENT }}>▲ +96%</span>
                  </div>
                </div>
                <div style={{ flex:1, minWidth:150 }}>
                  <div style={{ fontSize:12, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(236,237,239,.5)', marginBottom:8 }}>Visitantes en vivo</div>
                  <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                    <span ref={visitorsRef} style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:30, fontWeight:700, color:'#FFF' }}>5</span>
                    <span style={{ width:11, height:11, borderRadius:'50%', background:ACCENT, animation:'nm-pulse 1.8s infinite' }} />
                  </div>
                </div>
              </div>

              {/* Copy + Colombia map */}
              <div className="nm-grid2" style={{ display:'grid', gridTemplateColumns:'.82fr 1.18fr', alignItems:'center' }}>
                <div className="nm-map-copy" style={{ padding:48 }}>
                  <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:32, lineHeight:1.12, letterSpacing:'-.02em', margin:'0 0 16px' }}>
                    27 días. 12 ciudades. <span style={{ color:ACCENT }}>+395%</span>.
                  </h2>
                  <p style={{ fontSize:16, lineHeight:1.65, color:'rgba(236,237,239,.62)', margin:'0 0 22px', maxWidth:420 }}>
                    Shine Boutique aparece donde tus clientes buscan —{' '}
                    <span style={{ color:'#ECEDEF', fontWeight:600 }}>Meta, Google, email y WhatsApp</span>.
                    {' '}Cada punto es una venta potencial, activa ahora mismo.
                  </p>
                  <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:22 }}>
                    {[['#FFFFFF','0 0 8px #7B5FFF','Centro de operación'],['#b6a6ff','none','Ciudades activas']].map(([bg,sh,lbl])=>(
                      <span key={lbl as string} style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12.5, color:'rgba(236,237,239,.65)' }}>
                        <span style={{ width:9, height:9, borderRadius:'50%', background:bg as string, boxShadow:sh as string }} />{lbl}
                      </span>
                    ))}
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {['Alcance multicanal','Tráfico calificado','Ventas medibles'].map(tag=>(
                      <span key={tag} style={{ fontSize:12.5, fontWeight:600, color:'rgba(236,237,239,.78)', padding:'7px 13px', border:'1px solid rgba(255,255,255,.12)', borderRadius:999, whiteSpace:'nowrap' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="nm-map-wrap" style={{ position:'relative', minHeight:560 }}>
                  <canvas ref={globeRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', display:'block' }} />
                </div>
              </div>
            </div>
          </section>

          {/* 01 Resultados */}
          <section data-reveal style={{ marginBottom:120 }}>
            <SectionLabel num="01" label="Resultados actuales" />
            <div className="nm-pad" style={{ border:'1px solid rgba(255,255,255,.09)', borderRadius:24, padding:'56px 48px', background:'linear-gradient(160deg,rgba(123,95,255,.07),rgba(255,255,255,.015))', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-60, right:-40, width:280, height:280, borderRadius:'50%', background:ACCENT, filter:'blur(130px)', opacity:.18 }} />
              <span style={{ position:'relative', display:'inline-block', fontSize:12.5, fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(236,237,239,.55)', marginBottom:6 }}>Crecimiento en ventas</span>
              <div style={{ position:'relative', marginBottom:18 }}>
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:ACCENT }}>
                  <span className="nm-bignum" style={{ fontSize:132, lineHeight:.9, letterSpacing:'-.04em' }}>
                    +<span ref={counterRef}>395</span>%
                  </span>
                </span>
              </div>
              <p style={{ position:'relative', fontSize:17, lineHeight:1.6, color:'rgba(236,237,239,.66)', maxWidth:520, margin:0 }}>
                Y esto con los canales básicos encendidos.{' '}
                <span style={{ color:'#ECEDEF', fontWeight:600 }}>Lo que viene es mayor.</span>
              </p>
            </div>
          </section>

          {/* 02 Metodología */}
          <section data-reveal style={{ marginBottom:120 }}>
            <SectionLabel num="02" label="Nuestra metodología" />
            <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:27, lineHeight:1.45, letterSpacing:'-.01em', color:'#ECEDEF', margin:'0 0 24px', maxWidth:760 }}>
              Trabajamos con una metodología estructurada de publicidad digital basada en investigación profunda del cliente ideal, mapeo de niveles de consciencia y diversificación creativa.
            </p>
            <p style={{ fontSize:17, lineHeight:1.7, color:'rgba(236,237,239,.6)', maxWidth:680, margin:0 }}>
              Antes de invertir un peso en pauta, entendemos qué mueve a tu audiencia a comprar — sus deseos, miedos, objeciones y motivaciones reales. Eso nos permite crear campañas que no solo generan tráfico, sino{' '}
              <span style={{ color:ACCENT, fontWeight:600 }}>ventas reales y medibles.</span>
            </p>
          </section>

          {/* 03 Servicios */}
          <section style={{ marginBottom:120 }}>
            <div data-reveal><SectionLabel num="03" label="Servicios incluidos" /></div>
            <div className="nm-grid2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {SERVICES.map(({ title, delay, desc, Icon }) => (
                <div key={title} data-reveal data-delay={delay} className="nm-card">
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width:46, height:46, borderRadius:13, background:'rgba(123,95,255,.1)', color:ACCENT, marginBottom:22 }}>
                    <Icon />
                  </div>
                  <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:19, letterSpacing:'-.01em', margin:'0 0 10px', color:'#FFF' }}>{title}</h3>
                  <p style={{ fontSize:14.5, lineHeight:1.62, color:'rgba(236,237,239,.58)', margin:0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 04 Inversión */}
          <section data-reveal style={{ marginBottom:120 }}>
            <SectionLabel num="04" label="Inversión mensual" />
            <div style={{ border:'1px solid rgba(255,255,255,.09)', borderRadius:24, overflow:'hidden', background:'rgba(255,255,255,.018)' }}>
              <div className="nm-pad" style={{ padding:48, display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:20, borderBottom:'1px solid rgba(255,255,255,.07)' }}>
                <div>
                  <span className="nm-price" style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:60, lineHeight:1, letterSpacing:'-.03em', color:'#FFF' }}>$2.500.000</span>
                  <span style={{ fontSize:20, fontWeight:600, color:'rgba(236,237,239,.55)', marginLeft:8 }}>COP / mes</span>
                </div>
                <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:14, fontWeight:600, color:ACCENT, padding:'9px 16px', border:'1px solid rgba(123,95,255,.28)', borderRadius:999 }}>Contrato · 6 meses</span>
              </div>
              <div className="nm-pad" style={{ padding:'36px 48px' }}>
                <div style={{ display:'flex', gap:16, alignItems:'flex-start' }}>
                  <span style={{ flexShrink:0, width:30, height:30, borderRadius:9, background:'rgba(255,255,255,.06)', color:'rgba(236,237,239,.7)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>ⓘ</span>
                  <p style={{ fontSize:15, lineHeight:1.65, color:'rgba(236,237,239,.7)', margin:0 }}>
                    <span style={{ color:'#FFF', fontWeight:600 }}>No incluye presupuesto de pauta</span> — ese va directo a Meta y Google.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 05 Próximos pasos */}
          <section style={{ marginBottom:110 }}>
            <div data-reveal><SectionLabel num="05" label="Próximos pasos" /></div>
            <div style={{ display:'flex', flexDirection:'column' }}>
              {STEPS.map(({ num, label, delay }) => (
                <div key={num} data-reveal data-delay={delay} style={{ display:'flex', alignItems:'center', gap:22, padding:'22px 4px', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:22, fontWeight:600, color:ACCENT, minWidth:38 }}>{num}</span>
                  <span style={{ fontSize:18, fontWeight:500, color:'#ECEDEF' }}>{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section data-reveal className="nm-pad" style={{ borderRadius:28, padding:'72px 48px', textAlign:'center', background:'linear-gradient(155deg,rgba(123,95,255,.13),rgba(255,255,255,.02))', border:'1px solid rgba(123,95,255,.22)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', bottom:-120, left:'50%', transform:'translateX(-50%)', width:480, height:320, borderRadius:'50%', background:ACCENT, filter:'blur(150px)', opacity:.16, pointerEvents:'none' }} />
            <h2 style={{ position:'relative', fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:38, letterSpacing:'-.02em', lineHeight:1.12, margin:'0 0 14px' }}>Hagamos crecer Shine Boutique</h2>
            <p style={{ position:'relative', fontSize:17, lineHeight:1.6, color:'rgba(236,237,239,.65)', maxWidth:440, margin:'0 auto 36px' }}>Aprueba la propuesta y arrancamos la primera semana del mes.</p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="nm-cta">Quiero empezar →</a>
          </section>

        </div>

        {/* Footer */}
        <footer className="nm-pad" style={{ position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,.07)', padding:'44px 32px', maxWidth:980, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.nomadastech.com/logo.png" alt="Nómadas Tech" style={{ height:24, width:'auto', opacity:.92 }} />
            <div style={{ display:'flex', alignItems:'center', gap:24, fontSize:14 }}>
              <a href="mailto:hola@nomadas.tech" className="nm-fl">hola@nomadas.tech</a>
              <a href="https://wa.me/573022915380" target="_blank" rel="noopener noreferrer" className="nm-fw">wa.me/573022915380</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
