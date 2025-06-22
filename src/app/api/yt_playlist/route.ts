// src/app/api/yt_playlist/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { FormattedVideo, YouTubeErrorResponse, YouTubePlaylistItem, YouTubePlaylistResponse } from "@/components/Types/youtube-api"

const formatVideo = (item: YouTubePlaylistItem): FormattedVideo => {
  return {
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnail:
      item.snippet.thumbnails.medium?.url ||
      item.snippet.thumbnails.default?.url ||
      "/placeholder.svg?height=100&width=180",
    description: item.snippet.description || "",
  }
}

// Type guard to validate playlist item
const isValidPlaylistItem = (item: YouTubePlaylistItem): boolean => {
  return (!!(
    item.snippet &&
    item.snippet.title &&
    item.snippet.title !== "Deleted video" &&
    item.snippet.title !== "Private video" &&
    item.snippet.resourceId &&
    item.snippet.resourceId.videoId
  ))
}

const isErrorResponse = (data: YouTubePlaylistResponse | YouTubeErrorResponse): data is YouTubeErrorResponse => {
  return "error" in data
}

export async function GET(request: NextRequest) {
    console.log(request.body);
    try {
    const apiKey = process.env.YOUTUBE_API_KEY
    const playlistId = process.env.NEXT_PUBLIC_YT_PLAYLIST_ID

    if (!apiKey) {
        return NextResponse.json(
        { error: "YouTube API key not configured" },
        { status: 500 }
        )
    }

    if (!playlistId) {
        return NextResponse.json(
        { error: "YouTube playlist ID not configured" },
        { status: 500 }
        )
    }

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?` +
        `part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}`
    )

    if (!response.ok) {
        const errorData = await response.json()
        return NextResponse.json(
        { error: errorData.error?.message || "Failed to fetch from YouTube API" },
        { status: response.status }
        )
    }

    const data: YouTubePlaylistResponse | YouTubeErrorResponse = await response.json()

    console.log(typeof data)

    if (isErrorResponse(data)) {
        return NextResponse.json(
        { error: data.error.message || "Failed to fetch from YouTube API" },
        { status: 400 }
        )
    }

    // Filter out deleted/private videos
    const validItems: YouTubePlaylistItem[] = data.items.filter(isValidPlaylistItem)

    if (validItems.length === 0) {
        return NextResponse.json(
        { error: "No valid videos found in this playlist" },
        { status: 404 }
        )
    }

    // Format videos with proper typing
    const formattedVideos: FormattedVideo[] = validItems.map(formatVideo)

    return NextResponse.json({
        videos: formattedVideos,
        totalCount: formattedVideos.length
    })

    } catch (error) {
    console.error('YouTube playlist error:', error)
    return NextResponse.json(
        { error: error instanceof Error ? error.message : "Internal server error" },
        { status: 500 }
    )
    }
}