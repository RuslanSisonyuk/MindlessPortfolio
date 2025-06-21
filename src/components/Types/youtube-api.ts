// YouTube API response types
export interface YouTubeThumbnail {
    url: string
    width: number
    height: number
  }
  
  export interface YouTubeThumbnails {
    default?: YouTubeThumbnail
    medium?: YouTubeThumbnail
    high?: YouTubeThumbnail
    standard?: YouTubeThumbnail
    maxres?: YouTubeThumbnail
  }
  
  export interface YouTubeResourceId {
    kind: string
    videoId: string
  }
  
  export interface YouTubeSnippet {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: YouTubeThumbnails
    channelTitle: string
    playlistId: string
    position: number
    resourceId: YouTubeResourceId
    videoOwnerChannelTitle?: string
    videoOwnerChannelId?: string
  }
  
  export interface YouTubePlaylistItem {
    kind: string
    etag: string
    id: string
    snippet: YouTubeSnippet
  }
  
  export interface YouTubePlaylistResponse {
    kind: string
    etag: string
    nextPageToken?: string
    prevPageToken?: string
    pageInfo: {
      totalResults: number
      resultsPerPage: number
    }
    items: YouTubePlaylistItem[]
  }
  
  export interface YouTubeErrorDetail {
    message: string
    domain: string
    reason: string
  }
  
  export interface YouTubeError {
    code: number
    message: string
    errors: YouTubeErrorDetail[]
  }
  
  export interface YouTubeErrorResponse {
    error: YouTubeError
  }
  
  // Your app's video type
  export interface FormattedVideo {
    id: string
    title: string
    thumbnail: string
    description: string
  }
  