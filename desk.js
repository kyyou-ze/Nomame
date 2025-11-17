
const jsonUrl = 'https://raw.githubusercontent.com/kyyou-ze/Data/refs/heads/main/Data.json';

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

fetch(jsonUrl)
  .then(res => {
    if (!res.ok) throw new Error('Network response not OK');
    return res.json();
  })
  .then(data => {
    const id = getIdFromUrl();
    const item = data.find(d => d.id === id);
    if (!item) {
      document.getElementById('novel-slider').innerHTML = '<p>Novel tidak ditemukan.</p>';
      return;
    }

    const detailHTML = `
    <div class="card">
      <img src="${item.img}" alt="${item.title}" />
      <h2>${item.title}</h2>
      <div class="meta">
        <i class="fas fa-star"></i>${item.rating}
        <i class="fas fa-calendar-alt"></i> ${item.year}
        <i class="fas fa-check-circle"></i>${item.status}
      </div>
      <div class="genre">
        <i class="fas fa-tags"></i> ${item.genre1}${item.genre2 ? ', ' + item.genre2 : ''}
      </div>
      <button class="btn-back" onclick="location.href='index.html'">
        <i class="fas fa-arrow-left"></i> Kembali
      </button>
      </div>
      <div class="section">
        <h3>Sinopsis</h3>
        <p>${item.summary}</p>
      </div>
    `;
    document.getElementById('novel-slider').innerHTML = detailHTML;
  })
  .catch(err => {
    console.error('Error fetching JSON:', err);
    document.getElementById('novel-slider').innerHTML = '<p>Gagal memuat data.</p>';
  });
  const chapterList = document.getElementById("chapterList");
  const btnNewest = document.getElementById("btnNewest");
  const btnOldest = document.getElementById("btnOldest");

  let chapters = [];

  function renderChapters(data) {
    chapterList.innerHTML = "";
    data.forEach(chapter => {
      const div = document.createElement("div");
      div.className = "chapter-item";
      div.innerHTML = `
      <div >
        <div onclick="location.href='ch.html?id=${chapter.id}'"><i class="fas fa-book-open"></i>${chapter.title}</div>
        <div class="views"><i class="fas fa-eye"></i>${chapter.views}</div>
       </div>
      `;
      chapterList.appendChild(div);
    });
  }

  btnNewest.addEventListener("click", () => {
    btnNewest.classList.add("active");
    btnOldest.classList.remove("active");
    renderChapters(chapters);
  });

  btnOldest.addEventListener("click", () => {
    btnOldest.classList.add("active");
    btnNewest.classList.remove("active");
    renderChapters([...chapters].slice().reverse());
  });
  // Ganti URL ini dengan URL JSON-mu sendiri
  fetch('https://raw.githubusercontent.com/kyyou-ze/Data/refs/heads/main/Chapter.json')
    .then(response => response.json())
    .then(data => {
      chapters = data;
      renderChapters(chapters);
    })
    .catch(err => {
      chapterList.innerHTML = "<p>Gagal memuat data chapter.</p>";
      console.error(err);
    });