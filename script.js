document.addEventListener('DOMContentLoaded', () => {
    const timerItems = document.querySelectorAll('.timer-item');

    timerItems.forEach(item => {
        const timeDisplay = item.querySelector('.time');
        const startButton = item.querySelector('.start-button');
        let duration = parseInt(timeDisplay.dataset.duration); // 초기 시간(초)
        let countdownInterval;
        let isRunning = false;

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        }

        // 초기 시간 표시 설정
        timeDisplay.textContent = formatTime(duration);

        startButton.addEventListener('click', () => {
            if (isRunning) {
                // 타이머가 실행 중이면 정지
                clearInterval(countdownInterval);
                startButton.textContent = '시작';
                isRunning = false;
            } else {
                // 타이머 시작
                isRunning = true;
                startButton.textContent = '정지'; // 버튼 텍스트 변경
                countdownInterval = setInterval(() => {
                    duration--;
                    if (duration < 0) {
                        clearInterval(countdownInterval);
                        timeDisplay.textContent = '00:00';
                        startButton.textContent = '시작'; // 완료 후 버튼 텍스트 복원
                        isRunning = false;
                        // 필요하다면 여기에 타이머 종료 시 알림 기능 추가
                    } else {
                        timeDisplay.textContent = formatTime(duration);
                    }
                }, 1000);
            }
        });
    });
});