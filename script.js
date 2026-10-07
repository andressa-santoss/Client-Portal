const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const modal = document.getElementById("demoModal");
const toast = document.getElementById("toast");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

menuToggle.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const cursorGlow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

function showToast(title, text) {
  document.getElementById("toastTitle").textContent = title;
  document.getElementById("toastText").textContent = text;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

document.getElementById("demoBtn").addEventListener("click", () => {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
});

document.getElementById("closeModal").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

const demoContent = document.getElementById("demoContent");
document.querySelectorAll(".demo-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".demo-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const type = tab.dataset.demoTab;
    const content = {
      projects: `<strong>Website redesign</strong><p>78% concluído · 2 tarefas aguardando aprovação.</p><div class="progress"><span style="width:78%"></span></div>`,
      messages: `<strong>3 conversas recentes</strong><p>“A última versão ficou incrível. Podemos publicar.”</p><div class="progress"><span style="width:92%"></span></div>`,
      finance: `<strong>R$ 3.750,00</strong><p>Saldo em aberto · próximo vencimento em 8 dias.</p><div class="progress"><span style="width:64%"></span></div>`
    };
    demoContent.innerHTML = content[type];
  });
});

document.getElementById("projectBtn").addEventListener("click", () => {
  showToast("Projeto aberto", "Detalhes do Website redesign carregados.");
});

document.querySelectorAll(".metric-card[data-demo]").forEach(card => {
  card.addEventListener("click", () => {
    const type = card.dataset.demo;
    showToast(type === "projects" ? "Projetos" : "Tarefas", type === "projects" ? "Você tem 3 projetos ativos." : "2 tarefas aguardam sua aprovação.");
  });
});

document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
});

document.getElementById("loginBtn").addEventListener("click", () => {
  showToast("Área de login", "O fluxo de autenticação será conectado na próxima etapa.");
});

document.getElementById("startBtn").addEventListener("click", () => {
  showToast("Bem-vinda ao ClientPortal", "O cadastro gratuito será conectado ao backend depois.");
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
});

// Pequeno efeito de profundidade no dashboard
const demo = document.querySelector(".demo-window");
window.addEventListener("pointermove", e => {
  if (window.innerWidth < 900) return;
  const rect = demo.getBoundingClientRect();
  if (e.clientX < rect.left - 100 || e.clientX > rect.right + 100 ||
      e.clientY < rect.top - 100 || e.clientY > rect.bottom + 100) return;
  const x = (e.clientX - rect.left) / rect.width - .5;
  const y = (e.clientY - rect.top) / rect.height - .5;
  demo.style.transform = `perspective(1400px) rotateY(${x * 3}deg) rotateX(${y * -2}deg)`;
});
demo.addEventListener("mouseleave", () => {
  demo.style.transform = "perspective(1400px) rotateY(-3deg)";
});
