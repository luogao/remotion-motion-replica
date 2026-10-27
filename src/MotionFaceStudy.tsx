import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { C, SC, SERIF, MONO, typed, Caret, FakeWindow, CodeEditor, ThumbGrid, AstraLogo, DashArrow, Magnifier, RoughCircle, RoughUnderline } from "./components";

const fadeIO = (f: number, a: number, b: number, inD = 8, outD = 8) =>
  Math.min(
    interpolate(f, [a, a + inD], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(f, [b - outD, b], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );

const Chars: React.FC<{ text: string; start: number; gap?: number; size: number; weight?: number; color?: string; family?: string }> = ({
  text, start, gap = 2, size, weight = 700, color = C.ink, family = SC,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", fontFamily: family, fontSize: size, fontWeight: weight, color }}>
      {text.split("").map((ch, i) => {
        const s = spring({ frame: frame - start - i * gap, fps: 30, config: { damping: 16, stiffness: 160 } });
        return (
          <span key={i} style={{
            display: "inline-block", opacity: s,
            transform: `translateY(${(1 - s) * 26}px)`, whiteSpace: "pre",
          }}>{ch}</span>
        );
      })}
    </div>
  );
};

/* ================= 1. 想法诞生 ================= */
const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const op = fadeIO(frame, 0, 110, 6, 8);
  const glow = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const born = spring({ frame: frame - 52, fps, config: { damping: 14, stiffness: 90 } });
  return (
    <AbsoluteFill style={{ opacity: op, background: `radial-gradient(circle at 50% 38%, #FFF9E8 0%, ${C.paper} 62%)` }}>
      <div style={{
        position: "absolute", top: 250, width: "100%", textAlign: "center",
        fontFamily: SC, fontSize: 30, color: C.greyDeep, letterSpacing: 2,
        opacity: interpolate(frame, [6, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>于是一个直观的</div>

      <svg width="240" height="276" viewBox="0 0 200 230" style={{ position: "absolute", left: 420, top: 290 }}>
        <circle cx="100" cy="95" r="88" fill={`rgba(242,201,76,${0.22 * glow})`} />
        <path d="M100 22 C60 22 40 52 40 88 C40 116 58 128 66 146 L134 146 C142 128 160 116 160 88 C160 52 140 22 100 22 Z"
          fill="#FFFDF6" stroke={C.ink} strokeWidth="5" strokeLinejoin="round" />
        <path d="M66 146 L134 146" stroke={C.ink} strokeWidth="5" strokeLinecap="round" />
        <path d="M72 162 L128 162" stroke={C.ink} strokeWidth="5" strokeLinecap="round" />
        <path d="M80 178 L120 178" stroke={C.ink} strokeWidth="5" strokeLinecap="round" />
        <path d="M84 108 C88 92 96 96 100 84 C104 96 112 92 116 108" fill="none" stroke={C.yellow} strokeWidth="5" strokeLinecap="round" />
      </svg>

      <div style={{ position: "absolute", top: 690, width: "100%", display: "flex", justifyContent: "center" }}>
        <Chars text="想法" start={26} size={148} gap={4} />
      </div>

      <div style={{
        position: "absolute", top: 300, right: 80, fontFamily: SERIF, fontSize: 84,
        color: C.ink, opacity: 0.32 * born, transform: `translateX(${(1 - born) * 120}px)`,
        letterSpacing: 8,
      }}>诞生了</div>
    </AbsoluteFill>
  );
};

/* ================= 2. 文案脚本 ================= */
const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const op = fadeIO(frame, 110, 265, 6, 8);
  const text1 = typed("我们可以根据文案脚本，", frame, 132, 22);
  const text2 = typed("先找个差不多的高质量动效参考。", frame, 168, 22);
  return (
    <AbsoluteFill style={{ opacity: op, background: C.paper }}>
      <div style={{ position: "absolute", left: 90, top: 180, fontFamily: SC, fontSize: 62, fontWeight: 700, color: C.ink }}>
        根据<span style={{ color: C.red }}>文案脚本</span>
      </div>
      <div style={{
        position: "absolute", left: 92, top: 260, fontFamily: SERIF, fontStyle: "italic",
        fontSize: 34, color: C.greyDeep,
      }}>先有本子，再有画面</div>

      <FakeWindow title="script.md" x={150} y={360} w={780} h={600} delay={118}>
        <div style={{ fontFamily: SC, fontSize: 34, lineHeight: 1.9, color: C.ink, fontWeight: 500 }}>
          {text1}{text1.length < 11 && <Caret frame={frame} />}
          <br />
          {text2}{text1.length >= 11 && text2.length < 14 && <Caret frame={frame} />}
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 34 }}>
          {["参考 01", "参考 02", "参考 03"].map((t, i) => (
            <div key={t} style={{
              flex: 1, height: 110, borderRadius: 10, background: "#F1EEE7",
              border: `1px solid ${C.grey}`, display: "flex", alignItems: "center",
              justifyContent: "center", fontFamily: SC, fontSize: 22, color: C.greyDeep,
              opacity: interpolate(frame, [200 + i * 8, 214 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>{t}</div>
          ))}
        </div>
        <div style={{
          marginTop: 22, paddingTop: 20, borderTop: `1px solid ${C.grey}`,
          fontFamily: MONO, fontSize: 20, color: C.greyDeep,
        }}>
          # 提取创作技巧 · 换成你的内容
        </div>
      </FakeWindow>

      <div style={{
        position: "absolute", right: 70, top: 980, fontFamily: SERIF, fontSize: 30,
        color: C.greyDeep, transform: "rotate(-4deg)",
        opacity: interpolate(frame, [190, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>↑ 这一步决定上限</div>
    </AbsoluteFill>
  );
};

/* ================= 3. 九宫格 ================= */
const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const op = fadeIO(frame, 265, 405, 6, 8);
  return (
    <AbsoluteFill style={{ opacity: op, background: C.paper }}>
      <div style={{ position: "absolute", left: 90, top: 170, fontFamily: SC, fontSize: 60, fontWeight: 700, color: C.ink }}>
        找一个<span style={{ color: C.red }}>高质量</span>动效参考
      </div>
      <div style={{ position: "absolute", left: 92, top: 250, fontFamily: SC, fontSize: 26, color: C.greyDeep, letterSpacing: 1 }}>
        不是找好看的，是找结构清晰的
      </div>

      <ThumbGrid x={254} y={430} start={280} />
      <Magnifier x={290} y={930} delay={330} />
      <RoughCircle cx={344} cy={716} rx={104} ry={104} delay={340} />

      <div style={{
        position: "absolute", left: 90, top: 1120, display: "flex", gap: 14, alignItems: "center",
        opacity: interpolate(frame, [330, 350], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: C.red, color: "#fff", fontFamily: SC, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>1</div>
        <div style={{ fontFamily: SC, fontSize: 30, color: C.ink }}>看构图和动效密度，不看内容</div>
      </div>
    </AbsoluteFill>
  );
};

/* ================= 4. astra 复刻 ================= */
const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const op = fadeIO(frame, 400, 625, 6, 8);
  const prog = interpolate(frame, [430, 590], [0.1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  return (
    <AbsoluteFill style={{ opacity: op, background: C.paper }}>
      <div style={{ position: "absolute", left: 90, top: 160, fontFamily: SC, fontSize: 56, fontWeight: 700, color: C.ink }}>
        <span style={{ fontFamily: SERIF, fontStyle: "italic" }}>astra</span> 用 <span style={{ fontFamily: SERIF, fontStyle: "italic" }}>remotion</span> 复刻
      </div>

      <AstraLogo x={118} y={290} size={148} delay={412} />
      <div style={{
        position: "absolute", left: 108, top: 460, fontFamily: MONO, fontSize: 18, color: C.greyDeep,
        opacity: interpolate(frame, [418, 430], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>astra</div>

      <DashArrow x1={200} y1={450} x2={330} y2={560} delay={426} />
      <CodeEditor x={280} y={530} w={760} delay={430} progress={prog} />

      <div style={{
        position: "absolute", right: 60, top: 300, width: 200, fontFamily: SERIF, fontStyle: "italic",
        fontSize: 28, color: C.greyDeep, transform: "rotate(3deg)", lineHeight: 1.5,
        opacity: interpolate(frame, [500, 520], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>不是抄画面，<br />是还原运动结构</div>
    </AbsoluteFill>
  );
};

/* ================= 5. token 成本 ================= */
const S5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - 625;
  const op = fadeIO(frame, 625, 805, 6, 8);
  const s = spring({ frame: local, fps, config: { damping: 14 } });
  const p = interpolate(local, [30, 120], [0.05, 0.88], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const n = Math.round(4747 + (847367 - 4747) * interpolate(local, [20, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
  return (
    <AbsoluteFill style={{ opacity: op, background: C.paper }}>
      <div style={{ position: "absolute", left: 90, top: 200, fontFamily: SC, fontSize: 58, fontWeight: 700, color: C.ink }}>
        复刻 <span style={{ color: C.red }}>非常烧</span> tokens
      </div>
      <div style={{ position: "absolute", left: 92, top: 285, fontFamily: SC, fontSize: 26, color: C.greyDeep }}>
        一次完整复刻 ≈ 一次中型项目
      </div>

      <div style={{
        position: "absolute", left: 90, top: 520, width: 800, padding: "54px 44px",
        background: C.paper2, borderRadius: 18, boxShadow: "0 14px 36px rgba(26,26,24,0.09)",
        transform: `translateY(${(1 - s) * 40}px)`, opacity: s,
      }}>
        <div style={{ fontFamily: MONO, fontSize: 20, color: C.greyDeep, letterSpacing: 3 }}>TOKENS 消耗</div>
        <div style={{
          fontFamily: SC, fontSize: 96, fontWeight: 700, color: C.red,
          fontVariantNumeric: "tabular-nums", letterSpacing: -2, lineHeight: 1.2, marginTop: 8,
        }}>{n.toLocaleString("en-US")}</div>
        
        <div style={{ marginTop: 20, height: 12, background: C.grey, borderRadius: 6 }}>
          <div style={{ width: `${p * 100}%`, height: 12, background: C.red, borderRadius: 6, position: "relative" }}>
            <div style={{ position: "absolute", right: -8, top: -3, width: 18, height: 18, borderRadius: 9, background: C.red, boxShadow: "0 0 0 4px rgba(192,57,43,0.12)" }} />
          </div>
        </div>
      </div>

      <RoughUnderline x={134} y={716} w={430} delay={700} />

      <div style={{
        position: "absolute", left: 90, top: 830, width: 800,
        opacity: interpolate(local, [80, 96], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: SC, fontSize: 24, color: C.greyDeep, marginBottom: 8 }}>
          <span>完整复刻一次</span><span>100%</span>
        </div>
        <div style={{ height: 16, background: C.red, borderRadius: 8, marginBottom: 22, width: `${p * 100}%` }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: SC, fontSize: 24, color: C.greyDeep, marginBottom: 8 }}>
          <span>vibe coding 换文案</span><span>7%</span>
        </div>
        <div style={{ height: 16, background: C.grey, borderRadius: 8 }}>
          <div style={{ width: "7%", height: 16, background: C.red, borderRadius: 8 }} />
        </div>
      </div>

      <div style={{
        position: "absolute", left: 90, top: 1080, fontFamily: SERIF, fontStyle: "italic",
        fontSize: 30, color: C.greyDeep,
        opacity: interpolate(local, [100, 118], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>贵的是「复刻」，不是「修改」</div>
    </AbsoluteFill>
  );
};

/* ================= 6. slogan ================= */
const S6: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame - 805;
  const push = interpolate(local, [0, 16], [1.18, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const blur = interpolate(local, [0, 16], [9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: C.ink, transform: `scale(${push})`, filter: `blur(${blur}px)` }}>
      <div style={{
        position: "absolute", top: 430, width: "100%", textAlign: "center",
        fontFamily: SC, fontSize: 92, fontWeight: 700, color: "#fff", letterSpacing: 6,
        opacity: interpolate(local, [12, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        transform: `translateY(${interpolate(local, [12, 26], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
      }}>一人复刻</div>
      <div style={{
        position: "absolute", top: 570, width: "100%", textAlign: "center",
        fontFamily: SC, fontSize: 92, fontWeight: 700, color: "#fff", letterSpacing: 6,
        opacity: interpolate(local, [26, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        transform: `translateY(${interpolate(local, [26, 40], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
      }}>万人共享</div>
      <div style={{
        position: "absolute", top: 760, width: "100%", textAlign: "center",
        fontFamily: SC, fontSize: 24, letterSpacing: 10, color: C.yellow,
        opacity: interpolate(local, [50, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>MOTION FACE</div>
      <div style={{
        position: "absolute", bottom: 110, width: "100%", textAlign: "center",
        fontFamily: SERIF, fontStyle: "italic", fontSize: 26, color: "#9A948A",
        opacity: interpolate(local, [60, 74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>token 不该是一次性消费品</div>
    </AbsoluteFill>
  );
};

export const MotionFaceStudy: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      {frame < 118 && <S1 />}
      {frame >= 110 && frame < 273 && <S2 />}
      {frame >= 265 && frame < 413 && <S3 />}
      {frame >= 400 && frame < 633 && <S4 />}
      {frame >= 625 && frame < 813 && <S5 />}
      {frame >= 805 && <S6 />}
    </AbsoluteFill>
  );
};
