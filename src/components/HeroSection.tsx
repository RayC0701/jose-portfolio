"use client";

import { useRef, useEffect, useState } from "react";
import { useIsIntersecting } from "./useIntersection";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const VERT = `attribute vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}`;

const FRAG = `precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

vec2 hash(vec2 p){
  p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
  return -1.0+2.0*fract(sin(p)*43758.5453);
}

float noise(vec2 p){
  vec2 i=floor(p);vec2 f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(
    mix(dot(hash(i),f),dot(hash(i+vec2(1,0)),f-vec2(1,0)),u.x),
    mix(dot(hash(i+vec2(0,1)),f-vec2(0,1)),dot(hash(i+vec2(1,1)),f-vec2(1,1)),u.x),
    u.y);
}

float fbm(vec2 p){
  float v=0.0,a=0.5;
  mat2 r=mat2(0.877,0.479,-0.479,0.877);
  for(int i=0;i<4;i++){v+=a*noise(p);p=r*p*2.0;a*=0.5;}
  return v;
}

void main(){
  vec2 uv=gl_FragCoord.xy/uResolution;
  float asp=uResolution.x/uResolution.y;
  vec2 p=(uv-0.5)*vec2(asp,1.0);
  float t=uTime*0.08;

  vec2 w=vec2(noise(p*2.5+t),noise(p*2.5+t+100.0))*0.12;
  vec2 gp=(p+w)*10.0;
  vec2 gf=fract(gp);
  float lw=0.05;
  float gx=smoothstep(0.0,lw,gf.x)*smoothstep(1.0,1.0-lw,gf.x);
  float gy=smoothstep(0.0,lw,gf.y)*smoothstep(1.0,1.0-lw,gf.y);
  float grid=(1.0-gx*gy)*0.07;

  float nx=1.0-smoothstep(0.0,0.08,min(gf.x,1.0-gf.x));
  float ny=1.0-smoothstep(0.0,0.08,min(gf.y,1.0-gf.y));
  float nodes=nx*ny*0.12;

  float n1=fbm(vec2(p.x*1.5+t*0.6,p.y*0.8-t*0.4));
  float n2=fbm(vec2(p.x*1.2-t*0.5,p.y+t*0.3)+n1*0.4);
  float aurora=smoothstep(0.1,0.6,n2)*0.15;

  float pulse=1.0+0.15*sin(uTime*0.4);
  float center=exp(-dot(p,p)*1.8)*0.1*pulse;

  vec2 mp=(uMouse-0.5)*vec2(asp,1.0);
  float mglow=exp(-pow(length(p-mp),2.0)*4.0)*0.06;

  vec3 col=vec3(0.15,0.3,0.85)*(grid+nodes)
    +mix(vec3(0.06,0.12,0.45),vec3(0.25,0.05,0.45),n1*0.5+0.5)*aurora
    +vec3(0.12,0.2,0.6)*center
    +mix(vec3(0.15,0.35,0.9),vec3(0.4,0.15,0.7),0.5+0.5*sin(uTime*0.25))*mglow;

  float vig=1.0-dot(uv-0.5,uv-0.5)*1.2;
  col*=clamp(vig,0.0,1.0);
  col*=1.0+0.04*sin(uTime*0.3);

  gl_FragColor=vec4(col,1.0);
}`;

function StaticBackground() {
  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(59,130,246,0.18) 0%, rgba(139,92,246,0.08) 45%, transparent 75%), #0A0A0B",
      }}
    />
  );
}

function WebGLBackground({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [unsupported, setUnsupported] = useState(false);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setUnsupported(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setUnsupported(true);
      return;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setUnsupported(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uResolution");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    let mx = 0.5,
      my = 0.5,
      smx = 0.5,
      smy = 0.5;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouse);

    const t0 = performance.now();
    let raf = 0;
    const render = () => {
      if (!runningRef.current) return;
      smx += (mx - smx) * 0.02;
      smy += (my - smy) * 0.02;
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, smx, smy);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };

    if (active) {
      runningRef.current = true;
      raf = requestAnimationFrame(render);
    }

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [active]);

  if (unsupported) return <StaticBackground />;
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

const LINES: { text: string; cls: string }[][] = [
  [{ text: "WHERE", cls: "text-white/90" }],
  [
    { text: "DEEP", cls: "text-gradient" },
    { text: "TECH", cls: "text-gradient" },
  ],
  [{ text: "MEETS", cls: "text-white/90" }],
  [{ text: "RELENTLESS", cls: "text-gradient-warm" }],
  [{ text: "EXECUTION", cls: "text-white/90" }],
];

let _gi = 0;
const INDEXED = LINES.map((line) => line.map((w) => ({ ...w, i: _gi++ })));

export default function HeroSection() {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const inView = useIsIntersecting(sectionRef, "0px");
  const active = inView && !reduceMotion;

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!active) {
      if (textRef.current) textRef.current.style.transform = "";
      return;
    }
    let mx = 0,
      my = 0,
      sx = 0,
      sy = 0,
      raf = 0,
      running = true;

    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const tick = () => {
      if (!running) return;
      sx += (mx - sx) * 0.04;
      sy += (my - sy) * 0.04;
      if (textRef.current) {
        textRef.current.style.transform = `translate(${sx * -15}px, ${sy * -10}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 hero-gradient" />
      {reduceMotion ? <StaticBackground /> : <WebGLBackground active={active} />}
      <div className="absolute inset-0 grain-overlay" />

      <div
        ref={textRef}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center will-change-transform"
      >
        <p
          className={`text-xs md:text-sm tracking-[0.4em] uppercase text-white/60 mb-5 transition-all duration-1000 ease-out ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          AI Engineer &middot; Technical Founder &middot; Infrastructure Architect
        </p>

        <h1 className="relative overflow-hidden font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.85] tracking-tight mb-4">
          {INDEXED.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => (
                <span key={wi}>
                  <span
                    className={`inline-block hero-word ${word.cls} ${revealed ? "hero-word-visible" : ""}`}
                    style={{ animationDelay: `${500 + word.i * 130}ms` }}
                  >
                    {word.text}
                  </span>
                  {wi < line.length - 1 && <span className="inline-block w-[0.3em]" />}
                </span>
              ))}
            </span>
          ))}
          <span className={`light-sweep-bar ${revealed ? "light-sweep-active" : ""}`} />
        </h1>

        <p
          className={`text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4 font-light transition-all duration-1000 ease-out ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          Jose Canales builds production-grade AI systems that ship, scale, and survive.
        </p>

        <p
          className={`text-sm md:text-base tracking-[0.3em] uppercase font-bold text-white/60 transition-all duration-1000 ease-out ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "1400ms" }}
        >
          12 Production Systems. Zero Downtime.
        </p>

        <div
          className={`mt-10 flex flex-col items-center gap-3 transition-all duration-1000 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1800ms" }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/45">Scroll to explore</span>
          <div className="scroll-indicator">
            <div className="scroll-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}
