// STEP 1: DESIGN PATTERNS \\
// Builder Pattern Demo Start \\
class Calculator {
    constructor(props) {
        this.result = 0;
    }

    add(num) {
        this.result += num;
        return this;
    }

    subtract(num) {
        this.result -= num;
        return this;
    }

    multiply(num) {
        this.result *= num;
        return this;
    }

    divide(num) {
        this.result /= num;
        return this;
    }

    compute() {
        return this.result;
    }
}

// Usage:
let calculator = new Calculator();
let calculator2 = new Calculator();

let expression1 = calculator.add(5).subtract(1).multiply(2).divide(2);
let expression2 = calculator2.add(1).subtract(4).multiply(2).divide(8);

console.groupCollapsed('Builder Pattern');
console.log('result 1:', expression1.result);
console.log('result 2:', expression2.result);
console.groupEnd();
// Builder Pattern Demo End \\

// Facade Pattern Demo Start \\
class CPU {
    freeze() {
        // Code here
    }
    jump(position) {
        // Code here
    }
    execute() {
        // Code here
    }
}

class Memory {
    load(pos, data) {
        // Code here
    }
}

class HardDrive {
    read(lba, size) {
        // Code here
    }
}

class ComputerFacade {
    constructor() {
        this.processor = new CPU();
        this.ram = new Memory();
        this.hd = new HardDrive();
    }

    start() {
        this.processor.freeze();
        console.log('Processor Freeze Success');
        this.ram.load(this.BOOT_ADDRESS, this.hd.read(this.BOOT_SECTOR, this.SECTOR_SIZE));
        console.log('Ram Load Success');
        this.processor.jump(this.BOOT_ADDRESS);
        console.log('Processor Jump Success');
        // . . .
        this.processor.execute();
        console.log('Processor Execute Success');
    }
}

// Usage:
console.groupCollapsed('Facade Pattern');
let computer = new ComputerFacade();
computer.start();
console.groupEnd();
// Facade Pattern Demo End \\

// Composites Pattern Demo Start \\
// Component Class
class Employee {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
}

// Leaf Subclass
class SoftwareDeveloper extends Employee {
    constructor(name, position) {
        super(name, position);
    }
}

// Leaf Subclass
class FreelanceDesigner extends Employee {
    constructor(name, position) {
        super(name, position);
    }
}

// Composite Subclass
class DevTeamLead extends Employee {
    constructor(name, position) {
        super(name, position);
        this.teamMembers = [];
    }

    addMember(employee) {
        this.teamMembers.push(employee);
    }

    viewTeam() {
        let employeeNames = this.teamMembers.map((member) => member.name);
        
        return employeeNames;
    }
    // ...
}

// Usage:
const seniorDev = new SoftwareDeveloper('Rachel', 'Senior Developer');
const companyDesigner = new FreelanceDesigner('Joey', 'Web Designer');
const teamLead = new DevTeamLead('Regina', 'Dev Team Lead');

teamLead.addMember(seniorDev);
teamLead.addMember(companyDesigner);

console.groupCollapsed('Composites Pattern');
console.log('Team members list:', teamLead.viewTeam());
console.groupEnd();
// Composites Pattern Demo End \\

// Observer Pattern Demo Start \\
class EventObserver {
    constructor() {
        this.observers = [];
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    unsubscribe(fn) {
        this.observers = this.observers.filter((sub) => sub !== fn);
    }

    broadcast(data) {
        this.observers.forEach((sub) => sub(data));
    }
}

// Usage:
const getWordCount = (text) => (text ? text.trim().split(/\s+/).length : 0);

const wordCountElement = document.createElement('p');

wordCountElement.className = 'wordCount';
wordCountElement.innerHTML = 'Word Count: <strong id="blogWordCount">0</strong>';
document.body.appendChild(wordCountElement);

const blogObserver = new EventObserver();

blogObserver.subscribe((text) => {
    const blogCount = document.getElementById('blogWordCount');

    blogCount.textContent = getWordCount(text);
});

const blogPost = document.getElementById('blogPost');

blogPost.addEventListener('keyup', () => blogObserver.broadcast(blogPost.value));
// Observer Pattern Demo End \\

// STEP 2: CALLBACKS, PROMISES, ASYNC \\
// ~~~~~ SYNCHRONOUS CODING ~~~~~ \\
function goToSchool() {
    console.log('THE BUS! Welp, I missed the bus!');
}
function code() {
    console.log('Coded all day successfully!');
}

// Usage:
console.groupCollapsed('Synchronous Coding');
goToSchool();
code();
console.groupEnd();

// ~~~~~ CALLBACKS ~~~~~ \\
function growCorn() {
    setTimeout(() => {
        console.log('Corn Success');
    }, 3000);
}
function PickApple() {
    console.log('Apple Success');
}

// Usage:
growCorn();
PickApple();

// ~~~~~ PROMISES ~~~~~ \\
const someAPIRequest = {
    success: Math.random() < 0.5,
    data: 'Here is your data',
};
const getDetails = new Promise((resolve, reject) => {
    if (someAPIRequest.success) {
        resolve(someAPIRequest.data);
    } else {
        reject(new Error('API Request Failed. Try Again.'));
    }
});

// Usage:
getDetails
    .then((done) => {
        console.log('done:', done);
    })
    .catch((err) => {
        console.log('err:', err);
    });

// STEP 3: ASYNC / AWAIT \\
// ~~~~~ OLD WAY (PROMISES) ~~~~~ \\
function getAllCommentsUsingPromises() {
    const data = fetch('https://jsonplaceholder.typicode.com/comments')
        .then((response) => response.json())
        .then((json) => console.log('PROMISES:', json))
        .catch((err) => console.log('err:', err));
}

getAllCommentsUsingPromises();

// ~~~~~ NEW WAY (ASYNC / AWAIT) ~~~~~ \\
async function getAllCommentsUsingAsyncAwait() {
    try {
        const data = await fetch('https://jsonplaceholder.typicode.com/comments');
        const res = await data.json();
        console.log('ASYNC/AWAIT:', res);
    } catch (err) {
        console.log('err:', err);
    }
}

getAllCommentsUsingAsyncAwait();

// ~~~~~ STEP 4: MEMOIZATION ~~~~~ \\
function fibonacci(n) {
    // Base Case
    if (n <= 2) return 1;

    // Recursive Function call
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized
function memoizedFibonacci(n, memo) {
    // Memoization Initialization
    memo = memo || {};

    // Memoization Call
    if (memo[n]) return memo[n];

    // Base Case
    if (n <= 2) return 1;

    // Recursive Function call
    return (memo[n] = memoizedFibonacci(n - 1, memo) + memoizedFibonacci(n - 2, memo));
}

const TenthFibonacciNumber = memoizedFibonacci(10);
console.log('TenthFibonacciNumber:', TenthFibonacciNumber);

// ~~~~~~ MEMOIZED HOF ~~~~~~ \\
function fibonacciRecursion(n) {
    // Base Case
    if (n <= 2) return 1;

    // Recursive Function call
    return fibonacciRecursion(n - 1) + fibonacciRecursion(n - 2);
}

function memoizer(fun) {
    let cache = {};

    return function (n) {
        if(cache[n] != undefined) {
            return cache[n];
        } else {
            let result = fun(n);
            cache[n] = result;

            return result;
        }
    };
}

const fibonacciMemoHOF = memoizer(fibonacciRecursion);
console.log('fibonacciMemoHOF:', fibonacciMemoHOF(10));
console.groupEnd();

// STEP 5: SPREAD VS. REST \\
// ~~~~~~~ REST OPERATOR ~~~~~~~ \\
console.groupCollapsed('Rest Operator');

function sumOf(...args) {
    console.log('args:', args);

    let sum = 0;

    args.forEach((arg) => (sum += arg));

    return sum;
}

const testCalculation = sumOf(1, 2, 5, 8);

console.log('testCalculation:', testCalculation);
console.groupEnd();

// ~~~~~~~ SPREAD OPERATOR ~~~~~~~ \\
const ninthGraders = ['Jennifer', 'Berry', 'Ashley', 'Bernard'];
const tenthGraders = ['Jason', 'Amy', 'Samuel', 'Cook'];
const completeListOfStudents = [...ninthGraders, ...tenthGraders];

console.groupCollapsed('Spread Operator');
console.log('completeListOfStudents:', completeListOfStudents);
console.groupEnd();