"use client"

import { LocalTrack } from "./Types/localTrack"
import { localTracks } from "./Data/localTrackList"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Pause,
  Heart,
  Share2,
  ExternalLink,
  Loader2,
  Grid,
  Music,
  X,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react"



// Local tracks configuration - Add your tracks here


function formatDuration(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}


interface AudioPlayerState {
  currentTrack: LocalTrack | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  isLoading: boolean
}

interface TrackCardProps {
  track: LocalTrack
  size: "small" | "medium" | "large"
  showWaveform: boolean
  showStats: boolean
  isCurrentTrack: boolean
  isPlaying: boolean
  onPlay: (track: LocalTrack) => void
}

function TrackCard({ track, size, showWaveform, showStats, isCurrentTrack, isPlaying, onPlay }: TrackCardProps) {
  const [audioLoading, setAudioLoading] = useState(false);

  const handlePlayClick = () => {
    setAudioLoading(true)
    onPlay(track)
    setTimeout(() => setAudioLoading(false), 500)
  }

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
    <>
    <Card
      className={`${cardSizes[size]} hidden md:flex hover:shadow-lg transition-all rounded-sm duration-200 pt-0 group ${isCurrentTrack ? "ring-2 ring-bg-secondary" : ""}`}
    >
      {/* Artwork Section */}
      <div className={`relative ${artworkSizes[size]} overflow-hidden`}>
        <img
          src={track.artworkUrl || "/placeholder.svg?height=200&width=200"}
          alt={`${track.title} artwork`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 rounded-t-sm"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Button
            size="lg"
            className="rounded-full bg-bg-secondary hover:bg-bg-secondary-hover hover:cursor-pointer text-white shadow-lg"
            onClick={handlePlayClick}
            disabled={audioLoading}
          >
            {audioLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : isCurrentTrack && isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </Button>
        </div>

        {/* album Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-white/90 text-xs">
            {track.album}
          </Badge>
        </div>

        {/* Duration */}
        <div className="absolute bottom-2 right-2">
          <Badge className="bg-black/70 text-white text-xs">{formatDuration(track.duration)}</Badge>
        </div>

        {/* Playing Indicator */}
        {isCurrentTrack && isPlaying && (
          <div className="absolute top-2 right-2">
            <div className="flex items-center gap-1">
              <div className="w-1 h-3 bg-bg-secondary animate-pulse"></div>
              <div className="w-1 h-2 bg-bg-secondary animate-pulse" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-1 h-4 bg-bg-secondary animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        )}
      </div>

      <CardContent className="px-3 space-y-2">
        {/* Track Info */}
        <div>
          <h3 className="font-semibold text-sm truncate group-hover:text-bg-secondary transition-colors">
            {track.title}
          </h3>
          {/* <p className="text-xs text-gray-600 truncate">{track.artist}</p> */}
          {track.album && <p className="text-xs text-gray-500 truncate">{track.album}</p>}
        </div>

        {/* Tags */}
        {/* {track.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {track.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        )} */}

        {/* Waveform Placeholder */}
        {showWaveform && (
          <div className="h-8 bg-gray-100 rounded flex items-center justify-center">
            <div className="flex items-center gap-1 h-6">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="w-1 bg-gray-400 rounded" style={{ height: `${Math.random() * 100 + 20}%` }} />
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        {showStats && (
          <div className="flex items-center justify-between text-xs text-gray-500">
            {/* <span>{track.fileSize ? formatFileSize(track.fileSize) : "Unknown size"}</span> */}
            <span>{new Date(track.dateAdded).toLocaleDateString()}</span>
          </div>
        )}

        {/* Action Buttons */}
       
      </CardContent>
    </Card>

    <Card
      className={`flex w-full md:hidden group hover:shadow-md p-3 transition-all duration-200 cursor-pointer ${
        isCurrentTrack ? "ring-2 ring-bg-secondary bg-red-50" : "hover:bg-gray-50"
      }`}
      onClick={() => onPlay(track)}
    >
      <CardContent className="px-3">
        <div className="flex items-center gap-3">
          {/* Artwork */}
          {
            <div className="relative flex-shrink-0">
              <img
                src={track.artworkUrl || "/placeholder.svg?height=40&width=40"}
                alt=""
                className="w-10 h-10 rounded object-cover"
              />
              {isCurrentTrack && isPlaying && (
                <div className="absolute inset-0 bg-black/20 rounded flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-3 bg-white animate-pulse"></div>
                    <div className="w-0.5 h-2 bg-white animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-0.5 h-4 bg-white animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              )}
            </div>
          }

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate text-left leading-tight">{track.title}</h3>
            <p className="text-xs text-gray-600 text-left truncate">{track.album}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs px-1.5 py-0 h-4">
                {track.album}
              </Badge>
              <span className="text-xs text-gray-500">{formatDuration(track.duration)}</span>
            </div>
          </div>

          {/* Play Button */}
          <div className="flex items-center gap-1 flex-shrink-0">
  
            <Button
              size="sm"
              variant={isCurrentTrack ? "default" : "ghost"}
              className="h-8 w-8 p-0 rounded-full"
              onClick={handlePlayClick}
              disabled={audioLoading}
            >
              {audioLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : isCurrentTrack && isPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  )
}

function LocalMusicGrid() {
  const [tracks] = useState<LocalTrack[]>(localTracks);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loadedTracksCount, setLoadedTracksCount] = useState(10);

  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isLoading: false,
  })

  // Display options
  const [cardSize, setCardSize] = useState<"small" | "medium" | "large">("small")
  const [showWaveform, setShowWaveform] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [filterAlbum, setFilterAlbum] = useState("all")
  const [sortBy, setSortBy] = useState<"dateAdded" | "title" | "album" | "duration">("dateAdded")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter and sort tracks
  const processedTracks = tracks
    .filter((track) => {
      const matchesalbum = filterAlbum === "all" || track.album.toLowerCase() === filterAlbum.toLowerCase()
      const matchesSearch =
        searchQuery === "" ||
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) 
        // ||
        // track.artist.toLowerCase().includes(searchQuery.toLowerCase()) 
        // ||
        // track.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesalbum && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "album":
          return a.album.localeCompare(b.album)
        case "duration":
          return b.duration - a.duration
        case "dateAdded":
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      }
    })

  const handleLoadTracks = () => {
    let moreTracks = loadedTracksCount + 6;
    if (moreTracks > processedTracks.length) moreTracks = processedTracks.length;
    setLoadedTracksCount(moreTracks);
  }

  const handleUnloadTracks = () => {
    if (processedTracks.length > 10) setLoadedTracksCount(10);
  }

  const albums = ["all", ...Array.from(new Set(tracks.map((track) => track.album)))]

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadStart = () => {
      setPlayerState((prev) => ({ ...prev, isLoading: true }))
    }

    const handleCanPlay = () => {
      setPlayerState((prev) => ({ ...prev, isLoading: false, duration: audio.duration }))
    }

    const handleTimeUpdate = () => {
      setPlayerState((prev) => ({ ...prev, currentTime: audio.currentTime }))
    }

    const handlePlay = () => {
      setPlayerState((prev) => ({ ...prev, isPlaying: true }))
    }

    const handlePause = () => {
      setPlayerState((prev) => ({ ...prev, isPlaying: false }))
    }

    const handleEnded = () => {
      setPlayerState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }))
      // Auto-play next track
      playNextTrack()
    }

    const handleError = (e: Event) => {
      console.error("Audio error:", e)
      setPlayerState((prev) => ({ ...prev, isPlaying: false, isLoading: false }))
    }

    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  const playTrack = useCallback(
    async (track: LocalTrack) => {
      const audio = audioRef.current
      if (!audio) return

      try {
        // If same track is playing, toggle pause
        if (playerState.currentTrack?.id === track.id && playerState.isPlaying) {
          audio.pause()
          return
        }

        // Load new track
        setPlayerState((prev) => ({ ...prev, currentTrack: track, isLoading: true }))
        audio.src = track.audioUrl
        audio.volume = playerState.isMuted ? 0 : playerState.volume

        await audio.play()
      } catch (error) {
        console.error("Failed to play track:", error)
        setPlayerState((prev) => ({ ...prev, isLoading: false }))
      }
    },
    [playerState.currentTrack, playerState.isPlaying, playerState.volume, playerState.isMuted],
  )

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio || !playerState.currentTrack) return

    if (playerState.isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
  }

  const playNextTrack = () => {
    if (!playerState.currentTrack) return

    const currentIndex = processedTracks.findIndex((track) => track.id === playerState.currentTrack!.id)
    const nextIndex = (currentIndex + 1) % processedTracks.length
    playTrack(processedTracks[nextIndex])
  }

  const playPreviousTrack = () => {
    if (!playerState.currentTrack) return

    const currentIndex = processedTracks.findIndex((track) => track.id === playerState.currentTrack!.id)
    const prevIndex = currentIndex === 0 ? processedTracks.length - 1 : currentIndex - 1
    playTrack(processedTracks[prevIndex])
  }

  const seekTo = (time: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = time
  }

  const setVolume = (volume: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    setPlayerState((prev) => ({ ...prev, volume, isMuted: false }))
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    const newMuted = !playerState.isMuted
    audio.volume = newMuted ? 0 : playerState.volume
    setPlayerState((prev) => ({ ...prev, isMuted: newMuted }))
  }

  return (
    <div className="max-w-7xl w-full mx-0 md:mx-auto p-4 md:p-6 space-y-6">
      
            {/* Hidden audio element */}
            <audio ref={audioRef} preload="metadata" />

{/* Controls */}
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Music className="h-5 w-5" />
      Library Settings
    </CardTitle>
    {/* <CardDescription>Configure your music library display and playback options</CardDescription> */}
  </CardHeader>
  <CardContent className="space-y-6">
    {/* Search */}
    {/* <div className="space-y-2">
      <Label htmlFor="search">Search Music</Label>
      <Input
        id="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title, artist, or tags..."
      />
    </div> */}

    {/* Display options */}
    <div className="grid md:grid-cols-4 gap-4">
      {/* <div className="space-y-2">
        <Label>Card Size</Label>
        <Select value={cardSize} onValueChange={(value: "small" | "medium" | "large") => setCardSize(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      <div className="space-y-2">
        <Label>Filter by album</Label>
        <Select value={filterAlbum} onValueChange={setFilterAlbum}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {albums.map((album) => (
              <SelectItem key={album} value={album}>
                {album === "all" ? "All albums" : album}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Sort by</Label>
        <Select
          value={sortBy}
          onValueChange={(value: "dateAdded" | "title" | "album" | "duration") => setSortBy(value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dateAdded">Date Added</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="album">Album</SelectItem>
            <SelectItem value="duration">Duration</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 hidden md:flex flex-col">
        <Label>Display Options</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="waveform" checked={showWaveform} onCheckedChange={setShowWaveform} />
            <Label htmlFor="waveform" className="text-sm">
              Waveform
            </Label>
          </div>
          {/* <div className="flex items-center space-x-2">
            <Switch id="stats" checked={showStats} onCheckedChange={setShowStats} />
            <Label htmlFor="stats" className="text-sm">
              Stats
            </Label>
          </div> */}
        </div>
      </div>
    </div>
  </CardContent>
</Card>

      {/* Tracks Grid */}
      <div
        className={`flex md:grid gap-2 ${
          cardSize === "small"
            ? "flex-col w-full md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  transition"
            : cardSize === "medium"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {processedTracks.slice(0,loadedTracksCount).map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            size={cardSize}
            showWaveform={showWaveform}
            showStats={showStats}
            isCurrentTrack={playerState.currentTrack?.id === track.id}
            isPlaying={playerState.isPlaying}
            onPlay={playTrack}
          />
        ))}
      </div>
      
      <Button 
        onClick={ handleLoadTracks }
        className={ loadedTracksCount === processedTracks.length ? "hidden" : "rounded-[2px] bg-bg-secondary w-min cursor-pointer hover:bg-bg-secondary-hover mt-[20px]" }
        // style={}
      > MORE </Button>

      <Button 
        onClick={ handleUnloadTracks }
        className={ loadedTracksCount === processedTracks.length ? "rounded-[2px] bg-bg-secondary w-min cursor-pointer hover:bg-bg-secondary-hover mt-[20px]" : "hidden" }
        // style={}
      > HIDE </Button>

      {processedTracks.length === 0 && (
        <div className="text-center py-12">
          <Grid className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">No tracks found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}


      {/* Global Player */}
      {playerState.currentTrack && (
        <Card className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto shadow-lg border-2  border-bg-secondary bg-white z-15">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              {/* Track Info */}
              <img
                src={playerState.currentTrack.artworkUrl || "/placeholder.svg?height=50&width=50"}
                alt={playerState.currentTrack.title}
                className="w-12 h-12 rounded object-cover"
              />

              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{playerState.currentTrack.title}</div>
                {/* <div className="text-xs text-gray-600 truncate">{playerState.currentTrack.artist}</div> */}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={playPreviousTrack} className="h-8 w-8 p-0 hover:cursor-pointer">
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={togglePlayPause}
                  className="rounded-full h-10 w-10 p-0 hover:cursor-pointer"
                  disabled={playerState.isLoading}
                >
                  {playerState.isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : playerState.isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </Button>

                <Button size="sm" variant="ghost" onClick={playNextTrack} className="h-8 w-8 p-0 hover:cursor-pointer">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 min-w-0">
                <Button size="sm" variant="ghost" onClick={toggleMute} className="h-8 w-8 p-0">
                  {playerState.isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={[playerState.isMuted ? 0 : playerState.volume * 100]}
                  onValueChange={(value) => setVolume(value[0] / 100)}
                  max={100}
                  step={1}
                  className="w-20"
                />
              </div>

              {/* Close */}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  audioRef.current?.pause()
                  setPlayerState((prev) => ({ ...prev, currentTrack: null, isPlaying: false }))
                }}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 space-y-1">
              <Slider
                value={[playerState.currentTime]}
                onValueChange={(value) => seekTo(value[0])}
                max={playerState.duration || 100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{formatDuration(playerState.currentTime * 1000)}</span>
                <span>{formatDuration(playerState.duration * 1000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Setup Instructions */}
     
    </div>
  )
}

export default function LocalMusicGridComponent() {
  return <LocalMusicGrid />
}
