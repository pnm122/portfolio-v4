import type { Skill } from "./skills"

export type Project = {
  name: string
  description: string
  homeImgSrc: string
  previewImgSrc: string
  slug: string
  liveSite?: string;
  source?: string;
  skills: Skill[]
}

export const projects: Project[] = [
  {
    name: 'typevs.me',
    description: 'A realtime head-to-head typing competition game.',
    homeImgSrc: 'typing-race.png',
    previewImgSrc: '/images/typing-race/opengraph.png',
    slug: 'typing-race',
    liveSite: 'https://www.typevs.me/',
    source: 'https://github.com/pnm122/type-versus-me',
    skills: ['Next.js', 'Socket.io', 'Prisma ORM', 'Jest', 'Supabase', 'TypeScript', 'SCSS', 'Husky', 'ESLint', 'Prettier', 'GitHub Actions']
  },
  {
    name: 'Spelling Bee',
    description:
      'A replica of the New York Times’ Spelling Bee game with additional features, including hints and leaderboards.',
    homeImgSrc: 'spelling-bee.png',
    previewImgSrc: '/images/spelling-bee/gameplay.png',
    slug: 'spelling-bee',
    liveSite: "https://www.thebetterspellingbee.com",
    source: "https://github.com/pnm122/spelling-bee",
    skills: ['Svelte', 'MongoDB', 'Figma', 'Node.js', 'Express.js', 'TypeScript', 'Python']
  },
  {
    name: 'Chatham Financial',
    description:
      'A collection of projects from my internship at Chatham Financial, primarily focused on improving their design system.',
    homeImgSrc: 'chatham-financial.png',
    previewImgSrc: '/images/chatham-financial/icons.png',
    slug: 'chatham-financial',
    skills: [
      'Stencil',
      'SCSS',
      'Jasmine',
      'Figma',
      'Storybook',
      'GitLab CI',
      'Git',
      'TypeScript',
      'Accessibility'
    ]
  },
  {
    name: 'Club Tennis',
    description:
      'A website created for the Club Tennis team at the University of Pittsburgh, featuring a bespoke design and admin panel made from scratch.',
    homeImgSrc: 'club-tennis.png',
    previewImgSrc: '/images/club-tennis/hero-section.png',
    slug: 'club-tennis',
    liveSite: 'https://clubtennisatpitt.org/',
    source: 'https://github.com/pnm122/pittclubtennis',
    skills: ['React', 'Figma', 'Firebase', 'GSAP', 'TypeScript']
  }
]