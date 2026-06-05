"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  CalendarCheck,
  Trophy,
  Settings,
  Bell,
  Search,
  Plus,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Circle,
  MoreHorizontal,
  ArrowUpRight,
  Inbox,
  BookOpen,
  LogOut,
  Filter,
  SlidersHorizontal,
  Sparkles,
  Map,
  User,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "Applied" | "Interview" | "Offer" | "Rejected" | "Pending";

interface Application {
  id: string;
  company: string;
  role: string;
  status: Status;
  date: string;
  location: string;
  logo: string;
  logoColor: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const applications: Application[] = [
  {
    id: "1",
    company: "Stripe",
    role: "Software Engineering Intern",
    status: "Interview",
    date: "Jun 3, 2025",
    location: "San Francisco, CA",
    logo: "S",
    logoColor: "#635BFF",
  },
  {
    id: "2",
    company: "Vercel",
    role: "Frontend Engineering Intern",
    status: "Applied",
    date: "Jun 1, 2025",
    location: "Remote",
    logo: "V",
    logoColor: "#171717",
  },
  {
    id: "3",
    company: "Linear",
    role: "Product Design Intern",
    status: "Offer",
    date: "May 28, 2025",
    location: "San Francisco, CA",
    logo: "L",
    logoColor: "#5E6AD2",
  },
  {
    id: "4",
    company: "Figma",
    role: "Software Engineering Intern",
    status: "Rejected",
    date: "May 25, 2025",
    location: "New York, NY",
    logo: "F",
    logoColor: "#FF7262",
  },
  {
    id: "5",
    company: "Notion",
    role: "Backend Engineering Intern",
    status: "Pending",
    date: "May 22, 2025",
    location: "Remote",
    logo: "N",
    logoColor: "#2F2F2F",
  },
  {
    id: "6",
    company: "Loom",
    role: "Growth Marketing Intern",
    status: "Interview",
    date: "May 20, 2025",
    location: "San Francisco, CA",
    logo: "L",
    logoColor: "#625DF5",
  },
  {
    id: "7",
    company: "Resend",
    role: "Developer Relations Intern",
    status: "Applied",
    date: "May 18, 2025",
    location: "Remote",
    logo: "R",
    logoColor: "#000000",
  },
];

// ─── Status config ─────────────────────────────────────────────────────────────

const statusConfig: Record<
  Status,
  { label: string; textColor: string; bgColor: string; borderColor: string; dot: string }
> = {
  Applied: {
    label: "Applied",
    textColor: "#60A5FA",
    bgColor: "rgba(59,130,246,0.08)",
    borderColor: "rgba(59,130,246,0.2)",
    dot: "#3B82F6",
  },
  Interview: {
    label: "Interview",
    textColor: "#FBBF24",
    bgColor: "rgba(251,191,36,0.08)",
    borderColor: "rgba(251,191,36,0.2)",
    dot: "#F59E0B",
  },
  Offer: {
    label: "Offer",
    textColor: "#34D399",
    bgColor: "rgba(52,211,153,0.08)",
    borderColor: "rgba(52,211,153,0.2)",
    dot: "#10B981",
  },
  Rejected: {
    label: "Rejected",
    textColor: "#F87171",
    bgColor: "rgba(248,113,113,0.08)",
    borderColor: "rgba(248,113,113,0.2)",
    dot: "#EF4444",
  },
  Pending: {
    label: "Pending",
    textColor: "#94A3B8",
    bgColor: "rgba(148,163,184,0.06)",
    borderColor: "rgba(148,163,184,0.15)",
    dot: "#64748B",
  },
};

// ─── Nav Item ─────────────────────────────────────────────────────────────────

function NavItem({
  icon,
  label,
  active = false,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "7px 10px",
        borderRadius: "7px",
        fontSize: "13px",
        fontWeight: active ? 500 : 400,
        border: "none",
        cursor: "pointer",
        transition: "all 0.12s ease",
        background: active ? "rgba(255,255,255,0.07)" : "transparent",
        color: active ? "#F1F5F9" : "#64748B",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
          (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "#64748B";
        }
      }}
    >
      <span style={{ flexShrink: 0, display: "flex" }}>{icon}</span>
      <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
      {badge !== undefined && (
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            background: "rgba(255,255,255,0.06)",
            color: "#64748B",
            padding: "1px 6px",
            borderRadius: "5px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  delta,
  icon,
  glowColor,
  accentColor,
}: {
  title: string;
  value: number;
  delta: string;
  icon: React.ReactNode;
  glowColor: string;
  accentColor: string;
}) {
  return (
    <div
      style={{
        background: "#0C0C0F",
        border: "1px solid rgba(255,255,255,0.055)",
        borderRadius: "12px",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.055)")
      }
    >
      {/* glow orb */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: glowColor,
          filter: "blur(40px)",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "9px",
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}28`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accentColor,
          }}
        >
          {icon}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#34D399",
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.18)",
            padding: "3px 8px",
            borderRadius: "20px",
          }}
        >
          <TrendingUp size={11} />
          {delta}
        </div>
      </div>
      <p style={{ fontSize: "12px", color: "#475569", fontWeight: 500, marginBottom: "4px", letterSpacing: "0.02em" }}>
        {title}
      </p>
      <p style={{ fontSize: "30px", fontWeight: 600, color: "#F1F5F9", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {value}
      </p>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "11.5px",
        fontWeight: 500,
        color: cfg.textColor,
        background: cfg.bgColor,
        border: `1px solid ${cfg.borderColor}`,
        padding: "3px 9px",
        borderRadius: "20px",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: cfg.dot,
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function InternshipTracker() {
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState("Dashboard");

  const filtered = applications.filter(
    (a) =>
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: applications.length,
    interviews: applications.filter((a) => a.status === "Interview").length,
    offers: applications.filter((a) => a.status === "Offer").length,
  };

  const navGroups = [
    {
      label: "MAIN",
      items: [
        { label: "Dashboard", icon: <LayoutDashboard size={15} />, badge: undefined },
        { label: "Applications", icon: <Briefcase size={15} />, badge: 7 },
        { label: "Interviews", icon: <CalendarCheck size={15} />, badge: 2 },
        { label: "Offers", icon: <Trophy size={15} />, badge: undefined },
      ],
    },
    {
      label: "RESOURCES",
      items: [
        { label: "Inbox", icon: <Inbox size={15} />, badge: 3 },
        { label: "Roadmap", icon: <Map size={15} />, badge: undefined },
        { label: "Resources", icon: <BookOpen size={15} />, badge: undefined },
      ],
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#030305",
        color: "#E2E8F0",
        fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside
        style={{
          width: "224px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          background: "#050507",
          overflow: "hidden",
        }}
      >
        {/* Logo mark */}
        <div style={{ padding: "20px 16px 12px", display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(99,102,241,0.35)",
              flexShrink: 0,
            }}
          >
            <Briefcase size={13} color="white" />
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#F1F5F9", letterSpacing: "-0.01em" }}>
              InternTrack
            </p>
          </div>
        </div>

        {/* AI pill */}
        <div style={{ padding: "0 12px 14px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.18)",
              borderRadius: "7px",
              padding: "6px 10px",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
          >
            <Sparkles size={12} color="#818CF8" />
            <span style={{ fontSize: "12px", color: "#818CF8", fontWeight: 500 }}>AI Job Match</span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: "10px",
                background: "rgba(99,102,241,0.2)",
                color: "#A5B4FC",
                padding: "1px 6px",
                borderRadius: "4px",
                fontWeight: 600,
              }}
            >
              NEW
            </span>
          </div>
        </div>

        {/* Nav groups */}
        <nav style={{ flex: 1, padding: "0 8px", display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto" }}>
          {navGroups.map((group) => (
            <div key={group.label}>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#1E293B",
                  letterSpacing: "0.08em",
                  padding: "0 10px",
                  marginBottom: "4px",
                }}
              >
                {group.label}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                {group.items.map((item) => (
                  <NavItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    active={activeNav === item.label}
                    badge={item.badge}
                    onClick={() => setActiveNav(item.label)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div
          style={{
            padding: "12px 8px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "1px",
          }}
        >
          <NavItem icon={<Settings size={15} />} label="Settings" />
          <NavItem icon={<LogOut size={15} />} label="Sign out" />
          {/* User row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 10px",
              marginTop: "6px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366F1, #A78BFA)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
              }}
            >
              JD
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "12px", fontWeight: 500, color: "#CBD5E1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                Nuthan Baskar
              </p>
              <p style={{ fontSize: "11px", color: "#334155", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                CS · Stanford '26
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 24px",
            height: "52px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(3,3,5,0.9)",
            backdropFilter: "blur(12px)",
            flexShrink: 0,
          }}
        >
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
            <span style={{ color: "#334155" }}>InternTrack</span>
            <ChevronRight size={13} color="#1E293B" />
            <span style={{ color: "#94A3B8", fontWeight: 500 }}>Dashboard</span>
          </div>

          {/* Search */}
          <div style={{ position: "relative", flex: 1, maxWidth: "340px", marginLeft: "8px" }}>
            <Search
              size={13}
              color="#334155"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Search companies, roles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
                padding: "6px 40px 6px 34px",
                fontSize: "13px",
                color: "#94A3B8",
                outline: "none",
                transition: "border-color 0.15s, background 0.15s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(99,102,241,0.4)";
                e.target.style.background = "rgba(99,102,241,0.04)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.06)";
                e.target.style.background = "rgba(255,255,255,0.03)";
              }}
            />
            <kbd
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "10px",
                color: "#1E293B",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "4px",
                padding: "1px 5px",
              }}
            >
              ⌘K
            </kbd>
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
            <button
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#475569",
                position: "relative",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLButtonElement).style.color = "#475569";
              }}
            >
              <Bell size={14} />
              <span
                style={{
                  position: "absolute",
                  top: "7px",
                  right: "7px",
                  width: "5px",
                  height: "5px",
                  background: "#6366F1",
                  borderRadius: "50%",
                  border: "1.5px solid #050507",
                }}
              />
            </button>

            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#6366F1",
                color: "white",
                fontSize: "13px",
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s, box-shadow 0.15s",
                boxShadow: "0 0 16px rgba(99,102,241,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#4F46E5";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(99,102,241,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#6366F1";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px rgba(99,102,241,0.3)";
              }}
            >
              <Plus size={14} />
              New Application
            </button>
          </div>
        </header>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 24px" }}>
          {/* Page title */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#F1F5F9", letterSpacing: "-0.025em", marginBottom: "4px" }}>
              Good morning, Nuthan 👋
            </h1>
            <p style={{ fontSize: "13px", color: "#334155" }}>
              Summer 2025 internship season ·{" "}
              <span style={{ color: "#475569" }}>{applications.length} applications tracked</span>
            </p>
          </div>

          {/* Stat cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <StatCard
              title="Total Applications"
              value={stats.total}
              delta="+12%"
              icon={<Briefcase size={15} />}
              glowColor="#6366F1"
              accentColor="#818CF8"
            />
            <StatCard
              title="Interviews"
              value={stats.interviews}
              delta="+4%"
              icon={<CalendarCheck size={15} />}
              glowColor="#F59E0B"
              accentColor="#FBBF24"
            />
            <StatCard
              title="Offers"
              value={stats.offers}
              delta="+1"
              icon={<Trophy size={15} />}
              glowColor="#10B981"
              accentColor="#34D399"
            />
          </div>

          {/* Table card */}
          <div
            style={{
              background: "#0C0C0F",
              border: "1px solid rgba(255,255,255,0.055)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {/* Table toolbar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#E2E8F0", marginBottom: "2px" }}>
                  Recent Applications
                </h2>
                <p style={{ fontSize: "12px", color: "#334155" }}>
                  {filtered.length} of {applications.length} shown
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { icon: <Filter size={12} />, label: "Filter" },
                  { icon: <SlidersHorizontal size={12} />, label: "Sort" },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#475569",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      padding: "5px 12px",
                      borderRadius: "7px",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#475569";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    {btn.icon}
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    {["Company", "Role", "Status", "Date Applied", "Location", ""].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#1E293B",
                          letterSpacing: "0.07em",
                          textTransform: "uppercase",
                          padding: "10px 20px",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app, i) => (
                    <TableRow key={app.id} app={app} isLast={i === filtered.length - 1} />
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        style={{ padding: "48px", textAlign: "center", fontSize: "13px", color: "#1E293B" }}
                      >
                        No applications match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                borderTop: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <p style={{ fontSize: "12px", color: "#1E293B" }}>
                Showing {filtered.length} results
              </p>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  color: "#475569",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#94A3B8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#475569")}
              >
                View all
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Table Row (isolated for hover state) ─────────────────────────────────────

function TableRow({ app, isLast }: { app: Application; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.03)",
        background: hovered ? "rgba(255,255,255,0.018)" : "transparent",
        cursor: "pointer",
        transition: "background 0.1s",
      }}
    >
      {/* Company */}
      <td style={{ padding: "12px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: app.logoColor,
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "white",
              flexShrink: 0,
            }}
          >
            {app.logo}
          </div>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#CBD5E1" }}>{app.company}</span>
        </div>
      </td>

      {/* Role */}
      <td style={{ padding: "12px 20px" }}>
        <span style={{ fontSize: "13px", color: "#475569" }}>{app.role}</span>
      </td>

      {/* Status */}
      <td style={{ padding: "12px 20px" }}>
        <StatusBadge status={app.status} />
      </td>

      {/* Date */}
      <td style={{ padding: "12px 20px" }}>
        <span style={{ fontSize: "13px", color: "#334155" }}>{app.date}</span>
      </td>

      {/* Location */}
      <td style={{ padding: "12px 20px" }}>
        <span style={{ fontSize: "13px", color: "#334155" }}>{app.location}</span>
      </td>

      {/* Actions */}
      <td style={{ padding: "12px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            justifyContent: "flex-end",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.15s",
          }}
        >
          {[<ArrowUpRight key="a" size={14} />, <MoreHorizontal key="b" size={14} />].map((icon, idx) => (
            <button
              key={idx}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#475569",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#475569";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </td>
    </tr>
  );
}

