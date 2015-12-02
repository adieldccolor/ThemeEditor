var ThemeBuilder = {};
var path = {
    client: '/',
    server: '/',
    template: ''
};

/*
* Load all configuration for this template
* */
ThemeBuilder.loadConfiguration = function(){
    $.getJSON('config.json', function(data){
        log(data);
    });
};





/*
 * Set Base color, generate color scheme based on single color
  * */
ThemeBuilder.setBaseColor = function(color){

    if( $('#themeFrame').length > 0 && document.themeFrame!= undefined ){
        document.themeFrame.ThemeBuilder.frameBaseColor(color);
    }


    color = String(color);

    less.modifyVars({'@baseColor': color});
    ThemeBuilder.settings.baseColor = color;

    $('.__selected-color').css({ backgroundColor: color }).text(color);

    for( var i=0; i<ThemeBuilder.settings.variables.length; i++ ){
        $('.genColor[data-color-var="' + ThemeBuilder.settings.variables[i].key.slice(1) + '"]')
            .spectrum("set", ThemeBuilder.settings.variables[i].value);
    }

    //Experimental variable update
    getInCodeVariablesOnTheFly();

    $('[data-color-var="baseColor"]').spectrum('set', color);

    createSchemeGraphics(ThemeBuilder.settings.variables);

    //modify vars based on baseColor
    /*ThemeBuilder.settings.h1_color = color;
    ThemeBuilder.settings.h2_color = desaturate(darken(color, 10), 30);
    ThemeBuilder.settings.h3_color = desaturate(darken(color, 5), 20);
    ThemeBuilder.settings.masthead_bg = desaturate(darken(color, 10), 40);
    ThemeBuilder.settings.subnav_bg = desaturate(darken(color, 30), 40);
    ThemeBuilder.settings.baseColor_darkenVariation = desaturate(darken(color, 10), 40);
    ThemeBuilder.settings.mainMenuColor = ThemeBuilder.settings.baseColor;
    ThemeBuilder.settings.mainMenuColor_hover = ThemeBuilder.settings.baseColor_darkenVariation;*/

    /*for (var k in ThemeBuilder.settings){
        if (ThemeBuilder.settings.hasOwnProperty(k)) {
            if( $('.genColor[data-color-var="' + k + '"]').length > 0 ){
                //log("Key is " + k + ", value is " + ThemeBuilder.settings[k]);
                $('.genColor[data-color-var="' + k + '"]').spectrum("set", ThemeBuilder.settings[k]);
            }
        }
    }*/


};



ThemeBuilder.frameBaseColor = function(color){

    color = String(color);

    less.modifyVars({'@baseColor': color});
    ThemeBuilder.settings.baseColor = color;

    $('.__selected-color').css({ backgroundColor: color }).text(color);

    //modify vars based on baseColor
    ThemeBuilder.settings.h1_color = color;
    ThemeBuilder.settings.h2_color = desaturate(darken(color, 10), 30);
    ThemeBuilder.settings.h3_color = desaturate(darken(color, 5), 20);
    ThemeBuilder.settings.masthead_bg = desaturate(darken(color, 10), 40);
    ThemeBuilder.settings.subnav_bg = desaturate(darken(color, 30), 40);
    ThemeBuilder.settings.baseColor_darkenVariation = desaturate(darken(color, 10), 40);
    ThemeBuilder.settings.mainMenuColor_hover = ThemeBuilder.settings.baseColor_darkenVariation;



};


/*
* Layout color settings
* */
ThemeBuilder.settings = {
    advanced: false,
    baseColor: '#2483E9',
    mainMenuColor: "",
    mainMenuColor_hover: "",
    h1_color: "",
    h2_color: "",
    h3_color: "",
    masthead_bg: "",
    subnav_bg: "",
    baseColor_darkenVariation: "",
    stylesheet: '',
    content_id: 50,
    stylefile: '',
    variables: []
};


function createSchemeGraphics(vars){
    var listHTML = '';
    var $scheme = $('.__selected-color-scheme');


    var hasBase = false;
    var baseColor = "#000";
    var usedColors = [];

    vars.each(function(v){
        var value = v.value;

        if(v.key == "@baseColor" ){
            hasBase = true;
            value = ThemeBuilder.settings.advanced ? $('[data-color-var="baseColor"]').val() : ThemeBuilder.settings.baseColor;
            baseColor = value;
        }

        var $item = $scheme.find('.__scheme-color[data-color="'+ v.key.slice(1)+'"]');
        if( $item.length ){
            $item.css({ backgroundColor: value }).addClass('found');

            if( usedColors.indexOf(value) > -1 ){
                $item.remove();
            }
        }else{
            if( usedColors.indexOf(value) < 0 ){
                listHTML += '<div class="__scheme-color" style="background-color: '
                    + value+';" title="'+ value+'" data-colorValue="'+value+'" data-color="'+ v.key.slice(1)+'"></div>';
            }
        }

        if( usedColors.indexOf(value) < 0 ){
            usedColors.push(value);
        }
    });

    if( !hasBase ){
        var value = ThemeBuilder.settings.advanced ? $('[data-color-var="baseColor"]').val() : ThemeBuilder.settings.baseColor;
        baseColor = value;

        var $item = $scheme.find('.__scheme-color[data-color="baseColor"]');
        if( $item.length ){
            $item.css({ backgroundColor: value }).addClass('found');

            if( usedColors.indexOf(baseColor) > -1 ){
                $item.remove();
            }
        }else{
            if( usedColors.indexOf(baseColor) < 0 ){
                listHTML += '<div class="__scheme-color" style="background-color: '
                    + value +';" title="'+ value+'" data-colorValue="'+value+'" data-color="'+ v.key.slice(1)+'"></div>';
            }
        }
    }

    $scheme.addClass('loading');

    delayed(function(){
        $scheme.find('.__scheme-color').not('.found').remove();
        $scheme.append(listHTML);

        $scheme.find('.__scheme-color').each(function(){
            var c = $(this).attr('data-colorValue');
            $(this).siblings('[data-colorValue="'+c+'"]').remove();
        });

        //var total = vars.length + (!hasBase ? 1 : 0);
        var total = $scheme.find('.__scheme-color').length;

        var schemeWidth = $('.__color-palette > div:visible').first().outerWidth();
        var singleWidth = schemeWidth / total;
        var singleHeight = ( singleWidth > 20 ? 20 : (singleWidth < 10 ? 10 : singleWidth) );

        $scheme.find('.__scheme-color').css({ width: singleWidth,
            height: singleHeight });
        $scheme.removeClass('loading').css({ height: singleHeight });

        $('.__selected-color').css({ borderColor: lighten(baseColor, 15) });
    }, 100, 'grpahics');

    return vars;
}


function getUpdateVariables(){

    var $items = $('.genColor');
    var list = {};

    for(var i=0; i<$items.length; i++){
        var $cur = $items.eq(i);
        var key = '@' + $cur.attr('data-color-var');

        ThemeBuilder.settings.variables[key] = $cur.val();
        list[key] = $cur.val();
    }

    return list;

}



ThemeBuilder.frameChangeVariable = function(variable, value){

    var vars = {};

    if( value == undefined ){
        vars = variable;
    }else{
        vars['@' + variable] = value;
    }

    less.modifyVars(vars);

    return vars;
};




ThemeBuilder.changeVariable = function(variable, value){

    ThemeBuilder.settings[variable] = value;

    //change all variables to not lose the actual coloring
    var vars = getUpdateVariables();

    if( !ThemeBuilder.settings.advanced ){
        vars['@baseColor'] = ThemeBuilder.settings.baseColor;
    }

    vars['@' + variable] = value;

    document.themeFrame.ThemeBuilder.frameChangeVariable(vars);

    varsList = [];

    for(var key in vars){
        if( vars.hasOwnProperty(key) ){
            varsList.push({
                key: key,
                value: vars[key]
            });
        }
    }

    createSchemeGraphics(varsList);

    less.modifyVars(vars);

    return vars;
};







/*
 * Handlepickers
  * */
ThemeBuilder.startPickers = function(){

    $('#level').on('change', function(){
        var valor = $(this).val();

        $('.__basic-edition').show();
        $('.__advanced-edition').hide();
        ThemeBuilder.settings.advanced = false;

        if( valor == "1" ){
            $('.__basic-edition').hide();
            $('.__advanced-edition').show();
            ThemeBuilder.settings.advanced = true;
        }
    });

    if( typeof $.fn.spectrum == "function" ){
        $('#baseColor').spectrum({
            showInput: true,
            showAlpha: true,
            showPalette: false,
            showButtons: false,
            clickoutFiresChange: true,
            preferredFormat: "hex",
            showInitial: false,
            palette: [
                ['rgb(182, 205, 143)', 'rgb(143, 189, 67)', 'rgb(97, 175, 58)'],
                ['rgb(236, 125, 125)', 'rgb(225, 86, 86)', 'rgb(225, 50, 50)'],
                ['rgb(147, 173, 237)', 'rgb(113, 146, 228)', 'rgb(68, 110, 211)'],
                ['rgb(205, 181, 143)', 'rgb(205, 167, 106)', 'rgb(198, 146, 63)']
            ],
            change: function(color) {
                var newColor = color.toString(); // #ff0000

                $('.__selected-color-scheme').html('');

                $('.__color10').addClass('selected').siblings().removeClass('selected');

                newColor.setBaseColor();
            }
        }).on("dragstop.spectrum", function(e, color) {
            var newColor = color.toString(); // #ff0000

            $('.__color10').addClass('selected').siblings().removeClass('selected');

            newColor.setBaseColor();

            Pace.restart();
        });


        $('.genColor').each(function(_index, _obj){
            var _var = $(this).attr('data-color-var');
            var _color = ThemeBuilder.settings.variables[_var];
            var $item = $(this);
            $(this).spectrum({
                showInput: true,
                showAlpha: true,
                showPalette: false,
                showButtons: false,
                clickoutFiresChange: true,
                preferredFormat: "hex",
                showInitial: false,
                palette: [
                    ['rgb(182, 205, 143)', 'rgb(143, 189, 67)', 'rgb(97, 175, 58)'],
                    ['rgb(236, 125, 125)', 'rgb(225, 86, 86)', 'rgb(225, 50, 50)'],
                    ['rgb(147, 173, 237)', 'rgb(113, 146, 228)', 'rgb(68, 110, 211)'],
                    ['rgb(205, 181, 143)', 'rgb(205, 167, 106)', 'rgb(198, 146, 63)']
                ],
                change: function(color) {
                    var newColor = color.toString();
                    ThemeBuilder.changeVariable(_var, newColor);
                }
            }).on("dragstop.spectrum", function(e, color) {
                var newColor = color.toString();
                ThemeBuilder.changeVariable(_var, newColor);

                Pace.restart();
            }).spectrum("set", _color);
        });
    }

};


/*
 * Actions and events
  * */
ThemeBuilder.actions = function(){

    this.startPickers();



    if( $("#lp-toggle").is(':checked') ){
        $('.__template-wrapper').addClass('__previewing');
    }

    $('body')
        .on('change', '#lp-toggle', function(){
            if( $(this).is(':checked') ){
                $('.__template-wrapper').addClass('__previewing');
            }
        })

        .on('click', '.js-query-builder', function(){
            $('body').addClass('qb-open');
            $('.query-builder').show();

            Pace.restart();
            TweenMax.to( $('.qb-wrapper'), 0.5, { opacity: 1, left: 0 } );
        })

        .on('click', '.js-close-qb', function(){

            var $editing = $('.qb-variable-list li.editing');

            if( $editing.length ){
                $editing.find('.js-cancel').trigger('click', { queueClose: true });
            }else{

                TweenMax.to( $('.qb-wrapper'), 0.5, { opacity: 0, left: '-100%', onComplete: function(){
                    $('body').removeClass('qb-open');
                    $('.query-builder').hide();
                } } );

            }

        })


    ;
};


var storedVariables = [];
function findStoredVariables(data){
    var list = [];
    list.push('@baseColor');

    for(var i=0; i<data.variables.length; i++){
        list.push(data.variables[i].key);
    }

    return list;
}


function getInCodeVariablesInspectWithValue(source){
    var pattern = /@[\w-_]+:\s*.*;[\/.]*/gm;
    return source.match(pattern);
}




/*
* Variable model
* */
var variableInstanceCollection = [];
var variableInstanceCollectionFromDB = [];
function Variable(opts){

    this.id = "";
    this.order = 0;
    this.name = "";
    this.key = "";
    this.value = "";
    this.originalValue = "";
    this.v = [];

    this.setCurrent = function(obj){
        this.id = obj.id;
        this.order = obj.order;
        this.name = obj.name;
        this.key = obj.key;
        this.value = obj.value;
        this.originalValue = obj.originalValue;

        return this;
    };


    function _create(opts, scope){
        var exists = false;

        if( !ThemeBuilder.settings.variables.length ){

            variableInstanceCollection.each(function(cur){
                if( cur.key == opts.key ){
                    exists = true;
                }
            });

            if( !exists ){
                if(!opts.id) opts.id = "";
                opts.order = variableInstanceCollection.length;
                variableInstanceCollection.push(opts);
            }

        }else{

            variableInstanceCollectionFromDB.each(function(cur){
                if( cur.key == opts.key ){
                    exists = true;
                }
            });

            if( !exists ){
                if(!opts.id) opts.id = "";
                opts.order = variableInstanceCollectionFromDB.length;
                variableInstanceCollectionFromDB.push(opts);
            }

        }




        return opts;
    }

    this.create = function(opts){

        if( typeof opts == "object" ){
            return _create(opts, this);
        }

        return {};

    };


    if( typeof opts == "object" && opts.key ){
        return this.create(opts);
    }


    function _fetch(scope){
        if( !variableInstanceCollection.length ){

            var __variables = getInCodeVariablesInspectWithValue(sourceCode);

            var newList = [];

            function sanitizeName(str){
                return str.replace(/_/g, ' ')
                    .replace(/([A-Z])/g, ' $1')
                    // uppercase the first character
                    .replace(/^./, function(str){ return str.toUpperCase(); });
            }

            for( var x=0; x<__variables.length; x++ ){
                var variableSplit = __variables[x].split(":");
                var variableKey = variableSplit[0];
                var variableValue = ((variableSplit[1]).trim()).replace(/"/g, "").replace(/'/g, "").replace(/;/g, "");

                var newItem = {
                    name: sanitizeName(variableKey.slice(1)),
                    key: variableKey,
                    value: variableValue,
                    order: x,
                    id: ""
                };

                console.log("FETCHING< ADD NEW ITEM", newItem);

                newList.push(newItem);


                var exists = false;
                if( !ThemeBuilder.settings.variables.length ){
                    variableInstanceCollection.each(function(cur){
                        if( cur.key == variableKey ){
                            exists = true;
                        }
                    });

                    if( !exists ){
                        variableInstanceCollection.push(newItem);
                    }

                    //if there are variables stored
                }
            }

            if( !ThemeBuilder.settings.variables.length ){
                if( !variableInstanceCollection.length ){
                    variableInstanceCollection = newList;
                }
            }



        }
    }


    this.all = function(){

        //If variables stored from DB
        if( ThemeBuilder.settings.variables.length ){
            return ThemeBuilder.settings.variables;
        }

        //Else check if there are
        if( variableInstanceCollection.length ){
            return variableInstanceCollection;
        }

        _fetch(this);
        return variableInstanceCollection;
    };

    this.fetch = function(){
        _fetch(this);

        return this;
    };


    function _findPaired(_keyName, _keyValue, scope, like){
        var r = [];
        var searchLike = like != undefined ? like : false;

        if( !searchLike && _keyValue.indexOf('%') > -1 ){
            searchLike = true;
            _keyValue = _keyValue.replace(/%/g,'');
        }

        variableInstanceCollection.each(function(cur){
            if( cur[_keyName] == _keyValue || ( searchLike && cur[_keyName].indexOf(_keyValue) ) ){
                r.push(cur);
            }
        });

        if( _keyValue == "@baseColor" ){
            r = [{ id: "", name: 'Base Color', key: '@baseColor', value: ThemeBuilder.settings.baseColor }];
        }

        if(r.length > 1 ){
            return scope;
        }

        scope.v = r;
        scope.setCurrent(r[0]);
        return scope;
    }


    this.find = function(){

        if( arguments.length == 1 ){
            if( typeof arguments[0] == "object" && arguments.length ){
                return _findPaired(arguments[0][0], arguments[0][1], this);
            }

            if( typeof arguments[0] == "number" ){
                return variableInstanceCollection[arguments[0]];
            }

            if( typeof arguments[0] == "string" ){
                return _findPaired('key', arguments[0], this);
            }


        }

        if( arguments.length == 2 ){
            return _findPaired(arguments[0], arguments[1], this);
        }

    };

    this.findLike = function(){

        if( arguments.length == 1 ){
            if( typeof arguments[0] == "object" && arguments.length ){
                return _findPaired(arguments[0][0], arguments[0][1], this, true);
            }

            if( typeof arguments[0] == "number" ){
                return this.variables[arguments[0]];
            }

            if( typeof arguments[0] == "string" ){
                return _findPaired('key', arguments[0], this, true);
            }
        }

        if( arguments.length == 2 ){
            return _findPaired(arguments[0], arguments[1], this, true);
        }

    };



    return this;
}

//Thi is the variables collection Collection
var variablesCollection = {
    key: "",
    value: "",
    name: "",
    exists: false,
    fromSourcevariables: [],

    findBySwitch: "",
    findBy: function(passedKey){

        switch(passedKey){
            case 'key':
            case 'name':
            case 'value':
                this.findBySwitch = passedKey;
                break;
        }

        return this;
    },

    findBeing: "",
    being: function(search){
        this.findBeing = "";
        var that = this;

        function _getKey(){

            switch(that.findBySwitch){
                case 'key':
                case 'name':
                case 'value':
                    that.findBeing = search;
                    break;
            }

            return that.findBySwitch;
        }

        if( !this.fromSourcevariables.length ){
            this.fromSourcevariables = (new Variable()).all();
        }


        var found = false;
        for(var i=0; i<this.fromSourcevariables.length; i++){
            if( this.fromSourcevariables[i][_getKey()] == search && !found ){
                found = true;

                this.name = this.fromSourcevariables[i].name;
                this.key = this.fromSourcevariables[i].key;
                this.value = this.fromSourcevariables[i].value;
                this.exists = true;
            }
        }

        if( !found ){
            this.name = "";
            this.key = "";
            this.value = "";
            this.exists = false;
        }

        return this;

    }
};




ThemeBuilder.initialize = function(data){

    //data.advanced = false;
    //data.baseColor = "#007aff";
    ThemeBuilder.settings = data;



    //Whenever everithing is ready, start the pickers
    function startMe(){

        $('.__theme-builder').addClass('__loaded');

        var data = ThemeBuilder.settings;


        var advancedPickerTemplate = '<div class="__form-group"> ' +
            '<input type="text" id="{{unhashedKey}}" class="genColor" value="{{value}}" data-color-var="{{unhashedKey}}" /> ' +
            '<label for="{{unhashedKey}}" >{{name}}</label> ' +
            '</div>';


        if( !data.variables.length ){
            var variableList = [];

            data.advanced = false;
            ThemeBuilder.settings.advanced = false;

            for( var a=0; a<inCodeVariables.length; a++ ){
                var _variable = variablesCollection.findBy('key').being(inCodeVariables[a]);
                var _variableKey = _variable.key;
                var _variableValue = _variable.value;
                var _variableName = _variable.name;

                if( ['@baseColor'].indexOf(_variableKey) < 0 ){
                    variableList.push({
                        id: "",
                        name: _variableName,
                        key: _variableKey,
                        value: _variableValue
                    });
                }
            }

            data.variables = variableList;
        }

        data.variables = data.variables.reverse();

        data.variables.push({
            id: "",
            name: "Base Color",
            key: '@baseColor',
            value: data.baseColor||'#444'
        });

        data.variables = data.variables.reverse();


        data.variables.each(function(current){
            var b_value = current.value;
            var name = current.name;
            var key = current.key;
            var unhashedKey = key.slice(1);

            var newItem = advancedPickerTemplate
                    .replace(/{{name}}/g, name)
                    .replace(/{{key}}/g, key)
                    .replace(/{{value}}/g, b_value)
                    .replace(/{{unhashedKey}}/g, unhashedKey)
                ;

            var $item = $(newItem);

            //if( key != "@baseColor" ){
                $('.__advanced-edition').append($item);
            //}
        });


        createSchemeGraphics(data.variables);

        ThemeBuilder.startPickers();

        //var fromSourcevariables = getInCodeVariablesInspectWithValue(sourceCode);

        if( data.baseColor == "" ){
            ThemeBuilder.settings.baseColor = variablesCollection.findBy('key').being('@baseColor').value;
            data = ThemeBuilder.settings;
        }

        if( data.advanced ){

            $('#level').val("1").trigger('change');


            $('#baseColor').spectrum("set", data.baseColor);

            $('.__single-color.__color10').addClass('selected').siblings().removeClass('selected');

            data.variables.each(function(variable){
                var $item = $('.genColor[data-color-var="' + variable.key.slice(1) + '"]');

                console.log($item, variable.value, $item.length);
                if( $item.length ) {
                    $item.spectrum("set", variable.value);
                }
            });


            ThemeBuilder.changeVariable("baseColor", data.baseColor);

        }else{

            getInCodeVariablesOnTheFly();

            $('#level').val("0").trigger('change');

            $('#baseColor').spectrum("set", data.baseColor);

            if( $('.__single-color a[data-color="' + data.baseColor + '"]').length > 0 ){
                $('.__single-color a[data-color="' + data.baseColor + '"]').trigger('click');
            }else{
                $('.__single-color.__color10').addClass('selected').siblings().removeClass('selected');

                if( $('#themeFrame').length > 0 ){
                    ThemeBuilder.setBaseColor(data.baseColor);
                }else{
                    ThemeBuilder.frameBaseColor(data.baseColor);
                }
            }

        }


    }









    //Add variables to the query builder panel
    function addToQueryBuilder(data){
        var items = "";
        var $ul = $('.qb-variable-list');
        var template = $ul.next('template').html();

        data.variables.each(function(current){
            items += template
                .replace(/{{name}}/g, current.name)
                .replace(/{{option}}/g, current.key)
                .replace(/{{value}}/g, current.value)
                .replace(/{{id}}/g, current.id)
            ;
        });

        $ul.append(items);

        function updateVariablesStatus(inCode){
            var items = "";
            var $ul = $('.qb-variable-list');
            console.log(inCode);

            $('.js-query-builder').removeClass('hidden');

            function sanitizeName(str){
                return str.replace(/_/g, ' ')
                    .replace(/([A-Z])/g, ' $1')
                    // uppercase the first character
                    .replace(/^./, function(str){ return str.toUpperCase(); });
            }

            var $oldItems = $ul.find('li');
            var usedVariables = [];

            var fromSourcevariables = getInCodeVariablesInspectWithValue(sourceCode);

            $oldItems.each(function(){
                var $this = $(this);
                var $option = $this.find('input[rel="option"]');
                var $invalidKey = $this.find('.invalid-key-message');

                if( inCode.indexOf($option.val()) < 0 ){
                    $invalidKey.removeClass('hidden');
                }else{
                    usedVariables.push($option.val());
                }
            });

            for(var i=0; i<inCode.length; i++){
                if( usedVariables.indexOf(inCode[i]) < 0 && bannedVariables.indexOf(inCode[i]) < 0 ){
                    var current = inCode[i];

                    var value = "";
                    var found = "";
                    for( var x=0; x<fromSourcevariables.length; x++ ){
                        console.log(fromSourcevariables[x]);
                        var variableSplit = fromSourcevariables[x].split(":");
                        var variableKey = variableSplit[0];
                        var variableValue = ((variableSplit[1]).trim()).replace(/"/g, "").replace(/'/g, "").replace(/;/g, "");

                        if( variableKey == current && !found ){
                            found = true;
                            value = variableValue;
                        }
                    }

                    items += template
                        .replace(/{{name}}/g, sanitizeName(current.slice(1)))
                        .replace(/{{option}}/g, current)
                        .replace(/{{value}}/g, value)
                        .replace(/{{id}}/g, "")
                        .replace('<li>', '<li class="auto-generated">')
                    ;
                }
            }

            $ul.prepend(items);
        }

        getInCodeVariables(updateVariablesStatus, startMe);
    }





    function updateVariablesWhenFetched(inCode) {


        var items = "";
        var $ul = $('.qb-variable-list');
        var template = $ul.next('template').html();


        $('.js-query-builder').removeClass('hidden');

        function sanitizeName(str){
            return str.replace(/_/g, ' ')
                .replace(/([A-Z])/g, ' $1')
                // uppercase the first character
                .replace(/^./, function(str){ return str.toUpperCase(); });
        }


        var usedVariables = [];

        var fromSourcevariables = getInCodeVariablesInspectWithValue(sourceCode);


        for (var i = 0; i < data.variables.length; i++) {
            var current = data.variables[i];

            items += template
                .replace(/{{name}}/g, current.name)
                .replace(/{{option}}/g, current.key)
                .replace(/{{value}}/g, current.value)
                .replace(/{{id}}/g, current.id)
            ;

            usedVariables.push(data.variables[i].key);
        }

        $ul.append(items);


        items = "";
        for (var i = 0; i < inCode.length; i++) {
            if (usedVariables.indexOf(inCode[i]) < 0 && bannedVariables.indexOf(inCode[i]) < 0) {
                var current = inCode[i];

                var value = "";
                var found = "";
                for (var x = 0; x < fromSourcevariables.length; x++) {
                    console.log(fromSourcevariables[x]);
                    var variableSplit = fromSourcevariables[x].split(":");
                    var variableKey = variableSplit[0];
                    var variableValue = ((variableSplit[1]).trim()).replace(/"/g, "").replace(/'/g, "").replace(/;/g, "");

                    if (variableKey == current && !found) {
                        found = true;
                        value = variableValue;
                    }
                }

                items += template
                    .replace(/{{name}}/g, sanitizeName(current.slice(1)))
                    .replace(/{{option}}/g, current)
                    .replace(/{{value}}/g, value)
                    .replace(/{{id}}/g, "")
                    .replace('<li>', '<li class="auto-generated">')
                ;
            }
        }

        $ul.prepend(items);
    }





    //If baseColor is empty or there are not variables stored in DB
    if( typeof data != "object" || data.baseColor == "" || !data.variables.length ) {


        function alternativeStart(){
            storedVariables = getUniqueVariables(findStoredVariables(data));
            addToQueryBuilder(data);
        }

        getInCodeVariables(updateVariablesWhenFetched, alternativeStart);


        //if we have baseColor and variables
    } else{
        function alternativeStart(){
            storedVariables = getUniqueVariables(findStoredVariables(data));
            addToQueryBuilder(data);
        }

        getInCodeVariables(updateVariablesWhenFetched, alternativeStart);
    }




};


var globalOptions = window.themeOptions || {
        supported: false,
        SiteId: 'xxxxx',
        SiteAlias: 'responsive_template04',
        clientPath: ''
    };

var $builder = $('.__theme-builder');

ThemeBuilder.load = function(){

    if( !globalOptions.supported ){
        $builder.addClass('__loaded').css({ background: 'none' });

        $builder.html('').append($('.not-supported').html());

        confirm({
            title: 'Alert',
            message: 'This tool is not supported.'
        });

        return false;
    }

    $.ajax({
        url: 'get.json',
        success: function(json){
            ThemeBuilder.initialize(json);
        }
    });
};



/*
 * Get Stylesheet
  * */
ThemeBuilder.__getSlaveTemplate = function(){
    if( window.top == window.self ){
        alert("This window is the parent. Slabe is expected.");
        return false;
    }

    var css = $('style[id*="less:"]').last().html();
    return css;
};





var delays = [];
function delayed(callback, timer, name){
    clearTimeout(delays[name]);

    delays[name] = setTimeout(function(){
        if( typeof callback == "function" ){
            callback();
        }
    }, timer);
}



var inCodeVariables = [];
var bannedVariables = ['@radius'];
var sourceCode = "";

function getUniqueVariables(arr){
    var variables = [];
    for(var i=0; i<arr.length; i++){
        if( variables.indexOf(arr[i]) < 0){

            //ignore banned variables
            for(var x=0; x<bannedVariables.length; x++){
                if( arr[i] != bannedVariables[x] ){
                    variables.push(arr[i]);
                }
            }
        }
    }

    return variables;
}

/*
* Generate an array list of all variable definitions found in the source-code
* @param {string} source - the source code passed as parameter
* @return {array} [] - list of all variables
* */
function getInCodeVariablesInspect(source){
    var pattern = /\B@[a-z0-9_-]+/gi;
    return getUniqueVariables(source.match(pattern));
}


/*
* Execute a xmlhttprequest to get the stylesheet source code to perform code inspections
* @param {function} callback - want a callback? pass it as a paremeter
* @param {function} chainedCallback - yet another callback (optional)
* */
function getInCodeVariables(callback, chainedCallback){

    function showError(a,b){

        console.log(a);

        if( typeof b == "object"){
            confirm(b);
        }else{
            confirm({
                title: "Sorry!",
                message: "Something is is missing. Please contact the support team."
            });
        }
    }

    if( !ThemeBuilder.settings.stylefile ){
        showError({ error: 1, error_msg: 'Template file not specified.', error_data: {} }, {
            title: "Sorry!",
            message: "Something is is missing. Please contact the support team.",
            onAccept: function(){
                window.location.reload();
            },
            acceptButton: 'Try again'
        });

        return false;
    }


    $.ajax({
        url: ThemeBuilder.settings.stylefile
    }).done(function(response){
        inCodeVariables = getInCodeVariablesInspect(response);

        sourceCode = response;

        if( typeof callback == "function"){
            callback(inCodeVariables);
        }

        if( typeof chainedCallback == "function"){
            chainedCallback(inCodeVariables);
        }


    })
        .error(function(a){
            showError({ error: a.status, error_msg: a.statusText, error_data: a });
        });
}



/*
* Perform a code inspection on the generated less
 * @return {array} [] - list of all variables found in code
* */
function getInCodeVariablesOnTheFly(){

    function showError(a,b){

        console.log(a);

        if( typeof b == "object"){
            confirm(b);
        }else{
            confirm({
                title: "Sorry!",
                message: "Something is is missing. Please contact the support team."
            });
        }
    }

    if( !ThemeBuilder.settings.stylefile ){
        showError({ error: 1, error_msg: 'Template file not specified.', error_data: {} }, {
            title: "Sorry!",
            message: "Something is is missing. Please contact the support team.",
            onAccept: function(){
                window.location.reload();
            },
            acceptButton: 'Try again'
        });

        return false;
    }


    var foo = [];


    function hasFunctions(str){
        var p = /[a-z-_]+\(/g;
        var r = str.match(p);
        var say = false;

        console.log('MATCH PATTERN', r);

        if(r != null && typeof r == "object" && r.length){
            say = true;
        }

        return say;
    }

    function cleanVariable(str){
        if( str.slice(-1) == '"' || str.slice(-1) == "'" ){
            str = str.slice(0,-1);
        }

        if( str.slice(0,1) == '"' || str.slice(0,1) == "'" ){
            str = str.slice(1);
        }

        return str;
    }

    function valuesReplacement(current, isChild){
        var children = [];

        if( isChild !=undefined && isChild){
            console.log('doing replacements for ', current.key, ' as a children');
        }else{
            console.log('doing replacements for ', current.key);
        }

        if( current.value.indexOf('@') > -1 ){
            children = getInCodeVariablesInspect(current.value);
        }

        if( children.length ){
            children.each(function(child){
                var currentChild = (new Variable()).fetch().find(child);

                console.log('going tru children', child, 'with rhe content:', currentChild);

                if( currentChild.value.indexOf('@') > -1 ){
                    currentChild.value = valuesReplacement(currentChild, 1).value;
                }

                if( currentChild.key != '@baseColor' ){
                    current.value = current.value.replace(child, '"' + currentChild.value + '"');
                }else{
                    current.value = current.value.replace(child, '"' + ThemeBuilder.settings.baseColor + '"');
                }

            });
        }


        return current;
    }

    function performActions(current, next){
        var replacement = current;

        console.log("PERFORMING ACTION BEFORE", replacement.key, replacement.value);
        if( current.value.indexOf('@') > -1 ){
            replacement = valuesReplacement(current);
        }

        console.log("PERFORMING ACTION AFTER", replacement.key, replacement.value);

        next(replacement);
    }




    //perform the actions
    if( ThemeBuilder.settings.variables.length ){
        ThemeBuilder.settings.variables.each(function(cur){
            var current = cur;

            console.log('find compile for ', current.key);

            function doNext(currentScoped){

                currentScoped.value = cleanVariable(currentScoped.value);

                if( hasFunctions(current.value) ){
                    console.log(current.key, 'HAS INHERIT FUNCTIONS', current.value.replace(/%/g,''));
                    current.value = eval(current.value.replace(/%/g,''));
                    console.log('AFTER INHERITED EXECUTION VALUE IS', current.value);
                }

                console.log(currentScoped.value, 'compiled for ', currentScoped.key, ' if undefined check the var', currentScoped);

                foo.push({key: currentScoped.key, value: currentScoped.value});
            }

            performActions(current, doNext);
        });
    }else{
        if( inCodeVariables.length ){
            inCodeVariables.each(function(cur){
                var current = (new Variable()).fetch().find(cur);

                console.log('find compile for ', current.key);

                function doNext(currentScoped){

                    currentScoped.value = cleanVariable(currentScoped.value);

                    if( hasFunctions(current.value) ){
                        console.log(current.key, 'HAS INHERIT FUNCTIONS', current.value.replace(/%/g,''));
                        current.value = eval(current.value.replace(/%/g,''));
                        console.log('AFTER INHERITED EXECUTION VALUE IS', current.value);
                    }

                    console.log(currentScoped.value, 'compiled for ', currentScoped.key, ' if undefined check the var', currentScoped);

                    foo.push({key: currentScoped.key, value: currentScoped.value});
                }

                performActions(current, doNext);
            });
        }
    }

    //update panels
    foo.each(function(variable){
        var $item = $('.genColor[data-color-var="' + variable.key.slice(1) + '"]');

        console.log($item, variable.value, $item.length);
        if( $item.length ) {
            $item.spectrum("set", variable.value);
        }
    });

    return foo;



}



/*
* Custom foreach fallback
* @param {array} obj - array of elements to go through
* @param {function} whatToDo - callback to execute on every occurence
* */
if( typeof Array.prototype.each != "function" ){
    Array.prototype.each = function each(whatToDo){
        var obj = this;

        if( typeof obj != "object" && !obj.length ){
            console.error('obj must be an array');
            return false;
        }


        for(var i=0; i<obj.length; i++){
            if( typeof whatToDo == "function" ){
                whatToDo(obj[i]);
            }
        }
    }
}





/*
* QueryBuilder panel functionality, this is to add, edit and remove variables that can be used by our theme editor
* */
ThemeBuilder.QueryBuilder = function(){

    function _onResize(){
        $('.qb-workflow').css({ height: window.innerHeight - 60 }) ;
    }


    function _deploySettings(){
        Pace.restart();

        var settings = _getSettings();

        $.ajax({
            url: '',
            type: 'post',
            data: JSON.stringify(settings),
            success: function(response){
                confirm({
                    title: "Success!",
                    message: "The settings were saved successfully!"
                });
            }
        });
    }


    function _getSettings(){
        var $list = $('.qb-variable-list li');
        var list = [];
        $list.each(function(){
            var $current = $(this);
            list.push({
                id: $current.find('input[rel="id"]').val(),
                name: $current.find('input[rel="name"]').val(),
                key: $current.find('input[rel="option"]').val(),
                value: $current.find('input[rel="value"]').val()
            });
        });

        console.log(list);
    }


    function _validateItem($item){
        var $inputs = {
            name: $item.find('input[rel="name"]'),
            option: $item.find('input[rel="option"]'),
            optionValue: $item.find('input[rel="value"]')
        };

        function _exists(str){
            return inCodeVariables.indexOf(str) > -1;
        }

        function _isValid($input){
            return $input.val().length > 0 && $input.val() != "";
        }

        function _isEdited($input){
            return $input.val() != $input.attr('data-original');
        }

        return {
            inputs: $inputs,
            name: {
                isValid: _isValid($inputs.name),
                isEdited: _isEdited($inputs.name),
                value: $inputs.name.val(),
                originalValue: $inputs.name.attr('data-original')
            },
            option: {
                exists: _exists($inputs.option.val()),
                isValid: _isValid($inputs.option) && _isValidVariable($inputs.option.val()),
                isEdited: _isEdited($inputs.option),
                value: $inputs.option.val(),
                originalValue: $inputs.option.attr('data-original')
            },
            optionValue: {
                isValid: _isValid($inputs.optionValue),
                isEdited: _isEdited($inputs.optionValue),
                value: $inputs.optionValue.val(),
                originalValue: $inputs.optionValue.attr('data-original')
            }
        };
    }



    function _isValidVariable(str) {
        var re = /^@((?:[\w-]+\.)*\w[\w-]{0,66})$/i;
        return re.test(str);
    }



    function _validateNewItem($item){
        var $inputs = {
            name: $item.find('input[rel="name"]'),
            option: $item.find('input[rel="option"]'),
            optionValue: $item.find('input[rel="value"]')
        };

        function _isValid($input){
            return $input.val().length > 0 && $input.val() != "";
        }

        function _exists(str){
            return inCodeVariables.indexOf(str) > -1;
        }

        return {
            inputs: $inputs,
            name: {
                isValid: _isValid($inputs.name),
                value: $inputs.name.val()
            },
            option: {
                exists: _exists($inputs.option.val()),
                isValid: _isValid($inputs.option) && _isValidVariable($inputs.option.val()),
                value: $inputs.option.val()
            },
            optionValue: {
                isValid: _isValid($inputs.optionValue),
                value: $inputs.optionValue.val()
            }
        };
    }



    function _actions(){
        $('body')
            .on('click', '.disable-overlay', function(){

                var $li = $(this).closest('li');
                var $ul = $li.closest('ul');
                var $workflow = $ul.parent();

                $li = $ul.find('li.editing');

                delayed(function(){
                    var _offset = $li.prevAll().length > 0 ? $li.prevAll().length * $li.prev().outerHeight() : 0;
                    TweenMax.to($workflow, 0.3, { scrollTop: _offset });
                }, 100, "scrolltop-workflow");

            })
            .on('click', '.js-qb-action.js-edit', function(){

                var $li = $(this).closest('li');
                var $ul = $li.closest('ul');
                var $workflow = $ul.parent();

                $ul.addClass('editing');
                $li.addClass('editing');

                delayed(function(){
                    var _offset = $li.prevAll().length > 0 ? $li.prevAll().length * $li.prev().outerHeight() : 0;
                    TweenMax.to($workflow, 0.3, { scrollTop: _offset });
                    $li.find('input[type="text"]').first().trigger('focus');
                }, 100, "scrolltop-workflow");

            })

            .on('click', '.js-qb-action.js-remove', function(){

                var $li = $(this).closest('li');
                var $ul = $li.closest('ul');

                $li.addClass('removing');

                function onCancelItem(){
                    //do nothing

                    $li.removeClass('removing');
                }

                function onAcceptItem(){
                    $li.removeClass('removing');

                    $li.slideUp(500, function(){
                        $li.remove();
                    });
                }

                var autoTxt = $li.hasClass('auto-generated') ? "<br><br><b>This variable seems to be required or auto-generated.</b>" : "";

                confirm({
                    title: "Warning!",
                    message: "Are you sure you want to remove this item? <br />Item: <b>" + ($li.find('[rel="text-name"]').text()||$li.find('[rel="text-option"]').text())
                    + "</b>" + autoTxt,
                    onCancel: onCancelItem,
                    onAccept: onAcceptItem,
                    cancelButton: 'Cancel',
                    acceptButton: 'Yes, remove it'
                });

            })



            .on('click', '.js-cancel', function(e, queue){

                var $li = $(this).closest('li');
                var $ul = $li.closest('ul');

                var validation = _validateItem($li);
                if( !validation.name.isEdited && !validation.option.isEdited && !validation.optionValue.isEdited ){
                    $ul.removeClass('editing');
                    $li.removeClass('editing');

                    if( queue != undefined && queue.queueClose ){
                        $('.js-close-qb').trigger('click');
                    }

                    if( queue != undefined && queue.queueLink ){
                        $(queue.queueLinkElement).trigger('click');
                    }
                }else{

                    function onCancelItem(){
                        validation.inputs.name.val( validation.name.originalValue );
                        validation.inputs.option.val( validation.option.originalValue );
                        validation.inputs.optionValue.val( validation.optionValue.originalValue );

                        $ul.removeClass('editing');
                        $li.removeClass('editing');

                        if( queue != undefined && queue.queueClose ){
                            $('.js-close-qb').trigger('click');
                        }

                        if( queue != undefined && queue.queueLink ){
                            $(queue.queueLinkElement).trigger('click');
                        }
                    }

                    function onAcceptItem(){
                        validation.inputs.name.trigger('focus');
                    }



                    confirm({
                        title: "Warning!",
                        message: "Edition detected, if you continue your changes will be lost.",
                        onCancel: onCancelItem,
                        onAccept: onAcceptItem,
                        cancelButton: 'Close anyways',
                        acceptButton: 'Ok, continue editing'
                    });

                }
            })

            .on('click', '.js-save', function(){

                var $li = $(this).closest('li');
                var $ul = $li.closest('ul');

                var validation = _validateItem($li);



                function _saveItem(data, $li){

                    var $ul = $('.qb-variable-list');
                    validation.inputs.name.attr('data-original', validation.inputs.name.val() );
                    validation.inputs.option.attr('data-original', validation.inputs.option.val() );
                    validation.inputs.optionValue.attr('data-original', validation.inputs.optionValue.val() );

                    if( data.option.exists ){
                        $li.find('.invalid-key-message').addClass('hidden');
                    }else{
                        $li.find('.invalid-key-message').removeClass('hidden');
                    }

                    $li.find('[rel="text-name"]').text( validation.inputs.name.val() );
                    $li.find('[rel="text-option"]').text( validation.inputs.option.val() );
                    $li.find('[rel="text-value"]').text( validation.inputs.optionValue.val() );

                    $ul.removeClass('editing');
                    $li.removeClass('editing');

                }


                if( validation.name.isValid && validation.option.isValid && validation.optionValue.isValid ){
                    //if the variable exists in code
                    if( validation.option.exists ){
                        _saveItem(validation, $li);
                    }else{
                        function onAcceptItemAfterExistenceChecking(){
                            _saveItem(validation, $li);
                        }

                        function onCancelItemAfterExistenceChecking(){
                            validation.inputs.option.trigger('focus');
                        }

                        confirm({
                            title: "Warning!",
                            message: "The variable you are trying to save does not exist in the source code.",
                            onAccept: onAcceptItemAfterExistenceChecking,
                            acceptButton: 'Continue anyways',
                            onCancel: onCancelItemAfterExistenceChecking,
                            cancelButton: 'Let me edit'
                        });
                    }

                }else{

                    function onAcceptItem(){
                        if( !validation.name.isValid ){
                            validation.inputs.name.trigger('focus');
                        }else{
                            if( !validation.option.isValid ){
                                validation.inputs.option.trigger('focus');
                            }else{
                                validation.inputs.optionValue.trigger('focus');
                            }
                        }
                    }

                    var errorMessages = "<br>";
                    if( !validation.name.isValid ) errorMessages += '<br>The Name is required.';
                    if( !validation.option.isValid ) errorMessages += '<br>The Key is required and must be valid, e.g.: @key.';
                    if( !validation.optionValue.isValid ) errorMessages += '<br>The Value is required.';

                    confirm({
                        title: "Warning!",
                        message: "Make sure all inputs are filled and valid." + errorMessages,
                        onAccept: onAcceptItem
                    });

                }









            })

            .on('click', '.qb-menu ul li a', function(){
                if( $(this).hasClass('js-save-all') ){
                    //perform a save

                    _deploySettings();

                    return false;
                }

                //else, continue
                var hash = (($(this)[0].href).split('#'))[1];

                var $editing = $('.qb-variable-list li.editing');

                if( $editing.length && !$(this).closest('li').hasClass('active') ){
                    $editing.find('.js-cancel').trigger('click', { queueLink: true, queueLinkElement: $(this) });
                }else{
                    $(this).closest('li').addClass('active').siblings().removeClass('active');
                    $('.query-builder .qb-workflow .qb-workflow-tab[id="' + hash + '"]').addClass('active').siblings().removeClass('active');
                }

                return false;
            })

            .on('click', '.js-add-item', function(){
                var $form = $(this).closest('.qb-add-variable-form');
                var validation = _validateNewItem($form);

                function _addNewItem(data, $form){

                    var $ul = $('.qb-variable-list');
                    var newItem = $ul.next('template').html()
                            .replace(/{{name}}/g, data.name.value)
                            .replace(/{{option}}/g, data.option.value)
                            .replace(/{{value}}/g, data.optionValue.value)
                            .replace(/{{id}}/g, "")
                        ;

                    var $newItem = $(newItem).hide().addClass('adding');

                    if( !data.option.exists ){
                        $newItem.find('.invalid-key-message').removeClass('hidden');
                    }

                    $form.find('input[type="text"]').val("");
                    $('.qb-menu ul li').first().find('a').trigger('click');
                    TweenMax.to($ul.parent(), 0, { scrollTop: 0 });
                    $ul.prepend($newItem);
                    $newItem.slideDown(500, function(){
                        $newItem.find('.disable-overlay').fadeOut(500, function(){
                            $newItem.removeClass('adding');
                            $newItem.find('.disable-overlay').removeAttr('style');
                        });
                    });

                }


                if( validation.name.isValid && validation.option.isValid && validation.optionValue.isValid ){
                    //if the variable exists in code
                    if( validation.option.exists ){
                        _addNewItem(validation, $form);
                    }else{
                        function onAcceptItemAfterExistenceChecking(){
                            _addNewItem(validation, $form);
                        }

                        function onCancelItemAfterExistenceChecking(){
                            validation.inputs.option.trigger('focus');
                        }

                        confirm({
                            title: "Warning!",
                            message: "The variable you are trying to add does not exist in the source code.",
                            onAccept: onAcceptItemAfterExistenceChecking,
                            acceptButton: 'Continue anyways',
                            onCancel: onCancelItemAfterExistenceChecking,
                            cancelButton: 'Let me edit'
                        });
                    }

                }else{

                    function onAcceptItem(){
                        if( !validation.name.isValid ){
                            validation.inputs.name.trigger('focus');
                        }else{
                            if( !validation.option.isValid ){
                                validation.inputs.option.trigger('focus');
                            }else{
                                validation.inputs.optionValue.trigger('focus');
                            }
                        }
                    }

                    var errorMessages = "<br>";
                    if( !validation.name.isValid ) errorMessages += '<br>The Name is required.';
                    if( !validation.option.isValid ) errorMessages += '<br>The Key is required and must be valid, e.g.: @key.';
                    if( !validation.optionValue.isValid ) errorMessages += '<br>The Value is required.';

                    confirm({
                        title: "Warning!",
                        message: "Make sure all inputs are filled and valid." + errorMessages,
                        onAccept: onAcceptItem
                    });

                }

            })
        ;
    }



    _onResize();
    _actions();

    $(window).on('resize', function(){
        _onResize();
    });


};



ThemeBuilder.start = function(){
    Dropdown.create();
    Switches.create();
    Colors.create();
    ThemeBuilder.actions();

    if( window.top == window.self ){
        ThemeBuilder.load();

        ThemeBuilder.QueryBuilder();
    }
};












/*
* Get Scheme Vars
* */
function __getSchemeVars(){
    var advanced = $('#level').val() == "1",
        baseColor = $('#baseColor').val(),
        result = "";

    if( !advanced ){
        result =  "baseColor=" + baseColor;
    }else{
        for(var key in ThemeBuilder.settings){
            if( key != "stylesheet" && key != "content_id" ){
                result += "&" + key + "=" + ThemeBuilder.settings[key];
            }
        }
    }


    result = result.replace(/#/g, '');
    return result;
};


/*
* Build url
* */
function __buildPreviewUrl(__base){
    return __base + "?" + "s=RESPONSIVE_TEMPLATE1&p=themebuilder.ascx&activate=b326b5062b2f0e69046810717534cb09&" + __getSchemeVars();
};


/*
* Create input for each variable
* */
function __createFormParameters(url, $form){
    var __separated = url.indexOf('?') > -1 ? url.split('?') : ["", ""],
        __vars = __separated[1].split('&');

    $form.find('.__form-parameter').remove();

    for(var i=0; i<__vars.length; i++){
        var __cursor = __vars[i].split("=");
        $form.append('<input class="__form-parameter" type="hidden" name="' + __cursor[0] + '" value="' + __cursor[1] + '" />');
    }
};

/*
* Preview shorthand
* */
function __preview(elem){
    var url = __buildPreviewUrl("http://cs-qa.encompasscrm.com/default.aspx");
    var $form = $(elem).closest('form');

    __createFormParameters(url, $form);

    $form.attr('action', url).trigger('submit');
};




/*
* Save template
* */
function __saveTemplate(){
    if( window.top == window.self ){
        var css = document.themeFrame.ThemeBuilder.__getSlaveTemplate();

        var variables = [];

        ((new Variable()).all()).each(function(variable){
            if( variable.key != '@baseColor' ){
                variables.push({
                    id: "",
                    name: variable.name,
                    key: variable.key,
                    value: variable.value
                });
            }
        });

        var settings = ThemeBuilder.settings;
        settings.variables = variables;
        settings.stylesheet = css;
        var conf = JSON.stringify(settings);

        var showMessage = function(data){
            confirm({
                title: "Theme Saved!",
                message: "Your customization is saved."
            });
        };

        console.log(conf);
        __sendData(conf, path.client + '?cid='+ThemeBuilder.settings.content_id, showMessage);
    }
};

function __sendData(__data, __url, __callback){
    $.ajax({
        url: __url,
        type: 'post',
        data: __data
    }).always(function(xhr){
        if( typeof __callback != "undefined" && typeof __callback == "function" ){
            __callback(xhr);
        }
    });
};


/*
* New popup
* */
function __popup(url,name) {
    var w = {
        w: window.innerWidth,
        h: window.innerHeight
    };
    window.open(url,name,'height=' + w.h + ',width=' + w.w + ",top=0,left=0");
    return false;
}




/*
* Confirm modal short-hand
* */
function confirm(ops){
    /*{
        title: 'Remove menu item',
            message: message,
        onAccept: onConfirmItem,
        cancelButton: 'Cancel',
        acceptButton: 'Yes, remove it'
    }*/

    if(typeof ops == "object"){
        $('#confirm-modal').confirm(ops);
    }
}



// Function:        sortData
// Description:     Sort array according to sortMode
// Parameters:      j: array containing the items to be sorted
//                  sortMode: mode to sort; name or date; ascending or descending
// Return:          Sorted array
function sortData(entries, sortMode) {
    if (sortMode === "none")
        return;

    function ascSort(a, b) {
        return Number(a.index) - Number(b.index);
    }
    function descSort(a, b) {
        return Number(b.index) - Number(a.index);
    }

    switch (sortMode) {
        case "ASC":
            entries.sort(ascSort);
            break;
        case "DESC":
            entries.sort(descSort);
            break;
    }

    return entries;
}


/*
* Console log shorthand with fallback
* */
function log()
{
    if( arguments.length > 0 )
    {
        typeof console.log == "function"&&console.log(arguments);
    }
}


/*
* Set Base color
* */
if(typeof String.prototype.setBaseColor !== 'function') {
    String.prototype.setBaseColor = function() {
        ThemeBuilder.setBaseColor(this);
        return "Color " + this + " setted as base color.";
    }
}







/*
* Less color manipulation shorthands
* */
function darken(color, p){
    color = new less.tree.Color(color.replace(/#/g,''));
    return less.tree.functions.darken(color, {value: p}).toCSS();
}
function lighten(colorL, p){
    colorL = colorL.replace(/#/g,'');
    colorL = new less.tree.Color(colorL);
    return less.tree.functions.lighten(colorL, {value: p}).toCSS();
}
function desaturate(colorD, p){
    colorD = new less.tree.Color(colorD.replace(/#/g,''));
    return less.tree.functions.desaturate(colorD, {value: p}).toCSS();
}











/*
* DOM Events
* */

$(document).ajaxStart(function(){
    Pace.restart();
}).ajaxComplete(function(xhr){
    //log(xhr);
}).ajaxError(function(xhr){
    log("Error: ajax call failed, details: ", xhr);
});

$(window).on('load', function(){
    ThemeBuilder.start();

    if( $('#themeFrame').length > 0 ){
        $('#themeFrame').css({ height: $('#themeFrame').contents().find('body').outerHeight() });
    }

}).on('resize', function(){
    if( $('#themeFrame').length > 0 ){
        $('#themeFrame').css({ height: $('#themeFrame').contents().find('body').outerHeight() });
    }
});



/*PACE */
var paceOptions = {
    ajax: false, // disabled
    document: false, // disabled
    eventLag: false // disabled
};

if( window.top == window.self ){
    paceOptions = {
        ajax: true, // disabled
        document: true, // disabled
        eventLag: true // disabled
    };
}

/*! pace 1.0.0 */
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X=[].slice,Y={}.hasOwnProperty,Z=function(a,b){function c(){this.constructor=a}for(var d in b)Y.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},$=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};for(u={catchupTime:100,initialRate:.03,minTime:250,ghostTime:100,maxProgressPerFrame:20,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},C=function(){var a;return null!=(a="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance.now():void 0)?a:+new Date},E=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,t=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==E&&(E=function(a){return setTimeout(a,50)},t=function(a){return clearTimeout(a)}),G=function(a){var b,c;return b=C(),(c=function(){var d;return d=C()-b,d>=33?(b=C(),a(d,function(){return E(c)})):setTimeout(c,33-d)})()},F=function(){var a,b,c;return c=arguments[0],b=arguments[1],a=3<=arguments.length?X.call(arguments,2):[],"function"==typeof c[b]?c[b].apply(c,a):c[b]},v=function(){var a,b,c,d,e,f,g;for(b=arguments[0],d=2<=arguments.length?X.call(arguments,1):[],f=0,g=d.length;g>f;f++)if(c=d[f])for(a in c)Y.call(c,a)&&(e=c[a],null!=b[a]&&"object"==typeof b[a]&&null!=e&&"object"==typeof e?v(b[a],e):b[a]=e);return b},q=function(a){var b,c,d,e,f;for(c=b=0,e=0,f=a.length;f>e;e++)d=a[e],c+=Math.abs(d),b++;return c/b},x=function(a,b){var c,d,e;if(null==a&&(a="options"),null==b&&(b=!0),e=document.querySelector("[data-pace-"+a+"]")){if(c=e.getAttribute("data-pace-"+a),!b)return c;try{return JSON.parse(c)}catch(f){return d=f,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",d):void 0}}},g=function(){function a(){}return a.prototype.on=function(a,b,c,d){var e;return null==d&&(d=!1),null==this.bindings&&(this.bindings={}),null==(e=this.bindings)[a]&&(e[a]=[]),this.bindings[a].push({handler:b,ctx:c,once:d})},a.prototype.once=function(a,b,c){return this.on(a,b,c,!0)},a.prototype.off=function(a,b){var c,d,e;if(null!=(null!=(d=this.bindings)?d[a]:void 0)){if(null==b)return delete this.bindings[a];for(c=0,e=[];c<this.bindings[a].length;)e.push(this.bindings[a][c].handler===b?this.bindings[a].splice(c,1):c++);return e}},a.prototype.trigger=function(){var a,b,c,d,e,f,g,h,i;if(c=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],null!=(g=this.bindings)?g[c]:void 0){for(e=0,i=[];e<this.bindings[c].length;)h=this.bindings[c][e],d=h.handler,b=h.ctx,f=h.once,d.apply(null!=b?b:this,a),i.push(f?this.bindings[c].splice(e,1):e++);return i}},a}(),j=window.Pace||{},window.Pace=j,v(j,g.prototype),D=j.options=v({},u,window.paceOptions,x()),U=["ajax","document","eventLag","elements"],Q=0,S=U.length;S>Q;Q++)K=U[Q],D[K]===!0&&(D[K]=u[K]);i=function(a){function b(){return V=b.__super__.constructor.apply(this,arguments)}return Z(b,a),b}(Error),b=function(){function a(){this.progress=0}return a.prototype.getElement=function(){var a;if(null==this.el){if(a=document.querySelector(D.target),!a)throw new i;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/pace-done/g,""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=a.firstChild?a.insertBefore(this.el,a.firstChild):a.appendChild(this.el)}return this.el},a.prototype.finish=function(){var a;return a=this.getElement(),a.className=a.className.replace("pace-active",""),a.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},a.prototype.update=function(a){return this.progress=a,this.render()},a.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(a){i=a}return this.el=void 0},a.prototype.render=function(){var a,b,c,d,e,f,g;if(null==document.querySelector(D.target))return!1;for(a=this.getElement(),d="translate3d("+this.progress+"%, 0, 0)",g=["webkitTransform","msTransform","transform"],e=0,f=g.length;f>e;e++)b=g[e],a.children[0].style[b]=d;return(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)&&(a.children[0].setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?c="99":(c=this.progress<10?"0":"",c+=0|this.progress),a.children[0].setAttribute("data-progress",""+c)),this.lastRenderedProgress=this.progress},a.prototype.done=function(){return this.progress>=100},a}(),h=function(){function a(){this.bindings={}}return a.prototype.trigger=function(a,b){var c,d,e,f,g;if(null!=this.bindings[a]){for(f=this.bindings[a],g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.call(this,b));return g}},a.prototype.on=function(a,b){var c;return null==(c=this.bindings)[a]&&(c[a]=[]),this.bindings[a].push(b)},a}(),P=window.XMLHttpRequest,O=window.XDomainRequest,N=window.WebSocket,w=function(a,b){var c,d,e,f;f=[];for(d in b.prototype)try{e=b.prototype[d],f.push(null==a[d]&&"function"!=typeof e?a[d]=e:void 0)}catch(g){c=g}return f},A=[],j.ignore=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],A.unshift("ignore"),c=b.apply(null,a),A.shift(),c},j.track=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],A.unshift("track"),c=b.apply(null,a),A.shift(),c},J=function(a){var b;if(null==a&&(a="GET"),"track"===A[0])return"force";if(!A.length&&D.ajax){if("socket"===a&&D.ajax.trackWebSockets)return!0;if(b=a.toUpperCase(),$.call(D.ajax.trackMethods,b)>=0)return!0}return!1},k=function(a){function b(){var a,c=this;b.__super__.constructor.apply(this,arguments),a=function(a){var b;return b=a.open,a.open=function(d,e){return J(d)&&c.trigger("request",{type:d,url:e,request:a}),b.apply(a,arguments)}},window.XMLHttpRequest=function(b){var c;return c=new P(b),a(c),c};try{w(window.XMLHttpRequest,P)}catch(d){}if(null!=O){window.XDomainRequest=function(){var b;return b=new O,a(b),b};try{w(window.XDomainRequest,O)}catch(d){}}if(null!=N&&D.ajax.trackWebSockets){window.WebSocket=function(a,b){var d;return d=null!=b?new N(a,b):new N(a),J("socket")&&c.trigger("request",{type:"socket",url:a,protocols:b,request:d}),d};try{w(window.WebSocket,N)}catch(d){}}}return Z(b,a),b}(h),R=null,y=function(){return null==R&&(R=new k),R},I=function(a){var b,c,d,e;for(e=D.ajax.ignoreURLs,c=0,d=e.length;d>c;c++)if(b=e[c],"string"==typeof b){if(-1!==a.indexOf(b))return!0}else if(b.test(a))return!0;return!1},y().on("request",function(b){var c,d,e,f,g;return f=b.type,e=b.request,g=b.url,I(g)?void 0:j.running||D.restartOnRequestAfter===!1&&"force"!==J(f)?void 0:(d=arguments,c=D.restartOnRequestAfter||0,"boolean"==typeof c&&(c=0),setTimeout(function(){var b,c,g,h,i,k;if(b="socket"===f?e.readyState<2:0<(h=e.readyState)&&4>h){for(j.restart(),i=j.sources,k=[],c=0,g=i.length;g>c;c++){if(K=i[c],K instanceof a){K.watch.apply(K,d);break}k.push(void 0)}return k}},c))}),a=function(){function a(){var a=this;this.elements=[],y().on("request",function(){return a.watch.apply(a,arguments)})}return a.prototype.watch=function(a){var b,c,d,e;return d=a.type,b=a.request,e=a.url,I(e)?void 0:(c="socket"===d?new n(b):new o(b),this.elements.push(c))},a}(),o=function(){function a(a){var b,c,d,e,f,g,h=this;if(this.progress=0,null!=window.ProgressEvent)for(c=null,a.addEventListener("progress",function(a){return h.progress=a.lengthComputable?100*a.loaded/a.total:h.progress+(100-h.progress)/2},!1),g=["load","abort","timeout","error"],d=0,e=g.length;e>d;d++)b=g[d],a.addEventListener(b,function(){return h.progress=100},!1);else f=a.onreadystatechange,a.onreadystatechange=function(){var b;return 0===(b=a.readyState)||4===b?h.progress=100:3===a.readyState&&(h.progress=50),"function"==typeof f?f.apply(null,arguments):void 0}}return a}(),n=function(){function a(a){var b,c,d,e,f=this;for(this.progress=0,e=["error","open"],c=0,d=e.length;d>c;c++)b=e[c],a.addEventListener(b,function(){return f.progress=100},!1)}return a}(),d=function(){function a(a){var b,c,d,f;for(null==a&&(a={}),this.elements=[],null==a.selectors&&(a.selectors=[]),f=a.selectors,c=0,d=f.length;d>c;c++)b=f[c],this.elements.push(new e(b))}return a}(),e=function(){function a(a){this.selector=a,this.progress=0,this.check()}return a.prototype.check=function(){var a=this;return document.querySelector(this.selector)?this.done():setTimeout(function(){return a.check()},D.elements.checkInterval)},a.prototype.done=function(){return this.progress=100},a}(),c=function(){function a(){var a,b,c=this;this.progress=null!=(b=this.states[document.readyState])?b:100,a=document.onreadystatechange,document.onreadystatechange=function(){return null!=c.states[document.readyState]&&(c.progress=c.states[document.readyState]),"function"==typeof a?a.apply(null,arguments):void 0}}return a.prototype.states={loading:0,interactive:50,complete:100},a}(),f=function(){function a(){var a,b,c,d,e,f=this;this.progress=0,a=0,e=[],d=0,c=C(),b=setInterval(function(){var g;return g=C()-c-50,c=C(),e.push(g),e.length>D.eventLag.sampleCount&&e.shift(),a=q(e),++d>=D.eventLag.minSamples&&a<D.eventLag.lagThreshold?(f.progress=100,clearInterval(b)):f.progress=100*(3/(a+3))},50)}return a}(),m=function(){function a(a){this.source=a,this.last=this.sinceLastUpdate=0,this.rate=D.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=F(this.source,"progress"))}return a.prototype.tick=function(a,b){var c;return null==b&&(b=F(this.source,"progress")),b>=100&&(this.done=!0),b===this.last?this.sinceLastUpdate+=a:(this.sinceLastUpdate&&(this.rate=(b-this.last)/this.sinceLastUpdate),this.catchup=(b-this.progress)/D.catchupTime,this.sinceLastUpdate=0,this.last=b),b>this.progress&&(this.progress+=this.catchup*a),c=1-Math.pow(this.progress/100,D.easeFactor),this.progress+=c*this.rate*a,this.progress=Math.min(this.lastProgress+D.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},a}(),L=null,H=null,r=null,M=null,p=null,s=null,j.running=!1,z=function(){return D.restartOnPushState?j.restart():void 0},null!=window.history.pushState&&(T=window.history.pushState,window.history.pushState=function(){return z(),T.apply(window.history,arguments)}),null!=window.history.replaceState&&(W=window.history.replaceState,window.history.replaceState=function(){return z(),W.apply(window.history,arguments)}),l={ajax:a,elements:d,document:c,eventLag:f},(B=function(){var a,c,d,e,f,g,h,i;for(j.sources=L=[],g=["ajax","elements","document","eventLag"],c=0,e=g.length;e>c;c++)a=g[c],D[a]!==!1&&L.push(new l[a](D[a]));for(i=null!=(h=D.extraSources)?h:[],d=0,f=i.length;f>d;d++)K=i[d],L.push(new K(D));return j.bar=r=new b,H=[],M=new m})(),j.stop=function(){return j.trigger("stop"),j.running=!1,r.destroy(),s=!0,null!=p&&("function"==typeof t&&t(p),p=null),B()},j.restart=function(){return j.trigger("restart"),j.stop(),j.start()},j.go=function(){var a;return j.running=!0,r.render(),a=C(),s=!1,p=G(function(b,c){var d,e,f,g,h,i,k,l,n,o,p,q,t,u,v,w;for(l=100-r.progress,e=p=0,f=!0,i=q=0,u=L.length;u>q;i=++q)for(K=L[i],o=null!=H[i]?H[i]:H[i]=[],h=null!=(w=K.elements)?w:[K],k=t=0,v=h.length;v>t;k=++t)g=h[k],n=null!=o[k]?o[k]:o[k]=new m(g),f&=n.done,n.done||(e++,p+=n.tick(b));return d=p/e,r.update(M.tick(b,d)),r.done()||f||s?(r.update(100),j.trigger("done"),setTimeout(function(){return r.finish(),j.running=!1,j.trigger("hide")},Math.max(D.ghostTime,Math.max(D.minTime-(C()-a),0)))):c()})},j.start=function(a){v(D,a),j.running=!0;try{r.render()}catch(b){i=b}return document.querySelector(".pace")?(j.trigger("start"),j.go()):setTimeout(j.start,50)},"function"==typeof define&&define.amd?define(function(){return j}):"object"==typeof exports?module.exports=j:D.startOnPageLoad&&j.start()}).call(this);