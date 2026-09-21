document.addEventListener("DOMContentLoaded", () => {
  
  // Register GSAP Plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          preloader.style.display = 'none';
          initHeroAnimations();
        }
      });
    });
  } else {
    initHeroAnimations();
  }

  // Custom Cursor
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const interactiveElements = document.querySelectorAll('a, button, input, .property-card, .category-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile Menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const closeMenuBtn = document.querySelector('.close-menu');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });
    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const active = document.querySelector('.faq-question.active');
      if (active && active !== question) {
        active.classList.remove('active');
        active.nextElementSibling.style.maxHeight = "0px";
      }
      
      question.classList.toggle('active');
      const answer = question.nextElementSibling;
      if (question.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = "0px";
      }
    });
  });


  // Scroll Animations
  initScrollAnimations();

  // Dynamic User Profile
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');
  if (userName) {
    const userProfileDivs = document.querySelectorAll('.user-profile');
    userProfileDivs.forEach(profile => {
      // First div inside the wrapper is the name, second is the role
      const wrapper = profile.querySelector('div[style*="text-align: right"]');
      if (wrapper) {
        const nameEl = wrapper.querySelector('div:first-child');
        const roleEl = wrapper.querySelector('div:last-child');
        
        if (nameEl) {
          const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
          nameEl.textContent = formattedName;
        }
        
        if (roleEl && userRole) {
          roleEl.textContent = userRole === 'Admin' ? 'Superuser' : 'Premium Bidder';
        }
      }
      
      const avatarEl = profile.querySelector('.avatar');
      if (avatarEl) {
        let initials = userName.substring(0, 2).toUpperCase();
        if (userName.includes(' ')) {
            const parts = userName.split(' ');
            if (parts.length > 1 && parts[1].length > 0) {
                initials = (parts[0][0] + parts[1][0]).toUpperCase();
            }
        }
        avatarEl.textContent = initials;
      }
    });
  }

  // Dashboard Sidebar Toggle
  const dashboardToggles = document.querySelectorAll('.dashboard-toggle');
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');
  if (dashboardToggles.length > 0 && dashboardSidebar) {
    dashboardToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        dashboardSidebar.classList.toggle('active');
      });
    });
    
    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024 && dashboardSidebar.classList.contains('active')) {
        if (!dashboardSidebar.contains(e.target) && !e.target.closest('.dashboard-toggle')) {
          dashboardSidebar.classList.remove('active');
        }
      }
    });
  }

});

function initHeroAnimations() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline();

  const heroImage = document.querySelector('.hero-bg');
  const heroTitle = document.querySelector('.hero-title');
  const heroText = document.querySelectorAll('.hero-content p');
  const heroBtns = document.querySelector('.hero-btns');
  const liveAuctionCard = document.querySelector('.hero-live-card');

  if (heroImage) {
    tl.fromTo(heroImage, 
      { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.2 }, 
      { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.5, ease: 'power3.inOut' }
    );
  }

  if (heroTitle) {
    const text = new SplitType(heroTitle, { types: 'chars' });
    tl.from(text.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, "-=0.5");
  }

  if (heroText.length) {
    tl.from(heroText, { y: 30, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.4");
  }
  
  if (heroBtns) {
    tl.from(heroBtns, { y: 30, opacity: 0, duration: 0.8 }, "-=0.6");
  }

  if (liveAuctionCard) {
    tl.from(liveAuctionCard, { x: 100, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.8");
  }
}

function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Fade up elements
  const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
  fadeUpElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // How it works timeline
  const journeySteps = document.querySelectorAll('.journey-step');
  if (journeySteps.length > 0) {
    const journeyLine = document.querySelector('.journey-line-fill');
    
    gsap.to(journeyLine, {
      scrollTrigger: {
        trigger: '.journey-container',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      height: '100%',
      ease: "none"
    });

    journeySteps.forEach((step, i) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: "top 70%",
        },
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8
      });
    });
  }

  // Stats Counters
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-target'));
    const prefix = stat.getAttribute('data-prefix') || '';
    const suffix = stat.getAttribute('data-suffix') || '';
    
    gsap.to({ val: 0 }, {
      scrollTrigger: {
        trigger: stat,
        start: "top 85%"
      },
      val: target,
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        // Format with commas and optional decimal
        let formatted = Math.floor(this.targets()[0].val).toLocaleString('en-IN');
        stat.textContent = prefix + formatted + suffix;
      }
    });
  });
}

// Admin Dashboard Dummy Links and Validation
document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector('.dashboard-main');
  if (mainContent) {
    // Select all action buttons and links, excluding toggle, logout, and valid hrefs
    const actionEls = mainContent.querySelectorAll('button:not(.dashboard-toggle):not(#logoutBtn), a[href="#"], a:not([href])');
    
    actionEls.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        
        const formContainer = el.closest('.dashboard-panel, .form-group') || document;
        const inputs = formContainer.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), select, textarea');
        
        // If there are inputs nearby and button text suggests an action like save/submit
        const elText = el.textContent.trim().toLowerCase();
        const isSubmitAction = elText.includes('save') || elText.includes('submit') || elText.includes('add') || elText.includes('update');
        
        let isValid = true;
        if (inputs.length > 0 && isSubmitAction) {
            inputs.forEach(input => {
                // simple validation: if empty, mark as invalid
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = '1px solid #ddd';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields before proceeding.');
                return;
            }
        }
        
        // Redirect to 404 page
        window.location.href = '404.html';
      });
    });
  }
});
