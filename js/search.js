var minlength = 0;


$(document).ready(function(){
var searchRequest = null;

function searchOnKeyUp(keycode, value, element) {
       var valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223) || // [\]' (in order)
        keycode == 8 ||                   // backspace
        (keycode == 229|| keycode == 0);     //on mobile                  
    if (!valid)
    {
        return;
    }
   
        if (!$(element).find(".active").length && keycode == 13 && value.length > 0)
        {
            window.location.href = "/search/movie?q=" + value;
        } 

        if (value.length >= minlength ) {
                $(element).css("display", "none");
            if (value.length == minlength ) {
                $(element).text("");
            }
            if (searchRequest != null) 
                searchRequest.abort();
            searchRequest = $.ajax({
                type: "GET",
                url: "https://api.themoviedb.org/3/search/multi?",
                data: {
                    'query' : value,
                    'page' : 1,
                    "api_key":"ea4205fce5d5e9a6faa80486d968a33d",
                    "include_adult":include_adult
                },
                dataType: "text",
                success: function(msg) {
                    //we need to check if the value is the same
                    var res = JSON.parse(msg)["results"];
                    len = res.length;
                   
                    $(element).css("display", "inline");

                    $(element).text("");
                    if (len == 0)
                    {
                        $(element).append(" <li class='list-group-item list-group-item-action h5 d-flex justify-content-between align-items-center ' " + "> No Rezults</li>");
                    }
                    for (var i in res)
                    {
                        if (res[i]["media_type"] == "movie")
                        {
                             if (res[i]["poster_path"] == null)
                            {
                                $(element).append(" <a tabindex='1' class='list-group-item list-group-item-action h5 d-flex justify-content-between align-items-center ' href='/movie/movie/" + res[i]["id"] + "'><span style='height:60px;width:40px;text-align:center;background-color: lightgrey' class='mr-3'><i style='margin-top:45%' class='fas fa-film fa-lg'></i></span>" + res[i]["title"] + " <small class='text-muted ml-1'> ("+ res[i]["release_date"].slice(0, 4) + ")</small><span class='badge ml-auto'><i class='fas fa-film fa-lg'></i></span></a>");
                            }
                            else
                            {
                                $(element).append(" <a tabindex='1' class='list-group-item list-group-item-action h5 d-flex justify-content-between align-items-center ' href='/movie/movie/" + res[i]["id"] + "'><img height='60px' src='https://image.tmdb.org/t/p/w92" + res[i]["poster_path"] + "' class='mr-3'/>" + res[i]["title"] + " <small class='text-seccondary ml-1'> ("+ res[i]["release_date"].slice(0, 4) + ")</small><span class='badge ml-auto'><i class='fas fa-film fa-lg'></i></span></a>");
                            }  
                        }
                        else if (res[i]["media_type"] == "tv")
                        {
                             if (res[i]["poster_path"] == null)
                            {
                                $(element).append(" <a tabindex='1' class='list-group-item list-group-item-action h5 d-flex justify-content-between align-items-center ' href='/tv/tv/" + res[i]["id"] + "'><span style='height:60px;width:40px;text-align:center;background-color: lightgrey' class='mr-3'><i style='margin-top:45%' class='fas fa-tv fa-lg'></i></span>" + res[i]["name"] + "<span class='badge ml-auto'><i class='fas fa-tv fa-lg'></i></span></a>");
                            }
                            else
                            {
                                $(element).append(" <a tabindex='1' class='list-group-item list-group-item-action h5 d-flex justify-content-between align-items-center ' href='/tv/tv/" + res[i]["id"] + "'><img height='60px' src='https://image.tmdb.org/t/p/w92" + res[i]["poster_path"] + "' class='mr-3'/>" + res[i]["name"] + "<span class='badge ml-auto'><i class='fas fa-tv fa-lg'></i></span></a>");
                            }  
                        }
                         else if (res[i]["media_type"] == "person")
                        {
                             if (res[i]["profile_path"] == null)
                            {
                                $(element).append(" <a tabindex='1' class='list-group-item list-group-item-action h5 d-flex justify-content-between align-items-center ' href='/people/person/" + res[i]["id"] + "'><span style='height:60px;width:40px;text-align:center;background-color: lightgrey' class='mr-3'><i style='margin-top:45%' class='fas fa-user fa-lg'></i></span>" + res[i]["name"] + "<span class='badge ml-auto'><i class='fas fa-user fa-lg'></i></span></a>");
                            }
                            else
                            {
                                $(element).append(" <a tabindex='1' class='list-group-item list-group-item-action h5 d-flex justify-content-between align-items-center ' href='/people/person/" + res[i]["id"] + "'><img height='60px' src='https://image.tmdb.org/t/p/w92" + res[i]["profile_path"] + "' class='mr-3'/>" + res[i]["name"] + "<span class='badge ml-auto'><i class='fas fa-user fa-lg'></i></span></a>");
                            }  
                        }
                    }
                }
            });
        }
}

function moveOnKeyDown(keycode, element) {

  if (keycode == 38)
        {
            if (!$(element).find(".active").length)
            {
                $(element).children().first().addClass("active");   
            } 
            else
            {
                var active = $(element).find(".active");
                var prev = active.prev();
                if (!prev.length)
                {
                    prev = $(element).children().last(); 
                    $(element).animate({scrollTop: '+=3000'}, 0);

                }
                prev.addClass("active");
                active.removeClass("active");
                if (active.prev().length)
                {
                     if ((($(element).children().length - prev.index()) + 1) == 7)
                    {

                        $(element).animate({scrollTop: '-=166'}, 50);                    
                    }
                    else if ((($(element).children().length - prev.index()) + 1) > 7)
                    {
                        $(element).animate({scrollTop: '-=83'}, 0);                    
                    }
                }
            }
        }

         if (keycode == 40)
        {
            if (!$(element).find(".active").length)
            {
                $(element).children().first().addClass("active");   
            } 
            else
            {
                var active = $(element).find(".active");
                var next = active.next();
                if (!next.length)
                {
                    next = $(element).children().first(); 
                    $(element).animate({scrollTop: '=0'}, 0);
                }
                next.addClass("active");
                active.removeClass("active");
                if (active.next().length)
                {
                     if (next.index() == 6)
                    {

                        $(element).animate({scrollTop: '+=249'}, 50);                    
                    }
                    else if (next.index() > 6)
                    {
                        $(element).animate({scrollTop: '+=83'}, 0);                    
                    }
                }
            }
        }

         if (keycode == 13)
         {
             if ($(element).find(".active").length)
            {
                var active = $(element).find(".active");
                var url = active.attr("href");
                window.location.href = url;
            } 
         }     
}


$(function () {

    $("#sample_search").keydown(function (e) {
        var keycode = e.keyCode;
        moveOnKeyDown(keycode,"#search_res");

    });

    $("#sample_search").keyup(function (e) {
        var value = $(this).val();
        var keycode = e.keyCode;
        searchOnKeyUp(keycode,value, "#search_res");
   
    });

     $("#sample_search2").keydown(function (e) {
        var keycode = e.keyCode;
        moveOnKeyDown(keycode,"#search_res2");

    });


     $("#sample_search2").keyup(function (e) {
        var value = $(this).val();
        var keycode = e.keyCode;

        searchOnKeyUp(keycode,value, "#search_res2");
        
    });

     $("#searchButton").click(function(){
        var value = $("#sample_search").val();
        if (value != "")
        {
            window.location.href = "/search/movie?q=" + value;
        }
     });


     $("#searchButton2").click(function(){
        var value = $("#sample_search2").val();
        if (value != "")
        {
            window.location.href = "/search/movie?q=" + value;
        }
     });
});
});