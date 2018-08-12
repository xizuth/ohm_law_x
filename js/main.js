
const notacion = {
    "nano": {
        "name": 'n',
        "value": 0.000000001
    },
    "micro": {
        "name": 'u',
        "value": 0.000001
    },
    "mili": {
        "name": "m",
        "value": 0.001
    },
    "unit": {
        "name": "unit",
        "value": 1
    },
    "kilo": {
        "name": "k",
        "value": 1000
    },
    "mega": {
        "name": "M",
        "value": 1000000
    }
};

const units = {
    "voltage": {
        "name": "Voltage",
        "simbol": "V"
    },
    "current": {
        "name": "Current",
        "simbol": "A"
    },
    "resistance": {
        "name": "Resistance",
        "simbol": "Ω"
    }
};

/**
 * Lib Ohm
 */

let calculateVoltage = (current = 0.0, resistance = 0.0) => {
    return current * resistance;
}
let calculateCurrent = (voltage = 0.0, resistance = 0.0) => {
    return voltage / resistance;
}
let calculateResistance = (voltage = 0.0, current = 0.0) => {
    return voltage / current;
}

/**
 * Events
 */

let selectOption = (e) => {

    if (e.key === '-' || (e.key === '.')) { //FIX: si lo presi
        return;
    }

    focusInput(e);

    let optionSelected = e.target.parentElement;
    let items = [...document.getElementById('menu-option').querySelectorAll('li')];

    let option = items.indexOf(optionSelected);

    if (option === 0 || document.getElementById('voltage_option').checked) {
        loadNameLabel(units.current.name, units.resistance.name);
        setResutl(0);
    } else if (option === 1 || document.getElementById('current_option').checked) {
        loadNameLabel(units.voltage.name, units.resistance.name);
        setResutl(1);
    } else if (option === 2 || document.getElementById('resistance_option').checked) {
        loadNameLabel(units.voltage.name, units.current.name);
        setResutl(2);
    }

}

let focusInput = (e) => {
    let inputOne = document.getElementById('first_value_input');
    let inputSecond = document.getElementById('second_value_input');
    let listOne = document.getElementById('first_units_list');
    let listSecond = document.getElementById('second_units_list');
    let labelOne = document.getElementById('label_option_one');
    let labelSecond = document.getElementById('label_option_two');

    let option = 0;

    if (e.key === 'Enter') {
        if (e.target.id === 'first_value_input') {
            inputSecond.focus();
            inputSecond.select();
        } else {
            inputOne.focus();
            inputOne.select();
            option = 1;
        }
    }

    if ((e.target.parentElement.id === 'container_inputs_one' && e.type === 'click') || option) {
        inputOne.classList.add('focus_input_value');
        listOne.classList.add('focus_input_value');
        labelOne.classList.add('focus_label');
        inputSecond.classList.remove('focus_input_value');
        listSecond.classList.remove('focus_input_value');
        labelSecond.classList.remove('focus_label');
    } else {
        inputOne.classList.remove('focus_input_value');
        listOne.classList.remove('focus_input_value');
        labelOne.classList.remove('focus_label');
        inputSecond.classList.add('focus_input_value');
        listSecond.classList.add('focus_input_value');
        labelSecond.classList.add('focus_label');

    }

}
/** 
 * Methos
*/
let loadNameLabel = (valueOne = '', valueTwo = '') => {
    let labelOne = document.getElementById('label_option_one');
    let labelTwo = document.getElementById('label_option_two');

    labelOne.innerHTML = valueOne;
    labelTwo.innerHTML = valueTwo;
}

let setResutl = (option = 0) => {
    let valueOne = document.getElementById('first_value_input');
    let valueTwo = document.getElementById('second_value_input');

    if (valueOne.value === '' || valueTwo.value === '') {

        if (valueOne.validationMessage) {
            alert(valueOne.validationMessage);
            valueOne.select()
        }

        if (valueTwo.validationMessage) {
            alert(valueTwo.validationMessage)
            valueTwo.select();
        }
        return;
    }

    let resultLabel = document.getElementById('result');

    let first = parseFloat(valueOne.value);
    let second = parseFloat(valueTwo.value);

    if (isNaN(first)) {
        first = 0;
    } if (isNaN(second)) {
        second = 0;
    }

    let result = 0.0;
    let unit = '';
    if (option === 0) {
        result = calculateVoltage(first, second);
        unit = units.voltage.simbol;
    } else if (option === 1) {
        result = calculateCurrent(first, second);
        unit = units.current.simbol;
    } else if (option === 2) {
        result = calculateResistance(first, second);
        unit = units.resistance.simbol;
    }

    if (result === Infinity || (second === 0 && !document.getElementById('voltage_option').checked)) {
        resultLabel.innerText = Infinity;
    } else {
        resultLabel.innerText = `${formatNumber(result)} ${unit}`;
    }

};

let formatNumber = (number = 0.0) => {
    if (number === 0 || isNaN(number)) {
        return 0;
    }
    let unidad = Math.floor(number);
    let decimal = number - unidad;

    if (decimal === 0) {
        return unidad;
    } else {
        return unidad += decimal.toString().substring(1, 4);
    }
}

let getNotation = (value = 0) =>{
    
}
/**
 * Metodó auto ejecutable
 */
((d) => {

    let options = d.getElementById('menu-option');
    options.addEventListener('click', selectOption);

    let valueOne = d.getElementById('first_value_input');
    let valueTwo = d.getElementById('second_value_input');

    valueOne.addEventListener('keyup', selectOption);
    valueTwo.addEventListener('keyup', selectOption);

    d.getElementById('container_inputs_one').addEventListener('click', focusInput)
    d.getElementById('container_inputs_second').addEventListener('click', focusInput)

    let listOne = d.getElementById('first_units_list');
    listOne.addEventListener('change', (e)=>{
        selectOption();
    });
})(document);
