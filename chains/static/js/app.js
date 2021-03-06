var app = app || {};

$(function($) {
    'use strict';

    // Set up utilities
    app.utils = {
        SECONDS_PER_DAY: 86400
    };

    app.nav = {
        showChains: function() {
            bb.pushScreen('chains.html', 'chainscreen');
        },

        showPaymentInfo: function() {
            bb.pushScreen('stripe.html', 'paymentinfo');
        }
    }
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null) {
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

document.addEventListener("webworksready", function() {
    bb.init({
        actionBarDark: true,
        controlsDark: true,
        listsDark: false,

        ondomready: function(element, id) {
            var chainSet, view;

            if (id === 'login') {
                setClickHandlers();
            }

            if (id === 'chainscreen') {
                app.chainSet = new app.ChainSet();
                app.chainsView = new app.ChainsView({
                    set: app.chainSet
                });
            }

            if (id == "proof") {
                view = new app.ProofView();
            }

            if (id == "paymentinfo") {
                view = new app.PaymentInfoView({
                });
            }

            if (id == "newchain" ) {
                view = new app.NewChainView({
                    delegate: app.chainsView.createNewChain
                });
            }
        }
    });

    if (getParameterByName("share")) {
        app.nav.showChains();
    } else {
        initLogin();
    }
});

/**
 *  called by the webworksready event when the environment is ready
 */
function initLogin() {
    // Facebook OAuth
    authCode = null;
    childWindow = null;

    // setup our Facebook credentials, and callback URL to monitor
    facebookOptions = {
        clientId: '577335762285018',
        clientSecret: 'b7cfd33ac48a2a56feed235b792e9b85',
        redirectUri: 'http://dontbreakthechain.herokuapp.com/static/index.html'
    };

    // (bbUI) push the login.html page
    bb.pushScreen('login.html', 'login');
}

/**
 *  Set click handlers for the OAuth Start button
 *  Note: window.open can only be triggered in this way, you must set a click handler for this.
 */
function setClickHandlers() {
    console.log('set click handlers');

    var link = document.getElementById('btnLogin');
    link.addEventListener('click', function(e) {

        // if the childWindow is already open, don't allow user to click the button
        if(childWindow !== null) {
            return false;
        }

        e.preventDefault();
        toast('Contacting Facebook...');
        setTimeout(function() {
            startOAuth();
        }, 500);
    });
}

/**
 *  Start the OAuth process by opening a childWindow, and directing the user to authorize the app
 */
function startOAuth() {
    // open the authorzation url
    var url = 'https://www.facebook.com/dialog/oauth?client_id=' + facebookOptions.clientId + '&redirect_uri=' + facebookOptions.redirectUri + '&scope=publish_stream,read_stream';
    childWindow = window.open(url, '_blank');

    // evaluate the url every second, when facebook redirects to our callback url, the following if statements gets fired
    window.int = self.setInterval(function() {

        var currentURL = childWindow.location.href;
        var callbackURL = facebookOptions.redirectUri;
        var inCallback = currentURL.indexOf(callbackURL);

        // location has changed to our callback url, parse the oauth code
        if(inCallback === 0) {

            // stop the interval from checking for url changes  
            window.clearInterval(int);

            // parse the oauth code
            var code = childWindow.window.location.search;
            code = code.split('code=');
            code = code[1];
            window.authCode = code;

            // close the childWindow
            childWindow.close();

            setTimeout(function() {
                getAccessToken();
            }, 1000);
        }
    }, 1000);
}

/**
 *  echange the oauth code, from an access token
 */
function getAccessToken() {
    toast('Fetching access token...');
    var url = 'https://graph.facebook.com/oauth/access_token?client_id=' + facebookOptions.clientId + '&redirect_uri=' + facebookOptions.redirectUri + '&client_secret=' + facebookOptions.clientSecret + '&code=' + authCode;

    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            var response = data;

            // parse 'access_token' from the response
            response = response.split('&');
            var theAccessToken = response[0].split('=');
            window.accessToken = theAccessToken[1];

            // get authenticated users' info/name
            getUserInfo();
        },

        error: function(data) {
            alert('Error getting access_token: ' + data.responseText);
            return false;
        }
    });
}

/**
 *  get users info (we're grabbing their full name for this sample)
 */
function getUserInfo() {
    var url = 'https://graph.facebook.com/me?access_token=' + accessToken;

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function(data) {
            console.log('Logged in as ' + data.name + ' (ID:' + data.id + ')');


            $.post("http://dontbreakthechain.herokuapp.com/api/v1/login/facebook/",
                { userID: data.id, token: accessToken },
                function(response) {
                    window.user_pk = response.pk;
                    if(response.has_stripe)
                        app.nav.showChains();
                    else
                        app.nav.showPaymentInfo();
                });
        },

        error: function(data) {
            alert('Error getting users info: ' + data.responseText);
            return false;
        }
    });


    
}

function fbLogout() {
    $.post("https://www.facebook.com/logout.php", { access_token: token, confirm: 1 });
    bb.pushScreen('login.html', 'login');
}

/**
 *  helper function to display a toast message to the user
 */
function toast(msg) {
    console.log('Toast: ' + msg);
    // blackberry.ui.toast.show(msg);
}
