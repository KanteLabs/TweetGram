var clientID = "719223fe95464479b3004f1f1c5c98b8";
var clientSecret = "57e4d9be1e274d2c8caf80c5781f5bb6";
var userID = "id25251860";
var token = "25251860.719223f.384c002d5e844ab4ba51df9894953bc7";
var oauthURL = "https://www.instagram.com/oauth/authorize/?client_id=719223fe95464479b3004f1f1c5c98b8&redirect_uri=http://tweetgram.herokuapp.com/access-token&response_type=token&scope=basic+public_content+follower_list+comments+relationships+likes";
var num_photos = 12;
var filterSearch = "text";
var filterSearchUrl = 'https://api.instagram.com/v1/tags' + filterSearch + '/media/recent?access_token=' + token;
var recentSelf = "https://api.instagram.com/v1/users/self/media/recent?access_token=" + token;

$.ajax({
	url: recentSelf,
	dataType: 'jsonp',
	type: 'GET',
	data: {access_token: token, count: num_photos},
	success: function(data){
		console.log(data);
		for(var x in data.data){
			$('ul').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>'); 
		}
	},
	error: function(data){
		console.log(data);
	}
	
});