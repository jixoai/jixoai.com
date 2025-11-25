import React from 'react';
import { Separator } from './ui/separator';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.jpg" alt="Jixo AI" className="h-8 w-8 rounded-full" />
              <span className="font-bold text-xl">Jixo AI</span>
            </a>
            <p className="text-muted-foreground max-w-sm">
              Building the future of AI with open source. Empowering developers to build smarter applications.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/jixoai" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
              <li><a href="https://twitter.com/jixoai" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
              <li><a href="https://discord.gg/jixoai" className="text-muted-foreground hover:text-foreground transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jixo AI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
