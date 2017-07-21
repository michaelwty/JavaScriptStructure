/****************************************************
                The Module Pattern
****************************************************/
var basketModule = (function() {
    var basket = []; //private
    return { //exposed to public
        addItem: function(values) {
            basket.push(values);
        },
        getItemCount: function() {
            return basket.length;
        },
        getTotal: function(){
           var q = this.getItemCount(),p=0;
            while(q--){
                p+= basket[q].price; 
            }
            return p;
        }
    }
}());

//basketModule is an object with properties which can also be methods
basketModule.addItem({item:'bread',price:0.5});
basketModule.addItem({item:'butter',price:0.3});
 
console.log(basketModule.getItemCount());
console.log(basketModule.getTotal());
 
//however, the following will not work:
console.log(basketModule.basket);// (undefined as not inside the returned object)
console.log(basket); //(only exists within the scope of the closure)

-------------------------------------------------------------------------------------------
(function($) {
    $.jPanelMenu = function(options) {
        var jpm = {
            options: $.extend({
                'animated': true,
                'duration': 500,
                'direction': 'left'
            }, options),
            openMenu: function( ) {
                …
                this.setMenuStyle( );
            },
            closeMenu: function( ) {
                …
                this.setMenuStyle( );
            },
            setMenuStyle: function( ) { … }
        };

        return {
            open: jpm.openMenu,
            close: jpm.closeMenu,
            someComplexMethod: function( ) { … }
        };
    };
})(jQuery);

//API methods and properties will be available through the object returned from the plugin initialization.
var jpm = $.jPanelMenu({
    duration: 1000,
    …
});
jpm.open( );

----------------------------------------------------------------------
var FeedReader = {
 
    settings: {
        feedItemsCount: 10,
        url: 'http://someurl.com/news/feed/',
        feedListing: $('div#feedListing'),
        loadFeedButton: $('a.loadFeed')
    },
 
    init: function () {
        FeedReader.showErrorIfSourceDead();
        FeedReader.bindUI();
    },
 
    bindUI: function () {
        FeedReader.settings.loadFeedButton.on('click', function ( e ) {
            e.preventDefault();
            FeedReader.fetchFeed();
        });
    },
 
    showErrorIfSourceDead: function () {
        if ( FeedReader.isSourceAlive( FeedReader.settings.url ) === false ) {
            alert("The URL provided can't be used to fetch feed.");
        }
    },
 
    isSourceAlive: function () {
       // ...
    },
 
    fetchFeed: function () {
        // Fetch feed from the `FeedReader.settings.url`
        // Append the feed to the `FeedReader.settings.feedListing`
    }
};

/****************************************************
                Object Literal Notation
****************************************************/
var myModule = {
    myProperty : 'someValue',
    //object literals can contain properties and methods.
    //here, another object is defined for configuration
    //purposes:
    myConfig:{
        useCaching:true,
        language: 'en'   
    },
    //a very basic method
    myMethod: function(){
        console.log('I can haz functionality?');
    },
    //output a value based on current configuration
    myMethod2: function(){
        console.log('Caching is:' + (this.myConfig.useCaching)?'enabled':'disabled');
    },
    //override the current configuration
    myMethod3: function(newConfig){
        if(typeof newConfig == 'object'){
           this.myConfig = newConfig;
           console.log(this.myConfig.language); 
        }
    }
};
 
myModule.myMethod(); //I can haz functionality
myModule.myMethod2(); //outputs enabled
myModule.myMethod3({language:'fr',useCaching:false}); //fr


/****************************************************
                The Facade Pattern
****************************************************/
var module = (function() {
    var _private = {
        i:5,
        get : function() {
            console.log('current value:' + this.i);
        },
        set : function( val ) {
            this.i = val;
        },
        run : function() {
            console.log('running');
        },
        jump: function(){
            console.log('jumping');
        }
    };
    return {
        facade : function( args ) {
            _private.set(args.val);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    }
}());
 
 
module.facade({run: true, val:10});
//outputs current value: 10, running


/****************************************************
                The Mediator Pattern
****************************************************/
var mediator = (function(){
    var subscribe = function(channel, fn){
        if (!mediator.channels[channel]) mediator.channels[channel] = [];
        mediator.channels[channel].push({ context: this, callback: fn });
        return this;
    },
 
    publish = function(channel){
        if (!mediator.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
            var subscription = mediator.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };
 
    return {
        channels: {},
        publish: publish,
        subscribe: subscribe,
        installTo: function(obj){
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
 
}());

//Pub/sub on a centralized mediator
 
mediator.name = "tim";
mediator.subscribe('nameChange', function(arg){
        console.log(this.name);
        this.name = arg;
        console.log(this.name);
});
 
mediator.publish('nameChange', 'david'); //tim, david
 
 
//Pub/sub via third party mediator
 
var obj = { name: 'sam' };
mediator.installTo(obj);
obj.subscribe('nameChange', function(arg){
        console.log(this.name);
        this.name = arg;
        console.log(this.name);
});
 
obj.publish('nameChange', 'john'); //sam, john


/****************************************************
                Beware Anonymous Functions
****************************************************/
// BAD
$( document ).ready(function() {
 
    $( "#magic" ).click(function( event ) {
        $( "#yayeffects" ).slideUp(function() {
            // ...
        });
    });
 
    $( "#happiness" ).load( url + " #unicorns", function() {
        // ...
    });
 
});
 
// BETTER
var PI = {
 
    onReady: function() {
        $( "#magic" ).click( PI.candyMtn );
        $( "#happiness" ).load( PI.url + " #unicorns", PI.unicornCb );
    },
 
    candyMtn: function( event ) {
        $( "#yayeffects" ).slideUp( PI.slideCb );
    },
 
    slideCb: function() { ... },
 
    unicornCb: function() { ... }
 
};
 
$( document ).ready( PI.onReady );
