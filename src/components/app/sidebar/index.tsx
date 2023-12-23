'use client';
import { ArrowLeftToLine, FolderOpen, Plus, Settings } from 'lucide-react';
import { useState } from 'react';

import Link from 'next/link';
import style from './style.module.css';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  function toggleSidebar() {
    setOpen(!open);
  }

  const menuItems = [
    {
      name: 'files',
      icon: <FolderOpen size={22} />,
      link: '/files',
    },
    {
      name: 'new',
      icon: <Plus size={22} />,
      link: '/new',
    },
    {
      name: 'settings',
      icon: <Settings size={22} />,
      link: '/settings',
    },
  ];

  return (
    <aside className={style.sidebar} style={{ width: open ? '200px' : '48px' }}>
      <div className={style.sidebar__heading}>
        <span className={style.sidebar__heading_logo}>Lapis</span>
        <span
          onClick={toggleSidebar}
          className={style.sidebar__heading_toggle}
          style={{
            transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        >
          <ArrowLeftToLine size={22} />
        </span>
      </div>
      <nav className={style.sidebar__list}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.link}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
