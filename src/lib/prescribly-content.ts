export const SITE = 'Prescribly Events';
export const BASE = 'https://padandfresh.lovable.app';
export const KADUNA_SLUG = 'kaduna-digital-health-wellness-week-2027';
export const TARGETS = [
  ['5,000+', 'People engaged'], ['2,500', 'Health screenings'], ['1,000', 'Women reached'], ['500', 'Students engaged'], ['1,000', 'Event registrations'],
] as const;
export const PILLARS = [
  ['Conversations', 'Bringing experts and communities together around important healthcare issues.'],
  ['Community health', 'Taking health education, screening and access beyond the digital platform.'],
  ['Innovation', 'Connecting healthcare with technology, entrepreneurship and new ideas.'],
  ["Women’s health", "Creating dedicated spaces for conversations around women's health and wellbeing."],
  ['Youth', 'Helping young people discover healthcare, technology and digital health opportunities.'],
  ['Partnerships', 'Connecting organizations that want to contribute to better healthcare.'],
] as const;
export type Topic = { title: string; description: string };
export type Collection = { title: string; headline: string; copy: string; format: string; disclaimer?: string; topics: Topic[] };
const make = (rows: [string, string][]): Topic[] => rows.map(([title, description]) => ({ title, description }));
export const COLLECTIONS: Record<string, Collection> = {
  'health-futures': {
    title: 'Prescribly Health Futures', headline: 'What should the future of healthcare in Africa look like?',
    copy: 'Prescribly Health Futures is a conversation series bringing together people working across healthcare, technology, innovation and community development.', format: 'Conversation series',
    topics: make([
      ['The Future of Healthcare in Africa','Exploring the people, systems and ideas shaping care across the continent.'],['AI in Healthcare','A conversation about responsible opportunities and limitations.'],['Preventive Healthcare','Why prevention and early action matter.'],["Women’s Health in Africa",'Building access and informed conversations.'],['Digital Health & Healthcare Accessibility','Making care easier to reach.'],['Healthtech & Innovation','Ideas and partnerships that move care forward.'],['The Future of Medical Practice','Changing tools and enduring human expertise.'],['Healthcare Infrastructure','The foundations of reliable care.'],['The Future of Health Data','Trust, privacy and interoperability.'],['Building Patient-Centred Healthcare Systems','Designing around the needs of people.'],
    ]),
  },
  webinars: {
    title:'Webinars', headline:'Learn from wherever you are.', copy:'Prescribly Webinars bring healthcare professionals, innovators, researchers and communities together for accessible online learning and conversation.', format:'Educational webinar',
    disclaimer:'Educational topics only. Sessions do not provide medical diagnosis or personalised advice.',
    topics: make([
      ['AI in Healthcare: What Changes for Patients and Doctors?','Explore practical applications of AI in healthcare, its opportunities, limitations, ethics and the role of human expertise.'],
      ['Digital Health in Nigeria: From Apps to Connected Health Systems','Explore how digital platforms, telemedicine, data and interoperability can contribute to a more connected healthcare system.'],
      ['Telemedicine: Can Technology Really Close the Healthcare Access Gap?','Discuss the opportunities and limitations of remote healthcare, especially for underserved communities.'],
      ['Your Health Data: Who Owns It and Who Should Protect It?','Discuss privacy, security, consent, electronic health records and responsible health-data management.'],
      ["Preventive Healthcare: Why Waiting Until You're Sick Costs More",'Discuss prevention, screening, early detection, healthy behaviours and proactive health management.'],
      ['Living With Hypertension & Diabetes: Building Better Everyday Health Habits','An educational session focused on awareness, monitoring, adherence and when to seek professional care.'],
      ['Mental Health in the Digital Age','Explore mental wellbeing, digital environments, stigma, support systems and responsible online health information.'],
      ['Building Trust in Digital Healthcare','Discuss patient trust, clinical credibility, privacy, usability and human-centred healthcare technology.'],
      ['From Health Idea to Healthtech Startup','A practical conversation for founders and innovators about identifying healthcare problems, validating solutions and building responsibly.'],
      ['The Future of Healthcare Work: Skills Every Young Health Professional Needs','Explore digital skills, data, AI, communication, entrepreneurship and lifelong learning.'],
    ]),
  },
  'online-conversations': {
    title:'Online Conversations', headline:'Some of the biggest healthcare questions deserve a conversation.', copy:'Our online conversations bring together different perspectives around the issues shaping healthcare in Africa.', format:'Open discussion',
    topics: make([
      ['Can AI Make Healthcare More Human?','A conversation about whether technology can improve—not replace—the human side of healthcare.'],['What Will Healthcare in Nigeria Look Like in 2035?','A forward-looking conversation about technology, infrastructure, workforce, access and changing patient expectations.'],['Should Every Nigerian Have a Digital Health Record?','Explore the potential benefits, challenges, privacy concerns and interoperability requirements.'],['Doctors + AI: Competition or Collaboration?','Explore how AI may change clinical workflows and what should remain firmly human-led.'],['Why Do Patients Delay Seeking Healthcare?','Discuss affordability, trust, awareness, distance, culture, misinformation and other barriers.'],["Can Healthcare Startups Solve Problems Hospitals Can't?",'Bring founders and healthcare professionals together to discuss where startups can add value and where partnerships are essential.'],['What Does Patient-Centred Healthcare Really Mean?','Explore what patients actually need from healthcare systems and technology.'],['Healthcare in Rural Communities: What Can Technology Change?','Discuss connectivity, telemedicine, community health workers, infrastructure and practical digital solutions.'],['Can Social Media Become a Force for Better Health?','Discuss health education, misinformation, trusted voices and responsible health communication.'],['Who Should Build the Future of African Healthcare?','Bring together clinicians, founders, policymakers, researchers, investors, young people and communities.'],
    ]),
  },
  'womens-health': {
    title:"Women’s Health", headline:"Better conversations for women's health.", copy:"Our women's health events create informed, respectful spaces for women, healthcare professionals, researchers, advocates and communities to discuss the health issues affecting women throughout life.", format:'Educational event', disclaimer:"All women's-health content is educational and subject to appropriate review before publication. It is not personalised medical advice.",
    topics: make([
      ["Women's Health Across Every Stage of Life",'From adolescence to adulthood, pregnancy, motherhood, menopause and beyond.'],['Menstrual Health Without Shame','Education, dignity, access and breaking harmful misconceptions around menstruation.'],['Fertility: What Every Young Woman Should Know','A medically responsible educational conversation about fertility awareness and when professional advice may be appropriate.'],['Maternal Health: What Can We Do Better?','Discuss access, antenatal care, skilled birth attendance, referral systems and community support.'],["Women's Mental Health",'Explore stress, anxiety, postpartum mental health, stigma, support systems and when to seek professional help.'],['PCOS, Endometriosis & Conditions Women Often Live With Silently','An educational conversation about awareness, symptoms, diagnosis pathways and the importance of professional evaluation.'],['Breast & Cervical Health: Prevention, Screening and Awareness','Discuss awareness, screening and the importance of early professional evaluation.'],["Women's Health in the Digital Age",'Explore digital health tools, telemedicine, health tracking, privacy and access.'],['Nutrition, Movement & Healthy Ageing for Women','Discuss sustainable approaches to nutrition, physical activity and wellbeing across adulthood.'],["The Future of Women's Healthcare in Africa",'Explore innovation, technology, policy, access, research and women-centred healthcare systems.'],
    ]),
  },
  'youth-digital-health': {
    title:'Youth & Digital Health', headline:'The next generation of healthcare', copy:"Young people aren't only future healthcare professionals and patients. They are future founders, researchers, doctors, engineers, policymakers, community leaders and health innovators. Prescribly Youth & Digital Health Programs create opportunities for young people to learn, build, connect and participate.", format:'Programs & events',
    topics: make([
      ['Digital Health Career Day','Introduce students to careers across medicine, healthtech, AI, software, data, public health and health informatics.'],['Build for Health Hackathon','A practical challenge where young innovators develop technology ideas around real healthcare problems.'],['AI for Future Health Professionals','An introduction to responsible AI use for medical, health science and technology students.'],['Healthtech Startup Bootcamp','Teach young founders how to identify healthcare problems, validate ideas and build responsibly.'],['Young Health Leaders Forum','Bring together emerging healthcare leaders to discuss leadership, innovation and community impact.'],['Digital Health Skills Lab','Hands-on learning around health data, digital tools, product design, AI and healthcare technology.'],['Youth Mental Health & Digital Life','Discuss mental wellbeing, social media, online pressure, digital habits and support systems.'],['Healthcare Without Borders: Careers Beyond the Hospital','Explore careers in public health, research, healthtech, consulting, digital health, product development and entrepreneurship.'],['Prescribly Health Champions','Recognise young people contributing to health, technology, education and community impact.'],['Young Voices in Healthcare','A youth-led conversation where young people identify healthcare challenges and propose solutions.'],
    ]),
  },
};
export const CAMPAIGNS = [
  { slug:'padandfresh', title:'PadAndFresh', headline:'Dignity should never be a barrier to education.', description:'Menstrual health, hygiene education and confidence for Nigerian young people.', focus:['Sanitary products','Menstrual health education','Hygiene education','Body literacy','School participation','Confidence'] },
  { slug:'womens-health', title:"Women’s Health", headline:'Better conversations. Better information. Better access.', description:"Making space for informed, respectful conversations and access across women's health.", focus:['Menstrual health','Fertility','Pregnancy','Maternal health','Preventive health','Reproductive health',"Women's wellness",'Digital health'] },
  { slug:'community-health', title:'Community Health', headline:'Healthcare should come closer to people.', description:'Bringing education, screening and connection closer to communities.', focus:['Health education','Basic screenings','Wellness awareness','Telemedicine access','Community conversations','Referral information'] },
  { slug:'youth-digital-health', title:'Youth & Digital Health', headline:'The Next Generation of Healthcare', description:'We want young people to see healthcare not only as a profession, but as a space for innovation, technology and impact.', focus:['Digital health','AI','Technology','Entrepreneurship','Health education','Careers','Innovation','Health Champions'] },
] as const;
export const EVENT_CATEGORIES = ['Flagship Events','Summits','Conferences','Health & Wellness','Digital Health',"Women's Health",'Youth','Community','Webinars','Online Conversations','Roundtables','Talks','Workshops'] as const;
export const PROFESSIONS = ['Doctor','Nurse','Pharmacist','Medical Student','Healthcare Professional','Student','Founder','Technology Professional','Government/Public Sector','NGO/Development Organization','Business Professional','Media','Community Member','Other'] as const;
export const INTERESTS = ['Digital Health','AI & Healthcare',"Women's Health",'Community Health','Youth & Digital Health','Healthtech','Networking','Sponsorship','Partnership','Volunteering'] as const;
export function pageHead(path: string, title: string, description: string, noindex = false) {
  const full = `${title} — ${SITE}`;
  const url = `${BASE}${path}`;
  return {
    meta: [{ title: full }, { name:'description', content:description }, { property:'og:title', content:full }, { property:'og:description', content:description }, { property:'og:type', content:'website' }, { property:'og:url', content:url }, { name:'twitter:card', content:'summary_large_image' }, ...(noindex ? [{ name:'robots', content:'noindex' }] : [])],
    links: noindex ? [] : [{ rel:'canonical', href:url }],
  };
}
