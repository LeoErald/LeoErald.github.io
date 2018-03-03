$(document).ready(function(){
    $('.movieButtons').click(function() {
        var status = $(this).children().first().hasClass('text-secondary');
        if($(this).children().first().hasClass('favorite'))
        {
          var action =  'favorite';
        }
        else if($(this).children().first().hasClass('watchlist'))
        {
          var action = 'watchlist';
        }
        id = $(this).attr("movieId");
        type = $(this).attr("cinemaType");

        $(this).children().first().toggleClass('active');  
        $(this).children().first().toggleClass('text-secondary'); 

var data = {};

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
  }
});

xhr.open("GET", "/"+type+"/action?action="+action+"&id="+id+"&status="+ status);
xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

xhr.send(data);
if (action == "favorite")
{
  action = "favorite list";
}
if (type == "movie")
{
  type = "Movie";
}else
{
  type = "Tv show";

}
if (status)
{
var msg = type + " successfully added to "+action+"!";
}
else
{
var msg = type + " successfully removed from "+action+"!";
}
notify(msg);


});



  $('.closeButton').click(function() {
     
        var id = $(this).attr("movieId");
         var type = $(this).attr("cinemaType");
         $(this).parent().parent().parent().remove();
         var data = {};

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
          }
        });
        
        xhr.open("GET", "/user/lists/remove?id="+id+"&type="+type+"&list_id="+list_id);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
        
        xhr.send(data);
               notify("Item successfully removed from list!");
});


$('.listsButton').click(function() {
  id = $(this).attr("movieID");
  type = $(this).attr("cinemaType");
});
  $('.lists-item').click(function() {
      var listId = $(this).attr("listId");

      var data = {};
  
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
    }
    });
    
    xhr.open("GET", "/user/lists/addToList?id="+id+"&type="+type+"&listId="+listId);
    xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
    
    xhr.send(data);
      notify("Item successfully added to list!");
  }); 

    function notify(msg)
    {
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
  z_index: 100000,
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
});