$( "#search" ).keyup(function(e) {
  if(e.which === 13) {
  	bookSearch();
  }
});

//functio n to do the book search

function bookSearch() {
	// Check to see if the results div has content already
	if(document.getElementById("results").innerHTML !== '') {
		document.getElementById("results").innerHTML = '';
	}

	// Create variable to store input value in search
	var search = document.getElementById("search").value

	console.log(search)

	// Initiate ajax call
	$.ajax({
		// Here's the URL to use plus the results of the input variable as the query info
		url: "https://www.googleapis.com/books/v1/volumes?q=" + search + "&maxResults=40",
		// Here's the type of data file returned
		dataType: "json",

		success: function(data){
			// Console log data to see properties available
			console.log(data)

			// Loop through returned data to display info
			for(i = 0; i < data.items.length; i++) {

				// Create new div, h2, h3 & img elements
				var results = document.getElementById("results")
				var newDiv = document.createElement("div")
				var newImg = document.createElement("img")
				var newAuthor = document.createElement("p")
				var newTitle = document.createElement("h2")

				// Create any classes needed and attach to elements
				newDiv.className = "col-md-3 results animated fadeIn"

				// Create text nodes for each element using data pull
				var newAuthorText = document.createTextNode(data.items[i].volumeInfo.authors)
				var newTitleText = document.createTextNode(data.items[i].volumeInfo.title)

				// Append textNodes to elements
				newAuthor.appendChild(newAuthorText)
				newTitle.appendChild(newTitleText)

				// Add src attribute to img element
				newImg.setAttribute("src", data.items[i].volumeInfo.imageLinks.thumbnail)

				// Append created h2, h3 & img elements to div element
				newDiv.appendChild(newImg)
				newDiv.appendChild(newAuthor)
				newDiv.appendChild(newTitle)

				// Append created div element(s) to listing div 
				results.appendChild(newDiv)

			}
		},

		// Here's the type of server request (it gets the data)
		type: "GET"
	});

	var form = document.getElementById("search").value = '';
}	