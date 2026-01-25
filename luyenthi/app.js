// app.js - KẾT HỢP LOGIC ĐÚNG VÀ GIAO DIỆN MỚI

document.addEventListener('DOMContentLoaded', () => {

const examFiles = [
    // --- Hiến pháp ---
    { id: 1855, name: "Đề 001: Hiến pháp 2013 (sửa đổi, bổ sung theo Nghị quyết số 203/2025/QH15)" },
    { id: 1856, name: "Đề 002: Hiến pháp 2013 (sửa đổi, bổ sung theo Nghị quyết số 203/2025/QH15)" },
    { id: 1857, name: "Đề 003: Hiến pháp 2013 (sửa đổi, bổ sung theo Nghị quyết số 203/2025/QH15)" },
    { id: 1858, name: "Đề 004: Hiến pháp 2013 (sửa đổi, bổ sung theo Nghị quyết số 203/2025/QH15)" },
    { id: 1859, name: "Đề 005: Hiến pháp 2013 (sửa đổi, bổ sung theo Nghị quyết số 203/2025/QH15)" },
    { id: 1860, name: "Đề 006: Hiến pháp 2013 (sửa đổi, bổ sung theo Nghị quyết số 203/2025/QH15)" },

    // --- Luật Cán bộ công chức ---
    { id: 1864, name: "Đề 001: Luật Cán bộ, công chức 2025" },
    { id: 1865, name: "Đề 002: Luật Cán bộ, công chức 2025" },
    { id: 1866, name: "Đề 003: Luật Cán bộ, công chức 2025" },

    // --- Nghị định 170 ---
    { id: 1868, name: "Đề 01: Nghị định số 170/2025/NĐ-CP quy định về tuyển dụng, sử dụng và quản lý công chức" },
    { id: 1869, name: "Đề 02: Nghị định số 170/2025/NĐ-CP quy định về tuyển dụng, sử dụng và quản lý công chức" },
    { id: 1870, name: "Đề 03: Nghị định số 170/2025/NĐ-CP quy định về tuyển dụng, sử dụng và quản lý công chức" },
    { id: 1871, name: "Đề 04: Nghị định số 170/2025/NĐ-CP quy định về tuyển dụng, sử dụng và quản lý công chức" },

    // --- Nghị định 172 ---
    { id: 1880, name: "Đề 01: Nghị định số 172/2025/NĐ-CP về xử lý kỷ luật cán bộ, công chức" },
    { id: 1881, name: "Đề 02: Nghị định số 172/2025/NĐ-CP về xử lý kỷ luật cán bộ, công chức" },
    { id: 1882, name: "Đề 03: Nghị định số 172/2025/NĐ-CP về xử lý kỷ luật cán bộ, công chức" },

    // --- Luật Tổ chức Chính phủ ---
    { id: 1883, name: "Đề 01: Luật Tổ chức chính phủ 2025" },
    { id: 1884, name: "Đề 02: Luật Tổ chức chính phủ 2025" },
    { id: 1885, name: "Đề 03: Luật Tổ chức chính phủ 2025" },

    // --- Luật Ban hành VBQPPL ---
    { id: 1896, name: "Đề 01: Luật Ban hành văn bản quy phạm pháp luật 2025 (được sửa đổi, bổ sung)" },
    { id: 1897, name: "Đề 02: Luật Ban hành văn bản quy phạm pháp luật 2025 (được sửa đổi, bổ sung)" },
    { id: 1898, name: "Đề 03: Luật Ban hành văn bản quy phạm pháp luật 2025 (được sửa đổi, bổ sung)" },

    // --- Nghị định 303 ---
    { id: 2237, name: "Đề 01: Nghị định số 303/2025/NĐ-CP quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của bộ, cơ quan ngang bộ" },
    { id: 2238, name: "Đề 02: Nghị định số 303/2025/NĐ-CP quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của bộ, cơ quan ngang bộ" },

    // --- Luật Phòng chống tham nhũng ---
    { id: 2258, name: "Đề số 01: VBHN số 118 ngày 27/8/2025 của Văn phòng quốc hội: Luật phòng, chống tham nhũng" },
    { id: 2259, name: "Đề số 02: VBHN số 118 ngày 27/8/2025 của Văn phòng quốc hội: Luật phòng, chống tham nhũng" },

    // --- Nghị định 109 ---
    { id: 2264, name: "Đề 01: Nghị định 109/2025/NĐ-CP ngày 20/05/2025 quy định chức năng, nhiệm vụ, quyền hạn, cơ cấu tổ chức của thanh tra chính phủ. " },

    // --- Luyện đề tổng hợp TTCP ---
    { id: 2303, name: "Đề 01: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2304, name: "Đề 02: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2305, name: "Đề 03: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2306, name: "Đề 04: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2307, name: "Đề 05: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2308, name: "Đề 06: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2309, name: "Đề 07: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2310, name: "Đề 08: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2311, name: "Đề 09: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2312, name: "Đề 10: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2313, name: "Đề 11: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2314, name: "Đề 12: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2315, name: "Đề 13: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2316, name: " Đề 14: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2317, name: " Đề 15: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2318, name: " Đề 16: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2319, name: "Đề 17: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2320, name: "Đề 18: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2321, name: "Đề 19: TTCP - Vòng 1 - Luyện đề tổng hợp" },
    { id: 2322, name: "Đề 20: TTCP - Vòng 1 - Luyện đề tổng hợp" }
];

    const mainContent = document.getElementById('main-content');
    const examSelectionScreen = document.getElementById('exam-selection-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const examListContainer = document.getElementById('exam-list');
    const quizTitleElement = document.getElementById('quiz-title'); // Dùng cho giao diện mới
    
    let currentQuestions = [], currentQuestionIndex = 0, userAnswers = [], timerInterval;

    function displayExamList() {
        quizTitleElement.classList.add('hidden');
        examListContainer.innerHTML = '';
        examFiles.forEach(exam => {
            const examElement = document.createElement('div');
            examElement.classList.add('exam-item');
            examElement.textContent = exam.name;
            examElement.onclick = () => startQuiz(exam);
            examListContainer.appendChild(examElement);
        });
    }

    async function startQuiz(exam) {
        try {
            const response = await fetch(`./data/ttcp_${exam.id}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const jsonData = await response.json();
            console.log("✅ Dữ liệu từ file JSON đã được đọc thành công:", jsonData);

            // ** LOGIC XỬ LÝ DỮ LIỆU ĐÃ HOẠT ĐỘNG TỐT **
            const questions = jsonData.data.examCode.data.questions.data;
            const examInfoFromCode = jsonData.data.examCode.data.exam.data;
            const examInfoGeneral = jsonData.data.exam; // Lấy thông tin chung
            
            // Kết hợp thông tin từ hai nơi
            const examInfo = { ...examInfoGeneral, ...examInfoFromCode };

            if (!questions || !Array.isArray(questions) || questions.length === 0) {
                throw new Error("Không tìm thấy danh sách câu hỏi ('questions') trong file JSON.");
            }
            if (!examInfo || !examInfo.name || typeof examInfo.duration === 'undefined') {
                 throw new Error("Không tìm thấy thông tin bài thi đầy đủ ('name', 'duration') trong file JSON.");
            }
            
            console.log("✅ Thông tin bài thi đã được tìm thấy:", examInfo);
            console.log(`✅ ${questions.length} câu hỏi đã được tìm thấy.`);

            currentQuestions = questions;
            userAnswers = new Array(currentQuestions.length).fill(null);
            currentQuestionIndex = 0;

            quizTitleElement.textContent = examInfo.name;
            quizTitleElement.classList.remove('hidden');
            
            showScreen('quiz');
            displayQuestion();
            buildQuestionMap();
            startTimer(examInfo.duration);
        } catch (error) {
            console.error("❌ Lỗi khi bắt đầu bài thi:", error);
            alert(`Đã xảy ra lỗi khi tải hoặc phân tích đề thi.\n\nLỗi: ${error.message}\n\nVui lòng kiểm tra lại cấu trúc file JSON và xem Console (F12) để biết chi tiết.`);
        }
    }
    
    function displayQuestion() {
        const questionData = currentQuestions[currentQuestionIndex];
        const questionContainer = document.getElementById('question-container');
        
        let answersHtml = '<ul class="answer-options">';
        questionData.answers.forEach((answer) => {
            const isSelected = userAnswers[currentQuestionIndex] === answer.id;
            answersHtml += `
                <li class="answer-option ${isSelected ? 'selected' : ''}" data-answer-id="${answer.id}">
                    <label>
                        <input type="radio" name="answer" value="${answer.id}" ${isSelected ? 'checked' : ''}>
                        <div>${answer.answer}</div>
                    </label>
                </li>
            `;
        });
        answersHtml += '</ul>';

        // ** THAY ĐỔI MỚI BẮT ĐẦU TỪ ĐÂY **
        // Tự động xóa chuỗi [CÔNG CHỨC 247] và các biến thể khỏi câu hỏi
        const cleanQuestion = questionData.question.replace(/\[CÔNG CHỨC 247\]/gi, '').trim();
        
        questionContainer.innerHTML = `
            <p><strong>Câu ${currentQuestionIndex + 1}:</strong> ${cleanQuestion}</p>
            ${answersHtml}
        `;
        // ** KẾT THÚC THAY ĐỔI **

        document.getElementById('question-counter').textContent = `Câu ${currentQuestionIndex + 1} / ${currentQuestions.length}`;
        document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
        document.getElementById('next-btn').disabled = currentQuestionIndex === currentQuestions.length - 1;

        document.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', () => selectAnswer(option));
        });
        
        updateQuestionMap();
    }

    function selectAnswer(optionElement) {
        const answerId = parseInt(optionElement.dataset.answerId);
        userAnswers[currentQuestionIndex] = answerId;
        document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
        optionElement.classList.add('selected');
        optionElement.querySelector('input').checked = true;
        updateQuestionMap();
    }
    
    function buildQuestionMap() {
        const map = document.getElementById('question-map');
        map.innerHTML = '';
        currentQuestions.forEach((_, index) => {
            const btn = document.createElement('button');
            btn.classList.add('question-map-btn');
            btn.textContent = index + 1;
            btn.onclick = () => goToQuestion(index);
            map.appendChild(btn);
        });
    }

    function updateQuestionMap() {
        const buttons = document.querySelectorAll('.question-map-btn');
        buttons.forEach((btn, index) => {
            btn.classList.remove('current', 'answered');
            if (userAnswers[index] !== null) {
                btn.classList.add('answered');
            }
            if (index === currentQuestionIndex) {
                btn.classList.add('current');
            }
        });
    }

    function goToQuestion(index) {
        currentQuestionIndex = index;
        displayQuestion();
    }

    function startTimer(durationInMinutes) {
        clearInterval(timerInterval);
        let timeRemaining = durationInMinutes * 60;
        const timerElement = document.getElementById('timer');

        timerInterval = setInterval(() => {
            if (timeRemaining < 0) {
                clearInterval(timerInterval);
                alert("Hết giờ làm bài!");
                submitQuiz();
                return;
            }
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            timeRemaining--;
        }, 1000);
    }
    
    function submitQuiz() {
        clearInterval(timerInterval);
        let correctCount = 0;
        let incorrectCount = 0;
        let skippedCount = 0;

        currentQuestions.forEach((question, index) => {
            if (userAnswers[index] === null) {
                skippedCount++;
            } else {
                const correctAnswer = question.answers.find(ans => ans.isCorrect).id;
                if (userAnswers[index] === correctAnswer) {
                    correctCount++;
                } else {
                    incorrectCount++;
                }
            }
        });

        const score = (correctCount / currentQuestions.length) * 10;
        document.getElementById('score-summary').innerHTML = `
            <h3>Điểm số: ${score.toFixed(2)} / 10</h3>
            <p>Số câu đúng: ${correctCount}/${currentQuestions.length}</p>
            <p>Số câu sai: ${incorrectCount}</p>
            <p>Số câu bỏ qua: ${skippedCount}</p>
        `;

        showScreen('result');
        document.getElementById('result-details').innerHTML = '';
        document.getElementById('review-btn').classList.remove('hidden');
    }
    
    function reviewAnswers() {
        let resultDetailsHtml = '<h3>Chi tiết bài làm</h3>';
        currentQuestions.forEach((question, index) => {
            const userAnswerId = userAnswers[index];
            const correctAnswer = question.answers.find(ans => ans.isCorrect);

            let answersHtml = '<ul class="answer-options">';
            question.answers.forEach(answer => {
                let className = '';
                if (answer.isCorrect) {
                    className = 'correct';
                } else if (userAnswerId === answer.id && !answer.isCorrect) {
                    className = 'incorrect';
                }
                answersHtml += `<li class="answer-option ${className}"><div>${answer.answer}</div></li>`;
            });
            answersHtml += '</ul>';

            resultDetailsHtml += `
                <div class="question-review">
                    <p><strong>Câu ${index + 1}:</strong> ${question.question}</p>
                    ${answersHtml}
                    <div class="explanation">${question.note}</div>
                </div>
            `;
        });
        document.getElementById('result-details').innerHTML = resultDetailsHtml;
        document.getElementById('review-btn').classList.add('hidden');
    }
    
    function showScreen(screenId) {
        mainContent.childNodes.forEach(node => {
            if (node.nodeType === 1) { 
                node.classList.add('hidden');
            }
        });
        document.getElementById(`${screenId}-screen`).classList.remove('hidden');
    }
    
    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        }
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });

    document.getElementById('submit-btn').addEventListener('click', () => {
        if(confirm('Bạn có chắc chắn muốn nộp bài không?')) {
            submitQuiz();
        }
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
        showScreen('exam-selection');
        displayExamList();
    });
    
    document.getElementById('review-btn').addEventListener('click', reviewAnswers);

    displayExamList();
});