"use client";

export function VideoSection() {
  const videoId = "t2sB0m-qZ3M";
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <section className="py-12 md:py-16 bg-black">
      <div className="container-wide">
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 mx-auto max-w-full">
          <iframe
            src={embedUrl}
            title="Great Aussie Caravans Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

