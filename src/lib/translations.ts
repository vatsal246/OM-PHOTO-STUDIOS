export type Language = "en" | "hi" | "mr";

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  nav: {
    home: string;
    services: string;
    passportVisa: string;
    bookNow: string;
    gallery: string;
    printOrder: string;
    about: string;
    contact: string;
    faq: string;
    admin: string;
  };
  actions: {
    bookAppointment: string;
    getDirections: string;
    whatsappUs: string;
    callNow: string;
    submit: string;
    learnMore: string;
    leaveReview: string;
  };
  trust: {
    fastService: string;
    proQuality: string;
    convenientLocation: string;
  };
  status: {
    openNow: string;
    closedNow: string;
    walkInsWelcome: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brandName: "Om Photo Studio",
    tagline: "Passport & Visa Photos in Malad West — Ready Fast",
    nav: {
      home: "Home",
      services: "Services",
      passportVisa: "Passport & Visa",
      bookNow: "Book Appointment",
      gallery: "Gallery",
      printOrder: "Print Order",
      about: "About Us",
      contact: "Contact",
      faq: "FAQs",
      admin: "Admin",
    },
    actions: {
      bookAppointment: "Book Appointment",
      getDirections: "Get Directions",
      whatsappUs: "WhatsApp Us",
      callNow: "Call Studio",
      submit: "Submit Request",
      learnMore: "Learn More",
      leaveReview: "Leave a Google Review",
    },
    trust: {
      fastService: "Fast 15-Minute Turnaround",
      proQuality: "Embassy & Official Standard Compliance",
      convenientLocation: "Somvari Bazar, Near Patla Devi Temple, Malad West",
    },
    status: {
      openNow: "Open Now",
      closedNow: "Closed Now",
      walkInsWelcome: "Walk-ins welcome, appointments recommended.",
    },
  },
  hi: {
    brandName: "ओम फोटो स्टूडियो",
    tagline: "मलाड वेस्ट में पासपोर्ट और वीजा फोटो — तुरंत तैयार",
    nav: {
      home: "होम",
      services: "सेवाएं",
      passportVisa: "पासपोर्ट व वीज़ा",
      bookNow: "अपॉइंटमेंट बुक करें",
      gallery: "गैलरी",
      printOrder: "प्रिंट ऑर्डर",
      about: "हमारे बारे में",
      contact: "संपर्क",
      faq: "अक्सर पूछे जाने वाले सवाल",
      admin: "व्यवस्थापक",
    },
    actions: {
      bookAppointment: "अपॉइंटमेंट बुक करें",
      getDirections: "रास्ता देखें (गूगल मैप्स)",
      whatsappUs: "व्हाट्सएप करें",
      callNow: "कॉल करें",
      submit: "जमा करें",
      learnMore: "अधिक जानकारी",
      leaveReview: "गूगल पर रिव्यू दें",
    },
    trust: {
      fastService: "15 मिनट में तेज सेवा",
      proQuality: "दूतावास व सरकारी नियमों के अनुरूप",
      convenientLocation: "सोमवारी बाजार, पाटला देवी मंदिर के पास, मलाड वेस्ट",
    },
    status: {
      openNow: "खुला है",
      closedNow: "बंद है",
      walkInsWelcome: "सीधे आ सकते हैं, अपॉइंटमेंट अनुशंसित है।",
    },
  },
  mr: {
    brandName: "ओम फोटो स्टुडिओ",
    tagline: "मालाड पश्चिमेत पासपोर्ट आणि व्हिसा फोटो — जलद तयार",
    nav: {
      home: "मुख्यपृष्ठ",
      services: "सेवा",
      passportVisa: "पासपोर्ट आणि व्हिसा",
      bookNow: "अपॉइंटमेंट बुक करा",
      gallery: "गॅलरी",
      printOrder: "प्रिंट ऑर्डर",
      about: "आमच्याबद्दल",
      contact: "संपर्क",
      faq: "नेहमी विचारले जाणारे प्रश्न",
      admin: "अ‍ॅडमिन",
    },
    actions: {
      bookAppointment: "अपॉइंटमेंट बुक करा",
      getDirections: "दिशा दाखवा (Google Maps)",
      whatsappUs: "व्हॉट्सअ‍ॅप करा",
      callNow: "कॉल करा",
      submit: "पाठवा",
      learnMore: "अधिक माहिती",
      leaveReview: "गुगलवर रिव्ह्यू द्या",
    },
    trust: {
      fastService: "15 मिनिटांत जलद सेवा",
      proQuality: "दूतावास नियमांनुसार खात्रीशीर गुणवत्ता",
      convenientLocation: "सोमवारी बाजार, पाटला देवी मंदिराजवळ, मालाड (प.)",
    },
    status: {
      openNow: "सध्या सुरू आहे",
      closedNow: "सध्या बंद आहे",
      walkInsWelcome: "थेट भेट देऊ शकता, अपॉइंटमेंट सोयीस्कर राहील.",
    },
  },
};

