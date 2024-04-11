



var originalWidth;
var attackButton;
var runButton; 


document.addEventListener("DOMContentLoaded", function() 
{
    
    function fetchRandomName() {
        const nameApi = document.getElementById('name');
        fetch('https://randomuser.me/api/')
        .then(response => {
            if (!response.ok) {
                throw new Error('No response');
            }
            return response.json();
        })
        .then(data => {
            const firstName = data.results[0].name.first; //get only first name
            nameApi.textContent = firstName; 
        })
        .catch(error => {
            console.error('Error fetching random name:', error);
        });
    }
    
    
    

    fetchRandomName();


    //array of arrays
    var map = [
        // Array 0
        [{ imageURL: "images/deeppit.jpg", description: "A very deep pit. You cannot proceed further." }, 
         { imageURL: "images/bridge.jpg", description: "A bridge by the water." }, 
         { imageURL: "images/zombie.jpg", description: "You've encountered a zombie! Click to start the battle!" }, 
         { imageURL: "images/rockarea.jpg", description: "An area filled with rocks." }, 
         { imageURL: "images/beach3.jpg", description: "Another section of the beach." }],
        // Array 1
        [{ imageURL: "images/snowtown.jpg", description: "A town covered in snow." }, 
         { imageURL: "images/snowarea.jpg", description: "An expansive snow-covered area." }, 
         { imageURL: "images/healthcenter.jpg", description: "A Pokemon Center to heal your Pokemon." }, 
         { imageURL: "images/crossroads.jpg", description: "You've reached a forest. There's a crossroad ahead." }, 
         { imageURL: "images/beach.jpg", description: "A serene beach." }],
        // Array 2
        [{ imageURL: "images/rainforest.jpg", description: "A dense and humid rainforest." }, 
         { imageURL: "images/lonelyhouse.jpg", description: "A lonely house in the wilderness." }, 
         { imageURL: "images/abandonedtown.jpg", description: "An abandoned town with a mysterious aura." }, 
         { imageURL: "images/crossroads2.jpg", description: "Another crossroad in the wilderness." }, 
         { imageURL: "images/beach2.jpg", description: "Another beautiful beach." }],
        // Array 3
        [{ imageURL: "images/caveexit.jpg", description: "You've reached the exit of a dark cave." }, 
         { imageURL: "images/fishingvillage.jpg", description: "A quaint fishing village by the sea." }, 
         { imageURL: "images/spookytown.jpg", description: "A town with an eerie atmosphere." }, 
         { imageURL: "images/arena.jpg", description: "An empty arena, awaiting challengers." }, 
         { imageURL: "images/jungle2.jpg", description: "A thick, tangled jungle." }],
        // Array 4
        [{ imageURL: "images/caveentrance.jpg", description: "You've discovered a mysterious cave entrance." }, 
         { imageURL: "images/desert.jpg", description: "You find yourself in the scorching hot desert." }, 
         { imageURL: "images/field.jpg", description: "A peaceful and quiet field where you've started your journey." }, 
         { imageURL: "images/jungle.jpg", description: "You've entered a dense and lush jungle." }, 
         { imageURL: "images/rockplatformwater.jpg", description: "A rocky platform by the water." }]
    ];
    

    console.log(map)

    //start pos object (change later)
    let playerPosition = {y: 2, x: 4};




    //set game img
    var gameImage = document.getElementById('gameImage');
    //set textContainer
    var textContainer = document.querySelector(".textContainer");

    var gridContainer = document.querySelector('.gridContainer');

    var buttonContainer = document.querySelector(".buttonContainer");


  
   

    //display start img
    updateDisplay();
    //draw map
    drawMap(map);

    
    
   
    document.addEventListener("keydown", function(event) 
    {
        
        switch (event.key.toLowerCase()) 
        {
            case "w":
                movePlayer(0, -1); //up
                break;
            case "s":
                movePlayer(0, 1); //down
                break;
            case "a":
                movePlayer(-1, 0); //left
                break;
            case "d":
                movePlayer(1, 0); //right
                break;
        }
    });

   
    function movePlayer(yDirection, xDirection) 
    {
        
        var newX = playerPosition.x + xDirection;
        var newY = playerPosition.y + yDirection;
        
        //check if inside array
        if (newX >= 0 && newX < map.length && newY >= 0 && newY < map[0].length) 
        {
            playerPosition.x = newX;
            playerPosition.y = newY;
            
            //draw map with players new pos
            drawMap(map);
            //update displayed image
            updateDisplay();
        }
        else
        {
            cantWalkThere(newX,newY,map);
        }
    }

    //function to update displayed image and text based on player position
    function updateDisplay() 
    {
        var imageURL = map[playerPosition.x][playerPosition.y].imageURL;
        var description = map[playerPosition.x][playerPosition.y].description;
        
        //update image
        gameImage.src = imageURL;
        //update text
        textContainer.innerHTML = "<p>" + description + "</p>";
    }

    function cantWalkThere(newX,newY,map)
    {
        
        originalDescription = textContainer.innerHTML;

    
        if(newX < 0)
        {
        
        
        textContainer.innerHTML = "<p>You can not go forward</p>";

        setTimeout(function() //wait 1 sec and then original description
        {
            textContainer.innerHTML = originalDescription;
        }, 1000);
        }

        else if(newX >= map.length)
        {
            
            
            textContainer.innerHTML = "<p>You can not go backwards</p>";

            setTimeout(function() //wait 1 sec and then original description
            {
            textContainer.innerHTML = originalDescription;
            }, 1000);
        }
        
        if(newY < 0)
        {
            
            
            textContainer.innerHTML = "<p>You can not go left</p>";
            setTimeout(function() //wait 1 sec and then original description
            {
            textContainer.innerHTML = originalDescription;
            }, 1000);
        }
        else if(newY >= map[0].length)
        {
            
            
            textContainer.innerHTML = "<p>You can not go right</p>";

            setTimeout(function() //wait 1 sec and then original description
            {
            textContainer.innerHTML = originalDescription;
            }, 1000);
        }
    

    
    }


    function drawMap(map) 
    {
        gridContainer.innerHTML = ''; //Clear grid
    
        
        var numRows = map.length;
        var numCols = map[0].length;
    
        
        for (var i = 0; i < numRows; i++) 
        {
            var rowElement = document.createElement('div');
            rowElement.classList.add('row');
    
            for (var j = 0; j < numCols; j++) 
            {
                var cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                if (i === playerPosition.y && j === playerPosition.x) {
                    cellElement.innerText = "X"; // Add X marker
                }
                rowElement.appendChild(cellElement);
                
            }
    
            gridContainer.appendChild(rowElement);
        }
    }

    var clickableAreas = 
    [
        { x: 0, y: 2, action: function() { console.log("Clickable area at (0, 2) clicked."); } },
        //more clickables?
    ];

    clickableAreas.forEach(function(area) {
        
        var index = area.y * map[0].length + area.x;

        
        var imageElement = document.querySelector('#gameImage');

        
        imageElement.addEventListener('click', function() {
            //xcheck if the player is in the right pos
            if (playerPosition.x === area.x && playerPosition.y === area.y) 
            {
                
                battleScreen();
            } else {
                console.log('Player is not in the right position to make this area clickable.');
            }
        });
    });

    var hasEnteredBattle=false


    function battleScreen()
    {
        if(!hasEnteredBattle)
        {
            gameImage.src = 'images/battle.png'; //battle img

            textContainer.innerHTML = "<p>BATTLE!</p>";

            document.querySelector('.healthBarContainer').style.display = 'block'; //display the health bar that is hidden atm


            gridContainer.style.display = "none";
    
             attackButton = document.createElement("button");
             runButton = document.createElement("button");
            
    
            attackButton.innerText = "Attack";
            runButton.innerText = "Run";
    
            buttonContainer.appendChild(attackButton);
            buttonContainer.appendChild(runButton);

            hasEnteredBattle=true;

        }
        
        attackButton.addEventListener("click",function()
        {
            textContainer.innerHTML = "<p>You attack the zombie</p>";
            decreaseHealth();
            
        });

        runButton.addEventListener("click",function()
        {
            textContainer.innerHTML = "<p>You can not escape!</p>";
        });

    }

    function decreaseHealth() {
       
        var greenHealth = document.querySelector('.greenHealth');
    
        var currentWidth = greenHealth.offsetWidth;
    
        var decreaseAmount = 10; //change later?
        
        var newWidth = Math.max(0, currentWidth - decreaseAmount); //0 cant be negative
    
        
        greenHealth.style.width = newWidth + 'px';

        if(newWidth <=100){
            greenHealth.style.backgroundColor = 'yellow';
        }


        if(newWidth <=50){
            greenHealth.style.backgroundColor = 'red';
        }
        
        if(newWidth<=0){
            gameImage.src = 'images/victory.jpg'; //battle img
            document.querySelector('.healthBarContainer').style.display = 'none';
            textContainer.innerHTML = "<p>You did it, the zombie has been defeated!</p>";
            if (attackButton && runButton) {
                attackButton.style.display = 'none';
                runButton.style.display = 'none';
            }
            

        }
    }
    

    


    
});












