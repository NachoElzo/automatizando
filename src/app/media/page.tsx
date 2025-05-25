"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../css/media.css";

const PUBLIC_VIDEO =
  "https://www.w3schools.com/html/mov_bbb.mp4";

const FUNNY_IMAGE =
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&h=400&facepad=2";

export default function MediaPage() {
  const [captcha1, setCaptcha1] = useState<{ a: number; b: number } | null>(null);
  const [captcha1Input, setCaptcha1Input] = useState("");
  const [captcha1Valid, setCaptcha1Valid] = useState(false);

  const [captcha2Input, setCaptcha2Input] = useState("");
  const [captcha2Valid, setCaptcha2Valid] = useState(false);

  const [adWatched, setAdWatched] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const [adTime, setAdTime] = useState(5);
  const [adPlaying, setAdPlaying] = useState(false);

  // Popup error state
  const [popupError, setPopupError] = useState<string | null>(null);

  // Estado para controlar el placeholder de los inputs
  const [captcha1Placeholder, setCaptcha1Placeholder] = useState("Type your answer");
  const [captcha2Placeholder, setCaptcha2Placeholder] = useState("Type the animal (in English or Spanish)");

  useEffect(() => {
    setCaptcha1({ a: randomInt(), b: randomInt() });
  }, []);

  const handleCaptcha1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captcha1) return;
    if (parseInt(captcha1Input) === captcha1.a + captcha1.b) {
      setCaptcha1Valid(true);
      setAdPlaying(true);
      let t = 5;
      setAdTime(t);
      const interval = setInterval(() => {
        t--;
        setAdTime(t);
        if (t <= 0) {
          clearInterval(interval);
          setAdWatched(true);
          setShowVideo(true);
          setAdPlaying(false);
        }
      }, 1000);
    } else {
      setCaptcha1Input("");
      setCaptcha1({ a: randomInt(), b: randomInt() });
      setPopupError("Incorrect! Try again.");
    }
  };

  const handleCaptcha2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      captcha2Input.trim().toLowerCase() === "dog" ||
      captcha2Input.trim().toLowerCase() === "perro"
    ) {
      setCaptcha2Valid(true);
    } else {
      setCaptcha2Input("");
      setPopupError("Try again! (Hint: It's a dog 🐶)");
    }
  };

  return (
    <div className="media-container">
      <h1 className="media-title">MediaLab</h1>
      <div className="media-section">
        <h2 className="media-subtitle">Captcha 1: Solve to unlock the ad</h2>
        <form onSubmit={handleCaptcha1} className="media-form">
          <label className="media-label">
            {captcha1 ? `What is ${captcha1.a} + ${captcha1.b}?` : "Loading..."}
          </label>
          <input
            className="api-input"
            type="number"
            value={captcha1Input}
            placeholder={captcha1Placeholder}
            onFocus={() => setCaptcha1Placeholder("")}
            onBlur={() => !captcha1Input && setCaptcha1Placeholder("Type your answer")}
            onChange={e => setCaptcha1Input(e.target.value)}
            disabled={captcha1Valid || !captcha1}
            required
          />
          <button className="api-btn post" type="submit" disabled={captcha1Valid || !captcha1}>
            {captcha1Valid ? "Unlocked!" : "Verify"}
          </button>
        </form>
      </div>

      {captcha1Valid && !adWatched && (
        <div className="media-advertiser">
          <div className="media-ad-label">Advertiser: Watch this short ad to continue</div>
          <div className="media-ad-box">
            <span role="img" aria-label="megaphone" style={{ fontSize: 32 }}>📢</span>
            <div className="media-ad-timer">
              {adPlaying ? `Ad ends in ${adTime} seconds...` : "Loading..."}
            </div>
          </div>
        </div>
      )}

      {showVideo && (
        <div className="media-section">
          <h2 className="media-subtitle">Main Video</h2>
          <video
            className="media-video"
            src={PUBLIC_VIDEO}
            controls
            width={400}
            poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
          />
        </div>
      )}

      <div className="media-section">
        <h2 className="media-subtitle">Captcha 2: What animal do you see?</h2>
        <Image
          src={FUNNY_IMAGE}
          alt="Funny animal"
          className="media-funny-img"
          width={400}
          height={400}
          style={{ objectFit: "cover", borderRadius: "1rem" }}
          priority
        />
        <form onSubmit={handleCaptcha2} className="media-form">
          <input
            className="api-input"
            type="text"
            placeholder={captcha2Placeholder}
            onFocus={() => setCaptcha2Placeholder("")}
            onBlur={() => !captcha2Input && setCaptcha2Placeholder("Type the animal (in English or Spanish)")}
            value={captcha2Input}
            onChange={e => setCaptcha2Input(e.target.value)}
            disabled={captcha2Valid}
            maxLength={20}
            required
          />
          <button className="api-btn post" type="submit" disabled={captcha2Valid}>
            {captcha2Valid ? "Correct!" : "Verify"}
          </button>
        </form>
        {captcha2Valid && (
          <div className="media-success">Well done! 🐶</div>
        )}
      </div>

      {popupError && (
        <div className="media-popup-overlay">
          <div className="media-popup">
            <div className="media-popup-message">{popupError}</div>
            <button
              className="api-btn post media-popup-btn"
              onClick={() => setPopupError(null)}
              autoFocus
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function randomInt() {
  return Math.floor(Math.random() * 6) + 2; // 2-7
}