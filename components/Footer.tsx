"use client";

const Footer = () => {
  return (
    <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border mt-12 group">
      <p className="transition-all duration-300 group-hover:scale-105">
        © {new Date().getFullYear()} Dev Excuse Hub
        <span className="inline-block group-hover:animate-bounce transition-transform duration-300">
          🧙‍♂️
        </span>
        . All excuses reserved.
        <span className="inline-block group-hover:animate-spin transition-transform duration-300">
          🤪
        </span>
      </p>
    </footer>
  );
};

export default Footer;
