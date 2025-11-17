"use client";
import React, { useState, useCallback } from "react";
import ModalVideo from "../common/ModalVideo";

type Property = {
  id: number;
  imgSrc: string;
  videolike?: string;
};

// Helper function to extract YouTube ID from URL or return the ID as-is
const getYouTubeId = (url: string): string => {
  if (!url) return "";
  
  // If it's already just an ID (no URL), return it
  if (!url.includes("youtube.com") && !url.includes("youtu.be") && !url.includes("http")) {
    return url;
  }
  
  // Extract from youtube.com/watch?v=...
  const match1 = url.match(/[?&]v=([^&]+)/);
  if (match1) return match1[1];
  
  // Extract from youtu.be/...
  const match2 = url.match(/youtu\.be\/([^?]+)/);
  if (match2) return match2[1];
  
  // Extract from embed URLs
  const match3 = url.match(/youtube\.com\/embed\/([^?]+)/);
  if (match3) return match3[1];
  
  return "";
};

// Get YouTube thumbnail URL
const getYouTubeThumbnail = (videoId: string): string => {
  if (!videoId) return "";
  // Use maxresdefault for highest quality, fallback to hqdefault if not available
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export default function Video({ property }: { property: Property }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleVideoClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Extract video ID from URL
  const videoId = getYouTubeId(property.videolike || "") || "XHOmBV4js_E";
  const thumbnailUrl = getYouTubeThumbnail(videoId);

  return (
    <>
      <h5 className="properties-title mb_20 text-2xl lg:text-3xl font-bold">
        فيديو
      </h5>

      {/* Container with thumbnail background */}
      <div
        className="widget-video"
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "12px",
          backgroundColor: "#000",
          backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dark overlay for better play button visibility */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            transition: "background-color 0.3s ease",
          }}
          className="hover:bg-black/50"
        />

        {/* ▶ Play Button */}
        <div
          onClick={handleVideoClick}
          className="btn-video popup-youtube"
          aria-label="Play Video"
          style={{
            cursor: "pointer",
            width: "90px",
            height: "90px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(4px)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            transition: "transform 0.3s ease, background 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.1)";
            e.currentTarget.style.background = "rgba(255,255,255,1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
            e.currentTarget.style.background = "rgba(255,255,255,0.9)";
          }}
        >
          <img
            src="/assets/icons/play.svg"
            alt="play"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>

      {/* Modal Video */}
      <ModalVideo
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        videoId={videoId}
      />
    </>
  );
}