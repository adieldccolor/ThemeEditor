$.fn.confirm = function(settings){

    var $modal = $(this);

    if( typeof settings != 'object' ){
        if( settings == "close" )
        {
            $modal.removeClass('js-modal-open');
        }

        if( settings == "open" )
        {
            $modal.addClass('js-modal-open');
        }


        return true;
    }

    var hasTitle            = settings.title != undefined,
        hasMessage          = settings.message != undefined,
        hasConfirm          = settings.acceptButton != undefined,
        hasCancel           = settings.cancelButton != undefined;

    //set title
    $modal.find('.modal-title').text("").hide();
    if( hasTitle ){
        $modal.find('.modal-title').text(settings.title).show();
    }

    //set message
    $modal.find('.modal-message').text("").hide();
    if( hasMessage ){
        $modal.find('.modal-message').html(settings.message).show();
    }

    //set buttons
    $modal.find('.content-footer').html("");
    if( !hasConfirm && !hasCancel ){
        $modal.find('.content-footer').html('<a href="javascript:;" class="modal-confirmation-accept">Ok</a>');
    }

    if( hasConfirm ){
        $modal.find('.content-footer').html('<a href="javascript:;" class="modal-confirmation-accept">'
            + settings.acceptButton + '</a>');
    }

    if( hasCancel ){
        $modal.find('.content-footer').append('<a href="javascript:;" class="modal-confirmation-cancel">'
            + settings.cancelButton + '</a>');
    }





    //resize
    var modalWidth = $modal.find('.confirmation-modal-content-wrapper').outerWidth(),
        modalHeight = $modal.find('.confirmation-modal-content-wrapper').outerHeight();

    $modal.find('.confirmation-modal-content').css({ marginTop: - modalHeight/2, marginLeft: - modalWidth/2 });

    //show
    $modal.addClass('js-modal-open');


    var shakeTween = function(item, repeatCount){
        var lastR = 10;
        function rand(){
            var r = lastR;
            if( r > 0 ){
                lastR = -10;
            }else{
                lastR = 10;
            }
            return r;
        }

        TweenMax.to(item,0.1,{repeat:repeatCount-1, x: rand(), delay: 0});
        TweenMax.to(item,0.1,{y:0, x:0, delay:(repeatCount) * .1});
    }



    $modal
        .on('click', '.modal-confirmation-accept', function(){
            $modal.removeClass('js-modal-open');

            if( typeof settings.onAccept == "function" ){
                settings.onAccept();
            }

            settings.onAccept = function(){};
        })

        .on('click', '.modal-confirmation-cancel', function(){
            $modal.removeClass('js-modal-open');

            if( typeof settings.onCancel == "function" ){
                settings.onCancel();
            }

            settings.onCancel = function(){};
            settings.onAccept = function(){};
        })

        .on('click', '.overlay', function(){

            var $elem = $modal.find('.confirmation-modal-content-wrapper');

            shakeTween($elem, 5);

        })


    ;

    return settings;


}