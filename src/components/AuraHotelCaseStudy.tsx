// components/AuraHotelCaseStudy.jsx

import React from 'react';
import Image from 'next/image';
// Lucide React is assumed to be available for icons, but not strictly necessary for this content-heavy page.
// If you want to use icons, you might import them like:
// import { Star, Compass, Users, Lightbulb } from 'lucide-react';

const AuraHotelCaseStudy = () => {
  // Data extracted and structured from the provided PDF for easy rendering.
  const traditionalLuxuryData = [
    { feature: "Core Concept", aura: "Luxury meets creative innovation", typical: "Luxury relaxation, general tourism" },
    { feature: "Target Audience", aura: "Artists, tech entrepreneurs, creatives, remote professionals", typical: "Honeymooners, families, vacationers" },
    { feature: "Residency Programs", aura: "Yes - curated artist & tech residencies", typical: "No" },
    { feature: "Creative/Innovation Studios", aura: "Dedicated spaces for art, coding, innovation", typical: "Usually none" },
    { feature: "Cultural Immersion", aura: "Collaboration with local artists, curated art & tech events", typical: "Often limited to standard tourist activities" },
    { feature: "Brand Storytelling Potential", aura: "High - each residency = unique content", typical: "Lower - more generalized guest experience" },
    { feature: "Community & Legacy", aura: "Builds a network of global creatives and innovators", typical: "One-time guests; little long-term community" },
    { feature: "Content Creation Value", aura: "Extremely high – UGC from residents, exhibitions, tech showcases", typical: "Moderate - mostly beach & leisure content" },
  ];

  const artistResidenciesData = [
    { feature: "Setting", aura: "Oceanfront, Caribbean luxury", global: "Often urban or rural, seasonal" },
    { feature: "Accommodation Level", aura: "5-star hotel luxury", global: "Modest dorms, shared housing" },
    { feature: "Hospitality Services", aura: "Full hotel service - spa, dining, concierge", global: "Limited or self-catered" },
    { feature: "Tech Integration", aura: "Includes tech residencies and innovation labs", global: "Rarely includes tech/entrepreneur focus" },
    { feature: "Work-Life Balance", aura: "Resort-level relaxation + structured creation time", global: "Focus on work, less on comfort" },
    { feature: "Year-Round", aura: "Yes", global: "Often seasonal, limited cohorts" },
  ];

  const nomadRetreatsData = [
    { feature: "Aesthetic & Comfort", aura: "High-end, designer interiors and private suites", nomad: "Budget to mid-tier shared rooms" },
    { feature: "Creative/Tech Residency Support", aura: "Structured programs with exposure & community", nomad: "Mostly coworking + casual meetups" },
    { feature: "Curated Guests", aura: "Application-based residencies for artists and innovators", nomad: "Open to general travelers" },
    { feature: "Cultural Depth", aura: "Curated local collaborations & creative immersion", nomad: "Minimal cultural integration" },
    { feature: "Audience Fit", aura: "Serious creatives, tech founders, established professionals", nomad: "Digital nomads, remote workers, casual creatives" },
  ];

  const differentiators = [
    "One-of-a-kind hybrid model: Combines five-star luxury, artist residencies, and innovation retreats",
    "Elevated guest experience: Think spa treatments after studio time, or ocean-view brainstorming",
    "Content-rich ecosystem: Endless UGC and brand storytelling from each residency",
    "Cultural authenticity with modern luxury: Deep Jamaican inspiration meets global creativity",
    "Future-facing brand: Appeals to the next generation of luxury travelers – those who create, not just consume",
  ];

  const keywords = {
    primary: [
      "Luxury hotel in Jamaica", "Creative residencies in the Caribbean", "Tech residencies Jamaica",
      "Artist residency hotel Jamaica", "Boutique hotel for artists", "Innovation retreats Jamaica"
    ],
    secondary: [
      "All-inclusive luxury retreat Jamaica", "Creative entrepreneurship residencies", "Hotel with private studios Jamaica",
      "Digital nomad retreat Caribbean", "Jamaica beachfront hotel for creatives"
    ],
    branded: [
      "The Aura Hotel Jamaica", "The Aura Artist Residency", "The Aura Tech Residency"
    ]
  };

  const seoStrategies = {
    onPage: {
      metaExample: {
        title: "The Aura Hotel | Luxury Artist & Tech Residency Hotel in Jamaica",
        description: "Experience unmatched luxury, creativity, and innovation at The Aura Hotel a beachfront sanctuary in Jamaica offering exclusive residencies for artists and tech entrepreneurs."
      },
      contentOptimization: [
        "SEO-rich landing pages for: Artist Residencies, Tech Residencies, Rooms & Suites, Dining & Wellness, Location, Events & Retreats.",
        "Include internal links to relevant blog posts or residency pages."
      ],
      imageSEO: [
        "Use descriptive filenames (e.g., aura-hotel-artist-suite.jpg)",
        "Add alt tags with keywords (e.g., alt=\"Luxury artist suite at The Aura Hotel in Jamaica\")"
      ]
    },
    blogContent: {
      postIdeas: [
        "Top 5 Artist Residencies in the Caribbean (and Why The Aura Hotel Leads the List)",
        "The Future of Innovation Retreats: Combining Work & Wellness in Jamaica",
        "How Our Tech Residency Helps Founders Reset & Refocus by the Ocean",
        "What It's Like to Live as an Artist-in-Residence at The Aura Hotel",
        "A Guide to Creative Retreats in Jamaica: Where Luxury Meets Inspiration"
      ],
      keywordUsage: ["Headings (H1-H3)", "Meta tags", "First 100 words", "Image captions and file names", "URL slugs"]
    },
    technicalSEO: [
      "Mobile-optimized responsive design", "Fast-loading pages (compress images, use caching)",
      "HTTPS secure site", "XML sitemap submitted to Google Search Console",
      "Structured data for hotel and events (schema.org markup)"
    ],
    offPage: [
      "Reach out to travel bloggers, art platforms, and tech publications to write about your residencies.",
      "List your residencies on curated platforms: ResArtis.org, ArtConnect, Nomad List.",
      "Collaborate with travel influencers and digital nomad YouTubers.",
      "Submit press releases about residency programs to art/tech media."
    ],
    localSEO: [
      "Google Business Profile: Add keywords to description, Upload high-quality images of the hotel, Get guests (especially artists/tech residents) to leave reviews.",
      "Include your NAP (Name, Address, Phone) on every page (preferably in the footer)."
    ],
    monitoringTools: [
      "Google Analytics 4 - track traffic & user behavior",
      "Google Search Console - monitor indexing and keyword performance",
      "Ahrefs or SEMrush (if available) - for competitor tracking and backlink audits"
    ]
  };

  const brandVoiceAndThemes = {
    voice: "Warm, elevated, creative, visionary",
    tone: "Sophisticated but welcoming, with an artistic soul",
    coreThemes: [
      "Artist Spotlights: In-residence creators, work-in-progress clips, final exhibitions.",
      "Tech Innovation: Resident tech founders, app or product demos, co-creation stories.",
      "Luxury Lifestyle: Spa, dining, design aesthetics, and the Jamaican landscape.",
      "Residency Life: Behind the scenes, studio sessions, ocean-side brainstorms.",
      "Global Culture Meets Island Calm: Position as a global hub on a peaceful coast."
    ]
  };

  const platformStrategy = {
    instagram: {
      description: "Primary platform for daily behind-the-scenes stories, short interview reels, drone views, and editorial-style posts.",
      hashtags: "#AuraJamaica #TechMeetsTropics #ArtLivesHere #ResidencyRetreat #TheAuraExperience"
    },
    linkedin: "Focus on tech residencies, innovation retreats, and partnerships. Post founder interviews, innovation case studies, thought-leadership content.",
    tiktok: "Optional but great for virality: \"A day in the life of a resident\", Creative transformations of rooms/studios, Time-lapse of murals, coding, installations.",
    pinterest: "Visual storytelling: luxury interiors, \"dream residencies,\" mood boards. Attract design lovers and artists planning future retreats."
  };

  const contentIdeas = [
    { category: "Resident Features", ideas: ["\"Meet the Artist/Innovator\" mini-documentaries"] },
    { category: "Luxury Escape", ideas: ["\"A day at The Aura: sun, spa, and soul\""] },
    { category: "Process", ideas: ["\"From concept to canvas: inside our creative studios\""] },
    { category: "Showcase", ideas: ["Final exhibitions or prototype launches"] },
    { category: "Behind-the-Scenes", ideas: ["Staff stories, culinary art, room prep for VIPs"] },
    { category: "Testimonials", ideas: ["Quotes from past residents and guests"] },
    { category: "Partnerships", ideas: ["Collabs with galleries, tech brands, wellness companies"] },
    { category: "Live Events", ideas: ["Promote on-site or virtual gallery openings, innovation showcases"] }
  ];

  const collaborationsAndCommunity = [
    "Invite Influencers & Micro-Creators: In art, tech, and luxury travel.",
    "Host Instagram Takeovers with residents (show their journey).",
    "Encourage UGC: Offer a branded hashtag, spotlight best posts.",
    "Offer Referral Incentives for past residents to bring in new creators."
  ];

  const paidStrategy = [
    "Instagram + Meta Ads: Target creative entrepreneurs, digital nomads, art collectors, tech founders in major cities (NYC, London, Berlin, Toronto).",
    "Retargeting: Site visitors who explored the residency page.",
    "Promote Experiences: Use short, cinematic ads showing residencies in action \"Apply to Create at The Aura.\""
  ];

  const uniqueCampaignIdeas = [
    "#AuraInResidence Series: Document each artist/tech guest in short-form video.",
    "\"Aura Retreat Week\": Showcase one themed week (e.g. music tech, digital art).",
    "\"Create from Paradise\" Contest: Win a free mini-residency with a branded submission challenge."
  ];

  const exampleTaglines = [
    "Welcome to The Hotel Aura where island beauty meets timeless elegance.",
    "Breathe in the Caribbean breeze. Indulge in refined relaxation. Only at The Hotel Aura.",
    "An invitation to experience Jamaica in its most luxurious form",
    "Gracefully perched between turquoise waters and golden sunsets discover your sanctuary at The Hotel Aura.",
    "Every detail curated, every moment unforgettable luxury lives here. The Hotel Aura awaits.",
    "Feel the warmth of the island. Stay for the soul of sophistication. Only at The Hotel Aura.",
    "From handcrafted cocktails to oceanfront serenity let The Hotel Aura redefine your escape.",
    "Where modern luxury dances with island charm experience the essence of The Hotel Aura.",
    "Step into effortless elegance. Step into The Aura Hotel - Jamaica's finest retreat.",
    "At The Aura Hotel, we don't just welcome you we envelop you in Caribbean grace and grandeur."
  ];

  const newsletterContent = {
    founderMessage: {
      author: "Eleanor Voss, Founder & Curator",
      text: "Welcome to the inaugural edition of The Aura Chronicle—a curated journey into the soul of The Aura Hotel, where artistry meets cutting-edge innovation. Nestled in the heart of London, our sanctuary is designed for creators, disruptors, and dreamers. Whether you're an artist seeking inspiration or a tech startup redefining the future, Aura is your stage. Stay tuned for exclusive previews, resident spotlights, and immersive experiences. The canvas is yours."
    },
    artistResidencyProgram: {
      title: "Artist Residency Program: Call for Submissions",
      details: [
        "A 4-week luxury stay in a bespoke studio suite",
        "Gallery exhibitions in our Luminous Hall",
        "Collaborative workshops with tech startups"
      ],
      theme: "\"The Future of Human Expression\"",
      deadline: "June 30, 2024"
    },
    techStartups: {
      title: "Tech Startups: Incubate in Style (The Aura Nexus)",
      description: "London's first hotel-based co-working lab for seed-stage startups.",
      perks: [
        "AI-powered meeting rooms with holographic displays",
        "Monthly pitch nights (VC partners invited!)",
        "Wellness breaks with sound bath meditation"
      ],
      demoDay: "July 12, 2024",
      featuredStartup: "NeuroFlair (AI for gallery curation)"
    },
    paletteLounge: {
      title: "The Palette Lounge: Where Ideas Blend",
      description: "Sip on molecular mixology while networking in our living art lounge:",
      features: [
        "\"Mondrian Mimosas\" (3D-printed citrus caviar)",
        "Live digital art auctions (NFT/physical hybrids)",
        "Vinyl listening sessions (curated by resident DJs)"
      ],
      availability: "Open nightly | Members receive priority access"
    },
    upcomingEvents: [
      "June 5: AI x Abstract Art Workshop (with Google Arts Lab)",
      "June 18: Founders' Tea: Fireside chat with ex-Apple designer",
      "July 1: Midnight Jazz & Code* (live music + hackathon)"
    ],
    greenPromise: {
      title: "Aura's Green Promise",
      pledges: [
        "100% renewable energy (solar-glass windows!)",
        "Local artist upcycling program (turn linens into art)",
        "Carbon-neutral stays (partnering with Ecologi*)"
      ]
    },
    contactInfo: {
      tagline: "\"Where every stay is a masterpiece.\"",
      hotelName: "*The Aura Hotel*",
      address: "88 Creativity Lane, London",
      email: "hello@hotelaura.com",
      social: {
        instagram: "#", // Placeholder for actual link
        linkedin: "#",  // Placeholder for actual link
        spotify: "#"    // Placeholder for actual link
      }
    }
  };

  // Array of AI-generated images
  const aiImages = [
    { src: 'showcase/beachfront.png', alt: 'A serene Caribbean beachfront with palm trees and red flowers, typical of a paradise resort.' },
    { src: 'showcase/hotel.png', alt: 'An aerial view of a luxury hotel building with a large swimming pool, surrounded by palm trees and a vibrant blue ocean at sunset.' },
    { src: 'showcase/lady.png', alt: 'A person relaxing in a colorful hammock on a tropical beach, overlooking clear blue water and lush green hills.' },
    { src: 'showcase/hotelenhanced.png', alt: 'An aerial view of a luxury hotel building with a large swimming pool, surrounded by palm trees and a vibrant blue ocean at sunset **ENHANCED** with hotelgoers and a pool bar.' },
    // You would typically add the 4th image here as well if provided, for example:
    // { src: 'hotel_exterior_modern.png', alt: 'Modern luxury hotel exterior with infinity pool overlooking mountains.' },
  ];

  const TableComponent = ({ title, headers, data }) => (
    <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-200">
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="font-sans antialiased bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="max-w-4xl mx-auto py-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Case Study: The Aura Hotel
        </h1>
        <p className="text-xl text-gray-600">
          Automating Content Creation for a Premier Luxury Destination for Creatives and Innovators
        </p>
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Project Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The Aura Hotel, positioned as Jamaica's premier luxury hotel for creatives and innovators, sought to enhance
            its unique offering by integrating tailored artist and tech residencies with five-star amenities, profound
            cultural immersion, and a tranquil oceanfront setting. Our content automation solution was deployed to
            streamline and enrich their brand storytelling and content creation pipeline, highlighting their distinct
            value proposition in a competitive market.
          </p>
        </section>

        <section>
          <TableComponent
            title="The Aura Hotel vs. Traditional Luxury Resorts in Jamaica"
            headers={["Feature", "The Aura Hotel", "Typical Luxury Jamaican Resorts"]}
            data={traditionalLuxuryData}
          />
        </section>

        <section>
          <TableComponent
            title="The Aura Hotel vs. Other Artist Residencies (Global)"
            headers={["Feature", "The Aura Hotel (Jamaica)", "Global Artist Residencies"]}
            data={artistResidenciesData}
          />
        </section>

        <section>
          <TableComponent
            title="The Aura Hotel vs. Remote Work Retreats (Nomad-Focused)"
            headers={["Feature", "The Aura Hotel", "Nomad Retreats (e.g., Selina, Outsite)"]}
            data={nomadRetreatsData}
          />
        </section>

        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Sets The Aura Hotel Apart</h2>
          <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 leading-relaxed">
            {differentiators.map((differentiator, index) => (
              <li key={index}>{differentiator}</li>
            ))}
          </ul>
        </section>

        {/* Section: Content & SEO Strategy */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Content & SEO Strategy</h2>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Keywords Identified & Targeted</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-xl font-medium text-gray-700 mb-2">Primary Keywords</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {keywords.primary.map((kw, idx) => <li key={idx}>{kw}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-medium text-gray-700 mb-2">Secondary Keywords</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {keywords.secondary.map((kw, idx) => <li key={idx}>{kw}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-medium text-gray-700 mb-2">Branded Keywords</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {keywords.branded.map((kw, idx) => <li key={idx}>{kw}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">On-Page SEO Optimization</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-3">
              Optimized page titles and meta descriptions for compelling search results:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <p className="font-semibold text-gray-800">Title:</p>
              <p className="text-gray-700 mb-2">{seoStrategies.onPage.metaExample.title}</p>
              <p className="font-semibold text-gray-800">Meta Description:</p>
              <p className="text-gray-700">{seoStrategies.onPage.metaExample.description}</p>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold mb-2">Content & Image Optimization:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {seoStrategies.onPage.contentOptimization.map((item, idx) => <li key={idx}>{item}</li>)}
              {seoStrategies.onPage.imageSEO.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Blog Content Strategy</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-2">Targeted blog post ideas for engagement and SEO:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
              {seoStrategies.blogContent.postIdeas.map((idea, idx) => <li key={idx}>{idea}</li>)}
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold mb-2">Keywords are naturally integrated into:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {seoStrategies.blogContent.keywordUsage.map((usage, idx) => <li key={idx}>{usage}</li>)}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Technical SEO</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {seoStrategies.technicalSEO.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Off-Page SEO & Backlinks</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {seoStrategies.offPage.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Local SEO (Google Business Profile)</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {seoStrategies.localSEO.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Monitoring & Improvement Tools</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {seoStrategies.monitoringTools.map((tool, idx) => <li key={idx}>{tool}</li>)}
            </ul>
          </div>
        </section>

        {/* Section: Social Media Management & Engagement */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Social Media Management & Engagement</h2>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Brand Voice & Themes</h3>
            <p className="text-lg text-gray-700 mb-2"><span className="font-medium">Voice:</span> {brandVoiceAndThemes.voice}</p>
            <p className="text-lg text-gray-700 mb-3"><span className="font-medium">Tone:</span> {brandVoiceAndThemes.tone}</p>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold mb-2">Core Themes to Post Around:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {brandVoiceAndThemes.coreThemes.map((theme, idx) => <li key={idx}>{theme}</li>)}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Platform Strategy</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-medium text-gray-700 mb-1">Instagram (Primary)</h4>
                <p className="text-gray-700">{platformStrategy.instagram.description}</p>
                <p className="text-gray-600 italic">Hashtags: {platformStrategy.instagram.hashtags}</p>
              </div>
              <div>
                <h4 className="text-xl font-medium text-gray-700 mb-1">LinkedIn</h4>
                <p className="text-gray-700">{platformStrategy.linkedin}</p>
              </div>
              <div>
                <h4 className="text-xl font-medium text-gray-700 mb-1">TikTok (Optional)</h4>
                <p className="text-gray-700">{platformStrategy.tiktok}</p>
              </div>
              <div>
                <h4 className="text-xl font-medium text-gray-700 mb-1">Pinterest</h4>
                <p className="text-gray-700">{platformStrategy.pinterest}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Content Ideas</h3>
            {contentIdeas.map((cat, idx) => (
              <div key={idx} className="mb-3">
                <h4 className="text-xl font-medium text-gray-700 mb-1">{cat.category}</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {cat.ideas.map((idea, i) => <li key={i}>{idea}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Collaborations & Community</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {collaborationsAndCommunity.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Paid Strategy (Optional)</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {paidStrategy.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Unique Campaign Ideas</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {uniqueCampaignIdeas.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        </section>

        {/* Section: Automated Content Examples */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Automated Content Examples</h2>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Key Taglines & Slogans</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {exampleTaglines.map((tag, idx) => <li key={idx}>&quot;{tag}&quot;</li>)}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Excerpt from "The Aura Chronicle" Newsletter</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-lg font-bold text-gray-900 mb-2">A Message from Our Founder</p>
              <p className="text-gray-700 mb-3">{newsletterContent.founderMessage.text}</p>
              <p className="text-gray-600 text-right italic">- {newsletterContent.founderMessage.author}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{newsletterContent.artistResidencyProgram.title}</h3>
            <p className="text-lg text-gray-700 mb-2">Selected visionaries receive:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {newsletterContent.artistResidencyProgram.details.map((detail, idx) => <li key={idx}>{detail}</li>)}
            </ul>
            <p className="text-gray-700 mt-2">Theme: <span className="italic">{newsletterContent.artistResidencyProgram.theme}</span></p>
            <p className="text-gray-700">Deadline: <span className="font-medium">{newsletterContent.artistResidencyProgram.deadline}</span></p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{newsletterContent.techStartups.title}</h3>
            <p className="text-lg text-gray-700 mb-2">{newsletterContent.techStartups.description}</p>
            <p className="font-medium text-gray-700 mb-1">Perks include:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {newsletterContent.techStartups.perks.map((perk, idx) => <li key={idx}>{perk}</li>)}
            </ul>
            <p className="text-gray-700 mt-2">Next Demo Day: <span className="font-medium">{newsletterContent.techStartups.demoDay}</span></p>
            <p className="text-gray-700">Featured Startup: <span className="font-medium">{newsletterContent.techStartups.featuredStartup}</span></p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{newsletterContent.paletteLounge.title}</h3>
            <p className="text-lg text-gray-700 mb-2">{newsletterContent.paletteLounge.description}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {newsletterContent.paletteLounge.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
            </ul>
            <p className="text-gray-700 mt-2">{newsletterContent.paletteLounge.availability}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Upcoming Events</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {newsletterContent.upcomingEvents.map((event, idx) => <li key={idx}>{event}</li>)}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{newsletterContent.greenPromise.title}</h3>
            <p className="text-lg text-gray-700 mb-2">As a zero-waste hotel, we pledge:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {newsletterContent.greenPromise.pledges.map((pledge, idx) => <li key={idx}>{pledge}</li>)}
            </ul>
          </div>

          <div className="text-center text-gray-700">
            <p className="text-xl font-bold mb-1">{newsletterContent.contactInfo.tagline}</p>
            <p className="text-lg mb-1">{newsletterContent.contactInfo.hotelName}</p>
            <p className="text-md mb-1">{newsletterContent.contactInfo.address}</p>
            <p className="text-md mb-3">Email: <a href={`mailto:${newsletterContent.contactInfo.email}`} className="text-blue-600 hover:underline">{newsletterContent.contactInfo.email}</a></p>
            <div className="flex justify-center space-x-4">
              <a href={newsletterContent.contactInfo.social.instagram} className="text-blue-600 hover:underline">Instagram</a>
              <a href={newsletterContent.contactInfo.social.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>
              <a href={newsletterContent.contactInfo.social.spotify} className="text-blue-600 hover:underline">Spotify Playlist</a>
            </div>
          </div>
        </section>

        {/* New Section: AI Photo Editing */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">AI Photo Editing & Enhancement</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Our AI photo editing capabilities allow The Aura Hotel to elevate existing imagery or refine AI-generated visuals.
            This includes automated color correction, lighting adjustments, background removal/replacement, object enhancement,
            and style transfers, ensuring every image is pixel-perfect and on-brand.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiImages.map((image, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md">
                <Image
                  src={`/${image.src}`} // Assuming images are in the public directory of your Next.js project
                  alt={image.alt}
                  className="w-full h-auto rounded-lg object-cover mb-4 shadow-sm"
                />
                <p className="text-center text-sm text-gray-600 italic">
                  Example: "{image.alt}" (This image could be enhanced through AI photo editing, e.g., for optimal lighting or mood.)
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* New Section: AI Video Creation */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">AI Video Creation</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Leveraging cutting-edge AI, we can generate dynamic video content for The Aura Hotel, from short social media clips
            to engaging promotional videos. This includes synthesizing footage, generating voiceovers, adding intelligent transitions,
            and incorporating music, all tailored to specific marketing campaigns and brand messaging. Imagine a virtual tour,
            a residency highlight reel, or an immersive brand story, all created with minimal manual input.
          </p>
          <div className="flex justify-center">
            {/* Placeholder for an actual AI-generated video. Using a generic YouTube embed as an example. */}
            <iframe
              width="560"
              height="315"
              src="videos/aura.mp4" // Placeholder video (Rick Astley) - replace with actual content
              title="Placeholder AI Generated Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-xl aspect-video w-full max-w-2xl"
            ></iframe>
          </div>
          <p className="text-center text-sm text-gray-600 italic mt-4">
            (Placeholder video: This space would feature a compelling AI-generated video showcasing The Aura Hotel, its amenities, or residency experiences.)
          </p>
        </section>


        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Solution & Impact</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            By automating content generation and management, we empowered The Aura Hotel to consistently articulate
            its unique hybrid model and elevated guest experience. This ensures a continuous flow of authentic,
            engaging content from each residency, amplifying their brand story and attracting their target audience
            of serious creatives and innovators.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our content automation strategy positioned The Aura Hotel as a future-facing brand, appealing to the next
            generation of luxury travelers who seek to create, not just consume.
          </p>
        </section>
      </main>

      <footer className="max-w-4xl mx-auto py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} ContentPal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuraHotelCaseStudy;
