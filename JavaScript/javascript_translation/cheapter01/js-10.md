## Handling time intervals in JavaScript

Electron app [Formolectron](https://github.com/amitmerchant1990/pomolectron)에서 작업하는 동안 나는 자바스크립트의 [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) 함수를 통해 다른 시간 간격을 다룰 필요가 있었습니다.    
기본적으로 내 앱에 세 개의 타이머를 구현해야 했습니다.  
- Pomodoro of 25 minutes
- Short break of 5 minutes
- Long break of 10 minutes  

세 가지 경우 모두 카운트 다운 타이머를 구현하는 두 가지 방법을 생각할 수 있습니다.   
하나는 세 가지 다른 `setInterval()`을 사용하여 다른 타이머를 구현하는 것입니다.  
둘째로는 세 타이머 모두 동일한 `setInterval()`을 활용할 수 있는 다른 방법을 찾는 것입니다.  


다음과 같은 방법으로도 좋습니다.  
[ServiceWorker를 사용하여 simple offline-capable Notepad app 만들기](https://www.amitmerchant.com/Building-Simple-Offline-Notepad-Using-Service-Worker/)

#### Solution(해결책)

그래서, 나는 두 번째 접근법을 사용했습니다.   
아래와 같은 변수에 할당하여 세 개의 타이머 모두에 동일한 `setInterval()`을 사용할 수 있습니다. 

```javascript
var pomodoroIntervalId;

function startTimer(duration, display) {
  timer = duration;
  pomodoroIntervalId = setInterval(function(){
    if (--timer < 0) {
        timer = duration;
    }
    
    minutes = parseInt(timer/60, 10);
    seconds = parseInt(timer%60, 10);

    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;

    display.textContent = minutes+ ":" + seconds;

    if(minutes == 0 && seconds == 0){
      notifyUser();
    }
  }, 1000);
}
```

먼저 clearInterval()메소드로 interval ID를 전달하여 현재 시간 간격을 클리어함으로써  다른 타이머 간에 동일한 startTimer()를 활용합니다. 우리의 경우에는 전역변수 pomodoroIntervalId에 할당 했습니다. 이것은 기본적으로 현재 실행중인 interval을 삭제하여 다음에 다른 타이머가 설정될 때 활용할 수 있도록 합니다. 코드는 아래와 같습니다.


```javascript
function resetTimer() {
  clearInterval(pomodoroIntervalId);
}

```

이렇게하면 코드를 깨끗하고 매끄럽게 만들며 동일한 setInterval() 함수를 사용 할 수있는 이점이 있습니다. 그리고 자바스크립트의 정말 편리한 기능이라고 생각합니다.  

