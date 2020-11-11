const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready =false;
let imagesLoaded = 0;
let imagesTotal = 0;


let photosArray = [];

const count=30;

const apiKey='MPG9QztQMTyzcnFK-0ESmUdFYR49cWv2Af5C5d48-Hc';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded()
{
imagesLoaded++;
console.log(imagesLoaded);
if(imagesLoaded === imagesTotal)
    ready=true;
console.log('ready = ' ,ready);
}


function displayPhotos()
{
    imagesLoaded=0;
    imagesTotal=photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        item.setAttribute('href' , photo.links.html);
        item.setAttribute('target', '_blank');

        const img= document.createElement('img');

        img.setAttribute('src',photo.urls.regular);
        
        img.setAttribute('alt',photo.alt_description);
        
        img.setAttribute('title',photo.alt_description);
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}





async function getPhotos()
{
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        
    }
}
window.addEventListener('scroll', () => {
if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
ready=false;
getPhotos();
});
getPhotos();