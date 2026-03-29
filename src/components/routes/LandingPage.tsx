import { Button } from "@/components/ui/button";
import {
  Link2,
  BarChart3,
  Key,
  ArrowRight,
  MousePointerClick,
  Share2,
  TrendingUp,
  Globe,
  Shield,
  Terminal,

  Layers,
  Code2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────── Constants & Tokens ─────────────────────────── */
const THEME = {
  bg: "bg-[#060e20]",
  glassLow: "bg-[#091328]/70 backdrop-blur-xl border border-white/[0.03]",
  glassCard: "bg-[#0f1930]/80 backdrop-blur-xl border-t border-l border-white/[0.05]",
  textPrimary: "text-[#dee5ff]",
  textSecondary: "text-[#a3aac4]",
  accentGlow: "shadow-[0_0_40px_rgba(0,236,154,0.15)]",
  gradientText: "bg-clip-text text-transparent bg-gradient-to-br from-[#1dfba5] to-[#00ec9a]",
};

/* ─────────────────────────── Navbar ─────────────────────────── */

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${THEME.glassLow}`}>
      <div className="max-w-[1240px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#1dfba5] to-[#00ec9a] flex items-center justify-center shadow-[0_0_20px_rgba(0,236,154,0.3)] group-hover:shadow-[0_0_30px_rgba(0,236,154,0.5)] transition-shadow duration-300">
            <Link2 className="h-5 w-5 text-[#00452a]" />
          </div>
          <span className={`text-[17px] font-bold tracking-tight ${THEME.textPrimary}`}>
            LinkTrace
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className={`text-[14px] font-medium ${THEME.textSecondary} hover:text-white transition-colors`}>
            Features
          </a>
          <a href="#how-it-works" className={`text-[14px] font-medium ${THEME.textSecondary} hover:text-white transition-colors`}>
            How it Works
          </a>
          <a href="#developers" className={`text-[14px] font-medium ${THEME.textSecondary} hover:text-white transition-colors`}>
            Developers
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className={`${THEME.textSecondary} hover:text-white hover:bg-white/[0.05] font-medium text-[14px] px-4`}
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
          <Button
            className="bg-gradient-to-r from-[#1dfba5] to-[#00ec9a] hover:from-[#9effc8] hover:to-[#1dfba5] text-[#00452a] font-bold text-[14px] px-6 h-10 rounded-xl shadow-[0_0_20px_rgba(0,236,154,0.2)] hover:shadow-[0_0_30px_rgba(0,236,154,0.4)] transition-all duration-300 border-none"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-[180px] pb-32 overflow-hidden">
      {/* Bioluminescent Deep Sea Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#1dfba5]/[0.08] via-[#8B5CF6]/[0.05] to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-[#3B82F6]/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] -right-[10%] w-[600px] h-[600px] bg-[#8B5CF6]/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[840px] mx-auto px-6 text-center">
        {/* Pulsing Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1dfba5]/20 bg-[#00ec9a]/5 backdrop-blur-md text-[#1dfba5] text-xs font-bold tracking-widest uppercase mb-10 shadow-[0_0_20px_rgba(0,236,154,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1dfba5] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1dfba5]"></span>
          </span>
          Now in Public Beta
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.05] mb-8 text-white">
          The modern platform for
          <br />
          <span className={THEME.gradientText}>short links & analytics</span>
        </h1>

        <p className={`text-lg sm:text-[19px] ${THEME.textSecondary} max-w-[600px] mx-auto mb-12 leading-relaxed font-medium`}>
          Shorten URLs, set custom aliases, and track every click with real-time
          analytics. Engineered for precision and built for developers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            className="bg-gradient-to-r from-[#1dfba5] to-[#00ec9a] hover:from-[#9effc8] hover:to-[#1dfba5] text-[#00452a] font-bold px-8 h-12 text-[15px] rounded-xl shadow-[0_0_30px_rgba(0,236,154,0.25)] hover:shadow-[0_0_45px_rgba(0,236,154,0.4)] transition-all duration-300 border-none scale-100 hover:scale-105"
            onClick={() => navigate("/signup")}
          >
            Start for Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5 bg-white/[0.02] backdrop-blur-md font-semibold px-8 h-12 text-[15px] rounded-xl transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            <Terminal className="mr-2 h-4 w-4 text-[#8B5CF6]" />
            View API Docs
          </Button>
        </div>

        {/* Metric bar */}
        <div className="mt-24 grid grid-cols-3 divide-x divide-white/[0.08] border-y border-white/[0.05] py-8 bg-[#0f1930]/30 backdrop-blur-md max-w-[800px] mx-auto rounded-3xl">
          {[
            { value: "< 50ms", label: "Link creation", color: "text-[#1dfba5]" },
            { value: "Real-time", label: "Click tracking", color: "text-[#8B5CF6]" },
            { value: "RESTful", label: "API architecture", color: "text-[#3B82F6]" },
          ].map((item, i) => (
            <div key={i} className="px-4 py-2 text-center group cursor-default">
              <p className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                {item.value}
              </p>
              <p className={`text-xs ${THEME.textSecondary} uppercase tracking-[0.2em] font-semibold`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Features ─────────────────────────── */

function FeaturesSection() {
  const features = [
    {
      icon: Link2,
      title: "Smart Shortening",
      description: "Generate clean short links instantly with optional custom aliases for branded URLs.",
      glow: "group-hover:shadow-[0_0_30px_rgba(29,251,165,0.15)]",
      iconColor: "text-[#1dfba5]",
      iconBg: "bg-[#1dfba5]/10",
    },
    {
      icon: BarChart3,
      title: "Deep Analytics",
      description: "Hourly click breakdowns, global trends, and device insights in a high-fidelity dashboard.",
      glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
      iconColor: "text-[#8B5CF6]",
      iconBg: "bg-[#8B5CF6]/10",
    },
    {
      icon: Key,
      title: "API-First Protocol",
      description: "Full REST API with sub-millisecond key authentication and comprehensive rate limiting.",
      glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      iconColor: "text-[#3B82F6]",
      iconBg: "bg-[#3B82F6]/10",
    },
    {
      icon: Globe,
      title: "Custom Aliases",
      description: "Use branded aliases like \"myBrand\" instead of random codes for memorable links.",
      glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
      iconColor: "text-pink-400",
      iconBg: "bg-pink-400/10",
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "End-to-end authenticated sessions, protected routes, and secure verifiable redirects.",
      glow: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]",
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-400/10",
    },
    {
      icon: Layers,
      title: "Command Center",
      description: "KPI cards, layered charts, and data tables—a bioluminescent terminal for your links.",
      glow: "group-hover:shadow-[0_0_30px_rgba(29,251,165,0.15)]",
      iconColor: "text-[#1dfba5]",
      iconBg: "bg-[#1dfba5]/10",
    },
  ];

  return (
    <section id="features" className="relative py-32 z-10">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Header */}
        <div className="max-w-xl mb-20 text-center mx-auto">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8B5CF6] mb-4">
            Atmospheric Precision
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Everything you need to orchestrate links
          </h2>
          <p className={`text-base ${THEME.textSecondary} leading-relaxed`}>
            A focused toolkit designed with intentional layers, avoiding rigid grids for a fluid, high-performance experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className={`group relative ${THEME.glassCard} p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 ${f.glow}`}
            >
              {/* Subtle inner radial leak */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-[40px] group-hover:bg-white/[0.04] transition-colors" />
              
              <div className={`w-14 h-14 rounded-2xl ${f.iconBg} flex items-center justify-center mb-6 relative z-10 border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                <f.icon className={`h-6 w-6 ${f.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                {f.title}
              </h3>
              <p className={`text-[15px] ${THEME.textSecondary} leading-relaxed relative z-10 font-medium`}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── How It Works ─────────────────────────── */

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: MousePointerClick,
      title: "Initialize",
      description: "Paste a deep URL, define an optional alias, and generate a trackable node instantly.",
      color: "from-[#1dfba5] to-[#00ec9a]",
      textColor: "text-[#1dfba5]",
      glow: "shadow-[0_0_30px_rgba(29,251,165,0.3)]",
    },
    {
      num: "02",
      icon: Share2,
      title: "Distribute",
      description: "Inject your short link across global networks, secure emails, or REST integrations.",
      color: "from-[#3B82F6] to-blue-400",
      textColor: "text-blue-400",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    },
    {
      num: "03",
      icon: TrendingUp,
      title: "Observe",
      description: "Monitor the telemetry. Real-time geographical, device, and temporal analytics.",
      color: "from-[#8B5CF6] to-purple-400",
      textColor: "text-[#8B5CF6]",
      glow: "shadow-[0_0_30px_rgba(139,92,246,0.3)]",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-32 bg-[#000000]/20">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3B82F6] mb-4">
            Workflow Telemetry
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Operational in seconds
          </h2>
          <p className={`text-base ${THEME.textSecondary} leading-relaxed`}>
            Bypass complex setups. Authenticate, execute, and monitor with zero friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-[44px] left-[15%] w-[70%] h-px bg-gradient-to-r from-[#1dfba5]/20 via-[#3B82F6]/20 to-[#8B5CF6]/20" />

          {steps.map((s) => (
            <div key={s.num} className="relative flex flex-col items-center text-center group">
              {/* Icon Container */}
              <div className="relative mb-8 mt-2">
                <div className={`w-20 h-20 rounded-3xl ${THEME.glassCard} flex items-center justify-center relative z-10 group-hover:-translate-y-2 transition-transform duration-500`}>
                  <s.icon className={`h-8 w-8 ${s.textColor}`} />
                </div>
                {/* Glow behind icon */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br ${s.color} rounded-full blur-[20px] opacity-20 group-hover:opacity-60 transition-opacity duration-500 z-0 ${s.glow}`} />
                
                {/* Number Badge */}
                <span className={`absolute -bottom-3 -right-3 text-[11px] font-black bg-white text-[#060e20] px-3 py-1 rounded-xl z-20 shadow-lg border border-white/20`}>
                  {s.num}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
              <p className={`text-[15px] ${THEME.textSecondary} leading-relaxed max-w-[280px] font-medium`}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Developers / API ─────────────────────────── */

function DeveloperSection() {
  const navigate = useNavigate();

  return (
    <section id="developers" className="relative py-32 overflow-hidden">
      {/* Background glow for terminal */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[600px] bg-[#1dfba5]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Text */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1dfba5] mb-4">
              System Architecture
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              A bespoke API for the modern stack
            </h2>
            <p className={`text-base ${THEME.textSecondary} leading-relaxed mb-8`}>
              Programmatically orchestrate routing. Our REST architecture uses sub-millisecond edge computing to authenticate requests and generate aliases without introducing latency.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                { text: "Bearer-token cryptographic auth", icon: Key, color: "text-[#1dfba5]" },
                { text: "Unified JSON schema", icon: Code2, color: "text-[#3B82F6]" },
                { text: "Edge-based 300 req/hr limits", icon: Shield, color: "text-[#8B5CF6]" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-4 text-[15px] text-[#dee5ff] font-medium">
                  <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>

            <Button
              className="bg-white hover:bg-zinc-200 text-[#060e20] font-bold text-[15px] h-12 px-8 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              onClick={() => navigate("/signup")}
            >
              Consult Documentation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right — Code block */}
          <div className="relative group perspective-1000">
            {/* Glow behind terminal */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#1dfba5] to-[#3B82F6] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative rounded-2xl border border-white/10 bg-[#000000]/80 backdrop-blur-3xl overflow-hidden shadow-2xl transform transition-transform duration-700 hover:rotate-y-2 hover:-rotate-x-2">
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>
                <div className="flex items-center gap-2 text-[#a3aac4] text-xs font-mono font-medium">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>bash — node</span>
                </div>
              </div>

              <div className="p-6 font-mono text-[14px] leading-relaxed text-[#a3aac4] overflow-x-auto whitespace-pre">
                <div>
                  <span className="text-white/40">$</span> <span className="text-[#1dfba5]">curl</span> <span className="text-[#a3aac4]">-X POST</span> <span className="text-[#3B82F6]">https://linktracebackend-production.up.railway.app/api/v1/links/addLinks</span> <span className="text-white/40">\</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#a3aac4]">-H</span> <span className="text-amber-300">"Authorization: Bearer sk_live_f89A..."</span> <span className="text-white/40">\</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#a3aac4]">-H</span> <span className="text-amber-300">"Content-Type: application/json"</span> <span className="text-white/40">\</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#a3aac4]">-d</span> <span className="text-amber-300">{"'{"}</span>
                </div>
                <div className="pl-8">
                  <span className="text-[#3B82F6]">"url"</span><span className="text-white/50">:</span> <span className="text-emerald-300">"https://example.com/deep/path"</span><span className="text-white/50">,</span>
                </div>
                <div className="pl-8">
                  <span className="text-[#3B82F6]">"customAlias"</span><span className="text-white/50">:</span> <span className="text-emerald-300">"launch"</span>
                </div>
                <div className="pl-4">
                  <span className="text-amber-300">{"}'"}</span>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10">
                  <span className="text-white/30">{"// Context: 201 Created"}</span>
                </div>
                <div>
                  <span className="text-white/50">{"{"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#3B82F6]">"id"</span><span className="text-white/50">:</span> <span className="text-emerald-300">"link_9aJ2k"</span><span className="text-white/50">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#3B82F6]">"shortUrl"</span><span className="text-white/50">:</span> <span className="text-emerald-300">"https://lt.io/launch"</span>
                </div>
                <div>
                  <span className="text-white/50">{"}"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA + Footer ─────────────────────────── */

function FooterCTA() {
  const navigate = useNavigate();

  return (
    <footer className="relative pt-32 pb-8 border-t border-white/5 bg-[#000000]/40 overflow-hidden">
      {/* Absolute Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#8B5CF6]/[0.08] to-transparent blur-[100px] pointer-events-none" />

      {/* CTA */}
      <div className="relative z-10 max-w-[600px] mx-auto px-6 text-center mb-32">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Initialize your first trace.
        </h2>
        <p className={`text-lg ${THEME.textSecondary} leading-relaxed mb-10 max-w-md mx-auto font-medium`}>
          Deploy short links in milliseconds. No credit card required. Experience the bioluminescent terminal.
        </p>

        <Button
          className="bg-gradient-to-r from-[#1dfba5] to-[#00ec9a] hover:from-[#9effc8] hover:to-[#1dfba5] text-[#00452a] font-bold px-10 h-14 text-[16px] rounded-2xl shadow-[0_0_40px_rgba(0,236,154,0.3)] hover:shadow-[0_0_60px_rgba(0,236,154,0.5)] transition-all duration-300 border-none scale-100 hover:scale-105"
          onClick={() => navigate("/signup")}
        >
          Create Free Account
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Bottom Footer Details */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-md">
              <Link2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-[15px] font-bold text-white tracking-wide">LinkTrace</span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className={`text-[13px] font-medium ${THEME.textSecondary} hover:text-white transition-colors`}>Privacy</a>
            <a href="#" className={`text-[13px] font-medium ${THEME.textSecondary} hover:text-white transition-colors`}>Terms of Service</a>
            <a href="#" className={`text-[13px] font-medium ${THEME.textSecondary} hover:text-white transition-colors`}>API Status</a>
          </div>

          <p className={`text-[13px] font-medium ${THEME.textSecondary}`}>
            © {new Date().getFullYear()} LinkTrace Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function HomePage() {
  return (
    <div className={`${THEME.bg} min-h-screen text-white overflow-x-hidden selection:bg-[#1dfba5]/30 selection:text-white`}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DeveloperSection />
      <FooterCTA />
    </div>
  );
}
