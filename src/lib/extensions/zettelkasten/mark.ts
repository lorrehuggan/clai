import { Mark, markInputRule, markPasteRule } from '@tiptap/core';

const inputRegex = /(\[\[([^\]]+)\]\])/g;

const ZettelkastenExtension = Mark.create({
  name: 'zettelkasten',

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', { ...HTMLAttributes, 'data-type': 'zettelkasten-link' }, 0];
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="zettelkasten-link"]',
        mark: this.name,
      },
    ];
  },
});

export default ZettelkastenExtension;
