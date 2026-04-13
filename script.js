// ================= SEARCH =================
const searchData = [
    { tag: "Admission", text: "How to apply online", sub: "Step-by-step process", link: "#apply" },
    { tag: "Documents", text: "Documents required for admission", sub: "Mark sheets, TC, ID proof", link: "#requirements" },
    { tag: "Dates", text: "Application deadline – March 31", sub: "2025–26 admissions", link: "#dates" }
];

function doSearch(q) {
    const r = document.getElementById('searchResults');

    if (!q || q.length < 2) {
        r.classList.remove('show');
        return;
    }

    const matches = searchData.filter(d =>
        d.text.toLowerCase().includes(q.toLowerCase()) ||
        d.sub.toLowerCase().includes(q.toLowerCase()) ||
        d.tag.toLowerCase().includes(q.toLowerCase())
    );

    if (!matches.length) {
        r.classList.remove('show');
        return;
    }

    r.innerHTML = matches.map(m =>
        `<div class="search-item" data-link="${m.link}">
            <span class="search-tag">${m.tag}</span>
            <div>
                <div>${m.text}</div>
                <small>${m.sub}</small>
            </div>
        </div>`
    ).join('');

    document.querySelectorAll('.search-item').forEach(item => {
        item.addEventListener('click', function () {
            goTo(this.dataset.link);
        });
    });

    r.classList.add('show');
}

function goTo(link) {
    document.getElementById('searchResults').classList.remove('show');
    document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
}

function triggerSearch() {
    const q = document.getElementById('searchInput').value;
    doSearch(q);
}

// ================= FAQ =================
function toggleFaq(btn) {
    const a = btn.nextElementSibling;
    const arrow = btn.querySelector('.arrow');

    const open = a.classList.toggle('open');
    arrow.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
}

// ================= PROGRAM FILTER =================
function filterPrograms(cat, pill) {
    document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    document.querySelectorAll('.program-card').forEach(c => {
        c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
    });
}

// ================= MOBILE MENU =================
function openMobileMenu() {
    document.getElementById('mobileMenu').classList.add('show');
}

function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('show');
}

// ================= MAIN LOAD =================
document.addEventListener("DOMContentLoaded", function () {

    // Close mobile menu when clicking links
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ================= FORM SUBMIT =================
    const form = document.getElementById("admissionForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = {
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            grade: document.getElementById("grade").value,
            dob: document.getElementById("dob").value,
            parentName: document.getElementById("parentName").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim()
        };

        if (!data.firstName || !data.lastName || !data.email) {
            alert("❌ Fill required fields");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.status === "success") {
                alert("✅ Submitted Successfully!");
                form.reset();
            } else {
                alert("❌ Error submitting form");
            }

        } catch (err) {
            alert("❌ Server not running");
        }
    });

});