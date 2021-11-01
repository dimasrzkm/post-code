const search = document.querySelector('#keyword');
const keyword = document.querySelector('#keyword-value');

const searchData = async (key) => {
  let response = await fetch(`https://kodepos.vercel.app/search/?q=${key}`);
  let data = await response.json();
  if (data.status == false) {
   throw new Error(`Maaf Data Tidak Ditemukan`);
  }
  return data;
}

search.addEventListener('click', function() {
  searchData(keyword.value)
    .then(data =>{
      let hasil = data.data;
      hasil.forEach(e => console.log(e));
    }).catch(error => {
      console.dir(error.message);
    });
});
