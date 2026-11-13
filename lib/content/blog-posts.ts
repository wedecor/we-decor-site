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
    title: 'Birthday Decoration at Home in Bangalore (From ₹3,000 · 2026)',
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
    title: 'Wedding Decor Budget Bangalore (2026 Price Guide from ₹5,000)',
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
    title: 'Haldi Decoration Cost in Bangalore (2026 Guide: Starting from ₹5,000)',
    description:
      'Transparent Haldi ceremony decoration starting prices in Bangalore — traditional marigold backdrops from ₹5,000, brass urlis, low seating, and custom hall setups.',
    datePublished: '2026-06-12',
    readingTimeMinutes: 6,
    authorName: 'We Decor Events',
    featuredImage: '/services/haldi.webp',
    relatedServiceHref: '/services/haldi-decoration',
    relatedServiceLabel: 'Haldi Decoration Packages',
    tags: ['haldi', 'pricing', 'cost', 'bangalore', 'wedding'],
    paragraphs: [
      'When families in Bangalore plan a Haldi ceremony, decoration pricing is often opaque. At We Decor Events, our Haldi ceremony decoration in Bangalore starts from ₹5,000 with transparent line items based on your venue size, fresh floral volume, and ceremony setup.',
      'Home & Apartment Living Room Haldi (Starts from ₹5,000): Designed for living rooms and covered balconies in areas like Basavanagudi, Jayanagar, JP Nagar, BTM Layout, and HSR Layout. Standard setups include a traditional yellow fabric and fresh marigold garland backdrop, genda phool strings, traditional seating stool/chowki for the bride or groom, floor-protective washable matting, and warm ambient lighting.',
      'Terrace, Courtyard & Clubhouse Haldi Setups: For larger family gatherings in independent homes or society clubhouses in Whitefield, Sarjapur Road, and Malleshwaram. These setups incorporate wider floral frames, fresh mango-leaf and jasmine entrance torans, floating floral brass urlis, banana-leaf accents, and bolstered seating for the couple.',
      'Lawn & Banquet Hall Haldi Stages: For grand celebrations with 100+ guests, setups can feature elevated stage platforms, overhead yellow floral canopies, customized couple name signage, entrance pathway props, and dense fresh flower arrangements.',
      'Cost Considerations: Fresh marigold and jasmine pricing fluctuates during peak muhurtham dates around KR Market. Combining reusable backdrop frames with fresh marigold and jasmine borders around the couple creates vibrant photos while keeping costs controlled.',
      'Cleanup and floor protection are always prioritized in our install process. View real Bangalore setup photos on /services/haldi-decoration or browse our complete pricing overview at /pricing. Share your venue photos and date on WhatsApp for a fast, honest quote tailored to your space.',
    ],
  },
  {
    slug: 'baby-shower-seemantham-decoration-cost-bangalore',
    title: 'Baby Shower & Seemantham Decoration Cost in Bangalore (From ₹5,000)',
    description:
      'Complete guide to Seemantham and Oh Baby shower decoration prices in Bangalore — traditional marigold & jasmine backdrops and pastel balloon arches from ₹5,000.',
    datePublished: '2026-07-08',
    readingTimeMinutes: 6,
    authorName: 'We Decor Events',
    featuredImage: '/services/engagement.webp',
    relatedServiceHref: '/services/baby-shower-decoration',
    relatedServiceLabel: 'Baby Shower & Seemantham Decor',
    tags: ['baby shower', 'seemantham', 'pricing', 'bangalore', 'floral'],
    paragraphs: [
      'In Bangalore, baby shower celebrations typically follow two styles: traditional South Indian Seemantham (or Valaikappu / Godh Bharai) with fresh florals, and modern "Oh Baby" pastel balloon and shimmer-wall setups. At We Decor Events, both traditional Seemantham and contemporary baby shower decorations start from ₹5,000.',
      'Traditional Home Seemantham Decoration (Starts from ₹5,000): Tailored for morning ceremonies in homes across Basavanagudi, Jayanagar, Vijayanagar, and Rajajinagar. Setups feature traditional yellow/green or lotus-pink drape backdrops, fresh marigold and jasmine garlands, banana-stem accents, brass lamps, and comfortable framing for the mom-to-be.',
      'Modern "Oh Baby" Pastel Balloon & Ring Backdrop (Starts from ₹5,000): Popular for afternoon and evening parties in apartment clubhouses across HSR Layout, Koramangala, Indiranagar, and Electronic City. Features circular ring arches or curved easel boards, organic pastel balloon garlands, warm neon "Oh Baby" signage, and cake pedestals.',
      'Banquet Hall & Fusion Seemantham Stages: Designed for larger gatherings combining traditional ritual stages with dedicated photo corners for family and guests, including full stage carpeting, comfortable couple seating, and entrance welcome signage.',
      'Practical Comfort: Morning rituals can be exhausting for expectant mothers under hot lights. We utilize cool-running warm LED par lights and place seating away from direct terrace heat so the ceremony remains relaxed and comfortable.',
      'Browse real Seemantham and baby shower setups across Bengaluru on /services/baby-shower-decoration and /gallery, or connect with our team on /contact to discuss your upcoming date.',
    ],
  },
  {
    slug: 'engagement-ring-ceremony-decoration-cost-bangalore',
    title: 'Engagement Stage Decoration Price in Bangalore (Starting from ₹5,000)',
    description:
      'Engagement & ring ceremony stage decoration prices in Bangalore: intimate home backdrops from ₹5,000 and custom banquet hall floral stages.',
    datePublished: '2026-08-19',
    readingTimeMinutes: 6,
    authorName: 'We Decor Events',
    featuredImage: '/services/engagement.webp',
    relatedServiceHref: '/services/engagement-decoration',
    relatedServiceLabel: 'Engagement Stage Decoration',
    tags: ['engagement', 'ring ceremony', 'pricing', 'bangalore', 'wedding'],
    paragraphs: [
      'Engagement and ring ceremony decoration in Bangalore starts from ₹5,000 at We Decor Events for intimate home and apartment clubhouse setups, scaling to bespoke stages for banquet halls, hotels, and convention centres.',
      'Home & Clubhouse Ring Ceremony Setup (Starts from ₹5,000): Perfect for 30–60 family members in living rooms or society party halls. Features an elegant pastel floral and drape backdrop, customized couple initials or neon signage, couple seating, floral pedestals, and warm stage wash lighting.',
      'Banquet Hall & Hotel Engagement Stages: Designed for larger gatherings across venues in JP Nagar, Jayanagar, MG Road, Whitefield, and Hebbal. These include multi-layered floral arches, fresh rose and orchid arrangements, stage skirting, LED lighting, and matching entrance arches.',
      'Lighting and Photo Quality: Ring exchange portraits require balanced lighting that flatters skin tones without harsh color casts. We configure warm 3200K–4000K stage lighting focused on the backdrop so your photographer captures clear, natural shots.',
      'Explore our engagement portfolio on /services/engagement-decoration and review all services on /services. If you have your venue dimensions or photos ready, message our team on WhatsApp for quick guidance and a free site visit across Bangalore.',
    ],
  },
  {
    slug: 'bridal-room-first-night-car-decoration-cost-bangalore',
    title: 'First Night Room & Wedding Car Decoration Cost in Bangalore (From ₹2,500)',
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
      'Two popular wedding-week essentials in Bangalore are Wedding Car Floral Decoration (starting from ₹2,500) and Bridal Room / First Night Bedroom Decoration (starting from ₹5,000). At We Decor Events, our crew delivers doorstep setups across all 50+ Bangalore localities.',
      'Wedding Car Decoration in Bangalore (Starts from ₹2,500): Includes paint-safe fresh rose, chrysanthemum, orchid, and satin ribbon styling for sedans, SUVs, and luxury vehicles. We use soft floral foam mounts and non-marking ribbon fasteners—never metal wire or damaging adhesives—ensuring vehicle paint remains 100% protected. Doorstep setups take approximately 60–75 minutes at your residence or venue. Learn more on /services/car-decoration.',
      'Bridal Room & First Night Decoration (Starts from ₹5,000): Enhances bedrooms, suites, and resort rooms with fresh rose petal bed styling, flowing canopy drapes, warm fairy lights, and flameless LED candles. We use damage-free hooks and safe LED lighting to comply with hotel and apartment community regulations.',
      'Surprise Anniversary & Proposal Setups (Starts from ₹5,000): For private celebrations inside living rooms or terraces, we provide neon signs, photo-timeline fairy light displays, and floral heart arches. See options on /services/room-decoration and /services/proposal-decoration.',
      'Same-day and next-day setups are available across Basavanagudi, Jayanagar, JP Nagar, Koramangala, HSR Layout, Indiranagar, Whitefield, and surrounding areas. Reach us via /contact or WhatsApp to confirm your date and timing.',
    ],
  },
  {
    slug: 'home-decoration-ideas-bangalore-haldi-engagement-birthday',
    title: 'Home Decoration in Bangalore: Haldi, Engagement & Birthday Guide',
    description:
      'Planning home decoration in Bangalore for haldi, engagement, birthdays and baby showers — apartment space, society lift rules, turmeric protection, costs from ₹3,000.',
    datePublished: '2026-03-01',
    readingTimeMinutes: 7,
    authorName: 'We Decor Events',
    featuredImage: '/services/room-decor.webp',
    relatedServiceHref: '/services/home-decoration',
    relatedServiceLabel: 'Home Decoration',
    tags: ['home decoration', 'haldi', 'engagement', 'birthday', 'bangalore'],
    paragraphs: [
      'Hosting milestone celebrations at home has become Bangalore’s favourite way to celebrate. Whether it is an intimate Haldi ceremony, a close-knit ring engagement with immediate family, a colourful child or adult birthday, or a sacred Griha Pravesh pooja, your living room or terrace can look breathtaking without compromising the flow of your home.',
      'Home Haldi Decoration (Starts from ₹5,000): Haldi ceremonies bring vibrant joy, but yellow turmeric can easily stain marble, vitrified tiles, and painted walls. At We Decor Events, we construct freestanding metal frames wrapped in yellow and orange marigolds and chiffon drapes—requiring zero wall nails. We place heavy-duty waterproof floor drop-cloths under the brass urli and seating cushions, ensuring your apartment remains 100% spotless after the rituals. Explore options on /services/haldi-decoration.',
      'Home Engagement & Ring Ceremony Décor (Starts from ₹5,000): For intimate ring exchanges, a 6ft to 8ft circular floral arch or pastel fabric backdrop placed directly behind your living room sofa creates an instant couture stage. It frames the couple beautifully for professional photographs while leaving clear walking aisles for 20 to 40 guests. Read more on /services/engagement-decoration.',
      'Birthday Decoration at Home (Starts from ₹3,000): You do not need to fill every corner with balloons. A single high-impact focal wall—such as an organic pastel balloon garland paired with a custom neon "Happy Birthday" sign and a neat cake plinth—delivers picture-perfect memories while leaving ample room for buffet counters and kid playtime. See packages on /services/birthday-decoration.',
      'Baby Shower (Seemantham) & Housewarming Pujas (Starts from ₹5,000): For baby showers, we style traditional cradle flowers, pastel backdrops, and balloon photo zones on /services/baby-shower-decoration. For Griha Pravesh and housewarming days, we craft fresh mango leaf entrance torans, marigold door frames, and mandapa florals with brass diyas.',
      'Navigating Bangalore Apartment Society Rules: High-rise communities in Whitefield, Bellandur, Sarjapur Road, and Electronic City often have strict vendor-entry timings and elevator rules. Always notify security or pre-approve vendor entry via MyGate/NoBrokerHood, book the service lift 30 minutes in advance, and inform our team of afternoon quiet hours so installation runs smoothly without building complaints.',
      'Zero Wall Damage Guarantee: We never hammer nails into rented or newly painted apartment walls. Everything is mounted using self-standing truss frames or non-damaging painter-grade adhesives. Same-day teardown can be pre-scheduled so your living room is completely tidy before midnight.',
      'To book your home setup anywhere in Bangalore, send 2–3 photos of your living room or terrace along with your event date and preferred theme on WhatsApp. We will provide an honest, itemized quote within minutes.',
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
