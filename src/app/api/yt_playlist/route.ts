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
export const getServerSideProps = async () => {

    
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?` +
    `part=snippet&playlistId=${process.env.NEXT_PUBLIC_YT_PLAYLIST_ID}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`,
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || "Failed to fetch from YouTube API")
      }

      const data: YouTubePlaylistResponse | YouTubeErrorResponse  = await response.json()
      // console.log("DATA:", data.items[0]?.snippet.title, "TYPE OF:", typeof data.items[0]?.snippet)console.log(data);
      console.log(typeof data);

      if (isErrorResponse(data)) {
        throw new Error(data.error.message || "Failed to fetch from YouTube API")
      }

      // Filter out deleted/private videos
      const validItems: YouTubePlaylistItem[] = data.items.filter(isValidPlaylistItem);

      if (validItems.length === 0) {
        throw new Error("No valid videos found in this playlist")
      }

      // Format videos with proper typing
      const formattedVideos: FormattedVideo[] = validItems.map(formatVideo)

      return formattedVideos
  }