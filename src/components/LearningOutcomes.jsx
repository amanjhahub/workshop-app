function LearningOutcomes() {

  const outcomes = [
    "Basics of Artificial Intelligence",
    "Introduction to Robotics",
    "Building AI-powered projects",
    "Sensor and motor programming",
    "Problem-solving and logical thinking"
  ];

  return (
    <section className="bg-gray-100 py-16">

      <div className="max-w-6xl mx-auto px-5">

        <h2 className="text-3xl font-bold mb-8">
          What You'll Learn
        </h2>

        <div className="space-y-4">

          {outcomes.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-5"
            >
              ✓ {item}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default LearningOutcomes;