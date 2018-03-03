var sort_by = "popularity.desc";
var genres = "";
var keywords = "";
var vote_lte = "", vote_gte = "", runtime_gte = "", runtime_lte = "", years_gte = "", years_lte = "" ;
page = "1";
$(document).ready(function(){

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}
function getMovies() {
    show('movies', false);
    show('movie_loader', true);
	  $.ajax({
  url: "/discover/"+type+"/json?page="+page+"&sort_by="+sort_by+"&genres="+genres+"&keywords="+keywords+"&vote_lte=" + vote_lte+  "&vote_gte=" + vote_gte+ "&runtime_gte=" + runtime_gte+ "&runtime_lte=" + runtime_lte+ "&years_gte=" + years_gte+ "&years_lte=" + years_lte,
  cache: false
})
  .done(function( html ) {
    show('movies', true);
    show('movie_loader', false);
    if (html != "")
    {
      $("#movies").html(html);
    }
    $(".pageButton").click(function(){
    page = $(this).attr("page");
    getMovies();
    });
  });

}

function edit(id, html)
{
$(id).html(html);
}
getMovies();

	$('#sortBy').dropdown({
		onChange: function(text, value) {
        sort_by = text;
        page = 1;
        getMovies();
    }
	});
    $('#genres').dropdown({
        onChange: function(text, value) {
        genres = text;
        page = 1;
        getMovies();
        
    }
    });
    $('#genres').dropdown('set selected', genres)

    $('#keywords') .dropdown({
    apiSettings: {
      // this url parses query server side and returns filtered results
      url: '/json/keywords/{query}',
    },
     onChange: function(text, value) {
        keywords = text;
        page = 1;
        getMovies();
    }
  });
    $('#keywords').dropdown('set selected', keywords)


	$("#range_votes").ionRangeSlider({
		type: "double",
    grid: true,
    min: 0,
    max: 10,
    from: 0,
    to: 10,
    step: 0.1,
    onStart: function (data) {
        edit("#label_votes", " From " + data.from + " to " + data.to + " stars");
    },
    onChange: function (data) {
        edit("#label_votes", " From " + data.from + " to " + data.to + " stars");
    },
    onFinish: function (data) {
        edit("#label_votes", " From " + data.from + " to " + data.to + " stars");
        vote_gte = data.from;
        vote_lte = data.to;
        page = 1;
        getMovies();
    },
    onUpdate: function (data) {
        edit("#label_votes", " From " + data.from + " to " + data.to + " stars");
    }
	});
	$("#range_years").ionRangeSlider({
		type: "double",
    grid: true,
    min: 1900,
    max:date,
    from: 1900,
    to: date,
    onStart: function (data) {
        edit("#label_years", " From year " + data.from + " to year " + data.to);
    },
    onChange: function (data) {
        edit("#label_years", " From year " + data.from + " to year " + data.to);
    },
    onFinish: function (data) {
        edit("#label_years", " From year " + data.from + " to year " + data.to);
        years_gte = data.from+"-1-1";
        years_lte = data.to+"-12-31";
        page = 1;
        getMovies();
    },
    onUpdate: function (data) {
        edit("#label_years", " From year " + data.from + " to year " + data.to);
    }
	});
	$("#range_runtime").ionRangeSlider({
		type: "double",
  
    min: 0,
    max: 240,
    from: 0,
    to: 240,
    prettify: function (num) {
        return Math.trunc(num / 60) + "h" + (num % 60) + "m" ;
    },
    onStart: function (data) {
        edit("#label_runtime", " From " + Math.trunc(data.from / 60) + "h" + (data.from % 60) + "m" + " to " + Math.trunc(data.to / 60) + "h" + (data.to % 60) + "m");
    },
    onChange: function (data) {
        edit("#label_runtime", " From " + Math.trunc(data.from / 60) + "h" + (data.from % 60) + "m" + " to " + Math.trunc(data.to / 60) + "h" + (data.to % 60) + "m");
    },
    onFinish: function (data) {
        edit("#label_runtime", " From " + Math.trunc(data.from / 60) + "h" + (data.from % 60) + "m" + " to " + Math.trunc(data.to/ 60) + "h" + (data.to% 60) + "m");
        runtime_gte = data.from;
        runtime_lte = data.to;
        page = 1;
        getMovies();
    },
    onUpdate: function (data) {
        edit("#label_runtime", " From " + Math.trunc(data.from / 60) + "h" + (data.from % 60) + "m" + " to " + Math.trunc(data.to / 60) + "h" + (data.to % 60) + "m");
    }
	});


   
});