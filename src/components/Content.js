import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import Crypter from 'cryptr';

import '../../node_modules/github-markdown-css/github-markdown.css';
import '../../node_modules/highlight.js/styles/github.css';
import './Content.css';

// Secret left in for demonstration purposes.
const cryptr = new Crypter('markdownsecret');

// Markdown-it config, and highlighting used for markdown code sections.
let md = new MarkdownIt('commonmark', {
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return '';
  }
});

export default function Content({ match, history }) {
  const [markdown, setMarkdown] = useState('# Your Markdown');
  const [markdownHTML, setMarkdownHTML] = useState('');

  // If link is a shared text, set markdown to appropriate info.
  useEffect(() => {
    if (match.params.id) {
      try {
        const decryptedString = cryptr.decrypt(match.params.id);
        setMarkdown(decryptedString);
      } catch (e) {
        history.push('/');
      }
    } else {
      setMarkdown('# Your Markdown');
    }
    window.addEventListener('beforeunload', event => {
      event.returnValue = `Are you sure you want to leave?`;
    });
  }, []);

  // If markdown changes update url path.
  useEffect(() => {
    const encryptedString = cryptr.encrypt(markdown);
    setMarkdownHTML(md.render(markdown));
    history.push(`/md/${encryptedString}`);
  }, [markdown]);

  const handleMarkdownToHTML = event => {
    setMarkdown(event.target.value);
  };

  return (
    <div className='content'>
      <section className='markdown-section'>
        <h2 className='markdown-title'>Markdown Section</h2>
        <textarea
          className='markdown-section-textarea'
          value={markdown}
          onChange={handleMarkdownToHTML}
        ></textarea>
      </section>
      <section className='html-section'>
        <h2 className='html-title'>HTML Section</h2>
        <section
          className='html-section-textarea markdown-body'
          dangerouslySetInnerHTML={{ __html: markdownHTML }}
        ></section>
      </section>
    </div>
  );
}
