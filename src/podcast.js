
document.querySelectorAll('.podcast-poster').forEach((button) => {
    button.addEventListener('click', () => {
        const videoId = button.dataset.videoId;
        if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId || '')) return;

        const player = document.createElement('iframe');
        player.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1`;
        player.title = 'Sharkcast podcast episode';
        player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        player.allowFullscreen = true;
        player.referrerPolicy = 'strict-origin-when-cross-origin';
        button.replaceWith(player);
        player.focus();
    }, { once: true });
});