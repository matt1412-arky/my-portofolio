import { getAllGithubRepos } from "../../lib/github";
import Nav from "../../components/Nav";
import Cursor from "../../components/Cursor";
import s from "./projects.module.css";

export const metadata = {
  title: "All Projects — Matthew Christian Cahyadi",
  description: "All public repositories by Matthew Christian Cahyadi.",
};

export default async function ProjectsPage() {
  const repos = await getAllGithubRepos();

  return (
    <>
      <Cursor />
      <Nav />
      <main className={s.main}>
        <div className={s.header}>
          <a href="/" className={s.back}>
            ← Back to Portfolio
          </a>
          <span className={s.label}>All Repositories</span>
          <h1 className={s.title}>All Projects</h1>
          <p className={s.sub}>
            {repos.length} public repositories on{" "}
            <a
              href="https://github.com/matt1412-arky"
              target="_blank"
              rel="noopener noreferrer"
              className={s.ghLink}
            >
              GitHub
            </a>
          </p>
        </div>
        <div className={s.grid}>
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.card} ${repo.highlight ? s.featured : ""}`}
            >
              <div className={s.cardTop}>
                <span className={s.emoji}>{repo.emoji}</span>
                {repo.highlight && <span className={s.badge}>Featured</span>}
              </div>
              <div className={s.name}>{repo.name}</div>
              <div className={s.desc}>{repo.description}</div>
              <div className={s.foot}>
                {repo.language && (
                  <span className={s.lang}>{repo.language}</span>
                )}
                <span className={s.date}>
                  {new Date(repo.updated_at).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
