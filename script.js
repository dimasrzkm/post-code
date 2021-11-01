const search = document.querySelector('#keyword');
const keyword = document.querySelector('#keyword-value');
const resultSection = document.querySelector('.result-section');
const resultRoot = document.querySelector('.result-search');
const to = document.querySelector('#result');

const searchData = async (key) => {
  let response = await fetch(`https://kodepos.vercel.app/search/?q=${key}`);
  let data = await response.json();
  if (data.status == false) {
   throw new Error(`Maaf Data Tidak Ditemukan`);
  }
  return data;
}

const renderHtml = (data) => {
  console.log(data);
  resultRoot.innerHTML = "";
  if (data.length !== 0) {
    data.forEach(e => {
      let post = `<div class="card">
        <header class="header-card">
          <h2>Detail</h2>
        </header>
        <main class="body-card">
          <table class="table-data">
            <tr>
              <td>Provinsi</td>
              <td>:</td>
              <td>${e.province}</td>
            </tr>
            <tr>
              <td>Kota</td>
              <td>:</td>
              <td>${e.city}</td>
            </tr>
            <tr>
              <td>Kecamatan</td>
              <td>:</td>
              <td>${e.subdistrict}</td>
            </tr>
            <tr>
              <td>Kelurahan</td>
              <td>:</td>
              <td>${e.urban}</td>
            </tr>
            <tr>
              <td>Kode Pos</td>
              <td>:</td>
              <td>${e.postalcode}</td>
            </tr>
          </table>
        </main>
      </div>`;
      resultRoot.innerHTML += post;
    });
  }
  setTimeout(() => {
    to.scrollIntoView();
  }, 1000);
}

search.addEventListener('click', function() {
  searchData(keyword.value)
    .then(data =>{
      resultSection.style.display = 'block';
      resultRoot.style.display = 'flex';
      resultRoot.style.padding = '2rem';
      let hasil = data.data;
      renderHtml(hasil);
    }).catch(error => {
      console.dir(error.message);
    });
});