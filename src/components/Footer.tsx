import { Heart, Mail } from "lucide-react"
import { SITE } from "../data/config"
import { GithubIcon, LinkedinIcon } from "./icons"

const SOCIALS = [
  { label: "GitHub", href: SITE.github, icon: GithubIcon },
  { label: "LinkedIn", href: SITE.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${SITE.email}`, icon: Mail },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="wrap flex flex-col items-center gap-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg font-semibold text-mist-100">
            {SITE.name}
            <span className="text-accent-400">.</span>
          </p>
          <p className="mt-1 text-xs text-mist-500">{SITE.location}</p>
        </div>

        <ul className="flex items-center gap-2">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-lg border border-line text-mist-400 transition-colors hover:border-accent-400/60 hover:text-accent-300"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className="text-xs text-mist-500">
          <p>
            Built with React, TypeScript &amp; Framer Motion
            <Heart className="ml-1 inline size-3 text-accent-400" aria-hidden="true" />
          </p>
          <p className="mt-1">© {year} {SITE.name} — QA Engineer</p>
        </div>
      </div>
    </footer>
  )
}