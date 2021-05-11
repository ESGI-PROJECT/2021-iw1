function html(strings, ...values) {
  let str = '';
  strings.forEach((string, i) => {
      str += string + (values[i] || '');
  });
  return str;
}

export default {
  props: {
    title: '',
    description: '',
    image: '',
    placeholder: '',
  },

  loadImage(template) {
    const image = template.querySelector('img');
    setTimeout(() => {
      image.src = image.dataset.src;
    }, 2000);

    const placeholder = template.querySelector('.placeholder');
    image.addEventListener('load', () => {
      placeholder.classList.add('fade');
    });
  },

  render() {
    const template = document.createElement('div');
    template.innerHTML = html`
      <section class="card">
        <header>
          <figure>
            <div class="placeholder" style="background-image: url(${this.props.placeholder})"></div>
            <img src="" alt="${this.props.title}" data-src="${this.props.image}">
          </figure>
        </header>
        <main>
          <h1>${this.props.title}</h1>
          <p>${this.props.description}</p>
        </main>
      </section>
    `;

    const card = template.querySelector('.card');

    this.loadImage(card);

    return card;
  }
};
