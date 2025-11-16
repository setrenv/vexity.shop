'use client'

import { useState, useEffect } from 'react'

interface TypewriterBioProps {
  phrases: string[]
  speed?: number
}

export default function TypewriterBio({ phrases, speed = 80 }: TypewriterBioProps) {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      // Typing phase
      if (charIndex < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, speed)
      } else {
        // Wait before starting to delete
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
      }
    } else {
      // Deleting phase
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, speed / 2)
      } else {
        // Move to next phrase
        setIsDeleting(false)
        setPhraseIndex((phraseIndex + 1) % phrases.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [charIndex, phraseIndex, isDeleting, phrases, speed])

  return (
    <div className="h-8 flex items-center justify-center">
      <span className="text-amber-50 text-base font-light inline-block">
        {displayText}
        <span className="animate-pulse ml-0.5">|</span>
      </span>
    </div>
  )
}
