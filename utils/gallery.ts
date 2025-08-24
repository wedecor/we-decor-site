// Enhanced gallery interface with location tags
export interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
  tags?: string[];
  locationTags?: string[];
}

// Convert the existing gallery structure to include location tags
const enhancedGallery: Record<string, GalleryImage[]> = {
  "corporate event": [
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045457/we-decor/corporate%20event/8D3A9822.jpg",
      "alt": "8D3A9822",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045455/we-decor/corporate%20event/IMG_20220813_195350.jpg",
      "alt": "IMG 20220813 195350",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045455/we-decor/corporate%20event/IMG_20220813_182017.jpg",
      "alt": "IMG 20220813 182017",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045453/we-decor/corporate%20event/8D3A9832.jpg",
      "alt": "8D3A9832",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045422/we-decor/corporate%20event/IMG_20230310_125952.jpg",
      "alt": "IMG 20230310 125952",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045421/we-decor/corporate%20event/IMG_20220706_015407.jpg",
      "alt": "IMG 20220706 015407",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045420/we-decor/corporate%20event/IMG_20221208_165717.jpg",
      "alt": "IMG 20221208 165717",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045418/we-decor/corporate%20event/IMG_20230310_125852.jpg",
      "alt": "IMG 20230310 125852",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045404/we-decor/corporate%20event/IMG20230311183341.jpg",
      "alt": "IMG20230311183341",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045395/we-decor/corporate%20event/IMG20220630214506.jpg",
      "alt": "IMG20220630214506",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045391/we-decor/corporate%20event/IMG20220623015558.jpg",
      "alt": "IMG20220623015558",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045384/we-decor/corporate%20event/IMG20220623015811.jpg",
      "alt": "IMG20220623015811",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045372/we-decor/corporate%20event/IMG20220630210013.jpg",
      "alt": "IMG20220630210013",
      "category": "corporate event",
      "tags": ["corporate", "event", "professional"],
      "locationTags": ["whitefield", "electronic-city", "koramangala", "indiranagar"]
    }
  ],
  "engagement": [
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045457/we-decor/engagement/IMG_20220804_111702.jpg",
      "alt": "IMG 20220804 111702",
      "category": "engagement",
      "tags": ["engagement", "romantic", "celebration"],
      "locationTags": ["jayanagar", "indiranagar", "koramangala", "hebbal"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045456/we-decor/engagement/1664888637300.jpg",
      "alt": "1664888637300",
      "category": "engagement",
      "tags": ["engagement", "romantic", "celebration"],
      "locationTags": ["jayanagar", "indiranagar", "koramangala", "hebbal"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045455/we-decor/engagement/IMG_20220804_111849.jpg",
      "alt": "IMG 20220804 111849",
      "category": "engagement",
      "tags": ["engagement", "romantic", "celebration"],
      "locationTags": ["jayanagar", "indiranagar", "koramangala", "hebbal"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045450/we-decor/engagement/IMG_20220804_111707.jpg",
      "alt": "IMG 20220804 111707",
      "category": "engagement",
      "tags": ["engagement", "romantic", "celebration"],
      "locationTags": ["jayanagar", "indiranagar", "koramangala", "hebbal"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045446/we-decor/engagement/1672323160504.jpg",
      "alt": "1672323160504",
      "category": "engagement",
      "tags": ["engagement", "romantic", "celebration"],
      "locationTags": ["jayanagar", "indiranagar", "koramangala", "hebbal"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045440/we-decor/engagement/IMG_20220901_173447.jpg",
      "alt": "IMG 20220901 173447",
      "category": "engagement",
      "tags": ["engagement", "romantic", "celebration"],
      "locationTags": ["jayanagar", "indiranagar", "koramangala", "hebbal"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045433/we-decor/engagement/IMG20221225190848.jpg",
      "alt": "IMG20221225190848",
      "category": "engagement",
      "tags": ["engagement", "romantic", "celebration"],
      "locationTags": ["jayanagar", "indiranagar", "koramangala", "hebbal"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045426/we-decor/engagement/IMG_20221208_052732.jpg",
      "alt": "IMG 20221208 052732",
      "category": "engagement",
      "tags": ["engagement", "romantic", "celebration"],
      "locationTags": ["jayanagar", "indiranagar", "koramangala", "hebbal"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045425/we-decor/engagement/IMG_20230223_092722_1.jpg",
      "alt": "IMG 20230223 092722 1",
      "category": "engagement",
      "tags": ["engagement", "romantic", "celebration"],
      "locationTags": ["jayanagar", "indiranagar", "koramangala", "hebbal"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045421/we-decor/engagement/IMG_20220821_094856.jpg",
      "alt": "IMG 20220821 094856",
      "category": "engagement",
      "tags": ["engagement", "romantic", "celebration"],
      "locationTags": ["jayanagar", "indiranagar", "koramangala", "hebbal"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045405/we-decor/engagement/IMG_20221203_173403.jpg",
      "alt": "IMG 20221203 173403",
      "category": "engagement",
      "tags": ["engagement", "romantic", "celebration"],
      "locationTags": ["jayanagar", "indiranagar", "koramangala", "hebbal"]
    }
  ],
  "birthday": [
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045451/we-decor/birthday/IMG_20230213_181247.jpg",
      "alt": "IMG 20230213 181247",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045448/we-decor/birthday/IMG_20230208_191510.jpg",
      "alt": "IMG 20230208 191510",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045447/we-decor/birthday/IMG_20230130_175936.jpg",
      "alt": "IMG 20230130 175936",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045445/we-decor/birthday/IMG_20221220_175545.jpg",
      "alt": "IMG 20221220 175545",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045443/we-decor/birthday/IMG_20221210_172234.jpg",
      "alt": "IMG 20221210 172234",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045441/we-decor/birthday/IMG_20221122_172611.jpg",
      "alt": "IMG 20221122 172611",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045439/we-decor/birthday/IMG_20221119_123451.jpg",
      "alt": "IMG 20221119 123451",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045437/we-decor/birthday/IMG_20221008_190648.jpg",
      "alt": "IMG 20221008 190648",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045435/we-decor/birthday/IMG_20221001_104927_2.jpg",
      "alt": "IMG 20221001 104927 2",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045433/we-decor/birthday/IMG_20220903_190953.jpg",
      "alt": "IMG 20220903 190953",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045431/we-decor/birthday/313A0339.JPG",
      "alt": "313A0339",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045429/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045427/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045425/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045423/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045421/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045419/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045417/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045415/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045413/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045411/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045409/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045407/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045405/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045403/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045401/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045399/we-decor/birthday/IMG_20220827_202431.jpg",
      "alt": "IMG 20220827 202431",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045397/we-decor/birthday/IMG20221120193712.jpg",
      "alt": "IMG20221120193712",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045397/we-decor/birthday/IMG_20221206_171916.jpg",
      "alt": "IMG 20221206 171916",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045394/we-decor/birthday/IMG20230112224831.jpg",
      "alt": "IMG20230112224831",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045389/we-decor/birthday/IMG_20221008_190648.jpg",
      "alt": "IMG 20221008 190648",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045389/we-decor/birthday/IMG20221120105704.jpg",
      "alt": "IMG20221120105704",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045384/we-decor/birthday/IMG20220623160109.jpg",
      "alt": "IMG20220623160109",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045378/we-decor/birthday/IMG_20221007201749.jpg",
      "alt": "IMG 20221007201749",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045376/we-decor/birthday/IMG_20221115011744.jpg",
      "alt": "IMG 20221115011744",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045376/we-decor/birthday/IMG_20221007170120.jpg",
      "alt": "IMG 20221007170120",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045352/we-decor/birthday/1666968820589.jpg",
      "alt": "1666968820589",
      "category": "birthday",
      "tags": ["birthday", "celebration", "party"],
      "locationTags": ["whitefield", "koramangala", "hsr", "jayanagar", "rt-nagar"]
    }
  ],
  "haldi": [
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045451/we-decor/haldi/1676444453828.jpg",
      "alt": "1676444453828",
      "category": "haldi",
      "tags": ["haldi", "traditional", "wedding", "ceremony"],
      "locationTags": ["jayanagar", "rt-nagar", "hebbal", "basavanagudi"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045436/we-decor/haldi/IMG_20230127_163004.jpg",
      "alt": "IMG 20230127 163004",
      "category": "haldi",
      "tags": ["haldi", "traditional", "wedding", "ceremony"],
      "locationTags": ["jayanagar", "rt-nagar", "hebbal", "basavanagudi"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045431/we-decor/haldi/IMG_20221211_093435_1.jpg",
      "alt": "IMG 20221211 093435 1",
      "category": "haldi",
      "tags": ["haldi", "traditional", "wedding", "ceremony"],
      "locationTags": ["jayanagar", "rt-nagar", "hebbal", "basavanagudi"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045402/we-decor/haldi/IMG20221117185438.jpg",
      "alt": "IMG20221117185438",
      "category": "haldi",
      "tags": ["haldi", "traditional", "wedding", "ceremony"],
      "locationTags": ["jayanagar", "rt-nagar", "hebbal", "basavanagudi"]
    }
  ],
  "baby shower": [
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045414/we-decor/baby%20shower/IMG_20220731_111803.jpg",
      "alt": "IMG 20220731 111803",
      "category": "baby shower",
      "tags": ["baby shower", "celebration", "family"],
      "locationTags": ["whitefield", "hsr", "koramangala", "jayanagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045413/we-decor/baby%20shower/IMG20221030084105.jpg",
      "alt": "IMG20221030084105",
      "category": "baby shower",
      "tags": ["baby shower", "celebration", "family"],
      "locationTags": ["whitefield", "hsr", "koramangala", "jayanagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045402/we-decor/baby%20shower/IMG_20220731_105025.jpg",
      "alt": "IMG 20220731 105025",
      "category": "baby shower",
      "tags": ["baby shower", "celebration", "family"],
      "locationTags": ["whitefield", "hsr", "koramangala", "jayanagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045393/we-decor/baby%20shower/IMG20221030085036.jpg",
      "alt": "IMG20221030085036",
      "category": "baby shower",
      "tags": ["baby shower", "celebration", "family"],
      "locationTags": ["whitefield", "hsr", "koramangala", "jayanagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045383/we-decor/baby%20shower/IMG20221030095327_1.jpg",
      "alt": "IMG20221030095327 1",
      "category": "baby shower",
      "tags": ["baby shower", "celebration", "family"],
      "locationTags": ["whitefield", "hsr", "koramangala", "jayanagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045363/we-decor/baby%20shower/IMG20221016185451.jpg",
      "alt": "IMG20221016185451",
      "category": "baby shower",
      "tags": ["baby shower", "celebration", "family"],
      "locationTags": ["whitefield", "hsr", "koramangala", "rt-nagar"]
    }
  ],
  "room decor": [
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045381/we-decor/room%20decor/IMG_20250531_163833_1.jpg",
      "alt": "IMG 20250531 163833 1",
      "category": "room decor",
      "tags": ["room decor", "interior", "decoration"],
      "locationTags": ["whitefield", "hsr", "koramangala", "indiranagar", "jayanagar"]
    },
    {
      "src": "https://res.cloudinary.com/dux3m2saz/image/upload/v1753045378/we-decor/room%20decor/IMG_20250531_163821_1.jpg",
      "alt": "IMG 20250531 163821 1",
      "category": "room decor",
      "tags": ["room decor", "interior", "decoration"],
      "locationTags": ["whitefield", "hsr", "koramangala", "indiranagar", "jayanagar"]
    }
  ]
};

// Utility functions
export const getGalleryImages = (): GalleryImage[] => {
  const allImages: GalleryImage[] = [];
  
  Object.entries(enhancedGallery).forEach(([category, images]) => {
    images.forEach(image => {
      allImages.push({
        ...image,
        category: category
      });
    });
  });
  
  return allImages;
};

export const getImagesByCategory = (category: string): GalleryImage[] => {
  return enhancedGallery[category] || [];
};

export const getImagesByLocation = (locationSlug: string): GalleryImage[] => {
  const allImages = getGalleryImages();
  const locationImages = allImages.filter(image => 
    image.locationTags?.some(tag => tag === locationSlug)
  );
  
  // Fallback: if no images match location, return 3 generic images
  if (locationImages.length === 0) {
    return getGenericImages(3);
  }
  
  return locationImages;
};

export const getGenericImages = (count: number = 3): GalleryImage[] => {
  const allImages = getGalleryImages();
  const genericImages = allImages.filter(image => 
    image.tags?.includes("generic") || 
    image.category === "birthday" || 
    image.category === "corporate event"
  );
  
  // Shuffle and return requested count
  const shuffled = genericImages.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getImagesByTags = (tags: string[]): GalleryImage[] => {
  const allImages = getGalleryImages();
  return allImages.filter(image => 
    tags.some(tag => 
      image.tags?.includes(tag) || 
      image.category?.toLowerCase().includes(tag.toLowerCase())
    )
  );
};

export default enhancedGallery;
