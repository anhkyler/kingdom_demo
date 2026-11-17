/* Kingdom K.E.Y.S — site behaviour */

// Where form submissions go. Set this to a form service endpoint (e.g. Formspree:
// "https://formspree.io/f/xxxxxx") to receive submissions directly. While it is empty,
// forms fall back to opening the visitor's email app addressed to CONTACT_EMAIL.
const FORM_ENDPOINT = "";
const CONTACT_EMAIL = "kingdomkeysconnect@yahoo.com";

// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Dropdown parents: toggle on click/keyboard (hover is handled in CSS)
document.querySelectorAll(".has-sub > .nav-parent").forEach((btn) => {
  btn.addEventListener("click", () => {
    const li = btn.parentElement;
    const open = li.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
});
document.addEventListener("click", (e) => {
  document.querySelectorAll(".has-sub.open").forEach((li) => {
    if (!li.contains(e.target)) li.classList.remove("open");
  });
});

// Quote slider (Sisterhood Program page)
document.querySelectorAll(".slider").forEach((slider) => {
  const slides = [...slider.querySelectorAll(".slide")];
  const dotsWrap = slider.querySelector(".dots");
  let i = 0;
  let timer;
  const dots = slides.map((_, n) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Show quote ${n + 1}`);
    b.addEventListener("click", () => go(n, true));
    dotsWrap.appendChild(b);
    return b;
  });
  function go(n, user) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("active", k === i));
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
    if (user) restart();
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => go(i + 1), 6000);
  }
  slider.querySelector(".prev").addEventListener("click", () => go(i - 1, true));
  slider.querySelector(".next").addEventListener("click", () => go(i + 1, true));
  go(0);
  restart();
});

// Forms
document.querySelectorAll("form.form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = form.dataset.subject || "Website form submission";
    data.append("_subject", subject);

    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(res.statusText);
        form.reset();
        form.classList.add("sent");
      } catch (err) {
        alert("Sorry, something went wrong sending your form. Please email us at " + CONTACT_EMAIL + ".");
      }
      return;
    }

    // Fallback: compose an email with the form contents.
    const lines = [];
    for (const [k, v] of data.entries()) {
      if (k.startsWith("_")) continue;
      lines.push(`${k}: ${v}`);
    }
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    form.classList.add("sent");
  });
});

