import { useState } from "react";

const ED = new Date("2026-04-05");

const SCHED = [
  {d:1,dt:"Mar 24",t:"Battlefield Scan",tk:["Solve 1 previous paper (untimed)","Identify strong/weak areas","Read Computer notes (your strength)"],hr:"7-9:30PM"},
  {d:2,dt:"Mar 25",t:"Computers I",tk:["Generations, Basics, Memory, I/O","MS Word, Excel, PowerPoint, Access","Practice 50 Computer MCQs"],hr:"7-9:30PM"},
  {d:3,dt:"Mar 26",t:"Computers II + Reasoning",tk:["OS, Email, Internet, Abbreviations","Number/Letter Series, Coding-Decoding","Practice 40 MCQs"],hr:"7-9:30PM"},
  {d:4,dt:"Mar 27",t:"Reasoning + Syllogisms",tk:["Blood Relations, Direction Sense","HEAVY: Statement-Conclusion (30+ Qs)","Practice ALL syllogism MCQs"],hr:"7-9:30PM"},
  {d:5,dt:"Mar 28",t:"Maths",tk:["Percentage, Average, Ratio, Profit/Loss","Time & Work, Speed/Distance","Practice 50 Maths MCQs"],hr:"7-9:30PM"},
  {d:6,dt:"Mar 29 (Sat)",t:"J&K GK Deep Dive",tk:["History, Geography, Rivers, Lakes, Passes","Culture, Tourism, Economy, Flora/Fauna","Practice 60 J&K MCQs","EXTRA TIME: Weekend!"],hr:"7-10PM+"},
  {d:7,dt:"Mar 30 (Sun)",t:"India GK + Polity",tk:["Constitution, Polity, History","Census, Transport, Rivers, Science","Practice 50 GK MCQs"],hr:"10AM-1PM + 7-9:30PM"},
  {d:8,dt:"Mar 31",t:"English I",tk:["Articles, Modals, Voice, Narration","Prepositions, Homophones, Punctuation","Practice 40 English MCQs"],hr:"7-9:30PM"},
  {d:9,dt:"Apr 1",t:"English II",tk:["Synonyms, Antonyms, Idioms","Comprehension, Jumbled, Editing","Practice 40 English MCQs"],hr:"7-9:30PM"},
  {d:10,dt:"Apr 2",t:"Previous Year Papers",tk:["Solve Previous Year Bank (this app)","Focus on most-repeated topics","Mark all wrong answers for review"],hr:"7-9:30PM"},
  {d:11,dt:"Apr 3",t:"Weak Areas + Syllogisms",tk:["Revise weakest unit","Re-do ALL Statement-Conclusion Qs","Re-attempt all wrong MCQs"],hr:"7-9:30PM"},
  {d:12,dt:"Apr 4",t:"Mock Test + Revision",tk:["80-Q timed mock (80 min)","Review wrong answers","Quick revision: J&K + Abbrev + Idioms"],hr:"7-10PM"},
  {d:13,dt:"Apr 5",t:"EXAM DAY 🎯",tk:["30-min quick revision","Admit card + ID + pen ready","Stay calm → Attempt ALL 80 Qs"],hr:"Morning"},
];

const CATS = {
  pyq: {
    title: "📋 Previous Year Questions",
    desc: "Questions asked in past JKSSB exams",
    subs: {
      pyq_jk: {
        title: "J&K GK (Previously Asked)", icon: "🏔️",
        mcqs: [
          {q:"Rajatarangini was written by?",opts:["Bilhana","Kalhana","Jonaraja","Srivara"],ans:1},
          {q:"The ancient name of river Jhelum is?",opts:["Chandrabhaga","Vitasta","Shatadru","Askini"],ans:1},
          {q:"Zain-ul-Abidin is also known as?",opts:["Sher-e-Kashmir","Budshah","Akbar","Sultan"],ans:1},
          {q:"Treaty of Amritsar was signed in?",opts:["1845","1846","1847","1849"],ans:1},
          {q:"The amount paid by Gulab Singh under Treaty of Amritsar?",opts:["50 lakh","75 lakh","100 lakh","25 lakh"],ans:1},
          {q:"Who was the last Dogra ruler of J&K?",opts:["Gulab Singh","Ranbir Singh","Pratap Singh","Hari Singh"],ans:3},
          {q:"Article 370 was abrogated on?",opts:["5 Aug 2019","31 Oct 2019","15 Aug 2019","26 Jan 2020"],ans:0},
          {q:"J&K was bifurcated into two UTs on?",opts:["5 Aug 2019","31 Oct 2019","26 Jan 2020","1 Nov 2019"],ans:1},
          {q:"How many districts are there in J&K UT?",opts:["18","20","22","14"],ans:1},
          {q:"Wular Lake is situated in which district?",opts:["Srinagar","Anantnag","Bandipora","Baramulla"],ans:2},
          {q:"Which is the largest freshwater lake in India?",opts:["Dal","Wular","Manasbal","Chilika"],ans:1},
          {q:"Verinag Spring is the source of which river?",opts:["Chenab","Tawi","Jhelum","Indus"],ans:2},
          {q:"Pampore in Kashmir is famous for?",opts:["Apples","Saffron","Walnuts","Rice"],ans:1},
          {q:"Zoji La Pass connects?",opts:["Jammu-Kashmir","Kashmir-Ladakh","India-China","J&K-HP"],ans:1},
          {q:"The summer capital of J&K is?",opts:["Jammu","Srinagar","Leh","Pahalgam"],ans:1},
          {q:"Banihal Pass connects?",opts:["Kashmir-Ladakh","Jammu-Kashmir","India-Pakistan","Kashmir-HP"],ans:1},
          {q:"Who founded the Shah Mir dynasty?",opts:["Zain-ul-Abidin","Shah Mir","Rinchana","Sultan Sikandar"],ans:1},
          {q:"Instrument of Accession was signed on?",opts:["15 Aug 1947","26 Oct 1947","26 Jan 1950","1 Nov 1947"],ans:1},
          {q:"Shalimar Bagh in Srinagar was built by?",opts:["Akbar","Jahangir","Shah Jahan","Aurangzeb"],ans:1},
          {q:"Habba Khatoon is known as?",opts:["Nightingale of Kashmir","Lion of Kashmir","Star of Kashmir","Rose of Kashmir"],ans:0},
          {q:"State animal of J&K is?",opts:["Snow Leopard","Markhor","Hangul","Musk Deer"],ans:2},
          {q:"Chinar tree is also known as?",opts:["Deodar","Oriental Plane","Pine","Walnut"],ans:1},
          {q:"4th Buddhist Council was held during reign of?",opts:["Ashoka","Kanishka","Harsha","Menander"],ans:1},
          {q:"Martand Sun Temple was built by?",opts:["Ashoka","Lalitaditya Muktapida","Kanishka","Avantivarman"],ans:1},
          {q:"Sheikh Abdullah was called?",opts:["Budshah","Sher-e-Kashmir","Babr-e-Kashmir","Fakhr-e-Kashmir"],ans:1},
          {q:"Raghunath Temple in Jammu was built by?",opts:["Gulab Singh","Ranbir Singh","Pratap Singh","Hari Singh"],ans:1},
          {q:"Vaishno Devi shrine is located in?",opts:["Jammu","Udhampur","Reasi","Kathua"],ans:2},
          {q:"Tawi river flows through which city?",opts:["Srinagar","Jammu","Anantnag","Rajouri"],ans:1},
          {q:"Chenab river is also known as?",opts:["Vitasta","Chandrabhaga","Shatadru","Purushni"],ans:1},
          {q:"Rouf is a folk dance of?",opts:["Jammu","Kashmir","Ladakh","Punjab"],ans:1},
          {q:"Dogri language was included in 8th Schedule in?",opts:["2000","2003","2005","2008"],ans:1},
          {q:"Official language of J&K UT is?",opts:["Kashmiri","Dogri","Urdu","Hindi"],ans:2},
          {q:"Gulmarg is famous for?",opts:["Saffron","Skiing","Houseboats","Temples"],ans:1},
          {q:"Dal Lake is known as?",opts:["Srinagar's crown","Jewel of Kashmir","Paradise Lake","Golden Lake"],ans:1},
          {q:"Pashmina wool comes from?",opts:["Sheep","Angora goat","Changthangi goat","Yak"],ans:2},
          {q:"Basohli paintings belong to?",opts:["Srinagar","Kathua","Jammu","Rajouri"],ans:1},
          {q:"Wazwan feast has how many courses?",opts:["24","30","36","42"],ans:2},
          {q:"First LG of J&K UT?",opts:["Manoj Sinha","G.C. Murmu","Satya Pal Malik","N.N. Vohra"],ans:1},
          {q:"Dachigam National Park is famous for?",opts:["Tiger","Hangul","Snow Leopard","Elephant"],ans:1},
          {q:"Amarnath Cave is in which district?",opts:["Srinagar","Anantnag","Ganderbal","Shopian"],ans:1},
        ]
      },
      pyq_gk: {
        title: "India GK & Polity (Previously Asked)", icon: "📚",
        mcqs: [
          {q:"Who is called Father of Indian Constitution?",opts:["Nehru","Gandhi","B.R. Ambedkar","Patel"],ans:2},
          {q:"Indian Constitution was adopted on?",opts:["26 Jan 1950","26 Nov 1949","15 Aug 1947","26 Jan 1949"],ans:1},
          {q:"Article 32 is called?",opts:["Right to Freedom","Heart & Soul of Constitution","Right to Equality","Right to Education"],ans:1},
          {q:"Minimum age for Lok Sabha member?",opts:["21","25","30","35"],ans:1},
          {q:"Minimum age for Rajya Sabha member?",opts:["21","25","30","35"],ans:2},
          {q:"Fundamental Duties were added by which Amendment?",opts:["42nd","44th","73rd","86th"],ans:0},
          {q:"42nd Amendment is known as?",opts:["Mini Constitution","Basic Structure","Magna Carta","Bill of Rights"],ans:0},
          {q:"President's Rule is under Article?",opts:["352","356","360","370"],ans:1},
          {q:"Money Bill can be introduced in?",opts:["Rajya Sabha","Lok Sabha","Both Houses","Joint Session"],ans:1},
          {q:"Who appoints the Governor?",opts:["PM","CM","President","CJI"],ans:2},
          {q:"INC was founded in?",opts:["1857","1885","1906","1920"],ans:1},
          {q:"Jallianwala Bagh massacre occurred in?",opts:["1917","1919","1921","1930"],ans:1},
          {q:"Who gave the slogan 'Do or Die'?",opts:["Nehru","Subhash","Gandhi","Tilak"],ans:2},
          {q:"Battle of Plassey was fought in?",opts:["1757","1764","1857","1947"],ans:0},
          {q:"First Battle of Panipat was in?",opts:["1526","1556","1576","1761"],ans:0},
          {q:"National Bird of India?",opts:["Sparrow","Parrot","Peacock","Crane"],ans:2},
          {q:"National Tree of India?",opts:["Neem","Peepal","Banyan","Mango"],ans:2},
          {q:"First Nobel Prize winner from India?",opts:["CV Raman","Tagore","Mother Teresa","Amartya Sen"],ans:1},
          {q:"Bharat Ratna is?",opts:["Military award","Highest civilian award","Sports award","Literary award"],ans:1},
          {q:"Longest river in India?",opts:["Yamuna","Godavari","Ganga","Brahmaputra"],ans:2},
          {q:"Chilika Lake is in?",opts:["Kerala","Odisha","Tamil Nadu","West Bengal"],ans:1},
          {q:"Largest state by area in India?",opts:["MP","UP","Rajasthan","Maharashtra"],ans:2},
          {q:"Most literate state in India?",opts:["Goa","Kerala","Mizoram","Tripura"],ans:1},
          {q:"Census is conducted every?",opts:["5 years","10 years","15 years","7 years"],ans:1},
          {q:"Longest National Highway in India?",opts:["NH-1","NH-44","NH-7","NH-2"],ans:1},
          {q:"Vitamin C deficiency causes?",opts:["Rickets","Scurvy","Night blindness","Beriberi"],ans:1},
          {q:"Universal blood donor group?",opts:["A","B","AB","O"],ans:3},
          {q:"Smallest bone in human body?",opts:["Femur","Stapes","Radius","Ulna"],ans:1},
          {q:"Speed of light?",opts:["3×10⁶","3×10⁸","3×10⁵","3×10¹⁰"],ans:1},
          {q:"pH of pure water?",opts:["0","5","7","14"],ans:2},
          {q:"Ozone layer is in?",opts:["Troposphere","Stratosphere","Mesosphere","Thermosphere"],ans:1},
          {q:"Ashoka embraced Buddhism after which battle?",opts:["Panipat","Kalinga","Plassey","Haldighati"],ans:1},
          {q:"Great Bath was found at?",opts:["Harappa","Mohenjo-daro","Lothal","Kalibangan"],ans:1},
          {q:"Arthashastra was written by?",opts:["Ashoka","Chanakya","Kalidasa","Aryabhatta"],ans:1},
          {q:"Vice President is Chairman of?",opts:["Lok Sabha","Rajya Sabha","Supreme Court","UPSC"],ans:1},
          {q:"Right to Education under which Article?",opts:["21","21A","14","19"],ans:1},
          {q:"Golden Quadrilateral connects?",opts:["4 metro cities","4 states","4 rivers","4 capitals"],ans:0},
          {q:"Sex ratio is highest in?",opts:["UP","Kerala","Bihar","Rajasthan"],ans:1},
          {q:"Narmada river flows into?",opts:["Bay of Bengal","Arabian Sea","Indian Ocean","Palk Strait"],ans:1},
          {q:"Godavari is longest ___ river.",opts:["North Indian","Peninsular","Western","Eastern"],ans:1},
        ]
      },
      pyq_eng: {
        title: "English (Previously Asked)", icon: "📝",
        mcqs: [
          {q:"Synonym of 'Abandon'?",opts:["Accept","Forsake","Keep","Hold"],ans:1},
          {q:"Synonym of 'Magnificent'?",opts:["Ordinary","Grand","Small","Ugly"],ans:1},
          {q:"Synonym of 'Diligent'?",opts:["Lazy","Careless","Hardworking","Slow"],ans:2},
          {q:"Synonym of 'Hostile'?",opts:["Friendly","Unfriendly","Warm","Kind"],ans:1},
          {q:"Synonym of 'Inevitable'?",opts:["Avoidable","Optional","Unavoidable","Uncertain"],ans:2},
          {q:"Antonym of 'Permanent'?",opts:["Lasting","Temporary","Stable","Fixed"],ans:1},
          {q:"Antonym of 'Victory'?",opts:["Win","Success","Triumph","Defeat"],ans:3},
          {q:"Antonym of 'Expand'?",opts:["Extend","Contract","Enlarge","Grow"],ans:1},
          {q:"Antonym of 'Bold'?",opts:["Brave","Courageous","Timid","Strong"],ans:2},
          {q:"Antonym of 'Generous'?",opts:["Kind","Charitable","Miserly","Liberal"],ans:2},
          {q:"'Burn midnight oil' means?",opts:["Waste fuel","Work/study late","Cook","Travel"],ans:1},
          {q:"'White elephant' means?",opts:["Rare","Costly but useless","Sacred","Big"],ans:1},
          {q:"'Spill the beans' means?",opts:["Cook","Reveal secret","Waste","Plant"],ans:1},
          {q:"'Once in a blue moon' means?",opts:["Daily","Monthly","Very rarely","Never"],ans:2},
          {q:"'A piece of cake' means?",opts:["Tasty","Very easy","Expensive","Difficult"],ans:1},
          {q:"Choose correct article: ___ honest man.",opts:["A","An","The","No article"],ans:1},
          {q:"Choose: ___ university is good.",opts:["A","An","The","No article"],ans:0},
          {q:"He is senior ___ me.",opts:["than","to","from","of"],ans:1},
          {q:"I prefer tea ___ coffee.",opts:["than","to","over","from"],ans:1},
          {q:"Each of the boys ___ a prize.",opts:["have","has","having","had"],ans:1},
          {q:"Passive of 'She writes a letter'?",opts:["A letter is written by her","A letter was written","A letter written by her","A letter has been written"],ans:0},
          {q:"Passive of 'Open the door'?",opts:["The door is opened","Let the door be opened","Door was opened","Open the door"],ans:1},
          {q:"He said, 'I am tired.' (Indirect)?",opts:["He said he is tired","He said that he was tired","He told he was tired","He says he was tired"],ans:1},
          {q:"She said, 'I will come tomorrow.' (Indirect)?",opts:["She said she will come","She said she would come the next day","She said she would come tomorrow","She told she will come"],ans:1},
          {q:"'Return back' is error because?",opts:["Return means come back","Back is noun","No error","Return is adjective"],ans:0},
          {q:"'Principal' means?",opts:["Rule/law","Head/main","Belief","Theory"],ans:1},
          {q:"'Stationery' means?",opts:["Not moving","Paper and pens","A position","A station"],ans:1},
          {q:"One who loves books is called?",opts:["Bibliophobe","Bibliophile","Philosopher","Biographer"],ans:1},
          {q:"Walking in sleep is called?",opts:["Insomnia","Somnambulism","Amnesia","Vertigo"],ans:1},
          {q:"'Cost an arm and leg' means?",opts:["Cheap","Free","Very expensive","Dangerous"],ans:2},
        ]
      },
      pyq_comp: {
        title: "Computers (Previously Asked)", icon: "💻",
        mcqs: [
          {q:"Father of Computer?",opts:["Vint Cerf","Charles Babbage","Bill Gates","Tim Berners-Lee"],ans:1},
          {q:"CPU stands for?",opts:["Central Processing Unit","Central Programming Unit","Computer Processing Unit","Central Peripheral Unit"],ans:0},
          {q:"1 KB equals?",opts:["1000 Bytes","1024 Bytes","1024 Bits","1000 Bits"],ans:1},
          {q:"RAM is?",opts:["Non-volatile","Volatile","Permanent","ROM"],ans:1},
          {q:"BIOS is stored in?",opts:["RAM","ROM","Cache","HDD"],ans:1},
          {q:"Which generation used Vacuum Tubes?",opts:["1st","2nd","3rd","4th"],ans:0},
          {q:"Which generation used ICs?",opts:["1st","2nd","3rd","4th"],ans:2},
          {q:"Ctrl+Z is for?",opts:["Redo","Undo","Zoom","Close"],ans:1},
          {q:"F12 in MS Office?",opts:["Print","Save As","Help","Find"],ans:1},
          {q:"F7 in MS Word?",opts:["Save","Spell Check","Print","Find"],ans:1},
          {q:"MS Excel extension?",opts:[".docx",".pptx",".xlsx",".accdb"],ans:2},
          {q:"VLOOKUP searches?",opts:["Horizontally","Vertically","Diagonally","Randomly"],ans:1},
          {q:"Rows in Excel?",opts:["65536","1048576","256","16384"],ans:1},
          {q:"WWW invented by?",opts:["Vint Cerf","Tim Berners-Lee","Ray Tomlinson","Bill Gates"],ans:1},
          {q:"Email invented by?",opts:["Tim Berners-Lee","Vint Cerf","Ray Tomlinson","Bill Gates"],ans:2},
          {q:"SMTP is for?",opts:["Browsing","Sending email","Receiving email","Files"],ans:1},
          {q:"DNS converts?",opts:["IP→Domain","Domain→IP","URL→Email","Binary→Text"],ans:1},
          {q:"IPv4 is ___ bits.",opts:["16","32","64","128"],ans:1},
          {q:"Linux is?",opts:["Proprietary","Open source","Hardware","Firmware"],ans:1},
          {q:"Firewall provides?",opts:["Speed","Security","Storage","Power"],ans:1},
          {q:"Star topology has?",opts:["Single cable","Central hub","Circle","No hub"],ans:1},
          {q:"Modem converts?",opts:["AC→DC","Digital↔Analog","Text→Binary","Audio→Video"],ans:1},
          {q:"MS Access is?",opts:["Word processor","Spreadsheet","DBMS","Presentation"],ans:2},
          {q:"Primary Key means?",opts:["Duplicate allowed","Unique identifier","Null allowed","Foreign link"],ans:1},
          {q:"Scanner is ___ device.",opts:["Output","Input","Storage","Processing"],ans:1},
          {q:"Laser printer is?",opts:["Impact","Non-impact","Manual","Thermal"],ans:1},
          {q:"Compiler translates?",opts:["Line by line","Whole program","Char by char","Word by word"],ans:1},
          {q:"Binary base is?",opts:["2","8","10","16"],ans:0},
          {q:"ASCII uses ___ bits.",opts:["5","6","7","8"],ans:2},
          {q:"HTML stands for?",opts:["HyperText Markup Language","High Tech Modern Language","Hyper Transfer ML","Home Tool ML"],ans:0},
        ]
      },
      pyq_math: {
        title: "Maths & Reasoning (Previously Asked)", icon: "🧮",
        mcqs: [
          {q:"36% of 50 = ?",opts:["18","15","20","16"],ans:0},
          {q:"25% of 480 = ?",opts:["100","110","120","125"],ans:2},
          {q:"If CP=400 and SP=500, Profit%?",opts:["20%","25%","10%","15%"],ans:1},
          {q:"Average of first 10 natural numbers?",opts:["5","5.5","6","10"],ans:1},
          {q:"SI on ₹5000 at 8% for 3 years?",opts:["₹1200","₹1000","₹800","₹1500"],ans:0},
          {q:"72 km/h = ? m/s",opts:["15","20","25","10"],ans:1},
          {q:"LCM of 12 and 18?",opts:["24","36","48","72"],ans:1},
          {q:"HCF of 36 and 48?",opts:["6","8","12","24"],ans:2},
          {q:"Series: 2,6,18,54,?",opts:["108","162","148","156"],ans:1},
          {q:"Series: 1,4,9,16,25,?",opts:["30","36","35","49"],ans:1},
          {q:"If CLOUD=DMPVE, then RAIN=?",opts:["SBJO","SBJM","RBJO","QBJO"],ans:0},
          {q:"Raj is 15th from left, 10th from right. Total?",opts:["24","25","26","23"],ans:0},
          {q:"A walks 5km N, right 3km, right 5km. Distance from start?",opts:["3km","5km","8km","13km"],ans:0},
          {q:"17² = ?",opts:["279","289","299","269"],ans:1},
          {q:"√144 = ?",opts:["11","12","13","14"],ans:1},
        ]
      },
    }
  },
  syl: {
    title: "🔥 Syllogism / Statement-Conclusion",
    desc: "MOST ASKED in recent JKSSB papers — practice heavily!",
    subs: {
      syl_basic: {
        title: "Basic Syllogisms (All/Some/No)", icon: "🧠",
        notes: [
          {topic:"Syllogism Rules (MUST MEMORIZE)",points:[
            "FORMAT: Two Statements given → Check if Conclusions follow",
            "All A are B = Every A is B (complete overlap or A inside B)",
            "Some A are B = At least one A is B (partial overlap)",
            "No A is B = Zero overlap between A and B",
            "All A are B → Some A are B ✓ (if all, then definitely some)",
            "All A are B → Some B are A ✓ (reverse of All gives Some)",
            "No A is B → No B is A ✓ (reversible)",
            "Some A are B → Some B are A ✓ (reversible)",
            "Some A are not B → CANNOT be reversed",
            "GOLDEN RULES: All+All=All | All+No=No | All+Some=Some | Some+Some=No conclusion",
            "If both conclusions can be true simultaneously but neither follows definitely → 'Either I or II'",
          ]},
          {topic:"How to Solve (Step by Step)",points:[
            "Step 1: Draw Venn diagram for Statement 1",
            "Step 2: Extend diagram for Statement 2",
            "Step 3: Check each conclusion against the diagram",
            "Step 4: If conclusion MUST be true in ALL possible diagrams → Follows",
            "Step 5: If conclusion CAN be false in any valid diagram → Does NOT follow",
            "TRICK: For 'Some A are not B' conclusions, check if there's any A outside B circle",
            "TRICK: 'Either I or II' = Both can't be true together, but one must be true",
          ]},
          {topic:"Common Patterns JKSSB Loves",points:[
            "Pattern 1: All A are B. All B are C. → All A are C ✓ | Some C are A ✓",
            "Pattern 2: Some A are B. All B are C. → Some A are C ✓ | Some C are A ✓",
            "Pattern 3: All A are B. No B is C. → No A is C ✓ | No C is A ✓",
            "Pattern 4: Some A are B. Some B are C. → NO definite conclusion between A and C",
            "Pattern 5: No A is B. All B are C. → Some C are not A ✓",
            "Pattern 6: All A are B. Some B are not C. → NO definite conclusion about A and C",
            "REMEMBER: In JKSSB they often give 4 options: Only I, Only II, Both I & II, Neither I nor II",
          ]},
        ],
        mcqs: [
          {q:"Statements: All dogs are cats. All cats are birds.\nConclusion I: All dogs are birds.\nConclusion II: Some birds are dogs.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
          {q:"Statements: All pens are pencils. All pencils are erasers.\nConclusion I: All pens are erasers.\nConclusion II: All erasers are pens.",opts:["Only I","Only II","Both I & II","Neither"],ans:0},
          {q:"Statements: Some books are pens. All pens are chairs.\nConclusion I: Some books are chairs.\nConclusion II: All chairs are books.",opts:["Only I","Only II","Both I & II","Neither"],ans:0},
          {q:"Statements: No man is a woman. All women are beautiful.\nConclusion I: No man is beautiful.\nConclusion II: Some beautiful are not men.",opts:["Only I","Only II","Both I & II","Neither"],ans:1},
          {q:"Statements: All roses are flowers. Some flowers are red.\nConclusion I: Some roses are red.\nConclusion II: All red are roses.",opts:["Only I","Only II","Both I & II","Neither"],ans:3},
          {q:"Statements: All teachers are students. No student is a doctor.\nConclusion I: No teacher is a doctor.\nConclusion II: Some students are teachers.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
          {q:"Statements: Some apples are mangoes. Some mangoes are oranges.\nConclusion I: Some apples are oranges.\nConclusion II: No apple is an orange.",opts:["Only I","Only II","Either I or II","Neither"],ans:2},
          {q:"Statements: All kings are queens. All queens are jacks.\nConclusion I: All kings are jacks.\nConclusion II: Some jacks are kings.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
          {q:"Statements: No cat is dog. No dog is rat.\nConclusion I: No cat is rat.\nConclusion II: Some rats are not cats.",opts:["Only I","Only II","Both I & II","Neither"],ans:3},
          {q:"Statements: All rivers are lakes. No lake is a pond.\nConclusion I: No river is a pond.\nConclusion II: Some lakes are rivers.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
          {q:"Statements: Some boys are girls. All girls are students.\nConclusion I: Some boys are students.\nConclusion II: All students are girls.",opts:["Only I","Only II","Both I & II","Neither"],ans:0},
          {q:"Statements: All metals are gold. All gold is silver.\nConclusion I: All metals are silver.\nConclusion II: Some silver is metal.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
          {q:"Statements: No shirt is trouser. All trousers are coats.\nConclusion I: No shirt is coat.\nConclusion II: Some coats are not shirts.",opts:["Only I","Only II","Both I & II","Neither"],ans:1},
          {q:"Statements: All cars are buses. Some buses are trains.\nConclusion I: Some cars are trains.\nConclusion II: Some trains are buses.",opts:["Only I","Only II","Both I & II","Neither"],ans:1},
          {q:"Statements: All A are B. No B is C.\nConclusion I: No A is C.\nConclusion II: No C is A.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
        ]
      },
      syl_adv: {
        title: "Advanced Syllogisms (JKSSB Pattern)", icon: "🔥",
        mcqs: [
          {q:"Statements: All fruits are vegetables. Some vegetables are roots.\nConclusion I: Some fruits are roots.\nConclusion II: Some roots are vegetables.",opts:["Only I","Only II","Both I & II","Neither"],ans:1},
          {q:"Statements: All chairs are tables. All tables are wood.\nConclusion I: All chairs are wood.\nConclusion II: All wood are chairs.",opts:["Only I","Only II","Both I & II","Neither"],ans:0},
          {q:"Statements: Some doctors are engineers. All engineers are teachers.\nConclusion I: Some doctors are teachers.\nConclusion II: Some teachers are doctors.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
          {q:"Statements: No bird is animal. All animals are humans.\nConclusion I: No bird is human.\nConclusion II: Some humans are not birds.",opts:["Only I","Only II","Both I & II","Neither"],ans:1},
          {q:"Statements: All cups are plates. No plate is glass.\nConclusion I: No cup is glass.\nConclusion II: Some cups are not glass.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
          {q:"Statements: Some red are blue. Some blue are green.\nConclusion I: Some red are green.\nConclusion II: No red is green.",opts:["Only I","Only II","Either I or II","Neither"],ans:2},
          {q:"Statements: All phones are laptops. Some laptops are tablets.\nConclusion I: Some phones are tablets.\nConclusion II: All tablets are laptops.",opts:["Only I","Only II","Both I & II","Neither"],ans:3},
          {q:"Statements: No pen is eraser. All erasers are sharpeners.\nConclusion I: No pen is sharpener.\nConclusion II: Some sharpeners are not pens.",opts:["Only I","Only II","Both I & II","Neither"],ans:1},
          {q:"Statements: All stars are moons. All moons are planets. No planet is a sun.\nConclusion I: No star is a sun.\nConclusion II: All stars are planets.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
          {q:"Statements: Some men are women. Some women are children.\nConclusion I: Some men are children.\nConclusion II: All children are women.",opts:["Only I","Only II","Both I & II","Neither"],ans:3},
          {q:"Statements: All students are intelligent. No intelligent person is dull.\nConclusion I: No student is dull.\nConclusion II: Some intelligent are students.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
          {q:"Statements: All politicians are liars. Some liars are thieves.\nConclusion I: Some politicians are thieves.\nConclusion II: Some thieves are liars.",opts:["Only I","Only II","Both I & II","Neither"],ans:1},
          {q:"Statements: All fish are whales. No whale is a shark.\nConclusion I: No fish is a shark.\nConclusion II: Some fish are not sharks.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
          {q:"Statements: Some lions are tigers. All tigers are cats.\nConclusion I: Some lions are cats.\nConclusion II: All cats are tigers.",opts:["Only I","Only II","Both I & II","Neither"],ans:0},
          {q:"Statements: No house is a school. All schools are colleges.\nConclusion I: No house is a college.\nConclusion II: Some colleges are not houses.",opts:["Only I","Only II","Both I & II","Neither"],ans:1},
          {q:"Statements: All winters are cold. All cold are dry.\nConclusion I: All winters are dry.\nConclusion II: Some dry are winters.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
          {q:"Statements: Some trees are plants. All plants are herbs.\nConclusion I: Some trees are herbs.\nConclusion II: All herbs are trees.",opts:["Only I","Only II","Both I & II","Neither"],ans:0},
          {q:"Statements: No X is Y. No Y is Z.\nConclusion I: No X is Z.\nConclusion II: Some Z are not X.",opts:["Only I","Only II","Either I or II","Neither"],ans:3},
          {q:"Statements: All water is liquid. Some liquid is gas.\nConclusion I: Some water is gas.\nConclusion II: All liquid is water.",opts:["Only I","Only II","Both I & II","Neither"],ans:3},
          {q:"Statements: All circles are squares. All squares are triangles.\nConclusion I: All circles are triangles.\nConclusion II: Some triangles are not circles.",opts:["Only I","Only II","Both I & II","Neither"],ans:2},
        ]
      },
      syl_stmt: {
        title: "Statement & Assumption/Argument", icon: "💡",
        notes: [
          {topic:"Statement-Assumption",points:[
            "Assumption = Something taken for granted / believed to be true (not stated directly)",
            "If statement says 'Buy X for best quality' → Assumption: People want quality",
            "If statement says 'Come to coaching for selection' → Assumption: Coaching helps in selection",
            "Test: Remove the assumption. Does the statement still make sense? If NO → it IS an assumption",
            "Overly broad assumptions are usually WRONG (e.g., 'everyone will buy' from an ad)",
            "Very specific assumptions matching the statement are usually CORRECT",
          ]},
          {topic:"Statement-Argument",points:[
            "Strong argument: Directly related, factual, important aspect of the topic",
            "Weak argument: Vague, emotional, irrelevant, extreme, personal opinion",
            "'Everyone does it' = WEAK | 'Studies show...' = STRONG",
            "'It has always been like this' = WEAK | 'It saves 30% cost' = STRONG",
            "Ambiguous or overly emotional arguments = WEAK",
          ]},
          {topic:"Statement-Course of Action",points:[
            "Course of action = What should be done about a problem",
            "Valid: Practical, addresses the problem, can be implemented",
            "Invalid: Extreme, impractical, unrelated to problem, negative approach",
            "'Ban everything' = Usually invalid | 'Investigate and take action' = Usually valid",
            "'Government should look into matter' = Usually valid (practical step)",
          ]},
        ],
        mcqs: [
          {q:"Statement: 'Join ABC coaching for guaranteed selection.'\nAssumption I: Coaching helps in selection.\nAssumption II: Everyone who joins gets selected.",opts:["Only I","Only II","Both","Neither"],ans:0},
          {q:"Statement: 'Buy brand X soap — 100% germ protection.'\nAssumption I: People want germ protection.\nAssumption II: No other soap provides germ protection.",opts:["Only I","Only II","Both","Neither"],ans:0},
          {q:"Statement: 'Government increased tax on cigarettes.'\nAssumption I: People may reduce smoking.\nAssumption II: Government wants to increase revenue.",opts:["Only I","Only II","Both","Either I or II"],ans:2},
          {q:"Statement: 'Please do not use mobile while driving.'\nAssumption I: Using mobile while driving is dangerous.\nAssumption II: People use mobiles while driving.",opts:["Only I","Only II","Both","Neither"],ans:2},
          {q:"Statement: 'If it rains, the match will be cancelled.'\nAssumption I: Rain affects outdoor activities.\nAssumption II: It may rain.",opts:["Only I","Only II","Both","Neither"],ans:2},
          {q:"Statement: 'The company should hire more employees to meet demand.'\nArgument I: Yes, current employees are overworked and quality is suffering.\nArgument II: No, because it has always been managed like this.",opts:["Only I is strong","Only II is strong","Both strong","Neither strong"],ans:0},
          {q:"Statement: 'Should India ban plastic bags?'\nArgument I: Yes, they cause severe environmental pollution.\nArgument II: No, many other countries also use plastic bags.",opts:["Only I is strong","Only II is strong","Both","Neither"],ans:0},
          {q:"Statement: 'Schools should teach financial literacy.'\nArgument I: Yes, it will help students manage money in adult life.\nArgument II: No, school syllabus is already too heavy.",opts:["Only I","Only II","Both strong","Neither"],ans:2},
          {q:"Statement: 'Heavy rain caused flooding in the city.'\nCourse I: Government should improve drainage system.\nCourse II: People should be relocated to other cities.",opts:["Only I","Only II","Both","Neither"],ans:0},
          {q:"Statement: 'Increasing road accidents in the city.'\nCourse I: Strict enforcement of traffic rules.\nCourse II: Ban all vehicles in the city.",opts:["Only I","Only II","Both","Neither"],ans:0},
          {q:"Statement: 'Pollution levels in Delhi are very high.'\nAssumption: People are concerned about their health.",opts:["Implicit","Not implicit","Can't determine","Irrelevant"],ans:0},
          {q:"Statement: 'Apply before 15th March to get early bird discount.'\nAssumption I: Some people may apply before 15th March.\nAssumption II: Discount motivates early application.",opts:["Only I","Only II","Both","Neither"],ans:2},
          {q:"Statement: 'Should working hours be reduced to 6 hours?'\nArgument I: Yes, employees will be more productive with better rest.\nArgument II: No, many employees already waste time at work.",opts:["Only I","Only II","Both","Neither"],ans:0},
          {q:"Statement: 'Drink boiled water during monsoon.'\nAssumption I: Boiling water kills germs.\nAssumption II: Monsoon water may contain germs.",opts:["Only I","Only II","Both","Neither"],ans:2},
          {q:"Statement: 'No one should be above the law.'\nAssumption: Some people consider themselves above the law.",opts:["Implicit","Not implicit","Both","Neither"],ans:0},
        ]
      },
    }
  },
  full: {
    title: "📖 Full Study Notes + MCQs",
    desc: "Complete syllabus-matched notes with practice questions",
    subs: {
      full_eng: {
        title: "English Complete", icon: "📝",
        notes: [
          {topic:"Articles",points:["A: consonant sounds (a boy, a university, a European, a one-rupee)","An: vowel sounds (an apple, an hour, an honest, an MLA, an MP)","The: unique/specific (the sun, the Ganga, the USA, superlatives, ordinals)","No article: proper nouns, meals, games, languages"]},
          {topic:"Modals",points:["Can/Could: ability/request | May/Might: permission/possibility","Shall/Should: future/advice | Will/Would: future/polite/past habit","Must: compulsion | Ought to: moral duty | Used to: past habit","Need: necessity | Dare: courage"]},
          {topic:"Active-Passive Voice",points:["Active: S+V+O → Passive: O+be+V3+by+S","Simple Present: writes→is written | Past: wrote→was written","Present Continuous: is writing→is being written | Perfect: has written→has been written","Modal: can write→can be written | Imperative: 'Close door'→'Let the door be closed'"]},
          {topic:"Narration (Direct-Indirect)",points:["Past reporting → tense shifts back: am→was, will→would, have→had","Pronouns change | Said to→Told | Today→that day, Tomorrow→next day, Here→there","Questions: asked+if/whether (yes/no) or asked+wh-word (wh-questions)","Commands: told/ordered+to | Negative: told+not to"]},
          {topic:"Preposition Rules",points:["At(time/point), In(month/year/city), On(day/date/surface)","Since+point, For+duration | Between(2), Among(3+)","Senior/Junior/Prefer → TO (not than) | Good AT, Fond OF, Interested IN"]},
          {topic:"Idioms Quick Reference",points:["Piece of cake=Easy | White elephant=Costly useless | Burn midnight oil=Study late","Spill beans=Reveal secret | Blue moon=Rarely | Eye to eye=Agree","Arm & leg=Expensive | Bell the cat=Risky task | Achilles heel=Weakness","Apple of discord=Quarrel cause | Cold shoulder=Ignore | New leaf=Fresh start"]},
        ],
        mcqs: [
          {q:"___ European came to visit us.",opts:["A","An","The","No article"],ans:0},
          {q:"He is ___ M.P. from Delhi.",opts:["a","an","the","no article"],ans:1},
          {q:"___ Ganga is a holy river.",opts:["A","An","The","No article"],ans:2},
          {q:"You ___ not park here. (prohibition)",opts:["can","may","must","shall"],ans:2},
          {q:"He ___ play piano when he was young.",opts:["can","could","may","shall"],ans:1},
          {q:"We ___ to help the needy. (moral duty)",opts:["could","would","ought","might"],ans:2},
          {q:"Passive: 'They have completed the project.'",opts:["The project has been completed by them","The project is completed","The project was completed","The project had been completed"],ans:0},
          {q:"Passive: 'Do not disturb him.'",opts:["Let him not be disturbed","He is not disturbed","He should not disturb","Him not to be disturbed"],ans:0},
          {q:"Indirect: He said, 'I have finished my work.'",opts:["He said he has finished","He said he had finished his work","He said he finished","He told he had finished"],ans:1},
          {q:"Indirect: 'Where are you going?' she asked.",opts:["She asked where are you going","She asked where I was going","She told where I was going","She asked where was I going"],ans:1},
          {q:"Correct preposition: 'He died ___ cancer.'",opts:["from","by","of","with"],ans:2},
          {q:"'Beside' means?",opts:["In addition to","Next to","Apart from","Instead of"],ans:1},
          {q:"'Besides' means?",opts:["Next to","In addition to","Without","Instead"],ans:1},
          {q:"Synonym of 'Candid'?",opts:["Secretive","Frank","Shy","Cunning"],ans:1},
          {q:"Antonym of 'Benevolent'?",opts:["Kind","Generous","Malevolent","Caring"],ans:2},
          {q:"'Sit on the fence' means?",opts:["Rest","Undecided","Guard","Watch"],ans:1},
          {q:"'Blessing in disguise' means?",opts:["Hidden curse","Good from bad","Religious","Disguise"],ans:1},
          {q:"'Feather in one's cap' means?",opts:["Hat decoration","Achievement","Bird watching","Fashion"],ans:1},
          {q:"Antonym of 'Affluent'?",opts:["Rich","Wealthy","Poor","Prosperous"],ans:2},
          {q:"One who can't pay debts?",opts:["Bankrupt","Insolvent","Poor","Debtor"],ans:1},
        ]
      },
      full_math: {
        title: "Maths & Reasoning Complete", icon: "🧮",
        notes: [
          {topic:"Percentage & Average",points:["X% of Y = XY/100 | Fractions: 10%=1/10, 20%=1/5, 25%=1/4, 50%=1/2","Successive: a% then b% = a+b+ab/100","Average: Sum/Count | First n natural: (n+1)/2"]},
          {topic:"Profit/Loss & Interest",points:["P%=(SP-CP)/CP×100 | L%=(CP-SP)/CP×100 | Discount%=Disc/MP×100","SI=PRT/100 | CI=P(1+R/100)^T-P | Doubles in T yrs → R=100/T"]},
          {topic:"Time-Work & Speed-Distance",points:["A(a days)+B(b days)=ab/(a+b) together | S=D/T","km/h→m/s: ×5/18 | Avg speed(same D)=2S₁S₂/(S₁+S₂)","Train+pole: L/S | Train+platform: (L₁+L₂)/S"]},
          {topic:"Series & Coding",points:["Check: +const, ×const, squares, cubes, primes, fibonacci, alternating diffs","Coding: Letter shift (+1: A→B), reverse, number substitution","A=1...Z=26 | Opposite pairs sum=27: A↔Z, B↔Y"]},
          {topic:"Blood Relations & Direction",points:["Draw family tree ALWAYS | Read from END to START","N-E-S-W clockwise | Right from N=E | Total = Left+Right-1"]},
        ],
        mcqs: [
          {q:"If 30% of X = 150, X = ?",opts:["450","500","600","550"],ans:1},
          {q:"12.5% of 640 = ?",opts:["80","64","100","72"],ans:0},
          {q:"Successive discount 20% then 10%?",opts:["28%","30%","27%","25%"],ans:0},
          {q:"A:B = 3:5, total = 240. A's share?",opts:["80","90","100","120"],ans:1},
          {q:"Average of 15,25,35,45,55?",opts:["30","35","40","45"],ans:1},
          {q:"CP=₹600, Loss=20%. SP=?",opts:["₹480","₹500","₹520","₹450"],ans:0},
          {q:"MP=₹800, Discount=15%. SP=?",opts:["₹680","₹700","₹720","₹650"],ans:0},
          {q:"SI doubles in 8 years. Rate?",opts:["10%","12.5%","8%","15%"],ans:1},
          {q:"A does work in 12 days, B in 18. Together?",opts:["6","7.2","8","9"],ans:1},
          {q:"8 workers in 15 days. 10 workers in?",opts:["10","12","14","16"],ans:1},
          {q:"15 m/s = ? km/h",opts:["45","54","60","48"],ans:1},
          {q:"Boat 12km/h, stream 3km/h. Upstream speed?",opts:["9","12","15","6"],ans:0},
          {q:"Train 300m crosses bridge 200m in 25s. Speed?",opts:["72 km/h","54 km/h","36 km/h","90 km/h"],ans:0},
          {q:"Series: 5,11,23,47,?",opts:["96","95","94","93"],ans:1},
          {q:"Series: 3,9,27,81,?",opts:["162","243","324","729"],ans:1},
          {q:"Series: 100,96,91,85,78,?",opts:["69","70","71","72"],ans:1},
          {q:"B,E,H,K,?",opts:["L","M","N","O"],ans:2},
          {q:"If each letter -1: DPNF = ?",opts:["COME","DOME","CONE","DIME"],ans:0},
          {q:"X's mother is Y's sister. Y's son is Z. X to Z?",opts:["Brother","Cousin","Uncle","Nephew"],ans:1},
          {q:"Mohan 20th from top, 15th from bottom. Total?",opts:["33","34","35","36"],ans:1},
          {q:"BODMAS: 8+4×3-6÷2 = ?",opts:["17","20","30","15"],ans:0},
          {q:"Area of square with side 9?",opts:["81","72","36","18"],ans:0},
          {q:"Pipe A fills in 5hr, B in 10hr. Together?",opts:["3.33hr","4hr","5hr","7.5hr"],ans:0},
          {q:"Faces East, turns left, left again. Now facing?",opts:["North","South","East","West"],ans:3},
          {q:"If Monday+5 days = ?",opts:["Friday","Saturday","Sunday","Thursday"],ans:1},
        ]
      },
      full_comp: {
        title: "Computers Complete", icon: "💻",
        notes: [
          {topic:"Fundamentals & Generations",points:["IPOS: Input→Process→Output→Store | Charles Babbage: Father","1st:Vacuum Tubes | 2nd:Transistors | 3rd:ICs | 4th:Microprocessors | 5th:AI","Types: Super > Mainframe > Mini > Micro(PC) | PARAM: India's supercomputer"]},
          {topic:"Hardware, Memory & I/O",points:["CPU=ALU+CU+Registers | RAM(volatile) ROM(non-volatile) Cache(fastest)","1B=8bits, 1KB=1024B, 1MB=1024KB, 1GB=1024MB, 1TB=1024GB","Input: KB,Mouse,Scanner,OCR,OMR,MICR | Output: Monitor,Printer,Speaker | Both: Touchscreen,Modem"]},
          {topic:"OS & Software",points:["OS: Windows,Linux,macOS,Android | Kernel=core | GUI vs CLI","System SW: OS,Drivers | Application SW: Office,Browser","Compiler(whole), Interpreter(line), Assembler(assembly→machine)"]},
          {topic:"MS Office",points:["Word(.docx): Ctrl+B/I/U, F7=SpellCheck, F12=SaveAs, Mail Merge, Track Changes","Excel(.xlsx): 1M rows, 16K cols, SUM/AVG/COUNT/VLOOKUP, Pivot, Charts, F2=Edit","PowerPoint(.pptx): F5=SlideShow, Animation(objects) vs Transition(slides), Slide Master","Access(.accdb): DBMS, Tables/Queries/Forms/Reports, Primary Key, SQL"]},
          {topic:"Internet & Security",points:["WWW:Tim Berners-Lee | Email:Ray Tomlinson | Internet father:Vint Cerf","HTTP/HTTPS/FTP/SMTP(send)/POP3-IMAP(receive) | DNS:domain→IP | IPv4:32bit IPv6:128bit","CC(visible)/BCC(hidden) | LAN<MAN<WAN | Star/Bus/Ring/Mesh topology","Virus/Worm/Trojan/Phishing/Ransomware | Firewall/Antivirus/Encryption"]},
        ],
        mcqs: [
          {q:"India's supercomputer?",opts:["ENIAC","PARAM","Deep Blue","Watson"],ans:1},
          {q:"First electronic computer?",opts:["UNIVAC","ENIAC","MARK-I","PARAM"],ans:1},
          {q:"Motherboard is also called?",opts:["CPU","Mainboard","Hard disk","RAM"],ans:1},
          {q:"Which memory is fastest?",opts:["RAM","ROM","Cache","SSD"],ans:2},
          {q:"Virtual memory uses?",opts:["RAM","ROM","Hard disk as RAM","Cache"],ans:2},
          {q:"OMR is used for?",opts:["Bank cheques","Answer sheets","Images","Barcodes"],ans:1},
          {q:"Plotter is used for?",opts:["Scanning","Large drawings","Sound","Video"],ans:1},
          {q:"NTFS is a?",opts:["File system","Protocol","Language","Hardware"],ans:0},
          {q:"Warm boot means?",opts:["Start from OFF","Restart","Shutdown","Sleep"],ans:1},
          {q:"Which is NOT operating system?",opts:["Linux","Windows","Oracle","macOS"],ans:2},
          {q:"Ctrl+Shift+S in Word?",opts:["Save","Save As","Select All","Style"],ans:0},
          {q:"Header & Footer are in?",opts:["Excel","Word","Access","All Office"],ans:1},
          {q:"Track Changes feature is in?",opts:["Excel","PowerPoint","Word","Access"],ans:2},
          {q:"=NOW() in Excel gives?",opts:["Current date","Current time","Date & Time","Cell address"],ans:2},
          {q:"Ctrl+; in Excel?",opts:["Current date","Current time","Sum","Formula"],ans:0},
          {q:"Pivot Table is used for?",opts:["Formatting","Data summarization","Drawing","Printing"],ans:1},
          {q:"Conditional Formatting is in?",opts:["Word","Excel","PowerPoint","Access"],ans:1},
          {q:"Slide Master controls?",opts:["Individual slide","Template for all slides","Animation","Transition"],ans:1},
          {q:"F5 in PowerPoint starts?",opts:["Editing","Slide Show","Printing","Saving"],ans:1},
          {q:"In Access, Form is used for?",opts:["Printing","Data entry","Queries","Charts"],ans:1},
          {q:"Query in Access is used for?",opts:["Storing data","Retrieving data","Data entry","Printing"],ans:1},
          {q:"Foreign Key links?",opts:["Two databases","Two tables","Two queries","Two forms"],ans:1},
          {q:"BCC in email means?",opts:["Best CC","Blind Carbon Copy","Basic CC","Bulk CC"],ans:1},
          {q:"Which protocol for secure web?",opts:["HTTP","HTTPS","FTP","SMTP"],ans:1},
          {q:"Ransomware does?",opts:["Speeds up PC","Locks data, demands money","Deletes files","Fixes bugs"],ans:1},
        ]
      },
      full_jk: {
        title: "J&K GK Complete", icon: "🏔️",
        notes: [
          {topic:"Geography Essentials",points:["20 districts (10+10) | Jhelum(Vitasta from Verinag) Chenab(Chandrabhaga) Tawi Ravi","Lakes: Wular(largest FW India), Dal('Jewel'), Manasbal, Nagin","Passes: Zoji La(KL), Banihal(JK) | K2(8611m Karakoram) Siachen glacier","Crops: Saffron(Pampore), Apple, Walnut, Rice | Flora: Chinar, Deodar | Fauna: Hangul, Snow Leopard"]},
          {topic:"History Timeline",points:["Kalhana→Rajatarangini(1148,8 Tarangas) | Ashoka→Buddhism | Kanishka→4th Buddhist Council","Shah Mir(1339 first Muslim) | Zain-ul-Abidin=Budshah | Akbar(1586)","Treaty of Amritsar(1846,₹75L) | Dogra: Gulab→Ranbir→Pratap→Hari Singh","Accession Oct 26,1947 | Art 370 abrogated Aug 5,2019 | UT Oct 31,2019"]},
          {topic:"Culture & Tourism",points:["Languages: Kashmiri,Dogri(2003),Urdu(official) | Dances: Rouf,Dumhal,Bhand Pather","Handicrafts: Pashmina(Changthangi),Paper Mache,Walnut,Carpet,Sozni","Tourism: Gulmarg(ski),Pahalgam,Sonamarg('Golden meadow') | Gardens: Shalimar,Nishat,Chashme Shahi","Temples: Vaishno Devi(Reasi),Amarnath(Anantnag),Shankaracharya,Raghunath(Jammu)","Wazwan(36 courses),Rogan Josh,Kahwa,Noon Chai(pink) | Basohli paintings(Kathua)"]},
        ],
        mcqs: [
          {q:"Sonamarg means?",opts:["Valley of flowers","Meadow of gold","Land of snow","Hill of beauty"],ans:1},
          {q:"Nishat Bagh was built by?",opts:["Akbar","Jahangir","Asif Khan","Shah Jahan"],ans:2},
          {q:"Which soil is ideal for saffron?",opts:["Alluvial","Karewa","Black","Red"],ans:1},
          {q:"Tulip Garden in Srinagar is Asia's?",opts:["Smallest","Largest","Oldest","Newest"],ans:1},
          {q:"Shankaracharya Temple is in?",opts:["Jammu","Srinagar","Pahalgam","Gulmarg"],ans:1},
          {q:"Lal Ded was a?",opts:["Queen","Mystic poetess","Dancer","Warrior"],ans:1},
          {q:"Nund Rishi is patron saint of?",opts:["India","Kashmir","Jammu","Ladakh"],ans:1},
          {q:"Pahalgam is base camp for?",opts:["Vaishno Devi","Amarnath Yatra","Gulmarg","Sonamarg"],ans:1},
          {q:"Mughal Gardens are in?",opts:["Jammu","Srinagar","Pahalgam","Gulmarg"],ans:1},
          {q:"Cricket bats made from Kashmiri?",opts:["Chinar","Willow","Deodar","Walnut"],ans:1},
          {q:"State bird of J&K?",opts:["Peacock","Black-necked Crane","Sparrow","Eagle"],ans:1},
          {q:"Kishtwar is famous for?",opts:["Saffron","Sapphire","Apples","Rice"],ans:1},
          {q:"Avantivarman founded which city?",opts:["Srinagar","Avantipura","Jammu","Anantnag"],ans:1},
          {q:"Who is called 'Keats of Kashmir'?",opts:["Lal Ded","Habba Khatoon","Mehjoor","Agha Shahid Ali"],ans:2},
          {q:"Bahu Fort is in?",opts:["Srinagar","Jammu","Rajouri","Kathua"],ans:1},
        ]
      },
    }
  }
};

const catKeys = Object.keys(CATS);

export default function App() {
  const [tab, setTab] = useState("study");
  const [cat, setCat] = useState("syl");
  const [sub, setSub] = useState(null);
  const [vw, setVw] = useState("mcqs");
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [sh, setSh] = useState(false);
  const [sc, setSc] = useState(0);
  const [tot, setTot] = useState(0);
  const [dn, setDn] = useState(false);
  const [days, setDays] = useState({});
  const [dS, setDS] = useState({});

  const dl = Math.max(0, Math.ceil((ED - new Date()) / 864e5));
  const subs = CATS[cat].subs;
  const subKeys = Object.keys(subs);
  const curSub = sub && subs[sub] ? subs[sub] : null;
  const mq = curSub ? curSub.mcqs : [];

  let totalQ = 0;
  catKeys.forEach(c => Object.values(CATS[c].subs).forEach(s => { totalQ += s.mcqs.length; }));

  const rst = () => { setQi(0); setSel(null); setSh(false); setSc(0); setTot(0); setDn(false); };
  const pk = (i) => { if (sh) return; setSel(i); setSh(true); if (i === mq[qi].ans) setSc(s => s + 1); setTot(t => t + 1); };
  const nx = () => { if (qi + 1 >= mq.length) { setDS(p => ({...p, [sub]: true})); setDn(true); } else { setQi(qi + 1); setSel(null); setSh(false); } };

  const openSub = (k) => { setSub(k); rst(); setVw(subs[k].notes ? "notes" : "mcqs"); };

  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", maxWidth: 820, margin: "0 auto", color: "#1a1a1a" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", padding: "16px 20px", borderRadius: "12px", color: "#fff", marginBottom: "12px" }}>
        <div style={{ fontSize: "17px", fontWeight: 800 }}>JKSSB Junior Assistant — Complete Prep</div>
        <div style={{ fontSize: "11px", opacity: 0.85, marginTop: 2 }}>500+ MCQs • Previous Year + Predicted • Syllogism Heavy</div>
        <div style={{ display: "flex", gap: "8px", marginTop: "10px", fontSize: "11px", flexWrap: "wrap" }}>
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "5px 10px", borderRadius: 7 }}><b style={{ fontSize: 16 }}>{dl}</b> days</div>
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "5px 10px", borderRadius: 7 }}>Exam: <b>5 Apr</b></div>
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "5px 10px", borderRadius: 7 }}>{totalQ} MCQs</div>
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "5px 10px", borderRadius: 7 }}>{Object.values(dS).filter(Boolean).length} sets ✓</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, borderBottom: "1px solid #e5e5e5", marginBottom: 12, overflowX: "auto" }}>
        {[["plan","📅 Plan"],["study","📖 Study"],["tips","💡 Tips"]].map(([t,l])=>
          <button key={t} onClick={()=>{setTab(t);setSub(null);}} style={{ padding:"8px 12px",cursor:"pointer",fontWeight:tab===t?700:400,fontSize:"13px",borderBottom:tab===t?"3px solid #4f46e5":"3px solid transparent",color:tab===t?"#4f46e5":"#666",background:"none",border:"none",whiteSpace:"nowrap" }}>{l}</button>
        )}
      </div>

      {/* PLAN */}
      {tab==="plan" && <div>
        <div style={{fontSize:12,color:"#666",marginBottom:8}}>Tap each day to mark done:</div>
        {SCHED.map(s=>{const d=days[s.d],ex=s.d===13;return <div key={s.d} onClick={()=>setDays(p=>({...p,[s.d]:!p[s.d]}))} style={{padding:"10px 12px",marginBottom:4,borderRadius:8,cursor:"pointer",border:ex?"2px solid #ef4444":d?"2px solid #22c55e":"1px solid #e5e5e5",background:ex?"#fef2f2":d?"#f0fdf4":"#fff",opacity:d&&!ex?0.7:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:700,fontSize:12}}>{d&&!ex?"✅ ":ex?"🎯 ":"⬜ "}Day {s.d}: {s.t}</span><span style={{fontSize:10,background:"#f1f1f1",padding:"2px 6px",borderRadius:4,color:"#555"}}>{s.hr}</span></div>
          <div style={{marginTop:3,fontSize:11,color:"#555"}}>{s.tk.map((t,i)=><div key={i}>• {t}</div>)}</div>
        </div>})}
      </div>}

      {/* STUDY */}
      {tab==="study" && <div>
        {/* Category selector */}
        <div style={{display:"flex",gap:4,marginBottom:10,overflowX:"auto",paddingBottom:4}}>
          {catKeys.map(k=><button key={k} onClick={()=>{setCat(k);setSub(null);}} style={{padding:"8px 12px",borderRadius:8,border:cat===k?"2px solid #4f46e5":"1px solid #e5e5e5",background:cat===k?"#eef2ff":"#fff",fontSize:11,fontWeight:cat===k?700:400,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{CATS[k].title}</button>)}
        </div>

        <div style={{fontSize:11,color:"#888",marginBottom:8}}>{CATS[cat].desc}</div>

        {/* Sub-section list */}
        {!sub && <div style={{display:"grid",gap:6}}>
          {subKeys.map(k=>{const s=subs[k];return <button key={k} onClick={()=>openSub(k)} style={{padding:"12px",borderRadius:8,border:"1px solid #e5e5e5",background:"#fff",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><span style={{fontSize:14,marginRight:6}}>{s.icon}</span><span style={{fontWeight:600,fontSize:13}}>{s.title}</span></div>
            <div style={{fontSize:11,color:"#888"}}>{s.mcqs.length} MCQs {dS[k]?"✅":""} →</div>
          </button>})}
        </div>}

        {/* Sub-section detail */}
        {sub && curSub && <div>
          <button onClick={()=>setSub(null)} style={{marginBottom:10,padding:"6px 12px",borderRadius:6,border:"1px solid #ddd",background:"#f9f9f9",cursor:"pointer",fontSize:11}}>← Back to list</button>
          <div style={{fontWeight:700,fontSize:15,marginBottom:8}}>{curSub.icon} {curSub.title}</div>

          {curSub.notes && <div style={{display:"flex",gap:6,marginBottom:10}}>
            <button onClick={()=>setVw("notes")} style={{padding:"6px 14px",borderRadius:6,border:"none",background:vw==="notes"?"#1a1a1a":"#f1f1f1",color:vw==="notes"?"#fff":"#333",fontWeight:600,fontSize:11,cursor:"pointer"}}>📝 Notes</button>
            <button onClick={()=>{setVw("mcqs");rst();}} style={{padding:"6px 14px",borderRadius:6,border:"none",background:vw==="mcqs"?"#1a1a1a":"#f1f1f1",color:vw==="mcqs"?"#fff":"#333",fontWeight:600,fontSize:11,cursor:"pointer"}}>❓ MCQs ({mq.length})</button>
          </div>}

          {!curSub.notes && vw==="notes" && (() => { setVw("mcqs"); return null; })()}

          {vw==="notes" && curSub.notes && curSub.notes.map((n,i)=><div key={i} style={{marginBottom:7,padding:"10px",background:"#fafafa",borderRadius:8,border:"1px solid #e8e8e8"}}>
            <div style={{fontWeight:700,fontSize:12,color:"#4f46e5",marginBottom:4}}>{n.topic}</div>
            {n.points.map((p,j)=><div key={j} style={{fontSize:11,padding:"2px 0",lineHeight:1.6,borderBottom:j<n.points.length-1?"1px solid #eee":"none"}}>{p}</div>)}
          </div>)}

          {vw==="mcqs" && !dn && mq.length>0 && <div style={{padding:14,background:"#fafafa",borderRadius:10,border:"1px solid #e8e8e8"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#888",marginBottom:6}}>
              <span>Q {qi+1}/{mq.length}</span><span>Score: {sc}/{tot}</span>
            </div>
            <div style={{width:"100%",height:3,background:"#e5e5e5",borderRadius:2,marginBottom:10}}>
              <div style={{width:`${((qi+1)/mq.length)*100}%`,height:3,background:"#4f46e5",borderRadius:2,transition:"width .3s"}}/>
            </div>
            <div style={{fontSize:13,fontWeight:600,marginBottom:10,whiteSpace:"pre-line"}}>{mq[qi].q}</div>
            {mq[qi].opts.map((o,i)=>{
              const isA=i===mq[qi].ans,isS=i===sel;
              let bg="#fff",bd="1px solid #ddd";
              if(sh){if(isA){bg="#dcfce7";bd="2px solid #22c55e";}else if(isS){bg="#fee2e2";bd="2px solid #ef4444";}}
              return <div key={i} onClick={()=>pk(i)} style={{padding:"8px 12px",marginBottom:4,borderRadius:7,cursor:sh?"default":"pointer",background:bg,border:bd,fontSize:12,transition:"all .2s"}}>
                <b style={{marginRight:6}}>{String.fromCharCode(65+i)}.</b>{o}
              </div>
            })}
            {sh && <button onClick={nx} style={{marginTop:8,padding:"7px 18px",background:"#4f46e5",color:"#fff",border:"none",borderRadius:7,fontWeight:600,cursor:"pointer",fontSize:12}}>
              {qi+1>=mq.length?"Results":"Next →"}
            </button>}
          </div>}

          {vw==="mcqs" && dn && <div style={{textAlign:"center",padding:"24px 16px",background:"#fafafa",borderRadius:10}}>
            <div style={{fontSize:36,marginBottom:6}}>{sc>=mq.length*0.7?"🎉":sc>=mq.length*0.5?"👍":"💪"}</div>
            <div style={{fontSize:18,fontWeight:700}}>{sc} / {mq.length}</div>
            <div style={{fontSize:11,color:"#666",marginTop:4}}>{sc>=mq.length*0.7?"Excellent! Try next set.":"Review notes & retry."}</div>
            <button onClick={rst} style={{marginTop:10,padding:"7px 18px",background:"#4f46e5",color:"#fff",border:"none",borderRadius:7,fontWeight:600,cursor:"pointer"}}>Try Again</button>
          </div>}
        </div>}
      </div>}

      {/* TIPS */}
      {tab==="tips" && <div>
        {[
          {t:"🔥 SYLLOGISM STRATEGY (Most Important!)",tips:["JKSSB asks 5-8 syllogism Qs EVERY paper — this alone = 5-8 marks","ALWAYS draw Venn diagrams — never solve in head","All+All=All | All+No=No | Some+Some=No conclusion","If answer is 'Neither' → double check with diagram","'Either I or II' = Both can't be true together but one must be","Practice the 50 syllogism Qs in this app until you get 90%+ right","Statement-Assumption: Remove assumption → does statement still make sense? If No → Implicit"]},
          {t:"📋 JKSSB Paper Pattern",tips:["80 marks, 80 minutes, ALL MCQ","Unit I: English (20 marks) — Articles, Voice, Narration, Idioms most repeated","Unit II: GK + J&K (20 marks) — J&K geography/history asked EVERY paper","Unit III: Maths + Reasoning (20 marks) — Series, Syllogisms, Percentage most common","Unit IV: Computers (20 marks) — MS Office shortcuts, Abbreviations most repeated","Questions repeat from previous papers — practice PYQs in this app!"]},
          {t:"⚡ MCQ HACKS",tips:["Eliminate 2 wrong → 50% chance on guess","'Always/Never/All' in option = usually WRONG","Two very similar options → answer is one of them","Trust your first instinct — don't change unless 100% sure","No negative marking → ATTEMPT EVERY SINGLE QUESTION"]},
          {t:"⏱️ TIME MANAGEMENT (80 min)",tips:["1 min per question — don't spend 3 min on any single Q","Pass 1 (30 min): All easy Qs = ~40-50 Qs done","Pass 2 (30 min): Medium Qs = ~20-25 Qs","Pass 3 (20 min): Hard Qs + Review","English & Computer = fastest sections, do these first"]},
          {t:"🧠 YOUR DEVELOPER ADVANTAGE",tips:["Computers = 80% already known (free 16+ marks with light revision)","Reasoning & Syllogisms = Pattern matching (you do this daily)","English grammar rules = Like syntax rules in programming","Focus study time on J&K GK (your weakest) and Syllogisms (most asked)"]},
        ].map((s,i)=><div key={i} style={{marginBottom:8,padding:12,borderRadius:8,background:"#fafafa",border:"1px solid #e8e8e8"}}>
          <div style={{fontWeight:700,fontSize:12,marginBottom:4}}>{s.t}</div>
          {s.tips.map((t,j)=><div key={j} style={{fontSize:11,padding:"2px 0",lineHeight:1.5}}>• {t}</div>)}
        </div>)}
      </div>}

      <div style={{textAlign:"center",padding:12,fontSize:10,color:"#aaa"}}>
        JKSSB Syllabus-Matched • {totalQ} MCQs • Previous Year + Predicted + Syllogisms
      </div>
    </div>
  );
}