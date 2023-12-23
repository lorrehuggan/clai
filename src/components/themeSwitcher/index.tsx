'use client';
import * as Switch from '@radix-ui/react-switch';
import { useEffect, useState } from 'react';

import style from './style.module.css';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved theme in local storage or use system preference
    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
    if (theme === 'light') {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = (e: boolean) => {
    const newTheme = e ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <form className={style.switch}>
      <label>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</label>
      <Switch.Root
        defaultChecked={theme === 'light' ? true : false}
        checked={theme === 'light' ? true : false}
        onCheckedChange={toggleTheme}
        className={style.switch__root}
      >
        <Switch.Thumb className={style.switch__root_thumb} />
      </Switch.Root>
    </form>
  );
}
