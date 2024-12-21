const calculator = {
    display: 0,
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    },
    multiply: function(a, b) {
        return a * b;
    },
    divide: function(a, b) {
        return a / b;
    },
    setDisplay: function(value) {
        this.display = value;
    },
    getDisplay: function() {
        return this.display;
    },
    percentage: function(a,b) {
        return (a/100)*b;
    }

}

const View = {
    render(value) {
        const display = document.getElementById('display');
        display.innerHTML = value;
    }
}

const Controller = {

    init() {
        View.render(calculator.getDisplay());
    }


}

Controller.init();