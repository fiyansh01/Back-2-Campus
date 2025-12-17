/**
 * Back-2-Campus MVP Logic
 * GDG Cloud Udaipur Hackathon
 */

const app = {
    userRole: null,
    currentView: 'landing',

    init: () => {
        lucide.createIcons();
        app.setupMentors();
    },

    navigateTo: (viewId) => {
        // Handle transitions
        const currentSection = document.querySelector('.view.active');
        const nextSection = document.getElementById('view-' + viewId);

        if (nextSection) {
            currentSection.classList.remove('active');
            nextSection.classList.add('active');
            app.currentView = viewId;
            
            // Toggle Nav Visibility
            const nav = document.getElementById('main-nav');
            if (['landing', 'login'].includes(viewId)) {
                nav.classList.add('hidden');
            } else {
                nav.classList.remove('hidden');
            }
        }
        window.scrollTo(0, 0);
        lucide.createIcons();
    },

    login: (role) => {
        app.userRole = role;
        document.getElementById('user-display').innerText = 
            role === 'student' ? 'Student Mode' : 'Mentor Mode';
        
        const target = role === 'student' ? 'dashboard' : 'mentor-dash';
        app.navigateTo(target);
        app.toast(`Logged in as ${role.toUpperCase()}`);
    },

    logout: () => {
        app.userRole = null;
        app.navigateTo('landing');
        app.toast("Logged out safely");
    },

    toast: (msg) => {
        const t = document.getElementById('toast');
        t.innerText = msg;
        t.classList.remove('hidden');
        setTimeout(() => t.classList.add('hidden'), 3000);
    },

    // --- AI EVALUATION SIMULATION ---
    runEvaluation: () => {
        const input = document.getElementById('eval-input-area');
        const loader = document.getElementById('eval-loader');
        const results = document.getElementById('eval-results');

        input.classList.add('hidden');
        loader.classList.remove('hidden');

        // Simulated AI Reasoning Delay
        setTimeout(() => {
            loader.classList.add('hidden');
            results.classList.remove('hidden');

            // Randomized but believable results
            const score = 85 + Math.floor(Math.random() * 10);
            app.animateValue("passport-score", 0, score, 1500);

            const chips = ['React', 'Clean Code', 'Async Logic', 'GCP Basics'];
            const chipContainer = document.getElementById('res-chips');
            chipContainer.innerHTML = chips.map(c => `<span class="chip">${c}</span>`).join('');

            document.getElementById('res-text').innerText = 
                `Gemini Analysis: Based on the structural integrity of your code and logic flow, you demonstrate high proficiency in front-end architecture. Recommended next step: Google Cloud Functions module.`;

        }, 2500);
    },

    // --- OFFLINE SCANNER SIMULATION ---
    runScan: () => {
        const btn = document.getElementById('scan-btn');
        const visual = document.getElementById('scanner-visual');
        const results = document.getElementById('scan-results-area');

        btn.disabled = true;
        btn.innerText = "Processing Logic...";
        visual.style.borderColor = "var(--accent-green)";

        setTimeout(() => {
            results.classList.remove('hidden');
            btn.innerText = "Scan Complete";
            app.toast("Skills saved locally. Syncing to Firebase...");
        }, 2000);
    },

    // --- UTILS ---
    animateValue: (id, start, end, duration) => {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    },

    setupMentors: () => {
        const mentors = [
            { name: "Arjun Sharma", co: "Google Cloud", skills: "Go, Kubernetes", match: "98%" },
            { name: "Priya Mehta", co: "Amazon AWS", skills: "React, Node.js", match: "92%" },
            { name: "Sara Khan", co: "DeepMind", skills: "Python, AI Modeling", match: "87%" }
        ];

        const container = document.getElementById('mentor-list');
        if (container) {
            container.innerHTML = mentors.map(m => `
                <div class="glass-card mentor-card">
                    <div class="m-header">
                        <h4>${m.name}</h4>
                        <span class="m-badge">${m.match} Match</span>
                    </div>
                    <p class="small">${m.co}</p>
                    <div class="skill-chips">
                        <span class="chip">${m.skills}</span>
                    </div>
                    <button class="btn btn-primary sm full-width mt-2" onclick="app.toast('Request sent to ${m.name}')">Connect</button>
                </div>
            `).join('');
        }
    }
};

// Start App
window.onload = app.init;