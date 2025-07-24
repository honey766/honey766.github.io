document.addEventListener('DOMContentLoaded', () => {
    const timerItems = document.querySelectorAll('.timer-item');

    timerItems.forEach(item => {
        const timeDisplay = item.querySelector('.time');
        const startButton = item.querySelector('.start-button');
        const initialDuration = parseInt(timeDisplay.dataset.duration); // 초기 시간(초)
        let remainingTime = initialDuration;
        let countdownInterval = null;
        let state = 'idle'; // 'idle', 'running', 'paused'
        const label = item.querySelector('.timer-label')?.textContent || '';
        const autoReset = label.includes('중머리 5갈') || label.includes('중머리 3갈'); // 중머리 타이머만 자동 리셋

        // 시간을 "MM:SS" 형식으로 포맷하는 함수
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }

        // 화면에 남은 시간을 업데이트하는 함수
        function updateDisplay() {
            timeDisplay.textContent = formatTime(remainingTime);
        }

        // 버튼의 CSS 클래스를 설정하여 시각적인 상태를 변경하는 함수
        function setButtonState(stateName) {
            startButton.classList.remove('idle', 'running', 'paused');
            startButton.classList.add(stateName);
        }

        // 카운트다운을 시작하는 함수
        function startCountdown() {
            countdownInterval = setInterval(() => {
                remainingTime--; // 시간 1초 감소

                if (remainingTime < 0) {
                    if (autoReset) {
                        // 자동 리셋 타이머: 0초 미만이 되면 즉시 초기 시간으로 리셋하고 계속 진행
                        remainingTime = initialDuration;
                        updateDisplay();
                        // 타이머는 'running' 상태를 유지하고, 인터벌도 계속됩니다.
                        // 버튼 텍스트나 상태를 변경할 필요가 없습니다.
                    } else {
                        // 일반 타이머: 0초 미만이 되면 타이머를 멈추고 '리셋' 상태로 변경
                        clearInterval(countdownInterval); // 카운트다운 중지
                        remainingTime = initialDuration;
                        updateDisplay(); // 화면에 00:00 표시
                        startButton.textContent = '시작'; // 버튼 텍스트를 '리셋'으로 변경
                        setButtonState('idle'); // 버튼 상태를 'paused'로 설정
                        state = 'idle'; // 타이머 상태를 'paused'로 설정
                    }
                } else {
                    updateDisplay(); // 남은 시간 업데이트
                }
            }, 1000); // 1초마다 실행
        }

        // 페이지 로드 시 초기 화면과 버튼 상태 설정
        updateDisplay();
        setButtonState('idle');

        // 시작/정지/리셋 버튼 클릭 이벤트 리스너
        startButton.addEventListener('click', () => {
            if (state === 'idle') {
                // 현재 상태가 'idle'이면: 타이머 시작
                state = 'running';
                startButton.textContent = '정지';
                setButtonState('running');
                startCountdown(); // 카운트다운 시작
            } else if (state === 'running') {
                // 현재 상태가 'running'이면: 타이머 일시 정지 (정지 후 리셋 상태로 이동)
                clearInterval(countdownInterval); // 카운트다운 중지
                state = 'paused';
                startButton.textContent = '리셋'; // 버튼 텍스트를 '리셋'으로 변경
                setButtonState('paused');
            } else if (state === 'paused') {
                // 현재 상태가 'paused'이면: (무조건) 리셋
                // autoReset 타이머는 이 paused 상태에 들어오지 않으므로, 이 로직은 일반 타이머에만 적용됩니다.
                remainingTime = initialDuration; // 시간 초기화
                updateDisplay(); // 화면 업데이트
                startButton.textContent = '시작'; // 버튼 텍스트를 '시작'으로 변경
                state = 'idle'; // 상태를 'idle'로 변경
                setButtonState('idle');
            }
        });
    });
});