// declaring global variables
const input = document.getElementById("search");
const submit = document.getElementById("submit");
let resultsDiv = document.getElementById("results");
const url = "https://proxy.calweb.xyz/http://www.recipepuppy.com/api/";

//declaring variables for search functions
  let inputStr = "";
  let inputArr = [];
  let searchTerm = "";
  let searchQuery = "";
  let searchUrl = "";

//button click event listener
  submit.addEventListener('click', function() {
    inputStr += input.value;
    clearData();
    formatSearch();
    searchData();

  })

//clearing old searches before submitting new search query
  function clearData() {
    resultsDiv.innerHTML = ``;
  }

//pulling input string and reformatting to query format
  function formatSearch () {
    inputArr = inputStr.split(" ");
    for (let i = 0; i < (inputArr.length - 1); i++) {
      searchTerm += inputArr[i] + ",";
    }
    searchTerm += inputArr[(inputArr.length - 1)];
    //query is based on 'ingredient search' parameters from recipepuppy API doc
    searchQuery = "?i=" + searchTerm;
    inputStr = "";
    inputArr = [];
    searchTerm = "";
  }

//plugging query string into recipepuppy API and returning data
  function searchData() {
    searchUrl = url + searchQuery;
    fetch(searchUrl).then(function (data) {
      return data.json();
    }).then(function (data) {

//declaring variables for template literal to insert search results into DOM
      let results = data.results;
      let title;
      let picture;
      let link;

//looping over search data to create template literal
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

        //adding new divs to results div
        resultsDiv.innerHTML += resultsHTML;

      }

    })

  }
