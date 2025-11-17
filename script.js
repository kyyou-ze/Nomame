
function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("show");
}


function goToProfile() {
  alert("Masuk ke halaman profil...");
}

const jsonUrl = 'https://raw.githubusercontent.com/kyyou-ze/Data/refs/heads/main/Data.json'; // Ganti dengan link raw JSON kamu

fetch(jsonUrl)
  .then(res => {
    if (!res.ok) throw new Error('Network response not OK');
    return res.json();
  })
  .then(data => {
    data.forEach(item => {
    const slide = `
  <div class="swiper-slide" onclick="location.href='desk.html?id=${item.id}'">
    <div class="card">
      <img src="${item.img}" alt="${item.title}">
      <div class="card-content">
      <h3>${item.title}</h3>
      <p>${item.year}</p>
      <p>${item.summary}</p>
      <p>Status: ${item.status}</p>
      <p>Type: ${item.type}</p>
      <div>
        <button>${item.genre1}</button>
        <button>${item.genre2}</button>
      </div>
      </div>
      <div class="rating">${item.rating}</div>
    </div>
  </div>
`;
      document.getElementById('novel-slider').innerHTML += slide;
    });

new Swiper('.mySwiper', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  freeMode: true,
  freeModeMomentum: true,   // bikin scroll lebih halus
  speed: 800,               // durasi animasi perpindahan slide dalam ms
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
  })
  .catch(err => console.error('Error fetching JSON:', err));

