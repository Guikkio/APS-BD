document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    const loginContainer = document.getElementById("loginContainer");
    const loginForm = document.getElementById("loginForm");
    const loading = document.getElementById("loading");
    const progressBar = document.getElementById("progress");
    const app = document.getElementById("app");
    const logoutContainer = document.getElementById("logoutContainer");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 - 1.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = "#38bdf8";
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    function resetLoading() {
        loading.style.opacity = 0;
        loading.style.pointerEvents = "none";
        progressBar.style.width = "0%";
        loginForm.style.pointerEvents = "all";
    }

    function showLoginScreen() {
        loginContainer.style.display = "flex";
        loginContainer.style.opacity = 1;
        loginContainer.style.pointerEvents = "all";
        app.style.opacity = 0;
        app.style.pointerEvents = "none";
        logoutContainer.hidden = true;
        resetLoading();
    }

    function showAppScreen() {
        loginContainer.style.opacity = 0;
        loginContainer.style.pointerEvents = "none";

        setTimeout(() => {
            loginContainer.style.display = "none";
            app.style.opacity = 1;
            app.style.pointerEvents = "all";
            logoutContainer.hidden = false;
            resetLoading();
        }, 600);
    }

    function startLoading() {
        loading.style.opacity = 1;
        loading.style.pointerEvents = "all";
        loginForm.style.pointerEvents = "none";
        progressBar.style.width = "0%";
    }

    async function checkSession() {
        try {
            const response = await fetch("index.php?route=session", {
                method: "GET"
            });

            if (!response.ok) {
                showLoginScreen();
                return;
            }

            const data = await response.json();

            if (data.authenticated) {
                showAppScreen();
                return;
            }

            showLoginScreen();
        } catch (error) {
            showLoginScreen();
        }
    }

    animate();
    checkSession();

    window.login = function login() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username.length < 3 || password.length < 3) {
            alert("Credenciais invalidas.");
            return;
        }

        startLoading();

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = progress + "%";

            if (progress < 100) {
                return;
            }

            clearInterval(interval);

            fetch("index.php?route=login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ username, password })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.ok) {
                        showAppScreen();
                        return;
                    }

                    resetLoading();
                    alert("Usuario ou senha incorretos.");
                })
                .catch(() => {
                    resetLoading();
                    alert("Erro ao conectar com o servidor.");
                });
        }, 150);
    };

    window.logout = function logout() {
        fetch("index.php?route=logout", {
            method: "POST"
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.ok) {
                    throw new Error("logout_failed");
                }

                usernameInput.value = "";
                passwordInput.value = "";
                showLoginScreen();
            })
            .catch(() => {
                alert("Nao foi possivel encerrar a sessao.");
            });
    };

    window.generateTable = function generateTable() {
        const vars = parseInt(document.getElementById("variables").value, 10);
        const op = document.getElementById("operator").value;

        const table = document.getElementById("truthTable");
        table.innerHTML = "";

        let headers = [];
        for (let i = 0; i < vars; i++) {
            headers.push(String.fromCharCode(65 + i));
        }

        const rows = Math.pow(2, vars);
        const operatorSymbols = {
            AND: '<i class="bi bi-plus-circle" aria-label="AND"></i>',
            OR: '<i class="bi bi-diagram-3" aria-label="OR"></i>',
            XOR: '<i class="bi bi-shuffle" aria-label="XOR"></i>',
            NOT: '<i class="bi bi-slash-circle" aria-label="NOT"></i>'
        };
        const opSymbol = operatorSymbols[op] || op;
        const expression = op === "NOT"
            ? `¬${headers[0]}`
            : headers.join(` ${opSymbol} `);

        const outputHeader = `Resultado (${expression})`;

        headers.push(outputHeader);
        let header = "<tr>" + headers.map((title) => `<th>${title}</th>`).join("") + "</tr>";
        table.innerHTML += header;

        for (let i = 0; i < rows; i++) {
            let values = [];

            for (let j = vars - 1; j >= 0; j--) {
                values.push((i >> j) & 1);
            }

            let result;
            switch (op) {
                case "AND":
                    result = values.every((value) => value === 1) ? 1 : 0;
                    break;
                case "OR":
                    result = values.some((value) => value === 1) ? 1 : 0;
                    break;
                case "XOR":
                    result = values.reduce((left, right) => left ^ right);
                    break;
                case "NOT":
                    result = values[0] ? 0 : 1;
                    break;
            }

            let row = "<tr class='fade-in'>" +
                values.map((value) => `<td>${value}</td>`).join("") +
                `<td class="${result ? "true" : "false"}">${result}</td>` +
                "</tr>";
            table.innerHTML += row;
        }
    };
});
