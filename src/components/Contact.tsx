import { useState, type ComponentType } from "react"
import { Check, Copy, Mail } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { SITE } from "../data/config"
import { GithubIcon, LinkedinIcon } from "./icons"

const CONTACT_LINKS: {
  label: string
  value: string
  href: string
  icon: ComponentType<{ className?: string }>
}[] = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, icon: Mail },
  { label: "LinkedIn", value: "Connect with me", href: SITE.linkedin, icon: LinkedinIcon },
  { label: "GitHub", value: "View my code", href: SITE.github, icon: GithubIcon },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — email link still works */
    }
  }

  return (
    <section id="contact" className="relative py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(46rem 28rem at 30% 80%, rgba(16,185,129,0.07), transparent 60%)",
        }}
      />
      <div className="wrap relative">
        <SectionHeading eyebrow="Contact" title="Contact" />

        <div className="mx-auto mt-10 w-full max-w-xl">
          <ul className="space-y-3">
            {CONTACT_LINKS.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={label === "Email" ? undefined : "_blank"}
                  rel={label === "Email" ? undefined : "noreferrer"}
                  className="group flex items-center gap-4 rounded-xl border border-line bg-ink-900/50 p-4 transition-colors duration-300 hover:border-accent-400/50 hover:bg-ink-800/60"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-800 text-accent-400 transition-colors group-hover:border-accent-400/50">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-mist-100">{label}</span>
                    <span className="link-underline block w-fit text-xs text-mist-400 group-hover:text-accent-300">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={copyEmail}
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-xs font-medium text-mist-400 transition-colors hover:border-accent-400/50 hover:text-accent-300"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-accent-400" aria-hidden="true" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="size-3.5" aria-hidden="true" />
                Copy email address
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}