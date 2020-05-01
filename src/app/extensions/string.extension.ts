declare interface String {
    format(args: string[]): string;
    isNullEmptyOrUndefined(): boolean;
}

String.prototype.format = function(args: string[]) {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

String.prototype.isNullEmptyOrUndefined = function() {
    return this === undefined || this === null || this === '';
}