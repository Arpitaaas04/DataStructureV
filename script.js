
// =====================================
// COMMON HELPER FUNCTIONS
// =====================================

function showSection(id) {
    document.getElementById("welcome").style.display = "none";

    document.querySelectorAll(".module").forEach(section => {
        section.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}

function getNumber(id) {
    const value = document.getElementById(id).value;

    if (value.trim() === "") {
        alert("Please enter a value.");
        return null;
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
        alert("Enter a valid number.");
        return null;
    }

    return number;
}

// =====================================
// 1. STACK
// =====================================

let stack = [];

function pushStack() {
    let value = getNumber("stackValue");
    if (value === null) return;

    stack.push(value);
    displayStack();
    document.getElementById("stackMessage").innerText =
        value + " pushed into stack.";
}

function popStack() {
    if (stack.length === 0) {
        document.getElementById("stackMessage").innerText =
            "Stack Underflow!";
        return;
    }

    let removed = stack.pop();
    displayStack();

    document.getElementById("stackMessage").innerText =
        removed + " popped from stack.";
}

function peekStack() {
    if (stack.length === 0) {
        document.getElementById("stackMessage").innerText =
            "Stack is empty.";
        return;
    }

    document.getElementById("stackMessage").innerText =
        "Top element: " + stack[stack.length - 1];
}

function displayStack() {
    let area = document.getElementById("stackDisplay");
    area.innerHTML = "";

    stack.forEach((value, index) => {
        let node = document.createElement("div");
        node.className = "node";
        node.innerText = value +
            (index === stack.length - 1 ? " (TOP)" : "");
        area.appendChild(node);
    });
}

// =====================================
// 2. QUEUE
// =====================================

let queue = [];

function enqueue() {
    let value = getNumber("queueValue");
    if (value === null) return;

    queue.push(value);
    displayQueue();

    document.getElementById("queueMessage").innerText =
        value + " inserted into queue.";
}

function dequeue() {
    if (queue.length === 0) {
        document.getElementById("queueMessage").innerText =
            "Queue Underflow!";
        return;
    }

    let removed = queue.shift();
    displayQueue();

    document.getElementById("queueMessage").innerText =
        removed + " removed from queue.";
}

function frontQueue() {
    if (queue.length === 0) {
        document.getElementById("queueMessage").innerText =
            "Queue is empty.";
        return;
    }

    document.getElementById("queueMessage").innerText =
        "Front element: " + queue[0];
}

function displayQueue() {
    let area = document.getElementById("queueDisplay");
    area.innerHTML = "";

    queue.forEach((value, index) => {
        let node = document.createElement("div");
        node.className = "node";
        node.innerText = value;

        if (index === 0) node.innerText += " (FRONT)";
        if (index === queue.length - 1) node.innerText += " (REAR)";

        area.appendChild(node);
    });
}

// =====================================
// 3. SINGLY LINKED LIST
// =====================================

class SNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

let singlyHead = null;

function singlyInsertBeginning() {
    let value = getNumber("singlyValue");
    if (value === null) return;

    let node = new SNode(value);
    node.next = singlyHead;
    singlyHead = node;

    displaySingly();
    singlyMsg("Inserted at beginning.");
}

function singlyInsertEnd() {
    let value = getNumber("singlyValue");
    if (value === null) return;

    let node = new SNode(value);

    if (singlyHead === null) {
        singlyHead = node;
    } else {
        let current = singlyHead;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = node;
    }

    displaySingly();
    singlyMsg("Inserted at end.");
}

function singlyInsertPosition() {
    let value = getNumber("singlyValue");
    let pos = getNumber("singlyPosition");

    if (value === null || pos === null) return;

    if (!Number.isInteger(pos) || pos < 1) {
        singlyMsg("Enter a valid position.");
        return;
    }

    if (pos === 1) {
        singlyInsertBeginning();
        return;
    }

    let current = singlyHead;

    for (let i = 1; i < pos - 1 && current !== null; i++) {
        current = current.next;
    }

    if (current === null) {
        singlyMsg("Invalid position.");
        return;
    }

    let node = new SNode(value);
    node.next = current.next;
    current.next = node;

    displaySingly();
    singlyMsg("Inserted at position " + pos + ".");
}

function singlyDeleteBeginning() {
    if (singlyHead === null) {
        singlyMsg("List is empty.");
        return;
    }

    singlyHead = singlyHead.next;
    displaySingly();
    singlyMsg("First node deleted.");
}

function singlyDeleteEnd() {
    if (singlyHead === null) {
        singlyMsg("List is empty.");
        return;
    }

    if (singlyHead.next === null) {
        singlyHead = null;
    } else {
        let current = singlyHead;

        while (current.next.next !== null) {
            current = current.next;
        }

        current.next = null;
    }

    displaySingly();
    singlyMsg("Last node deleted.");
}

function singlyDeletePosition() {
    let pos = getNumber("singlyPosition");
    if (pos === null) return;

    if (!Number.isInteger(pos) || pos < 1) {
        singlyMsg("Enter a valid position.");
        return;
    }

    if (singlyHead === null) {
        singlyMsg("List is empty.");
        return;
    }

    if (pos === 1) {
        singlyDeleteBeginning();
        return;
    }

    let current = singlyHead;

    for (let i = 1; i < pos - 1 && current !== null; i++) {
        current = current.next;
    }

    if (current === null || current.next === null) {
        singlyMsg("Invalid position.");
        return;
    }

    current.next = current.next.next;

    displaySingly();
    singlyMsg("Node deleted.");
}

function singlySearch() {
    let value = getNumber("singlyValue");
    if (value === null) return;

    let current = singlyHead;
    let pos = 1;

    while (current !== null) {
        if (current.data === value) {
            singlyMsg("Found at position " + pos + ".");
            return;
        }

        current = current.next;
        pos++;
    }

    singlyMsg("Element not found.");
}

function displaySingly() {
    let area = document.getElementById("singlyDisplay");
    area.innerHTML = "";

    let current = singlyHead;

    while (current !== null) {
        let node = document.createElement("div");
        node.className = "node";
        node.innerText = current.data + " →";
        area.appendChild(node);

        current = current.next;
    }

    let end = document.createElement("div");
    end.innerText = "NULL";
    area.appendChild(end);
}

function singlyMsg(message) {
    document.getElementById("singlyMessage").innerText = message;
}
// =====================================
// 4. DOUBLY LINKED LIST
// =====================================

class DNode {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

let doublyHead = null;

function doublyInsertBeginning() {
    let value = getNumber("doublyValue");
    if (value === null) return;

    let node = new DNode(value);

    if (doublyHead !== null) {
        node.next = doublyHead;
        doublyHead.prev = node;
    }

    doublyHead = node;
    displayDoubly();
    doublyMsg("Inserted at beginning.");
}

function doublyInsertEnd() {
    let value = getNumber("doublyValue");
    if (value === null) return;

    let node = new DNode(value);

    if (doublyHead === null) {
        doublyHead = node;
    } else {
        let current = doublyHead;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = node;
        node.prev = current;
    }

    displayDoubly();
    doublyMsg("Inserted at end.");
}

function doublyDeleteBeginning() {
    if (doublyHead === null) {
        doublyMsg("List is empty.");
        return;
    }

    doublyHead = doublyHead.next;

    if (doublyHead !== null) {
        doublyHead.prev = null;
    }

    displayDoubly();
    doublyMsg("First node deleted.");
}

function doublyDeleteEnd() {
    if (doublyHead === null) {
        doublyMsg("List is empty.");
        return;
    }

    if (doublyHead.next === null) {
        doublyHead = null;
    } else {
        let current = doublyHead;

        while (current.next !== null) {
            current = current.next;
        }

        current.prev.next = null;
    }

    displayDoubly();
    doublyMsg("Last node deleted.");
}

function displayDoubly() {
    let area = document.getElementById("doublyDisplay");
    area.innerHTML = "";

    let current = doublyHead;

    while (current !== null) {
        let node = document.createElement("div");
        node.className = "node";
        node.innerText = current.data;
        area.appendChild(node);

        current = current.next;
    }

    if (doublyHead === null) {
        area.innerText = "NULL";
    }
}

function doublyMsg(message) {
    document.getElementById("doublyMessage").innerText = message;
}
function doublyInsertPosition() {
    let value = getNumber("doublyValue");
    let pos = getNumber("doublyPosition");

    if (value === null || pos === null) return;

    if (!Number.isInteger(pos) || pos < 1) {
        doublyMsg("Invalid position.");
        return;
    }

    if (pos === 1) {
        doublyInsertBeginning();
        return;
    }

    let current = doublyHead;

    for (let i = 1; i < pos - 1 && current !== null; i++) {
        current = current.next;
    }

    if (current === null) {
        doublyMsg("Invalid position.");
        return;
    }

    let node = new DNode(value);

    node.next = current.next;
    node.prev = current;

    if (current.next !== null) {
        current.next.prev = node;
    }

    current.next = node;

    displayDoubly();
    doublyMsg("Inserted at position " + pos);
}

function doublyDeletePosition() {
    let pos = getNumber("doublyPosition");

    if (pos === null) return;

    if (!Number.isInteger(pos) || pos < 1) {
        doublyMsg("Invalid position.");
        return;
    }

    if (doublyHead === null) {
        doublyMsg("List is empty.");
        return;
    }

    let current = doublyHead;

    for (let i = 1; i < pos && current !== null; i++) {
        current = current.next;
    }

    if (current === null) {
        doublyMsg("Invalid position.");
        return;
    }

    if (current.prev !== null) {
        current.prev.next = current.next;
    } else {
        doublyHead = current.next;
    }

    if (current.next !== null) {
        current.next.prev = current.prev;
    }

    displayDoubly();
    doublyMsg("Node deleted.");
}

function doublyForward() {
    displayDoubly();
    doublyMsg("Displaying forward.");
}

function doublyBackward() {
    let area = document.getElementById("doublyDisplay");
    area.innerHTML = "";

    let current = doublyHead;

    if (current === null) {
        doublyMsg("List is empty.");
        return;
    }

    while (current.next !== null) {
        current = current.next;
    }

    while (current !== null) {
        let node = document.createElement("div");
        node.className = "node";
        node.innerText = current.data;
        area.appendChild(node);

        current = current.prev;
    }

    doublyMsg("Displaying backward.");
}
// =====================================
// 5. CIRCULAR LINKED LIST
// =====================================

class CNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

let circularHead = null;

function circularInsertBeginning() {
    let value = getNumber("circularValue");
    if (value === null) return;

    let node = new CNode(value);

    if (circularHead === null) {
        circularHead = node;
        node.next = circularHead;
    } else {
        let current = circularHead;

        while (current.next !== circularHead) {
            current = current.next;
        }

        node.next = circularHead;
        current.next = node;
        circularHead = node;
    }

    displayCircular();
    circularMsg("Inserted at beginning.");
}

function circularInsertEnd() {
    let value = getNumber("circularValue");
    if (value === null) return;

    let node = new CNode(value);

    if (circularHead === null) {
        circularHead = node;
        node.next = circularHead;
    } else {
        let current = circularHead;

        while (current.next !== circularHead) {
            current = current.next;
        }

        current.next = node;
        node.next = circularHead;
    }

    displayCircular();
    circularMsg("Inserted at end.");
}

function circularDeleteBeginning() {
    if (circularHead === null) {
        circularMsg("List is empty.");
        return;
    }

    if (circularHead.next === circularHead) {
        circularHead = null;
    } else {
        let current = circularHead;

        while (current.next !== circularHead) {
            current = current.next;
        }

        circularHead = circularHead.next;
        current.next = circularHead;
    }

    displayCircular();
    circularMsg("First node deleted.");
}

function circularDeleteEnd() {
    if (circularHead === null) {
        circularMsg("List is empty.");
        return;
    }

    if (circularHead.next === circularHead) {
        circularHead = null;
    } else {
        let current = circularHead;

        while (current.next.next !== circularHead) {
            current = current.next;
        }

        current.next = circularHead;
    }

    displayCircular();
    circularMsg("Last node deleted.");
}

function displayCircular() {
    let area = document.getElementById("circularDisplay");
    area.innerHTML = "";

    if (circularHead === null) {
        area.innerText = "List is empty.";
        return;
    }

    let current = circularHead;

    do {
        let node = document.createElement("div");
        node.className = "node";
        node.innerText = current.data + " →";
        area.appendChild(node);

        current = current.next;
    } while (current !== circularHead);

    let end = document.createElement("div");
    end.innerText = "BACK TO HEAD";
    area.appendChild(end);
}

function circularMsg(message) {
    document.getElementById("circularMessage").innerText = message;
    // INSERT AT A SPECIFIC POSITION

function circularInsertPosition() {
    let value = getNumber("circularValue");
    let pos = getNumber("circularPosition");

    if (value === null || pos === null) return;

    if (!Number.isInteger(pos) || pos < 1) {
        circularMsg("Invalid position.");
        return;
    }

    if (pos === 1) {
        circularInsertBeginning();
        return;
    }

    if (circularHead === null) {
        circularMsg("Invalid position.");
        return;
    }

    let current = circularHead;

    for (let i = 1; i < pos - 1; i++) {
        current = current.next;

        if (current === circularHead) {
            circularMsg("Invalid position.");
            return;
        }
    }

    let node = new CNode(value);

    node.next = current.next;
    current.next = node;

    displayCircular();
    circularMsg("Inserted at position " + pos);
}

// DELETE AT A SPECIFIC POSITION

function circularDeletePosition() {
    let pos = getNumber("circularPosition");

    if (pos === null) return;

    if (!Number.isInteger(pos) || pos < 1) {
        circularMsg("Invalid position.");
        return;
    }

    if (circularHead === null) {
        circularMsg("List is empty.");
        return;
    }

    if (pos === 1) {
        circularDeleteBeginning();
        return;
    }

    let current = circularHead;

    for (let i = 1; i < pos - 1; i++) {
        current = current.next;

        if (current === circularHead) {
            circularMsg("Invalid position.");
            return;
        }
    }

    if (current.next === circularHead) {
        circularMsg("Invalid position.");
        return;
    }

    current.next = current.next.next;

    displayCircular();
    circularMsg("Node deleted.");
}

// SEARCH AN ELEMENT

function circularSearch() {
    let value = getNumber("circularValue");

    if (value === null) return;

    if (circularHead === null) {
        circularMsg("List is empty.");
        return;
    }

    let current = circularHead;
    let pos = 1;

    do {
        if (current.data === value) {
            circularMsg("Found at position " + pos);
            return;
        }

        current = current.next;
        pos++;

    } while (current !== circularHead);

    circularMsg("Element not found.");
}
}
// =====================================
// 6. TOWER OF HANOI
// =====================================


// =====================================
// 6. ANIMATED TOWER OF HANOI
// =====================================

let hanoiRods = [[], [], []];
let hanoiMoves = 0;
let hanoiRunning = false;
let hanoiTimer = null;

const diskColors = [
    "#316ac5",
    "#e67e22",
    "#27ae60",
    "#9b59b6",
    "#e84393",
    "#16a085"
];

function startHanoi() {
    if (hanoiRunning) return;

    let n = getNumber("hanoiValue");
    if (n === null) return;

    if (!Number.isInteger(n) || n < 1 || n > 6) {
        hanoiMsg("Enter a number between 1 and 6.");
        return;
    }

    clearTimeout(hanoiTimer);

    hanoiRods = [[], [], []];
    hanoiMoves = 0;
    hanoiRunning = true;

    for (let i = n; i >= 1; i--) {
        hanoiRods[0].push(i);
    }

    drawHanoi();

    let moves = [];

    generateMoves(n, 0, 1, 2, moves);

    hanoiMsg("Animation started! Moves: 0");

    let index = 0;

    function animate() {
        if (index >= moves.length) {
            hanoiRunning = false;
            hanoiMsg("Completed! Total moves: " + hanoiMoves);
            return;
        }

        let move = moves[index];

        let disk = hanoiRods[move.from].pop();
        hanoiRods[move.to].push(disk);

        hanoiMoves++;

        drawHanoi();

        hanoiMsg(
            "Move " + hanoiMoves +
            ": Rod " + ["A", "B", "C"][move.from] +
            " to Rod " + ["A", "B", "C"][move.to]
        );

        index++;

        hanoiTimer = setTimeout(animate, 900);
    }

    animate();
}

function generateMoves(n, source, auxiliary, destination, moves) {
    if (n === 1) {
        moves.push({
            from: source,
            to: destination
        });
        return;
    }

    generateMoves(n - 1, source, destination, auxiliary, moves);

    moves.push({
        from: source,
        to: destination
    });

    generateMoves(n - 1, auxiliary, source, destination, moves);
}

function drawHanoi() {
    let rods = ["rodA", "rodB", "rodC"];

    rods.forEach((rodId, index) => {
        let rod = document.getElementById(rodId);
        rod.innerHTML = "";

        hanoiRods[index].forEach(disk => {
            let element = document.createElement("div");

            element.className = "disk";

            element.style.width =
                (65 + disk * 22) + "px";

            element.style.background =
                diskColors[(disk - 1) % diskColors.length];

            rod.appendChild(element);
        });
    });
}

function resetHanoi() {
    clearTimeout(hanoiTimer);

    hanoiRunning = false;
    hanoiMoves = 0;
    hanoiRods = [[], [], []];

    drawHanoi();

    hanoiMsg("Reset complete. Enter the number of disks.");
}

function hanoiMsg(message) {
    document.getElementById("hanoiMessage").innerText = message;
}
