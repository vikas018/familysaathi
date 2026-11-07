/* ===========================================================================
   FamilySaathi — main.js
   All front-end interactivity: theme toggle, mobile menu, hero booking widget,
   driver search/filter, FAQ accordion, WhatsApp links, and form -> WhatsApp.

   >>> TO GO LIVE: change WA_NUMBER below to your real WhatsApp number.
       Format: country code + number, no "+" or spaces. e.g. "919876543210"
   >>> TO MAKE DYNAMIC LATER: the `drivers` and `faqs` arrays below are the
       single source of truth. Later these can come from an API / CMS instead.
   =========================================================================== */
(function () {
  "use strict";

  var BRAND = "FamilySaathi";
  var WA_NUMBER = "910000000000"; // TODO: replace with real WhatsApp number (e.g. "919876543210")
  var PHONE = "+910000000000";    // TODO: replace with real phone number

  /* ---- Theme toggle (light / dark) ---- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var cur = root.getAttribute("data-theme");
      if (!cur) { cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; }
      root.setAttribute("data-theme", cur === "dark" ? "light" : "dark");
    });
  }

  /* ---- Mobile menu ---- */
  var ham = document.getElementById("hamBtn");
  var menu = document.getElementById("mobileMenu");
  if (ham && menu) {
    ham.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      ham.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); });
    });
  }

  /* ---- WhatsApp helper ---- */
  function waLink(msg) {
    return "https://wa.me/" + WA_NUMBER + "?text=" +
      encodeURIComponent(msg || ("Hi " + BRAND + ", I'd like to know more."));
  }
  ["waFloat", "waBtnInfo", "waBtnFoot", "waBtnSticky"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) { el.setAttribute("href", waLink()); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
  });

  /* ---- Hero booking widget ---- */
  var OPTS = {
    driver: [
      "Driver now (within ~30 min)",
      "Hourly / round trip",
      "Outstation / one-way (Delhi-NCR)",
      "Daily / monthly driver",
      "Wedding / night drop"
    ],
    family: [
      "Hospital visit / diagnostic test",
      "Medicine pickup & bill payments",
      "Banking / government errands",
      "Daily support for parents"
    ]
  };
  var mode = "driver";
  var selected = OPTS.driver[0];
  var wOpts = document.getElementById("wOpts");
  var wWa = document.getElementById("wWa");
  var wToggle = document.getElementById("wToggle");

  function updateWa() {
    if (!wWa) return;
    wWa.setAttribute("href", waLink("Hi " + BRAND + ", I need: " + selected + "."));
    wWa.setAttribute("target", "_blank");
    wWa.setAttribute("rel", "noopener");
  }
  function renderOpts() {
    if (!wOpts) return;
    wOpts.innerHTML = OPTS[mode].map(function (o) {
      return '<div class="opt' + (o === selected ? " sel" : "") +
             '" data-o="' + o.replace(/"/g, "&quot;") + '"><span class="dot"></span>' + o + "</div>";
    }).join("");
    updateWa();
  }
  if (wToggle) {
    wToggle.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      this.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      mode = b.getAttribute("data-mode");
      selected = OPTS[mode][0];
      renderOpts();
    });
  }
  if (wOpts) {
    wOpts.addEventListener("click", function (e) {
      var o = e.target.closest(".opt"); if (!o) return;
      selected = o.getAttribute("data-o");
      renderOpts();
    });
  }
  renderOpts();

  /* ---- Driver / saathi profiles (single source of truth) ---- */
  var drivers = [
    { n: "Rajesh Kumar", in: "RK", exp: "12 yrs experience", lang: "Hindi & English", rating: "4.9", trips: 250, spec: "Senior Citizen Assistance", tags: ["driver", "senior"], badges: ["Aadhaar", "Police", "DL"], c: "linear-gradient(135deg,#1E3A8A,#14B8A6)" },
    { n: "Amit Verma", in: "AV", exp: "10 yrs experience", lang: "Hindi & English", rating: "4.9", trips: 320, spec: "Outstation & Airport (Delhi-NCR)", tags: ["driver", "outstation"], badges: ["Aadhaar", "Police", "DL"], c: "linear-gradient(135deg,#1d4ed8,#1E3A8A)" },
    { n: "Manoj Tyagi", in: "MT", exp: "15 yrs experience", lang: "Hindi & English", rating: "5.0", trips: 410, spec: "Weddings & Functions", tags: ["driver", "wedding", "outstation"], badges: ["Aadhaar", "Police", "DL"], c: "linear-gradient(135deg,#0f766e,#14B8A6)" },
    { n: "Sunita Devi", in: "SD", exp: "8 yrs experience", lang: "Hindi", rating: "4.8", trips: 180, spec: "Hospital & Diagnostic Help", tags: ["senior"], badges: ["Aadhaar", "Police", "Address"], c: "linear-gradient(135deg,#14B8A6,#0f766e)" },
    { n: "Pooja Sharma", in: "PS", exp: "6 yrs experience", lang: "Hindi & English", rating: "4.7", trips: 140, spec: "Banking & Govt Errands", tags: ["senior"], badges: ["Aadhaar", "Police", "Address"], c: "linear-gradient(135deg,#F97316,#ea6a0c)" },
    { n: "Kavita Singh", in: "KS", exp: "9 yrs experience", lang: "Hindi", rating: "4.8", trips: 210, spec: "Parent Care & Companionship", tags: ["senior"], badges: ["Aadhaar", "Police", "Emergency"], c: "linear-gradient(135deg,#1E3A8A,#1d4ed8)" }
  ];
  var checkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6 9 17l-5-5"/></svg>';
  var grid = document.getElementById("profileGrid");
  var curF = "all", curS = "";

  function renderProfiles() {
    if (!grid) return;
    var list = drivers.filter(function (d) {
      var okF = curF === "all" || d.tags.indexOf(curF) !== -1;
      var okS = curS === "" || (d.n + " " + d.spec + " " + d.lang).toLowerCase().indexOf(curS) !== -1;
      return okF && okS;
    });
    if (!list.length) {
      grid.innerHTML = '<div class="no-results">No saathis match. Try another term or ' +
        '<a href="#contact" style="color:var(--blue);font-weight:700;">contact us</a>.</div>';
      return;
    }
    grid.innerHTML = list.map(function (d) {
      var badges = d.badges.map(function (b) { return '<span class="pbadge">' + checkSvg + " " + b + "</span>"; }).join("");
      var talk = waLink("Hi " + BRAND + ", I'd like a quick call with " + d.n + " (" + d.spec + ") before booking.");
      var book = waLink("Hi " + BRAND + ", I'd like to book " + d.n + " (" + d.spec + ").");
      return '<article class="profile">' +
        '<div class="profile-top"><div class="avatar" style="background:' + d.c + '">' + d.in + "</div>" +
        "<div><h3>" + d.n + '</h3><div class="exp">' + d.exp + "</div>" +
        '<div class="rating-row"><span class="stars">★★★★★</span> <span class="tnum">' + d.rating +
        '</span> <span class="count tnum">· ' + d.trips + " trips</span></div></div></div>" +
        '<div class="profile-body"><span class="spec">★ ' + d.spec + '</span><div class="pbadges">' + badges + "</div></div>" +
        '<div class="profile-foot">' +
        '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="' + talk + '">Talk First</a>' +
        '<a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="' + book + '">Book</a>' +
        "</div></article>";
    }).join("");
  }
  renderProfiles();

  var driverSearch = document.getElementById("driverSearch");
  if (driverSearch) {
    driverSearch.addEventListener("input", function (e) { curS = e.target.value.toLowerCase().trim(); renderProfiles(); });
  }
  var filterChips = document.getElementById("filterChips");
  if (filterChips) {
    filterChips.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      this.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
      b.classList.add("active"); curF = b.getAttribute("data-filter"); renderProfiles();
    });
  }

  /* ---- FAQ ---- */
  var faqs = [
    { q: "Do your drivers drive my own car?", a: "Yes — our drivers drive your car. We don't provide the vehicle. Ideal when you own a car but need a trained, trusted driver for a few hours or a full outstation trip." },
    { q: "Are your drivers verified?", a: "Every saathi passes 5-point verification — Aadhaar, licence, police, address and emergency contact — plus an in-person interview, re-verified every 6 months." },
    { q: "Can I talk to a driver before booking?", a: "Yes — that's our 'Talk Before Booking' promise. View the profile, read reviews and have a short intro call before you confirm." },
    { q: "Do you go outstation to Delhi-NCR?", a: "Yes — one-way and round-trip runs to Delhi, Noida and Ghaziabad (airports, hospitals, offices) via the Delhi–Meerut Expressway, in your own car." },
    { q: "How does pricing work?", a: "In-city uses simple hourly packages (4h/8h/12h). Outstation, night and one-way have clear add-ons. Your exact fare is always confirmed before you book." },
    { q: "Can you help my parents when I live away?", a: "That's exactly why we exist — hospital visits, medicines, bills, banking and companionship, with updates after every visit and the same trusted saathi each time." }
  ];
  var faqWrap = document.getElementById("faqWrap");
  if (faqWrap) {
    faqWrap.innerHTML = faqs.map(function (f) {
      return '<div class="faq"><button aria-expanded="false"><span>' + f.q +
             '</span><span class="ic">+</span></button><div class="ans"><p>' + f.a + "</p></div></div>";
    }).join("");
    faqWrap.addEventListener("click", function (e) {
      var btn = e.target.closest("button"); if (!btn) return;
      var item = btn.parentElement, ans = item.querySelector(".ans");
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      ans.style.maxHeight = open ? (ans.scrollHeight + "px") : "0";
    });
  }

  /* ---- CTA presets (Business / Join prefill the enquiry form) ---- */
  var svcSel = document.getElementById("f-service");
  function preset(val) {
    if (!svcSel) return;
    for (var i = 0; i < svcSel.options.length; i++) {
      if (svcSel.options[i].text === val) { svcSel.selectedIndex = i; break; }
    }
  }
  var bizCta = document.getElementById("bizCta");
  if (bizCta) bizCta.addEventListener("click", function () { preset("For Business"); });
  var joinCta = document.getElementById("joinCta");
  if (joinCta) joinCta.addEventListener("click", function () { preset("Join as a driver"); });

  /* ---- Enquiry form -> WhatsApp (front-end validation) ---- */
  var form = document.getElementById("bookingForm");
  var success = document.getElementById("formSuccess");
  function setErr(id, bad) {
    var el = document.getElementById(id);
    if (el) el.parentElement.classList.toggle("invalid", bad);
  }
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("f-name").value.trim();
      var phone = document.getElementById("f-phone").value.replace(/\D/g, "");
      var svc = document.getElementById("f-service").value;
      var msg = document.getElementById("f-msg").value.trim();
      var bad = false;
      if (!name) { setErr("f-name", true); bad = true; } else setErr("f-name", false);
      if (phone.length < 10) { setErr("f-phone", true); bad = true; } else setErr("f-phone", false);
      if (!svc) { setErr("f-service", true); bad = true; } else setErr("f-service", false);
      if (bad) return;
      var text = "New enquiry via " + BRAND + ":\n\nName: " + name + "\nPhone: " + phone +
                 "\nNeed: " + svc + (msg ? "\nDetails: " + msg : "");
      window.open(waLink(text), "_blank", "noopener");
      form.style.display = "none";
      if (success) success.classList.add("show");
    });
  }

  /* ---- Reveal-on-scroll ---- */
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();
