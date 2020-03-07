'use strict';

{
  const words = [
    'apple',
    'sky',
    'blue',
    'middle',
    'set',
    'taichinchin',
    'programing',
    'github',
    'tintin',
    'aaaaaaaaaaaaaaaa',
    'iiiiiiiiiiiiiiiiii',
    'ooooooooooooooooooo',
  ];
  // マップ
  var wordMap = new Map();
  // アルファベットと日本語の対応
  var jpEng = new Map();
  
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 60 * 1000;
  let startTime;
  let isPlaying = false;// ゲームが始まっているか否か

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if (timeLeft < 0) {// ゲームオーバー
      isPlaying = false;

      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      setTimeout(() => {
        showResult();
      }, 100);

      target.textContent = 'click to replay'
    }
  }

  function showResult(){
    const accuracy = score +miss === 0 ? 0 : score / (score + miss) * 100;
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);// 結果表示
  }

  window.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener('keydown', e => {// タイピングしたとき
    if (isPlaying !== true){// ゲームが始まっていなければ何もしない
      return;
    }
    if (e.key === word[loc]) {
      loc++;
      if (loc === word.length) {// 次の単語へいく
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}