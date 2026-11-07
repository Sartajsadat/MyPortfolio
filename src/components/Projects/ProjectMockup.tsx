import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import type { MockupVariant } from '@/types/content';
import { cn } from '@/utils/cn';

/**
 * Illustrated product mockups. Each one is drawn on a fixed 640×400 canvas
 * and scaled to fit, so it looks identical on every screen size.
 * All values shown are illustrative UI, not real data.
 */

const W = 640;
const H = 400;

function Scaled({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

function Chrome({ url, children, accent = 'accent' }: { url: string; children: ReactNode; accent?: string }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[14px] border border-line-soft bg-surface">
      <div className="flex h-8 shrink-0 items-center gap-3 border-b border-line-soft bg-elevated/70 px-3">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
        </div>
        <div className="mx-auto flex h-5 w-64 items-center justify-center gap-1.5 rounded-md bg-bg/70 font-mono text-[9px] text-faint">
          <span className={`h-1.5 w-1.5 rounded-full bg-${accent}`} />
          {url}
        </div>
        <div className="w-10" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

function Sidebar({ items, active = 0, brand }: { items: string[]; active?: number; brand: string }) {
  return (
    <aside className="flex h-full w-[128px] shrink-0 flex-col gap-1 border-r border-line-soft bg-bg/40 p-3">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-5 w-5 rounded-md bg-gradient-to-br from-accent to-cyan" />
        <span className="font-display text-[11px] font-semibold text-ink">{brand}</span>
      </div>
      {items.map((it, i) => (
        <div
          key={it}
          className={cn(
            'flex items-center gap-2 rounded-md px-2 py-1.5 text-[9.5px]',
            i === active ? 'bg-accent/15 text-ink' : 'text-faint',
          )}
        >
          <span className={cn('h-2 w-2 rounded-[3px]', i === active ? 'bg-accent' : 'bg-faint/40')} />
          {it}
        </div>
      ))}
    </aside>
  );
}

const Bar = ({ w, className }: { w: string; className?: string }) => (
  <span className={cn('block h-[6px] rounded-full bg-faint/25', className)} style={{ width: w }} />
);

/* ---------------- Variants ---------------- */

function Workflow() {
  const steps = ['Submitted', 'Review', 'Analysis', 'Approved'];
  const rows = [
    { id: 'REQ-0142', org: 'Org. A', s: 'Approved', c: 'success' },
    { id: 'REQ-0141', org: 'Org. B', s: 'In Review', c: 'warning' },
    { id: 'REQ-0139', org: 'Org. C', s: 'Analysis', c: 'cyan' },
    { id: 'REQ-0137', org: 'Org. D', s: 'Submitted', c: 'violet' },
  ];
  return (
    <Chrome url="rems.gov.local/requirements">
      <div className="flex h-full">
        <Sidebar brand="REMS" items={['Dashboard', 'Requirements', 'Approvals', 'Organizations', 'Documents', 'Audit Log']} active={1} />
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-[14px] font-semibold text-ink">Requirement workflow</p>
              <p className="text-[9px] text-faint">Multi-level approval pipeline</p>
            </div>
            <div className="flex overflow-hidden rounded-md border border-line-soft text-[8.5px]">
              {['EN', 'پښتو', 'دری'].map((l, i) => (
                <span key={l} className={cn('px-2 py-1', i === 0 ? 'bg-accent text-white' : 'text-muted')}>
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={cn(
                      'grid h-6 w-6 place-items-center rounded-full border text-[9px] font-semibold',
                      i < 3 ? 'border-accent bg-accent text-white' : 'border-line-soft bg-elevated text-faint',
                      i === 2 && 'ring-4 ring-accent/20',
                    )}
                  >
                    {i < 2 ? '✓' : i + 1}
                  </span>
                  <span className="text-[8.5px] text-muted">{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <span className={cn('mx-1 -mt-3 h-[2px] flex-1 rounded', i < 2 ? 'bg-accent' : 'bg-faint/25')} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-line-soft">
            <div className="grid grid-cols-[1fr_1fr_1fr_70px] bg-elevated/60 px-3 py-1.5 text-[8.5px] uppercase tracking-wider text-faint">
              <span>Request</span>
              <span>Organization</span>
              <span>Owner</span>
              <span>Status</span>
            </div>
            {rows.map((r) => (
              <div key={r.id} className="grid grid-cols-[1fr_1fr_1fr_70px] items-center border-t border-line-soft px-3 py-2 text-[9.5px]">
                <span className="font-mono text-ink">{r.id}</span>
                <span className="text-muted">{r.org}</span>
                <Bar w="60%" />
                <span className={`w-fit rounded-full bg-${r.c}/15 px-2 py-0.5 text-[8px] font-medium text-${r.c}`}>{r.s}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 rounded-lg border border-line-soft p-2.5">
              <p className="text-[8px] uppercase tracking-wider text-faint">Audit trail</p>
              <div className="mt-1.5 space-y-1">
                <Bar w="90%" />
                <Bar w="70%" />
              </div>
            </div>
            <div className="flex-1 rounded-lg border border-line-soft p-2.5">
              <p className="text-[8px] uppercase tracking-wider text-faint">Documents</p>
              <div className="mt-1.5 flex gap-1.5">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-5 w-4 rounded-[3px] border border-line-soft bg-elevated" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Monitoring() {
  const pts = [38, 42, 35, 50, 46, 58, 52, 66, 60, 72, 64, 70, 62, 78, 70, 82];
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i / (pts.length - 1)) * 300} ${100 - p}`).join(' ');
  const gid = `g${useId().replace(/:/g, '')}`;
  const logs = [
    ['INFO', 'sshd: session opened', 'text-cyan'],
    ['WARN', 'disk /var at 81%', 'text-warning'],
    ['INFO', 'nginx: reload ok', 'text-cyan'],
    ['ERR', 'eth1 packet drop', 'text-danger'],
  ];
  return (
    <Chrome url="monitor.local/servers/srv-01" accent="success">
      <div className="flex h-full">
        <Sidebar brand="InfraMon" items={['Overview', 'Servers', 'Network', 'Logs', 'Timeline', 'Alerts']} active={1} />
        <div className="grid flex-1 grid-cols-3 grid-rows-[auto_1fr_auto] gap-2.5 p-4">
          {[
            ['CPU', '62%', 'accent', 62],
            ['RAM', '48%', 'cyan', 48],
            ['Disk', '81%', 'warning', 81],
          ].map(([l, v, c, n]) => (
            <div key={l as string} className="rounded-lg border border-line-soft p-2.5">
              <div className="flex items-center justify-between text-[8.5px] uppercase tracking-wider text-faint">
                {l}
                <span className={`h-1.5 w-1.5 rounded-full bg-${c}`} />
              </div>
              <p className="mt-1 font-display text-[17px] font-semibold text-ink">{v}</p>
              <div className="mt-1.5 h-[5px] overflow-hidden rounded-full bg-faint/20">
                <div className={`h-full rounded-full bg-${c}`} style={{ width: `${n}%` }} />
              </div>
            </div>
          ))}
          <div className="col-span-2 rounded-lg border border-line-soft p-2.5">
            <div className="flex items-center justify-between text-[8.5px] uppercase tracking-wider text-faint">
              <span>CPU load · 24h</span>
              <span className="text-success">● live</span>
            </div>
            <svg viewBox="0 0 300 100" className="mt-1 h-[110px] w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="rgb(var(--c-accent))" stopOpacity="0.45" />
                  <stop offset="1" stopColor="rgb(var(--c-accent))" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[25, 50, 75].map((y) => (
                <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgb(var(--c-line))" strokeOpacity="0.12" />
              ))}
              <path d={`${path} L300 100 L0 100 Z`} fill={`url(#${gid})`} />
              <path d={path} fill="none" stroke="rgb(var(--c-accent))" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="rounded-lg border border-line-soft p-2.5">
            <p className="text-[8.5px] uppercase tracking-wider text-faint">Network I/O</p>
            <div className="mt-2 flex h-[100px] items-end gap-1">
              {[30, 55, 40, 70, 45, 85, 60, 50, 75].map((h, i) => (
                <span key={i} className={cn('flex-1 rounded-t-sm', i % 2 ? 'bg-cyan/70' : 'bg-violet/60')} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="col-span-3 rounded-lg border border-line-soft bg-bg/50 p-2.5 font-mono text-[8.5px]">
            {logs.map(([lvl, msg, c], i) => (
              <div key={i} className="flex gap-3 py-[1px]">
                <span className="text-faint">12:0{i}:4{i}</span>
                <span className={cn('w-8', c)}>{lvl}</span>
                <span className="text-muted">{msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Hosting() {
  const services = [
    ['Portal', 'success'],
    ['Mail', 'success'],
    ['Intranet', 'success'],
    ['Docs', 'warning'],
    ['API Gateway', 'success'],
    ['Backups', 'cyan'],
  ];
  return (
    <Chrome url="hosting.local/services" accent="violet">
      <div className="flex h-full">
        <Sidebar brand="Hosting Hub" items={['Services', 'Servers', 'Websites', 'Containers', 'Access', 'Resources']} />
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <p className="font-display text-[14px] font-semibold text-ink">Hosted services</p>
            <span className="rounded-md bg-accent px-2.5 py-1 text-[9px] font-medium text-white">+ New service</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {services.map(([n, c]) => (
              <div key={n} className="rounded-lg border border-line-soft bg-elevated/40 p-2.5">
                <div className="flex items-center justify-between">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-bg/70">
                    <span className="h-2.5 w-2.5 rounded-[3px] border border-cyan/60" />
                  </span>
                  <span className={`h-1.5 w-1.5 rounded-full bg-${c}`} />
                </div>
                <p className="mt-2 text-[10px] font-medium text-ink">{n}</p>
                <p className="font-mono text-[8px] text-faint">docker · srv-0{(n.length % 3) + 1}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-2.5">
            <div className="rounded-lg border border-line-soft p-2.5">
              <p className="text-[8.5px] uppercase tracking-wider text-faint">Resource allocation</p>
              {[
                ['CPU', 64, 'accent'],
                ['Memory', 52, 'cyan'],
                ['Storage', 38, 'violet'],
              ].map(([l, v, c]) => (
                <div key={l as string} className="mt-2">
                  <div className="flex justify-between text-[8.5px] text-muted">
                    <span>{l}</span>
                    <span>{v}%</span>
                  </div>
                  <div className="mt-1 h-[5px] rounded-full bg-faint/20">
                    <div className={`h-full rounded-full bg-${c}`} style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-line-soft p-2.5">
              <p className="text-[8.5px] uppercase tracking-wider text-faint">Access</p>
              {['Admin', 'Operator', 'Viewer'].map((r, i) => (
                <div key={r} className="mt-2 flex items-center gap-2">
                  <span className={cn('h-4 w-4 rounded-full', ['bg-accent/60', 'bg-cyan/60', 'bg-violet/60'][i])} />
                  <span className="text-[9px] text-muted">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function School() {
  return (
    <Chrome url="rgms.school/students">
      <div className="flex h-full">
        <Sidebar brand="RGMS" items={['Dashboard', 'Students', 'Teachers', 'Classes', 'Fees', 'Users']} active={1} />
        <div className="flex-1 p-4">
          <div className="grid grid-cols-4 gap-2.5">
            {['Students', 'Teachers', 'Classes', 'Fees'].map((l, i) => (
              <div key={l} className="rounded-lg border border-line-soft p-2.5">
                <span className={cn('block h-5 w-5 rounded-md', ['bg-accent/25', 'bg-cyan/25', 'bg-violet/25', 'bg-success/25'][i])} />
                <p className="mt-2 text-[9px] text-faint">{l}</p>
                <Bar w="55%" className="mt-1 h-[7px] bg-faint/35" />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-[1.5fr_1fr] gap-2.5">
            <div className="overflow-hidden rounded-lg border border-line-soft">
              <div className="grid grid-cols-[22px_1fr_50px_50px] gap-2 bg-elevated/60 px-3 py-1.5 text-[8px] uppercase tracking-wider text-faint">
                <span />
                <span>Name</span>
                <span>Class</span>
                <span>Fee</span>
              </div>
              {[0, 1, 2, 3, 4].map((r) => (
                <div key={r} className="grid grid-cols-[22px_1fr_50px_50px] items-center gap-2 border-t border-line-soft px-3 py-[7px]">
                  <span className={cn('h-4 w-4 rounded-full', r % 2 ? 'bg-cyan/40' : 'bg-violet/40')} />
                  <Bar w={`${70 - r * 8}%`} />
                  <span className="text-[9px] text-muted">{['10-A', '9-B', '11-A', '8-C', '12-B'][r]}</span>
                  <span className={cn('w-fit rounded-full px-1.5 py-0.5 text-[7.5px]', r === 2 ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success')}>
                    {r === 2 ? 'Due' : 'Paid'}
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-line-soft p-2.5">
              <p className="text-[8.5px] uppercase tracking-wider text-faint">Fee collection</p>
              <div className="mt-3 flex h-[120px] items-end gap-1.5">
                {[40, 65, 50, 80, 70, 90].map((h, i) => (
                  <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-accent/40 to-cyan/80" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Agriculture() {
  const pins = [
    [80, 70, 'success'],
    [190, 120, 'accent'],
    [140, 190, 'success'],
    [260, 60, 'warning'],
    [300, 170, 'success'],
  ] as const;
  return (
    <Chrome url="agri.local/farms" accent="success">
      <div className="flex h-full">
        <Sidebar brand="AgriManage" items={['Farms', 'Locations', 'Legal Status', 'Livestock', 'Records', 'Reports']} />
        <div className="grid flex-1 grid-cols-[1.45fr_1fr] gap-2.5 p-4">
          <div className="relative overflow-hidden rounded-lg border border-line-soft bg-success/[0.04]">
            <svg viewBox="0 0 360 260" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <path
                  key={i}
                  d={`M0 ${40 + i * 40} C 90 ${10 + i * 40}, 180 ${80 + i * 40}, 360 ${30 + i * 40}`}
                  fill="none"
                  stroke="rgb(var(--c-success))"
                  strokeOpacity="0.18"
                />
              ))}
              <path d="M60 50 L150 40 L170 110 L90 130 Z" fill="rgb(var(--c-success))" fillOpacity="0.12" stroke="rgb(var(--c-success))" strokeOpacity="0.5" strokeDasharray="4 3" />
              <path d="M220 120 L330 110 L340 210 L240 220 Z" fill="rgb(var(--c-accent))" fillOpacity="0.1" stroke="rgb(var(--c-accent))" strokeOpacity="0.5" strokeDasharray="4 3" />
              {pins.map(([x, y, c], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="10" fill={`rgb(var(--c-${c}))`} fillOpacity="0.18" />
                  <circle cx={x} cy={y} r="4" fill={`rgb(var(--c-${c}))`} />
                </g>
              ))}
            </svg>
            <span className="glass absolute left-2.5 top-2.5 rounded-md px-2 py-1 text-[8.5px] text-muted">Farm locations</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="rounded-lg border border-line-soft p-2.5">
              <p className="text-[8.5px] uppercase tracking-wider text-faint">Legal status</p>
              {[
                ['Registered', 'success'],
                ['Pending', 'warning'],
                ['Under review', 'cyan'],
              ].map(([l, c]) => (
                <div key={l} className="mt-2 flex items-center justify-between">
                  <span className="text-[9px] text-muted">{l}</span>
                  <span className={`h-1.5 w-8 rounded-full bg-${c}/70`} />
                </div>
              ))}
            </div>
            <div className="flex-1 rounded-lg border border-line-soft p-2.5">
              <p className="text-[8.5px] uppercase tracking-wider text-faint">Livestock</p>
              {['Cattle', 'Sheep', 'Goats', 'Poultry'].map((l, i) => (
                <div key={l} className="mt-2">
                  <div className="text-[9px] text-muted">{l}</div>
                  <div className="mt-1 h-[5px] rounded-full bg-faint/20">
                    <div className="h-full rounded-full bg-success/70" style={{ width: `${80 - i * 15}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Finance() {
  const pts = [20, 28, 26, 40, 36, 52, 48, 60, 58, 70];
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i / (pts.length - 1)) * 300} ${100 - p}`).join(' ');
  const gid = `g${useId().replace(/:/g, '')}`;
  return (
    <Chrome url="finance.local/ledger" accent="cyan">
      <div className="flex h-full">
        <Sidebar brand="FinanceMS" items={['Overview', 'Projects', 'Expenses', 'Income', 'Payroll', 'Reports']} />
        <div className="flex-1 p-4">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              ['Income', 'success'],
              ['Expenses', 'danger'],
              ['Balance', 'accent'],
            ].map(([l, c]) => (
              <div key={l} className="rounded-lg border border-line-soft p-2.5">
                <p className="text-[8.5px] uppercase tracking-wider text-faint">{l}</p>
                <Bar w="65%" className={`mt-2 h-[9px] bg-${c}/40`} />
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-line-soft p-2.5">
            <p className="text-[8.5px] uppercase tracking-wider text-faint">Cash flow by project</p>
            <svg viewBox="0 0 300 100" className="mt-1 h-[96px] w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="rgb(var(--c-cyan))" stopOpacity="0.4" />
                  <stop offset="1" stopColor="rgb(var(--c-cyan))" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${line} L300 100 L0 100 Z`} fill={`url(#${gid})`} />
              <path d={line} fill="none" stroke="rgb(var(--c-cyan))" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="mt-3 overflow-hidden rounded-lg border border-line-soft">
            {['Materials', 'Labour', 'Equipment'].map((r, i) => (
              <div key={r} className={cn('grid grid-cols-[1fr_1fr_60px] items-center px-3 py-2 text-[9.5px]', i > 0 && 'border-t border-line-soft')}>
                <span className="text-ink">{r}</span>
                <Bar w={`${60 - i * 12}%`} />
                <span className={cn('w-fit rounded-full px-2 py-0.5 text-[8px]', i === 1 ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success')}>
                  {i === 1 ? 'Pending' : 'Posted'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Generic() {
  return (
    <Chrome url="app.local">
      <div className="flex h-full">
        <Sidebar brand="App" items={['Dashboard', 'Records', 'Reports', 'Settings']} />
        <div className="flex-1 space-y-3 p-4">
          <Bar w="40%" className="h-[10px]" />
          <div className="grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 rounded-lg border border-line-soft" />
            ))}
          </div>
          <div className="h-40 rounded-lg border border-line-soft" />
        </div>
      </div>
    </Chrome>
  );
}

const variants: Record<MockupVariant, () => JSX.Element> = {
  workflow: Workflow,
  monitoring: Monitoring,
  hosting: Hosting,
  school: School,
  agriculture: Agriculture,
  finance: Finance,
  generic: Generic,
};

export function ProjectMockup({ variant }: { variant: MockupVariant }) {
  const V = variants[variant] ?? Generic;
  return (
    <Scaled>
      <V />
    </Scaled>
  );
}
