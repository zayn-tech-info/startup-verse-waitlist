import { useEffect, useMemo, useState } from "react";
import { useMutation, usePaginatedQuery } from "convex/react";
import { Link } from "react-router-dom";
import { api } from "../../convex/_generated/api";

type Row = {
  fullname: string;
  email: string;
  whatsapp: string;
  institution: string;
  role: string;
  building: string;
  source: string;
  hope?: string;
  createdAt: number;
};

const SESSION_KEY = "startupverse_coordinator_session";

function formatDate(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleString();
}

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

function downloadCsv(filename: string, rows: Row[]): void {
  const header = [
    "Full name",
    "Email",
    "WhatsApp",
    "Institution",
    "Role",
    "Building",
    "Source",
    "Hope",
    "Created at",
  ];

  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        r.fullname,
        r.email,
        r.whatsapp,
        r.institution,
        r.role,
        r.building,
        r.source,
        r.hope ?? "",
        formatDate(r.createdAt),
      ]
        .map(csvEscape)
        .join(","),
    ),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function RegistrationsDataPage() {
  const createSession = useMutation(api.coordinatorSessions.createSession);

  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) setSessionToken(stored);
  }, []);

  const {
    results,
    status,
    loadMore,
    isLoading,
  } = usePaginatedQuery(
    api.registrationsAdmin.listPaginated,
    sessionToken ? { sessionToken } : "skip",
    { initialNumItems: 25 },
  );

  const rows: Row[] = useMemo(() => {
    if (!results) return [];
    return results.map((r) => ({
      fullname: r.fullname,
      email: r.email,
      whatsapp: r.whatsapp,
      institution: r.institution,
      role: r.role,
      building: r.building,
      source: r.source,
      hope: r.hope ?? undefined,
      createdAt: r.createdAt,
    }));
  }, [results]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const haystack = `${r.fullname} ${r.email} ${r.whatsapp} ${r.institution} ${r.role} ${r.building} ${r.source}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [rows, search]);

  const onLogin = async () => {
    setAuthError(null);
    setIsAuthLoading(true);
    try {
      const res = await createSession({ password });
      sessionStorage.setItem(SESSION_KEY, res.sessionToken);
      setSessionToken(res.sessionToken);
      setPassword("");
    } catch (e) {
      console.error(e);
      setAuthError("Invalid password.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const onLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSessionToken(null);
    setAuthError(null);
  };

  if (!sessionToken) {
    return (
      <div style={{ minHeight: "100vh", padding: 24, color: "white" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", margin: 0 }}>
              Coordinator login
            </h2>
            <Link to="/" style={{ color: "var(--teal)" }}>
              ← Back
            </Link>
          </div>

          <p style={{ color: "var(--off)", marginTop: 8 }}>
            Enter the coordinator password to view registrations.
          </p>

          <div style={{ marginTop: 16 }}>
            <label style={{ display: "block", marginBottom: 8, color: "var(--off)" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Coordinator password"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                outline: "none",
              }}
            />

            {authError ? (
              <div style={{ marginTop: 10, color: "#ffb4b4" }}>{authError}</div>
            ) : null}

            <button
              onClick={onLogin}
              disabled={isAuthLoading || password.trim().length === 0}
              style={{
                marginTop: 14,
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                border: "none",
                background: "var(--teal)",
                color: "white",
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                cursor: isAuthLoading ? "wait" : "pointer",
                opacity: isAuthLoading || password.trim().length === 0 ? 0.6 : 1,
              }}
            >
              {isAuthLoading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: 24, color: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <div>
            <h2 style={{ fontFamily: "Syne, sans-serif", margin: 0 }}>
              Registrations
            </h2>
            <div style={{ color: "var(--muted)", marginTop: 4 }}>
              Status: {isLoading ? "Loading…" : status}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link to="/" style={{ color: "var(--teal)", alignSelf: "center" }}>
              ← Landing page
            </Link>
            <button
              onClick={() =>
                downloadCsv(
                  `startupverse-registrations-${new Date()
                    .toISOString()
                    .slice(0, 10)}.csv`,
                  filtered,
                )
              }
              disabled={filtered.length === 0}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                cursor: filtered.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Export CSV
            </button>
            <button
              onClick={onLogout}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "transparent",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name / email / whatsapp / institution…"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
              outline: "none",
            }}
          />
        </div>

        <div
          style={{
            overflowX: "auto",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 14,
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                {[
                  "Full name",
                  "Email",
                  "WhatsApp",
                  "Institution",
                  "Role",
                  "Building",
                  "Source",
                  "Created at",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 12px",
                      borderBottom: "1px solid rgba(255,255,255,0.10)",
                      color: "var(--off)",
                      fontWeight: 600,
                      fontSize: 13,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, idx) => (
                <tr key={`${r.email}-${idx}`}>
                  <td style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {r.fullname}
                  </td>
                  <td style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {r.email}
                  </td>
                  <td style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {r.whatsapp}
                  </td>
                  <td style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {r.institution}
                  </td>
                  <td style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {r.role}
                  </td>
                  <td style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {r.building}
                  </td>
                  <td style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {r.source}
                  </td>
                  <td style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,0.06)", whiteSpace: "nowrap" }}>
                    {formatDate(r.createdAt)}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: 18, color: "var(--muted)" }}>
                    No results.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => loadMore(25)}
            disabled={status !== "CanLoadMore" || isLoading}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
              cursor:
                status !== "CanLoadMore" || isLoading ? "not-allowed" : "pointer",
              opacity: status !== "CanLoadMore" || isLoading ? 0.6 : 1,
            }}
          >
            {status === "CanLoadMore" ? "Load more" : "No more"}
          </button>
        </div>
      </div>
    </div>
  );
}

