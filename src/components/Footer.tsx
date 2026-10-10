const Footer = () => {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 px-4 py-4 text-center text-xs leading-relaxed text-base-content/80 sm:px-6 md:grid-cols-2 md:items-center md:gap-6 md:py-5 md:text-left">
        <p className="min-w-0 break-words">
          বাজার দর - গ্রাহকদের জন্য মানসম্পন্ন পণ্য ও সুলভ দামে বাজারদর আপডেট।
        </p>
        <p className="min-w-0 break-words md:text-right">
          সর্বশেষ বাজারদর, সাশ্রয়ী মূল্য, ও নির্ভরযোগ্য পণ্যসেবা।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
