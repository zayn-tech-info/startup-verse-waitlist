import { useEffect, useMemo } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import "../styles.css";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/HqadRRbO43682FI5E18qjT";

const LANDING_HTML = `
  <!-- SCROLL INDICATOR -->
  <div class="scroll-indicator">
    <span>Scroll to top</span>
    <div class="scroll-line"></div>
  </div>

  <!-- NAV -->
  <nav>
    <a href="#" class="nav-logo">
      <span class="logo-dot"></span>StartupVerse
    </a>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#gain">Why Attend</a></li>
      <li><a href="#register">Register</a></li>
      <li><a href="#register" class="nav-cta">Reserve Spot →</a></li>
    </ul>
    <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open menu" aria-expanded="false">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    <div class="mobile-menu-overlay" id="mobile-menu-overlay">
      <div class="mobile-menu-header">
        <a href="#" class="nav-logo">
          <span class="logo-dot"></span>StartupVerse
        </a>
        <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Close menu">&times;</button>
      </div>
      <ul class="mobile-nav-links">
        <li><a href="#about" class="mobile-nav-link">About</a></li>
        <li><a href="#gain" class="mobile-nav-link">Why Attend</a></li>
        <li><a href="#register" class="mobile-nav-link">Register</a></li>
        <li><a href="#register" class="mobile-nav-cta">Reserve Spot →</a></li>
      </ul>
    </div>
  </nav>

  <!-- HERO -->
  <header class="hero">
    <div class="eyebrow fu fu1">The Official StartupVerse Launch</div>
    <h1 class="fu fu2">The Startup<br>Revolution</h1>
    <p class="hero-sub fu fu3">
      <strong>The Official Product Launch of StartupVerse</strong>
    </p>
    <p class="hero-sub fu fu3" style="margin-bottom:0">
      Free to attend. Thursday, 28 May 2026. The Assembly, Ogbomoso.
    </p>

    <div class="hero-meta fu fu4">
      <div class="hero-meta-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Thursday, 28 May 2026
      </div>
      <div class="hero-meta-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        9:00 AM — 1:00 PM
      </div>
      <div class="hero-meta-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        The Assembly, Ogbomoso
      </div>
      <div class="hero-meta-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        Free — Admission
      </div>
    </div>

    <div class="hero-btns fu fu5">
      <a href="#register" class="btn-primary">Reserve my spot →</a>
      <a href="#about" class="btn-outline">Learn more</a>
    </div>
  </header>

  <!-- COUNTDOWN -->
  <div class="countdown-bar">
    <div class="countdown-inner">
      <div class="countdown-label">
        <h3>Hurry Up!</h3>
        <p>Secure your slot now</p>
      </div>
      <div class="countdown-digits">
        <div class="digit-block">
          <span class="digit-num" id="cd-days">00</span>
          <span class="digit-label">Days</span>
        </div>
        <span class="digit-sep">:</span>
        <div class="digit-block">
          <span class="digit-num" id="cd-hours">00</span>
          <span class="digit-label">Hours</span>
        </div>
        <span class="digit-sep">:</span>
        <div class="digit-block">
          <span class="digit-num" id="cd-mins">00</span>
          <span class="digit-label">Minutes</span>
        </div>
        <span class="digit-sep">:</span>
        <div class="digit-block">
          <span class="digit-num" id="cd-secs">00</span>
          <span class="digit-label">Seconds</span>
        </div>
      </div>
      <div class="countdown-venue">
        <div class="venue-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <div class="venue-text">
            <strong>The Assembly, Ogbomoso</strong>
            <span>Oyo State, Nigeria</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ABOUT -->
  <section id="about">
    <div class="section-inner">
      <div class="about-grid reveal">
        <div>
          <div class="section-eyebrow">About the Event</div>
          <h2 class="section-title">A Global Gathering of Aspiring and Early-Stage Founders</h2>
          <p class="section-body">
            Connect with visionary founders, builders, and ecosystem leaders at the official unveiling of StartupVerse — the dedicated execution home designed to bridge the gap between African innovation and reality.
          </p>
        </div>
        <ul class="about-list">
          <li>
            <span class="check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
            Keynote Speech on Why Brilliant Ideas Die in the Hands of Capable Africans
          </li>
          <li>
            <span class="check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
            Insights from industry leaders on funding, team building, and the nuances of building in Africa
          </li>
          <li>
            <span class="check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
            Live StartupVerse platform launch and interactive demo
          </li>
          <li>
            <span class="check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
            Exclusive access to beta testing — in the room, on the day
          </li>
          <li>
            <span class="check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
            High-value connections with founders, students, and tech enthusiasts
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- WHAT YOU'LL GAIN -->
  <section id="gain" style="padding-top:0">
    <div class="section-inner">
      <div class="reveal" style="text-align:center;margin-bottom:2.5rem">
        <div class="section-eyebrow">Why Attend</div>
        <h2 class="section-title">What You'll Gain</h2>
      </div>
      <div class="gain-grid reveal">
        <div class="gain-card">
          <div class="gain-num">01</div>
          <h4>Master the Art of Execution</h4>
          <p>Learn why great ideas often stall and gain frameworks to move from concept to market-ready in the African ecosystem.</p>
        </div>
        <div class="gain-card">
          <div class="gain-num">02</div>
          <h4>Early Platform Access</h4>
          <p>Be among the first to onboard the StartupVerse beta — a head start on the tools designed to power your execution journey.</p>
        </div>
        <div class="gain-card">
          <div class="gain-num">03</div>
          <h4>Direct Access to Industry Leaders</h4>
          <p>Engage with seasoned founders and investors during panel and networking sessions for raw, honest feedback.</p>
        </div>
        <div class="gain-card">
          <div class="gain-num">04</div>
          <h4>A High-Value Growth Network</h4>
          <p>Connect with accountability partners, potential co-founders, and tech enthusiasts committed to building the future.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- REGISTRATION FORM -->
  <section id="register" class="form-section">
    <div class="section-inner">
      <div style="text-align:center;margin-bottom:2rem" class="reveal">
        <div class="section-eyebrow">Secure Your Slot</div>
        <h2 class="section-title">Reserve Your Spot</h2>
        <p style="color:var(--muted);font-size:.95rem">Spots are limited. Under a minute to fill.</p>
      </div>

      <div class="form-card reveal">
        <div id="form-body">
          <p class="form-sub">#BuildWithStartupVerse · Free admission · 23 May 2026</p>

          <form id="reg-form" novalidate>
            <div class="form-group">
              <label for="fullname">Full name <span class="req">*</span></label>
              <input type="text" id="fullname" name="fullname" placeholder="e.g. Amina Okafor" required autocomplete="name">
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email address <span class="req">*</span></label>
                <input type="email" id="email" name="email" placeholder="you@example.com" required autocomplete="email">
              </div>
              <div class="form-group">
                <label for="whatsapp">WhatsApp number <span class="req">*</span></label>
                <input type="tel" id="whatsapp" name="whatsapp" placeholder="+234 800 000 0000" required autocomplete="tel">
              </div>
            </div>

            <div class="form-group">
              <label for="institution">Institution or organisation <span class="req">*</span></label>
              <input type="text" id="institution" name="institution" placeholder="e.g. LAUTECH, Genomac, Self-employed" required>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="role">Which best describes you? <span class="req">*</span></label>
                <select id="role" name="role" required>
                  <option value="" disabled selected>Select one</option>
                  <option value="student">Student</option>
                  <option value="founder">Founder / entrepreneur</option>
                  <option value="developer">Developer / tech professional</option>
                  <option value="business">Business professional</option>
                  <option value="educator">Educator</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="building">Building a startup or idea? <span class="req">*</span></label>
                <select id="building" name="building" required>
                  <option value="" disabled selected>Select one</option>
                  <option value="yes-active">Yes, actively building</option>
                  <option value="yes-idea">Yes, in the idea stage</option>
                  <option value="not-yet">Not yet, but I want to</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="source">How did you hear about The Startup Revolution? <span class="req">*</span></label>
              <select id="source" name="source" required>
                <option value="" disabled selected>Select one</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter / X</option>
                <option value="linkedin">LinkedIn</option>
                <option value="friend">A friend or colleague</option>
                <option value="gihub">G-iHub community</option>
                <option value="lautech">LAUTECH community</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="hope">What do you hope to take away? <span class="opt">(optional)</span></label>
              <textarea id="hope" name="hope" placeholder="Tell us in a sentence or two — optional but appreciated"></textarea>
            </div>

            <button type="submit" class="submit-btn" id="submit-btn">
              Reserve my spot →
            </button>

            <p class="free-note"><strong>100% free.</strong> No payment. Registration closes when seats are full.</p>
          </form>
        </div>

        <!-- SUCCESS -->
        <div class="success-state" id="success-state">
          <div class="success-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3>You're registered!</h3>
          <p>We'll see you on 23rd of May.<br>Check your email — we'll send you everything you need before the event.</p>
          <a class="wa-share" href="https://wa.me/?text=I%20just%20registered%20for%20The%20Startup%20Revolution%20by%20StartupVerse!%20It%27s%20free%20%E2%80%94%20join%20me.%20%23BuildWithStartupVerse" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Share with your network
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-inner">
      <a href="#" class="footer-logo">
        <span class="logo-dot"></span>StartupVerse
      </a>
      <p class="footer-tag"><strong>#BuildWithStartupVerse</strong> · The Assembly, Ogbomoso, Oyo State</p>
      <div class="footer-social">
        <a href="#">Instagram</a>
        <a href="#">Twitter / X</a>
        <a href="#">LinkedIn</a>
      </div>
    </div>
  </footer>
`;

export default function LandingPage() {
  const createRegistration = useMutation(api.registrations.create);

  const html = useMemo(() => LANDING_HTML, []);

  useEffect(() => {
    const target = new Date("2026-05-23T09:00:00").getTime();

    const update = () => {
      const now = Date.now();
      const diff = target - now;

      const set = (id: string, value: string) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
      };

      if (diff <= 0) {
        set("cd-days", "00");
        set("cd-hours", "00");
        set("cd-mins", "00");
        set("cd-secs", "00");
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      set("cd-days", String(d).padStart(2, "0"));
      set("cd-hours", String(h).padStart(2, "0"));
      set("cd-mins", String(m).padStart(2, "0"));
      set("cd-secs", String(s).padStart(2, "0"));
    };

    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const menuBtn = document.getElementById("mobile-menu-btn") as HTMLButtonElement | null;
    const closeBtn = document.getElementById("mobile-menu-close") as HTMLButtonElement | null;
    const overlay = document.getElementById("mobile-menu-overlay") as HTMLDivElement | null;
    const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-nav-cta");

    if (!menuBtn || !overlay) return;

    const openMenu = () => {
      overlay.classList.add("open");
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      overlay.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    menuBtn.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

    return () => {
      menuBtn.removeEventListener("click", openMenu);
      closeBtn?.removeEventListener("click", closeMenu);
      mobileLinks.forEach((link) => link.removeEventListener("click", closeMenu));
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const form = document.getElementById("reg-form") as HTMLFormElement | null;
    const btn = document.getElementById("submit-btn") as HTMLButtonElement | null;
    if (!form || !btn) return;

    const onSubmit = async (e: Event) => {
      e.preventDefault();

      const fd = new FormData(form);
      const fullname = String(fd.get("fullname") ?? "").trim();
      const email = String(fd.get("email") ?? "").trim();
      const whatsapp = String(fd.get("whatsapp") ?? "").trim();
      const institution = String(fd.get("institution") ?? "").trim();
      const role = String(fd.get("role") ?? "").trim();
      const building = String(fd.get("building") ?? "").trim();
      const source = String(fd.get("source") ?? "").trim();
      const hopeRaw = String(fd.get("hope") ?? "").trim();

      const emailOk = /^\S+@\S+\.\S+$/.test(email);
      const requiredOk =
        fullname.length > 0 &&
        emailOk &&
        whatsapp.length > 0 &&
        institution.length > 0 &&
        role.length > 0 &&
        building.length > 0 &&
        source.length > 0;

      if (!requiredOk) {
        alert("Please fill all required fields with valid values.");
        return;
      }

      btn.textContent = "Submitting…";
      btn.disabled = true;

      try {
        await createRegistration({
          fullname,
          email,
          whatsapp,
          institution,
          role,
          building,
          source,
          hope: hopeRaw.length > 0 ? hopeRaw : undefined,
        });

        window.location.assign(WHATSAPP_GROUP_URL);
      } catch (err) {
        console.error(err);
        alert("Registration failed. Please try again.");
        btn.textContent = "Reserve my spot →";
        btn.disabled = false;
      }
    };

    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, [createRegistration]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

