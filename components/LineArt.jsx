import { useEffect, useRef } from 'react';

const HIGHLIGHT = '#F98585';

function hexToRgb(hex) {
  const h = (hex || '').replace(/\s/g, '').replace('#', '');
  if (h.length !== 6) return [0.17, 0.24, 0.31];
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function mkRng(seed) {
  let x = ((seed ^ 0xdeadbeef) | 1) >>> 0;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 0x100000000;
  };
}

// ── Effect A: Parabolic curve stitching ──────────────────────────────────────
// N lines from the bottom edge to the right edge; their envelope is a parabola
// with apex at the bottom-right corner.
function buildCurveVerts(N, W, H) {
  const data = new Float32Array(N * 6);
  for (let i = 0; i < N; i++) {
    const t = N > 1 ? i / (N - 1) : 0;
    const base = i * 6;
    data[base]     = t * W;  data[base + 1] = H;          data[base + 2] = t;
    data[base + 3] = W;      data[base + 4] = (1 - t) * H; data[base + 5] = t;
  }
  return data;
}

// ── Effect B: Spirograph ─────────────────────────────────────────────────────
// N circles of radius r, centres evenly spaced on a circle of radius R.
// Dense overlap creates the moiré "globe" from the cartoon.
function buildSpiroVerts(N, r, R, cx, cy, segs = 64) {
  const data = new Float32Array(N * segs * 6);
  let off = 0;
  for (let i = 0; i < N; i++) {
    const t  = i / (N - 1);
    const ca = (i / N) * Math.PI * 2;
    const px = cx + R * Math.cos(ca);
    const py = cy + R * Math.sin(ca);
    for (let j = 0; j < segs; j++) {
      const a0 = (j / segs) * Math.PI * 2;
      const a1 = ((j + 1) / segs) * Math.PI * 2;
      data[off++] = px + r * Math.cos(a0); data[off++] = py + r * Math.sin(a0); data[off++] = t;
      data[off++] = px + r * Math.cos(a1); data[off++] = py + r * Math.sin(a1); data[off++] = t;
    }
  }
  return data;
}

// Dot character: concentric rings approximate a filled circle (line-based).
function buildDotVerts(cx, cy, dotR, rings = 7, segs = 44) {
  const data = new Float32Array(rings * segs * 6);
  let off = 0;
  for (let ring = 1; ring <= rings; ring++) {
    const r = dotR * (ring / rings);
    for (let j = 0; j < segs; j++) {
      const a0 = (j / segs) * Math.PI * 2;
      const a1 = ((j + 1) / segs) * Math.PI * 2;
      data[off++] = cx + r * Math.cos(a0); data[off++] = cy + r * Math.sin(a0); data[off++] = 1.0;
      data[off++] = cx + r * Math.cos(a1); data[off++] = cy + r * Math.sin(a1); data[off++] = 1.0;
    }
  }
  return data;
}

// ── Shaders ──────────────────────────────────────────────────────────────────
// u_pivot + u_global_rot: optional whole-scene rotation (used by spirograph).
// Shimmer: per-vertex alpha is modulated by a slow sin wave keyed on a_t.
// Colour: linear mix between two colour endpoints (u_c0=0→ink, u_c1=1→highlight).
const VERT_SRC = `
attribute vec2 a_pos;
attribute float a_t;
uniform vec2 u_res;
uniform vec2 u_pivot;
uniform float u_global_rot;
uniform float u_time;
uniform float u_freq;
uniform float u_amp;
uniform float u_base_alpha;
uniform float u_phase_range;
uniform float u_scale;
varying float v_alpha;
varying float v_t;
void main() {
  vec2 p = a_pos - u_pivot;
  float gc = cos(u_global_rot), gs = sin(u_global_rot);
  p = vec2(p.x * gc - p.y * gs, p.x * gs + p.y * gc) * u_scale + u_pivot;
  v_alpha = clamp(u_base_alpha + u_amp * sin(u_time * u_freq + a_t * u_phase_range), 0.04, 1.0);
  v_t = a_t;
  gl_Position = vec4(p.x / u_res.x * 2.0 - 1.0, 1.0 - p.y / u_res.y * 2.0, 0.0, 1.0);
}`;

const FRAG_SRC = `
precision mediump float;
uniform vec3 u_ink;
uniform vec3 u_hi;
uniform float u_c0;
uniform float u_c1;
varying float v_alpha;
varying float v_t;
void main() {
  vec3 col = mix(u_ink, u_hi, clamp(mix(u_c0, u_c1, v_t), 0.0, 1.0));
  gl_FragColor = vec4(col, v_alpha);
}`;

function buildProgram(gl) {
  function mkShader(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VERT_SRC));
  gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG_SRC));
  gl.linkProgram(prog);
  return prog;
}

export default function LineArt() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const prog = buildProgram(gl);
    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const aPos       = gl.getAttribLocation(prog, 'a_pos');
    const aT         = gl.getAttribLocation(prog, 'a_t');
    const uRes       = gl.getUniformLocation(prog, 'u_res');
    const uPivot     = gl.getUniformLocation(prog, 'u_pivot');
    const uGlobalRot = gl.getUniformLocation(prog, 'u_global_rot');
    const uTime      = gl.getUniformLocation(prog, 'u_time');
    const uFreq      = gl.getUniformLocation(prog, 'u_freq');
    const uAmp       = gl.getUniformLocation(prog, 'u_amp');
    const uBase      = gl.getUniformLocation(prog, 'u_base_alpha');
    const uPhase     = gl.getUniformLocation(prog, 'u_phase_range');
    const uInk       = gl.getUniformLocation(prog, 'u_ink');
    const uHi        = gl.getUniformLocation(prog, 'u_hi');
    const uC0        = gl.getUniformLocation(prog, 'u_c0');
    const uC1        = gl.getUniformLocation(prog, 'u_c1');
    const uScale     = gl.getUniformLocation(prog, 'u_scale');

    const W = canvas.width;
    const H = canvas.height;

    const rng     = mkRng(Math.floor(Math.random() * 0xffffffff));
    const isSpiro = rng() < 0.5;

    // drawList: ordered array of { buf, vertCount, baseAlpha, amp, c0, c1 }
    const drawList = [];
    let pivot, rotSpeed, freq, phaseRange, breathFreq, breathAmp, tOffset = 0;

    if (isSpiro) {
      const N  = 72 + Math.floor(rng() * 36);       // 72–107 circles
      const R  = W * 0.42;
      const r  = R * 0.965;
      const [c0, c1] = rng() < 0.5 ? [0, 0] : [0, 1];

      // Centre at canvas corner (W, H) = viewport bottom-right — only top-left quadrant is visible
      const sv = buildSpiroVerts(N, r, R, W, H);
      const sb = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, sb);
      gl.bufferData(gl.ARRAY_BUFFER, sv, gl.STATIC_DRAW);
      drawList.push({ buf: sb, vertCount: sv.length / 3, baseAlpha: 0.82 + rng() * 0.10, amp: 0.04 + rng() * 0.04, c0, c1 });

      pivot      = [W, H];
      rotSpeed   = (rng() - 0.5) * 0.06;
      freq       = 0.10 + rng() * 0.15;
      phaseRange = Math.PI * (2 + rng() * 3);
      tOffset    = 20 + rng() * 60;
    } else {
      // Parabolic curve stitching
      const N        = 40 + Math.floor(rng() * 38);
      const [c0, c1] = [[0,0],[1,1],[0,1],[1,0]][Math.floor(rng() * 4)];
      const cv       = buildCurveVerts(N, W, H);
      const cb       = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cb);
      gl.bufferData(gl.ARRAY_BUFFER, cv, gl.STATIC_DRAW);
      drawList.push({ buf: cb, vertCount: cv.length / 3, baseAlpha: 0.38 + rng() * 0.35, amp: 0.07 + rng() * 0.10, c0, c1 });

      pivot      = [W, H];
      rotSpeed   = 0;
      freq       = 0.14 + rng() * 0.22;
      phaseRange = Math.PI * (1.5 + rng() * 2.5);
      breathFreq = 0.12 + rng() * 0.08;
      breathAmp  = 0.05 + rng() * 0.03;
    }

    function getInk() {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-ink').trim();
      return hexToRgb(raw.startsWith('#') ? raw : '#2c3e50');
    }

    let raf = null;
    let totalPausedMs = 0;
    let pauseStart = null;
    const t0 = performance.now();

    function drawFrame(now) {
      const t = (now - t0 - totalPausedMs) / 1000 + tOffset;
      const [ir, ig, ib] = getInk();
      const [hr, hg, hb] = hexToRgb(HIGHLIGHT);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.viewport(0, 0, W, H);

      gl.uniform2f(uRes,       W, H);
      gl.uniform2f(uPivot,     pivot[0], pivot[1]);
      gl.uniform1f(uGlobalRot, t * rotSpeed);
      gl.uniform1f(uTime,      t);
      gl.uniform1f(uFreq,      freq);
      gl.uniform1f(uPhase,     phaseRange);
      gl.uniform1f(uScale,     isSpiro ? 1.0 : 1.0 + breathAmp * Math.sin(t * breathFreq));
      gl.uniform3f(uInk,       ir, ig, ib);
      gl.uniform3f(uHi,        hr, hg, hb);

      const isDark = document.documentElement.classList.contains('dark');
      for (const { buf, vertCount, baseAlpha, amp, c0, c1 } of drawList) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 12, 0);
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aT,   1, gl.FLOAT, false, 12, 8);
        gl.enableVertexAttribArray(aT);

        gl.uniform1f(uBase, baseAlpha);
        gl.uniform1f(uAmp,  isDark ? amp * 0.4 : amp);
        gl.uniform1f(uC0,   c0);
        gl.uniform1f(uC1,   c1);

        gl.drawArrays(gl.LINES, 0, vertCount);
      }
    }

    function loop(now) {
      drawFrame(now);
      raf = requestAnimationFrame(loop);
    }

    function pause() {
      if (raf === null) return;
      cancelAnimationFrame(raf);
      raf = null;
      pauseStart = performance.now();
    }

    function resume() {
      if (pauseStart !== null) {
        totalPausedMs += performance.now() - pauseStart;
        pauseStart = null;
      }
      if (raf === null) raf = requestAnimationFrame(loop);
    }

    let observer = null;
    if (isSpiro) {
      if (document.documentElement.classList.contains('dark')) {
        requestAnimationFrame((now) => { drawFrame(now); pauseStart = performance.now(); });
      } else {
        raf = requestAnimationFrame(loop);
      }
      observer = new MutationObserver(() => {
        if (document.documentElement.classList.contains('dark')) {
          pause();
          requestAnimationFrame(drawFrame);
        } else {
          resume();
        }
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      drawList.forEach(({ buf }) => gl.deleteBuffer(buf));
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={520}
      height={520}
      style={{ position: 'fixed', bottom: 0, right: 0, pointerEvents: 'none' }}
      className="hidden sm:block"
      aria-hidden="true"
    />
  );
}
