const token = localStorage.getItem('token');
console.log(token);
const getDetail = async(movieid) => {
    try{
        let response = await axios.get(`http://localhost:8080/api/movie?movieId=${movieid}`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        );
        console.log(response.data.movie[0]);
        updateDetails(response.data.movie[0]);
        let comments = await axios.get(`http://localhost:8080/api/comment?movieId=${movieid}`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        )
        console.log(comments.data.comments.slice(0,10));
        generateComments(comments.data.comments.slice(0,10));
        }
    catch(error){
        console.log(error);
        }
};

const postComment = async(movieid, context) => {
    try {
        comment = {"cmtText": context}
        let response = await axios.post(`http://localhost:8080/api/comment?movieId=${movieid}`, comment,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        )
        console.log('Comment added successfully:', response.data);
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

const postRating = async(movieid, rating) => {
    try{
        rating = {"rating": rating}
        let response = await axios.post(`http://localhost:8080/api/rating?movieId=${movieid}`, rating,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        )
        console.log('Rating added successfully:', response.data);
    }
    catch(error){
        console.error('Error adding rating:', error);
    }
}

const Recommend = async(genre) => {
    try{
        console.log("getting recommend");
        let response = await axios.get(`http://localhost:8080/api/movies?genre=${genre}`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        );
        console.log(response.data.movies.slice(0,6));
        update_u_may_like(response.data.movies.slice(0,6));
    }
    catch(error){
        console.log(error);
    }
}

const UpdateView =  async(movieid) => {
    try{
        let response = await axios.put(
            `http://localhost:8080/api/movie?movieId=${movieid}`,
            null, // Thêm null để biểu thị không có dữ liệu gửi đi
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        console.log(response);
    }
    catch(error){
        console.log(error);
    }
}

const UpdateWatchHist = async(movieid) => {
    try{
        let response = await axios.post(`http://localhost:8080/api/movie?movieId=${movieid}`,
            null,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        console.log(response);
    }
    catch(error){
        console.log(error);
    }
}

function updateDetails(jsonData) {
  const id = document.getElementById('need_changing_details');
  const title = document.querySelector('.section__title.section__title--head');
  const itemCoverImg = document.querySelector('.item--details .item__cover img');
  const itemRate = document.querySelector('.item--details .item__rate');
  const itemLists = document.querySelectorAll('.item--details .item__list li');
  const genreLinks = document.querySelector('.item--details .item__meta li:nth-child(1) a');
  const runningTime = document.querySelector('.item--details .item__meta li:nth-child(2)');
  const countryLink = document.querySelector('.item--details .item__meta li:nth-child(3) a');
  const premiereDate = document.querySelector('.item--details .item__meta li:nth-child(4)');
  const views = document.querySelector('.item--details .item__meta li:nth-child(5)');
  const directorLink = document.querySelector('.item--details .item__meta--second li:nth-child(1) a');
  const actorLinks = document.querySelector('.item--details .item__meta--second li:nth-child(2) a');
  const descriptionParagraph = document.querySelector('.item--details .item__description--details p');
//   const trailers = document.querySelectorAll('#player source');

//   trailers.forEach(function(trailer){
//     console.log(trailer.src);
//     trailer.setAttribute("src", jsonData.trailer_url);
//   });

  id.setAttribute("id", jsonData.id);
  //Update title
  title.textContent = jsonData.title;
  // Update cover image src
  itemCoverImg.src =  jsonData.cover_img_url

  // Update rate
  itemRate.textContent = jsonData.average_rating;

  // Update lists
  itemLists[0].textContent = "4K"; //pricing plans needed
  itemLists[1].textContent = jsonData.label;

  // Update genres
  genreLinks.textContent = jsonData.genres;
  genreLinks.setAttribute('href', '#');

  // Update running time
  runningTime.textContent = `Running time: ${jsonData.duration} min`;
  //update views
  views.textContent = `Views: ${jsonData.views}`
  // Update country
  countryLink.textContent = "USA";
  countryLink.setAttribute('href', '#');

  // Update premiere date
  premiereDate.textContent = `Premiere: ${jsonData.release_year}`;

  // Update director
  directorLink.textContent = jsonData.directors;
  directorLink.setAttribute('href', '#');

  // Update actors
  actorLinks.textContent = jsonData.actors;

  // Update description
  descriptionParagraph.textContent = jsonData.description;
}

function update_u_may_like(itemContents) {
  itemContents.forEach((item, index) => {
      const itemDiv = document.getElementById(`item${index + 1}`);
          const titleElement = itemDiv.querySelector(".item__title a");
          const coverElement = itemDiv.querySelector(".item__cover img");
          const categoryElement = itemDiv.querySelector(".item__category a");
          const rateElement = itemDiv.querySelector(".item__rate");
          const idsave = itemDiv.querySelector(".recommend")

          titleElement.textContent = item.title;

          coverElement.setAttribute("src", item.cover_img_url);
          coverElement.setAttribute("alt", "");

          categoryElement.textContent = item.genres;
          rateElement.textContent = item.average_rating;

          idsave.setAttribute('id', item.id)
        //   console.log(idsave.id);
  });
}

function generateComments(commentsData) {
  const commentsContainer = document.querySelector(".comments__list")

  commentsData.forEach(comment => {
      // Create <li> element
      const liElement = document.createElement("li");
      liElement.classList.add("comments__item");

      // Create author section
      const authorDiv = document.createElement("div");
      authorDiv.classList.add("comments__autor");

      // Create avatar image
      const avatarImg = document.createElement("img");
      avatarImg.classList.add("comments__avatar");
      avatarImg.setAttribute("src", "img/user.svg");
      avatarImg.setAttribute("alt", "");

      // Create author name
      const nameSpan = document.createElement("span");
      nameSpan.classList.add("comments__name");
      nameSpan.textContent = comment.first_name + comment.last_name;

      // Create comment time
      const timeSpan = document.createElement("span");
      timeSpan.classList.add("comments__time");
      timeSpan.textContent = comment.date;

      // Append author section elements to <div class="comments__autor">
      authorDiv.appendChild(avatarImg);
      authorDiv.appendChild(nameSpan);
      authorDiv.appendChild(timeSpan);

      // Create comment text
      const commentText = document.createElement("p");
      commentText.classList.add("comments__text");
      commentText.textContent = comment.detail;

      // Append author section, comment text, and actions section to <li> element
      liElement.appendChild(authorDiv);
      liElement.appendChild(commentText);
    //   liElement.appendChild(actionsDiv);

      // Append <li> element to comments container
      commentsContainer.appendChild(liElement);
  });
}

function generateReviewItems(reviews) {
    const reviewsList = document.querySelector(".reviews__list");

    reviews.forEach(review => {
        // Tạo phần tử <li>
        const reviewItem = document.createElement("li");
        reviewItem.classList.add("reviews__item");

        // Tạo phần tử chứa thông tin người đăng bình luận
        const authorDiv = document.createElement("div");
        authorDiv.classList.add("reviews__autor");

        // Tạo phần tử ảnh đại diện
        const avatarImg = document.createElement("img");
        avatarImg.classList.add("reviews__avatar");
        avatarImg.setAttribute("src", review.avatarSrc);
        avatarImg.setAttribute("alt", "");

        // Tạo phần tử tên tác giả
        // const nameSpan = document.createElement("span");
        // nameSpan.classList.add("reviews__name");
        // nameSpan.textContent = review.title;

        // Tạo phần tử thời gian đăng bình luận
        const timeSpan = document.createElement("span");
        timeSpan.classList.add("reviews__time");
        timeSpan.textContent = review.commentTime + review.authorName;

        // Tạo phần tử đánh giá
        const ratingSpan = document.createElement("span");
        ratingSpan.classList.add("reviews__rating");
        ratingSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"></path></svg>${review.rating}`;

        // Thêm các phần tử vào phần tử chứa thông tin người đăng bình luận
        authorDiv.appendChild(avatarImg);
        // authorDiv.appendChild(nameSpan);
        authorDiv.appendChild(timeSpan);
        authorDiv.appendChild(ratingSpan);

        // Tạo phần tử chứa nội dung bình luận
        // const textParagraph = document.createElement("p");
        // textParagraph.classList.add("reviews__text");
        // textParagraph.textContent = review.commentText;

        // Thêm các phần tử vào phần tử <li>
        reviewItem.appendChild(authorDiv);
        // reviewItem.appendChild(textParagraph);

        // Thêm phần tử <li> vào danh sách bình luận
        reviewsList.appendChild(reviewItem);
    });
}

const comment_button = document.querySelector("#submit_comment");

function upload_new_comment(context){
    let currentDate = new Date();
    let dateString = currentDate.toLocaleDateString(); // Lấy ngày theo định dạng dd/mm/yyyy
    let timeString = currentDate.toLocaleTimeString(); // Lấy giờ theo định dạng hh:mm:ss
    let comment_time = dateString + ", " + timeString;

    let user_info = {
        "authorName": "Rosa Lee"
    }

    const commentsContainer = document.querySelector(".comments__list")
    // Create <li> element
    const liElement = document.createElement("li");
    liElement.classList.add("comments__item");

    // Create author section
    const authorDiv = document.createElement("div");
    authorDiv.classList.add("comments__autor");

    // Create avatar image
    const avatarImg = document.createElement("img");
    avatarImg.classList.add("comments__avatar");
    avatarImg.setAttribute("src", "img/user.svg");
    avatarImg.setAttribute("alt", "");

    // Create author name
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("comments__name");
    nameSpan.textContent = user_info.authorName;

    // Create comment time
    const timeSpan = document.createElement("span");
    timeSpan.classList.add("comments__time");
    timeSpan.textContent = comment_time;

    // Append author section elements to <div class="comments__autor">
    authorDiv.appendChild(avatarImg);
    authorDiv.appendChild(nameSpan);
    authorDiv.appendChild(timeSpan);

    // Create comment text
    const commentText = document.createElement("p");
    commentText.classList.add("comments__text");
    commentText.textContent = context;

    // Append author section, comment text, and actions section to <li> element
    liElement.appendChild(authorDiv);
    liElement.appendChild(commentText);

    // Append <li> element to comments container
    const firstChild = document.querySelector(".comments__item");
    commentsContainer.insertBefore(liElement, firstChild);
    // commentsContainer.appendChild(liElement);
    postComment(localStorage.getItem("movieid"),context);
    
}

const review_button = document.querySelector("#submit_review");

function upload_new_review(rating){
    let currentDate = new Date();
    let dateString = currentDate.toLocaleDateString(); // Lấy ngày theo định dạng dd/mm/yyyy
    let timeString = currentDate.toLocaleTimeString(); // Lấy giờ theo định dạng hh:mm:ss
    let comment_time = dateString + ", " + timeString;

    let numberPart = rating.split(' ')[0];
    rating = numberPart + ".0";

    numberPart = parseInt(numberPart)

    let review = {
        "authorName": "Gene Graham"
    }

    const reviewsList = document.querySelector(".reviews__list");

    // Tạo phần tử <li>
    const reviewItem = document.createElement("li");
    reviewItem.classList.add("reviews__item");

    // Tạo phần tử chứa thông tin người đăng bình luận
    const authorDiv = document.createElement("div");
    authorDiv.classList.add("reviews__autor");

    // Tạo phần tử ảnh đại diện
    const avatarImg = document.createElement("img");
    avatarImg.classList.add("reviews__avatar");
    avatarImg.setAttribute("src", "img/user.svg");
    avatarImg.setAttribute("alt", "");

    // Tạo phần tử tiêu đề
    // const nameSpan = document.createElement("span");
    // nameSpan.classList.add("reviews__name");
    // nameSpan.textContent = "";

    // Tạo phần tử thời gian đăng bình luận
    const timeSpan = document.createElement("span");
    timeSpan.classList.add("reviews__time");
    timeSpan.textContent = comment_time + ', by ' + review.authorName;

    // Tạo phần tử đánh giá
    const ratingSpan = document.createElement("span");
    ratingSpan.classList.add("reviews__rating");
    ratingSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"></path></svg>${rating}`;

    // Thêm các phần tử vào phần tử chứa thông tin người đăng bình luận
    authorDiv.appendChild(avatarImg);
    // authorDiv.appendChild(nameSpan);
    authorDiv.appendChild(timeSpan);
    authorDiv.appendChild(ratingSpan);

    // Tạo phần tử chứa nội dung bình luận
    // const textParagraph = document.createElement("p");
    // textParagraph.classList.add("reviews__text");
    // textParagraph.textContent = "";

    // Thêm các phần tử vào phần tử <li>
    reviewItem.appendChild(authorDiv);
    // reviewItem.appendChild(textParagraph);

    // Thêm phần tử <li> vào danh sách bình luận
    const firstChild = document.querySelector(".reviews__item");
    reviewsList.insertBefore(reviewItem,firstChild);
    // reviewsList.appendChild(reviewItem);
    postRating(localStorage.getItem("movieid"),numberPart);
}

function selectGenre(){
    let genreLinks = document.querySelector('.item--details .item__meta li:nth-child(1) a');
    let genreString = genreLinks.textContent; // Lấy chuỗi từ phần tử genreLinks
    // console.log(genreString);
    let genresArray = genreString.split(', '); // Chuyển chuỗi thành mảng bằng cách tách chuỗi theo dấu phẩy
    // console.log(genresArray[0], genresArray[1], genresArray[2]);
    // Lấy ngẫu nhiên một chỉ số từ 0 đến độ dài của mảng thể loại
    let randomIndex = Math.floor(Math.random() * genresArray.length);
    // console.log(randomIndex);
    // Sử dụng chỉ số đã chọn để lấy ra thể loại ngẫu nhiên
    let randomGenre = genresArray[randomIndex];
    console.log("Recommend genre:", randomGenre);
    return randomGenre;

}

const watchMovie = document.querySelector(".playVideo");
const recommended_list = document.querySelectorAll(".recommend");

document.addEventListener('DOMContentLoaded', function() {
//   updateDetails(details);
  getDetail(localStorage.getItem("movieid")).then(function(){
    const recommended_genre = selectGenre();
    Recommend(recommended_genre);
  });
  //update_u_may_like(itemContents);
  // generateComments(commentsData);

  //generateReviewItems(reviews);

  comment_button.addEventListener("click", function(){
    let textarea = document.getElementById("comment_text");
    if (textarea.value.trim() == "") {
        return;
    }
    upload_new_comment(textarea.value);
    textarea.value = "";
    textarea.placeholder = "Write a comment";
  })

  review_button.addEventListener("click", function(){
    let ratingSelect = document.getElementById('rating');

    if (ratingSelect.value === '0') {
        return;
    }
    upload_new_review(ratingSelect.value);
    ratingSelect.value = '0';
  })

  watchMovie.addEventListener("click", function(){
    console.log("watching");
    UpdateView(localStorage.getItem("movieid"));
    UpdateWatchHist(localStorage.getItem("movieid"));
  })

  recommended_list.forEach(function(element){
    element.addEventListener("click", function(){
        console.log(element.id);
        localStorage.setItem("movieid", element.id);
        window.location.href = 'http://localhost:3000/details'
    })
  })
});

