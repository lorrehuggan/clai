import { InputRule, Mark, Node, PasteRule, markInputRule } from '@tiptap/core';

export const zettelkastenInputRegex = /(\[\[([^\]]+)\]\])/g;
export const zettelkastenPasteRegex = /(\[\[([^\]]+)\]\])/g;
export const dollakastenInputRegex = /(\$\$([^\]]+)\$\$)/g;
export const dollakastenPasteRegex = /(\$\$([^\]]+)\$\$)/g;

const ZettelkastenMark = Mark.create({
  name: 'zettelkasten',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="zettelkasten-link"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', { ...HTMLAttributes, 'data-type': 'zettelkasten-link' }];
  },

  addInputRules() {
    return [
      new InputRule({
        find: /\[\[([^\]]+)\]\]/,
        handler: ({ state, match, range, commands }) => {
          const [fullMatch, content] = match;
          const { tr, schema } = state;
          const zettelNode = schema.nodes.zettelkastenLink.create(
            {},
            schema.text(content)
          );

          // Replace only the matched text
          tr.replaceWith(range.from, range.from + fullMatch.length, zettelNode);
        },
      }),
    ];
  },

  addPasteRules() {
    return [
      new PasteRule({
        find: zettelkastenPasteRegex,
        handler: ({ state, match, range }) => {
          console.log({ state, match, range });
        },
      }),
    ];
  },
});

export default ZettelkastenMark;
