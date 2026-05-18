const company = {
  name: "Yeryüzü Bitkileri Tarım Fidecilik",
  shortName: "YTF",
  logo: "logo",
  phone: "+905422503525",
  phoneHref: "+905422503525",
  email: "info@example.com",
  address: "Dikili / İzmir",
};

const layoutScript = document.querySelector('script[src$="layout.js"]');
const basePath = layoutScript
  ? layoutScript.getAttribute("src").replace(/js\/layout\.js.*/, "")
  : "./";
const page = document.body.dataset.page || "home";

const routes = [
  { key: "home", label: "Anasayfa", href: `${basePath}index.html` },
  { key: "hakkimizda", label: "Hakkımızda", href: `${basePath}hakkimizda/` },
  { key: "urunler", label: "Ürünler", href: `${basePath}urunler/` },
  { key: "iletisim", label: "İletişim", href: `${basePath}iletisim/` },
];

function companyLogo(className = "site-logo-img", width = 72, height = 72) {
  const logoBase = `${basePath}assets/img/${company.logo}`;

  return `
    <img
      class="${className}"
      src="${logoBase}.avif"
      alt="${company.name}"
      width="${width}"
      height="${height}"
      loading="eager"
      fetchpriority="high"
      decoding="async"
    >
  `;
}

function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg fixed-top shadow-sm";
  nav.innerHTML = `
    <div class="container">
      <a class="navbar-brand site-logo-link d-inline-flex align-items-center" href="${basePath}index.html" aria-label="${company.name} anasayfa">
        ${companyLogo("site-logo-img", 72, 72)}
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Menüyü aç/kapat">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
          ${routes
            .map(
              (route) => `
                <li class="nav-item">
                  <a
                    class="nav-link rounded-pill px-lg-3 ${page === route.key ? "active" : ""}"
                    ${page === route.key ? 'aria-current="page"' : ""}
                    href="${route.href}"
                  >
                    ${route.label}
                  </a>
                </li>
              `,
            )
            .join("")}
        </ul>
      </div>
    </div>
  `;
  document.body.prepend(nav);
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <section id="cta-seridi" class="cta-band py-4">
      <div class="container">
        <div class="row g-3 align-items-center">
          <div class="col-lg">
            <h2 class="h4 fw-bold mb-1">Yeryüzünün köklerinden sizlere fideler yetiştiriyoruz.</h2>
            <p class="mb-0">Dikili seralarımızdaki güncel fide çeşitlerini inceleyin.</p>
          </div>

          <div class="col-lg-auto">
            <a class="btn btn-light rounded-pill px-4" href="${basePath}urunler/">Ürünleri Gör</a>
          </div>
        </div>
      </div>
    </section>

    <div class="footer-main py-5">
      <div class="container">
        <div class="row g-4 align-items-start">
          <div class="col-lg-4">
            <a class="footer-logo d-inline-flex align-items-center text-decoration-none mb-3" href="${basePath}index.html" aria-label="${company.name} anasayfa">
              ${companyLogo("footer-logo-img", 132, 132)}
            </a>

            <p class="mb-3">${company.name}, ${company.address} konumundaki seralarında sağlıklı ve dikime hazır fideler üretir.</p>

            <div class="d-flex gap-2">
  <a class="social-link rounded-circle" href="#" aria-label="Instagram">
    <svg class="social-icon" width="20" height="20" aria-hidden="true">
      <use href="../assets/img/icons.svg#icon-instagram"></use>
    </svg>
  </a>

  <a class="social-link rounded-circle" href="#" aria-label="Facebook">
    <svg class="social-icon" width="20" height="20" aria-hidden="true">
      <use href="../assets/img/icons.svg#icon-facebook"></use>
    </svg>
  </a>

  <a class="social-link rounded-circle" href="#" aria-label="YouTube">
    <svg class="social-icon" width="20" height="20" aria-hidden="true">
      <use href="../assets/img/icons.svg#icon-youtube"></use>
    </svg>
  </a>
</div>
          </div>

          <div class="col-sm-6 col-lg-3">
            <h2 class="h5 fw-bold mb-3">Sayfalar</h2>

            <ul class="list-unstyled d-grid gap-2 mb-0">
              ${routes
                .map(
                  (route) =>
                    `<li><a class="footer-link" href="${route.href}">${route.label}</a></li>`,
                )
                .join("")}
            </ul>
          </div>

          <div class="col-sm-6 col-lg-2">
            <h2 class="h5 fw-bold mb-3">İletişim</h2>

            <ul class="list-unstyled d-grid gap-2 mb-0">
              <li>${company.address}</li>
              <li><a class="footer-link" href="tel:${company.phoneHref}">${company.phone}</a></li>
              <li><a class="footer-link" href="mailto:${company.email}">${company.email}</a></li>
            </ul>
          </div>

          <div class="col-lg-3">
            <h2 class="h5 fw-bold mb-3">Bülten</h2>
            <p>Yeni ürün ve üretim duyuruları için e-posta adresinizi bırakın.</p>

            <form class="d-flex gap-2">
              <label class="visually-hidden" for="subscribeEmail">E-posta</label>
              <input id="subscribeEmail" class="form-control rounded-pill" type="email" placeholder="E-posta adresiniz">
              <button class="btn btn-primary rounded-pill" type="submit">Katıl</button>
            </form>
          </div>
        </div>

        <hr class="opacity-25 my-4">

        <p class="small mb-0">© ${new Date().getFullYear()} ${company.name}. Tüm hakları saklıdır.</p>
      </div>
    </div>
  `;
  document.body.append(footer);
}

function createMobileActionBar() {
  const bar = document.createElement("div");
  bar.className = "fixed-action-bar shadow-lg";
  bar.innerHTML = `
   <a href="https://wa.me/${company.phoneHref.replace("+", "")}" target="_blank" rel="noopener">
  <svg class="nav-action-icon" width="20" height="20" aria-hidden="true">
    <use href="${basePath}assets/img/icons.svg#icon-whatsapp"></use>
  </svg>
  <span>WhatsApp</span>
</a>

<a href="tel:${company.phoneHref}">
  <svg class="nav-action-icon" width="20" height="20" aria-hidden="true">
    <use href="${basePath}assets/img/icons.svg#icon-telephone"></use>
  </svg>
  <span>Ara</span>
</a>

<a href="${basePath}iletisim/">
  <svg class="nav-action-icon" width="20" height="20" aria-hidden="true">
    <use href="${basePath}assets/img/icons.svg#icon-chat-left-dots"></use>
  </svg>
  <span>İletişim</span>
</a>
  `;
  document.body.append(bar);
}

function handleNavbarVisibility() {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  let lastScrollY = window.scrollY;
  const threshold = 80;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= threshold) {
      navbar.classList.remove("navbar-hidden");
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY) {
      navbar.classList.add("navbar-hidden");
    } else {
      navbar.classList.remove("navbar-hidden");
    }

    lastScrollY = currentScrollY;
  });
}

createNavbar();
createFooter();
createMobileActionBar();
handleNavbarVisibility();
