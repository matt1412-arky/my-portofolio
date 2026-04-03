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
    displayName: 'CATOS Visitor Management System',
    description:
      'Built for CATOS to digitize visitor registration and check-in/out tracking. Eliminated manual logbooks, reduced front-desk processing time, and generated automated daily reports. Published as academic thesis with journal documentation.',
    highlight: true,
    show: true,
  },
  'e-ticketeer-PHP-Native': {
    emoji: '🎫',
    displayName: 'E-Ticketeer — Event Ticketing Platform',
    description:
      'Full-cycle e-ticketing platform built with native PHP. Streamlined event creation, ticket booking, and payment flows for event organizers — reducing manual coordination overhead with a self-service system.',
    highlight: true,
    show: true,
  },
  'juice-PHP-Native': {
    emoji: '🍊',
    displayName: 'Juice Shop — Freelance Ordering System',
    description:
      'Freelance project for a junior high school peer. Built a product catalog, cart, and order management system with native PHP and JavaScript, enabling the client to manage online orders independently.',
    highlight: true,
    show: true,
  },
  'Otomovice-HTML-Website': {
    emoji: '🚗',
    displayName: 'Otomovice — Automotive Landing Page',
    description:
      'Responsive automotive-themed landing website showcasing front-end layout mastery — clean CSS grid, smooth scrolling interactions, and mobile-first design.',
    highlight: false,
    show: true,
  },
  'BE-Absensi': {
    emoji: '📋',
    displayName: 'Kolose Gonzaga Attendance System',
    description:
      'Full-stack attendance system built for Kolose Gonzaga. Replaced manual paper-based attendance with a digital platform — cutting weekly admin processing time significantly. Comprises a REST API backend and a dedicated frontend interface.',
    highlight: true,
    show: true,
  },
  'FE-Absensi': {
    emoji: null,
    displayName: null,
    description: null,
    highlight: false,
    show: false, // merged into BE-Absensi display
  },
  'logic-332': {
    emoji: '🧠',
    displayName: 'Logic & Algorithm Exercises',
    description: 'Collection of programming challenges and algorithm solutions.',
    highlight: false,
    show: false,
  },
  RS: {
    emoji: '🏥',
    displayName: 'Hospital Records System',
    description: 'Hospital records web application with structured UI and form design.',
    highlight: false,
    show: false,
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
      `${BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=public`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) throw new Error('GitHub repos fetch failed')
    const repos = await res.json()

    const allClean = repos
      .filter((r) => !r.fork)
      .map((repo) => ({
        id: repo.id,
        name: PROJECT_META[repo.name]?.displayName || repo.name,
        repoKey: repo.name,
        full_name: repo.full_name,
        description: PROJECT_META[repo.name]?.description || repo.description || 'A project by Matthew Cahyadi.',
        emoji: PROJECT_META[repo.name]?.emoji || '⚙️',
        highlight: PROJECT_META[repo.name]?.highlight || false,
        show: PROJECT_META[repo.name]?.show ?? false, // default false — must be explicitly allowed
        html_url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        topics: repo.topics || [],
      }))

    // Only 5 featured projects on homepage
    const featured = allClean
      .filter((r) => r.show)
      .sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0))

    return featured
  } catch {
    return []
  }
}

export async function getAllGithubRepos() {
  try {
    const res = await fetch(
      `${BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=public`,
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
        name: PROJECT_META[repo.name]?.displayName || repo.name,
        repoKey: repo.name,
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
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  } catch {
    return []
  }
}