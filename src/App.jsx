import { useState, useEffect, useRef } from "react";

// ── WHIMSICAL DESIGN SYSTEM ─────────────────────────────────────────────────
const theme = {
  cream: "#fdf8f0",
  parchment: "#f5eedc",
  lavender: "#c8b8e8",
  lavenderDeep: "#8b6fc4",
  lavenderSoft: "#f0ebfa",
  sage: "#7aaa88",
  sageDeep: "#3d6b4a",
  sageSoft: "#e8f4ec",
  coral: "#e8826a",
  coralSoft: "#fdf0ec",
  amber: "#d4954a",
  amberSoft: "#fdf3e4",
  rose: "#e8a0b0",
  roseSoft: "#fdf0f4",
  text: "#2a1f14",
  muted: "#8a7a6a",
  border: "#e4d8c8",
  hackGreen: "#4a8a5a",
  hackBg: "#eaf5ec",
  hackBorder: "#9acc9a",
  white: "#fff",
};

// SVG botanical decorations
const Sprig = ({ color = theme.sage, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M12 21 Q12 12 12 3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 16 Q8 13 5 14" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M12 13 Q16 10 19 11" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M12 10 Q9 7 7 8" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="5" cy="14" r="1.5" fill={color} opacity="0.7"/>
    <circle cx="19" cy="11" r="1.5" fill={color} opacity="0.7"/>
    <circle cx="7" cy="8" r="1.5" fill={color} opacity="0.7"/>
  </svg>
);

const Butterfly = ({ color = theme.lavenderDeep, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M12 12 Q6 6 2 8 Q4 14 12 12Z" fill={color} opacity="0.7"/>
    <path d="M12 12 Q18 6 22 8 Q20 14 12 12Z" fill={color} opacity="0.7"/>
    <path d="M12 12 Q7 15 4 18 Q8 20 12 14Z" fill={color} opacity="0.5"/>
    <path d="M12 12 Q17 15 20 18 Q16 20 12 14Z" fill={color} opacity="0.5"/>
    <circle cx="12" cy="12" r="1.5" fill={color}/>
  </svg>
);

const Flower = ({ color = theme.rose, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <circle cx="12" cy="8" r="3" fill={color} opacity="0.7"/>
    <circle cx="16" cy="12" r="3" fill={color} opacity="0.7"/>
    <circle cx="12" cy="16" r="3" fill={color} opacity="0.7"/>
    <circle cx="8" cy="12" r="3" fill={color} opacity="0.7"/>
    <circle cx="12" cy="12" r="3" fill={theme.amber} opacity="0.9"/>
  </svg>
);

const Sparkle = ({ color = theme.amber }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color}/>
  </svg>
);

// ── RECIPE DATA ─────────────────────────────────────────────────────────────
const DEFAULT_RECIPES = [
  {
    id: 1, name: "Tabbouleh", emoji: "🌿", category: "dinner", tags: ["vegetarian","salad","meal-prep","summer","sides"],
    protein: 5, fiber: 5, gi: 42, servings: 4, prepTime: 20, cookTime: 0,
    glycemicHack: false, grabAndGo: true, athleteFriendly: false, shawnFriendly: true,
    source: "The Pioneer Woman",
    ingredients: ["¾ cup medium-grind bulgur","¾ cup boiling water","4 cups flat-leaf parsley, finely chopped","½ cup mint, finely chopped","4 green onions, finely chopped","1 vine tomato, seeded and finely chopped","½ English cucumber, seeded and finely chopped","¼ cup fresh lemon juice","2 tbsp olive oil","1 garlic clove, grated","½ tsp ground cumin","Black pepper to taste"],
    instructions: "Pour boiling water over bulgur, cover and let sit 20 min. Fluff and cool. Combine all chopped veg and herbs. Whisk lemon juice, olive oil, garlic, cumin and pepper. Toss everything. Refrigerate 30 min before serving.",
    amyNote: "Reduce salt — the lemon and cumin carry the flavour beautifully. Better the next day.",
    prepTasks: [{when:"Day of / ahead", task:"Soak bulgur (20 min hands-off)"},{when:"Ahead", task:"Better the next day — make it Sunday for Monday!"}],
    hackNote: null,
  },
  {
    id: 2, name: "Chicken Fajita Rice Bake", emoji: "🍳", category: "dinner", tags: ["chicken","one-pan","meal-prep","beans","bowl-base"],
    protein: 38, fiber: 7, gi: null, servings: 6, prepTime: 15, cookTime: 40,
    glycemicHack: true, grabAndGo: true, athleteFriendly: true, shawnFriendly: true,
    source: "Eating Well",
    ingredients: ["2 tbsp avocado oil","1½ lbs boneless skinless chicken thighs, 1-inch pieces","2 bell peppers (red & orange), sliced","1 yellow onion, sliced","1 tbsp salt-free Southwest chipotle seasoning","3½ cups cooked-and-cooled brown rice ✦","2 × 10 oz cans no-salt-added diced tomatoes & green chiles","1 × 15 oz can no-salt-added pinto beans, rinsed","1½ cups Cheddar-Jack, shredded","Radishes, cilantro, lime for serving"],
    instructions: "Preheat 400°F. Brown chicken in oven-safe skillet 5-6 min. Remove. Cook peppers and onions 4-5 min with seasoning. Add pre-cooled rice, tomatoes, beans and half the cheese. Nestle chicken on top. Top with remaining cheese. Bake 20-25 min until bubbly.",
    amyNote: "Use no-salt-added tomatoes and pinto beans. The ✦ rice hack is essential here for managing glycemic load.",
    prepTasks: [{when:"Night before", task:"Cook rice, spread on tray, refrigerate overnight ✦"},{when:"Night before", task:"Slice peppers and onion, refrigerate"},{when:"Day of", task:"Assemble and bake (40 min)"}],
    hackNote: "Cook rice the night before, cool on a tray, refrigerate. Add it cold to the bake. Reheated resistant starch = lower glycemic impact. 🌿",
  },
  {
    id: 3, name: "Ground Turkey Fajita Bowls", emoji: "🥙", category: "dinner", tags: ["turkey","bowl","meal-prep","grab-and-go","athlete-friendly"],
    protein: 28, fiber: 8, gi: 40, servings: 4, prepTime: 10, cookTime: 30,
    glycemicHack: true, grabAndGo: true, athleteFriendly: true, shawnFriendly: true,
    source: "Eating Well",
    ingredients: ["1½ tbsp olive oil","1 large white onion, sliced","2 red bell peppers, sliced","1 cup corn kernels","1 lb lean ground turkey","1 cup pico de gallo","½ cup no-salt-added chicken broth","1½ tsp chili powder","1 tsp cumin","1½ tsp garlic powder","2 cups brown rice (cook-cool-reheat ✦)","1 large avocado","Greek yogurt (sub for sour cream)","Fresh cilantro + lime"],
    instructions: "Cook onion, peppers and corn with half the spices 5-7 min. Remove. Cook turkey with remaining spices until done. Add pico and broth; simmer 3 min. Serve over pre-cooled-and-reheated rice with all toppings.",
    amyNote: "Greek yogurt instead of sour cream adds protein. Double the batch for 4 days of grab-and-go lunches.",
    prepTasks: [{when:"Night before", task:"Cook rice, cool on tray, refrigerate ✦"},{when:"Day of", task:"Slice peppers and onion"},{when:"Meal prep tip", task:"Double batch — store components separately for the week"}],
    hackNote: "Pre-cook and cool the rice overnight. The resistant starch that forms reduces the glycemic load when reheated.",
  },
  {
    id: 4, name: "Lemon Chicken & Rice Skillet", emoji: "🍋", category: "dinner", tags: ["chicken","one-pan","high-protein","spinach"],
    protein: 43, fiber: 6, gi: 52, servings: 4, prepTime: 10, cookTime: 30,
    glycemicHack: true, grabAndGo: false, athleteFriendly: true, shawnFriendly: true,
    source: "Eating Well",
    ingredients: ["1 lb chicken breasts, thinly sliced","2 tsp Italian seasoning","3 tbsp olive oil","⅓ cup shallot, chopped","6 cloves garlic, chopped","1 tsp fresh thyme","¼ tsp crushed red pepper","3½ cups cooked-and-cooled brown rice ✦","½ cup no-salt-added chicken broth","½ cup heavy cream","5 cups baby spinach","½ cup grated Parmesan","Zest and juice of 1 large lemon"],
    instructions: "Season and sear chicken 5-6 min per side; slice. Cook shallot, garlic and thyme in same pan. Add pre-cooled rice, broth and cream; simmer 3 min. Stir in spinach until wilted. Add Parmesan, lemon zest and juice. Return chicken on top.",
    amyNote: "43g protein per serving — excellent for your daily targets. No-salt-added broth always.",
    prepTasks: [{when:"Night before", task:"Cook rice, cool, refrigerate ✦"},{when:"Day of", task:"Zest lemon, chop shallot and garlic"},{when:"Day of", task:"One pan, 30 min"}],
    hackNote: "Use pre-cooked-and-cooled rice from the fridge instead of fresh — lowers the glycemic index significantly.",
  },
  {
    id: 5, name: "Butternut Squash Mac & Cheese", emoji: "🧡", category: "dinner", tags: ["pasta","vegetarian","comfort","family","glycemic-hack"],
    protein: 16, fiber: 3, gi: 55, servings: 10, prepTime: 15, cookTime: 20,
    glycemicHack: true, grabAndGo: false, athleteFriendly: true, shawnFriendly: true,
    source: "Allrecipes",
    ingredients: ["1 × 16 oz rotini pasta ✦ (cook the night before!)","2 tbsp butter","2 tbsp flour","1 tsp garlic powder","1 tsp onion powder","½ tsp dry mustard","⅛ tsp nutmeg","2 cups milk","3 cups butternut squash, cooked and mashed","6 oz white Cheddar, shredded","6 oz Cheddar, shredded","Pepper to taste","¼ cup breadcrumbs (optional)"],
    instructions: "Cook pasta, drain, spread on tray and COOL COMPLETELY or refrigerate overnight ✦. Make sauce: melt butter, whisk in flour and spices, gradually add milk until smooth. Stir in mashed squash and cheeses. Add cold pasta and reheat gently. Breadcrumb topping: broil 2-3 min.",
    amyNote: "The squash adds real fibre and vitamins while stretching the cheese further. This is THE glycemic hack showpiece recipe.",
    prepTasks: [{when:"Night before", task:"Cook pasta, drain, cool on sheet pan, refrigerate ✦ — this is the big one!"},{when:"Night before", task:"Roast and mash butternut squash, refrigerate"},{when:"Day of", task:"Make cheese sauce (15 min), add cold pasta, reheat"}],
    hackNote: "THE glycemic hack superstar ✦. Cook pasta, cool completely overnight, reheat in cheese sauce. The resistant starch formed during cooling dramatically lowers the glycemic index. Do this every single time you make pasta.",
  },
  {
    id: 6, name: "One-Pan Chicken Florentine", emoji: "🐓", category: "dinner", tags: ["chicken","spinach","low-carb","one-pan","quick"],
    protein: 28, fiber: 3, gi: 36, servings: 4, prepTime: 5, cookTime: 25,
    glycemicHack: false, grabAndGo: false, athleteFriendly: false, shawnFriendly: true,
    source: "Eating Well",
    ingredients: ["2 tbsp olive oil","1 lb chicken breast, thinly sliced","½ tsp black pepper","¼ cup shallot, chopped","2 cloves garlic, minced","⅓ cup dry white wine","1 lb baby spinach","⅓ cup heavy cream","2 tsp cornstarch","Feta crumbles (Amy's upgrade)","Squeeze of lemon to finish"],
    instructions: "Cook chicken in oil 3-4 min per side. Remove. Cook shallot and garlic. Add wine; simmer 2 min. Add spinach in batches until wilted. Whisk cream and cornstarch; stir in and simmer until thick. Return chicken. Finish with feta and lemon.",
    amyNote: "Add feta — reviewers unanimously agreed it needs the punch. A squeeze of lemon at the end transforms it. GI of 36 — lowest in your library!",
    prepTasks: [{when:"Day of", task:"Slice chicken thin (5 min)"},{when:"Day of", task:"Everything in one pan, 25 min"},{when:"Tip", task:"Crumble feta generously — it needs it"}],
    hackNote: null,
  },
  {
    id: 7, name: "Grilled Chicken Summer Salad", emoji: "🥗", category: "dinner", tags: ["chicken","salad","summer","quick","grilling"],
    protein: 37, fiber: 5, gi: 31, servings: 4, prepTime: 10, cookTime: 15,
    glycemicHack: false, grabAndGo: false, athleteFriendly: false, shawnFriendly: true,
    source: "Crunchy Creamy Sweet",
    ingredients: ["2 chicken breasts, grilled","2 cobs corn, grilled and cut off cob","1 avocado, sliced","4 cups Romaine lettuce, chopped","2 cups cherry tomatoes, halved","½ cup red onion, chopped","¼ cup olive oil","4 tbsp apple cider vinegar","½ tsp dried oregano","Black pepper","Sumac or za'atar (Amy's upgrade)","Pepitas for crunch"],
    instructions: "Grill chicken; rest 5 min then slice. Grill corn until lightly charred; cut off cob. Combine lettuce, tomatoes, onion. Whisk oil, vinegar, oregano and pepper. Add chicken, corn and avocado. Drizzle dressing, toss gently. Finish with sumac and pepitas.",
    amyNote: "The base recipe is a little bland — sumac, za'atar and pepitas make it sing. GI 31, the second lowest in your library. Perfect summer dinner.",
    prepTasks: [{when:"Day before / ahead", task:"Grill extra chicken — use for this + other meals"},{when:"Day of", task:"Grill corn (10 min), assemble (5 min)"},{when:"Tip", task:"Make dressing in a jar — keeps all week in the fridge"}],
    hackNote: null,
  },
];

const BREAKFASTS = [
  { id: "b1", name: "Protein Smoothie Pack", emoji: "💜", tags: ["protein-powder","quick","Amy","grab-and-go"], protein: 40, fiber: 9, prepAhead: true, note: "Prep 5 bags Sunday — frozen spinach, mango, banana half, flaxseed. Blend with almond milk + protein powder each morning." },
  { id: "b2", name: "Banana Protein Muffins", emoji: "🍌", tags: ["protein-powder","bake-ahead","grab-and-go","snack"], protein: 18, fiber: 3, prepAhead: true, note: "Batch bake Sunday. Ripe bananas + protein powder + oats + almond butter. Freeze half for later in the week." },
  { id: "b3", name: "Greek Yogurt Power Bowl", emoji: "🫐", tags: ["quick","high-protein","no-cook"], protein: 25, fiber: 4, prepAhead: false, note: "Greek yogurt + berries + hemp hearts + a drizzle of almond butter. 5 minutes, no prep needed." },
  { id: "b4", name: "Overnight Oats", emoji: "🌙", tags: ["prep-ahead","no-cook","grab-and-go"], protein: 22, fiber: 6, prepAhead: true, note: "Make 5 jars Sunday. Oats + chia + almond milk + protein powder + berries. Grab from fridge each morning." },
];

const PROFILES = {
  amy: { name: "Amy", emoji: "🌸", color: theme.lavenderDeep, bg: theme.lavenderSoft, proteinTarget: 120, fiberTarget: 25, note: "Menopause support · Morning protein · Protein powder" },
  shawn: { name: "Shawn", emoji: "🌿", color: theme.sageDeep, bg: theme.sageSoft, proteinTarget: 100, fiberTarget: 20, note: "No fish · Building toward more beans & veg" },
  athlete: { name: "Athlete 🏒", emoji: "⚡", color: theme.amber, bg: theme.amberSoft, proteinTarget: 160, fiberTarget: 28, note: "High calorie · Grab-and-go · Self-serve bowls" },
};

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function FeedMe() {
  const [view, setView] = useState("home");
  const [activeProfile, setActiveProfile] = useState("amy");
  const [recipes, setRecipes] = useState(DEFAULT_RECIPES);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [weekPlan, setWeekPlan] = useState({});
  const [groceryList, setGroceryList] = useState({});
  const [prepSchedule, setPrepSchedule] = useState({});
  const [checkedGroceries, setCheckedGroceries] = useState({});
  const [checkedTasks, setCheckedTasks] = useState({});
  const [aiLoading, setAiLoading] = useState(false);
  const [aiLoadingMsg, setAiLoadingMsg] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [filterCat, setFilterCat] = useState("dinner");
  const [importUrl, setImportUrl] = useState("");
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [todayPrep, setTodayPrep] = useState([]);
  const [notifTime, setNotifTime] = useState("20:00");
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [showAddManual, setShowAddManual] = useState(false);
  const [manualRecipe, setManualRecipe] = useState({ name:"", emoji:"🍽️", category:"dinner", tags:"", protein:"", fiber:"", servings:"4", prepTime:"", cookTime:"", ingredients:"", instructions:"", amyNote:"", glycemicHack:false, grabAndGo:false, athleteFriendly:false, shawnFriendly:true });

  const profile = PROFILES[activeProfile];
  const context = `Household: Amy (menopause, 120g protein/day goal, uses flavorless protein powder, insulin resistant, loves flavour and spice), Shawn (no fish, 100g protein, insulin resistant), hockey player joining August (160g protein, grab-and-go). Mediterranean whole foods, no processed foods or artificial sugars, no-salt-added broth always. Cook-cool-reheat pasta/rice/potatoes to lower glycemic index. Heavy on chicken, building toward beans and veg.`;
  const recipeNames = recipes.map(r => r.name).join(", ");

  // ── AI helper ──
  const callAI = async (user, system) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514", max_tokens: 1000,
        system: system || `You are a warm, practical meal planning assistant. ${context} Be concise and specific.`,
        messages: [{ role: "user", content: user }],
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "";
  };

  // ── Import recipe from URL ──
  const importFromUrl = async () => {
    if (!importUrl.trim()) return;
    setImportLoading(true);
    setImportError("");
    try {
      const result = await callAI(
        `I'm going to give you a recipe URL. Extract the recipe details and return ONLY raw JSON (no markdown, no backticks) in this exact format:
        {"name":"...","emoji":"(pick a fitting food emoji)","category":"dinner","tags":["tag1","tag2"],"protein":number,"fiber":number,"gi":number_or_null,"servings":number,"prepTime":number,"cookTime":number,"glycemicHack":true_if_has_pasta_rice_potato,"grabAndGo":false,"athleteFriendly":false,"shawnFriendly":true,"source":"domain name","ingredients":["..."],"instructions":"...","amyNote":"brief note about this recipe for Amy's household — sodium, protein, any swap suggestions","prepTasks":[{"when":"...","task":"..."}],"hackNote":"brief note about glycemic hack if applicable, else null"}
        
        URL: ${importUrl}
        
        If you cannot access the URL, do your best to infer a recipe from the URL text itself. Make protein and fiber reasonable estimates based on the dish type.`,
        "Return ONLY valid raw JSON. No markdown, no backticks, no explanation whatsoever."
      );
      const clean = result.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      const newRecipe = { ...parsed, id: Date.now() };
      setRecipes(prev => [...prev, newRecipe]);
      setImportUrl("");
      setShowImport(false);
      setView("recipes");
    } catch (e) {
      setImportError("Couldn't extract that recipe — try pasting the URL again or use manual entry below.");
    }
    setImportLoading(false);
  };

  // ── Add manual recipe ──
  const addManual = () => {
    const r = {
      ...manualRecipe,
      id: Date.now(),
      protein: parseInt(manualRecipe.protein) || 0,
      fiber: parseInt(manualRecipe.fiber) || 0,
      gi: null,
      servings: parseInt(manualRecipe.servings) || 4,
      prepTime: parseInt(manualRecipe.prepTime) || 0,
      cookTime: parseInt(manualRecipe.cookTime) || 0,
      tags: manualRecipe.tags.split(",").map(t => t.trim()).filter(Boolean),
      ingredients: manualRecipe.ingredients.split("\n").filter(Boolean),
      prepTasks: [],
      hackNote: manualRecipe.glycemicHack ? "Use the cook-cool-reheat method on any rice, pasta or potato in this dish to lower the glycemic index." : null,
      source: "Your kitchen",
    };
    setRecipes(prev => [...prev, r]);
    setShowAddManual(false);
    setManualRecipe({ name:"", emoji:"🍽️", category:"dinner", tags:"", protein:"", fiber:"", servings:"4", prepTime:"", cookTime:"", ingredients:"", instructions:"", amyNote:"", glycemicHack:false, grabAndGo:false, athleteFriendly:false, shawnFriendly:true });
  };

  // ── Build week plan ──
  const buildWeekPlan = async () => {
    setAiLoading(true); setAiLoadingMsg("Sprinkling some magic on your week..."); setView("planner");
    try {
      const result = await callAI(
        `Build a 7-day dinner plan (Monday–Sunday) for this household. Focus ONLY on dinners — that's the priority. Use these recipes where possible: ${recipeNames}. Suggest 1-2 new whole-foods Mediterranean dinners that use overlapping ingredients to reduce waste. Mark any rice/pasta/potato dish with ✦. Return ONLY raw JSON: {"Monday":"recipe name","Tuesday":"...","Wednesday":"...","Thursday":"...","Friday":"...","Saturday":"...","Sunday":"..."}`,
        "Return ONLY valid raw JSON object mapping day to dinner name. No markdown."
      );
      const clean = result.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setWeekPlan(parsed);
      // Build today's prep card
      buildTodayPrep(parsed);
    } catch {
      const fallback = {};
      DAYS.forEach((d, i) => { fallback[d] = recipes[i % recipes.length]?.name || "Chicken Fajita Rice Bake ✦"; });
      setWeekPlan(fallback);
    }
    setAiLoading(false);
  };

  const buildTodayPrep = (plan) => {
    const days = Object.keys(plan);
    const today = new Date().getDay();
    const dayMap = {1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday",0:"Sunday"};
    const tomorrow = dayMap[(today + 1) % 7];
    const tomorrowDinner = plan[tomorrow];
    if (!tomorrowDinner) return;
    const matchedRecipe = recipes.find(r => tomorrowDinner.includes(r.name) || r.name.includes(tomorrowDinner.replace(" ✦","")));
    const tasks = matchedRecipe?.prepTasks?.filter(t => t.when.toLowerCase().includes("night before") || t.when.toLowerCase().includes("ahead")) || [];
    const generic = tomorrowDinner.includes("✦") ? ["Cook rice/pasta tonight, cool on a tray, refrigerate ✦"] : [];
    setTodayPrep([...generic, ...tasks.map(t => t.task)]);
  };

  // ── Build grocery list ──
  const buildGrocery = async () => {
    setAiLoading(true); setAiLoadingMsg("Writing your list..."); setView("grocery");
    const dinners = Object.values(weekPlan).join(", ");
    const ings = recipes.map(r => `${r.name}: ${r.ingredients?.join(", ")}`).join(" | ");
    try {
      const result = await callAI(
        `Grocery list for this week's dinners: ${dinners || recipeNames}. Ingredients from recipes: ${ings}. Consolidate and return ONLY raw JSON: {"🥬 Produce":["..."],"🍗 Proteins & Dairy":["..."],"🫙 Canned & Jarred":["..."],"🌾 Grains & Pasta":["..."],"🧂 Pantry & Spices":["..."],"❄️ Frozen":["..."]}. Use no-salt-added versions for all canned goods and broth.`,
        "Return ONLY valid raw JSON. No markdown."
      );
      setGroceryList(JSON.parse(result.replace(/```json|```/g, "").trim()));
      setCheckedGroceries({});
    } catch {
      setGroceryList({"🥬 Produce":["Baby spinach (large bag)","Cherry tomatoes","Bell peppers ×4","Red onion, white onion","Avocados ×3","Cucumber","Lemon ×3","Lime ×2","Garlic bulb","Fresh parsley (2 bunches)","Fresh mint","Green onions","Shallots","Butternut squash","Corn on the cob ×2"],"🍗 Proteins & Dairy":["Chicken thighs, boneless skinless (3 lbs)","Chicken breasts (2 lbs)","Lean ground turkey (1 lb)","Greek yogurt (large tub)","Heavy cream","Parmesan, grated","Cheddar-Jack blend","White Cheddar","Feta crumbles","Milk","Butter"],"🫙 Canned & Jarred":["No-salt-added diced tomatoes & green chiles ×2","No-salt-added pinto beans","No-salt-added chicken broth (carton)","Pico de gallo (jar)","Chickpeas (for bowls)"],"🌾 Grains & Pasta":["Brown rice (large bag)","Rotini pasta","Medium-grind bulgur"],"🧂 Pantry & Spices":["Olive oil (extra-virgin)","Avocado oil","Apple cider vinegar","Cumin, smoked paprika, oregano, chili powder","Garlic powder, onion powder","Crushed red pepper","Italian seasoning","Salt-free chipotle seasoning","Almond butter","Ground flaxseed","Sumac or za'atar"],"❄️ Frozen":["Frozen spinach (smoothies)","Frozen mango chunks","Corn kernels (backup)"]});
    }
    setAiLoading(false);
  };

  // ── Build prep schedule ──
  const buildPrep = async () => {
    setAiLoading(true); setAiLoadingMsg("Planning your prep magic..."); setView("prep");
    const dinners = Object.values(weekPlan).join(", ");
    try {
      const result = await callAI(
        `Create a prep schedule for these dinners: ${dinners || recipeNames}. Sunday is the main batch-cook day. Include the cook-cool-reheat glycemic hack timing (✦) for any rice, pasta or potato dish — these must be done the NIGHT BEFORE. Add timing estimates. Return ONLY raw JSON: {"Sunday":["task (time)"],"Monday":["..."],...} only include days with tasks.`,
        "Return ONLY valid raw JSON. No markdown."
      );
      setPrepSchedule(JSON.parse(result.replace(/```json|```/g, "").trim()));
      setCheckedTasks({});
    } catch {
      setPrepSchedule({"Sunday":["Cook 4 cups brown rice — spread on sheet pan, refrigerate ✦ (35 min)","Prep 5 smoothie bags with frozen spinach + mango + banana — freeze (10 min)","Roast and mash butternut squash for mac & cheese (30 min)","Slice all peppers and onions, store in containers (15 min)","Make tabbouleh — flavour improves overnight (20 min)"],"Monday":["Pull chicken from freezer if using frozen","Bake Chicken Fajita Rice Bake with pre-cooled rice ✦ (40 min)"],"Tuesday":["Portion Monday leftovers into grab-and-go containers"],"Wednesday":["Cook rotini pasta tonight, cool on sheet pan, refrigerate ✦ (10 min active)"],"Thursday":["Make Butternut Squash Mac & Cheese with pre-cooled pasta ✦ (20 min)","Grill extra chicken for Friday salad"],"Saturday":["Grocery run — check pantry staples first","Review next week's plan"]});
    }
    setAiLoading(false);
  };

  // ── Ask AI ──
  const askAI = async () => {
    if (!chatInput.trim()) return;
    setAiLoading(true); setAiLoadingMsg("Thinking...");
    const q = chatInput; setChatInput("");
    const result = await callAI(q);
    setChatResponse(result);
    setAiLoading(false);
  };

  // ── Push notifications ──
  const enableNotifications = async () => {
    if (!("Notification" in window)) { alert("Your browser doesn't support notifications."); return; }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      setNotifEnabled(true);
      scheduleNotification();
    }
  };

  const scheduleNotification = () => {
    const [h, m] = notifTime.split(":").map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    const delay = target - now;
    setTimeout(() => {
      const tomorrow = Object.keys(weekPlan)[(new Date().getDay()) % 7];
      const dinner = weekPlan[tomorrow] || "tomorrow's dinner";
      const r = recipes.find(rec => dinner.includes(rec.name));
      const tasks = r?.prepTasks?.filter(t => t.when.toLowerCase().includes("night before")).map(t => t.task).join(", ") || (dinner.includes("✦") ? "cook and cool the rice tonight ✦" : "check your prep plan!");
      new Notification("🍴 Feed Me — Tonight's Prep", { body: `Tomorrow: ${dinner}. Don't forget: ${tasks}`, icon: "🍴" });
    }, delay);
  };

  // ── Filtered recipes ──
  const allDinnerTags = ["all", ...new Set(recipes.filter(r => r.category === "dinner").flatMap(r => r.tags || []))];
  const displayedRecipes = recipes
    .filter(r => r.category === filterCat)
    .filter(r => filterTag === "all" || (r.tags || []).includes(filterTag));

  // ── SHARED STYLES ──────────────────────────────────────────────────────────
  const S = {
    page: { padding: "14px 14px 80px" },
    card: { background: theme.white, borderRadius: "18px", padding: "14px 16px", marginBottom: "12px", boxShadow: "0 2px 12px rgba(60,40,20,0.07)", border: `1px solid ${theme.border}` },
    softCard: (bg, border) => ({ background: bg || theme.parchment, borderRadius: "16px", padding: "12px 14px", marginBottom: "10px", border: `1px solid ${border || theme.border}` }),
    heading: { fontSize: "17px", fontWeight: "800", color: theme.sageDeep, marginBottom: "10px", fontFamily: "'Georgia', serif", display: "flex", alignItems: "center", gap: "6px" },
    label: { fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", color: theme.muted, marginBottom: "5px" },
    tag: (color) => ({ display: "inline-block", padding: "2px 8px", borderRadius: "10px", fontSize: "10px", background: color ? color + "22" : theme.sageSoft, color: color || theme.sageDeep, border: `1px solid ${color ? color + "55" : theme.sage + "88"}`, marginRight: "4px", marginBottom: "3px", fontWeight: "600" }),
    btn: (v) => ({
      padding: v === "sm" ? "5px 12px" : v === "xs" ? "3px 8px" : "11px 20px",
      borderRadius: v === "xs" ? "8px" : "12px",
      border: v === "outline" ? `2px solid ${theme.sageDeep}` : "none",
      background: v === "outline" ? "transparent" : v === "lavender" ? theme.lavenderDeep : v === "coral" ? theme.coral : v === "amber" ? theme.amber : v === "ghost" ? theme.sageSoft : theme.sageDeep,
      color: v === "outline" ? theme.sageDeep : v === "ghost" ? theme.sageDeep : "#fff",
      fontSize: v === "xs" ? "10px" : v === "sm" ? "12px" : "13px",
      fontWeight: "700",
      cursor: "pointer",
      letterSpacing: "0.3px",
    }),
    input: { width: "100%", padding: "9px 13px", borderRadius: "10px", border: `1.5px solid ${theme.border}`, fontSize: "13px", fontFamily: "'Georgia', serif", background: theme.cream, boxSizing: "border-box", color: theme.text },
    textarea: { width: "100%", padding: "9px 13px", borderRadius: "10px", border: `1.5px solid ${theme.border}`, fontSize: "13px", fontFamily: "'Georgia', serif", background: theme.cream, boxSizing: "border-box", color: theme.text, resize: "vertical" },
    check: (done) => ({ width: "22px", height: "22px", borderRadius: "50%", border: `2px solid ${theme.sage}`, background: done ? theme.sage : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all 0.2s" }),
    macro: (c) => ({ background: c + "18", border: `1px solid ${c}44`, borderRadius: "10px", padding: "8px 10px", textAlign: "center", flex: 1 }),
    hackBadge: { background: theme.hackBg, border: `1.5px solid ${theme.hackBorder}`, borderRadius: "12px", padding: "10px 12px", marginTop: "10px", fontSize: "12px", color: theme.hackGreen, lineHeight: 1.6 },
    divider: { display: "flex", alignItems: "center", gap: "8px", margin: "14px 0", color: theme.muted, fontSize: "11px" },
    profileBtn: (a, color, bg) => ({ padding: "6px 13px", borderRadius: "18px", border: `2px solid ${a ? color : theme.border}`, background: a ? color : "transparent", color: a ? "#fff" : theme.muted, fontSize: "11px", fontWeight: a ? "700" : "500", cursor: "pointer", transition: "all 0.15s" }),
  };

  // ── TAG COLORS ─────────────────────────────────────────────────────────────
  const tagColor = (t) => ({
    chicken: theme.amber, turkey: theme.coral, vegetarian: theme.sage, salad: theme.sageDeep,
    "meal-prep": theme.lavenderDeep, bowl: theme.lavenderDeep, "one-pan": theme.coral,
    summer: theme.amber, "grab-and-go": theme.coral, "high-protein": theme.sageDeep,
    quick: theme.sage, comfort: theme.amber, pasta: theme.coral, family: theme.rose,
    "glycemic-hack": theme.hackGreen, breakfast: theme.lavenderDeep, "bake-ahead": theme.rose,
  })[t];

  // ══════════════════════════════════════════════════════════════════════════
  // VIEWS
  // ══════════════════════════════════════════════════════════════════════════

  // ── HOME ──
  const HomeView = (
    <div style={S.page}>
      {/* Profile selector */}
      <div style={{ ...S.card, background: `linear-gradient(135deg, ${profile.bg} 0%, ${theme.cream} 100%)`, border: `1px solid ${profile.color}44` }}>
        <div style={S.label}>Planning for</div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
          {Object.entries(PROFILES).map(([k, p]) => (
            <button key={k} style={S.profileBtn(activeProfile === k, p.color, p.bg)} onClick={() => setActiveProfile(k)}>
              {p.emoji} {p.name}
            </button>
          ))}
        </div>
        <div style={{ fontSize: "11px", color: profile.color, fontStyle: "italic" }}>
          {profile.note} · <strong>{profile.proteinTarget}g protein</strong> · {profile.fiberTarget}g fiber daily
        </div>
      </div>

      {/* Today's prep card */}
      {todayPrep.length > 0 && (
        <div style={{ ...S.softCard(theme.hackBg, theme.hackBorder), marginBottom: "12px" }}>
          <div style={{ fontWeight: "800", color: theme.hackGreen, marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
            <Sparkle color={theme.hackGreen}/> Do Tonight
          </div>
          {todayPrep.map((t, i) => (
            <div key={i} style={{ fontSize: "12px", color: theme.hackGreen, padding: "2px 0", lineHeight: 1.5 }}>🌿 {t}</div>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div style={{ ...S.heading }}><Butterfly size={18}/> What do you need?</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
        {[
          { label: "🗓 Plan My Week", sub: "AI builds your dinners", action: buildWeekPlan, color: theme.sageDeep },
          { label: "🛒 Shopping List", sub: "From your week plan", action: buildGrocery, color: theme.amber },
          { label: "📋 Prep Schedule", sub: "Tasks + timing", action: buildPrep, color: theme.lavenderDeep },
          { label: "📖 Recipes", sub: `${recipes.length} in library`, action: () => setView("recipes"), color: theme.coral },
        ].map(item => (
          <button key={item.label} onClick={item.action} style={{ background: theme.white, border: `1.5px solid ${item.color}44`, borderRadius: "16px", padding: "14px 12px", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "14px", fontWeight: "800", color: item.color, marginBottom: "3px" }}>{item.label}</div>
            <div style={{ fontSize: "11px", color: theme.muted }}>{item.sub}</div>
          </button>
        ))}
      </div>

      {/* Breakfast ideas */}
      <div style={S.heading}><Flower size={16}/> Breakfast Prep Ideas</div>
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px", marginBottom: "14px" }}>
        {BREAKFASTS.map(b => (
          <div key={b.id} style={{ ...S.softCard(theme.lavenderSoft, theme.lavender), minWidth: "160px", marginBottom: 0, flexShrink: 0 }}>
            <div style={{ fontSize: "22px", marginBottom: "4px" }}>{b.emoji}</div>
            <div style={{ fontWeight: "700", fontSize: "12px", color: theme.lavenderDeep, marginBottom: "2px" }}>{b.name}</div>
            <div style={{ fontSize: "10px", color: theme.muted, marginBottom: "4px" }}>{b.protein}g protein</div>
            {b.prepAhead && <span style={S.tag(theme.lavenderDeep)}>prep ahead</span>}
            <div style={{ fontSize: "10px", color: theme.muted, marginTop: "4px", lineHeight: 1.4 }}>{b.note}</div>
          </div>
        ))}
      </div>

      {/* Ask AI */}
      <div style={S.card}>
        <div style={{ fontWeight: "800", color: theme.sageDeep, marginBottom: "8px", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Sprig size={16}/> Ask your kitchen fairy
        </div>
        <div style={{ display: "flex", gap: "7px" }}>
          <input style={{ ...S.input, flex: 1 }} value={chatInput} onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && askAI()}
            placeholder="e.g. What can I make with leftover chicken?" />
          <button style={S.btn("lavender")} onClick={askAI} disabled={aiLoading}>{aiLoading ? "✨" : "Ask"}</button>
        </div>
        {chatResponse && (
          <div style={{ marginTop: "10px", padding: "10px 12px", background: theme.sageSoft, borderRadius: "10px", fontSize: "13px", lineHeight: 1.7, color: theme.text }}>
            {chatResponse}
          </div>
        )}
      </div>

      {/* Glycemic hack callout */}
      <div style={S.hackBadge}>
        <div style={{ fontWeight: "800", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Sparkle color={theme.hackGreen}/> The ✦ Glycemic Hack
        </div>
        Cook pasta, rice, or potatoes → cool completely (overnight in fridge) → reheat. Cooling forms resistant starch that lowers the glycemic index. Look for ✦ — this is your secret weapon for insulin resistance. 🌿
      </div>

      {/* Push notification setup */}
      <div style={{ ...S.softCard(theme.amberSoft, theme.amber + "44"), marginTop: "4px" }}>
        <div style={{ fontWeight: "800", color: theme.amber, marginBottom: "6px", fontSize: "13px" }}>🔔 Tonight's Prep Reminder</div>
        <div style={{ fontSize: "11px", color: theme.muted, marginBottom: "8px" }}>Get a notification each evening reminding you what to prep for tomorrow's dinner.</div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input type="time" value={notifTime} onChange={e => setNotifTime(e.target.value)} style={{ ...S.input, width: "110px", flex: "none" }} />
          <button style={S.btn(notifEnabled ? "ghost" : "amber")} onClick={notifEnabled ? () => setNotifEnabled(false) : enableNotifications}>
            {notifEnabled ? "✓ On" : "Enable"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── RECIPES ──
  const RecipesView = (
    <div style={S.page}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div style={S.heading}><Sprig size={16}/> Recipe Library</div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button style={S.btn("sm")} onClick={() => setShowImport(!showImport)}>+ URL</button>
          <button style={S.btn("sm")} onClick={() => setShowAddManual(!showAddManual)}>+ Manual</button>
        </div>
      </div>

      {/* URL import */}
      {showImport && (
        <div style={{ ...S.softCard(theme.sageSoft, theme.sage), marginBottom: "12px" }}>
          <div style={{ fontWeight: "800", color: theme.sageDeep, marginBottom: "8px", fontSize: "13px" }}>📎 Import from URL</div>
          <div style={{ fontSize: "11px", color: theme.muted, marginBottom: "8px" }}>Paste any recipe URL (Samsung Food, Eating Well, AllRecipes, etc.) and AI will extract the recipe automatically.</div>
          <input style={S.input} value={importUrl} onChange={e => setImportUrl(e.target.value)} placeholder="https://app.samsungfood.com/recipes/..." />
          {importError && <div style={{ color: theme.coral, fontSize: "11px", marginTop: "5px" }}>{importError}</div>}
          <div style={{ display: "flex", gap: "7px", marginTop: "8px" }}>
            <button style={S.btn()} onClick={importFromUrl} disabled={importLoading}>{importLoading ? "✨ Extracting..." : "Import Recipe"}</button>
            <button style={S.btn("ghost")} onClick={() => { setShowImport(false); setImportError(""); }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Manual add */}
      {showAddManual && (
        <div style={{ ...S.card, border: `2px solid ${theme.lavenderDeep}` }}>
          <div style={{ fontWeight: "800", color: theme.lavenderDeep, marginBottom: "10px" }}>✏️ Add Recipe Manually</div>
          {[
            { key: "name", label: "Recipe Name", ph: "e.g. Lemon Herb Chicken" },
            { key: "emoji", label: "Emoji", ph: "🍽️" },
            { key: "tags", label: "Tags (comma separated)", ph: "chicken, meal-prep, quick" },
            { key: "protein", label: "Protein g / serving", ph: "35" },
            { key: "fiber", label: "Fiber g / serving", ph: "5" },
            { key: "servings", label: "Servings", ph: "4" },
            { key: "prepTime", label: "Prep time (min)", ph: "15" },
            { key: "cookTime", label: "Cook time (min)", ph: "30" },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: "7px" }}>
              <div style={S.label}>{f.label}</div>
              <input style={S.input} value={manualRecipe[f.key]} placeholder={f.ph} onChange={e => setManualRecipe(p => ({ ...p, [f.key]: e.target.value }))} />
            </div>
          ))}
          <div style={{ marginBottom: "7px" }}>
            <div style={S.label}>Ingredients (one per line)</div>
            <textarea style={{ ...S.textarea, height: "80px" }} value={manualRecipe.ingredients} onChange={e => setManualRecipe(p => ({ ...p, ingredients: e.target.value }))} placeholder={"2 chicken thighs\n1 cup brown rice\n..."} />
          </div>
          <div style={{ marginBottom: "7px" }}>
            <div style={S.label}>Instructions</div>
            <textarea style={{ ...S.textarea, height: "60px" }} value={manualRecipe.instructions} onChange={e => setManualRecipe(p => ({ ...p, instructions: e.target.value }))} />
          </div>
          <div style={{ marginBottom: "7px" }}>
            <div style={S.label}>Your Kitchen Notes</div>
            <input style={S.input} value={manualRecipe.amyNote} onChange={e => setManualRecipe(p => ({ ...p, amyNote: e.target.value }))} placeholder="Substitutions, tips, etc." />
          </div>
          <div style={{ display: "flex", gap: "14px", marginBottom: "12px", flexWrap: "wrap" }}>
            {[["glycemicHack","✦ Glycemic Hack"],["grabAndGo","🏃 Grab & Go"],["athleteFriendly","🏒 Athlete"],["shawnFriendly","💪 Shawn OK"]].map(([k, label]) => (
              <label key={k} style={{ fontSize: "12px", color: theme.muted, display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
                <input type="checkbox" checked={manualRecipe[k]} onChange={e => setManualRecipe(p => ({ ...p, [k]: e.target.checked }))} />
                {label}
              </label>
            ))}
          </div>
          <div style={{ display: "flex", gap: "7px" }}>
            <button style={S.btn("lavender")} onClick={addManual}>Save Recipe</button>
            <button style={S.btn("ghost")} onClick={() => setShowAddManual(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
        {["dinner","breakfast"].map(cat => (
          <button key={cat} style={{ ...S.btn(filterCat === cat ? "" : "ghost"), borderRadius: "20px", padding: "6px 16px", textTransform: "capitalize" }} onClick={() => setFilterCat(cat)}>
            {cat === "dinner" ? "🍽️ Dinners" : "☀️ Breakfasts"}
          </button>
        ))}
      </div>

      {/* Tag filter */}
      {filterCat === "dinner" && (
        <div style={{ display: "flex", gap: "5px", overflowX: "auto", paddingBottom: "8px", marginBottom: "8px" }}>
          {["all","chicken","turkey","vegetarian","meal-prep","bowl","salad","summer","quick","one-pan","comfort"].map(t => (
            <button key={t} onClick={() => setFilterTag(t)} style={{ padding: "3px 10px", borderRadius: "12px", border: "none", background: filterTag === t ? theme.sageDeep : theme.border, color: filterTag === t ? "#fff" : theme.muted, fontSize: "11px", cursor: "pointer", whiteSpace: "nowrap", fontWeight: filterTag === t ? "700" : "400" }}>
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Breakfast cards */}
      {filterCat === "breakfast" && BREAKFASTS.map(b => (
        <div key={b.id} style={S.card}>
          <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <div style={{ fontSize: "28px" }}>{b.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "800", fontSize: "14px", marginBottom: "3px", color: theme.lavenderDeep }}>{b.name}</div>
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "5px" }}>
                {b.tags.map(t => <span key={t} style={S.tag(tagColor(t))}>{t}</span>)}
              </div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: theme.sageDeep }}>{b.protein}g protein · {b.fiber}g fiber</div>
              <div style={{ fontSize: "12px", color: theme.muted, marginTop: "4px", lineHeight: 1.5 }}>{b.note}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Dinner cards */}
      {filterCat === "dinner" && displayedRecipes.map(r => (
        <div key={r.id} style={{ ...S.card, cursor: "pointer" }} onClick={() => { setSelectedRecipe(r); setView("detail"); }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <div style={{ fontSize: "28px" }}>{r.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "800", fontSize: "14px", marginBottom: "2px" }}>{r.name}</div>
              <div style={{ fontSize: "11px", color: theme.muted, marginBottom: "4px" }}>⏱ {r.prepTime + r.cookTime} min · {r.servings} servings · {r.source}</div>
              <div style={{ marginBottom: "5px" }}>{(r.tags||[]).slice(0,4).map(t => <span key={t} style={S.tag(tagColor(t))}>{t}</span>)}</div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {r.glycemicHack && <span style={{ ...S.tag(theme.hackGreen), background: theme.hackBg }}>✦ GI Hack</span>}
                {r.grabAndGo && <span style={{ ...S.tag(theme.coral), background: theme.coralSoft }}>🏃 Grab & Go</span>}
                {r.athleteFriendly && <span style={{ ...S.tag(theme.amber), background: theme.amberSoft }}>🏒 Athlete</span>}
              </div>
            </div>
            <div style={{ textAlign: "right", minWidth: "55px" }}>
              <div style={{ fontSize: "16px", fontWeight: "800", color: theme.sageDeep }}>{r.protein}g</div>
              <div style={{ fontSize: "10px", color: theme.muted }}>protein</div>
              {r.gi && <div style={{ fontSize: "10px", color: theme.hackGreen, marginTop: "2px", fontWeight: "700" }}>GI {r.gi}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // ── RECIPE DETAIL ──
  const DetailView = selectedRecipe && (
    <div style={S.page}>
      <button style={{ ...S.btn("ghost"), marginBottom: "10px", fontSize: "12px" }} onClick={() => setView("recipes")}>← Back</button>
      <div style={S.card}>
        <div style={{ fontSize: "32px", marginBottom: "6px" }}>{selectedRecipe.emoji}</div>
        <div style={{ fontSize: "20px", fontWeight: "800", color: theme.text, marginBottom: "4px", fontFamily: "'Georgia', serif" }}>{selectedRecipe.name}</div>
        <div style={{ fontSize: "11px", color: theme.muted, marginBottom: "10px" }}>⏱ Prep {selectedRecipe.prepTime}min · Cook {selectedRecipe.cookTime}min · {selectedRecipe.servings} servings · {selectedRecipe.source}</div>
        <div style={{ display: "flex", gap: "7px", marginBottom: "12px" }}>
          <div style={S.macro(theme.sageDeep)}><div style={{ fontSize: "18px", fontWeight: "800", color: theme.sageDeep }}>{selectedRecipe.protein}g</div><div style={{ fontSize: "10px", color: theme.muted }}>Protein</div></div>
          <div style={S.macro(theme.amber)}><div style={{ fontSize: "18px", fontWeight: "800", color: theme.amber }}>{selectedRecipe.fiber}g</div><div style={{ fontSize: "10px", color: theme.muted }}>Fiber</div></div>
          {selectedRecipe.gi && <div style={S.macro(theme.hackGreen)}><div style={{ fontSize: "18px", fontWeight: "800", color: theme.hackGreen }}>{selectedRecipe.gi}</div><div style={{ fontSize: "10px", color: theme.muted }}>GI</div></div>}
        </div>
        {selectedRecipe.glycemicHack && (
          <div style={S.hackBadge}><strong><Sparkle color={theme.hackGreen}/> Glycemic Hack ✦</strong><br/>{selectedRecipe.hackNote}</div>
        )}
        {selectedRecipe.amyNote && (
          <div style={{ background: theme.lavenderSoft, border: `1px solid ${theme.lavender}`, borderRadius: "10px", padding: "10px 12px", marginTop: "10px", fontSize: "12px", color: theme.lavenderDeep, lineHeight: 1.6 }}>
            <Flower size={14}/> <strong>Kitchen Notes:</strong> {selectedRecipe.amyNote}
          </div>
        )}
      </div>

      <div style={S.card}>
        <div style={{ fontWeight: "800", color: theme.sageDeep, marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}><Sprig size={14}/> Ingredients</div>
        {(selectedRecipe.ingredients||[]).map((ing, i) => (
          <div key={i} style={{ fontSize: "13px", padding: "5px 0", borderBottom: `1px solid ${theme.border}`, color: ing.includes("✦") ? theme.hackGreen : theme.text, fontWeight: ing.includes("✦") ? "600" : "400", lineHeight: 1.4 }}>• {ing}</div>
        ))}
      </div>

      <div style={S.card}>
        <div style={{ fontWeight: "800", color: theme.sageDeep, marginBottom: "8px" }}>Instructions</div>
        <div style={{ fontSize: "13px", lineHeight: 1.8, color: theme.text }}>{selectedRecipe.instructions}</div>
      </div>

      {(selectedRecipe.prepTasks||[]).length > 0 && (
        <div style={S.card}>
          <div style={{ fontWeight: "800", color: theme.sageDeep, marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}><Butterfly size={14}/> Prep Timeline</div>
          {selectedRecipe.prepTasks.map((pt, i) => (
            <div key={i} style={{ fontSize: "13px", padding: "6px 0", borderBottom: `1px solid ${theme.border}` }}>
              <span style={{ color: theme.amber, fontWeight: "700" }}>{pt.when}: </span>
              <span style={{ color: pt.task.includes("✦") ? theme.hackGreen : theme.text, fontWeight: pt.task.includes("✦") ? "600" : "400" }}>{pt.task}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ── PLANNER ──
  const PlannerView = (
    <div style={S.page}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={S.heading}><Butterfly size={18}/> Dinner Plan</div>
        <button style={S.btn("sm")} onClick={buildWeekPlan} disabled={aiLoading}>{aiLoading ? "✨" : "🔄 Rebuild"}</button>
      </div>

      {aiLoading && (
        <div style={{ ...S.card, textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "36px", marginBottom: "10px" }}>🌸</div>
          <div style={{ color: theme.sageDeep, fontStyle: "italic" }}>{aiLoadingMsg}</div>
        </div>
      )}

      {!aiLoading && Object.keys(weekPlan).length === 0 && (
        <div style={{ ...S.card, textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "36px", marginBottom: "10px" }}>🗓</div>
          <div style={{ color: theme.muted, marginBottom: "14px" }}>Let AI plan your dinners for the week</div>
          <button style={S.btn()} onClick={buildWeekPlan}>Build This Week</button>
        </div>
      )}

      {Object.entries(weekPlan).map(([day, dinner]) => {
        const matched = recipes.find(r => dinner.includes(r.name) || r.name.includes(dinner.replace(" ✦","")));
        return (
          <div key={day} style={{ ...S.card, borderLeft: `4px solid ${theme.sage}` }}>
            <div style={{ fontWeight: "800", color: theme.sageDeep, fontSize: "12px", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "5px" }}>{day}</div>
            <div style={{ fontSize: "14px", color: theme.text, fontWeight: "600" }}>
              {matched?.emoji || "🍽️"} {dinner.includes("✦") ? <span style={{ color: theme.hackGreen }}>{dinner}</span> : dinner}
            </div>
            {matched?.protein && <div style={{ fontSize: "11px", color: theme.muted, marginTop: "3px" }}>{matched.protein}g protein · {matched.fiber}g fiber</div>}
          </div>
        );
      })}

      {Object.keys(weekPlan).length > 0 && (
        <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
          <button style={{ ...S.btn(), flex: 1 }} onClick={buildGrocery}>🛒 Grocery List</button>
          <button style={{ ...S.btn("outline"), flex: 1 }} onClick={buildPrep}>📋 Prep Schedule</button>
        </div>
      )}
    </div>
  );

  // ── GROCERY ──
  const GroceryView = (
    <div style={S.page}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={S.heading}><Flower size={16}/> Shopping List</div>
        <button style={S.btn("sm")} onClick={buildGrocery} disabled={aiLoading}>{aiLoading ? "✨" : "🔄"}</button>
      </div>
      {aiLoading && <div style={{ ...S.card, textAlign: "center", padding: "32px", color: theme.sageDeep }}>{aiLoadingMsg}</div>}
      {!aiLoading && Object.keys(groceryList).length === 0 && (
        <div style={{ ...S.card, textAlign: "center", padding: "36px" }}>
          <div style={{ fontSize: "32px", marginBottom: "10px" }}>🛒</div>
          <div style={{ color: theme.muted, marginBottom: "12px" }}>Build your week plan first, then generate your list</div>
          <button style={S.btn()} onClick={buildWeekPlan}>Plan My Week</button>
        </div>
      )}
      {Object.entries(groceryList).map(([cat, items]) => (
        <div key={cat} style={S.card}>
          <div style={{ fontWeight: "800", color: theme.sageDeep, marginBottom: "8px", fontSize: "13px" }}>{cat}</div>
          {items.map((item, i) => {
            const key = `${cat}-${i}`;
            const done = checkedGroceries[key];
            return (
              <div key={i} onClick={() => setCheckedGroceries(p => ({ ...p, [key]: !p[key] }))}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 0", borderBottom: `1px solid ${theme.border}`, cursor: "pointer" }}>
                <div style={S.check(done)}>{done && <span style={{ color: "#fff", fontSize: "12px", fontWeight: "700" }}>✓</span>}</div>
                <span style={{ fontSize: "13px", color: done ? "#c0b8b0" : theme.text, textDecoration: done ? "line-through" : "none", flex: 1 }}>{item}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  // ── PREP ──
  const PrepView = (
    <div style={S.page}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={S.heading}><Sprig size={16}/> Prep Schedule</div>
        <button style={S.btn("sm")} onClick={buildPrep} disabled={aiLoading}>{aiLoading ? "✨" : "🔄"}</button>
      </div>
      <div style={S.hackBadge}>
        <Sparkle color={theme.hackGreen}/> <strong>✦ tasks must happen the night before</strong> — this is the glycemic index hack. Pre-cooking and cooling pasta, rice or potatoes forms resistant starch, lowering the GI when reheated.
      </div>
      {aiLoading && <div style={{ ...S.card, textAlign: "center", padding: "32px", color: theme.sageDeep }}>{aiLoadingMsg}</div>}
      {!aiLoading && Object.keys(prepSchedule).length === 0 && (
        <div style={{ ...S.card, textAlign: "center", padding: "36px" }}>
          <div style={{ fontSize: "32px", marginBottom: "10px" }}>📋</div>
          <div style={{ color: theme.muted, marginBottom: "12px" }}>Plan your week first, then generate your prep schedule</div>
          <button style={S.btn()} onClick={buildWeekPlan}>Plan My Week</button>
        </div>
      )}
      {Object.entries(prepSchedule).map(([day, tasks]) => (
        <div key={day} style={S.card}>
          <div style={{ fontWeight: "800", color: theme.sageDeep, marginBottom: "10px", fontSize: "13px" }}>{day}</div>
          {tasks.map((task, i) => {
            const key = `${day}-${i}`;
            const done = checkedTasks[key];
            const isHack = task.includes("✦");
            return (
              <div key={i} onClick={() => setCheckedTasks(p => ({ ...p, [key]: !p[key] }))}
                style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0", borderBottom: `1px solid ${theme.border}`, cursor: "pointer" }}>
                <div style={{ ...S.check(done), marginTop: "1px", borderColor: isHack ? theme.hackGreen : theme.sage, background: done ? (isHack ? theme.hackGreen : theme.sage) : "transparent" }}>
                  {done && <span style={{ color: "#fff", fontSize: "11px", fontWeight: "700" }}>✓</span>}
                </div>
                <span style={{ fontSize: "13px", color: done ? "#c0b8b0" : isHack ? theme.hackGreen : theme.text, textDecoration: done ? "line-through" : "none", flex: 1, lineHeight: 1.6, fontWeight: isHack ? "700" : "400" }}>
                  {isHack && <Sparkle color={theme.hackGreen}/>} {task}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  const views = { home: HomeView, recipes: RecipesView, detail: DetailView, planner: PlannerView, grocery: GroceryView, prep: PrepView };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: theme.cream, minHeight: "100vh", color: theme.text, maxWidth: "480px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{ background: `linear-gradient(150deg, ${theme.sageDeep} 0%, #2a4a34 60%, #3d3060 100%)`, padding: "16px 18px 14px", position: "relative", overflow: "hidden" }}>
        {/* Decorative botanicals */}
        <div style={{ position: "absolute", right: "14px", top: "8px", opacity: 0.3 }}><Butterfly color="#fff" size={36}/></div>
        <div style={{ position: "absolute", right: "50px", bottom: "4px", opacity: 0.2 }}><Flower color={theme.rose} size={28}/></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative" }}>
          <div>
            <div style={{ color: "#f5eedc", fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px", lineHeight: 1 }}>🍴 Feed Me</div>
            <div style={{ color: theme.lavender, fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", marginTop: "3px" }}>Plan it. Prep it. Cut the crap.</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "11px", color: "#a8c8b0" }}>{profile.emoji} {profile.name}</div>
            <div style={{ fontSize: "10px", color: theme.lavender }}>{profile.proteinTarget}g protein goal</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", background: theme.white, borderBottom: `2px solid ${theme.border}`, overflowX: "auto" }}>
        {[
          { id: "home", label: "🏠 Home" },
          { id: "recipes", label: "📖 Recipes" },
          { id: "planner", label: "🗓 Plan" },
          { id: "grocery", label: "🛒 Shop" },
          { id: "prep", label: "📋 Prep" },
        ].map(item => {
          const active = view === item.id || (view === "detail" && item.id === "recipes");
          return (
            <button key={item.id} onClick={() => setView(item.id)} style={{ padding: "10px 12px", border: "none", background: "none", cursor: "pointer", fontSize: "12px", fontWeight: active ? "800" : "400", color: active ? theme.sageDeep : theme.muted, borderBottom: active ? `3px solid ${theme.sageDeep}` : "3px solid transparent", whiteSpace: "nowrap", transition: "all 0.15s", fontFamily: "inherit" }}>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* View */}
      <div>{views[view] || HomeView}</div>
    </div>
  );
}
