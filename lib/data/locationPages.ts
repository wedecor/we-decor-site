export interface LocationPage {
  locationName: string;
  slug: string;
  description: string;
  eventTypes: string[];
  testimonial: {
    text: string;
    author: string;
    rating: number;
  };
  galleryTags: string[];
  nearbyLocations: string[];
}

export const locationPages: LocationPage[] = [
  {
    locationName: "Whitefield",
    slug: "whitefield",
    description: "Whitefield, a bustling tech hub in East Bangalore, is home to many young professionals and families who love celebrating special occasions. From corporate events to birthday parties, we bring creative decoration solutions to make every event memorable.",
    eventTypes: ["Birthday Decor", "Haldi Setup", "Room Decoration", "Corporate Events", "Engagement Decor", "Baby Shower"],
    testimonial: {
      text: "We Decor transformed our office party in Whitefield into a magical celebration. The team was professional and creative!",
      author: "Priya Sharma, Tech Park",
      rating: 5
    },
    galleryTags: ["whitefield", "corporate", "birthday"],
    nearbyLocations: ["Electronic City", "HSR Layout", "Koramangala"]
  },
  {
    locationName: "Jayanagar",
    slug: "jayanagar",
    description: "Jayanagar, known for its cultural heritage and traditional values, is perfect for traditional celebrations. Our decoration services here blend modern aesthetics with cultural significance for weddings, haldi ceremonies, and family gatherings.",
    eventTypes: ["Wedding Decor", "Haldi Setup", "Traditional Events", "Birthday Decor", "Room Decoration", "Engagement Decor"],
    testimonial: {
      text: "The haldi decoration for my daughter's wedding in Jayanagar was absolutely stunning. Everyone loved the traditional yet modern touch!",
      author: "Lakshmi Devi, Jayanagar",
      rating: 5
    },
    galleryTags: ["jayanagar", "haldi", "wedding", "traditional"],
    nearbyLocations: ["J.P. Nagar", "Banashankari", "Basavanagudi"]
  },
  {
    locationName: "Indiranagar",
    slug: "indiranagar",
    description: "Indiranagar, the heart of Bangalore's nightlife and culture, demands sophisticated and trendy decoration styles. We specialize in contemporary designs perfect for modern celebrations, corporate events, and stylish parties.",
    eventTypes: ["Modern Decor", "Corporate Events", "Birthday Parties", "Engagement Decor", "Room Decoration", "Luxury Events"],
    testimonial: {
      text: "Indiranagar parties need to be Instagram-worthy, and We Decor delivered exactly that! Our engagement party was the talk of the town.",
      author: "Arjun & Meera, Indiranagar",
      rating: 5
    },
    galleryTags: ["indiranagar", "modern", "engagement", "luxury"],
    nearbyLocations: ["Koramangala", "HSR Layout", "Domlur"]
  },
  {
    locationName: "Koramangala",
    slug: "koramangala",
    description: "Koramangala, a vibrant neighborhood with a mix of students and professionals, loves creative and budget-friendly decoration ideas. We offer innovative solutions for birthday parties, room decorations, and small gatherings.",
    eventTypes: ["Birthday Decor", "Room Decoration", "Student Parties", "Small Events", "Budget Decor", "Creative Themes"],
    testimonial: {
      text: "As students in Koramangala, we needed affordable yet beautiful decoration. We Decor exceeded our expectations!",
      author: "College Friends, Koramangala",
      rating: 5
    },
    galleryTags: ["koramangala", "birthday", "student", "budget"],
    nearbyLocations: ["HSR Layout", "Indiranagar", "Jayanagar"]
  },
  {
    locationName: "HSR Layout",
    slug: "hsr-layout",
    description: "HSR Layout, a rapidly developing area with modern apartments and young families, appreciates contemporary decoration styles. We provide elegant solutions for birthday parties, room makeovers, and family celebrations.",
    eventTypes: ["Birthday Decor", "Room Decoration", "Family Events", "Modern Themes", "Apartment Decor", "Kids Parties"],
    testimonial: {
      text: "HSR Layout families love quality, and We Decor delivered exactly that for our daughter's birthday. The room transformation was magical!",
      author: "Rajesh & Sunita, HSR Layout",
      rating: 5
    },
    galleryTags: ["hsr", "family", "birthday", "modern"],
    nearbyLocations: ["Koramangala", "Whitefield", "Electronic City"]
  },
  {
    locationName: "RT Nagar",
    slug: "rt-nagar",
    description: "RT Nagar, a peaceful residential area with a mix of traditional and modern families, values both cultural significance and contemporary style. Our decoration services here blend the best of both worlds for all types of celebrations.",
    eventTypes: ["Traditional Decor", "Wedding Setup", "Birthday Parties", "Cultural Events", "Room Decoration", "Family Gatherings"],
    testimonial: {
      text: "RT Nagar celebrates festivals with grandeur, and We Decor helped us create the perfect traditional yet modern Diwali decoration!",
      author: "Venkatesh Family, RT Nagar",
      rating: 5
    },
    galleryTags: ["rt-nagar", "traditional", "festival", "family"],
    nearbyLocations: ["Hebbal", "Jayanagar", "Basavanagudi"]
  },
  {
    locationName: "Hebbal",
    slug: "hebbal",
    description: "Hebbal, known for its lakes and peaceful environment, is perfect for outdoor celebrations and nature-themed decorations. We specialize in creating magical outdoor setups for birthdays, engagements, and family events.",
    eventTypes: ["Outdoor Decor", "Birthday Parties", "Engagement Setup", "Nature Themes", "Family Events", "Lakeside Decor"],
    testimonial: {
      text: "Hebbal's natural beauty combined with We Decor's creativity made our lakeside engagement party absolutely magical!",
      author: "Krishna & Anjali, Hebbal",
      rating: 5
    },
    galleryTags: ["hebbal", "outdoor", "nature", "lakeside"],
    nearbyLocations: ["RT Nagar", "Whitefield", "Electronic City"]
  },
  {
    locationName: "Electronic City",
    slug: "electronic-city",
    description: "Electronic City, the IT hub of Bangalore, hosts numerous corporate events and tech celebrations. We provide professional decoration services for office parties, tech meetups, and corporate celebrations with a modern touch.",
    eventTypes: ["Corporate Events", "Tech Parties", "Office Decor", "Modern Themes", "Professional Setup", "Team Celebrations"],
    testimonial: {
      text: "Electronic City tech companies demand quality, and We Decor delivered a stunning corporate event decoration that impressed our international clients!",
      author: "Tech Team, Electronic City",
      rating: 5
    },
    galleryTags: ["electronic-city", "corporate", "tech", "modern"],
    nearbyLocations: ["Whitefield", "HSR Layout", "Koramangala"]
  },
  {
    locationName: "BTM Layout",
    slug: "btm-layout",
    description: "BTM Layout, one of Bangalore's largest residential areas, is home to diverse communities who love celebrating life's special moments. We bring affordable yet beautiful decoration solutions perfect for birthday parties, family gatherings, and cultural celebrations.",
    eventTypes: ["Birthday Decor", "Family Events", "Cultural Celebrations", "Room Decoration", "Budget Decor", "Traditional Themes"],
    testimonial: {
      text: "BTM Layout families appreciate value for money, and We Decor delivered exactly that! Our daughter's birthday decoration was beautiful and affordable.",
      author: "Sunita & Family, BTM Layout",
      rating: 5
    },
    galleryTags: ["btm layout", "birthday", "family", "budget"],
    nearbyLocations: ["Koramangala", "Jayanagar", "Banashankari"]
  },
  {
    locationName: "Marathahalli",
    slug: "marathahalli",
    description: "Marathahalli, a major IT corridor with growing residential communities, demands modern and professional decoration services. We specialize in corporate events, tech celebrations, and contemporary home decorations that reflect the area's dynamic spirit.",
    eventTypes: ["Corporate Events", "Tech Celebrations", "Modern Decor", "Office Parties", "Engagement Decor", "Contemporary Themes"],
    testimonial: {
      text: "Marathahalli's tech community loves innovation, and We Decor's modern decoration style perfectly matched our corporate event theme!",
      author: "Tech Team, Marathahalli",
      rating: 5
    },
    galleryTags: ["marathahalli", "corporate", "tech", "modern"],
    nearbyLocations: ["Whitefield", "Bellandur", "Electronic City"]
  },
  {
    locationName: "Bellandur",
    slug: "bellandur",
    description: "Bellandur, a premium tech hub with high-end residential communities, appreciates sophisticated and luxury decoration styles. We provide exclusive decoration services for upscale events, corporate celebrations, and premium family gatherings.",
    eventTypes: ["Luxury Events", "Corporate Celebrations", "Premium Decor", "Upscale Parties", "Modern Themes", "Exclusive Setups"],
    testimonial: {
      text: "Bellandur's premium community expects excellence, and We Decor delivered a world-class decoration that exceeded all expectations!",
      author: "Corporate Client, Bellandur",
      rating: 5
    },
    galleryTags: ["bellandur", "luxury", "corporate", "premium"],
    nearbyLocations: ["Marathahalli", "HSR Layout", "Sarjapur Road"]
  },
  {
    locationName: "Sarjapur Road",
    slug: "sarjapur-road",
    description: "Sarjapur Road, known for its premium residential communities and international schools, demands elegant and sophisticated decoration styles. We specialize in creating beautiful setups for family celebrations, children's parties, and upscale events.",
    eventTypes: ["Family Celebrations", "Children's Parties", "Upscale Events", "Elegant Decor", "School Events", "Premium Themes"],
    testimonial: {
      text: "Sarjapur Road families love quality and elegance, and We Decor created the most beautiful children's party decoration we've ever seen!",
      author: "International School Parent, Sarjapur",
      rating: 5
    },
    galleryTags: ["sarjapur road", "family", "children", "elegant"],
    nearbyLocations: ["Bellandur", "HSR Layout", "Koramangala"]
  },
  {
    locationName: "Domlur",
    slug: "domlur",
    description: "Domlur, a central area with a mix of residential and commercial spaces, appreciates versatile decoration styles. We provide flexible solutions for corporate events, family celebrations, and mixed-purpose gatherings that suit the area's diverse needs.",
    eventTypes: ["Corporate Events", "Family Celebrations", "Mixed Events", "Versatile Decor", "Office Parties", "Home Decorations"],
    testimonial: {
      text: "Domlur's diverse community needed versatile decoration, and We Decor adapted perfectly to our mixed corporate-family event!",
      author: "Business Owner, Domlur",
      rating: 5
    },
    galleryTags: ["domlur", "corporate", "versatile", "mixed"],
    nearbyLocations: ["Indiranagar", "Koramangala", "Ulsoor"]
  },
  {
    locationName: "Ulsoor",
    slug: "ulsoor",
    description: "Ulsoor, a traditional area with lakes and cultural significance, values both heritage and modern aesthetics. Our decoration services here blend traditional elements with contemporary styles for weddings, cultural events, and family celebrations.",
    eventTypes: ["Traditional Decor", "Cultural Events", "Wedding Setup", "Heritage Themes", "Family Gatherings", "Mixed Styles"],
    testimonial: {
      text: "Ulsoor's traditional charm combined with We Decor's modern creativity made our cultural event absolutely perfect!",
      author: "Cultural Group, Ulsoor",
      rating: 5
    },
    galleryTags: ["ulsoor", "traditional", "cultural", "heritage"],
    nearbyLocations: ["Domlur", "Indiranagar", "Richmond Town"]
  },
  {
    locationName: "Richmond Town",
    slug: "richmond-town",
    description: "Richmond Town, an upscale diplomatic area with international communities, demands sophisticated and elegant decoration styles. We provide premium services for diplomatic events, upscale parties, and international celebrations.",
    eventTypes: ["Diplomatic Events", "Upscale Parties", "International Celebrations", "Premium Decor", "Elegant Themes", "Luxury Setups"],
    testimonial: {
      text: "Richmond Town's international community has high standards, and We Decor met and exceeded them with their elegant decoration!",
      author: "Diplomatic Staff, Richmond Town",
      rating: 5
    },
    galleryTags: ["richmond town", "diplomatic", "upscale", "international"],
    nearbyLocations: ["Ulsoor", "Ashok Nagar", "Indiranagar"]
  },
  {
    locationName: "Ashok Nagar",
    slug: "ashok-nagar",
    description: "Ashok Nagar, a central residential area with good connectivity, appreciates practical yet beautiful decoration solutions. We offer versatile services for family events, birthday parties, and small gatherings that fit the area's practical lifestyle.",
    eventTypes: ["Family Events", "Birthday Parties", "Small Gatherings", "Practical Decor", "Versatile Themes", "Home Celebrations"],
    testimonial: {
      text: "Ashok Nagar families love practical solutions, and We Decor provided beautiful decoration that was easy to manage and perfect for our home party!",
      author: "Home Owner, Ashok Nagar",
      rating: 5
    },
    galleryTags: ["ashok nagar", "family", "practical", "home"],
    nearbyLocations: ["Richmond Town", "Ulsoor", "Domlur"]
  },
  {
    locationName: "Banashankari",
    slug: "banashankari",
    description: "Banashankari, a traditional area with strong cultural roots, is perfect for traditional celebrations and cultural events. We specialize in creating authentic traditional decorations for haldi ceremonies, weddings, and cultural festivals.",
    eventTypes: ["Traditional Decor", "Cultural Events", "Haldi Ceremonies", "Wedding Setup", "Festival Decor", "Heritage Themes"],
    testimonial: {
      text: "Banashankari's traditional values were perfectly reflected in We Decor's authentic haldi ceremony decoration. It was like a scene from our grandmother's stories!",
      author: "Traditional Family, Banashankari",
      rating: 5
    },
    galleryTags: ["banashankari", "traditional", "cultural", "haldi"],
    nearbyLocations: ["Jayanagar", "J.P. Nagar", "Basavanagudi"]
  },
  {
    locationName: "Basavanagudi",
    slug: "basavanagudi",
    description: "Basavanagudi, known for its temples and traditional architecture, values cultural authenticity in celebrations. Our decoration services here focus on traditional themes, religious ceremonies, and cultural events that honor the area's heritage.",
    eventTypes: ["Traditional Decor", "Religious Ceremonies", "Cultural Events", "Temple Decor", "Heritage Themes", "Festival Celebrations"],
    testimonial: {
      text: "Basavanagudi's spiritual atmosphere was enhanced by We Decor's beautiful traditional decoration for our temple ceremony!",
      author: "Devotee Family, Basavanagudi",
      rating: 5
    },
    galleryTags: ["basavanagudi", "traditional", "religious", "temple"],
    nearbyLocations: ["Banashankari", "Jayanagar", "J.P. Nagar"]
  },
  {
    locationName: "J.P. Nagar",
    slug: "jp-nagar",
    description: "J.P. Nagar, a well-established residential area with good family demographics, appreciates family-oriented decoration styles. We provide comprehensive services for children's parties, family celebrations, and cultural events that bring families together.",
    eventTypes: ["Family Celebrations", "Children's Parties", "Cultural Events", "Family-Oriented Decor", "Educational Events", "Community Gatherings"],
    testimonial: {
      text: "J.P. Nagar families love community celebrations, and We Decor created the perfect decoration for our neighborhood children's party!",
      author: "Community Leader, J.P. Nagar",
      rating: 5
    },
    galleryTags: ["jp nagar", "family", "children", "community"],
    nearbyLocations: ["Banashankari", "Jayanagar", "Bannerghatta Road"]
  },
  {
    locationName: "Bannerghatta Road",
    slug: "bannerghatta-road",
    description: "Bannerghatta Road, a growing residential corridor with modern developments, demands contemporary and trendy decoration styles. We specialize in modern themes, contemporary designs, and innovative setups for tech-savvy families and young professionals.",
    eventTypes: ["Modern Themes", "Contemporary Designs", "Innovative Setups", "Tech-Savvy Decor", "Young Professional Events", "Modern Family Celebrations"],
    testimonial: {
      text: "Bannerghatta Road's modern community loves innovation, and We Decor's contemporary decoration perfectly matched our tech-savvy lifestyle!",
      author: "Young Professional, Bannerghatta",
      rating: 5
    },
    galleryTags: ["bannerghatta road", "modern", "contemporary", "innovative"],
    nearbyLocations: ["J.P. Nagar", "Koramangala", "HSR Layout"]
  },
  {
    locationName: "Kanakapura Road",
    slug: "kanakapura-road",
    description: "Kanakapura Road, a developing residential area with natural surroundings, appreciates nature-inspired and eco-friendly decoration styles. We provide sustainable decoration solutions for outdoor events, nature-themed parties, and eco-conscious celebrations.",
    eventTypes: ["Nature-Inspired Decor", "Eco-Friendly Themes", "Outdoor Events", "Sustainable Celebrations", "Natural Themes", "Garden Parties"],
    testimonial: {
      text: "Kanakapura Road's natural beauty was enhanced by We Decor's eco-friendly decoration for our outdoor garden party!",
      author: "Nature Lover, Kanakapura Road",
      rating: 5
    },
    galleryTags: ["kanakapura road", "nature", "eco-friendly", "outdoor"],
    nearbyLocations: ["Bannerghatta Road", "J.P. Nagar", "Koramangala"]
  },
  {
    locationName: "Malleshwaram",
    slug: "malleshwaram",
    description: "Malleshwaram, a traditional area with strong cultural heritage, values authentic traditional decoration styles. We specialize in creating genuine traditional setups for cultural events, religious ceremonies, and heritage celebrations.",
    eventTypes: ["Traditional Decor", "Cultural Events", "Religious Ceremonies", "Heritage Celebrations", "Authentic Themes", "Cultural Festivals"],
    testimonial: {
      text: "Malleshwaram's cultural heritage was beautifully represented in We Decor's authentic traditional decoration for our cultural festival!",
      author: "Cultural Organizer, Malleshwaram",
      rating: 5
    },
    galleryTags: ["malleshwaram", "traditional", "cultural", "heritage"],
    nearbyLocations: ["Rajajinagar", "Vijayanagar", "Hebbal"]
  },
  {
    locationName: "Rajajinagar",
    slug: "rajajinagar",
    description: "Rajajinagar, a central area with good commercial and residential mix, appreciates versatile and practical decoration solutions. We provide flexible services for mixed events, commercial celebrations, and family gatherings that suit the area's diverse needs.",
    eventTypes: ["Mixed Events", "Commercial Celebrations", "Family Gatherings", "Versatile Decor", "Practical Themes", "Commercial Decor"],
    testimonial: {
      text: "Rajajinagar's diverse community needed versatile decoration, and We Decor adapted perfectly to our mixed commercial-family event!",
      author: "Business Owner, Rajajinagar",
      rating: 5
    },
    galleryTags: ["rajajinagar", "mixed", "commercial", "versatile"],
    nearbyLocations: ["Malleshwaram", "Vijayanagar", "Hebbal"]
  },
  {
    locationName: "Vijayanagar",
    slug: "vijayanagar",
    description: "Vijayanagar, a peaceful residential area with good family demographics, values family-oriented and community-focused decoration styles. We provide comprehensive services for family celebrations, community events, and children's parties.",
    eventTypes: ["Family Celebrations", "Community Events", "Children's Parties", "Family-Oriented Decor", "Community Themes", "Educational Events"],
    testimonial: {
      text: "Vijayanagar's community spirit was perfectly captured in We Decor's beautiful decoration for our neighborhood family event!",
      author: "Community Member, Vijayanagar",
      rating: 5
    },
    galleryTags: ["vijayanagar", "family", "community", "children"],
    nearbyLocations: ["Malleshwaram", "Rajajinagar", "Hebbal"]
  },
  {
    locationName: "Yelahanka",
    slug: "yelahanka",
    description: "Yelahanka, an airport area with growing residential communities, appreciates modern and efficient decoration styles. We provide quick setup services for corporate events, airport-related celebrations, and modern family gatherings.",
    eventTypes: ["Corporate Events", "Airport Celebrations", "Modern Family Gatherings", "Quick Setup Decor", "Efficient Themes", "Modern Styles"],
    testimonial: {
      text: "Yelahanka's fast-paced environment needed efficient decoration, and We Decor delivered beautiful results in record time!",
      author: "Corporate Client, Yelahanka",
      rating: 5
    },
    galleryTags: ["yelahanka", "corporate", "efficient", "modern"],
    nearbyLocations: ["Hebbal", "RT Nagar", "Sahakarnagar"]
  },
  {
    locationName: "Sahakarnagar",
    slug: "sahakarnagar",
    description: "Sahakarnagar, a quiet residential area with good family demographics, values peaceful and elegant decoration styles. We provide serene decoration solutions for family celebrations, intimate gatherings, and peaceful family events.",
    eventTypes: ["Family Celebrations", "Intimate Gatherings", "Peaceful Family Events", "Serene Decor", "Elegant Themes", "Quiet Celebrations"],
    testimonial: {
      text: "Sahakarnagar's peaceful atmosphere was enhanced by We Decor's elegant and serene decoration for our intimate family celebration!",
      author: "Family Member, Sahakarnagar",
      rating: 5
    },
    galleryTags: ["sahakarnagar", "family", "serene", "elegant"],
    nearbyLocations: ["Yelahanka", "Hebbal", "RT Nagar"]
  },
  {
    locationName: "Mathikere",
    slug: "mathikere",
    description: "Mathikere, a student area with educational institutions, appreciates creative and budget-friendly decoration styles. We provide innovative solutions for student parties, educational events, and creative celebrations that fit student budgets.",
    eventTypes: ["Student Parties", "Educational Events", "Creative Celebrations", "Budget-Friendly Decor", "Innovative Themes", "Student-Oriented Styles"],
    testimonial: {
      text: "Mathikere's student community loved We Decor's creative and affordable decoration for our college festival!",
      author: "Student Organizer, Mathikere",
      rating: 5
    },
    galleryTags: ["mathikere", "student", "creative", "budget"],
    nearbyLocations: ["Yeshwanthpur", "Rajajinagar", "Hebbal"]
  },
  {
    locationName: "Yeshwanthpur",
    slug: "yeshwanthpur",
    description: "Yeshwanthpur, an industrial area with mixed residential communities, values practical and durable decoration styles. We provide robust decoration solutions for industrial events, corporate celebrations, and practical family gatherings.",
    eventTypes: ["Industrial Events", "Corporate Celebrations", "Practical Family Gatherings", "Robust Decor", "Durable Themes", "Industrial Styles"],
    testimonial: {
      text: "Yeshwanthpur's industrial environment needed durable decoration, and We Decor provided robust solutions that lasted throughout our event!",
      author: "Industrial Client, Yeshwanthpur",
      rating: 5
    },
    galleryTags: ["yeshwanthpur", "industrial", "robust", "durable"],
    nearbyLocations: ["Mathikere", "Peenya", "Rajajinagar"]
  },
  {
    locationName: "Peenya",
    slug: "peenya",
    description: "Peenya, a major industrial area with limited residential communities, focuses on industrial and corporate decoration needs. We provide specialized services for industrial events, corporate functions, and professional celebrations.",
    eventTypes: ["Industrial Events", "Corporate Functions", "Professional Celebrations", "Industrial Decor", "Corporate Themes", "Professional Styles"],
    testimonial: {
      text: "Peenya's industrial community needed professional decoration, and We Decor delivered exactly what our corporate event required!",
      author: "Corporate Manager, Peenya",
      rating: 5
    },
    galleryTags: ["peenya", "industrial", "corporate", "professional"],
    nearbyLocations: ["Yeshwanthpur", "Nelamangala", "Mathikere"]
  },
  {
    locationName: "Nelamangala",
    slug: "nelamangala",
    description: "Nelamangala, an outskirts area with developing residential communities, appreciates simple and practical decoration styles. We provide basic decoration services for family events, small gatherings, and practical celebrations.",
    eventTypes: ["Family Events", "Small Gatherings", "Practical Celebrations", "Basic Decor", "Simple Themes", "Practical Styles"],
    testimonial: {
      text: "Nelamangala's simple lifestyle was perfectly complemented by We Decor's practical and beautiful decoration for our family event!",
      author: "Family Member, Nelamangala",
      rating: 5
    },
    galleryTags: ["nelamangala", "family", "simple", "practical"],
    nearbyLocations: ["Peenya", "Yeshwanthpur", "Sahakarnagar"]
  }
];

export const getLocationBySlug = (slug: string): LocationPage | undefined => {
  return locationPages.find(location => location.slug === slug);
};

export const getAllLocationSlugs = (): string[] => {
  return locationPages.map(location => location.slug);
};

export const getRandomNearbyLocations = (currentLocation: string, count: number = 3): string[] => {
  const allLocations = locationPages.map(loc => loc.locationName);
  const filteredLocations = allLocations.filter(loc => loc !== currentLocation);
  const shuffled = filteredLocations.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
