function FAQ() {

  const faqs = [
    {
      question: "Who can join this workshop?",
      answer: "Children aged between 8 and 14 years can join."
    },
    {
      question: "Is prior coding experience required?",
      answer: "No. Beginners are welcome."
    },
    {
      question: "Will participants receive certificates?",
      answer: "Yes. Every participant will receive a certificate after completion."
    }
  ];

  return (
    <section className="max-w-6xl mx-auto py-16 px-5">

      <h2 className="text-3xl font-bold mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-5">

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="shadow-lg rounded-xl p-6"
          >

            <h3 className="text-xl font-semibold">
              {faq.question}
            </h3>

            <p className="mt-3 text-gray-600">
              {faq.answer}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default FAQ;