// ===============================
// JS para proyectos.html - soporte múltiple
// ===============================
function setupVideoPlayer(playerId) {
    const video = document.getElementById(`video${playerId}`);
    if (!video) return; // seguridad

    const volumeControl = document.getElementById(`volumeControl${playerId}`);
    const volumeValue = document.getElementById(`volumeValue${playerId}`);
    const playbackSpeed = document.getElementById(`playbackSpeed${playerId}`);
    const speedValue = document.getElementById(`speedValue${playerId}`);
    const restartBtn = document.getElementById(`restartVideo${playerId}`);
    const toggleBtn = document.getElementById(`togglePlay${playerId}`);
    const fullscreenBtn = document.getElementById(`fullscreenBtn${playerId}`);
    const videoStats = document.getElementById(`videoStats${playerId}`);
    const videoContainer = video.closest('.video-container');
    const overlayPlayBtn = videoContainer.querySelector('.play-btn');

    let isPlaying = false;
    let isFullscreen = false;

    // controles
    volumeControl?.addEventListener('input', e => {
        const value = parseFloat(e.target.value) * 100;
        volumeValue.textContent = `${Math.round(value)}%`;
        video.volume = e.target.value;
        if (video.muted && e.target.value > 0) video.muted = false;
    });

    playbackSpeed?.addEventListener('input', e => {
        const value = parseFloat(e.target.value);
        speedValue.textContent = value + 'x';
        video.playbackRate = value;
    });

    const togglePlayPause = () => {
        if (video.paused) { video.play(); toggleBtn.textContent = 'Pausar'; }
        else { video.pause(); toggleBtn.textContent = 'Reproducir'; }
    };

    toggleBtn?.addEventListener('click', togglePlayPause);
    overlayPlayBtn?.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);

    restartBtn?.addEventListener('click', () => {
        video.currentTime = 0;
        video.play();
        toggleBtn.textContent = 'Pausar';
    });

    const toggleFullscreen = () => {
        if (!isFullscreen) videoContainer.requestFullscreen?.();
        else document.exitFullscreen?.();
        isFullscreen = !isFullscreen;
    };

    fullscreenBtn?.addEventListener('click', toggleFullscreen);

    const updateStats = () => {
        const format = s => isNaN(s) ? "00:00" : `${Math.floor(s/60).toString().padStart(2,'0')}:${Math.floor(s%60).toString().padStart(2,'0')}`;
        videoStats.textContent = `${format(video.currentTime)} / ${format(video.duration)}`;
    };
    setInterval(updateStats, 500);

    // autoplay silencioso
    video.muted = true;
    video.play().catch(()=>{});
}

// Inicializa todos los videos automáticamente
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.project-video');
    videos.forEach((v, i) => setupVideoPlayer(i + 1));
});
