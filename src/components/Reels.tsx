import { Suspense, useEffect, useState } from "react";
import VideoEmbed from "./VideoEmbed";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";


export default function Reels(){

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState({
    id: "",
    title: "Rick Astley - Never Gonna Give You Up",
  })

  // const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]); 
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(false)
  const [playlistError, setPlaylistError] = useState<string | null>(null)

  const defaultPlaylistId = "PLkxXQ3ugQK2PEUO9a2_FZMmXGXy83P4XN";
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  
  // Function to load YouTube playlist
  const fetchPlaylistVideos = async (id: string) => {
    if (!id) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?` +
          `part=snippet&playlistId=${id}&maxResults=50&key=${apiKey}`,
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

      const formattedVideos = validItems.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium?.url || "/placeholder.svg?height=100&width=180",
        description: item.snippet.description,
      }))

      setVideos(formattedVideos)

      // Set the first video as selected
      if (formattedVideos.length > 0) {
        setSelectedVideo(formattedVideos[0])
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load playlist")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (defaultPlaylistId) {
      fetchPlaylistVideos(defaultPlaylistId)
    }
  }, [defaultPlaylistId])

  const handleLoadPlaylist = () => {
    fetchPlaylistVideos(defaultPlaylistId)
  }

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
                <CarouselItem className="md:basis-1/2 lg:basis-1/4 py-5">
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