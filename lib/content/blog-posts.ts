export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  readingTimeMinutes: number;
  authorName: string;
  featuredImage: string;
  relatedServiceHref: string;
  relatedServiceLabel: string;
  tags: string[];
  paragraphs: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'birthday-decoration-ideas-home-bangalore',
    title: 'Birthday Decoration at Home in Bangalore: What Actually Works',
    description:
      'Honest tips for birthday décor at home in Bangalore — room size, balloons, cake table, society rules, and what to skip.',
    datePublished: '2026-01-15',
    readingTimeMinutes: 6,
    authorName: 'We Decor Events',
    featuredImage: '/services/birthday.webp',
    relatedServiceHref: '/services/birthday-decoration',
    relatedServiceLabel: 'Birthday Decorations',
    tags: ['birthday', 'home decoration', 'bangalore', 'balloons'],
    paragraphs: [
      'Most home birthdays in Bangalore fail for the same reason: people buy too much stuff for a room that is already full of sofas. Start with the room photo, not the Pinterest board. If the living room is 10×12, one wall and a cake table is enough. Guests need a place to stand.',
      'Measure ceiling height. Many apartments in HSR, BTM, and JP Nagar sit under 9 feet. Tall arches look cramped and tip over when kids run past. Low organic garlands along one wall usually look better and leave the fan clear.',
      'Pick one focal point. Cake backdrop or entrance — not both on a small budget. The cake-cutting photo is what people keep. Put colour and lights there. Keep the rest of the house clean rather than half-decorated.',
      'Balloons still do most of the work. We rarely recommend helium outdoors after noon; Bangalore heat pops them. Air-filled garlands last longer and sit where you put them. Soft pastels and mixed sizes look current. Neon primary packs from the market look dated in photos.',
      'Kids themes sell themselves — jungle, princess, superhero — but scale them to the wall. A 6-foot panel is fine for most flats. Adult birthdays look better with fewer props: black and gold, blush and ivory, or just good lighting and one floral accent.',
      'Fresh flowers on an open terrace after 1 PM will droop. Save florals for evening parties or AC rooms. One small fresh bunch on the cake table plus balloons elsewhere is a sensible mix.',
      'Ask the society office early. Some buildings block décor in common areas, limit elevator use for setup, or want teardown the same night. Whitefield and Electronic City apartments are often stricter than independent houses in Jayanagar.',
      'Give the setup team 2–3 hours before guests arrive. Traffic from one end of the city to the other can eat an hour. Morning brunches need an early start; evening parties usually need finish before building peak hours.',
      'Budget talk: a clean home setup with garland, backdrop, and cake table is where most families start. Adding entrance décor, more florals, and custom boards pushes cost up. We would rather quote after seeing room photos than invent a package that will not fit.',
      'If you want us to handle it, send date, area, and 2–3 room pictures on WhatsApp. Details for birthday decoration are on /services/birthday-decoration. We work across Bengaluru homes — not just banquet halls — and we pack up after so you are not left with a living room full of popped balloons at midnight.',
    ],
  },
  {
    slug: 'haldi-ceremony-decoration-checklist',
    title: 'Haldi Decoration Checklist (From People Who Clean Up After)',
    description:
      'A practical haldi décor checklist for Bangalore — seating, marigold backdrop, turmeric mess, rain backup, and teardown.',
    datePublished: '2026-02-10',
    readingTimeMinutes: 7,
    authorName: 'We Decor Events',
    featuredImage: '/services/haldi.webp',
    relatedServiceHref: '/services/haldi-decoration',
    relatedServiceLabel: 'Haldi Decorations',
    tags: ['haldi', 'wedding', 'checklist', 'bangalore'],
    paragraphs: [
      'Haldi looks soft in photos and chaotic in real life. Turmeric gets everywhere. If you decorate like a clean indoor birthday, you will regret it by lunch. This list is what we actually check before we leave a Bangalore home or lawn.',
      'Confirm the place first: bride home, groom home, clubhouse, or lawn. Morning light is nicer for photos but terraces get hot fast. Afternoon events need shade. Write the access time down — many apartments only allow setup after a certain hour.',
      'Protect the floor. Washable cloth under mats. No expensive light carpets in the throwing zone. Keep brass bowls and spare towels behind the backdrop, not as Instagram props that get ruined in ten minutes.',
      'Seating: elders need chairs at the back. Front can be mats if that is your tradition. Leave a path for the person applying haldi and for the photographer. Packed floor seating with no gap means someone sits on a cable.',
      'Backdrop: marigold still wins for a reason. Yellow, orange, mango leaves. Contemporary couples add white jasmine or a simple name board. Keep it wide enough for family group shots — about seven feet is a good minimum.',
      'Do not put fresh garlands flat on the floor near the ritual. They sit in yellow water within minutes. Raise planters. Keep silk and cream fabrics away from the splash zone.',
      'Entrance: a toran and a clear welcome board help relatives who do not know the flat number. For clubhouses in Hebbal or Electronic City, clear lift and cleanup rules with the association before the morning of.',
      'Rain plan if it is outdoors. Bangalore showers ignore your muhurtham. Tent, indoor room, or weighted décor — pick one before the week of the wedding. Do not wait for clouds.',
      'After the function, teardown should start once lunch winds down, before turmeric dries hard on cloth. Assign one family member to approve changes. Five uncles giving different instructions slows everything.',
      'We put the fuller service notes on /services/haldi-decoration. At We Decor we plan for mess on purpose — early install, stain-aware materials, and a teardown window that does not collide with the evening function. If you send venue photos, we will tell you what not to buy.',
    ],
  },
  {
    slug: 'wedding-decoration-budget-guide-bangalore',
    title: 'Wedding Decor Budget in Bangalore: Where the Money Actually Goes',
    description:
      'Plain-English guide to wedding decoration costs in Bangalore — stage, flowers, labour, hidden fees, and where to spend.',
    datePublished: '2026-03-05',
    readingTimeMinutes: 7,
    authorName: 'We Decor Events',
    featuredImage: '/services/engagement.webp',
    relatedServiceHref: '/services/wedding-setup',
    relatedServiceLabel: 'Wedding Setup',
    tags: ['wedding', 'budget', 'bangalore', 'planning'],
    paragraphs: [
      'Wedding décor quotes confuse people because two stages that look similar online can cost very different amounts on site. Labour, flower type, ceiling height, and how late the hall lets us in matter as much as the mood board.',
      "List your events. Haldi, mehndi, wedding, reception — each one can share props or need a full rebuild. Booking three days with one team usually costs less than three separate vendors who never see each other's plans.",
      'The stage or mandap eats the biggest chunk. A tight backdrop for 200 guests is one number. A tall mandap with heavy fresh florals is another. Old city hotels with low ceilings often cannot take tall structures — horizontal designs work better and save money you would waste fighting height.',
      'Flowers move with the market. Marigold and local roses are predictable. Imported stems look great and spike the bill, especially in peak season. Mixing fresh on the stage with good artificial on long aisle runs is how many Bangalore couples stay sane.',
      'Venue access is a real cost. Midnight-only load-in means overtime. Farmhouses outside the ORR mean transport. Outdoor lawns need tents and weights. Ask the hotel for the setup window in writing before you compare décor quotes.',
      'Lighting is where people under-budget. Day ceremonies can get away with soft wash. Night receptions need focus on the couple and some ambient light or the room looks flat in photos. Check the venue electrical limit before approving a heavy LED plan.',
      'Ask what the quote includes: GST, transport, teardown, rain cover, backup flowers, overtime. Lump-sum PDFs with no line items are hard to negotiate later. You want to cut table centres without rebuilding the whole stage price.',
      'Peak wedding months (roughly Nov–Feb and busy muhurtham dates) book out. If dates are fixed, lock décor early. Weekday or off-peak sometimes means better crew attention, not only a lower rate.',
      'Spend where cameras and guests look: stage, entrance, couple seating. Simplify far tables. Reuse frames across sangeet and reception with a flower change instead of two full builds.',
      'Our wedding setup page is /services/wedding-setup. We Decor quotes after a venue walk when we can — ceiling, pillars, and load-in decide what is honest to promise. Bring photos and guest count; we will say what to skip.',
    ],
  },
  {
    slug: 'balloon-decoration-trends-2025-2026',
    title: 'Balloon Decoration in Bangalore Right Now (Not the Old Bunch-at-the-Gate)',
    description:
      'What balloon décor looks like in Bangalore in 2025–2026 — organic garlands, chrome accents, heat, and when to skip helium.',
    datePublished: '2026-04-18',
    readingTimeMinutes: 6,
    authorName: 'We Decor Events',
    featuredImage: '/services/tent-balloon.webp',
    relatedServiceHref: '/services/balloon-decoration',
    relatedServiceLabel: 'Balloon Decorations',
    tags: ['balloons', 'trends', 'bangalore'],
    paragraphs: [
      'People still picture birthday balloons as three helium bunches tied to a chair. That is not what clients ask for anymore. They want a wall or an arch that frames the cake and holds up in photos.',
      'Organic garlands — mixed balloon sizes, uneven clusters — are what we install most. One wall plus a cake table is enough for a Koramangala flat. Stairs and pergolas get wrapped when the house is larger.',
      'A little chrome or satin gold looks good under warm lights. An entire chrome ceiling usually looks harsh with phone flash. Use metal as spice, not the whole meal.',
      'Ceiling clouds work when the floor is crowded. Always check if the hall allows hanging. Some older community halls say no — then we use freestanding frames instead of arguing with the manager on the day.',
      'Skip helium for outdoor noon events. Heat expands latex and then it looks tired by evening. Air-filled, shaded installs are more reliable on Bangalore terraces.',
      'Wind on rooftops needs weights. Monsoon months need an indoor backup. Balloons should not be the only plan if clouds are building.',
      'Themes still matter for kids. Jungle, Barbie, cricket — fine. For adults and offices, brand colours and clean shapes beat cartoon cutouts. Whitefield launch events often want a logo wall that comes down before Monday morning.',
      'Price follows complexity, not guest count. One garland is one job. Entrance + stage + photo corner + ceiling is a crew and a tempo. Ask for those zones listed separately so you can drop one if needed.',
      'More on what we offer is at /services/balloon-decoration. We Decor cares more about whether the arch still looks right at 8 PM than whether it matched a trend article. Send the room photo; we will say if the idea fits.',
    ],
  },
  {
    slug: 'choose-event-venue-bangalore',
    title: 'Picking an Event Venue in Bangalore Without Regretting It',
    description:
      'How to shortlist a wedding or party venue in Bangalore — traffic, décor rules, parking, rain backup, and what to ask before paying a deposit.',
    datePublished: '2026-05-22',
    readingTimeMinutes: 7,
    authorName: 'We Decor Events',
    featuredImage: '/home-preview/outdoor.webp',
    relatedServiceHref: '/locations',
    relatedServiceLabel: 'Bangalore Locations',
    tags: ['venue', 'bangalore', 'planning'],
    paragraphs: [
      'Pretty lobby photos lie. A hall that looks great online can block outside décor vendors, close load-in at 9 PM, or sit in traffic hell for half your guest list. Write your must-haves before you tour.',
      'Guest count and event type first. A 50-person home birthday is not a 300-person reception. Multi-day weddings often split: home for haldi, hotel for reception. That is normal here.',
      'Where guests live matters. Whitefield halls are easy for east Bangalore IT families and hard on elders from JP Nagar on a Friday evening. Central Indiranagar or Koramangala is convenient and expensive. North-side venues suit airport-corridor families. Our area pages at /locations are a starting map, not a sales pitch.',
      'Ask about décor rules in writing. Outside decorator fee? No wall nails? No open flame? Ceiling hang banned? Those answers change the design before anyone buys flowers.',
      'Load-in window: if the team can only enter at midnight, complex stages cost more. Freight lift size in apartment clubhouses kills big props. Ramp or stairs? Say so early.',
      'Parking and drop-off for elders. Farmhouses outside the Outer Ring Road need clear WhatsApp pins or a shuttle. Home events need a neighbour plan so the gate is not chaos.',
      'Outdoor lawns need rain talk. Tent, flooring, indoor backup room — in the contract, not as a smile from the manager. Terraces need wind plans for balloons and stands.',
      'Noise curfew in residential pockets can kill a sangeet at 10 PM. Ask. Soundproof banquet space costs more and saves fights.',
      'Hidden fees: AC overtime, generator, corkage, mandatory in-house vendors, damage deposit. Add them before you call a venue “cheap.”',
      'Visit at the same time of day as your event. Take ceiling and pillar photos for your decorator. We Decor works across Bengaluru weekly — if you share a shortlist, we will say which rooms fight a mandap or a balloon ceiling before you pay the booking amount.',
      'Shortlist three, ask policy questions on email, involve décor early. The right venue makes the rest quieter.',
    ],
  },
  {
    slug: 'haldi-decoration-cost-bangalore',
    title: 'Haldi Decoration Cost in Bangalore (2026 Price Breakdown: ₹5,000 to ₹25,000+)',
    description:
      'Exact Haldi ceremony decoration prices in Bangalore — home marigold backdrops from ₹5,000, terrace setups, brass urlis, and banquet hall stage costs.',
    datePublished: '2026-06-12',
    readingTimeMinutes: 6,
    authorName: 'We Decor Events',
    featuredImage: '/services/haldi.webp',
    relatedServiceHref: '/services/haldi-decoration',
    relatedServiceLabel: 'Haldi Decoration Packages',
    tags: ['haldi', 'pricing', 'cost', 'bangalore', 'wedding'],
    paragraphs: [
      'When families in Bangalore ask how much Haldi decoration costs, most decorators hide behind "depends on customization." At We Decor Events, our Haldi ceremony decoration in Bangalore starts at ₹5,000 for compact home and apartment backdrops, ₹8,500–₹14,000 for terrace and clubhouse setups with brass urlis and low seating, and ₹18,000–₹35,000+ for full banquet hall or courtyard floral canopies.',
      'Tier 1 — Home & Apartment Living Room Haldi (₹5,000 to ₹8,000): Built for 10×12 living rooms or covered balconies in areas like Jayanagar, JP Nagar, BTM Layout, and HSR Layout. This includes a 6×6 or 7×7 yellow fabric and fresh marigold garland backdrop, genda phool strings, traditional chowki or low stool seating for the bride or groom, floor-protective washable mat, and warm fairy lighting.',
      'Tier 2 — Terrace, Courtyard & Apartment Clubhouse Haldi (₹8,500 to ₹15,000): Ideal for 40–80 guests in independent houses in Basavanagudi, Malleshwaram, Banashankari, or society clubhouses in Whitefield and Sarjapur Road. Adds a wider 8×10 floral frame, fresh mango-leaf and jasmine entrance toran, floating rose and marigold brass urlis, banana-leaf accents, and dedicated couple seating with bolsters.',
      'Tier 3 — Outdoor Lawn & Banquet Hall Haldi Stage (₹16,000 to ₹35,000+): Designed for 100+ guests with an elevated stage platform, overhead yellow floral canopy, custom couple name board, dhol/entry pathway props, waterproof shade tenting, and heavy fresh marigold + rose border work.',
      'What moves the price up or down? Fresh flower weight and seasonal mandi rates around KR Market make the biggest difference during peak muhurtham dates. Choosing a smart blend of dense reusable marigold curtains with fresh marigold and jasmine borders around the couple keeps photos vibrant while saving 25–30% on budget.',
      'Cleanup and floor protection are included in our setup planning. See real Bangalore setup photos on /services/haldi-decoration or check our full pricing overview at /pricing. Send us a photo of your living room, terrace, or hall on WhatsApp for an exact itemized quote within 15 minutes.',
    ],
  },
  {
    slug: 'baby-shower-seemantham-decoration-cost-bangalore',
    title: 'Baby Shower & Seemantham Decoration Cost in Bangalore (From ₹5,000)',
    description:
      'Complete guide to Seemantham and Oh Baby shower decoration prices in Bangalore — traditional marigold & jasmine backdrops vs pastel balloon arches.',
    datePublished: '2026-07-08',
    readingTimeMinutes: 6,
    authorName: 'We Decor Events',
    featuredImage: '/services/engagement.webp',
    relatedServiceHref: '/services/baby-shower-decoration',
    relatedServiceLabel: 'Baby Shower & Seemantham Decor',
    tags: ['baby shower', 'seemantham', 'pricing', 'bangalore', 'floral'],
    paragraphs: [
      'In Bangalore, baby shower celebrations split into two distinct styles: traditional South Indian Seemantham (or Valaikappu / Godh Bharai) with fresh flowers, and modern "Oh Baby" pastel balloon and shimmer-wall setups. At We Decor Events, both traditional Seemantham and modern baby shower decorations in Bangalore start from ₹5,000.',
      'Traditional Home Seemantham Decoration (₹5,000 to ₹9,500): Designed for morning rituals at homes in Basavanagudi, Jayanagar, Vijayanagar, and Rajajinagar. Includes a traditional yellow/green or lotus-pink drape backdrop, fresh marigold and jasmine garlands, banana-stem and mango-leaf side pillars, brass lamps, and comfortable chair or swing framing for the mom-to-be.',
      'Modern "Oh Baby" Pastel Balloon & Ring Backdrop (₹5,000 to ₹10,000): Popular for afternoon and evening celebrations in apartment clubhouses across HSR Layout, Koramangala, Indiranagar, and Electronic City. Includes a circular arch or curved easel panels, organic pastel balloon garland (sage green, blush pink, powder blue, or neutral beige), warm neon "Oh Baby" signage, cake pedestals, and floor spotlights.',
      'Banquet Hall & Fusion Seemantham Stage (₹12,000 to ₹25,000+): Combines a traditional floral mandap frame for the bangle ritual with a modern photo booth corner for friends and colleagues. Fits 80–150 guests in party halls with full stage carpeting, couple sofa, and entrance welcome board.',
      'Practical tip for expecting mothers: morning rituals under hot halogen lights get uncomfortable fast. We use cool-running warm LED par lights and position seating away from direct terrace sun so the mom-to-be stays comfortable through the 2-hour ceremony.',
      'Browse real Seemantham and baby shower setups across Bengaluru on /services/baby-shower-decoration and /gallery, or reach out via /contact to book a home or party hall slot.',
    ],
  },
  {
    slug: 'engagement-ring-ceremony-decoration-cost-bangalore',
    title: 'Engagement Stage Decoration Price in Bangalore (Home & Banquet Hall Guide)',
    description:
      'How much does engagement & ring ceremony stage decoration cost in Bangalore? Compare home backdrops (from ₹5,000) and banquet hall floral stages.',
    datePublished: '2026-08-19',
    readingTimeMinutes: 6,
    authorName: 'We Decor Events',
    featuredImage: '/services/engagement.webp',
    relatedServiceHref: '/services/engagement-decoration',
    relatedServiceLabel: 'Engagement Stage Decoration',
    tags: ['engagement', 'ring ceremony', 'pricing', 'bangalore', 'wedding'],
    paragraphs: [
      'Engagement and ring ceremony decoration in Bangalore starts from ₹5,000 at We Decor Events for intimate home and apartment clubhouse setups, and ranges from ₹12,000 to ₹30,000+ for banquet halls, hotel ballrooms, and convention centres.',
      'Home & Clubhouse Ring Ceremony Setup (₹5,000 to ₹11,000): Built for 30–60 family members in living rooms or society halls. Features an 8×8 pastel floral and drape backdrop, custom couple initials or "Engaged" neon sign, two-seater couple loveseat or Tiffany chairs, side floral pedestals, and warm portrait lighting.',
      'Banquet Hall & Hotel Engagement Stage (₹12,000 to ₹28,000+): Designed for 100–250 guests across venues in JP Nagar, Jayanagar, MG Road, Whitefield, and Hebbal. Includes a 10×16 or 12×20 multi-layered floral arch or contemporary panel backdrop, fresh rose and orchid header arrangements, stage skirting, LED par wash lights, and a matching entrance welcome arch.',
      'Why lighting matters more than extra props: ring exchange photos are shot close-up on the couple. Cheap coloured floodlights cast harsh pink or blue shadows on skin tones. We use warm 3200K–4000K stage lighting focused around the backdrop so your photographer gets crisp, natural portraits.',
      'You can explore our engagement portfolio on /services/engagement-decoration and compare all 16 event services on /services. If you have your banquet hall or home dimensions ready, message us on WhatsApp for a free site visit anywhere in Bangalore.',
    ],
  },
  {
    slug: 'bridal-room-first-night-car-decoration-cost-bangalore',
    title: 'First Night Room & Wedding Car Decoration Cost in Bangalore (2026 Guide)',
    description:
      'Transparent prices for wedding car floral decoration (from ₹2,500) and bridal first-night bedroom setup (from ₹5,000) across Bangalore.',
    datePublished: '2026-09-14',
    readingTimeMinutes: 5,
    authorName: 'We Decor Events',
    featuredImage: '/services/room-decor.webp',
    relatedServiceHref: '/services/room-decoration',
    relatedServiceLabel: 'Room & First Night Decoration',
    tags: ['room decoration', 'car decoration', 'wedding', 'pricing', 'bangalore'],
    paragraphs: [
      'Two of the most frequently booked last-minute wedding services in Bangalore are Wedding Car Floral Decoration (starting from ₹2,500) and Bridal Room / First Night Bedroom Decoration (starting from ₹5,000). At We Decor Events, our crew handles both at your doorstep or hotel across all 50+ Bangalore localities.',
      'Wedding Car Decoration in Bangalore (From ₹2,500): Includes scratch-safe fresh rose, chrysanthemum, orchid, and satin ribbon styling for sedans, SUVs, and luxury cars. We use soft floral foam mounts, medical-grade non-marking tape, and ribbon ties—never metal wire or harsh adhesives—so your car paint stays 100% protected. Doorstep installation takes 60–75 minutes at your home or wedding hall. Full details are on /services/car-decoration.',
      'Bridal Room & First Night Decoration (From ₹5,000): Transforms bedrooms, hotel suites, and resort rooms with fresh red and pastel rose petal bed art, flowing net canopy drapes, warm fairy lights, flameless LED pillar candles, and optional metallic helium-style ceiling balloons. Because societies and 5-star hotels prohibit open flames and wall nails, every install uses damage-free hooks and safe LED candles.',
      'Romantic Proposal & Anniversary Room Setups (From ₹5,000): If you are planning a surprise midnight birthday, anniversary, or "Marry Me" proposal inside a bedroom, living room, or private terrace, we also bring neon signage, photo-timeline fairy strings, and heart arches. Compare options on /services/room-decoration and /services/proposal-decoration.',
      'Same-day bookings are available across Basavanagudi, Jayanagar, JP Nagar, Koramangala, HSR Layout, Indiranagar, Whitefield, and North Bangalore. Visit /contact or WhatsApp us your location and timing to lock in a slot.',
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPost(slug);
  if (!current) return BLOG_POSTS.slice(0, limit);

  const scored = BLOG_POSTS.filter((post) => post.slug !== slug).map((post) => {
    const sharedTags = post.tags.filter((tag) => current.tags.includes(tag)).length;
    return { post, sharedTags };
  });

  scored.sort((a, b) => {
    if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
    return b.post.datePublished.localeCompare(a.post.datePublished);
  });

  return scored.slice(0, limit).map(({ post }) => post);
}
