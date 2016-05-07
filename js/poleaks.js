

$(document).ready(function(){
	var apiKey = 'AIzaSyBH8-WrN8tdAYVGuF43gWg6ONO9HlHrP70';
	var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=date&q=police+leak&type=video&key=" + apiKey;
	$.ajax({
		url: url
	}).then(function(response) {

		response.items.forEach(function(result, i){

				var videoUrl = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + result.id.videoId + "&key=" + apiKey;
				var viewCountAjax = $.ajax({ url: videoUrl });
				var commentsUrl = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId="+ result.id.videoId +"&key=" + apiKey;
				var commentsAjax = $.ajax({ url: commentsUrl });
			
			$.when(viewCountAjax, commentsAjax).then(function(videoResponse, commentsResponse) {
				
				var commentsText = '';
				var $comments = $('<div class="comments">');
				var $commentsText = $('<div class="comments-text">');

				var $newItem = $('<div>').addClass('col-sm-6 leak');
				var newImageUrl = result.snippet.thumbnails.high.url;
				var $newImage = $('<img>').attr('src', newImageUrl);
				var $newItemMetaContent = $('<div>').addClass('leak-meta-content');
				$newItemMetaContent.attr('data-video-id', result.id.videoId);
				$newItemMetaContent.append('<div class="leak-overlay-content"><div class="view-count">' + videoResponse[0].items[0].statistics.viewCount + ' Views</div><div class="cursor"></div><div class="triangle-right"></div><p class="leak-title">' +  result.snippet.title + '</p></div>')
				$newItemMetaContent.append($newImage);
				$newItem.append($newItemMetaContent);
				$newItem.append('<div class="player-wrapper"><iframe class="player"></iframe></div>');
				$newItem.find('.player-wrapper').hide();

	

				commentsResponse[0].items.forEach(function(commentObject, i) {
					commentsText += commentObject.snippet.topLevelComment.snippet.textDisplay;
				});

				$comments.append($commentsText);
				$commentsText.html(commentsText);
				$commentsText.find('br').remove();


				$newItem.append($comments);
				$('.leaks').append($newItem);
				$commentsText.marquee({ speed: 7});

			});

			


		})

	});


	$('.leaks').on('click touchstart', '.leak-meta-content', function() {
			$('.player').attr('src', null); 
			$('.player-wrapper').hide(); //hide all currently running players
			$('.leak-meta-content').show(); //show all leak metacontents again 
			$(this).hide()
			$(this).next('.player-wrapper').find('.player').attr('src', "http://youtube.com/embed/" + $(this).data('video-id') + '?autoplay=1'); 
			$(this).next('.player-wrapper').show();
	});






	//HAHA cursor gif
	// Set the offset so the the mouse pointer matches your gif's pointer
	var cursorOffset = {
	 left : 15,
	  top  : 15
	}

	$('body').on("mousemove mousewheel", function (e) {
			$('.cursor').offset({ 
	     left: (e.pageX - cursorOffset.left)
	   , top : (e.pageY - cursorOffset.top)
	  })
		
	  
	});
});

