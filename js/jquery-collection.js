var Collections = [], Collection = {};


Collection.__constructor = function(resource, values, origin){

    var constructor = {};
    constructor["name"] = resource;
    constructor[resource] = values;
    constructor["origin"] = origin;

    eval("window." + resource.substr(0,1).toUpperCase() + resource.substr(1).toLowerCase()
        + " = function(){return Collection.__attach('" + resource + "'); }");

    return constructor;
};

Collection.create = function(resource, values, origin){
    var name = resource;
    Collections.push(Collection.__constructor(resource, values, origin));
};


Collection.__attach = function(resource) {
    return Collections[0];
};