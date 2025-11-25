import React from 'react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet';
import { Globe } from 'lucide-react';
import { languages, languageNames, defaultLanguage, type Language } from '../types';

interface LanguageSwitcherProps {
  currentLang?: Language;
  currentPath?: string;
}

function getLocalizedPath(path: string, lang: Language): string {
  // Strip existing language prefix
  const pathWithoutLang = path.replace(/^\/(en|zh-CN|zh-TW|ru|fr|es|de|ja|ko)(?=\/|$)/, '');
  const cleanPath = pathWithoutLang || '/';

  if (lang === defaultLanguage) {
    return cleanPath;
  }
  return `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
}

export function LanguageSwitcher({ currentLang = 'en', currentPath = '/' }: LanguageSwitcherProps) {
  const [open, setOpen] = React.useState(false);

  const handleLanguageChange = (lang: Language) => {
    const newPath = getLocalizedPath(currentPath, lang);
    window.location.href = newPath;
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languageNames[currentLang]}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Select Language</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`
                w-full text-left px-4 py-3 rounded-md transition-colors
                ${currentLang === lang
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent text-foreground'
                }
              `}
            >
              <span className="font-medium">{languageNames[lang]}</span>
              <span className="block text-sm opacity-70">{lang}</span>
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
