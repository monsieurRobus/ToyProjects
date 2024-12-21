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
        View.render(this.display);
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
    valueA: null,
    valueB: null,
    operator: null,
    comma: false,
    init() {
        this.valueA = null;
        this.valueB = null;
        this.operator = null;
        this.comma = false;
        calculator.setDisplay(0);
        View.render(calculator.getDisplay());
    },
    exec() {
        switch(this.operator)
        {
            case '+':
                calculator.setDisplay(calculator.add(this.valueA, this.valueB));
                break;
            case '-':
                calculator.setDisplay(calculator.subtract(this.valueA, this.valueB));
                break;
            case 'x':
                calculator.setDisplay(calculator.multiply(this.valueA, this.valueB));
                break;
            case '/':
                calculator.setDisplay(calculator.divide(this.valueA, this.valueB));
                break;
            case '%':
                calculator.setDisplay(calculator.percentage(this.valueA, this.valueB));
                break;
            case 'sign':
                calculator.setDisplay(calculator.multiply(this.valueA, -1));
                break;
        }
        this.opperator = null;
        this.valueA = calculator.getDisplay();
        this.valueB = null;
    },
    handleValue(value) {
        if(this.operator === null) {
            
            if(this.valueA === null) {
                this.valueA = value;
            } else {
                this.valueA = this.valueA * 10 + value;
            }
            calculator.setDisplay(this.valueA);
        }         
        else {
            if(this.valueB === null) {
                this.valueB = value;
            } else {
                this.valueB = this.valueB * 10 + value;
            }
            calculator.setDisplay(this.valueB);
        }
    },
    handleOperator(operator) {
        this.operator = operator;
        if(this.operator === 'sign') {
            this.exec();
        }
    },
    handleComma() {
        this.comma = true;
    }


}

Controller.init();