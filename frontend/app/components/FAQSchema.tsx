export default function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When is the next Bitcoin halving?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "The next Bitcoin halving is expected around April 2028, depending on block production."
        }
      },
      {
        "@type": "Question",
        "name": "Does Bitcoin price increase immediately after halving?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Historically, price increases tend to occur months after the halving, not immediately."
        }
      },
      {
        "@type": "Question",
        "name": "Why does Bitcoin halving exist?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Halving reduces Bitcoin inflation and enforces its fixed 21 million supply."
        }
      },
      {
        "@type": "Question",
        "name": "Can Bitcoin halving be changed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "No, Bitcoin halving is enforced by protocol rules and cannot be changed easily."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
