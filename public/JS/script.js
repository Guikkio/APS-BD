
document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    const loginContainer = document.getElementById("loginContainer");
    const loginForm = document.getElementById("loginForm");
    const loading = document.getElementById("loading");
    const progressBar = document.getElementById("progress");
    const app = document.getElementById("app");

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {

            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }

            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = "#38bdf8";
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    function startLoading() {
        loading.style.opacity = 1;
        loading.style.pointerEvents = "all";
    }

    function stopLoading() {
        loading.style.opacity = 0;
        loading.style.pointerEvents = "none";
        progressBar.style.width = "0%";
    }

    function showDashboard() {

        loginContainer.style.opacity = 0;

        setTimeout(() => {
            loginContainer.style.display = "none";
            document.body.classList.remove("no-scroll");

            app.style.opacity = 1;
            app.style.pointerEvents = "all";
            switchTab('dashboard');

        }, 600);
    }

    window.login = function login() {

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username !== "Guikkio" || password !== "APStime") {
            alert("Usuario ou senha incorretos.");
            return;
        }

        startLoading();

        let progress = 0;

        const interval = setInterval(() => {

            progress += 10;

            progressBar.style.width = progress + "%";

            if (progress >= 100) {

                clearInterval(interval);

                setTimeout(() => {

                    stopLoading();
                    showDashboard();

                }, 400);
            }

        }, 120);
    };

    const loginInputs = [usernameInput, passwordInput];
    loginInputs.forEach(input => {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                login();
            }
        });
    });

    window.logout = function logout() {
        app.style.opacity = 0;
        app.style.pointerEvents = "none";
        loginContainer.style.display = "flex";
        loginContainer.style.opacity = 1;
        document.body.classList.add("no-scroll");
    };

    const registros = [
        { id: 1, data: '2016-03-11', titulo: 'Video falso de candidato viraliza', ia: 'SIM', plataforma: 'Facebook' },
        { id: 2, data: '2016-04-21', titulo: 'Fake news sobre vacina causa panico', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 3, data: '2016-05-13', titulo: 'Imagem manipulada de enchente circula online', ia: 'SIM', plataforma: 'Instagram' },
        { id: 4, data: '2016-06-01', titulo: 'Audio falso anuncia fechamento de bancos', ia: 'SIM', plataforma: 'WhatsApp' },
        { id: 5, data: '2016-07-14', titulo: 'Boato sobre fraude eleitoral ganha repercussao', ia: 'NAO', plataforma: 'Twitter' },
        { id: 6, data: '2016-08-19', titulo: 'Deepfake de jornalista gera confusao', ia: 'SIM', plataforma: 'YouTube' },
        { id: 7, data: '2016-09-08', titulo: 'Mensagem falsa sobre ataque terrorista', ia: 'NAO', plataforma: 'Facebook' },
        { id: 8, data: '2016-10-22', titulo: 'Fake news sobre chips em vacinas', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 9, data: '2016-11-05', titulo: 'Video editado de celebridade viraliza', ia: 'SIM', plataforma: 'TikTok' },
        { id: 10, data: '2016-12-18', titulo: 'Imagem falsa de desastre ambiental', ia: 'SIM', plataforma: 'Instagram' },
        { id: 11, data: '2017-01-10', titulo: 'Boato sobre cancelamento de eleicoes', ia: 'NAO', plataforma: 'Facebook' },
        { id: 12, data: '2017-01-28', titulo: 'Deepfake de presidente em discurso falso', ia: 'SIM', plataforma: 'YouTube' },
        { id: 13, data: '2017-02-14', titulo: 'Mensagem falsa sobre falta de combustivel', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 14, data: '2017-03-17', titulo: 'Video manipulado sobre pandemia', ia: 'SIM', plataforma: 'TikTok' },
        { id: 15, data: '2017-04-09', titulo: 'Fake news sobre cura milagrosa', ia: 'NAO', plataforma: 'Facebook' },
        { id: 16, data: '2017-05-30', titulo: 'Imagem falsa de incendio viraliza', ia: 'SIM', plataforma: 'Instagram' },
        { id: 17, data: '2017-06-11', titulo: 'Audio falso de governador circula online', ia: 'SIM', plataforma: 'WhatsApp' },
        { id: 18, data: '2017-07-25', titulo: 'Boato sobre fechamento de escolas', ia: 'NAO', plataforma: 'Twitter' },
        { id: 19, data: '2017-08-13', titulo: 'Deepfake de ator promovendo golpe', ia: 'SIM', plataforma: 'YouTube' },
        { id: 20, data: '2017-09-01', titulo: 'Mensagem falsa sobre saque bancario', ia: 'NAO', plataforma: 'Facebook' },
        { id: 21, data: '2017-10-27', titulo: 'Video falso sobre conflito internacional', ia: 'SIM', plataforma: 'TikTok' },
        { id: 22, data: '2017-11-03', titulo: 'Imagem manipulada de protesto viraliza', ia: 'SIM', plataforma: 'Instagram' },
        { id: 23, data: '2017-12-15', titulo: 'Boato sobre vacina obrigatoria', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 24, data: '2018-01-12', titulo: 'Fake news sobre fraude em concurso', ia: 'NAO', plataforma: 'Facebook' },
        { id: 25, data: '2018-01-29', titulo: 'Deepfake de cantor famoso viraliza', ia: 'SIM', plataforma: 'YouTube' },
        { id: 26, data: '2018-02-16', titulo: 'Imagem falsa de tsunami assusta usuarios', ia: 'SIM', plataforma: 'Instagram' },
        { id: 27, data: '2018-03-05', titulo: 'Mensagem falsa sobre auxilio emergencial', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 28, data: '2018-03-22', titulo: 'Video manipulado sobre ataque militar', ia: 'SIM', plataforma: 'TikTok' },
        { id: 29, data: '2018-04-17', titulo: 'Boato sobre fechamento do comercio', ia: 'NAO', plataforma: 'Facebook' },
        { id: 30, data: '2018-05-09', titulo: 'Audio falso sobre falta de agua', ia: 'SIM', plataforma: 'WhatsApp' },
        { id: 31, data: '2018-06-13', titulo: 'Fake news sobre vacina infantil', ia: 'NAO', plataforma: 'Twitter' },
        { id: 32, data: '2018-07-08', titulo: 'Deepfake de apresentador de TV', ia: 'SIM', plataforma: 'YouTube' },
        { id: 33, data: '2018-08-11', titulo: 'Imagem falsa de acidente aereo', ia: 'SIM', plataforma: 'Instagram' },
        { id: 34, data: '2018-09-04', titulo: 'Mensagem falsa sobre novo imposto', ia: 'NAO', plataforma: 'Facebook' },
        { id: 35, data: '2018-10-18', titulo: 'Video falso de policial circula online', ia: 'SIM', plataforma: 'TikTok' },
        { id: 36, data: '2018-11-27', titulo: 'Boato sobre apagao nacional', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 37, data: '2018-12-30', titulo: 'Deepfake de politico gera debate', ia: 'SIM', plataforma: 'YouTube' },
        { id: 38, data: '2019-01-15', titulo: 'Fake news sobre cura da COVID-19', ia: 'NAO', plataforma: 'Facebook' },
        { id: 39, data: '2019-02-21', titulo: 'Imagem falsa de hospital lotado', ia: 'SIM', plataforma: 'Instagram' },
        { id: 40, data: '2019-03-17', titulo: 'Mensagem falsa sobre lockdown', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 41, data: '2019-04-02', titulo: 'Video manipulado de medico viraliza', ia: 'SIM', plataforma: 'TikTok' },
        { id: 42, data: '2019-05-11', titulo: 'Boato sobre fechamento de fronteiras', ia: 'NAO', plataforma: 'Twitter' },
        { id: 43, data: '2019-06-20', titulo: 'Deepfake de lider mundial viraliza', ia: 'SIM', plataforma: 'YouTube' },
        { id: 44, data: '2019-07-29', titulo: 'Fake news sobre chips em vacina', ia: 'NAO', plataforma: 'Facebook' },
        { id: 45, data: '2019-08-14', titulo: 'Imagem falsa de filas em hospitais', ia: 'SIM', plataforma: 'Instagram' },
        { id: 46, data: '2019-09-03', titulo: 'Mensagem falsa sobre nova variante', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 47, data: '2019-10-26', titulo: 'Video falso sobre golpe financeiro', ia: 'SIM', plataforma: 'TikTok' },
        { id: 48, data: '2019-11-08', titulo: 'Boato sobre fraude nas urnas', ia: 'NAO', plataforma: 'Twitter' },
        { id: 49, data: '2019-12-19', titulo: 'Deepfake de empresario promovendo criptomoeda', ia: 'SIM', plataforma: 'YouTube' },
        { id: 50, data: '2020-01-10', titulo: 'Fake news sobre cancelamento escolar', ia: 'NAO', plataforma: 'Facebook' },
        { id: 51, data: '2020-01-27', titulo: 'Imagem manipulada de enchente em Fortaleza', ia: 'SIM', plataforma: 'Instagram' },
        { id: 52, data: '2020-02-18', titulo: 'Mensagem falsa sobre vacina mortal', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 53, data: '2020-03-09', titulo: 'Video falso de guerra internacional', ia: 'SIM', plataforma: 'TikTok' },
        { id: 54, data: '2020-04-21', titulo: 'Boato sobre toque de recolher', ia: 'NAO', plataforma: 'Facebook' },
        { id: 55, data: '2020-05-11', titulo: 'Deepfake de jornalista anunciando crise', ia: 'SIM', plataforma: 'YouTube' },
        { id: 56, data: '2020-06-08', titulo: 'Fake news sobre falta de alimentos', ia: 'NAO', plataforma: 'Twitter' },
        { id: 57, data: '2020-07-17', titulo: 'Imagem falsa de aviao abatido', ia: 'SIM', plataforma: 'Instagram' },
        { id: 58, data: '2020-08-30', titulo: 'Mensagem falsa sobre pix bloqueado', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 59, data: '2020-09-22', titulo: 'Video manipulado sobre presidente', ia: 'SIM', plataforma: 'TikTok' },
        { id: 60, data: '2020-10-12', titulo: 'Boato sobre apagao na internet', ia: 'NAO', plataforma: 'Facebook' },
        { id: 61, data: '2020-11-29', titulo: 'Deepfake de cantora promovendo golpe', ia: 'SIM', plataforma: 'YouTube' },
        { id: 62, data: '2020-12-07', titulo: 'Fake news sobre vacina magnetica', ia: 'NAO', plataforma: 'Facebook' },
        { id: 63, data: '2021-01-14', titulo: 'Imagem falsa de protestos violentos', ia: 'SIM', plataforma: 'Instagram' },
        { id: 64, data: '2021-02-20', titulo: 'Mensagem falsa sobre imposto digital', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 65, data: '2021-03-11', titulo: 'Video falso sobre nova pandemia', ia: 'SIM', plataforma: 'TikTok' },
        { id: 66, data: '2021-04-18', titulo: 'Boato sobre fechamento de aeroportos', ia: 'NAO', plataforma: 'Twitter' },
        { id: 67, data: '2021-05-22', titulo: 'Deepfake de medico recomendando remedio', ia: 'SIM', plataforma: 'YouTube' },
        { id: 68, data: '2021-06-10', titulo: 'Fake news sobre vacina infertilidade', ia: 'NAO', plataforma: 'Facebook' },
        { id: 69, data: '2021-07-09', titulo: 'Imagem falsa de terremoto viraliza', ia: 'SIM', plataforma: 'Instagram' },
        { id: 70, data: '2021-08-17', titulo: 'Mensagem falsa sobre bloqueio bancario', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 71, data: '2021-09-28', titulo: 'Video manipulado sobre celebridade', ia: 'SIM', plataforma: 'TikTok' },
        { id: 72, data: '2021-10-05', titulo: 'Boato sobre chips governamentais', ia: 'NAO', plataforma: 'Facebook' },
        { id: 73, data: '2021-11-13', titulo: 'Deepfake de influencer anunciando golpe', ia: 'SIM', plataforma: 'YouTube' },
        { id: 74, data: '2021-12-19', titulo: 'Fake news sobre vacina experimental', ia: 'NAO', plataforma: 'Twitter' },
        { id: 75, data: '2022-01-07', titulo: 'Imagem falsa de incendio florestal', ia: 'SIM', plataforma: 'Instagram' },
        { id: 76, data: '2022-02-24', titulo: 'Mensagem falsa sobre invasao hacker', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 77, data: '2022-03-11', titulo: 'Video falso sobre crise economica', ia: 'SIM', plataforma: 'TikTok' },
        { id: 78, data: '2022-04-01', titulo: 'Boato sobre fechamento de bancos', ia: 'NAO', plataforma: 'Facebook' },
        { id: 79, data: '2022-05-15', titulo: 'Deepfake de politico em debate', ia: 'SIM', plataforma: 'YouTube' },
        { id: 80, data: '2022-06-22', titulo: 'Fake news sobre vacina alterando DNA', ia: 'NAO', plataforma: 'Twitter' },
        { id: 81, data: '2022-07-18', titulo: 'Imagem falsa de guerra viraliza', ia: 'SIM', plataforma: 'Instagram' },
        { id: 82, data: '2022-08-10', titulo: 'Mensagem falsa sobre falta de energia', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 83, data: '2022-09-03', titulo: 'Video manipulado de cientista', ia: 'SIM', plataforma: 'TikTok' },
        { id: 84, data: '2022-10-26', titulo: 'Boato sobre nova moeda digital', ia: 'NAO', plataforma: 'Facebook' },
        { id: 85, data: '2022-11-11', titulo: 'Deepfake de presidente internacional', ia: 'SIM', plataforma: 'YouTube' },
        { id: 86, data: '2022-12-20', titulo: 'Fake news sobre lockdown nacional', ia: 'NAO', plataforma: 'Twitter' },
        { id: 87, data: '2023-01-08', titulo: 'Imagem falsa de enchente no Brasil', ia: 'SIM', plataforma: 'Instagram' },
        { id: 88, data: '2023-02-16', titulo: 'Mensagem falsa sobre pix taxado', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 89, data: '2023-03-09', titulo: 'Video falso sobre ataque nuclear', ia: 'SIM', plataforma: 'TikTok' },
        { id: 90, data: '2023-04-13', titulo: 'Boato sobre vacina contaminada', ia: 'NAO', plataforma: 'Facebook' },
        { id: 91, data: '2023-05-25', titulo: 'Deepfake de ator famoso promovendo investimento', ia: 'SIM', plataforma: 'YouTube' },
        { id: 92, data: '2023-06-04', titulo: 'Fake news sobre fechamento de universidades', ia: 'NAO', plataforma: 'Twitter' },
        { id: 93, data: '2023-07-12', titulo: 'Imagem falsa de manifestacao politica', ia: 'SIM', plataforma: 'Instagram' },
        { id: 94, data: '2023-08-20', titulo: 'Mensagem falsa sobre golpe no INSS', ia: 'NAO', plataforma: 'WhatsApp' },
        { id: 95, data: '2023-09-28', titulo: 'Video manipulado sobre guerra mundial', ia: 'SIM', plataforma: 'TikTok' },
        { id: 96, data: '2024-01-11', titulo: 'Boato sobre crise bancaria', ia: 'NAO', plataforma: 'Facebook' },
        { id: 97, data: '2024-03-19', titulo: 'Deepfake de jornalista internacional', ia: 'SIM', plataforma: 'YouTube' },
        { id: 98, data: '2024-05-30', titulo: 'Fake news sobre chips cerebrais', ia: 'NAO', plataforma: 'Twitter' },
        { id: 99, data: '2025-02-17', titulo: 'Imagem falsa de desastre climatico', ia: 'SIM', plataforma: 'Instagram' },
        { id: 100, data: '2026-02-05', titulo: 'Video falso criado por IA viraliza nas eleicoes', ia: 'SIM', plataforma: 'TikTok' },
    ];

    const recordsFilters = document.getElementById('recordsFilters');
    const toggleFiltersBtn = document.getElementById('toggleFiltersBtn');
    const filterYearContainer = document.getElementById('filterYearContainer');
    const platformOptionsContainer = document.getElementById('platformOptionsContainer');
    const platformOptions = document.getElementById('platformOptions');
    const platformPickerLabel = document.getElementById('platformPickerLabel');

    window.toggleRecordFilters = function toggleRecordFilters() {
        const isOpen = recordsFilters.classList.toggle('open');
        recordsFilters.classList.toggle('collapsed', !isOpen);
        toggleFiltersBtn.textContent = isOpen ? 'Ocultar filtros' : 'Mostrar filtros';
    };

    function populatePlatformFilter() {
        const platforms = [...new Set(registros.map(record => record.plataforma))].sort();
        platformOptionsContainer.innerHTML = '';

        platforms.forEach(platform => {
            const label = document.createElement('label');
            label.className = 'checkbox-pill';
            label.innerHTML = `
                <input type="checkbox" class="platform-checkbox" value="${platform}" checked>
                ${platform}
            `;
            platformOptionsContainer.appendChild(label);
        });

        document.querySelectorAll('.platform-checkbox').forEach(input => {
            input.addEventListener('change', filterRecords);
        });
    }

    function populateYearFilter() {
        filterYearContainer.innerHTML = '';
        for (let year = 2015; year <= 2026; year += 1) {
            const label = document.createElement('label');
            label.className = 'checkbox-pill';
            label.innerHTML = `
                <input type="checkbox" class="year-checkbox" value="${year}" checked>
                ${year}
            `;
            filterYearContainer.appendChild(label);
        }

        document.querySelectorAll('.year-checkbox').forEach(input => {
            input.addEventListener('change', filterRecords);
        });
    }

    window.switchFilterTab = function switchFilterTab(tabName) {
        const tabs = document.querySelectorAll('.filter-tab');
        const tabContents = document.querySelectorAll('.filter-tab-content');
        const tabIdMap = {
            year: 'filterTabYear',
            ia: 'filterTabIA',
            platform: 'filterTabPlatform'
        };

        tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.filterTab === tabName));
        tabContents.forEach(content => content.classList.toggle('active', content.id === tabIdMap[tabName]));
    };

    window.toggleIACheckbox = function toggleIACheckbox(iaValue) {
        const button = document.querySelector(`.ia-toggle[data-ia="${iaValue}"]`);
        if (!button) return;
        button.classList.toggle('active');
        filterRecords();
    };

    window.togglePlatformOptions = function togglePlatformOptions() {
        platformOptions.classList.toggle('collapsed');
    };

    function getSelectedYears() {
        return Array.from(document.querySelectorAll('.year-checkbox:checked')).map(input => input.value);
    }

    function getSelectedIAs() {
        return Array.from(document.querySelectorAll('.ia-toggle.active')).map(button => button.dataset.ia);
    }

    function getSelectedPlatforms() {
        return Array.from(document.querySelectorAll('.platform-checkbox:checked')).map(input => input.value);
    }

    function filterRecords() {
        const selectedYears = getSelectedYears();
        const selectedIAs = getSelectedIAs();
        const selectedPlatforms = getSelectedPlatforms();

        const filtered = registros.filter(record => {
            const recordYear = record.data.slice(0, 4);
            const matchesYear = selectedYears.length > 0 && selectedYears.includes(recordYear);
            const matchesIA = selectedIAs.length > 0 && selectedIAs.includes(record.ia);
            const matchesPlatform = selectedPlatforms.length > 0 && selectedPlatforms.includes(record.plataforma);
            return matchesYear && matchesIA && matchesPlatform;
        });

        renderRecords(filtered);
    }

    function renderRecords(recordsToRender = registros) {
        const tbody = document.getElementById('recordsTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';

        if (recordsToRender.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="5" class="no-results">Nenhum registro encontrado com os filtros aplicados.</td>';
            tbody.appendChild(row);
            return;
        }

        recordsToRender.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.data}</td>
                <td>${record.titulo}</td>
                <td>${record.ia}</td>
                <td>${record.plataforma}</td>
            `;
            tbody.appendChild(row);
        });
    }

    function resetRecordFilters() {
        document.querySelectorAll('.year-checkbox').forEach(input => { input.checked = true; });
        document.querySelectorAll('.ia-toggle').forEach(button => { button.classList.add('active'); });
        document.querySelectorAll('.platform-checkbox').forEach(input => { input.checked = true; });
        platformOptions.classList.add('collapsed');
        filterRecords();
    }

    populatePlatformFilter();
    populateYearFilter();
    filterRecords();

    window.switchTab = function switchTab(tab) {
        const dashboardTab = document.getElementById('dashboardTab');
        const latestTab = document.getElementById('latestTab');
        const recordsTab = document.getElementById('recordsTab');
        const tabButtons = document.querySelectorAll('.tab-button');

        dashboardTab.classList.toggle('active', tab === 'dashboard');
        latestTab.classList.toggle('active', tab === 'latest');
        recordsTab.classList.toggle('active', tab === 'records');

        tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tab);
        });

        if (tab === 'records') {
            renderRecords();
        }
    };
});

window.consulta1 = function () {

    document.getElementById("resultadoConsulta").innerHTML = `
        <div class="result-box">
            <h3>Plataformas com mais Fake News</h3>

            <table>
                <tr>
                    <th>Plataforma</th>
                    <th>Total</th>
                </tr>

                <tr><td>Facebook</td><td>18</td></tr>
                <tr><td>WhatsApp</td><td>17</td></tr>
                <tr><td>Instagram</td><td>17</td></tr>
                <tr><td>TikTok</td><td>16</td></tr>
                <tr><td>YouTube</td><td>16</td></tr>
                <tr><td>Twitter</td><td>16</td></tr>
            </table>
        </div>
    `;
};

window.consulta2 = function () {

    document.getElementById("resultadoConsulta").innerHTML = `
        <div class="result-box">
            <h3>Fake News recentes (2023-2026)</h3>

            <ul>
                <li>2023 - Deepfake de ator famoso promovendo investimento</li>
                <li>2024 - Deepfake de jornalista internacional</li>
                <li>2025 - Imagem falsa de desastre climatico</li>
                <li>2026 - Video falso criado por IA viraliza nas eleicoes</li>
            </ul>
        </div>
    `;
};

window.consulta3 = function () {

    document.getElementById("resultadoConsulta").innerHTML = `
        <div class="result-box">
            <h3>5 Fake News antigas com IA</h3>

            <ol>
                <li>Video falso de candidato viraliza</li>
                <li>Imagem manipulada de enchente circula online</li>
                <li>Audio falso anuncia fechamento de bancos</li>
                <li>Deepfake de jornalista gera confusao</li>
                <li>Video editado de celebridade viraliza</li>
            </ol>
        </div>
    `;
};

window.consulta4 = function () {

    document.getElementById("resultadoConsulta").innerHTML = `
        <div class="result-box">
            <h3>Noticias com Deepfake</h3>

            <ul>
                <li>Deepfake de presidente em discurso falso</li>
                <li>Deepfake de ator promovendo golpe</li>
                <li>Deepfake de politico gera debate</li>
                <li>Deepfake de lider mundial viraliza</li>
                <li>Deepfake de jornalista internacional</li>
            </ul>
        </div>
    `;
};

window.consulta5 = function () {

    document.getElementById("resultadoConsulta").innerHTML = `
        <div class="result-box">
            <h3>Fake News com IA por ano</h3>

            <table>
                <tr>
                    <th>Ano</th>
                    <th>Total</th>
                </tr>

                <tr><td>2016</td><td>6</td></tr>
                <tr><td>2017</td><td>7</td></tr>
                <tr><td>2018</td><td>7</td></tr>
                <tr><td>2019</td><td>6</td></tr>
                <tr><td>2020</td><td>6</td></tr>
                <tr><td>2021</td><td>6</td></tr>
                <tr><td>2022</td><td>6</td></tr>
                <tr><td>2023</td><td>5</td></tr>
                <tr><td>2024</td><td>1</td></tr>
                <tr><td>2025</td><td>1</td></tr>
                <tr><td>2026</td><td>1</td></tr>
            </table>
        </div>
    `;
};