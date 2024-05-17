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
    const moviename = localStorage.getItem('search');
    jsonData.forEach(item => {
        if (item.title === moviename) {
          return;
        }
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-6', 'col-sm-4', 'col-lg-3', 'col-xl-2');
        colDiv.id = item.id;
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

function createMovie(jsonData) {
  const container = document.createElement('div');
  container.classList.add('row');
  const moviename = localStorage.getItem('search');
  jsonData.forEach(item => {
      if (item.title === moviename) {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-6', 'col-sm-4', 'col-lg-3', 'col-xl-2');
        colDiv.id = item.id;
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
      }
      return;
  });
  return container;
}

const fetchData = async (genre) => {
  try {
      const response = await axios.get(`http://localhost:8080/api/movies?genre=${genre}`,
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      );
      return response;
} catch (error) {
      console.log(error);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const will_like = localStorage.getItem('will_like');
  if (will_like === null || will_like === '') {
    const genre = localStorage.getItem('genre');
    fetchData(genre).then(response => {
      const catalogSection = document.querySelector(".section.section--catalog .container");
      catalog_title(genre);
      home_to_catalog(genre);
      const container = createItems(response.data);
      catalogSection.appendChild(container);
      const clickItem = document.querySelectorAll('.col-6.col-sm-4.col-lg-3.col-xl-2');
      clickItem.forEach((item) => {
        item.addEventListener('click', function() {
          localStorage.setItem('movieid', item.id);
        });
      });
    });
  } else {
      const catalogSection = document.querySelector(".section.section--catalog .container");
      const now_watching = document.querySelector(".section.section--dark .container");
      catalog_title(will_like);
      home_to_catalog(will_like);
      const check = document.getElementById('will_like');
      check.style.display = 'block';
      fetchData(will_like).then(response => {
        const container = createMovie(response.data);
        catalogSection.appendChild(container);
        const now_watching_container = createItems(response.data);
        now_watching.appendChild(now_watching_container);
        const clickItem = document.querySelectorAll('.col-6.col-sm-4.col-lg-3.col-xl-2');
        clickItem.forEach((item) => {
          item.addEventListener('click', function() {
            localStorage.setItem('movieid', item.id);
          });
        });
        localStorage.setItem('will_like', '');
      });
  }
});


  

