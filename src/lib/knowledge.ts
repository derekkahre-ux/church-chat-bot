export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  category: string;
}

export const CHURCH_INFO = {
  name: 'Grace Community Church',
  tagline: 'A place to belong, believe, and become.',
  address: '1428 Maple Avenue, Cedar Falls, IA 50613',
  phone: '(319) 555-0142',
  email: 'hello@gracecommunity.org',
  pastor: 'Pastor David Thompson',
  youthPastor: 'Pastor Sarah Mitchell',
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: 'service-times',
    category: 'Services',
    keywords: ['time', 'times', 'service', 'services', 'when', 'schedule', 'mass', 'worship', 'hour', 'hours', 'sunday', 'saturday'],
    question: 'What are the service times?',
    answer:
      "Our Sunday worship services are at 9:00 AM (traditional) and 11:00 AM (contemporary). We also have a Wednesday evening prayer service at 7:00 PM. Everyone is welcome at any of our services!",
  },
  {
    id: 'location',
    category: 'Visit',
    keywords: ['where', 'location', 'address', 'directions', 'find', 'located', 'map', 'get there', 'drive', 'parking'],
    question: 'Where is the church located?',
    answer:
      "We're located at 1428 Maple Avenue, Cedar Falls, IA 50613. There's visitor parking right out front — look for the reserved spots near the main entrance. If you need directions, just give our office a call at (319) 555-0142.",
  },
  {
    id: 'what-to-wear',
    category: 'Visit',
    keywords: ['wear', 'dress', 'clothes', 'attire', 'casual', 'formal', 'outfit'],
    question: 'What should I wear to a service?',
    answer:
      "Come as you are! You'll see everything from jeans to suits on a Sunday morning. We care about your heart, not your wardrobe. Wear whatever makes you comfortable.",
  },
  {
    id: 'kids-children',
    category: 'Family',
    keywords: ['kid', 'kids', 'child', 'children', 'nursery', 'sunday school', 'childcare', 'baby', 'babies', 'toddler', 'family', 'little ones'],
    question: 'Do you have programs for children?',
    answer:
      "Absolutely! We have a safe, loving environment for kids of all ages. Nursery care is available for infants and toddlers during both Sunday services. Sunday School for ages 3–12 runs during the 11:00 AM service, and our youth group (grades 6–12) meets Sunday evenings at 6:00 PM. All our volunteers are background-checked.",
  },
  {
    id: 'youth-group',
    category: 'Family',
    keywords: ['youth', 'teen', 'teens', 'teenager', 'teenagers', 'youth group', 'middle school', 'high school', 'student', 'students'],
    question: 'Is there a youth group?',
    answer:
      "Yes! Our youth group, led by Pastor Sarah Mitchell, meets every Sunday evening from 6:00–8:00 PM. It's open to students in grades 6–12 and includes games, worship, a message, and small group time. It's a great place for teens to build friendships and grow in faith.",
  },
  {
    id: 'new-here',
    category: 'Visit',
    keywords: ['new', 'new here', 'first time', 'first visit', 'visitor', 'visiting', 'guest', 'never been', 'plan a visit', 'come', 'coming'],
    question: "I'm new here. What should I expect?",
    answer:
      "We're so glad you're considering visiting! When you arrive, you'll be greeted at the door by our welcome team. The service lasts about 75 minutes and includes music, prayer, and a message from Pastor David. Stop by our Welcome Center in the lobby afterward for a free gift and a cup of coffee — we'd love to meet you!",
  },
  {
    id: 'become-member',
    category: 'Membership',
    keywords: ['member', 'membership', 'join', 'joining', 'become a member', 'sign up', 'enroll'],
    question: 'How do I become a member?',
    answer:
      "We'd love to have you as part of our church family! Membership starts with our 'Discover Grace' class, held the first Sunday of each month at 9:45 AM. You'll learn about our mission, beliefs, and how to get involved. After the class, you can meet with Pastor David to officially join. No pressure — just come and learn!",
  },
  {
    id: 'beliefs',
    category: 'About',
    keywords: ['believe', 'beliefs', 'faith', 'doctrine', 'theology', 'statement of faith', 'what do you believe', 'values', 'mission'],
    question: 'What does the church believe?',
    answer:
      "We believe in one God — Father, Son, and Holy Spirit. We trust the Bible as God's inspired Word, and we believe that Jesus Christ is our Lord and Savior, that He died and rose again, and that salvation comes through faith in Him. Our mission is to love God, love people, and make disciples. You can read our full statement of faith on our website or request a copy at the Welcome Center.",
  },
  {
    id: 'baptism',
    category: 'Sacraments',
    keywords: ['baptism', 'baptize', 'baptized', 'baptising', 'christening', 'dedication'],
    question: 'How can I get baptized?',
    answer:
      "Baptism is a beautiful step of faith! We hold baptism services several times a year. If you're interested, sign up at the Welcome Center or call the office. Pastor David will meet with you to talk about what baptism means and help you prepare. Anyone who has put their faith in Jesus is welcome to be baptized.",
  },
  {
    id: 'communion',
    category: 'Sacraments',
    keywords: ['communion', 'eucharist', 'lords supper', "lord's supper", 'bread', 'wine', 'sacrament'],
    question: 'How often do you have communion?',
    answer:
      "We celebrate communion on the first Sunday of every month during both morning services. All who trust in Jesus Christ are welcome to participate. We use bread and grape juice, and our communion is open to all believers.",
  },
  {
    id: 'prayer-request',
    category: 'Pastoral Care',
    keywords: ['prayer', 'pray', 'prayer request', 'pray for', 'need prayer', 'intercession', 'praying'],
    question: 'How do I submit a prayer request?',
    answer:
      "We'd be honored to pray for you. You can submit a prayer request through our website, by calling the church office at (319) 555-0142, or by filling out a prayer card at the Welcome Center. Our prayer team meets every Wednesday at 6:30 PM and lifts up every request. If it's urgent, please let us know.",
  },
  {
    id: 'counseling',
    category: 'Pastoral Care',
    keywords: ['counseling', 'counsel', 'counselor', 'therapy', 'pastoral care', 'help', 'struggling', 'crisis', 'support', 'grief', 'marriage'],
    question: 'Does the church offer counseling?',
    answer:
      "Yes. Pastor David offers pastoral counseling for individuals and couples by appointment. For more specialized needs, we can refer you to trusted Christian counselors in the Cedar Falls area. Please call the office at (319) 555-0142 to schedule a confidential appointment.",
  },
  {
    id: 'wedding',
    category: 'Life Events',
    keywords: ['wedding', 'marry', 'marriage', 'get married', 'ceremony', 'venue', 'venue rental', 'reception'],
    question: 'Can I get married at the church?',
    answer:
      "Congratulations! Our sanctuary is available for weddings for both members and non-members. We require pre-marital counseling with Pastor David, which is a wonderful way to prepare for your life together. To check availability and learn about fees, please contact the church office at (319) 555-0142.",
  },
  {
    id: 'funeral',
    category: 'Life Events',
    keywords: ['funeral', 'memorial', 'burial', 'grief', 'loss', 'passed away', 'died', 'death', 'celebration of life'],
    question: 'Can the church host a funeral or memorial service?',
    answer:
      "We're so sorry for your loss. Our sanctuary and fellowship hall are available for funeral and memorial services. Pastor David is available to officiate and to offer grief support. Please call the office at (319) 555-0142 and we'll help you make arrangements during this difficult time.",
  },
  {
    id: 'small-groups',
    category: 'Community',
    keywords: ['small group', 'small groups', 'bible study', 'bible studies', 'home group', 'home groups', 'life group', 'life groups', 'community group', 'fellowship', 'study', 'group', 'groups'],
    question: 'Are there small groups or Bible studies?',
    answer:
      "Yes! We have small groups that meet in homes throughout the week — there's one for everyone, from young adults to seniors. Groups study the Bible, pray together, and build lasting friendships. You can see the current list of groups and meeting times on our website or at the Welcome Center. We'd love to help you find the right fit.",
  },
  {
    id: 'volunteer',
    category: 'Get Involved',
    keywords: ['volunteer', 'volunteering', 'serve', 'serving', 'help out', 'get involved', 'ministry', 'ministries', 'outreach', 'serve the church'],
    question: 'How can I volunteer or get involved?',
    answer:
      "There are so many ways to serve! We have teams for worship, hospitality, children's ministry, tech/media, outreach, and more. Stop by the Welcome Center to fill out a serving interest form, or talk to Pastor David. We'll help you find a role that fits your gifts and passions.",
  },
  {
    id: 'giving-donate',
    category: 'Give',
    keywords: ['give', 'giving', 'donate', 'donation', 'donate', 'tithe', 'tithing', 'offering', 'offerings', 'contribute', 'financial', 'stewardship', 'online giving'],
    question: 'How can I give or donate?',
    answer:
      "Thank you for your generosity! You can give online through our website, by text, or during the offering at any Sunday service. You can also mail a check to the church office. Your gifts support our ministries, outreach, and operations. If you'd like to give to a specific fund (missions, building, benevolence), just let us know.",
  },
  {
    id: 'food-pantry',
    category: 'Outreach',
    keywords: ['food pantry', 'food', 'pantry', 'food bank', 'meals', 'meal', 'hungry', 'hunger', 'benevolence', 'assistance', 'help with food', 'groceries'],
    question: 'Do you have a food pantry or assistance program?',
    answer:
      "Yes! Our food pantry is open every Tuesday and Thursday from 10:00 AM to 1:00 PM. Anyone in need is welcome — no questions asked. We also have a benevolence fund to help with utilities and other urgent needs. If you or someone you know needs help, please call the office at (319) 555-0142.",
  },
  {
    id: 'community-events',
    category: 'Community',
    keywords: ['event', 'events', 'community', 'activity', 'activities', 'fellowship', 'potluck', 'picnic', 'concert', 'vacation bible school', 'vbs', 'easter', 'christmas', 'holiday'],
    question: 'What community events do you host?',
    answer:
      "We love bringing people together! Throughout the year we host a community Easter egg hunt, Vacation Bible School in June, a summer picnic, a fall festival, and a Christmas Eve candlelight service. Check our website or newsletter for the latest events — all are welcome, and many are free!",
  },
  {
    id: 'contact',
    category: 'Contact',
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'office', 'office hours', 'reach someone', 'talk to', 'speak to'],
    question: 'How can I contact the church?',
    answer:
      "You can reach us by phone at (319) 555-0142 or by email at hello@gracecommunity.org. Our office is open Monday–Friday, 9:00 AM to 4:00 PM. You can also stop by in person at 1428 Maple Avenue, Cedar Falls, IA. We'd love to hear from you!",
  },
  {
    id: 'office-hours',
    category: 'Contact',
    keywords: ['office hours', 'open', 'closed', 'when is the office', 'hours', 'available'],
    question: 'What are the office hours?',
    answer:
      "Our church office is open Monday through Friday, 9:00 AM to 4:00 PM. We're closed on major holidays. Feel free to call (319) 555-0142 or stop by during those hours.",
  },
  {
    id: 'pastor',
    category: 'About',
    keywords: ['pastor', 'preacher', 'minister', 'reverend', 'father', 'priest', 'leader', 'lead pastor', 'david', 'thompson', 'who is the pastor'],
    question: 'Who is the pastor?',
    answer:
      "Our lead pastor is Pastor David Thompson. He's been with us for over 12 years and has a heart for teaching and pastoral care. He'd love to meet you — stop by the Welcome Center after a service or call the office to set up a time to chat.",
  },
  {
    id: 'denomination',
    category: 'About',
    keywords: ['denomination', 'denominational', 'what kind of church', 'type of church', 'catholic', 'protestant', 'baptist', 'methodist', 'non-denominational', 'evangelical'],
    question: 'What denomination is the church?',
    answer:
      "Grace Community is a non-denominational Christian church. We welcome people from all backgrounds and traditions. Our focus is on Jesus Christ and the Bible, and we strive to be a place where anyone can explore faith at their own pace.",
  },
  {
    id: 'accessible',
    category: 'Visit',
    keywords: ['accessible', 'accessibility', 'wheelchair', 'disability', 'disabled', 'handicap', 'handicapped', 'ramp', 'elevator', 'ada', 'mobility', 'hearing', 'sign language'],
    question: 'Is the church accessible?',
    answer:
      "Yes! Our building is fully accessible. We have reserved accessible parking, ramps to all entrances, an elevator to the second floor, and accessible restrooms. We also offer large-print bulletins and assistive listening devices — just ask a greeter. If you have specific needs, please call ahead and we'll make sure you're well cared for.",
  },
  {
    id: 'livestream',
    category: 'Services',
    keywords: ['livestream', 'live stream', 'online', 'watch online', 'stream', 'streaming', 'video', 'youtube', 'facebook live', 'remote', 'from home'],
    question: 'Can I watch services online?',
    answer:
      "Yes! We livestream both Sunday services at 9:00 AM and 11:00 AM on our website and YouTube channel. You can also watch past services anytime. It's a great option if you're traveling, homebound, or just checking us out from home.",
  },
  {
    id: 'salvation',
    category: 'Faith',
    keywords: ['salvation', 'saved', 'save', 'savior', 'jesus', 'christ', 'faith', 'accept jesus', 'give my life', 'born again', 'gospel', 'eternal life', 'heaven', 'sin', 'forgiveness', 'forgive'],
    question: 'How can I learn more about faith in Jesus?',
    answer:
      "We'd love to walk alongside you on this journey! Faith in Jesus is about trusting Him as your Lord and Savior — believing He died for your sins and rose again, and choosing to follow Him. Pastor David would be glad to talk with you, no pressure and no judgment. You can also join our 'Discover Grace' class or a small group. Call the office at (319) 555-0142 to start a conversation.",
  },
  {
    id: 'greeting',
    category: 'General',
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup', 'whats up', "what's up"],
    question: 'Hello!',
    answer:
      "Hello and welcome! I'm here to help answer any questions you might have about Grace Community Church. You can ask me about service times, our location, children's programs, prayer requests, or anything else. How can I help you today?",
  },
  {
    id: 'thanks',
    category: 'General',
    keywords: ['thank', 'thanks', 'thank you', 'appreciate', 'grateful', 'bless you'],
    question: 'Thank you!',
    answer:
      "You're so welcome! I'm glad I could help. If you have any other questions — now or later — I'm always here. May God bless you, and we hope to see you at Grace Community soon!",
  },
  {
    id: 'who-are-you',
    category: 'General',
    keywords: ['who are you', 'what are you', 'your name', 'are you a bot', 'are you real', 'are you ai', 'chatbot', 'robot', 'what can you do', 'help me', 'what do you do'],
    question: 'Who are you?',
    answer:
      "I'm the Grace Community Church assistant — a friendly chatbot here to answer your questions about our church, services, programs, and more. I can't replace a real conversation, but I can point you in the right direction. What would you like to know?",
  },
];

export const SUGGESTED_QUESTIONS = [
  'What time are your services?',
  'Where are you located?',
  'Is there a youth group?',
  'How do I become a member?',
  'How can I submit a prayer request?',
  'What should I wear?',
];
