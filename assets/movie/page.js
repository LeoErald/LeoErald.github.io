$(document).ready(function(){
  
  $("#star-close").click(function() {
      $('select').barrating('clear');
    $("#my-rating").text("-");


var value = $("#rate-stars").val();

rate(id, type, value, "DELETE", "Rating removed successfully")

  });

  $("#rate-save").click(function() {
    $("#my-rating").text($("#rate-stars").val());
var id = $(this).attr("movieId");
var type = $(this).attr("cinemaType");
var value = $("#rate-stars").val();

rate(id, type, value, "POST", "Rating was successful")
    // alert($("#rate-stars").val());
  });

  $("#comboScore").click(function() {
var imdb_rate = Number($('.imdbRatingPlugin').text().split('/', 1)[0]);
var  imdb_count =Number($('.imdbRatingPlugin').text().split('/10').pop().split(' ')[0].replace(',', '').replace(',', ''));
console.log(imdb_count );
console.log(imdb_rate);
   $("#comboDisplay").html("<h1 class='h1-score'><span class='badge badge-light' title='Combined rating of TMDB and IMDB'>"+(Math.round((tmdb_rate * tmdb_count + imdb_rate * imdb_count)/(tmdb_count + imdb_count) * 100 )/ 100)+"</span></h1><small>combo score</small>");
  });

function rate(id, type, value, request, msg)
{

    var data = {};

 var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
  }
});

xhr.open("GET", "/"+type+"/rate?id="+id+"&value="+ value+"&request=" + request);
xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

xhr.send(data);

$.notify({
  // options
  icon: 'glyphicon glyphicon-warning-sign',
  title: '',
  message: msg,
  url: 'https://github.com/mouse0270/bootstrap-notify',
  target: '_blank'
},{
  // settings
  element: 'body',
  position: null,
  type: "info",
  allow_dismiss: true,
  newest_on_top: false,
  showProgressbar: false,
  placement: {
    from: "bottom",
    align: "right"
  },
  offset: 20,
  spacing: 10,
  z_index: 1031,
  delay: 1000,
  timer: 500,
  url_target: '_blank',
  mouse_over: null,
  animate: {
    enter: 'animated fadeInDown',
    exit: 'animated fadeOutUp'
  },
  onShow: null,
  onShown: null,
  onClose: null,
  onClosed: null,
  icon_type: 'class',
  template: '<div data-notify="container" class="col-xs-11 border border-{0} col-sm-3 alert alert-{0}" role="alert">' +
    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
    '<b><span data-notify="message">{2}</span></b>' +
    '<div class="progress" data-notify="progressbar">' +
      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
    '</div>' +
  '</div>' 
}); 
}

var castSeeAll = true;
 $("#cast-see-all").click(function() {
if (castSeeAll) {
  $.ajax({
  url: "/json/"+type+"/cast?id="+id,
  cache: false
})
  .done(function( html ) {
       if (html != "")
    {
     $( ".cast-modal-body" ).html( html );
    }
    else
    {
     $( ".cast-modal-body" ).html("<p class='text-center'>We don't have any cast added to this movie.</p>");
    }
  });
}
castSeeAll = false;
 });

 var crewSeeAll = true;
 $("#crew-see-all").click(function() {
if (crewSeeAll) {
  $.ajax({
  url: "/json/"+type+"/crew?id="+id,
  cache: false
})
  .done(function( html ) {
     if (html != "")
    {
     $( ".crew-modal-body" ).html( html );
    }
    else
    {
     $( ".crew-modal-body" ).html("<p class='text-center'>We don't have any crew added to this movie.</p>");
    }
  });
}
crewSeeAll = false;
 });


  $('.tabs .tab').click(function(){
    var tab_id = $(this).attr('id');

    $('.tabs .tab').removeClass('text-primary');
    $('.tabs .tab').addClass('text-secondary');
    $('.tab-content').removeClass('current');

    $(this).removeClass('text-secondary');
    $(this).addClass('text-primary');
    $("#"+tab_id+"-content").addClass('current');
  });

var tabvideos = true;
 $("#tab-videos").click(function() {
if (tabvideos) {
  $.ajax({
  url: "/json/"+type+"/videos?id="+id,
  cache: false
})
  .done(function( html ) {
    if (html != "")
    {
     $( "#tab-videos-content" ).html( html );
    }
    else
    {
     $( "#tab-videos-content" ).html("We don't have any videos for this movie.");
    $( "#tab-videos-content" ).css("height", "20px");
    }
    
  });
}
tabvideos = false;
 });

var tabposters = true;
 $("#tab-posters").click(function() {
if (tabposters) {
  $.ajax({
  url: "/json/"+type+"/posters?id="+id,
  cache: false
})
  .done(function( html ) {
      if (html != "")
    {
     $( "#tab-posters-content").html( html );
    }
    else
    {
     $( "#tab-posters-content").html("We don't have any posters for this movie.");
     $( "#tab-posters-content").css("height", "20px");
    }

     $(".fullscreen-image").click(function() {
  $('#modal-body-image').attr('src', $(this).parent().find('img').attr('src-fullscreen'));
      $('#image-modal').modal('show');   
 });
  });
}
tabposters = false;
 });

var tabbackdrops = true;
 $("#tab-backdrops").click(function() {
if (tabbackdrops) {
  $.ajax({
  url: "/json/"+type+"/backdrops?id="+id,
  cache: false
})
  .done(function( html ) {
    if (html != "")
    {
      $( "#tab-backdrops-content" ).html( html );
    }
    else
    {
      $( "#tab-backdrops-content" ).html("We don't have any backdrops for this movie.");
      $( "#tab-backdrops-content" ).css("height", "20px");
    }

 $(".fullscreen-image").click(function() {
  $('#modal-body-image').attr('src', $(this).parent().find('img').attr('src-fullscreen'));
      $('#image-modal').modal('show');   
 });

  });
}
tabbackdrops = false;
 });


 $(".fullscreen-image").click(function() {
  $('#modal-body-image').attr('src', $(this).parent().find('img').attr('src-fullscreen'));
      $('#image-modal').modal('show');   
 });

 var showChar100 = 100;
 var showChar300 = 300;  // How many characters are shown by default
   // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more";
    var lesstext = "Show less";
    

    $('.big-text-100').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar100) {
 
            var c = content.substr(0, showChar100);
            var h = content.substr(showChar100, content.length - showChar100);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 console.log(html);
            $(this).html(html);
        }
 
    });


    $('.big-text-300').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar300) {
 
            var c = content.substr(0, showChar300);
            var h = content.substr(showChar300, content.length - showChar300);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
 
    });
 
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        if ($(this).parent().prev().css("display") == "none")
        {
          $(this).parent().prev().css("display", "inline"); 
        }
        else
        {
          $(this).parent().prev().css("display", "none"); 

        }

        if ($(this).prev().css("display") == "none")
        {
          $(this).prev().css("display", "inline"); 
        }
        else
        {
          $(this).prev().css("display", "none"); 

        }
      
        return false;
    });

    $(".season-button").click(function(){
      var seasonNr = $(this).attr("seasonNr");
  $.ajax({
    url:  "/json/tv/episodes?seasonNr=" + seasonNr + "&id=" + id,
    cache: false
  })
    .done(function( html ) {
         if (html != "")
      {
       $("#collapse"+seasonNr).first().html(html);
      }
    });

    });
      $(".fullscreen-image").click(function() {
  $('#modal-body-image').attr('src', $(this).parent().find('img').attr('src-fullscreen'));
      $('#image-modal').modal('show');   
    });

});