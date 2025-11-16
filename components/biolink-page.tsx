'use client'

import { useState, useEffect } from 'react'
import TypewriterBio from './typewriter-bio'
import LinkCard from './link-card'
import AudioPlayer from './audio-player'

interface Link {
  id: string
  title: string
  url: string
  icon?: string
}

export default function BiolinkPage() {
  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'Roblox',
      url: 'https://www.roblox.com',
      icon: '🎮'
    }
  ])
  
  const [backgroundVideo, setBackgroundVideo] = useState<string | null>(null)
  const [music, setMusic] = useState<string | null>(null)
  const [profilePic, setProfilePic] = useState<string | null>(null)

  useEffect(() => {
    // Load from localStorage
    const savedLinks = localStorage.getItem('biolinks')
    const savedBg = localStorage.getItem('backgroundVideo')
    const savedMusic = localStorage.getItem('music')
    const savedPfp = localStorage.getItem('profilePic')
    
    if (savedLinks) setLinks(JSON.parse(savedLinks))
    if (savedBg) setBackgroundVideo(savedBg)
    if (savedMusic) setMusic(savedMusic)
    if (savedPfp) setProfilePic(savedPfp)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      {backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          src={backgroundVideo}
        />
      )}

      {/* Audio Player */}
      {music && <AudioPlayer src={music} />}

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Profile Header */}
          <div className="text-center mb-12">
            {profilePic && (
              <div className="mb-6 flex justify-center">
                <img
                  src={profilePic || "/placeholder.svg"}
                  alt="profile"
                  className="w-24 h-24 rounded-full border-2 border-amber-600/50 object-cover"
                />
              </div>
            )}
            <h1 className="text-4xl font-bold text-white mb-2">1</h1>
            <p className="text-amber-50 text-sm">@1</p>
          </div>

          {/* Typewriter Bio */}
          <div className="mb-8 text-center">
            <TypewriterBio
              phrases={[
                "fuck yall yn's",
                "stalking me? that's hot"
              ]}
              speed={80}
            />
          </div>

          {/* Links Container */}
          <div className="space-y-3 mb-8">
            {links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>

          {/* Admin Hint */}
          <div className="text-center text-xs text-muted-foreground">
            <a href="?admin=true" className="hover:text-foreground transition-colors">
              manage
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
