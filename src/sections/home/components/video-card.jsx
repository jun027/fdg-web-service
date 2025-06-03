import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

function VideoCard({ title, videoId }) {
  return (
    <div className="space-y-3">
      <p className="mobile-regular-h3 md:text-center">{title}</p>
      <LiteYouTubeEmbed id={videoId} title={title} noCookie={true} poster="maxresdefault" />
    </div>
  )
}

export default VideoCard
