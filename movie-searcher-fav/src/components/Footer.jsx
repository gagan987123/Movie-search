const Footer = () => {
  return (
    <footer className="py-10 bg-black text-white border-t border-gray-800">
      <div className="flex flex-row justify-center max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-gray-400">
            <a href="#" className="hover:underline">
              FAQ
            </a>
            <a href="#" className="hover:underline">
              Help Center
            </a>
            <a href="#" className="hover:underline">
              Account
            </a>
            <a href="#" className="hover:underline">
              Media Center
            </a>
            <a href="#" className="hover:underline">
              Investor Relations
            </a>
            <a href="#" className="hover:underline">
              Jobs
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
