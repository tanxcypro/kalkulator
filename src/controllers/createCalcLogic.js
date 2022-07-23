import * as R from "ramda";
import math from "mathjs";
import Immutable from "seamless-immutable";
import Decimal from "decimal.js-light";

const createCalcLogic = function () {
  // chain of operation ids
  // adjacent number ids are kept together in 1 string starting from 'n'
  let input = Immutable([]);
  // input for the previous answer
  let prevInput = Immutable([]);
  // answer to display
  let answer = 0;
  // type of the clear operation is managed by the logic
  let clear = "ac";
  // logic of some buttons is different right after the answer is pressed
  let justAnswered = false;
  // prepare formatting, otherwise answer can take all input
  Decimal.set({ precision: 10, toExpNeg: -9, toExpPos: 9 });

  // helper checks
  const isNumber = (str) => str[0] === "n";
  const isOperation = (id) =>
    id === "+" || id === "-" || id === "*" || id === "/";
  const isAnswer = (id) => id === "answer";
  const isPositiveBallance = (input, opening, closing) => {
    const filtered = R.filter((a) => a === opening || a === closing, input);
    const count = R.countBy(R.identity, filtered);
    return (count[opening] || 0) > (count[closing] || 0);
  };

  // working with number type
  const createNumber = (id) => "n" + id;
  const numberValue = (n) => n.substr(1);
  const numberLength = (n) => n.length - 1;
  const numberChar = (index, n) => n[index + 1];
  const numberLastChar = (n) => numberChar(numberLength(n) - 1, n);
  const numberAddId = (id, number) => number + id;
  const numberRemoveLast = (number) => number.substr(0, number.length - 1);
  const isValidNumber = (n) =>
    isNumber(n) && numberLastChar(n) !== "-" && numberLastChar(n) !== ".";

  // helper actions, to make rules more expressive
  const addNew = (id, input) => input.set(input.length, id);
  const replaceLast = (id, input) => input.set(input.length - 1, id);
  const removeLast = (input) => R.dropLast(1, input);
  const addToLastNumber = (id, input) =>
    input.set(input.length - 1, numberAddId(id, R.last(input)));
  const removeFromLastNumber = (input) =>
    replaceLast(numberRemoveLast(R.last(input)), input);

  // common rulles for a set of operations

  const numberRules = function (input, id, last) {
    if (!last || justAnswered) {
      return [createNumber(id)];
    } else {
      if (isNumber(last)) {
        if (numberLength(last) === 1 && numberLastChar(last) === "0") {
          // don't allow '01' etc
          if (input.length === 1) {
            return replaceLast(createNumber(id), input);
          }
          return input;
        }
        if (
          numberLength(last) === 2 &&
          numberChar(0, last) === "-" &&
          numberChar(1, last) === "0"
        ) {
          if (input.length === 1) {
            return replaceLast(createNumber("-" + id), input);
          }
          return input;
        }
        return replaceLast(numberAddId(id, last), input);
      } else if (isOperation(last) || last === "(") {
        return addNew(createNumber(id), input);
      }
    }
    return input;
  };

  const operationRules = function (input, id, last) {
    if (!last) {
      return [createNumber("0"), id];
    } else {
      if (isValidNumber(last)) {
        return addNew(id, input);
      } else if (isAnswer(last) || last === ")") {
        return addNew(id, input);
      } else if (isOperation(last)) {
        return replaceLast(id, input);
      }
    }
    return input;
  };

  // rules per operation 'id'

  const rules = {
    "0": function (input, id, last) {
      if (!last || justAnswered) {
        // keep '0', expecting '0.' or '0 +' etc
        return [createNumber("0")];
      }
      if (isNumber(last)) {
        if (
          (numberLength(last) === 1 && numberChar(0, last) === "0") ||
          (numberLength(last) === 2 &&
            numberChar(0, last) === "-" &&
            numberChar(1, last) === "0")
        ) {
          // '00' not allowed
          return input;
        }
        return addToLastNumber(id, input);
      } else if (!isAnswer(last)) {
        return addNew(id, input);
      }
      return input;
    },

    "1": numberRules,
    "2": numberRules,
    "3": numberRules,
    "4": numberRules,
    "5": numberRules,
    "6": numberRules,
    "7": numberRules,
    "8": numberRules,
    "9": numberRules,

    ".": function (input, id, last) {
      if (!last) {
        return [createNumber("0.")];
      } else if (
        !isValidNumber(last) ||
        R.contains(".", last) ||
        justAnswered
      ) {
        return input;
      } else {
        return addToLastNumber(id, input);
      }
    },

    "*": operationRules,
    "/": operationRules,
    "+": operationRules,
    "-": function (input, id, last) {
      if (last === "(") {
        return addNew(createNumber("-"), input);
      } else if (R.isEmpty(input)) {
        return [createNumber("-")];
      } else {
        return operationRules(input, id, last);
      }
    },

    "(": function (input, id, last) {
      if (!last || justAnswered) {
        return [id];
      }
      if (isOperation(last) || last === id) {
        return addNew(id, input);
      }
      return input;
    },

    ")": function (input, id, last) {
      if (!last || justAnswered) {
        return input;
      }
      if (isNumber(last) || isAnswer(last) || last === id) {
        // don't allow closing bracket without opening one
        if (isPositiveBallance(input, "(", ")")) {
          return addNew(id, input);
        }
      }
      return input;
    },

    answer: function (input, id, last) {
      if (!last || justAnswered) {
        return ["answer"];
      }
      if (isOperation(last) || last === "(") {
        return addNew(id, input);
      }
      return input;
    },

    ce: function (input, id, last) {
      if (last) {
        if (isNumber(last) && numberLength(last) > 1) {
          return removeFromLastNumber(input);
        } else {
          return removeLast(input);
        }
      }
      return [];
    },

    ac: function (input, id, last) {
      return [];
    }
  };

  const prettyInput = function (input) {
    const extractNumber = (n) => (isNumber(n) ? numberValue(n) : n);
    return R.map(extractNumber, input);
  };

  // main calculation function
  // mathjs does all the math-lifting for us
  const calcAnswer = function (input, answer) {
    if (R.isEmpty(input)) {
      return 0;
    }
    try {
      const fixedAnswer = isNaN(answer) ? 0 : answer;
      const replaceAnswer = (id) => (isAnswer(id) ? `${fixedAnswer}` : id);
      const fixedInput = R.map(replaceAnswer, prettyInput(input));
      const expression = R.join(" ", fixedInput);
      return math.eval(expression);
    } catch (e) {
      return NaN;
    }
  };

  const formatAnswer = function (number) {
    if (!number) {
      return number.toString();
    } else {
      return Decimal(number).mul(1).toString();
    }
  };

  // main operation
  // returs input and answer according to incomming action
  // mutates state
  const action = function (id) {
    if (id === "=") {
      answer = formatAnswer(calcAnswer(input, answer));
      clear = "ac";
      justAnswered = true;
      prevInput = Immutable(addNew("=", input));
      input = Immutable([createNumber(answer)]);
    } else {
      let newInput = Immutable(rules[id](input, id, R.last(input)));
      if ((justAnswered || clear === "ac") && !R.equals(newInput, input)) {
        // smth visible happened
        if (clear === "ac") {
          clear = "ce";
        }
        if (justAnswered) {
          prevInput = Immutable(["answer", "=", createNumber(answer)]);
        }
        justAnswered = false;
      }
      input = newInput;
    }

    // enable logging the input (often needed during dev)
    // console.log(input);

    return {
      input,
      prevInput,
      answer,
      clear
    };
  };

  return {
    // data
    input,
    prevInput,
    answer,
    clear,
    // functions
    action,
    prettyInput
  };
};

export default createCalcLogic;
