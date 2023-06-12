let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy, imgFlag;
const gridLength = 50;
let timer;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
};

// initial
$(function(){
    // 0: available, 1: Mountain, 2: Final Stop, 3: Enemy
    mapArray = [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0,0 , 0, 0,0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2],
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        x: 0,
        y: 0
    };

    imgMain.onload = function(){
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    };

    let sources = {
        mountain: "images/material.png",
        enemy: "images/Enemy.png",
        flag: "images/redFlag.png",
        question: "images/question.png"
    };

    loadImages(sources, function(images){
        for (let x in mapArray) {
            for (let y in mapArray[x]) {
                if (mapArray[x][y] === 1) {
                    ctx.drawImage(images.mountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                if (mapArray[x][y] === 3) {
                    ctx.drawImage(images.enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                if (mapArray[x][y] == 2) {
                    ctx.drawImage(images.flag, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                if (mapArray[x][y] == 4) {
                    ctx.drawImage(images.question, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }

        startTimer();

        setInterval(function() {
            for (let x in mapArray) {
                for (let y in mapArray[x]) {
                    if (mapArray[x][y] === 3) {
                        ctx.clearRect(y * gridLength, x * gridLength, gridLength, gridLength);
                        mapArray[x][y] = 0;
                    }
                }
            }
            let enemyCount = 0;
            while (enemyCount < 2) {
                let enemyX = Math.floor(Math.random() * mapArray.length);
                let enemyY = Math.floor(Math.random() * mapArray[0].length);
                if (mapArray[enemyX][enemyY] === 0) {
                    ctx.drawImage(images.enemy, 7, 40, 104, 135, enemyY * gridLength, enemyX * gridLength, gridLength, gridLength);
                    mapArray[enemyX][enemyY] = 3;
                    enemyCount++;
                }
            }
        }, 3000);
    });

});

var questions = [
    {
        question: "Mount Fuji is the highest mountain in Japan.",
        answer: true
    },
    {
        question: "The skull is the strongest bone in the human body.",
        answer: false
    },
    {
        question: "Google was initially called BackRub.",
        answer: true
    },
    {
        question: "Tomatoes are fruit.",
        answer: true
    },
    {
        question: "It’s impossible to sneeze while you open your eyes.",
        answer: true
    },
    {
        question: "Bananas are berries.",
        answer: true
    },
    {
        question: "Coca-Cola exists in every country around the world.",
        answer: false
    },
    {
        question: "A chicken can live without a head long after it’s chopped off.",
        answer: true
    },
    {
        question: "All mammals live on land.",
        answer: false
    },
    {
        question: "Humans share 65 per cent of their DNA with bananas.",
        answer: true
    },
];

function showQuestionWindow(question, callback) {
    var randomIndex = Math.floor(Math.random() * questions.length);
    var question = questions[randomIndex].question;
    var answer = window.confirm(question);
    callback(answer, randomIndex);
}

function loadQuestions(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'questions.txt', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var questionsData = xhr.responseText.split('\n');
            var questions = [];
            for (var i = 0; i < questionsData.length; i++) {
                var questionData = questionsData[i].split('#');
                if (questionData.length === 2) {
                    var question = {
                        question: questionData[0],
                        answer: questionData[1]
                    };
                    questions.push(question);
                }
            }
            callback(questions);
        }
    };
    xhr.send();
}

function startTimer() {
    let seconds = 20;
  const timerElement = document.getElementById("timer");

  function updateTimer() {
    timerElement.textContent = "剩餘時間：" + seconds + "秒";
    seconds--;

    if (seconds < 0) {
      clearInterval(timer);
      alert("時間到！您失敗了！");
      location.reload();
    }
  }

  updateTimer(); // 初始化計時器顯示
  const timer = setInterval(updateTimer, 1000);
}

// Click Event
$(document).on("keydown", function(event){
    console.log(event.code);
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        x: -1,
        y: -1
    };
    targetBlock = {
        x: -1,
        y: -1
    };
    event.preventDefault();
    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if (targetImg.x <= (gridLength * (mapArray[0].length - 1)) && targetImg.x >= 0 && targetImg.y <= (gridLength * (mapArray.length - 1)) && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    if (targetBlock.x !== -1 && targetBlock.y !== -1 && mapArray[targetBlock.x][targetBlock.y] !== 1 && mapArray[targetBlock.x][targetBlock.y] !== 3) {
        ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);
        currentImgMain.x = targetImg.x;
        currentImgMain.y = targetImg.y;
        ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
        if (mapArray[targetBlock.x][targetBlock.y] === 2) {
            alert("成功了！");
            location.reload();
        }
        else if (mapArray[targetBlock.x][targetBlock.y] === 4) {
            // 觸發問題視窗
            /*loadQuestions(function(questions)) {
                // 现在可以使用从txt文件加载的问题了
                console.log(questions);*/
            showQuestionWindow("請回答問題：\n" , function(answer, questionIndex) {
                if (answer === questions[questionIndex].answer) {
                    // 答對了
                    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;
                    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
                    if (mapArray[targetBlock.x][targetBlock.y] === 2) {
                        alert("成功了！");
                        location.reload();
                    }
                    
                } else {
                    // 答錯了
                    alert("失敗了！");
                    location.reload();
                }
            });
        } 
         
    }
    else if (mapArray[targetBlock.x][targetBlock.y] === 3) {
        alert("失敗了！");
        location.reload();
    }
    
});
