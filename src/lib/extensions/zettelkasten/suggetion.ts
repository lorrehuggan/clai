import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Editor, Extension } from '@tiptap/core';
import { Mention } from '@tiptap/extension-mention';
import { EditorContent, useEditor } from '@tiptap/react';
import { Suggestion as TipTapSuggestion } from '@tiptap/suggestion';
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state';
import { useState } from 'react';

const zettelkastenPluginKey = new PluginKey('zettelkastenSuggestion');

const ZettelkastenSuggestion = Mention.extend({
  name: 'zettelkasten',

  addOptions() {
    return {
      ...super.addOptions(),
      suggestion: {
        items: (query: string) => {
          // Replace with your logic to filter and return suggestions
          return ['Suggestion1', 'Suggestion2'].filter((item) =>
            item.toLowerCase().startsWith(query.toLowerCase())
          );
        },
        render: ({
          node,
          command,
          range,
          editor,
        }: {
          node: any;
          command: any;
          range: any;
          editor: any;
        }) => {
          onkeydown: (event: any) => { };
          onkeyup: (event: any) => { };
        },
      },
    };
  },
});

export default ZettelkastenSuggestion;
