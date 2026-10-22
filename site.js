(function () {
  "use strict";
  var d = document;
  (function () {
    var s = "body>*,header",
      u = function () {
        var o = 0;
        d.querySelectorAll(s).forEach(function (e) {
          var c = getComputedStyle(e),
            f = c.position === "fixed";
          if (!f && c.position !== "sticky") return;
          var b = e.getBoundingClientRect(),
            t = f ? b.top : parseFloat(c.top);
          if (t < 1 && t + b.height > 0 && b.height < innerHeight / 2)
            o = Math.max(o, Math.ceil(t + b.height));
        });
        d.documentElement.style.setProperty("--anchor-offset", o + "px");
      },
      g = function () {
        u();
        addEventListener("resize", u);
        if (window.ResizeObserver) {
          var r = new ResizeObserver(u);
          d.querySelectorAll(s).forEach(function (e) {
            r.observe(e);
          });
        }
      };
    if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", g);
    else g();
  })();
  if ("popover" in HTMLElement.prototype) {
    d.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("[popover] a[href]");
      if (!a) return;
      var p = a.closest("[popover]");
      if (p && p.matches(":popover-open")) p.hidePopover();
    });
    var x = function (p) {
      if (!p.id) return;
      var v = p.matches(":popover-open") ? "true" : "false";
      d.querySelectorAll("[popovertarget]").forEach(function (b) {
        if (b.getAttribute("popovertarget") === p.id)
          b.setAttribute("aria-expanded", v);
      });
    };
    d.querySelectorAll("[popover]").forEach(x);
    d.addEventListener(
      "toggle",
      function (e) {
        var p = e.target;
        if (p instanceof HTMLElement && p.hasAttribute("popover")) x(p);
      },
      true,
    );
  }
})();
