'use client'

import { useState, useRef } from 'react'

interface AudioPlayerProps {
  src: string
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-20">
      <button
        onClick={togglePlay}
        className="p-2 bg-amber-900/20 hover:bg-amber-900/40 border border-amber-700/30 rounded-full transition-all duration-300 text-amber-50 flex items-center justify-center"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        <span className="text-lg">
          {isPlaying ? '⏸' : '▶'}
        </span>
      </button>
      <audio ref={audioRef} src={src} loop />
    </div>
  )
}
