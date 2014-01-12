
	$(function(){
		$(".service").hover(function(){$("#networks").addClass($(this).data("network")).addClass("active");
		$("#networks p").html($(this).data("tip"))},function(){
			$("#networks").removeClass();
		});
	
		if($(window).height() > 990){
			$("#hero").height($(window).height());
			$("#hero").css("min-height","990px");
			$("#networks").height($(window).height());
			$("#networks").css("min-height","990px");
			$(".container").css("padding-top",($(window).height()/2 - 53))


			$(window).resize(function(){
				$("#hero").height($(window).height());
				$("#hero").css("min-height","990px")
				$("#networks").height($(window).height());
				$("#networks").css("min-height","990px")
			})
		}
		$('ul.slides li a').click(function(e){
			e.preventDefault();
		})
	});
	jQuery(document).ready(function(e){e(".scroll").click(function(t){t.preventDefault();e("html,body").animate({scrollTop:e(this.hash).offset().top},1e3)})});

	function showLive(data){

	  var feed = data.feed;
	  var entries = feed.entry || [];


	  if (entries.length > 0) {
	  	var liveVideo = entries[0];//ASSUME: there is only 1 live event at a time
	    var url = liveVideo.content.src;
	    //the following is pretty hacky, we should be using api v3 and passing the format param to get the real ID back
	    liveId = url.replace("https://gdata.youtube.com/feeds/api/users/Firestartersmusic/live/videos/", "").replace("?v=2", "");
	    
	    embedVideo(liveId, 'playerContainer');
	    //embedVideo(getVideoId('www.youtube.com/embed/4oHl9gJfQWs?rel=0'), 'playerContainer');
	  }else {
	  	//alert('no live vids')
	  }

	}

	function showVideos(data) {
	  var feed = data.feed;
	  var entries = feed.entry || [];
	  var html = [' '];


	  for (var i = 0; i < entries.length; i++) {
	    var entry = entries[i];
	    var date = new Date(Date.parse(entry.media$group.yt$uploaded.$t));
	    var newDate = moment(date).format("MMMM Do YYYY");
	    var title = entry.title.$t;
	    var thumbnailUrl = entries[i].media$group.media$thumbnail[2].url;
	    var playerUrl = entries[i].media$group.media$content[0].url;
	    html.push('<li onclick="embedVideo(\'', getVideoId(playerUrl), '\', \'playerContainer\', true)"><a href="#">', '<img src="', thumbnailUrl, '" />','<span class="d-hover"><p><b>', title+'</b><br>'+newDate, '</p></span>', '</a></li>');
	  }
	  $(".slides").html(html.join(""))
	}

	function embedVideo(video_id, elem, initialLoad){
		initialLoad = initialLoad || 0;
		document.getElementById(elem).innerHTML = '<iframe id="ytplayer" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/'+video_id+'?autoplay=1&vq=hd720" frameborder="0"/>';
		if(initialLoad) {$("html, body").animate({scrollTop: $('#'+elem).offset().top -25 });}
	}

	function getVideoId(url){
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		var match = url.match(regExp);
		if (match&&match[2].length==11){
		    return match[2];
		}else{
		    //error
		}
	}
