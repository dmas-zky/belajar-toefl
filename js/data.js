// ==========================================================================
// TOEFL PREPARATION: DATASET DAN MATERI POLA SOAL
// Disusun untuk pemahaman cepat pola kalimat dan strategi ujian TOEFL ITP
// ==========================================================================

const TOEFL_DATA = {
  // ------------------------------------------------------------------------
  // 1. RANGKUMAN POLA DAN ATURAN
  // ------------------------------------------------------------------------
  cheatSheets: {
    listening: [
      {
        title: "Fokus pada pembicara kedua",
        badge: "Strategi utama",
        icon: "ear-listen",
        desc: "Pada Listening Part A (Short Dialogues), inti informasi yang menjadi kunci jawaban hampir selalu berada pada pembicara kedua. Dengarkan konteks yang disampaikan pembicara pertama sekilas, namun curahkan perhatian penuh pada pembicara kedua.",
        example: {
          dialogue: "Man: Did Steve get the job at the bank?\nWoman: He wasn't able to convince the interviewers.",
          correct: "Steve did not get hired.",
          tip: "Pembicara kedua menyatakan 'wasn't able to convince' (tidak berhasil meyakinkan), yang berarti tidak diterima kerja."
        }
      },
      {
        title: "Hindari pilihan dengan bunyi kata yang mirip",
        badge: "Identifikasi pengecoh",
        icon: "circle-exclamation",
        desc: "Pilihan jawaban yang menggunakan kata-kata dengan pelafalan mirip dengan percakapan biasanya merupakan pengecoh. Jawaban yang benar umumnya menggunakan sinonim (kata berbeda dengan makna serupa).",
        example: {
          dialogue: "Woman: What did you think of the department chair?\nMan: He departed early.",
          trap: "Pilihan yang memuat kata 'department' atau 'apartment' adalah pengecoh.",
          tip: "Pilih opsi yang menyatakan makna sebenarnya, seperti 'left early' atau 'went away'."
        }
      },
      {
        title: "Ekspresi persetujuan dan saran",
        badge: "Pola umum",
        icon: "check",
        desc: "Pahami bentuk frasa percakapan yang sering digunakan penutur asli:",
        rules: [
          "<strong>'You can say that again'</strong> bermakna <em>sangat setuju</em> (agrees completely), bukan meminta mengulang perkataan.",
          "<strong>'Neither do I' / 'Me neither'</strong> digunakan untuk menyetujui pernyataan negatif.",
          "<strong>'I couldn't agree more'</strong> bermakna <em>sepenuhnya sependapat</em>.",
          "<strong>'Why not...?' / 'How about...?'</strong> merupakan bentuk pemberian <em>saran</em> (suggestion)."
        ]
      },
      {
        title: "Bentuk pengandaian (Conditional & Wish)",
        badge: "Logika kalimat",
        icon: "code-branch",
        desc: "Pernyataan yang menggunakan pengandaian menyiratkan fakta yang berlawanan dengan apa yang diucapkan:",
        rules: [
          "<em>'I wish I had time to go'</em> menyatakan fakta bahwa pembicara tidak memiliki waktu dan tidak pergi.",
          "<em>'If only it weren't raining'</em> menyatakan fakta bahwa kondisi saat ini sedang hujan."
        ]
      }
    ],

    structure: [
      {
        id: "sv-rule",
        title: "Struktur inti: Subjek dan kata kerja (S + V)",
        badge: "Aturan dasar",
        icon: "font",
        summary: "Setiap kalimat dalam bahasa Inggris wajib memiliki minimal satu subjek dan satu kata kerja utama.",
        explanation: `
          <p class="mb-2">Periksa kelengkapan kalimat: apakah sudah memiliki subjek dan kata kerja? Jika salah satunya belum ada, pilih opsi yang melengkapinya.</p>
          <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded text-xs mb-2 border-l-2 border-slate-400 dark:border-slate-600">
            <strong>Contoh:</strong><br>
            <em>The new laboratory equipment ________ yesterday morning.</em><br>
            A. arrival &nbsp;|&nbsp; B. arriving &nbsp;|&nbsp; C. arrived &nbsp;|&nbsp; D. for the arrival<br>
            <span class="text-blue-600 dark:text-blue-400 font-medium">Jawaban: C (arrived).</span><br>
            <em>Penjelasan:</em> Kalimat memiliki subjek ('The equipment'), tetapi belum memiliki kata kerja utama. 'Arriving' bukan kata kerja mandiri tanpa to be. Pilihan tepat adalah kata kerja lampau 'arrived'.
          </div>
          <div class="text-xs text-slate-500 dark:text-slate-400">
            <strong>Catatan preposisi:</strong> Frasa yang diawali preposisi (<em>in, on, at, of, with, by</em>) adalah keterangan, bukan subjek utama.
          </div>
        `
      },
      {
        id: "conjunctions",
        title: "Jumlah klausa dan kata hubung (Connectors)",
        badge: "Klausa",
        icon: "link",
        summary: "Hubungan klausa: Jumlah kata kerja dikurangi 1 = Jumlah kata hubung yang dibutuhkan.",
        explanation: `
          <ul class="list-disc ml-5 space-y-1 mb-2 text-xs">
            <li>Satu kata kerja: 0 kata hubung (satu klausa).</li>
            <li>Dua kata kerja: Membutuhkan 1 kata hubung (<em>because, although, if, when, which, that</em>).</li>
            <li>Tiga kata kerja: Membutuhkan 2 kata hubung.</li>
          </ul>
          <div class="bg-slate-50 dark:bg-slate-800 p-2.5 rounded text-xs border-l-2 border-slate-400 dark:border-slate-600">
            <strong>Perbedaan kata hubung dan preposisi:</strong><br>
            • <em>Although / Because / Even though</em> + Subjek + Kata Kerja<br>
            • <em>In spite of / Despite / Because of</em> + Frasa kata benda (tanpa kata kerja)
          </div>
        `
      },
      {
        id: "passive",
        title: "Bentuk pasif (Passive Voice)",
        badge: "Bentuk kata kerja",
        icon: "arrows-rotate",
        summary: "Pola pasif: to be (is/am/are/was/were/been) + Verb 3.",
        explanation: `
          <p class="text-xs mb-2">Gunakan bentuk pasif jika subjek dikenai pekerjaan atau terdapat frasa pelaku <strong>'by ...'</strong> setelah kata kerja.</p>
          <div class="bg-slate-50 dark:bg-slate-800 p-2 rounded text-xs">
            <em>Contoh:</em> The bridge <strong>was built</strong> in 1925 (bukan: The bridge built).
          </div>
        `
      },
      {
        id: "parallel",
        title: "Kesejajaran struktur (Parallel Structure)",
        badge: "Sintaksis",
        icon: "equals",
        summary: "Kata hubung koordinatif (and, but, or) menghubungkan bentuk gramatikal yang setara.",
        explanation: `
          <p class="text-xs mb-2">Bila sebelum kata hubung berbentuk gerund (-ing), bentuk sesudahnya harus serupa. Bila kata sifat, sesudahnya juga kata sifat.</p>
          <div class="text-xs space-y-1 mb-2">
            <div>Salah: She likes swimming, dancing, and <u>to run</u>.</div>
            <div class="text-blue-600 dark:text-blue-400 font-medium">Benar: She likes swimming, dancing, and <u>running</u>.</div>
          </div>
          <div class="text-xs text-slate-500 dark:text-slate-400">
            Pasangan korelatif: <em>Both ... and ...</em>, <em>Not only ... but also ...</em>, <em>Either ... or ...</em>, <em>Neither ... nor ...</em>.
          </div>
        `
      },
      {
        id: "modals",
        title: "Modal auxiliaries dan kata kerja dasar",
        badge: "Bentuk kata kerja",
        icon: "check",
        summary: "Kata kerja bantu modal selalu diikuti bentuk dasar kata kerja (bare infinitive).",
        explanation: `
          <p class="text-xs mb-1">Daftar modal: <strong>can, could, will, would, shall, should, may, might, must</strong>.</p>
          <div class="bg-slate-50 dark:bg-slate-800 p-2 rounded text-xs">
            Contoh: She must <strong>go</strong> (bukan: must goes / must going / must to go).
          </div>
        `
      },
      {
        id: "word-form",
        title: "Ketepatan kelas kata (Adjective vs Adverb)",
        badge: "Identifikasi error",
        icon: "pen-to-square",
        summary: "Kata sifat menerangkan kata benda. Kata keterangan (-ly) menerangkan kata kerja atau kata sifat lain.",
        explanation: `
          <p class="text-xs mb-2">Pada bagian Written Expression, perhatikan ketepatan penggunaan sufiks -ly pada kata keterangan.</p>
          <div class="text-xs space-y-1 text-slate-600 dark:text-slate-300">
            <div>• He speaks <strong>fluently</strong> (menerangkan kata kerja).</div>
            <div>• A <strong>rapid</strong> increase (menerangkan kata benda).</div>
            <div>• It is <strong>extremely</strong> dangerous (menerangkan kata sifat).</div>
          </div>
        `
      }
    ],

    reading: [
      {
        title: "Pendekatan membaca efisien",
        badge: "Manajemen waktu",
        icon: "clock",
        desc: "Hindari membaca seluruh bacaan secara mendalam sebelum melihat pertanyaan. Baca soal terlebih dahulu, tentukan kata kunci yang dicari, lalu temukan posisi informasi di dalam teks."
      },
      {
        title: "Pertanyaan gagasan utama (Main Idea)",
        badge: "Gagasan umum",
        icon: "bullseye",
        desc: "Untuk pertanyaan mengenai 'main topic' atau 'primary purpose':",
        rules: [
          "Baca kalimat pembuka dan penutup pada paragraf pertama.",
          "Periksa kalimat pertama pada paragraf berikutnya untuk melihat perkembangan gagasan.",
          "Pilih opsi yang merangkum keseluruhan bacaan, bukan detail spesifik dari satu bagian saja."
        ]
      },
      {
        title: "Pencarian detail dan rujukan baris",
        badge: "Pemindaian teks",
        icon: "magnifying-glass",
        desc: "Untuk pertanyaan faktual ('According to the passage...'):",
        rules: [
          "Identifikasi kata kunci khusus seperti nama, tahun, atau istilah teknis.",
          "Pindai teks secara cepat hingga menemukan kata kunci tersebut.",
          "Baca satu kalimat sebelum dan sesudah kata kunci untuk memastikan konteks jawaban."
        ]
      },
      {
        title: "Pemahaman kosakata dalam konteks",
        badge: "Analisis makna",
        icon: "book-open",
        desc: "Untuk pertanyaan 'closest in meaning to':",
        rules: [
          "Buka baris yang dirujuk pada teks.",
          "Ganti kata yang ditanyakan dengan masing-masing opsi pilihan.",
          "Pilih kata yang mempertahankan kelogisan kalimat sesuai konteks topik pembahasan."
        ]
      }
    ],

    vocabulary: [
      { word: "Accurate", pos: "adj", meaning: "Tepat, akurat, teliti", synonym: "precise, correct", example: "The researcher provided accurate data." },
      { word: "Alter", pos: "verb", meaning: "Mengubah, memodifikasi", synonym: "change, modify", example: "Climate change can alter rainfall patterns." },
      { word: "Analyze", pos: "verb", meaning: "Menganalisis, memeriksa detail", synonym: "examine, evaluate", example: "Scientists analyze soil samples." },
      { word: "Beneficial", pos: "adj", meaning: "Bermanfaat, menguntungkan", synonym: "advantageous, helpful", example: "Exercise is beneficial to health." },
      { word: "Crucial", pos: "adj", meaning: "Sangat penting, krusial", synonym: "essential, critical, vital", example: "Water is crucial for survival." },
      { word: "Depict", pos: "verb", meaning: "Menggambarkan, melukiskan", synonym: "portray, represent, show", example: "The painting depicts a village scene." },
      { word: "Diminish", pos: "verb", meaning: "Menyusut, berkurang", synonym: "decrease, reduce, lessen", example: "The supplies began to diminish quickly." },
      { word: "Diverse", pos: "adj", meaning: "Beragam, bermacam-macam", synonym: "varied, different", example: "The forest is home to diverse species." },
      { word: "Enhance", pos: "verb", meaning: "Meningkatkan, memperkuat", synonym: "improve, strengthen, boost", example: "Technology can enhance learning outcomes." },
      { word: "Evidence", pos: "noun", meaning: "Bukti, tanda", synonym: "proof, indication", example: "Fossils provide evidence of ancient life." },
      { word: "Fundamental", pos: "adj", meaning: "Mendasar, pokok", synonym: "basic, essential, primary", example: "Reading is a fundamental skill." },
      { word: "Hesitant", pos: "adj", meaning: "Ragu-ragu", synonym: "reluctant, uncertain", example: "He was hesitant to accept the offer." },
      { word: "Inevitably", pos: "adv", meaning: "Pasti terjadi, tak terelakkan", synonym: "unavoidably, certainly", example: "Prices will inevitably rise over time." },
      { word: "Inhibit", pos: "verb", meaning: "Menghambat, menghalangi", synonym: "prevent, hinder, restrain", example: "Cold weather can inhibit plant growth." },
      { word: "Maintain", pos: "verb", meaning: "Mempertahankan, memelihara", synonym: "preserve, sustain, keep", example: "It is hard to maintain a balanced diet." },
      { word: "Neglect", pos: "verb", meaning: "Mengabaikan, melalaikan", synonym: "ignore, overlook", example: "Do not neglect your assignments." },
      { word: "Obvious", pos: "adj", meaning: "Jelas, nyata, gamblang", synonym: "clear, evident, apparent", example: "There is an obvious mistake in the report." },
      { word: "Prevalent", pos: "adj", meaning: "Umum terjadi, tersebar luas", synonym: "common, widespread", example: "The disease is prevalent in humid regions." },
      { word: "Prohibit", pos: "verb", meaning: "Melarang, mencegah", synonym: "forbid, ban, prevent", example: "The rules prohibit smoking on campus." },
      { word: "Reliable", pos: "adj", meaning: "Dapat diandalkan, terpercaya", synonym: "dependable, trustworthy", example: "We need a reliable internet connection." },
      { word: "Significant", pos: "adj", meaning: "Signifikan, berarti besar", synonym: "important, substantial", example: "There was a significant improvement." },
      { word: "Thrive", pos: "verb", meaning: "Berkembang pesat, makmur", synonym: "flourish, prosper", example: "Cactus plants thrive in dry deserts." },
      { word: "Vast", pos: "adj", meaning: "Sangat luas, masif", synonym: "huge, immense, massive", example: "The Sahara is a vast desert." },
      { word: "Yield", pos: "verb/noun", meaning: "Menghasilkan / Hasil panen", synonym: "produce, generate", example: "The experiment yielded surprising results." }
    ]
  },

  // ------------------------------------------------------------------------
  // 2. BANK SOAL SIMULASI LENGKAP
  // ------------------------------------------------------------------------
  questions: [
    // SECTION 1: LISTENING COMPREHENSION (Soal 1 - 10)
    {
      id: 1,
      section: "listening",
      sectionTitle: "Section 1: Listening Comprehension (Part A)",
      dialogue: {
        speaker1: "Man: Do you think Mark will come to the party tonight?",
        speaker2: "Woman: He told me he has to finish his history assignment before midnight.",
        narrator: "What does the woman imply about Mark?"
      },
      audioText: "Man: Do you think Mark will come to the party tonight? Woman: He told me he has to finish his history assignment before midnight. Narrator: What does the woman imply about Mark?",
      options: [
        { key: "A", text: "He will finish his party before midnight." },
        { key: "B", text: "He is unlikely to attend the party." },
        { key: "C", text: "He is studying history at the party." },
        { key: "D", text: "He already turned in his assignment." }
      ],
      correct: "B",
      jurus: "Fokus pada pembicara kedua",
      explanation: "Pembicara kedua menjelaskan bahwa Mark harus menyelesaikan tugas sejarah sebelum tengah malam. Ini mengindikasikan bahwa Mark sibuk dan kecil kemungkinan untuk menghadiri pesta (He is unlikely to attend). Pilihan A dan C menggunakan kata-kata yang bunyinya serupa sebagai pengecoh."
    },
    {
      id: 2,
      section: "listening",
      sectionTitle: "Section 1: Listening Comprehension (Part A)",
      dialogue: {
        speaker1: "Woman: I can't believe how cold it is in this classroom!",
        speaker2: "Man: You can say that again!",
        narrator: "What does the man mean?"
      },
      audioText: "Woman: I can't believe how cold it is in this classroom! Man: You can say that again! Narrator: What does the man mean?",
      options: [
        { key: "A", text: "He wants her to repeat what she said." },
        { key: "B", text: "He agrees with her completely." },
        { key: "C", text: "He thinks the room is warm." },
        { key: "D", text: "He didn't hear what she said." }
      ],
      correct: "B",
      jurus: "Idiom persetujuan",
      explanation: "Frasa 'You can say that again' adalah ungkapan baku dalam bahasa Inggris yang menyatakan persetujuan penuh terhadap pernyataan lawan bicara (He agrees with her completely)."
    },
    {
      id: 3,
      section: "listening",
      sectionTitle: "Section 1: Listening Comprehension (Part A)",
      dialogue: {
        speaker1: "Man: Are you going to drive to the seminar in Chicago?",
        speaker2: "Woman: I would if my car hadn't broken down yesterday.",
        narrator: "What does the woman mean?"
      },
      audioText: "Man: Are you going to drive to the seminar in Chicago? Woman: I would if my car hadn't broken down yesterday. Narrator: What does the woman mean?",
      options: [
        { key: "A", text: "She is going to repair her car in Chicago." },
        { key: "B", text: "She will drive her car despite the problem." },
        { key: "C", text: "She cannot drive to the seminar because her car is broken." },
        { key: "D", text: "She decided not to attend the seminar at all." }
      ],
      correct: "C",
      jurus: "Kondisional dan pengandaian",
      explanation: "Pernyataan 'I would if my car hadn't broken down' menunjukkan pengandaian. Kenyataannya mobil pembicara mengalami kerusakan kemarin, sehingga ia tidak dapat mengemudikan mobilnya ke seminar."
    },
    {
      id: 4,
      section: "listening",
      sectionTitle: "Section 1: Listening Comprehension (Part A)",
      dialogue: {
        speaker1: "Woman: Professor Davis was really critical of my research paper.",
        speaker2: "Man: Really? I thought he barely glanced at it.",
        narrator: "What had the man assumed about Professor Davis?"
      },
      audioText: "Woman: Professor Davis was really critical of my research paper. Man: Really? I thought he barely glanced at it. Narrator: What had the man assumed about Professor Davis?",
      options: [
        { key: "A", text: "Professor Davis would read the paper very carefully." },
        { key: "B", text: "Professor Davis would give the paper a high grade." },
        { key: "C", text: "Professor Davis had not looked at the paper closely." },
        { key: "D", text: "Professor Davis refused to evaluate the paper." }
      ],
      correct: "C",
      jurus: "Makna tersirat negatif (barely)",
      explanation: "Kata 'barely glanced at it' bermakna hampir tidak membacanya secara teliti. Pria tersebut sebelumnya berasumsi bahwa profesor Davis tidak memeriksa makalah tersebut dengan cermat."
    },
    {
      id: 5,
      section: "listening",
      sectionTitle: "Section 1: Listening Comprehension (Part A)",
      dialogue: {
        speaker1: "Man: Should we take the highway or the scenic route to the national park?",
        speaker2: "Woman: Why not avoid the heavy traffic on the highway?",
        narrator: "What does the woman suggest?"
      },
      audioText: "Man: Should we take the highway or the scenic route to the national park? Woman: Why not avoid the heavy traffic on the highway? Narrator: What does the woman suggest?",
      options: [
        { key: "A", text: "Taking the highway to save time." },
        { key: "B", text: "Going by way of the scenic route." },
        { key: "C", text: "Waiting until the traffic clears up." },
        { key: "D", text: "Staying at the national park longer." }
      ],
      correct: "B",
      jurus: "Pola saran (Why not...)",
      explanation: "Pertanyaan retoris 'Why not avoid the heavy traffic on the highway?' mengisyaratkan saran untuk memilih alternatif rute pemandangan (scenic route)."
    },
    {
      id: 6,
      section: "listening",
      sectionTitle: "Section 1: Listening Comprehension (Part A)",
      dialogue: {
        speaker1: "Woman: Did Sarah manage to catch the 8:00 AM train?",
        speaker2: "Man: She arrived at the station just as the doors were closing, but she made it.",
        narrator: "What does the man say about Sarah?"
      },
      audioText: "Woman: Did Sarah manage to catch the 8:00 AM train? Woman: She arrived at the station just as the doors were closing, but she made it. Narrator: What does the man say about Sarah?",
      options: [
        { key: "A", text: "She missed the train by just a few seconds." },
        { key: "B", text: "The train departed before she arrived." },
        { key: "C", text: "She successfully boarded the train." },
        { key: "D", text: "The station doors were locked when she got there." }
      ],
      correct: "C",
      jurus: "Ungkapan keberhasilan (she made it)",
      explanation: "Frasa 'she made it' menyatakan bahwa subjek berhasil menaiki kereta sebelum berangkat."
    },
    {
      id: 7,
      section: "listening",
      sectionTitle: "Section 1: Listening Comprehension (Part A)",
      dialogue: {
        speaker1: "Man: I'm having a hard time understanding this chapter in organic chemistry.",
        speaker2: "Woman: How about going to the tutoring center in the science building?",
        narrator: "What does the woman recommend the man do?"
      },
      audioText: "Man: I'm having a hard time understanding this chapter in organic chemistry. Woman: How about going to the tutoring center in the science building? Narrator: What does the woman recommend the man do?",
      options: [
        { key: "A", text: "Change his major to chemistry." },
        { key: "B", text: "Seek help from a tutor." },
        { key: "C", text: "Read the chapter one more time." },
        { key: "D", text: "Form a study group with classmates." }
      ],
      correct: "B",
      jurus: "Pola rekomendasi (How about...)",
      explanation: "Rekomendasi untuk mengunjungi 'tutoring center' bersinonim dengan meminta bantuan dari seorang tutor (Seek help from a tutor)."
    },
    {
      id: 8,
      section: "listening",
      sectionTitle: "Section 1: Listening Comprehension (Part A)",
      dialogue: {
        speaker1: "Woman: I tried calling the customer service number three times, but no one answered.",
        speaker2: "Man: You should try early in the morning before their lines get jammed.",
        narrator: "What does the man advise the woman to do?"
      },
      audioText: "Woman: I tried calling the customer service number three times, but no one answered. Man: You should try early in the morning before their lines get jammed. Narrator: What does the man advise the woman to do?",
      options: [
        { key: "A", text: "Call again at an earlier hour." },
        { key: "B", text: "Send an email instead of calling." },
        { key: "C", text: "Wait until the lines are cleared in the evening." },
        { key: "D", text: "Purchase a new telephone connection." }
      ],
      correct: "A",
      jurus: "Pola anjuran langsung (You should...)",
      explanation: "Pria menganjurkan mencoba menelepon lebih awal di pagi hari sebelum saluran sibuk."
    },
    {
      id: 9,
      section: "listening",
      sectionTitle: "Section 1: Listening Comprehension (Part B: Long Talk)",
      dialogue: {
        speaker1: "Student: Professor Miller, could you explain what caused the collapse of the ancient Mayan civilization?",
        speaker2: "Professor: Recent archaeological evidence suggests that severe prolonged droughts, combined with deforestation and warfare between city-states, exhausted their agricultural capacity.",
        narrator: "According to the professor, what was a primary environmental factor in the Mayan collapse?"
      },
      audioText: "Student: Professor Miller, could you explain what caused the collapse of the ancient Mayan civilization? Professor: Recent archaeological evidence suggests that severe prolonged droughts, combined with deforestation and warfare between city-states, exhausted their agricultural capacity. Narrator: According to the professor, what was a primary environmental factor in the Mayan collapse?",
      options: [
        { key: "A", text: "A sudden volcanic eruption that covered their cities." },
        { key: "B", text: "A foreign military invasion from across the ocean." },
        { key: "C", text: "Environmental degradation and prolonged droughts." },
        { key: "D", text: "An epidemic disease with no known cure." }
      ],
      correct: "C",
      jurus: "Identifikasi faktor spesifik",
      explanation: "Dosen menguraikan faktor kekeringan berkepanjangan ('prolonged droughts') serta penggundulan hutan ('deforestation'), yang mencerminkan degradasi lingkungan."
    },
    {
      id: 10,
      section: "listening",
      sectionTitle: "Section 1: Listening Comprehension (Part B: Academic)",
      dialogue: {
        speaker1: "Student: I'm interested in applying for the summer research assistantship. What are the requirements?",
        speaker2: "Advisor: Applicants must have completed at least two semesters of biology and submit two letters of recommendation by April 15th.",
        narrator: "What is required to apply for the research assistantship?"
      },
      audioText: "Student: I'm interested in applying for the summer research assistantship. What are the requirements? Advisor: Applicants must have completed at least two semesters of biology and submit two letters of recommendation by April 15th. Narrator: What is required to apply for the research assistantship?",
      options: [
        { key: "A", text: "Prior working experience in a medical hospital." },
        { key: "B", text: "Two semesters of biology and two letters of recommendation." },
        { key: "C", text: "An in-person interview with the faculty dean before April." },
        { key: "D", text: "Completion of an independent senior thesis project." }
      ],
      correct: "B",
      jurus: "Pencatatan syarat eksplisit",
      explanation: "Syarat yang dinyatakan secara langsung: menyelesaikan minimal dua semester biologi dan menyerahkan dua surat rekomendasi."
    },

    // SECTION 2: STRUCTURE & WRITTEN EXPRESSION (Soal 11 - 25)
    // Part A: Structure (11 - 18)
    {
      id: 11,
      section: "structure",
      sectionTitle: "Section 2: Structure (Sentence Completion)",
      question: "The giant panda, which is native to south-central China, ________ primarily on bamboo shoots and leaves.",
      options: [
        { key: "A", text: "feeding" },
        { key: "B", text: "feeds" },
        { key: "C", text: "is fed" },
        { key: "D", text: "feed" }
      ],
      correct: "B",
      jurus: "Subjek tunggal dan kata kerja utama",
      explanation: "Subjek kalimat adalah 'The giant panda' (tunggal). Frasa 'which is native to south-central China' adalah klausa penjelas. Kalimat membutuhkan predikat utama bentuk present tense untuk subjek tunggal: 'feeds'."
    },
    {
      id: 12,
      section: "structure",
      sectionTitle: "Section 2: Structure (Sentence Completion)",
      question: "Not only ________ to maintain physical fitness, but it also improves cognitive performance.",
      options: [
        { key: "A", text: "regular exercise helps" },
        { key: "B", text: "does regular exercise help" },
        { key: "C", text: "helps regular exercise" },
        { key: "D", text: "regular exercise is helping" }
      ],
      correct: "B",
      jurus: "Inversi setelah kata negatif",
      explanation: "Ketika kalimat diawali dengan ungkapan negatif seperti 'Not only', susunan subjek dan kata kerja bantu dibalik (inversion): Not only + Auxiliary (does) + Subject (regular exercise) + Verb (help)."
    },
    {
      id: 13,
      section: "structure",
      sectionTitle: "Section 2: Structure (Sentence Completion)",
      question: "________ the severe blizzard conditions, the mountain rescue team successfully reached the stranded climbers.",
      options: [
        { key: "A", text: "In spite of" },
        { key: "B", text: "Although" },
        { key: "C", text: "Even though" },
        { key: "D", text: "Because" }
      ],
      correct: "A",
      jurus: "Preposisi versus kata hubung klausa",
      explanation: "Bagian setelah titik-titik adalah frasa kata benda 'the severe blizzard conditions' (tanpa predikat). Frasa kata benda harus dipasangkan dengan preposisi 'In spite of'. Opsi 'Although' dan 'Even though' wajib diikuti klausa lengkap (Subjek + Verb)."
    },
    {
      id: 14,
      section: "structure",
      sectionTitle: "Section 2: Structure (Sentence Completion)",
      question: "Archaeologists have discovered that ancient Egyptians used papyrus ________ paper for writing documents.",
      options: [
        { key: "A", text: "as a form of" },
        { key: "B", text: "which form" },
        { key: "C", text: "was formed" },
        { key: "D", text: "it formed" }
      ],
      correct: "A",
      jurus: "Frasa fungsi (as a form of)",
      explanation: "Pola baku 'use [something] as [something]' menerangkan fungsi dari suatu benda. Opsi A melengkapi kalimat tanpa merusak struktur klausa."
    },
    {
      id: 15,
      section: "structure",
      sectionTitle: "Section 2: Structure (Sentence Completion)",
      question: "Had the engineers detected the structural flaw earlier, the catastrophic bridge collapse ________.",
      options: [
        { key: "A", text: "could prevent" },
        { key: "B", text: "would be prevented" },
        { key: "C", text: "could have been prevented" },
        { key: "D", text: "will have prevented" }
      ],
      correct: "C",
      jurus: "Inversi conditional tipe 3",
      explanation: "'Had the engineers detected...' merupakan bentuk inversi dari 'If the engineers had detected...'. Klausa akibat dari conditional tipe 3 pasif menggunakan pola: could/would + have + been + V3."
    },
    {
      id: 16,
      section: "structure",
      sectionTitle: "Section 2: Structure (Sentence Completion)",
      question: "The higher the altitude of a mountain peak, ________ the temperature drops.",
      options: [
        { key: "A", text: "more rapidly" },
        { key: "B", text: "the more rapidly" },
        { key: "C", text: "rapidly" },
        { key: "D", text: "it is more rapid" }
      ],
      correct: "B",
      jurus: "Komparatif ganda (The more..., the more...)",
      explanation: "Pola perbandingan proporsional mengikuti struktur 'The + comparative..., the + comparative...'. Karena klausa awal diawali 'The higher...', klausa kedua wajib diawali 'the more rapidly'."
    },
    {
      id: 17,
      section: "structure",
      sectionTitle: "Section 2: Structure (Sentence Completion)",
      question: "The committee voted to postpone the final decision until all members ________ a chance to review the proposal.",
      options: [
        { key: "A", text: "having had" },
        { key: "B", text: "had had" },
        { key: "C", text: "will have" },
        { key: "D", text: "to have" }
      ],
      correct: "B",
      jurus: "Kesesuaian kala lampau (Past Perfect)",
      explanation: "Tindakan utama berada dalam bentuk lampau ('voted'). Tindakan peninjauan proposal yang terjadi sebelum pemungutan suara dinyatakan dalam past perfect tense ('had had')."
    },
    {
      id: 18,
      section: "structure",
      sectionTitle: "Section 2: Structure (Sentence Completion)",
      question: "Neither the orchestra conductor nor the musicians ________ satisfied with the acoustic quality of the new auditorium.",
      options: [
        { key: "A", text: "was" },
        { key: "B", text: "were" },
        { key: "C", text: "is" },
        { key: "D", text: "has been" }
      ],
      correct: "B",
      jurus: "Persetujuan subjek terdekat (Neither... Nor)",
      explanation: "Pada subjek gabungan dengan 'neither... nor', bentuk kata kerja menyesuaikan dengan subjek yang terdekat dengan kata kerja tersebut ('the musicians' = jamak). Maka digunakan 'were'."
    },

    // Part B: Written Expression (19 - 25)
    {
      id: 19,
      section: "written_expression",
      sectionTitle: "Section 2: Written Expression (Identifikasi Error)",
      question: "Although both species of birds share similar habitats, their nesting behaviors [A: are] [B: significant] [C: different] [D: from each other].",
      options: [
        { key: "A", text: "are" },
        { key: "B", text: "significant" },
        { key: "C", text: "different" },
        { key: "D", text: "from each other" }
      ],
      correct: "B",
      jurus: "Penggunaan adverb sebelum kata sifat",
      explanation: "Kata 'different' merupakan kata sifat (adjective). Kata yang menerangkan kata sifat harus berbentuk kata keterangan (adverb). Bentuk yang tepat adalah 'significantly different'."
    },
    {
      id: 20,
      section: "written_expression",
      sectionTitle: "Section 2: Written Expression (Identifikasi Error)",
      question: "Mount Everest, which [A: rises] to 8,848 meters above sea level, attracts hundreds of mountaineers [B: who] [C: attempts] to reach its summit [D: each year].",
      options: [
        { key: "A", text: "rises" },
        { key: "B", text: "who" },
        { key: "C", text: "attempts" },
        { key: "D", text: "each year" }
      ],
      correct: "C",
      jurus: "Kesesuaian subjek jamak dan kata kerja",
      explanation: "Kata ganti relatif 'who' merujuk pada anteseden jamak 'hundreds of mountaineers'. Kata kerja untuk subjek jamak tidak boleh berakhiran -s. Bentuk yang tepat adalah 'who attempt'."
    },
    {
      id: 21,
      section: "written_expression",
      sectionTitle: "Section 2: Written Expression (Identifikasi Error)",
      question: "The human body requires a balance of carbohydrates, proteins, and fats [A: to produce] energy and [B: maintaining] vital organ [C: functions] [D: properly].",
      options: [
        { key: "A", text: "to produce" },
        { key: "B", text: "maintaining" },
        { key: "C", text: "functions" },
        { key: "D", text: "properly" }
      ],
      correct: "B",
      jurus: "Kesejajaran bentuk infinitif",
      explanation: "Kata sambung 'and' menghubungkan dua tujuan dalam bentuk infinitive: 'to produce energy and [to] maintain...'. Bentuk 'maintaining' tidak sejajar dengan 'produce'."
    },
    {
      id: 22,
      section: "written_expression",
      sectionTitle: "Section 2: Written Expression (Identifikasi Error)",
      question: "During the Renaissance, artists developed new techniques in perspective that enabled [A: them] to create [B: more realer] depictions of nature and [C: human anatomy] [D: accurately].",
      options: [
        { key: "A", text: "them" },
        { key: "B", text: "more realer" },
        { key: "C", text: "human anatomy" },
        { key: "D", text: "accurately" }
      ],
      correct: "B",
      jurus: "Redundansi bentuk komparatif",
      explanation: "Penggabungan kata 'more' dengan sufiks komparatif '-er' adalah bentuk redundan dalam bahasa Inggris baku. Bentuk yang tepat adalah 'more realistic'."
    },
    {
      id: 23,
      section: "written_expression",
      sectionTitle: "Section 2: Written Expression (Identifikasi Error)",
      question: "Electric vehicles have become [A: increasingly] popular [B: because of] they produce [C: zero] direct emissions compared to [D: traditional] gasoline cars.",
      options: [
        { key: "A", text: "increasingly" },
        { key: "B", text: "because of" },
        { key: "C", text: "zero" },
        { key: "D", text: "traditional" }
      ],
      correct: "B",
      jurus: "Perbedaan because dan because of",
      explanation: "Setelah kata hubung terdapat klausa lengkap 'they produce zero direct emissions' (Subjek + Predikat). Oleh karena itu harus menggunakan conjunction 'because', bukan preposition 'because of'."
    },
    {
      id: 24,
      section: "written_expression",
      sectionTitle: "Section 2: Written Expression (Identifikasi Error)",
      question: "The university library contains [A: several thousands] books, many of [B: which] [C: were donated] by prominent alumni over the [D: past century].",
      options: [
        { key: "A", text: "several thousands" },
        { key: "B", text: "which" },
        { key: "C", text: "were donated" },
        { key: "D", text: "past century" }
      ],
      correct: "A",
      jurus: "Ketepatan bentuk bilangan pengali",
      explanation: "Kata 'thousand' tidak menggunakan akhiran jamak -s jika didahului penentu jumlah seperti 'several'. Bentuk yang tepat adalah 'several thousand books'."
    },
    {
      id: 25,
      section: "written_expression",
      sectionTitle: "Section 2: Written Expression (Identifikasi Error)",
      question: "The department supervisor [A: insisted] that every employee [B: submits] their expense report before [C: leaving] the office on [D: Friday].",
      options: [
        { key: "A", text: "insisted" },
        { key: "B", text: "submits" },
        { key: "C", text: "leaving" },
        { key: "D", text: "Friday" }
      ],
      correct: "B",
      jurus: "Subjunctive clause",
      explanation: "Klausa that setelah kata kerja instruksi seperti 'insist that' menggunakan kata kerja dasar (bare infinitive). Bentuk yang tepat adalah 'every employee submit'."
    },

    // SECTION 3: READING COMPREHENSION (Soal 26 - 30)
    {
      id: 26,
      section: "reading",
      sectionTitle: "Section 3: Reading Comprehension",
      passage: `Bioluminescence is the production and emission of light by a living organism. It is a form of chemiluminescence where light energy is released by a chemical reaction. Most bioluminescent organisms are found in the ocean, ranging from microscopic bacteria and dinoflagellates to deep-sea fish, jellyfish, and squid. On land, the most familiar example is the firefly.

The chemical reaction that produces bioluminescence requires two unique chemicals: luciferin and either luciferase or photoprotein. Luciferin is the compound that actually produces the light, while luciferase is an enzyme that catalyzes the reaction. In some cases, bioluminescence serves as a defense mechanism to startle or distract predators. For instance, certain species of deep-sea squid can eject a glowing cloud of bioluminescent fluid instead of black ink, confusing predators in the pitch-black abyss while the squid escapes. In other species, light emission is used to attract mates or lure unsuspecting prey into striking range.`,
      question: "What is the main topic of the passage?",
      options: [
        { key: "A", text: "The major differences between terrestrial and oceanic organisms." },
        { key: "B", text: "The chemical process and biological functions of bioluminescence." },
        { key: "C", text: "Why fireflies glow in the dark during summer evenings." },
        { key: "D", text: "How deep-sea squid defend themselves against giant predators." }
      ],
      correct: "B",
      jurus: "Penentuan topik utama",
      explanation: "Paragraf pertama mendefinisikan bioluminesensi, sedangkan paragraf kedua memaparkan proses reaksi kimia dan fungsi ekologisnya (pertahanan, reproduksi, dan berburu). Topik utamanya adalah proses kimia dan fungsi biologis bioluminesensi."
    },
    {
      id: 27,
      section: "reading",
      sectionTitle: "Section 3: Reading Comprehension",
      passage: `Bioluminescence is the production and emission of light by a living organism. It is a form of chemiluminescence where light energy is released by a chemical reaction. Most bioluminescent organisms are found in the ocean, ranging from microscopic bacteria and dinoflagellates to deep-sea fish, jellyfish, and squid. On land, the most familiar example is the firefly.

The chemical reaction that produces bioluminescence requires two unique chemicals: luciferin and either luciferase or photoprotein. Luciferin is the compound that actually produces the light, while luciferase is an enzyme that catalyzes the reaction. In some cases, bioluminescence serves as a defense mechanism to startle or distract predators. For instance, certain species of deep-sea squid can eject a glowing cloud of bioluminescent fluid instead of black ink, confusing predators in the pitch-black abyss while the squid escapes. In other species, light emission is used to attract mates or lure unsuspecting prey into striking range.`,
      question: "According to the passage, what specific role does luciferase play in bioluminescence?",
      options: [
        { key: "A", text: "It generates a dark ink cloud to obscure vision." },
        { key: "B", text: "It acts as an enzyme that catalyzes the light-producing reaction." },
        { key: "C", text: "It absorbs surrounding heat energy to protect the organism." },
        { key: "D", text: "It serves as the main chemical compound that actually glows." }
      ],
      correct: "B",
      jurus: "Pemindaian informasi spesifik",
      explanation: "Teks pada paragraf kedua menyatakan secara eksplisit: 'luciferase is an enzyme that catalyzes the reaction'. Opsi B merangkum informasi tersebut dengan tepat."
    },
    {
      id: 28,
      section: "reading",
      sectionTitle: "Section 3: Reading Comprehension",
      passage: `Bioluminescence is the production and emission of light by a living organism. It is a form of chemiluminescence where light energy is released by a chemical reaction. Most bioluminescent organisms are found in the ocean, ranging from microscopic bacteria and dinoflagellates to deep-sea fish, jellyfish, and squid. On land, the most familiar example is the firefly.

The chemical reaction that produces bioluminescence requires two unique chemicals: luciferin and either luciferase or photoprotein. Luciferin is the compound that actually produces the light, while luciferase is an enzyme that catalyzes the reaction. In some cases, bioluminescence serves as a defense mechanism to startle or distract predators. For instance, certain species of deep-sea squid can eject a glowing cloud of bioluminescent fluid instead of black ink, confusing predators in the pitch-black abyss while the squid escapes. In other species, light emission is used to attract mates or lure unsuspecting prey into striking range.`,
      question: "The word \"startle\" in paragraph 2 is closest in meaning to ________.",
      options: [
        { key: "A", text: "satisfy" },
        { key: "B", text: "alarm" },
        { key: "C", text: "attract" },
        { key: "D", text: "protect" }
      ],
      correct: "B",
      jurus: "Sinonim dalam konteks kalimat",
      explanation: "Konteks kalimat membahas mekanisme pertahanan untuk mengejutkan atau mengaburkan perhatian predator ('to startle or distract predators'). Kata 'startle' bersinonim dengan 'alarm' (mengejutkan/membuat waspada)."
    },
    {
      id: 29,
      section: "reading",
      sectionTitle: "Section 3: Reading Comprehension",
      passage: `Bioluminescence is the production and emission of light by a living organism. It is a form of chemiluminescence where light energy is released by a chemical reaction. Most bioluminescent organisms are found in the ocean, ranging from microscopic bacteria and dinoflagellates to deep-sea fish, jellyfish, and squid. On land, the most familiar example is the firefly.

The chemical reaction that produces bioluminescence requires two unique chemicals: luciferin and either luciferase or photoprotein. Luciferin is the compound that actually produces the light, while luciferase is an enzyme that catalyzes the reaction. In some cases, bioluminescence serves as a defense mechanism to startle or distract predators. For instance, certain species of deep-sea squid can eject a glowing cloud of bioluminescent fluid instead of black ink, confusing predators in the pitch-black abyss while the squid escapes. In other species, light emission is used to attract mates or lure unsuspecting prey into striking range.`,
      question: "Why does the deep-sea squid eject a glowing cloud instead of black ink in the abyss?",
      options: [
        { key: "A", text: "Black ink would be useless in total darkness." },
        { key: "B", text: "Black ink is harmful to the squid's delicate tentacles." },
        { key: "C", text: "The glowing cloud blinds the squid while escaping." },
        { key: "D", text: "It cannot synthesize ink at high pressure depths." }
      ],
      correct: "A",
      jurus: "Penalaran logis berbasis konteks",
      explanation: "Di lingkungan laut dalam yang gelap gulita ('pitch-black abyss'), tinta hitam tidak akan terlihat oleh pemangsa. Karena itu, awan bercahaya lebih efektif membingungkan predator."
    },
    {
      id: 30,
      section: "reading",
      sectionTitle: "Section 3: Reading Comprehension",
      passage: `Bioluminescence is the production and emission of light by a living organism. It is a form of chemiluminescence where light energy is released by a chemical reaction. Most bioluminescent organisms are found in the ocean, ranging from microscopic bacteria and dinoflagellates to deep-sea fish, jellyfish, and squid. On land, the most familiar example is the firefly.

The chemical reaction that produces bioluminescence requires two unique chemicals: luciferin and either luciferase or photoprotein. Luciferin is the compound that actually produces the light, while luciferase is an enzyme that catalyzes the reaction. In some cases, bioluminescence serves as a defense mechanism to startle or distract predators. For instance, certain species of deep-sea squid can eject a glowing cloud of bioluminescent fluid instead of black ink, confusing predators in the pitch-black abyss while the squid escapes. In other species, light emission is used to attract mates or lure unsuspecting prey into striking range.`,
      question: "All of the following are mentioned as biological purposes of bioluminescence EXCEPT ________.",
      options: [
        { key: "A", text: "attracting potential mates" },
        { key: "B", text: "regulating internal body heat" },
        { key: "C", text: "distracting dangerous predators" },
        { key: "D", text: "luring unsuspecting prey" }
      ],
      correct: "B",
      jurus: "Eliminasi opsi negatif",
      explanation: "Teks menyebutkan penarikan pasangan (A), pengalihan perhatian predator (C), dan penarikan mangsa (D). Pengaturan panas tubuh internal tidak disebutkan sama sekali dalam teks."
    }
  ]
};

// Skala konversi skor TOEFL ITP (30 butir soal dikalibrasi ke skala 310 - 677)
function calculateToeflScore(listeningCorrect, structureCorrect, readingCorrect) {
  const lScaled = 31 + Math.round((listeningCorrect / 10) * 37);
  const sScaled = 31 + Math.round((structureCorrect / 15) * 37);
  const rScaled = 31 + Math.round((readingCorrect / 5) * 36);

  const totalScore = Math.round(((lScaled + sScaled + rScaled) * 10) / 3);
  return {
    listeningScore: lScaled * 10,
    structureScore: sScaled * 10,
    readingScore: rScaled * 10,
    total: Math.max(310, Math.min(677, totalScore))
  };
}
