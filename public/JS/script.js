document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

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

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = "#38bdf8";
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.login = function login() {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username.length < 3 || password.length < 3) {
            alert("Credenciais inválidas.");
            return;
        }

        document.getElementById("loading").style.opacity = 1;
        document.getElementById("loginForm").style.pointerEvents = "none";

        let progress = 0;
        const bar = document.getElementById("progress");

        const interval = setInterval(() => {
            progress += 10;
            bar.style.width = progress + "%";

            if (progress >= 100) {
                clearInterval(interval);

                fetch('index.php?route=login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ username, password })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        transitionToApp();
                    } else {
                        document.getElementById("loading").style.opacity = 0;
                        document.getElementById("loginForm").style.pointerEvents = "all";
                        alert("Usuário ou senha incorretos.");
                    }
                })
                .catch(() => {
                    document.getElementById("loading").style.opacity = 0;
                    document.getElementById("loginForm").style.pointerEvents = "all";
                    alert("Erro ao conectar com o servidor.");
                });
            }

        }, 150);
    };

    function transitionToApp() {
        document.getElementById("loginContainer").style.opacity = 0;

        setTimeout(() => {
            document.getElementById("loginContainer").style.display = "none";
            document.getElementById("loading").style.opacity = 0;

            const app = document.getElementById("app");
            app.style.opacity = 1;
            app.style.pointerEvents = "all";
        }, 600);
    }

    window.generateTable = function generateTable() {
        const vars = parseInt(document.getElementById("variables").value);
        const op = document.getElementById("operator").value;

        const table = document.getElementById("truthTable");
        table.innerHTML = "";

        let headers = [];
        for (let i = 0; i < vars; i++) {
            headers.push(String.fromCharCode(65 + i));
        }
        headers.push("Resultado");

      
        let header = "<tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";
        table.innerHTML += header;

        const rows = Math.pow(2, vars);

        for (let i = 0; i < rows; i++) {   
            let values = [];               

            for (let j = vars - 1; j >= 0; j--) {
                values.push((i >> j) & 1);
            }

            let result;
            switch (op) {
                case "AND":
                    result = values.every(v => v === 1) ? 1 : 0;
                    break;
                case "OR":
                    result = values.some(v => v === 1) ? 1 : 0;
                    break;
                case "XOR":
                    result = values.reduce((a, b) => a ^ b);
                    break;
                case "NOT":
                    result = values[0] ? 0 : 1;
                    break;
            }

            let row = `<tr class='fade-in'>` +
                values.map(v => `<td>${v}</td>`).join("") +
                `<td class="${result ? 'true' : 'false'}">${result}</td>` +
                `</tr>`;
            table.innerHTML += row;
        }
    };
});
