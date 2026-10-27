import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const C = {
  paper: "#EFEBE4",
  paper2: "#FDFCF8",
  ink: "#1A1A18",
  red: "#C0392B",
  redDark: "#9E2F24",
  yellow: "#F2C94C",
  grey: "#DAD5CC",
  greyDeep: "#8C8579",
  codeBg: "#1E1E1C",
};

export const SC = "'PingFang SC', 'Hiragino Sans GB', sans-serif";
export const SERIF = "Georgia, 'Songti SC', serif";
export const MONO = "Menlo, 'SF Mono', monospace";

/* 打字机：按帧输出前 n 个字符 */
export const typed = (text: string, frame: number, start: number, cps = 24) => {
  const n = Math.max(0, Math.floor(((frame - start) / 30) * cps));
  return text.slice(0, Math.min(n, text.length));
};

export const Caret: React.FC<{ frame: number; color?: string }> = ({ frame, color = C.ink }) => (
  <span style={{
    display: "inline-block", width: 3, height: "1em", background: color,
    marginLeft: 2, verticalAlign: "-0.12em",
    opacity: frame % 30 < 15 ? 1 : 0,
  }} />
);

/* ---------- 假文件窗口 ---------- */
export const FakeWindow: React.FC<{
  title: string; x: number; y: number; w: number; h: number; delay: number; children?: React.ReactNode;
}> = ({ title, x, y, w, h, delay, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 120 } });
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, height: h,
      background: "#fff", borderRadius: 14, overflow: "hidden",
      boxShadow: "0 16px 40px rgba(26,26,24,0.13)",
      transform: `translateY(${(1 - s) * 40}px) scale(${0.97 + s * 0.03})`, opacity: s,
    }}>
      <div style={{
        height: 46, borderBottom: `1px solid ${C.grey}`,
        display: "flex", alignItems: "center", padding: "0 18px", gap: 8,
      }}>
        {["#E5695E", "#E8B04B", "#7FB069"].map((c) => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c, opacity: 0.75 }} />
        ))}
        <div style={{ marginLeft: 10, fontFamily: MONO, fontSize: 20, color: C.greyDeep }}>{title}</div>
      </div>
      <div style={{ padding: 26 }}>{children}</div>
    </div>
  );
};

/* ---------- 代码编辑器 ---------- */
const CODE: { t: string; c: string }[][] = [
  [{ t: "import", c: "#C792EA" }, { t: " { spring } ", c: "#D4D4D4" }, { t: "from", c: "#C792EA" }, { t: " 'remotion'", c: "#C3E88D" }, { t: ";", c: "#D4D4D4" }],
  [{ t: "", c: "" }],
  [{ t: "export const", c: "#C792EA" }, { t: " Remix ", c: "#82AAFF" }, { t: "= () => {", c: "#D4D4D4" }],
  [{ t: "  const", c: "#C792EA" }, { t: " frame ", c: "#D4D4D4" }, { t: "= useCurrentFrame();", c: "#D4D4D4" }],
  [{ t: "  const", c: "#C792EA" }, { t: " s ", c: "#D4D4D4" }, { t: "= spring({ frame, fps: ", c: "#D4D4D4" }, { t: "30", c: "#F78C6C" }, { t: " });", c: "#D4D4D4" }],
  [{ t: "  return", c: "#C792EA" }, { t: " (", c: "#D4D4D4" }],
  [{ t: "    <AbsoluteFill>", c: "#89DDFF" }],
  [{ t: "      <TileGrid scale={s} />", c: "#89DDFF" }],
  [{ t: "    </AbsoluteFill>", c: "#89DDFF" }],
  [{ t: "  );", c: "#D4D4D4" }],
  [{ t: "};", c: "#D4D4D4" }],
];

export const CodeEditor: React.FC<{ x: number; y: number; w: number; delay: number; progress: number }> = ({
  x, y, w, delay, progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 15 } });
  const lines = Math.min(CODE.length, Math.max(0, Math.floor((frame - delay - 8) / 4)));
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w,
      background: C.codeBg, borderRadius: 12, overflow: "hidden",
      boxShadow: "0 20px 44px rgba(26,26,24,0.28)",
      transform: `translateY(${(1 - s) * 36}px)`, opacity: s,
    }}>
      <div style={{
        height: 40, background: "#2A2A26", display: "flex", alignItems: "center",
        padding: "0 16px", gap: 7,
      }}>
        {["#E5695E", "#E8B04B", "#7FB069"].map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: 5, background: c, opacity: 0.7 }} />
        ))}
        <div style={{ marginLeft: 10, fontFamily: MONO, fontSize: 17, color: "#8C8579" }}>Remix.tsx — remotion</div>
      </div>
      <div style={{ padding: "14px 0 8px" }}>
        {CODE.slice(0, lines).map((ln, i) => (
          <div key={i} style={{ display: "flex", fontFamily: MONO, fontSize: 16, lineHeight: "26px", paddingLeft: 14 }}>
            <span style={{ width: 26, color: "#5A5A52", textAlign: "right", marginRight: 14 }}>{i + 1}</span>
            <span>{ln.map((p, j) => <span key={j} style={{ color: p.c }}>{p.t}</span>)}</span>
          </div>
        ))}
      </div>
      <div style={{ height: 4, background: "#33332E" }}>
        <div style={{ width: `${progress * 100}%`, height: 4, background: C.red }} />
      </div>
      <div style={{
        padding: "6px 14px 10px", textAlign: "right", fontFamily: SC,
        fontSize: 15, color: "#8C8579",
      }}>复刻中 {Math.round(progress * 100)}%</div>
    </div>
  );
};

/* ---------- 九宫格缩略图 ---------- */
const rnd = (i: number, k = 1) => {
  const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return v - Math.floor(v);
};
export const ThumbGrid: React.FC<{ x: number; y: number; start: number }> = ({ x, y, start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "grid", gridTemplateColumns: "repeat(3, 180px)", gap: 16 }}>
      {new Array(9).fill(0).map((_, i) => {
        const d = start + i * 3;
        const s = spring({ frame: frame - d, fps, config: { damping: 18, stiffness: 140 } });
        const kind = i % 3;
        return (
          <div key={i} style={{
            width: 180, height: 180, background: "#EFECE5", borderRadius: 14,
            opacity: s, transform: `scale(${0.86 + s * 0.14})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(26,26,24,0.05)",
          }}>
            {kind === 0 && <div style={{ width: 58, height: 58, borderRadius: 29, background: "#C9C4B8" }} />}
            {kind === 1 && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
                {[0.5, 0.85, 0.65, 1].map((h, j) => (
                  <div key={j} style={{ width: 12, height: 58 * h, background: "#C9C4B8", borderRadius: 3 }} />
                ))}
              </div>
            )}
            {kind === 2 && (
              <div style={{ width: 64, height: 64, background: "#C9C4B8", borderRadius: 8, transform: `rotate(${rnd(i) * 40 - 20}deg)` }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ---------- astra logo ---------- */
export const AstraLogo: React.FC<{ x: number; y: number; size: number; delay: number }> = ({ x, y, size, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 150 } });
  const d = size * 0.15;
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: size, height: size,
      background: "#fff", border: `2px solid ${C.red}`, borderRadius: size * 0.22,
      transform: `scale(${s}) rotate(${(1 - s) * -12}deg)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 10px 24px rgba(26,26,24,0.12)",
    }}>
      <div style={{ position: "relative", width: size * 0.6, height: size * 0.6 }}>
        <div style={{ position: "absolute", left: d, top: d, width: size * 0.16, height: size * 0.16, borderRadius: "50%", background: "#1A1A18" }} />
        <div style={{ position: "absolute", right: d, top: d, width: size * 0.16, height: size * 0.16, borderRadius: "50%", background: "#E8A230" }} />
        <div style={{ position: "absolute", left: "42%", bottom: d, width: size * 0.14, height: size * 0.14, borderRadius: "50%", background: "#C0392B" }} />
      </div>
    </div>
  );
};

/* ---------- 虚线箭头 ---------- */
export const DashArrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; delay: number }> = ({
  x1, y1, x2, y2, delay,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1440, pointerEvents: "none" }}>
      <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p}
        stroke={C.red} strokeWidth={3} strokeDasharray="8 8" strokeLinecap="round" />
      {p > 0.95 && (
        <path d={`M ${x2 - 12} ${y2 - 10} L ${x2} ${y2} L ${x2 - 14} ${y2 + 6}`} fill="none" stroke={C.red} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
};

/* ---------- 手绘放大镜 ---------- */
export const Magnifier: React.FC<{ x: number; y: number; delay: number }> = ({ x, y, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const scan = interpolate(frame - delay, [10, 55], [0, 260], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  return (
    <svg width="120" height="120" style={{
      position: "absolute", left: x + scan, top: y,
      transform: `scale(${s})`, opacity: s,
    }}>
      <circle cx="48" cy="48" r="32" fill="rgba(255,255,255,0.35)" stroke="#1A1A18" strokeWidth="7" />
      <line x1="71" y1="71" x2="100" y2="100" stroke="#1A1A18" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
};
/* ---------- 手绘圈 / 下划线 ---------- */
export const RoughCircle: React.FC<{ cx: number; cy: number; rx: number; ry: number; delay: number; color?: string }> = ({
  cx, cy, rx, ry, delay, color = C.red,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const len = 2 * Math.PI * ((rx + ry) / 2) * 1.06;
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1440, pointerEvents: "none" }}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={color} strokeWidth={5}
        strokeLinecap="round" transform={`rotate(-2 ${cx} ${cy})`}
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9} />
      <ellipse cx={cx + 3} cy={cy + 2} rx={rx - 4} ry={ry - 3} fill="none" stroke={color} strokeWidth={2}
        strokeLinecap="round" transform={`rotate(1 ${cx} ${cy})`}
        strokeDasharray={len} strokeDashoffset={len * (1 - Math.max(0, p - 0.06))} opacity={0.45} />
    </svg>
  );
};

export const RoughUnderline: React.FC<{ x: number; y: number; w: number; delay: number; color?: string }> = ({
  x, y, w, delay, color = C.red,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1440, pointerEvents: "none" }}>
      <path d={`M ${x} ${y} C ${x + w * 0.25} ${y - 6}, ${x + w * 0.6} ${y + 7}, ${x + w} ${y - 2}`}
        fill="none" stroke={color} strokeWidth={6} strokeLinecap="round"
        strokeDasharray={w * 1.1} strokeDashoffset={w * 1.1 * (1 - p)} opacity={0.85} />
    </svg>
  );
};
