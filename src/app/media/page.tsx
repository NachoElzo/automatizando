"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import "../css/media.css";

const PUBLIC_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";
const FUNNY_IMAGE = "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&h=400&facepad=2";

// Images for drag & drop captcha
const CAPTCHA_IMAGES = [
	{
		id: 1,
		src: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=100&h=100&fit=crop",
		name: "🍎 Apple",
	},
	{
		id: 2,
		src: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100&h=100&fit=crop",
		name: "🍌 Banana",
	},
	{
		id: 3,
		src: "https://images.unsplash.com/photo-1547514701-42782101795e?w=100&h=100&fit=crop",
		name: "🍇 Grapes",
	},
	{
		id: 4,
		src: "https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=100&h=100&fit=crop",
		name: "🍊 Orange",
	},
];

const ADS = [
	{ message: "🎮 New Game Available! Download Now!", duration: 8, color: "#6366f1" },
	{ message: "🛍️ 50% OFF Everything! Limited Time!", duration: 6, color: "#f59e0b" },
	{ message: "📱 Upgrade Your Phone Today!", duration: 7, color: "#10b981" },
	{ message: "🍕 Order Pizza - Free Delivery!", duration: 5, color: "#ef4444" },
];

// Video quality options
const VIDEO_QUALITIES = [
	{ label: "Auto", value: "auto", width: "100%", height: "auto" },
	{ label: "1080p", value: "1080p", width: "1920px", height: "1080px" },
	{ label: "720p", value: "720p", width: "1280px", height: "720px" },
	{ label: "480p", value: "480p", width: "854px", height: "480px" },
	{ label: "360p", value: "360p", width: "640px", height: "360px" },
	{ label: "240p", value: "240p", width: "426px", height: "240px" },
];

const PLAYBACK_SPEEDS = [
	{ label: "0.25x", value: 0.25 },
	{ label: "0.5x", value: 0.5 },
	{ label: "0.75x", value: 0.75 },
	{ label: "Normal", value: 1 },
	{ label: "1.25x", value: 1.25 },
	{ label: "1.5x", value: 1.5 },
	{ label: "2x", value: 2 },
];

function randomInt() {
	return Math.floor(Math.random() * 10) + 1;
}

export default function MediaPage() {
	// Video refs
	const mainVideoRef = useRef<HTMLVideoElement>(null);

	// Captcha states
	const [captcha1, setCaptcha1] = useState<{ a: number; b: number } | null>(null);
	const [captcha1Input, setCaptcha1Input] = useState("");
	const [captcha1Valid, setCaptcha1Valid] = useState(false);

	const [captcha2Input, setCaptcha2Input] = useState("");
	const [captcha2Valid, setCaptcha2Valid] = useState(false);

	const [captcha3Valid, setCaptcha3Valid] = useState(false);
	const [draggedItem, setDraggedItem] = useState<number | null>(null);
	const [correctOrder] = useState([1, 2, 3, 4]);
	const [userOrder, setUserOrder] = useState<(number | undefined)[]>(new Array(4).fill(undefined));
	const [shuffledImages, setShuffledImages] = useState(CAPTCHA_IMAGES);

	// Ad system (for initial captchas)
	const [currentAd, setCurrentAd] = useState(0);
	const [adWatched, setAdWatched] = useState(0);
	const [adTime, setAdTime] = useState(0);
	const [adPlaying, setAdPlaying] = useState(false);

	// YouTube-style video player states
	const [showYouTubePlayer, setShowYouTubePlayer] = useState(false);
	const [videoAdActive, setVideoAdActive] = useState(false);
	const [videoAdTime, setVideoAdTime] = useState(15);
	const [videoAdSkippable, setVideoAdSkippable] = useState(false);
	const [mainVideoReady, setMainVideoReady] = useState(false);
	const [videoProgress, setVideoProgress] = useState(0);
	const [videoDuration, setVideoDuration] = useState(0);
	const [videoPlaying, setVideoPlaying] = useState(false);
	const [videoMuted, setVideoMuted] = useState(false);
	const [videoVolume, setVideoVolume] = useState(1);

	// Video settings states
	const [showSettings, setShowSettings] = useState(false);
	const [videoQuality, setVideoQuality] = useState("auto");
	const [playbackSpeed, setPlaybackSpeed] = useState(1);
	const [autoplay, setAutoplay] = useState(true);

	// Popup and placeholders
	const [popupError, setPopupError] = useState<string | null>(null);
	const [captcha1Placeholder, setCaptcha1Placeholder] = useState("Type your answer");
	const [captcha2Placeholder, setCaptcha2Placeholder] = useState("What's this animal?");

	useEffect(() => {
		setCaptcha1({ a: randomInt(), b: randomInt() });
		const shuffled = [...CAPTCHA_IMAGES].sort(() => Math.random() - 0.5);
		setShuffledImages(shuffled);
	}, []);

	// YouTube-style video ad timer
	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (videoAdActive && videoAdTime > 0) {
			interval = setInterval(() => {
				setVideoAdTime(prev => {
					if (prev <= 1) {
						setVideoAdActive(false);
						setMainVideoReady(true);
						return 0;
					}
					if (prev <= 10) {
						setVideoAdSkippable(true);
					}
					return prev - 1;
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [videoAdActive, videoAdTime]);

	// Video progress tracker
	useEffect(() => {
		const video = mainVideoRef.current;
		if (video) {
			const updateProgress = () => {
				setVideoProgress(video.currentTime);
				setVideoDuration(video.duration);
			};
			video.addEventListener('timeupdate', updateProgress);
			video.addEventListener('loadedmetadata', updateProgress);
			return () => {
				video.removeEventListener('timeupdate', updateProgress);
				video.removeEventListener('loadedmetadata', updateProgress);
			};
		}
	}, [mainVideoReady]);

	// Apply playback speed when it changes
	useEffect(() => {
		const video = mainVideoRef.current;
		if (video) {
			video.playbackRate = playbackSpeed;
		}
	}, [playbackSpeed]);

	const startAd = (adIndex: number) => {
		const ad = ADS[adIndex];
		setCurrentAd(adIndex);
		setAdPlaying(true);
		let t = ad.duration;
		setAdTime(t);
		
		const interval = setInterval(() => {
			t--;
			setAdTime(t);
			if (t <= 0) {
				clearInterval(interval);
				setAdWatched(prev => prev + 1);
				setAdPlaying(false);
			}
		}, 1000);
	};

	const handleCaptcha1 = (e: React.FormEvent) => {
		e.preventDefault();
		if (!captcha1) return;
		if (parseInt(captcha1Input) === captcha1.a + captcha1.b) {
			setCaptcha1Valid(true);
			startAd(0);
		} else {
			setCaptcha1Input("");
			setCaptcha1({ a: randomInt(), b: randomInt() });
			setPopupError("Incorrect! Try again.");
		}
	};

	const handleCaptcha2 = (e: React.FormEvent) => {
		e.preventDefault();
		if (captcha2Input.trim().toLowerCase() === "dog" || captcha2Input.trim().toLowerCase() === "perro") {
			setCaptcha2Valid(true);
			if (adWatched >= 1) {
				startAd(1);
			}
		} else {
			setCaptcha2Input("");
			setPopupError('Try again! (Hint: "dog" or "perro")');
		}
	};

	const handleDragStart = (e: React.DragEvent, id: number) => {
		setDraggedItem(id);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent, position: number) => {
		e.preventDefault();
		if (draggedItem === null) return;
		
		const newOrder = [...userOrder];
		newOrder[position] = draggedItem;
		setUserOrder(newOrder);
		setDraggedItem(null);

		if (newOrder.every(item => item !== undefined)) {
			if (JSON.stringify(newOrder) === JSON.stringify(correctOrder)) {
				setCaptcha3Valid(true);
				// Show YouTube player after completing all captchas - but keep captcha3 visible
				setTimeout(() => {
					setShowYouTubePlayer(true);
					setVideoAdActive(true);
					setVideoAdTime(15);
					setVideoAdSkippable(false);
				}, 1000);
			} else {
				setPopupError("Wrong order! Try again. Correct order: Apple, Banana, Grapes, Orange 🍎🍌🍇🍊");
				setTimeout(() => {
					setUserOrder(new Array(4).fill(undefined));
				}, 2000);
			}
		}
	};

	const resetCaptcha3 = () => {
		setUserOrder(new Array(4).fill(undefined));
		setCaptcha3Valid(false);
		const shuffled = [...CAPTCHA_IMAGES].sort(() => Math.random() - 0.5);
		setShuffledImages(shuffled);
	};

	// YouTube-style video controls
	const skipAd = () => {
		if (videoAdSkippable) {
			setVideoAdActive(false);
			setMainVideoReady(true);
		}
	};

	const togglePlayPause = () => {
		const video = mainVideoRef.current;
		if (video) {
			if (videoPlaying) {
				video.pause();
			} else {
				video.play();
			}
			setVideoPlaying(!videoPlaying);
		}
	};

	const toggleMute = () => {
		const video = mainVideoRef.current;
		if (video) {
			video.muted = !videoMuted;
			setVideoMuted(!videoMuted);
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const volume = parseFloat(e.target.value);
		setVideoVolume(volume);
		const video = mainVideoRef.current;
		if (video) {
			video.volume = volume;
		}
	};

	const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const video = mainVideoRef.current;
		if (video && videoDuration) {
			const rect = e.currentTarget.getBoundingClientRect();
			const pos = (e.clientX - rect.left) / rect.width;
			video.currentTime = pos * videoDuration;
		}
	};

	// Settings handlers
	const handleQualityChange = (quality: string) => {
		setVideoQuality(quality);
		setShowSettings(false);
	};

	const handleSpeedChange = (speed: number) => {
		setPlaybackSpeed(speed);
		setShowSettings(false);
	};

	const toggleFullscreen = () => {
		const video = mainVideoRef.current;
		if (video) {
			if (document.fullscreenElement) {
				document.exitFullscreen();
			} else {
				video.requestFullscreen();
			}
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	// Get current quality settings
	const currentQualitySettings = VIDEO_QUALITIES.find(q => q.value === videoQuality) || VIDEO_QUALITIES[0];

	return (
		<div className="media-container">
			<h1 className="media-title">🎬 Advanced MediaLab</h1>
			
			{/* Captcha 1 - Math */}
			<div className="media-section">
				<h2 className="media-subtitle">🔢 Captcha 1: Math Challenge</h2>
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
						{captcha1Valid ? "✅ Unlocked!" : "Verify"}
					</button>
				</form>
			</div>

			{/* First Ad */}
			{captcha1Valid && adWatched < 1 && adPlaying && (
				<div className="media-advertiser" style={{ borderColor: ADS[currentAd].color }} data-testid="ad-container-1">
					<div className="media-ad-label">📺 Advertisement #{currentAd + 1}</div>
					<div className="media-ad-box">
						<div className="media-ad-content" style={{ color: ADS[currentAd].color }}>
							{ADS[currentAd].message}
						</div>
						<div className="media-ad-timer" data-testid="ad-timer-1">
							⏱️ Ad ends in {adTime} seconds...
						</div>
					</div>
				</div>
			)}

			{/* Captcha 2 - Animal */}
			{captcha1Valid && adWatched >= 1 && (
				<div className="media-section">
					<h2 className="media-subtitle">🐾 Captcha 2: Animal Recognition</h2>
					<Image
						src={FUNNY_IMAGE}
						alt="Funny animal"
						className="media-funny-img"
						width={180}
						height={180}
						style={{ objectFit: "cover", borderRadius: "1rem" }}
						priority
					/>
					<form onSubmit={handleCaptcha2} className="media-form">
						<input
							className="api-input"
							type="text"
							placeholder={captcha2Placeholder}
							onFocus={() => setCaptcha2Placeholder("")}
							onBlur={() => !captcha2Input && setCaptcha2Placeholder("What's this animal?")}
							value={captcha2Input}
							onChange={e => setCaptcha2Input(e.target.value)}
							disabled={captcha2Valid}
							maxLength={20}
							required
						/>
						<button className="api-btn post" type="submit" disabled={captcha2Valid}>
							{captcha2Valid ? "✅ Correct!" : "Verify"}
						</button>
					</form>
					{captcha2Valid && <div className="media-success">Well done! 🐶</div>}
				</div>
			)}

			{/* Second Ad */}
			{captcha2Valid && adWatched < 2 && adPlaying && (
				<div className="media-advertiser" style={{ borderColor: ADS[currentAd].color }} data-testid="ad-container-2">
					<div className="media-ad-label">📺 Advertisement #{currentAd + 1}</div>
					<div className="media-ad-box">
						<div className="media-ad-content" style={{ color: ADS[currentAd].color }}>
							{ADS[currentAd].message}
						</div>
						<div className="media-ad-timer" data-testid="ad-timer-2">
							⏱️ Ad ends in {adTime} seconds...
						</div>
					</div>
				</div>
			)}

			{/* Captcha 3 - Drag & Drop - ALWAYS VISIBLE after captcha2 is valid */}
			{captcha2Valid && adWatched >= 2 && (
				<div className="media-section">
					<h2 className="media-subtitle">🧩 Captcha 3: Drag & Drop Challenge</h2>
					<p className="captcha3-instruction">
						Drag the fruits to the correct alphabetical order: Apple, Banana, Grapes, Orange
					</p>
					
					<div className="captcha3-dropzone">
						{[0, 1, 2, 3].map(position => (
							<div
								key={position}
								className="drop-slot"
								onDragOver={handleDragOver}
								onDrop={(e) => handleDrop(e, position)}
							>
								{userOrder[position] !== undefined ? (
									<div className="dropped-item">
										{CAPTCHA_IMAGES.find(img => img.id === userOrder[position])?.name}
									</div>
								) : (
									<div className="empty-slot">{position + 1}</div>
								)}
							</div>
						))}
					</div>

					<div className="captcha3-items">
						{shuffledImages.filter(img => !userOrder.includes(img.id)).map(image => (
							<div
								key={image.id}
								className="draggable-item"
								draggable
								onDragStart={(e) => handleDragStart(e, image.id)}
							>
								<Image
									src={image.src}
									alt={image.name}
									width={60}
									height={60}
									style={{ borderRadius: "8px" }}
								/>
								<span>{image.name}</span>
							</div>
						))}
					</div>

					{captcha3Valid && <div className="media-success">Perfect! Loading YouTube player... 🎉</div>}
					
					{/* Only show reset button if captcha3 is NOT completed */}
					{!captcha3Valid && (
						<button className="api-btn reset-btn" onClick={resetCaptcha3}>
							🔄 Reset Challenge
						</button>
					)}
				</div>
			)}

			{/* YouTube-style Video Player */}
			{showYouTubePlayer && (
				<div className="media-section youtube-player">
					<h2 className="media-subtitle">🎬 Premium Video Content</h2>
					
					<div 
						className="video-container" 
						data-testid="youtube-player"
						style={{ 
							maxWidth: videoQuality === "auto" ? "720px" : currentQualitySettings.width,
							aspectRatio: "16/9"
						}}
					>
						{/* Video Ad Overlay */}
						{videoAdActive && (
							<div className="video-ad-overlay" data-testid="video-ad-overlay">
								<div className="ad-content">
									<div className="ad-header">
										<span className="ad-label">Advertisement</span>
										<span className="ad-timer" data-testid="video-ad-timer">
											{videoAdSkippable ? (
												<button className="skip-ad-btn" onClick={skipAd} data-testid="skip-ad-btn">
													Skip Ad →
												</button>
											) : (
												`Skip in ${videoAdTime - 5}s`
											)}
										</span>
									</div>
									<div className="ad-video-content">
										<div className="ad-video-mock">
											<span style={{ fontSize: 64, marginBottom: "1rem", display: "block" }}>🎯</span>
											<h3>Premium Gaming Experience!</h3>
											<p>Join millions of players worldwide</p>
											<div className="ad-progress-bar">
												<div 
													className="ad-progress-fill"
													style={{ width: `${((15 - videoAdTime) / 15) * 100}%` }}
												/>
											</div>
											<p style={{ fontSize: "0.9rem", marginTop: "1rem", opacity: 0.8 }}>
												Ad ends in {videoAdTime} seconds
											</p>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Main Video */}
						{mainVideoReady && (
							<>
								<video
									ref={mainVideoRef}
									className="main-video"
									src={PUBLIC_VIDEO}
									poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
									onPlay={() => setVideoPlaying(true)}
									onPause={() => setVideoPlaying(false)}
									data-testid="main-video"
									data-quality={videoQuality}
									data-speed={playbackSpeed}
								/>
								
								{/* Custom Video Controls */}
								<div className="video-controls">
									<div className="progress-bar" onClick={handleProgressClick}>
										<div 
											className="progress-fill"
											style={{ width: `${(videoProgress / videoDuration) * 100}%` }}
										/>
									</div>
									
									<div className="controls-row">
										<div className="left-controls">
											<button className="control-btn" onClick={togglePlayPause} data-testid="play-pause-btn">
												{videoPlaying ? "⏸️" : "▶️"}
											</button>
											<button className="control-btn" onClick={toggleMute} data-testid="mute-btn">
												{videoMuted ? "🔇" : "🔊"}
											</button>
											<input
												type="range"
												min="0"
												max="1"
												step="0.1"
												value={videoVolume}
												onChange={handleVolumeChange}
												className="volume-slider"
												data-testid="volume-slider"
											/>
											<span className="time-display">
												{formatTime(videoProgress)} / {formatTime(videoDuration)}
											</span>
											<span className="speed-indicator" data-testid="speed-indicator">
												{playbackSpeed}x
											</span>
											<span className="quality-indicator" data-testid="quality-indicator">
												{videoQuality}
											</span>
										</div>
										<div className="right-controls">
											<div className="settings-menu">
												<button 
													className="control-btn" 
													onClick={() => setShowSettings(!showSettings)}
													data-testid="settings-btn"
												>
													⚙️
												</button>
												{showSettings && (
													<div className="settings-dropdown" data-testid="settings-menu">
														<div className="settings-section">
															<h4>Quality</h4>
															{VIDEO_QUALITIES.map(quality => (
																<button
																	key={quality.value}
																	className={`settings-option ${videoQuality === quality.value ? 'active' : ''}`}
																	onClick={() => handleQualityChange(quality.value)}
																	data-testid={`quality-${quality.value}`}
																>
																	{quality.label}
																	{videoQuality === quality.value && ' ✓'}
																</button>
															))}
														</div>
														<div className="settings-section">
															<h4>Playback Speed</h4>
															{PLAYBACK_SPEEDS.map(speed => (
																<button
																	key={speed.value}
																	className={`settings-option ${playbackSpeed === speed.value ? 'active' : ''}`}
																	onClick={() => handleSpeedChange(speed.value)}
																	data-testid={`speed-${speed.value}`}
																>
																	{speed.label}
																	{playbackSpeed === speed.value && ' ✓'}
																</button>
															))}
														</div>
														<div className="settings-section">
															<h4>Options</h4>
															<button
																className={`settings-option ${autoplay ? 'active' : ''}`}
																onClick={() => setAutoplay(!autoplay)}
																data-testid="autoplay-toggle"
															>
																Autoplay {autoplay ? '✓' : ''}
															</button>
														</div>
													</div>
												)}
											</div>
											<button className="control-btn" onClick={toggleFullscreen} data-testid="fullscreen-btn">
												🔲
											</button>
										</div>
									</div>
								</div>
							</>
						)}
					</div>

					{mainVideoReady && (
						<div className="media-success">
							🏆 Congratulations! You&apos;ve unlocked the premium content!
							<div style={{ fontSize: "0.9rem", marginTop: "0.5rem", opacity: 0.8 }}>
								Current settings: {videoQuality} quality at {playbackSpeed}x speed
							</div>
						</div>
					)}
				</div>
			)}

			{/* Popup for errors */}
			{popupError && (
				<div className="media-popup-overlay">
					<div className="media-popup">
						<div className="media-popup-message">{popupError}</div>
						<button
							className="api-btn post media-popup-btn"
							onClick={() => setPopupError(null)}
							autoFocus
						>
							OK
						</button>
					</div>
				</div>
			)}
		</div>
	);
}