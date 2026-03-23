import { useState, useEffect, useRef } from "react";

const ED=new Date("2026-04-05");
const dl=()=>Math.max(0,Math.ceil((ED-new Date())/864e5));

const SCHED=[
{d:1,dt:"Mar 24",t:"Battlefield Scan",tk:["Solve 1 previous paper (untimed)","Identify strong/weak areas","Read all notes in this app once"],hr:"7-9:30PM"},
{d:2,dt:"Mar 25",t:"Computers I",tk:["Generations, Basics, Memory, I/O","MS Word, Excel, PPT, Access","Practice 50 Computer MCQs"],hr:"7-9:30PM"},
{d:3,dt:"Mar 26",t:"Computers II + Reasoning",tk:["OS, Email, Internet, Abbreviations","Number/Letter Series, Coding-Decoding","Practice 40 MCQs"],hr:"7-9:30PM"},
{d:4,dt:"Mar 27",t:"Reasoning + Syllogisms",tk:["Blood Relations, Direction Sense","HEAVY: Statement-Conclusion (30+ Qs)","Practice ALL syllogism MCQs"],hr:"7-9:30PM"},
{d:5,dt:"Mar 28",t:"Maths",tk:["Percentage, Average, Ratio, Profit/Loss","Time & Work, Speed/Distance","Practice 50 Maths MCQs"],hr:"7-9:30PM"},
{d:6,dt:"Mar 29 (Sat)",t:"J&K GK Deep Dive",tk:["History, Geography, Rivers, Lakes, Passes","Culture, Tourism, Economy, Flora/Fauna","Practice 60 J&K MCQs","EXTRA TIME: Weekend!"],hr:"7-10PM+"},
{d:7,dt:"Mar 30 (Sun)",t:"India GK + Polity",tk:["Constitution, Polity, Indian History","Census, Transport, Rivers, Science","Practice 50 GK MCQs"],hr:"10AM-1PM + 7-9:30PM"},
{d:8,dt:"Mar 31",t:"English I",tk:["Articles, Modals, Voice, Narration","Prepositions, Homophones, Punctuation","Practice 40 English MCQs"],hr:"7-9:30PM"},
{d:9,dt:"Apr 1",t:"English II",tk:["Synonyms, Antonyms, Idioms","Comprehension, Jumbled, Editing","Practice 40 English MCQs"],hr:"7-9:30PM"},
{d:10,dt:"Apr 2",t:"Previous Year Focus",tk:["Practice all PYQ-style questions","Focus on most-repeated topics","Mark all wrong answers for review"],hr:"7-9:30PM"},
{d:11,dt:"Apr 3",t:"Weak Areas + Syllogisms",tk:["Revise weakest unit","Re-do ALL Statement-Conclusion Qs","Re-attempt all wrong MCQs"],hr:"7-9:30PM"},
{d:12,dt:"Apr 4",t:"Mock Test + Revision",tk:["80-Q timed mock (80 min)","Review wrong answers","Quick revision: J&K + Abbrev + Idioms"],hr:"7-10PM"},
{d:13,dt:"Apr 5",t:"EXAM DAY 🎯",tk:["30-min quick revision of key facts","Admit card + ID + pen + water ready","Stay calm → Attempt ALL 80 Qs → YOU'VE GOT THIS!"],hr:"Morning"},
];

// ============ NOTES ============
const NOTES={
comp:[
{t:"Computer Generations",p:["1st(1940-56): Vacuum Tubes, ENIAC, UNIVAC, machine language, huge, expensive","2nd(1956-63): Transistors, COBOL/FORTRAN, magnetic core memory, smaller","3rd(1963-71): ICs(Integrated Circuits), keyboards/monitors, OS introduced","4th(1971-now): Microprocessors, Intel 4004(first), PCs, GUIs, very fast","5th(future): AI, quantum computing, natural language, robotics"]},
{t:"Hardware & CPU",p:["CPU = ALU + CU + Registers → 'Brain of Computer'","ALU: Arithmetic & Logic | CU: Controls operations | Registers: Fastest temp storage","Motherboard: Main circuit board | GPU: Graphics processing","Input: Keyboard, Mouse, Scanner, Mic, Webcam, Joystick, Light Pen, OCR, OMR, MICR, Barcode","Output: Monitor(CRT/LCD/LED), Printer(Dot Matrix/Inkjet/Laser), Speaker, Projector, Plotter","Both I/O: Touchscreen, Modem, USB Drive, Headset | MICR=Banks, OMR=Answer sheets"]},
{t:"Memory & Storage",p:["RAM: Volatile, temporary, fast | ROM: Non-volatile, permanent, BIOS stored","RAM types: SRAM(fast,cache), DRAM(main memory) | ROM: PROM, EPROM, EEPROM","Cache: Fastest, between CPU & RAM | Virtual Memory: HDD used as RAM extension","1 Byte=8 Bits | 1KB=1024B | 1MB=1024KB | 1GB=1024MB | 1TB=1024GB","Storage: HDD, SSD(faster,no moving parts), CD(700MB), DVD(4.7GB), Pen Drive"]},
{t:"Software & OS",p:["System SW: OS, Drivers, Utilities | Application SW: Word, Excel, Browser, Games","OS: Windows, Linux, macOS, Android, iOS | Kernel=Core | GUI vs CLI","Compiler: Whole program→exe | Interpreter: Line by line | Assembler: Assembly→Machine","Open Source: Linux, Firefox, Android | Proprietary: Windows, MS Office, macOS","Booting: Cold(from OFF), Warm(restart) | POST: Power On Self Test | BIOS initiates POST"]},
{t:"MS Word",p:["Extension: .docx | Ctrl+B/I/U=Bold/Italic/Underline | Ctrl+L/E/R/J=Align","Ctrl+S=Save | F12=Save As | Ctrl+P=Print | Ctrl+N=New | Ctrl+O=Open","Ctrl+F=Find | Ctrl+H=Replace | F7=Spell Check | Ctrl+Z=Undo | Ctrl+Y=Redo","Features: Mail Merge, Track Changes, Header/Footer, Watermark, Footnote, TOC","Views: Print Layout, Web Layout, Outline, Draft, Read Mode"]},
{t:"MS Excel",p:["Extension: .xlsx | Rows: 1,048,576 | Columns: 16,384(A to XFD) | Cell=Row+Column","Functions: =SUM(), =AVERAGE(), =COUNT(), =MAX(), =MIN(), =IF(), =VLOOKUP(), =HLOOKUP()","=COUNTIF(), =SUMIF(), =CONCATENATE(), =LEN(), =TRIM(), =NOW()","F2=Edit cell | Ctrl+;=Date | Charts: Bar, Line, Pie, Scatter | Pivot Table, Freeze Panes","Cell ref: Relative(A1), Absolute($A$1), Mixed($A1) | Conditional Formatting, Data Validation"]},
{t:"MS PowerPoint & Access",p:["PPT(.pptx): Slide-based | F5=Show start | Shift+F5=Current slide | Ctrl+M=New slide","Animation=effects on objects | Transition=between slides | Slide Master=template","Access(.accdb): DBMS | Objects: Tables, Queries, Forms, Reports","Primary Key=unique ID | Foreign Key=links tables | SQL used for queries","Datatypes: Text, Number, Date/Time, Currency, AutoNumber, Yes/No, OLE"]},
{t:"Email & Internet",p:["Internet: Network of networks | WWW: Tim Berners-Lee(1989) | Father: Vint Cerf","Email: Ray Tomlinson(@ symbol) | CC=visible copy | BCC=blind/hidden copy","Protocols: HTTP/HTTPS(web), FTP(files), SMTP(send mail), POP3/IMAP(receive)","IP: IPv4=32bit, IPv6=128bit | DNS=Domain→IP | URL | ISP | Browser: Chrome, Firefox","LAN<MAN<WAN | Topologies: Star(hub), Bus(cable), Ring, Mesh, Tree","Wi-Fi=IEEE 802.11 | Bluetooth=short range | Modem=Digital↔Analog | Router=connects networks","Threats: Virus, Worm, Trojan, Phishing, Ransomware | Security: Firewall, Antivirus, Encryption"]},
{t:"Key Abbreviations",p:["CPU, ALU, CU, RAM, ROM, BIOS, USB, URL, HTML, CSS, SQL, PDF, ASCII, GUI, CLI","SMTP, FTP, HTTP, DNS, ISP, LAN, WAN, MAN, IP, TCP, UDP, SSD, HDD, CD, DVD","Wi-Fi, SIM, GPS, API, VIRUS, OCR, OMR, MICR, NTFS, POST, DBMS, RDBMS","Binary=Base2 | Octal=Base8 | Decimal=Base10 | Hexadecimal=Base16"]},
],
eng:[
{t:"Articles (A/An/The)",p:["A: consonant sounds → a boy, a university(yu-), a European, a one-rupee note","An: vowel sounds → an apple, an hour(silent h), an honest man, an MLA, an MP, an FIR","The: specific/unique → the sun, the Ganga, the Himalayas, the USA, superlatives, ordinals","No article: proper nouns(India), meals(lunch), games(cricket), languages(Hindi)"]},
{t:"Modals",p:["Can/Could: ability/request | May/Might: permission/possibility | Shall/Should: future/advice","Will/Would: future/polite/past habit | Must: compulsion | Ought to: moral duty","Used to: past habit | Need: necessity | Dare: courage | Must have: past certainty"]},
{t:"Active & Passive Voice",p:["Active: S+V+O → Passive: O+be+V3+by+S","Present: writes→is written | Continuous: is writing→is being written","Past: wrote→was written | Perfect: has written→has been written","Modal: can write→can be written | Imperative: 'Open door'→'Let the door be opened'"]},
{t:"Narration (Direct→Indirect)",p:["Past reporting → tense shifts: am→was, will→would, have→had, is→was","Said to→Told | Today→that day | Tomorrow→next day | Here→there | This→that | Now→then","Questions: asked+if/whether(yes/no) or asked+wh-word | No question mark in indirect","Commands: told/ordered+to | Negative: told+not to | Requests: requested+to"]},
{t:"Synonyms & Antonyms",p:["Abundant=Plentiful↔Scarce | Bold=Brave↔Timid | Calm=Serene↔Turbulent","Diligent=Hardworking↔Lazy | Eminent=Distinguished↔Unknown | Genuine=Authentic↔Fake","Hostile=Unfriendly↔Friendly | Inevitable=Unavoidable↔Avoidable | Prudent=Wise↔Foolish","Commence=Begin↔Conclude | Conceal=Hide↔Reveal | Ascend=Rise↔Descend | Affluent=Rich↔Poor"]},
{t:"Idioms & Phrases",p:["Piece of cake=Easy | White elephant=Costly useless | Burn midnight oil=Study late","Spill beans=Secret | Blue moon=Rarely | Eye to eye=Agree | Arm & leg=Expensive","Bell the cat=Risky task | Achilles heel=Weakness | Apple of discord=Quarrel cause","Cold shoulder=Ignore | New leaf=Fresh start | Feather in cap=Achievement | Sit on fence=Undecided"]},
{t:"Prepositions & Common Errors",p:["At(time/point), In(month/year/city), On(day/date/surface) | Since+point, For+duration","Between(2), Among(3+) | Senior/Junior/Prefer → TO(not than) | Good AT, Fond OF","Error: 'Return back'→Return | 'Repeat again'→Repeat | 'Each have'→Each has","Fewer(countable), Less(uncountable) | Elder(family), Older(general)"]},
{t:"One Word Substitutions",p:["Bibliophile=Book lover | Somnambulism=Sleepwalking | Misanthropist=Hates mankind","Posthumous=After death | Anonymous=Unknown name | Pseudonym=Pen name","Atheist=No god belief | Polyglot=Many languages | Insolvent=Can't pay debts","Potable=Drinkable | Inflammable=Catches fire | Illegible=Can't read | Edible=Can eat"]},
{t:"Homophones",p:["Their/There/They're | Your/You're | Its/It's | Whose/Who's","Accept/Except | Affect/Effect | Advice(n)/Advise(v) | Principal/Principle","Stationary(still)/Stationery(paper) | Loose/Lose | Weather/Whether | Quiet/Quite"]},
],
jk:[
{t:"J&K Geography",p:["Reorganized Oct 31, 2019 → J&K UT(legislature) + Ladakh UT(no legislature)","20 districts: 10 Kashmir(Srinagar,Budgam,Anantnag,Pulwama,Shopian,Kulgam,Bandipora,Baramulla,Kupwara,Ganderbal)","10 Jammu(Jammu,Samba,Kathua,Udhampur,Reasi,Rajouri,Poonch,Doda,Kishtwar,Ramban)","Rivers: Jhelum(Vitasta,from Verinag), Chenab(Chandrabhaga), Tawi(Jammu), Ravi(Kathua), Indus, Kishanganga","Lakes: Dal('Jewel of Kashmir',Srinagar), Wular(largest FW India,Bandipora), Manasbal('Supreme gem'), Nagin, Pangong(Ladakh)","Passes: Zoji La(Kashmir↔Ladakh), Banihal(Jammu↔Kashmir), Pir Panjal, Sinthan Top","Ranges: Karakoram, Great Himalayas, Pir Panjal, Shivalik | K2=8611m(Karakoram)","Glaciers: Siachen(longest outside polar), Kolahoi(Pahalgam), Machoi, Thajiwas(Sonamarg)","Crops: Saffron(Pampore,Karewa soil), Apple, Walnut, Almond, Cherry, Rice(Kashmir staple)","Flora: Chinar(state tree), Deodar, Pine | Fauna: Hangul(state animal), Snow Leopard, Musk Deer"]},
{t:"J&K History",p:["Rajatarangini by Kalhana(1148-49): 8 Tarangas, earliest Kashmir history","Ashoka: Buddhism in Kashmir, founded Srinagar | Kanishka: 4th Buddhist Council, Kundalvan","Lalitaditya Muktapida: Greatest Hindu ruler, Martand Sun Temple, Karkota dynasty","Didda: Powerful queen of Kashmir | Avantivarman: Founded Avantipura","Shah Mir(1339): First Muslim dynasty | Zain-ul-Abidin(Budshah): Greatest, 'Akbar of Kashmir'","Sikandar Butshikan: Known for destroying temples | Rinchana: Ladakhi prince who converted","Mughal: Akbar conquered Kashmir 1586, built Hari Parbat Fort | Jahangir: Shalimar Bagh","Afghan rule(1752-1819): Harsh | Sikh rule(1819-1846): Under Ranjit Singh's generals","Treaty of Amritsar(1846): British sold J&K to Gulab Singh for ₹75 lakhs","Dogra: Gulab Singh→Ranbir Singh(Raghunath Temple)→Pratap Singh→Hari Singh(last ruler)","Instrument of Accession: Oct 26, 1947 | Article 370 abrogated: Aug 5, 2019","Article 35A (permanent residents) also scrapped Aug 5, 2019 | J&K UT: Oct 31, 2019"]},
{t:"J&K Culture & Tourism",p:["Languages: Kashmiri, Dogri(8th Schedule 2003), Urdu(official), Gojri, Pahari, Balti","Dances: Rouf(Kashmir women), Dumhal(Wattal tribe), Bhand Pather(folk theater), Hafiz Nagma","Handicrafts: Pashmina(Changthangi goat), Paper Mache(Persia origin), Walnut carving, Carpet, Sozni, Crewel","Basohli paintings(Kathua): Famous miniature art | Wazwan: 36-course feast","Cuisine: Rogan Josh, Dum Aloo, Gushtaba, Kahwa(saffron tea), Noon Chai(pink/salt tea)","Tourism: Gulmarg(skiing), Pahalgam(Amarnath base), Sonamarg('Meadow of Gold'), Patnitop(Udhampur)","Temples: Vaishno Devi(Reasi), Amarnath(Anantnag), Shankaracharya(Srinagar), Raghunath(Jammu), Martand","Mughal Gardens: Shalimar Bagh(Jahangir), Nishat Bagh(Asif Khan), Chashme Shahi('Royal Spring')","Festivals: Navreh(Kashmiri NY), Tulip Festival(Asia's largest), Shikara Festival, Lohri, Baisakhi","Personalities: Kalhana, Lal Ded(mystic poetess), Habba Khatoon(Nightingale), Sheikh Abdullah(Lion/Sher-e-Kashmir), Mehjoor(Keats of Kashmir), Nund Rishi(patron saint)"]},
{t:"J&K Economy & Facts",p:["Economy: Agriculture-based | Apple, Saffron, Walnut major exports","Saffron: Pampore(Karewa soil) | Willow: Cricket bats(Anantnag) | Silk: Sericulture in Kashmir","Summer capital: Srinagar | Winter capital: Jammu | LG: Manoj Sinha","First LG: G.C. Murmu | State bird: Black-necked Crane | State flower: Lotus","Dachigam NP: Hangul | Salim Ali NP: Srinagar | Kishtwar NP | Kashmir called 'Paradise on Earth'","Banihal-Qazigund Tunnel(Navyug): Connects Jammu-Kashmir | Mughal Road: Shopian-Rajouri"]},
],
gk:[
{t:"Indian Constitution",p:["Adopted Nov 26, 1949 | Enforced Jan 26, 1950 | B.R. Ambedkar: Drafting Committee Chairman","Preamble: Sovereign, Socialist, Secular, Democratic, Republic (42nd Amend added Socialist & Secular)","Fundamental Rights: Art 14-32 | DPSPs: Art 36-51 | Duties: Art 51A(42nd Amend, now 11)","Art 14: Equality | Art 17: Abolish untouchability | Art 19: 6 Freedoms | Art 21: Right to Life","Art 21A: Education(6-14) | Art 32: Constitutional Remedies('Heart & Soul' — Ambedkar)"]},
{t:"Indian Polity",p:["President: Head of State, Electoral College, 5yr | PM: Head of Govt, majority leader Lok Sabha","Lok Sabha: 543 elected, 5yr, age 25, Speaker | Rajya Sabha: 245, 6yr(1/3 retire), age 30, VP=Chairman","Supreme Court: CJI+33 judges, Art 124 | High Court: Art 214 | Governor: Art 153, appointed by President","Emergency: National(352), President's Rule(356), Financial(360) | Money Bill: Only Lok Sabha","42nd Amend: 'Mini Constitution' | Art 368: Amendment | CAG: Art 148 | AG: Art 76"]},
{t:"Indian History",p:["IVC: Harappa, Mohenjo-daro(Great Bath), Lothal(dockyard) ~2500 BC","Vedic: 4 Vedas(Rig,Sama,Yajur,Atharva) | Maurya: Chandragupta→Ashoka(Kalinga→Buddhism)","Ashoka: Lion Capital=National Emblem | Chanakya: Arthashastra | Gupta: Golden Age","Mughal: Babur(1526,Panipat I)→Akbar(Din-i-Ilahi)→Shah Jahan(Taj Mahal)→Aurangzeb","Plassey 1757 | Buxar 1764 | 1857 Revolt | INC 1885(Hume) | Muslim League 1906","Jallianwala Bagh 1919 | Salt March 1930 | Quit India 1942('Do or Die') | Independence Aug 15, 1947"]},
{t:"Geography, Science & Static GK",p:["Largest state: Rajasthan | Smallest: Goa | Most pop: UP | Longest river: Ganga(2525km)","Narmada & Tapi → Arabian Sea(west) | Rest → Bay of Bengal(east) | Chilika: Largest saltwater lake","National: Animal=Tiger, Bird=Peacock, Flower=Lotus, Tree=Banyan, Fruit=Mango, River=Ganga","1st PM: Nehru | 1st Pres: Rajendra Prasad | 1st woman PM: Indira | 1st woman Pres: Pratibha Patil","Nobel: Tagore(1913,Lit), Raman(1930,Physics), Teresa(1979,Peace), Sen(1998,Econ)","Vitamins: A=Night vision, B=Energy, C=Scurvy, D=Bones/Rickets, E=Skin, K=Blood clotting","Blood: O=universal donor, AB=universal recipient | Smallest bone: Stapes | Largest: Femur","pH: 0-14, 7=neutral | Speed of light: 3×10⁸ m/s | Ozone: Stratosphere","Census every 10yr | Most literate: Kerala | Sex ratio highest: Kerala | NH-44: Longest NH"]},
],
syl:[
{t:"Syllogism Rules (MUST MEMORIZE)",p:["FORMAT: Two Statements → Check if Conclusions follow","All A are B = Complete overlap | Some A are B = Partial overlap | No A is B = Zero overlap","All A→B: Some A→B ✓, Some B→A ✓ | No A→B: No B→A ✓ | Some A→B: Some B→A ✓","GOLDEN: All+All=All | All+No=No | All+Some=Some | Some+Some=No conclusion","Some A are not B → CANNOT be reversed","'Either I or II' = Both can't be true together but one must be true"]},
{t:"How to Solve",p:["Step 1: Draw Venn diagram for Statement 1","Step 2: Extend diagram for Statement 2","Step 3: Check each conclusion — must be true in ALL possible diagrams","Step 4: If conclusion CAN be false in any valid diagram → Does NOT follow","TRICK: 'Either I or II' = when I and II are contradictory (one says 'some', other says 'no')"]},
{t:"Statement-Assumption",p:["Assumption = taken for granted, not stated directly","Test: Remove assumption → does statement still make sense? If NO → Implicit","Overly broad assumptions = usually WRONG | Specific matching ones = usually CORRECT","'Everyone will buy' from an ad = NOT implicit | 'People want quality' from quality ad = Implicit"]},
{t:"Statement-Argument & Course of Action",p:["Strong argument: Direct, factual, important | Weak: Vague, emotional, extreme","'Everyone does it' = WEAK | 'Studies show...' = STRONG | 'Ban everything' = Usually invalid","Valid action: Practical, addresses problem | Invalid: Extreme, impractical, unrelated"]},
],
math:[
{t:"Percentage & Average",p:["X% of Y = Y% of X = XY/100 | 10%=1/10, 12.5%=1/8, 20%=1/5, 25%=1/4, 33.3%=1/3, 50%=1/2","Increase R%: ×(100+R)/100 | Decrease R%: ×(100-R)/100 | Successive: a+b+ab/100","If A is R% more than B → B is [R/(100+R)]×100% less than A","Average = Sum/Count | First n natural: (n+1)/2 | First n even: n+1 | First n odd: n"]},
{t:"Profit/Loss & Interest",p:["P% = (SP-CP)/CP×100 | L% = (CP-SP)/CP×100 | SP = CP×(100±P%)/100","Discount% = Disc/MP×100 | SP = MP×(100-D%)/100 | SP of X items=CP of Y → P%=(Y-X)/X×100","SI = PRT/100 | CI = P(1+R/100)^T - P | CI-SI(2yr) = P(R/100)² | Doubles: R=100/T"]},
{t:"Time-Work & Speed-Distance",p:["A(a days)+B(b days) together = ab/(a+b) | If A is twice efficient → half time","Pipes: Fill(+), Empty(-) | A fills 6hr, B empties 8hr → Net=1/6-1/8=1/24 → 24hr","S=D/T | km/h→m/s: ×5/18 | m/s→km/h: ×18/5 | Avg speed(same D)=2S₁S₂/(S₁+S₂)","Train+pole: L/S | Train+platform: (L₁+L₂)/S | Relative: opposite=S₁+S₂, same=|S₁-S₂|"]},
{t:"Number System",p:["BODMAS: Brackets→Of→Division→Multiplication→Addition→Subtraction","Divisibility: 2(even), 3(digit sum÷3), 4(last 2÷4), 5(ends 0/5), 8(last 3÷8), 9(digit sum÷9), 11(alt diff÷11)","LCM×HCF = Product of two numbers","Squares: 11²=121,12²=144,13²=169,14²=196,15²=225,16²=256,17²=289,18²=324,19²=361,20²=400","Cubes: 2³=8,3³=27,4³=64,5³=125,6³=216,7³=343,8³=512,9³=729,10³=1000"]},
{t:"Series & Coding-Decoding",p:["Check: +const, ×const, squares, cubes, primes, fibonacci, alternating diffs","Primes: 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47 | Fibonacci: 1,1,2,3,5,8,13,21,34","Coding: Letter shift(+1: A→B, CAT→DBU), reverse, number substitution","A=1...Z=26 | Opposite pairs sum=27: A↔Z, B↔Y, C↔X, D↔W"]},
{t:"Blood Relations & Direction",p:["Draw family tree ALWAYS | Read question from END to START","Father's/Mother's son=Brother, daughter=Sister | Father's brother=Uncle, sister=Aunt","Direction: N(up),S(down),E(right),W(left) | Right from N=E | Left from N=W","Shortest distance: √(a²+b²) | Total in row = Left + Right - 1"]},
],
};

// ============ MCQ BANKS ============
const SYL=[
{q:"All dogs are cats. All cats are birds.\nI: All dogs are birds.\nII: Some birds are dogs.",o:["Only I","Only II","Both I & II","Neither"],a:2},
{q:"All pens are pencils. All pencils are erasers.\nI: All pens are erasers.\nII: All erasers are pens.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"Some books are pens. All pens are chairs.\nI: Some books are chairs.\nII: All chairs are books.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"No man is woman. All women are beautiful.\nI: No man is beautiful.\nII: Some beautiful are not men.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All roses are flowers. Some flowers are red.\nI: Some roses are red.\nII: All red are roses.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"All teachers are students. No student is doctor.\nI: No teacher is doctor.\nII: Some students are teachers.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some apples are mangoes. Some mangoes are oranges.\nI: Some apples are oranges.\nII: No apple is orange.",o:["Only I","Only II","Either I or II","Neither"],a:2},
{q:"All kings are queens. All queens are jacks.\nI: All kings are jacks.\nII: Some jacks are kings.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"No cat is dog. No dog is rat.\nI: No cat is rat.\nII: Some rats are cats.",o:["Only I","Only II","Either I or II","Neither"],a:3},
{q:"All rivers are lakes. No lake is pond.\nI: No river is pond.\nII: Some lakes are rivers.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some boys are girls. All girls are students.\nI: Some boys are students.\nII: All students are girls.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All metals are gold. All gold is silver.\nI: All metals are silver.\nII: Some silver is metal.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"No shirt is trouser. All trousers are coats.\nI: No shirt is coat.\nII: Some coats are not shirts.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All cars are buses. Some buses are trains.\nI: Some cars are trains.\nII: Some trains are buses.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All A are B. No B is C.\nI: No A is C.\nII: No C is A.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"All fruits are vegetables. Some vegetables are roots.\nI: Some fruits are roots.\nII: Some roots are vegetables.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All chairs are tables. All tables are wood.\nI: All chairs are wood.\nII: All wood are chairs.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"Some doctors are engineers. All engineers are teachers.\nI: Some doctors are teachers.\nII: Some teachers are doctors.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"No bird is animal. All animals are humans.\nI: No bird is human.\nII: Some humans are not birds.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All cups are plates. No plate is glass.\nI: No cup is glass.\nII: Some cups are not glass.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some red are blue. Some blue are green.\nI: Some red are green.\nII: No red is green.",o:["Only I","Only II","Either I or II","Neither"],a:2},
{q:"All phones are laptops. Some laptops are tablets.\nI: Some phones are tablets.\nII: All tablets are laptops.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"No pen is eraser. All erasers are sharpeners.\nI: No pen is sharpener.\nII: Some sharpeners are not pens.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All stars are moons. All moons are planets. No planet is sun.\nI: No star is sun.\nII: All stars are planets.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some men are women. Some women are children.\nI: Some men are children.\nII: All children are women.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"All students are intelligent. No intelligent is dull.\nI: No student is dull.\nII: Some intelligent are students.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"All politicians are liars. Some liars are thieves.\nI: Some politicians are thieves.\nII: Some thieves are liars.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All fish are whales. No whale is shark.\nI: No fish is shark.\nII: Some fish are not sharks.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some lions are tigers. All tigers are cats.\nI: Some lions are cats.\nII: All cats are tigers.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"No house is school. All schools are colleges.\nI: No house is college.\nII: Some colleges are not houses.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All winters are cold. All cold are dry.\nI: All winters are dry.\nII: Some dry are winters.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some trees are plants. All plants are herbs.\nI: Some trees are herbs.\nII: All herbs are trees.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"No X is Y. No Y is Z.\nI: No X is Z.\nII: Some Z are not X.",o:["Only I","Only II","Either I or II","Neither"],a:3},
{q:"All water is liquid. Some liquid is gas.\nI: Some water is gas.\nII: All liquid is water.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"All circles are squares. All squares are triangles.\nI: All circles are triangles.\nII: Some triangles are not circles.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"All bags are shoes. All shoes are clothes.\nI: All bags are clothes.\nII: Some clothes are bags.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"No flower is fruit. All fruits are seeds.\nI: No flower is seed.\nII: Some seeds are fruits.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"Some painters are singers. Some singers are dancers.\nI: Some painters are dancers.\nII: No painter is dancer.",o:["Only I","Only II","Either I or II","Neither"],a:2},
{q:"All crows are birds. Some birds fly.\nI: Some crows fly.\nII: All birds are crows.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"All rice is wheat. No wheat is corn.\nI: No rice is corn.\nII: Some wheat are rice.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some cars are red. All red are fast.\nI: Some cars are fast.\nII: All fast are red.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"No table is chair. All chairs are wood.\nI: No table is wood.\nII: Some wood are not tables.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All mangoes are sweet. Some sweet are healthy.\nI: Some mangoes are healthy.\nII: No cake is healthy.",o:["Only I","Only II","Either I or II","Neither"],a:3},
{q:"All Indians are Asians. All Asians are humans.\nI: All Indians are humans.\nII: Some humans are Indians.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some athletes are players. All players are fit.\nI: Some athletes are fit.\nII: Some fit are players.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"No moon is star. Some stars are bright.\nI: No moon is bright.\nII: Some bright are not moons.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All diamonds are gems. All gems are valuable.\nI: All diamonds are valuable.\nII: Some valuable are diamonds.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some cups are mugs. No mug is plate.\nI: Some cups are not plates.\nII: No cup is plate.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All oceans are water. All water is liquid.\nI: All oceans are liquid.\nII: Some liquids are oceans.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some soldiers are brave. All brave are respected.\nI: Some soldiers are respected.\nII: All respected are soldiers.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All trains are fast. Some fast are safe.\nI: Some trains are safe.\nII: All safe are trains.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"No city is village. All villages are peaceful.\nI: No city is peaceful.\nII: Some peaceful are not cities.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All silk is cloth. All cloth is fabric.\nI: All silk is fabric.\nII: Some fabric is silk.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"No computer is human. All humans think.\nI: No computer thinks.\nII: Some thinkers are human.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"Some music is jazz. All jazz is art.\nI: Some music is art.\nII: All art is music.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All windows are glass. All glass is fragile.\nI: All windows are fragile.\nII: Some fragile are windows.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some games are sports. No sport is easy.\nI: Some games are not easy.\nII: All games are easy.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All ponds are lakes. All lakes are reservoirs.\nI: All ponds are reservoirs.\nII: Some reservoirs are ponds.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some teachers are parents. Some parents are doctors.\nI: Some teachers are doctors.\nII: All doctors are parents.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"All keys are locks. No lock is door.\nI: No key is door.\nII: Some keys are not doors.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some milk is curd. All curd is yogurt.\nI: Some milk is yogurt.\nII: Some yogurt is milk.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"All books are novels. All novels are stories.\nI: All books are stories.\nII: All stories are books.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"No rich is poor. All poor are honest.\nI: No rich is honest.\nII: Some honest are poor.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All rain is water. All water is useful.\nI: All rain is useful.\nII: Some useful is rain.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some shoes are boots. All boots are leather.\nI: Some shoes are leather.\nII: All leather are boots.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All ice is cold. Some cold is solid.\nI: Some ice is solid.\nII: All solid are cold.",o:["Only I","Only II","Both","Neither"],a:3},
// Statement-Assumption
{q:"'Join ABC coaching for selection.'\nI: Coaching helps selection.\nII: Everyone who joins gets selected.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"'Buy X soap — 100% germ protection.'\nI: People want germ protection.\nII: No other soap protects.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"'Govt increased cigarette tax.'\nI: People may reduce smoking.\nII: Govt wants more revenue.",o:["Only I","Only II","Both","Either"],a:2},
{q:"'Don't use mobile while driving.'\nI: It's dangerous.\nII: People use mobiles while driving.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"'If it rains, match cancelled.'\nI: Rain affects outdoor games.\nII: It may rain.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"'Wear helmets to save lives.'\nAssumption: Helmets reduce head injuries.",o:["Implicit","Not implicit","Irrelevant","Both"],a:0},
{q:"'Practice daily to crack JKSSB.'\nAssumption: Regular practice helps exams.",o:["Implicit","Not implicit","Can't say","Irrelevant"],a:0},
{q:"'Sale! 50% off on all items.'\nI: Discount attracts customers.\nII: Shop is losing money.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"'Apply before 15th for discount.'\nI: Some may apply early.\nII: Discount motivates.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"'Drink boiled water in monsoon.'\nI: Boiling kills germs.\nII: Monsoon water has germs.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"'Ban plastic bags?'\nI: Yes, severe pollution.\nII: No, others use them too.",o:["Only I strong","Only II strong","Both","Neither"],a:0},
{q:"'Road accidents increasing.'\nAction I: Strict traffic enforcement.\nAction II: Ban all vehicles.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"'Flooding in city.'\nAction I: Improve drainage.\nAction II: Relocate everyone.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"'Don't drink and drive.'\nAssumption: Drinking impairs driving.",o:["Implicit","Not implicit","Can't say","Irrelevant"],a:0},
{q:"'No one above the law.'\nAssumption: Some consider themselves above law.",o:["Implicit","Not implicit","Both","Neither"],a:0},
{q:"All pillows are soft. Some soft are white.\nI: Some pillows are white.\nII: All white are pillows.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"No paper is plastic. Some plastic is rubber.\nI: Some rubber is not paper.\nII: No paper is rubber.",o:["Only I","Only II","Either I or II","Neither"],a:0},
{q:"No cinema is theater. Some theaters are halls.\nI: Some halls are not cinemas.\nII: No cinema is hall.",o:["Only I","Only II","Either I or II","Neither"],a:0},
{q:"All cakes are sweet. Some sweet are healthy.\nI: Some cakes are healthy.\nII: No cake is healthy.",o:["Only I","Only II","Either I or II","Neither"],a:2},
{q:"No sky is ground. All grounds are surfaces.\nI: No sky is surface.\nII: Some surfaces are not sky.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All oranges are fruits. Some fruits are sour.\nI: Some oranges are sour.\nII: All sour are oranges.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"Some horses are donkeys. All donkeys are animals.\nI: Some horses are animals.\nII: All animals are horses.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All roads are paths. Some paths are trails.\nI: Some roads are trails.\nII: All trails are paths.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"No dog is cat. All cats are pets.\nI: No dog is pet.\nII: Some pets are cats.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All mountains are hills. Some hills are valleys.\nI: Some mountains are valleys.\nII: Some valleys are hills.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"Some poets are writers. All writers are artists.\nI: Some poets are artists.\nII: All artists are poets.",o:["Only I","Only II","Both","Neither"],a:0},
];

const JKGK=[
{q:"Rajatarangini written by?",o:["Bilhana","Kalhana","Jonaraja","Srivara"],a:1},{q:"Ancient name of Jhelum?",o:["Chandrabhaga","Vitasta","Shatadru","Askini"],a:1},{q:"Zain-ul-Abidin known as?",o:["Sher-e-Kashmir","Budshah","Akbar","Sultan"],a:1},{q:"Treaty of Amritsar year?",o:["1845","1846","1847","1849"],a:1},{q:"Gulab Singh paid?",o:["₹50L","₹75L","₹100L","₹25L"],a:1},{q:"Last Dogra ruler?",o:["Gulab Singh","Ranbir Singh","Pratap Singh","Hari Singh"],a:3},{q:"Art 370 abrogated?",o:["5 Aug 2019","31 Oct 2019","15 Aug 2019","26 Jan 2020"],a:0},{q:"J&K became UT?",o:["5 Aug 2019","31 Oct 2019","26 Jan 2020","1 Nov 2019"],a:1},{q:"J&K districts?",o:["18","20","22","24"],a:1},{q:"Wular Lake district?",o:["Srinagar","Anantnag","Bandipora","Baramulla"],a:2},
{q:"Largest freshwater lake India?",o:["Dal","Wular","Manasbal","Chilika"],a:1},{q:"Jhelum source?",o:["Wular","Dal","Verinag","Manasbal"],a:2},{q:"Pampore famous for?",o:["Apples","Saffron","Walnuts","Rice"],a:1},{q:"Zoji La connects?",o:["Jammu-Kashmir","Kashmir-Ladakh","India-China","J&K-HP"],a:1},{q:"Summer capital?",o:["Jammu","Srinagar","Leh","Pahalgam"],a:1},{q:"Banihal connects?",o:["Kashmir-Ladakh","Jammu-Kashmir","India-Pak","Kashmir-HP"],a:1},{q:"Shah Mir dynasty founder?",o:["Zain-ul-Abidin","Shah Mir","Rinchana","Sikandar"],a:1},{q:"Accession signed?",o:["15 Aug 47","26 Oct 47","26 Jan 50","1 Nov 47"],a:1},{q:"Shalimar Bagh by?",o:["Akbar","Jahangir","Shah Jahan","Aurangzeb"],a:1},{q:"Habba Khatoon called?",o:["Nightingale","Lion","Star","Rose"],a:0},
{q:"State animal?",o:["Snow Leopard","Markhor","Hangul","Bear"],a:2},{q:"4th Buddhist Council by?",o:["Ashoka","Kanishka","Harsha","Menander"],a:1},{q:"Martand Temple by?",o:["Ashoka","Lalitaditya","Kanishka","Avantivarman"],a:1},{q:"Sheikh Abdullah called?",o:["Budshah","Sher-e-Kashmir","Tiger","Lion"],a:1},{q:"Raghunath Temple by?",o:["Gulab Singh","Ranbir Singh","Pratap Singh","Hari Singh"],a:1},{q:"Vaishno Devi district?",o:["Jammu","Udhampur","Reasi","Kathua"],a:2},{q:"Tawi flows through?",o:["Srinagar","Jammu","Anantnag","Rajouri"],a:1},{q:"Chenab also called?",o:["Vitasta","Chandrabhaga","Shatadru","Purushni"],a:1},{q:"Rouf dance from?",o:["Jammu","Kashmir","Ladakh","Punjab"],a:1},{q:"Dogri 8th Schedule?",o:["2000","2003","2005","2008"],a:1},
{q:"Official language?",o:["Kashmiri","Dogri","Urdu","Hindi"],a:2},{q:"Gulmarg famous for?",o:["Saffron","Skiing","Houseboats","Temples"],a:1},{q:"Pashmina from?",o:["Sheep","Angora","Changthangi goat","Yak"],a:2},{q:"Basohli paintings?",o:["Srinagar","Kathua","Jammu","Rajouri"],a:1},{q:"Wazwan courses?",o:["24","30","36","42"],a:2},{q:"First LG?",o:["Manoj Sinha","G.C. Murmu","Satya Pal Malik","Vohra"],a:1},{q:"Dachigam protects?",o:["Tiger","Hangul","Snow Leopard","Elephant"],a:1},{q:"Amarnath district?",o:["Srinagar","Anantnag","Ganderbal","Shopian"],a:1},{q:"Sonamarg means?",o:["Flowers","Gold meadow","Snow land","Hill"],a:1},{q:"Saffron soil?",o:["Alluvial","Karewa","Black","Red"],a:1},
{q:"Tulip Garden Asia's?",o:["Smallest","Largest","Oldest","Newest"],a:1},{q:"Shankaracharya in?",o:["Jammu","Srinagar","Pahalgam","Gulmarg"],a:1},{q:"Lal Ded was?",o:["Queen","Mystic poetess","Dancer","Warrior"],a:1},{q:"Nund Rishi patron of?",o:["India","Kashmir","Jammu","Ladakh"],a:1},{q:"Pahalgam base for?",o:["Vaishno Devi","Amarnath","Gulmarg","Sonamarg"],a:1},{q:"Cricket bats from?",o:["Chinar","Willow","Deodar","Walnut"],a:1},{q:"State bird?",o:["Peacock","Black-necked Crane","Sparrow","Eagle"],a:1},{q:"Kishtwar famous?",o:["Saffron","Sapphire","Apples","Rice"],a:1},{q:"Mehjoor called?",o:["Lion","Nightingale","Keats of Kashmir","Rose"],a:2},{q:"Bahu Fort in?",o:["Srinagar","Jammu","Rajouri","Kathua"],a:1},
{q:"Nishat Bagh by?",o:["Akbar","Jahangir","Asif Khan","Shah Jahan"],a:2},{q:"Hari Parbat Fort in?",o:["Srinagar","Jammu","Anantnag","Baramulla"],a:0},{q:"Akbar conquered?",o:["1526","1556","1586","1600"],a:2},{q:"Ravi flows through?",o:["Kashmir","Jammu","Ladakh","Kathua"],a:3},{q:"Patnitop in?",o:["Srinagar","Udhampur","Jammu","Anantnag"],a:1},{q:"Siachen longest outside?",o:["Arctic","Polar regions","Antarctica","Russia"],a:1},{q:"K2 height?",o:["8611m","8848m","8586m","8516m"],a:0},{q:"K2 range?",o:["Himalayas","Karakoram","Pir Panjal","Shivalik"],a:1},{q:"Pir Panjal separates?",o:["Kashmir-Ladakh","Jammu-Kashmir","India-China","Kashmir-HP"],a:1},{q:"State flower?",o:["Rose","Lotus","Lily","Tulip"],a:1},
{q:"State tree?",o:["Deodar","Pine","Chinar","Walnut"],a:2},{q:"Largest district area?",o:["Jammu","Anantnag","Kishtwar","Doda"],a:2},{q:"Avantivarman founded?",o:["Srinagar","Avantipura","Jammu","Anantnag"],a:1},{q:"Rajatarangini Tarangas?",o:["4","6","8","10"],a:2},{q:"Dumhal by?",o:["Gujjar","Wattal","Changpa","Bakerwal"],a:1},{q:"Bhand Pather?",o:["Dance","Folk theater","Song","Painting"],a:1},{q:"Noon Chai?",o:["Green","Pink/salt tea","Black","Herbal"],a:1},{q:"Kahwa made with?",o:["Coffee","Saffron","Chocolate","Ginger"],a:1},{q:"Sozni is?",o:["Dance","Embroidery","Painting","Music"],a:1},{q:"Paper Mache origin?",o:["China","Japan","Persia→Kashmir","India"],a:2},
{q:"National Conference by?",o:["Hari Singh","Sheikh Abdullah","Gulab Singh","Nehru"],a:1},{q:"Jahangir visited most?",o:["Delhi","Agra","Kashmir","Lahore"],a:2},{q:"Sikandar Butshikan known for?",o:["Building","Destroying temples","Poetry","Trade"],a:1},{q:"Rinchana was?",o:["First Muslim","Ladakhi prince","Dogra king","Mughal"],a:1},{q:"Karkota greatest?",o:["Durlabha","Lalitaditya","Avantivarman","Didda"],a:1},{q:"Didda was?",o:["Male king","Powerful queen","Poet","Saint"],a:1},{q:"Lolab Valley in?",o:["Srinagar","Kupwara","Baramulla","Bandipora"],a:1},{q:"Yusmarg in?",o:["Srinagar","Budgam","Anantnag","Pulwama"],a:1},{q:"Art 35A about?",o:["Special status","Permanent residents","Emergency","Governor"],a:1},{q:"J&K Reorganisation Act?",o:["5 Aug 2019","31 Oct 2019","9 Aug 2019","6 Aug 2019"],a:0},
{q:"First woman ruler Kashmir?",o:["Didda","Lal Ded","Habba Khatoon","Sugandha"],a:0},{q:"Manasbal called?",o:["Jewel","Supreme gem of lakes","Paradise","Golden"],a:1},{q:"Lidder flows through?",o:["Srinagar","Pahalgam","Gulmarg","Sonamarg"],a:1},{q:"Sindh river through?",o:["Srinagar","Pahalgam","Gulmarg","Sonamarg"],a:3},{q:"Mughal road connects?",o:["Srinagar-Jammu","Shopian-Rajouri","Srinagar-Leh","Jammu-Leh"],a:1},{q:"Shopian famous?",o:["Saffron","Apples","Rice","Walnuts"],a:1},{q:"Rajouri division?",o:["Kashmir","Jammu","Ladakh","None"],a:1},{q:"Poonch famous?",o:["Saffron","Rajmash","Apples","Silk"],a:1},{q:"Kathua called?",o:["City of Temples","City of Lakes","Pink City","Golden"],a:0},{q:"Nagin Lake near?",o:["Jammu","Srinagar","Pahalgam","Gulmarg"],a:1},
// More Syllogisms
,{q:"All pens are blue. Some blue are red.\nI: Some pens are red.\nII: All blue are pens.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"No car is bus. All buses are trucks.\nI: No car is truck.\nII: Some trucks are buses.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All shirts are clothes. All clothes are cotton.\nI: All shirts are cotton.\nII: Some cotton are shirts.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some girls are tall. All tall are beautiful.\nI: Some girls are beautiful.\nII: All beautiful are tall.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"No egg is bread. No bread is butter.\nI: No egg is butter.\nII: Some butter are not eggs.",o:["Only I","Only II","Either I or II","Neither"],a:3},
{q:"All tigers are animals. Some animals are wild.\nI: Some tigers are wild.\nII: All wild are tigers.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"Some phones are smart. All smart are costly.\nI: Some phones are costly.\nII: Some costly are smart.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"No river is ocean. All oceans are deep.\nI: No river is deep.\nII: Some deep are oceans.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All cooks are chefs. No chef is waiter.\nI: No cook is waiter.\nII: Some cooks are not waiters.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some snakes are green. Some green are poisonous.\nI: Some snakes are poisonous.\nII: No snake is poisonous.",o:["Only I","Only II","Either I or II","Neither"],a:2},
{q:"All Earth is planet. All planet is round.\nI: All Earth is round.\nII: Some round are Earth.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"No stone is metal. All metals are hard.\nI: No stone is hard.\nII: Some hard are metals.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"Some fruits are sweet. All sweet are tasty.\nI: Some fruits are tasty.\nII: All tasty are sweet.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All buses are red. No red is green.\nI: No bus is green.\nII: Some buses are not green.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some novels are fiction. All fiction are interesting.\nI: Some novels are interesting.\nII: All interesting are novels.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"'Schools should have CCTV.'\nI: CCTV improves security.\nII: All schools have crime.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"'Wear seatbelt while driving.'\nAssumption: Seatbelt reduces injury in accidents.",o:["Implicit","Not implicit","Can't say","Irrelevant"],a:0},
{q:"'Should govt ban junk food in schools?'\nArg I: Yes, children's health is priority.\nArg II: No, children like junk food.",o:["Only I strong","Only II strong","Both","Neither"],a:0},
{q:"'Train delayed by 3 hours.'\nAction I: Railways should improve punctuality.\nAction II: Cancel all trains.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All laptops are electronic. Some electronic are expensive.\nI: Some laptops are expensive.\nII: All expensive are laptops.",o:["Only I","Only II","Both","Neither"],a:3},
// More J&K GK
,{q:"Hazratbal Shrine is in?",o:["Jammu","Srinagar","Anantnag","Budgam"],a:1},
{q:"Chashme Shahi means?",o:["Royal spring","Royal fort","Royal garden","Royal palace"],a:0},
{q:"Which crop is Anantnag known for?",o:["Saffron","Rice","Willow/Cricket bats","Almonds"],a:2},
{q:"Salim Ali NP is in?",o:["Jammu","Srinagar","Pahalgam","Gulmarg"],a:1},
{q:"Harwan Garden is in?",o:["Jammu","Srinagar","Pahalgam","Anantnag"],a:1},
{q:"Mubarak Mandi Palace is in?",o:["Srinagar","Jammu","Kathua","Udhampur"],a:1},
{q:"Dal Lake houseboats called?",o:["Shikaras","Dungas","Doonga","Houseboats"],a:2},
{q:"Shikara is a?",o:["House","Small boat","Temple","Dance"],a:1},
{q:"Chrar-e-Sharief shrine in?",o:["Budgam","Srinagar","Anantnag","Baramulla"],a:0},
{q:"Nund Rishi's real name?",o:["Sheikh Noor-ud-Din","Sheikh Abdullah","Shah Mir","Zain-ul-Abidin"],a:0},
{q:"Kangan famous for?",o:["Trout fish","Saffron","Apples","Rice"],a:0},
{q:"Doda famous for?",o:["Basmati","Rajmash","Maize","Lavender"],a:2},
{q:"Samba known for?",o:["Border area/Industries","Saffron","Tourism","Lakes"],a:0},
{q:"Udhampur is known as?",o:["Army city","Saffron city","Lake city","Temple town"],a:0},
{q:"Ramban is on which highway?",o:["NH-44","NH-1","NH-7","NH-2"],a:0},
{q:"Pulwama known for?",o:["Saffron","Pencil factory/Apple","Rice","Silk"],a:1},
{q:"Kupwara is near?",o:["LOC","LAC","International border","Coast"],a:0},
{q:"Ganderbal known for?",o:["Sindh river/Sonamarg route","Saffron","Temples","Silk"],a:0},
{q:"First railway line in J&K?",o:["Jammu-Udhampur","Jammu-Srinagar","Banihal-Qazigund","Srinagar-Baramulla"],a:2},
{q:"Ladakh UT has how many districts?",o:["1","2","3","4"],a:1},
];

const ENG=[
{q:"___ honest man.",o:["A","An","The","No article"],a:1},{q:"___ university.",o:["A","An","The","No article"],a:0},{q:"He is ___ MLA.",o:["a","an","the","no article"],a:1},{q:"___ sun rises east.",o:["A","An","The","No article"],a:2},{q:"___ European visited.",o:["A","An","The","No article"],a:0},{q:"Must (duty): You ___ obey.",o:["can","may","must","will"],a:2},{q:"Permission: ___ I come in?",o:["Can","Will","Shall","May"],a:3},{q:"Advice: You ___ consult doctor.",o:["shall","should","will","can"],a:1},{q:"Past ability: He ___ swim at 5.",o:["can","could","may","shall"],a:1},{q:"Moral: We ___ to help needy.",o:["could","would","ought","might"],a:2},
{q:"Passive: 'She writes letter.'",o:["Letter is written by her","Was written","Written by her","Has been written"],a:0},{q:"Passive: 'They are building.'",o:["Is built","Is being built by them","Was being built","Has been built"],a:1},{q:"Passive: 'He had completed.'",o:["Was completed","Has been completed","Had been completed by him","Is completed"],a:2},{q:"Passive: 'Open the door.'",o:["Door opened","Let door be opened","Was opened","Should open"],a:1},{q:"Passive: 'They will finish.'",o:["Will be finished by them","Is finished","Was finished","Would be finished"],a:0},{q:"He said, 'I am tired.'",o:["Said he is tired","Said he was tired","Told was tired","Says was tired"],a:1},{q:"She said, 'I will come tomorrow.'",o:["Said will come","Said would come next day","Said would come tomorrow","Told will come"],a:1},{q:"'Where do you live?' he asked.",o:["Asked where do I","Asked where I lived","Told where I live","Said where lived"],a:1},{q:"'Don't make noise.' teacher said.",o:["Said not to","Ordered not to","Told them not to make noise","Said don't make"],a:2},{q:"'Are you coming?' he asked.",o:["Asked if I was coming","Asked was I coming","Asked am I coming","Told if coming"],a:0},
{q:"Syn: Abundant",o:["Scarce","Plentiful","Rare","Meagre"],a:1},{q:"Syn: Eminent",o:["Unknown","Distinguished","Poor","Ordinary"],a:1},{q:"Syn: Prudent",o:["Foolish","Reckless","Wise","Lazy"],a:2},{q:"Syn: Candid",o:["Secretive","Frank","Shy","Cunning"],a:1},{q:"Syn: Lethal",o:["Safe","Harmless","Deadly","Mild"],a:2},{q:"Syn: Tedious",o:["Exciting","Fun","Boring","Quick"],a:2},{q:"Syn: Wrath",o:["Peace","Joy","Anger","Fear"],a:2},{q:"Syn: Zeal",o:["Boredom","Laziness","Enthusiasm","Sadness"],a:2},{q:"Ant: Hostile",o:["Aggressive","Friendly","Angry","Violent"],a:1},{q:"Ant: Commence",o:["Begin","Start","Conclude","Continue"],a:2},
{q:"Ant: Affluent",o:["Rich","Wealthy","Poor","Prosperous"],a:2},{q:"Ant: Ascend",o:["Rise","Climb","Descend","Fly"],a:2},{q:"Ant: Victory",o:["Win","Success","Triumph","Defeat"],a:3},{q:"Ant: Generous",o:["Kind","Charitable","Miserly","Liberal"],a:2},{q:"Ant: Vacant",o:["Empty","Hollow","Occupied","Free"],a:2},{q:"Ant: Benevolent",o:["Kind","Generous","Malevolent","Caring"],a:2},{q:"Ant: Fragile",o:["Weak","Delicate","Sturdy","Thin"],a:2},{q:"Ant: Bold",o:["Brave","Courageous","Timid","Strong"],a:2},{q:"'Spill beans'?",o:["Cook","Reveal secret","Waste","Plant"],a:1},{q:"'White elephant'?",o:["Rare","Costly useless","Sacred","Big"],a:1},
{q:"'Cost arm & leg'?",o:["Cheap","Free","Very expensive","Painful"],a:2},{q:"'Achilles heel'?",o:["Strength","Weakness","Speed","Bravery"],a:1},{q:"'Break the ice'?",o:["Freeze","Start conversation","Fight","Cool"],a:1},{q:"'Apple of discord'?",o:["Fruit","Cause of quarrel","Sweet","Gift"],a:1},{q:"'Feather in cap'?",o:["Hat","Achievement","Fashion","Bird"],a:1},{q:"'Sit on fence'?",o:["Rest","Undecided","Guard","Watch"],a:1},{q:"'Blessing in disguise'?",o:["Hidden curse","Good from bad","Religious","Costume"],a:1},{q:"'Burn midnight oil'?",o:["Waste","Study/work late","Cook","Travel"],a:1},{q:"'Once blue moon'?",o:["Daily","Monthly","Very rarely","Never"],a:2},{q:"'Piece of cake'?",o:["Tasty","Very easy","Expensive","Hard"],a:1},
{q:"'See eye to eye'?",o:["Stare","Agree","Fight","Look away"],a:1},{q:"'Throw in towel'?",o:["Clean","Give up","Celebrate","Fight"],a:1},{q:"Good ___ maths.",o:["in","at","on","for"],a:1},{q:"Here ___ 3 hours.",o:["since","for","from","by"],a:1},{q:"Here ___ Monday.",o:["since","for","from","by"],a:0},{q:"Senior ___ me.",o:["than","to","from","of"],a:1},{q:"Prefer tea ___ coffee.",o:["than","to","over","from"],a:1},{q:"Among(___)",o:["2 things","3+","1 thing","none"],a:1},{q:"Error: 'Each boys have'",o:["Each","boys","have(→has)","No error"],a:2},{q:"Error: 'Return back'",o:["Return back(redundant)","home","He","No error"],a:0},
{q:"Bibliophile?",o:["Book hater","Book lover","Writer","Philosopher"],a:1},{q:"Somnambulism?",o:["Insomnia","Sleepwalking","Amnesia","Vertigo"],a:1},{q:"Misanthropist?",o:["Loves","Hates mankind","Loves women","Hates women"],a:1},{q:"Polyglot?",o:["One lang","Many languages","No lang","Two"],a:1},{q:"Posthumous?",o:["Before birth","After death","Before death","After birth"],a:1},{q:"Atheist?",o:["Believes","No god belief","Many gods","Uncertain"],a:1},{q:"Potable?",o:["Eatable","Drinkable","Portable","Durable"],a:1},{q:"Inflammable?",o:["Won't burn","Catches fire easily","Fireproof","Extinguisher"],a:1},{q:"Its vs It's: '___ raining.'",o:["Its","It's","Its'","Itss"],a:1},{q:"Principal(head) vs Principle(rule): school ___",o:["principal","principle","princple","principel"],a:0},
// More English
,{q:"Syn: Benevolent",o:["Cruel","Kind","Angry","Lazy"],a:1},
{q:"Syn: Obscure",o:["Clear","Famous","Unclear","Bright"],a:2},
{q:"Syn: Jubilant",o:["Sad","Joyful","Angry","Tired"],a:1},
{q:"Syn: Fragile",o:["Strong","Delicate","Hard","Tough"],a:1},
{q:"Syn: Lucid",o:["Confusing","Dark","Clear","Vague"],a:2},
{q:"Ant: Permanent",o:["Lasting","Temporary","Stable","Fixed"],a:1},
{q:"Ant: Optimist",o:["Realist","Pessimist","Idealist","Activist"],a:1},
{q:"Ant: Fertile",o:["Rich","Barren","Green","Productive"],a:1},
{q:"Ant: Liberty",o:["Freedom","Captivity","Independence","Rights"],a:1},
{q:"Ant: Superior",o:["Better","Higher","Inferior","Greater"],a:2},
{q:"'Raining cats and dogs'?",o:["Animal rain","Very heavy rain","Pet parade","Light rain"],a:1},
{q:"'Cold shoulder'?",o:["Shoulder pain","Ignore someone","Winter","Freeze"],a:1},
{q:"'To eat humble pie'?",o:["Eat dessert","Apologize humbly","Cook food","Celebrate"],a:1},
{q:"'Storm in teacup'?",o:["Tea party","Big fuss small matter","Bad weather","Broken cup"],a:1},
{q:"'Back to square one'?",o:["Return home","Start over","Move back","Play game"],a:1},
{q:"'By skin of teeth'?",o:["Dental care","Barely/narrowly","Bite hard","Smile wide"],a:1},
{q:"'Keep fingers crossed'?",o:["Exercise","Hope for best","Count money","Write"],a:1},
{q:"'Hit below the belt'?",o:["Boxing","Unfair attack","Fall down","Wear belt"],a:1},
{q:"Maiden speech means?",o:["Last speech","First speech","Best speech","Long speech"],a:1},
{q:"Genocide means?",o:["Birth of race","Mass killing of race","Migration","Census"],a:1},
{q:"Ambidextrous means?",o:["Left handed","Right handed","Both hands equally","No hands"],a:2},
{q:"Inaudible means?",o:["Can't see","Can't hear","Can't read","Can't speak"],a:1},
{q:"Omnivore means?",o:["Eats meat only","Eats plants only","Eats both","Eats nothing"],a:2},
{q:"Correct: '___ Himalayas are magnificent.'",o:["A","An","The","No article"],a:2},
{q:"Modal: It ___ rain today. (possibility)",o:["can","may","shall","must"],a:1},
{q:"Passive: 'Someone stole my pen.'",o:["My pen was stolen","My pen is stolen","My pen has stolen","My pen stolen"],a:0},
{q:"Indirect: 'Please help me,' she said.",o:["She requested to help her","She requested me to help her","She said please help","She told help me"],a:1},
{q:"He died ___ malaria.",o:["from","by","of","with"],a:2},
{q:"Interested ___ music.",o:["at","on","in","for"],a:2},
{q:"Afraid ___ dogs.",o:["from","by","of","with"],a:2},
];

const COMP=[
{q:"Father of Computer?",o:["Vint Cerf","Charles Babbage","Gates","Berners-Lee"],a:1},{q:"CPU?",o:["Central Processing Unit","Central Programming","Computer Processing","Central Peripheral"],a:0},{q:"1 KB?",o:["1000 B","1024 B","1024 bits","1000 bits"],a:1},{q:"RAM?",o:["Non-volatile","Volatile","Permanent","ROM"],a:1},{q:"BIOS in?",o:["RAM","ROM","Cache","HDD"],a:1},{q:"1st gen?",o:["Transistors","Vacuum Tubes","ICs","Microprocessors"],a:1},{q:"3rd gen?",o:["Vacuum Tubes","Transistors","ICs","Microprocessors"],a:2},{q:"Intel 4004?",o:["HDD","Microprocessor","RAM","Monitor"],a:1},{q:"Ctrl+Z?",o:["Redo","Undo","Zoom","Close"],a:1},{q:"F12?",o:["Print","Save As","Help","Find"],a:1},
{q:"F7 Word?",o:["Save","Spell Check","Print","Find"],a:1},{q:"Excel ext?",o:[".docx",".pptx",".xlsx",".accdb"],a:2},{q:"VLOOKUP?",o:["Horizontal","Vertical","Diagonal","Random"],a:1},{q:"Excel rows?",o:["65536","1048576","256","16384"],a:1},{q:"WWW by?",o:["Vint Cerf","Berners-Lee","Tomlinson","Gates"],a:1},{q:"Email by?",o:["Berners-Lee","Vint Cerf","Ray Tomlinson","Gates"],a:2},{q:"SMTP?",o:["Browsing","Sending email","Receiving","Files"],a:1},{q:"DNS?",o:["IP→Domain","Domain→IP","URL→Email","Bin→Text"],a:1},{q:"IPv4 bits?",o:["16","32","64","128"],a:1},{q:"Linux?",o:["Proprietary","Open source","Hardware","Firmware"],a:1},
{q:"Firewall?",o:["Speed","Security","Storage","Power"],a:1},{q:"Star topology?",o:["Cable","Central hub","Circle","No hub"],a:1},{q:"Modem?",o:["AC→DC","Digital↔Analog","Text→Bin","Audio→Vid"],a:1},{q:"MS Access?",o:["Word processor","Spreadsheet","DBMS","Presentation"],a:2},{q:"Primary Key?",o:["Duplicates","Unique ID","Null OK","Foreign"],a:1},{q:"Scanner?",o:["Output","Input","Storage","Processing"],a:1},{q:"Compiler?",o:["Line by line","Whole program","Char","Word"],a:1},{q:"Binary base?",o:["2","8","10","16"],a:0},{q:"ASCII bits?",o:["5","6","7","8"],a:2},{q:"HTML?",o:["HyperText Markup Language","High Tech","Hyper Transfer","Home Tool"],a:0},
{q:"Cache?",o:["Slowest","Fastest","Medium","Same as RAM"],a:1},{q:"SSD?",o:["Solid State Drive","Super Speed","System Storage","Solid Speed"],a:0},{q:"USB?",o:["Universal System","Universal Serial Bus","Unified Serial","Universal Storage"],a:1},{q:"GUI?",o:["General User","Graphical User Interface","Graphical Unified","General Unified"],a:1},{q:"Cold boot?",o:["Restart","Start from OFF","Sleep","Hibernate"],a:1},{q:"Kernel?",o:["Shell","Core of OS","Virus","Memory"],a:1},{q:"POST?",o:["Power On System","Power On Self Test","Primary OS","Power Output"],a:1},{q:"Phishing?",o:["Fishing","Fake sites steal data","Network","Language"],a:1},{q:"OCR?",o:["Optical Character Recognition","Online Code","Optical Code","Output Code"],a:0},{q:"OMR?",o:["Bank cheques","Answer sheets","Images","Barcodes"],a:1},
{q:"MICR?",o:["Schools","Banks","Hospitals","Airports"],a:1},{q:"Ctrl+H?",o:["Help","Hide","Find & Replace","Home"],a:2},{q:"Mail Merge?",o:["Excel","Word","PPT","Access"],a:1},{q:"F5 PPT?",o:["Save","Print","Slide Show","Help"],a:2},{q:"Access ext?",o:[".xlsx",".docx",".accdb",".pptx"],a:2},{q:"Query Access?",o:["Store","Retrieve data","Entry","Print"],a:1},{q:"Form Access?",o:["Printing","Data entry","Queries","Charts"],a:1},{q:"BCC?",o:["Best CC","Blind Carbon Copy","Basic","Bulk"],a:1},{q:"HTTPS?",o:["Hyper Transfer","Secure HTTP","High Tech","Home"],a:1},{q:"Wi-Fi?",o:["802.3","802.11","802.5","802.15"],a:1},
{q:"Largest network?",o:["LAN","MAN","WAN","PAN"],a:2},{q:"IPv6 bits?",o:["32","64","128","256"],a:2},{q:"Ransomware?",o:["Speed","Locks data money","Deletes","Fixes"],a:1},{q:"Virtual memory?",o:["RAM","ROM","HDD as RAM","Cache"],a:2},{q:"Laser printer?",o:["Impact","Non-impact","Thermal","Manual"],a:1},{q:"Pivot Table?",o:["Word","Excel","PPT","Access"],a:1},{q:"=COUNT()?",o:["Adds","Counts numbers","Max","Average"],a:1},{q:"=NOW()?",o:["Date","Time","Date & Time","Cell"],a:2},{q:"Track Changes?",o:["Excel","PPT","Word","Access"],a:2},{q:"Ctrl+P?",o:["Paste","Print","Page","Preview"],a:1},
{q:"Word ext?",o:[".xlsx",".pptx",".docx",".txt"],a:2},{q:"1 Byte?",o:["4 bits","8 bits","16","32"],a:1},{q:"1 TB?",o:["1024 MB","1024 GB","1024 KB","1000 GB"],a:1},{q:"Motherboard?",o:["CPU","Main board","RAM","HDD"],a:1},{q:"PPT ext?",o:[".docx",".xlsx",".pptx",".accdb"],a:2},{q:"Ctrl+A?",o:["Save","Select All","Align","Add"],a:1},{q:"Conditional Format?",o:["Word","Excel","PPT","Access"],a:1},{q:"Slide Master?",o:["One slide","Template all","Animation","Transition"],a:1},{q:"Animation vs Transition?",o:["Same","Anim=objects Trans=slides","Anim=slides Trans=obj","No diff"],a:1},{q:"Foreign Key?",o:["2 databases","Links 2 tables","2 queries","2 forms"],a:1},
// More Computers
,{q:"First lady programmer?",o:["Grace Hopper","Ada Lovelace","Margaret Hamilton","Hedy Lamarr"],a:1},
{q:"ENIAC full form?",o:["Electronic Numerical Integrator And Computer","Electronic Network Interface","Electronic Number Input","Electronic Numerical Internet"],a:0},
{q:"Plotter is used for?",o:["Scanning","Large drawings/maps","Sound","Photos"],a:1},
{q:"Barcode reader is?",o:["Output","Input","Storage","Processing"],a:1},
{q:"Light pen is?",o:["Output","Input","Storage","Both"],a:1},
{q:"Webcam is?",o:["Output","Input","Storage","Processing"],a:1},
{q:"Touchscreen is?",o:["Input","Output","Both I/O","Storage"],a:2},
{q:"EPROM stands for?",o:["Erasable Programmable ROM","Electronic PROM","Extended PROM","Extra PROM"],a:0},
{q:"DRAM stands for?",o:["Direct RAM","Dynamic RAM","Digital RAM","Double RAM"],a:1},
{q:"SRAM is used for?",o:["Main memory","Cache memory","Hard disk","CD"],a:1},
{q:"PDF stands for?",o:["Personal Doc Format","Portable Document Format","Printed Doc File","Public Data Format"],a:1},
{q:"GPS stands for?",o:["Global Processing System","Global Positioning System","General Position System","Graphical Position System"],a:1},
{q:"SQL stands for?",o:["Simple Query Language","Structured Query Language","System Query Language","Standard Query Language"],a:1},
{q:"URL stands for?",o:["Universal Resource Locator","Uniform Resource Locator","Uniform Resource Link","Universal Resource Link"],a:1},
{q:"ISP stands for?",o:["Internet Service Provider","Internal System Protocol","Internet System Program","Internal Service Provider"],a:0},
{q:"Ctrl+F does?",o:["Format","Find","File","Font"],a:1},
{q:"Ctrl+N does?",o:["New","Next","Null","Name"],a:0},
{q:"Ctrl+O does?",o:["Output","Open","Order","Option"],a:1},
{q:"Ctrl+W does?",o:["Window","Close document","Web","Width"],a:1},
{q:"Ctrl+B does?",o:["Bookmark","Bold","Back","Border"],a:1},
{q:"=SUMIF() does?",o:["Sum all","Sum with condition","Count","Average"],a:1},
{q:"=CONCATENATE() does?",o:["Splits text","Joins text","Counts text","Formats text"],a:1},
{q:"=TRIM() does?",o:["Cuts text","Removes extra spaces","Deletes cell","Formats"],a:1},
{q:"Freeze Panes is in?",o:["Word","Excel","PPT","Access"],a:1},
{q:"Data Validation is in?",o:["Word","Excel","PPT","Access"],a:1},
{q:"Worm virus spreads via?",o:["USB only","Network","Touch","Sound"],a:1},
{q:"Trojan horse is?",o:["Useful software","Disguised as useful malware","Network tool","Hardware"],a:1},
{q:"Spyware does?",o:["Speeds up","Monitors user activity","Fixes bugs","Encrypts"],a:1},
{q:"Cloud computing types?",o:["SaaS, PaaS, IaaS","HTTP, FTP, SMTP","RAM, ROM, Cache","LAN, MAN, WAN"],a:0},
{q:"Example of SaaS?",o:["AWS","Gmail/Google Docs","Linux","Router"],a:1},
];

const MATH=[
{q:"36% of 50?",o:["18","15","20","16"],a:0},{q:"25% of 480?",o:["100","110","120","125"],a:2},{q:"12.5% of 640?",o:["80","64","100","72"],a:0},{q:"40% of X=200, X?",o:["400","500","600","800"],a:1},{q:"30% of X=150, X?",o:["450","500","600","550"],a:1},{q:"Price+20%, consumption-?",o:["20%","25%","16.67%","15%"],a:2},{q:"Successive 10%+20%?",o:["28%","30%","27%","25%"],a:0},{q:"CP=400,SP=500, P%?",o:["20%","25%","10%","15%"],a:1},{q:"CP=600,SP=480, L%?",o:["15%","25%","20%","10%"],a:2},{q:"MP=500,D=20%, SP?",o:["400","380","450","420"],a:0},
{q:"MP=800,D=15%, SP?",o:["680","700","720","650"],a:0},{q:"SP 10 items=CP 12. P%?",o:["10%","15%","20%","25%"],a:2},{q:"Avg first 10 natural?",o:["5","5.5","6","10"],a:1},{q:"Avg first 10 even?",o:["10","11","12","9"],a:1},{q:"Avg 15,25,35,45,55?",o:["30","35","40","45"],a:1},{q:"SI ₹5000@8%@3yr?",o:["1200","1000","800","1500"],a:0},{q:"SI ₹2000@10%@2yr?",o:["200","300","400","500"],a:2},{q:"Doubles 10yr, Rate?",o:["5%","10%","15%","20%"],a:1},{q:"Doubles 8yr, Rate?",o:["10%","12.5%","8%","15%"],a:1},{q:"CI-SI ₹5000@10%@2yr?",o:["50","100","40","25"],a:0},
{q:"A:B=2:3,B:C=4:5 A:C?",o:["8:15","6:15","2:5","4:5"],a:0},{q:"₹630 in 4:5, larger?",o:["280","350","300","320"],a:1},{q:"A:B=3:5,T=240, A?",o:["80","90","100","120"],a:1},{q:"72 km/h=?m/s",o:["15","20","25","10"],a:1},{q:"15 m/s=?km/h",o:["45","54","60","48"],a:1},{q:"Train 200m,pole,10s?",o:["72","36","54","90"],a:0},{q:"Train 300m+200m,25s?",o:["72","54","36","90"],a:0},{q:"Avg speed 60@30+60@60?",o:["45","40","50","35"],a:1},{q:"Boat 12,stream 3,up?",o:["9","12","15","6"],a:0},{q:"A 10d,B 15d together?",o:["5","6","8","12"],a:1},
{q:"A 12d,B 18d together?",o:["6","7.2","8","9"],a:1},{q:"Fill 6h,empty 8h,both?",o:["12","24","18","20"],a:1},{q:"8 workers 15d,10 workers?",o:["10","12","14","16"],a:1},{q:"Pipe 5h+10h together?",o:["3.33","4","5","7.5"],a:0},{q:"LCM 12,18?",o:["24","36","48","72"],a:1},{q:"HCF 36,48?",o:["6","8","12","24"],a:2},{q:"17²?",o:["279","289","299","269"],a:1},{q:"√144?",o:["11","12","13","14"],a:1},{q:"5³?",o:["100","125","150","175"],a:1},{q:"BODMAS: 12+8×3-4÷2?",o:["28","34","36","38"],a:2},
{q:"BODMAS: 8+4×3-6÷2?",o:["17","20","30","15"],a:0},{q:"50% of 50% of 200?",o:["25","50","75","100"],a:1},{q:"Area square side 9?",o:["81","72","36","18"],a:0},{q:"Perimeter 12×8?",o:["40","96","20","48"],a:0},{q:"Area circle r=7?",o:["44","154","308","88"],a:1},{q:"20%×150+30%×200?",o:["80","90","100","110"],a:1},{q:"Series: 2,6,18,54,?",o:["108","162","148","156"],a:1},{q:"Series: 1,4,9,16,25,?",o:["30","36","35","49"],a:1},{q:"Series: 2,3,5,7,11,13,?",o:["15","17","19","14"],a:1},{q:"Series: 1,1,2,3,5,8,?",o:["11","12","13","14"],a:2},
{q:"Series: 3,9,27,81,?",o:["162","243","324","729"],a:1},{q:"Series: 5,11,23,47,?",o:["96","95","94","93"],a:1},{q:"Series: 100,96,91,85,78,?",o:["69","70","71","72"],a:1},{q:"Series: 7,14,28,56,?",o:["84","96","112","104"],a:2},{q:"Series: 4,9,25,49,121,?",o:["144","169","196","225"],a:1},{q:"B,D,F,H,?",o:["I","J","K","L"],a:1},{q:"Z,X,V,T,?",o:["S","R","Q","P"],a:1},{q:"B,E,H,K,?",o:["L","M","N","O"],a:2},{q:"CLOUD=DMPVE, RAIN?",o:["SBJO","SBJM","RBJO","QBJO"],a:0},{q:"Letter -1: DPNF?",o:["COME","DOME","CONE","DIME"],a:0},
{q:"Letter +2: CAT?",o:["DBU","ECV","ECW","FDX"],a:1},{q:"15th left,10th right?",o:["24","25","26","23"],a:0},{q:"7th top,28th bottom?",o:["34","35","36","33"],a:0},{q:"20th top,15th bottom?",o:["33","34","35","36"],a:1},{q:"5km N,right 3,right 5?",o:["3km","5km","8km","13km"],a:0},{q:"Face N,right twice?",o:["N","S","E","W"],a:1},{q:"Face E,left twice?",o:["N","S","E","W"],a:3},{q:"'Mother's only son's son'?",o:["Son","Brother","Nephew","Father"],a:0},{q:"Doctor:Hospital::Teacher:?",o:["School","Student","Book","Edu"],a:0},{q:"Odd: Apple,Mango,Potato,Banana",o:["Apple","Mango","Potato","Banana"],a:2},
{q:"Mon+5 days?",o:["Fri","Sat","Sun","Thu"],a:1},{q:"87÷3?",o:["Yes(8+7=15)","No","Only 9","Can't tell"],a:0},{q:"Div by 4: check?",o:["Last digit","Last 2 digits","Last 3","Sum"],a:1},{q:"A 20%>B, B __<%A?",o:["20%","16.67%","25%","15%"],a:1},{q:"Successive 20%+10%?",o:["28%","30%","27%","25%"],a:0},
// More Maths & Reasoning
,{q:"Series: 2,5,10,17,26,?",o:["35","37","38","40"],a:1},
{q:"Series: 1,2,6,24,120,?",o:["240","600","720","840"],a:2},
{q:"Series: 11,13,17,19,23,?",o:["25","27","29","31"],a:2},
{q:"Series: 6,11,21,36,56,?",o:["76","78","81","91"],a:2},
{q:"AZ,BY,CX,DW,?",o:["EU","EV","EX","EY"],a:1},
{q:"ACE,FHJ,KMO,?",o:["PQR","PRT","PRS","PRU"],a:1},
{q:"If GO=32(7+15), SHE=?",o:["33","40","42","44"],a:2},
{q:"Mirror of 3:15 on clock?",o:["8:45","9:45","8:15","9:15"],a:0},
{q:"Odd: 8,27,64,100,125",o:["8","27","100","125"],a:2},
{q:"Odd: Wheat,Rice,Mustard,Maize",o:["Wheat","Rice","Mustard","Maize"],a:2},
{q:"Odd: January,March,May,November",o:["January","March","May","November"],a:3},
{q:"If 2×3=8, 3×4=15, then 5×6=?",o:["33","35","30","32"],a:0},
{q:"Pipe A fills 3hr, B fills 6hr. Together?",o:["2hr","4hr","4.5hr","1.5hr"],a:0},
{q:"A is B's brother. C is B's father. D is C's brother. A to D?",o:["Son","Nephew","Uncle","Brother"],a:1},
{q:"X's mother is Y's mother-in-law. Y's husband is Z. X to Z?",o:["Brother","Brother-in-law","Father","Uncle"],a:1},
{q:"Face South, turn left. Now facing?",o:["North","South","East","West"],a:2},
{q:"Face West, turn right twice. Now facing?",o:["North","South","East","West"],a:2},
{q:"10km East, 5km North, 10km West. Distance from start?",o:["5km","10km","15km","25km"],a:0},
{q:"Ratio 5:3, total 720. Larger share?",o:["270","450","360","480"],a:1},
{q:"If 15 men do work in 20 days, 20 men do in?",o:["10","12","15","18"],a:2},
{q:"Train 400m passes bridge 600m in 50s. Speed km/h?",o:["36","54","72","90"],a:2},
{q:"Two trains 100m each, opposite, 50+40 km/h. Cross time?",o:["6s","7s","8s","9s"],a:2},
{q:"CI on ₹10000@10%@2yr?",o:["2000","2100","2200","2500"],a:1},
{q:"Population 10000, grows 10%/yr. After 2 yr?",o:["11000","12000","12100","12500"],a:2},
{q:"60% of X = 300. X=?",o:["400","450","500","600"],a:2},
{q:"A number increased by 25% gives 500. Number?",o:["375","400","425","450"],a:1},
{q:"Selling price is 80% of marked price. Discount%?",o:["15%","20%","25%","30%"],a:1},
{q:"Odd: 2,3,5,9,11,13",o:["2","5","9","13"],a:2},
{q:"Complete: 1,3,7,15,31,?",o:["55","60","63","65"],a:2},
];

const GK=[
{q:"Father of Constitution?",o:["Nehru","Gandhi","Ambedkar","Patel"],a:2},{q:"Constitution adopted?",o:["26 Jan 50","26 Nov 49","15 Aug 47","26 Jan 49"],a:1},{q:"Art 32 called?",o:["Right to Freedom","Heart & Soul","Right to Equality","Right to Edu"],a:1},{q:"Lok Sabha age?",o:["21","25","30","35"],a:1},{q:"Rajya Sabha age?",o:["21","25","30","35"],a:2},{q:"42nd Amendment?",o:["Mini Constitution","Magna Carta","Bill of Rights","Basic Structure"],a:0},{q:"President's Rule?",o:["Art 352","Art 356","Art 360","Art 370"],a:1},{q:"Money Bill in?",o:["Rajya Sabha","Lok Sabha","Both","Joint"],a:1},{q:"Governor appointed by?",o:["PM","CM","President","CJI"],a:2},{q:"VP chairs?",o:["Lok Sabha","Rajya Sabha","SC","UPSC"],a:1},
{q:"INC founded?",o:["1857","1885","1906","1920"],a:1},{q:"Jallianwala Bagh?",o:["1917","1919","1921","1930"],a:1},{q:"'Do or Die'?",o:["Nehru","Subhash","Gandhi","Tilak"],a:2},{q:"Plassey?",o:["1757","1764","1857","1947"],a:0},{q:"Panipat I?",o:["1526","1556","1576","1761"],a:0},{q:"National Bird?",o:["Sparrow","Parrot","Peacock","Crane"],a:2},{q:"National Tree?",o:["Neem","Peepal","Banyan","Mango"],a:2},{q:"First Nobel India?",o:["Raman","Tagore","Teresa","Sen"],a:1},{q:"Bharat Ratna?",o:["Military","Highest civilian","Sports","Literary"],a:1},{q:"Longest river India?",o:["Yamuna","Godavari","Ganga","Brahmaputra"],a:2},
{q:"Chilika Lake?",o:["Kerala","Odisha","TN","WB"],a:1},{q:"Largest state area?",o:["MP","UP","Rajasthan","Maharashtra"],a:2},{q:"Most literate?",o:["Goa","Kerala","Mizoram","Tripura"],a:1},{q:"Census every?",o:["5yr","10yr","15yr","7yr"],a:1},{q:"NH-44 longest?",o:["Yes","No","NH-1","NH-7"],a:0},{q:"Vit C deficiency?",o:["Rickets","Scurvy","Night blind","Beriberi"],a:1},{q:"Vit D deficiency?",o:["Scurvy","Rickets","Pellagra","Anemia"],a:1},{q:"Universal donor?",o:["A","B","AB","O"],a:3},{q:"Universal recipient?",o:["A","B","AB","O"],a:2},{q:"Smallest bone?",o:["Femur","Stapes","Radius","Ulna"],a:1},
{q:"Speed light?",o:["3×10⁶","3×10⁸","3×10⁵","3×10¹⁰"],a:1},{q:"pH water?",o:["0","5","7","14"],a:2},{q:"Ozone layer?",o:["Troposphere","Stratosphere","Mesosphere","Thermo"],a:1},{q:"Kalinga battle?",o:["Panipat","Kalinga","Plassey","Haldi"],a:1},{q:"Great Bath?",o:["Harappa","Mohenjo-daro","Lothal","Kalibangan"],a:1},{q:"Arthashastra?",o:["Ashoka","Chanakya","Kalidasa","Aryabhatta"],a:1},{q:"Art 21A?",o:["Life","Education(6-14)","Equality","Freedom"],a:1},{q:"Sex ratio highest?",o:["UP","Kerala","Bihar","Rajasthan"],a:1},{q:"Narmada flows?",o:["Bay Bengal","Arabian Sea","Indian Ocean","Palk"],a:1},{q:"Godavari longest ___?",o:["North","Peninsular","Western","Eastern"],a:1},
{q:"Maurya founder?",o:["Ashoka","Bindusara","Chandragupta","Chanakya"],a:2},{q:"Taj Mahal?",o:["Akbar","Jahangir","Shah Jahan","Aurangzeb"],a:2},{q:"Quit India year?",o:["1940","1942","1944","1946"],a:1},{q:"Salt March?",o:["1920","1928","1930","1942"],a:2},{q:"Muslim League?",o:["1885","1895","1906","1920"],a:2},{q:"Golden Quad?",o:["4 metros","4 states","4 rivers","4 caps"],a:0},{q:"Buxar battle?",o:["1757","1764","1857","1526"],a:1},{q:"National Emblem from?",o:["Harappa","Ashoka Sarnath","Taj","Red Fort"],a:1},{q:"1st woman President?",o:["Indira","Pratibha Patil","Sarojini","Sushma"],a:1},{q:"Param Vir Chakra?",o:["Civilian","Highest military","Sports","Literary"],a:1},
// More India GK
,{q:"Fundamental Duties count?",o:["10","11","12","8"],a:1},
{q:"Right to Education Act year?",o:["2005","2009","2010","2012"],a:1},
{q:"Lok Sabha speaker elected by?",o:["President","PM","Lok Sabha members","Rajya Sabha"],a:2},
{q:"Rajya Sabha max members?",o:["230","245","250","260"],a:1},
{q:"Supreme Court judges max?",o:["31","33","34","35"],a:2},
{q:"First Chief Justice of India?",o:["B.R. Ambedkar","H.J. Kania","Rajendra Prasad","Nehru"],a:1},
{q:"Largest gland in body?",o:["Kidney","Liver","Pancreas","Thyroid"],a:1},
{q:"Largest organ?",o:["Heart","Liver","Skin","Brain"],a:2},
{q:"Blood group discovered by?",o:["Landsteiner","Pasteur","Fleming","Jenner"],a:0},
{q:"Penicillin discovered by?",o:["Pasteur","Fleming","Jenner","Koch"],a:1},
{q:"Photosynthesis produces?",o:["CO2","Nitrogen","Oxygen","Hydrogen"],a:2},
{q:"Greenhouse gas?",o:["Oxygen","Nitrogen","CO2","Helium"],a:2},
{q:"Newton's 1st law?",o:["F=ma","Action-Reaction","Inertia","Gravity"],a:2},
{q:"F=ma is Newton's?",o:["1st law","2nd law","3rd law","4th law"],a:1},
{q:"Sound travels fastest in?",o:["Air","Water","Vacuum","Solid"],a:3},
{q:"Light year measures?",o:["Time","Distance","Speed","Weight"],a:1},
{q:"Richter scale measures?",o:["Temperature","Earthquake","Wind","Rain"],a:1},
{q:"Beaufort scale measures?",o:["Temperature","Earthquake","Wind speed","Humidity"],a:2},
{q:"Capital of Sikkim?",o:["Imphal","Gangtok","Shillong","Aizawl"],a:1},
{q:"Capital of Mizoram?",o:["Imphal","Gangtok","Shillong","Aizawl"],a:3},
{q:"Smallest UT by area?",o:["Chandigarh","Lakshadweep","Daman","Delhi"],a:1},
{q:"Palk Strait separates?",o:["India-Lanka","India-Myanmar","India-Maldives","India-Bangladesh"],a:0},
{q:"Indian Ocean named after?",o:["Indian people","India country","Indus river","Indian food"],a:1},
{q:"Who gave slogan 'Swaraj is my birthright'?",o:["Gandhi","Nehru","Tilak","Subhash"],a:2},
{q:"Simon Commission year?",o:["1919","1927","1930","1935"],a:1},
{q:"Partition of Bengal year?",o:["1905","1911","1919","1920"],a:0},
{q:"Rowlatt Act year?",o:["1917","1919","1921","1930"],a:1},
{q:"Dandi March distance?",o:["241 miles","385 km","200 km","100 miles"],a:1},
{q:"First Governor General of free India?",o:["Mountbatten","Rajendra Prasad","Nehru","Ambedkar"],a:0},
{q:"Last Viceroy of India?",o:["Curzon","Mountbatten","Irwin","Wavell"],a:1},
];

// ============ APP ============
const BANKS={
  syl:{title:"🔥 Syllogisms",mcqs:SYL,desc:"MOST ASKED — Statement-Conclusion"},
  jk:{title:"🏔️ J&K GK",mcqs:JKGK,desc:"History, Geography, Culture"},
  eng:{title:"📝 English",mcqs:ENG,desc:"Grammar, Vocab, Idioms"},
  comp:{title:"💻 Computers",mcqs:COMP,desc:"Hardware, Office, Internet"},
  math:{title:"🧮 Maths & Reasoning",mcqs:MATH,desc:"Aptitude, Series, Logic"},
  gk:{title:"📚 India GK & Polity",mcqs:GK,desc:"Constitution, History, Science"},
};
const bKeys=Object.keys(BANKS);
const nKeys=Object.keys(NOTES);
const totalQ=bKeys.reduce((a,k)=>a+BANKS[k].mcqs.length,0);

function genMock(){
  const picks={syl:12,jk:16,eng:12,comp:16,math:12,gk:12};
  let all=[];
  bKeys.forEach(k=>{const arr=[...BANKS[k].mcqs];for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}all.push(...arr.slice(0,picks[k]||10));});
  for(let i=all.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[all[i],all[j]]=[all[j],all[i]];}
  return all.slice(0,80);
}

export default function App(){
  const[tab,setTab]=useState("study");
  const[mode,setMode]=useState("mcqs"); // "mcqs" or "notes"
  const[bank,setBank]=useState("syl");
  const[noteBank,setNoteBank]=useState("comp");
  const[qi,setQi]=useState(0);
  const[sel,setSel]=useState(null);
  const[sh,setSh]=useState(false);
  const[sc,setSc]=useState(0);
  const[tot,setTot]=useState(0);
  const[dn,setDn]=useState(false);
  const[wrong,setWrong]=useState([]);
  const[wrongMode,setWrongMode]=useState(false);
  const[days,setDays]=useState({});
  const[mockQs,setMockQs]=useState([]);
  const[mockActive,setMockActive]=useState(false);
  const[mockTime,setMockTime]=useState(4800);
  const[mockI,setMockI]=useState(0);
  const[mockSel,setMockSel]=useState(null);
  const[mockSh,setMockSh]=useState(false);
  const[mockSc,setMockSc]=useState(0);
  const[mockDn,setMockDn]=useState(false);
  const timerRef=useRef(null);

  const mq=wrongMode?wrong:(BANKS[bank]?BANKS[bank].mcqs:[]);
  const rst=()=>{setQi(0);setSel(null);setSh(false);setSc(0);setTot(0);setDn(false);};

  const pk=(i)=>{if(sh)return;setSel(i);setSh(true);if(i===mq[qi].a)setSc(s=>s+1);else{if(!wrong.find(w=>w.q===mq[qi].q))setWrong(w=>[...w,mq[qi]]);}setTot(t=>t+1);};
  const nx=()=>{if(qi+1>=mq.length)setDn(true);else{setQi(qi+1);setSel(null);setSh(false);}};

  useEffect(()=>{
    if(mockActive&&!mockDn&&mockTime>0){timerRef.current=setTimeout(()=>setMockTime(t=>t-1),1000);return()=>clearTimeout(timerRef.current);}
    if(mockTime<=0&&mockActive)setMockDn(true);
  },[mockActive,mockDn,mockTime]);

  const startMock=()=>{setMockQs(genMock());setMockActive(true);setMockTime(4800);setMockI(0);setMockSel(null);setMockSh(false);setMockSc(0);setMockDn(false);};
  const mockPk=(i)=>{if(mockSh)return;setMockSel(i);setMockSh(true);if(i===mockQs[mockI].a)setMockSc(s=>s+1);else{if(!wrong.find(w=>w.q===mockQs[mockI].q))setWrong(w=>[...w,mockQs[mockI]]);}};
  const mockNx=()=>{if(mockI+1>=mockQs.length)setMockDn(true);else{setMockI(mockI+1);setMockSel(null);setMockSh(false);}};
  const fmt=(s)=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const tS=(t)=>({padding:"8px 10px",cursor:"pointer",fontWeight:tab===t?700:400,fontSize:"11px",borderBottom:tab===t?"3px solid #4f46e5":"3px solid transparent",color:tab===t?"#4f46e5":"#666",background:"none",border:"none",whiteSpace:"nowrap"});

  const renderQuiz = (qs, idx, s, shown, score, total, done, onPk, onNx, label) => {
    if (!qs || qs.length === 0) return (<div style={{padding:20,textAlign:"center",color:"#888",fontSize:12}}>No questions yet. Start practicing!</div>);
    if (done || idx >= qs.length) return (<div style={{textAlign:"center",padding:20,background:"#fafafa",borderRadius:10}}>
      <div style={{fontSize:32}}>{score >= qs.length * 0.7 ? "🎉" : score >= qs.length * 0.5 ? "👍" : "💪"}</div>
      <div style={{fontSize:18,fontWeight:700}}>{score}/{qs.length}</div>
      <div style={{fontSize:11,color:"#666",marginTop:4}}>{score >= qs.length * 0.7 ? "Excellent!" : "Review notes & retry."}</div>
    </div>);
    const q = qs[idx];
    if (!q || !q.o) return null;
    return (<div style={{padding:12,background:"#fafafa",borderRadius:10,border:"1px solid #e8e8e8"}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#888",marginBottom:5}}>
        <span>{label} Q{idx+1}/{qs.length}</span><span>✅{score}/{total}</span>
      </div>
      <div style={{width:"100%",height:3,background:"#e5e5e5",borderRadius:2,marginBottom:8}}>
        <div style={{width:`${((idx+1)/qs.length)*100}%`,height:3,background:"#4f46e5",borderRadius:2,transition:"width .3s"}}/>
      </div>
      <div style={{fontSize:12.5,fontWeight:600,marginBottom:8,whiteSpace:"pre-line"}}>{q.q}</div>
      {q.o.map((o, i) => {
        const isA = i === q.a, isS = i === s;
        let bg = "#fff", bd = "1px solid #ddd";
        if (shown) { if (isA) { bg = "#dcfce7"; bd = "2px solid #22c55e"; } else if (isS) { bg = "#fee2e2"; bd = "2px solid #ef4444"; } }
        return (<div key={i} onClick={() => onPk(i)} style={{padding:"7px 10px",marginBottom:3,borderRadius:6,cursor:shown?"default":"pointer",background:bg,border:bd,fontSize:11.5,transition:"all .15s"}}><b style={{marginRight:4}}>{String.fromCharCode(65+i)}.</b>{o}</div>);
      })}
      {shown && (<button onClick={onNx} style={{marginTop:6,padding:"6px 14px",background:"#4f46e5",color:"#fff",border:"none",borderRadius:6,fontWeight:600,cursor:"pointer",fontSize:11}}>{idx+1 >= qs.length ? "Results →" : "Next →"}</button>)}
    </div>);
  };

  const noteLabels = {comp: "💻 Computers", eng: "📝 English", jk: "🏔️ J&K GK", gk: "📚 India GK", syl: "🔥 Syllogism Rules", math: "🧮 Maths & Reasoning"};

  const tabList = [["plan","📅 Plan"],["battle","⚔️ Day 1"],["study","📖 MCQs"],["notes","📝 Notes"],["mock","🎯 Mock"],["wrong","❌ Wrong"],["tips","💡 Tips"]];

  const handleTab = (t) => {
    setTab(t);
    if (t === "study") { rst(); setWrongMode(false); }
    if (t === "wrong") { rst(); setWrongMode(true); }
    if (t === "battle" || t === "mock") { setMockActive(false); setMockDn(false); }
  };

  const tipData = [
    {t: "🔥 SYLLOGISM (5-8 marks every paper!)", tips: ["ALWAYS draw Venn diagrams", "All+All=All | All+No=No | Some+Some=No conclusion", "'Either I or II' = contradictory conclusions", "Practice 90+ syllogism Qs until 90%+ score"]},
    {t: "📋 PAPER: 80 Qs, 80 min, 4×20 marks", tips: ["English: Articles, Voice, Narration, Idioms", "GK+J&K: Geography, History always asked", "Maths+Reasoning: Series, Syllogisms, Percentage", "Computers: MS Office, Internet, Abbreviations"]},
    {t: "⚡ MCQ HACKS", tips: ["Eliminate 2 → 50% guess chance", "'Always/Never' = usually wrong option", "Similar options → answer is one of them", "No negative → ATTEMPT EVERYTHING"]},
    {t: "🧠 YOUR DEVELOPER EDGE", tips: ["Computers = 80% known = free 16+ marks", "Reasoning = daily coding skill = fast learning", "Focus: J&K GK(weakest) + Syllogisms(most asked)", "Use Wrong tab to eliminate weaknesses"]},
  ];

  const renderSchedule = () => {
    return SCHED.map((s) => {
      const d = days[s.d];
      const ex = s.d === 13;
      const op = (d && !ex) ? 0.7 : 1;
      return (
        <div key={s.d} onClick={() => setDays((p) => ({...p, [s.d]: !p[s.d]}))} style={{padding: "8px 10px", marginBottom: 3, borderRadius: 7, cursor: "pointer", border: ex ? "2px solid #ef4444" : d ? "2px solid #22c55e" : "1px solid #e5e5e5", background: ex ? "#fef2f2" : d ? "#f0fdf4" : "#fff", opacity: op}}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <span style={{fontWeight: 700, fontSize: 11}}>{d && !ex ? "✅" : ex ? "🎯" : "⬜"} Day {s.d}: {s.t}</span>
            <span style={{fontSize: 9, color: "#888"}}>{s.hr}</span>
          </div>
          <div style={{fontSize: 10, color: "#555", marginTop: 2}}>{s.tk.join(" • ")}</div>
        </div>
      );
    });
  };

  return (
    <div style={{fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", maxWidth: 820, margin: "0 auto", color: "#1a1a1a"}}>
      <div style={{background: "linear-gradient(135deg,#4f46e5,#7c3aed)", padding: "14px 16px", borderRadius: 12, color: "#fff", marginBottom: 10}}>
        <div style={{fontSize: 15, fontWeight: 800}}>JKSSB Junior Assistant — Ultimate Prep</div>
        <div style={{display: "flex", gap: 6, marginTop: 8, fontSize: 10, flexWrap: "wrap"}}>
          <div style={{background: "rgba(255,255,255,.2)", padding: "4px 9px", borderRadius: 6}}><b>{dl()}</b> days</div>
          <div style={{background: "rgba(255,255,255,.2)", padding: "4px 9px", borderRadius: 6}}><b>{totalQ}</b> MCQs</div>
          <div style={{background: "rgba(255,255,255,.2)", padding: "4px 9px", borderRadius: 6}}>{"❌"}<b>{wrong.length}</b> wrong</div>
          <div style={{background: "rgba(255,255,255,.15)", padding: "4px 9px", borderRadius: 6}}>5 Apr 2026</div>
        </div>
      </div>

      <div style={{display: "flex", gap: 1, borderBottom: "1px solid #e5e5e5", marginBottom: 8, overflowX: "auto"}}>
        {tabList.map(([t, l]) => (
          <button key={t} onClick={() => handleTab(t)} style={tS(t)}>{l}{t === "wrong" && wrong.length > 0 ? `(${wrong.length})` : ""}</button>
        ))}
      </div>

      {tab === "plan" && (
        <div>{renderSchedule()}</div>
      )}

      {tab === "study" && (
        <div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginBottom: 8}}>
            {bKeys.map((k) => (
              <button key={k} onClick={() => {setBank(k); rst(); setWrongMode(false);}} style={{padding: "8px 6px", borderRadius: 7, border: bank === k ? "2px solid #4f46e5" : "1px solid #e5e5e5", background: bank === k ? "#eef2ff" : "#fff", cursor: "pointer", textAlign: "left", fontSize: 10}}>
                <div style={{fontWeight: bank === k ? 700 : 500}}>{BANKS[k].title}</div>
                <div style={{color: "#888", fontSize: 9}}>{BANKS[k].mcqs.length} Qs</div>
              </button>
            ))}
          </div>
          {renderQuiz(mq, qi, sel, sh, sc, tot, dn, pk, nx, "")}
          {dn && (
            <button onClick={rst} style={{marginTop: 6, padding: "6px 14px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer", fontSize: 11}}>{"🔄"} Retry</button>
          )}
        </div>
      )}

      {tab === "notes" && (
        <div>
          <div style={{display: "flex", gap: 3, marginBottom: 8, overflowX: "auto", paddingBottom: 2}}>
            {nKeys.map((k) => (
              <button key={k} onClick={() => setNoteBank(k)} style={{padding: "6px 10px", borderRadius: 6, border: noteBank === k ? "2px solid #4f46e5" : "1px solid #e5e5e5", background: noteBank === k ? "#eef2ff" : "#fff", cursor: "pointer", fontSize: 10, fontWeight: noteBank === k ? 700 : 400, whiteSpace: "nowrap", flexShrink: 0}}>{noteLabels[k] || k}</button>
            ))}
          </div>
          {(NOTES[noteBank] || []).map((n, i) => (
            <div key={i} style={{marginBottom: 6, padding: 10, background: "#fafafa", borderRadius: 8, border: "1px solid #e8e8e8"}}>
              <div style={{fontWeight: 700, fontSize: 12, color: "#4f46e5", marginBottom: 3}}>{n.t}</div>
              {n.p.map((p, j) => (
                <div key={j} style={{fontSize: 10.5, padding: "2px 0", lineHeight: 1.6, borderBottom: j < n.p.length - 1 ? "1px solid #eee" : "none"}}>{p}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === "mock" && (
        <div>
          {!mockActive && !mockDn && (
            <div style={{textAlign: "center", padding: 24}}>
              <div style={{fontSize: 32}}>{"🎯"}</div>
              <div style={{fontSize: 15, fontWeight: 700, marginTop: 6}}>Timed Mock Test</div>
              <div style={{fontSize: 11, color: "#666", margin: "6px 0 14px"}}>80 Questions - 80 Minutes - All subjects<br/>Simulates real JKSSB exam</div>
              <button onClick={startMock} style={{padding: "10px 28px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 13}}>Start Mock Test</button>
            </div>
          )}
          {mockActive && !mockDn && mockQs.length > 0 && (
            <div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, padding: "6px 10px", background: mockTime < 300 ? "#fef2f2" : "#f0f9ff", borderRadius: 7, border: mockTime < 300 ? "1px solid #fca5a5" : "1px solid #bfdbfe"}}>
                <span style={{fontSize: 11, fontWeight: 600}}>{"⏱️"} {fmt(mockTime)}</span>
                <span style={{fontSize: 10, color: "#666"}}>Q{mockI + 1}/80 - Score: {mockSc}</span>
              </div>
              {renderQuiz(mockQs, mockI, mockSel, mockSh, mockSc, mockI + (mockSh ? 1 : 0), false, mockPk, mockNx, "MOCK")}
            </div>
          )}
          {mockDn && (
            <div style={{textAlign: "center", padding: 20, background: "#fafafa", borderRadius: 10}}>
              <div style={{fontSize: 32}}>{mockSc >= 56 ? "🎉" : mockSc >= 40 ? "👍" : "💪"}</div>
              <div style={{fontSize: 18, fontWeight: 700}}>{mockSc}/80</div>
              <div style={{fontSize: 11, color: "#666", marginTop: 4}}>{mockSc >= 56 ? "Exam ready!" : mockSc >= 40 ? "Good! Focus weak areas." : "Keep practicing!"}</div>
              <div style={{fontSize: 10, color: "#888", marginTop: 6}}>Time: {fmt(4800 - mockTime)} of 80:00</div>
              <div style={{display: "flex", gap: 6, justifyContent: "center", marginTop: 10}}>
                <button onClick={() => {setMockActive(false); setMockDn(false);}} style={{padding: "6px 14px", background: "#f1f1f1", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 10}}>Back</button>
                <button onClick={startMock} style={{padding: "6px 14px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer", fontSize: 10}}>New Mock</button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "wrong" && (
        <div>
          {wrong.length === 0 ? (
            <div style={{textAlign: "center", padding: 24, color: "#888"}}>
              <div style={{fontSize: 32}}>{"✨"}</div>
              <div style={{fontSize: 13, fontWeight: 600, marginTop: 6}}>No wrong answers yet!</div>
              <div style={{fontSize: 11, marginTop: 3}}>Practice MCQs and wrong ones appear here.</div>
            </div>
          ) : (
            <div>
              <div style={{padding: "6px 10px", background: "#fef2f2", borderRadius: 7, marginBottom: 8, fontSize: 10, color: "#991b1b", border: "1px solid #fca5a5", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <span>{"❌"} {wrong.length} wrong - practice until ALL right!</span>
                <button onClick={() => {setWrong([]); rst();}} style={{padding: "2px 8px", background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 4, cursor: "pointer", fontSize: 9}}>Clear</button>
              </div>
              {renderQuiz(wrong, qi, sel, sh, sc, tot, dn, pk, nx, "WRONG")}
              {dn && (
                <button onClick={rst} style={{marginTop: 6, padding: "6px 14px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer", fontSize: 11}}>{"🔄"} Retry Wrong</button>
              )}
            </div>
          )}
        </div>
      )}

      {tab === "tips" && (
        <div>
          {tipData.map((s, i) => (
            <div key={i} style={{marginBottom: 6, padding: 10, borderRadius: 7, background: "#fafafa", border: "1px solid #e8e8e8"}}>
              <div style={{fontWeight: 700, fontSize: 11, marginBottom: 3}}>{s.t}</div>
              {s.tips.map((t, j) => (
                <div key={j} style={{fontSize: 10.5, lineHeight: 1.5}}>{"• "}{t}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === "battle" && (
        <div>
          {!mockActive && !mockDn && (
            <div style={{textAlign: "center", padding: 20}}>
              <div style={{fontSize: 32}}>{"⚔️"}</div>
              <div style={{fontSize: 15, fontWeight: 700, marginTop: 6}}>Day 1: Battlefield Test</div>
              <div style={{fontSize: 11, color: "#666", margin: "6px 0 10px"}}>This simulates a real JKSSB previous year paper.<br/>80 Questions mixed from all subjects.<br/>Purpose: See where you stand before studying!</div>
              <div style={{display: "flex", gap: 8, justifyContent: "center", marginTop: 12}}>
                <button onClick={() => startMock()} style={{padding: "10px 24px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 12}}>{"⏱️"} Timed (80 min)</button>
                <button onClick={() => {startMock(); setMockTime(99999);}} style={{padding: "10px 24px", background: "#22c55e", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 12}}>{"📝"} Untimed</button>
              </div>
              <div style={{marginTop: 16, textAlign: "left", padding: 12, background: "#f0f9ff", borderRadius: 8, border: "1px solid #bfdbfe"}}>
                <div style={{fontWeight: 700, fontSize: 11, color: "#1e40af", marginBottom: 4}}>After this test:</div>
                <div style={{fontSize: 10, color: "#333", lineHeight: 1.6}}>
                  {"• Check score — low is OK, that's expected"}<br/>
                  {"• Note weakest subjects"}<br/>
                  {"• Wrong answers auto-save to ❌ Wrong tab"}<br/>
                  {"• Spend MORE time on weak subjects in 13-day plan"}<br/>
                  {"• Cutoff: General 45-55/80, Reserved 35-45/80"}
                </div>
              </div>
            </div>
          )}
          {mockActive && !mockDn && mockQs.length > 0 && (
            <div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, padding: "6px 10px", background: mockTime < 300 && mockTime < 99000 ? "#fef2f2" : "#f0f9ff", borderRadius: 7}}>
                <span style={{fontSize: 11, fontWeight: 600}}>{mockTime > 99000 ? "📝 Untimed" : "⏱️ " + fmt(mockTime)}</span>
                <span style={{fontSize: 10, color: "#666"}}>Q{mockI + 1}/80 - Score: {mockSc}</span>
              </div>
              {renderQuiz(mockQs, mockI, mockSel, mockSh, mockSc, mockI + (mockSh ? 1 : 0), false, mockPk, mockNx, "BATTLE")}
            </div>
          )}
          {mockDn && (
            <div style={{textAlign: "center", padding: 20, background: "#fafafa", borderRadius: 10}}>
              <div style={{fontSize: 32}}>{mockSc >= 55 ? "🎉" : mockSc >= 40 ? "👍" : mockSc >= 25 ? "💪" : "📚"}</div>
              <div style={{fontSize: 20, fontWeight: 700}}>{mockSc}/80</div>
              <div style={{fontSize: 12, color: "#666", marginTop: 4, fontWeight: 600}}>
                {mockSc >= 55 ? "Amazing for Day 1! You're ahead of most." :
                 mockSc >= 40 ? "Good base! 13 days of prep will get you there." :
                 mockSc >= 25 ? "Decent start! Focus on weak areas." :
                 "Don't worry! Smart prep can take you to 55+."}
              </div>
              <div style={{display: "flex", gap: 6, justifyContent: "center", marginTop: 12}}>
                <button onClick={() => {setMockActive(false); setMockDn(false);}} style={{padding: "6px 14px", background: "#f1f1f1", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 10}}>Back</button>
                <button onClick={() => {setMockActive(false); setMockDn(false); setTab("wrong"); rst(); setWrongMode(true);}} style={{padding: "6px 14px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer", fontSize: 10}}>{"❌"} Review Wrong</button>
                <button onClick={() => {setMockActive(false); setMockDn(false); setTab("notes");}} style={{padding: "6px 14px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer", fontSize: 10}}>{"📝"} Start Studying</button>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{textAlign:"center",padding:8,fontSize:9,color:"#aaa"}}>{totalQ} MCQs • Notes • Mock Test • Wrong Tracker</div>
    </div>
  );
}