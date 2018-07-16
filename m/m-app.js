var menu = false;







$(document).ready(function(){



  /*

  Sidebar toggle and and hidding it when clicking outside

  */

 

  $("#sidebar-toggle").click(function() {

    if (menu == false)

    {

      menu = true;

    

        $("#sidebar").css("visibility", "visible");

        $("#sidebar").height("100%")

        event.stopPropagation();

    }

    else

    {

      menu = false;

        $("#sidebar").css("visibility", "hidden");

        event.stopPropagation();

    }

  });



     $("#sidebar").on("click", function(event)

      {

        

        event.stopPropagation();

  

      });





    $(document).on("click", function(event)

    {

    $("#sidebar").css("visibility", "hidden");

    });



//



/*

  Serchbar results and and hidding it when clicking outside

*/



 var searchbarD = $("#search_res").css("display");





$(".searchbar").on("click", function(event)

{

    

    $("#search_res").css("display", searchbarD);

    event.stopPropagation();

});





$(document).on("click", function(event)

{

     searchbarD = $("#search_res").css("display");



    $("#search_res").css("display",  "none" );

});



//

/*

serchbar2

*/

 var searchbarD2 = $("#search_res2").css("display");



$(".searchbar2").on("click", function(event)

{

    

    $("#search_res2").css("display", searchbarD2);

    event.stopPropagation();

});





$(document).on("click", function(event)

{

     searchbarD2 = $("#search_res2").css("display");



    $("#search_res2").css("display",  "none" );

});







$(".sm-search-button").click(function() {

    // $(".serchbar-col2").removeClass("d-none");

    // $(".serchbar-col2").addClass("d-block");

     $(".serchbar-col2").css("visibility", "visible");



  $("#navbar > *:not(.serchbar-col2)").css("visibility", "hidden");

    // $("#navbar").append('<div class=" col-12 mx-auto d-none d-md-none serchbar-col2 d-none m-0 p-0"> <div class="input-group searchbar "> <button class="btn btn-secondary" type="button"><i class="fa fa-long-arrow-left"></i></button> <input type="text" class="form-control " id="sample_search" placeholder="Search for..." aria-label="Search for..." > <span class="input-group-btn"> <button class="btn btn-secondary" type="button"><i class="fa fa-search"></i></button> </span> <ul tabindex='1' id="search_res" class="position-fixed px-0 pb-5 mt-5" style="z-index:10; overflow-y: auto;height: 100%;display:none;"> </ul> </div> </div>');

});



$(".back-navbar").click(function() {

     $(".serchbar-col2").css("visibility", "hidden");

     $("#navbar > *:not(.serchbar-col2)").css("visibility", "visible");

});



//





$('.btn-toggle').click(function() {

    $(this).find('.btn').toggleClass('active');  

    

    if ($(this).find('.btn-primary').length>0) {

      $(this).find('.btn').toggleClass('btn-primary');

    }

       

});





var navZindex = 1300;

//mobile bottom navbar movie and tv

$('#bottomNavbarMovie').click(function(){

  navZindex++;

  $('#navbar-movie').toggle();

  $('#navbar-movie').css("z-index", navZindex);

  $('#navbar-tv').css("display", "none");

});



$('#bottomNavbarTv').click(function(){

  navZindex++;

  $('#navbar-tv').toggle();

  $('#navbar-tv').css("z-index", navZindex);

  $('#navbar-movie').css("display", "none");



});





/*

Cauntdown on failed login attempts 

*/

var sec = $("#counter").text().match(/\d+/);

console.log(sec);



if(sec != null)

{

  sec= sec[0];

  var x = setInterval(function() {



    console.log(sec);

    sec -= 1;

    // If the count down is finished, write some text 

    

    $("#counter").text("Too many login attempts. Please try again in " + sec + " seconds.");

   if (sec <= 0) {

      $("#counter").text(" ");

      clearInterval(x);

    }

  }, 1000);



}

$('.lazyload').lazyload();







//



function onReady(callback) {

    var intervalID = window.setInterval(checkReady, 0);



    function checkReady() {

        if (document.getElementsByTagName('body')[0] !== undefined) {

            window.clearInterval(intervalID);

            callback.call(this);

        }

    }

}



function show(id, value) {

    document.getElementById(id).style.display = value ? 'block' : 'none';

}







onReady(function () {

    show('page-content', true);

    show('loading', false);

    //movie slide

  $('.movie_slide').slick({

    infinite: false,

    dots: false,

    edgeFriction:20,

    slidesToShow: 6,

    speed: 200,

    respondTo:"min",

    slidesToScroll: 1,

    responsive: [

    {

      breakpoint: 1500,

      settings: {

        slidesToShow: 5,

        respondTo:"min"

      }

    },

    {

      breakpoint: 1300,

      settings: {

        slidesToShow: 4,

         respondTo:"min"

      }

    }, 

    {

      breakpoint: 1100,

      settings: {

        slidesToShow: 3,

         respondTo:"min"

      }

    },

    {

      breakpoint: 770,

      settings: {

        slidesToShow: 2,

         respondTo:"min"

      }

    },

    {

      breakpoint: 480,

      settings: {

        slidesToShow: 1,

         respondTo:"min"

      }

    }]

  });

//

//people slide

  $('.people_slide').slick({

    infinite: true,

    dots: false,

    edgeFriction:20,

    slidesToShow: 8,

    speed: 200,

    respondTo:"min",

    slidesToScroll: 1,

    responsive: [

    {

      breakpoint: 1500,

      settings: {

        slidesToShow: 12,

        respondTo:"min"

      }

    },

    {

      breakpoint: 1300,

      settings: {

        slidesToShow: 8,

         respondTo:"min"

      }

    }, 

    {

      breakpoint: 1100,

      settings: {

        slidesToShow: 6,

         respondTo:"min"

      }

    },

    {

      breakpoint: 770,

      settings: {

        slidesToShow: 4,

         respondTo:"min"

      }

    },

    {

      breakpoint: 480,

      settings: {

        slidesToShow: 2,

         respondTo:"min"

      }

    }]

  });

});





});



