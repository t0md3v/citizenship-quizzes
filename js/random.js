/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [
 {
    question: "When must a federal election be held according to legislation passed by Parliament?",
    choices: [
      "When the King wants to replace the Prime Minister",
      "Within four years of the most recent election",
      "Within five years of the last election",
      "The Prime Minister can call the election at any time"
    ],
    correct: 1
  },
  {
    question: "Which of the following is the federal government responsible for?",
    choices: [
      "Highways",
      "Natural resources",
      "Education",
      "Interprovincial trade and communications"
    ],
    correct: 3
  },
  {
    question: "What was the name of the new country formed at Confederation?",
    choices: [
      "Britain",
      "Canada",
      "Canadian Confederation",
      "Dominion of Canada"
    ],
    correct: 3
  },
  {
    question: "Where do more than half of the people in Canada live?",
    choices: [
      "Coastal Pacific",
      "Atlantic Canada",
      "The Prairies",
      "Central Canada"
    ],
    correct: 3
  },
  {
    question: "Who brought Quebec into Confederation?",
    choices: [
      "Sir Louis-Hippolyte La Fontaine",
      "Sir George-Étienne Cartier",
      "Sir Wilfrid Laurier",
      "Sir John A. Macdonald"
    ],
    correct: 1
  },
  {
    question: "How did Canada contribute more to the Allied air effort than any other Commonwealth country during World War II?",
    choices: [
      "By training 130,000 Allied air crew",
      "By deploying paratroopers in France",
      "By providing ammunition",
      "By sending 130,000 soldiers to France"
    ],
    correct: 0
  },
  {
    question: "How can a party in power be defeated in Parliament?",
    choices: [
      "If there is a revolution",
      "If the King orders the party to resign",
      "If a majority of MPs vote against a major government decision",
      "If a minority of MPs vote against a major government decision"
    ],
    correct: 2
  },
  {
    question: "Which of the following are responsibilities of provincial governments?",
    choices: [
      "Education, healthcare, natural resources, and policing",
      "National defence, healthcare, citizenship, and firefighting",
      "Education, foreign policy, natural resources, and policing",
      "National defence, foreign policy, highways, and Indigenous affairs"
    ],
    correct: 0
  },
  {
    question: "What was the Underground Railroad?",
    choices: [
      "An anti-slavery network that helped enslaved people escape to Canada",
      "A railway through the Rocky Mountains",
      "A fur trade transportation route",
      "The first underground subway in Toronto"
    ],
    correct: 0
  },
  {
    question: "Which region covers more than one-third of Canada?",
    choices: [
      "Northern Territories",
      "South Region",
      "North Region",
      "Southern Territories"
    ],
    correct: 0
  },
  {
    question: "What is the name of the royal anthem of Canada?",
    choices: [
      "Great Canada",
      "O Canada",
      "God Save the King",
      "The Maple Anthem"
    ],
    correct: 2
  },
  {
    question: "What is the primary role of the police in Canada?",
    choices: [
      "To resolve disputes and interpret laws",
      "To keep people safe and enforce the law",
      "To provide national security intelligence",
      "To conduct military operations"
    ],
    correct: 1
  },
  {
    question: "Which province has the most bilingual Canadians?",
    choices: [
      "British Columbia",
      "Quebec",
      "Ontario",
      "New Brunswick"
    ],
    correct: 1
  },
  {
    question: "Which province is one of the most productive agricultural regions in the world?",
    choices: [
      "Manitoba",
      "Saskatchewan",
      "British Columbia",
      "Alberta"
    ],
    correct: 1
  },
  {
    question: "When is Canada Day?",
    choices: [
      "November 11",
      "July 1",
      "October 1",
      "July 4"
    ],
    correct: 1
  },
  {
    question: "In what year did Canada become a country?",
    choices: [
      "1867",
      "1687",
      "1786",
      "1678"
    ],
    correct: 0
  },
  {
    question: "What are the two official languages of Canada?",
    choices: [
      "Inuktitut and English",
      "French and Inuktitut",
      "English and French",
      "Mandarin and English"
    ],
    correct: 2
  },
  {
    question: "Where is Canada located?",
    choices: [
      "Central America",
      "Europe",
      "North America",
      "South America"
    ],
    correct: 2
  },
  {
    question: "Which of the following lists the five Great Lakes?",
    choices: [
      "Lake Toronto, Lake Michigan, Lake Mexico, Lake Ontario, Lake St. Louis",
      "Lake Superior, Lake Michigan, Lake Huron, Lake Erie, Lake Ontario",
      "Lake Michigan, Lake Victoria, Lake Mexico, Lake Ontario, Lake St. Louis",
      "None of these"
    ],
    correct: 1
  },
  {
    question: "What do you call the King's representative in the provinces?",
    choices: [
      "Governor",
      "King's Governor",
      "Lieutenant Governor",
      "Governor General"
    ],
    correct: 2
  },
  
{ question: "How are members of parliament chosen?", choices: ["Elected by senators", "Elected by the prime minister", "Chosen by the king", "Elected by Canadian citizens"], correct: 3 },
{ question: "In what jobs did the Metis first work with European settlers?", choices: ["Supplies, traders, guides, and interpreters", "Taking care of children", "Building housing", "Fishing"], correct: 0 },
{ question: "What does the National Register of Electors contain?", choices: ["Database of landed immigrants", "Database of Canadian citizens at least 18 years of age who are qualified to vote in federal elections and referendums", "Database of all Canadian citizens", "Database of Canadian taxpayers"], correct: 1 },
{ question: "What was the main advantage of the NAFTA agreement?", choices: ["Free trade among Canada, the USA, and Mexico", "Free trade between Canada and China", "Free trade between Canada and the UK", "Free trade between Canada and Japan"], correct: 0 },
{ question: "Who are the Metis?", choices: ["The distinct Aboriginal people of Atlantic Canada", "A people of mixed Inuit or First Nations ancestry, most of whom live on the prairies", "First Nations people speaking the mischief dialect", "A distinct people of mixed Aboriginal and European ancestry"], correct: 3 },
{ question: "Which act granted for the first time in Canada legislative assemblies elected by the people?", choices: ["The Constitutional Act of 1982", "The Constitutional Act of 1891", "The Constitutional Act of 1791", "The Constitutional Act of 1972"], correct: 2 },
{ question: "Who appoints the judges of the Supreme Court of Canada?", choices: ["The Governor General", "The Prime Minister", "Other judges", "The people"], correct: 0 },
{ question: "What does the crown mean for Canadians?", choices: ["The crown is a symbol of government including parliament, legislatures, courts, police services, and the armed forces", "The crown contains symbols of England, France, Scotland, and Ireland, as well as red maple leaves", "A national motto, Amario Admare, which in Latin means from sea to sea", "The crown reflects the Greco-Roman heritage of Western civilization in which democracy originated"], correct: 0 },
{ question: "What did the suffrage movement achieve?", choices: ["Quebec experienced an era of rapid change", "The suffrage movement abolished slavery in Canada", "The suffrage movement led to the introduction of employment insurance", "Women achieved the right to vote"], correct: 3 },
{ question: "When did settlers from France first establish communities on the St. Lawrence River?", choices: ["Late 1600s", "Early 1700s", "Late 1700s", "Early 1600s"], correct: 3 },
{ question: "Which region is known as the industrial and manufacturing heartland of Canada?", choices: ["Atlantic provinces", "Prairie provinces", "Central Canada", "West Coast"], correct: 2 },
{ question: "What types of jobs are provided by service industries?", choices: ["Communications and retail services", "Transportation and education", "Tourism and government", "All answers are correct"], correct: 3 },
{ question: "With which words does the Canadian Charter of Rights and Freedoms begin?", choices: ["Canadian citizens have rights and responsibilities", "Oh Canada, our home and native land", "Canada is a free country and home of the brave", "Whereas Canada is founded upon principles that recognize the supremacy of God and the rule of law"], correct: 3 },
{ question: "Which of the following is not a responsibility of Canadian citizens?", choices: ["Learning to speak both official languages", "Voting in elections", "Obeying the law", "Taking responsibility for oneself and one's family"], correct: 0 },
{ question: "What do Canadians remember on Remembrance Day?", choices: ["Canadian victory in World War I", "Canadian victory in the Battle of Vimy Ridge", "Canadian victory in World War II", "Sacrifices made by Canadian veterans and brave soldiers in wars"], correct: 3 },
{ question: "Why was the Canadian Pacific Railway built?", choices: ["The railway made it possible for immigrants to settle in central Canada", "British Columbia joined Canada in 1871 after Ottawa promised to build a railway to the west coast", "To provide a spectacular tourist excursion across precipitous passes and bridges", "So British Columbia could handle the trade of goods worth billions of dollars all around the world"], correct: 1 },
{ question: "Why is trade with other countries important to Canada?", choices: ["Trade with other countries changed the native way of life forever", "To increase trade and enjoy one of the world's highest standards of living", "Canada has become a member of the World Trade Organization", "The French and Aboriginal people collaborated with Canada in the vast foreign trade economy"], correct: 1 },
{ question: "Which of the following best describes the role of the King in Canada?", choices: ["To make important decisions about how the country is governed", "To peacefully oppose or try to improve government proposals", "To run the federal government departments", "To focus on citizenship and allegiance, be a symbol of Canadian sovereignty and a guardian of constitutional freedoms"], correct: 3 },
{ question: "What does it mean to say Canada is a constitutional monarchy?", choices: ["The sovereign queen or king approves bills before they become law", "The sovereign queen or king represents Canadians in parliament", "Canada's head of state is a hereditary sovereign queen or king who reigns in accordance with the constitution", "The sovereign queen or king is the lawmaker of Canada"], correct: 2 },
{ question: "Remembrance Day is celebrated on?", choices: ["July 1st", "July 4th", "November 11th", "November 20th"], correct: 2 },
{ question: "What are the provinces of central Canada?", choices: ["Ontario and Quebec", "Ontario and Alberta", "Quebec and New Brunswick", "Alberta and Saskatchewan"], correct: 0 },
{ question: "Where do the majority of Metis live in Canada?", choices: ["Central Canada", "The North", "Prairie provinces", "The Maritimes"], correct: 2 },
{ question: "Which country is Canada's largest trading partner?", choices: ["China", "The United States of America", "The United Kingdom", "Mexico"], correct: 1 },
{ question: "Which two fundamental freedoms are protected by the Canadian Charter of Rights and Freedoms?", choices: ["Freedom of Belief and Freedom of Religion", "Equal employment rights and opportunities", "Basic living rights and obey laws", "Aboriginal people's rights and to volunteer"], correct: 0 },
{ question: "What do the initials MP stand for in Canadian politics?", choices: ["Member of Parliament", "Minister of Parliament", "Member of the Patriots", "Master of the province"], correct: 0 },
{ question: "Which was the last province to join Canada?", choices: ["Prince Edward Island", "Manitoba", "Newfoundland", "Yukon"], correct: 2 },
{ question: "Who are the Aboriginal peoples in Canada?", choices: ["The first settlers of Newfoundland", "The first European settlers to arrive in Canada", "The descendants of the first Australian immigrants to Canada", "The first inhabitants of Canada"], correct: 3 },
{ question: "What does the term responsible government mean?", choices: ["Each person in each electoral district is responsible for voting", "The governor general is responsible for the actions of the prime minister", "The ministers of the crown must have the support of a majority of the elected representatives in order to govern", "All Canadians are responsible for each other"], correct: 2 },
{ question: "Which province is Canada's main producer of pulp and paper?", choices: ["Quebec", "British Columbia", "Saskatchewan", "Ontario"], correct: 0 },
{ question: "What should you do if you do not receive a voter information card before an election?", choices: ["Call your local municipality", "Turn up at your nearest polling station on election day", "You should assume you were not chosen to vote", "Contact Elections Canada"], correct: 3 },
{ question: "What are the parties that are not in power called?", choices: ["Tea parties", "Opposition parties", "Rival parties", "Opponents parties"], correct: 1 },
{ question: "Which of the following is the oldest colony of the British Empire in Canada?", choices: ["Quebec", "Ontario", "Alberta", "Newfoundland and Labrador"], correct: 3 },
{ question: "Who is the king's representative in Canada?", choices: ["The Premier", "The Prime Minister's spouse", "The Governor General of Canada", "The Prime Minister"], correct: 2 },
{ question: "Which of the following are the responsibilities of Canadian citizenship?", choices: ["Protect the Canadian environment and vote in elections", "Obey the law, find work in the government, and serve in the Canadian Army", "Serve in the Canadian Army, obey the law, and take responsibility for oneself and one's family", "Obey the law, serve on a jury, vote in elections, and help others in the community"], correct: 3 },
{ question: "Which region of Canada is known for its fertile agricultural land and energy resources?", choices: ["Central Canada", "Quebec", "Prairie provinces", "Maritime provinces"], correct: 2 },
{ question: "Why are the Great Lakes important to Canada?", choices: ["They provide water for irrigation", "They provide fresh water and waterways", "They provide waterways", "They are tourist attractions"], correct: 1 },
{ question: "Which province in Canada is the smallest in land size?", choices: ["British Columbia", "Prince Edward Island", "Alberta", "New Brunswick"], correct: 1 },
{ question: "Who was the first person to draw a map of Canada's east coast?", choices: ["Jean Talon", "George Cartier", "John Cabot", "Jacques Cartier"], correct: 2 },
{ question: "If you cannot pay for a lawyer, how can you get legal help?", choices: ["Borrow money from the government and pay for the lawyer", "Go to legal aid services in most communities", "Apply for financial aid from the government to pay for legal fees", "Do not go to a court"], correct: 1 },
{ question: "What is a polling station?", choices: ["A place where you vote", "Campaign offices for candidates", "Place where the number of votes is counted", "Member of Parliament's constituency"], correct: 0 },
{ question: "What is a cabinet minister?", choices: ["Candidate picked by the Prime Minister", "MP picked by the Premier of each province", "MP selected by the Prime Minister to run federal departments", "MP selected by the king to make laws"], correct: 2 },
{ question: "Who discovered insulin?", choices: ["Dr. Wilder Penfield", "Matthew Evans and Henry Woodward", "Sir Frederick Banting and Charles Best", "Dr. John A. Hops"], correct: 2 },
{ question: "What is a major river in Quebec?", choices: ["Hudson's Bay", "Niagara", "Fraser River", "St. Lawrence River"], correct: 3 },
{ question: "Who circled the globe in a wheelchair to raise funds for spinal cord research?", choices: ["Reginald Fessendon", "Rick Hansen", "Terry Fox", "Gard Herdsburg"], correct: 1 },
{ question: "Who is the father of Manitoba and defender of Metis rights?", choices: ["Louis Riel", "Sir Louis-Hippolyte La Fontaine", "Sir John Alexander Macdonald", "Sir William Riel"], correct: 0 },
{ question: "Which of the following is a non-Canadian not allowed to do?", choices: ["Leave the country at will", "Contact his or her MP", "Take the Canada citizenship test", "Vote in federal and provincial elections"], correct: 3 },
{ question: "Why is the north sometimes called the land of the midnight sun?", choices: ["It is closer to the sun", "The northern lights appear at midnight", "It is night most of the time", "Summer daylight can last up to 24 hours"], correct: 3 },
{ question: "One-third of all Canadians live in?", choices: ["Saskatchewan", "Quebec", "Alberta", "Ontario"], correct: 3 },
{ question: "Who can ask you about whom you voted for?", choices: ["No one", "Any other Canadian", "Your local MP", "The Prime Minister"], correct: 0 },
{ question: "When did the United Empire loyalists come to Canada?", choices: ["Late 1600s", "Early 1600s", "Early 1700s", "Late 1700s"], correct: 3 },
{ question: "What happens when the federal government loses a confidence vote?", choices: ["An election is called", "The official opposition party takes power", "The Prime Minister loses his job", "The Prime Minister is no longer the leader of his party"], correct: 0 },
{ question: "What happened at the Battle of the Plains of Abraham?", choices: ["The Voyagers battled with the British for fur trading rights", "Americans fought the United Empire loyalists during the American Revolution", "The British defeated the French, marking the end of France's empire in America", "The French defeated the British in a battle for Quebec"], correct: 2 },
{ question: "Who has the right to apply for a Canadian passport?", choices: ["British citizens", "Canadian citizens", "Any immigrant who has stayed a minimum of 3 years in Canada", "Wealthy citizens"], correct: 1 },
{ question: "Who were the group of seven in modern Canada?", choices: ["A group of politicians", "A group of Canadian companies", "A group of cowboys who defended Canada", "A group of Canadian landscape painters in the 1920s"], correct: 3 },
{ question: "What is a responsible government?", choices: ["The government is responsible for the well-being of its people", "The government must take responsibility for any act of war it decides to commit", "A government that is against corruption", "The government must resign if it loses a confidence vote in the assembly"], correct: 3 },
{ question: "What outcome and significance did the War of 1812 with the USA have for Canada?", choices: ["Canada formed part of the United States", "Canada lost a lot of people in the war", "Canada protected its independence from the United States", "Canada became an independent country"], correct: 2 },
{ question: "What level of government passes bylaws?", choices: ["Provincial", "Municipal or local government", "Federal", "Senators"], correct: 1 },
{ question: "What is the meaning of the Canadian Coat of Arms and motto, A Mari Usque Ad Mare?", choices: ["From air to land", "From sea to land", "From land to sea", "From sea to sea"], correct: 3 },
{ question: "What are three key facts about Canada's system of government?", choices: ["A federal kingdom, a parliamentary democracy, and a constitutional monarchy", "A federal state, a parliamentary democracy, and a constitutional monarchy", "A socialist country, a parliamentary democracy, and a constitutional monarchy", "A federal country, a constitutional democracy, and a parliamentary monarchy"], correct: 1 },
{ question: "In which type of industry did most early European settlers work?", choices: ["Fur trading", "Oil", "Gold mining", "Hunting"], correct: 0 },
{ question: "How is a cabinet minister chosen?", choices: ["By the Prime Minister", "By the King", "By the voters", "By the senators"], correct: 0 },
{ question: "Who are the Acadians?", choices: ["English-speaking refugees who settled in Ontario", "The descendants of French colonists who began settling in what are now the Maritime Provinces", "French-speaking Catholics who live in Ontario", "Aboriginal people of the Arctic"], correct: 1 },
{ question: "How is the Prime Minister chosen?", choices: ["The MPs vote on the Prime Minister", "The Governor General, with the Senators, appoints the Prime Minister", "The King appoints the Prime Minister", "The leader of the party with the most elected Members of Parliament"], correct: 3 },
{ question: "What does MNA stand for?", choices: ["Member of the National Aid", "Member of the National Association", "Member of the National Airline", "Member of the National Assembly"], correct: 3 },
{ question: "The amended Constitution of Canada in 1982 was proclaimed by?", choices: ["The Senate", "Queen Elizabeth II", "The people of Canada", "The Prime Minister"], correct: 1 },
{ question: "What is Canada's system of government called?", choices: ["Dictatorship", "Parliamentary government", "Military rule", "Communism"], correct: 1 },
{ question: "What are the colors present in the Canadian flag?", choices: ["Blue and white", "Red and white", "Green and white", "Red and blue"], correct: 1 },
{ question: "From where did the first European settlers in Canada come?", choices: ["Germany", "England", "France", "Iceland"], correct: 2 },
{ question: "Which of the following are not responsibilities of the Governor General?", choices: ["Chooses the opposition party", "Performs the ceremonial duties of the Head of State", "Signs bills to make them law after they have been passed by Parliament", "All of these"], correct: 0 },
{ question: "How can you contact your member of Parliament?", choices: ["By using social media sites online", "By writing a letter to the House of Commons", "By booking an appointment over the phone", "By waiting outside of the Parliament building"], correct: 1 },
{ question: "Who was Sir George Etienne Cartier?", choices: ["A railway lawyer and Montrealer", "The first French Canadian Prime Minister", "The first head of a responsible government", "Canada's first Prime Minister"], correct: 0 },
{ question: "Who is the greatest Canadian hockey player?", choices: ["Wayne Gretzky", "Mark Tukesbury", "Donovan Bailey", "Terry Fox"], correct: 0 },
{ question: "Which of the following answers is NOT true about the relationship between Canada and the USA?", choices: ["Canada and the USA share the longest undefended international border", "Canada and the USA are the largest trading partners in the world", "Canada exports very few goods to the USA", "The relationship between Canada and the USA is the closest and the most extensive in the world"], correct: 2 },
{ question: "On which principles is Canada's constitution based?", choices: ["Multiculturalism, peace and order", "Peace, order, and good government", "War, order, and good government", "Mobility rights, order, and good government"], correct: 1 },
{ question: "What is the significance of hockey?", choices: ["It is the national summer sport", "It is the most popular spectator sport in Canada and also its national winter sport.", "Canada won a gold medal in the 2008 Olympics in this event.", "None of these."], correct: 1},
{ question: "What are the two principles upon which Canada is founded?", choices: ["The supremacy of God and the rule of law", "The supremacy of God and freedom of speech", "The supremacy of law and the rule of God", "Mobility rights and the rule of law"], correct: 0 },
{ question: "What is celebrated on the 26th of December?", choices: ["Remembrance Day", "Victoria Day", "Boxing Day", "Canada Day"], correct: 2 },
{ question: "Since when has the protocol for the amendment of the Canadian Constitution existed?", choices: ["1962", "1982", "1885", "1972"], correct: 1 },
{ question: "Canada's national winter sport is", choices: ["Lacrosse", "Basketball", "Hockey", "Golf"], correct: 2 },
{ question: "Who led an armed uprising in seized Fort Garry?", choices: ["John Alexander Macdonald", "Louis Riel", "Sam Steele", "George-Etienne Cartier"], correct: 1 },
{ question: "What are the main functions of the cabinet?", choices: ["Natural resources", "Navigation", "To prepare the budget and propose new laws to be implemented", "Defense"], correct: 2 },
{ question: "Who can enter and leave the country freely without time constraints?", choices: ["Canadian citizens and landed immigrants", "Commonwealth citizens", "Canadian citizens", "British citizens"], correct: 2 },
{ question: "If the government loses a confidence vote in the assembly, it must", choices: ["Call for bye-elections", "Continue governing", "Do nothing", "Resign"], correct: 3 },
{ question: "Which province was the first to grant voting rights to women?", choices: ["Quebec", "Ontario", "Nova Scotia", "Manitoba"], correct: 3 },
{ question: "What is the Great Charter of Freedom also known as?", choices: ["Habeas corpus", "Dominion of Canada", "Canadian Constitution", "Magna Carta"], correct: 3 },
{ question: "A Member of Parliament from Montreal announces that she will spend her weekend in her electoral district. This means she would be:", choices: ["In her office on Parliament Hill", "In some part of Montreal where she was elected", "Visiting the province of Quebec", "Going on a vacation"], correct: 1 },
{ question: "How is the government formed after a federal election?", choices: ["Each province elects one representative to form the government. The King then chooses the Prime Minister.", "The Governor General picks a party and a Prime Minister to run the government.", "The party with the most elected representatives becomes the party in power. The leader of this party becomes the Prime Minister.", "The party with the most elected representatives becomes the party in power. The King chooses the Prime Minister from this party."], correct: 2 },
{ question: "Who is Canada's head of state?", choices: ["The Premier of Canada", "A hereditary sovereign Queen or King", "The Governor General", "The Prime Minister"], correct: 1 },
{ question: "Who chose Ottawa as the capital of Canada?", choices: ["Queen Elizabeth I", "Queen Elizabeth II", "Queen Victoria", "Queen Anne"], correct: 2 },
{ question: "When was the current flag of Canada raised for the first time?", choices: ["1921", "1965", "1949", "1892"], correct: 1 },
{ question: "What are the Prime Minister and Cabinet Ministers together called?", choices: ["The Government", "The Cabinet", "The House of Commons", "The Senate"], correct: 1 },
{ question: "In which province are more than half of Canada's aeronautics and space industry located?", choices: ["Saskatchewan", "Ontario", "Quebec", "Manitoba"], correct: 2 },
{ question: "Who is General Sir Arthur Currie?", choices: ["Canada's greatest soldier in the First World War", "A great frontier hero", "An explorer of Western Canada", "A military leader of the Metis in the 19th century"], correct: 0 },
{ question: "Which province was split into two at Confederation?", choices: ["Lower Canada", "Newfoundland", "Upper Canada", "The Province of Canada"], correct: 3 },
{ question: "What are the territories of Northern Canada and their capital cities?", choices: ["Yukon (Whitehorse), Northwest Territories (Yellowknife), and Nunavut (Iqaluit)", "Northwest Territories (Yellowknife) and Alaska (Juneau)", "Northwest Territories (Yellowknife)", "Alaska (Juneau) and Yukon (Whitehorse)"], correct: 0 },
{ question: "What does the word Inuit mean?", choices: ["Eskimo in the Inuktitut language", "Home in English", "The people in the Inuktitut language", "The Arctic land in the Inuktitut language"], correct: 2 },
{ question: "Which party becomes the official opposition?", choices: ["The party the Prime Minister selects", "The party with the least votes", "The party with the second most votes", "Any independent candidate"], correct: 2 },
{ question: "Who played an important part in building the Canadian Pacific Railway?", choices: ["Acadian railroad workers", "Afro-American slaves", "American railroad engineers", "Chinese railroad workers"], correct: 3 },
{ question: "Which provinces are connected to Ontario by land?", choices: ["New Brunswick and Quebec", "Alberta and Quebec", "Manitoba and Quebec", "Manitoba and Alberta"], correct: 2 },
{ question: "Who do Members of Parliament represent?", choices: ["Everyone who lives in his or her electoral district", "Everyone who lives in his or her neighborhood", "Everyone who lives in his or her province", "Everyone in northern Canada"], correct: 0 },
{ question: "What is the role of the opposition parties?", choices: ["To ensure reports about the current government are sent to the King", "To supervise the government", "To oppose or try to improve government proposals", "To regulate government proposals"], correct: 2 },
{ question: "On what date did Nunavut become a territory?", choices: ["April 1st, 1999", "May 1st, 1998", "July 1st, 1867", "July 31st, 1820"], correct: 0 },
{ question: "Why is the British North America Act important in Canadian history?", choices: ["It was agreed to by the First Nations and Inuit", "It was written by the British government", "The Aboriginal people signed the act", "It made confederation legal"], correct: 3 },
{ question: "Which of the following statements accurately describes the Quebec flag known as the Fleurdelisé?", choices: ["It features a white cross with four roses in its quadrants and was adopted in 1948", "It features a white cross with four fleurs-de-lis in its quadrants and was adopted in 1948", "It features a blue cross with four thistles and shamrocks and was adopted in 1948", "It features a white cross with four fleurs-de-lis and was adopted in 1867"], correct: 1 },
{ question: "Who built the French empire in North America?", choices: ["King Charles II", "Jean Talon, Bishop Laval and Count Frontenac", "Pierre Le Moyne and Sieur d'Iberville", "Great Britain"], correct: 1 },
{ question: "Which province is on the Pacific coast of Canada?", choices: ["Nova Scotia", "Alberta", "New Brunswick", "British Columbia"], correct: 3 },
{ question: "How many Great Lakes are located between Ontario and the United States?", choices: ["4", "5", "6", "7"], correct: 1 },
{ question: "Which one is Canada's best known symbol and national police force?", choices: ["RMCP", "CIA", "Canadian Police", "RCMP"], correct: 3 },
{ question: "Which group of Aboriginal peoples has the largest population in the Northern Territories in Nunavut?", choices: ["Acadians", "Metis", "First Nations", "Inuit"], correct: 3 },
{ question: "Where are the Parliament buildings located?", choices: ["Toronto", "Kingston", "London", "Ottawa"], correct: 3 },
{ question: "What forms a jury?", choices: ["Politicians", "Immigrants", "Judges", "Citizens"], correct: 3 },
{ question: "What is the significance of the Quebec Act of 1774?", choices: ["It allowed Quebec to gain independence", "It allowed the French to move into Quebec", "Canada's tolerance of religious tradition under the law", "It gave the French more power"], correct: 2 },
{ question: "Who has the right to be considered first for a job in the federal government?", choices: ["Canadian citizens", "Anyone with the relevant experience", "Anyone with the necessary qualifications", "Foreigners"], correct: 0 },
{ question: "Who are Anglophones?", choices: ["People who were taught English at school", "People who understand but do not speak English", "People who do not speak English as a first language", "People who speak English as a first language"], correct: 3 },
{ question: "Who were The Voyageurs?", choices: ["Montreal-based traders who traveled by canoe", "Immigrants to Canada in the 18th century", "Explorers searching for the Northwest Passage", "Geographers who first charted the coastline of British Columbia"], correct: 0 },
{ question: "Which countries fought in the Battle of the Plains of Abraham?", choices: ["British and German", "British and French", "France and China", "America and British"], correct: 1 },
{ question: "When did the Canadian Charter of Rights and Freedoms become part of the Constitution?", choices: ["1892", "1872", "1982", "1782"], correct: 2 },
{ question: "Which group of Aboriginal peoples has the largest population in Canada?", choices: ["Acadians", "First Nations", "Indigenous peoples", "Metis"], correct: 1 },
{ question: "Why is the Constitution Act of 1982 important in Canadian history?", choices: ["Canada can modify the Constitution without approval from the British government", "The Queen or King has more power in Canadian government", "It lets Canadians enjoy more freedom", "It made changes to the Citizenship Act"], correct: 0 },
{ question: "Which province has the most valuable forest industry in Canada?", choices: ["Ontario", "Alberta", "Quebec", "British Columbia"], correct: 3 },
{ question: "Which of the following best describes the sport of lacrosse?", choices: ["The official winter sport", "The second most popular sport in Canada", "The official summer sport", "The most popular sport in Canada"], correct: 2 },
{ question: "What do you call a law before it is passed?", choices: ["A proposed law", "A bill", "A new law", "A proposal of a law"], correct: 1 },
{ question: "Who among these is a Nobel Prize-winning scientist?", choices: ["Gerhard Herzberg", "Marshall McLuhan", "Alexander Graham Bell", "Harold Innis"], correct: 0 },
{ question: "Canadians have rights and fundamental freedoms such as", choices: ["Thought and belief", "Opinion and expression", "Freedom of religion", "All of these"], correct: 3 },
{ question: "When did the British North America Act come into effect?", choices: ["1867", "1881", "1901", "1876"], correct: 0 },
{ question: "What is the highest honor available to Canadians?", choices: ["The Queen's Medal", "Elizabeth Cross", "Victoria Medal", "Victoria Cross"], correct: 3 },
{ question: "Which city provides important shipping and air links across the Pacific Ocean?", choices: ["Victoria", "Calgary", "Edmonton", "Vancouver"], correct: 3 },
{ question: "What is Terry Fox's contribution?", choices: ["He inspired people to contribute money for cancer research", "He was the greatest hockey player in Canada", "His discovery of insulin saves millions of people's lives", "He was a brilliant soldier"], correct: 0 },
{ question: "What are three minerals still mined in the territories today?", choices: ["Lead, gold, and zinc", "Silver, lead and zinc", "Zinc, gold and bronze", "Zinc, lead and aluminum"], correct: 0 },
  {question: "What are the regions of Canada?", choices: ["West, North, South, East, and Central", "West Coast, Central, East, Canadian Shield, and South", "Atlantic, North, Central, Prairies, and West Coast", "Rockies, Ontario, Quebec, and Prairies"], correct: 2 },
  {question: "What is the head of the city called?", choices: ["Mayor", "Counselor", "Alderman", "Premier"], correct: 0 },
  { question: "In what sorts of jobs do most Canadians work?", choices: ["Service", "Lumbering", "Farming", "Natural resources"], correct: 0 },
  { question: "What is written on an election ballot?", choices: ["The names of the candidates in your election district", "Who you should vote for", "The date and time you are allowed to vote", "Where you should vote"], correct: 0 },
  { question: "Which province is the only officially bilingual province?", choices: ["Ontario", "Quebec", "Nova Scotia", "New Brunswick"], correct: 3 },
  { question: "Where do most French-speaking Canadians live?", choices: ["Nova Scotia", "Quebec", "Ontario", "New Brunswick"], correct: 1 },
  { question: "Who started the women's suffrage movement in Canada?", choices: ["Agnes Macphail", "Laura Secord", "Dr. Emily Stowe", "Madeleine Parent"], correct: 2 },
  { question: "What will you promise when you take the oath of citizenship?", choices: ["Carry out responsibilities as a Canadian citizen", "Pledge allegiance to the Queen or King", "Promise to obey the Constitution of Canada", "Pledge loyalty to the Queen or King. Observe the laws and fulfill the duties of a Canadian"], correct: 3 },
  { question: "The Quebec Act of 1774:", choices: ["Allowed religious freedom for Catholics", "Is one of the constitutional foundations of Canada", "Permitted Catholics to hold public office", "All of these"], correct: 3 },
  { question: "What region is called the land of the midnight sun?", choices: ["Central Canada", "The Northern Territories", "The Prairies", "The Maritimes"], correct: 1 },
  { question: "What does it mean for a political party to be in power?", choices: ["To gain the approval of the queen or king", "To have the most elected representatives", "To generate electricity", "To hold the nuclear button"], correct: 1 },
  { question: "Which two provinces produce more than 3/4 of Canadian manufactured goods?", choices: ["Quebec and Manitoba", "British Columbia and Ontario", "Ontario and Quebec", "Alberta and Ontario"], correct: 2 },
  { question: "Give an example of how you can demonstrate responsibility by being involved in your community.", choices: ["Minding your own business", "Throwing a party", "Keeping your property well-maintained", "Volunteering"], correct: 3 },
  { question: "To which of the following communities do the majority of Canadians belong?", choices: ["Christian", "Jewish", "Muslim", "Hindu"], correct: 0 },
  { question: "Which Canadian province is the largest producer of oil and natural gas?", choices: ["Quebec", "Nova Scotia", "Ontario", "Alberta"], correct: 3 },
  { question: "Which is the northeastern province in Canada that has its own time zone?", choices: ["Alberta", "Newfoundland and Labrador", "Nova Scotia", "Prince Edward Island"], correct: 1 },
  { question: "What is the voting procedure in Canada?", choices: ["Whichever way you like", "Online", "Secret ballot", "Open ballot"], correct: 2 },
  { question: "Which is the Canadian province with the largest population?", choices: ["Ontario", "Quebec", "Nova Scotia", "Alberta"], correct: 0 },
  { question: "What do Canadians normally wear on Remembrance Day?", choices: ["A red poppy", "A green shirt", "A black tie", "A white shirt"], correct: 0 },
  { question: "What does CPR stand for?", choices: ["Canadian Pacific Railway", "Canadian People Railway", "Canadian Public Road", "Canadian People Resource"], correct: 0 },
  { question: "How long is the Lieutenant Governor appointed for?", choices: ["3 years", "4 years", "5 years", "6 years"], correct: 2 },
  { question: "What is the fundamental characteristic of Canadian heritage and identity?", choices: ["Multiculturalism", "French culture", "Canadian festivals", "English culture"], correct: 0 },
  { question: "When does Canada celebrate Thanksgiving?", choices: ["The second Monday of October", "The first Friday of October", "The first Monday of September", "The first Monday of July"], correct: 0 },
  { question: "What is the symbol of the Canadian government?", choices: ["The Parliament", "The Crown", "The National Flag", "The Snowbirds"], correct: 1 },
  { question: "In the 1960s, Quebec experienced an era of rapid change. What is it called?", choices: ["The East Movement", "The Quiet Revolution", "The Suffrage Movement", "The Industrial Revolution"], correct: 1 },
  { question: "Who invented the worldwide system of standard time zones?", choices: ["Joseph Armand Bombadier", "Reginald Fessendon", "Sir Sanford Fleming", "Alexander Graham Bell"], correct: 2 },
  { question: "The ancestors of the Aboriginals are believed to have migrated from which continent?", choices: ["Asia", "America", "Europe", "Australia"], correct: 0 },
  { question: "The municipal government is responsible for which of the following?", choices: ["Natural resources", "Currency", "Garbage removal", "Highways"], correct: 2 },
  { question: "Who is a Premier?", choices: ["The Prime Minister is also called the Premier", "A Premier has a role similar to that of the Prime Minister in a federal government", "The Commissioner", "The Governor General"], correct: 1 },
  { question: "Which oceans line Canada's frontiers?", choices: ["The Pacific Ocean in the west", "The Atlantic Ocean in the east", "The Arctic Ocean to the north", "All of these"], correct: 3 },
  { question: "Who is the head of the government in Canada?", choices: ["The Sovereign", "The Prime Minister", "The Premier", "The Commissioner"], correct: 1 },
  { question: "What do we need to bring with us for voting?", choices: ["Voter information card, voter's identity, and address proof", "Credit card", "Ballot paper", "None of these"], correct: 0 },
  { question: "Where have most immigrants come from since the 1970s?", choices: ["Asia", "England", "France", "USA"], correct: 0 },
  { question: "For what product did the first companies formed in Canada compete?", choices: ["Timber trade", "Gold trade", "Fur trade", "Fish trade"], correct: 2 },
  { question: "How many Canadians were killed in World War I from 1914 to 1918?", choices: ["60,000", "170,000", "200,000", "70,000"], correct: 0 },
  { question: "How many Canadians have been awarded the Victoria Cross?", choices: ["96", "500", "2", "1,222"], correct: 0 },
  { question: "Which country was liberated by the Canadian Army in 1944–1945?", choices: ["Germany", "Austria", "The Netherlands", "Japan"], correct: 2 },
  { question: "Who is known as the greatest living Canadian?", choices: ["Dr. Wilder Penfield", "Terry Fox", "Sir John Alexander Macdonald", "Sir Fleming"], correct: 0 },
  { question: "Which province has the largest population of Aboriginals?", choices: ["Manitoba", "Ontario", "Nova Scotia", "Alberta"], correct: 0 },
  { question: "How large is Canada?", choices: ["About 8 million km²", "About 10 million km²", "About 11 million km²", "About 9 million km²"], correct: 1 },
  { question: "Where is the most important harbor in Eastern Canada located?", choices: ["Vancouver", "Yellow Knife", "Halifax", "Quebec"], correct: 2 },
  { question: "Who is considered Canada's greatest soldier?", choices: ["General Sir Arthur Currie", "Phil Edwards", "Sir John Alexander Macdonald", "Rick Hansen"], correct: 0 },
  { question: "What three oceans border Canada?", choices: ["Hudson, Pacific, and Atlantic", "Atlantic, Arctic, and Bearing", "Pacific, Indian, and Atlantic", "Atlantic, Arctic, and Pacific"], correct: 3 },
  { question: "In which act are the responsibilities of the federal and provincial government defined?", choices: ["The Federal Act", "The Government Act", "The Responsibilities Act", "The Constitution Act"], correct: 3 },
  { question: "Which courts are for civil cases involving small sums of money?", choices: ["The federal court", "The small claims courts", "A trial court", "A provincial court"], correct: 1 },
  { question: "What is a voter information card?", choices: ["A list that tells you who the candidates are in your electoral district", "A letter that lets you know the voting schedule", "A form that tells you where and when to vote", "A card to let you register for voting"], correct: 2 },
  { question: "What is the head tax?", choices: ["Race-based entry fee charged for Chinese entering Canada", "Fee charged for anyone entering Canada after 1900", "A tax imposed on beer beginning in 1867", "Fee charged for moving westward in the early 1900s"], correct: 0 },
  { question: "Which of the following are the responsibilities of the federal government?", choices: ["National Defense, Foreign Policy, International Trade and Aboriginal Affairs", "National Defense, Healthcare, International Trade and Aboriginal Affairs", "Highways, Policing, International Trade, and Criminal Justice", "Education, Foreign Policy, Recycling programs, and Aboriginal Affairs"], correct: 0 },
  { question: "In Canada's justice system, what does presumption of innocence mean?", choices: ["The Prime Minister can determine who is innocent in a court", "Everybody is guilty until proven innocent", "Everyone is innocent until proven guilty", "The judge can determine who is guilty without evidence"], correct: 2 },
  { question: "What does the register of electors contain?", choices: ["A list of all Canadian citizens who are qualified to vote in federal elections and referendums", "A list of people who are willing to vote in elections and referendums", "A list of people who voted for the opposition party in the previous election", "A list of people who are not allowed to vote"], correct: 0 },
  { question: "In the Canadian justice system, what are the roles of the courts and the police?", choices: ["The courts make laws and the police enforce them", "The courts enforce federal laws and the police enforce provincial laws", "The courts enforce laws and the police settle disputes", "The courts settle disputes and the police enforce the laws"], correct: 3 },

  { question: "What is the reason behind the Canada and US border?", choices: ["To improve security", "To maintain distance", "Canada wishes to remain independent of the United States", "To prevent war between the two countries"], correct: 2 },
{ question: "What is the other name for a trial court?", choices: ["The Court of King's Bench", "The Federal Court", "The Provincial Court", "The Small Claims Court"], correct: 0 },
{ question: "What is the minimum age for voting in federal, provincial, Territorial, and Municipal Elections?", choices: ["16", "18", "19", "21"], correct: 1 },
{ question: "What is the tenure of the Governor General?", choices: ["4 years", "5 years", "6 years", "7 years"], correct: 1 },
{ question: "Postwar, Canada became a more flexible and open society. Which of the following was this based on?", choices: ["Equality of men and women", "Inequality of women", "Inequality of men and women", "Equality of men"], correct: 0 },
{ question: "Which three rights are included in the Canadian Charter of Rights and Freedoms?", choices: ["Freedom of expression rights, property rights, and fair trial rights", "Mobility rights, Aboriginal people's rights, and official language rights", "Aboriginal people's rights, voting rights, and official language rights", "Employment rights, mobility rights, and freedom rights"], correct: 1 },
{ question: "Which of the following are the three founding peoples of Canada?", choices: ["American, French, and British", "Aboriginal, French, and British", "French, American, and Indian", "British, American, and Aboriginal"], correct: 1 },
{ question: "To what ocean is Newfoundland closest?", choices: ["Atlantic", "Pacific", "Labrador", "Arctic"], correct: 0 },
{ question: "What UN operation did Canada participate in from 1950 to 1953?", choices: ["Canadian forces defended Hong Kong", "The Canadian Corps captured Vimy Ridge", "Canada participated in the UN operation defending South Korea in the Korean War", "Canadians volunteered to fight in the South African war"], correct: 2 },
{ question: "From whom are the Acadians descended?", choices: ["Metis and Inuit", "First Nations who began settling in what are now the Prairie Provinces in 1600s", "British colonists who began settling in what are now the Maritime Provinces in 1604", "French colonists who began settling in what are now the Maritime Provinces in 1604"], correct: 3 },
{ question: "Who has the right to enter and leave Canada at will?", choices: ["Prisoners", "Members of the Commonwealth", "Canadian citizens", "Job seekers"], correct: 2 },
{ question: "What was the significance of June 6th, 1944 invasion of Normandy?", choices: ["Canadians made a significant contribution to the defeat of Nazism and fascism in Europe during the Second World War", "It liberated North Africa from Nazi occupation", "It results in the forcible relocation of Canadians of Japanese origin", "It led to the establishment of the Juno Awards"], correct: 0 },
{ question: "What does equality under the law mean?", choices: ["To be protected against any discrimination", "To be discriminated against", "To be like anyone else in Canada", "To be the same as anywhere in the world"], correct: 0 },
{ question: "What does mobility rights mean?", choices: ["Being able to use any mobile phone service in Canada", "Being able to live and work anywhere in Canada", "Being able to live and fish anywhere in Canada", "Being able to play hockey anywhere in Canada"], correct: 1 },
{ question: "What is the Okanagan Valley famous for?", choices: ["Coal mines", "Lakes and fishing", "Fruit orchards", "Sunrise and sunset"], correct: 2 },
{ question: "When did the name of Canada begin appearing on maps?", choices: ["By the 1750s", "By the 1580s", "By the 1550s", "By the 1650s"], correct: 2 },
{ question: "What is a minority government?", choices: ["The party in power holds less than half of the seats in the House of Commons", "The party in power holds less than half of the seats in the House of Commons and the Senate", "The party in power holds at least half of the seats in the House of Commons", "The party in power holds at least half of the seats in the Senate"], correct: 0 },
{ question: "Where are the Great Lakes?", choices: ["Atlantic Canada", "Manitoba", "Between Ontario and the United States", "Northern Quebec"], correct: 2 },
{ question: "What is the difference between the role of the Sovereign and that of the Prime Minister?", choices: ["The Sovereign links Canada to 52 other nations and the Prime Minister is the guardian of Constitutional freedoms", "The sovereign is the symbol of Canadian sovereignty and the Prime Minister is his aid", "The Sovereign is head of state. The Prime Minister oversees provincial policies", "The Sovereign is the guardian of Constitutional freedoms. The Prime Minister selects the Cabinet Ministers and is responsible for operations and policy of government"], correct: 3 },
{ question: "What is the meaning of the Remembrance Day poppy?", choices: ["To remember our Sovereign Queen Elizabeth II", "To remember the sacrifice of Canadians who have served or died in wars up to the present day", "To honor Prime Ministers who have died", "To celebrate Confederation"], correct: 1 },
{ question: "You can vote in advance if", choices: ["You are elderly", "You know you will not be able to vote on election day", "Sick and physically disabled", "All of these"], correct: 3 },
{ question: "Who signs the bills if it is approved by the provincial parliament?", choices: ["The Mayor", "The Premier", "The members of the Provincial Parliament", "The Lieutenant Governor"], correct: 3 },
{ question: "What does MPP stand for?", choices: ["Member of the Provincial Parachute", "Member of the Provincial Police", "Member of the Provincial Parliament", "Member of the Provincial Publication"], correct: 2 },
{ question: "How are senators chosen?", choices: ["By the Premier of all provinces", "By the Governor General of Canada", "Appointed by the Governor General on the advice of the Prime Minister", "Appointed by the King"], correct: 2 },
{ question: "Who was the first prime minister of Canada?", choices: ["Sir John Alexander Macdonald", "Alexander Mackenzie", "Pierre Elliot Trudeau", "Sir John Macdonald"], correct: 0 },
{ question: "Which animal is an official symbol of Canada?", choices: ["Bear", "Moose", "Beaver", "Snowbird"], correct: 2 },
{ question: "What do you mark on a federal election ballot?", choices: ["A check mark", "An X", "A sticker", "A thumbprint"], correct: 1 },
{ question: "What does the blindfolded Lady Justice symbolize?", choices: ["Blind to all considerations other than facts", "The government must respect all of the legal rights a person is entitled to under the law", "Our judicial system is founded on the presumption of innocence in criminal matters", "None of these"], correct: 0 },
{ question: "When did thousands of miners first come to Yukon?", choices: ["1870s", "1980s", "1780s", "1890s"], correct: 3 },
{ question: "When is Sir Wilfrid Laurier Day celebrated?", choices: ["12th of November", "20th of November", "22nd of November", "2nd of November"], correct: 1 },
{ question: "What is the significance of the Canadian discovery of insulin?", choices: ["It saved lives of children with sickness", "It saved millions of lives of people with diabetes", "It helped the treatment of heart diseases", "It was an important medicine to save soldiers life during World War II"], correct: 1 },
{ question: "Jurisdiction is shared by federal government and provinces over which of the following sectors?", choices: ["Agriculture and immigration", "Interprovincial trade and communications", "Defense and health", "Natural resources"], correct: 0 },
{ question: "What do you call the King's representative in the territories?", choices: ["Commissioner", "Member of the Legislative Assembly", "Sir", "Lieutenant Governor"], correct: 0 },
{ question: "What are the provinces of the Atlantic region?", choices: ["Newfoundland, Nova Scotia, New Brunswick, and Quebec", "Nova Scotia, New Brunswick, Prince Edward Island, and Quebec", "Nova Scotia, Newfoundland, New Brunswick, and Prince Edward Island", "New Brunswick, Nova Scotia, Ontario, and Quebec"], correct: 2 },
{ question: "Why is the Battle of Vimy Ridge important in Canadian history?", choices: ["It was the last battle of the First World War", "It has come to symbolize Canada's becoming as a nation", "It was an important victory in the Boer War", "Out of it was formed the Canadian corps"], correct: 1 },
{ question: "From where does the name Canada come?", choices: ["From the Inuit word Kanata meaning nations", "From Kanata, the First Nations word for village", "From the Inuit word meaning home", "From the First Nations word meaning land"], correct: 1 },
{ question: "What are the three main types of industry in Canada?", choices: ["Natural resources, manufacturing, and services", "Mining, services, and manufacturing", "Oil, tourism, and manufacturing", "Fishery, tourism, and services"], correct: 0 },
{ question: "Which country lies on Canada's southern border?", choices: ["Central America", "Mexico", "Michigan", "United States of America"], correct: 3 },
{ question: "What are the prairie provinces?", choices: ["Saskatchewan and Manitoba", "Alberta, Manitoba, and British Columbia", "Saskatchewan, Alberta, and Manitoba", "Saskatchewan and Alberta"], correct: 2 },
{ question: "Where do English and French have equal status in Canada?", choices: ["In the workplace", "In schools", "In the Parliament of Canada", "At the city hall"], correct: 2 },
{ question: "What is a majority government?", choices: ["The party in power holds at least half of the seats in the House of Commons and the Senate", "The party in power holds at least half of the seats in the House of Commons", "The party in power holds less than half of the seats in the House of Commons", "The party in power holds at least half of the seats in the Senate"], correct: 1 },
{ question: "Which countries fought in the War of 1812?", choices: ["United Kingdom and United States of America", "France and United Kingdom", "Canada and United States of America", "France, Great Britain and United States of America"], correct: 0 },
{ question: "Name three requirements you must meet in order to vote in a federal election.", choices: ["Canadian citizen, at least 21 years old, and on the list of electors", "Canadian citizen, at least 18 years old, and on the voters' list", "Working for the government, at least 18 years old, and Canadian citizen", "Canadian citizen, at least 16 years old, and on the list of voters"], correct: 1 },
{ question: "Which two provinces are on the Atlantic coast of Canada?", choices: ["British Columbia and Yukon", "Nova Scotia and New Brunswick", "Newfoundland and British Columbia", "Prince Edward Island and Ontario"], correct: 1 },
{ question: "How many provinces and territories are there in Canada?", choices: ["Eight provinces and three territories", "Ten provinces and two territories", "Nine provinces and two territories", "Ten provinces and three territories"], correct: 3 },
{ question: "Which of the following statements about residential schools is not true?", choices: ["The federal government placed many Aboriginal children in residential schools to educate and assimilate them into mainstream Canadian culture", "The schools were poorly funded and inflicted hardship on the students", "The schools were welcomed by the Aboriginal people", "Aboriginal language and cultural practices were mostly prohibited"], correct: 2 },
{ question: "Who have major responsibilities on First Nations reserves?", choices: ["Band chiefs and counselors", "Municipal governments", "Provincial and territorial governments", "Federal government"], correct: 0 },
{ question: "What important trade did the Hudson Bay Company control?", choices: ["Gold", "Oil", "Fishery", "Fur"], correct: 3 },
{ question: "Who are exempted from the requirement of adequate knowledge of English or French in order to become a Canadian citizen?", choices: ["Anyone who doesn't live in a major city", "Any adult applicants who are 55 years of age and under", "Any adult applicants who are 55 years of age and over", "No one"], correct: 2 },
{ question: "Who played a key role in defending Canada during the War of 1812 and led a group of Shawnee warriors in support of British soldiers and Canadian volunteers?", choices: ["Major General Sir Isaac Brock", "Lieutenant Colonel Charles de Salaberry", "Chief Tecumseh", "Major General Robert Ross"], correct: 2 },
{ question: "Which of the following are the responsibilities of local government?", choices: ["Education, foreign policy and transportation", "Health care, natural resources, and transportation", "National defense, health care, and transportation", "Social and community health, snow removal, and transportation"], correct: 3 },
{ question: "What does the Canadian flag look like?", choices: ["Red with a white maple leaf", "Red and white with a bear", "White with a red border on each end and a red maple leaf in the center", "Red and white with provincial emblems"], correct: 2 },
{ question: "What does Confederation mean?", choices: ["The joining of provinces to become a new country", "The United States Confederate Army came to settle in Canada", "The combination of neighborhood to build a larger community", "The merger of colonies to form a province"], correct: 0 },
{ question: "In what year were the Aboriginal peoples granted the right to vote?", choices: ["1960", "1790", "1950", "1632"], correct: 0 },
{ question: "In which period did Canada's economy and industry experience a boom?", choices: ["1880s", "1890s and early 1900s", "1920s", "1860s"], correct: 1 },
{ question: "What are the three parts of Parliament?", choices: ["The Queen or King, Governor General and Prime Minister", "The Governor General, the Legislative Assembly, and the Senate", "The Queen or King, The House of Commons and the Senate", "The House of Commons, the Legislative Assembly, and the Senate"], correct: 2 },
{ question: "Which two are Great Lakes?", choices: ["St. Lawrence and Superior", "Ontario and Okanagan", "Michigan and Okanagan", "Huron and Erie"], correct: 3 },
{ question: "What is known as the effort by women to achieve the right to vote?", choices: ["The suffrage motion of women", "The women's voting law", "The election law", "The women's suffrage movement"], correct: 3 },
{ question: "What do political parties do?", choices: ["Follow commands from the King", "Share ideas about how government should work", "Plan for the celebration of Canada Day", "Work with the local governments"], correct: 1 },
{ question: "Who were the United Empire loyalists?", choices: ["Inuit and First Nations", "French and British settlers", "First Nations and British settlers", "Settlers from the United States during the American Revolution"], correct: 3 },
{ question: "What does the right to a secret ballot mean?", choices: ["No one can watch you vote except the election officer", "The voter should not tell anyone for whom he or she voted", "Only the candidate you vote for can watch your marked ballot", "No one can watch you vote or look at your marked ballot"], correct: 3 },
{ question: "Which province is Canada's largest producer of hydro electricity?", choices: ["British Columbia", "Manitoba", "Ontario", "Quebec"], correct: 3 },
{ question: "Which territory shares a border with another country?", choices: ["British Columbia", "Alberta", "Northwest Territories", "Yukon Territory"], correct: 3 },
{ question: "Which four provinces first formed Confederation?", choices: ["Ontario, Quebec, Nova Scotia, and New Brunswick", "Ontario, Newfoundland, Quebec, and Nova Scotia", "Ontario, Nova Scotia, New Brunswick, and British Columbia", "Ontario, Quebec, Manitoba, and Nova Scotia"], correct: 0 },
{ question: "When was the Canadian Pacific Railway finished?", choices: ["Late 1600s", "Late 1700s", "Late 1800s", "Early 1700s"], correct: 2 },
{ question: "Who has the right to run as a candidate in federal elections?", choices: ["Any person who is at least 18 years or older", "Any Canadian citizen who is at least 18 years old", "Canadian citizens and landed immigrants", "A Canadian citizen who is 16 years or older"], correct: 1 },
{ question: "Under what conditions can you challenge the function or conduct of a police officer in Canada?", choices: ["Never. Canadians cannot challenge them", "Only their function, not their conduct", "Only their conduct, not their function", "If you consider this measure necessary"], correct: 3 },
{ question: "How does a bill become a law?", choices: ["Must be approved by the Governors of each province", "Must be approved by a majority in the House of Commons and Senate and receive royal assent", "Must be signed by the Queen or King", "Must be approved by the members of the Parliament"], correct: 1 },
{ question: "Who are the Quebecers?", choices: ["European settlers in the 1600s", "Descendants of the French colonists", "Descendants of the Anglophones", "People of Quebec"], correct: 3 },
{ question: "Fatima is a new immigrant to Canada. Why can she choose to take a job like any man?", choices: ["Because of the equality between French and English", "Because she came from United Kingdom", "Because of the equality of women and men in Canada", "Because she has a university degree"], correct: 2 },
{ question: "Why is British Columbia known as Canada's Pacific gateway?", choices: ["Because billions of dollars in goods are shipped to and from Asia", "Because it has Pacific Ocean on its coastline", "Because many people of Asian origin live there", "Because it attracts many tourists all year round"], correct: 0 },
{ question: "When was the Magna Carta signed?", choices: ["1649", "1215", "1425", "615"], correct: 1 },
{ question: "What does the great charter of freedom include?", choices: ["Aboriginal people's rights", "Employment rights", "Freedom of conscience and religion", "Freedom from taxes"], correct: 2 },
{ question: "What is habeas corpus?", choices: ["The right to live and work anywhere in Canada", "The right for peaceful assembly", "The right to speak freely", "The right to challenge unlawful detention by the state"], correct: 3 },
{ question: "Who invented the snowmobile?", choices: ["Alexander Graham Bell", "Joseph-Armand Bombardier", "Sir Sanford Fleming", "Matthew Evans and Henry Woodward"], correct: 1 },
{ question: "Who out of the following is above the law in Canada?", choices: ["Judges", "Police", "Politicians", "No one"], correct: 3 },
{ question: "What are the three branches of the Canadian government?", choices: ["Executive, Senate and Judicial", "Executive, Legislative, and Monarchy", "Executive, Police, and Judicial", "Executive, Legislative, and Judicial"], correct: 3 },
{ question: "Under Canadian law, why is every person presumed to be innocent until proven guilty?", choices: ["No person or group is above the law", "Men and women are equal under the law", "Freedom of thought, belief, opinion, and expression", "To guarantee the due legal process under the law"], correct: 3 },
{ question: "Who governs Canada on a daily basis at the federal level?", choices: ["The Premier", "The Governor General", "The King", "The Prime Minister"], correct: 3 },
{ question: "What does the Canadian crown symbolize?", choices: ["A Mari Usque Ad Mare", "Symbols of England, France, Scotland, and Ireland", "RCMP, the National Police Force and one of Canada's best known symbols", "Canada is a constitutional monarchy"], correct: 3 },
{ question: "Who is awarded the honor of Victoria Cross?", choices: ["Canadian politicians", "Police officers", "Best innovation of the year", "A Canadian showing conspicuous bravery or self-sacrifice"], correct: 3 },
{ question: "Federal elections are carried out to elect:", choices: ["The Premier", "The Prime Minister", "The Member of Parliament", "The Senator"], correct: 2 },
{ question: "What is a part of our heritage under the Canadian legal system?", choices: ["Freedom under law", "Democratic principles and due process", "Rule of law", "All of these"], correct: 3 },
{ question: "What is Canada's largest city and main financial center?", choices: ["Vancouver", "Toronto", "Montreal", "Calgary"], correct: 1 },
{ question: "Which of the following describe two responsibilities of provincial or territorial government?", choices: ["Policing and citizenship", "Policing and firefighting", "National defense and highways", "Education and healthcare"], correct: 3 },
{ question: "Where do Inuit people live?", choices: ["Ontario", "Reserve land", "In scattered communities across the Arctic", "Prairie provinces"], correct: 2 },
{ question: "Who contributed to the invention of the radio and also sent the world's first wireless voice message?", choices: ["Reginald Fessenden", "Alexander Graham Bell", "Mike Lazaridis", "Matthew Evans"], correct: 0 },
{ question: "Which region was stormed and captured on D-Day, June 6th, 1944 by Canadian troops?", choices: ["Berlin", "Juno Beach", "London", "Paris"], correct: 1 },
{ question: "Who invented the sport of basketball?", choices: ["Canadians", "French", "Germans", "Americans"], correct: 0 },
{ question: "What are the men who established Canada called?", choices: ["Fathers of Confederation", "Fathers of Dominion of Canada", "Fathers of Canada", "Fathers of Constitution"], correct: 0 },
{ question: "Which of the following describe two responsibilities of federal government?", choices: ["National Defense and Foreign Policy", "National Defense and Firefighting", "Citizenship and maintaining highways", "Healthcare and education"], correct: 0 },
{ question: "In which year was the British Parliament prohibited from buying and selling slaves?", choices: ["1793", "1877", "1807", "1833"], correct: 2 },
{ question: "Who became the first French Canadian Prime Minister since the formation of Confederation?", choices: ["Sir John Alexander Macdonald", "Sir Wilfrid Laurier", "Sir George-Etienne Cartier", "Sir Leonard Tilley"], correct: 1 },
{ question: "Which of the following is the highest court of Canada?", choices: ["A provincial court", "The small claims courts", "The Supreme Court", "The Federal Court"], correct: 2 },
{ question: "Who represents an electoral district?", choices: ["The Commissioner", "The Governor General", "The Lieutenant Governor", "A Member of Parliament"], correct: 3 },
{ question: "Which of the following was invented by Alexander Graham Bell?", choices: ["Blackberry", "Fax machine", "Telephone", "Internet"], correct: 2 },
{ question: "Which sport has the greatest number of registered players in Canada?", choices: ["Lacrosse", "Soccer", "Curling", "Basketball"], correct: 1 },
{ question: "What is celebrated on April 9th?", choices: ["Vimy Day", "Family Day", "Thanksgiving Day", "Boxing Day"], correct: 0 },
{ question: "When was employment insurance introduced by the Canadian federal government?", choices: ["1947", "1950", "1940", "1965"], correct: 2 },
{ question: "What information can be found on a voter information card?", choices: ["Confirms that your name is on the voter's list", "States when you vote", "States where you vote", "All of these"], correct: 3 },
{ question: "Which one of these is the Canadian icon?", choices: ["The national flag", "The crown", "The snowbirds", "The arms"], correct: 2 },
{ question: "What is due process?", choices: ["The government must respect all of the legal rights a person is entitled to under the law", "The rule of law and freedom under the law", "The impartial manner in which the laws are administered", "None of these"], correct: 0 },
{ question: "Who among the following can help you with legal problems?", choices: ["Politicians", "Lawyers", "Members of Parliament", "The police"], correct: 1 },
{ question: "To whom do we profess our loyalty in Canada?", choices: ["The Canadian flag", "A person who represents all Canadians", "Geopolitical entities", "The Canadian Constitution"], correct: 1 },
{ question: "What is the last line of our national anthem?", choices: ["God keep our land glorious and free", "The true north strong and free", "O Canada, our home and native land", "O Canada, we stand on guard for thee"], correct: 3 },
{ question: "The arms that can be seen on dollar bills contain symbols of:", choices: ["Scotland and Ireland", "England and France", "Red maple leaves", "All of these"], correct: 3 },
{ question: "What are the members of the House of Commons also known as?", choices: ["Commissioners", "Members of Parliament or MPs", "Members of the Provincial Parliament", "None of these"], correct: 1 },
{ question: "Who were the United Empire loyalists?", choices: ["People loyal to the crown", "The commanders of armies", "British colonies", "Aboriginal peoples"], correct: 0 },
{ question: "Which of the following governments provides publicly funded education?", choices: ["City government", "Federal government", "Provincial and territorial governments", "None of these"], correct: 2 },
{ question: "When was Canada's first financial institution opened?", choices: ["Early 16th century", "Late 19th century", "Late 18th and early 19th centuries", "Early 18th century"], correct: 2 },
{ question: "The first leader of a responsible government in Canada in 1849 was:", choices: ["Louis Riel", "Sir John Alexander Macdonald", "Sir Louis-Hippolyte La Fontaine", "Alec Baldwin"], correct: 2 },
{ question: "Who are francophones?", choices: ["People speaking French as a first language", "People who come from France", "People who are learning French", "People speaking French as a secondary language"], correct: 0 },
{ question: "Who recommended that Upper and Lower Canada be merged and given a responsible government?", choices: ["Sir Guy Carlton", "Lord Durham", "Sir Louis-Hippolyte La Fontaine", "Sir George-Etienne Cartier"], correct: 1 },
{ question: "How many Canadians served in World War II?", choices: ["More than 1 million", "Less than 500,000", "About 900,000", "About 500,000"], correct: 0 },
{ question: "What language do more than 3/4 of the people who live in Quebec speak?", choices: ["French as their second language", "French as their first language", "German as their first language", "English as their first language"], correct: 1 },
{ question: "What is the National Police Force of Canada?", choices: ["The Royal Canadian Mounted Police", "The Southeast Mounted Police", "The Military Police", "The Northwest Mounted Police"], correct: 0 },
{ question: "The name Canada became the official name of the country in the year:", choices: ["1799", "1773", "1791", "1867"], correct: 2 },
{ question: "What are the three levels of government in Canada?", choices: ["Federal, provincial, and county", "Federal, state, and city", "Federal, provincial or territorial, and municipal", "Federal, provincial, and rural"], correct: 2 },
{ question: "When were female Canadian citizens over the age of 21 granted the right to vote in federal elections?", choices: ["1933", "1928", "1818", "1918"], correct: 3 },
{ question: "For how long was the title Dominion of Canada officially used?", choices: ["100 years", "250 years", "50 years", "200 years"], correct: 0 },
{ question: "How many judges serve in the Supreme Court of Canada?", choices: ["7", "9", "10", "5"], correct: 1 },
{ question: "Who was Sir Sam Steele?", choices: ["A great frontier hero, mounted policeman and soldier of the queen", "A military leader of the Metis in the 19th century", "The first Prime Minister of Canada", "The father of Manitoba"], correct: 0 },
{ question: "The largest religious affiliation in Canada is:", choices: ["Roman Catholic", "Hindu", "Muslim", "Jewish"], correct: 0 },
{ question: "Who suggested the name Dominion of Canada in 1864?", choices: ["Sir Leonard Tilley", "Lord Elgin", "La Fontaine", "Sir John Alexander Macdonald"], correct: 0 },
{ question: "What was significant about the Canadian Navy at the end of the Second World War?", choices: ["It was the third largest navy in the world", "It was the fourth largest navy in the world", "It was the largest navy in the world", "It was the second largest navy in the world"], correct: 0 },
{ question: "Which is the most famous invention of Research In Motion (RIM), a wireless communications company?", choices: ["The Canadarm", "The first wireless voice message", "The Blackberry", "The iPhone"], correct: 2 },
{ question: "What are the Métis people a mixture of?", choices: ["Aboriginal and European ancestry", "European and American ancestry", "American and Indian ancestry", "Inuit and Indian ancestry"], correct: 0 },
{ question: "In 1996 at the Olympic Games, which Canadian became a world record sprinter and double Olympic gold medalist?", choices: ["Wayne Gretzky", "La Fontaine", "Donovan Bailey", "John Cabot"], correct: 2 },
{ question: "Which was the first province in the empire to move towards the abolition of slavery?", choices: ["South Canada", "Upper Canada", "North America", "Lower Canada"], correct: 1 },
{ question: "Which of the following lists contains four rights that Canadians have?", choices: ["The right to go to school, to work, to have a bank account, and to travel", "The right to be educated in either official language, to vote, to apply for a Canadian passport, and to enter and leave Canada freely", "The right to travel, to live anywhere, to work anywhere, and to get married", "The right to have a job, to vote, to drive, and to go to school"], correct: 1 },
{ question: "Which province is connected to mainland Canada by one of the longest continuous multi-span bridges in the world?", choices: ["Prince Edward Island", "Newfoundland and Labrador", "Alberta", "Ontario"], correct: 0 },
{ question: "Who invented the cardiac pacemaker?", choices: ["Gabriel Dumont", "Matthew Evans and Henry Woodward", "Dr. John A. Hopps", "Alexander Graham Bell"], correct: 2 },
{ question: "What is significant about the number of people living in Ontario?", choices: ["They make up two-thirds of all Canadians", "They make up three-quarters of all Canadians", "They make up one-third of all Canadians", "They make up half of all Canadians"], correct: 2 },
{ question: "When asked who must you tell who you voted for in a federal election?", choices: ["A police officer", "Your employer", "An Elections Canada official", "No one"], correct: 3 },
{ question: "Which province has a long history of coal mining, forestry, and agriculture?", choices: ["Nova Scotia", "New Brunswick", "Prince Edward Island", "Ontario"], correct: 0 },
{ question: "Who were the first Aboriginal people living in Canada?", choices: ["American and British", "Spanish", "French and Chinese", "First Nations and Inuits"], correct: 3 },
{ question: "If you are unable to vote on election day, how do you vote?", choices: ["Vote at advanced polls", "Forget it", "Vote the next day after the election", "Vote a week later"], correct: 0 },
{ question: "What is the first line of the Canadian national anthem?", choices: ["O Canada, our home and native land", "O Canada, land of our ancestors", "O Canada, we stand on guard for thee", "O Canada, glorious and free"], correct: 0 },
{ question: "What song is Canada's national anthem?", choices: ["God Save the Queen or King", "O Canada", "Oh Canada", "Great Canada"], correct: 1 },
{ question: "Which of the following people is considered a Father of Confederation?", choices: ["Steven Harper", "Pierre Trudeau", "Alexander McKenzie", "Sir John Alexander Macdonald"], correct: 3 },
{ question: "What is the meaning of the phrase 'the world's longest undefended border'?", choices: ["Canada exports billions of dollars worth of energy products to the USA", "Canada enjoys close relations with the United States", "Over three-quarters of Canadian exports are destined for the USA", "Millions of Canadians and Americans cross the border every year in safety"], correct: 3 },
{ question: "When was the first representative assembly in Canada elected?", choices: ["1791", "1758", "1889", "1609"], correct: 1 },
{ question: "Which of the following are the provinces responsible for?", choices: ["Defense", "Foreign policy", "Currency", "Education"], correct: 3 },
{ question: "How is Canada ranked in terms of geographical size in the world?", choices: ["It is the largest country on Earth", "It is the second largest country on Earth", "It is the third largest country on Earth", "It is the seventh largest country on Earth"], correct: 1 },
{ question: "When is Labour Day celebrated in Canada?", choices: ["1st of July", "1st Monday of September", "1st of May", "3rd Monday of October"], correct: 1 },
{ question: "What did the government do to make immigration to Western Canada easier?", choices: ["Use the Great Lakes and Seaway to prairies", "Built a railway across the prairies", "Built a highway across the prairies", "Dig a tunnel"], correct: 1 },
{ question: "What are the three main groups of Aboriginal peoples?", choices: ["Metis, Inuit and United Empire Loyalists", "Acadians, Metis and First Nations", "Early French settlers, Metis and Indian", "Metis, First Nations, and Inuit"], correct: 3 },
{ question: "Which trade spread across Canada making it important to the economy for over 300 years?", choices: ["Beaver fur trade", "Fisheries", "Lumber", "Gold"], correct: 0 },
{ question: "What does the Governor General perform?", choices: ["After an election, invites the party with the most votes to form the new government", "Signs bills to make them law", "All of these", "None of these"], correct: 2 },
{ question: "When was the Official Languages Act passed?", choices: ["1969", "1867", "1982", "2000"], correct: 0 },
{ question: "What does BNA stand for?", choices: ["British National Alliance", "British North America Act", "Black Nation Alliance", "Bank of National Association"], correct: 1 },
{ question: "How many levels of government are there in Canada?", choices: ["10", "5", "13", "3"], correct: 3 },
{ question: "How are laws passed?", choices: ["Signed by the Governor General", "Read by the House of Commons three times", "Read by the Senate three times", "All of these"], correct: 3 },
{ question: "What does official language rights and minority language educational rights mean?", choices: ["English is more important than French in Canada", "French is more important in Quebec and English is more important in other provinces", "All languages have equal status in Canada's government", "French and English have equal status in Parliament and throughout the government"], correct: 3 },
{ question: "From whom is Canada's tallest mountain named?", choices: ["William Logan", "Louis Riel", "Terry Fox", "Wayne Gretzky"], correct: 0 },
{ question: "Who signs the bills to make them law?", choices: ["The Police Chief", "The Governor General", "The Premier", "The Prime Minister"], correct: 1 },
{ question: "What is a noble way to contribute to Canada and an excellent career choice?", choices: ["Serve in the regular Canadian forces", "Serve on a jury", "Belong to a union", "Learn both official languages"], correct: 0 },
{ question: "Which province is Canada's leading wheat producer?", choices: ["Manitoba", "New Brunswick", "Alberta", "Saskatchewan"], correct: 3 },
{ question: "What does a Member of Parliament do?", choices: ["Links Canadians to the federal government", "Represents the King", "Works for the Governor General", "Liaises with the municipal government"], correct: 0 },
{ question: "Which of the following are Canada's famous writers?", choices: ["Sir Ernest MacMillan and Healey Willan", "Paul Henderson and Mark Tewksbury", "Joy Kogawa, Michael Ondaatje and Rohinton Mistry", "Emily Carr and Louis-Philippe Hebert"], correct: 2 },
{ question: "Sir Louis-Hippolyte La Fontaine was known for:", choices: ["A champion of democracy and Aboriginal rights", "A champion of democracy and French language rights and the first leader of a responsible government in Canada", "The first Head of State", "The first French-speaking Prime Minister"], correct: 1 },
{ question: "What document made Confederation legal?", choices: ["The Immigration Act", "The British North America Act", "The Citizenship Act", "The Charter of Rights and Freedoms"], correct: 1 },
{ question: "Which port is the largest and busiest in Canada?", choices: ["Port of Halifax", "Port of Montreal", "Port of Vancouver", "Port of Victoria"], correct: 2 },
{ question: "What did the Canadian Pacific Railway symbolize?", choices: ["Easy access to the west coast", "What can be achieved by working together", "Unity", "Ribbons of steel"], correct: 2 },
{ question: "What part of the Constitution legally protects basic rights and freedom of Canadians?", choices: ["The Canada Charter of Responsibilities", "The Constitution of Rights and Freedoms", "The Canadian Charter of Rights and Freedoms", "The Canadian Charter of Rights and Free Will"], correct: 2 },
{ question: "Who started the Marathon of Hope?", choices: ["Rick Hansen", "James Naismith", "Sir Sam Steele", "Terry Fox"], correct: 3 },
{ question: "What are some of the rights and privileges of a Canadian citizen?", choices: ["The right to be a candidate", "The right to vote in federal, provincial, and territorial elections", "The right to enter, remain in, or leave Canada", "All of these"], correct: 3 },
{ question: "How many votes can a voter have in a federal election?", choices: ["It does not matter", "3", "2", "1"], correct: 3 },
{ question: "How much of Canadian exports are destined for the USA?", choices: ["Over 1/3", "Over 3/4", "2/3", "Half"], correct: 1 },
{ question: "Where do you go to vote?", choices: ["Polling station", "City Hall", "Police station", "Fire station"], correct: 0 },
{ question: "As what have poets and songwriters hailed Canada?", choices: ["Peace, order, and good government", "The great outdoors", "The great dominion", "The land of the brave"], correct: 2 },
{ question: "Where did the early European settlers live?", choices: ["Western Canada", "Northwest Canada", "Northern Canada", "Eastern and Central Canada"], correct: 3 },
{ question: "Canadians work hard to respect?", choices: ["Marxism", "Pluralism", "Capitalism", "Individualism"], correct: 1 },
{ question: "Which of the following was a key phrase in the British North America Act, Canada's original constitutional document in 1867?", choices: ["Geopolitical entity", "Trade and communications", "Peace, order, and good government", "Discipline, education, and good public"], correct: 2 },
{ question: "Today, diversity enriches the lives of Canadians. Where is diversity reflected the most?", choices: ["Countryside areas", "Cities", "Towns", "Mountains"], correct: 1 },
{ question: "What does MLA stand for?", choices: ["Member of Legal Aid", "Member of the Legislative Assembly", "Member of Land Association", "Member of Land Aid"], correct: 1 },
{ question: "Who do provincial members of the legislative or national assemblies represent?", choices: ["Federal and provincial governments", "Everyone who lives in the federal electoral district", "Everyone who lives in the provincial or territorial electoral district", "Everyone who lives in the municipal electoral district"], correct: 2 },
{ question: "What is a ballot?", choices: ["A form that tells you when and where to vote", "A dance", "A form for voting", "A form to count the number of votes"], correct: 2 },
{ question: "Who elects the members to the House of Commons in Ottawa and to the provincial and territorial legislatures?", choices: ["The government employees", "The government", "The Prime Minister", "The people"], correct: 3 },
{ question: "Name two important documents that describe our rights and freedoms.", choices: ["The Canadian Constitution and English Common Law", "The Civil Code of France and the Canadian Constitution", "The Canadian Charter of Rights and Freedoms and Magna Carta, the Great Charter of Freedoms", "Laws passed by Parliament and English Common Law"], correct: 2 },
{ question: "What is the final step before a bill becomes law?", choices: ["Approved by the King", "Approved by the Prime Minister", "Approved by the Governor General", "Approved by a judge"], correct: 2 },
{ question: "When you vote on election day, what do you do?", choices: ["Go to the voting station, tell them who you are, and mark your X. Give the ballot back to the attendant", "Go to the voting station. Remove one ballot. Mark your X and deposit it in the ballot box", "Go to the voting station. Take your voter's card with proof of identity. Highlight your choice on the ballot and deposit it in the box", "Go to the voting station. Take your voter information card and ID. Mark an X next to your chosen candidate. Fold the ballot and present it to the poll officials who will tear off the ballot number and give you the ballot to deposit in the box"], correct: 3 },
{ question: "Which of the following criteria give a Canadian the right to vote?", choices: ["Owning a house", "Being on an official voter's list", "Having a driver's license", "Being an immigrant"], correct: 1 },
{ question: "Which legal documents protect the rights of Canadians with regards to the official languages?", choices: ["British Charter of Rights and Freedoms", "Canadian Constitution and Official Languages Act", "Canadian Languages Act", "Official English Act"], correct: 1 },
{ question: "What is the government responsible for all of Canada called?", choices: ["The National Assembly", "The Legislature", "The Federal Government", "The Council"], correct: 2 },
{ question: "What is the most popular spectator sport of Canada?", choices: ["Soccer", "Canadian football", "Hockey", "Basketball"], correct: 2 },
{ question: "Which of the following represents protecting and enjoying the heritage and environment in Canada?", choices: ["Government responsibilities", "Citizenship responsibilities and the laws of Canada", "Laws of Canada", "Citizenship responsibilities"], correct: 3 },
{ question: "Who are the Quebecois?", choices: ["All the French-speaking people in Canada are called Quebecois", "They form a nation within a united Canada", "They are descendants of British settlers who live in Quebec", "They are the Canadians who only speak French"], correct: 1 },
{ question: "Approximately how many Canadians served in the First World War?", choices: ["About 170,000", "About 10,000", "More than 60,000", "More than 600,000"], correct: 3 },
{ question: "When must federal elections be held?", choices: ["Whenever the Prime Minister calls the election", "About every four years", "When the MPs want a new Prime Minister", "On the third Monday in October every four years following the most recent general election"], correct: 3 },
{ question: "Which phrase embodied the vision for the Dominion of Canada?", choices: ["The land of the strong and free", "Dominion from sea to sea and from the river to the ends of the earth", "Dominion from ocean to ocean", "Oh Canada, my home and native land"], correct: 1 },
{ question: "How are your rights and freedoms protected?", choices: ["By the Charter of Rights and Freedoms", "By the King", "By citizenship", "None of these"], correct: 0 },
{ question: "Which of the following statements is true regarding Canada's membership in international organizations?", choices: ["Canada is a founding member of the United Nations but not of NATO", "Canada is a founding member of NATO but not of the United Nations", "Canada is a founding member of both the United Nations and NATO", "Canada is not a founding member of either the United Nations or NATO"], correct: 2 },
{ question: "Who do Canadians vote for in a federal election?", choices: ["A candidate whom they want to represent them in parliament", "All candidates in their electoral district", "The best speaker running the election campaign", "Someone to become the Premier of the province"], correct: 0 },
{ question: "What year was Confederation?", choices: ["1867", "1768", "1876", "1786"], correct: 0 },
{ question: "Which of the following is the responsibility of the federal government?", choices: ["Highways", "Currency", "Health", "Education"], correct: 1 },
{ question: "What is an electoral district?", choices: ["A geographical area where the politicians reside", "An area where politicians work", "A geographical area represented by a member of the House of Commons", "The area where voting takes place in your locality"], correct: 2 },
{ question: "What is the capital city of Canada?", choices: ["Ottawa", "Victoria", "Toronto", "Ontario"], correct: 0 },
{ question: "What did the fathers of Confederation do to establish Canada?", choices: ["They worked together to create a new country, the Dominion of Canada", "They were explorers who organized an expedition to survey northern Canada", "They formed a republic state in Canada", "They were a group of politicians who attempted to join Canada to the United States"], correct: 0 },
{ question: "Which province is the most easterly point in Canada?", choices: ["Prince Edward Island", "New Brunswick", "Nova Scotia", "Newfoundland and Labrador"], correct: 3 },
{ question: "Where is Canada's largest naval base located?", choices: ["Vancouver", "Quebec City", "Halifax", "Toronto"], correct: 2 },
{ question: "Which one of the following is the most populated province in Canada?", choices: ["Quebec", "British Columbia", "Ontario", "Alberta"], correct: 2 },
{ question: "Why did thousands of miners come to the Yukon in the 1890s?", choices: ["To build the Yukon Railway", "For the gold rush", "Because of the discovery of oil", "To build the Pacific Railway"], correct: 1 },
{ question: "Julia is a descendant of French colonists in the maritime province. What is she called?", choices: ["Metis", "Acadian", "Inuit", "Indian"], correct: 1 },
{ question: "Which of the following symbolizes close ties between Canada and the US?", choices: ["The Peace Arch in Blaine, Washington", "Statue of Liberty in New York", "International Peace Garden crossing between Canada and the United States", "White Pass in Yukon"], correct: 0 },
{ question: "When did Canada's modern energy industry begin?", choices: ["The economic boom of the 1890s and early 1900s", "After the War of 1812", "Since the discovery of oil in Alberta in 1947", "After the Second World War"], correct: 2 },
{ question: "Who was the first female member of Parliament?", choices: ["Agnes Macphail", "Mary Ann Shadd Cary", "Laura Secord", "Alice Munro"], correct: 0 },
{ question: "The Peace Tower was built in memory of", choices: ["The First World War", "The Second World War", "The Korean War", "The Battle of the Plains of Abraham"], correct: 0 },
{ question: "In 1939, Canada joined with its democratic allies to fight", choices: ["The USA", "Japan", "The Nazis", "Korea"], correct: 2 },
{ question: "How many Canadians have died in wars till now?", choices: ["60,000", "110,000", "More than 1 million", "40,000"], correct: 1 },
{ question: "Name a Canadian heroine who warned James Fitzgibbon of a planned American attack during the War of 1812.", choices: ["Agnes Macphail", "Mary Ann Shadd Cary", "Laura Secord", "Alice Munro"], correct: 2 },
{ question: "In what year did Newfoundland and Labrador join Canada?", choices: ["1867", "1955", "1949", "1880"], correct: 2 },
{ question: "What was made in 1927 after World War I?", choices: ["The National War Memorial in Ottawa", "The Peace Arch between the United States and Canada", "The CN Tower in Toronto", "The Peace Tower"], correct: 3 },
{ question: "Can you send someone else or skip your duty if you are called to serve on a jury?", choices: ["Yes, you can send your spouse to serve on your behalf", "No. Jury duty is a responsibility of citizenship that cannot be transferred or skipped", "Yes, you can skip jury duty if you inform the court in advance", "No, but you can hire someone to serve on the jury for you"], correct: 1 }
];


/* ==========================
   SHUFFLE HELPERS
   ========================== */

// Shuffle the array of objects
function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

// Shuffle both questions and their choices
function shuffleQuestionsAndChoices() {
    // First, shuffle the questions
    let shuffledQuestions = shuffleArray(originalQuestions).slice(0, 20);  // Get 20 random questions

    // Shuffle choices within each question and adjust correct answer
    questions = shuffledQuestions.map(q => {
        const choicesObj = q.choices.map((c, i) => ({ text: c, isCorrect: i === q.correct }));
        const shuffledChoicesObj = shuffleArray(choicesObj);
        const newCorrectIndex = shuffledChoicesObj.findIndex(c => c.isCorrect);

        return {
            question: q.question,
            choices: shuffledChoicesObj.map(c => c.text),
            correct: newCorrectIndex
        };
    });

    // Shuffle the questions themselves (already done above but ensuring randomness)
    questions = shuffleArray(questions);
}

/* ==========================
    HAPTIC FEEDBACK (FOR MOBILE)
   ========================== */
   
function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(20); // tiny buzz, not a chainsaw 😏
  }
}

/* ==========================
   QUIZ STATE
   ========================== */
let questions = [];
let currentQuestion = 0;
let userAnswers = [];
let TOTAL_TIME = 45 * 60; // 45 minutes
let remainingTime = TOTAL_TIME;
let timerInterval;
let swipeEnabled = true;

const quizDiv = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (!swipeEnabled) return; // nope 🚫

  const swipeDistance = touchEndX - touchStartX;
  if (Math.abs(swipeDistance) < 50) return;

  saveAnswer();

  if (swipeDistance < 0 && currentQuestion < questions.length - 1) {
    vibrate();
    currentQuestion++;
    loadQuestion();
  } else if (swipeDistance > 0 && currentQuestion > 0) {
    vibrate();
    currentQuestion--;
    loadQuestion();
  }
}

/* ==========================
   TIMER
   ========================== */
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime < 0) {
            clearInterval(timerInterval);
            alert("Time is up! The quiz will be submitted automatically.");
            endQuiz();
            return;
        }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
    const seconds = String(remainingTime % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `Time Remaining: ${minutes}:${seconds}`;
}

/* ==========================
   CALCULATE MAX QUESTION HEIGHT
   ========================== */
function calculateTallestQuestionHeight() {
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.width = quizDiv.offsetWidth + 'px';
    tempDiv.style.padding = '20px';
    document.body.appendChild(tempDiv);

    let maxHeight = 0;
    questions.forEach(q => {
        tempDiv.innerHTML = `
            <div class="question">${q.question}</div>
            <div class="choices">
                ${q.choices.map(c => `<label>${c}</label>`).join('')}
            </div>
        `;
        if (tempDiv.offsetHeight > maxHeight) maxHeight = tempDiv.offsetHeight;
    });

    document.body.removeChild(tempDiv);
    return maxHeight;
}

/* ==========================
   LOAD QUESTION
   ========================== */
function loadQuestion() {
    const q = questions[currentQuestion];
    const savedAnswer = userAnswers[currentQuestion];

    const progressPercent = Math.round(((currentQuestion) / questions.length) * 100);

    quizDiv.innerHTML = `
        <div class="question-counter">Question ${currentQuestion + 1} of ${questions.length}</div>
        <div class="progress-bar" style="background: #e0e0e0; border-radius: 5px; overflow: hidden; height: 12px; margin-bottom: 15px;">
            <div style="width: ${progressPercent}%; height: 100%; background: #007bff;"></div>
        </div>
        <div class="question">${q.question}</div>
        <div class="choices">
            ${q.choices.map((choice, i) => `
                <label>
                    <input type="radio" name="choice" value="${i}" ${savedAnswer === i ? "checked" : ""}>
                    ${choice}
                </label>
            `).join("")}
        </div>
    `;

    // Fix height for all questions
    quizDiv.style.minHeight = tallestHeight + "px";
    quizDiv.style.maxHeight = tallestHeight + "px";
    quizDiv.style.overflow = "hidden";

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Score Quiz" : "Next";

    // Auto-advance listener
    document.querySelectorAll('input[name="choice"]').forEach(input => {
        input.addEventListener('change', (e) => {
            saveAnswer();

            // highlight the selected label
            const label = e.target.closest('label');
            label.classList.add('selected');

            setTimeout(() => {
                label.classList.remove('selected');

                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    loadQuestion();
                } else {
                    endQuiz();
                }
            }, 200); // 0.2 second delay
        });
    });
}

/* ==========================
   SAVE ANSWER
   ========================== */
function saveAnswer() {
    const selected = document.querySelector('input[name="choice"]:checked');
    userAnswers[currentQuestion] = selected ? parseInt(selected.value) : undefined;
}

/* ==========================
   NAV BUTTONS
   ========================== */
prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        saveAnswer();
        currentQuestion--;
        loadQuestion();
    }
});

nextBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        endQuiz();
    }
});

/* ==========================
   END QUIZ
========================== */
function endQuiz() {
    swipeEnabled = false;
    clearInterval(timerInterval);

    let wrongAnswers = 0;
    let reviewHTML = "";

    questions.forEach((q, i) => {
        const ans = userAnswers[i];
        const correct = q.correct;
        reviewHTML += `<div class="review-item">
            <strong>${i + 1}. ${q.question}</strong>
            <div class="${ans === correct ? 'correct' : 'wrong'}">
                Your answer: ${ans !== undefined ? q.choices[ans] : 'No answer selected'}
            </div>
            ${ans !== correct ? `<div class="correct">Correct answer: ${q.choices[correct]}</div>` : ''}
        </div>`;
        if (ans !== correct) wrongAnswers++;
    });

    const total = questions.length;
    const correctCount = total - wrongAnswers;
    const percentage = Math.round((correctCount / total) * 100);
    const passed = wrongAnswers < 6;
    const totalElapsed = TOTAL_TIME - remainingTime;
    const minutes = Math.floor(totalElapsed / 60);
    const seconds = totalElapsed % 60;

    quizDiv.innerHTML = `


        <div class="result ${passed ? 'pass' : 'fail'}">
            Result: ${passed ? 'PASS' : 'FAIL'}<br>
            Correct: ${correctCount} / ${total}<br>
            Wrong: ${wrongAnswers}<br>
            Percentage: ${percentage}%<br>
            Time Taken: ${minutes} min ${seconds} sec
        </div>

        <!-- Top buttons -->
        <div class="top-buttons" style="text-align:center; margin-bottom:20px;">
            <button onclick="window.location.href='index.html'">Home</button>
            <button onclick="window.location.href='history.html'">History Quiz</button>
            <button onclick="window.location.href='dates.html'">Dates Quiz</button>
            <button onclick="window.location.href='general.html'">General Quiz</button>
        </div>

        <div class="review"><h3>Quiz Review</h3>${reviewHTML}</div>
    `;

    nextBtn.textContent = "Retake Quiz";
    nextBtn.classList.add("retake");
    nextBtn.onclick = resetQuiz;
    prevBtn.style.display = "none";

     // 🎉 Confetti if passed
    if (passed && typeof confetti === "function") {
        const duration = 4000;
        const animationEnd = Date.now() + duration;

        const defaults = {
            spread: 120,
            ticks: 60,
            zIndex: 9999,
            origin: { y: 1 }
        };

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            confetti({
                ...defaults,
                particleCount: 50 + Math.floor(Math.random() * 20),
                scalar: 1.5 + Math.random() * 0.3,
                origin: { x: 0.5 + (Math.random() - 0.5) * 0.2, y: 1 }
            });
        }, 250);
    }

}

/* ==========================
   RESET QUIZ
   ========================== */
function resetQuiz() {
    swipeEnabled = true;
    shuffleQuestionsAndChoices();
    currentQuestion = 0;
    userAnswers = [];
    remainingTime = TOTAL_TIME;
    nextBtn.classList.remove("retake");
    prevBtn.style.display = "inline-block";

    // Recalculate tallest question height
    const newTallestHeight = calculateTallestQuestionHeight();
    quizDiv.style.minHeight = newTallestHeight + "px";
    quizDiv.style.maxHeight = newTallestHeight + "px";
    quizDiv.style.overflow = "hidden";

    startTimer();
    loadQuestion();
}

/* ==========================
   START QUIZ
   ========================== */
shuffleQuestionsAndChoices(); // Randomize questions and choices
const tallestHeight = calculateTallestQuestionHeight(); // initial question set
startTimer();
loadQuestion();