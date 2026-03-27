// lib/data.js
// All static data from Matthew's CV — edit this file to update content.

export const PROFILE = {
  name: 'Matthew Christian Cahyadi',
  role: 'Frontend Developer & Software Engineer',
  tagline: 'Building thoughtful interfaces and scalable systems.',
  summary:
    'Computer Science graduate from Kalbis Institute (GPA 3.55/4.00) based in Jakarta, Indonesia. Specializing in front-end development with full-stack capability. Experienced in leading development teams, teaching programming, and delivering freelance projects across web and mobile platforms.',
  email: 'mattchris16@gmail.com',
  phone: '+6285781571190',
  linkedin: 'https://www.linkedin.com/in/matthew-christian-cahyadi/',
  github: 'https://github.com/matt1412-arky',
  github_username: 'matt1412-arky',
  location: 'Jakarta, Indonesia',
  gpa: '3.55',
  open_to_work: true,
}

export const EXPERIENCES = [
  {
    company: 'PT Wiby Teknologi Indonesia',
    role: 'Programming Teacher',
    period: 'Jul 2025 – Jul 2026',
    type: 'Full-time',
    description:
      'WIBY is an IT Consulting company specializing in Website Development, Application Development, IT Education & Training, and Cyber Security.',
    bullets: [
      'Instructed Python programming and SQLite database integration for 3 high school classes (Grade 11–12)',
      'Guided students in developing basic Python applications with SQLite databases',
    ],
  },
  {
    company: 'PT Prima Integrasi Solusindo',
    role: 'Lead Java Developer',
    period: 'Aug 2024 – Feb 2025',
    type: 'Full-time',
    description:
      'PIS is an IT Solution and System Integrator Company providing IT Infrastructure & System Integration and Business Solutions.',
    bullets: [
      'Led a team of 8 developers building a Retail LMS (Loan Management System) for RPB products in BNI project',
      'Acting as bridge between developers, Business Analysts (BA), DevOps, Scrum Master, and Product Owner (PO)',
      'Made strategic technical decisions to ensure system optimization and scalability',
      'Monitored and reviewed code for efficiency, performance, and security',
    ],
  },
  {
    company: 'Freelance Developer',
    role: 'Web & Mobile Developer',
    period: 'Jul 2022 – Jul 2023',
    type: 'Freelance',
    description: 'Independent contractor delivering full-stack web and mobile applications.',
    bullets: [
      'Designed and developed web and mobile apps using JavaScript, PHP, and Java',
      'Collaborated with clients to gather requirements and deliver within deadlines',
      'Utilized React, Laravel, and Node.js for responsive, user-friendly interfaces',
      'Managed version control and CI/CD using Git and GitHub',
    ],
  },
  {
    company: 'Kalbis University',
    role: 'Web Development Intern',
    period: 'Jul 2022 – Sep 2022',
    type: 'Internship',
    description: 'Career and Alumni Center department.',
    bullets: [
      'Developed a student complaint portal for the Career and Alumni Center using PHP and Laravel',
    ],
  },
]

export const EDUCATION = [
  {
    institution: 'Kalbis Institute',
    degree: 'Bachelor of Computer Science',
    gpa: '3.55 / 4.00',
    period: 'Sep 2019 – Sep 2023',
    notes: [
      'Developed student complaint website for the Career & Alumni Center department (PHP + Laravel)',
      'Developed visitor management system as thesis project with published journal',
    ],
  },
]

export const SKILLS = {
  backend: [
    { name: 'PHP', level: 90, label: 'Advanced' },
    { name: 'Java', level: 85, label: 'Advanced' },
    { name: 'Laravel', level: 88, label: 'Advanced' },
    { name: 'Java Spring Boot', level: 72, label: 'Intermediate' },
    { name: 'Python', level: 70, label: 'Intermediate' },
    { name: 'Node.js', level: 68, label: 'Intermediate' },
  ],
  frontend: [
    { name: 'HTML / CSS', level: 92, label: 'Advanced' },
    { name: 'JavaScript', level: 78, label: 'Intermediate' },
    { name: 'React', level: 75, label: 'Intermediate' },
    { name: 'Bootstrap', level: 85, label: 'Advanced' },
    { name: 'jQuery', level: 74, label: 'Intermediate' },
  ],
  database: [
    { name: 'MySQL', level: 88, label: 'Advanced' },
    { name: 'PostgreSQL', level: 72, label: 'Intermediate' },
    { name: 'Oracle', level: 65, label: 'Intermediate' },
    { name: 'SQLite', level: 75, label: 'Intermediate' },
  ],
  mobile: [
    { name: 'Flutter', level: 70, label: 'Intermediate' },
  ],
  tools: ['Git', 'GitHub', 'MS Excel', 'Data Entry'],
  soft: ['Team Work', 'Time Management', 'Critical Thinking', 'Target Oriented', 'Problem Solving'],
}

export const CERTIFICATIONS = [
  {
    name: 'Certified Secure Computer User v2 (CSCU)',
    issuer: 'EC-Council',
    year: '2021',
  },
  {
    name: 'Certificate of Completion — PHP Bootcamp Batch 332',
    issuer: 'PHP Bootcamp',
    year: '2023',
  },
]
