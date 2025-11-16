'use client'

import { useState, useEffect } from 'react'

interface Link {
  id: string
  title: string
  url: string
  icon?: string
}

export default function AdminDashboard() {
  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'Roblox',
      url: 'https://www.roblox.com',
      icon: '🎮'
    }
  ])
  const [backgroundVideo, setBackgroundVideo] = useState('')
  const [music, setMusic] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [newLink, setNewLink] = useState({ title: '', url: '', icon: '' })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const savedLinks = localStorage.getItem('biolinks')
    const savedBg = localStorage.getItem('backgroundVideo')
    const savedMusic = localStorage.getItem('music')
    const savedPfp = localStorage.getItem('profilePic')
    
    if (savedLinks) setLinks(JSON.parse(savedLinks))
    if (savedBg) setBackgroundVideo(savedBg)
    if (savedMusic) setMusic(savedMusic)
    if (savedPfp) setProfilePic(savedPfp)
  }, [])

  const saveToStorage = (updatedLinks: Link[], bg?: string, mus?: string, pfp?: string) => {
    localStorage.setItem('biolinks', JSON.stringify(updatedLinks))
    if (bg !== undefined) localStorage.setItem('backgroundVideo', bg)
    if (mus !== undefined) localStorage.setItem('music', mus)
    if (pfp !== undefined) localStorage.setItem('profilePic', pfp)
  }

  const addLink = () => {
    if (newLink.title && newLink.url) {
      const updatedLinks = [...links, { ...newLink, id: Date.now().toString() }]
      setLinks(updatedLinks)
      saveToStorage(updatedLinks)
      setNewLink({ title: '', url: '', icon: '' })
    }
  }

  const updateLink = (id: string, updatedLink: Partial<Link>) => {
    const updatedLinks = links.map(link => link.id === id ? { ...link, ...updatedLink } : link)
    setLinks(updatedLinks)
    saveToStorage(updatedLinks)
  }

  const deleteLink = (id: string) => {
    const updatedLinks = links.filter(link => link.id !== id)
    setLinks(updatedLinks)
    saveToStorage(updatedLinks)
  }

  const handleFileUpload = (type: 'video' | 'audio' | 'pfp', file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const url = e.target?.result as string
      if (type === 'video') {
        setBackgroundVideo(url)
        saveToStorage(links, url)
      } else if (type === 'audio') {
        setMusic(url)
        saveToStorage(links, undefined, url)
      } else if (type === 'pfp') {
        setProfilePic(url)
        saveToStorage(links, undefined, undefined, url)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-black p-8 text-foreground">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Media Upload Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Media</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('pfp', e.target.files[0])}
                className="w-full p-2 bg-background border border-border rounded text-sm"
              />
              {profilePic && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={profilePic || "/placeholder.svg"}
                    alt="preview"
                    className="w-16 h-16 rounded-full object-cover border border-border"
                  />
                  <p className="text-xs text-muted-foreground">✓ Profile picture loaded</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2">Background Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('video', e.target.files[0])}
                className="w-full p-2 bg-background border border-border rounded text-sm"
              />
              {backgroundVideo && <p className="text-xs text-muted-foreground mt-1">✓ Video loaded</p>}
            </div>

            <div>
              <label className="block text-sm mb-2">Background Music</label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('audio', e.target.files[0])}
                className="w-full p-2 bg-background border border-border rounded text-sm"
              />
              {music && <p className="text-xs text-muted-foreground mt-1">✓ Audio loaded</p>}
            </div>
          </div>
        </div>

        {/* Links Management */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Links</h2>

          <div className="space-y-3 mb-6">
            {links.map((link) => (
              <div key={link.id} className="flex gap-2 items-center bg-background p-3 rounded border border-border">
                <input
                  type="text"
                  value={link.icon || ''}
                  onChange={(e) => updateLink(link.id, { icon: e.target.value })}
                  placeholder="Icon"
                  className="w-12 p-2 bg-foreground/10 border border-border rounded text-sm"
                />
                <input
                  type="text"
                  value={link.title}
                  onChange={(e) => updateLink(link.id, { title: e.target.value })}
                  placeholder="Title"
                  className="flex-1 p-2 bg-foreground/10 border border-border rounded text-sm"
                />
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => updateLink(link.id, { url: e.target.value })}
                  placeholder="URL"
                  className="flex-1 p-2 bg-foreground/10 border border-border rounded text-sm"
                />
                <button
                  onClick={() => deleteLink(link.id)}
                  className="px-3 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-700/30 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newLink.icon}
              onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
              placeholder="Icon"
              className="w-12 p-2 bg-background border border-border rounded text-sm"
            />
            <input
              type="text"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              placeholder="Title"
              className="flex-1 p-2 bg-background border border-border rounded text-sm"
            />
            <input
              type="text"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              placeholder="URL"
              className="flex-1 p-2 bg-background border border-border rounded text-sm"
            />
            <button
              onClick={addLink}
              className="px-6 py-2 bg-accent text-accent-foreground rounded font-medium hover:opacity-90 transition-opacity"
            >
              Add
            </button>
          </div>
        </div>

        {/* Back Button */}
        <a
          href="/"
          className="inline-block px-4 py-2 bg-muted text-muted-foreground rounded hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          ← Back to Biolink
        </a>
      </div>
    </div>
  )
}
