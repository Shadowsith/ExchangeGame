declare interface Date {
    getUsDate(): string;
}

Date.prototype.getUsDate = function() {
    const self: Date = this;
    return `${self.getFullYear()}-${(self.getMonth()+1).toString()
        .padStart(2, '0')}-${self.getDate().toString().padStart(2, '0')}`;
};