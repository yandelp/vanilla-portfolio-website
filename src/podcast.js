document.querySelectorAll('.podcast-play').forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();

    const iframe = document.createElement('iframe');

    iframe.src =
      'https://www.youtube-nocookie.com/embed/KP9fNRGhlV4?autoplay=1&playsinline=1';
    iframe.title = 'My Sharkcast episode';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;

    button.replaceWith(iframe);
    iframe.focus();
  }, { once: true });
});