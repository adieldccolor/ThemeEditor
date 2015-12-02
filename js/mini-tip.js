$.fn.miniTip = function(){
    var $element = $(this);

    $element.each(function(){
        var $current = $(this);

        $current.prepend('<div class="t-c"><div class="t-w">' + $current.attr('title') + '</div></div>');
        $current.addClass('has-minitip').removeAttr('title');
    });
}