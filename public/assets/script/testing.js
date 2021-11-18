
var searchBar = document.getElementById("searchBar")

document.querySelector('#searchBar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
    // console.log(searchBar.value)
    event.preventDefault();
    // Get value from text field.
    const searchString = $('#searchBar').val();
    // call searchForActor()
    searchForActor(searchString);
    // document.getElementById('searchBar').value='';
    }
  });
