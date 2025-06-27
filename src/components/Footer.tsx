import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* ContentPal Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">ContentPal</h3>
          <p className="text-sm leading-relaxed">
            Your AI-powered content creation assistant that helps you create engaging content efficiently.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
          <ul>
            <li className="mb-2"><Link href="/casestudy" className="hover:text-white transition-colors duration-200">A Case Study</Link></li>
            <li className="mb-2"><Link href="/subscribe" className="hover:text-white transition-colors duration-200">Pricing</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
          <ul>
            <li className="mb-2"><Link href="/blog" className="hover:text-white transition-colors duration-200">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
          <ul>
            <li className="mb-2"><Link href="/faq" className="hover:text-white transition-colors duration-200">FAQ</Link></li>
            <li className="mb-2"><Link href="/legal" className="hover:text-white transition-colors duration-200">Terms of Service</Link></li>
            <li className="mb-2"><Link href="/legal" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
            <li><Link href="/cookie" className="hover:text-white transition-colors duration-200">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 border-t border-gray-700 pt-8 text-center text-sm">
        <p>© 2025 ContentPal. All rights reserved.</p>
        {/* Optional: Add social media links here later */}
        {/* <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.79c0-2.508 1.493-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C17.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.001 2.001C6.476 2.001 2 6.477 2 12.001c0 4.99 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.79c0-2.508 1.493-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.001C17.343 21.129 22 16.991 22 12.001c0-5.524-4.476-10-9.999-10z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.866 8.163 6.842 9.5.5.092.678-.216.678-.495 0-.247-.01-1.017-.014-1.992-2.782.602-3.369-1.34-3.369-1.34-.455-1.156-1.11-1.463-1.11-1.463-.906-.62.068-.608.068-.608 1.004.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.942 0-1.096.39-1.988 1.029-2.682-.103-.253-.446-1.272.098-2.65 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.68a9.607 9.607 0 012.504-.344c1.91-.29 2.75 1.022 2.75 1.022.546 1.378.202 2.398.098 2.65.64.693 1.029 1.586 1.029 2.682 0 3.843-2.335 4.687-4.566 4.935.359.308.678.917.678 1.846 0 1.338-.012 2.41-.012 2.737 0 .271.179.59.683.492A10.005 10.005 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
          </a>
        </div> */}
      </div>
    </footer>
  );
}
