
/* =========================================
   CLIENT PORTAL - JAVASCRIPT GLOBAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. ELEMENTOS DA LANDING PAGE
  ===================================== */

  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const modal = document.getElementById("demoModal");
  const toast = document.getElementById("toast");

  /* =====================================
     2. ANO AUTOMÁTICO
  ===================================== */

  document.querySelectorAll("[data-ano]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  /* =====================================
     3. MENU E NAVEGAÇÃO
  ===================================== */

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    });
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open);
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =====================================
     4. ANIMAÇÕES AO ROLAR A PÁGINA
  ===================================== */

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });

    document.querySelectorAll(".reveal").forEach(element => {
      observer.observe(element);
    });
  }

  /* =====================================
     5. EFEITO DE CURSOR
  ===================================== */

  const cursorGlow = document.querySelector(".cursor-glow");

  if (cursorGlow) {
    window.addEventListener("pointermove", event => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  }

  /* =====================================
     6. NOTIFICAÇÕES DA LANDING PAGE
  ===================================== */

  function showToast(title, text) {
    const toastTitle = document.getElementById("toastTitle");
    const toastText = document.getElementById("toastText");

    if (!toast || !toastTitle || !toastText) return;

    toastTitle.textContent = title;
    toastText.textContent = text;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  /* =====================================
     7. MODAL DE DEMONSTRAÇÃO
  ===================================== */

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  const demoBtn = document.getElementById("demoBtn");

  if (demoBtn && modal) {
    demoBtn.addEventListener("click", () => {
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    });
  }

  const closeModalBtn = document.getElementById("closeModal");
  const modalBackdrop = document.querySelector(".modal-backdrop");

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });

  /* =====================================
     8. ABAS DA DEMONSTRAÇÃO
  ===================================== */

  const demoContent = document.getElementById("demoContent");

  document.querySelectorAll(".demo-tab").forEach(tab => {

    tab.addEventListener("click", () => {

      document.querySelectorAll(".demo-tab").forEach(item => {
        item.classList.remove("active");
      });

      tab.classList.add("active");

      const type = tab.dataset.demoTab;

      const content = {
        projects: `
                    <strong>Website redesign</strong>
                    <p>78% concluído · 2 tarefas aguardando aprovação.</p>
                    <div class="progress">
                        <span style="width:78%"></span>
                    </div>
                `,

        messages: `
                    <strong>3 conversas recentes</strong>
                    <p>“A última versão ficou incrível. Podemos publicar.”</p>
                    <div class="progress">
                        <span style="width:92%"></span>
                    </div>
                `,

        finance: `
                    <strong>R$ 3.750,00</strong>
                    <p>Saldo em aberto · próximo vencimento em 8 dias.</p>
                    <div class="progress">
                        <span style="width:64%"></span>
                    </div>
                `
      };

      if (demoContent && content[type]) {
        demoContent.innerHTML = content[type];
      }

    });

  });

  /* =====================================
     9. BOTÃO DO PROJETO DEMONSTRATIVO
  ===================================== */

  const projectBtn = document.getElementById("projectBtn");

  if (projectBtn) {
    projectBtn.addEventListener("click", () => {
      showToast(
        "Projeto aberto",
        "Detalhes do Website redesign carregados."
      );
    });
  }

  /* =====================================
     10. CARDS DE INDICADORES
  ===================================== */

  document.querySelectorAll(".metric-card[data-demo]").forEach(card => {

    card.addEventListener("click", () => {

      const type = card.dataset.demo;

      showToast(
        type === "projects" ? "Projetos" : "Tarefas",
        type === "projects"
          ? "Você tem 3 projetos ativos."
          : "2 tarefas aguardam sua aprovação."
      );

    });

  });

  /* =====================================
     11. FAQ
  ===================================== */

  document.querySelectorAll(".faq-item").forEach(item => {

    item.addEventListener("click", () => {

      const wasOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach(element => {
        element.classList.remove("open");
      });

      if (!wasOpen) {
        item.classList.add("open");
      }

    });

  });

  /* =====================================
     12. LINKS INTERNOS
  ===================================== */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });

  /* =====================================
     13. EFEITO DE PROFUNDIDADE NO DASHBOARD
  ===================================== */

  const demo = document.querySelector(".demo-window");

  if (demo) {

    window.addEventListener("pointermove", event => {

      if (window.innerWidth < 900) return;

      const rect = demo.getBoundingClientRect();

      if (
        event.clientX < rect.left - 100 ||
        event.clientX > rect.right + 100 ||
        event.clientY < rect.top - 100 ||
        event.clientY > rect.bottom + 100
      ) return;

      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;

      demo.style.transform =
        `perspective(1400px) rotateY(${x * 3}deg) rotateX(${y * -2}deg)`;

    });

    demo.addEventListener("mouseleave", () => {
      demo.style.transform =
        "perspective(1400px) rotateY(-3deg)";
    });

  }


  /* =========================================
     14. LOGIN - CLIENT PORTAL
  ========================================= */

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {

    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const forgotPassword = document.getElementById("forgotPassword");
    const authToast = document.getElementById("authToast");

    /* Notificações do login */

    function loginNotification(message) {

      if (!authToast) return;

      authToast.textContent = message;
      authToast.classList.add("show");

      clearTimeout(window.authToastTimer);

      window.authToastTimer = setTimeout(() => {
        authToast.classList.remove("show");
      }, 3500);

    }

    /* Mostrar e ocultar senha */

    if (passwordInput && togglePassword) {

      togglePassword.addEventListener("click", () => {

        const showing = passwordInput.type === "text";

        passwordInput.type = showing ? "password" : "text";

        togglePassword.textContent = showing
          ? "Mostrar"
          : "Ocultar";

        togglePassword.setAttribute(
          "aria-label",
          showing ? "Mostrar senha" : "Ocultar senha"
        );

      });

    }

    /* Recuperação de senha */

    if (forgotPassword) {

      forgotPassword.addEventListener("click", event => {

        event.preventDefault();

        const email = document.getElementById("email");

        if (!email || !email.value.trim()) {
          loginNotification(
            "Informe seu e-mail para recuperar sua senha."
          );

          if (email) email.focus();

          return;
        }

        loginNotification(
          "A recuperação de senha será habilitada com o Firebase."
        );

      });

    }

    /* Envio do formulário */

    loginForm.addEventListener("submit", event => {

      event.preventDefault();

      const email = document.getElementById("email");
      const accountType = document.getElementById("accountType");

      if (!email || !passwordInput || !accountType) return;

      const emailValue = email.value.trim();
      const password = passwordInput.value;
      const type = accountType.value;

      if (!emailValue || !password) {
        loginNotification("Preencha todos os campos.");
        return;
      }

      if (password.length < 6) {
        loginNotification(
          "A senha deve ter pelo menos 6 caracteres."
        );
        return;
      }

      loginNotification(
        type === "company"
          ? "A autenticação da empresa será conectada ao Firebase."
          : "A autenticação do cliente será conectada ao Firebase."
      );

      // A autenticação real será implementada posteriormente.

    });

  }

});


// =========================================
// CADASTRO DE USUÁRIO
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  // Mostrar ou ocultar senha
  document.querySelectorAll("[data-toggle-password]").forEach(button => {
    button.addEventListener("click", () => {
      const inputId = button.dataset.togglePassword;
      const passwordInput = document.getElementById(inputId);

      if (!passwordInput) return;

      const showingPassword = passwordInput.type === "text";

      passwordInput.type = showingPassword ? "password" : "text";
      button.textContent = showingPassword ? "Mostrar" : "Ocultar";
    });
  });

  // Processar formulário de cadastro
  if (registerForm) {
    registerForm.addEventListener("submit", event => {
      event.preventDefault();

      const name = document.getElementById("registerName").value.trim();
      const company = document.getElementById("registerCompany").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const acceptTerms = document.getElementById("acceptTerms").checked;
      const message = document.getElementById("registerMessage");

      const showMessage = (text, type) => {
        message.textContent = text;
        message.className = `auth-message show ${type}`;
      };

      if (!name || !company || !email || !password || !confirmPassword) {
        showMessage("Preencha todos os campos para continuar.", "error");
        return;
      }

      if (password.length < 6) {
        showMessage("A senha precisa ter pelo menos 6 caracteres.", "error");
        return;
      }

      if (password !== confirmPassword) {
        showMessage("As senhas digitadas não são iguais.", "error");
        return;
      }

      if (!acceptTerms) {
        showMessage("Você precisa aceitar os termos para continuar.", "error");
        return;
      }

      showMessage(
        "A tela de cadastro está validada! A próxima etapa será conectar o formulário ao Firebase para criar e salvar sua conta.",
        "success"
      );
    });
  }

  // Atualizar ano automaticamente
  document.querySelectorAll("[data-ano]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });
});

/* =========================================
   CLIENTPORTAL — DASHBOARD
========================================= */

(() => {
  const dashboard = document.querySelector('[data-page="dashboard"]');

  // Executa somente na página do Dashboard
  if (!dashboard) return;

  // Data atual
  const dateElement = document.getElementById('dashboardDate');

  if (dateElement) {
    dateElement.textContent = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
  }

  // Atualiza o ano automaticamente
  document.querySelectorAll('[data-ano]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // Menu lateral no celular
  const sidebar = document.getElementById('sidebar');
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function closeSidebar() {
    sidebar?.classList.remove('mobile-open');
    sidebarOverlay?.classList.remove('show');
  }

  mobileMenuButton?.addEventListener('click', () => {
    sidebar?.classList.toggle('mobile-open');
    sidebarOverlay?.classList.toggle('show');
  });

  sidebarOverlay?.addEventListener('click', closeSidebar);

  // Fecha menu ao acessar uma página
  sidebar?.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // Menu do perfil
  const profileButton = document.getElementById('profileButton');
  const profileMenu = document.getElementById('profileMenu');

  profileButton?.addEventListener('click', () => {
    profileMenu?.classList.toggle('show');
  });

  document.addEventListener('click', event => {
    if (
      profileMenu &&
      profileButton &&
      !profileMenu.contains(event.target) &&
      !profileButton.contains(event.target)
    ) {
      profileMenu.classList.remove('show');
    }
  });

  // Interação visual das tarefas
  dashboard.querySelectorAll('.dashboard-task input').forEach(input => {
    input.addEventListener('change', () => {
      const task = input.closest('.dashboard-task');

      if (task) {
        task.classList.toggle('task-completed', input.checked);
      }
    });
  });

})();


/* =========================================
   CLIENTPORTAL — GERENCIAMENTO DE PROJETOS
========================================= */

(() => {
  const page = document.querySelector('[data-page="projetos"]');
  if (!page) return;

  const STORAGE_KEY = 'clientPortalProjects';

  const initialProjects = [
    {
      id: 'p1',
      name: 'Website institucional',
      client: 'Studio Criativo',
      responsible: 'Mariana Costa',
      start: '2026-10-01',
      deadline: '2026-11-20',
      progress: 75,
      status: 'Em andamento',
      description: 'Desenvolvimento do website institucional.'
    },
    {
      id: 'p2',
      name: 'Identidade visual',
      client: 'Alpha Solutions',
      responsible: 'Rafael Alves',
      start: '2026-10-05',
      deadline: '2026-11-25',
      progress: 45,
      status: 'Em revisão',
      description: 'Criação da identidade visual da empresa.'
    },
    {
      id: 'p3',
      name: 'Aplicativo mobile',
      client: 'MoveTech',
      responsible: 'João Silva',
      start: '2026-09-15',
      deadline: '2026-10-30',
      progress: 90,
      status: 'Em andamento',
      description: 'Desenvolvimento de aplicativo mobile.'
    },
    {
      id: 'p4',
      name: 'Landing page',
      client: 'Nova Agência',
      responsible: 'Ana Martins',
      start: '2026-09-01',
      deadline: '2026-10-15',
      progress: 100,
      status: 'Concluído',
      description: 'Design e desenvolvimento de landing page.'
    }
  ];

  const tableBody = document.getElementById('projectsTableBody');
  const searchInput = document.getElementById('projectSearch');
  const statusFilter = document.getElementById('projectStatusFilter');
  const emptyState = document.getElementById('projectsEmpty');
  const modal = document.getElementById('projectModal');
  const form = document.getElementById('projectForm');

  let projects = [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    projects = saved ? JSON.parse(saved) : initialProjects;

    if (!Array.isArray(projects)) {
      projects = initialProjects;
    }
  } catch (error) {
    projects = initialProjects;
  }

  function saveProjects() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  function formatDate(date) {
    if (!date) return '—';

    const parts = date.split('-');
    if (parts.length !== 3) return '—';

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  function getEffectiveStatus(project) {
    if (project.status !== 'Concluído' &&
      project.deadline &&
      project.deadline < new Date().toISOString().slice(0, 10)) {
      return 'Atrasado';
    }

    return project.status;
  }

  function getStatusClass(status) {
    const classes = {
      'Em andamento': 'status-progress',
      'Em revisão': 'status-review',
      'Concluído': 'status-complete',
      'Pausado': 'status-review',
      'Atrasado': 'status-delayed'
    };

    return classes[status] || 'status-review';
  }

  function getProjectColor(name) {
    const colors = [
      ['blue-bg', '#'],
      ['purple-bg', '#'],
      ['orange-bg', '#'],
      ['green-bg', '#']
    ];

    const index = name.length % colors.length;
    return colors[index][0];
  }

  function renderProjects() {
    const search = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;

    const filtered = projects.filter(project => {
      const matchesSearch =
        project.name.toLowerCase().includes(search) ||
        project.client.toLowerCase().includes(search);

      const matchesStatus =
        !selectedStatus ||
        getEffectiveStatus(project) === selectedStatus;

      return matchesSearch && matchesStatus;
    });

    tableBody.innerHTML = '';

    filtered.forEach(project => {
      const status = getEffectiveStatus(project);
      const color = getProjectColor(project.name);
      const progress = Math.min(100, Math.max(0, Number(project.progress) || 0));

      const row = document.createElement('tr');

      row.innerHTML = `
                <td>
                    <div class="project-name-cell">
                        <span class="project-color ${color}">
                            ${escapeHTML(project.name.charAt(0).toUpperCase())}
                        </span>
                        <div>
                            <strong title="${escapeHTML(project.name)}">
                                ${escapeHTML(project.name)}
                            </strong>
                            <small>Projeto empresarial</small>
                        </div>
                    </div>
                </td>

                <td>
                    <span class="project-client-cell">
                        ${escapeHTML(project.client)}
                    </span>
                </td>

                <td>
                    <span class="project-responsible-cell">
                        ${escapeHTML(project.responsible)}
                    </span>
                </td>

                <td>
                    <span class="project-deadline-cell">
                        ${formatDate(project.deadline)}
                    </span>
                </td>

                <td>
                    <div class="project-progress-cell">
                        <div class="progress-info">
                            <span>${progress}%</span>
                        </div>
                        <div class="progress-track">
                            <span style="width:${progress}%"></span>
                        </div>
                    </div>
                </td>

                <td>
                    <span class="status-badge ${getStatusClass(status)}">
                        ${status}
                    </span>
                </td>

                <td>
                    <div class="project-actions">
                        <button type="button"
                                class="project-action-button"
                                data-action="edit"
                                data-id="${escapeHTML(project.id)}"
                                title="Editar projeto">
                            ✎
                        </button>

                        <button type="button"
                                class="project-action-button delete"
                                data-action="delete"
                                data-id="${escapeHTML(project.id)}"
                                title="Excluir projeto">
                            ×
                        </button>
                    </div>
                </td>
            `;

      tableBody.appendChild(row);
    });

    emptyState.hidden = filtered.length > 0;

    document.getElementById('projectsResultCount').textContent =
      `${filtered.length} ${filtered.length === 1 ? 'projeto' : 'projetos'}`;

    updateStatistics();
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  function updateStatistics() {
    const total = projects.length;
    const active = projects.filter(p =>
      ['Em andamento', 'Em revisão'].includes(getEffectiveStatus(p))
    ).length;
    const completed = projects.filter(p =>
      p.status === 'Concluído'
    ).length;
    const delayed = projects.filter(p =>
      getEffectiveStatus(p) === 'Atrasado'
    ).length;

    document.getElementById('totalProjects').textContent = total;
    document.getElementById('activeProjects').textContent = active;
    document.getElementById('completedProjects').textContent = completed;
    document.getElementById('delayedProjects').textContent = delayed;
    document.getElementById('sidebarProjectCount').textContent = total;
  }

  function openModal(project = null) {
    form.reset();

    document.getElementById('projectId').value = '';

    if (project) {
      document.getElementById('projectModalTitle').textContent =
        'Editar projeto';

      document.getElementById('projectId').value = project.id;
      document.getElementById('projectName').value = project.name;
      document.getElementById('projectClient').value = project.client;
      document.getElementById('projectResponsible').value = project.responsible;
      document.getElementById('projectStart').value = project.start;
      document.getElementById('projectDeadline').value = project.deadline;
      document.getElementById('projectStatus').value = project.status;
      document.getElementById('projectProgress').value = project.progress;
      document.getElementById('projectDescription').value =
        project.description || '';
    } else {
      document.getElementById('projectModalTitle').textContent =
        'Novo projeto';

      document.getElementById('projectStatus').value = 'Em andamento';
      document.getElementById('projectProgress').value = 0;
    }

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    document.getElementById('projectName').focus();
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.getElementById('newProjectButton').addEventListener('click', () => {
    openModal();
  });

  document.getElementById('closeProjectModal').addEventListener('click', closeModal);
  document.getElementById('cancelProjectButton').addEventListener('click', closeModal);

  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const id = document.getElementById('projectId').value;
    const start = document.getElementById('projectStart').value;
    const deadline = document.getElementById('projectDeadline').value;
    const progress = Number(document.getElementById('projectProgress').value);
    const status = document.getElementById('projectStatus').value;

    if (deadline < start) {
      alert('O prazo de entrega não pode ser anterior à data de início.');
      return;
    }

    if (status === 'Concluído' && progress !== 100) {
      alert('Um projeto concluído precisa estar com 100% de progresso.');
      return;
    }

    const projectData = {
      id: id || `p${Date.now()}`,
      name: document.getElementById('projectName').value.trim(),
      client: document.getElementById('projectClient').value.trim(),
      responsible: document.getElementById('projectResponsible').value.trim(),
      start,
      deadline,
      progress,
      status,
      description: document.getElementById('projectDescription').value.trim()
    };

    if (status === 'Concluído') {
      projectData.progress = 100;
    }

    if (id) {
      projects = projects.map(project =>
        project.id === id ? projectData : project
      );
    } else {
      projects.unshift(projectData);
    }

    saveProjects();
    renderProjects();
    closeModal();
  });

  tableBody.addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;
    const project = projects.find(item => item.id === id);

    if (!project) return;

    if (action === 'edit') {
      openModal(project);
    }


    if (action === 'delete') {
      openDeleteModal(
        `Deseja realmente excluir o projeto "${project.name}"?`,
        () => {
          projects = projects.filter(item => item.id !== id);
          saveProjects();
          renderProjects();
        }
      );
    }

  });

  searchInput.addEventListener('input', renderProjects);
  statusFilter.addEventListener('change', renderProjects);

  // Cabeçalho e menu lateral
  const dateElement = document.getElementById('projectsDate');

  if (dateElement) {
    dateElement.textContent = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
  }

  document.querySelectorAll('[data-ano]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  const sidebar = document.getElementById('sidebar');
  const mobileButton = document.getElementById('mobileMenuButton');
  const overlay = document.getElementById('sidebarOverlay');

  function closeSidebar() {
    sidebar?.classList.remove('mobile-open');
    overlay?.classList.remove('show');
  }

  mobileButton?.addEventListener('click', () => {
    sidebar?.classList.toggle('mobile-open');
    overlay?.classList.toggle('show');
  });

  overlay?.addEventListener('click', closeSidebar);

  sidebar?.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  const profileButton = document.getElementById('profileButton');
  const profileMenu = document.getElementById('profileMenu');

  profileButton?.addEventListener('click', () => {
    profileMenu?.classList.toggle('show');
  });

  document.addEventListener('click', event => {
    if (
      profileMenu &&
      profileButton &&
      !profileMenu.contains(event.target) &&
      !profileButton.contains(event.target)
    ) {
      profileMenu.classList.remove('show');
    }
  });

  renderProjects();
})();


/* =========================================
   CLIENTPORTAL — GERENCIAMENTO DE CLIENTES
========================================= */

(() => {
  const page = document.querySelector('[data-page="clientes"]');
  if (!page) return;

  const CLIENT_STORAGE_KEY = 'clientPortalClients';
  const PROJECT_STORAGE_KEY = 'clientPortalProjects';

  const initialClients = [
    {
      id: 'c1',
      name: 'Mariana Costa',
      company: 'Studio Criativo',
      email: 'mariana@studiocriativo.com',
      phone: '(11) 98765-4321',
      document: '',
      status: 'Ativo',
      notes: 'Cliente do projeto de website institucional.'
    },
    {
      id: 'c2',
      name: 'Rafael Alves',
      company: 'Alpha Solutions',
      email: 'rafael@alphasolutions.com',
      phone: '(11) 97654-3210',
      document: '',
      status: 'Ativo',
      notes: 'Cliente do projeto de identidade visual.'
    },
    {
      id: 'c3',
      name: 'João Silva',
      company: 'MoveTech',
      email: 'joao@movetech.com',
      phone: '(11) 96543-2109',
      document: '',
      status: 'Ativo',
      notes: 'Cliente do projeto de aplicativo mobile.'
    },
    {
      id: 'c4',
      name: 'Ana Martins',
      company: 'Nova Agência',
      email: 'ana@novaagencia.com',
      phone: '(11) 95432-1098',
      document: '',
      status: 'Inativo',
      notes: 'Projeto de landing page concluído.'
    }
  ];

  const tableBody = document.getElementById('clientsTableBody');
  const searchInput = document.getElementById('clientSearch');
  const statusFilter = document.getElementById('clientStatusFilter');
  const emptyState = document.getElementById('clientsEmpty');

  const modal = document.getElementById('clientModal');
  const detailsModal = document.getElementById('clientDetailsModal');
  const form = document.getElementById('clientForm');

  let clients = [];

  try {
    const saved = localStorage.getItem(CLIENT_STORAGE_KEY);
    clients = saved ? JSON.parse(saved) : initialClients;

    if (!Array.isArray(clients)) {
      clients = initialClients;
    }
  } catch (error) {
    clients = initialClients;
  }

  function saveClients() {
    localStorage.setItem(
      CLIENT_STORAGE_KEY,
      JSON.stringify(clients)
    );
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  function getInitials(name) {
    return String(name || '')
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  }

  function getProjects() {
    try {
      const saved = localStorage.getItem(PROJECT_STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error('Não foi possível carregar os projetos.', error);
    }

    return [
      { client: 'Studio Criativo' },
      { client: 'Alpha Solutions' },
      { client: 'MoveTech' },
      { client: 'Nova Agência' }
    ];
  }

  function getClientProjectCount(client) {
    return getProjects().filter(project =>
      String(project.client || '').trim().toLowerCase() ===
      String(client.company || '').trim().toLowerCase()
    ).length;
  }

  function getStatusClass(status) {
    return status === 'Ativo'
      ? 'status-complete'
      : 'status-inactive';
  }

  function renderClients() {
    const search = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;

    const filtered = clients.filter(client => {
      const searchableText = [
        client.name,
        client.company,
        client.email,
        client.phone
      ].join(' ').toLowerCase();

      const matchesSearch = searchableText.includes(search);
      const matchesStatus =
        !selectedStatus || client.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });

    tableBody.innerHTML = '';

    filtered.forEach(client => {
      const row = document.createElement('tr');
      const projectCount = getClientProjectCount(client);

      row.innerHTML = `
                <td>
                    <div class="client-name-cell">
                        <span class="client-avatar">
                            ${escapeHTML(getInitials(client.name))}
                        </span>
                        <div>
                            <strong>${escapeHTML(client.name)}</strong>
                            <small>${escapeHTML(client.company)}</small>
                        </div>
                    </div>
                </td>

                <td>
                    <span class="client-contact-cell">
                        ${escapeHTML(client.email)}
                    </span>
                </td>

                <td>
                    <span class="client-phone-cell">
                        ${escapeHTML(client.phone)}
                    </span>
                </td>

                <td>
                    <span class="client-project-count">
                        ${projectCount}
                    </span>
                </td>

                <td>
                    <span class="status-badge ${getStatusClass(client.status)}">
                        ${escapeHTML(client.status)}
                    </span>
                </td>

                <td>
                    <div class="client-actions">

                        <button type="button"
                                class="client-action-button"
                                data-action="details"
                                data-id="${escapeHTML(client.id)}"
                                title="Ver detalhes">
                            ⌕
                        </button>

                        <button type="button"
                                class="client-action-button"
                                data-action="edit"
                                data-id="${escapeHTML(client.id)}"
                                title="Editar cliente">
                            ✎
                        </button>

                        <button type="button"
                                class="client-action-button delete"
                                data-action="delete"
                                data-id="${escapeHTML(client.id)}"
                                title="Excluir cliente">
                            ×
                        </button>

                    </div>
                </td>
            `;

      tableBody.appendChild(row);
    });

    emptyState.hidden = filtered.length > 0;

    document.getElementById('clientsResultCount').textContent =
      `${filtered.length} ${filtered.length === 1 ? 'cliente' : 'clientes'}`;

    updateStatistics();
  }

  function updateStatistics() {
    const total = clients.length;
    const active = clients.filter(client =>
      client.status === 'Ativo'
    ).length;
    const inactive = clients.filter(client =>
      client.status === 'Inativo'
    ).length;

    const linkedProjects = clients.reduce((sum, client) => {
      return sum + getClientProjectCount(client);
    }, 0);

    document.getElementById('totalClients').textContent = total;
    document.getElementById('activeClients').textContent = active;
    document.getElementById('inactiveClients').textContent = inactive;
    document.getElementById('linkedProjects').textContent = linkedProjects;
  }

  function openClientModal(client = null) {
    form.reset();
    document.getElementById('clientId').value = '';

    if (client) {
      document.getElementById('clientModalTitle').textContent =
        'Editar cliente';

      document.getElementById('clientId').value = client.id;
      document.getElementById('clientName').value = client.name;
      document.getElementById('clientCompany').value = client.company;
      document.getElementById('clientEmail').value = client.email;
      document.getElementById('clientPhone').value = client.phone;
      document.getElementById('clientStatus').value = client.status;
      document.getElementById('clientDocument').value =
        client.document || '';
      document.getElementById('clientNotes').value =
        client.notes || '';
    } else {
      document.getElementById('clientModalTitle').textContent =
        'Novo cliente';

      document.getElementById('clientStatus').value = 'Ativo';
    }

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    document.getElementById('clientName').focus();
  }

  function closeClientModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeDetailsModal() {
    detailsModal.classList.remove('show');
    detailsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showClientDetails(client) {
    const relatedProjects = getProjects().filter(project =>
      String(project.client || '').trim().toLowerCase() ===
      String(client.company || '').trim().toLowerCase()
    );

    const projectList = relatedProjects.length
      ? relatedProjects.map(project => `
                <div class="client-detail-project">
                    ${escapeHTML(project.name || 'Projeto sem nome')}
                </div>
            `).join('')
      : '<p>Nenhum projeto vinculado a este cliente.</p>';

    document.getElementById('clientDetailsTitle').textContent =
      client.company;

    document.getElementById('clientDetailsContent').innerHTML = `
            <div class="client-detail-profile">
                <span class="client-avatar">
                    ${escapeHTML(getInitials(client.name))}
                </span>
                <div>
                    <h3>${escapeHTML(client.name)}</h3>
                    <p>${escapeHTML(client.company)}</p>
                </div>
            </div>

            <div class="client-detail-grid">
                <div class="client-detail-item">
                    <small>E-mail</small>
                    <strong>${escapeHTML(client.email)}</strong>
                </div>

                <div class="client-detail-item">
                    <small>Telefone</small>
                    <strong>${escapeHTML(client.phone)}</strong>
                </div>

                <div class="client-detail-item">
                    <small>Documento</small>
                    <strong>${escapeHTML(client.document || 'Não informado')}</strong>
                </div>

                <div class="client-detail-item">
                    <small>Status</small>
                    <strong>${escapeHTML(client.status)}</strong>
                </div>
            </div>

            <div class="client-detail-notes">
                <small>Observações</small>
                <p>${escapeHTML(client.notes || 'Nenhuma observação cadastrada.')}</p>
            </div>

            <div class="client-detail-projects">
                <h3>Projetos vinculados (${relatedProjects.length})</h3>
                ${projectList}
            </div>
        `;

    detailsModal.classList.add('show');
    detailsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  document.getElementById('newClientButton').addEventListener('click', () => {
    openClientModal();
  });

  document.getElementById('closeClientModal').addEventListener('click', closeClientModal);
  document.getElementById('cancelClientButton').addEventListener('click', closeClientModal);
  document.getElementById('closeClientDetails').addEventListener('click', closeDetailsModal);

  modal.addEventListener('click', event => {
    if (event.target === modal) closeClientModal();
  });

  detailsModal.addEventListener('click', event => {
    if (event.target === detailsModal) closeDetailsModal();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeClientModal();
      closeDetailsModal();
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const id = document.getElementById('clientId').value;
    const email = document.getElementById('clientEmail').value.trim().toLowerCase();

    const duplicateEmail = clients.some(client =>
      client.email.toLowerCase() === email && client.id !== id
    );

    if (duplicateEmail) {
      alert('Já existe um cliente cadastrado com este e-mail.');
      return;
    }

    const clientData = {
      id: id || `c${Date.now()}`,
      name: document.getElementById('clientName').value.trim(),
      company: document.getElementById('clientCompany').value.trim(),
      email,
      phone: document.getElementById('clientPhone').value.trim(),
      status: document.getElementById('clientStatus').value,
      document: document.getElementById('clientDocument').value.trim(),
      notes: document.getElementById('clientNotes').value.trim()
    };

    if (id) {
      clients = clients.map(client =>
        client.id === id ? clientData : client
      );
    } else {
      clients.unshift(clientData);
    }

    saveClients();
    renderClients();
    closeClientModal();
  });

  tableBody.addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;
    const client = clients.find(item => item.id === id);

    if (!client) return;

    if (action === 'details') {
      showClientDetails(client);
    }

    if (action === 'edit') {
      openClientModal(client);
    }

    if (action === 'delete') {
      const confirmed = confirm(
        `Deseja realmente excluir o cliente "${client.company}"?`
      );

      if (!confirmed) return;

      clients = clients.filter(item => item.id !== id);
      saveClients();
      renderClients();
    }
  });

  searchInput.addEventListener('input', renderClients);
  statusFilter.addEventListener('change', renderClients);

  // DATA DO CABEÇALHO
  const dateElement = document.getElementById('clientsDate');

  if (dateElement) {
    dateElement.textContent = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
  }

  document.querySelectorAll('[data-ano]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // MENU MOBILE
  const sidebar = document.getElementById('sidebar');
  const mobileButton = document.getElementById('mobileMenuButton');
  const overlay = document.getElementById('sidebarOverlay');

  function closeSidebar() {
    sidebar?.classList.remove('mobile-open');
    overlay?.classList.remove('show');
  }

  mobileButton?.addEventListener('click', () => {
    sidebar?.classList.toggle('mobile-open');
    overlay?.classList.toggle('show');
  });

  overlay?.addEventListener('click', closeSidebar);

  sidebar?.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // MENU DO PERFIL
  const profileButton = document.getElementById('profileButton');
  const profileMenu = document.getElementById('profileMenu');

  profileButton?.addEventListener('click', () => {
    profileMenu?.classList.toggle('show');
  });

  document.addEventListener('click', event => {
    if (
      profileMenu &&
      profileButton &&
      !profileMenu.contains(event.target) &&
      !profileButton.contains(event.target)
    ) {
      profileMenu.classList.remove('show');
    }
  });

  renderClients();
})();


/* =========================================
   CLIENTPORTAL — GERENCIAMENTO DE TAREFAS
========================================= */

(() => {
  const page = document.querySelector('[data-page="tarefas"]');
  if (!page) return;

  const TASK_KEY = 'clientPortalTasks';
  const PROJECT_KEY = 'clientPortalProjects';

  const form = document.getElementById('taskForm');
  const modal = document.getElementById('taskModal');
  const tableBody = document.getElementById('tasksTableBody');
  const searchInput = document.getElementById('taskSearch');
  const statusFilter = document.getElementById('taskStatusFilter');
  const priorityFilter = document.getElementById('taskPriorityFilter');
  const projectSelect = document.getElementById('taskProject');
  const emptyState = document.getElementById('tasksEmpty');

  let tasks = readStorage(TASK_KEY);

  function readStorage(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Erro ao carregar ${key}:`, error);
      return [];
    }
  }

  function saveTasks() {
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  }

  function getProjects() {
    return readStorage(PROJECT_KEY);
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  function formatDate(date) {
    if (!date) return '—';

    const parts = date.split('-');
    if (parts.length !== 3) return date;

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  function isOverdue(task) {
    if (task.status === 'Concluída' || !task.deadline) {
      return false;
    }

    const deadline = new Date(`${task.deadline}T23:59:59`);
    return !Number.isNaN(deadline.getTime()) &&
      deadline < new Date();
  }

  function getTaskStatusClass(task) {
    if (isOverdue(task)) return 'overdue';

    if (task.status === 'Concluída') return 'completed';
    if (task.status === 'Em andamento') return 'progress';

    return 'pending';
  }

  function getTaskStatusLabel(task) {
    return isOverdue(task) ? 'Atrasada' : task.status;
  }

  function getPriorityClass(priority) {
    if (priority === 'Alta') return 'high';
    if (priority === 'Baixa') return 'low';
    return 'medium';
  }

  // PREENCHE A LISTA DE PROJETOS
  function updateProjectOptions(selectedId = '') {
    const projects = getProjects();

    projectSelect.innerHTML = `
            <option value="">Selecione um projeto</option>
        `;

    projects.forEach(project => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.name || 'Projeto sem nome';
      option.selected = String(project.id) === String(selectedId);
      projectSelect.appendChild(option);
    });

    projectSelect.disabled = projects.length === 0;
  }

  function getProjectName(projectId) {
    const project = getProjects().find(item =>
      String(item.id) === String(projectId)
    );

    return project?.name || 'Projeto não encontrado';
  }

  // INDICADORES
  function updateStatistics() {
    const total = tasks.length;
    const pending = tasks.filter(task =>
      task.status === 'Pendente'
    ).length;
    const progress = tasks.filter(task =>
      task.status === 'Em andamento'
    ).length;
    const completed = tasks.filter(task =>
      task.status === 'Concluída'
    ).length;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('progressTasks').textContent = progress;
    document.getElementById('completedTasks').textContent = completed;
  }

  // TABELA
  function renderTasks() {
    const search = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;
    const selectedPriority = priorityFilter.value;

    const filtered = tasks.filter(task => {
      const projectName = getProjectName(task.projectId);

      const searchable = [
        task.title,
        task.description,
        projectName,
        task.responsible
      ].join(' ').toLowerCase();

      const matchesSearch = searchable.includes(search);
      const matchesStatus =
        !selectedStatus || task.status === selectedStatus;
      const matchesPriority =
        !selectedPriority || task.priority === selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    tableBody.innerHTML = '';

    filtered.forEach(task => {
      const row = document.createElement('tr');

      row.innerHTML = `
                <td>
                    <div class="task-title-cell">
                        <strong>${escapeHTML(task.title)}</strong>
                        <small>${escapeHTML(task.description || 'Sem descrição')}</small>
                    </div>
                </td>

                <td>
                    <span class="task-project-cell">
                        ${escapeHTML(getProjectName(task.projectId))}
                    </span>
                </td>

                <td>
                    <span class="task-responsible-cell">
                        ${escapeHTML(task.responsible)}
                    </span>
                </td>

                <td>
                    <span class="task-deadline-cell">
                        ${formatDate(task.deadline)}
                    </span>
                </td>

                <td>
                    <span class="task-priority ${getPriorityClass(task.priority)}">
                        ${escapeHTML(task.priority)}
                    </span>
                </td>

                <td>
                    <span class="task-status ${getTaskStatusClass(task)}">
                        ${escapeHTML(getTaskStatusLabel(task))}
                    </span>
                </td>

                <td>
                    <div class="task-actions">

                        <button type="button"
                                class="task-action-button"
                                data-action="edit"
                                data-id="${escapeHTML(task.id)}"
                                title="Editar tarefa">
                            ✎
                        </button>

                        <button type="button"
                                class="task-action-button delete"
                                data-action="delete"
                                data-id="${escapeHTML(task.id)}"
                                title="Excluir tarefa">
                            ×
                        </button>

                    </div>
                </td>
            `;

      tableBody.appendChild(row);
    });

    emptyState.hidden = filtered.length > 0;

    document.getElementById('tasksResultCount').textContent =
      `${filtered.length} ${filtered.length === 1 ? 'tarefa' : 'tarefas'}`;

    updateStatistics();
  }

  // ABRIR MODAL
  function openTaskModal(task = null) {
    form.reset();

    document.getElementById('taskId').value = '';

    updateProjectOptions(task?.projectId || '');

    if (task) {
      document.getElementById('taskModalTitle').textContent =
        'Editar tarefa';

      document.getElementById('taskId').value = task.id;
      document.getElementById('taskTitle').value = task.title;
      document.getElementById('taskDescription').value =
        task.description || '';
      document.getElementById('taskResponsible').value =
        task.responsible;
      document.getElementById('taskDeadline').value =
        task.deadline;
      document.getElementById('taskPriority').value =
        task.priority;
      document.getElementById('taskStatus').value =
        task.status;
    } else {
      document.getElementById('taskModalTitle').textContent =
        'Nova tarefa';

      document.getElementById('taskPriority').value = 'Média';
      document.getElementById('taskStatus').value = 'Pendente';
    }

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    document.getElementById('taskTitle').focus();
  }

  function closeTaskModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // NOVA TAREFA
  document.getElementById('newTaskButton').addEventListener('click', () => {
    if (getProjects().length === 0) {
      alert('Cadastre um projeto antes de criar uma tarefa.');
      return;
    }

    openTaskModal();
  });

  // FECHAR MODAL
  document.getElementById('closeTaskModal')
    .addEventListener('click', closeTaskModal);

  document.getElementById('cancelTaskButton')
    .addEventListener('click', closeTaskModal);

  modal.addEventListener('click', event => {
    if (event.target === modal) closeTaskModal();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeTaskModal();
  });

  // SALVAR TAREFA
  form.addEventListener('submit', event => {
    event.preventDefault();

    const id = document.getElementById('taskId').value;
    const projectId = projectSelect.value;

    const projectExists = getProjects().some(project =>
      String(project.id) === String(projectId)
    );

    if (!projectExists) {
      alert('Selecione um projeto válido.');
      return;
    }

    const taskData = {
      id: id || `task-${Date.now()}`,
      title: document.getElementById('taskTitle').value.trim(),
      description: document.getElementById('taskDescription').value.trim(),
      projectId,
      responsible: document.getElementById('taskResponsible').value.trim(),
      deadline: document.getElementById('taskDeadline').value,
      priority: document.getElementById('taskPriority').value,
      status: document.getElementById('taskStatus').value
    };

    if (id) {
      tasks = tasks.map(task =>
        task.id === id ? taskData : task
      );
    } else {
      tasks.unshift(taskData);
    }

    saveTasks();
    renderTasks();
    closeTaskModal();
  });

  // EDITAR E EXCLUIR
  tableBody.addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;
    const task = tasks.find(item => item.id === id);

    if (!task) return;

    if (action === 'edit') {
      openTaskModal(task);
    }

    if (action === 'delete') {
      const confirmed = confirm(
        `Deseja realmente excluir a tarefa "${task.title}"?`
      );

      if (!confirmed) return;

      tasks = tasks.filter(item => item.id !== id);
      saveTasks();
      renderTasks();
    }
  });

  // PESQUISA E FILTROS
  searchInput.addEventListener('input', renderTasks);
  statusFilter.addEventListener('change', renderTasks);
  priorityFilter.addEventListener('change', renderTasks);

  // DATA DO CABEÇALHO
  const dateElement = document.getElementById('tasksDate');

  if (dateElement) {
    dateElement.textContent = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
  }

  document.querySelectorAll('[data-task-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // MENU MOBILE
  const sidebar = document.getElementById('sidebar');
  const mobileButton = document.getElementById('mobileMenuButton');
  const overlay = document.getElementById('sidebarOverlay');

  function closeSidebar() {
    sidebar?.classList.remove('mobile-open');
    overlay?.classList.remove('show');
  }

  mobileButton?.addEventListener('click', () => {
    sidebar?.classList.toggle('mobile-open');
    overlay?.classList.toggle('show');
  });

  overlay?.addEventListener('click', closeSidebar);

  sidebar?.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // MENU DO PERFIL
  const profileButton = document.getElementById('profileButton');
  const profileMenu = document.getElementById('profileMenu');

  profileButton?.addEventListener('click', () => {
    profileMenu?.classList.toggle('show');
  });

  document.addEventListener('click', event => {
    if (
      profileMenu &&
      profileButton &&
      !profileMenu.contains(event.target) &&
      !profileButton.contains(event.target)
    ) {
      profileMenu.classList.remove('show');
    }
  });

  // ATUALIZA QUANDO OS PROJETOS MUDAM
  window.addEventListener('storage', event => {
    if (event.key === PROJECT_KEY) {
      updateProjectOptions();
      renderTasks();
    }
  });

  // PRIMEIRA RENDERIZAÇÃO
  updateProjectOptions();
  renderTasks();

})();



/* =========================================
   CLIENTPORTAL — MÓDULO DE MENSAGENS
========================================= */

(() => {
  const page = document.querySelector('[data-page="mensagens"]');

  if (!page) return;

  const MESSAGE_KEY = 'clientPortalMessages';
  const CLIENT_KEY = 'clientPortalClients';
  const PROJECT_KEY = 'clientPortalProjects';

  // ELEMENTOS
  const conversationList = document.getElementById('conversationList');
  const conversationSearch = document.getElementById('conversationSearch');
  const conversationEmpty = document.getElementById('conversationEmpty');
  const conversationCount = document.getElementById('conversationCount');

  const chatEmpty = document.getElementById('chatEmpty');
  const chatContent = document.getElementById('chatContent');
  const chatMessages = document.getElementById('chatMessages');

  const chatAvatar = document.getElementById('chatAvatar');
  const chatClientName = document.getElementById('chatClientName');
  const chatClientCompany = document.getElementById('chatClientCompany');
  const chatProjectName = document.getElementById('chatProjectName');

  const messageForm = document.getElementById('messageForm');
  const messageInput = document.getElementById('messageInput');
  const messageCharacterCount = document.getElementById('messageCharacterCount');

  const totalConversations = document.getElementById('totalConversations');
  const unreadMessages = document.getElementById('unreadMessages');
  const clientsMessaged = document.getElementById('clientsMessaged');

  const chatClientModal = document.getElementById('chatClientModal');
  const chatClientDetails = document.getElementById('chatClientDetails');

  let selectedConversationId = null;
  let activeFilter = 'all';

  // UTILITÁRIOS
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char]);

  const readStorage = (key, fallback = []) => {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      return Array.isArray(data) ? data : fallback;
    } catch {
      return fallback;
    }
  };

  const saveMessages = () => {
    localStorage.setItem(MESSAGE_KEY, JSON.stringify(conversations));
  };

  const getClients = () => {
    const clients = readStorage(CLIENT_KEY);

    if (clients.length) return clients;

    return [
      {
        id: 'demo-mariana',
        name: 'Mariana Costa',
        company: 'Studio Criativo',
        email: 'mariana@studiocriativo.com',
        phone: '(11) 99999-1111',
        status: 'ativo'
      },
      {
        id: 'demo-rafael',
        name: 'Rafael Alves',
        company: 'Alpha Solutions',
        email: 'rafael@alphasolutions.com',
        phone: '(11) 99999-2222',
        status: 'ativo'
      },
      {
        id: 'demo-joao',
        name: 'João Silva',
        company: 'MoveTech',
        email: 'joao@movetech.com',
        phone: '(11) 99999-3333',
        status: 'ativo'
      },
      {
        id: 'demo-ana',
        name: 'Ana Martins',
        company: 'Nova Agência',
        email: 'ana@novaagencia.com',
        phone: '(11) 99999-4444',
        status: 'inativo'
      }
    ];
  };

  const getProjects = () => readStorage(PROJECT_KEY);

  const getClientId = client =>
    String(client.id || client.email || client.company || client.name);

  const getInitials = name => {
    const parts = String(name || 'CL').trim().split(/\s+/);

    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const formatTime = date => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatConversationTime = date => {
    const messageDate = new Date(date);
    const today = new Date();

    const sameDay =
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear();

    if (sameDay) return formatTime(date);

    return messageDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const formatDateDivider = date => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const sortByRecent = list => {
    return [...list].sort((a, b) => {
      const dateA = new Date(
        a.messages?.[a.messages.length - 1]?.createdAt || 0
      );

      const dateB = new Date(
        b.messages?.[b.messages.length - 1]?.createdAt || 0
      );

      return dateB - dateA;
    });
  };

  // RELACIONAMENTO COM CLIENTES E PROJETOS
  const findClient = conversation => {
    return getClients().find(client =>
      getClientId(client) === String(conversation.clientId)
    ) || null;
  };

  const findProject = conversation => {
    const client = findClient(conversation);
    const company = client?.company || conversation.clientCompany;

    return getProjects().find(project =>
      String(project.client || '').trim().toLowerCase() ===
      String(company || '').trim().toLowerCase()
    ) || null;
  };

  const getConversationName = conversation => {
    const client = findClient(conversation);
    return client?.name || conversation.clientName || 'Cliente';
  };

  const getConversationCompany = conversation => {
    const client = findClient(conversation);
    return client?.company || conversation.clientCompany || '';
  };

  const getLastMessage = conversation => {
    const messages = conversation.messages || [];

    return messages[messages.length - 1] || null;
  };

  // CONVERSAS DEMONSTRATIVAS
  const createDemoConversations = () => {
    const clients = getClients();

    const demoMessages = [
      {
        company: 'Studio Criativo',
        message: 'Olá! Gostaria de saber como está o andamento do projeto.',
        sender: 'client',
        minutesAgo: 12,
        unread: 2
      },
      {
        company: 'Alpha Solutions',
        message: 'Perfeito, obrigado pelo retorno!',
        sender: 'client',
        minutesAgo: 85,
        unread: 0
      },
      {
        company: 'MoveTech',
        message: 'Enviei os materiais que você solicitou.',
        sender: 'client',
        minutesAgo: 180,
        unread: 1
      }
    ];

    return demoMessages
      .map((demo, index) => {
        const client = clients.find(item =>
          String(item.company || '').trim().toLowerCase() ===
          demo.company.toLowerCase()
        );

        if (!client) return null;

        const lastDate = Date.now() - demo.minutesAgo * 60000;

        const messages = [
          {
            id: `demo-${index}-1`,
            sender: 'admin',
            text: 'Olá! Tudo bem? Como posso ajudar?',
            createdAt: new Date(lastDate - 3600000).toISOString()
          },
          {
            id: `demo-${index}-2`,
            sender: demo.sender,
            text: demo.message,
            createdAt: new Date(lastDate).toISOString()
          }
        ];

        return {
          id: `conversation-${getClientId(client)}`,
          clientId: getClientId(client),
          clientName: client.name,
          clientCompany: client.company,
          unread: demo.unread,
          messages
        };
      })
      .filter(Boolean);
  };

  let conversations = readStorage(MESSAGE_KEY);

  if (!conversations.length) {
    conversations = createDemoConversations();
    saveMessages();
  }

  // NORMALIZA DADOS DAS CONVERSAS
  conversations = conversations.map(conversation => ({
    ...conversation,
    unread: Number(conversation.unread) || 0,
    messages: Array.isArray(conversation.messages)
      ? conversation.messages
      : []
  }));

  // INDICADORES
  const updateStats = () => {
    const unreadTotal = conversations.reduce(
      (total, conversation) => total + conversation.unread,
      0
    );

    totalConversations.textContent = conversations.length;
    unreadMessages.textContent = unreadTotal;
    clientsMessaged.textContent = conversations.length;
    conversationCount.textContent = conversations.length;
  };

  // LISTA DE CONVERSAS
  const renderConversations = () => {
    const search = conversationSearch.value.trim().toLowerCase();

    let filtered = sortByRecent(conversations);

    if (activeFilter === 'unread') {
      filtered = filtered.filter(conversation => conversation.unread > 0);
    }

    filtered = filtered.filter(conversation => {
      const name = getConversationName(conversation).toLowerCase();
      const company = getConversationCompany(conversation).toLowerCase();

      return name.includes(search) || company.includes(search);
    });

    conversationList.innerHTML = filtered.map(conversation => {
      const lastMessage = getLastMessage(conversation);
      const name = getConversationName(conversation);
      const company = getConversationCompany(conversation);
      const active = conversation.id === selectedConversationId;

      const preview = lastMessage
        ? `${lastMessage.sender === 'admin' ? 'Você: ' : ''}${lastMessage.text}`
        : 'Nenhuma mensagem ainda';

      return `
                <button type="button"
                        class="conversation-item ${active ? 'active' : ''}"
                        data-conversation-id="${escapeHTML(conversation.id)}">

                    <span class="conversation-avatar">
                        ${escapeHTML(getInitials(name))}
                    </span>

                    <span class="conversation-info">

                        <span class="conversation-top">
                            <strong>${escapeHTML(name)}</strong>
                            <time>
                                ${lastMessage
          ? escapeHTML(formatConversationTime(lastMessage.createdAt))
          : ''}
                            </time>
                        </span>

                        <span class="conversation-company">
                            ${escapeHTML(company)}
                        </span>

                        <span class="conversation-bottom">
                            <span class="conversation-preview">
                                ${escapeHTML(preview)}
                            </span>

                            ${conversation.unread > 0
          ? `<span class="conversation-unread">${conversation.unread}</span>`
          : ''}
                        </span>

                    </span>

                </button>
            `;
    }).join('');

    conversationEmpty.hidden = filtered.length > 0;

    updateStats();
  };

  // MARCAR CONVERSA COMO LIDA
  const markAsRead = conversation => {
    if (!conversation || conversation.unread === 0) return;

    conversation.unread = 0;
    saveMessages();
    updateStats();
    renderConversations();
  };

  // HISTÓRICO DO CHAT
  const renderChatMessages = conversation => {
    const messages = conversation.messages || [];

    if (!messages.length) {
      chatMessages.innerHTML = `
                <div class="messages-chat-empty">
                    <div class="chat-empty-icon">✉</div>
                    <h3>Nenhuma mensagem ainda</h3>
                    <p>Envie a primeira mensagem para iniciar a conversa.</p>
                </div>
            `;
      return;
    }

    let previousDate = '';

    chatMessages.innerHTML = messages.map(message => {
      const date = formatDateDivider(message.createdAt);
      const showDivider = date !== previousDate;

      previousDate = date;

      return `
                ${showDivider
          ? `<div class="chat-date-divider">${escapeHTML(date)}</div>`
          : ''}

                <article class="chat-message ${message.sender === 'admin' ? 'sent' : 'received'}">

                    <div class="chat-message-bubble">
                        ${escapeHTML(message.text)}
                    </div>

                    <time>${escapeHTML(formatTime(message.createdAt))}</time>

                </article>
            `;
    }).join('');

    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // SELECIONAR CONVERSA
  const selectConversation = id => {
    const conversation = conversations.find(item =>
      String(item.id) === String(id)
    );

    if (!conversation) return;

    selectedConversationId = conversation.id;

    chatEmpty.hidden = true;
    chatContent.hidden = false;

    const name = getConversationName(conversation);
    const company = getConversationCompany(conversation);
    const project = findProject(conversation);

    chatAvatar.textContent = getInitials(name);
    chatClientName.textContent = name;
    chatClientCompany.textContent = company;
    chatProjectName.textContent = project?.name || 'Não vinculado';

    renderChatMessages(conversation);
    markAsRead(conversation);
    renderConversations();

    messageInput.focus();
  };

  // ENVIAR MENSAGEM
  messageForm.addEventListener('submit', event => {
    event.preventDefault();

    const text = messageInput.value.trim();

    if (!text) return;

    const conversation = conversations.find(item =>
      item.id === selectedConversationId
    );

    if (!conversation) return;

    const message = {
      id: `message-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      sender: 'admin',
      text,
      createdAt: new Date().toISOString()
    };

    conversation.messages.push(message);
    conversation.unread = 0;

    saveMessages();

    messageInput.value = '';
    messageCharacterCount.textContent = '0/2000';

    renderChatMessages(conversation);
    renderConversations();

    messageInput.focus();
  });

  // CONTADOR DE CARACTERES
  messageInput.addEventListener('input', () => {
    messageCharacterCount.textContent =
      `${messageInput.value.length}/2000`;
  });

  // PESQUISA
  conversationSearch.addEventListener('input', renderConversations);

  // FILTROS
  document.querySelectorAll('[data-message-filter]').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.messageFilter;

      document.querySelectorAll('[data-message-filter]').forEach(item => {
        item.classList.toggle('active', item === button);
      });

      renderConversations();
    });
  });

  // CLIQUE NAS CONVERSAS
  conversationList.addEventListener('click', event => {
    const button = event.target.closest('[data-conversation-id]');

    if (!button) return;

    selectConversation(button.dataset.conversationId);
  });

  // MODAL DE INFORMAÇÕES DO CLIENTE
  const openClientDetails = () => {
    const conversation = conversations.find(item =>
      item.id === selectedConversationId
    );

    if (!conversation) return;

    const client = findClient(conversation);
    const project = findProject(conversation);

    const details = [
      ['Nome', getConversationName(conversation)],
      ['Empresa', getConversationCompany(conversation)],
      ['E-mail', client?.email || 'Não informado'],
      ['Telefone', client?.phone || 'Não informado'],
      ['Documento', client?.document || client?.documento || 'Não informado'],
      ['Projeto vinculado', project?.name || 'Nenhum projeto vinculado']
    ];

    chatClientDetails.innerHTML = details.map(([label, value]) => `
            <div class="chat-client-detail">
                <small>${escapeHTML(label)}</small>
                <strong>${escapeHTML(value)}</strong>
            </div>
        `).join('');

    chatClientModal.style.display = 'flex';
    chatClientModal.setAttribute('aria-hidden', 'false');
  };

  document.getElementById('chatDetailsButton')
    .addEventListener('click', openClientDetails);

  const closeClientModal = () => {
    chatClientModal.style.display = 'none';
    chatClientModal.setAttribute('aria-hidden', 'true');
  };

  document.getElementById('closeChatClientModal')
    .addEventListener('click', closeClientModal);

  chatClientModal.addEventListener('click', event => {
    if (event.target === chatClientModal) {
      closeClientModal();
    }
  });

  // DATA DO CABEÇALHO
  const dateElement = document.getElementById('messagesDate');

  if (dateElement) {
    dateElement.textContent = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  // ANO DO RODAPÉ
  document.querySelectorAll('[data-ano]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // MENU MOBILE
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const mobileMenuButton = document.getElementById('mobileMenuButton');

  const closeMobileMenu = () => {
    sidebar?.classList.remove('mobile-open');

    if (overlay) {
      overlay.classList.remove('active');
      overlay.style.display = '';
    }
  };

  mobileMenuButton?.addEventListener('click', () => {
    sidebar?.classList.toggle('mobile-open');

    if (overlay) {
      const isOpen = sidebar?.classList.contains('mobile-open');

      overlay.classList.toggle('active', isOpen);
      overlay.style.display = isOpen ? 'block' : '';
    }
  });

  overlay?.addEventListener('click', closeMobileMenu);

  // MENU DO PERFIL
  const profileButton = document.getElementById('profileButton');
  const profileMenu = document.getElementById('profileMenu');

  profileButton?.addEventListener('click', event => {
    event.stopPropagation();

    if (profileMenu) {
      profileMenu.style.display =
        profileMenu.style.display === 'block' ? 'none' : 'block';
    }
  });

  document.addEventListener('click', event => {
    if (
      profileMenu &&
      !profileMenu.contains(event.target) &&
      !profileButton?.contains(event.target)
    ) {
      profileMenu.style.display = 'none';
    }
  });

  // ATUALIZAR DADOS SE CLIENTES OU PROJETOS FOREM ALTERADOS
  window.addEventListener('storage', event => {
    if (
      event.key === CLIENT_KEY ||
      event.key === PROJECT_KEY
    ) {
      renderConversations();

      const selected = conversations.find(item =>
        item.id === selectedConversationId
      );

      if (selected) {
        chatClientName.textContent = getConversationName(selected);
        chatClientCompany.textContent = getConversationCompany(selected);

        const project = findProject(selected);
        chatProjectName.textContent = project?.name || 'Não vinculado';
      }
    }
  });

  // INICIALIZAÇÃO
  renderConversations();

  if (conversations.length > 0) {
    selectConversation(sortByRecent(conversations)[0].id);
  }

})();



/* =========================================
   CLIENTPORTAL — MÓDULO DE ARQUIVOS
   Armazenamento local com IndexedDB
========================================= */

(() => {
  const page = document.querySelector('[data-page="arquivos"]');
  if (!page) return;

  const DB_NAME = 'clientPortalFilesDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'files';
  const MAX_FILE_SIZE = 15 * 1024 * 1024;

  const PROJECT_KEY = 'clientPortalProjects';

  const $ = id => document.getElementById(id);

  const elements = {
    date: $('filesDate'),

    totalFiles: $('totalFiles'),
    documentFiles: $('documentFiles'),
    imageFiles: $('imageFiles'),
    storageUsed: $('storageUsed'),

    search: $('fileSearch'),
    categoryFilter: $('fileCategoryFilter'),
    projectFilter: $('fileProjectFilter'),

    table: $('filesTableBody'),
    empty: $('filesEmpty'),
    count: $('filesCount'),
    resultCount: $('filesResultCount'),

    uploadModal: $('fileUploadModal'),
    uploadForm: $('fileUploadForm'),
    fileInput: $('fileInput'),
    selectedFile: $('selectedFile'),
    selectedFileName: $('selectedFileName'),
    selectedFileSize: $('selectedFileSize'),
    description: $('fileDescription'),
    category: $('fileCategory'),
    project: $('fileProject'),
    formMessage: $('fileFormMessage'),
    saveButton: $('saveFileButton'),
    dropZone: $('fileDropZone'),

    previewModal: $('filePreviewModal'),
    previewName: $('previewFileName'),
    previewContent: $('filePreviewContent'),

    deleteModal: $('deleteFileModal'),
    deleteName: $('deleteFileName'),
    confirmDelete: $('confirmDeleteFile'),
    cancelDelete: $('cancelDeleteFile'),

    mobileMenuButton: $('mobileMenuButton'),
    sidebar: $('sidebar'),
    sidebarOverlay: $('sidebarOverlay'),
    profileButton: $('profileButton'),
    profileMenu: $('profileMenu')
  };

  let files = [];
  let selectedFile = null;
  let filePendingDelete = null;
  let previewURL = null;
  let db = null;

  /* =========================================
     INDEXED DB
  ========================================= */

  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = event => {
        const database = event.target.result;

        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, {
            keyPath: 'id'
          });
        }
      };

      request.onsuccess = event => {
        db = event.target.result;
        resolve(db);
      };

      request.onerror = () => reject(request.error);
    });
  };

  const getAllFilesFromDB = () => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  };

  const saveFileToDB = file => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(file);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };

  const deleteFileFromDB = id => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };

  /* =========================================
     UTILITÁRIOS
  ========================================= */

  const escapeHTML = value => {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[char]);
  };

  const formatBytes = bytes => {
    if (!bytes) return '0 KB';

    const units = ['Bytes', 'KB', 'MB', 'GB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
  };

  const formatDate = date => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getProjects = () => {
    try {
      return JSON.parse(localStorage.getItem(PROJECT_KEY)) || [];
    } catch {
      return [];
    }
  };

  const getProjectName = projectId => {
    const project = getProjects().find(item =>
      String(item.id) === String(projectId)
    );

    return project ? project.name : 'Sem projeto vinculado';
  };

  const getFileExtension = name => {
    return String(name).split('.').pop().toLowerCase();
  };

  const getFileType = file => {
    const extension = getFileExtension(file.name);

    if (file.type?.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf' || extension === 'pdf') return 'pdf';

    if ([
      'doc', 'docx', 'txt', 'odt', 'rtf'
    ].includes(extension)) return 'document';

    if ([
      'xls', 'xlsx', 'csv'
    ].includes(extension)) return 'spreadsheet';

    if ([
      'ppt', 'pptx'
    ].includes(extension)) return 'presentation';

    if ([
      'zip', 'rar', '7z'
    ].includes(extension)) return 'archive';

    return 'other';
  };

  const getFileIcon = file => {
    const type = getFileType(file);

    const icons = {
      image: '🖼️',
      pdf: '📕',
      document: '📄',
      spreadsheet: '📊',
      presentation: '📽️',
      archive: '🗜️',
      other: '📁'
    };

    return icons[type] || icons.other;
  };

  const showFormMessage = (message, type = 'error') => {
    if (!elements.formMessage) return;

    elements.formMessage.textContent = message;
    elements.formMessage.className = `files-form-message ${type}`;
    elements.formMessage.hidden = false;
  };

  const clearFormMessage = () => {
    if (!elements.formMessage) return;

    elements.formMessage.textContent = '';
    elements.formMessage.hidden = true;
  };

  /* =========================================
     MODAIS
  ========================================= */

  const openModal = modal => {
    if (!modal) return;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = modal => {
    if (!modal) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };

  const openUploadModal = () => {
    clearFormMessage();
    openModal(elements.uploadModal);
  };

  const closeUploadModal = () => {
    closeModal(elements.uploadModal);
    elements.uploadForm?.reset();

    selectedFile = null;

    if (elements.selectedFile) {
      elements.selectedFile.hidden = true;
    }

    if (elements.fileInput) {
      elements.fileInput.value = '';
    }

    clearFormMessage();
  };

  /* =========================================
     SELEÇÃO DE ARQUIVO
  ========================================= */

  const displaySelectedFile = file => {
    selectedFile = file;

    if (!file) {
      if (elements.selectedFile) {
        elements.selectedFile.hidden = true;
      }
      return;
    }

    if (elements.selectedFileName) {
      elements.selectedFileName.textContent = file.name;
    }

    if (elements.selectedFileSize) {
      elements.selectedFileSize.textContent = formatBytes(file.size);
    }

    if (elements.selectedFile) {
      elements.selectedFile.hidden = false;
    }

    clearFormMessage();
  };

  const validateFile = file => {
    if (!file) {
      showFormMessage('Selecione um arquivo para continuar.');
      return false;
    }

    if (file.size === 0) {
      showFormMessage('Este arquivo está vazio e não pode ser enviado.');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      showFormMessage('O arquivo ultrapassa o limite de 15 MB.');
      return false;
    }

    return true;
  };

  elements.fileInput?.addEventListener('change', event => {
    const file = event.target.files?.[0];

    if (file && validateFile(file)) {
      displaySelectedFile(file);
    } else {
      selectedFile = null;
    }
  });

  $('removeSelectedFile')?.addEventListener('click', () => {
    selectedFile = null;

    if (elements.fileInput) {
      elements.fileInput.value = '';
    }

    if (elements.selectedFile) {
      elements.selectedFile.hidden = true;
    }

    clearFormMessage();
  });

  /* =========================================
     UPLOAD E SALVAMENTO
  ========================================= */

  const uploadFile = async () => {
    if (!validateFile(selectedFile)) return;

    const projectId = elements.project?.value || '';
    const category = elements.category?.value || 'outros';
    const description = elements.description?.value.trim() || '';

    const fileData = {
      id: `file-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: selectedFile.name,
      type: selectedFile.type || 'application/octet-stream',
      size: selectedFile.size,
      blob: selectedFile,
      category,
      projectId,
      description,
      createdAt: new Date().toISOString()
    };

    try {
      if (elements.saveButton) {
        elements.saveButton.disabled = true;
        elements.saveButton.textContent = 'Enviando...';
      }

      await saveFileToDB(fileData);
      await refreshFiles();

      closeUploadModal();

    } catch (error) {
      console.error('Erro ao salvar arquivo:', error);
      showFormMessage('Não foi possível salvar o arquivo. Tente novamente.');
    } finally {
      if (elements.saveButton) {
        elements.saveButton.disabled = false;
        elements.saveButton.textContent = 'Salvar arquivo';
      }
    }
  };

  elements.uploadForm?.addEventListener('submit', event => {
    event.preventDefault();
    uploadFile();
  });

  /* =========================================
     FILTROS E PROJETOS
  ========================================= */

  const populateProjectFilters = () => {
    const projects = getProjects();

    const selects = [
      elements.project,
      elements.projectFilter
    ];

    selects.forEach(select => {
      if (!select) return;

      const currentValue = select.value;

      const firstOption = select.options[0];
      select.innerHTML = '';

      if (firstOption) {
        select.appendChild(firstOption);
      }

      projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.name;
        select.appendChild(option);
      });

      if ([...select.options].some(option => option.value === currentValue)) {
        select.value = currentValue;
      }
    });
  };

  const getFilteredFiles = () => {
    const search = elements.search?.value.trim().toLowerCase() || '';
    const category = elements.categoryFilter?.value || '';
    const project = elements.projectFilter?.value || '';

    return files.filter(file => {
      const projectName = getProjectName(file.projectId).toLowerCase();

      const matchesSearch =
        file.name.toLowerCase().includes(search) ||
        (file.description || '').toLowerCase().includes(search) ||
        projectName.includes(search);

      const matchesCategory =
        !category || file.category === category;

      const matchesProject =
        !project || String(file.projectId) === String(project);

      return matchesSearch && matchesCategory && matchesProject;
    });
  };

  /* =========================================
     ESTATÍSTICAS
  ========================================= */

  const updateStats = () => {
    const total = files.length;

    const documents = files.filter(file =>
      ['pdf', 'document', 'spreadsheet', 'presentation'].includes(getFileType(file))
    ).length;

    const images = files.filter(file =>
      getFileType(file) === 'image'
    ).length;

    const totalSize = files.reduce((sum, file) => {
      return sum + (Number(file.size) || 0);
    }, 0);

    if (elements.totalFiles) {
      elements.totalFiles.textContent = total;
    }

    if (elements.documentFiles) {
      elements.documentFiles.textContent = documents;
    }

    if (elements.imageFiles) {
      elements.imageFiles.textContent = images;
    }

    if (elements.storageUsed) {
      elements.storageUsed.textContent = formatBytes(totalSize);
    }
  };

  /* =========================================
     TABELA
  ========================================= */

  const renderFiles = () => {
    const filtered = getFilteredFiles();

    updateStats();

    if (elements.count) {
      elements.count.textContent = files.length;
    }

    if (elements.resultCount) {
      elements.resultCount.textContent =
        `${filtered.length} ${filtered.length === 1 ? 'arquivo encontrado' : 'arquivos encontrados'}`;
    }

    if (elements.empty) {
      elements.empty.hidden = filtered.length > 0;
    }

    const tableWrapper = document.querySelector('.files-table-wrapper');

    if (tableWrapper) {
      tableWrapper.hidden = filtered.length === 0;
    }

    if (!elements.table) return;

    elements.table.innerHTML = filtered.map(file => {
      const type = getFileType(file);
      const projectName = getProjectName(file.projectId);

      return `
                <tr>
                    <td>
                        <div class="file-name-cell">
                            <span class="file-type-icon">${getFileIcon(file)}</span>
                            <div>
                                <strong>${escapeHTML(file.name)}</strong>
                                <small>${escapeHTML(file.description || 'Sem descrição')}</small>
                            </div>
                        </div>
                    </td>

                    <td>
                        <span class="file-category">${escapeHTML(file.category || 'Outros')}</span>
                    </td>

                    <td>${escapeHTML(projectName)}</td>

                    <td>${formatBytes(file.size)}</td>

                    <td>${formatDate(file.createdAt)}</td>

                    <td>
                        <div class="file-actions">
                            <button
                                type="button"
                                data-file-action="preview"
                                data-file-id="${escapeHTML(file.id)}"
                                title="Visualizar arquivo"
                                aria-label="Visualizar arquivo">
                                <i class="fas fa-eye"></i>
                            </button>

                            <button
                                type="button"
                                data-file-action="download"
                                data-file-id="${escapeHTML(file.id)}"
                                title="Baixar arquivo"
                                aria-label="Baixar arquivo">
                                <i class="fas fa-download"></i>
                            </button>

                            <button
                                type="button"
                                data-file-action="delete"
                                data-file-id="${escapeHTML(file.id)}"
                                title="Excluir arquivo"
                                aria-label="Excluir arquivo">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
    }).join('');
  };

  const refreshFiles = async () => {
    files = await getAllFilesFromDB();

    files.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    renderFiles();
  };

  /* =========================================
     VISUALIZAÇÃO
  ========================================= */

  const closePreview = () => {
    closeModal(elements.previewModal);

    if (previewURL) {
      URL.revokeObjectURL(previewURL);
      previewURL = null;
    }

    if (elements.previewContent) {
      elements.previewContent.innerHTML = '';
    }
  };

  const openPreview = file => {
    if (!elements.previewModal || !elements.previewContent) return;

    if (previewURL) {
      URL.revokeObjectURL(previewURL);
      previewURL = null;
    }

    elements.previewName.textContent = file.name;
    elements.previewContent.innerHTML = '';

    const type = getFileType(file);
    previewURL = URL.createObjectURL(file.blob);

    if (type === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = previewURL;
      iframe.title = file.name;
      iframe.className = 'file-preview-frame';

      elements.previewContent.appendChild(iframe);

    } else if (type === 'image') {
      const image = document.createElement('img');
      image.src = previewURL;
      image.alt = file.name;
      image.className = 'file-preview-image';

      elements.previewContent.appendChild(image);

    } else {
      const message = document.createElement('div');
      message.className = 'file-preview-unavailable';
      message.textContent = 'A visualização não está disponível para este formato. Faça o download para abrir o arquivo.';

      elements.previewContent.appendChild(message);
    }

    openModal(elements.previewModal);
  };

  /* =========================================
     DOWNLOAD
  ========================================= */

  const downloadFile = file => {
    const url = URL.createObjectURL(file.blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = file.name;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  /* =========================================
     MODAL PERSONALIZADO DE EXCLUSÃO
  ========================================= */

  const openDeleteModal = file => {
    filePendingDelete = file;

    if (elements.deleteName) {
      elements.deleteName.textContent = file.name;
    }

    if (elements.confirmDelete) {
      elements.confirmDelete.disabled = false;
      elements.confirmDelete.textContent = 'Excluir arquivo';
    }

    openModal(elements.deleteModal);
  };

  const closeDeleteModal = () => {
    closeModal(elements.deleteModal);
    filePendingDelete = null;

    if (elements.confirmDelete) {
      elements.confirmDelete.disabled = false;
      elements.confirmDelete.textContent = 'Excluir arquivo';
    }
  };

  elements.cancelDelete?.addEventListener('click', closeDeleteModal);

  elements.deleteModal?.addEventListener('click', event => {
    if (event.target === elements.deleteModal) {
      closeDeleteModal();
    }
  });

  elements.confirmDelete?.addEventListener('click', async () => {
    if (!filePendingDelete) return;

    const fileId = filePendingDelete.id;

    elements.confirmDelete.disabled = true;
    elements.confirmDelete.textContent = 'Excluindo...';

    try {
      await deleteFileFromDB(fileId);
      await refreshFiles();

      closeDeleteModal();

    } catch (error) {
      console.error('Erro ao excluir arquivo:', error);

      elements.confirmDelete.disabled = false;
      elements.confirmDelete.textContent = 'Tentar novamente';
    }
  });

  /* =========================================
     AÇÕES DA TABELA
  ========================================= */

  elements.table?.addEventListener('click', event => {
    const button = event.target.closest('[data-file-action]');
    if (!button) return;

    const file = files.find(item =>
      String(item.id) === String(button.dataset.fileId)
    );

    if (!file) return;

    const action = button.dataset.fileAction;

    if (action === 'preview') {
      openPreview(file);
    }

    if (action === 'download') {
      downloadFile(file);
    }

    if (action === 'delete') {
      openDeleteModal(file);
    }
  });

  /* =========================================
     EVENTOS DOS FILTROS
  ========================================= */

  elements.search?.addEventListener('input', renderFiles);
  elements.categoryFilter?.addEventListener('change', renderFiles);
  elements.projectFilter?.addEventListener('change', renderFiles);

  /* =========================================
     BOTÕES DOS MODAIS
  ========================================= */

  $('openUploadModal')?.addEventListener('click', openUploadModal);
  $('emptyUploadButton')?.addEventListener('click', openUploadModal);
  $('closeFileModal')?.addEventListener('click', closeUploadModal);
  $('cancelFileUpload')?.addEventListener('click', closeUploadModal);
  $('closePreviewModal')?.addEventListener('click', closePreview);

  elements.uploadModal?.addEventListener('click', event => {
    if (event.target === elements.uploadModal) {
      closeUploadModal();
    }
  });

  elements.previewModal?.addEventListener('click', event => {
    if (event.target === elements.previewModal) {
      closePreview();
    }
  });

  /* =========================================
     ARRASTAR E SOLTAR ARQUIVOS
  ========================================= */

  if (elements.dropZone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      elements.dropZone.addEventListener(eventName, event => {
        event.preventDefault();
        elements.dropZone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      elements.dropZone.addEventListener(eventName, event => {
        event.preventDefault();
        elements.dropZone.classList.remove('drag-over');
      });
    });

    elements.dropZone.addEventListener('drop', event => {
      const file = event.dataTransfer?.files?.[0];

      if (!file) return;

      if (validateFile(file)) {
        displaySelectedFile(file);

        if (elements.fileInput) {
          const transfer = new DataTransfer();
          transfer.items.add(file);
          elements.fileInput.files = transfer.files;
        }
      }
    });
  }

  /* =========================================
     MENU LATERAL E PERFIL
  ========================================= */

  elements.mobileMenuButton?.addEventListener('click', () => {
    elements.sidebar?.classList.toggle('mobile-open');
    elements.sidebarOverlay?.classList.toggle('active');
  });

  elements.sidebarOverlay?.addEventListener('click', () => {
    elements.sidebar?.classList.remove('mobile-open');
    elements.sidebarOverlay.classList.remove('active');
  });

  elements.profileButton?.addEventListener('click', event => {
    event.stopPropagation();
    elements.profileMenu?.classList.toggle('open');
  });

  document.addEventListener('click', event => {
    if (
      elements.profileMenu &&
      !elements.profileMenu.contains(event.target) &&
      !elements.profileButton?.contains(event.target)
    ) {
      elements.profileMenu.classList.remove('open');
    }
  });

  /* =========================================
     DATA E ANO
  ========================================= */

  if (elements.date) {
    elements.date.textContent = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  const yearElement = document.querySelector('[data-task-year]');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =========================================
     ATUALIZAÇÃO DE PROJETOS
  ========================================= */

  window.addEventListener('storage', event => {
    if (event.key === PROJECT_KEY) {
      populateProjectFilters();
      renderFiles();
    }
  });

  /* =========================================
     INICIALIZAÇÃO
  ========================================= */

  const initializeFiles = async () => {
    try {
      await openDatabase();
      populateProjectFilters();
      await refreshFiles();

    } catch (error) {
      console.error('Erro ao inicializar a central de arquivos:', error);

      if (elements.empty) {
        elements.empty.hidden = false;
        elements.empty.textContent =
          'Não foi possível carregar os arquivos neste navegador.';
      }

      const tableWrapper = document.querySelector('.files-table-wrapper');

      if (tableWrapper) {
        tableWrapper.hidden = true;
      }
    }
  };

  initializeFiles();

})();


/* =========================================
   CLIENTPORTAL — MÓDULO DE ARQUIVOS
========================================= */

(() => {
    const page = document.querySelector('[data-page="arquivos"]');
    if (!page) return;

    const DB_NAME = 'clientPortalFilesDB';
    const DB_VERSION = 1;
    const STORE_NAME = 'files';
    const MAX_FILE_SIZE = 15 * 1024 * 1024;

    let db;
    let files = [];
    let selectedFile = null;
    let previewUrl = null;

    const $ = id => document.getElementById(id);

    const elements = {
        table: $('filesTableBody'),
        empty: $('filesEmpty'),
        search: $('fileSearch'),
        categoryFilter: $('fileCategoryFilter'),
        projectFilter: $('fileProjectFilter'),
        uploadModal: $('fileUploadModal'),
        previewModal: $('filePreviewModal'),
        form: $('fileUploadForm'),
        fileInput: $('fileInput'),
        selectedFile: $('selectedFile'),
        selectedFileName: $('selectedFileName'),
        selectedFileSize: $('selectedFileSize'),
        description: $('fileDescription'),
        category: $('fileCategory'),
        project: $('fileProject'),
        message: $('fileFormMessage'),
        saveButton: $('saveFileButton'),
        previewContent: $('filePreviewContent')
    };

    const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    })[char]);

    const readArray = key => {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    };

    const getProjects = () => readArray('clientPortalProjects');

    const getProjectName = id => {
        if (!id) return 'Sem projeto vinculado';

        const project = getProjects().find(item =>
            String(item.id) === String(id)
        );

        return project?.name || 'Projeto não encontrado';
    };

    const formatSize = bytes => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const formatDate = date => {
        return new Date(date).toLocaleDateString('pt-BR');
    };

    const formatTotalSize = bytes => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const getExtension = name => {
        const parts = String(name).split('.');
        return parts.length > 1 ? parts.pop().toLowerCase() : 'file';
    };

    const getCategoryLabel = category => ({
        documento: 'Documento',
        imagem: 'Imagem',
        planilha: 'Planilha',
        apresentacao: 'Apresentação',
        outro: 'Outro'
    })[category] || 'Outro';

    const getFileIcon = file => {
        const extension = getExtension(file.name);

        if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension)) return 'PDF';
        if (['xls', 'xlsx', 'csv'].includes(extension)) return 'XLS';
        if (['ppt', 'pptx'].includes(extension)) return 'PPT';
        if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(extension)) return 'IMG';
        if (['zip', 'rar', '7z'].includes(extension)) return 'ZIP';

        return extension.slice(0, 4).toUpperCase();
    };

    const showMessage = (message, type = '') => {
        elements.message.textContent = message;
        elements.message.className = `files-form-message ${type}`;
    };

    // BANCO DE ARQUIVOS — INDEXEDDB
    const openDatabase = () => new Promise((resolve, reject) => {
        if (!('indexedDB' in window)) {
            reject(new Error('Este navegador não oferece suporte ao armazenamento de arquivos.'));
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = event => {
            const database = event.target.result;

            if (!database.objectStoreNames.contains(STORE_NAME)) {
                database.createObjectStore(STORE_NAME, {
                    keyPath: 'id'
                });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

    const getStore = mode => {
        return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
    };

    const getAllFiles = () => new Promise((resolve, reject) => {
        const request = getStore('readonly').getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });

    const saveFileToDB = fileData => new Promise((resolve, reject) => {
        const request = getStore('readwrite').put(fileData);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });

    const deleteFileFromDB = id => new Promise((resolve, reject) => {
        const request = getStore('readwrite').delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });

    // PROJETOS
    const populateProjects = () => {
        const projects = getProjects();

        const options = projects.map(project => `
            <option value="${escapeHTML(project.id)}">
                ${escapeHTML(project.name)}
            </option>
        `).join('');

        elements.project.innerHTML =
            '<option value="">Nenhum projeto</option>' + options;

        elements.projectFilter.innerHTML =
            '<option value="all">Todos os projetos</option>' + options;
    };

    // INDICADORES
    const updateStats = () => {
        const total = files.length;

        const documents = files.filter(file =>
            file.category === 'documento' || file.category === 'planilha' ||
            file.category === 'apresentacao'
        ).length;

        const images = files.filter(file =>
            file.category === 'imagem'
        ).length;

        const totalBytes = files.reduce((sum, file) =>
            sum + (Number(file.size) || 0), 0
        );

        $('totalFiles').textContent = total;
        $('documentFiles').textContent = documents;
        $('imageFiles').textContent = images;
        $('storageUsed').textContent = formatTotalSize(totalBytes);
        $('filesCount').textContent =
            `${total} ${total === 1 ? 'arquivo' : 'arquivos'}`;
    };

    // FILTROS E LISTAGEM
    const renderFiles = () => {
        const search = elements.search.value.trim().toLowerCase();
        const category = elements.categoryFilter.value;
        const project = elements.projectFilter.value;

        const filtered = files
            .filter(file => {
                const matchesSearch =
                    file.name.toLowerCase().includes(search) ||
                    String(file.description || '').toLowerCase().includes(search);

                const matchesCategory =
                    category === 'all' || file.category === category;

                const matchesProject =
                    project === 'all' || String(file.projectId || '') === project;

                return matchesSearch && matchesCategory && matchesProject;
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        elements.table.innerHTML = filtered.map(file => `
            <tr>
                <td>
                    <div class="file-name-cell">
                        <span class="file-type-icon">
                            ${escapeHTML(getFileIcon(file))}
                        </span>
                        <span class="file-name-info">
                            <strong title="${escapeHTML(file.name)}">
                                ${escapeHTML(file.name)}
                            </strong>
                            <small>
                                ${escapeHTML(file.description || 'Sem descrição')}
                            </small>
                        </span>
                    </div>
                </td>

                <td>
                    <span class="file-category-tag">
                        ${escapeHTML(getCategoryLabel(file.category))}
                    </span>
                </td>

                <td>
                    <span class="file-project-name">
                        ${escapeHTML(getProjectName(file.projectId))}
                    </span>
                </td>

                <td>
                    <span class="file-size">${formatSize(file.size)}</span>
                </td>

                <td>
                    <span class="file-date">${formatDate(file.createdAt)}</span>
                </td>

                <td>
                    <div class="file-actions">
                        <button type="button"
                                class="file-action-button"
                                data-file-action="preview"
                                data-file-id="${escapeHTML(file.id)}"
                                title="Visualizar"
                                aria-label="Visualizar arquivo">◉</button>

                        <button type="button"
                                class="file-action-button"
                                data-file-action="download"
                                data-file-id="${escapeHTML(file.id)}"
                                title="Baixar"
                                aria-label="Baixar arquivo">↓</button>

                        <button type="button"
                                class="file-action-button delete"
                                data-file-action="delete"
                                data-file-id="${escapeHTML(file.id)}"
                                title="Excluir"
                                aria-label="Excluir arquivo">×</button>
                    </div>
                </td>
            </tr>
        `).join('');

        elements.empty.hidden = filtered.length > 0;
        document.querySelector('.files-table-wrapper').hidden = filtered.length === 0;

        $('filesResultCount').textContent =
            `Mostrando ${filtered.length} de ${files.length} arquivos`;

        updateStats();
    };

    const refreshFiles = async () => {
        files = await getAllFiles();
        renderFiles();
    };

    // SELEÇÃO DO ARQUIVO
    const showSelectedFile = file => {
        selectedFile = file;

        elements.selectedFile.hidden = !file;

        if (file) {
            elements.selectedFileName.textContent = file.name;
            elements.selectedFileSize.textContent = formatSize(file.size);

            if (file.type.startsWith('image/')) {
                elements.category.value = 'imagem';
            } else if (file.type.includes('spreadsheet') ||
                       ['xls', 'xlsx', 'csv'].includes(getExtension(file.name))) {
                elements.category.value = 'planilha';
            } else if (file.type.includes('presentation') ||
                       ['ppt', 'pptx'].includes(getExtension(file.name))) {
                elements.category.value = 'apresentacao';
            } else {
                elements.category.value = 'documento';
            }
        }
    };

    const validateFile = file => {
        if (!file) return 'Selecione um arquivo antes de continuar.';

        if (file.size > MAX_FILE_SIZE) {
            return 'O arquivo ultrapassa o limite de 15 MB.';
        }

        if (file.size === 0) {
            return 'Não é possível enviar um arquivo vazio.';
        }

        return '';
    };

    elements.fileInput.addEventListener('change', () => {
        const file = elements.fileInput.files[0];

        if (!file) {
            showSelectedFile(null);
            return;
        }

        const error = validateFile(file);

        if (error) {
            showSelectedFile(null);
            elements.fileInput.value = '';
            showMessage(error, 'error');
            return;
        }

        showMessage('');
        showSelectedFile(file);
    });

    $('removeSelectedFile').addEventListener('click', () => {
        elements.fileInput.value = '';
        showSelectedFile(null);
        showMessage('');
    });

    // ARRASTAR E SOLTAR
    const dropZone = $('fileDropZone');

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, event => {
            event.preventDefault();
            dropZone.classList.add('dragging');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, event => {
            event.preventDefault();
            dropZone.classList.remove('dragging');
        });
    });

    dropZone.addEventListener('drop', event => {
        const file = event.dataTransfer.files[0];

        if (!file) return;

        const error = validateFile(file);

        if (error) {
            showMessage(error, 'error');
            return;
        }

        try {
            const transfer = new DataTransfer();
            transfer.items.add(file);
            elements.fileInput.files = transfer.files;
        } catch {
            showMessage('Não foi possível selecionar esse arquivo. Use o botão de seleção.', 'error');
            return;
        }

        showMessage('');
        showSelectedFile(file);
    });

    // MODAL DE UPLOAD
    const openUploadModal = () => {
        elements.uploadModal.classList.add('open');
        elements.uploadModal.setAttribute('aria-hidden', 'false');
    };

    const closeUploadModal = () => {
        elements.uploadModal.classList.remove('open');
        elements.uploadModal.setAttribute('aria-hidden', 'true');
    };

    $('openUploadModal').addEventListener('click', openUploadModal);
    $('emptyUploadButton').addEventListener('click', openUploadModal);
    $('closeFileModal').addEventListener('click', closeUploadModal);
    $('cancelFileUpload').addEventListener('click', closeUploadModal);

    elements.uploadModal.addEventListener('click', event => {
        if (event.target === elements.uploadModal) closeUploadModal();
    });

    // SALVAR ARQUIVO
    elements.form.addEventListener('submit', async event => {
        event.preventDefault();

        const file = selectedFile;
        const error = validateFile(file);

        if (error) {
            showMessage(error, 'error');
            return;
        }

        const projectId = elements.project.value;

        if (projectId && !getProjects().some(project =>
            String(project.id) === String(projectId)
        )) {
            showMessage('O projeto selecionado não está mais disponível. Atualize a página.', 'error');
            return;
        }

        const id = window.crypto?.randomUUID
            ? crypto.randomUUID()
            : `file-${Date.now()}-${Math.random().toString(36).slice(2)}`;

        const fileData = {
            id,
            name: file.name,
            type: file.type || 'application/octet-stream',
            size: file.size,
            category: elements.category.value,
            projectId,
            description: elements.description.value.trim(),
            createdAt: new Date().toISOString(),
            blob: file
        };

        elements.saveButton.disabled = true;
        elements.saveButton.textContent = 'Salvando...';
        showMessage('Armazenando arquivo...');

        try {
            await saveFileToDB(fileData);
            await refreshFiles();

            elements.form.reset();
            elements.fileInput.value = '';
            showSelectedFile(null);
            showMessage('');
            closeUploadModal();

        } catch (error) {
            console.error('Erro ao salvar arquivo:', error);
            showMessage(
                'Não foi possível armazenar o arquivo. Verifique o espaço disponível no navegador.',
                'error'
            );
        } finally {
            elements.saveButton.disabled = false;
            elements.saveButton.textContent = 'Salvar arquivo';
        }
    });

    // BUSCA E FILTROS
    elements.search.addEventListener('input', renderFiles);
    elements.categoryFilter.addEventListener('change', renderFiles);
    elements.projectFilter.addEventListener('change', renderFiles);

    // DOWNLOAD
    const downloadFile = file => {
        if (!file?.blob) {
            alert('O conteúdo deste arquivo não está disponível.');
            return;
        }

        const url = URL.createObjectURL(file.blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    // VISUALIZAÇÃO
    const openPreview = file => {
        if (!file?.blob) {
            alert('O conteúdo deste arquivo não está disponível.');
            return;
        }

        if (previewUrl) URL.revokeObjectURL(previewUrl);

        previewUrl = URL.createObjectURL(file.blob);

        $('previewFileName').textContent = file.name;
        elements.previewContent.innerHTML = '';

        if (file.type.startsWith('image/')) {
            const image = document.createElement('img');
            image.src = previewUrl;
            image.alt = file.name;
            elements.previewContent.appendChild(image);

        } else if (file.type === 'application/pdf' ||
                   getExtension(file.name) === 'pdf') {
            const iframe = document.createElement('iframe');
            iframe.src = previewUrl;
            iframe.title = `Visualização de ${file.name}`;
            elements.previewContent.appendChild(iframe);

        } else {
            const message = document.createElement('p');
            message.textContent =
                'A pré-visualização não está disponível para este formato. Utilize o botão de download.';
            elements.previewContent.appendChild(message);
        }

        elements.previewModal.classList.add('open');
        elements.previewModal.setAttribute('aria-hidden', 'false');
    };

    const closePreview = () => {
        elements.previewModal.classList.remove('open');
        elements.previewModal.setAttribute('aria-hidden', 'true');
        elements.previewContent.innerHTML = '';

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }
    };

    $('closePreviewModal').addEventListener('click', closePreview);

    elements.previewModal.addEventListener('click', event => {
        if (event.target === elements.previewModal) closePreview();
    });

    // AÇÕES DA TABELA
    elements.table.addEventListener('click', async event => {
        const button = event.target.closest('[data-file-action]');
        if (!button) return;

        const file = files.find(item =>
            String(item.id) === String(button.dataset.fileId)
        );

        if (!file) return;

        const action = button.dataset.fileAction;

        if (action === 'preview') {
            openPreview(file);
        }

        if (action === 'download') {
            downloadFile(file);
        }

        if (action === 'delete') {
            const confirmed = confirm(
                `Deseja realmente excluir o arquivo "${file.name}"?`
            );

            if (!confirmed) return;

            try {
                await deleteFileFromDB(file.id);
                await refreshFiles();
            } catch (error) {
                console.error('Erro ao excluir arquivo:', error);
                alert('Não foi possível excluir o arquivo.');
            }
        }
    });

    // DATA E RODAPÉ
    $('filesDate').textContent = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    document.querySelectorAll('[data-files-year]').forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // MENU MOBILE
    const sidebar = $('sidebar');
    const overlay = $('sidebarOverlay');
    const mobileButton = $('mobileMenuButton');

    const closeMobileMenu = () => {
        sidebar?.classList.remove('mobile-open');

        if (overlay) {
            overlay.classList.remove('active');
            overlay.style.display = '';
        }
    };

    mobileButton?.addEventListener('click', () => {
        sidebar?.classList.toggle('mobile-open');

        const isOpen = sidebar?.classList.contains('mobile-open');

        if (overlay) {
            overlay.classList.toggle('active', isOpen);
            overlay.style.display = isOpen ? 'block' : '';
        }
    });

    overlay?.addEventListener('click', closeMobileMenu);

    // MENU DO PERFIL
    const profileButton = $('profileButton');
    const profileMenu = $('profileMenu');

    profileButton?.addEventListener('click', event => {
        event.stopPropagation();

        if (profileMenu) {
            profileMenu.style.display =
                profileMenu.style.display === 'block' ? 'none' : 'block';
        }
    });

    document.addEventListener('click', event => {
        if (
            profileMenu &&
            !profileMenu.contains(event.target) &&
            !profileButton?.contains(event.target)
        ) {
            profileMenu.style.display = 'none';
        }
    });

    // ATUALIZA PROJETOS QUANDO ALTERADOS EM OUTRA ABA
    window.addEventListener('storage', event => {
        if (event.key === 'clientPortalProjects') {
            populateProjects();
            renderFiles();
        }
    });

    // INICIALIZAÇÃO
    const initialize = async () => {
        try {
            db = await openDatabase();
            populateProjects();
            await refreshFiles();
        } catch (error) {
            console.error('Erro ao iniciar central de arquivos:', error);

            elements.empty.hidden = false;
            elements.empty.querySelector('h3').textContent =
                'Não foi possível abrir a central de arquivos';

            elements.empty.querySelector('p').textContent =
                'Verifique se o navegador permite armazenamento local e recarregue a página.';

            document.querySelector('.files-table-wrapper').hidden = true;
        }
    };

    initialize();

})();



/* =========================================
   CLIENTPORTAL — MÓDULO FINANCEIRO
========================================= */

(() => {
    const page = document.querySelector('[data-page="financeiro"]');
    if (!page) return;

    const INVOICE_KEY = 'clientPortalInvoices';
    const CLIENT_KEY = 'clientPortalClients';

    // ELEMENTOS
    const invoiceTableBody = document.getElementById('invoiceTableBody');
    const invoiceEmpty = document.getElementById('invoiceEmpty');
    const invoiceCount = document.getElementById('invoiceCount');
    const invoiceResultCount = document.getElementById('invoiceResultCount');

    const invoiceSearch = document.getElementById('invoiceSearch');
    const invoiceStatusFilter = document.getElementById('invoiceStatusFilter');
    const invoiceSort = document.getElementById('invoiceSort');

    const invoiceModal = document.getElementById('invoiceModal');
    const invoiceForm = document.getElementById('invoiceForm');
    const invoiceModalTitle = document.getElementById('invoiceModalTitle');
    const invoiceFormMessage = document.getElementById('invoiceFormMessage');

    const invoiceClient = document.getElementById('invoiceClient');
    const invoiceDescription = document.getElementById('invoiceDescription');
    const invoiceAmount = document.getElementById('invoiceAmount');
    const invoiceIssueDate = document.getElementById('invoiceIssueDate');
    const invoiceDueDate = document.getElementById('invoiceDueDate');
    const invoiceStatus = document.getElementById('invoiceStatus');
    const invoicePaymentDate = document.getElementById('invoicePaymentDate');
    const paymentDateGroup = document.getElementById('paymentDateGroup');

    const newInvoiceButton = document.getElementById('newInvoiceButton');

    // UTILITÁRIOS
    const readStorage = (key, fallback = []) => {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            return Array.isArray(data) ? data : fallback;
        } catch {
            return fallback;
        }
    };

    const saveInvoices = () => {
        localStorage.setItem(INVOICE_KEY, JSON.stringify(invoices));
    };

    const today = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const dateOffset = (days) => {
        const date = new Date();
        date.setDate(date.getDate() + days);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const escapeHTML = (value) =>
        String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[char]);

    const formatCurrency = (value) =>
        Number(value || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

    const formatDate = (value) => {
        if (!value) return '—';

        const [year, month, day] = value.split('-');
        return `${day}/${month}/${year}`;
    };

    // CLIENTES
    const getClients = () => {
        return readStorage(CLIENT_KEY);
    };

    const getClient = (id) => {
        return getClients().find(client =>
            String(client.id || client.email || client.company || client.name) === String(id)
        ) || null;
    };

    const getClientId = (client) =>
        String(client.id || client.email || client.company || client.name);

    const getClientName = (invoice) => {
        const client = getClient(invoice.clientId);
        return client?.name || invoice.clientName || 'Cliente não encontrado';
    };

    const getClientCompany = (invoice) => {
        const client = getClient(invoice.clientId);
        return client?.company || invoice.clientCompany || '';
    };

    // STATUS AUTOMÁTICO
    const getStatus = (invoice) => {
        if (invoice.status === 'paid') return 'paid';

        if (invoice.dueDate < today()) return 'overdue';

        return 'pending';
    };

    const statusLabel = (status) => ({
        paid: 'Pago',
        pending: 'Pendente',
        overdue: 'Atrasado'
    })[status] || 'Pendente';

    // DADOS DEMONSTRATIVOS
    const createDemoInvoices = () => {
        const clients = getClients();

        const examples = [
            {
                company: 'Studio Criativo',
                description: 'Desenvolvimento de website',
                amount: 4500,
                issueOffset: -15,
                dueOffset: -3,
                status: 'paid',
                paymentOffset: -4
            },
            {
                company: 'Alpha Solutions',
                description: 'Identidade visual',
                amount: 2800,
                issueOffset: -8,
                dueOffset: 5,
                status: 'pending'
            },
            {
                company: 'MoveTech',
                description: 'Desenvolvimento de aplicativo',
                amount: 6500,
                issueOffset: -20,
                dueOffset: -5,
                status: 'pending'
            },
            {
                company: 'Nova Agência',
                description: 'Criação de landing page',
                amount: 1800,
                issueOffset: -2,
                dueOffset: 13,
                status: 'pending'
            }
        ];

        return examples.map((example, index) => {
            const client = clients.find(item =>
                String(item.company || '').trim().toLowerCase() ===
                example.company.toLowerCase()
            );

            if (!client) return null;

            return {
                id: `invoice-demo-${index + 1}`,
                clientId: getClientId(client),
                clientName: client.name,
                clientCompany: client.company,
                description: example.description,
                amount: example.amount,
                issueDate: dateOffset(example.issueOffset),
                dueDate: dateOffset(example.dueOffset),
                status: example.status,
                paymentDate: example.paymentOffset !== undefined
                    ? dateOffset(example.paymentOffset)
                    : ''
            };
        }).filter(Boolean);
    };

    let invoices = readStorage(INVOICE_KEY);

    if (!invoices.length) {
        invoices = createDemoInvoices();
        saveInvoices();
    }

    // NORMALIZAÇÃO
    invoices = invoices.map(invoice => ({
        ...invoice,
        amount: Number(invoice.amount) || 0,
        status: invoice.status === 'paid' ? 'paid' : 'pending'
    }));

    saveInvoices();

    // PREENCHER CLIENTES
    const renderClientOptions = () => {
        const clients = getClients();

        invoiceClient.innerHTML = `
            <option value="">Selecione um cliente</option>
            ${clients.map(client => `
                <option value="${escapeHTML(getClientId(client))}">
                    ${escapeHTML(client.name)} — ${escapeHTML(client.company)}
                </option>
            `).join('')}
        `;
    };

    // INDICADORES
    const updateStats = () => {
        const revenue = invoices.reduce(
            (total, invoice) => total + invoice.amount, 0
        );

        const received = invoices
            .filter(invoice => getStatus(invoice) === 'paid')
            .reduce((total, invoice) => total + invoice.amount, 0);

        const pending = invoices
            .filter(invoice => getStatus(invoice) === 'pending')
            .reduce((total, invoice) => total + invoice.amount, 0);

        const overdue = invoices
            .filter(invoice => getStatus(invoice) === 'overdue')
            .reduce((total, invoice) => total + invoice.amount, 0);

        document.getElementById('totalRevenue').textContent =
            formatCurrency(revenue);

        document.getElementById('totalReceived').textContent =
            formatCurrency(received);

        document.getElementById('totalPending').textContent =
            formatCurrency(pending);

        document.getElementById('totalOverdue').textContent =
            formatCurrency(overdue);
    };

    // RENDERIZAR FATURAS
    const renderInvoices = () => {
        const search = invoiceSearch.value.trim().toLowerCase();
        const statusFilter = invoiceStatusFilter.value;

        let filtered = invoices.filter(invoice => {
            const name = getClientName(invoice).toLowerCase();
            const company = getClientCompany(invoice).toLowerCase();
            const description = invoice.description.toLowerCase();

            const matchesSearch =
                name.includes(search) ||
                company.includes(search) ||
                description.includes(search);

            const matchesStatus =
                statusFilter === 'all' ||
                getStatus(invoice) === statusFilter;

            return matchesSearch && matchesStatus;
        });

        if (invoiceSort.value === 'recent') {
            filtered.sort((a, b) =>
                b.issueDate.localeCompare(a.issueDate)
            );
        }

        if (invoiceSort.value === 'oldest') {
            filtered.sort((a, b) =>
                a.issueDate.localeCompare(b.issueDate)
            );
        }

        if (invoiceSort.value === 'highest') {
            filtered.sort((a, b) => b.amount - a.amount);
        }

        if (invoiceSort.value === 'lowest') {
            filtered.sort((a, b) => a.amount - b.amount);
        }

        invoiceTableBody.innerHTML = filtered.map(invoice => {
            const status = getStatus(invoice);

            return `
                <tr>
                    <td>
                        <span class="finance-invoice-id">
                            ${escapeHTML(invoice.id)}
                        </span>
                        <span class="finance-invoice-description">
                            ${escapeHTML(invoice.description)}
                        </span>
                    </td>

                    <td>
                        <span class="finance-client-name">
                            ${escapeHTML(getClientName(invoice))}
                        </span>
                        <span class="finance-client-company">
                            ${escapeHTML(getClientCompany(invoice))}
                        </span>
                    </td>

                    <td>${formatDate(invoice.issueDate)}</td>

                    <td>${formatDate(invoice.dueDate)}</td>

                    <td>
                        <span class="finance-amount">
                            ${formatCurrency(invoice.amount)}
                        </span>
                    </td>

                    <td>
                        <span class="finance-status ${status}">
                            ${statusLabel(status)}
                        </span>
                    </td>

                    <td>
                        <div class="finance-row-actions">

                            <button type="button"
                                class="finance-action-button"
                                data-action="edit"
                                data-id="${escapeHTML(invoice.id)}"
                                title="Editar fatura"
                                aria-label="Editar fatura">✎</button>

                            <button type="button"
                                class="finance-action-button delete"
                                data-action="delete"
                                data-id="${escapeHTML(invoice.id)}"
                                title="Excluir fatura"
                                aria-label="Excluir fatura">×</button>

                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        invoiceEmpty.hidden = filtered.length > 0;

        invoiceCount.textContent =
            `${invoices.length} ${invoices.length === 1 ? 'fatura' : 'faturas'}`;

        invoiceResultCount.textContent =
            `Mostrando ${filtered.length} de ${invoices.length} faturas`;

        updateStats();
    };

    // MODAL
    const openModal = () => {
        renderClientOptions();

        invoiceForm.reset();

        document.getElementById('invoiceId').value = '';
        invoiceModalTitle.textContent = 'Nova fatura';

        invoiceIssueDate.value = today();
        invoiceDueDate.value = dateOffset(7);

        invoiceStatus.value = 'pending';
        invoicePaymentDate.value = '';
        paymentDateGroup.hidden = true;

        invoiceFormMessage.textContent = '';

        invoiceModal.classList.add('active');
        invoiceModal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
        invoiceModal.classList.remove('active');
        invoiceModal.setAttribute('aria-hidden', 'true');
        invoiceFormMessage.textContent = '';
    };

    newInvoiceButton.addEventListener('click', openModal);

    document.getElementById('closeInvoiceModal')
        .addEventListener('click', closeModal);

    document.getElementById('cancelInvoiceButton')
        .addEventListener('click', closeModal);

    invoiceModal.addEventListener('click', event => {
        if (event.target === invoiceModal) closeModal();
    });

    // EXIBIR DATA DE PAGAMENTO
    invoiceStatus.addEventListener('change', () => {
        const paid = invoiceStatus.value === 'paid';

        paymentDateGroup.hidden = !paid;

        if (paid && !invoicePaymentDate.value) {
            invoicePaymentDate.value = today();
        }

        if (!paid) {
            invoicePaymentDate.value = '';
        }
    });

    // CADASTRAR OU EDITAR
    invoiceForm.addEventListener('submit', event => {
        event.preventDefault();

        const id = document.getElementById('invoiceId').value;
        const client = getClient(invoiceClient.value);

        const description = invoiceDescription.value.trim();
        const amount = Number(invoiceAmount.value);
        const issueDate = invoiceIssueDate.value;
        const dueDate = invoiceDueDate.value;
        const status = invoiceStatus.value;
        const paymentDate = invoicePaymentDate.value;

        if (!client) {
            invoiceFormMessage.textContent =
                'Selecione um cliente cadastrado.';
            return;
        }

        if (!description || !Number.isFinite(amount) || amount <= 0) {
            invoiceFormMessage.textContent =
                'Informe uma descrição e um valor válido.';
            return;
        }

        if (!issueDate || !dueDate || dueDate < issueDate) {
            invoiceFormMessage.textContent =
                'A data de vencimento deve ser igual ou posterior à emissão.';
            return;
        }

        if (status === 'paid' && !paymentDate) {
            invoiceFormMessage.textContent =
                'Informe a data em que o pagamento foi realizado.';
            return;
        }

        if (status === 'paid' && paymentDate < issueDate) {
            invoiceFormMessage.textContent =
                'A data do pagamento não pode ser anterior à emissão.';
            return;
        }

        const invoiceData = {
            id: id || `FAT-${Date.now()}`,
            clientId: getClientId(client),
            clientName: client.name,
            clientCompany: client.company,
            description,
            amount,
            issueDate,
            dueDate,
            status,
            paymentDate: status === 'paid' ? paymentDate : ''
        };

        if (id) {
            invoices = invoices.map(invoice =>
                invoice.id === id ? invoiceData : invoice
            );
        } else {
            invoices.push(invoiceData);
        }

        saveInvoices();
        renderInvoices();
        closeModal();
    });

    // AÇÕES DA TABELA
    invoiceTableBody.addEventListener('click', event => {
        const button = event.target.closest('[data-action]');

        if (!button) return;

        const id = button.dataset.id;
        const action = button.dataset.action;

        const invoice = invoices.find(item =>
            String(item.id) === String(id)
        );

        if (!invoice) return;

        if (action === 'edit') {
            renderClientOptions();

            document.getElementById('invoiceId').value = invoice.id;
            invoiceClient.value = invoice.clientId;
            invoiceDescription.value = invoice.description;
            invoiceAmount.value = invoice.amount;
            invoiceIssueDate.value = invoice.issueDate;
            invoiceDueDate.value = invoice.dueDate;
            invoiceStatus.value = invoice.status;
            invoicePaymentDate.value = invoice.paymentDate || '';

            paymentDateGroup.hidden = invoice.status !== 'paid';

            invoiceModalTitle.textContent = 'Editar fatura';
            invoiceFormMessage.textContent = '';

            invoiceModal.classList.add('active');
            invoiceModal.setAttribute('aria-hidden', 'false');
        }

        if (action === 'delete') {
            const confirmed = confirm(
                `Deseja realmente excluir a fatura "${invoice.description}"?`
            );

            if (!confirmed) return;

            invoices = invoices.filter(item => item.id !== id);

            saveInvoices();
            renderInvoices();
        }
    });

    // PESQUISA E FILTROS
    invoiceSearch.addEventListener('input', renderInvoices);
    invoiceStatusFilter.addEventListener('change', renderInvoices);
    invoiceSort.addEventListener('change', renderInvoices);

    // DATA DO CABEÇALHO
    const financeDate = document.getElementById('financeDate');

    financeDate.textContent = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    // ANO DO RODAPÉ
    document.querySelectorAll('[data-ano]').forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // MENU MOBILE
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const mobileMenuButton = document.getElementById('mobileMenuButton');

    const closeMobileMenu = () => {
        sidebar?.classList.remove('mobile-open');
        overlay?.classList.remove('active');
    };

    mobileMenuButton?.addEventListener('click', () => {
        sidebar?.classList.toggle('mobile-open');
        overlay?.classList.toggle(
            'active',
            sidebar?.classList.contains('mobile-open')
        );
    });

    overlay?.addEventListener('click', closeMobileMenu);

    // MENU DO PERFIL
    const profileButton = document.getElementById('profileButton');
    const profileMenu = document.getElementById('profileMenu');

    profileButton?.addEventListener('click', event => {
        event.stopPropagation();

        if (profileMenu) {
            profileMenu.style.display =
                profileMenu.style.display === 'block' ? 'none' : 'block';
        }
    });

    document.addEventListener('click', event => {
        if (
            profileMenu &&
            !profileMenu.contains(event.target) &&
            !profileButton?.contains(event.target)
        ) {
            profileMenu.style.display = 'none';
        }
    });

    // ATUALIZAÇÃO SE CLIENTES FOREM ALTERADOS
    window.addEventListener('storage', event => {
        if (event.key === CLIENT_KEY) {
            renderClientOptions();
            renderInvoices();
        }
    });

    // INICIALIZAÇÃO
    renderClientOptions();
    renderInvoices();

})();
