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
