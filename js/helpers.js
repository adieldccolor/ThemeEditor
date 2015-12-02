/* =Dropdown */
var Dropdown = {


    formatResult: function (repo) {
        if (repo.loading) return repo.text;

        var markup = repo.name;

        return markup;
    }, formatSelection: function(repo){
        return repo.name || repo.text;
    },

    create: function(){
        $('.select-dropdown').select2({ minimumResultsForSearch: Infinity });

    }, destroy: function(){
        $('.select-dropdown').select2('destroy');
    }, setValue: function($select, value){
        $select.val(value).trigger('change');
    }
};


''.trim || (String.prototype.trim = // Use the native method if available, otherwise define a polyfill:
    function () { // trim returns a new string (which replace supports)
        return this.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,'') // trim the left and right sides of the string
    });




var Switches = {
    create: function(){
        $('input.enable-switch').switch();
    }
};

/* toggle switches */
$.fn.switch = function(){
    var $element = $(this);

    $element.each(function(){
        var $current = $(this);

        function checkStatus($current){
            var isChecked = $current.is(':checked');

            $current.closest('.__switch').removeClass('__checked');

            if( isChecked ){
                $current.closest('.__switch').addClass('__checked');
            }
        }

        checkStatus($current);
        $current.on('change', function(){
            checkStatus($current);
        });

    });
};



/* promised */
function promised(callback, timer, name){
    if( typeof name != "undefined" && window["timer-" + name] != undefined ){
        clearTimeout(window["timer-" + name]);
    }

    window["timer-" + name] = setTimeout(callback, timer);
}





/* Colors */
var Colors = {
    create: function(){
        $('.__palette-grid .__single-color a').on('click', function(){
            var color = $(this).attr('data-color');

            $(this).closest('.__single-color').addClass('selected').siblings().removeClass('selected');

            if( $(this).closest('.__single-color').hasClass('__color10') ){
                $("#baseColor").spectrum("toggle");
            }else{
                color.setBaseColor();
                Pace.restart();
            }

            return false;
        });
    }
};




/*
* TweenMax fake
* */

var TweenMax = {
    to: function($el, time, attributes){
        $el.animate(attributes, 0);

        if( attributes.onComplete != undefined && typeof attributes.onComplete == "function" ){
            attributes.onComplete();
        }
    }
};