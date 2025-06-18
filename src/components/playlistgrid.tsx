"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, Heart, Share2, ExternalLink, RefreshCw, Loader2, Grid, Music } from "lucide-react"

interface SoundCloudTrack {
  id: string
  title: string
  user: {
    username: string
    avatar_url: string
  }
  artwork_url: string | null
  duration: number
  genre: string
  tag_list: string
  created_at: string
  playback_count: number
  permalink_url: string
  waveform_url: string
}

interface SoundCloudPlaylist {
  id: string
  title: string
  user: {
    username: string
    avatar_url: string
  }
  tracks: SoundCloudTrack[]
  track_count: number
  created_at: string
  last_modified: string
}

// Mock data for demonstration (replace with real API calls)
const mockTracks: SoundCloudTrack[] = [
  {
    id: "1",
    title: "Ambient Dawn",
    user: { username: "SoundArtist", avatar_url: "/placeholder.svg?height=40&width=40" },
    artwork_url: "/placeholder.svg?height=200&width=200",
    duration: 240000,
    genre: "Ambient",
    tag_list: "chill ambient electronic",
    created_at: "2024-01-15T10:00:00Z",
    playback_count: 1250,
    permalink_url: "https://soundcloud.com/artist/ambient-dawn",
    waveform_url: "/placeholder.svg?height=60&width=200",
  },
  {
    id: "2",
    title: "Urban Beats",
    user: { username: "BeatMaker", avatar_url: "/placeholder.svg?height=40&width=40" },
    artwork_url: "/placeholder.svg?height=200&width=200",
    duration: 180000,
    genre: "Hip Hop",
    tag_list: "hip hop beats urban",
    created_at: "2024-01-14T15:30:00Z",
    playback_count: 2100,
    permalink_url: "https://soundcloud.com/artist/urban-beats",
    waveform_url: "/placeholder.svg?height=60&width=200",
  },
  {
    id: "3",
    title: "Synthwave Nights",
    user: { username: "RetroSynth", avatar_url: "/placeholder.svg?height=40&width=40" },
    artwork_url: "/placeholder.svg?height=200&width=200",
    duration: 320000,
    genre: "Electronic",
    tag_list: "synthwave retro electronic",
    created_at: "2024-01-13T20:15:00Z",
    playback_count: 890,
    permalink_url: "https://soundcloud.com/artist/synthwave-nights",
    waveform_url: "/placeholder.svg?height=60&width=200",
  },
  {
    id: "4",
    title: "Jazz Fusion Experiment",
    user: { username: "JazzCat", avatar_url: "/placeholder.svg?height=40&width=40" },
    artwork_url: "/placeholder.svg?height=200&width=200",
    duration: 420000,
    genre: "Jazz",
    tag_list: "jazz fusion experimental",
    created_at: "2024-01-12T12:45:00Z",
    playback_count: 670,
    permalink_url: "https://soundcloud.com/artist/jazz-fusion",
    waveform_url: "/placeholder.svg?height=60&width=200",
  },
  {
    id: "5",
    title: "Lo-Fi Study Session",
    user: { username: "ChillBeats", avatar_url: "/placeholder.svg?height=40&width=40" },
    artwork_url: "/placeholder.svg?height=200&width=200",
    duration: 180000,
    genre: "Lo-Fi",
    tag_list: "lofi chill study beats",
    created_at: "2024-01-11T09:20:00Z",
    playback_count: 3400,
    permalink_url: "https://soundcloud.com/artist/lofi-study",
    waveform_url: "/placeholder.svg?height=60&width=200",
  },
  {
    id: "6",
    title: "Deep House Groove",
    user: { username: "HouseHead", avatar_url: "/placeholder.svg?height=40&width=40" },
    artwork_url: "/placeholder.svg?height=200&width=200",
    duration: 380000,
    genre: "House",
    tag_list: "deep house electronic dance",
    created_at: "2024-01-10T18:00:00Z",
    playback_count: 1890,
    permalink_url: "https://soundcloud.com/artist/deep-house-groove",
    waveform_url: "/placeholder.svg?height=60&width=200",
  },
]

function formatDuration(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

interface TrackCardProps {
  track: SoundCloudTrack
  size: "small" | "medium" | "large"
  showWaveform: boolean
  showStats: boolean
  currentPlaying: string | null
  onPlay: (trackId: string) => void
}

function TrackCard({ track, size, showWaveform, showStats, currentPlaying, onPlay }: TrackCardProps) {
  const isPlaying = currentPlaying === track.id

  const cardSizes = {
    small: "w-full max-w-sm",
    medium: "w-full max-w-md",
    large: "w-full max-w-lg",
  }

  const artworkSizes = {
    small: "h-32",
    medium: "h-40",
    large: "h-48",
  }

  return (
    <Card className={`${cardSizes[size]} hover:shadow-lg transition-all duration-200 group`}>
      {/* Artwork Section */}
      <div className={`relative ${artworkSizes[size]} overflow-hidden`}>
        <img
          src={track.artwork_url || "/placeholder.svg?height=200&width=200"}
          alt={`${track.title} artwork`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Button
            size="lg"
            className="rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
            onClick={() => onPlay(track.id)}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>
        </div>

        {/* Genre Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-white/90 text-xs">
            {track.genre}
          </Badge>
        </div>

        {/* Duration */}
        <div className="absolute bottom-2 right-2">
          <Badge className="bg-black/70 text-white text-xs">{formatDuration(track.duration)}</Badge>
        </div>
      </div>

      <CardContent className="p-3 space-y-2">
        {/* Track Info */}
        <div>
          <h3 className="font-semibold text-sm truncate group-hover:text-orange-600 transition-colors">
            {track.title}
          </h3>
          <p className="text-xs text-gray-600 truncate">{track.user.username}</p>
        </div>

        {/* Waveform */}
        {showWaveform && (
          <div className="h-8 bg-gray-100 rounded flex items-center justify-center">
            <img
              src={track.waveform_url || "/placeholder.svg"}
              alt="Waveform"
              className="h-6 w-full object-cover opacity-60"
            />
          </div>
        )}

        {/* Stats */}
        

        {/* Action Buttons */}
        
      </CardContent>
    </Card>
  )
}

function SoundCloudPlaylistGrid() {
  const [tracks, setTracks] = useState<SoundCloudTrack[]>(mockTracks)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState([300]) // 5 minutes

  // Display options
  const [playlistUrl, setPlaylistUrl] = useState("https://soundcloud.com/user/sets/playlist-name")
  const [cardSize, setCardSize] = useState<"small" | "medium" | "large">("medium")
  const [showWaveform, setShowWaveform] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [filterGenre, setFilterGenre] = useState("all")
  const [sortBy, setSortBy] = useState<"created" | "plays" | "title">("created")

  // Mock API function (replace with real SoundCloud API call)
  const fetchPlaylistTracks = useCallback(async (url: string): Promise<SoundCloudTrack[]> => {
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In real implementation, you would:
    // 1. Extract playlist ID from URL
    // 2. Call SoundCloud API with your client ID
    // 3. Parse the response and return tracks

    // Mock: Add a new track occasionally to simulate playlist updates
    const shouldAddNewTrack = Math.random() > 0.7
    let newTracks = [...mockTracks]

    if (shouldAddNewTrack) {
      const newTrack: SoundCloudTrack = {
        id: `new-${Date.now()}`,
        title: `New Track ${Math.floor(Math.random() * 100)}`,
        user: { username: "NewArtist", avatar_url: "/placeholder.svg?height=40&width=40" },
        artwork_url: "/placeholder.svg?height=200&width=200",
        duration: 200000 + Math.random() * 200000,
        genre: ["Electronic", "House", "Ambient", "Jazz"][Math.floor(Math.random() * 4)],
        tag_list: "new fresh electronic",
        created_at: new Date().toISOString(),
        playback_count: Math.floor(Math.random() * 1000),
        permalink_url: "https://soundcloud.com/artist/new-track",
        waveform_url: "/placeholder.svg?height=60&width=200",
      }
      newTracks = [newTrack, ...newTracks]
    }

    setLoading(false)
    return newTracks
  }, [])

  const refreshPlaylist = useCallback(async () => {
    try {
      const newTracks = await fetchPlaylistTracks(playlistUrl)
      setTracks(newTracks)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to fetch playlist:", error)
    }
  }, [playlistUrl, fetchPlaylistTracks])

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      refreshPlaylist()
    }, refreshInterval[0] * 1000)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, refreshPlaylist])

  // Filter and sort tracks
  const processedTracks = tracks
    .filter((track) => filterGenre === "all" || track.genre.toLowerCase() === filterGenre.toLowerCase())
    .sort((a, b) => {
      switch (sortBy) {
        case "plays":
          return b.playback_count - a.playback_count
        case "title":
          return a.title.localeCompare(b.title)
        case "created":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

  const genres = ["all", ...Array.from(new Set(tracks.map((track) => track.genre)))]

  const handlePlay = (trackId: string) => {
    setCurrentPlaying(currentPlaying === trackId ? null : trackId)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      
      {/* Controls */}
     

      {/* Playlist Stats */}
      
      {/* Tracks Grid */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading playlist...</span>
        </div>
      )}

      <div
        className={`grid gap-4 ${
          cardSize === "small"
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : cardSize === "medium"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {processedTracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            size={cardSize}
            showWaveform={showWaveform}
            showStats={showStats}
            currentPlaying={currentPlaying}
            onPlay={handlePlay}
          />
        ))}
      </div>

      {processedTracks.length === 0 && !loading && (
        <div className="text-center py-12">
          <Grid className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">No tracks found</h3>
          <p className="text-gray-500">Try adjusting your filters or refresh the playlist</p>
        </div>
      )}

      {/* API Integration Guide */}
      
    </div>
  )
}

export default function Component() {
  return <SoundCloudPlaylistGrid />
}
