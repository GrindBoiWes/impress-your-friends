const form = document.querySelector('#review-form');
form.addEventListener('submit', handleFormSubmit);

displayReviews();

function handleFormSubmit(event) {
  event.preventDefault();

  // validate inputs
  const reviewText = document.querySelector('#review-text').value.trim();
  if (!reviewText) {
    alert('Please enter a review.');
    return;
  }

  const reviewImage = document.querySelector('#review-image').files[0];
  if (reviewImage && !reviewImage.type.startsWith('image/')) {
    alert('Please upload an image file.');
    return;
  }

  const review = { text: reviewText, image: reviewImage };

  // save review to local storage
  saveReview(review);

  displayReviews();

  // reset form
  form.reset();
}

function saveReview(review) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

function displayReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const reviewsDiv = document.querySelector('#reviews');
  const reviewImageContainer = document.querySelector('#review-image-container');
  reviewsDiv.innerHTML = '';
  reviewImageContainer.innerHTML = '';
  
  // sort reviews by date (newest first)
  reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

  reviews.forEach(review => {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');
    
    // display review text and date
    const reviewText = document.createElement('p');
    reviewText.innerText = review.text;
    reviewDiv.appendChild(reviewText);
    
    const reviewDate = document.createElement('p');
    reviewDate.innerText = new Date(review.date).toLocaleDateString();
    reviewDate.classList.add('review-date');
    reviewDiv.appendChild(reviewDate);

    if (review.image) {
      // display review image
      const reviewImage = document.createElement('img');
      reviewImage.src = URL.createObjectURL(review.image);
      reviewImage.alt = 'Review Image';
      reviewImage.width = '200';
      reviewImageContainer.appendChild(reviewImage);
    }
    
    reviewsDiv.appendChild(reviewDiv);
  });
}

