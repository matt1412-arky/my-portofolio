import Image from "next/image";
import { getGithubProfile, getGithubRepos } from "../lib/github";
import {
  PROFILE,
  EXPERIENCES,
  EDUCATION,
  SKILLS,
  CERTIFICATIONS,
} from "../lib/data";
import Nav from "../components/Nav";
import Cursor from "../components/Cursor";
import Reveal from "../components/Reveal";
import SkillBar from "../components/SkillBar";
import ContactForm from "../components/ContactForm";
import s from "./page.module.css";

export default async function Home() {
  const [ghProfile, repos] = await Promise.all([
    getGithubProfile(),
    getGithubRepos(),
  ]);

  const avatarUrl = ghProfile?.avatar_url || null;
  const totalRepos = ghProfile?.public_repos || 18;
  const allRepos = [
    ...repos.filter((r) => r.highlight),
    ...repos.filter((r) => !r.highlight),
  ];

  return (
    <>
      <Cursor />
      <Nav />

      {/* HERO */}
      <section id="hero" className={s.hero}>
        <div className={s.blob1} />
        <div className={s.blob2} />
        <div className={s.heroWrap}>
          <div className={s.heroLeft}>
            <div className={s.pill}>
              <span className={s.pillDot} />
              Available for new opportunities
            </div>
            <h1 className={s.h1}>
              <span>Matthew</span>
              <span>Christian</span>
              <span className={s.h1Role}>
                Frontend Developer
                <br />& Software Engineer
              </span>
            </h1>
            <p className={s.heroSub}>
              Building clean, scalable interfaces and systems. Based in{" "}
              <strong>Jakarta, Indonesia</strong> — open to remote.
            </p>
            <div className={s.heroStack}>
              {["PHP", "Java", "Laravel", "React", "Flutter", "Python"].map(
                (t) => (
                  <span key={t} className={s.stackPill}>
                    {t}
                  </span>
                ),
              )}
            </div>
            <div className={s.heroBtns}>
              <a href="#projects" className={s.btnPrimary}>
                View Projects <ArrowR />
              </a>
              <a href="#contact" className={s.btnOutline}>
                Get In Touch
              </a>
              <a
                href="https://github.com/matt1412-arky"
                target="_blank"
                rel="noopener noreferrer"
                className={s.btnGhost}
              >
                <GhIcon /> GitHub
              </a>
            </div>
          </div>
          {avatarUrl && (
            <div className={s.heroRight}>
              <div className={s.avOuter}>
                <div className={s.avRing} />
                <Image
                  src={avatarUrl}
                  alt="Matthew Christian Cahyadi"
                  width={260}
                  height={260}
                  className={s.av}
                  priority
                />
                <div className={s.avBadge}>
                  <span className={s.avDot} /> Open to work
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={s.stats}>
          {[
            { v: totalRepos, l: "Repositories" },
            { v: "3+", l: "Years Exp." },
            { v: PROFILE.gpa, l: "GPA" },
            { v: "2", l: "Certifications" },
          ].map((st) => (
            <div key={st.l} className={s.stat}>
              <div className={s.statN}>{st.v}</div>
              <div className={s.statL}>{st.l}</div>
            </div>
          ))}
        </div>
        <a href="#about" className={s.scrollHint}>
          <ChevD />
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" className={s.sec}>
        <div className={s.inner}>
          <Reveal>
            <SecLabel n="01" t="About Me" />
          </Reveal>
          <div className={s.aboutGrid}>
            <Reveal delay={60}>
              <div className={s.card}>
                <p className={s.aboutP}>{PROFILE.summary}</p>
                <div className={s.eduRow}>
                  <div className={s.eduIco}>
                    <GradIco />
                  </div>
                  <div>
                    <div className={s.eduName}>{EDUCATION[0].institution}</div>
                    <div className={s.eduDeg}>
                      {EDUCATION[0].degree} — <em>{EDUCATION[0].gpa}</em>
                    </div>
                    <div className={s.eduPer}>{EDUCATION[0].period}</div>
                  </div>
                </div>
                <div className={s.certs}>
                  {CERTIFICATIONS.map((c) => (
                    <div key={c.name} className={s.certBadge}>
                      🏅 {c.name} <span>({c.year})</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <div>
              {EXPERIENCES.map((exp, i) => (
                <Reveal key={exp.role + i} delay={i * 65}>
                  <div className={s.expCard}>
                    <div className={s.expTop}>
                      <div>
                        <div className={s.expCo}>{exp.company}</div>
                        <div className={s.expRole}>{exp.role}</div>
                      </div>
                      <div className={s.expRight}>
                        <span className={s.expType}>{exp.type}</span>
                        <span className={s.expDate}>{exp.period}</span>
                      </div>
                    </div>
                    <ul className={s.expUl}>
                      {exp.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={`${s.sec} ${s.secAlt}`}>
        <div className={s.inner}>
          <Reveal>
            <SecLabel n="02" t="Selected Work" />
            <p className={s.secSub}>
              Synced live from{" "}
              <a
                href="https://github.com/matt1412-arky"
                target="_blank"
                rel="noopener noreferrer"
                className={s.inlink}
              >
                GitHub API
              </a>{" "}
              · refreshes every hour
            </p>
          </Reveal>
          <div className={s.projGrid}>
            {allRepos.map((repo, i) => (
              <Reveal key={repo.id} delay={i * 50}>
                <div
                  className={`${s.projCard} ${repo.highlight ? s.projHl : ""}`}
                >
                  <div className={s.projTop}>
                    <span className={s.projEmo}>{repo.emoji}</span>
                    <div className={s.projActs}>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={s.projIco}
                          title="Live demo"
                        >
                          <ExtIco />
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.projIco}
                        title="GitHub"
                      >
                        <GhIcon />
                      </a>
                    </div>
                  </div>
                  <div className={s.projName}>{repo.name}</div>
                  <div className={s.projDesc}>{repo.description}</div>
                  <div className={s.projFoot}>
                    <div className={s.projTags}>
                      {repo.language && (
                        <span className={s.langTag}>{repo.language}</span>
                      )}
                      {repo.topics.slice(0, 2).map((t) => (
                        <span key={t} className={s.topicTag}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className={s.projDate}>
                      {new Date(repo.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className={s.viewAll}>
              <a href="/projects" className={s.btnOutline}>
                View all {totalRepos} projects <ArrowR />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className={s.sec}>
        <div className={s.inner}>
          <Reveal>
            <SecLabel n="03" t="Tech Stack" />
          </Reveal>
          <div className={s.skillGrid}>
            {[
              { t: "Backend", sk: SKILLS.backend },
              { t: "Frontend", sk: SKILLS.frontend },
              { t: "Database", sk: SKILLS.database },
            ].map(({ t, sk }) => (
              <Reveal key={t}>
                <div className={s.skillCard}>
                  <div className={s.skillT}>{t}</div>
                  <SkillBar skills={sk} />
                </div>
              </Reveal>
            ))}
            <Reveal>
              <div className={s.skillCard}>
                <div className={s.skillT}>Tools & Soft Skills</div>
                <div className={s.tagCloud}>
                  {[...SKILLS.tools, ...SKILLS.soft].map((t) => (
                    <span key={t} className={s.cloudTag}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className={s.certMini}>
                  {CERTIFICATIONS.map((c) => (
                    <div key={c.name} className={s.certMiniRow}>
                      🏅 {c.name} <span className={s.certY}>({c.year})</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`${s.sec} ${s.secAlt}`}>
        <div className={s.inner}>
          <Reveal>
            <SecLabel n="04" t="Get In Touch" />
          </Reveal>
          <div className={s.ctaGrid}>
            <Reveal>
              <h2 className={s.ctaH}>
                Let&apos;s build
                <br />
                <em>something great</em>
              </h2>
              <p className={s.ctaP}>
                Open to frontend developer roles, full-stack projects, and
                freelance work. Jakarta-based, happy to work remotely.
              </p>
              <div className={s.ctaLinks}>
                {[
                  {
                    ico: <MailIco />,
                    label: "Email",
                    val: PROFILE.email,
                    href: `mailto:${PROFILE.email}`,
                  },
                  {
                    ico: <LiIco />,
                    label: "LinkedIn",
                    val: "matthew-christian-cahyadi",
                    href: PROFILE.linkedin,
                  },
                  {
                    ico: <GhIcon />,
                    label: "GitHub",
                    val: "matt1412-arky",
                    href: PROFILE.github,
                  },
                  {
                    ico: <PhIco />,
                    label: "Phone",
                    val: "+62 857-8157-1190",
                    href: `tel:${PROFILE.phone}`,
                  },
                ].map((cl) => (
                  <a
                    key={cl.label}
                    href={cl.href}
                    target={cl.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={s.ctaLink}
                  >
                    <span className={s.clIco}>{cl.ico}</span>
                    <span className={s.clBody}>
                      <span className={s.clLabel}>{cl.label}</span>
                      <span className={s.clVal}>{cl.val}</span>
                    </span>
                    <span className={s.clArr}>
                      <ArrowR />
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <footer className={s.footer}>
        <span>© 2026 Matthew Christian Cahyadi</span>
        <span>
          Built with Next.js · Deployed on{" "}
          <span className={s.fAcc}>Vercel</span>
        </span>
        <a
          href="https://github.com/matt1412-arky"
          target="_blank"
          rel="noopener noreferrer"
          className={s.fGh}
        >
          <GhIcon /> matt1412-arky
        </a>
      </footer>
    </>
  );
}

function SecLabel({ n, t }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 11,
          color: "var(--accent)",
          letterSpacing: "0.14em",
          display: "block",
          marginBottom: 10,
        }}
      >
        {n} /
      </span>
      <h2
        style={{
          fontFamily: "'Syne',sans-serif",
          fontWeight: 800,
          fontSize: "clamp(30px,4vw,44px)",
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          color: "var(--text)",
        }}
      >
        {t}
      </h2>
      <div
        style={{
          width: 44,
          height: 2,
          background: "var(--accent)",
          marginTop: 14,
          borderRadius: 2,
        }}
      />
    </div>
  );
}

const ArrowR = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const GhIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const ExtIco = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const MailIco = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const LiIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const PhIco = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const GradIco = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const ChevD = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
