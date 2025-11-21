"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "@/data/menu";
import { FaAngleDown } from "react-icons/fa6";
const getCollapseId = (index: number) => `dropdown-menu-${index + 1}`;

export default function MobileMenu() {
    const pathname = usePathname();
    // open dropdowns by default for items marked `isCurrent` (e.g., "عقارات")
    const defaultOpen = new Set<number>();
    menuItems.forEach((it, i) => {
        if ((it as any).isCurrent) defaultOpen.add(i);
    });
    const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(defaultOpen);

    const toggleDropdown = (index: number) => {
        setOpenDropdowns(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <ul id="menu-mobile-menu" className="style-1" style={{ direction: 'rtl' }}>
            {menuItems.map((item, idx) => {
                const hasChildren = item.links && item.links.length > 0;
                const collapseId = getCollapseId(idx);
                const isParentActive =
                    item.href === pathname ||
                    (item.links && item.links.some((link) => link.href === pathname));
                const isOpen = openDropdowns.has(idx);

                if (hasChildren) {
                    return (
                        <li
                            key={item.title}
                            className={`menu-item menu-item-has-children-mobile${
                                isParentActive ? " active" : ""
                            }`}
                        >
                            <a
                                href="#"
                                className={` ${isOpen ? '' : 'collapsed'}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleDropdown(idx);
                                }}
                                aria-expanded={isOpen ? "true" : "false"}
                                aria-controls={collapseId}
                                style={{ 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding:"15px",
                                    color:"white"
                                }}
                            >
                                {item.title}
                                <span style={{ 
                                    transition: 'transform 0.3s ease',
                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    flexShrink: 0
                                }}>
                                  <FaAngleDown/>
                                </span>
                            </a>
                            <div
                                id={collapseId}
                                className={`collapse ${isOpen ? 'show' : ''}`}
                                style={{
                                    maxHeight: isOpen ? '500px' : '0',
                                    overflow: 'visible',
                                    transition: 'max-height 0.3s ease-in-out',
                                    padding: '10px 0',
                                }}
                            >
                                <ul className="sub-mobile" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                    {item.links.map((link) => {
                                        const isActive = link.href === pathname;
                                        return (
                                            <li
                                                key={link.label}
                                                className={`menu-item${isActive ? " active" : ""}`}
                                                style={{ color: "white", padding: '10px 15px', borderLeft: '3px solid #D9AA52' }}
                                            >
                                                {link.href ? (
                                                    <Link href={link.href} style={{ color: 'white', textDecoration: 'none' }}>{link.label}</Link>
                                                ) : (
                                                    <span>{link.label}</span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </li>
                    );
                }

                const isActive = item.href === pathname;
                return (
                    <li key={item.title} className={`menu-item${isActive ? " active" : ""}`}
                       style={{  color:"white"}}
                    >
                        {item.href ? (
                            <Link href={item.href} className="item-menu-mobile">
                                {item.title}
                            </Link>
                        ) : (
                            <span className="item-menu-mobile">{item.title}</span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}