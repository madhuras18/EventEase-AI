/**
 * EventEase AI — Celebration Knowledge Base & Heuristic Intelligence Data
 * Tailored for Indian Celebrations & Realistic INR (₹) Estimates
 */

/**
 * Format number into Indian Rupee format (e.g. ₹10,000, ₹1,50,000, ₹25,00,000)
 */
function formatINR(amount) {
  const num = Math.round(Number(amount) || 0);
  const isNegative = num < 0;
  const absNum = Math.abs(num);
  
  const str = absNum.toString();
  let result = '';
  
  if (str.length <= 3) {
    result = str;
  } else {
    const lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    const formattedOthers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    result = formattedOthers + ',' + lastThree;
  }
  
  return (isNegative ? '-₹' : '₹') + result;
}

/**
 * Supported Event Types with Default Realistic Indian Budget Ratios
 */
const EVENT_TYPES = {
  birthday: {
    label: "Birthday Celebration",
    icon: "🎂",
    description: "Milestone birthdays, kids' 1st birthday, teen & 50th jubilee celebrations",
    budgetRatios: {
      venue: 0.15,
      decoration: 0.25,
      food: 0.30,
      cake: 0.12,
      photography: 0.08,
      entertainment: 0.04,
      invitations: 0.01,
      gifts: 0.03,
      transport: 0.02,
      contingency: 0.05
    },
    defaultChecklist: [
      { id: "b1", title: "Confirm venue access timing & indoor hall clearance", stage: "early", category: "Venue", completed: true, dependsOn: "None" },
      { id: "b2", title: "Select theme & finalize balloon/flower backdrop stylist", stage: "early", category: "Decor", completed: true, dependsOn: "Venue" },
      { id: "b3", title: "Order custom flavour birthday cake & pastry dessert cups", stage: "mid", category: "Cake", completed: false, dependsOn: "Theme" },
      { id: "b4", title: "Finalize Indian buffet menu (starters, main course & sweets)", stage: "mid", category: "Food", completed: false, dependsOn: "Guest count" },
      { id: "b5", title: "Send digital WhatsApp invitation card with Google Maps link", stage: "mid", category: "Invites", completed: false, dependsOn: "Date & Time" },
      { id: "b6", title: "Arrange party games, musical chairs & Bollywood playlist", stage: "week-of", category: "Activities", completed: false, dependsOn: "None" },
      { id: "b7", title: "Procure return gifts & sweet treat boxes for guests", stage: "week-of", category: "Gifts", completed: false, dependsOn: "RSVP count" },
      { id: "b8", title: "Verify sound system, mic & charge camera batteries", stage: "day-of", category: "Logistics", completed: false, dependsOn: "None" }
    ],
    defaultRunOfShow: [
      { time: "03:30 PM", label: "Venue Access & Decorator Setup", detail: "Balloon backdrop, entrance welcome easel & lighting check" },
      { time: "05:00 PM", label: "Cake & Food Delivery Inspection", detail: "Check cake table, refrigeration, and catering warmers setup" },
      { time: "05:45 PM", label: "Host Arrival & Final Touchups", detail: "Sound system check, background playlist running" },
      { time: "06:15 PM", label: "Guest Arrival & Welcome Drinks", detail: "Serve Rose Sharbat, Mocktails & Hot Starters (Paneer Tikka, Samosas)" },
      { time: "07:15 PM", label: "Interactive Games & Fun Activities", detail: "Musical chairs, Tambola / Housie, and kids entertainment" },
      { time: "08:00 PM", label: "Grand Birthday Cake Cutting & Cheers", detail: "Birthday song, photo session with family & close friends" },
      { time: "08:30 PM", label: "Dinner Buffet Opens", detail: "Full course Indian dinner & hot desserts (Gulab Jamun / Jalebi)" },
      { time: "09:45 PM", label: "Return Gifts & Guest Farewell", detail: "Handover return gift hampers, thank guests for attending" },
      { time: "10:30 PM", label: "Venue Packup & Cleanup", detail: "Check personal belongings, settle final vendor tips & close hall" }
    ]
  },
  wedding: {
    label: "Wedding & Sangeet",
    icon: "💍",
    description: "Ceremonies, Sangeet night, Mehendi, Haldi & Grand Reception",
    budgetRatios: {
      venue: 0.25,
      decoration: 0.20,
      food: 0.32,
      cake: 0.03,
      photography: 0.10,
      entertainment: 0.04,
      invitations: 0.01,
      gifts: 0.03,
      transport: 0.02,
      contingency: 0.05
    },
    defaultChecklist: [
      { id: "w1", title: "Book banquet hall / lawn & lock auspicious muhurat date", stage: "early", category: "Venue", completed: true, dependsOn: "None" },
      { id: "w2", title: "Hire traditional photographer & cinematic videographer team", stage: "early", category: "Photography", completed: true, dependsOn: "Venue" },
      { id: "w3", title: "Mandap & floral stage decoration mockup approval", stage: "mid", category: "Decor", completed: false, dependsOn: "Venue" },
      { id: "w4", title: "Catering food tasting: Chaat stalls, Biryani & regional sweets", stage: "mid", category: "Food", completed: false, dependsOn: "Guest count" },
      { id: "w5", title: "Dispatch printed wedding cards & digital WhatsApp video invites", stage: "mid", category: "Invites", completed: false, dependsOn: "Date & Venue" },
      { id: "w6", title: "Sangeet choreography practices & DJ playlist finalization", stage: "week-of", category: "Entertainment", completed: false, dependsOn: "None" },
      { id: "w7", title: "Pack pooja samagri, safas/turbans & bridesmaid hampers", stage: "week-of", category: "Logistics", completed: false, dependsOn: "None" },
      { id: "w8", title: "Day-of vendor coordination & stage lighting check", stage: "day-of", category: "Operations", completed: false, dependsOn: "Decor" }
    ],
    defaultRunOfShow: [
      { time: "11:00 AM", label: "Mandap & Floral Stage Setup", detail: "Marigold garlands, brass diyas, rajnigandha curtains" },
      { time: "04:30 PM", label: "Baraat Assembly & Dhol Arrival", detail: "Dhol walas, safa tying for groom family" },
      { time: "05:30 PM", label: "Milni & Welcome of Baraat", detail: "Rose petal shower, aarti & garland exchange" },
      { time: "06:15 PM", label: "Live Chaat & High Tea Counters", detail: "Pani puri, dahi bhalla, masala chai & hot snacks" },
      { time: "07:30 PM", label: "Jaimala (Varmala) Ceremony", detail: "Stage ceremony with cold sparklers & photography" },
      { time: "08:30 PM", label: "Royal Banquet Dinner Service", detail: "Multi-cuisine Indian feast, live counters, dessert station" },
      { time: "10:00 PM", label: "Pheras / Religious Rituals", detail: "Sacred fire vows at mandap with family blessings" },
      { time: "12:00 AM", label: "Vidaai & Departure", detail: "Heartfelt farewell & bridal car departure" }
    ]
  },
  engagement: {
    label: "Engagement / Roka Ceremony",
    icon: "✨",
    description: "Ring exchange, Roka rituals, intimate family dinners & cocktails",
    budgetRatios: {
      venue: 0.22,
      decoration: 0.22,
      food: 0.34,
      cake: 0.05,
      photography: 0.09,
      entertainment: 0.03,
      invitations: 0.01,
      gifts: 0.02,
      transport: 0.02,
      contingency: 0.05
    },
    defaultChecklist: [
      { id: "e1", title: "Reserve boutique hotel banquet or garden terrace", stage: "early", category: "Venue", completed: true, dependsOn: "None" },
      { id: "e2", title: "Curate pastel floral ring ceremony backdrop", stage: "mid", category: "Decor", completed: true, dependsOn: "Venue" },
      { id: "e3", title: "Order personalized 2-tier engagement ring cake", stage: "mid", category: "Cake", completed: false, dependsOn: "Theme" },
      { id: "e4", title: "Select fusion Indian snack & live mocktail menu", stage: "mid", category: "Food", completed: false, dependsOn: "Guest count" },
      { id: "e5", title: "Coordinate ring platter & family shagun gift hampers", stage: "week-of", category: "Gifts", completed: false, dependsOn: "None" }
    ],
    defaultRunOfShow: [
      { time: "05:00 PM", label: "Ring Stage & Floral Setup", detail: "Fairy light curtains, ring stand with fresh flowers" },
      { time: "06:30 PM", label: "Guest Welcome & Refreshments", detail: "Virgin mojitos, kulfi shots, paneer tikka skewers" },
      { time: "07:30 PM", label: "Roka Rituals & Shagun Exchange", detail: "Elder blessings, coconut & shagun envelope handover" },
      { time: "08:15 PM", label: "Ring Exchange & Cake Celebration", detail: "Couple ring ceremony, toast, engagement cake cutting" },
      { time: "09:00 PM", label: "Gala Dinner & Acoustic Music", detail: "Mughlai & continental buffet, family dances" }
    ]
  },
  college: {
    label: "College Fest / Hackathon / Farewell",
    icon: "🎓",
    description: "Hackathons, departmental fests, seniors' farewell, freshers' bash",
    budgetRatios: {
      venue: 0.12,
      decoration: 0.16,
      food: 0.38,
      cake: 0.03,
      photography: 0.09,
      entertainment: 0.12,
      invitations: 0.01,
      gifts: 0.04,
      transport: 0.02,
      contingency: 0.08
    },
    defaultChecklist: [
      { id: "c1", title: "Obtain campus auditorium & security permissions", stage: "early", category: "Venue", completed: true, dependsOn: "None" },
      { id: "c2", title: "Confirm hackathon / event sponsors & student core team", stage: "early", category: "Finance", completed: true, dependsOn: "None" },
      { id: "c3", title: "Launch registration portal & release campus teaser", stage: "mid", category: "Marketing", completed: true, dependsOn: "Permissions" },
      { id: "c4", title: "Contract student bulk catering (Biryani, rolls, chai & snacks)", stage: "mid", category: "Food", completed: false, dependsOn: "Headcount" },
      { id: "c5", title: "Procure LED screens, sound consoles, microphones & backup Wi-Fi", stage: "mid", category: "Tech", completed: false, dependsOn: "Venue" },
      { id: "c6", title: "Design event lanyards, delegate badges & title mementos", stage: "week-of", category: "Gifts", completed: false, dependsOn: "Registrations" }
    ],
    defaultRunOfShow: [
      { time: "08:30 AM", label: "Registration Desk & Kit Distribution", detail: "Lanyards, ID badges, event schedule pamphlets" },
      { time: "10:00 AM", label: "Inaugural Ceremony & Lamp Lighting", detail: "Saraswati vandana, principal / chief guest address" },
      { time: "11:30 AM", label: "Keynote / Hackathon Hacking Kickoff", detail: "Track announcements, problem statement reveal" },
      { time: "01:30 PM", label: "Student Lunch Break", detail: "Express meal boxes / thali with gulab jamun" },
      { time: "04:30 PM", label: "Cultural Performances / Battle of Bands", detail: "Student band performances, dance competitions" },
      { time: "07:30 PM", label: "Awards Ceremony & DJ Night", detail: "Trophy distribution followed by high-energy dance session" }
    ]
  },
  baby_shower: {
    label: "Baby Shower / Godh Bharai",
    icon: "👶",
    description: "Traditional Godh Bharai, Seemantham, modern pastel baby shower",
    budgetRatios: {
      venue: 0.16,
      decoration: 0.28,
      food: 0.32,
      cake: 0.08,
      photography: 0.08,
      entertainment: 0.02,
      invitations: 0.01,
      gifts: 0.02,
      transport: 0.01,
      contingency: 0.05
    },
    defaultChecklist: [
      { id: "bs1", title: "Select baby shower theme (Blush & Gold / Pastel Clouds)", stage: "early", category: "Decor", completed: true, dependsOn: "None" },
      { id: "bs2", title: "Finalize pure vegetarian traditional satvik banquet", stage: "mid", category: "Food", completed: false, dependsOn: "Guest count" },
      { id: "bs3", title: "Order themed baby crib / booties cake", stage: "mid", category: "Cake", completed: false, dependsOn: "Theme" },
      { id: "bs4", title: "Organize Godh Bharai rituals, bangles, and family games", stage: "week-of", category: "Activities", completed: false, dependsOn: "None" }
    ],
    defaultRunOfShow: [
      { time: "03:00 PM", label: "Floral Seating & Backdrop Setup", detail: "Pastel swing / jhoola decorated with jasmine and roses" },
      { time: "04:30 PM", label: "Guest Arrival & Kesar Milk / Thandai", detail: "Traditional cooling drinks and dry snack savory platters" },
      { time: "05:15 PM", label: "Godh Bharai Ritual & Blessings", detail: "Elders fill lap with fruits, sweets, green bangles & aarti" },
      { time: "06:15 PM", label: "Fun Baby Guessing Games", detail: "Guess the baby weight, nursery rhyme quiz, baby bingo" },
      { time: "07:00 PM", label: "Cake Cutting & Photo Session", detail: "Group portraits and mom-to-be gift reveals" },
      { time: "07:45 PM", label: "Traditional Dinner Buffet", detail: "Wholesome Indian feast with halwa and kheer" }
    ]
  },
  community: {
    label: "Community / Society Festival",
    icon: "🌸",
    description: "Diwali Milan, Holi celebration, Dandiya night, society sports day",
    budgetRatios: {
      venue: 0.10,
      decoration: 0.24,
      food: 0.40,
      cake: 0.02,
      photography: 0.06,
      entertainment: 0.08,
      invitations: 0.01,
      gifts: 0.03,
      transport: 0.02,
      contingency: 0.06
    },
    defaultChecklist: [
      { id: "cm1", title: "Obtain housing society clubhouse / ground permission", stage: "early", category: "Venue", completed: true, dependsOn: "None" },
      { id: "cm2", title: "Book sound, DJ setup & festive decorative lights", stage: "mid", category: "Decor", completed: true, dependsOn: "Venue" },
      { id: "cm3", title: "Arrange community potluck or trusted local caterer", stage: "mid", category: "Food", completed: false, dependsOn: "RSVP" }
    ],
    defaultRunOfShow: [
      { time: "05:00 PM", label: "Clubhouse Floral & Rangoli Setup", detail: "Fresh marigold rangoli at entrance, serial fairy lights" },
      { time: "06:30 PM", label: "Resident Arrival & Welcome Chaat", detail: "Pani puri stall, masala tea, samosas" },
      { time: "07:30 PM", label: "Cultural Performances & Kids Talent", detail: "Society kids dance, singing and drawing contest awards" },
      { time: "08:45 PM", label: "Community Dinner Feast", detail: "Grand community buffet and traditional sweets" }
    ]
  }
};

/**
 * Intelligent Theme Recommendation & Mood Board Catalog
 * Detailed attributes: Suitability, Advantages, Limitations, Styling Specs, and DIY alternatives
 */
const INDIAN_THEME_CATALOG = {
  birthday: [
    {
      id: "theme_b1",
      title: "Elegant Blush & Gold Royal Glam",
      vibe: "Sophisticated, modern, soft pink with golden shimmer",
      palette: ["#D66B91", "#F8E4EB", "#F7D794", "#FFFFFF", "#302A30"],
      paletteNames: ["Dusty Rose", "Soft Blush", "Royal Gold", "Pure White", "Charcoal Slate"],
      badge: "Best Fit for Your Aesthetic",
      bestFitReason: "Perfect balance of elegance and budget friendliness. Uses reusable gold arch structures with blush pink and pearl white balloon clusters, keeping hall decor costs under ₹2,500.",
      suitability: "Ideal for indoor banquet halls or clubhouses with 30-75 guests. Adapts easily to day or evening ambient lighting.",
      advantages: "Photographs exceptionally well with warm portrait lighting; balloons hold shape for 12+ hours; high aesthetic payoff for modest investment.",
      limitations: "Requires 2.5 hours of inflation and assembly setup before party commencement.",
      estimatedDecorCost: 2200,
      affordableCost: 1600,
      decorDetails: {
        balloons: "Organic garland of dusty pink, pastel blush, chrome gold, and pearl white (approx. 120 balloons).",
        flowers: "Artificial blush peonies and white baby's breath accents interwoven into the circular backdrop.",
        backdrop: "Round 6.5ft golden metal mesh or arched acrylic frame with custom birthday neon sign.",
        lighting: "Warm white fairy light curtains behind backdrop plus 2 warm up-lights for photographic depth.",
        tableDecor: "White linen runners, gold geometric tea light holders, and printed floral milestone signs.",
        entrance: "Charcoal & blush welcome chalkboard easel draped with a mini balloon cluster.",
        photoBooth: "Handheld custom Instagram polaroid selfie cutout with blush props & party glasses.",
        cakeTableStyling: "Gold mirror-top cake pedestal flanked by blush cupcake tiers and gold candleholders."
      },
      moodBoard: {
        primaryColor: "#D66B91",
        accentColor: "#F7D794",
        styleTag: "Modern Royal Chic",
        visualConcepts: [
          { label: "Grand Stage & Backdrop", concept: "Circular gold ring arch with organic blush & ivory balloon cascade, accented with warm script LED neon sign 'Happy Birthday'." },
          { label: "Cake & Dessert Table", concept: "Mirrored cylindrical plinths at varying heights with gold cake knife, blush chiffon drape, and fairy string canopy." },
          { label: "Guest Dining & Scape", concept: "Crisp white banquet tablecloths with dusty rose runners, brass tea-light votives, and personalized name tent cards." },
          { label: "Ambient Twilight Glow", concept: "3000K warm white ceiling fairy nets, ambient perimeter uplights, and battery-operated floating tea lights in clear glass bowls." }
        ]
      },
      materials: [
        "120 Metallic & Pastel Balloons (Blush Pink, Gold, Pearl)",
        "Balloon arch strip tape & glue dots (₹150)",
        "Warm LED fairy light curtain 3x3m (Reusable - ₹400)",
        "Golden foil 'Happy Birthday' banner or neon rental (₹500)",
        "Artificial flower vines & eucalyptus garland (₹350)"
      ],
      diyAlternatives: "Inflate balloons using a handheld electric pump with family. Use existing hall walls with fairy light curtains rather than renting heavy wooden partitions."
    },
    {
      id: "theme_b2",
      title: "White Floral Minimalism & Candlelight",
      vibe: "Understated luxury, pristine whites, lush botanicals",
      palette: ["#FFFFFF", "#F3EEF1", "#827982", "#A8D5BA", "#302A30"],
      paletteNames: ["Alabaster White", "Pale Blush", "Muted Grey", "Sage Green", "Charcoal"],
      badge: "Clean & Contemporary",
      bestFitReason: "Maximizes visual impact in indoor halls by using minimalist foliage and warm candlelight without heavy balloon clutter.",
      suitability: "Perfect for intimate gatherings (25-60 guests) in boutique halls, restaurants, or home living rooms.",
      advantages: "Zero plastic waste; smells magnificent with fresh Rajnigandha; exudes serene timeless sophistication.",
      limitations: "Fresh flowers must be procured on the morning of the event to preserve crisp freshness.",
      estimatedDecorCost: 1950,
      affordableCost: 1400,
      decorDetails: {
        balloons: "Minimal accent cluster in matte ivory and sand white at the base of the welcome easel.",
        flowers: "Fresh rajnigandha (tuberose) strings paired with local white marigolds and eucalyptus.",
        backdrop: "Sheer white chiffon drape with vertical warm micro-LED rice light strands.",
        lighting: "Floating candles in glass cylinders and low-heat fairy string lights.",
        tableDecor: "Monochrome white table linen with glass bottles holding single-stem white blooms.",
        entrance: "Fresh tuberose toran over doorframe with brass urli holding water and floating rose petals.",
        photoBooth: "Minimalist white foam board backdrop with customized calligraphy name decal.",
        cakeTableStyling: "Clean marble-finish cake stand with single white peony bloom and floating votives."
      },
      moodBoard: {
        primaryColor: "#FFFFFF",
        accentColor: "#A8D5BA",
        styleTag: "Botanical Minimalist",
        visualConcepts: [
          { label: "Pristine Chiffon Altar", concept: "Draped semi-sheer ivory curtains with delicate vertical strings of fragrant white tuberose (rajnigandha)." },
          { label: "Candlelit Dining Centerpieces", concept: "Multi-height clear glass cylinder sleeves with floating white tea candles on sage green eucalyptus sprigs." },
          { label: "Traditional Urli Entrance", concept: "Antiqued brass urli bowl placed at the threshold filled with water, floating white rose heads, and brass samai lamps." }
        ]
      },
      materials: [
        "Fresh white flowers & tuberose from local mandi (₹600)",
        "Sheer white curtain drapes 2 pieces (₹500)",
        "Glass cylinder vases / mason jars with tea candles (₹300)",
        "Fairy lights warm white (₹350)",
        "Foam board for personalized welcome sign (₹200)"
      ],
      diyAlternatives: "Repurpose household glass jars as candle lanterns; procure fresh flowers from the local morning wholesale mandi for 60% savings."
    },
    {
      id: "theme_b3",
      title: "Pastel Garden Picnic & Fairy Lights",
      vibe: "Playful, joyful, whimsical garden fantasy indoor",
      palette: ["#F8E4EB", "#E2B6CF", "#CBE7C6", "#FFF9E6", "#29262B"],
      paletteNames: ["Pastel Blossom", "Lilac Mauve", "Mint Sprout", "Buttercream", "Charcoal Accent"],
      badge: "Whimsical & Fun",
      bestFitReason: "Transforms an indoor hall into a blooming spring garden using pastel paper rosettes, fairy festoons, and faux greenery.",
      suitability: "Exceptional for 1st-10th birthdays and daytime celebrations with 40-100 guests including kids.",
      advantages: "Highly engaging for children and families; vibrant Instagram photo opportunities; easy DIY setup.",
      limitations: "Requires hanging points or ceiling grid for stringing festoon lights.",
      estimatedDecorCost: 1600,
      affordableCost: 1100,
      decorDetails: {
        balloons: "Pastel multi-colored cluster garland in soft pink, lavender, mint green, and pale butter yellow.",
        flowers: "Paper craft floral pom-poms combined with dried baby's breath.",
        backdrop: "Faux grass carpet backdrop panel with pastel paper pinwheels and hanging fairy bulbs.",
        lighting: "Festoon party bulbs across the ceiling grid and warm fairy net.",
        tableDecor: "Gingham pastel runners, mini wooden easels with photos of the birthday person.",
        entrance: "Wooden directional arrow signpost ('Food This Way', 'Photo Op', 'Cake Zone').",
        photoBooth: "Vintage bicycle prop with floral wicker basket and fairy lights.",
        cakeTableStyling: "Rustic wooden tree-slice cake platter bordered by pastel macarons and paper butterflies."
      },
      moodBoard: {
        primaryColor: "#E2B6CF",
        accentColor: "#CBE7C6",
        styleTag: "Playful Spring Carnival",
        visualConcepts: [
          { label: "Faux Grass Stage Wall", concept: "Lush green grass turf panel adorned with colorful handcrafted paper rosettes and warm fairy festoons." },
          { label: "Rustic Directional Signage", concept: "Chalk-painted pastel wooden arrows pointing to Cake Corner, Selfie Station, and Chaat Bazaar." },
          { label: "Picnic Style Seating", concept: "Low seating with pastel pink cushions, gingham mats, and fairy-lit paper lantern canopies." }
        ]
      },
      materials: [
        "Pastel balloon pack (100 pcs) (₹300)",
        "Handmade paper pom-poms & streamers (₹250)",
        "Faux grass turf runner (₹450 rental/purchase)",
        "Ceiling fairy festoon lights (₹400)",
        "DIY wooden arrow props & chalk paint (₹200)"
      ],
      diyAlternatives: "Craft the paper flowers at home using crepe paper; rent fairy festoon strings from the local society electrician."
    }
  ],
  wedding: [
    {
      id: "theme_w1",
      title: "Royal Marigold & Temple Rose Elegance",
      vibe: "Timeless Indian heritage, vibrant saffron, auspicious brass",
      palette: ["#FFA801", "#FF5E57", "#D66B91", "#FFD32A", "#29262B"],
      paletteNames: ["Genda Orange", "Vermilion Rose", "Dusty Pink", "Haldi Yellow", "Deep Charcoal"],
      badge: "Grand Heritage Best Match",
      bestFitReason: "Traditional Indian wedding aura that smells divine with fresh marigolds and tuberose, creating stunning warm photographs in both day and evening lighting.",
      suitability: "Suitable for banquet halls, temple courtyards, and open lawns hosting 100-300 guests.",
      advantages: "Universally loved by all generations; naturally pest-repelling aroma; traditional auspicious blessings.",
      limitations: "Marigolds are dense and heavy, requiring sturdy bamboo or metal trussing.",
      estimatedDecorCost: 18000,
      affordableCost: 12500,
      decorDetails: {
        balloons: "Not used — strictly traditional natural botanicals.",
        flowers: "Orange & yellow genda (marigold) ladi curtains, fragrant rajnigandha, red rose petals.",
        backdrop: "Brass bells suspended on marigold garlands against a rich maroon or dusty pink fabric.",
        lighting: "Edison vintage hanging bulbs, heavy brass urlis with floating diyas and oil lamps.",
        tableDecor: "Brocade table runners, small brass planters with fresh marigold heads.",
        entrance: "Grand marigold toran arch with floral rangoli and bell chimes.",
        photoBooth: "Traditional wooden swing (jhoola) laden with genda phool and silk cushions.",
        cakeTableStyling: "Traditional brass thali styling with marigold border and ethnic diya lamps."
      },
      moodBoard: {
        primaryColor: "#FFA801",
        accentColor: "#FF5E57",
        styleTag: "Auspicious Heritage",
        visualConcepts: [
          { label: "Marigold Curtain Mandap", concept: "Dense vertical ropes of fresh yellow & saffron marigolds accented with brass temple bells." },
          { label: "Floral Rangoli Threshold", concept: "Intricate 8-foot floral carpet of orange petals, red roses, and brass oil lamps at the banquet foyer." },
          { label: "Royal Jhoola Photo Spot", concept: "Carved teak swing adorned with fresh marigold tassels and rich silk bolster cushions." }
        ]
      },
      materials: [
        "Fresh marigold malas (100 garlands - ₹2,500 bulk mandi)",
        "Rajnigandha strings (₹1,500)",
        "Brass urlis & diyas (₹1,200 rental)",
        "Draped ethnic curtains (₹2,000 rental)",
        "Warm spotlight cans (₹1,800 rental)"
      ],
      diyAlternatives: "Assemble marigold hangings with family support on Haldi eve; rent brass vessels from local temple trusts or catering utensil providers."
    }
  ]
};

/**
 * Realistic Indian Food & Catering Planner Database
 * With realistic per-guest estimates in INR (₹)
 */
const INDIAN_FOOD_DATABASE = {
  budgetTierPerGuest: {
    budget: { min: 60, max: 120, label: "Snack & High Tea / Express Buffet" },
    standard: { min: 180, max: 350, label: "Full Standard Indian Buffet (3 Courses)" },
    premium: { min: 450, max: 800, label: "Royal Banquet with Live Counters" }
  },

  welcomeDrinks: [
    { name: "Chilled Gulab Sharbat (Rose Milk)", type: "veg", tag: "Crowd Favorite", costPerGuest: 15 },
    { name: "Aam Panna / Jaljeera Cooler", type: "veg", tag: "Refreshing Indian Classic", costPerGuest: 12 },
    { name: "Fresh Virgin Mint Mojito", type: "veg", tag: "Modern & Crisp", costPerGuest: 20 },
    { name: "Adrak Masala Chai & Filter Coffee Urn", type: "veg", tag: "High Tea Essential", costPerGuest: 15 },
    { name: "Thandai with Dry Fruits", type: "veg", tag: "Festive Special", costPerGuest: 25 }
  ],

  starters: [
    { name: "Crispy Cocktail Samosas with Mint & Tamarind Chutney", type: "veg", costPerGuest: 20 },
    { name: "Tandoori Paneer Tikka Skewers", type: "veg", costPerGuest: 45 },
    { name: "Hara Bhara Kabab with Cashew Nut", type: "veg", costPerGuest: 30 },
    { name: "Veg Spring Rolls with Sweet Chilli Dip", type: "veg", costPerGuest: 25 },
    { name: "Live Sev Puri & Dahi Puri Chaat Counter", type: "veg", costPerGuest: 40 },
    { name: "Murgh Malai Tikka (Chicken Starters)", type: "non-veg", costPerGuest: 65 },
    { name: "Amritsari Fish Fingers with Tartar Sauce", type: "non-veg", costPerGuest: 75 }
  ],

  mainCourse: [
    { name: "Paneer Butter Masala / Shahi Paneer", type: "veg", costPerGuest: 50 },
    { name: "Dal Makhani Slow-cooked Overnight", type: "veg", costPerGuest: 35 },
    { name: "Seasonal Mixed Vegetable / Pindi Chhole", type: "veg", costPerGuest: 30 },
    { name: "Fragrant Jeera Rice & Peas Pulao", type: "veg", costPerGuest: 25 },
    { name: "Hyderabadi Veg Dum Biryani with Burani Raita", type: "veg", costPerGuest: 45 },
    { name: "Butter Naan, Tandoori Roti & Missi Roti Basket", type: "veg", costPerGuest: 25 },
    { name: "Dum Murgh Biryani (Chicken)", type: "non-veg", costPerGuest: 80 },
    { name: "Mutton Rogan Josh with Steamed Basmati", type: "non-veg", costPerGuest: 120 }
  ],

  desserts: [
    { name: "Hot Angoori Gulab Jamun in Saffron Syrup", type: "veg", costPerGuest: 20 },
    { name: "Soft Kesar Rasmalai garnished with Pistachios", type: "veg", costPerGuest: 35 },
    { name: "Moong Dal Halwa with Pure Ghee", type: "veg", costPerGuest: 30 },
    { name: "Vanilla / Chocolate Truffle Ice Cream Cups", type: "veg", costPerGuest: 15 },
    { name: "Live Jalebi & Rabdi Counter", type: "veg", costPerGuest: 35 }
  ],

  cakes: [
    { name: "1 kg Fresh Fruit & Vanilla Cream Cake", estimatedCost: 750, suitableFor: "20-30 guests" },
    { name: "1.5 kg Dutch Chocolate Truffle Birthday Cake", estimatedCost: 1200, suitableFor: "35-50 guests" },
    { name: "2 kg 2-Tier Customized Fondant / Buttercream Cake", estimatedCost: 1800, suitableFor: "50-70 guests" },
    { name: "3 kg Grand Multi-Tier Wedding Cake with Edible Florals", estimatedCost: 3500, suitableFor: "100+ guests" }
  ]
};

/**
 * Multilingual AI Invitation Generator Bank
 * English, Hindi (हिंदी), and Marathi (मराठी)
 */
const INVITATION_TEMPLATES = {
  english: {
    formal: (d) => `You are cordially invited to celebrate the joyful occasion of ${d.name}.\n\nDate: ${d.date}\nTime: ${d.time || "6:00 PM onwards"}\nVenue: ${d.location}\n\nWe look forward to your gracious presence and blessings to make this milestone truly memorable.\n\nPlease RSVP: ${d.rsvpLink || "Reply to this message"}\n\nWarm regards,\n${d.host || "The Host Family"}`,
    elegant: (d) => `A celebration of joy, memories, and togetherness! ✨\n\nPlease join us for ${d.name} as we celebrate in style.\n\n📅 Date: ${d.date}\n⏰ Time: ${d.time || "6:30 PM"}\n📍 Location: ${d.location}\n🎨 Dress Code / Theme: ${d.theme || "Pastel & Elegant"}\n\nConfirm your presence here: ${d.rsvpLink || "Reply on WhatsApp"}\n\nYour presence will add warmth and brightness to our evening!\n\nRSVP: ${d.host || "Family & Friends"}`,
    friendly: (d) => `Hey everyone! 🎉\n\nIt’s time to celebrate! We are throwing a party for ${d.name} and it wouldn't be complete without you!\n\nWhen: ${d.date} at ${d.time || "6:00 PM"}\nWhere: ${d.location}\n\nRSVP link: ${d.rsvpLink || "Let us know if you're coming!"}\n\nGet ready for good music, great food, fun games, and unforgettable memories!\n\nCheers,\n${d.host || "The Hosts"}`,
    traditional: (d) => `|| Shree Ganeshay Namah || 🙏\n\nWith the blessings of our elders and almighty, we solicit your gracious presence on the auspicious occasion of ${d.name}.\n\nDate: ${d.date}\nMuhurat / Time: ${d.time || "7:00 PM"}\nVenue: ${d.location}\n\nPlease confirm attendance: ${d.rsvpLink || "Contact the family"}\n\nPlease join us with your family and bestow your heartfelt blessings.\n\nCordially invited by:\n${d.host || "The Family"}`,
    fun: (d) => `Party Alert! 🎈✨\n\nNo excuses accepted! Join us for an evening of cake, music, laughs, and pure celebration at ${d.name}!\n\nSave the date: ${d.date} from ${d.time || "5:30 PM"}\nParty Spot: ${d.location}\nTheme: ${d.theme || "Celebration Vibes"}\n\nConfirm your spot here: ${d.rsvpLink || "Reply with a Yes!"}\n\nDrop in hungry and ready to dance! 💃🕺\n\n- ${d.host || "The Party Squad"}`
  },
  hindi: {
    formal: (d) => `सादर नमस्कार,\n\nआपको अत्यंत हर्ष के साथ ${d.name} के शुभ अवसर पर आमंत्रित किया जाता है।\n\nदिनांक: ${d.date}\nसमय: ${d.time || "सायं 6:30 बजे से"}\nस्थान: ${d.location}\n\nकृपया अपनी उपस्थिति की पुष्टि करें: ${d.rsvpLink || "WhatsApp पर उत्तर दें"}\n\nकृपया अपनी गरिमामयी उपस्थिति से इस उत्सव की शोभा बढ़ाएं।\n\nविनीत:\n${d.host || "समस्त परिवार"}`,
    elegant: (d) => `खुशियों और यादों का एक खूबसूरत शाम! ✨\n\n${d.name} के इस खास मौके पर आप सादर आमंत्रित हैं।\n\n📅 तारीख: ${d.date}\n⏰ समय: ${d.time || "शाम 6:00 बजे"}\n📍 स्थान: ${d.location}\nथीम: ${d.theme || "एलिगेंट पेस्टल"}\n\nRSVP लिंक: ${d.rsvpLink || "संपर्क करें"}\n\nआपकी उपस्थिति हमारे इस जश्न को और भी खास बनाएगी।\n\nस्नेही:\n${d.host || "आयोजक"}`,
    traditional: (d) => `॥ श्री गणेशाय नमः ॥ 🙏\n\nबड़ों के आशीर्वाद एवं प्रभु की असीम कृपा से, हमारे यहाँ ${d.name} का शुभ आयोजन सुनिश्चित हुआ है।\n\nदिनांक: ${d.date}\nसमय: ${d.time || "शाम 7:00 बजे"}\nस्थान: ${d.location}\n\nकृपया उपस्थिति सूचित करें: ${d.rsvpLink || "संदेश भेजें"}\n\nआप सपरिवार पधारकर हमें अनुग्रहीत करें एवं अपना स्नेह व शुभाशीर्वाद प्रदान करें।\n\nदर्शनाभिलाषी:\n${d.host || "परिवार जन"}`,
    friendly: (d) => `नमस्ते दोस्तों! 🎉\n\nजश्न की घड़ी आ गई है! हम ${d.name} का धमाकेदार सेलिब्रेशन कर रहे हैं और आपके बिना यह पार्टी अधूरी है।\n\nकब: ${d.date}, ${d.time || "शाम 6:30 बजे"}\nकहाँ: ${d.location}\n\nRSVP लिंक: ${d.rsvpLink || "जल्द बताएं"}\n\nशानदार संगीत, लजीज खाना और ढेर सारी मस्ती आपका इंतजार कर रही है!\n\nमिलते हैं!\n${d.host || "आपके दोस्त"}`,
    fun: (d) => `पार्टी अलर्ट! 🎈🕺\n\nना कोई बहाना, सबको आना है! ${d.name} में केक, डांस और मौज-मस्ती के लिए तैयार हो जाइए।\n\nतारीख: ${d.date}\nजगह: ${d.location}\nसमय: ${d.time || "शाम 5:30 से"}\n\nRSVP: ${d.rsvpLink || "यस भेजें"}\n\nभूखे पेट और मुस्कुराते चेहरे के साथ पधारें!\n- ${d.host || "पार्टी टीम"}`
  },
  marathi: {
    formal: (d) => `सस्नेह नमस्कार,\n\nआमच्या येथे ${d.name} चे शुभकार्य आयोजित केले आहे. या आनंदोत्सवास आपली उपस्थिती प्रार्थनीय आहे.\n\nदिनांक: ${d.date}\nवेळ: ${d.time || "सायंकाळी ६:३० वाजता"}\nस्थळ: ${d.location}\n\nकृपया उपस्थितीची नोंद करावी: ${d.rsvpLink || "WhatsApp वर कळवा"}\n\nकृपया सहकुटुंब उपस्थित राहून कार्यक्रमाची शोभा वाढवावी ही नम्र विनंती.\n\nआपले नम्र,\n${d.host || "समस्त परिवार"}`,
    elegant: (d) => `आनंदाचे क्षण आणि सुखद आठवणींचा सोहळा! ✨\n\n${d.name} निमित्त आयोजित विशेष सोहळ्यात आपण आग्रहाचे निमंत्रित आहात.\n\n📅 दिनांक: ${d.date}\n⏰ वेळ: ${d.time || "सायंकाळी ६:०० वाजता"}\n📍 स्थळ: ${d.location}\nरंगसंगती/थीम: ${d.theme || "पेस्टल व राजेशाही"}\n\nRSVP लिंक: ${d.rsvpLink || "नोंदवा"}\n\nआपल्या उपस्थितीने हा आनंद द्विगुणीत होईल.\n\nस्नेही:\n${d.host || "निमंत्रक"}`,
    traditional: (d) => `॥ श्री गणेशाय नमः ॥ 🙏\n\nकुलदैवताच्या कृपेने व वडीलधाऱ्यांच्या आशीर्वादाने, आमच्या येथे ${d.name} चे आयोजन करण्याचे योजिले आहे.\n\nदिनांक: ${d.date}\nमुहूर्त/वेळ: ${d.time || "संध्याकाळी ७:०० वाजता"}\nकार्यक्रम स्थळ: ${d.location}\n\nउपस्थिती नोंदणी: ${d.rsvpLink || "कळवावे"}\n\nतरी आपण सहपरिवार उपस्थित राहून शुभाशीर्वाद द्यावेत ही विनंती.\n\nनिमंत्रक:\n${d.host || "परिवार"}`,
    friendly: (d) => `नमस्कार मित्रांनो! 🎉\n\nएक आनंदाची बातमी! आपण सगळे मिळून ${d.name} चे सेलिब्रेशन करत आहोत. भरपूर गप्पा, मस्त गाणी आणि लज्जतदार जेवण!\n\nतारीख: ${d.date}\nवेळ: ${d.time || "सायंकाळी ६:३० वाजता"}\nठिकाण: ${d.location}\n\nयेणार का? इथे नोंदवा: ${d.rsvpLink || "आम्हाला सांगा"}\n\nनक्की यायचं बरं का!\n\nआपले,\n${d.host || "मित्रमंडळ"}`,
    fun: (d) => `धमाल पार्टी अलर्ट! 🎈🎉\n\nकुठलंही कारण चालणार नाही, प्रत्येकाने यायलाच हवं! ${d.name} मध्ये केक कटिंग, नाच-गाणी आणि मनसोक्त धम्माल होणार आहे!\n\nकधी: ${d.date}\nकुठे: ${d.location}\nवेळ: ${d.time || "सायंकाळी ५:३० पासून"}\n\nRSVP: ${d.rsvpLink || "लगेच कन्फर्म करा"}\n\nभेटूया थेट पार्टीत!\n- ${d.host || "पार्टी ग्रुप"}`
  }
};

/**
 * Event-Day Emergency Action Playbooks
 * Concrete Indian event emergency solutions
 */
const EMERGENCY_PLAYBOOKS = {
  vendor_late: {
    id: "vendor_late",
    title: "Vendor Running Late (Decorator / Caterer / Sound)",
    icon: "🏃",
    urgency: "High",
    summary: "Immediate protocol to handle vendor tardiness without guest disruption.",
    actionSteps: [
      "Call vendor directly (not WhatsApp) and demand live GPS location share.",
      "If decorator is delayed: Position welcome board and entrance music first. Dim main hall lights and play warm playlist to mask unfinished perimeter decor.",
      "If cake is delayed: Shift cake cutting by 30 minutes in the schedule. Begin interactive games (Tambola, Antakshari, or photo-booth sessions) to keep guests engaged.",
      "If caterer arrives late: Immediately dispatch venue team to serve welcome drinks (Rose Sharbat / Chai) and dry snacks (cashews / biscuits) to keep guests content.",
      "Assign one dedicated family member or co-host as the sole vendor liaison so the primary host remains attentive to guests."
    ],
    quickFix: "Extend the welcome drink & informal photo-op window by 25-35 minutes. Guests rarely notice slight delays if drinks and music are flowing."
  },
  cake_missing: {
    id: "cake_missing",
    title: "Cake Damaged or Delivery Missing",
    icon: "🎂",
    urgency: "Critical",
    summary: "Emergency rapid procurement protocol for ruined or missing celebration cake.",
    actionSteps: [
      "Contact nearest premium bakery (Theobroma, Monginis, Ribbons & Balloons, local hot bakery) for a ready-made 1kg Dutch Chocolate or Fresh Fruit cake.",
      "Order via Swiggy Instamart / Blinkit / Zepto: Fresh gourmet cupcakes or pastry boxes can arrive in 15-20 minutes as a stylish alternative.",
      "Procure a sparkling birthday cake topper or celebratory candles from a local novelty stall to dress up the substitute cake immediately.",
      "Arrange the replacement on a brass or mirrored pedestal surrounded by fresh flower petals to disguise quick procurement."
    ],
    quickFix: "A ready-to-go 1kg truffle cake from a nearby bakery + fresh rose petal border looks intentional, royal, and saves the milestone moment."
  },
  guest_surge: {
    id: "guest_surge",
    title: "Unexpected Guest Surge (+10 to +25 Extra Attendees)",
    icon: "👥",
    urgency: "Medium-High",
    summary: "How to manage extra family & unexpected plus-ones without food shortage or seating chaos.",
    actionSteps: [
      "Immediately alert head catering captain / Maharaj: Request kitchen to dilute rich gravies slightly with warm milk/butter and prepare an emergency batch of Jeera Rice & Dal Tadka.",
      "Order 20 additional hot cocktail samosas or paneer rolls from the nearest trusted sweet shop as appetizer buffers.",
      "Deploy 10-15 stackable banquet chairs along the perimeter from the hall store room.",
      "Switch from plated dessert to bite-sized Angoori Gulab Jamun so portions stretch comfortably without anyone feeling shortchanged."
    ],
    quickFix: "Indian caterers routinely build a 10% food margin. Instructing the buffet staff to serve smaller initial helpings ensures all 65+ guests dine comfortably."
  },
  rain_weather: {
    id: "rain_weather",
    title: "Unexpected Rain or Power Outage",
    icon: "🌧️",
    urgency: "Critical",
    summary: "Weather contingency and electricity restoration steps.",
    actionSteps: [
      "If outdoor lawn: Move sound system, cake table, and elders under the permanent shamiana or covered gazebo immediately.",
      "Power failure: Contact society / banquet manager to trigger the backup diesel generator (DG set). It usually requires 3 minutes to kick in.",
      "Deploy battery-operated fairy lights and mobile flashlights inside glass jars as atmospheric candlelights.",
      "Protect photographic gear and electrical sound extension cords from ground moisture using plastic crates or tarps."
    ],
    quickFix: "Candlelight in glass hurricanes combined with acoustic unplugged singing turns a power cut into a cherished, intimate romantic memory."
  },
  food_shortage: {
    id: "food_shortage",
    title: "Buffet Food Running Dangerously Low",
    icon: "🍲",
    urgency: "Critical",
    summary: "Crisis kitchen protocol when main course items deplete faster than expected.",
    actionSteps: [
      "Instruct buffet servers to temporarily slow down refilling while the kitchen churns out rapid reinforcements.",
      "Quick Kitchen Reinforcements: 10 minutes to boil fresh Basmati rice for Jeera Pulao, 8 minutes to prepare hot Puri or Tawa Parathas.",
      "Express Delivery: Place an urgent bulk order for 5 biryani handis or Dal Makhani from a top nearby restaurant via Zomato/Swiggy with priority delivery.",
      "Bring out dessert and ice cream early for guests who have finished their main meal."
    ],
    quickFix: "Hot fresh puris with Chhole or Dal Makhani take under 15 minutes to fry in bulk and delight guests as special fresh-made offerings."
  },
  schedule_delay: {
    id: "schedule_delay",
    title: "Program Running 1+ Hours Behind Schedule",
    icon: "⏱️",
    urgency: "Medium",
    summary: "Run-of-show compression playbook to catch up without rushing guests.",
    actionSteps: [
      "Compress speech and felicitation rounds: Limit each speaker to 2 minutes maximum.",
      "Open dinner buffet concurrently with the background performances or sangeet dances rather than waiting for ceremonies to end.",
      "Group photo protocol: Have photographer click table-by-table group shots instead of individual family stage queues.",
      "Prepare return gift hampers at the exit foyer so departing guests can receive them seamlessly."
    ],
    quickFix: "Opening the dinner buffet 20 minutes early allows hungry seniors and kids to eat comfortably while stage performances continue."
  },
  decor_tear: {
    id: "decor_tear",
    title: "Torn Backdrop / Burst Balloons / Decor Failure",
    icon: "🌸",
    urgency: "Medium",
    summary: "Quick fixes for damaged stage decor or sagging balloon arches.",
    actionSteps: [
      "Use safety pins, double-sided foam tape, or zip ties (every host's emergency kit) to cinch sagging balloon arches onto backdrop poles.",
      "If fabric tears: Drape an ethnic zari dupatta, chiffon scarf, or fairy light curtain directly over the damaged area.",
      "Move the welcome easel and floral floor planters closer to the central backdrop to cover blank spots.",
      "Dim stage floodlights and rely on warm string lights to mask backdrop imperfections."
    ],
    quickFix: "A strategically placed vertical fairy light curtain hides tears, wrinkles, and missing balloons with sparkling magic."
  }
};

/**
 * AI Budget Optimization Rules Matrix
 * Analyzes expenses and proposes affordable Indian celebration substitutes
 */
const BUDGET_OPTIMIZATION_RULES = [
  {
    category: "decoration",
    threshold: 2000,
    title: "Switch to Hybrid DIY Balloon & Fairy Light Arch",
    savingPct: 0.28,
    impact: "Low visual impact. Keeps the aesthetic pink and gold vibe intact while saving approx 28% by using home inflation tools and reusable curtain fairy lights.",
    tradeOff: "Requires 1 hour of volunteer help before the party to inflate balloons."
  },
  {
    category: "food",
    threshold: 2500,
    title: "Streamline Starters & Opt for High-Impact Buffet",
    savingPct: 0.18,
    impact: "Saves ₹500 - ₹1,500 by replacing 4 pre-plated starters with 2 crowd-favorite hot starters (Paneer Tikka & Samosas) and focusing on a rich main course.",
    tradeOff: "Fewer starter varieties, but guests enjoy hotter, fresher main meals."
  },
  {
    category: "cake",
    threshold: 1200,
    title: "1.5 kg Centerpiece Cake + Gourmet Pastry Cups",
    savingPct: 0.25,
    impact: "Ordering a 1.5kg custom designer cake for the ceremony and supplementing with fresh bakery pastries saves 25% compared to a heavy 3kg fondant cake.",
    tradeOff: "Smaller main cake, but identical delicious taste and easier distribution."
  },
  {
    category: "photography",
    threshold: 1500,
    title: "Hire Freelance / Student Portrait Photographer (3 Hrs)",
    savingPct: 0.35,
    impact: "Book a talented photography student or freelancer for the core 3-hour celebration window instead of an expensive full-day studio crew.",
    tradeOff: "Digital edited delivery provided via Google Drive rather than physical printed album."
  },
  {
    category: "invitations",
    threshold: 500,
    title: "100% Paperless WhatsApp Video & PDF Invitation",
    savingPct: 0.70,
    impact: "Eliminates paper printing, courier delays, and printing waste. Digital invites look modern and include direct clickable Google Maps pins.",
    tradeOff: "Elderly relatives might still prefer a polite personal phone call."
  },
  {
    category: "entertainment",
    threshold: 800,
    title: "Interactive Bollywood Tambola & Curated PA Playlist",
    savingPct: 0.40,
    impact: "Connect a high-wattage party Bluetooth speaker to a curated Spotify Bollywood dance playlist and host lively family Tambola / Housie.",
    tradeOff: "No live human DJ, but family members get to pick their favorite songs."
  }
];

/**
 * Indian Activities, Games & Entertainment Bank
 */
const INDIAN_ACTIVITIES_DATABASE = {
  birthday: [
    { name: "Bollywood Tambola / Musical Housie", cost: 150, isFree: false, duration: "30 mins", desc: "Classic Indian Tambola with Bollywood movie song cues instead of dry numbers. Prizes for Early Five, Lines & Full House." },
    { name: "Musical Chairs with Dhol & Retro Beats", cost: 0, isFree: true, duration: "25 mins", desc: "All-time favorite game with upbeat Punjabi & Bollywood dance tracks. Zero extra cost." },
    { name: "Pass the Parcel with Fun Dares", cost: 100, isFree: false, duration: "20 mins", desc: "Parcel wrapped with funny tasks (sing like Kishore Kumar, mimic a family member, dance like Mithun)." },
    { name: "Instant Polaroid Photo Booth & Memory Book", cost: 800, isFree: false, duration: "Ongoing", desc: "Guests click instant photos, stick them into a scrapbook, and write blessings with pastel pens." },
    { name: "Kids Balloon Twisting & Tattoo Artist", cost: 1200, isFree: false, duration: "1.5 hours", desc: "Delightful for 1st-5th birthday parties; balloon swords, crowns & wash-off glitter tattoos." }
  ],
  wedding: [
    { name: "Sangeet Dance Face-off (Ladkewale vs Ladkiwale)", cost: 0, isFree: true, duration: "45 mins", desc: "Friendly choreographed dance competition judged by senior grandparents with symbolic prizes." },
    { name: "Live Acoustic Dholki & Folk Tappe Singer", cost: 3500, isFree: false, duration: "2 hours", desc: "Soulful Haldi / Mehendi session with live traditional dholki and Punjabi/Rajasthani folk songs." },
    { name: "Audio Guestbook Rotary Telephone Booth", cost: 2000, isFree: false, duration: "Full Evening", desc: "Vintage pastel telephone where guests record emotional voice messages for the bride & groom." },
    { name: "Shoe Game (Couple Compatibility Quiz)", cost: 0, isFree: true, duration: "20 mins", desc: "Bride and groom sit back-to-back holding each other's shoes, answering hilarious questions." }
  ],
  college: [
    { name: "Open Mic & Standup Comedy Jam", cost: 0, isFree: true, duration: "1 hour", desc: "Stage time for student comedians, spoken word poets, and mimicry artists." },
    { name: "Silent Disco / DJ Beatdrop Tournament", cost: 4000, isFree: false, duration: "2 hours", desc: "Wireless dual-channel headphones letting students switch between EDM and Bollywood pop." },
    { name: "Campus Photo Scavenger Hunt", cost: 200, isFree: false, duration: "45 mins", desc: "Teams solve cryptic riddles across campus buildings taking selfie proofs within 30 minutes." }
  ],
  community: [
    { name: "Antakshari Championship (Wing A vs Wing B)", cost: 0, isFree: true, duration: "1 hour", desc: "Neighborhood singing battle with buzzer rounds, audio song clips, and family medleys." },
    { name: "Traditional Garba & Dandiya Raas Round", cost: 500, isFree: false, duration: "1.5 hours", desc: "High-spirited circle dancing with wooden dandiya sticks and live dhol beats." },
    { name: "Eco Rangoli & DIY Clay Diya Workshop", cost: 400, isFree: false, duration: "45 mins", desc: "Family-friendly art corner for kids and seniors using organic flower petals and non-toxic colors." }
  ]
};

/**
 * Gift Ideas across Realistic Indian Price Tiers (₹)
 */
const INDIAN_GIFT_SUGGESTIONS = [
  { tier: "Budget-Friendly (₹200 - ₹500)", items: [
    { title: "Personalized Ceramic Mug with Photo & Coaster", estPrice: 299, occasion: "Birthdays / Farewell" },
    { title: "Box of Artisanal Kaju Katli / Assorted Dry Fruits (250g)", estPrice: 380, occasion: "All Occasions" },
    { title: "Aromatic Soy Wax Scented Candle in Tin Jar", estPrice: 349, occasion: "Anniversary / Housewarming" },
    { title: "Indoor Lucky Bamboo Plant in Ceramic Pot", estPrice: 299, occasion: "Return Gifts / College" }
  ]},
  { tier: "Thoughtful & Mid-Tier (₹500 - ₹1,500)", items: [
    { title: "Gourmet Chocolates & Exotic Herbal Tea Hamper", estPrice: 850, occasion: "Birthdays / Weddings" },
    { title: "Custom Engraved Wooden Plaque / Clock", estPrice: 950, occasion: "Anniversary / Milestones" },
    { title: "Silver-Plated Brass Pooja Thali Set", estPrice: 1200, occasion: "Traditional Festivals / Godh Bharai" },
    { title: "Amazon / BookMyShow Gift Card ₹1,000", estPrice: 1000, occasion: "Teen Birthday / College" }
  ]},
  { tier: "Premium & Cherished (₹1,500 - ₹5,000+)", items: [
    { title: "Pure Silver Coin (10g / 20g) with Lakshmi-Ganesh motif", estPrice: 2400, occasion: "Weddings / Shagun" },
    { title: "Designer Silk Dupatta / Kurta Gift Box", estPrice: 2800, occasion: "Engagement / Godh Bharai" },
    { title: "Smart Speaker (Amazon Echo / Google Nest Mini)", estPrice: 3200, occasion: "Tech Lovers / College Fest" },
    { title: "Luxury Perfume Set (Forest Essentials / Titan Skinn)", estPrice: 2600, occasion: "Anniversaries & 25th Jubilees" }
  ]}
];

/**
 * Practical Eco-Friendly & Waste Reduction Tips
 */
const ECO_FRIENDLY_TIPS = [
  { icon: "🌿", title: "Biodegradable Areca Palm Leaf Tableware", desc: "Replace single-use plastic plates with locally made areca palm leaf plates and wooden birch cutlery. Eco-friendly, sturdy, and cost-effective (₹4-₹6 per plate)." },
  { icon: "💌", title: "100% Paperless WhatsApp Video & PDF Invites", desc: "Save thousands of rupees and paper by sending stylish interactive digital invitations with direct Google Maps venue pins." },
  { icon: "🍲", title: "Surplus Food Donation Tie-up", desc: "Partner with local NGOs (like Feeding India or Robin Hood Army) to collect untouched surplus banquet food within 2 hours of dinner wrap-up." },
  { icon: "🌸", title: "Compostable Natural Floral Decor", desc: "Use fresh marigold, jasmine, and rajnigandha blooms that can be composted post-event rather than non-biodegradable PVC foam." },
  { icon: "🎁", title: "Living Return Gifts (Seed Pens & Plant Cuttings)", desc: "Delight guests with plantable seed pencils, mini jade succulents, or jute shopping bags as mindful return favors." }
];

/**
 * Realistic Pre-loaded Sample Celebrations in INR with Smart Guest RSVP rosters
 * Flagship sample: The exact Birthday Party from Section 16 of user request!
 */
const SAMPLE_PRESETS = [
  {
    id: "preset-sample-16",
    name: "Aarav's 1st Royal Birthday Celebration",
    type: "birthday",
    date: "2026-11-15",
    time: "06:00 PM",
    budget: 10000,
    guestCount: 50,
    location: "Greenwood Society Indoor Banquet Hall, Pune",
    theme: "Elegant Blush & Gold Royal Glam",
    dietary: "veg",
    priorities: "decoration",
    venueCostIncluded: false,
    venueCostNote: "Indoor society hall provided complimentary / pre-booked separately; venue allocation focused on decor & hospitality",
    customExpenses: {
      venue: 0,
      decoration: 2500,
      food: 3000,
      cake: 1500,
      photography: 1000,
      entertainment: 500,
      invitations: 200,
      gifts: 300,
      transport: 0,
      contingency: 1000
    },
    tasks: [
      { id: "t1", title: "Confirm society indoor banquet hall booking & AC clearance", stage: "early", category: "Venue", completed: true, dependsOn: "None" },
      { id: "t2", title: "Finalize Elegant Blush & Gold balloon arch & neon board", stage: "early", category: "Decor", completed: true, dependsOn: "Venue" },
      { id: "t3", title: "Order 1.5 kg customized Dutch chocolate birthday cake", stage: "mid", category: "Cake", completed: true, dependsOn: "Theme" },
      { id: "t4", title: "Confirm snack & dinner menu: Samosas, Paneer Tikka, Pulao & Gulab Jamun", stage: "mid", category: "Food", completed: false, dependsOn: "Guest count" },
      { id: "t5", title: "Send digital WhatsApp invitation card with Google Maps pin", stage: "mid", category: "Invites", completed: true, dependsOn: "Date & Time" },
      { id: "t6", title: "Arrange Tambola tickets, party music & musical chairs", stage: "week-of", category: "Activities", completed: false, dependsOn: "None" },
      { id: "t7", title: "Procure return gift hampers (mini plant pots & chocolate boxes)", stage: "week-of", category: "Gifts", completed: false, dependsOn: "Headcount" },
      { id: "t8", title: "Venue walkthrough, camera battery charging & sound check", stage: "day-of", category: "Logistics", completed: false, dependsOn: "Decor" }
    ],
    vendorChecklist: [
      { id: "v1", name: "Balloon & Floral Backdrop Decorator", category: "Decor", quantity: "1 Setup", estPrice: 2500, priority: "High", status: "Booked", notes: "Blush pink, gold balloons & warm fairy lights" },
      { id: "v2", name: "Bakery / Cake Designer", category: "Cake", quantity: "1.5 kg", estPrice: 1500, priority: "High", status: "Inquiry", notes: "Custom 'Aarav is 1' lettering with golden accents" },
      { id: "v3", name: "Local Halwai / Caterer", category: "Food", quantity: "50 plates", estPrice: 3000, priority: "High", status: "Inquiry", notes: "Welcome drinks + 2 starters + dinner buffet" },
      { id: "v4", name: "Portrait Photographer (Student / Freelancer)", category: "Photography", quantity: "2.5 Hours", estPrice: 1000, priority: "Medium", status: "Inquiry", notes: "Digital photos + edited candid highlights" },
      { id: "v5", name: "Tambola, Music Speaker & Party Games", category: "Entertainment", quantity: "1 Set", estPrice: 500, priority: "Low", status: "Procured", notes: "Bluetooth party speaker & housie ticket slips" },
      { id: "v6", name: "Return Gift Hampers (Dry fruits / Succulents)", category: "Gifts", quantity: "30 units", estPrice: 500, priority: "Medium", status: "Not Started", notes: "Packed in blush organza pouches" }
    ],
    guests: [
      { id: "g1", name: "Rajesh & Sunita Kulkarni (Grandparents)", phone: "+91 98220 11223", pax: 2, status: "Accepted", dietary: "Jain", inviteSent: true, notes: "No onion or garlic; seated near stage" },
      { id: "g2", name: "Amit & Pooja Deshmukh with Kids", phone: "+91 98901 23456", pax: 4, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Need high chair for baby" },
      { id: "g3", name: "Vikram & Neha Sharma", phone: "+91 94220 87654", pax: 2, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Arriving by 6:30 PM" },
      { id: "g4", name: "Dr. Sandeep & Priya Joshi", phone: "+91 98231 44556", pax: 3, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Family friends" },
      { id: "g5", name: "Kunal & Shreya Patil", phone: "+91 97654 32109", pax: 2, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Bringing acoustic guitar" },
      { id: "g6", name: "Aniket & Meera Roy", phone: "+91 91234 56780", pax: 2, status: "Declined", dietary: "Veg", inviteSent: true, notes: "Out of station on business" },
      { id: "g7", name: "Society Committee Members (Wing B)", phone: "+91 98500 77889", pax: 5, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Chairman & Secretary attending" },
      { id: "g8", name: "Gaurav & Ritu Mehta", phone: "+91 98210 99887", pax: 3, status: "Pending", dietary: "Veg", inviteSent: true, notes: "Follow-up message sent" },
      { id: "g9", name: "Siddharth & Tanvi Gore", phone: "+91 99887 66554", pax: 2, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Aarav's uncle & aunt" },
      { id: "g10", name: "Rohan & Sneha Gadgil", phone: "+91 98230 55443", pax: 3, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Bringing cousins" },
      { id: "g11", name: "Aditya & Divya Kadam", phone: "+91 97665 11223", pax: 2, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Arriving around 7:00 PM" },
      { id: "g12", name: "Manoj & Swati Verma", phone: "+91 94210 33445", pax: 4, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Confirmed on WhatsApp" },
      { id: "g13", name: "Preeti & Sameer Nambiar", phone: "+91 98900 12121", pax: 2, status: "Pending", dietary: "Veg", inviteSent: false, notes: "Draft invite prepared" }
    ]
  },
  {
    id: "preset-wedding-2",
    name: "Priya & Rohan's Sangeet & Engagement Soirée",
    type: "wedding",
    date: "2026-12-18",
    time: "07:00 PM",
    budget: 250000,
    guestCount: 150,
    location: "Shanti Lawns & Heritage Banquet, Thane, Mumbai",
    theme: "Royal Marigold & Temple Rose Elegance",
    dietary: "veg",
    priorities: "food",
    venueCostIncluded: true,
    venueCostNote: "Includes 6-hour banquet hall access with basic lighting & generator backup",
    customExpenses: {
      venue: 60000,
      decoration: 45000,
      food: 80000,
      cake: 7500,
      photography: 25000,
      entertainment: 10000,
      invitations: 2500,
      gifts: 5000,
      transport: 5000,
      contingency: 10000
    },
    tasks: [
      { id: "tw1", title: "Sign contract with Shanti Lawns & lock Sangeet date", stage: "early", category: "Venue", completed: true, dependsOn: "None" },
      { id: "tw2", title: "Reserve traditional & candid wedding photography duo", stage: "early", category: "Photography", completed: true, dependsOn: "Venue" },
      { id: "tw3", title: "Approve marigold floral canopy & stage backdrop sketches", stage: "mid", category: "Decor", completed: true, dependsOn: "Theme" },
      { id: "tw4", title: "Food tasting for Chaat stalls, Biryani & Jalebi Rabdi", stage: "mid", category: "Food", completed: false, dependsOn: "Guest count" },
      { id: "tw5", title: "Send digital video cards via WhatsApp & courier printed cards", stage: "mid", category: "Invites", completed: false, dependsOn: "Date & Time" },
      { id: "tw6", title: "Family Sangeet dance practice & DJ song medley list", stage: "week-of", category: "Entertainment", completed: false, dependsOn: "None" }
    ],
    vendorChecklist: [
      { id: "vw1", name: "Shanti Banquet & Lawn Rental", category: "Venue", quantity: "Full Evening", estPrice: 60000, priority: "High", status: "Booked", notes: "Includes AC banquet & generator backup" },
      { id: "vw2", name: "Floral Stage & Mandap Decorator", category: "Decor", quantity: "Stage + Entrance", estPrice: 45000, priority: "High", status: "Booked", notes: "Fresh genda phool, brass bells & fairy ceiling" },
      { id: "vw3", name: "Royal Caterers (Buffet & Live Chaat)", category: "Food", quantity: "150 plates", estPrice: 80000, priority: "High", status: "Inquiry", notes: "3 welcome drinks, 4 starters, 6 mains, 3 sweets" }
    ],
    guests: [
      { id: "gw1", name: "Groom's Immediate Family & Relatives", phone: "+91 98200 44332", pax: 45, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Requires safa tying" },
      { id: "gw2", name: "Bride's Immediate Family & Relatives", phone: "+91 98190 22110", pax: 55, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Sangeet performers" },
      { id: "gw3", name: "College Friends Roster", phone: "+91 99201 33445", pax: 25, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Flash mob dance planned" },
      { id: "gw4", name: "Corporate Colleagues (Rohan)", phone: "+91 98330 77665", pax: 15, status: "Pending", dietary: "Veg", inviteSent: true, notes: "Invitations dispatched" },
      { id: "gw5", name: "Overseas Relatives (US / UK)", phone: "+91 98200 11009", pax: 10, status: "Declined", dietary: "Veg", inviteSent: true, notes: "Sent warm video message" }
    ]
  },
  {
    id: "preset-college-3",
    name: "InnovateX 2026 — Annual Tech & Cultural Fest",
    type: "college",
    date: "2026-11-28",
    time: "09:30 AM",
    budget: 85000,
    guestCount: 250,
    location: "Main Campus Auditorium & Innovation Hall, Bengaluru",
    theme: "Cyber-Neon & Campus Pulse",
    dietary: "veg",
    priorities: "entertainment",
    venueCostIncluded: false,
    venueCostNote: "College auditorium provided gratis by department; funds allocated for sound, food & prizes",
    customExpenses: {
      venue: 5000,
      decoration: 12000,
      food: 34000,
      cake: 2000,
      photography: 8000,
      entertainment: 12000,
      invitations: 1000,
      gifts: 4000,
      transport: 2000,
      contingency: 5000
    },
    tasks: [
      { id: "tc1", title: "Obtain dean & security approval for 24-hr campus access", stage: "early", category: "Venue", completed: true, dependsOn: "None" },
      { id: "tc2", title: "Secure tech sponsor pool & problem statements", stage: "early", category: "Finance", completed: true, dependsOn: "None" },
      { id: "tc3", title: "Deploy participant registration portal & QR check-in", stage: "mid", category: "Tech", completed: true, dependsOn: "None" }
    ],
    vendorChecklist: [
      { id: "vc1", name: "College Canteen Bulk Catering", category: "Food", quantity: "250 Lunch Packets", estPrice: 34000, priority: "High", status: "Inquiry", notes: "Wholesome veg lunch + cold drinks" }
    ],
    guests: [
      { id: "gc1", name: "Hackathon Participant Teams (50 Teams)", phone: "+91 98450 12345", pax: 200, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Registered through campus portal" },
      { id: "gc2", name: "Industry Tech Mentors & Keynote Speakers", phone: "+91 98800 54321", pax: 15, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Special VIP seating" },
      { id: "gc3", name: "Faculty & Department Coordinators", phone: "+91 94480 98765", pax: 20, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Jury panelists" },
      { id: "gc4", name: "Alumni Visiting Delegates", phone: "+91 98441 22334", pax: 15, status: "Pending", dietary: "Veg", inviteSent: true, notes: "RSVP via LinkedIn" }
    ]
  },
  {
    id: "preset-community-4",
    name: "Gokuldham Society Diwali & Annaprashan Milan",
    type: "community",
    date: "2026-11-20",
    time: "05:30 PM",
    budget: 45000,
    guestCount: 120,
    location: "Society Central Courtyard & Amphitheatre, Ahmedabad",
    theme: "Festive Rangoli & Diya Twilight",
    dietary: "veg",
    priorities: "food",
    venueCostIncluded: false,
    venueCostNote: "Society common grounds utilized with society committee authorization",
    customExpenses: {
      venue: 2000,
      decoration: 11000,
      food: 20000,
      cake: 1500,
      photography: 3000,
      entertainment: 3500,
      invitations: 500,
      gifts: 1500,
      transport: 500,
      contingency: 1500
    },
    tasks: [
      { id: "tcm1", title: "Clubhouse booking & night illumination permission", stage: "early", category: "Venue", completed: true, dependsOn: "None" }
    ],
    vendorChecklist: [
      { id: "vcm1", name: "Live Street Food Counters (Pav Bhaji & Chaat)", category: "Food", quantity: "120 plates", estPrice: 20000, priority: "High", status: "Booked", notes: "₹165/plate live food stall" }
    ],
    guests: [
      { id: "gcm1", name: "Wing A Residents (24 Flats)", phone: "+91 98790 11223", pax: 48, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Participating in Rangoli contest" },
      { id: "gcm2", name: "Wing B Residents (20 Flats)", phone: "+91 98791 22334", pax: 40, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Organizing Antakshari" },
      { id: "gcm3", name: "Wing C Residents (16 Flats)", phone: "+91 98792 33445", pax: 22, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Kids dance performance" },
      { id: "gcm4", name: "Security & Facility Staff with Families", phone: "+91 98793 44556", pax: 10, status: "Accepted", dietary: "Veg", inviteSent: true, notes: "Honored society guests" }
    ]
  }
];
