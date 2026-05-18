const products = [
  {
    id: 1,
    image: "domates",
    category: "Sebze Fidesi",
    name: "Domates Fidesi",
    description:
      "Güçlü kök gelişimi ve sağlıklı yapısıyla dikime hazır domates fideleri.",
  },
  {
    id: 2,
    image: "biber",
    category: "Sebze Fidesi",
    name: "Biber Fidesi",
    description:
      "Serada özenle yetiştirilen, üretim planınıza uyum sağlayan biber fideleri.",
  },
  {
    id: 3,
    image: "patlıcan",
    category: "Sebze Fidesi",
    name: "Patlıcan Fidesi",
    description:
      "Dengeli gelişim gösteren, dikim dönemine uygun patlıcan fideleri.",
  },
  {
    id: 4,
    image: "kabak",
    category: "Sebze Fidesi",
    name: "Kabak Fidesi",
    description: "Canlı yaprak ve kök yapısıyla üretime hazır kabak fideleri.",
  },
  {
    id: 5,
    image: "salatalık",
    category: "Sebze Fidesi",
    name: "Salatalık Fidesi",
    description:
      "Sera koşullarında düzenli gelişimle hazırlanan salatalık fideleri.",
  },
  {
    id: 6,
    image: "marul",
    category: "Sebze Fidesi",
    name: "Marul Fidesi",
    description:
      "Taze üretim hedefleyen yetiştiriciler için pratik marul fide seçenekleri.",
  },
  {
    id: 7,
    image: "reyhan",
    category: "Aromatik Fide",
    name: "Reyhan Fidesi",
    description:
      "Aromatik üretimler için sağlıklı, canlı ve bakımlı reyhan fideleri.",
  },
];

const orderPhone = "+905422503525";

function productCard(product) {
  const imgBase = `${basePath}assets/img/${product.image}`;
  const message = encodeURIComponent(
    `${product.name} siparişi vermek istiyorum. Bilgi alabilir miyim?`,
  );

  return `
    <div class="col-md-6 col-lg-4">
  <article class="product-card h-100 rounded-4 bg-white shadow-sm overflow-hidden">
    <picture>
      <source
        srcset="${imgBase}.avif 1x, ${imgBase}@2x.avif 2x"
        type="image/avif"
      >
      <img
        class="product-img js-product-image"
        src="${imgBase}.avif"
        alt="${product.name}"
        data-full="${imgBase}@2x.avif"
        data-title="${product.name}"
      >
    </picture>

    <div class="p-4">
      <span class="badge rounded-pill product-badge mb-3">
        ${product.category}
      </span>

      <h3 class="h5 fw-bold mb-2">${product.name}</h3>

      <p class="text-muted">${product.description}</p>

      <div class="d-grid d-sm-flex gap-2">
        <a
          class="btn btn-primary btn-sm rounded-pill flex-fill"
          href="https://wa.me/${orderPhone.replace("+", "")}?text=${message}"
          target="_blank"
          rel="noopener"
        >
          <i class="bi bi-whatsapp me-1"></i>WhatsApp Sipariş
        </a>

        <a
          class="btn btn-outline-secondary btn-sm rounded-pill flex-fill"
          href="tel:${orderPhone}"
        >
          <i class="bi bi-telephone me-1"></i>Telefon Sipariş
        </a>
      </div>
    </div>
  </article>
</div>
  `;
}

function renderProducts() {
  const homeProducts = document.querySelector("#home-products");
  const productsGrid = document.querySelector("#products-grid");

  if (homeProducts) {
    homeProducts.innerHTML = products.slice(-3).map(productCard).join("");
  }

  if (productsGrid) {
    productsGrid.innerHTML = products.map(productCard).join("");
  }
}

renderProducts();

let productImageScale = 1;

document.addEventListener("click", function (event) {
  const image = event.target.closest(".js-product-image");

  if (image) {
    const modalElement = document.querySelector("#productImageModal");
    const modalImage = document.querySelector("#productImagePreview");
    const modalTitle = document.querySelector("#productImageTitle");

    productImageScale = 1;

    modalImage.src = image.dataset.full || image.src;
    modalImage.alt = image.alt;
    modalImage.style.transform = `scale(${productImageScale})`;
    modalTitle.textContent = image.dataset.title || image.alt;

    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    return;
  }

  const modalImage = document.querySelector("#productImagePreview");

  if (!modalImage) return;

  if (event.target.closest("[data-zoom-in]")) {
    productImageScale = Math.min(productImageScale + 0.25, 3);
    modalImage.style.transform = `scale(${productImageScale})`;
  }

  if (event.target.closest("[data-zoom-out]")) {
    productImageScale = Math.max(productImageScale - 0.25, 1);
    modalImage.style.transform = `scale(${productImageScale})`;
  }

  if (event.target.closest("[data-zoom-reset]")) {
    productImageScale = 1;
    modalImage.style.transform = `scale(${productImageScale})`;
  }

  if (event.target.closest("#productImagePreview")) {
    productImageScale = productImageScale === 1 ? 2 : 1;
    modalImage.style.transform = `scale(${productImageScale})`;
    modalImage.style.cursor = productImageScale === 1 ? "zoom-in" : "zoom-out";
  }
});
