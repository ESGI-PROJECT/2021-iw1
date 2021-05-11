import { LitElement, html, css } from 'lit';

class NewsCard extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        margin: 0 1rem;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0px 1px 2px 0px hsla(0, 0%, 0%, 0.44);
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      header {
        position: relative;
        min-height: 30vh;
        padding: 0;
        background-color: rgba(38, 38, 38, 0.64);
      }

      figure {
        padding: 0;
        margin: 0;
      }

      img {
        display: block;
        object-fit: cover;
        width: 100%;
        height: auto;
        max-height: 30vh;
      }

      header .placeholder {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }

      main {
        padding: 0.25rem 0.5rem;
      }
      main h1 {
        font-weight: 500;
        font-size: 1.2rem;
      }
      main p {
        padding-top: 0.25rem;
        font-size: 0.75rem;
        color: #6D6D6D;
      }

      /**
        * Persist animation using : animation-fill-mode set to forward 
        * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
        */
      .fade {
        -webkit-animation: fadeout 2s forwards; /* Safari and Chrome */
        -moz-animation: fadeout 2s forwards; /* Firefox */
        -ms-animation: fadeout 2s forwards; /* Internet Explorer */
        -o-animation: fadeout 2s forwards; /* Opera */
        animation: fadeout 2s forwards;
      }

      /* Key frame animation */
      @keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
      }

      /* Firefox */
      @-moz-keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
      }

      /* Safari and Chrome */
      @-webkit-keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
      }

    `;
  }

  static get properties() {
    return {
      placeholder: String,
      image: String,
      title: String,
      slug: String,
      description: String,
    };
  }

  constructor() {
    super();
    this.placeholder = '';
    this.image = '';
    this.title = '';
    this.slug = '';
    this.description = '';
  }

  firstUpdated() {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
     */
    const options = {
      rootMarging : '0px 0px 0px 0px'
    };

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = this.image;

          image.addEventListener('load', () => {
            image.parentNode.querySelector('.placeholder').classList.add('fade');

            io.unobserve(image);
          });
        }
      });
    };

    const io = new IntersectionObserver(callback, options);

    const image = this.shadowRoot.querySelector('img');
    io.observe(image);
  }

  render() {
    return html`
      <a href="/read/${this.slug}">
        <header>
          <figure>
            <div class="placeholder" style="background-image: url(${this.placeholder})"></div>
            <img src="" alt="${this.title}">
          </figure>
        </header>
        <main>
          <h1>${this.title}</h1>
          <p>${this.description}</p>
        </main>
      </a>
    `;
  }
}

customElements.define('news-card', NewsCard);
