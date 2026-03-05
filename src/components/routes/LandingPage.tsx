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
  ChevronRight,
  Activity,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────── Navbar ─────────────────────────── */

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#09090b]/90 backdrop-blur-2xl">
      <div className="max-w-[1140px] mx-auto px-6 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-md bg-white flex items-center justify-center">
            <Link2 className="h-3.5 w-3.5 text-[#09090b]" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            LinkTrace
          </span>
        </div>

        <div className="hidden md:flex items-center gap-7">
          <a href="#features" className="text-[13px] text-zinc-400 hover:text-zinc-200 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-[13px] text-zinc-400 hover:text-zinc-200 transition-colors">
            How it Works
          </a>
          <a href="#developers" className="text-[13px] text-zinc-400 hover:text-zinc-200 transition-colors">
            Developers
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-white hover:bg-white/[0.06] text-[13px] h-8 px-3"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-white text-[#09090b] hover:bg-zinc-200 text-[13px] font-medium h-8 px-4"
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
    <section className="relative pt-[140px] pb-24 sm:pb-32 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-blue-500/[0.07] via-violet-500/[0.04] to-transparent blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[760px] mx-auto px-6 text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 text-xs font-medium tracking-wide mb-8">
          <Activity className="h-3 w-3 text-emerald-400" />
          Now in Public Beta
          <ChevronRight className="h-3 w-3 text-zinc-600" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-[-0.02em] text-white leading-[1.1] mb-5">
          The modern platform for
          <br />
          <span className="text-zinc-400">short links & analytics</span>
        </h1>

        <p className="text-base sm:text-[17px] text-zinc-500 max-w-[520px] mx-auto mb-10 leading-relaxed">
          Shorten URLs, set custom aliases, and track every click with real-time
          analytics. Built for developers who need a clean API.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            className="bg-white text-[#09090b] hover:bg-zinc-200 font-medium px-6 h-10 text-sm"
            onClick={() => navigate("/signup")}
          >
            Start for Free
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-white/[0.04] bg-transparent font-medium px-6 h-10 text-sm"
            onClick={() => navigate("/login")}
          >
            <Terminal className="mr-1.5 h-3.5 w-3.5" />
            View API Docs
          </Button>
        </div>

        {/* Metric bar */}
        <div className="mt-16 flex items-center justify-center divide-x divide-zinc-800">
          {[
            { value: "< 50ms", label: "Link creation" },
            { value: "Real-time", label: "Click tracking" },
            { value: "REST", label: "API access" },
          ].map((item, i) => (
            <div key={i} className="px-8 py-1 text-center">
              <p className="text-sm font-semibold text-white tracking-tight">{item.value}</p>
              <p className="text-[11px] text-zinc-600 mt-0.5 uppercase tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800/60 to-transparent" />
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
    },
    {
      icon: BarChart3,
      title: "Click Analytics",
      description: "Hourly click breakdowns, weekly trends, and per-link insights in a clean dashboard.",
    },
    {
      icon: Key,
      title: "API-First Design",
      description: "Full REST API with key authentication, rate limiting, and comprehensive documentation.",
    },
    {
      icon: Globe,
      title: "Custom Aliases",
      description: "Use branded aliases like \"myBrand\" instead of random codes for recognizable links.",
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Authenticated sessions, protected routes, and secure redirects out of the box.",
    },
    {
      icon: Layers,
      title: "Usage Dashboard",
      description: "KPI cards, charts, and data tables — everything you need to monitor link performance.",
    },
  ];

  return (
    <section id="features" className="relative py-24 sm:py-28">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Header */}
        <div className="max-w-lg mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
            Features
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Everything you need to manage links
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            A focused toolkit for URL shortening, click tracking, and seamless
            API integrations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800/50 rounded-2xl border border-zinc-800/60 overflow-hidden">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#09090b] p-7 hover:bg-zinc-900/60 transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-lg bg-zinc-800/80 flex items-center justify-center mb-4">
                <f.icon className="h-4 w-4 text-zinc-300" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                {f.title}
              </h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800/60 to-transparent" />
    </section>
  );
}

/* ─────────────────────────── How It Works ─────────────────────────── */

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: MousePointerClick,
      title: "Create",
      description: "Paste a URL, optionally set a custom alias, and generate your short link in one click.",
    },
    {
      num: "02",
      icon: Share2,
      title: "Share",
      description: "Distribute your link across social media, emails, or integrate via the REST API.",
    },
    {
      num: "03",
      icon: TrendingUp,
      title: "Track",
      description: "Monitor real-time click data with hourly breakdowns, trends, and per-link analytics.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-28">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">
            How It Works
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Up and running in 30 seconds
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            No complicated setup. Create an account, paste a URL, and start tracking.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative flex flex-col items-center text-center">
              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[58%] w-[84%] border-t border-dashed border-zinc-800" />
              )}

              {/* Icon box */}
              <div className="relative mb-5">
                <div className="w-14 h-14 rounded-xl border border-zinc-800 bg-zinc-900/80 flex items-center justify-center">
                  <s.icon className="h-6 w-6 text-zinc-300" />
                </div>
                <span className="absolute -top-1.5 -right-1.5 text-[10px] font-bold bg-white text-[#09090b] w-5 h-5 rounded-full flex items-center justify-center">
                  {s.num}
                </span>
              </div>

              <h3 className="text-base font-semibold text-white mb-1.5">{s.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed max-w-[260px]">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800/60 to-transparent" />
    </section>
  );
}

/* ─────────────────────────── Developers / API ─────────────────────────── */

function DeveloperSection() {
  const navigate = useNavigate();

  return (
    <section id="developers" className="relative py-24 sm:py-28">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
              For Developers
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              A clean API you'll enjoy using
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
              Create links, fetch analytics, and manage everything programmatically.
              Authenticated with API keys, rate-limited for fair use, and documented
              with curl examples for every endpoint.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Bearer-token API key authentication",
                "JSON request & response format",
                "300 requests/hour rate limit",
                "Comprehensive error codes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Button
              variant="outline"
              className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-white/[0.04] bg-transparent text-sm h-9 px-5"
              onClick={() => navigate("/signup")}
            >
              Read the Docs
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Right — Code block */}
          <div className="rounded-xl border border-zinc-800/80 bg-[#0c0c0f] overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800/60">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="ml-3 text-[11px] text-zinc-600 font-mono">terminal</span>
            </div>

            <div className="p-5 font-mono text-[13px] leading-[1.8] text-zinc-400 overflow-x-auto">
              <div>
                <span className="text-zinc-600">$</span>{" "}
                <span className="text-emerald-400/80">curl</span>{" "}
                <span className="text-zinc-500">-X POST</span>{" "}
                <span className="text-blue-400/80">/api/v1/links/addLinks</span>{" "}
                <span className="text-zinc-600">\</span>
              </div>
              <div className="pl-4">
                <span className="text-zinc-500">-H</span>{" "}
                <span className="text-amber-300/80">"Authorization: Bearer sk_live_..."</span>{" "}
                <span className="text-zinc-600">\</span>
              </div>
              <div className="pl-4">
                <span className="text-zinc-500">-H</span>{" "}
                <span className="text-amber-300/80">"Content-Type: application/json"</span>{" "}
                <span className="text-zinc-600">\</span>
              </div>
              <div className="pl-4">
                <span className="text-zinc-500">-d</span>{" "}
                <span className="text-amber-300/80">
                  {"'{"}
                </span>
              </div>
              <div className="pl-8">
                <span className="text-blue-300/80">"url"</span>
                <span className="text-zinc-600">:</span>{" "}
                <span className="text-emerald-300/80">"https://example.com/long-path"</span>
                <span className="text-zinc-600">,</span>
              </div>
              <div className="pl-8">
                <span className="text-blue-300/80">"name"</span>
                <span className="text-zinc-600">:</span>{" "}
                <span className="text-emerald-300/80">"My Link"</span>
                <span className="text-zinc-600">,</span>
              </div>
              <div className="pl-8">
                <span className="text-blue-300/80">"customAlias"</span>
                <span className="text-zinc-600">:</span>{" "}
                <span className="text-emerald-300/80">"brand"</span>
              </div>
              <div className="pl-4">
                <span className="text-amber-300/80">{"}'"}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/50">
                <span className="text-zinc-600">{"// "}</span>
                <span className="text-zinc-600">Response 201</span>
              </div>
              <div>
                <span className="text-zinc-600">{"{"}</span>
              </div>
              <div className="pl-4">
                <span className="text-blue-300/80">"shortUrl"</span>
                <span className="text-zinc-600">:</span>{" "}
                <span className="text-emerald-300/80">"https://lt.io/brand"</span>
                <span className="text-zinc-600">,</span>
              </div>
              <div className="pl-4">
                <span className="text-blue-300/80">"clicks"</span>
                <span className="text-zinc-600">:</span>{" "}
                <span className="text-violet-300/80">0</span>
              </div>
              <div>
                <span className="text-zinc-600">{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800/60 to-transparent" />
    </section>
  );
}

/* ─────────────────────────── CTA + Footer ─────────────────────────── */

function FooterCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 sm:py-28">
      {/* CTA */}
      <div className="max-w-[560px] mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed mb-8 max-w-md mx-auto">
          Create an account and start shortening links in less than a minute. No
          credit card required.
        </p>

        <Button
          className="bg-white text-[#09090b] hover:bg-zinc-200 font-medium px-8 h-10 text-sm"
          onClick={() => navigate("/signup")}
        >
          Create Free Account
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-20 max-w-[1140px] mx-auto px-6">
        <div className="border-t border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-white flex items-center justify-center">
              <Link2 className="h-2.5 w-2.5 text-[#09090b]" />
            </div>
            <span className="text-xs font-medium text-zinc-500">LinkTrace</span>
          </div>
          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} LinkTrace. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DeveloperSection />
      <FooterCTA />
    </div>
  );
}
