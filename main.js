// declaring global variables
const row1 = document.getElementById("row-1");
const row2 = document.getElementById("row-2");
const input = document.getElementById("search");
const submit = document.getElementById("submit");
const url = "https://proxy.calweb.xyz/http://www.recipepuppy.com/api/";

//fetching data from puppyrecipe api
fetch(url).then(function (data) {
  return data.json();
}).then(function (data) {
  console.log(data);

  let inputStr = "";
  let inputArr = [];
  let searchTerm = "";
  let searchQuery = "";

  submit.addEventListener('click', function() {
    inputStr += input.value;
    formatSearch();
  })

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

  


})
