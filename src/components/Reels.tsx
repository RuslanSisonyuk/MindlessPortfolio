import { Suspense, useEffect, useState } from "react";
import VideoEmbed from "./VideoEmbed";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { FormattedVideo, YouTubeErrorResponse, YouTubePlaylistItem, YouTubePlaylistResponse,  } from "./Types/youtube-api";


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

  // Function to format a single video item
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

export default function Reels(){

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState({
    id: "",
    title: "Rick Astley - Never Gonna Give You Up",
  })

  // const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]); 
  // const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(false)
  // const [playlistError, setPlaylistError] = useState<string | null>(null)

  const defaultPlaylistId = process.env.NEXT_PUBLIC_YT_PLAYLIST_ID;
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  
  // Function to load YouTube playlist
  const fetchPlaylistVideos = async (id: string) => {
    if (!id) return

    // setIsLoading(true)
    // setError(null)

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?` +
          `part=snippet&playlistId=${id}&maxResults=50&key=${apiKey}`,
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

      setVideos(formattedVideos)

      // Set the first video as selected
      if (formattedVideos.length > 0) {
        setSelectedVideo(formattedVideos[0])
      }
    } catch (error) {
      // setError(error instanceof Error ? error.message : "Failed to load playlist")
      console.log("Error: ", error)
    } finally {
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    if (defaultPlaylistId) {
      fetchPlaylistVideos(defaultPlaylistId)
    }
  }, [defaultPlaylistId])

  // const handleLoadPlaylist = () => {
  //   fetchPlaylistVideos(defaultPlaylistId)
  // }

    return(
        <section id="reels" className='flex flex-col justify-center content-center w-full m-0 p-0'>
          <span className="reels-title relative font-title text-[1.4rem] md:text-[1.6rem] lg:text-[2rem] mb-[25px]">SOUND DESIGN REELS</span>
          <div className="relative mb-[50px]">
            <div className="block absolute top-[-15px] left-[3%] bg-bg-secondary w-[95%] h-[20px]"></div>
            <Suspense fallback={<div className="h-80 bg-slate-200 flex items-center justify-center">Loading video player...</div>}>
                <VideoEmbed 
                  videoId={selectedVideo.id} 
                  className="rounded-[2px] overflow-hidden shadow-lg"
                />
            </Suspense>
            <div className="block absolute bottom-[-15px] left-[3%] bg-bg-secondary w-[95%] h-[20px] z-[-1]"></div>
          </div>
          <Carousel className="w-full max-w-[80%] self-center">
            <CarouselContent>
              {videos.map((video) => {
                return (
                <CarouselItem className="md:basis-1/2 lg:basis-1/4 py-5" key={ video.id }>
                  <div className={video.id === selectedVideo.id ? "flex translate-y-[-10px] transition shadow-xl justify-center" : "flex transition justify-center shadow-md"}>
                    <img src={video.thumbnail} alt={ "select video " + video.title }
                      className="cursor-pointer rounded-[2px] w-full"
                      onClick={() => setSelectedVideo(video)}
                    />
                  </div>
                </CarouselItem>
                )
              })}
              
              
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
    );
}