import { Node } from '@tiptap/core';

const ZettelkastenNode = Node.create({
  name: 'zettelkastenLink',

  // Define the node as an inline element
  inline: true,

  // Group it as part of the inline content
  group: 'inline',

  content: 'text*',

  // Define the attributes your node will have
  addAttributes() {
    return {
      // Example: A unique identifier for the link
      uniqueIdentifier: {
        default: null,
      },
    };
  },

  // Define how the node converts to HTML
  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      {
        ...HTMLAttributes,
        'data-type': 'zettelkasten-link',
        // 'data-unique': node.attrs.uniqueIdentifier,
      },
      0, // Indicates where the child content goes
    ];
  },

  // Define how the node is parsed from HTML
  parseHTML() {
    return [
      {
        tag: 'span[data-type="zettelkasten-link"]',
      },
    ];
  },
});

export default ZettelkastenNode;
