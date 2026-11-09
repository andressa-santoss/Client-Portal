
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
            const confirmed = confirm(
                `Deseja realmente excluir o projeto "${project.name}"?`
            );

            if (!confirmed) return;

            projects = projects.filter(item => item.id !== id);
            saveProjects();
            renderProjects();
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
