(function () {
  var STORAGE_KEY = "lka-theme";
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function forced() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function isDark() {
    var f = forced();
    return f ? f === "dark" : mq.matches;
  }

  function apply() {
    var dark = isDark();
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    var toggle = document.getElementById("theme-toggle");
    if (!toggle) return;
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    toggle.querySelector(".icon-sun").style.display = dark ? "block" : "none";
    toggle.querySelector(".icon-moon").style.display = dark ? "none" : "block";
  }

  function init() {
    apply();
    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = isDark() ? "light" : "dark";
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch (e) {}
        apply();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  mq.addEventListener("change", function () {
    if (!forced()) apply();
  });
})();
