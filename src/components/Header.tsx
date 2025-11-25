import React from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '../lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Language } from '../types';

interface HeaderProps {
  currentLang?: Language;
  currentPath?: string;
}

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

export function Header({ currentLang = 'en', currentPath = '/' }: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'bg-background/80 backdrop-blur-md border-border' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Jixo AI" className="h-8 w-8 rounded-full" />
          <span className="font-bold text-xl tracking-tight">Jixo AI</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </a>
          ))}
          <Button variant="default" size="sm" asChild>
            <a href="https://github.com/jixoai" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          <LanguageSwitcher currentLang={currentLang} currentPath={currentPath} />
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher currentLang={currentLang} currentPath={currentPath} />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                <Button className="w-full" asChild>
                  <a href="https://github.com/jixoai" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
