
import page from 'page';


(async () => {
  const app = document.querySelector('#app main');

  const newsHome = app.querySelector('news-home');
  const newsRaed = app.querySelector('news-read');

  const skeleton = app.querySelector('.skeleton');

  const result = await fetch('/data/spacex.json');
  const data = await result.json();

  function pageChanged(ctx, next) {
    newsHome.active = false;
    newsRaed.active = false;
    
    next();
  }

  page('/', pageChanged, async () => {
    await import('./views/news-home.js');

    newsHome.articles = data;
    newsHome.active = true;

    skeleton.setAttribute('hidden', '');
  });

  page('/read/:slug', pageChanged, async ({ params }) => {
    await import('./views/news-read.js');

    const { slug } = params;

    const idx = data.findIndex(article => article.content.slug === slug)
    if (idx > -1) {
      newsRaed.article = data[idx];
      newsRaed.active = true;
    } else {
      page('/404');
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    skeleton.setAttribute('hidden', '');
  });

  page('*', () => {
    console.log('404');
    skeleton.removeAttribute('hidden');
  })

  page();

})();
