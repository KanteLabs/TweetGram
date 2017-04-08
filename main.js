$(document).ready(function(){
	var clientID = "719223fe95464479b3004f1f1c5c98b8";
	var clientSecret = "57e4d9be1e274d2c8caf80c5781f5bb6";
	var userID = "id25251860";
	var token = "25251860.719223f.384c002d5e844ab4ba51df9894953bc7";
	var oauthURL = "https://www.instagram.com/oauth/authorize/?client_id=719223fe95464479b3004f1f1c5c98b8&redirect_uri=https://kantelabs.github.io/TweetGram/index.html&response_type=token&scope=basic+public_content+follower_list+comments+relationships+likes";
	var tag = $("#search").val();
	var tagSearch = 'https://api.instagram.com/v1/tags/' + tag + '?access_token=' + token;
	var recentSelf = "https://api.instagram.com/v1/users/self/media/recent?access_token=" + token;
	var likeUrl = "https://api.instagram.com/v1/users/self/media/liked?access_token=" + token;
	
	userInfo();
	selfRecent();
	/* Code for when I add in a demo function to allow the user to launch the app in sandbox mode. The try it function is to allow a user to use their own profile but due to instagrams limitations it won't work for outside users unless they are developers 
	
	$("#demo").click(function(){
		$("#displayInfo").show();
		$(".navbar").show();
		userInfo();
		selfRecent();
		$("#demo").attr("disabled", "");		
	})
	
	$("#try").click(function(){
		onclick="location.href='oauthURL';"
	}) */
	
	//This will provide the userInfo that is display, which in this case will be my profile information which is displayed as a card. 
	function userInfo(){
		$.ajax({
			url:"https://api.instagram.com/v1/users/self/?access_token="+token,
			dataType: 'jsonp',
			type: 'GET',
			success: function(data){
				console.log(data);
				$("#userName").html(data.data.username);
				$("#userBio").html(data.data.bio);
				$("#userPic").attr('src', data.data.profile_picture);				
				$("#profileTiny").attr('src', data.data.profile_picture);				
				$("#userFullname").html(data.data.full_name);
				$("#userFollowing").html('Followers: ' + data.data.counts.followed_by +' | Following: ' + data.data.counts.follows);			
			},
			error: function(data){
				console.log(data);
			}	
		})
	}
	
	//Displays the 12 most recent images of a user. Max is 20. Might expand this to be an optional amount.
	function selfRecent(){
		$.ajax({
			url: recentSelf,
			dataType: 'jsonp',
			type: 'GET',
			data: {access_token: token, count: 12},
			success: function(data){
				console.log(data);				
				for(var x in data.data){
					$('#instaFeed').append('<li class="mdl-card mdl-shadow--6dp"><span class="mdl-badge" data-badge="'+data.data[x].likes.count+'"></span><a href="' +data.data[x].link+ '"><img src="' +data.data[x].images.standard_resolution.url+ '"/></a></li>');
					if(data.data[x].tags != ""){						
						$('#tags').append('<li><a href="'+data.data[x].link+'">'+data.data[x].tags+'</a></li>');
					};
				}
			},
			error: function(data){
				console.log(data);
			}	
		})
	}
	
	function selfLiked(){
		$.ajax({
			url: likeUrl,
			dataType: 'jsonp',
			type: 'GET',
			data: {access_token: token, count: 12},
			success: function(data){
				console.log(data);				
				for(var x in data.data){
					$('#instaFeed').append('<li class="mdl-card mdl-shadow--6dp"><span class="mdl-badge" data-badge="'+data.data[x].likes.count+'"></span><a href="' +data.data[x].link+ '"><img src="' +data.data[x].images.standard_resolution.url+ '"/></a></li>');
				}
			},
			error: function(data){
				console.log(data);
			}	
		})
	}
	
	function tagCount(){
		$.ajax({
			url: tagSearch,
			dataType: 'jsonp',
			type: 'GET',
			success: function(data){
				console.log(data);
				$('#tagcount').html(data.data.media_count);
				$('#tagname').html(data.data.name);
			}
		})
	}
	
	function follows(){
		$.ajax({
			url: "https://api.instagram.com/v1/users/self/follows?access_token=" + token,
			dataType: 'jsonp',
			type: 'GET',
			success: function(data){
				console.log(data);
				console.log(data);
				$("#displayInfo").addClass('mdl-shadow--6dp');
				$("#userName").html(data.data.username);
				$("#userBio").html(data.data.bio);
				$("#userPic").attr('src', data.data.profile_picture);				
				$("#userFullname").html(data.data.full_name);		
			},
			error: function(data){
				console.log(data);
			}	
		})
	}
	
})

