export const StructuredData = () => {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "YourBrandBuilders",
        "url": "https://yourbrandbuilders.com",
        "logo": "https://yourbrandbuilders.com/logo.png",
        "sameAs": [
            "https://instagram.com/yourbrandbuilders",
            "https://linkedin.com/company/yourbrandbuilders",
            "https://github.com/ybb2025"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Khammam",
            "addressRegion": "Telangana",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-XXXXXXXXXX",
            "contactType": "customer service",
            "areaServed": "Global",
            "availableLanguage": ["en", "hi", "te"]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
    );
};
