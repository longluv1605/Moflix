const movies = [
    {
      "href": "details1.html",
      "context": "The Lost Key",
      "src": "img/covers/7.png",
      "category": ["Action", "Triler"],
      "rate": "8.4"
    },
    {
      "href": "details1.html",
      "context": "Red Sky at Night",
      "src": "img/covers/8.png",
      "category": ["Comedy"],
      "rate": "7.1"
    },
    {
      "href": "details1.html",
      "context": "The Forgotten Road",
      "src": "img/covers/9.png",
      "category": ["Romance", "Drama", "Music"],
      "rate": "6.3"
    },
    {
      "href": "details1.html",
      "context": "Dark Horizons",
      "src": "img/covers/10.png",
      "category": ["Comedy", "Drama"],
      "rate": "7.9"
    },
    {
      "href": "details1.html",
      "context": "Echoes of Yesterday",
      "src": "img/covers/11.png",
      "category": ["Action", "Triler"],
      "rate": "8.4"
    },
    {
      "href": "details1.html",
      "context": "Into the Unknown",
      "src": "img/covers/12.png",
      "category": ["Comedy"],
      "rate": "7.1"
    },
    {
      "href": "details1.html",
      "context": "The Broken Path",
      "src": "img/covers/13.png",
      "category": ["Romance", "Drama", "Music"],
      "rate": "6.3"
    },
    {
      "href": "details1.html",
      "context": "A Light in the Darkness",
      "src": "img/covers/14.png",
      "category": ["Comedy", "Drama"],
      "rate": "7.9"
    },
    {
      "href": "details1.html",
      "context": "Endless Horizon",
      "src": "img/covers/15.png",
      "category": ["Action", "Triler"],
      "rate": "8.4"
    },
    {
      "href": "details1.html",
      "context": "The Unseen Journey",
      "src": "img/covers/16.png",
      "category": ["Comedy"],
      "rate": "7.1"
    },
    {
      "href": "details1.html",
      "context": "Reckoning",
      "src": "img/covers/17.png",
      "category": ["Romance", "Drama", "Music"],
      "rate": "6.3"
    },
    {
      "href": "details1.html",
      "context": "Savage Beauty",
      "src": "img/covers/18.png",
      "category": ["Comedy", "Drama"],
      "rate": "7.9"
    }
  ]

function catalog_title(name) {
    const title = document.querySelector('.section__title.section__title--head')
    title.textContent = name;
}

function home_to_catalog(catalog){
    const to_cata = document.querySelector(".breadcrumbs__item.breadcrumbs__item--active");
    to_cata.textContent = catalog;
}

function createItems(jsonData) {
    const container = document.createElement('div');
    container.classList.add('row');

    jsonData.forEach(item => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-6', 'col-sm-4', 'col-lg-3', 'col-xl-2');

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const link = document.createElement('a');
        link.href = '/details';
        link.classList.add('item__cover');

        const img = document.createElement('img');
        img.src = item.cover_img_url;
        img.alt = '';

        const playSpan = document.createElement('span');
        playSpan.classList.add('item__play');
        playSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z"/></svg>';

        link.appendChild(img);
        link.appendChild(playSpan);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('item__content');

        const title = document.createElement('h3');
        title.classList.add('item__title');
        const titleLink = document.createElement('a');
        titleLink.href = '/details';
        titleLink.textContent = item.title;
        title.appendChild(titleLink);

        const categorySpan = document.createElement('span');
        categorySpan.classList.add('item__category');
        const catLink = document.createElement('a');
        catLink.href = '#'; // Chỉnh sửa href theo yêu cầu của bạn
        catLink.textContent = item.genres;
        categorySpan.appendChild(catLink);

        const rateSpan = document.createElement('span');
        rateSpan.classList.add('item__rate');
        rateSpan.textContent = item.average_rating;

        contentDiv.appendChild(title);
        contentDiv.appendChild(categorySpan);
        contentDiv.appendChild(rateSpan);

        itemDiv.appendChild(link);
        itemDiv.appendChild(contentDiv);

        colDiv.appendChild(itemDiv);

        container.appendChild(colDiv);
    });
    return container;
}

const fetchData = async (genre) => {
  try {
      const response = await axios.get(`http://localhost:8080/api/movies?genre=${genre}&userId=3`);
      const catalogSection = document.querySelector(".section.section--catalog .container");
      catalog_title(genre);
      home_to_catalog(genre);
      const container = createItems(response.data.movies.slice(0, 30));
      catalogSection.appendChild(container);
} catch (error) {
      console.log(error);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const genre = localStorage.getItem('genre');
  console.log(genre);
  fetchData(genre);
});


  

