const container = document.querySelectorAll('.blog-row');
const pagenation = document.getElementById("pagenation");
let showPage; 
let pageOn;

document.addEventListener("DOMContentLoaded", () => {

  let numOfPages = Array.from(container).map(rows => rows.children).length;
  showPage = 0;
  
  container.forEach((row, index) => {
    row.dataset.id = index;
    if (parseInt(row.dataset.id) !== showPage) { row.style.display = "none" }
  })
  
  // create pagenation for each row
  createPagenation(numOfPages)

  pagenation.addEventListener('click', (e) => {
    showPage = e.target.dataset.id; 
    nextPage(e);
  })
  
})

function createPagenation(numOfPages) {
  if (numOfPages > 1) {
    pagenation.innerHTML = `<a data-move="left" data-id="${(showPage > 0) ? (showPage - 1) : 0}" class="item">&laquo;</a>`
    container.forEach((page, index) => {
      pagenation.innerHTML +=
        `<a data-id="${index}" class="item">${index + 1}</a>`
    })
    pagenation.innerHTML += `<a data-move="right" data-id="${(showPage < numOfPages) ? (showPage + 1) : showPage}" class="item">&raquo;</a>`
  }
}

function nextPage(e) {
  
  Array.from(pagenation.children).forEach(num => num.classList.remove('active'));
  pagenation.children[parseInt(showPage) + 1].classList.add('active');

  container.forEach((row) => {
    if (parseInt(row.dataset.id) !== parseInt(showPage)) {
      row.style.display = "none";
    } else {
      row.style.display = "flex";
    }
  })
}