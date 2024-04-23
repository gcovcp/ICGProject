// Function to update the scene
function update() {
    // Check if the snake head's position coincides with the red block
    if (snakeHead.position.x === redFood.position.x && snakeHead.position.z === redFood.position.z) {
        // Remove the red block from the scene
        scene.remove(redFood);
    
        // Spawn a new red block at a random position
        const newX = getRandomInt(-boardSize / 2, boardSize / 2);
        const newZ = getRandomInt(-boardSize / 2, boardSize / 2);
        redFood = new THREE.Mesh(redFoodGeometry, redFoodMaterial);
        redFood.position.set(newX, 0.5,newZ);
        scene.add(redFood);
        counter += 1;
        document.getElementById('points').textContent = 'points: ' + counter + '/' + boardSize*boardSize;
        //console.log(counter);
    }
}

// Function to animate the scene
function animate() {
    requestAnimationFrame(animate); 
    controls.update();
    controls.rotateSpeed = 0.5;
    renderer.render(scene, camera);
    update();
    
}

// Function to handle the keydown event
function onDocumentKeyDown(event) {
    // Get the key code of the pressed key
    var keyCode = event.which;
    // If the key is the enter key, reset the camera position
    if (keyCode == 13) {
        camera.position.x = 0;
        camera.position.y = cameraHeight;
        camera.position.z = 0;
    }
    // Update the snake direction based on the key pressed
    if ((keyCode == 65 || keyCode == 37) && snakeDirection !== 'right') { // A or left arrow
        snakeDirection = 'left';
    } else if ((keyCode == 68 || keyCode == 39) && snakeDirection !== 'left') { // D or right arrow
        snakeDirection = 'right';
    } else if ((keyCode == 87 || keyCode == 38) && snakeDirection !== 'down') { // W or up arrow
        snakeDirection = 'up';
    } else if ((keyCode == 83 || keyCode == 40) && snakeDirection !== 'up') { // S or down arrow
        snakeDirection = 'down';
    }
}

// Function to update the snake's body
function updateSnakeBody(snake) {
    const numSegments = snake.children.length;
    // Start from the tail (last segment) and move towards the head (first segment)
    for (let i = numSegments - 1; i > 0; i--) {
        const currentSegment = snake.children[i];
        const nextSegment = snake.children[i - 1];
        // Update the position of the current segment to match the position of the segment in front of it
        currentSegment.position.copy(nextSegment.position);
    }
}

// Function to update the snake's position and check for collisions(not implemented yet)
function updateSnakePosition() {
    // Move the snake continuously in the current direction
    if (snakeDirection === 'left' && snakeHead.position.x > -((boardSize / 2) - 1)) {
        snakeHead.position.x -= 1;
    } else if (snakeDirection === 'right' && snakeHead.position.x < ((boardSize / 2) - 1)) {
        snakeHead.position.x += 1;
    } else if (snakeDirection === 'up' && snakeHead.position.z > -((boardSize / 2) - 1)) {
        snakeHead.position.z -= 1;
    } else if (snakeDirection === 'down' && snakeHead.position.z < ((boardSize / 2) - 1)) {
        snakeHead.position.z += 1;
    }
    if (snakeHead.position.x === redFood.position.x && snakeHead.position.z === redFood.position.z) {
        incrementSnake(snake, scene);
        // Spawn a new red block at a random position
        const newX = getRandomInt(-boardSize / 2, boardSize / 2);
        const newZ = getRandomInt(-boardSize / 2, boardSize / 2);
        redFood.position.set(newX, 0.5, newZ);
        scene.add(redFood);
    }
    updateSnakeBody(snake);
}

// Function to increment the snake's length
function incrementSnake(snake, scene) {
    const newSnakeHead = snake.children[0].clone(); // Clone the existing snake head
    snake.add(newSnakeHead); // Add the cloned head to the snake group
    counter++;
    document.getElementById('points').textContent = 'points: ' + counter + '/' + (boardSize * boardSize); // Update the text content of the points div
    scene.remove(redFood); 
}

// Function to get a random integer between two values
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// export the functions
export { update, animate, onDocumentKeyDown, updateSnakeBody, updateSnakePosition, incrementSnake, getRandomInt };