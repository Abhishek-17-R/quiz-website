// Quiz Questions
var questions = [
    {
        q: "1. What is Cloud Computing?",
        options: ["Using the internet to access resources", "Using a pendrive", "Using a local server only", "Using a mobile hotspot"],
        answer: 0
    },
    {
        q: "2. Which of the following is a cloud provider?",
        options: [ "VLC Player","AWS", "Telegram", "Notepad"],
        answer: 1
    },
    {
        q: "3. What does SaaS stand for?",
        options: [ "System as a Service", "Security as a Software", "Storage as a Service","Software as a Service"],
        answer: 3
    },
    {
        q: "4. What does IaaS stand for?",
        options: ["Infrastructure as a Service", "Internal Application as a Service", "Internet as a System", "Interface as a Service"],
        answer: 0
    },
    {
        q: "5. What does PaaS stand for?",
        options: ["Process as a Service", "Platform and Storage","Platform as a Service", "Private Application Service"],
        answer: 2
    },
    {
        q: "6. What is an example of SaaS?",
        options: ["Gmail", "CPU", "Hard disk", "Router"],
        answer: 0
    },
    {
        q: "7. What is an example of IaaS?",
        options: ["Bluetooth", "AWS EC2","Speaker", "MS Word"],
        answer: 1
    },
    {
        q: "8. What is used for cloud storage?",
        options: [ "Mouse", "Amazon S3","Motherboard", "USB"],
        answer: 1
    },
    {
        q: "9. Cloud services are accessed using the—",
        options: ["TV", "Printer","Internet", "Calculator"],
        answer: 3
    },
    {
        q: "10. What is a Virtual Machine (VM)?",
        options: ["A software-based computer", "A mobile app", "A robot", "A modem"],
        answer: 0
    },
    {
        q: "11. Public cloud is available to—",
        options: [ "One private company only","Everyone", "Only students", "Only government"],
        answer: 1
    },
    {
        q: "12. Private cloud is used by—",
        options: ["A single organization", "Everyone in the world", "Only gamers", "Only mobile users"],
        answer: 0
    },
    {
        q: "13. Hybrid cloud is—",
        options: [ "Only private", "Only public","Combination of public and private", "Only on-premise"],
        answer: 2
    },
    {
        q: "14. What is scalability?",
        options: ["Ability to increase resources", "Ability to increase screen size", "Ability to run games", "Ability to charge a phone"],
        answer: 0
    },
    {
        q: "15. What is elasticity?",
        options: ["Automatic scaling of resources", "Stretching wires", "Slow internet", "Increasing price"],
        answer: 0
    },
    {
        q: "16. What is the benefit of cloud computing?",
        options: [ "Buy expensive hardware", "No internet needed", "Very slow speed","Pay-as-you-go"],
        answer: 3
    },
    {
        q: "17. What is serverless computing?",
        options: ["No servers at all","No server management", "Only offline use", "Only for gaming"],
        answer: 1
    },
    {
        q: "18. Which is a database service?",
        options: ["Pen drive", "RAM","Amazon RDS", "SMS"],
        answer: 2
    },
    {
        q: "19. What is multi-tenancy?",
        options: ["Multiple users share the same resources", "Only one user", "A type of cable", "A storage device"],
        answer: 0
    },
    {
        q: "20. Which protocol is secure?",
        options: [, "HTTP", "FTP", "Telnet","HTTPS"],
        answer: 3
    },
    {
        q: "21. What is a cloud region?",
        options: ["Geographic area with data centers", "A mobile SIM", "A TV zone", "A local folder"],
        answer: 0
    },
    {
        q: "22. What is a cloud Availability Zone?",
        options: ["A location on desktop", "Independent data centers in a region","A mobile setting", "A WiFi range"],
        answer: 1
    },
    {
        q: "23. What is a load balancer used for?",
        options: ["Distribute traffic to multiple servers", "Slow down traffic", "Increase bill", "Block users"],
        answer: 0
    },
    {
        q: "24. What does “on-demand” mean?",
        options: [, "Resources only at night", "Resources increase price automatically","Resources available anytime", "Unavailable resources"],
        answer: 2
    },
    {
        q: "25. What is a container?",
        options: ["A lightweight packaged environment", "A dustbin", "A physical box", "A browser"],
        answer: 0
    },
    {
        q: "26. What is Kubernetes used for?",
        options: [, "Writing documents","Container management", "Playing music", "Charging phone"],
        answer: 1
    },
    {
        q: "27. What is encryption?",
        options: ["Protecting data using codes", "Copying data", "Deleting files", "Restarting server"],
        answer: 0
    },
    {
        q: "28. What is a CDN?",
        options: [, "Cable Data Node", "Cloud Desktop Network", "Central Data Number","Content Delivery Network"],
        answer: 4
    },
    {
        q: "29. What is “pay-as-you-go”?",
        options: ["Pay full amount first","Pay only for what you use",  "Pay yearly compulsory", "Pay double"],
        answer: 1
    },
    {
        q: "30. Cloud computing reduces—",
        options: [ "Internet speed", "Mobile battery", "Hardware cost","TV channels"],
        answer: 2
    }
];
function startQuiz() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    if (name === "" || email === "" || phone === "") {
        alert("Please enter all details");
        return;
    }

    document.getElementById("user-info").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";

    let quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "";

    questions.forEach((item, index) => {
        quizDiv.innerHTML += `
            <div>
                <h3>${item.q}</h3>
                ${item.options.map((opt, i) => `
                    <input type="radio" name="q${index}" value="${i}"> ${opt}<br>
                `).join("")}
            </div><br>
        `;
    });
}

function submitQuiz() {
    let score = 0;

    // Calculate Score
    questions.forEach((item, index) => {
        let selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === item.answer) {
            score++;
        }
    });

    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("result-section").style.display = "block";

    let name = document.getElementById("name").value;
    document.getElementById("user-details").innerText = "Name: " + name;
    document.getElementById("score").innerText = "Your Score: " + score + "/" + questions.length;

    // ---- SAVE SCORE TO LEADERBOARD ----
    saveScore(name, score);

    // ---- SHOW LEADERBOARD ----
    showLeaderboard();
}

// ========================
//  LEADERBOARD FUNCTIONS
// ========================
function saveScore(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({ name: name, score: score });

    // Sort highest to lowest
    leaderboard.sort((a, b) => b.score - a.score);

    // Keep only top 10
    leaderboard = leaderboard.slice(0, 10);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    let html = "<h3>🏆 Top 10 Scores</h3><ol>";

    leaderboard.forEach(item => {
        html += `<li>${item.name} — ${item.score} points</li>`;
    });

    html += "</ol>";

    // Add area for leaderboard
    document.getElementById("leaderboard").innerHTML += html;
}
