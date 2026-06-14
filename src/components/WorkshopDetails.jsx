function WorkshopDetails() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-5">

      <h2 className="text-3xl font-bold mb-8">
        Workshop Details
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="shadow-lg p-6 rounded-xl">
          <h3 className="font-bold">Age Group</h3>
          <p>8–14 Years</p>
        </div>

        <div className="shadow-lg p-6 rounded-xl">
          <h3 className="font-bold">Duration</h3>
          <p>4 Weeks</p>
        </div>

        <div className="shadow-lg p-6 rounded-xl">
          <h3 className="font-bold">Mode</h3>
          <p>Online</p>
        </div>

        <div className="shadow-lg p-6 rounded-xl">
          <h3 className="font-bold">Fee</h3>
          <p>₹2,999</p>
        </div>

        <div className="shadow-lg p-6 rounded-xl">
          <h3 className="font-bold">Start Date</h3>
          <p>15 July 2026</p>
        </div>

      </div>

    </section>
  );
}

export default WorkshopDetails;