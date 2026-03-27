import './globals.css'

export const metadata = {
  title: 'Matthew Christian Cahyadi — Frontend Developer',
  description: 'Portfolio of Matthew Christian Cahyadi — Frontend Developer & Software Engineer based in Jakarta, Indonesia.',
  keywords: ['frontend developer', 'software engineer', 'Jakarta', 'PHP', 'Java', 'Laravel', 'React'],
  authors: [{ name: 'Matthew Christian Cahyadi' }],
  openGraph: {
    title: 'Matthew Christian Cahyadi — Frontend Developer',
    description: 'Frontend Developer & Software Engineer based in Jakarta, Indonesia.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem('theme') || 'dark';
              document.documentElement.setAttribute('data-theme', theme);
            })();
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
