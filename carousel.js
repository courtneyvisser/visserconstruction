// Visser Construction – project photo carousel
(function () {
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(track.children);
    var prev = carousel.querySelector('.carousel-prev');
    var next = carousel.querySelector('.carousel-next');
    var dotsWrap = carousel.querySelector('.carousel-dots');
    var current = 0;

    // Build one dot per photo
    var dots = slides.map(function (slide, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', 'Show photo ' + (i + 1) + ' of ' + slides.length);
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    // Hide arrows and dots if there is only one photo
    if (slides.length < 2) {
      prev.hidden = true;
      next.hidden = true;
      dotsWrap.hidden = true;
    }

    function goTo(i) {
      if (i < 0) i = slides.length - 1;
      if (i >= slides.length) i = 0;
      track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
    }

    function update() {
      var i = Math.round(track.scrollLeft / track.clientWidth);
      current = Math.max(0, Math.min(slides.length - 1, i));
      dots.forEach(function (d, j) {
        d.classList.toggle('active', j === current);
        d.setAttribute('aria-current', j === current ? 'true' : 'false');
      });
    }

    prev.addEventListener('click', function () { goTo(current - 1); });
    next.addEventListener('click', function () { goTo(current + 1); });

    var t;
    track.addEventListener('scroll', function () {
      clearTimeout(t);
      t = setTimeout(update, 60);
    });

    // Arrow keys when the carousel is focused
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
    });

    window.addEventListener('resize', function () {
      track.scrollTo({ left: slides[current].offsetLeft });
    });

    update();
  });
})();
