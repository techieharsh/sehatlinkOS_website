const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");

// Mobile Menu Toggle
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a:not(.nav-dropdown-trigger)").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Dropdown Menu Click Toggle for Mobile & Touch
const dropdownTriggers = document.querySelectorAll(".nav-dropdown-trigger");
dropdownTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    const parent = trigger.closest(".nav-item-dropdown");
    if (window.innerWidth <= 1040) {
      e.preventDefault();
      parent.classList.toggle("open");
    }
  });
});

// Close dropdown on clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-item-dropdown")) {
    document
      .querySelectorAll(".nav-item-dropdown")
      .forEach((d) => d.classList.remove("open"));
  }
});

// Set Dynamic Year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll-Reveal Observer System
const observerOptions = {
  root: null,
  rootMargin: "100px 0px 50px 0px",
  threshold: 0.05,
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom")
  .forEach((el) => {
    revealObserver.observe(el);
  });

// Sticky Header Scrolled State
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  },
  { passive: true },
);

// ScrollSpy Nav Link Active State
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)');

window.addEventListener(
  "scroll",
  () => {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  },
  { passive: true },
);

// Subtle 3D Tilt Micro-interaction on Dashboard Hover
const heroVisual = document.querySelector(".hero-visual");
const dashboard = document.querySelector(".dashboard");

if (heroVisual && dashboard) {
  heroVisual.addEventListener("mousemove", (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6 - 2;

    dashboard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    dashboard.style.transform = "";
  });
}

// Subtle 3D Tilt Micro-interaction on Role Portal Card Hover
const accessVisual = document.querySelector(".access-visual");
const portalWindow = document.querySelector(".portal-frame-window") || document.querySelector(".role-portal-card");

if (accessVisual && portalWindow) {
  accessVisual.addEventListener("mousemove", (e) => {
    const rect = accessVisual.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    portalWindow.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  });

  accessVisual.addEventListener("mouseleave", () => {
    portalWindow.style.transform = "";
  });
}

// Demo Form Submission Handler
const demoForm = document.getElementById("demoForm");
demoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!demoForm.reportValidity()) return;

  const data = new FormData(demoForm);
  const subject = encodeURIComponent("SehatLink OS — Free Demo Request");
  const body = encodeURIComponent(
    `Hello Tishha Consultants LLP,\n\nI would like to request a SehatLink OS demo.\n\nName: ${data.get("name")}\nMobile: ${data.get("phone")}\nHospital / Clinic: ${data.get("facility")}\nWork email: ${data.get("email") || "Not provided"}\n\nPlease contact me to schedule a demo.\n`,
  );

  window.location.href = `mailto:YOUR-EMAIL@example.com?subject=${subject}&body=${body}`;
});

// Interactive Presentation & Story Mode Slider System
const presentationData = [
  {
    stepTag: "STAGE 01 · PATIENT REGISTRATION",
    badge: "Step 1 of 4 · Reception Desk",
    title: "1. Patient Arrival & Reception Registration with ABHA",
    description:
      "When a patient arrives at the hospital, the receptionist opens <strong>SehatLink OS</strong>. Entering the patient's Aadhaar or mobile number triggers an OTP. Upon verification, a 14-digit <strong>ABHA Health ID</strong> and unique hospital UHID are generated instantly in seconds.",
    image: "assets/images/sehatlink_reception_abha_registration.jpg",
    points: [
      {
        icon: "📋",
        text: "<strong>Front-Desk Action:</strong> Aadhaar OTP verification & quick registration in SehatLink OS.",
      },
      {
        icon: "🆔",
        text: "<strong>ABDM Linkage:</strong> 14-digit ABHA ID created automatically (M1 Milestone).",
      },
      {
        icon: "⚡",
        text: "<strong>Queue Token:</strong> Instant OPD queue token generated for doctor room.",
      },
    ],
    quote:
      '💬 <em>"Patient arrives at reception → Receptionist opens SehatLink OS → ABHA Created & OPD Token Assigned!"</em>',
  },
  {
    stepTag: "STAGE 02 · OPD CONSULTATION",
    badge: "Step 2 of 4 · OPD Doctor EMR",
    title: "2. OPD Doctor Consultation & EMR Prescription Linkage",
    description:
      "The doctor opens the patient profile in <strong>SehatLink OS EMR</strong>. Symptoms, vitals, diagnosis, and digital prescriptions are entered effortlessly. As soon as the doctor clicks save, the prescription is formatted into standard FHIR bundles and linked to the patient's ABHA ID.",
    image: "assets/images/sehatlink_opd_doctor_emr_prescription.jpg",
    points: [
      {
        icon: "👨‍⚕️",
        text: "<strong>Doctor Workflow:</strong> Fast digital prescription & ICD-10 clinical diagnosis.",
      },
      {
        icon: "🏥",
        text: "<strong>ABDM Sync:</strong> Linked seamlessly as FHIR M2 health record.",
      },
      {
        icon: "💊",
        text: "<strong>Pharmacy & Lab:</strong> Instant routing to hospital pharmacy & lab counters.",
      },
    ],
    quote:
      '💬 <em>"Doctor writes Rx in SehatLink OS → One-click save → Prescription synced directly to ABDM Vault!"</em>',
  },
  {
    stepTag: "STAGE 03 · IPD WARD ADMISSION",
    badge: "Step 3 of 4 · IPD Ward Care",
    title: "3. IPD Ward Admission, Nursing & Discharge Record Sync",
    description:
      "If patient requires admission, ward nurses and doctors log daily vitals, nursing care notes, lab orders, and discharge summaries directly into SehatLink OS IPD module. All inpatient progress notes are digitally stored and linked to ABDM.",
    image: "assets/images/opd_ipd_billing_dashboard.jpg",
    points: [
      {
        icon: "🛏️",
        text: "<strong>Bed & Ward Management:</strong> Real-time bed tracking & nursing chart updates.",
      },
      {
        icon: "📑",
        text: "<strong>Discharge Summary:</strong> Auto-generated standardized digital discharge records.",
      },
      {
        icon: "🔒",
        text: "<strong>ABDM Integration:</strong> IPD records securely formatted for instant health record access.",
      },
    ],
    quote:
      '💬 <em>"Ward admission to discharge summary → Complete inpatient history synced with patient\'s ABHA profile!"</em>',
  },
  {
    stepTag: "STAGE 04 · PM-JAY & BILLING",
    badge: "Step 4 of 4 · Cashless Billing Counter",
    title: "4. Ayushman PM-JAY Settlement & Transparent Billing",
    description:
      "At the billing counter, SehatLink OS processes transparent itemized invoices. For Ayushman Bharat PM-JAY beneficiaries, pre-authorization claims and package settlements are managed with zero hassle through integrated HFR & PM-JAY workflows.",
    image: "assets/images/Ayushman-Bharat-Digital-Mission.jpg",
    points: [
      {
        icon: "💳",
        text: "<strong>Ayushman PM-JAY:</strong> Direct eligibility check & hassle-free claim pre-auth.",
      },
      {
        icon: "🧾",
        text: "<strong>Transparent Receipts:</strong> GST-compliant receipts with online payment QR codes.",
      },
      {
        icon: "🏛️",
        text: "<strong>HFR Certified:</strong> Compliant with National Health Authority standards.",
      },
    ],
    quote:
      '💬 <em>"Single-click billing clearance & Ayushman claim authorization inside SehatLink OS!"</em>',
  },
];

const slideTabBtns = document.querySelectorAll(".slide-tab-btn");
const slideDots = document.querySelectorAll(".slide-dots-container .dot");
const prevSlideBtn = document.getElementById("prevSlideBtn");
const nextSlideBtn = document.getElementById("nextSlideBtn");
const playPauseSlideBtn = document.getElementById("playPauseSlideBtn");
const slideMainImage = document.getElementById("slideMainImage");
const slideBadge = document.getElementById("slideBadge");
const slideCounter = document.getElementById("slideCounter");
const slideStepTag = document.getElementById("slideStepTag");
const slideTitle = document.getElementById("slideTitle");
const slideDescription = document.getElementById("slideDescription");
const slidePoints = document.getElementById("slidePoints");
const slideQuote = document.getElementById("slideQuote");

if (slideMainImage && presentationData.length > 0) {
  let currentSlide = 0;
  let autoSlideTimer = null;
  let isAutoPlaying = false;

  function renderSlide(index) {
    if (index < 0) index = presentationData.length - 1;
    if (index >= presentationData.length) index = 0;
    currentSlide = index;

    const data = presentationData[currentSlide];

    slideMainImage.style.opacity = "0.3";
    setTimeout(() => {
      slideMainImage.src = data.image;
      slideMainImage.alt = data.title;
      slideMainImage.style.opacity = "1";
    }, 200);

    slideBadge.textContent = data.badge;
    if (slideCounter)
      slideCounter.textContent = `Slide ${currentSlide + 1} / ${presentationData.length}`;
    slideStepTag.textContent = data.stepTag;
    slideTitle.textContent = data.title;
    slideDescription.innerHTML = data.description;
    slideQuote.innerHTML = data.quote;

    if (slidePoints) {
      slidePoints.innerHTML = data.points
        .map(
          (p) =>
            `<div class="point-item"><span class="point-icon">${p.icon}</span> <div>${p.text}</div></div>`,
        )
        .join("");
    }

    slideTabBtns.forEach((btn, idx) => {
      btn.classList.toggle("active", idx === currentSlide);
    });

    slideDots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlide);
    });

    const vTopicCards = document.querySelectorAll(".video-topic-cards .v-card");
    vTopicCards.forEach((c, idx) => {
      c.classList.toggle("active", idx === currentSlide);
    });
  }

  slideTabBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      renderSlide(idx);
    });
  });

  slideDots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      renderSlide(idx);
    });
  });

  const vTopicCards = document.querySelectorAll(".video-topic-cards .v-card");
  vTopicCards.forEach((c, idx) => {
    c.addEventListener("click", () => {
      renderSlide(idx);
    });
  });

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener("click", () => renderSlide(currentSlide - 1));
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", () => renderSlide(currentSlide + 1));
  }

  if (playPauseSlideBtn) {
    playPauseSlideBtn.addEventListener("click", () => {
      isAutoPlaying = !isAutoPlaying;
      if (isAutoPlaying) {
        playPauseSlideBtn.innerHTML = '<span>❚❚</span> <span>Pause</span>';
        playPauseSlideBtn.style.background = "rgba(8, 166, 159, 0.35)";
        autoSlideTimer = setInterval(() => {
          renderSlide(currentSlide + 1);
        }, 4000);
      } else {
        playPauseSlideBtn.innerHTML = '<span class="play-state-icon">▶</span> <span>Auto Play</span>';
        playPauseSlideBtn.style.background = "";
        clearInterval(autoSlideTimer);
      }
    });
  }

  renderSlide(0);
}

// Interactive Role Switcher for index.html
const roleCards = document.querySelectorAll(".role-card[data-role]");
const portalTabs = document.querySelectorAll(".p-role-tab[data-role]");

if (roleCards.length > 0 && portalTabs.length > 0) {
  function activateRole(roleName) {
    roleCards.forEach((card) => {
      card.classList.toggle("active", card.getAttribute("data-role") === roleName);
    });
    portalTabs.forEach((tab) => {
      tab.classList.toggle("active", tab.getAttribute("data-role") === roleName);
    });
  }

  roleCards.forEach((card) => {
    card.addEventListener("click", () => {
      const role = card.getAttribute("data-role");
      activateRole(role);
    });
  });

  portalTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const role = tab.getAttribute("data-role");
      activateRole(role);
    });
  });
}

// Pricing Page Billing Frequency Toggle (Monthly vs Annual)
const billingSwitch = document.getElementById("billingSwitch");
const labelMonthly = document.getElementById("labelMonthly");
const labelAnnual = document.getElementById("labelAnnual");
const starterPrice = document.getElementById("starterPrice");
const starterNote = document.getElementById("starterNote");
const hospitalPrice = document.getElementById("hospitalPrice");
const hospitalNote = document.getElementById("hospitalNote");

if (billingSwitch) {
  let isAnnual = true;

  function updatePricingDisplay() {
    if (isAnnual) {
      billingSwitch.classList.add("annual");
      billingSwitch.setAttribute("aria-checked", "true");
      if (labelMonthly) labelMonthly.classList.remove("active");
      if (labelAnnual) labelAnnual.classList.add("active");
      if (starterPrice) starterPrice.textContent = "1,599";
      if (starterNote) starterNote.textContent = "Billed ₹19,188 annually · Save 20%";
      if (hospitalPrice) hospitalPrice.textContent = "4,799";
      if (hospitalNote) hospitalNote.textContent = "Billed ₹57,588 annually · Save 20%";
    } else {
      billingSwitch.classList.remove("annual");
      billingSwitch.setAttribute("aria-checked", "false");
      if (labelMonthly) labelMonthly.classList.add("active");
      if (labelAnnual) labelAnnual.classList.remove("active");
      if (starterPrice) starterPrice.textContent = "1,999";
      if (starterNote) starterNote.textContent = "Billed monthly · Cancel anytime";
      if (hospitalPrice) hospitalPrice.textContent = "5,999";
      if (hospitalNote) hospitalNote.textContent = "Billed monthly · Cancel anytime";
    }
  }

  billingSwitch.addEventListener("click", () => {
    isAnnual = !isAnnual;
    updatePricingDisplay();
  });

  if (labelMonthly) {
    labelMonthly.addEventListener("click", () => {
      isAnnual = false;
      updatePricingDisplay();
    });
  }

  if (labelAnnual) {
    labelAnnual.addEventListener("click", () => {
      isAnnual = true;
      updatePricingDisplay();
    });
  }
}

// Care Management & Billing — Capability Comparison Table Filtering
const capabilityFilterBtns = document.querySelectorAll(".filter-pill-btn[data-filter]");
const capabilityRows = document.querySelectorAll(".capability-row[data-tags]");
const moduleCountBadge = document.getElementById("moduleCountBadge");

if (capabilityFilterBtns.length > 0 && capabilityRows.length > 0) {
  capabilityFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      capabilityFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");
      let visibleCount = 0;

      capabilityRows.forEach((row) => {
        const rowTags = row.getAttribute("data-tags") || "";
        const tagsList = rowTags.split(" ");

        if (filterValue === "all" || tagsList.includes(filterValue)) {
          row.style.display = "";
          visibleCount++;
        } else {
          row.style.display = "none";
        }
      });

      if (moduleCountBadge) {
        if (filterValue === "all") {
          moduleCountBadge.textContent = "Showing all 14 modules";
        } else {
          moduleCountBadge.textContent = `Showing ${visibleCount} modules`;
        }
      }
    });
  });
}

// ==========================================================================
// Interactive Gumlet-Style Floating Support & Chat Widget System (Full Production Edition)
// ==========================================================================
(function initSehatLinkChatWidget() {
  // Prevent duplicate mounts
  if (document.getElementById("sehatlinkChatWidgetRoot")) return;

  // Global Config for easy customization
  const CHAT_CONFIG = {
    brandName: "SEHATLINK OS",
    companyName: "DigiTech Innovations — A Unit of Tishha Consultants LLP",
    whatsappNumber: "919999999999", // Replace with your official WhatsApp number
    supportEmail: "info@example.com", // Replace with your official email
    storageKey: "sehatlink_chat_msgs_v2",
    leadsKey: "sehatlink_chat_leads_v2",
  };

  const widgetRoot = document.createElement("div");
  widgetRoot.id = "sehatlinkChatWidgetRoot";
  widgetRoot.className = "sehatlink-chat-widget-root";

  // SVG Avatars for team stack
  const avatar1 = `<svg class="avatar-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#fce7f3"/><circle cx="16" cy="12" r="5.5" fill="#db2777"/><path d="M6 28C6 22.4772 10.4772 18 16 18C21.5228 18 26 22.4772 26 28V32H6V28Z" fill="#db2777"/></svg>`;
  const avatar2 = `<svg class="avatar-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#fef3c7"/><circle cx="16" cy="12" r="5.5" fill="#d97706"/><path d="M6 28C6 22.4772 10.4772 18 16 18C21.5228 18 26 22.4772 26 28V32H6V28Z" fill="#1e293b"/></svg>`;
  const avatar3 = `<svg class="avatar-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#cffafe"/><circle cx="16" cy="12" r="5.5" fill="#0891b2"/><path d="M6 28C6 22.4772 10.4772 18 16 18C21.5228 18 26 22.4772 26 28V32H6V28Z" fill="#0e7490"/></svg>`;

  const whatsappUrl = `https://wa.me/${CHAT_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello Tishha Consultants LLP, I would like to learn more about SehatLink OS hospital management system.")}`;

  widgetRoot.innerHTML = `
    <!-- Floating Launcher Button -->
    <button class="sehatlink-chat-launcher" id="sehatlinkChatLauncher" aria-label="Open support and chat" title="Chat with SehatLink Support">
      <span class="sehatlink-launcher-badge" id="sehatlinkLauncherBadge"></span>
      <!-- Closed State: White speech bubble with purple smile (Gumlet/Intercom style) -->
      <span class="launcher-icon-chat">
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 8C6 5.79086 7.79086 4 10 4H22C24.2091 4 26 5.79086 26 8V18C26 20.2091 24.2091 22 22 22H11L6.7 25.4C6.07 25.9 5 25.45 5 24.6V9C5 8.45 5.45 8 6 8Z" fill="#ffffff"/>
          <path d="M11 14.5C12.5 17 18.5 17 20 14.5" stroke="#5835ea" stroke-width="2.6" stroke-linecap="round"/>
        </svg>
      </span>
      <!-- Open State: Down Arrow (Chevron) -->
      <span class="launcher-icon-close">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </span>
    </button>

    <!-- Chat Modal Window -->
    <div class="sehatlink-chat-modal" id="sehatlinkChatModal" role="dialog" aria-modal="true" aria-hidden="true">
      <!-- Gradient Header -->
      <div class="sehatlink-chat-header">
        <div class="sehatlink-chat-header-top">
          <div class="sehatlink-chat-brand">
            <img src="assets/images/digitechinnovation_White_logo.png" alt="SehatLink OS" class="sehatlink-chat-brand-icon" />
            <span>${CHAT_CONFIG.brandName}</span>
          </div>
          <div class="sehatlink-chat-header-actions">
            <!-- 3 Overlapping Team Avatars -->
            <div class="sehatlink-chat-avatar-stack" title="SehatLink Consultation & Support Team">
              ${avatar1}
              ${avatar2}
              ${avatar3}
            </div>
            <!-- Sleek Close Button -->
            <button class="sehatlink-chat-close-btn" id="sehatlinkChatCloseBtn" aria-label="Close chat modal">✕</button>
          </div>
        </div>

        <div class="sehatlink-chat-greeting">
          <div class="greet-hi">Hi there <span class="wave-emoji">👋</span></div>
          <h2 class="greet-help">How can we help?</h2>
        </div>
      </div>

      <!-- Main Body with View Switching -->
      <div class="sehatlink-chat-body">
        <!-- VIEW 1: HOME TAB -->
        <div class="sehatlink-chat-view active" id="chatViewHome">
          <div class="sehatlink-home-content">
            <!-- Recent Message Prompt Card -->
            <div class="sehatlink-card-recent" id="chatCardRecent" role="button" tabindex="0">
              <div class="sehatlink-card-recent-label">Recent message</div>
              <div class="sehatlink-card-recent-row">
                <div class="sehatlink-card-recent-left">
                  <div class="recent-avatars">
                    ${avatar1}
                    ${avatar2}
                  </div>
                  <div class="sehatlink-card-recent-text">
                    <div class="sehatlink-card-recent-title">SehatLink Support</div>
                    <div class="sehatlink-card-recent-snippet" id="recentMessageSnippet">Hello! Looking for HIMS or ABDM software?</div>
                  </div>
                </div>
                <div class="sehatlink-card-recent-time" id="recentMessageTime">Just now</div>
              </div>
            </div>

            <!-- Action Card 1: Send us a message -->
            <div class="sehatlink-action-card" id="chatBtnSendMessage" role="button" tabindex="0">
              <span class="sehatlink-action-card-label">Send us a message</span>
              <span class="action-card-arrow">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#5835ea" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 2L11 13"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                </svg>
              </span>
            </div>

            <!-- Action Card 2: Book a Demo -->
            <div class="sehatlink-action-card" id="chatBtnBookDemo" role="button" tabindex="0">
              <span class="sehatlink-action-card-label">Book a Demo</span>
              <span class="action-card-arrow">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </span>
            </div>

            <!-- Action Card 3: WhatsApp Support -->
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="sehatlink-action-card whatsapp-card" id="chatBtnWhatsapp">
              <span class="sehatlink-action-card-label">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="#10b981">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.176.2-.351.226-.652.075-.301-.151-1.27-.468-2.42-1.493-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.151-.678-1.631-.929-2.233-.244-.587-.492-.507-.678-.517-.175-.01-.376-.01-.577-.01-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.909 1.229 3.11c.15.2 2.124 3.244 5.146 4.549.719.311 1.28.497 1.718.636.722.23 1.378.198 1.9.12.582-.087 1.78-.727 2.03-1.429.251-.702.251-1.304.176-1.429-.076-.125-.276-.2-.577-.35zM12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.97.58 3.81 1.58 5.37L2 22l4.82-1.55c1.5 1.01 3.29 1.59 5.22 1.59 5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2z"/>
                </svg>
                WhatsApp Consultation
              </span>
              <span class="action-card-arrow">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </span>
            </a>

            <!-- Quick FAQ Topic Pills -->
            <div class="sehatlink-quick-topics">
              <div class="sehatlink-quick-topics-title">Common Topics</div>
              <div class="sehatlink-topic-pills">
                <button class="sehatlink-topic-pill" data-ask="What is the pricing for SehatLink OS?">💰 Pricing Plans</button>
                <button class="sehatlink-topic-pill" data-ask="How does ABDM M1, M2 & M3 work?">🆔 ABDM Integration</button>
                <button class="sehatlink-topic-pill" data-ask="What features are included in OPD and IPD?">🏥 OPD & IPD EMR</button>
                <button class="sehatlink-topic-pill" data-ask="How can I schedule a 30-min live demo?">📅 Book Demo</button>
              </div>
            </div>
          </div>
        </div>

        <!-- VIEW 2: MESSAGES / LIVE CHAT TAB -->
        <div class="sehatlink-chat-view" id="chatViewMessages">
          <div class="sehatlink-chat-thread-container">
            <div class="sehatlink-chat-thread-header">
              <button class="sehatlink-chat-back-btn" id="chatBtnBackHome">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Home
              </button>
              <div class="chat-thread-actions">
                <div class="sehatlink-chat-agent-status">Online</div>
                <button class="chat-clear-btn" id="chatBtnClear" title="Restart conversation">Clear</button>
              </div>
            </div>

            <!-- Message Scroll Area -->
            <div class="sehatlink-chat-messages" id="chatMessagesArea">
              <!-- Dynamically populated from localStorage or initial greeting -->
            </div>

            <!-- Chat Input Bar -->
            <form class="sehatlink-chat-input-bar" id="chatInputForm">
              <input type="text" class="sehatlink-chat-input" id="chatInputField" placeholder="Type your message..." autocomplete="off" />
              <button type="submit" class="sehatlink-chat-send-btn" id="chatSendBtn" aria-label="Send message">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 2L11 13"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Bottom Tab Bar -->
      <nav class="sehatlink-chat-bottom-nav">
        <button class="sehatlink-chat-tab active" id="tabHome">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Home</span>
        </button>
        <button class="sehatlink-chat-tab" id="tabMessages">
          <span class="sehatlink-chat-tab-badge" id="tabMessagesBadge" style="display:none;"></span>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Messages</span>
        </button>
      </nav>
    </div>
  `;

  document.body.appendChild(widgetRoot);

  // Widget DOM Elements
  const launcher = document.getElementById("sehatlinkChatLauncher");
  const modal = document.getElementById("sehatlinkChatModal");
  const closeBtn = document.getElementById("sehatlinkChatCloseBtn");
  const tabHome = document.getElementById("tabHome");
  const tabMessages = document.getElementById("tabMessages");
  const tabMessagesBadge = document.getElementById("tabMessagesBadge");
  const viewHome = document.getElementById("chatViewHome");
  const viewMessages = document.getElementById("chatViewMessages");
  const cardRecent = document.getElementById("chatCardRecent");
  const btnSendMessage = document.getElementById("chatBtnSendMessage");
  const btnBookDemo = document.getElementById("chatBtnBookDemo");
  const btnBackHome = document.getElementById("chatBtnBackHome");
  const btnClearChat = document.getElementById("chatBtnClear");
  const chatInputForm = document.getElementById("chatInputForm");
  const chatInputField = document.getElementById("chatInputField");
  const chatMessagesArea = document.getElementById("chatMessagesArea");
  const launcherBadge = document.getElementById("sehatlinkLauncherBadge");
  const recentSnippet = document.getElementById("recentMessageSnippet");
  const recentTime = document.getElementById("recentMessageTime");

  // State
  let isOpen = false;

  function toggleModal(open) {
    isOpen = typeof open === "boolean" ? open : !isOpen;
    if (isOpen) {
      modal.classList.add("open");
      launcher.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      if (launcherBadge) launcherBadge.style.display = "none";
      if (tabMessagesBadge) tabMessagesBadge.style.display = "none";
    } else {
      modal.classList.remove("open");
      launcher.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  }

  function switchTab(target) {
    if (target === "home") {
      tabHome.classList.add("active");
      tabMessages.classList.remove("active");
      viewHome.classList.add("active");
      viewMessages.classList.remove("active");
      modal.classList.remove("chat-mode");
    } else if (target === "messages") {
      tabMessages.classList.add("active");
      tabHome.classList.remove("active");
      viewMessages.classList.add("active");
      viewHome.classList.remove("active");
      modal.classList.add("chat-mode");
      if (tabMessagesBadge) tabMessagesBadge.style.display = "none";
      setTimeout(() => chatInputField && chatInputField.focus(), 150);
      scrollChatToBottom();
    }
  }

  function scrollChatToBottom() {
    if (chatMessagesArea) {
      chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
    }
  }

  // Audio Chime using Web Audio API (Zero external assets required)
  function playNotificationChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      // Audio autoplay may be silenced by browser policy
    }
  }

  // --- LocalStorage Chat Persistence System ---
  function getChatHistory() {
    try {
      const data = localStorage.getItem(CHAT_CONFIG.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function saveChatHistory(messages) {
    try {
      localStorage.setItem(CHAT_CONFIG.storageKey, JSON.stringify(messages));
    } catch (e) {
      // Storage quota exceeded or disabled
    }
  }

  const initialGreeting = {
    sender: "bot",
    html: `
      Hello! 👋 Welcome to <strong>SehatLink OS</strong> by DigiTech Innovations.
      <br><br>
      We are here to assist with hospital management workflows, ABDM M1-M3 milestones, and custom deployments. What can we help you explore today?
      <div class="chat-action-chips">
        <button class="chat-chip-btn" data-ask="What are the SehatLink OS pricing plans?">
          <span>💰 Explore Pricing Plans</span><span>→</span>
        </button>
        <button class="chat-chip-btn" data-ask="Does SehatLink support ABDM M1, M2 & M3?">
          <span>🆔 ABDM & ABHA Integration</span><span>→</span>
        </button>
        <button class="chat-chip-btn" data-ask="I would like to book a free live demo.">
          <span>📅 Schedule a Live Product Demo</span><span>→</span>
        </button>
      </div>
    `,
    time: "Just now",
  };

  function renderMessages() {
    chatMessagesArea.innerHTML = "";
    let history = getChatHistory();
    if (!history || history.length === 0) {
      history = [initialGreeting];
      saveChatHistory(history);
    }

    history.forEach((msg) => {
      const div = document.createElement("div");
      div.className = `chat-msg ${msg.sender}`;
      div.innerHTML = `
        <div class="chat-msg-bubble">${msg.html}</div>
        <div class="chat-msg-time">${msg.time || getCurrentTime()}</div>
      `;
      chatMessagesArea.appendChild(div);
    });

    // Update snippet in Home recent message card
    const lastMsg = history[history.length - 1];
    if (lastMsg && recentSnippet) {
      const cleanSnippet = lastMsg.html.replace(/<[^>]*>?/gm, " ").trim().substring(0, 45) + "...";
      recentSnippet.textContent = cleanSnippet;
      if (recentTime) recentTime.textContent = lastMsg.time || "Just now";
    }

    bindChatChips();
    bindLeadForms();
    scrollChatToBottom();
  }

  function addMessageToHistory(sender, html, time) {
    let history = getChatHistory() || [];
    const t = time || getCurrentTime();
    history.push({ sender, html, time: t });
    saveChatHistory(history);

    const div = document.createElement("div");
    div.className = `chat-msg ${sender}`;
    div.innerHTML = `
      <div class="chat-msg-bubble">${html}</div>
      <div class="chat-msg-time">${t}</div>
    `;
    chatMessagesArea.appendChild(div);

    if (recentSnippet) {
      const cleanSnippet = html.replace(/<[^>]*>?/gm, " ").trim().substring(0, 45) + "...";
      recentSnippet.textContent = cleanSnippet;
      if (recentTime) recentTime.textContent = t;
    }

    bindChatChips();
    bindLeadForms();
    scrollChatToBottom();
  }

  function bindChatChips() {
    chatMessagesArea.querySelectorAll(".chat-chip-btn").forEach((btn) => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "true";
      btn.addEventListener("click", () => {
        const q = btn.getAttribute("data-ask");
        if (q) handleUserSubmission(q);
      });
    });
  }

  function bindLeadForms() {
    chatMessagesArea.querySelectorAll(".chat-lead-form").forEach((form) => {
      if (form.dataset.bound) return;
      form.dataset.bound = "true";
      const btn = form.querySelector("button");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const nameInput = form.querySelector(".lead-name");
        const phoneInput = form.querySelector(".lead-phone");
        const facilityInput = form.querySelector(".lead-facility");

        const name = (nameInput && nameInput.value.trim()) || "";
        const phone = (phoneInput && phoneInput.value.trim()) || "";
        const facility = (facilityInput && facilityInput.value.trim()) || "";

        if (!name || !phone) {
          alert("Please provide at least your name and phone number.");
          return;
        }

        // Store Lead locally
        try {
          const leads = JSON.parse(localStorage.getItem(CHAT_CONFIG.leadsKey) || "[]");
          leads.push({ name, phone, facility, date: new Date().toISOString() });
          localStorage.setItem(CHAT_CONFIG.leadsKey, JSON.stringify(leads));
        } catch (e) {}

        // Replace form with confirmation
        form.innerHTML = `
          <div style="color:#059669; font-weight:700; font-size:13px; margin-bottom:4px;">
            ✓ Demo Request Recorded!
          </div>
          <div style="font-size:12px; color:#334155; line-height:1.4;">
            Thank you <strong>${escapeHtml(name)}</strong> (${escapeHtml(facility || "Hospital")}). Our specialist will contact you at <strong>${escapeHtml(phone)}</strong> shortly.
          </div>
        `;

        // Direct WhatsApp launch with structured inquiry
        const waMsg = `Hello ${CHAT_CONFIG.companyName},\n\nI have requested a SehatLink OS demo.\nName: ${name}\nPhone: ${phone}\nHospital: ${facility || "Not provided"}\n\nPlease share available demo slots.`;
        const directWa = `https://wa.me/${CHAT_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
        window.open(directWa, "_blank");

        // Bot confirmation response
        setTimeout(() => {
          addMessageToHistory(
            "bot",
            `We have opened WhatsApp to confirm your demo slot directly with our senior consultant. If you prefer email, our team has also logged your request for <strong>${escapeHtml(name)}</strong>!`,
          );
        }, 500);
      });
    });
  }

  // Clear chat history
  if (btnClearChat) {
    btnClearChat.addEventListener("click", () => {
      if (confirm("Restart conversation and clear chat history?")) {
        localStorage.removeItem(CHAT_CONFIG.storageKey);
        renderMessages();
      }
    });
  }

  // Event Listeners for Opening/Closing
  launcher.addEventListener("click", () => toggleModal());
  closeBtn.addEventListener("click", () => toggleModal(false));

  // Tab switching
  tabHome.addEventListener("click", () => switchTab("home"));
  tabMessages.addEventListener("click", () => switchTab("messages"));
  btnBackHome.addEventListener("click", () => switchTab("home"));

  // Card triggers to Messages
  if (cardRecent) {
    cardRecent.addEventListener("click", () => switchTab("messages"));
  }
  if (btnSendMessage) {
    btnSendMessage.addEventListener("click", () => switchTab("messages"));
  }

  // Book a demo action
  if (btnBookDemo) {
    btnBookDemo.addEventListener("click", () => {
      switchTab("messages");
      handleUserSubmission("I would like to book a free live demo.");
    });
  }

  // Topic pill clicks on Home view
  document.querySelectorAll(".sehatlink-topic-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const query = pill.getAttribute("data-ask") || pill.textContent.trim();
      switchTab("messages");
      handleUserSubmission(query);
    });
  });

  // Chat Submission
  if (chatInputForm) {
    chatInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = chatInputField.value.trim();
      if (!text) return;
      chatInputField.value = "";
      handleUserSubmission(text);
    });
  }

  function handleUserSubmission(text) {
    // Append User Message to history & DOM
    addMessageToHistory("user", escapeHtml(text));

    // Show Typing Indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "chat-typing";
    typingIndicator.id = "chatTypingIndicator";
    typingIndicator.innerHTML = `<span></span><span></span><span></span>`;
    chatMessagesArea.appendChild(typingIndicator);
    scrollChatToBottom();

    // Bot Response Logic
    setTimeout(() => {
      const el = document.getElementById("chatTypingIndicator");
      if (el) el.remove();

      const botResponseHtml = generateBotReply(text);
      addMessageToHistory("bot", botResponseHtml);
      playNotificationChime();

      // Show notification badge if modal is closed
      if (!isOpen) {
        if (launcherBadge) launcherBadge.style.display = "block";
        if (tabMessagesBadge) tabMessagesBadge.style.display = "block";
      }
    }, 650);
  }

  function generateBotReply(text) {
    const lower = text.toLowerCase();

    if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("plan") || lower.includes("rate")) {
      return `
        <strong>SehatLink OS Pricing Overview:</strong><br><br>
        • <strong>Starter Tier:</strong> Ideal for outpatient OPD clinics & dispensaries with ABHA creation and billing.<br>
        • <strong>Professional (Growth):</strong> For 20–100 bed hospitals with OPD, IPD, wards, and ABDM M1-M3.<br>
        • <strong>Enterprise Tier:</strong> Full ecosystem for hospital networks with custom APIs and high-availability backup.<br><br>
        <a href="pricing.html" style="color:#5835ea; font-weight:700; text-decoration:underline;">View Full Pricing Breakdown →</a>
      `;
    }

    if (lower.includes("abdm") || lower.includes("abha") || lower.includes("m1") || lower.includes("m2") || lower.includes("m3") || lower.includes("ayushman")) {
      return `
        <strong>ABDM Integration Certified:</strong><br><br>
        • <strong>M1:</strong> Instant ABHA 14-digit creation via Aadhaar OTP & mobile.<br>
        • <strong>M2:</strong> HIP (Health Information Provider) linking digital doctor prescriptions and lab reports.<br>
        • <strong>M3:</strong> HIU (Health Information User) viewing patient historical records with consent.<br><br>
        <a href="product.html#abdm-workflow" style="color:#5835ea; font-weight:700; text-decoration:underline;">Explore ABDM Workflow Guide →</a>
      `;
    }

    if (lower.includes("demo") || lower.includes("schedule") || lower.includes("book") || lower.includes("walkthrough") || lower.includes("trial")) {
      return `
        We would love to show you SehatLink OS in a personalized 30-minute live demo!
        <br><br>
        Please enter your details below to lock in a demo slot:
        <div class="chat-lead-form">
          <input type="text" class="lead-name" placeholder="Your Full Name *" required />
          <input type="tel" class="lead-phone" placeholder="Mobile / WhatsApp Number *" required />
          <input type="text" class="lead-facility" placeholder="Hospital or Clinic Name *" required />
          <button type="button">
            <span>📅 Request Live Demo Slot</span> →
          </button>
        </div>
      `;
    }

    if (lower.includes("whatsapp") || lower.includes("sales") || lower.includes("call") || lower.includes("contact") || lower.includes("phone")) {
      return `
        You can reach our solutions team directly on WhatsApp or phone for immediate consultation:<br><br>
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; color:#059669; font-weight:700; text-decoration:underline;">
          💬 Open WhatsApp Chat (Fast Response) →
        </a>
      `;
    }

    // Default intelligent assistant reply
    return `
      Thank you for reaching out! Our hospital IT consultants typically reply within 5 minutes.<br><br>
      You can also choose from these quick options:
      <div class="chat-action-chips" style="margin-top:8px;">
        <button class="chat-chip-btn" data-ask="What is the pricing for SehatLink OS?"><span>💰 Pricing Plans</span><span>→</span></button>
        <button class="chat-chip-btn" data-ask="How does ABDM M1, M2 & M3 work?"><span>🆔 ABDM Milestones</span><span>→</span></button>
        <button class="chat-chip-btn" data-ask="I would like to book a free live demo."><span>📅 Schedule Free Demo</span><span>→</span></button>
      </div>
    `;
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    }[tag] || tag));
  }

  // Initialize and render messages from storage on load
  renderMessages();
})();

