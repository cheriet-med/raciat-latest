import { menuItems } from "@/data/menu";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
    const pathname = usePathname();
    const getActiveGroup = (path: string) => {
        const groups = [
            ["login", "register"],
        ];
        return groups.find(group => group.includes(path)) || [path];
    };

    useEffect(() => {
        const preventDefault = () => {
            document.querySelectorAll(".link-no-action").forEach((element) => {
                element.addEventListener("click", (e) => {
                    e.preventDefault();
                });
            });
        };
        preventDefault();
    }, []);

    const currentGroup = getActiveGroup(pathname.split("/")[1]);

    return (
        <div>
            <style dangerouslySetInnerHTML={{__html: `
                .main-menu .has-child::after,
                .main-menu .has-child > a::after,
                .main-menu .has-child > .toggle::after {
                    color: white !important;
                    border-color: white !important;
                }
                .main-menu .has-child .toggle::before,
                .main-menu .has-child .toggle::after {
                    color: white !important;
                    border-color: white !important;
                }
            `}} />
            
            <nav className="main-menu"
            style={{
                    
                    color: 'white'
                }}>
                <ul className="navigation"
                 style={{
                    
                    color: 'white'
                }}>
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`text-menu ${
                                item.links && item.links.length > 0
                                    ? "has-child"
                                    : ""
                            } ${
                                item.links &&
                                item.links.some((el) => {
                                    if (!el.href) return false;
                                    const target = el.href.split("/")[1];
                                    return currentGroup.includes(target);
                                })
                                    ? "current-menu"
                                    : ""
                            }`}
                             style={{
                    
                    color: 'white'
                }}
                        >
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className=" toggle"
                                     style={{
                    
                    color: 'white'
                }}
                                >
                                    <span className="text" data-splitting>
                                        {item.title}
                                    </span>
                                    <span className="text" data-splitting>
                                        {item.title}
                                    </span>
                                </Link>
                            ) : (
                                <Link
                                    href="#"
                                    className="link-no-action toggle "
                                     style={{
                    
                    color: 'white'
                }}
                                >
                                    <span className="text" data-splitting>
                                        {item.title}
                                    </span>
                                    <span className="text" data-splitting>
                                        {item.title}
                                    </span>
                                    
                                </Link>
                            )}
                            {item.links.length > 0 && (
                                <ul className="submenu">
                                    {item.links.map((link, linkIndex) => (
                                        <li
                                            key={linkIndex}
                                            className={`${
                                                link.href &&
                                                currentGroup.includes(link.href.split("/")[1])
                                                    ? "current-item"
                                                    : ""
                                            }`}
                                        >
                                            {link.href ? (
                                                <Link href={link.href}>
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <span>{link.label}</span>
                                            )}
                                            {link.sub && link.sub.length > 0 && (
                                                <ul className="submenu">
                                                    {link.sub.map((subLink, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link href={subLink.href}>
                                                                {subLink.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}