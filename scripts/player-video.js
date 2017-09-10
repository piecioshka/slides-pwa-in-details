(function (global, document) {
    'use strict';

    function togglePlayback($video) {
        if ($video.paused) {
            $video.play();
        } else {
            $video.pause();
        }
    }

    function onEachVideo(callback) {
        const $videos = document.querySelectorAll('video');
        Array.from($videos).forEach(($video) => callback($video));
    }

    function pauseAllVideos() {
        onEachVideo(($video) => {
            $video.pause();
        });
    }

    function startPlayVideoOnSlide(slide) {
        const $slide = document.querySelector('.remark-slide-container.remark-visible');
        if (!$slide) return;

        const $video = $slide.querySelector('video');
        if (!$video) return;

        pauseAllVideos();
        $video.play();
    }

    function startHandlingClicking() {
        onEachVideo(($video) => {
            $video.addEventListener('click', () => togglePlayback($video));
        });
    }

    function setup(slideshow) {
        setTimeout(() => {
            slideshow.on('afterShowSlide', startPlayVideoOnSlide);
            startHandlingClicking();
        }, 1000);
    }

    global.PlayerVideo = { setup };
})(window, document);
