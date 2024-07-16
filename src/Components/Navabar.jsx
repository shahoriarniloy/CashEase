
const Navbar = ({ language, onLanguageToggle }) => {
  return (
    <nav className="flex justify-between items-center p-4 text-blue-600 roboto-thin">
      <div className="flex items-center">
        <img src="https://i.ibb.co/WWKnCGj/CashEase.png" alt="CashEase Logo" className="h-16" />
      </div>
      <div className="flex gap-4">
        <button
          className="py-2 px-4 rounded text-blue-600 border border-blue-600 rounded-md"
          onClick={onLanguageToggle}
        >
          {language === 'EN' ? 'বাংলা' : 'English'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
