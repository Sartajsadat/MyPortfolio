import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type Tok = [text: string, cls?: string];

const K = 'text-violet'; // keyword
const A = 'text-cyan'; // annotation
const T = 'text-accent'; // type
const S = 'text-success'; // string
const P = 'text-faint'; // punctuation
const F = 'text-warning'; // function / method

const CODE: Tok[][] = [
  [['@RestController', A]],
  [['@RequestMapping', A], ['(', P], ['"/api/requirements"', S], [')', P]],
  [['public class ', K], ['RequirementController', T], [' {', P]],
  [],
  [['  private final ', K], ['RequirementService', T], [' service', ''], [';', P]],
  [],
  [['  @PostMapping', A], ['(', P], ['"/{id}/approve"', S], [')', P]],
  [['  @PreAuthorize', A], ['(', P], ['"hasRole(\'REVIEWER\')"', S], [')', P]],
  [['  public ', K], ['ResponseEntity', T], ['<', P], ['RequirementDto', T], ['> ', P], ['approve', F], ['(', P]],
  [['      @PathVariable ', A], ['Long', T], [' id', ''], [') {', P]],
  [['    return ', K], ['ResponseEntity', T], ['.', P], ['ok', F], ['(service.', ''], ['approve', F], ['(id));', P]],
  [['  }', P]],
  [['}', P]],
];

const total = CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

export function CodeWindow() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? total : 0);

  useEffect(() => {
    if (reduce) {
      setCount(total);
      return;
    }
    let raf = 0;
    let last = 0;
    const start = window.setTimeout(() => {
      const tick = (t: number) => {
        if (t - last > 16) {
          last = t;
          setCount((c) => {
            const next = Math.min(total, c + 2);
            if (next < total) raf = requestAnimationFrame(tick);
            return next;
          });
        } else raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 900);
    return () => {
      window.clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const rendered = useMemo(() => {
    let left = count;
    let cursorLine = -1;
    const lines = CODE.map((line, li) => {
      const out: JSX.Element[] = [];
      line.forEach(([text, cls], ti) => {
        if (left <= 0) return;
        const part = text.slice(0, left);
        left -= part.length;
        out.push(
          <span key={ti} className={cls || 'text-ink/90'}>
            {part}
          </span>,
        );
      });
      if (left > 0) left -= 1;
      else if (cursorLine === -1) cursorLine = li;
      return out;
    });
    if (cursorLine === -1) cursorLine = CODE.length - 1;
    return { lines, cursorLine };
  }, [count]);

  const done = count >= total;

  return (
    <div className="glass relative overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
      <div className="flex items-center gap-3 border-b border-line-soft px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="flex min-w-0 items-center gap-2 rounded-md bg-elevated/70 px-2.5 py-1 font-mono text-[0.68rem] text-muted">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
          <span className="truncate">RequirementController.java</span>
        </div>
        <span className="ml-auto hidden font-mono text-[0.62rem] uppercase tracking-widest text-faint sm:block">spring-boot</span>
      </div>
      <pre
        className="overflow-hidden px-4 py-4 font-mono text-[0.68rem] leading-[1.7] sm:text-[0.74rem]"
        aria-label="Sample Spring Boot controller code"
      >
        <code>
          {rendered.lines.map((tokens, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-4 shrink-0 select-none text-right text-faint/60" aria-hidden="true">
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {tokens}
                {i === rendered.cursorLine && (
                  <span className={`ml-px inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-cyan/80 ${done ? 'animate-blink' : ''}`} />
                )}
              </span>
            </div>
          ))}
        </code>
      </pre>
      <div className="flex items-center justify-between border-t border-line-soft px-4 py-2 font-mono text-[0.62rem] text-faint">
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${done ? 'bg-success' : 'bg-warning'}`} />
          {done ? 'Build passing' : 'Compiling…'}
        </span>
        <span>UTF-8 · Java 17</span>
      </div>
    </div>
  );
}
