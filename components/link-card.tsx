'use client'

interface LinkCardProps {
  link: {
    id: string
    title: string
    url: string
    icon?: string
  }
}

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full p-4 bg-gradient-to-r from-black to-zinc-900 border border-amber-900/30 rounded-lg hover:border-amber-700/50 hover:from-zinc-950 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        {link.icon && <span className="text-xl">{link.icon}</span>}
        <span className="text-foreground group-hover:text-amber-50 transition-colors font-light">
          {link.title}
        </span>
        <span className="ml-auto text-amber-700/50 group-hover:text-amber-500 transition-colors text-sm">→</span>
      </div>
    </a>
  )
}
