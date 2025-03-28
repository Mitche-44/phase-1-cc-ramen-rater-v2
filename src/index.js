// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  // When an image of a ramen is clicked, display its details in the ramen-detail div
  const ramenName = document.querySelector('.name');
  const ramenRestaurant = document.querySelector('.restaurant');
  const ramenImage = document.querySelector('.detail-image');
  const ramenRating = document.querySelector('#rating-display');
  const ramenComment = document.querySelector('#comment-display');

  ramenName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ramenImage.src = ramen.image;
  ramenImage.alt = ramen.name;
  ramenRating.textContent = ramen.rating;
  ramenComment.textContent = ramen.comment;
};



const addSubmitListener = () => {
  // Add code
  const form = document.getElementById('new-ramen');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: parseInt(document.getElementById('new-rating').value),
      comment: document.getElementById('new-comment').value,
    };

    // Add the new ramen by making a POST request
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRamen),
    })
      .then(response => response.json())
      .then(() => {
        // After the new ramen is added, reload the ramen menu
        displayRamens();
      });
  });
}

const displayRamens = () => {
  // Add code
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramenMenu.innerHTML = ''; // Clear any existing ramen images

      ramens.forEach(ramen => {
        const ramenImage = document.createElement('img');
        ramenImage.src = ramen.image;
        ramenImage.alt = ramen.name;
        ramenImage.dataset.id = ramen.id; // Set ramen id as data attribute
        ramenImage.classList.add('ramen-image');
        
        ramenImage.addEventListener('click', () => handleClick(ramen));

        ramenMenu.appendChild(ramenImage);
      });

      // Automatically show the details of the first ramen when the page loads
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    });
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens();
  addSubmitListener();
};

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
