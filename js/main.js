const notation = {
    "nano": {
        "name": "n",
        "value": 0.000000001
    },
    "micro": {
        "name": "u",
        "value": 0.000001
    },
    "mili": {
        "name": "m",
        "value": 0.001
    },
    "unit": {
        "name": "",
        "value": 1
    },
    "kilo": {
        "name": "k",
        "value": 1000
    },
    "mega": {
        "name": "M",
        "value": 1000000
    },
    "allValues": ['n', 'u', 'm', '', 'k', 'M']
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
    },
    "allSimbol": ["V", "A", "Ω"]
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

    console.dir(e);

    if (e.key === '-' || (e.key === '.')) {
        return;
    }

    clearInput(e);
    focusInput(e);

    let optionSelected = e.target.parentElement;
    let items = [...document.getElementById('menu-option').querySelectorAll('li')];

    let option = items.indexOf(optionSelected);

    if (option === 0 || document.getElementById('voltage_option').checked) {
        if (!(e.type === 'change') && !(e.type === 'keyup')) {
            loadNameLabel(units.current.name, units.resistance.name);
            loadListUnit(units.current.simbol, getListNotation().firstList);
            loadListUnit(units.resistance.simbol, getListNotation().secondList);
        }
        setResutl(0);
    } else if (option === 1 || document.getElementById('current_option').checked) {
        if (!(e.type === 'change') && !(e.type === 'keyup')) {
            loadNameLabel(units.voltage.name, units.resistance.name);
            loadListUnit(units.voltage.simbol, getListNotation().firstList);
            loadListUnit(units.resistance.simbol, getListNotation().secondList);
        }
        setResutl(1);
    } else if (option === 2 || document.getElementById('resistance_option').checked) {
        if (!(e.type === 'change') && !(e.type === 'keyup')) {
            loadNameLabel(units.voltage.name, units.current.name);
            loadListUnit(units.voltage.simbol, getListNotation().firstList);
            loadListUnit(units.current.simbol, getListNotation().secondList);
        }
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
            option = 2;
        } else {
            inputOne.focus();
            inputOne.select();
            option = 1;
        }
    }

    if ((e.target.parentElement.id === 'container_inputs_one' && e.type === 'click') || option === 1) {
        inputOne.classList.add('focus_input_value');
        listOne.classList.add('focus_input_value');
        labelOne.classList.add('focus_label');
        inputSecond.classList.remove('focus_input_value');
        listSecond.classList.remove('focus_input_value');
        labelSecond.classList.remove('focus_label');
    }
    if ((e.target.parentElement.id === 'container_inputs_second' && e.type === 'click') || option === 2) {
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

let clearInput = (e) => {
    if (e.key === 'Escape') {
        if (e.target.id === "first_value_input") {
            e.target.value = "";
        }
        if (e.target.id === "second_value_input") {
            e.target.value = "";
        }
    }
}
let loadNameLabel = (valueOne = '', valueTwo = '') => {
    let labelOne = document.getElementById('label_option_one');
    let labelTwo = document.getElementById('label_option_two');

    labelOne.innerHTML = valueOne;
    labelTwo.innerHTML = valueTwo;
}

let setResutl = (option = 0) => {
    let valueOne = document.getElementById('first_value_input');
    let valueTwo = document.getElementById('second_value_input');
    let resultLabel = document.getElementById('result');

    let first = parseFloat(valueOne.value);
    let second = parseFloat(valueTwo.value);

    first = toZero(first);
    second = toZero(second);

    let result = 0.0;
    let unit = '';

    first = roundValue(first, getListNotation().firstList);
    second = roundValue(second, getListNotation().secondList);

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
        result = getResultWithNotation(result);
        resultLabel.innerText = `${formatNumber(result.value)} ${result.notation}${unit}`;
    }

};

let toZero = (number) => {
    return isNaN(number) ? 0.0 : number;
}

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

let getListNotation = () => {
    let listOne = document.getElementById('first_units_list');
    let secondList = document.getElementById('second_units_list');

    return {
        firstList: listOne,
        secondList: secondList
    }
}

let roundValue = (value = 0.0, notationList) => {
    let index = notationList.selectedIndex;
    if (index === 1) return value *= notation.micro.value;
    if (index === 2) return value *= notation.mili.value;
    if (index === 3) return value *= notation.unit.value;
    if (index === 4) return value *= notation.kilo.value;
    if (index === 5) return value *= notation.mega.value;
}

let loadListUnit = (simbol, select) => {

    select = removeAllOptions(select);

    for (let index = 0; index < notation.allValues.length; index++) {
        let optionNew = document.createElement('option');
        optionNew.innerText = notation.allValues[index] + simbol;
        if (notation.allValues[index] === notation.unit.name) {
            optionNew.setAttribute('selected', '')
            optionNew.setAttribute('translate', 'no')
        }
        select.add(optionNew)
    }

    return select;
}

let removeAllOptions = (select) => {

    while (select.length !== 0) {
        select.remove(0);
    }

    return select;
}

let getResultWithNotation = (value = 0.0) => {
    if (value == 0) {
        return {
            value,
            notation: ""
        }
    }
    let flag = false;
    let notationSelect = "";
    if (value < 0) {
        value *= -1;
        flag = true;
    }

    if (value < notation.micro.value) {
        value /= notation.nano.value;
        notationSelect += notation.nano.name;
        console.log(notation.micro.value);

    }
    if (value >= notation.micro.value && value < notation.mili.value) {
        value /= notation.micro.value;
        notationSelect += notation.micro.name;
        console.log('micro');

    }
    if (value >= notation.mili.value && value < notation.unit.value) {
        value /= notation.mili.value;
        notationSelect += notation.mili.name;
        console.log('mili');

    }
    if (value >= notation.unit.value && value < notation.kilo.value) {
        value /= notation.unit.value;
        notationSelect += notation.unit.name;
        console.log('unit');

    }
    if (value >= notation.kilo.value && value < notation.mega.value) {
        value /= notation.kilo.value;
        notationSelect += notation.kilo.name;
        console.log('kilo');

    }
    if (value >= notation.mega.value) {
        value /= notation.mega.value;
        notationSelect += notation.mega.name;
        console.log('mega');

    }

    if (flag) {
        value *= -1;
    }

    return {
        value,
        notation: notationSelect
    }
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
    listOne.addEventListener('change', selectOption);
    let listTwo = d.getElementById('second_units_list');
    listTwo.addEventListener('change', selectOption);

})(document);
