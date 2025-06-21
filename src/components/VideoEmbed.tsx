
import { useState } from "react"

interface VideoEmbedProps{
    videoId: string,
    title?: string,
    width?: string | number,
    height?: string | number,
    autoPlay?: boolean,
    className?: string
}

export default function VideoEmbed(
    {
    videoId,
    title = "Embed video",
    width = "100%",
    height = "auto",
    autoPlay = false,
    className = "",
}: VideoEmbedProps
){
    const [isLoading, setIsLoading] = useState(true);
    const [error] = useState<string | null>(null);

    const getEmbedUrl = () => {
        return `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}`
    }

    const embedUrl = getEmbedUrl();

    const aspectRatio = typeof height === "string" && height === "auto" ? "56.25%" : "auto"

    const handleIframeLoad = () => { setIsLoading(false) }

    return(
        <div
            className={`video-embed-container ${className}`}
            style={{
                width,
                position: "relative",
                paddingTop: aspectRatio,
            }}
        >
            {error ? (
                <div className="video-error">
                    <p>Error: {error}</p>
                </div>):
                (<>
                {isLoading && (
                    <div
                    className="video-loading absolute top-0 left-0 w-[100%] h-[100%] flex justify-center items-center bg-[#f0f0f0]"
                    >
                    Loading video...
                    </div>
                )}

                <iframe
                    src={embedUrl}
                    title={title}
                    width={typeof width === "number" ? width : "100%"}
                    height={typeof height === "number" ? height : "100%"}
                    style={{
                        position: aspectRatio !== "auto" ? "absolute" : "relative",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: aspectRatio !== "auto" ? "100%" : height,
                        border: "none",
                    }}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                    onLoad={handleIframeLoad}
                />
                </>)
            }
        </div>
    );
}