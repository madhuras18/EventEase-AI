/**
 * EventEase AI — Complete Intelligent Event Planning Controller
 * Enhanced with Smart RSVP Guest Management, AI Budget-Saving Assistant,
 * AI Visual Mood Board, and Event-Day Emergency Assistant
 */

(function () {
  'use strict';

  // =========================================================================
  // Application State
  // =========================================================================
  let currentEvent = null;
  let allEvents = [];
  let activeView = 'dashboard';
  let activeTaskFilter = 'all';
  let activeDietary = 'veg';
  let activeInviteLang = 'english';
  let activeInviteTone = 'elegant';
  let activeCrisisId = 'vendor_late';
  let activeThemeTab = 'recs'; // 'recs' or 'moodboard'
  let wizardCurrentStep = 1;
  let geminiApiKey = localStorage.getItem('eventease_gemini_api_key') || '';
  let acceptedOptimizations = new Set();

  // =========================================================================
  // DOM Elements - Landing Page & Shell Navigation
  // =========================================================================
  const landingPage = document.getElementById('landingPage');
  const appShell = document.getElementById('appShell');
  const btnLandingStartPlanning = document.getElementById('btnLandingStartPlanning');
  const btnHeroStartPlanning = document.getElementById('btnHeroStartPlanning');
  const btnCtaStartPlanning = document.getElementById('btnCtaStartPlanning');
  const btnLandingOpenDashboard = document.getElementById('btnLandingOpenDashboard');
  const btnMobileLandingOpenDashboard = document.getElementById('btnMobileLandingOpenDashboard');
  const btnMobileLandingStartPlanning = document.getElementById('btnMobileLandingStartPlanning');
  const btnCtaOpenDashboard = document.getElementById('btnCtaOpenDashboard');
  const btnLandingResumeEvent = document.getElementById('btnLandingResumeEvent');
  const landingActiveEventName = document.getElementById('landingActiveEventName');
  const landingActiveEventBudget = document.getElementById('landingActiveEventBudget');
  const btnHeaderReturnHome = document.getElementById('btnHeaderReturnHome');
  const btnSidebarReturnHome = document.getElementById('btnSidebarReturnHome');
  const landingBrandLogo = document.getElementById('landingBrandLogo');
  const landingMobileToggle = document.getElementById('landingMobileToggle');
  const landingMobileMenu = document.getElementById('landingMobileMenu');

  const appSidebar = document.getElementById('appSidebar');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
  const viewSections = document.querySelectorAll('.view-section');
  const pageTitle = document.getElementById('pageTitle');
  const quickPresetSelector = document.getElementById('quickPresetSelector');
  const btnOpenPlanWizard = document.getElementById('btnOpenPlanWizard');

  // Sidebar Elements
  const sideEventName = document.getElementById('sideEventName');
  const sideEventBudget = document.getElementById('sideEventBudget');
  const sideEventGuests = document.getElementById('sideEventGuests');
  const sideBadgeEvents = document.getElementById('sideBadgeEvents');
  const sideBadgeTasks = document.getElementById('sideBadgeTasks');
  const sideBadgeGuests = document.getElementById('sideBadgeGuests');
  const statusDot = document.getElementById('statusDot');
  const aiStatusText = document.getElementById('aiStatusText');
  const btnOpenApiKeyModal = document.getElementById('btnOpenApiKeyModal');

  // Dashboard Elements
  const heroTypeBadge = document.getElementById('heroTypeBadge');
  const heroTypeIcon = document.getElementById('heroTypeIcon');
  const heroTypeLabel = document.getElementById('heroTypeLabel');
  const heroEventName = document.getElementById('heroEventName');
  const heroDate = document.getElementById('heroDate');
  const heroTime = document.getElementById('heroTime');
  const heroGuests = document.getElementById('heroGuests');
  const heroLocation = document.getElementById('heroLocation');
  const heroTheme = document.getElementById('heroTheme');
  const btnEditCurrentEvent = document.getElementById('btnEditCurrentEvent');
  const btnJumpToTheme = document.getElementById('btnJumpToTheme');

  const dashTotalBudget = document.getElementById('dashTotalBudget');
  const dashAllocatedCost = document.getElementById('dashAllocatedCost');
  const dashAllocPercent = document.getElementById('dashAllocPercent');
  const dashRemainingBalance = document.getElementById('dashRemainingBalance');
  const dashHealthBadge = document.getElementById('dashHealthBadge');
  const dashCostPerGuest = document.getElementById('dashCostPerGuest');
  const dashGuestTally = document.getElementById('dashGuestTally');
  const dashTaskProgress = document.getElementById('dashTaskProgress');
  const dashTaskCount = document.getElementById('dashTaskCount');
  const dashProgressBar = document.getElementById('dashProgressBar');
  const quickBarPercentLabel = document.getElementById('quickBarPercentLabel');
  const dashQuickCategories = document.getElementById('dashQuickCategories');
  const dashUpcomingTasksList = document.getElementById('dashUpcomingTasksList');
  const dashAiInsightText = document.getElementById('dashAiInsightText');

  // View Navigation Shortcut Buttons
  const btnNavToBudget = document.getElementById('btnNavToBudget');
  const btnNavToTimeline = document.getElementById('btnNavToTimeline');

  // Theme Studio & Mood Board Elements
  const themeStudioBudgetLimit = document.getElementById('themeStudioBudgetLimit');
  const tabThemeRecs = document.getElementById('tabThemeRecs');
  const tabVisualMoodBoard = document.getElementById('tabVisualMoodBoard');
  const subviewThemeRecs = document.getElementById('subviewThemeRecs');
  const subviewVisualMoodBoard = document.getElementById('subviewVisualMoodBoard');
  const themeCardsGrid = document.getElementById('themeCardsGrid');
  const moodBoardContainer = document.getElementById('moodBoardContainer');

  // Budget Planner Elements
  const budgetViewTotalCap = document.getElementById('budgetViewTotalCap');
  const budgetViewAllocated = document.getElementById('budgetViewAllocated');
  const budgetViewRemaining = document.getElementById('budgetViewRemaining');
  const budgetViewHealthBadge = document.getElementById('budgetViewHealthBadge');
  const budgetWarningBox = document.getElementById('budgetWarningBox');
  const fullBudgetCategoriesList = document.getElementById('fullBudgetCategoriesList');
  const budgetOptimizerTips = document.getElementById('budgetOptimizerTips');
  const venueNoteText = document.getElementById('venueNoteText');
  const btnAutoBalanceBudget = document.getElementById('btnAutoBalanceBudget');
  const btnResetDefaultRatios = document.getElementById('btnResetDefaultRatios');
  const btnOpenBudgetOptimizer = document.getElementById('btnOpenBudgetOptimizer');

  // Budget Optimizer Modal Elements
  const budgetOptimizerModal = document.getElementById('budgetOptimizerModal');
  const optTotalPotentialSavings = document.getElementById('optTotalPotentialSavings');
  const optimizationCardsContainer = document.getElementById('optimizationCardsContainer');
  const btnCloseOptimizerModal = document.getElementById('btnCloseOptimizerModal');

  // Food Planner Elements
  const dietaryPills = document.querySelectorAll('#dietaryPills .diet-pill');
  const foodCostPerPlate = document.getElementById('foodCostPerPlate');
  const foodTotalEstimate = document.getElementById('foodTotalEstimate');
  const foodCakeEstimate = document.getElementById('foodCakeEstimate');
  const foodMenuGrid = document.getElementById('foodMenuGrid');

  // Timeline & Tasks Elements
  const timelineTasksContainer = document.getElementById('timelineTasksContainer');
  const eventDayRunOfShowContainer = document.getElementById('eventDayRunOfShowContainer');
  const timelineProgressBadge = document.getElementById('timelineProgressBadge');
  const formAddCustomTask = document.getElementById('formAddCustomTask');
  const inputNewTaskTitle = document.getElementById('inputNewTaskTitle');
  const selectNewTaskStage = document.getElementById('selectNewTaskStage');
  const filterTaskBtns = document.querySelectorAll('.filter-task-btn');

  // Smart Guest Management Elements
  const guestStatInvited = document.getElementById('guestStatInvited');
  const guestStatConfirmed = document.getElementById('guestStatConfirmed');
  const guestStatPending = document.getElementById('guestStatPending');
  const guestStatDeclined = document.getElementById('guestStatDeclined');
  const cateringImpactText = document.getElementById('cateringImpactText');
  const btnSyncConfirmedToCatering = document.getElementById('btnSyncConfirmedToCatering');
  const shareableRsvpUrl = document.getElementById('shareableRsvpUrl');
  const btnCopyRsvpLink = document.getElementById('btnCopyRsvpLink');
  const btnSimulateRsvp = document.getElementById('btnSimulateRsvp');
  const guestTableBody = document.getElementById('guestTableBody');
  const btnOpenAddGuestModal = document.getElementById('btnOpenAddGuestModal');
  const btnOpenShareRsvpModal = document.getElementById('btnOpenShareRsvpModal');

  // Guest Modal Elements
  const guestModal = document.getElementById('guestModal');
  const guestModalTitle = document.getElementById('guestModalTitle');
  const guestForm = document.getElementById('guestForm');
  const guestEditId = document.getElementById('guestEditId');
  const guestInputName = document.getElementById('guestInputName');
  const guestInputPhone = document.getElementById('guestInputPhone');
  const guestInputPax = document.getElementById('guestInputPax');
  const guestSelectStatus = document.getElementById('guestSelectStatus');
  const guestSelectDietary = document.getElementById('guestSelectDietary');
  const guestInputNotes = document.getElementById('guestInputNotes');
  const btnCloseGuestModal = document.getElementById('btnCloseGuestModal');
  const btnCancelGuestModal = document.getElementById('btnCancelGuestModal');

  // Shareable RSVP Modal Simulator
  const rsvpShareModal = document.getElementById('rsvpShareModal');
  const rsvpShareEventName = document.getElementById('rsvpShareEventName');
  const rsvpShareEventDate = document.getElementById('rsvpShareEventDate');
  const rsvpSimulationForm = document.getElementById('rsvpSimulationForm');
  const simGuestName = document.getElementById('simGuestName');
  const simGuestPax = document.getElementById('simGuestPax');
  const simGuestDietary = document.getElementById('simGuestDietary');
  const btnCloseRsvpShareModal = document.getElementById('btnCloseRsvpShareModal');

  // Vendor Checklist Elements
  const vendorTableBody = document.getElementById('vendorTableBody');
  const vendorProcurementTotal = document.getElementById('vendorProcurementTotal');
  const btnToggleAddVendorForm = document.getElementById('btnToggleAddVendorForm');
  const addVendorForm = document.getElementById('addVendorForm');
  const btnCancelVendorForm = document.getElementById('btnCancelVendorForm');
  const newVendorName = document.getElementById('newVendorName');
  const newVendorCategory = document.getElementById('newVendorCategory');
  const newVendorPrice = document.getElementById('newVendorPrice');
  const newVendorPriority = document.getElementById('newVendorPriority');

  // Invitations Elements
  const inviteLanguageSelector = document.getElementById('inviteLanguageSelector');
  const inviteToneSelector = document.getElementById('inviteToneSelector');
  const inviteHostInput = document.getElementById('inviteHostInput');
  const invitationPreviewText = document.getElementById('invitationPreviewText');
  const previewLangBadge = document.getElementById('previewLangBadge');
  const btnCopyInviteText = document.getElementById('btnCopyInviteText');
  const btnShareWhatsApp = document.getElementById('btnShareWhatsApp');

  // Activities, Gifts & Eco Tips Elements
  const activitiesGrid = document.getElementById('activitiesGrid');
  const giftsGrid = document.getElementById('giftsGrid');
  const ecoTipsGrid = document.getElementById('ecoTipsGrid');

  // Event-Day Emergency Assistant Elements
  const emergencySituationChips = document.getElementById('emergencySituationChips');
  const crisisPlaybookCard = document.getElementById('crisisPlaybookCard');
  const emergencyAskForm = document.getElementById('emergencyAskForm');
  const emergencyCustomInput = document.getElementById('emergencyCustomInput');
  const emergencyCustomOutput = document.getElementById('emergencyCustomOutput');

  // Chat Assistant Elements
  const chatMessagesContainer = document.getElementById('chatMessagesContainer');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const promptPills = document.querySelectorAll('.prompt-pill');
  const chatStatusDot = document.getElementById('chatStatusDot');
  const chatModeLabel = document.getElementById('chatModeLabel');
  const btnConfigureAiKey = document.getElementById('btnConfigureAiKey');

  // My Events Grid
  const myEventsGrid = document.getElementById('myEventsGrid');
  const btnCreateNewFromEvents = document.getElementById('btnCreateNewFromEvents');

  // Export Plan Elements
  const dossierContent = document.getElementById('dossierContent');
  const btnPrintDossier = document.getElementById('btnPrintDossier');

  // Wizard Questionnaire Modal Elements
  const wizardModal = document.getElementById('wizardModal');
  const wizardForm = document.getElementById('wizardForm');
  const wizardStepSub = document.getElementById('wizardStepSub');
  const btnWizardCancel = document.getElementById('btnWizardCancel');
  const btnWizardPrev = document.getElementById('btnWizardPrev');
  const btnWizardNext = document.getElementById('btnWizardNext');
  const btnWizardSkip = document.getElementById('btnWizardSkip');
  const btnWizardSubmit = document.getElementById('btnWizardSubmit');

  const wizEventName = document.getElementById('wizEventName');
  const wizEventType = document.getElementById('wizEventType');
  const wizEventDate = document.getElementById('wizEventDate');
  const wizEventTime = document.getElementById('wizEventTime');
  const wizTypeSpecificGroup = document.getElementById('wizTypeSpecificGroup');
  const wizTypeSpecificLabel = document.getElementById('wizTypeSpecificLabel');
  const wizTypeSpecificInput = document.getElementById('wizTypeSpecificInput');
  const wizBudget = document.getElementById('wizBudget');
  const wizGuests = document.getElementById('wizGuests');
  const wizVenueType = document.getElementById('wizVenueType');
  const wizVenueIncluded = document.getElementById('wizVenueIncluded');
  const wizLocation = document.getElementById('wizLocation');
  const wizStyle = document.getElementById('wizStyle');
  const wizColors = document.getElementById('wizColors');
  const wizCustomTheme = document.getElementById('wizCustomTheme');
  const wizDietary = document.getElementById('wizDietary');
  const wizPriority = document.getElementById('wizPriority');
  const wizNotes = document.getElementById('wizNotes');

  // API Key Modal Elements
  const apiKeyModal = document.getElementById('apiKeyModal');
  const inputGeminiApiKey = document.getElementById('inputGeminiApiKey');
  const btnSaveApiKey = document.getElementById('btnSaveApiKey');
  const btnClearApiKey = document.getElementById('btnClearApiKey');
  const btnCloseApiKeyModal = document.getElementById('btnCloseApiKeyModal');

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // =========================================================================
  // Toast Helper
  // =========================================================================
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span><span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDateReadable(dateStr) {
    if (!dateStr) return 'Date TBD';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    return dateStr;
  }

  // =========================================================================
  // Initialization & LocalStorage
  // =========================================================================
  function initApp() {
    const storedEvents = localStorage.getItem('eventease_all_events');
    if (storedEvents) {
      try {
        allEvents = JSON.parse(storedEvents);
      } catch (e) {
        allEvents = JSON.parse(JSON.stringify(SAMPLE_PRESETS));
      }
    } else {
      allEvents = JSON.parse(JSON.stringify(SAMPLE_PRESETS));
    }

    const storedActiveId = localStorage.getItem('eventease_active_event_id');
    currentEvent = allEvents.find(e => e.id === storedActiveId) || allEvents[0];

    // Ensure guests roster exists
    if (!currentEvent.guests) {
      currentEvent.guests = [];
    }

    updateAiStatusIndicator();
    renderAll();
    setupEventHandlers();
    setupImageFallbacks();
    showLandingPage();
  }

  // =========================================================================
  // Landing Page & Dashboard Screen Transitions
  // =========================================================================
  function showLandingPage() {
    if (landingPage) landingPage.style.display = 'block';
    if (appShell) appShell.style.display = 'none';

    // Synchronize active event callout on landing page
    if (currentEvent) {
      if (landingActiveEventName) landingActiveEventName.textContent = currentEvent.name;
      if (landingActiveEventBudget) landingActiveEventBudget.textContent = formatINR(currentEvent.budget);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showDashboard(targetView = 'dashboard', openWizardWithCategory = null) {
    if (landingPage) landingPage.style.display = 'none';
    if (appShell) appShell.style.display = 'flex';

    switchView(targetView);
    renderAll();

    if (openWizardWithCategory) {
      openPlanWizard(false, openWizardWithCategory);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setupImageFallbacks() {
    const images = document.querySelectorAll('.landing-image');
    images.forEach(img => {
      img.addEventListener('error', () => {
        const icon = img.dataset.catIcon || '✨';
        const title = img.dataset.catTitle || 'Celebration Setup';
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
          <defs>
            <linearGradient id="grad_${icon.charCodeAt(0) || 1}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F3EEE7"/>
              <stop offset="100%" stop-color="#F2E5E7"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad_${icon.charCodeAt(0) || 1})"/>
          <circle cx="400" cy="200" r="75" fill="#FFFEFC" stroke="#D8CEC3" stroke-width="2"/>
          <text x="400" y="225" font-family="'Playfair Display', serif" font-size="64" text-anchor="middle" fill="#B87583">${icon}</text>
          <text x="400" y="325" font-family="'Playfair Display', serif" font-size="28" font-weight="600" text-anchor="middle" fill="#3F3936">${title}</text>
          <text x="400" y="360" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" text-anchor="middle" fill="#8F8178">EventEase AI • Curated Celebration</text>
        </svg>`;
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      });
    });
  }

  function saveState() {
    try {
      localStorage.setItem('eventease_all_events', JSON.stringify(allEvents));
      if (currentEvent) {
        localStorage.setItem('eventease_active_event_id', currentEvent.id);
      }
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }

  function updateAiStatusIndicator() {
    if (geminiApiKey && geminiApiKey.trim().length > 10) {
      statusDot.className = 'status-dot';
      statusDot.style.backgroundColor = 'var(--status-success)';
      aiStatusText.textContent = 'Live Gemini AI Active';
      chatStatusDot.className = 'status-dot';
      chatStatusDot.style.backgroundColor = 'var(--status-success)';
      chatModeLabel.innerHTML = '<strong>Ask EventEase AI:</strong> Connected to Google Gemini 1.5';
      btnConfigureAiKey.textContent = '⚙️ AI Connected (Edit)';
    } else {
      statusDot.className = 'status-dot demo';
      statusDot.style.backgroundColor = 'var(--status-warning)';
      aiStatusText.textContent = 'Demo Mode (Heuristic Engine)';
      chatStatusDot.className = 'status-dot demo';
      chatStatusDot.style.backgroundColor = 'var(--status-warning)';
      chatModeLabel.innerHTML = '<strong>Ask EventEase AI:</strong> Demo Mode (Heuristic Event Intelligence)';
      btnConfigureAiKey.textContent = 'Connect Live Gemini API →';
    }
  }

  // =========================================================================
  // Master Render Function
  // =========================================================================
  function renderAll() {
    renderSidebarInfo();
    renderDashboard();
    renderMyEvents();
    renderThemeStudio();
    renderBudgetPlanner();
    renderFoodPlanner();
    renderTimeline();
    renderGuests();
    renderVendors();
    renderInvitations();
    renderGiftsAndActivities();
    renderEmergencyAssistant();
    renderDossierExport();
  }

  // =========================================================================
  // 1. Sidebar Render
  // =========================================================================
  function renderSidebarInfo() {
    sideEventName.textContent = currentEvent.name;
    sideEventBudget.textContent = formatINR(currentEvent.budget);
    
    // Confirmed Pax tally
    const guests = currentEvent.guests || [];
    const confirmedPax = guests
      .filter(g => g.status === 'Accepted')
      .reduce((sum, g) => sum + (Number(g.pax) || 1), 0);

    sideEventGuests.textContent = `${currentEvent.guestCount} Guests (${confirmedPax} Confirmed)`;
    sideBadgeEvents.textContent = allEvents.length;

    const tasks = currentEvent.tasks || [];
    const done = tasks.filter(t => t.completed).length;
    sideBadgeTasks.textContent = `${done}/${tasks.length}`;

    sideBadgeGuests.textContent = `${confirmedPax} Confirmed`;
    quickPresetSelector.value = currentEvent.id;
  }

  // =========================================================================
  // 2. Dashboard Render
  // =========================================================================
  function renderDashboard() {
    const typeMeta = EVENT_TYPES[currentEvent.type] || EVENT_TYPES.birthday;
    heroTypeIcon.textContent = typeMeta.icon;
    heroTypeLabel.textContent = typeMeta.label;
    heroEventName.textContent = currentEvent.name;
    heroDate.textContent = formatDateReadable(currentEvent.date);
    heroTime.textContent = currentEvent.time || '06:00 PM';
    
    const guests = currentEvent.guests || [];
    const confirmedPax = guests
      .filter(g => g.status === 'Accepted')
      .reduce((sum, g) => sum + (Number(g.pax) || 1), 0);

    heroGuests.textContent = `${currentEvent.guestCount} Guests (${confirmedPax} Confirmed)`;
    heroLocation.textContent = currentEvent.location || 'Location Pending';
    heroTheme.textContent = currentEvent.theme || 'Elegant Blush & Gold';

    // Financial Metrics
    const totalBudget = Number(currentEvent.budget) || 0;
    const expenses = currentEvent.customExpenses || {};
    const totalAllocated = Object.values(expenses).reduce((acc, val) => acc + (Number(val) || 0), 0);
    const remaining = totalBudget - totalAllocated;

    dashTotalBudget.textContent = formatINR(totalBudget);
    dashAllocatedCost.textContent = formatINR(totalAllocated);
    
    const pctCommitted = totalBudget > 0 ? Math.round((totalAllocated / totalBudget) * 100) : 0;
    dashAllocPercent.textContent = `${pctCommitted}% of budget committed`;

    if (remaining > 0) {
      dashRemainingBalance.textContent = `+${formatINR(remaining)}`;
      dashHealthBadge.className = 'health-badge healthy';
      dashHealthBadge.textContent = `Under Budget (+${formatINR(remaining)})`;
    } else if (remaining === 0) {
      dashRemainingBalance.textContent = formatINR(0);
      dashHealthBadge.className = 'health-badge healthy';
      dashHealthBadge.textContent = '100% Balanced';
    } else {
      dashRemainingBalance.textContent = `-${formatINR(Math.abs(remaining))}`;
      dashHealthBadge.className = 'health-badge danger';
      dashHealthBadge.textContent = `Over Budget (-${formatINR(Math.abs(remaining))})`;
    }

    // Cost Per Guest calculation (shows base and confirmed basis)
    const basePerGuest = currentEvent.guestCount > 0 ? Math.round(totalBudget / currentEvent.guestCount) : 0;
    dashCostPerGuest.textContent = formatINR(basePerGuest);
    dashGuestTally.textContent = `For ${currentEvent.guestCount} invited (${confirmedPax} confirmed)`;

    // Tasks Progress
    const tasks = currentEvent.tasks || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const taskPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    dashTaskProgress.textContent = `${taskPct}%`;
    dashTaskCount.textContent = `${completedTasks} of ${totalTasks} tasks completed`;

    renderDashboardProgressBar(expenses, totalAllocated);
    renderQuickCategoriesList(expenses, totalBudget);
    renderDashboardUpcomingTasks(tasks);
    renderAiPlanningInsight(totalBudget, currentEvent.guestCount, currentEvent.type);
  }

  function renderDashboardProgressBar(expenses, totalAllocated) {
    const total = totalAllocated > 0 ? totalAllocated : 1;
    const v = (Number(expenses.venue) || 0) / total * 100;
    const d = (Number(expenses.decoration) || 0) / total * 100;
    const f = (Number(expenses.food) || 0) / total * 100;
    const c = (Number(expenses.cake) || 0) / total * 100;
    const p = (Number(expenses.photography) || 0) / total * 100;
    const e = (Number(expenses.entertainment) || 0) / total * 100;
    const m = ((Number(expenses.invitations) || 0) + (Number(expenses.gifts) || 0) + (Number(expenses.transport) || 0)) / total * 100;
    const cont = (Number(expenses.contingency) || 0) / total * 100;

    document.getElementById('dashProgVenue').style.width = `${v.toFixed(1)}%`;
    document.getElementById('dashProgDecor').style.width = `${d.toFixed(1)}%`;
    document.getElementById('dashProgFood').style.width = `${f.toFixed(1)}%`;
    document.getElementById('dashProgCake').style.width = `${c.toFixed(1)}%`;
    document.getElementById('dashProgPhoto').style.width = `${p.toFixed(1)}%`;
    document.getElementById('dashProgEntertain').style.width = `${e.toFixed(1)}%`;
    document.getElementById('dashProgMisc').style.width = `${m.toFixed(1)}%`;
    document.getElementById('dashProgContingency').style.width = `${cont.toFixed(1)}%`;

    quickBarPercentLabel.textContent = `${Math.round(totalAllocated / (currentEvent.budget || 1) * 100)}% Allocated`;
  }

  function renderQuickCategoriesList(expenses, totalBudget) {
    dashQuickCategories.innerHTML = '';
    const mainCats = [
      { key: 'decoration', name: 'Decoration & Theme', color: '#B87583' },
      { key: 'food', name: 'Food & Catering', color: '#D49A89' },
      { key: 'cake', name: 'Cake & Desserts', color: '#C9866F' },
      { key: 'photography', name: 'Photography', color: '#8E9AA8' },
      { key: 'contingency', name: 'Emergency Contingency', color: '#8A9684' }
    ];

    mainCats.forEach(cat => {
      const val = Number(expenses[cat.key]) || 0;
      const share = totalBudget > 0 ? ((val / totalBudget) * 100).toFixed(0) : 0;

      const row = document.createElement('div');
      row.className = 'budget-row';
      row.innerHTML = `
        <div class="budget-row-label">
          <span class="category-dot" style="background-color:${cat.color};"></span>
          <span>${cat.name}</span>
        </div>
        <div style="font-weight:700; text-align:right;">${formatINR(val)}</div>
        <div class="budget-row-share">${share}%</div>
      `;
      dashQuickCategories.appendChild(row);
    });
  }

  function renderDashboardUpcomingTasks(tasks) {
    dashUpcomingTasksList.innerHTML = '';
    const pendingTasks = tasks.filter(t => !t.completed).slice(0, 4);

    if (pendingTasks.length === 0) {
      dashUpcomingTasksList.innerHTML = `
        <div style="padding:1rem 0; font-size:0.85rem; color:var(--text-muted); text-align:center;">
          🎉 All key tasks are completed! You're ready for celebration day.
        </div>
      `;
      return;
    }

    pendingTasks.forEach(task => {
      const item = document.createElement('div');
      item.className = 'task-check-row';
      item.innerHTML = `
        <div class="task-check-left">
          <input type="checkbox" class="custom-checkbox quick-task-check" data-id="${task.id}" aria-label="Toggle task">
          <span class="task-text-body">${escapeHtml(task.title)}</span>
        </div>
        <span class="stage-badge">${escapeHtml(task.category || 'General')}</span>
      `;
      dashUpcomingTasksList.appendChild(item);
    });
  }

  function renderAiPlanningInsight(budget, guests, eventType) {
    const costPerHead = guests > 0 ? Math.round(budget / guests) : 0;
    if (eventType === 'birthday' && budget <= 15000) {
      dashAiInsightText.textContent = `For a budget of ${formatINR(budget)} and ${guests} guests (${formatINR(costPerHead)}/guest), keeping hall decor to an elegant balloon garland and serving cocktail samosas with Dutch chocolate cake ensures your event stays 100% on budget with contingency.`;
    } else if (eventType === 'wedding') {
      dashAiInsightText.textContent = `With ${guests} wedding guests at ${formatINR(budget)}, allocating 32% to catering (approx ${formatINR(Math.round(budget * 0.32))}) allows a grand Indian buffet with live chaat stalls while preserving 20% for auspicious marigold floral decor.`;
    } else {
      dashAiInsightText.textContent = `Planning ${formatINR(budget)} for ${guests} attendees provides an optimal ratio of ${formatINR(costPerHead)} per person. Check the AI Theme Studio for DIY floral options to save up to ₹2,000 on decor.`;
    }
  }

  // =========================================================================
  // 3. My Events & Presets View
  // =========================================================================
  function renderMyEvents() {
    myEventsGrid.innerHTML = '';

    allEvents.forEach(evt => {
      const typeMeta = EVENT_TYPES[evt.type] || EVENT_TYPES.birthday;
      const isCurrent = evt.id === currentEvent.id;

      const card = document.createElement('div');
      card.className = `theme-card ${isCurrent ? 'highlighted-best' : ''}`;
      card.innerHTML = `
        <div>
          ${isCurrent ? '<span class="best-fit-tag">Active Plan</span>' : ''}
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">${typeMeta.icon}</div>
          <h4 class="theme-title">${escapeHtml(evt.name)}</h4>
          <div class="theme-vibe">${typeMeta.label} • ${formatINR(evt.budget)}</div>
          <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:0.85rem;">
            📅 ${formatDateReadable(evt.date)} • 👥 ${evt.guestCount} Guests • 📍 ${escapeHtml(evt.location)}
          </div>
          <div class="theme-reason-box">
            <strong>Theme:</strong> ${escapeHtml(evt.theme || 'Custom Indian Theme')}
          </div>
        </div>

        <div class="theme-card-footer">
          <span style="font-size:0.82rem; font-weight:700; color:var(--text-dark);">
            ${(evt.tasks || []).filter(t => t.completed).length}/${(evt.tasks || []).length} Tasks Done
          </span>
          ${isCurrent ? 
            '<span class="health-badge healthy">Currently Loaded</span>' :
            `<button class="btn btn-secondary btn-sm btn-select-event" data-id="${evt.id}">Switch to Plan</button>`
          }
        </div>
      `;
      myEventsGrid.appendChild(card);
    });
  }

  // =========================================================================
  // 4. AI Theme Studio ("Discover Your Perfect Theme") & Mood Board
  // =========================================================================
  function renderThemeStudio() {
    const eventType = currentEvent.type || 'birthday';
    const themesList = INDIAN_THEME_CATALOG[eventType] || INDIAN_THEME_CATALOG.birthday;

    const decorBudget = currentEvent.customExpenses?.decoration || Math.round(currentEvent.budget * 0.25);
    themeStudioBudgetLimit.textContent = formatINR(decorBudget);

    // Render Subview A: Theme Recommendation Cards
    themeCardsGrid.innerHTML = '';
    themesList.forEach((theme, idx) => {
      const isSelected = currentEvent.theme === theme.title;
      const isBest = idx === 0;

      const card = document.createElement('div');
      card.className = `theme-card ${isBest ? 'highlighted-best' : ''}`;

      const swatchesHtml = (theme.palette || []).map(hex => 
        `<span class="palette-circle" style="background-color:${hex};" title="${hex}"></span>`
      ).join('');

      card.innerHTML = `
        <div>
          ${isBest ? `<span class="best-fit-tag">🌟 Recommended Best Fit</span>` : ''}
          <h4 class="theme-title">${escapeHtml(theme.title)}</h4>
          <div class="theme-vibe">${escapeHtml(theme.vibe)}</div>
          
          <div class="theme-reason-box">
            <strong>Why it fits:</strong> ${escapeHtml(theme.bestFitReason)}
          </div>

          <div class="theme-meta-badges">
            <span class="theme-meta-badge">📍 ${escapeHtml(theme.suitability || 'Indoor / Hall')}</span>
            <span class="theme-meta-badge">✨ ${escapeHtml(theme.advantages || 'High photographic appeal')}</span>
          </div>

          <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.35rem;">
            Suggested Palette: ${(theme.paletteNames || []).join(', ')}
          </div>
          <div class="palette-swatches-strip">${swatchesHtml}</div>

          <div class="theme-decor-breakdown">
            <div class="decor-item-bullet">
              <span>🎈</span>
              <div><strong>Balloons & Florals:</strong> ${escapeHtml(theme.decorDetails.balloons)} ${escapeHtml(theme.decorDetails.flowers)}</div>
            </div>
            <div class="decor-item-bullet">
              <span>🖼️</span>
              <div><strong>Backdrop & Lighting:</strong> ${escapeHtml(theme.decorDetails.backdrop)} ${escapeHtml(theme.decorDetails.lighting)}</div>
            </div>
            <div class="decor-item-bullet">
              <span>🎂</span>
              <div><strong>Cake Table Styling:</strong> ${escapeHtml(theme.decorDetails.cakeTableStyling || 'Mirrored plinth with flower accents')}</div>
            </div>
          </div>

          <div class="diy-tip-box">
            <strong>💡 Affordable DIY Alternative:</strong><br>
            ${escapeHtml(theme.diyAlternatives)}
          </div>
        </div>

        <div class="theme-card-footer" style="flex-direction:column; align-items:stretch; gap:0.65rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Standard Decor</div>
              <div class="theme-cost-tag">${formatINR(theme.estimatedDecorCost)}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:0.7rem; color:var(--status-success); text-transform:uppercase; font-weight:700;">Affordable DIY</div>
              <div style="font-size:0.92rem; font-weight:800; color:var(--status-success);">${formatINR(theme.affordableCost || Math.round(theme.estimatedDecorCost * 0.72))}</div>
            </div>
          </div>

          <div class="theme-actions-row">
            <button class="btn ${isSelected ? 'btn-charcoal' : 'btn-primary'} btn-sm btn-apply-theme" data-theme="${escapeHtml(theme.title)}" data-cost="${theme.estimatedDecorCost}">
              ${isSelected ? '✓ Current Theme' : 'Choose This Theme'}
            </button>
            <button class="btn btn-secondary btn-sm btn-affordable-theme" data-theme="${escapeHtml(theme.title)}" data-cost="${theme.affordableCost || Math.round(theme.estimatedDecorCost * 0.72)}">
              ✂️ Make More Affordable
            </button>
            <button class="btn btn-ghost btn-sm btn-show-more-theme" data-theme-idx="${idx}">
              💡 Show More Ideas
            </button>
          </div>
        </div>
      `;
      themeCardsGrid.appendChild(card);
    });

    // Render Subview B: Visual Mood Board
    renderVisualMoodBoard();
  }

  function renderVisualMoodBoard() {
    moodBoardContainer.innerHTML = '';
    const eventType = currentEvent.type || 'birthday';
    const themesList = INDIAN_THEME_CATALOG[eventType] || INDIAN_THEME_CATALOG.birthday;
    const activeThemeObj = themesList.find(t => t.title === currentEvent.theme) || themesList[0];
    const mb = activeThemeObj.moodBoard || {};

    const swatchesHtml = (activeThemeObj.palette || []).map((hex, i) => `
      <div style="display:flex; flex-direction:column; align-items:center; gap:0.25rem;">
        <span class="palette-circle" style="width:36px; height:36px; background-color:${hex};" title="${hex}"></span>
        <span style="font-size:0.7rem; color:var(--text-muted);">${(activeThemeObj.paletteNames || [])[i] || hex}</span>
      </div>
    `).join('');

    const concepts = mb.visualConcepts || [
      { label: "Grand Stage & Backdrop", concept: "Circular gold ring arch with organic blush & ivory balloon cascade, accented with warm script LED neon sign 'Happy Birthday'." },
      { label: "Cake & Dessert Table", concept: "Mirrored cylindrical plinths at varying heights with gold cake knife, blush chiffon drape, and fairy string canopy." },
      { label: "Guest Dining & Scape", concept: "Crisp white banquet tablecloths with dusty rose runners, brass tea-light votives, and personalized name tent cards." },
      { label: "Ambient Twilight Glow", concept: "3000K warm white ceiling fairy nets, ambient perimeter uplights, and battery-operated floating tea lights in clear glass bowls." }
    ];

    moodBoardContainer.innerHTML = `
      <div class="moodboard-header-strip">
        <div>
          <span style="font-size:0.75rem; font-weight:800; color:var(--dusty-pink); text-transform:uppercase;">Curated Visual Inspiration</span>
          <h3 style="font-size:1.3rem; font-weight:800; color:var(--text-dark); margin:0.2rem 0;">${escapeHtml(activeThemeObj.title)}</h3>
          <p style="font-size:0.84rem; color:var(--text-muted);">${escapeHtml(activeThemeObj.vibe)} • Aesthetic: ${mb.styleTag || 'Indian Celebration Modern'}</p>
        </div>
        <button class="btn btn-primary btn-sm" id="btnGenerateAiPrompt">
          ✨ Generate Custom AI Visual Brief
        </button>
      </div>

      <!-- Palette Strip -->
      <div class="app-card" style="padding:1.25rem; background:#FFFFFF; margin-bottom:0;">
        <h4 style="font-size:0.85rem; font-weight:800; color:var(--text-dark); text-transform:uppercase; margin-bottom:0.75rem;">
          Theme Color Harmony
        </h4>
        <div style="display:flex; gap:1.25rem; flex-wrap:wrap; align-items:center;">
          ${swatchesHtml}
        </div>
      </div>

      <!-- Mood Cards Grid -->
      <div class="moodboard-grid">
        ${concepts.map((item, idx) => `
          <div class="mood-card">
            <div class="mood-card-illustration" style="background:${idx % 2 === 0 ? 'linear-gradient(135deg, #F3EEE7, #F2E5E7)' : 'linear-gradient(135deg, #FAF5F0, #F3EEE7)'};">
              <span class="mood-card-badge">${item.label}</span>
              <div style="font-size:3rem; opacity:0.85;">${idx === 0 ? '🖼️' : (idx === 1 ? '🎂' : (idx === 2 ? '🍽️' : '✨'))}</div>
            </div>
            <div class="mood-card-body">
              <h5 class="mood-card-title">${item.label}</h5>
              <p class="mood-card-text">${escapeHtml(item.concept)}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="font-size:0.78rem; color:var(--text-muted); text-align:center; margin-top:0.5rem;">
        *Visual references represent curated design direction. Actual setup adapts to your venue layout and selected florist/decorator.
      </div>
    `;

    document.getElementById('btnGenerateAiPrompt')?.addEventListener('click', () => {
      const promptBrief = `Cinematic 8k photograph of an Indian celebration venue decorated in "${activeThemeObj.title}" aesthetic, featuring ${(activeThemeObj.paletteNames || []).join(', ')} colors, lush backdrop with warm fairy lighting, brass urlis with floating flowers, elegant cake table, highly detailed, photorealistic, architectural digest celebration style.`;
      navigator.clipboard.writeText(promptBrief).then(() => {
        showToast('AI Image Visual Brief copied to clipboard! 📋');
      }).catch(() => {
        showToast('Brief generated!');
      });
    });
  }

  // =========================================================================
  // 5. AI Budget Planner & Optimizer Assistant
  // =========================================================================
  function renderBudgetPlanner() {
    fullBudgetCategoriesList.innerHTML = '';
    const totalBudget = Number(currentEvent.budget) || 0;
    const expenses = currentEvent.customExpenses || {};

    const categoriesConfig = [
      { key: 'venue', label: '1. Venue & Hall Rental', dot: '#29262B', hint: 'Indoor hall, club room, lawn' },
      { key: 'decoration', label: '2. Decoration & Themes', dot: '#D66B91', hint: 'Backdrop, balloons, flowers' },
      { key: 'food', label: '3. Food & Catering', dot: '#F78FB3', hint: 'Starters, buffet, welcome drinks' },
      { key: 'cake', label: '4. Cake & Bakery Desserts', dot: '#E77F67', hint: 'Custom birthday or wedding cake' },
      { key: 'photography', label: '5. Photography & Video', dot: '#778BEB', hint: 'Portraits, candid reel highlights' },
      { key: 'entertainment', label: '6. Entertainment & Sound', dot: '#CF6A87', hint: 'DJ, mic, games, music' },
      { key: 'invitations', label: '7. Invitations & Stationery', dot: '#B5A8B5', hint: 'Digital invites, print cards' },
      { key: 'gifts', label: '8. Gifts & Return Favours', dot: '#E58E26', hint: 'Return gift hampers for guests' },
      { key: 'transport', label: '9. Transport & Logistics', dot: '#786FA6', hint: 'Material transport, cab rentals' },
      { key: 'contingency', label: '10. Emergency Contingency', dot: '#4B4B4B', hint: 'Unplanned expenses buffer' }
    ];

    let runningTotal = 0;

    categoriesConfig.forEach(cat => {
      const val = Number(expenses[cat.key]) || 0;
      runningTotal += val;
      const share = totalBudget > 0 ? ((val / totalBudget) * 100).toFixed(1) : 0;

      const row = document.createElement('div');
      row.className = 'budget-row';
      row.innerHTML = `
        <div class="budget-row-label">
          <span class="category-dot" style="background-color:${cat.dot};"></span>
          <div>
            <div>${cat.label}</div>
            <div style="font-size:0.72rem; color:var(--text-muted); font-weight:500;">${cat.hint}</div>
          </div>
        </div>
        <div class="budget-input-wrapper">
          <span class="currency-symbol">₹</span>
          <input type="number" class="budget-input full-budget-input" data-category="${cat.key}" value="${val}" min="0" step="100">
        </div>
        <div class="budget-row-share" id="share_${cat.key}">${share}%</div>
      `;
      fullBudgetCategoriesList.appendChild(row);
    });

    const remaining = totalBudget - runningTotal;

    budgetViewTotalCap.textContent = formatINR(totalBudget);
    budgetViewAllocated.textContent = formatINR(runningTotal);

    if (remaining > 0) {
      budgetViewRemaining.textContent = `+${formatINR(remaining)}`;
      budgetViewHealthBadge.className = 'health-badge healthy';
      budgetViewHealthBadge.textContent = `Under Budget (+${formatINR(remaining)})`;
      budgetWarningBox.innerHTML = `✅ You have <strong>${formatINR(remaining)}</strong> unallocated savings available.`;
    } else if (remaining === 0) {
      budgetViewRemaining.textContent = formatINR(0);
      budgetViewHealthBadge.className = 'health-badge healthy';
      budgetViewHealthBadge.textContent = '100% Balanced';
      budgetWarningBox.innerHTML = `🎯 Perfect alignment! Exactly 100% of your ₹ budget is allocated.`;
    } else {
      const over = Math.abs(remaining);
      budgetViewRemaining.textContent = `-${formatINR(over)}`;
      budgetViewHealthBadge.className = 'health-badge danger';
      budgetViewHealthBadge.textContent = `Over Budget (-${formatINR(over)})`;
      budgetWarningBox.innerHTML = `⚠️ <strong>Warning:</strong> Planned expenses exceed your budget cap by <strong>${formatINR(over)}</strong>. Click <strong>Optimize My Budget</strong> for instant savings!`;
    }

    // Venue note
    if (currentEvent.venueCostIncluded) {
      venueNoteText.textContent = `Commercial venue hire is factored into the budget (currently allocated: ${formatINR(expenses.venue || 0)}).`;
    } else {
      venueNoteText.textContent = `Venue is noted as complimentary or pre-booked separately (${currentEvent.venueCostNote || 'Indoor society hall / home'}). Commercial hall rent is not deducted from this allocation.`;
    }

    renderBudgetOptimizerTips(totalBudget, runningTotal, expenses);
  }

  function renderBudgetOptimizerTips(totalBudget, totalAllocated, expenses) {
    budgetOptimizerTips.innerHTML = '';
    const tips = [];

    if (totalAllocated > totalBudget) {
      const diff = totalAllocated - totalBudget;
      tips.push(`Cut decoration from ${formatINR(expenses.decoration || 0)} to ${formatINR((expenses.decoration || 0) - Math.min(diff, 1500))} by switching to DIY balloon arches.`);
      tips.push(`Switch from multi-course plated starters to standard Indian buffet to save approx ₹20-₹30 per plate.`);
      tips.push(`Share digital video invitations via WhatsApp instead of printed paper cards to save ₹1,000 immediately.`);
    } else {
      tips.push(`Consolidate catering & cake orders with local neighborhood bakeries to eliminate delivery surcharges.`);
      tips.push(`Procure fresh flowers directly from the local early morning mandi (wholesale market) for up to 60% savings on marigold and rajnigandha.`);
      tips.push(`Keep a minimum 5% to 10% contingency buffer (${formatINR(Math.round(totalBudget * 0.08))}) for day-of extras like bottled water and overtime vendor tips.`);
    }

    tips.forEach(t => {
      const li = document.createElement('li');
      li.className = 'optimizer-item';
      li.innerHTML = `<span>✂️</span><span>${t}</span>`;
      budgetOptimizerTips.appendChild(li);
    });
  }

  // =========================================================================
  // AI Budget-Saving Assistant ("Optimize My Budget" Modal)
  // =========================================================================
  function openBudgetOptimizerModal() {
    budgetOptimizerModal.classList.add('active');
    optimizationCardsContainer.innerHTML = '';

    const expenses = currentEvent.customExpenses || {};
    let totalPotential = 0;
    const cards = [];

    BUDGET_OPTIMIZATION_RULES.forEach(rule => {
      const currentCost = Number(expenses[rule.category]) || 0;
      if (currentCost >= rule.threshold) {
        const savingsAmount = Math.round(currentCost * rule.savingPct);
        const suggestedCost = currentCost - savingsAmount;
        totalPotential += savingsAmount;

        const isAccepted = acceptedOptimizations.has(rule.category);

        cards.push(`
          <div class="optimization-card ${isAccepted ? 'accepted' : ''}" data-cat="${rule.category}">
            <div class="opt-card-left">
              <div class="opt-card-meta">
                <span class="stage-badge" style="text-transform:uppercase;">${rule.category}</span>
                <span class="opt-saving-tag">Estimated Savings: ${formatINR(savingsAmount)}</span>
              </div>
              <h4 class="opt-card-title">${rule.title}</h4>
              <p class="opt-card-desc">${rule.impact}</p>
              <div class="opt-tradeoff-note">⚠️ Trade-off: ${rule.tradeOff}</div>
              <div style="font-size:0.8rem; margin-top:0.4rem; color:var(--soft-espresso);">
                Current: <strong>${formatINR(currentCost)}</strong> → Suggested: <strong style="color:var(--status-success);">${formatINR(suggestedCost)}</strong>
              </div>
            </div>
            <div class="opt-actions-group">
              ${isAccepted ? `
                <span style="font-size:0.8rem; font-weight:700; color:var(--status-success);">✓ Accepted</span>
                <button class="btn btn-ghost btn-sm btn-revert-opt" data-cat="${rule.category}" data-orig="${currentCost + savingsAmount}" style="font-size:0.75rem;">Revert</button>
              ` : `
                <button class="btn btn-primary btn-sm btn-accept-opt" data-cat="${rule.category}" data-newcost="${suggestedCost}" data-savings="${savingsAmount}">
                  Accept Savings
                </button>
                <button class="btn btn-ghost btn-sm btn-reject-opt" style="font-size:0.75rem;">Keep Current</button>
              `}
            </div>
          </div>
        `);
      }
    });

    optTotalPotentialSavings.textContent = `Potential Savings: ${formatINR(totalPotential)}`;
    
    if (cards.length === 0) {
      optimizationCardsContainer.innerHTML = `
        <div style="text-align:center; padding:2rem; color:var(--text-muted);">
          🎉 Your budget is already highly optimized! No oversized categories detected.
        </div>
      `;
    } else {
      optimizationCardsContainer.innerHTML = cards.join('');
    }
  }

  // =========================================================================
  // 6. Food & Catering Planner (with confirmed guest dynamic link)
  // =========================================================================
  function renderFoodPlanner() {
    foodMenuGrid.innerHTML = '';
    const guests = currentEvent.guestCount || 50;
    
    // Confirmed pax count
    const confirmedPax = (currentEvent.guests || [])
      .filter(g => g.status === 'Accepted')
      .reduce((sum, g) => sum + (Number(g.pax) || 1), 0);

    const effectiveGuests = confirmedPax > 0 ? confirmedPax : guests;
    const foodBudget = currentEvent.customExpenses?.food || Math.round(currentEvent.budget * 0.3);

    const perGuestEst = effectiveGuests > 0 ? Math.round(foodBudget / effectiveGuests) : 60;
    foodCostPerPlate.textContent = `₹${perGuestEst} / guest`;
    foodTotalEstimate.textContent = `${formatINR(foodBudget)} (${effectiveGuests} guests)`;

    const cakeCost = currentEvent.customExpenses?.cake || Math.round(currentEvent.budget * 0.12);
    foodCakeEstimate.textContent = `${formatINR(cakeCost)} (Custom Cake)`;

    const filterFn = (item) => {
      if (activeDietary === 'veg') return item.type === 'veg';
      if (activeDietary === 'jain') return item.type === 'veg' && !item.name.toLowerCase().includes('garlic') && !item.name.toLowerCase().includes('onion');
      return true;
    };

    const categories = [
      { title: 'Welcome Drinks & Mocktails', icon: '🍹', items: INDIAN_FOOD_DATABASE.welcomeDrinks.filter(filterFn) },
      { title: 'Starters & Finger Chaat', icon: '🥟', items: INDIAN_FOOD_DATABASE.starters.filter(filterFn) },
      { title: 'Main Course & Breads', icon: '🍛', items: INDIAN_FOOD_DATABASE.mainCourse.filter(filterFn) },
      { title: 'Traditional Sweets & Desserts', icon: '🍨', items: INDIAN_FOOD_DATABASE.desserts.filter(filterFn) }
    ];

    categories.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'menu-category-card';

      const itemsHtml = cat.items.map(it => `
        <div class="menu-item-row">
          <span class="menu-item-name">${escapeHtml(it.name)}</span>
          <span class="menu-item-price">Est. ₹${it.costPerGuest}/guest</span>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="menu-cat-title">
          <span>${cat.icon}</span>
          <span>${cat.title}</span>
        </div>
        <div>${itemsHtml || '<span style="font-size:0.8rem; color:var(--text-muted);">No items matching dietary selection.</span>'}</div>
      `;
      foodMenuGrid.appendChild(card);
    });
  }

  // =========================================================================
  // 7. Timeline & Tasks Planner
  // =========================================================================
  function renderTimeline() {
    timelineTasksContainer.innerHTML = '';
    eventDayRunOfShowContainer.innerHTML = '';

    const tasks = currentEvent.tasks || [];
    const completedCount = tasks.filter(t => t.completed).length;
    timelineProgressBadge.textContent = `${completedCount} of ${tasks.length} completed`;

    const filteredTasks = tasks.filter(t => {
      if (activeTaskFilter === 'completed') return t.completed;
      if (activeTaskFilter === 'pending') return !t.completed;
      return true;
    });

    if (filteredTasks.length === 0) {
      timelineTasksContainer.innerHTML = `<div style="font-size:0.84rem; color:var(--text-muted); padding:1rem 0;">No ${activeTaskFilter} tasks found.</div>`;
    } else {
      filteredTasks.forEach(task => {
        const row = document.createElement('div');
        row.className = `task-check-row ${task.completed ? 'completed' : ''}`;
        row.dataset.id = task.id;
        row.innerHTML = `
          <div class="task-check-left">
            <input type="checkbox" class="custom-checkbox task-item-checkbox" ${task.completed ? 'checked' : ''} aria-label="Toggle task">
            <span class="task-text-body">${escapeHtml(task.title)}</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <span class="stage-badge">${escapeHtml(task.stage)}</span>
            <button class="btn btn-ghost btn-sm btn-delete-task" style="padding:0.2rem 0.4rem; color:var(--status-error);" title="Delete task">✕</button>
          </div>
        `;
        timelineTasksContainer.appendChild(row);
      });
    }

    const typeMeta = EVENT_TYPES[currentEvent.type] || EVENT_TYPES.birthday;
    const runOfShow = typeMeta.defaultRunOfShow || [];

    runOfShow.forEach(item => {
      const showCard = document.createElement('div');
      showCard.className = 'run-of-show-item';
      showCard.innerHTML = `
        <div class="show-time">${item.time}</div>
        <div class="show-info">
          <h5>${escapeHtml(item.label)}</h5>
          <p>${escapeHtml(item.detail)}</p>
        </div>
      `;
      eventDayRunOfShowContainer.appendChild(showCard);
    });
  }

  // =========================================================================
  // 8. Smart RSVP & Guest Management
  // =========================================================================
  function renderGuests() {
    guestTableBody.innerHTML = '';
    const guests = currentEvent.guests || [];

    // Calculate Counts
    let invitedPax = 0;
    let confirmedPax = 0;
    let pendingPax = 0;
    let declinedPax = 0;

    guests.forEach(g => {
      const p = Number(g.pax) || 1;
      invitedPax += p;
      if (g.status === 'Accepted') confirmedPax += p;
      else if (g.status === 'Declined') declinedPax += p;
      else pendingPax += p;
    });

    guestStatInvited.textContent = invitedPax;
    guestStatConfirmed.textContent = confirmedPax;
    guestStatPending.textContent = pendingPax;
    guestStatDeclined.textContent = declinedPax;

    sideBadgeGuests.textContent = `${confirmedPax} Confirmed`;

    // Catering Recalculation Impact
    const currentFoodBudget = currentEvent.customExpenses?.food || 3000;
    const baseGuests = currentEvent.guestCount || 50;
    const perPlate = baseGuests > 0 ? Math.round(currentFoodBudget / baseGuests) : 60;
    const adjustedCateringCost = confirmedPax * perPlate;
    const diff = currentFoodBudget - adjustedCateringCost;

    if (confirmedPax > 0 && confirmedPax !== baseGuests) {
      cateringImpactText.innerHTML = `Catering dynamically recalibrated for <strong>${confirmedPax} confirmed guests</strong> at ${formatINR(perPlate)}/plate = <strong>${formatINR(adjustedCateringCost)}</strong> (differs by ${diff >= 0 ? '-' : '+'}${formatINR(Math.abs(diff))} from original ₹${currentFoodBudget} estimate).`;
    } else {
      cateringImpactText.innerHTML = `All ${invitedPax} invited guests tracked. Confirmed attendees: <strong>${confirmedPax}</strong>. Click 'Apply to Catering Budget' to synchronize.`;
    }

    // Shareable RSVP URL string
    const slug = currentEvent.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    shareableRsvpUrl.textContent = `https://eventease.ai/rsvp#${slug}`;

    // Render Table Rows
    guests.forEach(g => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${escapeHtml(g.name)}</strong></td>
        <td>${escapeHtml(g.phone || '-')}</td>
        <td><span class="stage-badge">${g.pax} Pax</span></td>
        <td>
          <span class="rsvp-status-badge ${g.status}">${g.status}</span>
        </td>
        <td><span class="stage-badge" style="background:#F0FDF4; color:#166534;">${g.dietary || 'Veg'}</span></td>
        <td>${g.inviteSent ? '✅ Sent' : '⏳ Pending'}</td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(g.notes || '-')}</td>
        <td>
          <button class="btn btn-ghost btn-sm btn-edit-guest" data-id="${g.id}">✏️</button>
          <button class="btn btn-ghost btn-sm btn-delete-guest" data-id="${g.id}" style="color:#C62828;">✕</button>
        </td>
      `;
      guestTableBody.appendChild(tr);
    });
  }

  // =========================================================================
  // 9. Vendor Checklist Planner
  // =========================================================================
  function renderVendors() {
    vendorTableBody.innerHTML = '';
    const list = currentEvent.vendorChecklist || [];
    let runningTotal = 0;

    list.forEach(v => {
      runningTotal += Number(v.estPrice) || 0;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${escapeHtml(v.name)}</strong></td>
        <td><span class="stage-badge">${escapeHtml(v.category)}</span></td>
        <td>${escapeHtml(v.quantity || '1')}</td>
        <td><strong>${formatINR(v.estPrice)}</strong></td>
        <td><span class="priority-chip ${v.priority}">${v.priority}</span></td>
        <td>
          <select class="status-dropdown vendor-status-select" data-id="${v.id}">
            <option value="Not Started" ${v.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
            <option value="Inquiry" ${v.status === 'Inquiry' ? 'selected' : ''}>In Inquiry</option>
            <option value="Booked" ${v.status === 'Booked' ? 'selected' : ''}>Booked</option>
            <option value="Procured" ${v.status === 'Procured' ? 'selected' : ''}>Procured</option>
          </select>
        </td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(v.notes || '-')}</td>
        <td>
          <button class="btn btn-ghost btn-sm btn-delete-vendor" data-id="${v.id}" style="color:#C62828;">✕</button>
        </td>
      `;
      vendorTableBody.appendChild(tr);
    });

    vendorProcurementTotal.textContent = `Total Estimated: ${formatINR(runningTotal)}`;
  }

  // =========================================================================
  // 10. Multilingual AI Invitations
  // =========================================================================
  function renderInvitations() {
    const langData = INVITATION_TEMPLATES[activeInviteLang] || INVITATION_TEMPLATES.english;
    const templateFn = langData[activeInviteTone] || langData.elegant;

    const slug = currentEvent.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const rsvpLink = `https://eventease.ai/rsvp#${slug}`;

    const dataObj = {
      name: currentEvent.name,
      date: formatDateReadable(currentEvent.date),
      time: currentEvent.time || '06:00 PM',
      location: currentEvent.location || 'Venue details inside',
      theme: currentEvent.theme || 'Elegant celebration',
      host: inviteHostInput.value.trim() || 'The Host Family',
      rsvpLink: rsvpLink
    };

    const text = templateFn(dataObj);
    invitationPreviewText.textContent = text;
    previewLangBadge.textContent = `${activeInviteLang.toUpperCase()} • ${activeInviteTone.toUpperCase()}`;
  }

  // =========================================================================
  // 11. Gifts, Activities & Eco-Friendly Guide
  // =========================================================================
  function renderGiftsAndActivities() {
    activitiesGrid.innerHTML = '';
    const eventType = currentEvent.type || 'birthday';
    const actList = INDIAN_ACTIVITIES_DATABASE[eventType] || INDIAN_ACTIVITIES_DATABASE.birthday;

    actList.forEach(act => {
      const card = document.createElement('div');
      card.className = 'theme-card';
      card.innerHTML = `
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <span class="priority-chip Low">${act.duration}</span>
            <span style="font-size:0.82rem; font-weight:800; color:var(--dusty-pink);">${act.isFree ? 'FREE' : formatINR(act.cost)}</span>
          </div>
          <h4 class="theme-title" style="font-size:1.1rem;">${escapeHtml(act.name)}</h4>
          <p style="font-size:0.82rem; color:var(--text-dark); line-height:1.45;">${escapeHtml(act.desc)}</p>
        </div>
      `;
      activitiesGrid.appendChild(card);
    });

    giftsGrid.innerHTML = '';
    INDIAN_GIFT_SUGGESTIONS.forEach(tier => {
      const card = document.createElement('div');
      card.className = 'theme-card';

      const itemsHtml = tier.items.map(it => `
        <div style="padding:0.4rem 0; border-bottom:1px dashed rgba(41,38,43,0.08); font-size:0.82rem;">
          <div style="font-weight:700; color:var(--text-dark);">${escapeHtml(it.title)}</div>
          <div style="display:flex; justify-content:space-between; color:var(--text-muted); font-size:0.75rem;">
            <span>${it.occasion}</span>
            <span style="color:var(--dusty-pink); font-weight:700;">${formatINR(it.estPrice)}</span>
          </div>
        </div>
      `).join('');

      card.innerHTML = `
        <div>
          <h4 class="theme-title" style="font-size:1.05rem; color:var(--dusty-pink);">${tier.tier}</h4>
          <div>${itemsHtml}</div>
        </div>
      `;
      giftsGrid.appendChild(card);
    });

    ecoTipsGrid.innerHTML = '';
    ECO_FRIENDLY_TIPS.forEach(tip => {
      const card = document.createElement('div');
      card.className = 'metric-card';
      card.innerHTML = `
        <div style="font-size:1.75rem; margin-bottom:0.4rem;">${tip.icon}</div>
        <div style="font-size:0.95rem; font-weight:800; color:var(--text-dark); margin-bottom:0.3rem;">${tip.title}</div>
        <p style="font-size:0.8rem; color:var(--text-dark); line-height:1.45;">${tip.desc}</p>
      `;
      ecoTipsGrid.appendChild(card);
    });
  }

  // =========================================================================
  // 12. Event-Day Emergency Assistant
  // =========================================================================
  function renderEmergencyAssistant() {
    const playbook = EMERGENCY_PLAYBOOKS[activeCrisisId] || EMERGENCY_PLAYBOOKS.vendor_late;

    crisisPlaybookCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem; border-bottom:1px solid var(--border-subtle); padding-bottom:0.75rem;">
        <div>
          <span class="health-badge ${playbook.urgency === 'Critical' ? 'danger' : 'warning'}" style="margin-bottom:0.4rem;">
            Urgency: ${playbook.urgency}
          </span>
          <h3 style="font-size:1.3rem; font-weight:800; color:var(--text-dark);">${playbook.icon} ${escapeHtml(playbook.title)}</h3>
          <p style="font-size:0.85rem; color:var(--text-muted);">${escapeHtml(playbook.summary)}</p>
        </div>
      </div>

      <div class="crisis-quick-fix-box">
        <strong>⚡ 5-Minute Quick Fix:</strong><br>
        ${escapeHtml(playbook.quickFix)}
      </div>

      <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:0.75rem;">Immediate Action Checklist:</h4>
      <ul class="crisis-steps-list">
        ${playbook.actionSteps.map((step, i) => `
          <li class="crisis-step-item">
            <span class="crisis-step-number">${i + 1}</span>
            <span>${escapeHtml(step)}</span>
          </li>
        `).join('')}
      </ul>

      <div style="margin-top:1.25rem; padding-top:0.85rem; border-top:1px dashed var(--border-subtle); font-size:0.8rem; color:var(--text-muted);">
        Context: Tailored for <strong>${escapeHtml(currentEvent.name)}</strong> at <strong>${escapeHtml(currentEvent.location)}</strong>. Emergency Contingency Reserve: <strong>${formatINR(currentEvent.customExpenses?.contingency || 1000)}</strong>.
      </div>
    `;
  }

  function handleEmergencyCustomAsk(question) {
    if (!question || !question.trim()) return;

    emergencyCustomOutput.style.display = 'block';
    emergencyCustomOutput.innerHTML = '<em>EventEase AI is analyzing your emergency scenario... 🚨</em>';

    setTimeout(() => {
      const q = question.toLowerCase();
      let answer = '';

      if (q.includes('speaker') || q.includes('sound') || q.includes('mic')) {
        answer = `<strong>🚨 Sound System Emergency:</strong><br>
        1. Switch Bluetooth speaker to AUX cable mode (eliminates Bluetooth interference).<br>
        2. Test secondary mobile phone or host car's high-output sound system if parked nearby.<br>
        3. Dispatch helper to nearest neighborhood electronics shop for a ₹600 high-wattage Bluetooth party cylinder.`;
      } else if (q.includes('rain') || q.includes('water')) {
        answer = `<strong>🌧️ Rain Contingency:</strong><br>
        1. Shift cake table and elderly guests immediately to covered veranda or hall.<br>
        2. Place rubber doormats at entrance to prevent slipping on tiles.<br>
        3. Request hall supervisor for 2 industrial pedestal fans to circulate humid air.`;
      } else {
        answer = `<strong>🚨 Emergency Guidance for ${escapeHtml(currentEvent.name)}:</strong><br>
        1. <strong>Keep Calm & Maintain Hospitality:</strong> Guests take their cues from the host. As long as welcome drinks are in hand, minor mishaps go unnoticed.<br>
        2. <strong>Deploy Contingency Reserve:</strong> You have <strong>${formatINR(currentEvent.customExpenses?.contingency || 1000)}</strong> unallocated buffer for emergency store runs.<br>
        3. <strong>Delegate:</strong> Appoint one reliable cousin or friend to handle vendor calls while you remain in the celebration circle.`;
      }

      emergencyCustomOutput.innerHTML = answer;
    }, 450);
  }

  // =========================================================================
  // 13. Complete Dossier Export Plan
  // =========================================================================
  function renderDossierExport() {
    const totalBudget = Number(currentEvent.budget) || 0;
    const expenses = currentEvent.customExpenses || {};
    const totalAllocated = Object.values(expenses).reduce((a, b) => a + Number(b), 0);

    const tasks = currentEvent.tasks || [];
    const guests = currentEvent.guests || [];
    const confirmedPax = guests.filter(g => g.status === 'Accepted').reduce((a, g) => a + Number(g.pax), 0);
    const vendors = currentEvent.vendorChecklist || [];
    const typeMeta = EVENT_TYPES[currentEvent.type] || EVENT_TYPES.birthday;

    dossierContent.innerHTML = `
      <div style="margin-bottom:1.5rem; border-bottom:2px solid var(--dusty-pink); padding-bottom:1rem;">
        <h2 style="font-size:1.8rem; font-weight:800; color:var(--text-dark);">${escapeHtml(currentEvent.name)}</h2>
        <div style="font-size:0.9rem; color:var(--text-muted); margin-top:0.25rem;">
          Event Type: <strong>${typeMeta.label}</strong> | Date: <strong>${formatDateReadable(currentEvent.date)} (${currentEvent.time || '06:00 PM'})</strong>
        </div>
        <div style="font-size:0.9rem; color:var(--text-muted); margin-top:0.25rem;">
          Venue: <strong>${escapeHtml(currentEvent.location)}</strong> | Invited: <strong>${currentEvent.guestCount}</strong> | Confirmed RSVP: <strong style="color:#10B981;">${confirmedPax} Guests</strong>
        </div>
      </div>

      <!-- Budget Section -->
      <div style="margin-bottom:1.75rem;">
        <h3 style="font-size:1.15rem; font-weight:800; color:var(--charcoal-sidebar); border-bottom:1px solid #EEE; padding-bottom:0.4rem; margin-bottom:0.75rem;">
          1. Financial Plan & Budget Allocation (₹)
        </h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
          Total Planned Cap: <strong>${formatINR(totalBudget)}</strong> | Allocated Expenses: <strong>${formatINR(totalAllocated)}</strong> | Balance: <strong>${formatINR(totalBudget - totalAllocated)}</strong>
        </p>
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr style="background:#FCEEF3; text-align:left;">
              <th style="padding:0.4rem 0.6rem;">Expense Category</th>
              <th style="padding:0.4rem 0.6rem; text-align:right;">Estimated Amount</th>
              <th style="padding:0.4rem 0.6rem; text-align:right;">% Share</th>
            </tr>
          </thead>
          <tbody>
            ${Object.keys(expenses).map(k => `
              <tr style="border-bottom:1px solid #EEE;">
                <td style="padding:0.4rem 0.6rem; text-transform:capitalize;">${k}</td>
                <td style="padding:0.4rem 0.6rem; text-align:right;"><strong>${formatINR(expenses[k])}</strong></td>
                <td style="padding:0.4rem 0.6rem; text-align:right;">${totalBudget > 0 ? ((expenses[k]/totalBudget)*100).toFixed(1) : 0}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Guest RSVP Roster -->
      <div style="margin-bottom:1.75rem;">
        <h3 style="font-size:1.15rem; font-weight:800; color:var(--charcoal-sidebar); border-bottom:1px solid #EEE; padding-bottom:0.4rem; margin-bottom:0.75rem;">
          2. Guest RSVP & Attendance Summary
        </h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.5rem;">
          Confirmed Attendees: <strong>${confirmedPax}</strong> | Dietary Requirements: Pure Veg, Jain & Special Requests recorded.
        </p>
      </div>

      <!-- Selected Theme & Decor -->
      <div style="margin-bottom:1.75rem;">
        <h3 style="font-size:1.15rem; font-weight:800; color:var(--charcoal-sidebar); border-bottom:1px solid #EEE; padding-bottom:0.4rem; margin-bottom:0.75rem;">
          3. Theme & Decoration Concepts
        </h3>
        <p style="font-size:0.88rem; line-height:1.5;">
          <strong>Aesthetic Theme:</strong> ${escapeHtml(currentEvent.theme || 'Elegant Blush & Gold')}<br>
          <strong>Style & Atmosphere:</strong> Designed specifically for ${escapeHtml(currentEvent.location)} with warm ambient lighting and photo-friendly backdrops.
        </p>
      </div>

      <!-- Preparation Timeline -->
      <div style="margin-bottom:1.75rem;">
        <h3 style="font-size:1.15rem; font-weight:800; color:var(--charcoal-sidebar); border-bottom:1px solid #EEE; padding-bottom:0.4rem; margin-bottom:0.75rem;">
          4. Preparation Milestones & Tasks
        </h3>
        <ul style="font-size:0.85rem; line-height:1.6; padding-left:1.25rem;">
          ${tasks.map(t => `
            <li>[${t.completed ? 'COMPLETED' : 'PENDING'}] (${t.stage.toUpperCase()}) ${escapeHtml(t.title)}</li>
          `).join('')}
        </ul>
      </div>

      <!-- Vendor Checklist -->
      <div style="margin-bottom:1.75rem;">
        <h3 style="font-size:1.15rem; font-weight:800; color:var(--charcoal-sidebar); border-bottom:1px solid #EEE; padding-bottom:0.4rem; margin-bottom:0.75rem;">
          5. Vendor & Procurement Roster
        </h3>
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr style="background:#FCEEF3; text-align:left;">
              <th style="padding:0.4rem 0.6rem;">Service / Item</th>
              <th style="padding:0.4rem 0.6rem;">Scale</th>
              <th style="padding:0.4rem 0.6rem;">Priority</th>
              <th style="padding:0.4rem 0.6rem;">Booking Status</th>
              <th style="padding:0.4rem 0.6rem; text-align:right;">Estimated (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${vendors.map(v => `
              <tr style="border-bottom:1px solid #EEE;">
                <td style="padding:0.4rem 0.6rem;"><strong>${escapeHtml(v.name)}</strong></td>
                <td style="padding:0.4rem 0.6rem;">${escapeHtml(v.quantity || '1')}</td>
                <td style="padding:0.4rem 0.6rem;">${v.priority}</td>
                <td style="padding:0.4rem 0.6rem;">${v.status}</td>
                <td style="padding:0.4rem 0.6rem; text-align:right;">${formatINR(v.estPrice)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Invitation Message Draft -->
      <div style="margin-bottom:1.75rem; background:#FFF5F8; padding:1.25rem; border-radius:12px; border:1px dashed var(--dusty-pink);">
        <h3 style="font-size:1.1rem; font-weight:800; color:var(--dusty-pink); margin-bottom:0.5rem;">
          6. Official Multilingual Invitation
        </h3>
        <div style="white-space:pre-line; font-size:0.88rem; line-height:1.6; color:var(--text-dark);">
          ${escapeHtml(invitationPreviewText.textContent || 'Invitation details inside')}
        </div>
      </div>

      <!-- Contingency & Emergency Safeguards -->
      <div>
        <h3 style="font-size:1.15rem; font-weight:800; color:var(--charcoal-sidebar); border-bottom:1px solid #EEE; padding-bottom:0.4rem; margin-bottom:0.75rem;">
          7. Contingency & Emergency Safeguards
        </h3>
        <p style="font-size:0.85rem; color:var(--text-dark); line-height:1.5;">
          • An unencumbered contingency reserve of <strong>${formatINR(expenses.contingency || 1000)}</strong> is maintained.<br>
          • Event-day emergency protocols available for late vendors, cake damage, and unexpected guest surges.<br>
          • 100% digital invitations deployed via WhatsApp to minimize paper waste.
        </p>
      </div>
    `;
  }

  // =========================================================================
  // 14. Ask EventEase AI Conversational Logic
  // =========================================================================
  async function handleChatSubmission(query) {
    if (!query || !query.trim()) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = query;
    chatMessagesContainer.appendChild(userBubble);
    chatInput.value = '';
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble assistant';
    typingBubble.innerHTML = '<em>EventEase AI is thinking... ✨</em>';
    chatMessagesContainer.appendChild(typingBubble);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    if (geminiApiKey && geminiApiKey.trim().length > 10) {
      try {
        const responseText = await callLiveGeminiAi(query);
        typingBubble.innerHTML = formatMarkdownToHtml(responseText);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        return;
      } catch (err) {
        console.error('Gemini API call failed, falling back to heuristic engine:', err);
      }
    }

    setTimeout(() => {
      const heuristicResponse = generateHeuristicResponse(query);
      typingBubble.innerHTML = formatMarkdownToHtml(heuristicResponse);
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }, 600);
  }

  async function callLiveGeminiAi(userPrompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(geminiApiKey)}`;
    
    const contextPrompt = `
You are EventEase AI, an intelligent event planner assistant for Indian celebrations.
Active Event Context:
- Celebration: ${currentEvent.name}
- Type: ${currentEvent.type}
- Planned Budget: ${formatINR(currentEvent.budget)}
- Guest Count: ${currentEvent.guestCount}
- Location: ${currentEvent.location}
- Theme: ${currentEvent.theme}
- Dietary: ${currentEvent.dietary || 'Vegetarian'}
- Allocated Expenses: ${JSON.stringify(currentEvent.customExpenses)}

Answer user questions practically with realistic Indian Rupee (₹) prices, actionable advice, and warm Indian celebration context. Keep answers concise, formatted in markdown with bullet points.
`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: contextPrompt + "\n\nUser Question: " + userPrompt }
          ]
        }
      ]
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I was unable to generate a live response. Please check your API key.";
  }

  function generateHeuristicResponse(q) {
    const query = q.toLowerCase();
    const budget = currentEvent.budget;
    const guests = currentEvent.guestCount;

    if (query.includes('under ₹10,000') || query.includes('under 10000') || query.includes('theme under')) {
      return `### 🌸 Recommended Theme Under ₹10,000:
**"Elegant Blush & Gold Royal Glam"** fits your celebration perfectly!

**Cost Breakdown:**
- **Balloon & Fairy Light Arch:** ₹1,800 - ₹2,200 (120 metallic blush & gold balloons)
- **Fairy Light Curtain:** ₹400 (reusable 3x3m warm white)
- **Acrylic Welcome Sign Easel:** ₹300
- **Total Decor Cost:** ~₹2,500 (leaving ₹7,500 for food, cake, and buffer!)

*Click "Optimize My Budget" in the Budget Planner to fine-tune allocations!*`;
    }

    if (query.includes('indoor hall') || query.includes('50 guests') || query.includes('decorate an indoor')) {
      return `### 🎈 Decorating an Indoor Hall for 50 Guests:
1. **Focus on One Focal Stage:** Create a 6.5ft circular balloon & flower moongate where the cake cutting or ceremony occurs. This is where 90% of your photos are taken.
2. **Warm Fairy Light Wall:** Drape sheer white chiffon with vertical rice lights behind the stage to cover blank hall walls.
3. **Table Centerpieces:** Use recycled glass jars with floating candles and fresh rajnigandha / marigold sprigs (approx ₹20/table).
4. **Entrance Toran:** A simple marigold or pastel paper streamer welcome arch sets a celebratory mood as guests walk in.`;
    }

    if (query.includes('reduce') || query.includes('save') || query.includes('2,000') || query.includes('2000')) {
      return `### ✂️ How to Reduce Your Decoration Budget by ₹2,000:
1. **DIY Balloon Arch:** Buying balloons & strip tape online costs ₹400 vs ₹2,500 for a commercial decorator (Saves ₹2,100).
2. **Fresh Flower Mandi:** Buy loose marigolds or baby's breath at the morning wholesale market instead of a florist (Saves ₹800).
3. **Use Existing Hall Features:** Avoid renting backdrop trussing; string fairy lights directly on the venue hooks.`;
    }

    if (query.includes('vegetarian menu') || query.includes('affordable veg') || query.includes('food')) {
      return `### 🍲 Affordable Pure Vegetarian Menu (₹60 - ₹80/guest):
- **Welcome Drink:** Chilled Rose Sharbat or Aam Panna (₹15/glass)
- **Starters:** Crispy Cocktail Samosas & Mint Chutney (₹20/plate)
- **Main Course:** Paneer Butter Masala, Dal Makhani, Jeera Rice, and Butter Naan basket (₹45/plate)
- **Dessert:** Warm Angoori Gulab Jamun (₹20/portion)
**Total Catering for 50 guests:** Approx ₹3,000 - ₹3,500.`;
    }

    if (query.includes('three days') || query.includes('3 days') || query.includes('before the event')) {
      return `### ⏱️ Key Checklist 3 Days Before the Celebration:
1. **Confirm RSVP Headcount:** Check the **Guests & RSVP** tab for final confirmed counts to avoid catering waste.
2. **Bakery Reconfirmation:** Verify delivery time and customized lettering with the cake designer.
3. **Sound & Playlist Check:** Finalize your mobile playlist and test the Bluetooth party speaker.
4. **Return Gift Assembly:** Pack return favors and sweet boxes in gift bags.`;
    }

    if (query.includes('marathi') || query.includes('मराठी')) {
      return `### 🚩 सस्नेह निमंत्रण (Marathi Invitation):

॥ श्री गणेशाय नमः ॥ 🙏

आमच्या येथे **${currentEvent.name}** चे शुभकार्य आयोजित केले आहे. या आनंदोत्सवास आपली उपस्थिती प्रार्थनीय आहे.

📅 **दिनांक:** ${formatDateReadable(currentEvent.date)}
⏰ **वेळ:** ${currentEvent.time || 'सायंकाळी ६:३० वाजता'}
📍 **स्थळ:** ${currentEvent.location}

कृपया उपस्थिती नोंदवावी: https://eventease.ai/rsvp#${currentEvent.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}

*आपले नम्र,*
**${inviteHostInput.value || 'समस्त परिवार'}**`;
    }

    if (query.includes('alternatives to expensive') || query.includes('cheaper floral') || query.includes('floral')) {
      return `### 🌿 Affordable Alternatives to Costly Imported Flowers:
1. **Local Marigolds (Genda Phool):** Vibrant, fragrant, auspicious, and costs only ₹40-₹60 per kg at wholesale.
2. **Rajnigandha (Tuberose) Strings:** Elegant white vertical strings with incredible fragrance at 1/5th the price of imported lilies.
3. **Dry Eucalyptus & Gypsophila (Baby's Breath):** Chic modern aesthetic that lasts throughout the event without wilting.
4. **Paper Flowers & Bunting:** Handcrafted crepe paper pom-poms create a colorful garden look for under ₹300.`;
    }

    return `Thank you for your question! Based on your active celebration (**${currentEvent.name}** with a budget of **${formatINR(budget)}** for **${guests} guests** at **${currentEvent.location}**):

- You can manage confirmed attendees in the **Guests & RSVP** tab.
- Click **Optimize My Budget** in the Budget Planner for AI savings suggestions.
- Access the **Event-Day Assistant** in the sidebar for immediate crisis playbooks.`;
  }

  function formatMarkdownToHtml(markdown) {
    if (!markdown) return '';
    let html = markdown
      .replace(/^### (.*$)/gim, '<h4 style="font-size:0.95rem; font-weight:800; margin:0.4rem 0;">$1</h4>')
      .replace(/^## (.*$)/gim, '<h3 style="font-size:1.05rem; font-weight:800; margin:0.5rem 0;">$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/^\s*-\s*(.*$)/gim, '<li style="margin-left:1rem; margin-bottom:0.25rem;">$1</li>')
      .replace(/^\s*\d+\.\s*(.*$)/gim, '<li style="margin-left:1rem; margin-bottom:0.25rem;">$1</li>')
      .replace(/\n\n/gim, '<br><br>');

    return html;
  }

  // =========================================================================
  // 15. Event Setup & User Actions Handlers
  // =========================================================================
  function setupEventHandlers() {
    
    // Landing Page Navigation & Action Buttons
    btnLandingStartPlanning?.addEventListener('click', () => showDashboard('dashboard'));
    btnHeroStartPlanning?.addEventListener('click', () => showDashboard('dashboard'));
    btnCtaStartPlanning?.addEventListener('click', () => showDashboard('dashboard'));
    btnMobileLandingStartPlanning?.addEventListener('click', () => showDashboard('dashboard'));
    btnLandingOpenDashboard?.addEventListener('click', () => showDashboard('dashboard'));
    btnMobileLandingOpenDashboard?.addEventListener('click', () => showDashboard('dashboard'));
    btnCtaOpenDashboard?.addEventListener('click', () => showDashboard('dashboard'));
    btnLandingResumeEvent?.addEventListener('click', () => showDashboard('dashboard'));

    // Return to Landing Page from Dashboard
    btnHeaderReturnHome?.addEventListener('click', () => showLandingPage());
    btnSidebarReturnHome?.addEventListener('click', () => showLandingPage());
    landingBrandLogo?.addEventListener('click', (e) => {
      e.preventDefault();
      showLandingPage();
    });

    // Mobile Hamburger Menu on Landing Page
    landingMobileToggle?.addEventListener('click', () => {
      if (landingMobileMenu) landingMobileMenu.classList.toggle('active');
    });

    // Category Card Buttons Delegation ("Plan This Event")
    document.querySelectorAll('.btn-plan-category, .footer-plan-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = btn.dataset.category || 'wedding';
        showDashboard('dashboard', cat);
      });
    });

    // Smooth Scrolling for Landing Page Anchor Links
    document.querySelectorAll('.landing-nav-link, .mobile-nav-link, a[href^="#landing"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#landing')) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            if (landingMobileMenu) landingMobileMenu.classList.remove('active');
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // View Switcher (Sidebar Nav Links)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const viewId = link.dataset.view;
        switchView(viewId);
        if (window.innerWidth <= 860) {
          appSidebar.classList.remove('mobile-open');
        }
      });
    });

    mobileMenuToggle.addEventListener('click', () => {
      appSidebar.classList.toggle('mobile-open');
    });

    // Preset Selector Change
    quickPresetSelector.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      const found = allEvents.find(ev => ev.id === selectedId);
      if (found) {
        currentEvent = found;
        saveState();
        renderAll();
        showToast(`Loaded ${found.name}!`);
      }
    });

    // Dashboard Jump Buttons
    btnJumpToTheme.addEventListener('click', () => switchView('theme-studio'));
    btnNavToBudget.addEventListener('click', () => switchView('budget'));
    btnNavToTimeline.addEventListener('click', () => switchView('timeline'));
    btnEditCurrentEvent.addEventListener('click', () => openPlanWizard(true));

    // Theme Studio Tab Switcher
    tabThemeRecs.addEventListener('click', () => {
      tabThemeRecs.classList.add('active');
      tabVisualMoodBoard.classList.remove('active');
      subviewThemeRecs.style.display = 'block';
      subviewVisualMoodBoard.style.display = 'none';
      activeThemeTab = 'recs';
    });

    tabVisualMoodBoard.addEventListener('click', () => {
      tabVisualMoodBoard.classList.add('active');
      tabThemeRecs.classList.remove('active');
      subviewThemeRecs.style.display = 'none';
      subviewVisualMoodBoard.style.display = 'block';
      activeThemeTab = 'moodboard';
      renderVisualMoodBoard();
    });

    // Theme Actions Delegation (Choose, Affordable, Show More)
    themeCardsGrid.addEventListener('click', (e) => {
      const chooseBtn = e.target.closest('.btn-apply-theme');
      if (chooseBtn) {
        const themeTitle = chooseBtn.dataset.theme;
        const cost = Number(chooseBtn.dataset.cost) || 2500;
        currentEvent.theme = themeTitle;
        currentEvent.customExpenses = currentEvent.customExpenses || {};
        currentEvent.customExpenses.decoration = cost;
        saveState();
        renderAll();
        showToast(`Selected "${themeTitle}" theme!`);
        return;
      }

      const affordBtn = e.target.closest('.btn-affordable-theme');
      if (affordBtn) {
        const themeTitle = affordBtn.dataset.theme;
        const newCost = Number(affordBtn.dataset.cost) || 1600;
        currentEvent.theme = themeTitle;
        currentEvent.customExpenses = currentEvent.customExpenses || {};
        currentEvent.customExpenses.decoration = newCost;
        saveState();
        renderAll();
        showToast(`Applied affordable DIY modifications to "${themeTitle}" (Decor: ${formatINR(newCost)})!`);
        return;
      }

      const moreBtn = e.target.closest('.btn-show-more-theme');
      if (moreBtn) {
        showToast('Generated additional styling concepts & materials in Visual Mood Board!');
        tabVisualMoodBoard.click();
      }
    });

    // Budget Planner: Live Input Changes
    fullBudgetCategoriesList.addEventListener('input', (e) => {
      const input = e.target.closest('.full-budget-input');
      if (input) {
        const catKey = input.dataset.category;
        const val = Number(input.value) || 0;
        currentEvent.customExpenses = currentEvent.customExpenses || {};
        currentEvent.customExpenses[catKey] = val;
        saveState();
        renderDashboard();
        renderBudgetPlanner();
        renderDossierExport();
      }
    });

    // Budget Auto-Balance Button
    btnAutoBalanceBudget.addEventListener('click', autoBalanceBudgetRatios);
    btnResetDefaultRatios.addEventListener('click', autoBalanceBudgetRatios);

    // AI Budget-Saving Assistant Trigger
    btnOpenBudgetOptimizer.addEventListener('click', openBudgetOptimizerModal);
    btnCloseOptimizerModal.addEventListener('click', () => budgetOptimizerModal.classList.remove('active'));

    // Optimizer Delegation (Accept / Reject)
    optimizationCardsContainer.addEventListener('click', (e) => {
      const acceptBtn = e.target.closest('.btn-accept-opt');
      if (acceptBtn) {
        const cat = acceptBtn.dataset.cat;
        const newCost = Number(acceptBtn.dataset.newcost) || 0;
        const savings = Number(acceptBtn.dataset.savings) || 0;

        currentEvent.customExpenses = currentEvent.customExpenses || {};
        currentEvent.customExpenses[cat] = newCost;
        acceptedOptimizations.add(cat);
        saveState();

        renderDashboard();
        renderBudgetPlanner();
        renderDossierExport();
        openBudgetOptimizerModal();
        showToast(`Saved ${formatINR(savings)} on ${cat}! Total budget updated.`);
        return;
      }

      const revertBtn = e.target.closest('.btn-revert-opt');
      if (revertBtn) {
        const cat = revertBtn.dataset.cat;
        const origCost = Number(revertBtn.dataset.orig) || 0;
        currentEvent.customExpenses[cat] = origCost;
        acceptedOptimizations.delete(cat);
        saveState();
        renderDashboard();
        renderBudgetPlanner();
        renderDossierExport();
        openBudgetOptimizerModal();
        showToast(`Reverted ${cat} allocation to ${formatINR(origCost)}.`);
      }
    });

    // Food Planner: Dietary Pills
    dietaryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        dietaryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeDietary = pill.dataset.diet;
        currentEvent.dietary = activeDietary;
        saveState();
        renderFoodPlanner();
      });
    });

    // Guest Management Actions
    btnOpenAddGuestModal.addEventListener('click', () => openGuestModal(null));
    btnCloseGuestModal.addEventListener('click', () => guestModal.classList.remove('active'));
    btnCancelGuestModal.addEventListener('click', () => guestModal.classList.remove('active'));

    guestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveGuestFromModal();
    });

    // Guest Table Edit / Delete Delegation
    guestTableBody.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.btn-edit-guest');
      if (editBtn) {
        const id = editBtn.dataset.id;
        const guest = (currentEvent.guests || []).find(g => g.id === id);
        if (guest) openGuestModal(guest);
        return;
      }

      const delBtn = e.target.closest('.btn-delete-guest');
      if (delBtn) {
        const id = delBtn.dataset.id;
        currentEvent.guests = (currentEvent.guests || []).filter(g => g.id !== id);
        saveState();
        renderGuests();
        renderDashboard();
        renderSidebarInfo();
        renderDossierExport();
        showToast('Guest removed from roster.');
      }
    });

    // Sync Confirmed to Catering Budget
    btnSyncConfirmedToCatering.addEventListener('click', () => {
      const guests = currentEvent.guests || [];
      const confirmedPax = guests
        .filter(g => g.status === 'Accepted')
        .reduce((sum, g) => sum + (Number(g.pax) || 1), 0);

      if (confirmedPax === 0) {
        showToast('No accepted guests yet to sync.');
        return;
      }

      const baseGuests = currentEvent.guestCount || 50;
      const currentFood = currentEvent.customExpenses?.food || 3000;
      const perPlate = baseGuests > 0 ? Math.round(currentFood / baseGuests) : 60;
      const newFoodCost = confirmedPax * perPlate;

      currentEvent.customExpenses.food = newFoodCost;
      saveState();
      renderDashboard();
      renderBudgetPlanner();
      renderFoodPlanner();
      renderGuests();
      renderDossierExport();
      showToast(`Catering adjusted to ${formatINR(newFoodCost)} for ${confirmedPax} confirmed attendees!`);
    });

    // Share RSVP Modal
    btnOpenShareRsvpModal.addEventListener('click', () => {
      rsvpShareEventName.textContent = currentEvent.name;
      rsvpShareEventDate.textContent = `${formatDateReadable(currentEvent.date)} • ${currentEvent.time || '06:00 PM'} • ${currentEvent.location}`;
      rsvpShareModal.classList.add('active');
    });

    btnSimulateRsvp.addEventListener('click', () => {
      rsvpShareEventName.textContent = currentEvent.name;
      rsvpShareEventDate.textContent = `${formatDateReadable(currentEvent.date)} • ${currentEvent.time || '06:00 PM'} • ${currentEvent.location}`;
      rsvpShareModal.classList.add('active');
    });

    btnCloseRsvpShareModal.addEventListener('click', () => rsvpShareModal.classList.remove('active'));

    btnCopyRsvpLink.addEventListener('click', () => {
      const url = shareableRsvpUrl.textContent;
      navigator.clipboard.writeText(url).then(() => {
        showToast('Shareable RSVP Link copied to clipboard! 📋');
      }).catch(() => {
        showToast('Link copied!');
      });
    });

    // RSVP Simulation Form
    rsvpSimulationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = simGuestName.value.trim();
      const response = rsvpSimulationForm.querySelector('input[name="simRsvpResponse"]:checked').value;
      const pax = Number(simGuestPax.value) || 2;
      const diet = simGuestDietary.value;

      if (!name) return;

      const newGuest = {
        id: 'g_' + Date.now(),
        name: name,
        phone: '+91 (Online RSVP)',
        pax: pax,
        status: response,
        dietary: diet,
        inviteSent: true,
        notes: 'Submitted via Online RSVP Link'
      };

      currentEvent.guests = currentEvent.guests || [];
      currentEvent.guests.push(newGuest);
      saveState();

      simGuestName.value = '';
      rsvpShareModal.classList.remove('active');
      renderGuests();
      renderDashboard();
      renderSidebarInfo();
      renderDossierExport();
      showToast(`RSVP Recorded: ${name} (${response} - ${pax} Pax)! 🎉`);
    });

    // Event-Day Emergency Assistant Handlers
    emergencySituationChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.emergency-chip');
      if (chip) {
        emergencySituationChips.querySelectorAll('.emergency-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCrisisId = chip.dataset.crisis;
        renderEmergencyAssistant();
      }
    });

    emergencyAskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = emergencyCustomInput.value.trim();
      handleEmergencyCustomAsk(val);
    });

    // Timeline Tasks Checklist Delegation
    timelineTasksContainer.addEventListener('click', (e) => {
      const check = e.target.closest('.task-item-checkbox');
      if (check) {
        const row = check.closest('.task-check-row');
        const taskId = row.dataset.id;
        const t = (currentEvent.tasks || []).find(item => item.id === taskId);
        if (t) {
          t.completed = check.checked;
          saveState();
          renderDashboard();
          renderTimeline();
          renderSidebarInfo();
          showToast(t.completed ? 'Task marked complete! 🎉' : 'Task pending.');
        }
        return;
      }

      const delBtn = e.target.closest('.btn-delete-task');
      if (delBtn) {
        const row = delBtn.closest('.task-check-row');
        const taskId = row.dataset.id;
        currentEvent.tasks = (currentEvent.tasks || []).filter(item => item.id !== taskId);
        saveState();
        renderDashboard();
        renderTimeline();
        renderSidebarInfo();
        showToast('Task removed.');
      }
    });

    // Quick Task Checkbox on Dashboard Delegation
    dashUpcomingTasksList.addEventListener('click', (e) => {
      const check = e.target.closest('.quick-task-check');
      if (check) {
        const taskId = check.dataset.id;
        const t = (currentEvent.tasks || []).find(item => item.id === taskId);
        if (t) {
          t.completed = check.checked;
          saveState();
          renderDashboard();
          renderTimeline();
          renderSidebarInfo();
          showToast(t.completed ? 'Task marked complete!' : 'Task pending.');
        }
      }
    });

    // Filter Task Buttons
    filterTaskBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterTaskBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTaskFilter = btn.dataset.filter;
        renderTimeline();
      });
    });

    // Add Custom Task Form
    formAddCustomTask.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = inputNewTaskTitle.value.trim();
      const stage = selectNewTaskStage.value;
      if (!title) return;

      const newTask = {
        id: 'task_' + Date.now(),
        title: title,
        stage: stage,
        category: 'Custom',
        completed: false,
        dependsOn: 'None'
      };

      currentEvent.tasks = currentEvent.tasks || [];
      currentEvent.tasks.push(newTask);
      saveState();
      inputNewTaskTitle.value = '';
      renderDashboard();
      renderTimeline();
      renderSidebarInfo();
      showToast('Custom task added to checklist!');
    });

    // Vendor Checklist Form Toggle
    btnToggleAddVendorForm.addEventListener('click', () => {
      addVendorForm.style.display = addVendorForm.style.display === 'none' ? 'block' : 'none';
    });

    btnCancelVendorForm.addEventListener('click', () => {
      addVendorForm.style.display = 'none';
    });

    addVendorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = newVendorName.value.trim();
      const cat = newVendorCategory.value;
      const price = Number(newVendorPrice.value) || 0;
      const priority = newVendorPriority.value;

      if (!name) return;

      const newV = {
        id: 'v_' + Date.now(),
        name: name,
        category: cat,
        quantity: '1 Unit',
        estPrice: price,
        priority: priority,
        status: 'Inquiry',
        notes: ''
      };

      currentEvent.vendorChecklist = currentEvent.vendorChecklist || [];
      currentEvent.vendorChecklist.push(newV);
      saveState();

      newVendorName.value = '';
      newVendorPrice.value = '';
      addVendorForm.style.display = 'none';

      renderVendors();
      renderDossierExport();
      showToast('Vendor item added to checklist!');
    });

    // Vendor Table Status & Delete Delegation
    vendorTableBody.addEventListener('change', (e) => {
      const select = e.target.closest('.vendor-status-select');
      if (select) {
        const id = select.dataset.id;
        const v = (currentEvent.vendorChecklist || []).find(item => item.id === id);
        if (v) {
          v.status = select.value;
          saveState();
          showToast(`Status updated to ${select.value}`);
        }
      }
    });

    vendorTableBody.addEventListener('click', (e) => {
      const del = e.target.closest('.btn-delete-vendor');
      if (del) {
        const id = del.dataset.id;
        currentEvent.vendorChecklist = (currentEvent.vendorChecklist || []).filter(item => item.id !== id);
        saveState();
        renderVendors();
        renderDossierExport();
        showToast('Vendor removed.');
      }
    });

    // Invitations: Language Tabs
    inviteLanguageSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn) {
        inviteLanguageSelector.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeInviteLang = btn.dataset.lang;
        renderInvitations();
      }
    });

    // Invitations: Tone Switcher
    inviteToneSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn) {
        inviteToneSelector.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeInviteTone = btn.dataset.tone;
        renderInvitations();
      }
    });

    inviteHostInput.addEventListener('input', () => {
      renderInvitations();
    });

    btnCopyInviteText.addEventListener('click', () => {
      const text = invitationPreviewText.textContent;
      navigator.clipboard.writeText(text).then(() => {
        showToast('Invitation copied to clipboard! 📋');
      }).catch(() => {
        showToast('Press Ctrl+C to copy text.');
      });
    });

    btnShareWhatsApp.addEventListener('click', () => {
      const text = encodeURIComponent(invitationPreviewText.textContent);
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    });

    btnPrintDossier.addEventListener('click', () => {
      window.print();
    });

    // Chat Assistant Form
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = chatInput.value.trim();
      handleChatSubmission(q);
    });

    promptPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const query = pill.dataset.query;
        handleChatSubmission(query);
      });
    });

    // API Key Modal
    btnOpenApiKeyModal.addEventListener('click', () => {
      inputGeminiApiKey.value = geminiApiKey;
      apiKeyModal.classList.add('active');
    });

    btnConfigureAiKey.addEventListener('click', () => {
      inputGeminiApiKey.value = geminiApiKey;
      apiKeyModal.classList.add('active');
    });

    btnCloseApiKeyModal.addEventListener('click', () => {
      apiKeyModal.classList.remove('active');
    });

    btnSaveApiKey.addEventListener('click', () => {
      const key = inputGeminiApiKey.value.trim();
      geminiApiKey = key;
      localStorage.setItem('eventease_gemini_api_key', key);
      updateAiStatusIndicator();
      apiKeyModal.classList.remove('active');
      showToast(key ? 'Google Gemini AI Connected!' : 'Cleared API Key. Using Demo Mode.');
    });

    btnClearApiKey.addEventListener('click', () => {
      geminiApiKey = '';
      inputGeminiApiKey.value = '';
      localStorage.removeItem('eventease_gemini_api_key');
      updateAiStatusIndicator();
      apiKeyModal.classList.remove('active');
      showToast('Switched back to Demo Mode.');
    });

    // Plan an Event Wizard
    btnOpenPlanWizard.addEventListener('click', () => openPlanWizard(false));
    btnWizardCancel.addEventListener('click', () => wizardModal.classList.remove('active'));

    btnWizardNext.addEventListener('click', () => {
      if (validateWizardStep(wizardCurrentStep)) {
        setWizardStep(wizardCurrentStep + 1);
      }
    });

    btnWizardPrev.addEventListener('click', () => {
      setWizardStep(wizardCurrentStep - 1);
    });

    btnWizardSkip.addEventListener('click', () => {
      setWizardStep(4);
    });

    wizEventType.addEventListener('change', () => {
      updateWizardTypeSpecificQuestion();
    });

    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      createOrUpdateEventFromWizard();
    });
  }

  // =========================================================================
  // Guest Modal Logic
  // =========================================================================
  function openGuestModal(existingGuest) {
    guestModal.classList.add('active');
    if (existingGuest) {
      guestModalTitle.textContent = 'Edit Guest Details';
      guestEditId.value = existingGuest.id;
      guestInputName.value = existingGuest.name;
      guestInputPhone.value = existingGuest.phone || '';
      guestInputPax.value = existingGuest.pax || 2;
      guestSelectStatus.value = existingGuest.status || 'Accepted';
      guestSelectDietary.value = existingGuest.dietary || 'Veg';
      guestInputNotes.value = existingGuest.notes || '';
    } else {
      guestModalTitle.textContent = 'Add Guest / Group';
      guestEditId.value = '';
      guestInputName.value = '';
      guestInputPhone.value = '';
      guestInputPax.value = '2';
      guestSelectStatus.value = 'Accepted';
      guestSelectDietary.value = 'Veg';
      guestInputNotes.value = '';
    }
  }

  function saveGuestFromModal() {
    const name = guestInputName.value.trim();
    const phone = guestInputPhone.value.trim();
    const pax = Number(guestInputPax.value) || 2;
    const status = guestSelectStatus.value;
    const diet = guestSelectDietary.value;
    const notes = guestInputNotes.value.trim();
    const id = guestEditId.value;

    if (!name) return;

    currentEvent.guests = currentEvent.guests || [];

    if (id) {
      const g = currentEvent.guests.find(item => item.id === id);
      if (g) {
        g.name = name;
        g.phone = phone;
        g.pax = pax;
        g.status = status;
        g.dietary = diet;
        g.notes = notes;
      }
    } else {
      currentEvent.guests.push({
        id: 'g_' + Date.now(),
        name: name,
        phone: phone,
        pax: pax,
        status: status,
        dietary: diet,
        inviteSent: false,
        notes: notes
      });
    }

    saveState();
    guestModal.classList.remove('active');
    renderGuests();
    renderDashboard();
    renderSidebarInfo();
    renderDossierExport();
    showToast(`Saved guest: ${name}`);
  }

  // =========================================================================
  // View Switcher
  // =========================================================================
  function switchView(viewId) {
    activeView = viewId;

    viewSections.forEach(sec => {
      sec.classList.remove('active');
      if (sec.id === `view-${viewId}`) {
        sec.classList.add('active');
      }
    });

    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.dataset.view === viewId) {
        l.classList.add('active');
      }
    });

    const titles = {
      'dashboard': 'Dashboard Overview',
      'my-events': 'My Saved Celebrations',
      'theme-studio': 'AI Theme Studio & Inspiration',
      'budget': 'AI Budget Planner & Optimizer (₹)',
      'food': 'AI Food & Catering Planner',
      'timeline': 'Event Timeline & Interactive Tasks',
      'guests': 'Smart Guest & RSVP Management',
      'vendors': 'Vendor & Shopping Checklist',
      'invitations': 'Multilingual AI Invitations',
      'gifts-activities': 'Celebration Activities & Gift Ideas',
      'emergency': 'Event-Day Emergency Assistant',
      'assistant': 'Ask EventEase AI Assistant',
      'export': 'Complete Event Plan Dossier'
    };

    pageTitle.textContent = titles[viewId] || 'EventEase AI';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // Auto-Balance Budget Ratios
  // =========================================================================
  function autoBalanceBudgetRatios() {
    const total = Number(currentEvent.budget) || 10000;
    const typeMeta = EVENT_TYPES[currentEvent.type] || EVENT_TYPES.birthday;
    const r = typeMeta.budgetRatios;

    const exp = {
      venue: Math.round(total * r.venue),
      decoration: Math.round(total * r.decoration),
      food: Math.round(total * r.food),
      cake: Math.round(total * r.cake),
      photography: Math.round(total * r.photography),
      entertainment: Math.round(total * r.entertainment),
      invitations: Math.round(total * r.invitations),
      gifts: Math.round(total * r.gifts),
      transport: Math.round(total * r.transport),
      contingency: Math.round(total * r.contingency)
    };

    const sum = Object.values(exp).reduce((a, b) => a + b, 0);
    const diff = total - sum;
    exp.contingency += diff;

    currentEvent.customExpenses = exp;
    saveState();
    renderDashboard();
    renderBudgetPlanner();
    renderDossierExport();
    showToast(`Auto-balanced allocations for ${typeMeta.label} in ₹!`);
  }

  // =========================================================================
  // Questionnaire Wizard Logic
  // =========================================================================
  function openPlanWizard(isEditMode = false, preselectedType = null) {
    wizardModal.classList.add('active');
    setWizardStep(1);

    if (isEditMode && currentEvent) {
      document.getElementById('wizardTitle').textContent = 'Edit Celebration Details';
      wizEventName.value = currentEvent.name || '';
      wizEventType.value = currentEvent.type || 'birthday';
      wizEventDate.value = currentEvent.date || '';
      wizEventTime.value = currentEvent.time || '18:00';
      wizBudget.value = currentEvent.budget || 10000;
      wizGuests.value = currentEvent.guestCount || 50;
      wizLocation.value = currentEvent.location || '';
      wizColors.value = currentEvent.theme || 'Blush Pink & Gold';
      wizDietary.value = currentEvent.dietary || 'veg';
      wizPriority.value = currentEvent.priorities || 'decoration';
    } else {
      document.getElementById('wizardTitle').textContent = 'Plan an Event';
      const type = preselectedType || 'birthday';
      wizEventType.value = type;

      const titleMap = {
        wedding: "Priya & Rohan's Wedding & Sangeet",
        birthday: "Aarav's Milestone Birthday Party",
        college: "InnovateX Campus Fest & Farewell",
        corporate: "Annual Leadership Gala & Awards",
        engagement: "Karan & Rhea's Ring Ceremony",
        baby_shower: "Godh Bharai & Baby Shower",
        anniversary: "Silver Jubilee 25th Anniversary",
        community: "Society Cultural Festival & Milan"
      };

      const budgetMap = {
        wedding: 250000,
        birthday: 10000,
        college: 85000,
        corporate: 100000,
        engagement: 75000,
        baby_shower: 25000,
        anniversary: 50000,
        community: 45000
      };

      const guestsMap = {
        wedding: 150,
        birthday: 50,
        college: 250,
        corporate: 100,
        engagement: 80,
        baby_shower: 40,
        anniversary: 60,
        community: 120
      };

      const locationMap = {
        wedding: "Shanti Lawns & Banquets, Pune",
        birthday: "Greenwood Society Indoor Hall, Pune",
        college: "Main Campus Auditorium & Innovation Hall",
        corporate: "Grand Hyatt Ballroom & Conference Hall",
        engagement: "Emerald Banquet Hall, Mumbai",
        baby_shower: "Family Courtyard & Living Terrace",
        anniversary: "The Olive Garden Banquet, Bengaluru",
        community: "Society Central Courtyard & Amphitheatre"
      };

      wizEventName.value = titleMap[type] || "My Celebration";
      wizEventDate.value = new Date().toISOString().split('T')[0];
      wizEventTime.value = '18:00';
      wizBudget.value = budgetMap[type] || 10000;
      wizGuests.value = guestsMap[type] || 50;
      wizVenueType.value = type === 'college' ? 'College Campus' : (type === 'wedding' ? 'Hotel' : 'Indoor Hall');
      wizVenueIncluded.value = type === 'wedding' ? 'yes' : 'no';
      wizLocation.value = locationMap[type] || "Greenwood Society Hall, Pune";
      wizColors.value = type === 'wedding' ? 'Royal Gold & Marigold Yellow' : 'Blush Pink & Gold';
      wizCustomTheme.value = '';
      wizDietary.value = 'veg';
      wizPriority.value = type === 'wedding' ? 'food' : 'decoration';
      wizNotes.value = '';
    }

    updateWizardTypeSpecificQuestion();
  }

  function setWizardStep(step) {
    wizardCurrentStep = step;

    for (let i = 1; i <= 4; i++) {
      const pane = document.getElementById(`wizardStep${i}`);
      const dot = document.getElementById(`dot${i}`);
      if (pane && dot) {
        pane.style.display = i === step ? 'block' : 'none';
        dot.className = `step-dot ${i === step ? 'active' : ''}`;
      }
    }

    const subtitles = {
      1: 'Step 1 of 4: Celebration Fundamentals',
      2: 'Step 2 of 4: Scale, Venue & Budget (₹)',
      3: 'Step 3 of 4: Style, Aesthetics & Theme',
      4: 'Step 4 of 4: Dietary & Priorities'
    };
    wizardStepSub.textContent = subtitles[step];

    btnWizardPrev.style.display = step > 1 ? 'inline-flex' : 'none';
    btnWizardNext.style.display = step < 4 ? 'inline-flex' : 'none';
    btnWizardSubmit.style.display = step === 4 ? 'inline-flex' : 'none';
  }

  function validateWizardStep(step) {
    if (step === 1) {
      if (!wizEventName.value.trim()) {
        showToast('Please enter an event title.');
        wizEventName.focus();
        return false;
      }
      if (!wizEventDate.value) {
        showToast('Please select an event date.');
        wizEventDate.focus();
        return false;
      }
    }
    if (step === 2) {
      if (!wizBudget.value || Number(wizBudget.value) < 500) {
        showToast('Please enter a realistic budget in ₹ (min ₹500).');
        wizBudget.focus();
        return false;
      }
      if (!wizGuests.value || Number(wizGuests.value) < 1) {
        showToast('Please enter the number of guests.');
        wizGuests.focus();
        return false;
      }
    }
    return true;
  }

  function updateWizardTypeSpecificQuestion() {
    const type = wizEventType.value;
    if (type === 'birthday') {
      wizTypeSpecificLabel.textContent = 'Age or Milestone (e.g. 1st / 25th / 50th)';
      wizTypeSpecificInput.placeholder = 'Turning 1st / 18th / 50th';
    } else if (type === 'wedding') {
      wizTypeSpecificLabel.textContent = 'Ceremony Type (e.g. Sangeet / Reception / Haldi)';
      wizTypeSpecificInput.placeholder = 'Sangeet & Ring Ceremony';
    } else if (type === 'college') {
      wizTypeSpecificLabel.textContent = 'Department or Fest Track (e.g. Tech / Cultural)';
      wizTypeSpecificInput.placeholder = 'Hackathon & Battle of Bands';
    } else {
      wizTypeSpecificLabel.textContent = 'Special Ceremony / Tradition';
      wizTypeSpecificInput.placeholder = 'Pooja / Lamp Lighting / Cake';
    }
  }

  function createOrUpdateEventFromWizard() {
    const type = wizEventType.value;
    const typeMeta = EVENT_TYPES[type] || EVENT_TYPES.birthday;
    const totalBudget = Number(wizBudget.value) || 10000;
    const guests = Number(wizGuests.value) || 50;

    const r = typeMeta.budgetRatios;
    let baseDecorRatio = r.decoration;
    let baseFoodRatio = r.food;

    if (wizPriority.value === 'decoration') {
      baseDecorRatio += 0.05;
      baseFoodRatio -= 0.05;
    } else if (wizPriority.value === 'food') {
      baseFoodRatio += 0.06;
      baseDecorRatio -= 0.06;
    }

    const isVenueIncluded = wizVenueIncluded.value === 'yes';
    const venueCost = isVenueIncluded ? Math.round(totalBudget * 0.2) : 0;
    const remainingForOthers = totalBudget - venueCost;

    const expenses = {
      venue: venueCost,
      decoration: Math.round(remainingForOthers * baseDecorRatio),
      food: Math.round(remainingForOthers * baseFoodRatio),
      cake: Math.round(remainingForOthers * r.cake),
      photography: Math.round(remainingForOthers * r.photography),
      entertainment: Math.round(remainingForOthers * r.entertainment),
      invitations: Math.round(remainingForOthers * r.invitations),
      gifts: Math.round(remainingForOthers * r.gifts),
      transport: Math.round(remainingForOthers * r.transport),
      contingency: Math.round(remainingForOthers * r.contingency)
    };

    const currentSum = Object.values(expenses).reduce((a, b) => a + b, 0);
    expenses.contingency += (totalBudget - currentSum);

    const themeCatalog = INDIAN_THEME_CATALOG[type] || INDIAN_THEME_CATALOG.birthday;
    const chosenTheme = wizCustomTheme.value.trim() || themeCatalog[0].title;

    const newEvent = {
      id: 'event_' + Date.now(),
      name: wizEventName.value.trim() || 'My Celebration',
      type: type,
      date: wizEventDate.value,
      time: wizEventTime.value || '18:00',
      budget: totalBudget,
      guestCount: guests,
      venueType: wizVenueType.value,
      venueCostIncluded: isVenueIncluded,
      venueCostNote: isVenueIncluded ? 'Commercial venue rental included in budget' : 'Venue rental excluded from allocation',
      location: wizLocation.value.trim() || 'Indoor Hall, Pune',
      style: wizStyle.value,
      colors: wizColors.value,
      theme: chosenTheme,
      dietary: wizDietary.value,
      priorities: wizPriority.value,
      notes: wizNotes.value.trim(),
      customExpenses: expenses,
      tasks: JSON.parse(JSON.stringify(typeMeta.defaultChecklist)),
      vendorChecklist: [
        { id: 'v_1', name: 'Stage & Theme Decorator', category: 'Decor', quantity: '1 Setup', estPrice: expenses.decoration, priority: 'High', status: 'Inquiry', notes: chosenTheme },
        { id: 'v_2', name: 'Caterer / Halwai Services', category: 'Food', quantity: `${guests} Guests`, estPrice: expenses.food, priority: 'High', status: 'Inquiry', notes: `${wizDietary.value.toUpperCase()} menu` },
        { id: 'v_3', name: 'Custom Celebration Cake Designer', category: 'Cake', quantity: '1.5 kg', estPrice: expenses.cake, priority: 'Medium', status: 'Inquiry', notes: 'Theme customized' },
        { id: 'v_4', name: 'Event Photographer', category: 'Photography', quantity: '3 Hours', estPrice: expenses.photography, priority: 'Medium', status: 'Inquiry', notes: 'Portraits & candid shots' }
      ],
      guests: [
        { id: 'g_1', name: 'Family & Relatives Circle', phone: '+91 98220 11223', pax: Math.round(guests * 0.4), status: 'Accepted', dietary: 'Veg', inviteSent: true, notes: 'Immediate family' },
        { id: 'g_2', name: 'Close Friends & Colleagues', phone: '+91 98901 23456', pax: Math.round(guests * 0.35), status: 'Accepted', dietary: 'Veg', inviteSent: true, notes: 'Confirmed on WhatsApp' },
        { id: 'g_3', name: 'Neighbors & Society Members', phone: '+91 94220 87654', pax: Math.round(guests * 0.15), status: 'Pending', dietary: 'Veg', inviteSent: true, notes: 'Awaiting confirmation' }
      ]
    };

    allEvents.unshift(newEvent);
    currentEvent = newEvent;
    saveState();

    wizardModal.classList.remove('active');
    renderAll();
    switchView('dashboard');
    showToast(`🎉 Generated complete plan for "${newEvent.name}" in ₹!`);
  }

  // =========================================================================
  // Kickstart on DOM Load
  // =========================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
