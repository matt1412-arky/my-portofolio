// lib/github.js
// All fetches run SERVER-SIDE via Next.js fetch with ISR revalidation.
// No API key needed for public repos (60 req/hour unauthenticated).
// Add GITHUB_TOKEN env var in Vercel to raise limit to 5000 req/hour.

const GITHUB_USERNAME = 'matt1412-arky'
const BASE = 'https://api.github.com'

const headers = {
  Accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
}

// Project metadata to enrich GitHub data
const PROJECT_META = {
  'visitor-management': {
    emoji: '🏢',
    description:
      'Visitor management web application developed as a personal thesis project at Kalbis Institute. Handles visitor registration, check-in/out tracking, and reporting. Includes academic journal documentation.',
    highlight: true,
  },
  'e-ticketeer-PHP-Native': {
    emoji: '🎫',
    description:
      'E-ticketing platform built with native PHP. Features ticket creation, event management, user registration, and booking flows — no framework dependency.',
    highlight: true,
  },
  'juice-PHP-Native': {
    emoji: '🍊',
    description:
      'Juice ordering web app with product catalog, cart, and order management. Built with native PHP and JavaScript for a clean, lightweight frontend.',
    highlight: false,
  },
  'Otomovice-HTML-Website': {
    emoji: '🚗',
    description:
      'Automotive-themed landing website showcasing front-end layout mastery — responsive design, clean CSS grid, and smooth scrolling interactions.',
    highlight: false,
  },
  'BE-Absensi': {
    emoji: '📋',
    description:
      'Backend REST API for an attendance management system. Handles authentication, employee records, and attendance logging. Paired with FE-Absensi for a full-stack solution.',
    highlight: true,
  },
  'FE-Absensi': {
    emoji: '📱',
    description:
      'Frontend interface for the Absensi attendance system. Consumes the BE-Absensi REST API. Actively developed as of March 2026.',
    highlight: true,
  },
  'logic-332': {
    emoji: '🧠',
    description:
      'Logic and algorithm exercises repository — a collection of programming challenges and solutions demonstrating problem-solving skills.',
    highlight: false,
  },
  RS: {
    emoji: '🏥',
    description:
      'Hospital or Records System web application with CSS-heavy layout design. Demonstrates form design, data display, and structured UI composition.',
    highlight: false,
  },
}

export async function getGithubProfile() {
  try {
    const res = await fetch(`${BASE}/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 }, // revalidate every 1 hour
    })
    if (!res.ok) throw new Error('GitHub profile fetch failed')
    return await res.json()
  } catch {
    return null
  }
}

export async function getGithubRepos() {
  try {
    const res = await fetch(
      `${BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=18&type=public`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) throw new Error('GitHub repos fetch failed')
    const repos = await res.json()

    return repos
      .filter((r) => !r.fork)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: PROJECT_META[repo.name]?.description || repo.description || 'A project by Matthew Cahyadi.',
        emoji: PROJECT_META[repo.name]?.emoji || '⚙️',
        highlight: PROJECT_META[repo.name]?.highlight || false,
        html_url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        topics: repo.topics || [],
      }))
      .sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0))
  } catch {
    return []
  }
}
