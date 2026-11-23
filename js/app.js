// ==========================================================================
// TOEFL PREPARATION: LOGIKA APLIKASI
// Penerapan prinsip Unslop: tenang, presisi, minim distraksi
// ==========================================================================

const AppState = {
  currentTab: 'dashboard',
  drillFilter: 'all',
  drillIndex: 0,
  
  // Exam state
  examActive: false,
  examCurrentIndex: 0,
  examAnswers: {},
  examTimeRemaining: 30 * 60,
  examTimerInterval: null,
  examCompleted: false,
  examReviewFilter: 'all',

  // Audio state
  isAudioPlaying: false,
  audioUtterance: null,
  audioSpeed: 0.95,
  activePlayingId: null,

  // Theme
  isDark: false
};

// ==========================================================================
// INISIALISASI
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupNavigation();
  setupSpeechVoices();
  renderDashboard();
  renderCheatSheets();
  renderVocabularyList();
  renderDrillSection();
  loadSavedExamHistory();
});

function initTheme() {
  const savedTheme = localStorage.getItem('toefl_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    AppState.isDark = true;
    document.documentElement.classList.add('dark');
  } else {
    AppState.isDark = false;
    document.documentElement.classList.remove('dark');
  }

  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      AppState.isDark = !AppState.isDark;
      if (AppState.isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('toefl_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('toefl_theme', 'light');
      }
      updateThemeIcon();
    });
    updateThemeIcon();
  }
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  icon.className = AppState.isDark ? 'fa-regular fa-sun text-slate-400 text-sm' : 'fa-regular fa-moon text-slate-600 text-sm';
}

let selectedEnglishVoice = null;
function setupSpeechVoices() {
  if ('speechSynthesis' in window) {
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      selectedEnglishVoice = 
        voices.find(v => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Guy'))) ||
        voices.find(v => v.lang === 'en-US') ||
        voices.find(v => v.lang.startsWith('en'));
    };
    pickVoice();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = pickVoice;
    }
  }
}

function playAudioQuestion(questionId, containerId, onEnd) {
  const q = TOEFL_DATA.questions.find(item => item.id === questionId);
  if (!q || !q.audioText) return;
  playAudioText(q.audioText, containerId, onEnd);
}

function playAudioText(text, containerId, onEnd) {
  if (!('speechSynthesis' in window)) {
    alert('Browser tidak mendukung sintesis suara teks.');
    return;
  }

  if (AppState.isAudioPlaying && AppState.activePlayingId === containerId) {
    stopAudio();
    return;
  }

  stopAudio();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = AppState.audioSpeed;
  if (selectedEnglishVoice) utterance.voice = selectedEnglishVoice;

  const visualizer = document.getElementById(`audio-visualizer-${containerId}`);
  const playBtnText = document.getElementById(`audio-play-text-${containerId}`);
  const playBtnIcon = document.getElementById(`audio-play-icon-${containerId}`);

  utterance.onstart = () => {
    AppState.isAudioPlaying = true;
    AppState.activePlayingId = containerId;
    if (visualizer) visualizer.classList.add('playing');
    if (playBtnIcon) playBtnIcon.className = 'fa-solid fa-pause text-xs mr-2 text-slate-600 dark:text-slate-300';
    if (playBtnText) playBtnText.innerText = 'Hentikan Audio';
  };

  utterance.onend = () => {
    resetAudioUI(containerId);
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    resetAudioUI(containerId);
  };

  AppState.audioUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function stopAudio() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (AppState.activePlayingId) {
    resetAudioUI(AppState.activePlayingId);
  }
  AppState.isAudioPlaying = false;
  AppState.activePlayingId = null;
}

function resetAudioUI(containerId) {
  AppState.isAudioPlaying = false;
  AppState.activePlayingId = null;
  const visualizer = document.getElementById(`audio-visualizer-${containerId}`);
  const playBtnIcon = document.getElementById(`audio-play-icon-${containerId}`);
  const playBtnText = document.getElementById(`audio-play-text-${containerId}`);
  if (visualizer) visualizer.classList.remove('playing');
  if (playBtnIcon) playBtnIcon.className = 'fa-solid fa-play text-xs mr-2 text-slate-600 dark:text-slate-300';
  if (playBtnText) playBtnText.innerText = 'Dengarkan Audio';
}

function speakWord(word) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(word);
  utt.lang = 'en-US';
  utt.rate = 0.9;
  if (selectedEnglishVoice) utt.voice = selectedEnglishVoice;
  window.speechSynthesis.speak(utt);
}

// ==========================================================================
// NAVIGASI
// ==========================================================================
function setupNavigation() {
  const navButtons = document.querySelectorAll('[data-target-tab]');
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-target-tab');
      switchTab(target);
    });
  });

  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function switchTab(tabId) {
  stopAudio();
  AppState.currentTab = tabId;

  const views = ['dashboard', 'cheatsheet', 'drill', 'exam', 'result'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.classList.add('hidden');
  });

  const targetEl = document.getElementById(`view-${tabId}`);
  if (targetEl) targetEl.classList.remove('hidden');

  document.querySelectorAll('[data-target-tab]').forEach(btn => {
    if (btn.getAttribute('data-target-tab') === tabId) {
      btn.className = 'px-3 py-1.5 text-xs font-medium rounded text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 transition-colors';
    } else {
      btn.className = 'px-3 py-1.5 text-xs font-medium rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors';
    }
  });

  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ==========================================================================
// 1. DASHBOARD VIEW
// ==========================================================================
function renderDashboard() {
  const totalQuestions = TOEFL_DATA.questions.length;
  const listeningCount = TOEFL_DATA.questions.filter(q => q.section === 'listening').length;
  const structureCount = TOEFL_DATA.questions.filter(q => q.section.includes('structure') || q.section.includes('written')).length;
  const readingCount = TOEFL_DATA.questions.filter(q => q.section === 'reading').length;

  const summaryEl = document.getElementById('dashboard-stats');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="border border-slate-200 dark:border-slate-800 p-4 rounded-lg bg-white dark:bg-slate-900">
          <div class="text-2xl font-mono font-medium text-slate-900 dark:text-slate-100 tabular-nums">${totalQuestions}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">Total bank soal</div>
        </div>
        <div class="border border-slate-200 dark:border-slate-800 p-4 rounded-lg bg-white dark:bg-slate-900">
          <div class="text-2xl font-mono font-medium text-slate-900 dark:text-slate-100 tabular-nums">${listeningCount}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">Listening Comprehension</div>
        </div>
        <div class="border border-slate-200 dark:border-slate-800 p-4 rounded-lg bg-white dark:bg-slate-900">
          <div class="text-2xl font-mono font-medium text-slate-900 dark:text-slate-100 tabular-nums">${structureCount}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">Structure & Expression</div>
        </div>
        <div class="border border-slate-200 dark:border-slate-800 p-4 rounded-lg bg-white dark:bg-slate-900">
          <div class="text-2xl font-mono font-medium text-slate-900 dark:text-slate-100 tabular-nums">${readingCount}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">Reading Comprehension</div>
        </div>
      </div>
    `;
  }
}

// ==========================================================================
// 2. CHEATSHEET VIEW
// ==========================================================================
function renderCheatSheets() {
  const listeningContainer = document.getElementById('listening-cheats');
  if (listeningContainer) {
    listeningContainer.innerHTML = TOEFL_DATA.cheatSheets.listening.map(item => `
      <div class="border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-medium text-sm text-slate-900 dark:text-slate-100">${item.title}</h4>
          <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
            ${item.badge}
          </span>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">${item.desc}</p>
        ${item.example ? `
          <div class="bg-slate-50 dark:bg-slate-800/70 p-3 rounded text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
            <div class="font-mono text-slate-700 dark:text-slate-300 whitespace-pre-line">${item.example.dialogue}</div>
            ${item.example.trap ? `<div class="text-slate-500 dark:text-slate-400">Pengecoh: ${item.example.trap}</div>` : ''}
            <div class="text-blue-700 dark:text-blue-400">Kunci: ${item.example.tip}</div>
          </div>
        ` : ''}
        ${item.rules ? `
          <ul class="text-xs space-y-1.5 mt-2 bg-slate-50 dark:bg-slate-800/70 p-3 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            ${item.rules.map(r => `<li>${r}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('');
  }

  const structureContainer = document.getElementById('structure-cheats');
  if (structureContainer) {
    structureContainer.innerHTML = TOEFL_DATA.cheatSheets.structure.map(item => `
      <div class="border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-medium text-sm text-slate-900 dark:text-slate-100">${item.title}</h4>
          <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
            ${item.badge}
          </span>
        </div>
        <div class="text-xs text-slate-500 dark:text-slate-400 mb-2">${item.summary}</div>
        <div class="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">${item.explanation}</div>
      </div>
    `).join('');
  }

  const readingContainer = document.getElementById('reading-cheats');
  if (readingContainer) {
    readingContainer.innerHTML = TOEFL_DATA.cheatSheets.reading.map(item => `
      <div class="border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-medium text-sm text-slate-900 dark:text-slate-100">${item.title}</h4>
          <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
            ${item.badge}
          </span>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">${item.desc}</p>
        ${item.rules ? `
          <ul class="text-xs space-y-1 bg-slate-50 dark:bg-slate-800/70 p-3 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            ${item.rules.map(r => `<li>• ${r}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('');
  }
}

function renderVocabularyList() {
  const vocabContainer = document.getElementById('vocabulary-container');
  if (!vocabContainer) return;

  const searchInput = document.getElementById('vocab-search');
  const renderList = (filter = '') => {
    const list = TOEFL_DATA.cheatSheets.vocabulary.filter(v => 
      v.word.toLowerCase().includes(filter.toLowerCase()) || 
      v.meaning.toLowerCase().includes(filter.toLowerCase()) ||
      v.synonym.toLowerCase().includes(filter.toLowerCase())
    );

    if (list.length === 0) {
      vocabContainer.innerHTML = `<div class="col-span-full py-6 text-center text-xs text-slate-400">Tidak ada kosakata yang cocok.</div>`;
      return;
    }

    vocabContainer.innerHTML = list.map(v => `
      <div class="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-1.5">
              ${v.word}
              <button onclick="speakWord('${v.word}')" title="Dengarkan pengucapan" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs p-1">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </span>
            <span class="text-[10px] font-mono text-slate-400 uppercase">${v.pos}</span>
          </div>
          <div class="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">${v.meaning}</div>
          <div class="text-[11px] text-slate-500">Sinonim: ${v.synonym}</div>
        </div>
        <div class="mt-2 text-[11px] text-slate-500 italic bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-100 dark:border-slate-800">
          "${v.example}"
        </div>
      </div>
    `).join('');
  };

  renderList();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderList(e.target.value.trim());
    });
  }
}

// ==========================================================================
// 3. DRILL MODE
// ==========================================================================
function renderDrillSection() {
  const container = document.getElementById('drill-card-container');
  if (!container) return;

  const filteredQuestions = TOEFL_DATA.questions.filter(q => {
    if (AppState.drillFilter === 'all') return true;
    if (AppState.drillFilter === 'listening') return q.section === 'listening';
    if (AppState.drillFilter === 'structure') return q.section.includes('structure') || q.section.includes('written');
    if (AppState.drillFilter === 'reading') return q.section === 'reading';
    return true;
  });

  if (AppState.drillIndex >= filteredQuestions.length) {
    AppState.drillIndex = 0;
  }

  const q = filteredQuestions[AppState.drillIndex];
  if (!q) {
    container.innerHTML = `<div class="p-6 text-center text-xs text-slate-400">Tidak ada soal dalam kategori ini.</div>`;
    return;
  }

  const counterEl = document.getElementById('drill-counter');
  if (counterEl) {
    counterEl.innerText = `Soal ${AppState.drillIndex + 1} dari ${filteredQuestions.length}`;
  }

  let audioSectionHtml = '';
  if (q.section === 'listening' && q.audioText) {
    audioSectionHtml = `
      <div class="border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 mb-4 bg-slate-50 dark:bg-slate-850">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <button onclick="playAudioQuestion(${q.id}, 'drill-${q.id}')" 
                    id="audio-btn-drill-${q.id}" 
                    class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 rounded text-xs font-medium flex items-center transition-colors">
              <i id="audio-play-icon-drill-${q.id}" class="fa-solid fa-play text-xs mr-2"></i>
              <span id="audio-play-text-drill-${q.id}">Dengarkan Audio</span>
            </button>
            <div id="audio-visualizer-drill-${q.id}" class="flex items-center h-4">
              <span class="wave-bar"></span>
              <span class="wave-bar"></span>
              <span class="wave-bar"></span>
              <span class="wave-bar"></span>
            </div>
          </div>
          <button onclick="toggleTranscript('drill-transcript-${q.id}')" class="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
            Naskah Percakapan
          </button>
        </div>
        <div id="drill-transcript-${q.id}" class="hidden mt-3 p-3 bg-white dark:bg-slate-900 rounded text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-pre-line">
          ${q.dialogue ? `${q.dialogue.speaker1}\n${q.dialogue.speaker2}\nNarrator: ${q.dialogue.narrator}` : q.audioText}
        </div>
      </div>
    `;
  }

  let readingPassageHtml = '';
  if (q.passage) {
    readingPassageHtml = `
      <div class="border border-slate-200 dark:border-slate-800 p-4 rounded-lg text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-serif mb-4 whitespace-pre-line max-h-56 overflow-y-auto bg-slate-50 dark:bg-slate-850">
        <div class="font-sans font-medium text-slate-500 dark:text-slate-400 text-[11px] mb-2 uppercase">Teks Bacaan:</div>
        ${q.passage}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="border border-slate-200 dark:border-slate-800 rounded-lg p-6 bg-white dark:bg-slate-900">
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <span class="text-xs font-mono text-slate-500">
          ${q.sectionTitle}
        </span>
        <span class="text-xs text-slate-500">
          Topik: ${q.jurus}
        </span>
      </div>

      ${audioSectionHtml}
      ${readingPassageHtml}

      <div class="text-sm font-medium text-slate-900 dark:text-white mb-4 leading-normal">
        ${q.section === 'listening' ? q.dialogue.narrator : (q.question || '')}
      </div>

      <div class="space-y-2 mb-6" id="drill-options">
        ${q.options.map(opt => `
          <label onclick="checkDrillAnswer(${q.id}, '${opt.key}')" class="drill-option flex items-center p-3 rounded border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 cursor-pointer transition-colors text-xs text-slate-800 dark:text-slate-200">
            <span class="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center font-mono text-[11px] mr-3 text-slate-600 dark:text-slate-300">
              ${opt.key}
            </span>
            <span>${opt.text}</span>
          </label>
        `).join('')}
      </div>

      <div id="drill-feedback-${q.id}" class="hidden p-4 rounded text-xs leading-relaxed mb-4"></div>

      <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <button onclick="prevDrill()" ${AppState.drillIndex === 0 ? 'disabled' : ''} class="px-3 py-1.5 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 disabled:opacity-30 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
          Sebelumnya
        </button>
        <button onclick="nextDrill()" class="px-4 py-1.5 text-xs font-medium rounded bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
          Berikutnya
        </button>
      </div>
    </div>
  `;
}

function checkDrillAnswer(questionId, selectedKey) {
  stopAudio();
  const q = TOEFL_DATA.questions.find(item => item.id === questionId);
  if (!q) return;

  const isCorrect = selectedKey === q.correct;
  const feedbackEl = document.getElementById(`drill-feedback-${questionId}`);
  if (!feedbackEl) return;

  feedbackEl.classList.remove('hidden', 'bg-slate-100', 'dark:bg-slate-800', 'border', 'border-slate-200', 'dark:border-slate-700');
  feedbackEl.classList.add('bg-slate-50', 'dark:bg-slate-800/80', 'border', 'border-slate-200', 'dark:border-slate-700');

  feedbackEl.innerHTML = `
    <div class="font-medium text-xs mb-1.5 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}">
      ${isCorrect ? `Jawaban Anda tepat (${selectedKey})` : `Jawaban Anda kurang tepat. Kunci jawaban: ${q.correct}`}
    </div>
    <div class="text-xs text-slate-600 dark:text-slate-300">
      <strong>Pembahasan:</strong> ${q.explanation}
    </div>
  `;
}

function filterDrill(category) {
  AppState.drillFilter = category;
  AppState.drillIndex = 0;
  document.querySelectorAll('.drill-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-drill-cat') === category) {
      btn.className = 'drill-filter-btn px-3 py-1.5 text-xs font-medium rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900';
    } else {
      btn.className = 'drill-filter-btn px-3 py-1.5 text-xs font-medium rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white';
    }
  });
  renderDrillSection();
}

function nextDrill() {
  const filteredQuestions = TOEFL_DATA.questions.filter(q => {
    if (AppState.drillFilter === 'all') return true;
    if (AppState.drillFilter === 'listening') return q.section === 'listening';
    if (AppState.drillFilter === 'structure') return q.section.includes('structure') || q.section.includes('written');
    if (AppState.drillFilter === 'reading') return q.section === 'reading';
    return true;
  });

  if (AppState.drillIndex < filteredQuestions.length - 1) {
    AppState.drillIndex++;
    renderDrillSection();
  } else {
    alert('Soal pada kategori ini telah selesai.');
  }
}

function prevDrill() {
  if (AppState.drillIndex > 0) {
    AppState.drillIndex--;
    renderDrillSection();
  }
}

function toggleTranscript(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden');
}

// ==========================================================================
// 4. EXAM SIMULATION
// ==========================================================================
function startExam() {
  stopAudio();
  AppState.examActive = true;
  AppState.examCompleted = false;
  AppState.examCurrentIndex = 0;
  AppState.examAnswers = {};
  AppState.examTimeRemaining = 30 * 60;

  document.getElementById('exam-welcome-panel').classList.add('hidden');
  document.getElementById('exam-active-panel').classList.remove('hidden');

  startExamTimer();
  renderExamQuestion();
  renderExamPalette();
}

function startExamTimer() {
  if (AppState.examTimerInterval) clearInterval(AppState.examTimerInterval);
  updateTimerDisplay();

  AppState.examTimerInterval = setInterval(() => {
    AppState.examTimeRemaining--;
    updateTimerDisplay();

    if (AppState.examTimeRemaining <= 0) {
      clearInterval(AppState.examTimerInterval);
      alert('Batas waktu pengerjaan telah selesai.');
      submitExam();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById('exam-timer');
  if (!timerEl) return;

  const minutes = Math.floor(AppState.examTimeRemaining / 60);
  const seconds = AppState.examTimeRemaining % 60;
  timerEl.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function renderExamQuestion() {
  const q = TOEFL_DATA.questions[AppState.examCurrentIndex];
  if (!q) return;

  document.getElementById('exam-q-number').innerText = `Nomor ${AppState.examCurrentIndex + 1} dari ${TOEFL_DATA.questions.length}`;
  document.getElementById('exam-q-section').innerText = q.sectionTitle;

  const bodyEl = document.getElementById('exam-q-body');
  if (!bodyEl) return;

  let audioSectionHtml = '';
  if (q.section === 'listening' && q.audioText) {
    audioSectionHtml = `
      <div class="border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 mb-5 bg-slate-50 dark:bg-slate-850">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <button onclick="playAudioQuestion(${q.id}, 'exam-${q.id}')" 
                    id="audio-btn-exam-${q.id}" 
                    class="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 rounded text-xs font-medium flex items-center transition-colors">
              <i id="audio-play-icon-exam-${q.id}" class="fa-solid fa-play text-xs mr-2"></i>
              <span id="audio-play-text-exam-${q.id}">Putar Audio</span>
            </button>
            <div id="audio-visualizer-exam-${q.id}" class="flex items-center h-4">
              <span class="wave-bar"></span>
              <span class="wave-bar"></span>
              <span class="wave-bar"></span>
              <span class="wave-bar"></span>
            </div>
          </div>
          <span class="text-[11px] text-slate-500">Audio pemahaman soal</span>
        </div>
      </div>
    `;
  }

  let readingPassageHtml = '';
  if (q.passage) {
    readingPassageHtml = `
      <div class="border border-slate-200 dark:border-slate-800 p-4 rounded-lg text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-serif mb-5 whitespace-pre-line max-h-56 overflow-y-auto bg-slate-50 dark:bg-slate-850">
        <div class="font-sans font-medium text-slate-500 text-[11px] mb-2 uppercase">Teks Bacaan:</div>
        ${q.passage}
      </div>
    `;
  }

  const selectedAnswer = AppState.examAnswers[q.id];

  bodyEl.innerHTML = `
    ${audioSectionHtml}
    ${readingPassageHtml}

    <div class="text-sm font-medium text-slate-900 dark:text-white mb-5 leading-normal">
      ${q.section === 'listening' ? q.dialogue.narrator : (q.question || '')}
    </div>

    <div class="space-y-2">
      ${q.options.map(opt => {
        const isChecked = selectedAnswer === opt.key;
        return `
          <label onclick="selectExamAnswer(${q.id}, '${opt.key}')" 
                 class="option-label flex items-start p-3 rounded border ${isChecked ? 'border-blue-600 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'} text-xs">
            <div class="flex items-center h-4 mr-3">
              <input type="radio" name="exam_opt_${q.id}" value="${opt.key}" ${isChecked ? 'checked' : ''} class="w-3.5 h-3.5 text-blue-600 focus:ring-0">
            </div>
            <div class="flex-1 text-slate-800 dark:text-slate-200">
              <strong class="font-mono mr-1.5">${opt.key}.</strong> ${opt.text}
            </div>
          </label>
        `;
      }).join('')}
    </div>
  `;

  const prevBtn = document.getElementById('exam-prev-btn');
  const nextBtn = document.getElementById('exam-next-btn');
  if (prevBtn) prevBtn.disabled = AppState.examCurrentIndex === 0;
  if (nextBtn) {
    if (AppState.examCurrentIndex === TOEFL_DATA.questions.length - 1) {
      nextBtn.innerHTML = `Selesai`;
      nextBtn.onclick = confirmSubmitExam;
    } else {
      nextBtn.innerHTML = `Berikutnya`;
      nextBtn.onclick = nextExamQuestion;
    }
  }

  renderExamPalette();
}

function selectExamAnswer(questionId, key) {
  AppState.examAnswers[questionId] = key;
  renderExamQuestion();
}

function nextExamQuestion() {
  stopAudio();
  if (AppState.examCurrentIndex < TOEFL_DATA.questions.length - 1) {
    AppState.examCurrentIndex++;
    renderExamQuestion();
  }
}

function prevExamQuestion() {
  stopAudio();
  if (AppState.examCurrentIndex > 0) {
    AppState.examCurrentIndex--;
    renderExamQuestion();
  }
}

function jumpToQuestion(idx) {
  stopAudio();
  AppState.examCurrentIndex = idx;
  renderExamQuestion();
}

function renderExamPalette() {
  const paletteEl = document.getElementById('exam-palette');
  if (!paletteEl) return;

  paletteEl.innerHTML = TOEFL_DATA.questions.map((q, idx) => {
    const isCurrent = idx === AppState.examCurrentIndex;
    const isAnswered = AppState.examAnswers[q.id] !== undefined;

    let bgClass = 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900';
    if (isAnswered) {
      bgClass = 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-medium border-slate-900 dark:border-slate-100';
    }
    if (isCurrent) {
      bgClass += ' ring-1 ring-blue-600 dark:ring-blue-400';
    }

    return `
      <button onclick="jumpToQuestion(${idx})" class="w-7 h-7 rounded text-xs font-mono transition-colors ${bgClass}">
        ${idx + 1}
      </button>
    `;
  }).join('');

  const answeredCount = Object.keys(AppState.examAnswers).length;
  const progressEl = document.getElementById('exam-answered-count');
  if (progressEl) {
    progressEl.innerText = `${answeredCount} / ${TOEFL_DATA.questions.length} dijawab`;
  }
}

function confirmSubmitExam() {
  const answeredCount = Object.keys(AppState.examAnswers).length;
  const total = TOEFL_DATA.questions.length;
  if (answeredCount < total) {
    const confirmed = confirm(`Anda telah menjawab ${answeredCount} dari ${total} butir soal. Selesaikan ujian sekarang?`);
    if (!confirmed) return;
  }
  submitExam();
}

function submitExam() {
  stopAudio();
  if (AppState.examTimerInterval) clearInterval(AppState.examTimerInterval);
  AppState.examActive = false;
  AppState.examCompleted = true;

  let listeningCorrect = 0;
  let structureCorrect = 0;
  let readingCorrect = 0;

  TOEFL_DATA.questions.forEach(q => {
    const ans = AppState.examAnswers[q.id];
    if (ans === q.correct) {
      if (q.section === 'listening') listeningCorrect++;
      else if (q.section.includes('structure') || q.section.includes('written')) structureCorrect++;
      else if (q.section === 'reading') readingCorrect++;
    }
  });

  const scoreResult = calculateToeflScore(listeningCorrect, structureCorrect, readingCorrect);

  const historyItem = {
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    totalScore: scoreResult.total,
    listening: `${listeningCorrect}/10`,
    structure: `${structureCorrect}/15`,
    reading: `${readingCorrect}/5`
  };
  saveExamHistory(historyItem);

  renderExamResult(scoreResult, listeningCorrect, structureCorrect, readingCorrect);
  switchTab('result');
}

// ==========================================================================
// 5. RESULT & REVIEW VIEW
// ==========================================================================
function renderExamResult(scoreResult, listeningCorrect, structureCorrect, readingCorrect) {
  const scoreDisplay = document.getElementById('result-total-score');
  if (scoreDisplay) {
    scoreDisplay.innerText = scoreResult.total;
  }

  const badgeEl = document.getElementById('result-score-badge');
  const descEl = document.getElementById('result-score-desc');
  if (scoreResult.total >= 550) {
    if (badgeEl) badgeEl.innerHTML = `<span class="text-xs font-mono text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded">Memenuhi Kriteria Lulus (Skor 550+)</span>`;
    if (descEl) descEl.innerText = "Pemahaman struktur kalimat dan identifikasi pola soal sudah solid. Jaga konsentrasi saat menyimak percakapan pembicara kedua saat ujian besok.";
  } else if (scoreResult.total >= 450) {
    if (badgeEl) badgeEl.innerHTML = `<span class="text-xs font-mono text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-800 px-3 py-1 rounded">Level Menengah (Skor 450 - 540)</span>`;
    if (descEl) descEl.innerText = "Hasil memenuhi batas kelulusan umum. Disarankan mengulang kembali pola dasar Subjek-Verb dan Inversi untuk memaksimalkan perolehan nilai.";
  } else {
    if (badgeEl) badgeEl.innerHTML = `<span class="text-xs font-mono text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 px-3 py-1 rounded">Level Dasar (Di bawah 450)</span>`;
    if (descEl) descEl.innerText = "Fokuskan persiapan malam ini pada materi ringkasan pola dasar: identifikasi Subjek-Kata Kerja dan strategi pembicara kedua di Listening.";
  }

  const breakdownEl = document.getElementById('result-breakdown');
  if (breakdownEl) {
    breakdownEl.innerHTML = `
      <div class="border border-slate-200 dark:border-slate-800 p-4 rounded-lg bg-white dark:bg-slate-900">
        <div class="text-[11px] text-slate-500">Listening Comprehension</div>
        <div class="text-lg font-mono font-medium text-slate-900 dark:text-white tabular-nums">${listeningCorrect} / 10</div>
        <div class="text-xs text-slate-500">Estimasi skor: ${scoreResult.listeningScore}</div>
      </div>
      <div class="border border-slate-200 dark:border-slate-800 p-4 rounded-lg bg-white dark:bg-slate-900">
        <div class="text-[11px] text-slate-500">Structure & Expression</div>
        <div class="text-lg font-mono font-medium text-slate-900 dark:text-white tabular-nums">${structureCorrect} / 15</div>
        <div class="text-xs text-slate-500">Estimasi skor: ${scoreResult.structureScore}</div>
      </div>
      <div class="border border-slate-200 dark:border-slate-800 p-4 rounded-lg bg-white dark:bg-slate-900">
        <div class="text-[11px] text-slate-500">Reading Comprehension</div>
        <div class="text-lg font-mono font-medium text-slate-900 dark:text-white tabular-nums">${readingCorrect} / 5</div>
        <div class="text-xs text-slate-500">Estimasi skor: ${scoreResult.readingScore}</div>
      </div>
    `;
  }

  renderReviewList();
}

function renderReviewList(filter = 'all') {
  AppState.examReviewFilter = filter;
  const reviewContainer = document.getElementById('result-review-container');
  if (!reviewContainer) return;

  const filtered = TOEFL_DATA.questions.filter(q => {
    const userAns = AppState.examAnswers[q.id];
    const isCorrect = userAns === q.correct;
    if (filter === 'wrong') return !isCorrect;
    if (filter === 'correct') return isCorrect;
    return true;
  });

  if (filtered.length === 0) {
    reviewContainer.innerHTML = `<div class="p-6 text-center text-xs text-slate-400">Tidak ada butir soal dalam filter ini.</div>`;
    return;
  }

  reviewContainer.innerHTML = filtered.map(q => {
    const userAns = AppState.examAnswers[q.id] || "Tidak Dijawab";
    const isCorrect = userAns === q.correct;

    return `
      <div class="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900 text-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="font-mono text-slate-500">
            Nomor ${q.id} &bull; ${q.sectionTitle}
          </span>
          <span class="font-mono ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}">
            ${isCorrect ? 'Benar' : 'Salah'}
          </span>
        </div>

        <div class="font-medium text-slate-900 dark:text-white mb-2 leading-normal">
          ${q.section === 'listening' ? q.dialogue.narrator : (q.question || '')}
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs mb-3">
          <div class="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span class="text-slate-500">Jawaban Anda:</span> <strong class="font-mono">${userAns}</strong>
          </div>
          <div class="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span class="text-slate-500">Kunci Jawaban:</span> <strong class="font-mono">${q.correct}</strong>
          </div>
        </div>

        <div class="p-3 rounded bg-slate-50 dark:bg-slate-800/60 border-l-2 border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div class="font-medium text-slate-900 dark:text-slate-100 mb-1">Topik: ${q.jurus}</div>
          ${q.explanation}
        </div>
      </div>
    `;
  }).join('');
}

function filterReview(filter) {
  document.querySelectorAll('.review-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-review-filter') === filter) {
      btn.className = 'review-filter-btn px-3 py-1.5 text-xs font-medium rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900';
    } else {
      btn.className = 'review-filter-btn px-3 py-1.5 text-xs font-medium rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white';
    }
  });
  renderReviewList(filter);
}

function saveExamHistory(item) {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('toefl_history') || '[]');
  } catch(e) {}
  history.unshift(item);
  if (history.length > 5) history = history.slice(0, 5);
  localStorage.setItem('toefl_history', JSON.stringify(history));
  loadSavedExamHistory();
}

function loadSavedExamHistory() {
  const container = document.getElementById('dashboard-history');
  if (!container) return;

  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('toefl_history') || '[]');
  } catch(e) {}

  if (history.length === 0) {
    container.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">Belum ada riwayat simulasi ujian.</div>`;
    return;
  }

  container.innerHTML = history.map(h => `
    <div class="flex items-center justify-between p-3 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
      <div>
        <div class="font-medium text-slate-900 dark:text-slate-100 font-mono">Skor TOEFL: ${h.totalScore}</div>
        <div class="text-[11px] text-slate-500">${h.date}</div>
      </div>
      <div class="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
        <span>L: ${h.listening}</span>
        <span>S: ${h.structure}</span>
        <span>R: ${h.reading}</span>
      </div>
    </div>
  `).join('');
}
