function serealizeSend(array) {
    var ret = [];
    array.map(function (data, i) {
        ret[i] =  "\""+data['name']+"\""+":"+"\""+data['value']+"\"";
    });
    return JSON.parse("{"+ ret.join(',') +"}");
}
export{serealizeSend}