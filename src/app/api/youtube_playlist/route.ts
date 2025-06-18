import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const playlistId = searchParams.get("playlistId")

  if (!playlistId) {
    return NextResponse.json({ error: "Playlist ID is required" }, { status: 400 })
  }

  const apiKey = ""

  if (!apiKey) {
    return NextResponse.json({ error: "YouTube API key not configured" }, { status: 500 })
  }

  try {
    // Fetch playlist items from YouTube Data API v3
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?` +
        `part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}`,
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to fetch from YouTube API")
    }

    const data = await response.json()

    // Filter out deleted/private videos
    const validItems = data.items.filter(
      (item: any) => item.snippet.title !== "Deleted video" && item.snippet.title !== "Private video",
    )

    return NextResponse.json({
      ...data,
      items: validItems,
    })
  } catch (error) {
    console.error("YouTube API Error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch playlist data",
      },
      { status: 500 },
    )
  }
}
