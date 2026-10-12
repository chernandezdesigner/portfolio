/* site.js — shared, dependency-free behaviour.
   Email copy-to-clipboard. Any element with [data-email-copy]
   copies the address and briefly shows "Copied!". */
(function () {
  "use strict";
  var EMAIL = "chernandezdesigner@gmail.com";

  function wire(el) {
    var original = el.textContent;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      function done() {
        el.textContent = "Copied!";
        setTimeout(function () { el.textContent = original; }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(done).catch(function () {
          window.location.href = "mailto:" + EMAIL;
        });
      } else {
        window.location.href = "mailto:" + EMAIL;
      }
    });
  }

  /* Case-study sticky table of contents: highlight the section the
     reader is currently in, and step aside once the footer appears. */
  function initToc() {
    var toc = document.querySelector(".cs-toc");
    if (!toc) return;

    var links = Array.prototype.slice.call(toc.querySelectorAll("[data-toc]"));
    if (!links.length) return;

    var sections = links.map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    });
    var footer = document.querySelector(".site-footer");

    function update() {
      var activeIndex = 0;
      for (var i = 0; i < sections.length; i++) {
        var sec = sections[i];
        if (sec && sec.getBoundingClientRect().top - 140 <= 0) activeIndex = i;
      }
      for (var j = 0; j < links.length; j++) {
        links[j].classList.toggle("is-active", j === activeIndex);
      }
      if (footer) {
        var footerVisible =
          footer.getBoundingClientRect().top < window.innerHeight - 40;
        toc.classList.toggle("cs-toc--hidden", footerVisible);
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* Mobile hamburger nav: toggle the dropdown panel open/closed.
     Shared across every page — each nav has a .cs-nav-toggle button
     and its links live in .cs-nav-links inside the same .cs-nav. */
  function initNav() {
    var toggles = document.querySelectorAll(".cs-nav-toggle");
    for (var i = 0; i < toggles.length; i++) {
      (function (toggle) {
        var nav = toggle.closest(".cs-nav");
        if (!nav) return;

        function setOpen(open) {
          nav.classList.toggle("is-open", open);
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
        }

        toggle.addEventListener("click", function () {
          setOpen(!nav.classList.contains("is-open"));
        });

        /* Close when a link is tapped (buttons like "Email me" stay open
           so their "Copied!" feedback remains visible). */
        var links = nav.querySelectorAll(".cs-nav-links a");
        for (var j = 0; j < links.length; j++) {
          links[j].addEventListener("click", function () { setOpen(false); });
        }

        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") setOpen(false);
        });
      })(toggles[i]);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var nodes = document.querySelectorAll("[data-email-copy]");
    for (var i = 0; i < nodes.length; i++) wire(nodes[i]);
    initToc();
    initNav();
  });
})();
