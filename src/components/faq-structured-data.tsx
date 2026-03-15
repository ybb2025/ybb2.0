export const FAQStructuredData = () => {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How much does a custom website cost in India?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A custom school or business website in India typically costs between ₹15,000 and ₹80,000 depending on features like ERP integration, admission systems, and high-performance infrastructure."
                }
            },
            {
                "@type": "Question",
                "name": "What technologies do you use for website development?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We use a modern, scalable stack including Next.js, Firebase, Stripe for payments, and AWS or Vercel for highly reliable hosting. Our builds are engineered from scratch with no templates."
                }
            },
            {
                "@type": "Question",
                "name": "Do you provide hospital and school website development?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we specialize in school ERP systems, digital admission platforms, and hospital information websites engineered for high reliability and security."
                }
            },
            {
                "@type": "Question",
                "name": "How long does it take to build a digital platform?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most projects are deployed within 4 to 8 weeks, ensuring a performance-first approach and meticulous attention to user experience."
                }
            },
            {
                "@type": "Question",
                "name": "Do you build mobile applications for iOS and Android?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we engineer native-level mobile applications using Flutter. We build secure, scalable, and high-performance apps for both iOS and Android platforms."
                }
            },
            {
                "@type": "Question",
                "name": "Where is YourBrandBuilders based and do you work with international clients?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We are based in Khammam, Telangana, but we serve clients globally through remote collaboration."
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
    );
};
