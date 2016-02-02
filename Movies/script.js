var resource = "now_playing";
var movieArr = [];
var sortBy = "title";
var sortOrder = "asc";

$(document).ready(function(){
	
	runAJAX(resource);

	$("#filters span").click(function(){
		$("#filters span").removeClass("active");
		$(this).addClass("active");
		runAJAX($(this).attr("id"));
	});
	
});

function runAJAX(theResource) {
	$("#container").html("");
	$.getJSON("http://api.themoviedb.org/3/movie/" + theResource + "?api_key=905e94f60d94ae753e3aa1126d23d0f2").done(function(data) {
		movieArr = [];
		console.log(data);
		
		for (var i = 0; i < data.results.length; i++) {
			var title = data.results[i].title;
			var rating = data.results[i].vote_average;
			var popularity = data.results[i].popularity;
			var overview = data.results[i].overview;
			if (overview.length > 200) {
				overview = overview.substr(0,200) + "...";
			}
			if (overview == "") {
				overview = "Plot unknown.";
			}
			var poster = "https://image.tmdb.org/t/p/w185" + data.results[i].poster_path;
			if (poster.indexOf("null") > -1) {
				poster = "backup.jpg";
			}
			movieArr.push({"title": title, "rating": rating, "popularity": popularity, "overview": overview, "poster": poster});
		}

		$("#container").append("<table><thead><tr style = 'background: #6F8DC3;'><th id='poster'>Poster</th><th class='sortable' id='title'>Title<img class='arrow activeSort' src='up.png' /></th><th class='sortable' id='rating'>Rating<img class='arrow' src='up.png' /></th><th class='sortable' id='popularity'>Popularity<img class='arrow' src='up.png' /></th><th id='overview'>Overview</th></tr><tbody></tbody></table>");
	
		$("th").children().removeClass("activeSort");

		if (theResource == "now_playing" || theResource == "upcoming") {
			sortOrder = "asc";
			sortBy = "title";
			$("#title").children().addClass("activeSort");
			$(".arrow").attr("src", "up.png");
		} else {
			sortOrder = "desc";
			if (theResource == "top_rated") {
				sortBy = "rating";
				$("#rating").children().addClass("activeSort");
				$(".arrow").attr("src", "down.png");
			} else {
				sortBy = "popularity";
				$("#popularity").children().addClass("activeSort");
				$(".arrow").attr("src", "down.png");
			}
		}

		movieArr = movieArr.sort(movieSort);
		
		for (var i = 0; i < movieArr.length; i++) {
			$("table tbody").append("<tr><td><img class='pics' src ='" + movieArr[i].poster + "' /></td><td>" + movieArr[i].title + "</td><td>" + movieArr[i].rating + "</td><td>" + movieArr[i].popularity + "</td><td style='max-width:300px'>" + movieArr[i].overview + "</td></tr>");
		}
		$( "tbody tr:odd" ).css( "background-color", "#8DABE1" );
		$( "tbody tr:even").css( "background-color", "#93B8FB");

	}).fail(function(){
		$("#container").html("Sorry! Something's not working right now. Please check back later.");

	});
}

function movieSort(a,b) {
	if (sortOrder == "asc") {
		if (a[sortBy] < b[sortBy])
			return -1;
		else if (a[sortBy] > b[sortBy])
			return 1;
		else 
			return 0;
	} else {
		if (a[sortBy] > b[sortBy])
			return -1;
		else if (a[sortBy] < b[sortBy])
			return 1;
		else 
			return 0;
	}
}

$(document).on("click", "th", function(){
	if ($(this).attr("id") != "poster" && $(this).attr("id") != "overview") {
		$("th").children().removeClass("activeSort");
		$(this).children().addClass("activeSort");
		if (sortBy != $(this).attr("id")) {
			if ($(this).attr("id") == "rating" || $(this).attr("id") == "popularity") {
				sortOrder = "desc";
				$(".arrow").attr("src", "down.png");
			} else {
				sortOrder = "asc";
				$(".arrow").attr("src", "up.png");
			}
		} else {
			if (sortOrder == "asc") {
				sortOrder = "desc";
				$(".arrow").attr("src", "down.png");
			} else {
				sortOrder = "asc";
				$(".arrow").attr("src", "up.png");
			}
		}
		sortBy = $(this).attr("id");
		console.log(sortBy);
		movieArr = movieArr.sort(movieSort);
		$("table tbody").html("");
		for (var i = 0; i < movieArr.length; i++) {
			$("table tbody").append("<tr><td><img class='pics' src='" + movieArr[i].poster + "' /></td><td>" + movieArr[i].title + "</td><td>" + movieArr[i].rating + "</td><td>" + movieArr[i].popularity + "</td><td style='max-width:300px'>" + movieArr[i].overview + "</td></tr>");
		}
		$( "tbody tr:odd" ).css( "background-color", "#8DABE1" );
		$( "tbody tr:even").css( "background-color", "#93B8FB");
	}
});
