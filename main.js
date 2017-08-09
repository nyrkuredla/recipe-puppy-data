// declaring global variables
const input = document.getElementById("search");
const submit = document.getElementById("submit");
let resultsDiv = document.getElementById("results");
const url = "https://proxy.calweb.xyz/http://www.recipepuppy.com/api/";

  let inputStr = "";
  let inputArr = [];
  let searchTerm = "";
  let searchQuery = "";
  let searchUrl = "";

  submit.addEventListener('click', function() {
    inputStr += input.value;
    clearData();
    formatSearch();
    searchData();

  })

  function clearData() {
    resultsDiv.innerHTML = ``;
  }

  function formatSearch () {
    inputArr = inputStr.split(" ");
    for (let i = 0; i < (inputArr.length - 1); i++) {
      searchTerm += inputArr[i] + "-";
    }
    searchTerm += inputArr[(inputArr.length - 1)];
    searchQuery = "?q=" + searchTerm;
    inputStr = "";
    inputArr = [];
    searchTerm = "";
  }

  function searchData() {
    searchUrl = url + searchQuery;
    fetch(searchUrl).then(function (data) {
      return data.json();
    }).then(function (data) {
      let results = data.results;
      let title;
      let picture;
      let link;

      let resultsHTML;
      for (let i = 0; i < results.length; i++) {
        title = results[i].title;
        if (results[i].thumbnail === "") {
          picture = "http://lorempixel.com/g/250/250/food";
        } else {
          picture = results[i].thumbnail;
        }
        link = results[i].href;
        resultsHTML = `
        <div class="results">
          <img class="results-pic" src=${picture} />
          <a class="results-link" href=${link}>${title}</a>
        </div>`;
        resultsDiv.innerHTML += resultsHTML;

      }

    })

  }

  //fetching data from puppyrecipe api
  // fetch(url).then(function (data) {
  //   return data.json();
  // }).then(function (data) {
  //   console.log(data);
