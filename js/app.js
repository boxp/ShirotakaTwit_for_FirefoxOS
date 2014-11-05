// oauthオブジェクト
var oauth;

window.onload = function () {
	//ボタンクリックで認証開始
	$("#firstButton").click(function(){
		// OAuth関連の処理を開始する
		firstOAuthFunc();
	});

	$("#secondButton").click(function() {
		var myUrl = "https://twitter.com/"
		var activity = new MozActivity({
			name:"view",
			data:{
				type:"url",
				url:myUrl
			}
		});
	});
};
 
/**
* OAuth関連で最初に行う処理
*/
var firstOAuthFunc = function () {

// 最初にOAuthオブジェクトに喰わせる値たち
var config = {
	consumerKey:"コンシューマーキー",
	consumerSecret:"シークレットキー",
	requestTokenUrl:"https://api.twitter.com/oauth/request_token",
	authorizationUrl:"https://api.twitter.com/oauth/authorize",
	accessTokenUrl:"https://api.twitter.com/oauth/access_token"
};

// OAuthのオブジェクトを作成
oauth = new OAuth(config);

// 1. consumer key と consumer secret を使って、リクエストトークンを取得する
oauth.fetchRequestToken(successFetchRequestToken, failureHandler);
};

/**
* 1の処理の成功時のコールバック関数
*/
var successFetchRequestToken = function (authUrl) {

	//URLを訂正
	var tmp = authUrl.indexOf("&");
	var authUrl2 = authUrl.substring(0,tmp);


// 2. リクエストトークンを使い、ユーザにアクセス許可を求めるURLを生成して ブラウザを起動
// 3. ブラウザで認証を行い、ユーザーにPINが表示される
var activity = new MozActivity({
	name:"view",
	data:{
		type:"url",
		url:authUrl2
	}
});

setTimeout("",5000);

// 4. アプリで用意したダイアログにPIN を入力してもらう
var pin = prompt("Please enter your PIN", "");

// oauthオブジェクトにPINをセット
oauth.setVerifier(pin);

// 5. consumer key, consumer secret, リクエストトークン, PIN を使って、アクセストークンを取得する
oauth.fetchAccessToken(successFetchAccessToken, failureHandler);
};

/**
* 5の処理の成功時のコールバック関数
*/
var successFetchAccessToken = function () {
	alert("success oauth");
};

/**
* 各処理失敗時のコールバック関数
*/
var failureHandler = function (data) {
	alert("failure");
};



 /*window.onload = function(){
	//clickボタン遷移
	$("#firstButton").click(function() {
		document.querySelector('#newSection').className = 'current';
		document.querySelector('[data-position="current"]').className = 'left';
	});

	$("#backButton").click(function() {
		document.querySelector('#newSection').className = 'right';
		document.querySelector('[data-position="current"]').className = 'current';
	});

	//webボタン遷移
	$("#secondButton").click(function() {
		var myUrl = "http://pronama.azurewebsites.net/"
		var activity = new MozActivity({
			name:"view",
			data:{
				type:"url",
				url:myUrl
			}
		});
	});

}; */