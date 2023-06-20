fetch('http://localhost:8000/userimages/1')
  .then(response => response.json())
  .then(data => {
    const imageContainer = document.getElementById('image-container');
    data.forEach(image => {
      const figure = document.createElement('figure');

      const imgElement = document.createElement('img');
      imgElement.src = image.image_url;
      imgElement.style.height = '200px';
      imgElement.style.width = '200px';

      const figcaption = document.createElement('figcaption');
      figcaption.innerText = image.image_description;

      figure.appendChild(imgElement);
      figure.appendChild(figcaption);

      imageContainer.appendChild(figure);
    });
  })
  .catch(error => console.error('Error:', error));
