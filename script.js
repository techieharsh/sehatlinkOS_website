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
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

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
const rolePortalCard = document.querySelector(".role-portal-card");

if (accessVisual && rolePortalCard) {
  accessVisual.addEventListener("mousemove", (e) => {
    const rect = accessVisual.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    rolePortalCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  accessVisual.addEventListener("mouseleave", () => {
    rolePortalCard.style.transform = "";
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
    badge: "Step 1 of 5 · Reception Desk",
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
    badge: "Step 2 of 5 · OPD Doctor EMR",
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
    badge: "Step 3 of 5 · IPD Ward Care",
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
    badge: "Step 4 of 5 · Cashless Billing Counter",
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
  {
    stepTag: "STAGE 05 · PATIENT MOBILE CONSENT",
    badge: "Step 5 of 5 · ABHA Mobile PHR App",
    title: "5. Patient Mobile Consent & Lifetime Health Record Sync",
    description:
      "After discharge, the patient returns home with complete digital empowerment. They can view their OPD prescriptions, diagnostic reports, and IPD summaries on any ABHA PHR Mobile App (e.g. ABHA App, Paytm, Aarogya Setu) and grant secure consent to share records with doctors anywhere in India.",
    image: "assets/images/abdm_patient_records_flow.jpg",
    points: [
      {
        icon: "📱",
        text: "<strong>ABHA PHR App:</strong> Instant mobile access to prescriptions & diagnostic reports.",
      },
      {
        icon: "🔑",
        text: "<strong>Consent Manager:</strong> Patient controls who sees their health data with OTP consent.",
      },
      {
        icon: "🌐",
        text: "<strong>Lifetime Portability:</strong> No paper files needed — digital medical history anywhere.",
      },
    ],
    quote:
      '💬 <em>"Patient scans QR code or approves consent on mobile → Complete hospital records accessible anytime!"</em>',
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
