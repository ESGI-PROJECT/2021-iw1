import { html, css } from 'lit';

import Base, { style } from './Base.js';

class NewsRead  extends Base {

  static get styles() {
    return [
      style,
      css`
        figure {
          margin: 0;
        }
        img {
          width: 100%;
          max-height: 35vh;
          object-fit: cover;
        }
        h1 {
          margin: 0;
        }
        main {
          padding: 0 1rem;
        }
        p, h1 {
          text-align: justify;
        }
        p.description {
          color: #535353;
        }
        p.content {
          font-size: 1.25rem;
          padding-bottom: 1rem;
        }
      `
    ];
  }

  static get properties() {
    return {
      article: Object
    };
  }

  constructor() {
    super();
    this.article = {}
  }

  render() {
    return this.article.content ? html`
      <article>
        <figure>
          <img src="${this.article.image}" .alt="${this.article.content.title}">
        </figure>
        <main>
          <h1>${this.article.content.title}</h1>
          <p class="description">${this.article.content.description}</p>
          <p class="content">${this.article.content.text}</p>
        </main>
      </article>
    ` : null;
  }
}

customElements.define('news-read', NewsRead);
