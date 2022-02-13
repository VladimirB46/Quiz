'use strict'
document.addEventListener('DOMContentLoaded', function() {
    // opening cover
    const leftOpeningCover = document.querySelector('.opening-cover--left');
    const rightOpeningCover = document.querySelector('.opening-cover--right');
    const playBtn = document.querySelector('.play-btn');
    const choseSettingsContainer = document.querySelector('.chose-settings-container');

    // chose difficulty
    let chosenDifficulty = null;
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const choseDifficultyWarning = document.querySelector('.chose-difficulty-warning');
    let numberOfChaserBlocks, currentBlock, chaserBlocks, chaserPosition;

    // choose avatar 
    let chosenAvatar = null;
    const avatarCardBtns = document.querySelectorAll('.avatar-card');
    const chooseAvatarWarning = document.querySelector('.choose-avatar-warning');

    // avatar image html
    const avatarImgHtml = document.querySelectorAll('.avatar');

    // chaser 
    const chaserBlocksContainer = document.querySelector('.chaser__blocks-container');

    const chaserContainer = document.querySelector('.chaser-container');
    // chaser winner 
    const chaserWinner = document.querySelector('.chaser__winner');

    // win modal 
    const winModal = document.querySelector('.game-won-modal');

    // game lost modal
    const lostModal = document.querySelector('.game-lost-modal');

    // close modals btn
    const closeModalsBtn = document.querySelectorAll('.js-close-modal-btn');

    // overlay 
    const overlay = document.querySelector('.overlay');

    // skip btn
    const skipBtn = document.querySelector('.skip-question-btn');

    // help btn 
    const helpBtn = document.querySelector('.help-btn');
    const confirmHelpBtn = document.querySelector('.confirm-help-btn');
    const confirmHelpModal = document.querySelector('.confirm-help-modal');

    // help modal icon
    const confirmHelpModalIcon = document.querySelector('.confirm-help-modal__icon');
    const confirmHelpModalCheckmark = document.querySelector('.help-checkmark-path');
    
    // choose difficulty btns click
    let  settingsBtnsDisabled = false;
    difficultyBtns.forEach(btn => {
        btn.onclick = () => {
            if (settingsBtnsDisabled === false) {
                chosenDifficulty = btn.getAttribute('data-difficulty');
                difficultyBtns.forEach(btns => {
                    btns.classList.remove('selected');
                });
                btn.classList.add('selected');
                choseDifficultyWarning.style.visibility = 'hidden';
            }
        }
    })
    
    // choose avatar btns click
    avatarCardBtns.forEach(btn => {
        btn.onclick = () => {
            if (settingsBtnsDisabled === false) {
                chosenAvatar = btn.getAttribute('data-avatar');
                avatarCardBtns.forEach(btns => {
                    btns.classList.remove('selected');
                });
                btn.classList.add('selected');
                chooseAvatarWarning.style.visibility = 'hidden';
            }
        }
    })
    
    // clone settings container into opening covers
    function cloneSettingsContainer() {
        let choseSettingsContainerCloneOne = choseSettingsContainer.cloneNode(true);
        choseSettingsContainerCloneOne.style.display = 'flex';
        let choseSettingsContainerCloneTwo = choseSettingsContainer.cloneNode(true);
        choseSettingsContainerCloneTwo.style.display = 'flex';
        leftOpeningCover.appendChild(choseSettingsContainerCloneOne);
        rightOpeningCover.appendChild(choseSettingsContainerCloneTwo);
    }

    // current block position
    function currentBlockPosition() {
        chaserBlocks.forEach(block => {
            block.classList.remove('block--current');
            if (block.getAttribute('data-block') == currentBlock) {
                block.classList.add('block--current');
            }
        })
    }
    // chaser position
    function currentChaserPosition() {
        chaserBlocks.forEach(block => {
            block.classList.remove('block--chaser-current');
            if (block.getAttribute('data-block') == chaserPosition) {
                block.classList.add('block--chaser-current');
            }
            if (block.getAttribute('data-block') < chaserPosition) {
                block.classList.add('block--chaser-behind');
            }
        })
    }
    // update chaser
    function updateChaser() {
        if (mobileChaser === false) {
            currentBlockPosition();
            currentChaserPosition();
        }
        // mobile chaser
        if (mobileChaser === true) {
            setTimeout(function() {
                chaserContainer.classList.add('open');
                overlay.classList.add('open');
            }, 1000);
            setTimeout(function() {
                currentBlockPosition();
                currentChaserPosition();
            }, 1800);
            setTimeout(function() {
                chaserContainer.classList.remove('open');
                overlay.classList.remove('open');
            }, 3000);
        }
    }

    // check if chaser cant fit original position
    let mobileChaser = false;
    function checkForMobileChaser() {
        if (window.innerWidth <= 950) {
            mobileChaser = true;
        };
        if (window.innerWidth > 1870 && window.innerHeight < 650) {
            mobileChaser = true;
        };
        if (window.innerWidth > 950 && window.innerWidth <= 1870 && window.innerHeight < 700) {
            mobileChaser = true;
        };
        if (window.innerHeight < 415) {
            chaserContainer.classList.add('chaser--small-blocks');
        };
        if (window.innerHeight < 375) {
            chaserContainer.classList.add('chaser--smallest-blocks');
        };
    }

    // create chaser container
    function createChaserContainer() {
        for(var i=0; i<numberOfChaserBlocks; i++) {
            let newChaserBlock = document.createElement('div');
            newChaserBlock.classList.add('chaser__block');
            newChaserBlock.setAttribute('data-block', i + 1);
            chaserBlocksContainer.appendChild(newChaserBlock);
        }
        chaserPosition = 0;
        // starting block
        chaserBlocks = document.querySelectorAll('.chaser__block');
        // mobile chaser
        checkForMobileChaser();
        if (mobileChaser === true) {
            chaserContainer.classList.add('chaser-container--mobile');
        };
        chaserContainer.style.display = 'block';
    }

    // play btn click
    playBtn.onclick = () => {
        if (chosenDifficulty !== null && chosenAvatar !== null) {
            playBtn.classList.remove('active');
            choseSettingsContainer.style.display = 'none';
            // open cover
            leftOpeningCover.style.transform = 'translateX(-100%)';
            rightOpeningCover.style.transform = 'translateX(100%)';
            cloneSettingsContainer()
            // dissable setting buttons
            const difficultyBtnsNew = document.querySelectorAll('.difficulty-btn');
            difficultyBtnsNew.forEach(btns => {
                btns.classList.remove('active');
            });
            const avatarCardBtnsNew = document.querySelectorAll('.avatar-card');
            avatarCardBtnsNew.forEach(btns => {
                btns.classList.remove('active');
            });
            settingsBtnsDisabled = true;
            // set avatar 
            avatarImgHtml.forEach(img => {
                if (chosenAvatar == 'one') {
                    img.setAttribute('src', 'img/avatar-one.png');
                }
                if (chosenAvatar == 'two') {
                    img.setAttribute('src', 'img/avatar-two.png');
                }
                if (chosenAvatar == 'three') {
                    img.setAttribute('src', 'img/avatar-three.png');
                }
            })
            // set chaser parameters
            if (chosenDifficulty == 'easy') {
                numberOfChaserBlocks = 6;
                currentBlock = 3;
            }
            if (chosenDifficulty == 'normal') {
                numberOfChaserBlocks = 8;
                currentBlock = 2;
            }
            if (chosenDifficulty == 'hard') {
                numberOfChaserBlocks = 8;
                currentBlock = 1;
            }
            // create chaser blocks
            createChaserContainer();
            setTimeout(function() {
                updateChaser();
            }, 700);
            // display none on opening covers
            setTimeout(function() {
                leftOpeningCover.style.display = 'none';
                rightOpeningCover.style.display = 'none';
            }, 1500);
            // enable overlay 
            overlay.classList.add('open');
            if (mobileChaser === false) {
                setTimeout(function() {
                    overlay.classList.remove('open');
                }, 1500);
            }
        }
        // difficulty not chosen 
        if (chosenDifficulty === null) {
            choseDifficultyWarning.style.visibility = 'visible';
        }
        // avatar not chosen
        if (chosenAvatar === null) {
            chooseAvatarWarning.style.visibility = 'visible';
        }
    }

    // check for win
    let gameWon = false;
    function checkForWin() {
        if (currentBlock > numberOfChaserBlocks) {
            gameWon = true;
            if (mobileChaser === false) {
                chaserWinner.classList.add('won');
                setTimeout(function() {
                    winModal.classList.add('open');
                    overlay.classList.add('open');
                }, 500);
            }
            // mobile chaser animation
            else {
                setTimeout(function() {
                    chaserWinner.classList.add('won');
                }, 1500);
                setTimeout(function() {
                    winModal.classList.add('open');
                    overlay.classList.add('open');
                }, 2500);
            }
        }
    }

    // check for loss
    let gameLost = false 
    function checkForLoss() {
        if (currentBlock == chaserPosition) {
            gameLost = true;
            if (mobileChaser === false) {
                let chaser = document.querySelector('.block--chaser-current');
                chaser.classList.add('lost');
                setTimeout(function() {
                    lostModal.classList.add('open');
                    overlay.classList.add('open');
                }, 500);
            }
            // mobile chaser animation
            else {
                setTimeout(function() {
                    let chaser = document.querySelector('.block--chaser-current');
                    chaser.classList.add('lost');
                }, 1500);
                setTimeout(function() {
                    lostModal.classList.add('open');
                    overlay.classList.add('open');
                }, 2500);
            }
        }
    }

    // close modals
    function closeModals() {
        if (winModal.classList.contains('open')) {
            winModal.classList.remove('open');
            overlay.classList.remove('open');
        }
        if (lostModal.classList.contains('open')) {
            lostModal.classList.remove('open');
            overlay.classList.remove('open');
        }
        if (confirmHelpModal.classList.contains('open')) {
            confirmHelpModal.classList.remove('open');
            overlay.classList.remove('open');
        }
    }
    closeModalsBtn.forEach(btn => {
        btn.onclick = () => {
            closeModals();
        }
    })
    overlay.onclick = () => {
        closeModals();
    }
    window.onkeydown = (e) => {
        if (e.key === 'Escape') {
            closeModals();
        }
    }

    // skip question
    skipBtn.onclick = () => {
        if (skipBtn.classList.contains('active')) {
            disableButtons();
            // find correct answer
            for (var i=0; i<4; i++) {
                if (answerButtons[i].querySelector('.answer-option').innerHTML == currentQuestion.correctAnswer) {
                    answerButtons[i].classList.add('true');
                }
            };
            chaserPosition++;
            updateChaser();
            checkForLoss();
            checkForWin();
            // new question after 1 second
            setTimeout(function () {
                if (gameWon === false && gameLost === false) {
                    enableButtons();
                    newQuestion();
                }
            }, 1000)
        }
    }

    // help btn
    helpBtn.onclick = () => {
        confirmHelpModal.classList.add('open');
        overlay.classList.add('open');
    }
    // confirm help 
    confirmHelpBtn.onclick = () => {
        // 1 use only
        if (helpBtn.classList.contains('active')) {
            helpBtn.classList.remove('active');
            // remove 2 random wrong answers
            let wrongAnswersToRemove = [];
            for (var i=0; i<2; i++) {
                wrongAnswersToRemove.push(currentQuestion.falseAnswers[i]);
            }
            answerButtons.forEach(btn => {
                let answerOption = btn.querySelector('.answer-option');
                for (var i=0; i<wrongAnswersToRemove.length; i++) {
                    if (answerOption.innerHTML == wrongAnswersToRemove[i]) {
                        btn.classList.remove('active');
                        answerOption.innerHTML = '';
                    }
                }
            })
        }
        // text change
        confirmHelpModal.classList.add('active');
        // icon border animation
        confirmHelpModalIcon.classList.remove('active');
        setTimeout(function() {
            confirmHelpModalIcon.classList.add('active');
        }, 100)
        // checkmark animation
        let helpCheckmarkLength = confirmHelpModalCheckmark.getTotalLength();
        confirmHelpModalCheckmark.style.strokeDasharray = helpCheckmarkLength;
        confirmHelpModalCheckmark.style.strokeDashoffset = helpCheckmarkLength;
        setTimeout(function() {
            confirmHelpModalCheckmark.style.animation = 'checkmark 0.4s linear forwards';
        }, 500);
        setTimeout(function() {
            closeModals();
            // reset checkmark
            confirmHelpModalCheckmark.style.animation = 'none';
            confirmHelpModalCheckmark.style.strokeDasharray = '0';
            confirmHelpModalCheckmark.style.strokeDashoffset = '0';
        }, 2000);
    }

    class Question {
        constructor (questionText, falseAnswers, correctAnswer) {
            this.questionText = questionText;
            this.falseAnswers = falseAnswers;
            this.correctAnswer= correctAnswer;
        }
    }
    // questions and answers
    const answerButtonsSpans = document.querySelectorAll('.answer-option');
    const answerButtons = document.querySelectorAll('.answer-button');
    const questionTextHtml = document.querySelector('.question-text');
    let questionsArray = [];
    let currentQuestion = null;
    let answerArray;

    // make questions
    let q1 = new Question('Koje godine je Neil Armstrong sleteo na mesec?',
                        ['1959.', '1967.', '1952'],
                        '1969.'
    );
    questionsArray.push(q1);
    let q2 = new Question('Koja zivotinja moze najvise izdrzati bez vode?',
                        ['Kamila', 'Lav', 'Orao'],
                        'Zirafa'
    );
    questionsArray.push(q2);
    let q3 = new Question('Koja zemlja konzumira najvise Coca Cole?',
                        ['SAD', 'Francuska', 'Nemacka'],
                        'Island'
    );
    questionsArray.push(q3);
    let q4 = new Question('Koja je jedina planeta koja nije dobila ime po bogu?',
                        ['Venera', 'Jupiter', 'Uran'],
                        'Zemlja'
    );
    questionsArray.push(q4);
    let q5 = new Question('DJ je skraceno od?',
                        ['Disc Jukebox', 'Dance Jockey', 'Disc Joker'],
                        'Disc Jockey'
    );
    questionsArray.push(q5);
    let q6 = new Question('Najaktivniji misic se nalaze u..?',
                        ['Ustima', 'Nogama', 'Rukama'],
                        'Ocima'
    );
    questionsArray.push(q6);
    let q7 = new Question('Od cega je SMS skracenica?',
                        ['Safe Message Sending', 'Secret Message Stuff', 'Secret Messaging Saver'],
                        'Short Message Service');
    questionsArray.push(q7);
    let q8 = new Question('Mitolosko bice, pas sa tri glave zove se?',
                        ['Himera', 'Minotaur', 'Kentaur'],
                        'Kerber'
    );
    questionsArray.push(q8);
    let q9 = new Question('Koje godine je nastao Javascript?',
                        ['1992.', '1989.', '1997.'],
                        '1995.');
    questionsArray.push(q9);
    let q10 = new Question('Grcki bog rata zvao se?',
                        ['Zevs', 'Posejdon', 'Apolon'],
                        'Ares');
    questionsArray.push(q10);
    let q11 = new Question('Sta znaci CSS?',
                        ['Crazy Style Sheets', 'Counter Strike Style', 'Computer Science Specials'],
                        'Cascading Style Sheets');
    questionsArray.push(q11);
    let q12 = new Question('Koje godine se desio Kosovski boj?',
                        ['1398.', '1375.', '1382.'],
                        '1389.');
    questionsArray.push(q12);
    let q13 = new Question('Ko je otkrio vakcinu protiv besnila?',
                        ['Carls Darvin', 'Aleksander Fleming', 'Maks Plank'],
                        'Luj Paster');
    questionsArray.push(q13);
    let q14 = new Question('MotoGP vozac sa najvise osvojenih titula je?',
                        ['Valentino Rossi', 'Fabio Quartararo', 'Alex Rins'],
                        'Marc Marquez');
    questionsArray.push(q14);
    let q15 = new Question('Teheran je glavni grad koje zemlje?',
                        ['Irak', 'Sirija', 'Egipat'],
                        'Iran');
    questionsArray.push(q15);
    let q16 = new Question('"Tour de France" je trka?',
                        ['Konja', 'Auta', 'Motora'],
                        'Bicikala');
    questionsArray.push(q16);
    let q17 = new Question('Koje je najvece slatkovodno jezero po kolicini vode na svetu?',
                        ['Skadarsko', 'Tanganjika', 'Malavi'],
                        'Bajkalsko');
    questionsArray.push(q17);
    let q18 = new Question('Crveni cot je najvisi vrh..?',
                        ['Zlatibora', 'Tare', 'Kopaonika'],
                        'Fruske Gore');
    questionsArray.push(q18);

    // questions and answers
    function pickQuestion() {
        let r = Math.floor(Math.random() * questionsArray.length);
        currentQuestion = questionsArray[r];
    }
    function writeQuestionText() {
        questionTextHtml.innerHTML = currentQuestion.questionText;
    }
    function makeAnswerArray() {
        for (var i=0; i<3; i++) {
            answerArray.push(currentQuestion.falseAnswers[i]);
        }
        answerArray.push(currentQuestion.correctAnswer);
    }
    function shuffleAnswerArray() {
        answerArray = answerArray.sort(() => Math.random() - 0.5);
    }
    function putAnswersInBtns() {
        for (var i=0; i<4; i++) {
            answerButtonsSpans[i].innerHTML = answerArray[i];
        }
    }
    function removePreviousQuestion() {
        if (currentQuestion !== null) {
            let n = questionsArray.indexOf(currentQuestion);
            questionsArray.splice(n, 1);
        }
    }
    function enableButtons() {
        answerButtons.forEach(ansBtn => {
            ansBtn.classList.add('active');
        });
        helpBtn.classList.add('active');
        skipBtn.classList.add('active');
    }
    function disableButtons() {
        answerButtons.forEach(ansBtn => {
            ansBtn.classList.remove('active');
        });
        helpBtn.classList.remove('active');
        skipBtn.classList.remove('active');
    }
    function newQuestion() {
        removePreviousQuestion();
        answerArray = [];
        pickQuestion();
        writeQuestionText();
        makeAnswerArray();
        shuffleAnswerArray();
        putAnswersInBtns();
        enableButtons();
        answerButtons.forEach(btn => {
            btn.classList.remove('true');
            btn.classList.remove('wrong');
        })
    }

    // start game with new question
    newQuestion();

    // answer click
    answerButtons.forEach(btn => {
        btn.onclick = () => {
            if (btn.classList.contains('active') ) {
                // no hover and clicking buttons until new question
                disableButtons();
                let clickedAnswer = btn.querySelector('.answer-option');
                if (clickedAnswer.innerHTML == currentQuestion.correctAnswer) {
                    btn.classList.add('true');
                    currentBlock++;
                }
                else {
                    btn.classList.add('wrong');
                    // find correct answer
                    for (var i=0; i<4; i++) {
                        if (answerButtons[i].querySelector('.answer-option').innerHTML == currentQuestion.correctAnswer) {
                            answerButtons[i].classList.add('true');
                        }
                    }
                }
                chaserPosition++;
                updateChaser();
                checkForLoss();
                checkForWin();
                // new question after 1 second
                setTimeout(function () {
                    if (gameWon === false && gameLost === false) {
                        enableButtons();
                        newQuestion();
                    }
                }, 1000)
            }
        }
    })
})