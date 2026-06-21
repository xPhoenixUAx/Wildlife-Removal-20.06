(function () {
  const cfg = window.SITE_CONFIG || {};
  const services = window.SERVICES || [];
  const groups = window.SERVICE_GROUPS || [];
  const version = "2026062001";

  const bySlug = new Map(services.map((service) => [service.slug, service]));

  const iconMap = {
    "paw-print": "PawPrint",
    "tree-pine": "TreePine",
    moon: "Moon",
    activity: "Activity",
    feather: "Feather",
    target: "Target",
    "shield-check": "ShieldCheck",
    sparkles: "Sparkles",
    siren: "Siren",
    phone: "Phone",
    mail: "Mail",
    map: "MapPin",
    clock: "Clock",
    arrow: "ArrowUpRight",
    check: "CheckCircle2",
    bug: "Bug",
    menu: "Menu",
    x: "X",
    search: "Search",
    home: "Home",
    website: "Globe2"
  };

  function icon(name, className = "") {
    const iconName = iconMap[name] || "Circle";
    return `<i data-lucide="${iconName}" class="${className}" aria-hidden="true"></i>`;
  }

  function safe(value, fallback = "") {
    return value || fallback;
  }

  function phoneHref() {
    return `tel:${safe(cfg.phone).replace(/[^\d+]/g, "")}`;
  }

  function emailHref() {
    return `mailto:${safe(cfg.email)}`;
  }

  function hydrateConfig() {
    document.querySelectorAll("[data-company-name]").forEach((el) => (el.textContent = cfg.companyName));
    document.querySelectorAll("[data-company-legal-name]").forEach((el) => (el.textContent = cfg.companyLegalName));
    document.querySelectorAll("[data-company-id]").forEach((el) => (el.textContent = cfg.companyId));
    document.querySelectorAll("[data-company-address]").forEach((el) => (el.textContent = `${cfg.addressLine1}, ${cfg.addressLine2}`));
    document.querySelectorAll("[data-phone-text]").forEach((el) => (el.textContent = cfg.phoneDisplay));
    document.querySelectorAll("[data-phone-label]").forEach((el) => (el.textContent = cfg.phoneButtonLabel));
    document.querySelectorAll("[data-email-text]").forEach((el) => (el.textContent = cfg.email));
    document.querySelectorAll("[data-website-text]").forEach((el) => (el.textContent = cfg.website));
    document.querySelectorAll("[data-cta-primary]").forEach((el) => (el.textContent = cfg.ctaPrimary));
    document.querySelectorAll("[data-cta-secondary]").forEach((el) => (el.textContent = cfg.ctaSecondary));
    document.querySelectorAll("[data-footer-text-primary]").forEach((el) => (el.textContent = cfg.footerTextPrimary));
    document.querySelectorAll("[data-footer-text-secondary]").forEach((el) => (el.textContent = cfg.footerTextSecondary));
    document.querySelectorAll("[data-disclaimer-short]").forEach((el) => (el.textContent = cfg.disclaimerShort));
    document.querySelectorAll("[data-disclaimer-full]").forEach((el) => (el.textContent = cfg.disclaimerFull));
    document.querySelectorAll("[data-footer-disclaimer]").forEach((el) => (el.textContent = cfg.footerDisclaimer));
    document.querySelectorAll("[data-service-area]").forEach((el) => (el.textContent = cfg.serviceArea));
    document.querySelectorAll("[data-business-hours]").forEach((el) => (el.textContent = cfg.businessHours));
    document.querySelectorAll("[data-copyright-line]").forEach((el) => (el.textContent = cfg.copyrightLine));
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
    document.querySelectorAll("[data-footer-company-line]").forEach((el) => {
      el.textContent = `${cfg.companyName} - ${cfg.addressLine1}, ${cfg.addressLine2} - ${cfg.companyId}`;
    });

    document.querySelectorAll("[data-phone-link]").forEach((el) => el.setAttribute("href", phoneHref()));
    document.querySelectorAll("[data-email-link]").forEach((el) => el.setAttribute("href", emailHref()));
    document.querySelectorAll("[data-website-link]").forEach((el) => el.setAttribute("href", `https://${cfg.website}`));

    if (document.title.includes("WildGuard")) {
      document.title = document.title.replace(/WildGuard Removal/g, cfg.companyName);
    }
  }

  function renderHeaderFooter() {
    const header = document.querySelector("[data-site-header]");
    if (header) {
      header.innerHTML = `
        <div class="topbar">
          <div class="container topbar__inner">
            <a class="topbar__phone" data-phone-link href="${phoneHref()}">${icon("phone")} Available 24/7 - <span data-phone-text>${cfg.phoneDisplay}</span></a>
            <div class="topbar__social"><span>Follow Our Field Updates:</span><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="YouTube">▶</a><a href="#" aria-label="X">X</a></div>
          </div>
        </div>
        <div class="navbar">
          <div class="container navbar__inner">
            <a class="brand" href="index.html" aria-label="${cfg.companyName} home">
              <span class="brand__mark">${icon("paw-print")}</span>
              <span class="brand__text" data-company-name>${cfg.companyName}</span>
            </a>
            <nav class="nav" aria-label="Main navigation">
              <a href="index.html">Home</a>
              <div class="nav__dropdown">
                <a href="services.html" class="nav__drop-trigger">Services <span>⌄</span></a>
                <div class="nav__panel nav__panel--mega">
                  ${groups
                    .map(
                      (group) => `
                    <div class="nav__group">
                      <div class="nav__group-title">${icon(group.icon)} ${group.title}</div>
                      ${group.slugs
                        .map((slug) => {
                          const service = bySlug.get(slug);
                          return service ? `<a href="${service.slug}.html">${service.title}</a>` : "";
                        })
                        .join("")}
                    </div>`
                    )
                    .join("")}
                </div>
              </div>
              <a href="about.html">About</a>
              <a href="contact.html">Contact</a>
            </nav>
            <div class="navbar__actions">
              <button class="icon-btn search-toggle" type="button" aria-label="Open search">${icon("search")}</button>
              <a class="btn btn--primary" href="contact.html">${cfg.ctaPrimary} ${icon("bug")}</a>
              <button class="mobile-toggle" type="button" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button>
            </div>
          </div>
        </div>
        <div class="mobile-menu" aria-hidden="true">
          <div class="mobile-menu__head">
            <a class="brand" href="index.html"><span class="brand__mark">${icon("paw-print")}</span><span class="brand__text">${cfg.companyName}</span></a>
            <button class="mobile-close" type="button" aria-label="Close menu">${icon("x")}</button>
          </div>
          <a href="index.html">Home</a>
          <button class="mobile-accordion" type="button" aria-expanded="false">Services <span>+</span></button>
          <div class="mobile-accordion__panel">
            ${services.map((service) => `<a href="${service.slug}.html">${service.title}</a>`).join("")}
          </div>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
          <a class="btn btn--primary" href="contact.html">${cfg.ctaPrimary}</a>
          <a class="mobile-menu__contact" data-phone-link href="${phoneHref()}">${cfg.phoneDisplay}</a>
          <a class="mobile-menu__contact" data-email-link href="${emailHref()}">${cfg.email}</a>
        </div>`;
    }

    const footer = document.querySelector("[data-site-footer]");
    if (footer) {
      footer.innerHTML = `
        <div class="footer__marquee" aria-hidden="true">
          <div class="footer__marquee-track">
            <span>WILDLIFE.REMOVAL</span><span>HUMANE.EXCLUSION</span><span>ATTIC.CLEANUP</span><span>PREVENTION.REPAIRS</span>
            <span>WILDLIFE.REMOVAL</span><span>HUMANE.EXCLUSION</span><span>ATTIC.CLEANUP</span><span>PREVENTION.REPAIRS</span>
          </div>
          <div class="footer__marquee-track">
            <span>WILDLIFE.REMOVAL</span><span>HUMANE.EXCLUSION</span><span>ATTIC.CLEANUP</span><span>PREVENTION.REPAIRS</span>
            <span>WILDLIFE.REMOVAL</span><span>HUMANE.EXCLUSION</span><span>ATTIC.CLEANUP</span><span>PREVENTION.REPAIRS</span>
          </div>
        </div>
        <div class="container footer__grid">
          <div class="footer__brand">
            <a class="brand brand--footer" href="index.html"><span class="brand__mark">${icon("paw-print")}</span><span class="brand__text" data-company-name>${cfg.companyName}</span></a>
            <p data-footer-text-primary>${cfg.footerTextPrimary}</p>
            <p class="footer__line" data-footer-company-line>${cfg.companyName} - ${cfg.addressLine1}, ${cfg.addressLine2} - ${cfg.companyId}</p>
          </div>
          <div>
            <h2>Services</h2>
            ${services.slice(0, 6).map((service) => `<a href="${service.slug}.html">${service.title}</a>`).join("")}
          </div>
          <div>
            <h2>Contact</h2>
            <a data-phone-link href="${phoneHref()}">${icon("phone")} <span data-phone-text>${cfg.phoneDisplay}</span></a>
            <a data-email-link href="${emailHref()}">${icon("mail")} <span data-email-text>${cfg.email}</span></a>
            <a data-website-link href="https://${cfg.website}">${icon("website")} <span data-website-text>${cfg.website}</span></a>
            <p>${cfg.businessHours}</p>
          </div>
          <div>
            <h2>Legal pages</h2>
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms & Conditions</a>
            <a href="cookie-policy.html">Cookie Policy</a>
            <p class="footer__small" data-footer-text-secondary>${cfg.footerTextSecondary}</p>
          </div>
        </div>
        <div class="container footer__disclaimer">
          <p data-footer-disclaimer>${cfg.footerDisclaimer}</p>
          <p data-copyright-line>${cfg.copyrightLine}</p>
        </div>`;
    }
  }

  function renderServices() {
    document.querySelectorAll("[data-services-grid]").forEach((root) => {
      const limit = Number(root.dataset.limit || services.length);
      root.innerHTML = services
        .slice(0, limit)
        .map(
          (service, index) => `
        <article class="service-card reveal" style="--bg:url('${service.heroImage}'); --i:${index}">
          <div class="service-card__icon">${icon(service.icon)}</div>
          <span class="service-card__number">${String(index + 1).padStart(2, "0")}</span>
          <p>${service.eyebrow}</p>
          <h3>${service.title}</h3>
          <p>${service.short}</p>
          <a href="${service.slug}.html">Read more ${icon("arrow")}</a>
        </article>`
        )
        .join("");
    });

    document.querySelectorAll("[data-service-directory]").forEach((root) => {
      root.innerHTML = groups
        .map(
          (group) => `
        <section class="directory-group reveal">
          <div class="directory-group__head">${icon(group.icon)}<h2>${group.title}</h2></div>
          <div class="directory-group__links">
            ${group.slugs
              .map((slug) => {
                const service = bySlug.get(slug);
                return service
                  ? `<a href="${service.slug}.html"><span>${service.title}</span><small>${service.short}</small></a>`
                  : "";
              })
              .join("")}
          </div>
        </section>`
        )
        .join("");
    });
  }

  function renderServiceCarousel() {
    document.querySelectorAll("[data-service-carousel]").forEach((carousel) => {
      const track = carousel.querySelector("[data-carousel-track]");
      const dots = carousel.querySelector("[data-carousel-dots]");
      const prev = carousel.querySelector("[data-carousel-prev]");
      const next = carousel.querySelector("[data-carousel-next]");
      if (!track || !dots || !prev || !next || !services.length) return;

      let index = 0;
      let visible = 3;
      let maxIndex = 0;

      track.innerHTML = services
        .map(
          (service, slideIndex) => `
        <article class="service-slide" aria-label="${service.title}">
          <img src="${service.heroImage}" alt="${service.title} wildlife removal service" loading="lazy">
          <div class="service-slide__body">
            <span>${icon(service.icon)} ${service.eyebrow}</span>
            <h3>${service.title}</h3>
            <p>${service.short}</p>
            <a href="${service.slug}.html">View service ${icon("arrow")}</a>
          </div>
          <b>${String(slideIndex + 1).padStart(2, "0")}</b>
        </article>`
        )
        .join("");

      function getVisibleCount() {
        if (window.matchMedia("(max-width: 640px)").matches) return 1;
        if (window.matchMedia("(max-width: 980px)").matches) return 2;
        return 3;
      }

      function buildDots() {
        dots.innerHTML = Array.from({ length: maxIndex + 1 })
          .map((_, dotIndex) => `<button type="button" aria-label="Show services ${dotIndex + 1}" data-carousel-dot="${dotIndex}"></button>`)
          .join("");
        dots.querySelectorAll("[data-carousel-dot]").forEach((dot) => {
          dot.addEventListener("click", () => {
            index = Number(dot.dataset.carouselDot || 0);
            update();
          });
        });
      }

      function update() {
        const slide = track.querySelector(".service-slide");
        const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 0;
        const step = slide ? slide.getBoundingClientRect().width + gap : 0;
        index = Math.max(0, Math.min(index, maxIndex));
        track.style.transform = `translate3d(${-index * step}px, 0, 0)`;
        prev.disabled = index === 0;
        next.disabled = index === maxIndex;
        dots.querySelectorAll("[data-carousel-dot]").forEach((dot, dotIndex) => {
          dot.classList.toggle("is-active", dotIndex === index);
          dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
        });
      }

      function resize() {
        const nextVisible = getVisibleCount();
        const nextMax = Math.max(0, services.length - nextVisible);
        if (nextVisible !== visible || nextMax !== maxIndex || !dots.children.length) {
          visible = nextVisible;
          maxIndex = nextMax;
          buildDots();
        }
        update();
      }

      prev.addEventListener("click", () => {
        index -= 1;
        update();
      });

      next.addEventListener("click", () => {
        index += 1;
        update();
      });

      window.addEventListener("resize", resize);
      resize();
    });
  }

  function renderServicePage() {
    const root = document.querySelector("[data-service-page]");
    if (!root) return;
    const params = new URLSearchParams(window.location.search);
    const slug = document.body.dataset.serviceSlug || params.get("service") || services[0]?.slug;
    const service = bySlug.get(slug) || services[0];
    const related = service.related.map((item) => bySlug.get(item)).filter(Boolean);

    document.title = `${service.title} | ${cfg.companyName}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", service.short);

    root.innerHTML = `
      <section class="page-hero service-hero" style="--hero-image:url('${service.heroImage}')">
        <div class="page-hero__grid" aria-hidden="true"></div>
        <div class="container service-hero__inner">
          <div class="page-hero__copy reveal">
            <span class="eyebrow">${icon(service.icon)} ${service.eyebrow}</span>
            <h1>${service.title}</h1>
            <p>${service.short}</p>
            <div class="hero__actions">
              <a class="btn btn--primary" href="contact.html">${cfg.ctaPrimary}</a>
              <a class="btn btn--ghost" data-phone-link href="${phoneHref()}">${cfg.phoneDisplay}</a>
            </div>
          </div>
          <div class="service-hero__card reveal">
            <span>Response focus</span>
            <strong>Inspection + removal + prevention</strong>
            <p>${service.category}</p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container split split--wide">
          <div class="reveal">
            <span class="eyebrow">${icon("check")} Complete service scope</span>
            <h2>Complete ${service.title.toLowerCase()} for the whole problem.</h2>
            <p class="lead">${service.intro}</p>
            <p>Every property is different, so the provider's final plan should be based on species behavior, access points, safety conditions, and local rules. The goal is to resolve the current activity and reduce the chance of repeat entry.</p>
          </div>
          <figure class="image-frame reveal">
            <img src="${service.mainImage}" alt="${service.title} service technician inspecting a property" loading="lazy">
          </figure>
        </div>
      </section>
      <section class="section section--dark">
        <div class="container service-detail-grid">
          <div class="detail-panel reveal">
            <span class="eyebrow">Included work</span>
            <h2>What this service can include</h2>
            <ul class="check-list">${service.included.map((item) => `<li>${icon("check")}${item}</li>`).join("")}</ul>
          </div>
          <div class="detail-panel detail-panel--lime reveal">
            <span class="eyebrow">Best fit</span>
            <h2>When to request this service</h2>
            <ul>${service.bestFor.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-title reveal">
            <span class="eyebrow">Field process</span>
            <h2>A practical plan from first inspection to prevention</h2>
          </div>
          <div class="process-grid">
            ${service.process
              .map(
                (step, index) => `
              <article class="process-card reveal">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <p>${step}</p>
              </article>`
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="section section--soft">
        <div class="container split">
          <div class="reveal">
            <span class="eyebrow">Details that matter</span>
            <h2>Important notes before work begins</h2>
            <ul class="feature-list">${service.details.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
          <div class="faq reveal">
            ${service.faq
              .map(
                (item) => `
              <details>
                <summary>${item.q}</summary>
                <p>${item.a}</p>
              </details>`
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-title reveal">
            <span class="eyebrow">Related work</span>
            <h2>Services often paired with ${service.title}</h2>
          </div>
          <div class="services-grid services-grid--compact">
            ${related
              .map(
                (item, index) => `
              <article class="service-card reveal" style="--bg:url('${item.heroImage}'); --i:${index}">
                <div class="service-card__icon">${icon(item.icon)}</div>
                <h3>${item.title}</h3>
                <p>${item.short}</p>
                <a href="${item.slug}.html">Open service ${icon("arrow")}</a>
              </article>`
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="cta-band">
        <div class="container cta-band__inner reveal">
          <h2>Need help with ${service.title.toLowerCase()}?</h2>
          <p data-disclaimer-short>${cfg.disclaimerShort}</p>
          <a class="btn btn--primary" href="contact.html">${cfg.ctaPrimary}</a>
        </div>
      </section>`;
  }

  function setupInteractions() {
    const body = document.body;
    const toggle = document.querySelector(".mobile-toggle");
    const close = document.querySelector(".mobile-close");
    const menu = document.querySelector(".mobile-menu");
    const accordion = document.querySelector(".mobile-accordion");

    function setMenu(open) {
      body.classList.toggle("menu-open", open);
      menu?.setAttribute("aria-hidden", String(!open));
      toggle?.setAttribute("aria-expanded", String(open));
    }

    toggle?.addEventListener("click", () => setMenu(true));
    close?.addEventListener("click", () => setMenu(false));
    accordion?.addEventListener("click", () => {
      const open = accordion.getAttribute("aria-expanded") === "true";
      accordion.setAttribute("aria-expanded", String(!open));
    });

    const header = document.querySelector("[data-site-header]");
    const sticky = () => header?.classList.toggle("is-sticky", window.scrollY > 70);
    sticky();
    window.addEventListener("scroll", sticky, { passive: true });

    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -30px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));

    document.querySelectorAll("[data-counter]").forEach((el) => {
      const target = Number(el.dataset.counter || 0);
      let started = false;
      const counterObserver = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        const start = performance.now();
        const duration = 1200;
        const suffix = el.dataset.suffix || "";
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
      counterObserver.observe(el);
    });

    document.querySelectorAll(".faq details").forEach((detail) => {
      detail.addEventListener("toggle", () => {
        if (!detail.open) return;
        detail.parentElement?.querySelectorAll("details").forEach((other) => {
          if (other !== detail) other.open = false;
        });
      });
    });

    const cookie = document.querySelector("[data-cookie-banner]");
    const key = `cookie:${cfg.companyName || "wildguard"}:preference`;
    if (cookie && !localStorage.getItem(key)) cookie.classList.add("is-visible");
    document.querySelectorAll("[data-cookie-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        localStorage.setItem(key, button.dataset.cookieChoice || "set");
        cookie?.classList.remove("is-visible");
      });
    });

    const form = document.querySelector("[data-lead-form]");
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.querySelector("[data-form-success]");
      if (message) {
        message.innerHTML = `<strong>${cfg.formSuccessLead}</strong><span>${cfg.formSuccessDetail
          .replace("{company}", cfg.companyName)
          .replace("{email}", cfg.email)}</span>`;
        message.classList.add("is-visible");
      }
      form.reset();
    });

    document.querySelector("[data-back-top]")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function loadServiceOptions() {
    document.querySelectorAll("[data-service-options]").forEach((select) => {
      select.innerHTML = `<option value="">Select a service</option>${services
        .map((service) => `<option value="${service.title}">${service.title}</option>`)
        .join("")}`;
    });
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  function init() {
    renderHeaderFooter();
    hydrateConfig();
    renderServices();
    renderServiceCarousel();
    renderServicePage();
    loadServiceOptions();
    setupInteractions();
    refreshIcons();
    document.documentElement.style.setProperty("--asset-version", `"${version}"`);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
