import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music2, Volume2, VolumeX } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { MUSIC_PLAYLIST } from '../../constants/musicPlaylist';

const MusicPlayerApp = () => {
    const { isMusicPlaying, setIsMusicPlaying } = useOS();
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const prevVolume = useRef(70);
    const timeUpdateInterval = useRef(null);
    const isApiLoaded = useRef(false);

    // Rotation Tracking for Seeking
    const lastAngle = useRef(0);

    // Load YouTube IFrame API
    useEffect(() => {
        // Prevent duplicate API loads
        if (isApiLoaded.current) {
            if (window.YT && window.YT.Player) {
                initializePlayer();
            }
            return;
        }

        // Check if API is already loaded
        if (window.YT && window.YT.Player) {
            isApiLoaded.current = true;
            initializePlayer();
            return;
        }

        // Check if script is already being loaded
        const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
        if (existingScript) {
            isApiLoaded.current = true;
            // Wait for API to be ready
            const checkAPI = setInterval(() => {
                if (window.YT && window.YT.Player) {
                    clearInterval(checkAPI);
                    initializePlayer();
                }
            }, 100);
            return () => clearInterval(checkAPI);
        }

        // Load the API for the first time
        isApiLoaded.current = true;
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // API ready callback
        window.onYouTubeIframeAPIReady = () => {
            initializePlayer();
        };

        // Cleanup on unmount
        return () => {
            if (timeUpdateInterval.current) {
                clearInterval(timeUpdateInterval.current);
                timeUpdateInterval.current = null;
            }
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, []);

    const initializePlayer = () => {
        // Prevent duplicate player creation
        if (playerRef.current) return;

        // Check if player container exists
        const playerContainer = document.getElementById('youtube-player');
        if (!playerContainer) return;

        try {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '0',
                width: '0',
                videoId: MUSIC_PLAYLIST[0].id,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    playsinline: 1,
                },
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        } catch (error) {
            console.error('Failed to initialize YouTube player:', error);
        }
    };

    const onPlayerReady = (event) => {
        setIsPlayerReady(true);
        event.target.setVolume(volume);
        setDuration(event.target.getDuration());

        // Clear any existing interval before creating new one
        if (timeUpdateInterval.current) {
            clearInterval(timeUpdateInterval.current);
            timeUpdateInterval.current = null;
        }

        // Start time update interval
        timeUpdateInterval.current = setInterval(() => {
            if (playerRef.current && playerRef.current.getCurrentTime) {
                try {
                    setCurrentTime(playerRef.current.getCurrentTime());
                    const dur = playerRef.current.getDuration();
                    if (dur && dur !== duration) {
                        setDuration(dur);
                    }
                } catch (error) {
                    // Player might be destroyed, clear interval
                    if (timeUpdateInterval.current) {
                        clearInterval(timeUpdateInterval.current);
                        timeUpdateInterval.current = null;
                    }
                }
            }
        }, 100);
    };

    const onPlayerStateChange = (event) => {
        // YT.PlayerState.ENDED = 0
        if (event.data === 0) {
            // Track ended, play next
            playNextTrack();
        } else if (event.data === 1) {
            // Playing
            setIsMusicPlaying(true);
        } else if (event.data === 2) {
            // Paused
            setIsMusicPlaying(false);
        }
    };

    // Sync player with global state
    useEffect(() => {
        if (!isPlayerReady || !playerRef.current) return;

        if (isMusicPlaying) {
            playerRef.current.playVideo();
        } else {
            playerRef.current.pauseVideo();
        }
    }, [isMusicPlaying, isPlayerReady]);

    // Update volume when changed
    useEffect(() => {
        if (isPlayerReady && playerRef.current) {
            playerRef.current.setVolume(volume);
        }
    }, [volume, isPlayerReady]);

    const togglePlay = () => {
        setIsMusicPlaying(!isMusicPlaying);
    };

    const playNextTrack = () => {
        const nextIndex = (currentTrackIndex + 1) % MUSIC_PLAYLIST.length;
        changeTrack(nextIndex);
    };

    const playPreviousTrack = () => {
        const prevIndex = currentTrackIndex === 0
            ? MUSIC_PLAYLIST.length - 1
            : currentTrackIndex - 1;
        changeTrack(prevIndex);
    };

    const changeTrack = (newIndex) => {
        if (!isPlayerReady || !playerRef.current) return;

        setCurrentTrackIndex(newIndex);
        setCurrentTime(0);
        playerRef.current.loadVideoById(MUSIC_PLAYLIST[newIndex].id);

        // If music was playing, continue playing
        if (isMusicPlaying) {
            setTimeout(() => {
                playerRef.current.playVideo();
            }, 100);
        }
    };

    const handleInteraction = (clientX, clientY) => {
        if (!containerRef.current || !playerRef.current || !isPlayerReady) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let currentAngle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
        if (currentAngle < 0) currentAngle += 360;

        let delta = currentAngle - lastAngle.current;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        // One full rotation (360 deg) = 30 seconds of seeking
        const seekDelta = (delta / 360) * 30;
        const newTime = Math.max(0, Math.min(currentTime + seekDelta, duration));
        playerRef.current.seekTo(newTime, true);

        lastAngle.current = currentAngle;
    };

    const onPointerDown = (e) => {
        setIsDragging(true);
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        if (startAngle < 0) startAngle += 360;
        lastAngle.current = startAngle;
    };

    const onPointerMove = (e) => {
        if (!isDragging) return;
        handleInteraction(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
        setIsDragging(false);
    };

    const handleProgressChange = (e) => {
        const time = Number(e.target.value);
        if (playerRef.current && isPlayerReady) {
            playerRef.current.seekTo(time, true);
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0) prevVolume.current = newVolume;
    };

    const toggleMute = () => {
        if (volume > 0) {
            prevVolume.current = volume;
            setVolume(0);
        } else {
            setVolume(prevVolume.current || 70);
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const currentTrack = MUSIC_PLAYLIST[currentTrackIndex];

    return (
        <div
            className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-xl relative overflow-hidden group select-none touch-none"
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
        >
            {/* Background Decorative Element */}
            <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-blue-500/10 animate-pulse pointer-events-none" />

            {/* Hidden YouTube Player */}
            <div id="youtube-player" style={{ display: 'none' }}></div>

            {/* Vinyl Record Visual */}
            <div className="relative mb-8 z-10 scale-90 md:scale-100">
                <div
                    ref={containerRef}
                    onPointerDown={onPointerDown}
                    className={`
                        w-48 h-48 rounded-full border-4 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] 
                        flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black
                        cursor-grab active:cursor-grabbing
                        ${isMusicPlaying ? 'animate-spin-slow' : ''}
                        transition-all duration-700
                    `}
                >
                    {/* Inner Vinyl Rings */}
                    <div className="absolute inset-2 rounded-full border border-white/5 opacity-50" />
                    <div className="absolute inset-4 rounded-full border border-white/5 opacity-40" />
                    <div className="absolute inset-8 rounded-full border border-white/5 opacity-30" />

                    {/* Album Art Cover */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center overflow-hidden shadow-inner">
                        <Music2 size={64} className="text-white/80" />
                    </div>

                    {/* Center Hole */}
                    <div className="absolute w-4 h-4 bg-gray-900 rounded-full border border-white/20 z-20 flex items-center justify-center">
                        <div className="w-1 h-1 bg-white/50 rounded-full" />
                    </div>
                </div>

                {/* Play Indicator Needle */}
                <div className={`
                    absolute top-[-10px] right-2 w-2 h-20 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full origin-top transform 
                    ${isMusicPlaying ? 'rotate-[25deg]' : 'rotate-0'} 
                    transition-transform duration-500 shadow-lg
                `}>
                    <div className="absolute bottom-0 w-4 h-4 bg-gray-600 rounded-sm -left-1" />
                </div>
            </div>

            {/* Song Info */}
            <div className="text-center mb-6 z-10">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                    {currentTrack.title}
                </h3>
                <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mt-1">
                    {currentTrack.artist}
                </p>
                <p className="text-gray-500 text-xs mt-2">
                    Track {currentTrackIndex + 1} of {MUSIC_PLAYLIST.length}
                </p>
            </div>

            {/* Progress Bar Layer */}
            <div className="w-full max-w-sm mb-6 z-10 space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-gray-400 tracking-widest">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>

                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                />
            </div>

            {/* Controls Layer */}
            <div className="flex items-center justify-center gap-10 z-10">
                <button
                    onClick={playPreviousTrack}
                    className="text-white/40 hover:text-white hover:scale-110 transition-all duration-200"
                    title="Previous Track"
                >
                    <SkipBack size={24} />
                </button>

                <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white/5 border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl backdrop-blur-sm"
                >
                    {isMusicPlaying ? (
                        <Pause size={28} fill="currentColor" />
                    ) : (
                        <Play size={28} fill="currentColor" className="translate-x-1" />
                    )}
                </button>

                <button
                    onClick={playNextTrack}
                    className="text-white/40 hover:text-white hover:scale-110 transition-all duration-200"
                    title="Next Track"
                >
                    <SkipForward size={24} />
                </button>
            </div>

            {/* Volume Control */}
            <div className="mt-10 flex items-center gap-4 group/vol z-10 w-48">
                <button
                    onClick={toggleMute}
                    className="text-white/40 hover:text-white transition-colors p-1"
                >
                    {volume === 0 ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} />}
                </button>
                <div className="flex-1 relative h-6 flex items-center">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                    />
                </div>
                <span className="text-[10px] font-mono text-white/40 w-8 tabular-nums">
                    {Math.round(volume)}%
                </span>
            </div>
        </div>
    );
};

export default MusicPlayerApp;
