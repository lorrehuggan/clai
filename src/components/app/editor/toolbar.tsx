import * as Toolbar from '@radix-ui/react-toolbar';
import UseEditor from '~/components/hooks/useEditor';

import { Bold, Italic, Underline } from 'lucide-react';
import style from './toolbar.module.css';

export default function Tools() {
  const { editor } = UseEditor();
  return (
    <div className={style.tools}>
      <Toolbar.Root className={style.tools__root}>
        {/* <Toolbar.Link /> */}
        <Toolbar.ToggleGroup className={style.tools__group} type="multiple">
          <Toolbar.ToggleItem
            className={style.tools__item}
            value="bold"
            aria-label="bold"
          >
            <Bold size={18} strokeWidth={2.5} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className={style.tools__item}
            value="italic"
            aria-label="italic"
          >
            <Italic size={18} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className={style.tools__item}
            value="underline"
            aria-label="underline"
          >
            <Underline size={18} />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator />
        <Toolbar.Button />
      </Toolbar.Root>
    </div>
  );
}
