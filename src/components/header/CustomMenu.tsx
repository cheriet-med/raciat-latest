// components/CustomMenu.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  label: string;
  href: string;
  icon?: string;
  submenu?: MenuItem[];
}

interface CustomMenuProps {
  items: MenuItem[];
}

export default function CustomMenu({ items }: CustomMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-prim hover:bg-opacity-90 transition-all duration-300 group"
        aria-label="Menu"
      >
        <span className={`w-6 h-0.5 bg-sec transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
        <span className={`w-6 h-0.5 bg-sec my-1.5 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`w-6 h-0.5 bg-sec transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
      </button>

      {/* Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 rounded-xl shadow-2xl border border-sec border-opacity-20 bg-prim backdrop-blur-lg z-50"
          >
            <div className="p-4">
              {/* Menu Header */}
              <div className="pb-3 mb-3 border-b border-sec border-opacity-20">
                <h3 className="text-sec font-playfair text-lg font-semibold">Navigation</h3>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                {items.map((item, index) => (
                  <div key={item.label} className="relative">
                    {item.submenu ? (
                      // Item with submenu
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className="w-full flex items-center justify-between p-3 rounded-lg text-sec hover:bg-sec hover:bg-opacity-10 transition-all duration-200 group"
                        >
                          <span className="font-montserrat font-medium group-hover:translate-x-1 transition-transform duration-200">
                            {item.label}
                          </span>
                          <motion.span
                            animate={{ rotate: activeSubmenu === item.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-sec"
                          >
                            ▼
                          </motion.span>
                        </button>

                        {/* Submenu */}
                        <AnimatePresence>
                          {activeSubmenu === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-1 space-y-1 overflow-hidden"
                            >
                              {item.submenu.map((subItem) => (
                                <a
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="block p-2 rounded-lg text-sec text-opacity-80 hover:text-opacity-100 hover:bg-sec hover:bg-opacity-10 transition-all duration-200 font-montserrat text-sm"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setActiveSubmenu(null);
                                  }}
                                >
                                  {subItem.label}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      // Regular menu item
                      <a
                        href={item.href}
                        className="block p-3 rounded-lg text-sec hover:bg-sec hover:bg-opacity-10 transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-montserrat font-medium group-hover:translate-x-1 transition-transform duration-200">
                          {item.label}
                        </span>
                      </a>
                    )}
                  </div>
                ))}
              </nav>

              {/* Menu Footer */}
              <div className="pt-3 mt-3 border-t border-sec border-opacity-20">
                <div className="flex items-center space-x-2 text-sec text-opacity-70">
                  <span className="text-xs font-montserrat">Custom Navigation</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}