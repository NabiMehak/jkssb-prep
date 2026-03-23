import { useState, useEffect, useRef, useCallback } from "react";

const ED=new Date("2026-04-05");
const dl=()=>Math.max(0,Math.ceil((ED-new Date())/864e5));

// ========== QUESTION BANKS ==========
const SYL=[
// Basic All/Some/No patterns
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
// Advanced patterns
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
// More JKSSB-style
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
{q:"All mangoes are sweet. Some sweet are healthy.\nI: Some mangoes are healthy.\nII: All healthy are sweet.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"All Indians are Asians. All Asians are humans.\nI: All Indians are humans.\nII: Some humans are Indians.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some athletes are players. All players are fit.\nI: Some athletes are fit.\nII: Some fit are players.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"No moon is star. Some stars are bright.\nI: No moon is bright.\nII: Some bright are not moons.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All roads are paths. Some paths are trails.\nI: Some roads are trails.\nII: All trails are paths.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"Some eggs are white. Some white are round.\nI: Some eggs are round.\nII: All white are eggs.",o:["Only I","Only II","Either I or II","Neither"],a:3},
// Statement-Assumption
{q:"Statement: 'Join ABC coaching for guaranteed selection.'\nAssumption I: Coaching helps selection.\nAssumption II: Everyone who joins gets selected.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"Statement: 'Buy brand X — 100% germ protection.'\nAssumption I: People want germ protection.\nAssumption II: No other soap protects.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"Statement: 'Govt increased cigarette tax.'\nAssumption I: People may reduce smoking.\nAssumption II: Govt wants more revenue.",o:["Only I","Only II","Both","Either"],a:2},
{q:"Statement: 'Don't use mobile while driving.'\nAssumption I: It's dangerous.\nAssumption II: People do use mobiles while driving.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Statement: 'If it rains, match cancelled.'\nAssumption I: Rain affects outdoor activities.\nAssumption II: It may rain.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Statement: 'Hire more employees to meet demand.'\nArg I: Yes, current staff overworked.\nArg II: No, always managed this way.",o:["Only I strong","Only II strong","Both","Neither"],a:0},
{q:"Statement: 'Ban plastic bags?'\nArg I: Yes, severe environmental pollution.\nArg II: No, other countries also use them.",o:["Only I strong","Only II strong","Both","Neither"],a:0},
{q:"Statement: 'Schools should teach financial literacy.'\nArg I: Yes, helps adult money management.\nArg II: No, syllabus already heavy.",o:["Only I","Only II","Both strong","Neither"],a:2},
{q:"Statement: 'Flooding in city.'\nAction I: Improve drainage.\nAction II: Relocate everyone.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"Statement: 'Road accidents increasing.'\nAction I: Strict traffic enforcement.\nAction II: Ban all vehicles.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"Statement: 'Pollution very high in city.'\nAssumption: People care about health.",o:["Implicit","Not implicit","Can't say","Irrelevant"],a:0},
{q:"Statement: 'Apply before 15th for early bird discount.'\nAssumption I: Some may apply early.\nAssumption II: Discount motivates.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Statement: 'Drink boiled water in monsoon.'\nAssumption I: Boiling kills germs.\nAssumption II: Monsoon water has germs.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Statement: 'No one above the law.'\nAssumption: Some consider themselves above law.",o:["Implicit","Not implicit","Both","Neither"],a:0},
// More syllogisms
{q:"All books are novels. All novels are stories.\nI: All books are stories.\nII: All stories are books.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"No dog is cat. All cats are pets.\nI: No dog is pet.\nII: Some pets are cats.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All mountains are hills. Some hills are valleys.\nI: Some mountains are valleys.\nII: Some valleys are hills.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"Some poets are writers. All writers are artists.\nI: Some poets are artists.\nII: All artists are poets.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"No rich is poor. All poor are honest.\nI: No rich is honest.\nII: Some honest are poor.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All diamonds are gems. All gems are valuable.\nI: All diamonds are valuable.\nII: Some valuable are diamonds.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some cups are mugs. No mug is plate.\nI: Some cups are not plates.\nII: No cup is plate.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All oceans are water. All water is liquid.\nI: All oceans are liquid.\nII: Some liquids are oceans.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some soldiers are brave. All brave are respected.\nI: Some soldiers are respected.\nII: All respected are soldiers.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"No paper is plastic. Some plastic is rubber.\nI: Some rubber is not paper.\nII: No paper is rubber.",o:["Only I","Only II","Either I or II","Neither"],a:0},
{q:"All trains are fast. Some fast are safe.\nI: Some trains are safe.\nII: All safe are trains.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"No city is village. All villages are peaceful.\nI: No city is peaceful.\nII: Some peaceful are not cities.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All oranges are fruits. Some fruits are sour.\nI: Some oranges are sour.\nII: All sour are oranges.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"Some horses are donkeys. All donkeys are animals.\nI: Some horses are animals.\nII: All animals are horses.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All rain is water. All water is useful.\nI: All rain is useful.\nII: Some useful is rain.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"No cinema is theater. Some theaters are halls.\nI: Some halls are not cinemas.\nII: No cinema is hall.",o:["Only I","Only II","Either I or II","Neither"],a:0},
{q:"All pillows are soft. Some soft are white.\nI: Some pillows are white.\nII: All white are pillows.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"Some shoes are boots. All boots are leather.\nI: Some shoes are leather.\nII: All leather are boots.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All keys are locks. No lock is door.\nI: No key is door.\nII: Some keys are not doors.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some milk is curd. All curd is yogurt.\nI: Some milk is yogurt.\nII: Some yogurt is milk.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Statement: 'Wear helmets to save lives.'\nAssumption: Helmets reduce head injuries.",o:["Implicit","Not implicit","Irrelevant","Both"],a:0},
{q:"Statement: 'Banks open 10am-4pm.'\nAssumption: People need to know timings.",o:["Implicit","Not implicit","Both","Neither"],a:0},
{q:"Statement: 'Sale! 50% off on all items.'\nAssumption I: Discount attracts customers.\nAssumption II: Shop is losing money.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"Statement: 'Practice daily to crack JKSSB.'\nAssumption: Regular practice helps in exams.",o:["Implicit","Not implicit","Can't say","Irrelevant"],a:0},
{q:"All windows are glass. All glass is fragile.\nI: All windows are fragile.\nII: Some fragile are windows.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some games are sports. No sport is easy.\nI: Some games are not easy.\nII: All games are easy.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"All cakes are sweet. Some sweet are healthy.\nI: Some cakes are healthy.\nII: No cake is healthy.",o:["Only I","Only II","Either I or II","Neither"],a:2},
{q:"No sky is ground. All grounds are surfaces.\nI: No sky is surface.\nII: Some surfaces are not sky.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All ponds are lakes. All lakes are reservoirs.\nI: All ponds are reservoirs.\nII: Some reservoirs are ponds.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"Some teachers are parents. Some parents are doctors.\nI: Some teachers are doctors.\nII: All doctors are parents.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"All silk is cloth. All cloth is fabric.\nI: All silk is fabric.\nII: Some fabric is silk.",o:["Only I","Only II","Both","Neither"],a:2},
{q:"No computer is human. All humans think.\nI: No computer thinks.\nII: Some thinkers are human.",o:["Only I","Only II","Both","Neither"],a:1},
{q:"All ice is cold. Some cold is solid.\nI: Some ice is solid.\nII: All solid are cold.",o:["Only I","Only II","Both","Neither"],a:3},
{q:"Some music is jazz. All jazz is art.\nI: Some music is art.\nII: All art is music.",o:["Only I","Only II","Both","Neither"],a:0},
{q:"Statement: 'Don't drink and drive.'\nAssumption: Drinking impairs driving ability.",o:["Implicit","Not implicit","Can't say","Irrelevant"],a:0},
{q:"Statement: 'Boil water before drinking.'\nAction: Govt should test water supply regularly.",o:["Follows","Does not follow","Partially","Can't say"],a:0},
];

const JKGK=[
{q:"Rajatarangini written by?",o:["Bilhana","Kalhana","Jonaraja","Srivara"],a:1},
{q:"Ancient name of Jhelum?",o:["Chandrabhaga","Vitasta","Shatadru","Askini"],a:1},
{q:"Zain-ul-Abidin also known as?",o:["Sher-e-Kashmir","Budshah","Akbar","Sultan"],a:1},
{q:"Treaty of Amritsar year?",o:["1845","1846","1847","1849"],a:1},
{q:"Amount paid by Gulab Singh?",o:["₹50 lakh","₹75 lakh","₹100 lakh","₹25 lakh"],a:1},
{q:"Last Dogra ruler?",o:["Gulab Singh","Ranbir Singh","Pratap Singh","Hari Singh"],a:3},
{q:"Article 370 abrogated on?",o:["5 Aug 2019","31 Oct 2019","15 Aug 2019","26 Jan 2020"],a:0},
{q:"J&K became UT on?",o:["5 Aug 2019","31 Oct 2019","26 Jan 2020","1 Nov 2019"],a:1},
{q:"Districts in J&K UT?",o:["18","20","22","24"],a:1},
{q:"Wular Lake district?",o:["Srinagar","Anantnag","Bandipora","Baramulla"],a:2},
{q:"Largest freshwater lake India?",o:["Dal","Wular","Manasbal","Chilika"],a:1},
{q:"Jhelum source?",o:["Wular","Dal","Verinag Spring","Manasbal"],a:2},
{q:"Pampore famous for?",o:["Apples","Saffron","Walnuts","Rice"],a:1},
{q:"Zoji La connects?",o:["Jammu-Kashmir","Kashmir-Ladakh","India-China","J&K-HP"],a:1},
{q:"Summer capital J&K?",o:["Jammu","Srinagar","Leh","Pahalgam"],a:1},
{q:"Banihal Pass connects?",o:["Kashmir-Ladakh","Jammu-Kashmir","India-Pak","Kashmir-HP"],a:1},
{q:"Shah Mir dynasty founder?",o:["Zain-ul-Abidin","Shah Mir","Rinchana","Sikandar"],a:1},
{q:"Accession signed?",o:["15 Aug 1947","26 Oct 1947","26 Jan 1950","1 Nov 1947"],a:1},
{q:"Shalimar Bagh built by?",o:["Akbar","Jahangir","Shah Jahan","Aurangzeb"],a:1},
{q:"Habba Khatoon called?",o:["Nightingale of Kashmir","Lion of Kashmir","Star","Rose"],a:0},
{q:"State animal J&K?",o:["Snow Leopard","Markhor","Hangul","Bear"],a:2},
{q:"4th Buddhist Council by?",o:["Ashoka","Kanishka","Harsha","Menander"],a:1},
{q:"Martand Sun Temple by?",o:["Ashoka","Lalitaditya","Kanishka","Avantivarman"],a:1},
{q:"Sheikh Abdullah called?",o:["Budshah","Sher-e-Kashmir","Babr-e-Kashmir","Tiger"],a:1},
{q:"Raghunath Temple built by?",o:["Gulab Singh","Ranbir Singh","Pratap Singh","Hari Singh"],a:1},
{q:"Vaishno Devi district?",o:["Jammu","Udhampur","Reasi","Kathua"],a:2},
{q:"Tawi flows through?",o:["Srinagar","Jammu","Anantnag","Rajouri"],a:1},
{q:"Chenab also called?",o:["Vitasta","Chandrabhaga","Shatadru","Purushni"],a:1},
{q:"Rouf dance from?",o:["Jammu","Kashmir","Ladakh","Punjab"],a:1},
{q:"Dogri in 8th Schedule?",o:["2000","2003","2005","2008"],a:1},
{q:"Official language J&K?",o:["Kashmiri","Dogri","Urdu","Hindi"],a:2},
{q:"Gulmarg famous for?",o:["Saffron","Skiing","Houseboats","Temples"],a:1},
{q:"Dal Lake called?",o:["Crown of Kashmir","Jewel of Kashmir","Paradise Lake","Golden Lake"],a:1},
{q:"Pashmina from?",o:["Sheep","Angora","Changthangi goat","Yak"],a:2},
{q:"Basohli paintings from?",o:["Srinagar","Kathua","Jammu","Rajouri"],a:1},
{q:"Wazwan courses?",o:["24","30","36","42"],a:2},
{q:"First LG of J&K UT?",o:["Manoj Sinha","G.C. Murmu","Satya Pal Malik","N.N. Vohra"],a:1},
{q:"Dachigam NP protects?",o:["Tiger","Hangul","Snow Leopard","Elephant"],a:1},
{q:"Amarnath Cave district?",o:["Srinagar","Anantnag","Ganderbal","Shopian"],a:1},
{q:"Sonamarg means?",o:["Valley of flowers","Meadow of gold","Land of snow","Hill of beauty"],a:1},
{q:"Saffron soil type?",o:["Alluvial","Karewa","Black","Red"],a:1},
{q:"Tulip Garden Asia's?",o:["Smallest","Largest","Oldest","Newest"],a:1},
{q:"Shankaracharya Temple in?",o:["Jammu","Srinagar","Pahalgam","Gulmarg"],a:1},
{q:"Lal Ded was?",o:["Queen","Mystic poetess","Dancer","Warrior"],a:1},
{q:"Nund Rishi patron saint of?",o:["India","Kashmir","Jammu","Ladakh"],a:1},
{q:"Pahalgam base camp for?",o:["Vaishno Devi","Amarnath","Gulmarg","Sonamarg"],a:1},
{q:"Kashmiri willow used for?",o:["Furniture","Cricket bats","Boats","Houses"],a:1},
{q:"State bird J&K?",o:["Peacock","Black-necked Crane","Sparrow","Eagle"],a:1},
{q:"Kishtwar famous for?",o:["Saffron","Sapphire","Apples","Rice"],a:1},
{q:"Mehjoor called?",o:["Lion","Nightingale","Keats of Kashmir","Rose"],a:2},
{q:"Bahu Fort in?",o:["Srinagar","Jammu","Rajouri","Kathua"],a:1},
{q:"Nishat Bagh built by?",o:["Akbar","Jahangir","Asif Khan","Shah Jahan"],a:2},
{q:"Chashme Shahi means?",o:["Royal spring","Royal garden","Royal palace","Royal fort"],a:0},
{q:"Hari Parbat Fort in?",o:["Srinagar","Jammu","Anantnag","Baramulla"],a:0},
{q:"Akbar conquered Kashmir?",o:["1526","1556","1586","1600"],a:2},
{q:"Ravi river flows through?",o:["Kashmir","Jammu","Ladakh","Kathua"],a:3},
{q:"Patnitop is in?",o:["Srinagar","Udhampur","Jammu","Anantnag"],a:1},
{q:"Siachen Glacier longest outside?",o:["Arctic","Polar regions","Antarctica","Russia"],a:1},
{q:"K2 height?",o:["8611m","8848m","8586m","8516m"],a:0},
{q:"K2 in which range?",o:["Himalayas","Karakoram","Pir Panjal","Shivalik"],a:1},
{q:"Pir Panjal range separates?",o:["Kashmir-Ladakh","Jammu-Kashmir","India-China","Kashmir-HP"],a:1},
{q:"State flower J&K?",o:["Rose","Lotus","Lily","Tulip"],a:1},
{q:"State tree J&K?",o:["Deodar","Pine","Chinar","Walnut"],a:2},
{q:"Largest district J&K by area?",o:["Jammu","Anantnag","Kishtwar","Doda"],a:2},
{q:"Avantivarman founded?",o:["Srinagar","Avantipura","Jammu","Anantnag"],a:1},
{q:"Rajatarangini has ___ Tarangas.",o:["4","6","8","10"],a:2},
{q:"Dumhal dance performed by?",o:["Gujjar","Wattal","Changpa","Bakerwal"],a:1},
{q:"Bhand Pather is?",o:["Dance","Folk theater","Song","Painting"],a:1},
{q:"Noon Chai is?",o:["Green tea","Pink/salt tea","Black tea","Herbal tea"],a:1},
{q:"Kahwa is made with?",o:["Coffee","Saffron","Chocolate","Ginger"],a:1},
{q:"Gushtaba is?",o:["Sweet","Meat dish","Rice dish","Bread"],a:1},
{q:"Sozni is type of?",o:["Dance","Embroidery","Painting","Music"],a:1},
{q:"Paper Mache originated in?",o:["China→Kashmir","Japan→Kashmir","Persia→Kashmir","India"],a:2},
{q:"National Conference founded by?",o:["Hari Singh","Sheikh Abdullah","Gulab Singh","Nehru"],a:1},
{q:"Ranbir Singh established?",o:["Raghunath Temple","Dal Lake","Shalimar","Shankaracharya"],a:0},
{q:"Which Mughal emperor visited Kashmir most?",o:["Akbar","Jahangir","Shah Jahan","Aurangzeb"],a:1},
{q:"Sikandar Butshikan was known for?",o:["Building temples","Destroying temples","Poetry","Trade"],a:1},
{q:"Rinchana was?",o:["First Muslim ruler","Ladakhi prince who converted","Dogra king","Mughal governor"],a:1},
{q:"Karkota dynasty's greatest ruler?",o:["Durlabhavardhana","Lalitaditya","Avantivarman","Didda"],a:1},
{q:"Didda was?",o:["Male king","Powerful queen","Poet","Saint"],a:1},
{q:"Lolab Valley is in?",o:["Srinagar","Kupwara","Baramulla","Bandipora"],a:1},
{q:"Yusmarg is in?",o:["Srinagar","Budgam","Anantnag","Pulwama"],a:1},
{q:"Hemis monastery is in?",o:["J&K","Ladakh","HP","Sikkim"],a:1},
{q:"Article 35A was about?",o:["Special status","Permanent residents' rights","Emergency","Governor powers"],a:1},
{q:"J&K Reorganisation Act passed on?",o:["5 Aug 2019","31 Oct 2019","9 Aug 2019","6 Aug 2019"],a:0},
{q:"First woman ruler of Kashmir?",o:["Didda","Lal Ded","Habba Khatoon","Sugandha"],a:0},
{q:"Manasbal Lake called?",o:["Jewel of Kashmir","Supreme gem of lakes","Paradise Lake","Golden Lake"],a:1},
{q:"Lidder river flows through?",o:["Srinagar","Pahalgam","Gulmarg","Sonamarg"],a:1},
{q:"Sindh river flows through?",o:["Srinagar","Pahalgam","Gulmarg","Sonamarg"],a:3},
{q:"Mughal road connects?",o:["Srinagar-Jammu","Shopian-Rajouri","Srinagar-Leh","Jammu-Leh"],a:1},
{q:"Kolahoi glacier is near?",o:["Srinagar","Pahalgam","Gulmarg","Sonamarg"],a:1},
{q:"Apple cultivation mainly in?",o:["Jammu","Kashmir","Ladakh","All equally"],a:1},
{q:"Walnut wood carving centre?",o:["Srinagar","Anantnag","Budgam","All Kashmir"],a:0},
{q:"Kangan is in which district?",o:["Srinagar","Ganderbal","Budgam","Pulwama"],a:1},
{q:"Shopian famous for?",o:["Saffron","Apples","Rice","Walnuts"],a:1},
{q:"Rajouri is in ___ division.",o:["Kashmir","Jammu","Ladakh","None"],a:1},
{q:"Poonch is famous for?",o:["Saffron","Rajmash (kidney beans)","Apples","Silk"],a:1},
{q:"Samba district known for?",o:["Industries","Saffron","Tourism","Lakes"],a:0},
{q:"Kathua called?",o:["City of Temples","City of Lakes","Pink City","Golden City"],a:0},
{q:"Udhampur known as?",o:["Army cantonment","Saffron city","Lake city","Temple town"],a:0},
{q:"Doda known for?",o:["Basmati rice","Rajmash","Maize","Lavender"],a:2},
{q:"Ramban is on which highway?",o:["NH-44","NH-1","NH-7","NH-2"],a:0},
{q:"Nagin Lake near?",o:["Jammu","Srinagar","Pahalgam","Gulmarg"],a:1},
{q:"Harwan Garden in?",o:["Jammu","Srinagar","Pahalgam","Anantnag"],a:1},
];

const ENG=[
{q:"___ honest man is respected.",o:["A","An","The","No article"],a:1},
{q:"___ university is nearby.",o:["A","An","The","No article"],a:0},
{q:"He is ___ MLA.",o:["a","an","the","no article"],a:1},
{q:"___ sun rises in east.",o:["A","An","The","No article"],a:2},
{q:"___ European visited us.",o:["A","An","The","No article"],a:0},
{q:"You ___ obey parents. (duty)",o:["can","may","must","will"],a:2},
{q:"___ I come in? (permission)",o:["Can","Will","Shall","May"],a:3},
{q:"You ___ consult doctor. (advice)",o:["shall","should","will","can"],a:1},
{q:"He ___ swim at age 5. (past ability)",o:["can","could","may","shall"],a:1},
{q:"We ___ to help needy. (moral)",o:["could","would","ought","might"],a:2},
{q:"Passive: 'She writes a letter.'",o:["A letter is written by her","A letter was written","A letter written by her","Written is a letter"],a:0},
{q:"Passive: 'They are building house.'",o:["House is built","House is being built by them","House was being built","House has been built"],a:1},
{q:"Passive: 'He had completed work.'",o:["Work was completed","Work has been completed","Work had been completed by him","Work is completed"],a:2},
{q:"Passive: 'Open the door.'",o:["Door is opened","Let the door be opened","Door was opened","Door should open"],a:1},
{q:"Passive: 'They will finish project.'",o:["Project will be finished by them","Project is finished","Project was finished","Project would be finished"],a:0},
{q:"He said, 'I am tired.' →",o:["He said he is tired","He said that he was tired","He told he was tired","He says he was tired"],a:1},
{q:"She said, 'I will come tomorrow.' →",o:["She said she will come","She said she would come the next day","She said she would come tomorrow","She told she will come"],a:1},
{q:"'Where do you live?' he asked. →",o:["He asked where do I live","He asked where I lived","He told where I live","He said where I lived"],a:1},
{q:"Teacher said, 'Don't make noise.' →",o:["Teacher said not to make noise","Teacher ordered not to make noise","Teacher told them not to make noise","Teacher said don't make noise"],a:2},
{q:"'Are you coming?' he asked. →",o:["He asked if I was coming","He asked was I coming","He asked am I coming","He told if I was coming"],a:0},
{q:"Synonym: Abundant",o:["Scarce","Plentiful","Rare","Meagre"],a:1},
{q:"Synonym: Eminent",o:["Unknown","Distinguished","Poor","Ordinary"],a:1},
{q:"Synonym: Prudent",o:["Foolish","Reckless","Wise","Lazy"],a:2},
{q:"Synonym: Candid",o:["Secretive","Frank","Shy","Cunning"],a:1},
{q:"Synonym: Lethal",o:["Safe","Harmless","Deadly","Mild"],a:2},
{q:"Antonym: Hostile",o:["Aggressive","Friendly","Angry","Violent"],a:1},
{q:"Antonym: Commence",o:["Begin","Start","Conclude","Continue"],a:2},
{q:"Antonym: Affluent",o:["Rich","Wealthy","Poor","Prosperous"],a:2},
{q:"Antonym: Ascend",o:["Rise","Climb","Descend","Fly"],a:2},
{q:"Antonym: Victory",o:["Win","Success","Triumph","Defeat"],a:3},
{q:"'Spill the beans' means?",o:["Cook","Reveal secret","Waste","Plant"],a:1},
{q:"'White elephant' means?",o:["Rare","Costly useless","Sacred","Big"],a:1},
{q:"'Cost arm & leg' means?",o:["Cheap","Free","Very expensive","Painful"],a:2},
{q:"'Achilles heel' means?",o:["Strength","Weakness","Speed","Bravery"],a:1},
{q:"'Break the ice' means?",o:["Freeze","Start conversation","Fight","Cool down"],a:1},
{q:"'Apple of discord' means?",o:["Favorite fruit","Cause of quarrel","Sweet","Gift"],a:1},
{q:"'Feather in cap' means?",o:["Hat","Achievement","Fashion","Bird"],a:1},
{q:"'Sit on fence' means?",o:["Rest","Undecided","Guard","Watch"],a:1},
{q:"Good ___ maths.",o:["in","at","on","for"],a:1},
{q:"Here ___ 3 hours.",o:["since","for","from","by"],a:1},
{q:"Here ___ Monday.",o:["since","for","from","by"],a:0},
{q:"Senior ___ me.",o:["than","to","from","of"],a:1},
{q:"Prefer tea ___ coffee.",o:["than","to","over","from"],a:1},
{q:"Among(___)",o:["2 things","3 or more","1 thing","none"],a:1},
{q:"Error: 'Each of boys have pen.'",o:["Each of","the boys","have","a pen"],a:2},
{q:"Error: 'Return back home.'",o:["Return back","home","He","No error"],a:0},
{q:"Bibliophile means?",o:["Book hater","Book lover","Writer","Philosopher"],a:1},
{q:"Somnambulism means?",o:["Insomnia","Sleepwalking","Amnesia","Vertigo"],a:1},
{q:"Misanthropist?",o:["Loves mankind","Hates mankind","Loves women","Hates women"],a:1},
{q:"Polyglot?",o:["One language","Many languages","No language","Two languages"],a:1},
{q:"Posthumous?",o:["Before birth","After death","Before death","After birth"],a:1},
{q:"Atheist?",o:["Believes in God","No god belief","Many gods","Uncertain"],a:1},
{q:"Potable means?",o:["Eatable","Drinkable","Portable","Durable"],a:1},
{q:"Inflammable means?",o:["Won't burn","Catches fire easily","Fireproof","Extinguisher"],a:1},
{q:"Its vs It's: '___ raining.'",o:["Its","It's","Its'","Its's"],a:1},
{q:"Principal vs Principle: 'school ___'",o:["principal","principle","principel","princpal"],a:0},
];

const COMP=[
{q:"Father of Computer?",o:["Vint Cerf","Charles Babbage","Bill Gates","Berners-Lee"],a:1},
{q:"CPU stands for?",o:["Central Processing Unit","Central Programming Unit","Computer Processing Unit","Central Peripheral Unit"],a:0},
{q:"1 KB = ?",o:["1000 B","1024 B","1024 bits","1000 bits"],a:1},
{q:"RAM is?",o:["Non-volatile","Volatile","Permanent","ROM"],a:1},
{q:"BIOS in?",o:["RAM","ROM","Cache","HDD"],a:1},
{q:"1st gen used?",o:["Transistors","Vacuum Tubes","ICs","Microprocessors"],a:1},
{q:"3rd gen used?",o:["Vacuum Tubes","Transistors","ICs","Microprocessors"],a:2},
{q:"Intel 4004 was first?",o:["HDD","Microprocessor","RAM","Monitor"],a:1},
{q:"Ctrl+Z?",o:["Redo","Undo","Zoom","Close"],a:1},
{q:"F12 in Office?",o:["Print","Save As","Help","Find"],a:1},
{q:"F7 in Word?",o:["Save","Spell Check","Print","Find"],a:1},
{q:"Excel extension?",o:[".docx",".pptx",".xlsx",".accdb"],a:2},
{q:"VLOOKUP?",o:["Horizontal","Vertical","Diagonal","Random"],a:1},
{q:"Excel rows?",o:["65536","1048576","256","16384"],a:1},
{q:"WWW by?",o:["Vint Cerf","Tim Berners-Lee","Ray Tomlinson","Gates"],a:1},
{q:"Email by?",o:["Berners-Lee","Vint Cerf","Ray Tomlinson","Gates"],a:2},
{q:"SMTP for?",o:["Browsing","Sending email","Receiving email","Files"],a:1},
{q:"DNS converts?",o:["IP→Domain","Domain→IP","URL→Email","Bin→Text"],a:1},
{q:"IPv4 bits?",o:["16","32","64","128"],a:1},
{q:"Linux is?",o:["Proprietary","Open source","Hardware","Firmware"],a:1},
{q:"Firewall?",o:["Speed","Security","Storage","Power"],a:1},
{q:"Star topology?",o:["Single cable","Central hub","Circle","No hub"],a:1},
{q:"Modem?",o:["AC→DC","Digital↔Analog","Text→Bin","Audio→Vid"],a:1},
{q:"MS Access is?",o:["Word processor","Spreadsheet","DBMS","Presentation"],a:2},
{q:"Primary Key?",o:["Duplicates OK","Unique ID","Null OK","Foreign"],a:1},
{q:"Scanner is?",o:["Output","Input","Storage","Processing"],a:1},
{q:"Compiler?",o:["Line by line","Whole program","Char by char","Word by word"],a:1},
{q:"Binary base?",o:["2","8","10","16"],a:0},
{q:"ASCII bits?",o:["5","6","7","8"],a:2},
{q:"HTML?",o:["HyperText Markup Language","High Tech ML","Hyper Transfer ML","Home Tool ML"],a:0},
{q:"Cache memory is?",o:["Slowest","Fastest","Medium","Same as RAM"],a:1},
{q:"SSD stands for?",o:["Solid State Drive","Super Speed Disk","System Storage","Solid Speed"],a:0},
{q:"USB?",o:["Universal System Bus","Universal Serial Bus","Unified Serial","Universal Storage"],a:1},
{q:"GUI?",o:["General User Interface","Graphical User Interface","Graphical Unified","General Unified"],a:1},
{q:"Cold boot?",o:["Restart","Start from OFF","Sleep","Hibernate"],a:1},
{q:"Kernel is?",o:["Shell","Core of OS","Virus","Memory type"],a:1},
{q:"POST?",o:["Power On System Test","Power On Self Test","Primary OS Test","Power Output"],a:1},
{q:"Phishing?",o:["Fishing","Fake sites steal data","Network tool","Language"],a:1},
{q:"OCR?",o:["Optical Character Recognition","Online Code Reader","Optical Code","Output Code"],a:0},
{q:"OMR used for?",o:["Bank cheques","Answer sheets","Images","Barcodes"],a:1},
{q:"MICR used in?",o:["Schools","Banks","Hospitals","Airports"],a:1},
{q:"Ctrl+H?",o:["Help","Hide","Find & Replace","Home"],a:2},
{q:"Mail Merge in?",o:["Excel","Word","PPT","Access"],a:1},
{q:"F5 in PowerPoint?",o:["Save","Print","Slide Show","Help"],a:2},
{q:"Access extension?",o:[".xlsx",".docx",".accdb",".pptx"],a:2},
{q:"Query in Access?",o:["Store data","Retrieve data","Entry","Print"],a:1},
{q:"Form in Access?",o:["Printing","Data entry","Queries","Charts"],a:1},
{q:"BCC means?",o:["Best CC","Blind Carbon Copy","Basic CC","Bulk CC"],a:1},
{q:"HTTPS?",o:["Hyper Transfer","Secure HTTP","High Tech","Home Transfer"],a:1},
{q:"Wi-Fi standard?",o:["802.3","802.11","802.5","802.15"],a:1},
{q:"Largest network?",o:["LAN","MAN","WAN","PAN"],a:2},
{q:"IPv6 bits?",o:["32","64","128","256"],a:2},
{q:"Ransomware?",o:["Speeds PC","Locks data for money","Deletes files","Fixes bugs"],a:1},
{q:"Motherboard?",o:["CPU","Main circuit board","RAM","HDD"],a:1},
{q:"Virtual memory uses?",o:["RAM","ROM","HDD as RAM","Cache"],a:2},
{q:"Laser printer?",o:["Impact","Non-impact","Thermal","Manual"],a:1},
{q:"NTFS is?",o:["File system","Protocol","Language","Hardware"],a:0},
{q:"PowerPoint extension?",o:[".docx",".xlsx",".pptx",".accdb"],a:2},
{q:"Pivot Table in?",o:["Word","Excel","PPT","Access"],a:1},
{q:"Conditional Formatting?",o:["Word","Excel","PPT","Access"],a:1},
{q:"=COUNT() does?",o:["Adds","Counts numbers","Max","Average"],a:1},
{q:"=NOW() gives?",o:["Date","Time","Date & Time","Cell address"],a:2},
{q:"Track Changes in?",o:["Excel","PPT","Word","Access"],a:2},
{q:"Ctrl+A?",o:["Save","Select All","Align","Add"],a:1},
{q:"Ctrl+P?",o:["Paste","Print","Page","Preview"],a:1},
{q:"Word extension?",o:[".xlsx",".pptx",".docx",".txt"],a:2},
{q:"1 Byte?",o:["4 bits","8 bits","16 bits","32 bits"],a:1},
{q:"1 TB = ?",o:["1024 MB","1024 GB","1024 KB","1000 GB"],a:1},
];

const MATH=[
{q:"36% of 50?",o:["18","15","20","16"],a:0},
{q:"25% of 480?",o:["100","110","120","125"],a:2},
{q:"12.5% of 640?",o:["80","64","100","72"],a:0},
{q:"40% of X=200, X?",o:["400","500","600","800"],a:1},
{q:"30% of X=150, X?",o:["450","500","600","550"],a:1},
{q:"Price up 20%, consumption down?",o:["20%","25%","16.67%","15%"],a:2},
{q:"Successive 10% then 20%?",o:["28%","30%","27%","25%"],a:0},
{q:"Successive 20% then 10%?",o:["28%","30%","27%","25%"],a:0},
{q:"CP=400, SP=500, Profit%?",o:["20%","25%","10%","15%"],a:1},
{q:"CP=600, SP=480, Loss%?",o:["15%","25%","20%","10%"],a:2},
{q:"MP=500, Disc=20%, SP?",o:["400","380","450","420"],a:0},
{q:"MP=800, Disc=15%, SP?",o:["680","700","720","650"],a:0},
{q:"SP of 10 items=CP of 12. P%?",o:["10%","15%","20%","25%"],a:2},
{q:"Average first 10 natural?",o:["5","5.5","6","10"],a:1},
{q:"Average first 10 even?",o:["10","11","12","9"],a:1},
{q:"Average 15,25,35,45,55?",o:["30","35","40","45"],a:1},
{q:"SI ₹5000@8%@3yr?",o:["1200","1000","800","1500"],a:0},
{q:"SI ₹2000@10%@2yr?",o:["200","300","400","500"],a:2},
{q:"SI doubles in 10yr. Rate?",o:["5%","10%","15%","20%"],a:1},
{q:"SI doubles in 8yr. Rate?",o:["10%","12.5%","8%","15%"],a:1},
{q:"CI-SI ₹5000@10%@2yr?",o:["50","100","40","25"],a:0},
{q:"A:B=2:3, B:C=4:5, A:C?",o:["8:15","6:15","2:5","4:5"],a:0},
{q:"Divide ₹630 in 4:5. Larger?",o:["280","350","300","320"],a:1},
{q:"A:B=3:5, total=240. A's share?",o:["80","90","100","120"],a:1},
{q:"72 km/h = ? m/s",o:["15","20","25","10"],a:1},
{q:"15 m/s = ? km/h",o:["45","54","60","48"],a:1},
{q:"Train 200m, pole, 10s. Speed?",o:["72","36","54","90"],a:0},
{q:"Train 300m, bridge 200m, 25s. Speed?",o:["72","54","36","90"],a:0},
{q:"Avg speed 60@30 and 60@60?",o:["45","40","50","35"],a:1},
{q:"Boat 12, stream 3, upstream?",o:["9","12","15","6"],a:0},
{q:"A work 10 days, B 15. Together?",o:["5","6","8","12"],a:1},
{q:"A work 12 days, B 18. Together?",o:["6","7.2","8","9"],a:1},
{q:"A fills 6hr, B empties 8hr. Both?",o:["12","24","18","20"],a:1},
{q:"8 workers 15 days. 10 workers?",o:["10","12","14","16"],a:1},
{q:"Pipe A 5hr, B 10hr. Together?",o:["3.33","4","5","7.5"],a:0},
{q:"LCM 12,18?",o:["24","36","48","72"],a:1},
{q:"HCF 36,48?",o:["6","8","12","24"],a:2},
{q:"17²?",o:["279","289","299","269"],a:1},
{q:"√144?",o:["11","12","13","14"],a:1},
{q:"5³?",o:["100","125","150","175"],a:1},
{q:"BODMAS: 12+8×3-4÷2?",o:["28","34","36","38"],a:2},
{q:"BODMAS: 8+4×3-6÷2?",o:["17","20","30","15"],a:0},
{q:"50% of 50% of 200?",o:["25","50","75","100"],a:1},
{q:"Area square side 9?",o:["81","72","36","18"],a:0},
{q:"Perimeter rect 12×8?",o:["40","96","20","48"],a:0},
{q:"Area circle r=7?",o:["44","154","308","88"],a:1},
{q:"20% of 150 + 30% of 200?",o:["80","90","100","110"],a:1},
// Reasoning
{q:"Series: 2,6,18,54,?",o:["108","162","148","156"],a:1},
{q:"Series: 1,4,9,16,25,?",o:["30","36","35","49"],a:1},
{q:"Series: 2,3,5,7,11,13,?",o:["15","17","19","14"],a:1},
{q:"Series: 1,1,2,3,5,8,?",o:["11","12","13","14"],a:2},
{q:"Series: 3,9,27,81,?",o:["162","243","324","729"],a:1},
{q:"Series: 5,11,23,47,?",o:["96","95","94","93"],a:1},
{q:"Series: 100,96,91,85,78,?",o:["69","70","71","72"],a:1},
{q:"Series: 7,14,28,56,?",o:["84","96","112","104"],a:2},
{q:"Series: 4,9,25,49,121,?",o:["144","169","196","225"],a:1},
{q:"B,D,F,H,?",o:["I","J","K","L"],a:1},
{q:"Z,X,V,T,?",o:["S","R","Q","P"],a:1},
{q:"B,E,H,K,?",o:["L","M","N","O"],a:2},
{q:"CLOUD=DMPVE, RAIN=?",o:["SBJO","SBJM","RBJO","QBJO"],a:0},
{q:"Each letter -1: DPNF=?",o:["COME","DOME","CONE","DIME"],a:0},
{q:"Each letter +2: CAT=?",o:["DBU","ECV","ECW","FDX"],a:1},
{q:"15th left, 10th right. Total?",o:["24","25","26","23"],a:0},
{q:"7th top, 28th bottom. Total?",o:["34","35","36","33"],a:0},
{q:"20th top, 15th bottom. Total?",o:["33","34","35","36"],a:1},
{q:"5km N, right 3km, right 5km. Distance?",o:["3","5","8","13"],a:0},
{q:"Face N, turn right twice. Facing?",o:["N","S","E","W"],a:1},
{q:"Face E, turn left, left. Facing?",o:["N","S","E","W"],a:3},
{q:"'He is my mother's only son's son.' Relation?",o:["Son","Brother","Nephew","Father"],a:0},
{q:"Doctor:Hospital :: Teacher:?",o:["School","Student","Book","Edu"],a:0},
{q:"Odd: Apple,Mango,Potato,Banana",o:["Apple","Mango","Potato","Banana"],a:2},
{q:"Mon+5 days=?",o:["Fri","Sat","Sun","Thu"],a:1},
{q:"Divisible by 3: 87?",o:["Yes(8+7=15)","No","Only by 9","Can't tell"],a:0},
{q:"Divisibility by 4: check?",o:["Last digit","Last 2 digits","Last 3","Sum"],a:1},
];

const SCHED = [
  {d:1,dt:"Mar 24",t:"Battlefield Scan",tk:["Solve 1 previous paper","Identify strong/weak areas","Read Computer notes"],hr:"7-9:30PM"},
  {d:2,dt:"Mar 25",t:"Computers I",tk:["Generations, Basics, Memory, I/O","MS Word, Excel, PPT, Access","Practice 50 Computer MCQs"],hr:"7-9:30PM"},
  {d:3,dt:"Mar 26",t:"Computers II + Reasoning",tk:["OS, Email, Internet, Abbrev","Series, Coding-Decoding","Practice 40 MCQs"],hr:"7-9:30PM"},
  {d:4,dt:"Mar 27",t:"Reasoning + Syllogisms",tk:["Blood Relations, Direction","Statement-Conclusion (30+ Qs)","Practice ALL syllogism MCQs"],hr:"7-9:30PM"},
  {d:5,dt:"Mar 28",t:"Maths",tk:["%, Average, Ratio, P&L","Time & Work, Speed/Distance","Practice 50 Maths MCQs"],hr:"7-9:30PM"},
  {d:6,dt:"Mar 29 (Sat)",t:"J&K GK Deep Dive",tk:["History, Geography, Rivers, Lakes","Culture, Tourism, Economy","Practice 60 J&K MCQs"],hr:"7-10PM+"},
  {d:7,dt:"Mar 30 (Sun)",t:"India GK + Polity",tk:["Constitution, Polity, History","Census, Transport, Science","Practice 50 GK MCQs"],hr:"10AM-1PM + 7-9:30PM"},
  {d:8,dt:"Mar 31",t:"English I",tk:["Articles, Modals, Voice, Narration","Prepositions, Homophones","Practice 40 English MCQs"],hr:"7-9:30PM"},
  {d:9,dt:"Apr 1",t:"English II",tk:["Synonyms, Antonyms, Idioms","Comprehension, Editing","Practice 40 English MCQs"],hr:"7-9:30PM"},
  {d:10,dt:"Apr 2",t:"Previous Year Focus",tk:["Solve all PYQ banks","Focus on repeated topics","Mark wrong answers"],hr:"7-9:30PM"},
  {d:11,dt:"Apr 3",t:"Weak Areas + Syllogisms",tk:["Revise weakest unit","Re-do ALL syllogism Qs","Re-attempt wrong MCQs"],hr:"7-9:30PM"},
  {d:12,dt:"Apr 4",t:"Mock Test + Revision",tk:["80-Q timed mock (80 min)","Review wrong answers","Quick revision: J&K + Abbrev"],hr:"7-10PM"},
  {d:13,dt:"Apr 5",t:"EXAM DAY 🎯",tk:["30-min quick revision","Admit card + ID + pen","Stay calm → Attempt ALL 80 Qs"],hr:"Morning"},
];

// All banks combined with labels
const BANKS = {
  syl: { title: "🔥 Syllogisms & Statements", mcqs: SYL, desc: `${SYL.length} Qs — MOST ASKED in JKSSB` },
  jk: { title: "🏔️ J&K GK", mcqs: JKGK, desc: `${JKGK.length} Qs — History, Geography, Culture` },
  eng: { title: "📝 English", mcqs: ENG, desc: `${ENG.length} Qs — Grammar, Vocab, Idioms` },
  comp: { title: "💻 Computers", mcqs: COMP, desc: `${COMP.length} Qs — Hardware, Office, Internet` },
  math: { title: "🧮 Maths & Reasoning", mcqs: MATH, desc: `${MATH.length} Qs — Aptitude, Series, Logic` },
};

const bKeys = Object.keys(BANKS);
const totalQ = bKeys.reduce((a, k) => a + BANKS[k].mcqs.length, 0);

// Mock test: pick 80 random from all banks proportionally
function genMock() {
  const picks = { syl: 15, jk: 20, eng: 15, comp: 15, math: 15 };
  let all = [];
  bKeys.forEach(k => {
    const arr = [...BANKS[k].mcqs];
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    all.push(...arr.slice(0, picks[k]).map(q => ({ ...q, bank: k })));
  });
  for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
  return all;
}

export default function App() {
  const [tab, setTab] = useState("study");
  const [bank, setBank] = useState("syl");
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [sh, setSh] = useState(false);
  const [sc, setSc] = useState(0);
  const [tot, setTot] = useState(0);
  const [dn, setDn] = useState(false);
  const [wrong, setWrong] = useState([]);
  const [wrongMode, setWrongMode] = useState(false);
  const [days, setDays] = useState({});
  // Mock
  const [mockQs, setMockQs] = useState([]);
  const [mockActive, setMockActive] = useState(false);
  const [mockTime, setMockTime] = useState(4800);
  const [mockI, setMockI] = useState(0);
  const [mockSel, setMockSel] = useState(null);
  const [mockSh, setMockSh] = useState(false);
  const [mockSc, setMockSc] = useState(0);
  const [mockDn, setMockDn] = useState(false);
  const [mockAnswers, setMockAnswers] = useState([]);
  const timerRef = useRef(null);

  const mq = wrongMode ? wrong : (BANKS[bank] ? BANKS[bank].mcqs : []);
  const rst = () => { setQi(0); setSel(null); setSh(false); setSc(0); setTot(0); setDn(false); };

  const pk = (i) => {
    if (sh) return;
    setSel(i); setSh(true);
    const correct = i === mq[qi].a;
    if (correct) setSc(s => s + 1);
    else {
      const already = wrong.find(w => w.q === mq[qi].q);
      if (!already) setWrong(w => [...w, mq[qi]]);
    }
    setTot(t => t + 1);
  };
  const nx = () => { if (qi + 1 >= mq.length) setDn(true); else { setQi(qi + 1); setSel(null); setSh(false); } };

  // Mock timer
  useEffect(() => {
    if (mockActive && !mockDn && mockTime > 0) {
      timerRef.current = setTimeout(() => setMockTime(t => t - 1), 1000);
      return () => clearTimeout(timerRef.current);
    }
    if (mockTime <= 0 && mockActive) setMockDn(true);
  }, [mockActive, mockDn, mockTime]);

  const startMock = () => {
    const qs = genMock();
    setMockQs(qs); setMockActive(true); setMockTime(4800); setMockI(0); setMockSel(null); setMockSh(false); setMockSc(0); setMockDn(false);
    setMockAnswers(new Array(qs.length).fill(null));
  };

  const mockPick = (i) => {
    if (mockSh) return;
    setMockSel(i); setMockSh(true);
    const c = i === mockQs[mockI].a;
    if (c) setMockSc(s => s + 1);
    else {
      const already = wrong.find(w => w.q === mockQs[mockI].q);
      if (!already) setWrong(w => [...w, mockQs[mockI]]);
    }
    setMockAnswers(a => { const n = [...a]; n[mockI] = i; return n; });
  };
  const mockNx = () => {
    if (mockI + 1 >= mockQs.length) setMockDn(true);
    else { setMockI(mockI + 1); setMockSel(null); setMockSh(false); }
  };

  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const tS = (t) => ({ padding:"8px 11px",cursor:"pointer",fontWeight:tab===t?700:400,fontSize:"12px",borderBottom:tab===t?"3px solid #4f46e5":"3px solid transparent",color:tab===t?"#4f46e5":"#666",background:"none",border:"none",whiteSpace:"nowrap" });

  const renderQuiz = (questions, idx, selected, shown, score, total, done, onPick, onNext, label) => {
    if (questions.length === 0) return <div style={{padding:20,textAlign:"center",color:"#888",fontSize:13}}>No questions here yet. Keep practicing!</div>;
    if (done || idx >= questions.length) return <div style={{textAlign:"center",padding:"24px",background:"#fafafa",borderRadius:10}}>
      <div style={{fontSize:36}}>{score>=questions.length*0.7?"🎉":score>=questions.length*0.5?"👍":"💪"}</div>
      <div style={{fontSize:18,fontWeight:700,marginTop:4}}>{score} / {questions.length}</div>
      <div style={{fontSize:11,color:"#666",marginTop:4}}>{score>=questions.length*0.7?"Excellent!":"Review & retry."}</div>
    </div>;
    const q = questions[idx];
    if (!q || !q.o) return null;
    return <div style={{padding:14,background:"#fafafa",borderRadius:10,border:"1px solid #e8e8e8"}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#888",marginBottom:6}}>
        <span>{label} Q {idx+1}/{questions.length}</span><span>✅ {score}/{total}</span>
      </div>
      <div style={{width:"100%",height:3,background:"#e5e5e5",borderRadius:2,marginBottom:10}}>
        <div style={{width:`${((idx+1)/questions.length)*100}%`,height:3,background:"#4f46e5",borderRadius:2,transition:"width .3s"}}/>
      </div>
      <div style={{fontSize:13,fontWeight:600,marginBottom:10,whiteSpace:"pre-line"}}>{q.q}</div>
      {q.o.map((o,i)=>{
        const isA=i===q.a,isS=i===selected;
        let bg="#fff",bd="1px solid #ddd";
        if(shown){if(isA){bg="#dcfce7";bd="2px solid #22c55e";}else if(isS){bg="#fee2e2";bd="2px solid #ef4444";}}
        return <div key={i} onClick={()=>onPick(i)} style={{padding:"8px 11px",marginBottom:4,borderRadius:7,cursor:shown?"default":"pointer",background:bg,border:bd,fontSize:12,transition:"all .15s"}}>
          <b style={{marginRight:5}}>{String.fromCharCode(65+i)}.</b>{o}
        </div>
      })}
      {shown && <button onClick={onNext} style={{marginTop:8,padding:"7px 16px",background:"#4f46e5",color:"#fff",border:"none",borderRadius:7,fontWeight:600,cursor:"pointer",fontSize:11}}>
        {idx+1>=questions.length?"Results →":"Next →"}
      </button>}
    </div>;
  };

  return (
    <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",maxWidth:820,margin:"0 auto",color:"#1a1a1a"}}>
      <div style={{background:"linear-gradient(135deg,#4f46e5,#7c3aed)",padding:"14px 18px",borderRadius:"12px",color:"#fff",marginBottom:"10px"}}>
        <div style={{fontSize:"16px",fontWeight:800}}>JKSSB Junior Assistant — Ultimate Prep</div>
        <div style={{display:"flex",gap:"8px",marginTop:"8px",fontSize:"11px",flexWrap:"wrap"}}>
          <div style={{background:"rgba(255,255,255,0.2)",padding:"4px 10px",borderRadius:6}}><b>{dl()}</b> days</div>
          <div style={{background:"rgba(255,255,255,0.2)",padding:"4px 10px",borderRadius:6}}><b>{totalQ}</b> MCQs</div>
          <div style={{background:"rgba(255,255,255,0.2)",padding:"4px 10px",borderRadius:6}}>❌ <b>{wrong.length}</b> wrong</div>
          <div style={{background:"rgba(255,255,255,0.15)",padding:"4px 10px",borderRadius:6}}>5 Apr 2026</div>
        </div>
      </div>

      <div style={{display:"flex",gap:1,borderBottom:"1px solid #e5e5e5",marginBottom:10,overflowX:"auto"}}>
        {[["plan","📅 Plan"],["study","📖 Practice"],["mock","🎯 Mock Test"],["wrong","❌ Wrong Qs"],["tips","💡 Tips"]].map(([t,l])=>
          <button key={t} onClick={()=>{setTab(t);if(t==="study"){rst();setWrongMode(false);}if(t==="wrong"){rst();setWrongMode(true);}}} style={tS(t)}>{l}{t==="wrong"&&wrong.length>0?` (${wrong.length})`:""}</button>
        )}
      </div>

      {/* PLAN */}
      {tab==="plan" && <div>
        {SCHED.map(s=>{const d=days[s.d],ex=s.d===13;return <div key={s.d} onClick={()=>setDays(p=>({...p,[s.d]:!p[s.d]}))} style={{padding:"9px 11px",marginBottom:4,borderRadius:8,cursor:"pointer",border:ex?"2px solid #ef4444":d?"2px solid #22c55e":"1px solid #e5e5e5",background:ex?"#fef2f2":d?"#f0fdf4":"#fff",opacity:d&&!ex?0.7:1}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:700,fontSize:12}}>{d&&!ex?"✅ ":ex?"🎯 ":"⬜ "}Day {s.d}: {s.t}</span><span style={{fontSize:10,color:"#888"}}>{s.hr}</span></div>
          <div style={{fontSize:10.5,color:"#555",marginTop:2}}>{s.tk.map((t,i)=><span key={i}>{i>0?" • ":""}{t}</span>)}</div>
        </div>})}
      </div>}

      {/* STUDY */}
      {tab==="study" && <div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:10}}>
          {bKeys.map(k=><button key={k} onClick={()=>{setBank(k);rst();setWrongMode(false);}} style={{padding:"10px",borderRadius:8,border:bank===k?"2px solid #4f46e5":"1px solid #e5e5e5",background:bank===k?"#eef2ff":"#fff",cursor:"pointer",textAlign:"left"}}>
            <div style={{fontSize:13,fontWeight:bank===k?700:500}}>{BANKS[k].title}</div>
            <div style={{fontSize:10,color:"#888"}}>{BANKS[k].desc}</div>
          </button>)}
        </div>
        {renderQuiz(mq,qi,sel,sh,sc,tot,dn,pk,nx,"")}
        {dn && <button onClick={rst} style={{marginTop:8,padding:"7px 16px",background:"#4f46e5",color:"#fff",border:"none",borderRadius:7,fontWeight:600,cursor:"pointer",fontSize:11}}>🔄 Retry</button>}
      </div>}

      {/* MOCK TEST */}
      {tab==="mock" && <div>
        {!mockActive && !mockDn && <div style={{textAlign:"center",padding:30}}>
          <div style={{fontSize:36,marginBottom:8}}>🎯</div>
          <div style={{fontSize:16,fontWeight:700}}>Timed Mock Test</div>
          <div style={{fontSize:12,color:"#666",margin:"8px 0 16px"}}>80 Questions • 80 Minutes • All subjects mixed<br/>Simulates real JKSSB exam</div>
          <button onClick={startMock} style={{padding:"12px 32px",background:"#4f46e5",color:"#fff",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:14}}>Start Mock Test</button>
        </div>}
        {mockActive && !mockDn && <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,padding:"8px 12px",background:mockTime<300?"#fef2f2":"#f0f9ff",borderRadius:8,border:mockTime<300?"1px solid #fca5a5":"1px solid #bfdbfe"}}>
            <span style={{fontSize:12,fontWeight:600}}>⏱️ {fmt(mockTime)}</span>
            <span style={{fontSize:11,color:"#666"}}>Q {mockI+1}/80 • Score: {mockSc}</span>
          </div>
          {renderQuiz(mockQs,mockI,mockSel,mockSh,mockSc,mockI+(mockSh?1:0),false,mockPick,mockNx,"MOCK")}
        </div>}
        {mockDn && <div style={{textAlign:"center",padding:24,background:"#fafafa",borderRadius:10}}>
          <div style={{fontSize:36}}>{mockSc>=56?"🎉":mockSc>=40?"👍":"💪"}</div>
          <div style={{fontSize:22,fontWeight:700,marginTop:4}}>{mockSc} / 80</div>
          <div style={{fontSize:12,color:"#666",marginTop:4}}>
            {mockSc>=56?"🔥 Excellent! You're exam ready!":mockSc>=40?"Good! Focus on weak areas.":"Keep practicing! Review wrong answers."}
          </div>
          <div style={{fontSize:11,color:"#888",marginTop:8}}>Time used: {fmt(4800-mockTime)} of 80:00</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12}}>
            <button onClick={()=>{setMockActive(false);setMockDn(false);}} style={{padding:"7px 16px",background:"#f1f1f1",border:"none",borderRadius:7,cursor:"pointer",fontSize:11}}>Back</button>
            <button onClick={startMock} style={{padding:"7px 16px",background:"#4f46e5",color:"#fff",border:"none",borderRadius:7,fontWeight:600,cursor:"pointer",fontSize:11}}>New Mock</button>
          </div>
        </div>}
      </div>}

      {/* WRONG ANSWERS */}
      {tab==="wrong" && <div>
        {wrong.length===0 && <div style={{textAlign:"center",padding:30,color:"#888"}}>
          <div style={{fontSize:36}}>✨</div>
          <div style={{fontSize:14,fontWeight:600,marginTop:8}}>No wrong answers yet!</div>
          <div style={{fontSize:12,marginTop:4}}>Start practicing and wrong answers will appear here for revision.</div>
        </div>}
        {wrong.length>0 && <div>
          <div style={{padding:"8px 12px",background:"#fef2f2",borderRadius:8,marginBottom:10,fontSize:11,color:"#991b1b",border:"1px solid #fca5a5"}}>
            ❌ {wrong.length} wrong answers collected. Practice these until you get ALL right!
            <button onClick={()=>setWrong([])} style={{marginLeft:10,padding:"3px 8px",background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:4,cursor:"pointer",fontSize:10}}>Clear All</button>
          </div>
          {renderQuiz(wrong,qi,sel,sh,sc,tot,dn,pk,nx,"WRONG")}
          {dn && <button onClick={rst} style={{marginTop:8,padding:"7px 16px",background:"#ef4444",color:"#fff",border:"none",borderRadius:7,fontWeight:600,cursor:"pointer",fontSize:11}}>🔄 Retry Wrong Answers</button>}
        </div>}
      </div>}

      {/* TIPS */}
      {tab==="tips" && <div>
        {[
          {t:"🔥 SYLLOGISM STRATEGY",tips:["JKSSB asks 5-8 syllogism/statement Qs EVERY paper","ALWAYS draw Venn diagrams","All+All=All | All+No=No | Some+Some=No conclusion","'Either I or II' = both can't be true but one must be","Practice until 90%+ in syllogism bank"]},
          {t:"📋 PAPER PATTERN",tips:["80 Qs, 80 min, ALL MCQ, 4 Units × 20 marks","English + J&K GK + Maths/Reasoning + Computers","Questions repeat from previous papers!","No negative marking → ATTEMPT EVERYTHING"]},
          {t:"⚡ MCQ HACKS",tips:["Eliminate 2 wrong → 50% chance","'Always/Never/All' = usually wrong option","Two similar options → answer is one of them","English & Computer = fastest, do first"]},
          {t:"🧠 YOUR ADVANTAGE",tips:["Computers = 80% known (free 16+ marks)","Reasoning = Pattern matching (daily coding skill)","Focus: J&K GK (weakest) + Syllogisms (most asked)","Use Wrong Answer tab to eliminate weaknesses"]},
        ].map((s,i)=><div key={i} style={{marginBottom:8,padding:10,borderRadius:8,background:"#fafafa",border:"1px solid #e8e8e8"}}>
          <div style={{fontWeight:700,fontSize:12,marginBottom:4}}>{s.t}</div>
          {s.tips.map((t,j)=><div key={j} style={{fontSize:11,lineHeight:1.5}}>• {t}</div>)}
        </div>)}
      </div>}

      <div style={{textAlign:"center",padding:10,fontSize:10,color:"#aaa"}}>{totalQ} MCQs • Syllogism Heavy • Mock Test • Wrong Tracker</div>
    </div>
  );
}