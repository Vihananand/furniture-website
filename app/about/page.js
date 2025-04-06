import Link from "next/link";

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm text-gray-600 mb-4">OUR STORY</h2>
          <h1 className="mb-6 flex flex-col md:flex-row md:items-baseline md:justify-center">
            <span className="font-cormorant text-5xl md:text-6xl font-semibold tracking-wide">AUGUSTA</span>
            <span className="font-cormorant text-5xl md:text-6xl font-semibold tracking-wide md:ml-3">LUXURY</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Since our inception, we&apos;ve been dedicated to creating furniture that
            combines artisanal craftsmanship with contemporary design.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#F5F2EF] py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#526D5F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-cormorant text-2xl font-semibold mb-4">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on materials or craftsmanship, ensuring each
                piece meets our exacting standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#526D5F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-cormorant text-2xl font-semibold mb-4">Sustainable Design</h3>
              <p className="text-gray-600">
                Our commitment to sustainability guides every decision, from material
                sourcing to production methods.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#526D5F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="font-cormorant text-2xl font-semibold mb-4">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority, with personalized service from
                design to delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#526D5F] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-6">
            JOIN OUR JOURNEY
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience the difference of handcrafted furniture made with passion and
            precision.
          </p>
          <Link
            href="/custom-order"
            className="inline-block bg-[#C4A484] text-white px-8 py-3 rounded-md hover:bg-[#A88B6B] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
} 