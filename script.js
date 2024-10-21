// Вопросы с выбором одного ответа
const questions = [
    {
        text: "Какой оператор используется для выбора данных из таблицы?",
        options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
        correct: 2
    },
    {
        text: "Какой оператор используется для обновления данных в таблице?",
        options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
        correct: 1
    },
    {
        text: "Какой оператор используется для удаления данных из таблицы?",
        options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
        correct: 3
    },
    {
        text: "Какой оператор используется для вставки данных в таблицу?",
        options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
        correct: 0
    },
    {
        text: "Какой оператор используется для создания таблицы?",
        options: ["CREATE TABLE", "ALTER TABLE", "DROP TABLE", "TRUNCATE TABLE"],
        correct: 0
    },
    {
        text: "Какой оператор используется для изменения структуры таблицы?",
        options: ["CREATE TABLE", "ALTER TABLE", "DROP TABLE", "TRUNCATE TABLE"],
        correct: 1
    },
    {
        text: "Какой оператор используется для удаления таблицы?",
        options: ["CREATE TABLE", "ALTER TABLE", "DROP TABLE", "TRUNCATE TABLE"],
        correct: 2
    },
    {
        text: "Какой оператор используется для удаления всех данных из таблицы, но не самой таблицы?",
        options: ["CREATE TABLE", "ALTER TABLE", "DROP TABLE", "TRUNCATE TABLE"],
        correct: 3
    },
    {
        text: "Какой оператор используется для объединения результатов двух запросов?",
        options: ["JOIN", "UNION", "INTERSECT", "EXCEPT"],
        correct: 1
    },
    {
        text: "Какой оператор используется для выбора уникальных значений из столбца?",
        options: ["DISTINCT", "UNIQUE", "GROUP BY", "HAVING"],
        correct: 0
    },
    {
        text: "Какой оператор используется для фильтрации данных по условию?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        correct: 0
    },
    {
        text: "Какой оператор используется для группировки данных?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        correct: 2
    },
    {
        text: "Какой оператор используется для сортировки данных?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        correct: 3
    },
    {
        text: "Какой оператор используется для выбора данных, которые удовлетворяют условию после группировки?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        correct: 1
    },
    {
        text: "Какой оператор используется для объединения таблиц по общему столбцу?",
        options: ["JOIN", "UNION", "INTERSECT", "EXCEPT"],
        correct: 0
    }
];

// SQL вопросы с текстом ввода
const sqlQuestions = [
    {
        text: "Напишите SQL-запрос, который выбирает все столбцы из таблицы employees:",
        correct: "SELECT * FROM employees;"
    },
    {
        text: "Напишите SQL-запрос, который выбирает имена и фамилии всех сотрудников из таблицы employees:",
        correct: "SELECT first_name, last_name FROM employees;"
    },
    {
        text: "Напишите SQL-запрос, который выбирает имена всех сотрудников, зарабатывающих более 50000 в год:",
        correct: "SELECT first_name FROM employees WHERE salary > 50000;"
    },
    {
        text: "Напишите SQL-запрос, который выбирает имена всех сотрудников, работающих в отделе с ID 3:",
        correct: "SELECT first_name FROM employees WHERE department_id = 3;"
    }
];

// Функция для генерации вопросов
function generateQuestions() {
    const container = document.getElementById("questionsContainer");

    // Генерация вопросов с одним правильным ответом
    questions.forEach((question, index) => {
        const div = document.createElement("div");
        div.classList.add("question");
        div.innerHTML = `<p>${index + 1}. ${question.text}</p>`;
        question.options.forEach((option, optIndex) => {
            div.innerHTML += `<label><input type="radio" name="q${index + 1}" value="${optIndex}">${option}</label><br>`;
        });
        container.appendChild(div);
    });

    // Генерация SQL вопросов
    sqlQuestions.forEach((question, index) => {
        const div = document.createElement("div");
        div.classList.add("question");
        div.innerHTML = `<p>${15 + index + 1}. ${question.text}</p>`;
        div.innerHTML += `<textarea name="q${15 + index + 1}" rows="2"></textarea>`;
        container.appendChild(div);
    });
}

// Функция для проверки ответов
function submitQuiz() {
    let score = 0;
    const totalScore = 23; // 15 вопросов с 1 баллом и 4 запроса с 2 баллами каждый

    // Проверка вопросов с выбором одного правильного ответа
    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index + 1}"]:checked`);
        if (selectedAnswer && selectedAnswer.value == question.correct) {
            score++;
        }
    });

    // Проверка SQL вопросов
    sqlQuestions.forEach((question, index) => {
        const userAnswer = document.querySelector(`textarea[name="q${15 + index + 1}"]`).value.trim();
        if (userAnswer.toUpperCase() === question.correct.toUpperCase()) {
            score += 2;
        }
    });

    // Показ результата
    const resultDiv = document.getElementById("result");
    const percentage = (score / totalScore) * 100;

    if (percentage > 50) {
        document.body.className = "passed";
        resultDiv.textContent = `Поздравляем! Вы прошли тест. Ваш результат: ${score} из ${totalScore} (${percentage.toFixed(2)}%)`;
    } else {
        document.body.className = "failed";
        resultDiv.textContent = `К сожалению, вы не прошли тест. Ваш результат: ${score} из ${totalScore} (${percentage.toFixed(2)}%)`;
    }
}

// Вызов функции для генерации вопросов при загрузке страницы
window.onload = generateQuestions;
