const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Top CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-medium mb-3">
          Modern finance teams save time & money with Pluto.
        </h2>
        <p className="text-emerald-400 text-2xl md:text-3xl mb-8">
          Get started today
        </p>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Company Info */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <svg
              className="h-8 w-auto"
              viewBox="0 0 120 40"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 20L10 25L0 20L10 15L20 20Z" />
              <path
                d="M20 15L10 20L0 15"
                strokeWidth="1"
                stroke="white"
                fill="none"
              />
              <text x="30" y="25" fontSize="18" fontWeight="500">
                pluto
              </text>
            </svg>
          </div>
          <address className="not-italic text-gray-400 mb-6">
            <p className="mb-1">Pluto Technologies LTD,</p>
            <p className="mb-1">Innovation One Building, DIFC,</p>
            <p className="mb-4">Dubai, UAE</p>

            <p className="mb-1">Pluto Financial Services INC.</p>
            <p className="mb-1">2261 Market Street STE 4675</p>
            <p>San Francisco, CA 94114 USA</p>
          </address>
        </div>

        {/* Features Navigation */}
        <div>
          <h3 className="font-medium text-lg mb-4">Features</h3>
          <div className="not-italic text-gray-400 mb-6">
            <p>Corporate Cards</p>
            <p>Invoice Management</p>
            <p>Employee Reimbursements</p>
          </div>
        </div>

        {/* Solutions Navigation */}
        <div>
          <h3 className="font-medium text-lg mb-4">Solutions</h3>
          <div className="not-italic text-gray-400 mb-6">
            <p>Retail & E-commerce chains</p>
            <p>Agencies</p>
            <p>Truck & Fleets</p>
          </div>
        </div>

        {/* Resources Navigation */}
        <div>
          <h3 className="font-medium text-lg mb-4">Resources</h3>
          <div className="not-italic text-gray-400 mb-6">
            <p>Blog</p>
            <p>Customer Case Studies</p>
            <p>Events</p>
          </div>
        </div>

        {/* Company Navigation */}
        <div>
          <h3 className="font-medium text-lg mb-4">Company</h3>
          <div className="not-italic text-gray-400 mb-6">
            <p>About us</p>
            <p>Careers</p>
            <p>Contact us</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
