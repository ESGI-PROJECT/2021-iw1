import { LitElement, html, css } from 'lit';

import Base, { style } from './Base.js';
import '../components/Card/news-card.js';

class NewsHome extends Base {

  static get styles() {
    return [
      style,
      css`
        :host news-card:first-child {
          margin-top: 1rem;
        }
      `
    ];
  }

  static get properties() {
    return {
      articles: Array
    };
  }

  constructor() {
    super();
    this.articles = [];
  }

  render() {
    return html`${
      this.articles.map(article => html`
        <news-card
          .placeholder="${article.placeholder}"
          .image="${article.image}"
          .title="${article.content.title}"
          .slug="${article.content.slug}"
          .description="${article.content.description}"
        ></news-card>
      `)
    }`;
  }
}

customElements.define('news-home', NewsHome);
