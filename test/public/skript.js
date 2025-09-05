// Данные пользователя
let userData = {
    balance: 1250,
    completedTasks: 8,
    availableTasks: 12,
    refCount: 3,
    refEarnings: 450
};

// Данные заданий
const tasks = [
    { 
        id: 1, 
        title: "Регистрация на сайте", 
        desc: "Зарегистрируйтесь на сайте партнера, подтвердите email и заполните базовую информацию о себе. Это займет не более 3 минут.", 
        reward: 50, 
        url: "https://example.com/offer1",
        category: "registration",
        time: "3-5 минут",
        difficulty: "Легкая",
        successRate: "95%"
    },
    { 
        id: 2, 
        title: "Установите приложение", 
        desc: "Скачайте и установите мобильное приложение из App Store или Google Play. Запустите приложение и выполните первоначальную настройку.", 
        reward: 100, 
        url: "https://example.com/offer2",
        category: "app",
        time: "5-7 минут",
        difficulty: "Легкая",
        successRate: "90%"
    },
    { 
        id: 3, 
        title: "Оформите заказ", 
        desc: "Перейдите в интернет-магазин, добавьте товар в корзину и завершите покупку. Минимальная сумма заказа - 500 рублей.", 
        reward: 200, 
        url: "https://example.com/offer3",
        category: "shopping",
        time: "10-15 минут",
        difficulty: "Средняя",
        successRate: "85%"
    },
    { 
        id: 4, 
        title: "Подписка на канал", 
        desc: "Подпишитесь на наш Telegram канал и оставайтесь подписанным минимум 7 дней. Не отписывайтесь раньше времени!", 
        reward: 30, 
        url: "https://t.me/example_channel",
        category: "social",
        time: "2-3 минуты",
        difficulty: "Очень легкая",
        successRate: "98%"
    },
    { 
        id: 5, 
        title: "Заполните анкету", 
        desc: "Ответьте на 10 вопросов анкеты честно и развернуто. Ваши ответы помогут улучшить наши услуги.", 
        reward: 75, 
        url: "https://example.com/survey1",
        category: "registration",
        time: "7-10 минут",
        difficulty: "Легкая",
        successRate: "92%"
    },
    { 
        id: 6, 
        title: "Оформите подписку", 
        desc: "Активируйте пробную подписку на 7 дней. Вы можете отменить её в любой момент до окончания пробного периода.", 
        reward: 150, 
        url: "https://example.com/subscribe",
        category: "registration",
        time: "5-8 минут",
        difficulty: "Легкая",
        successRate: "88%"
    }
];

// Текущее выбранное задание
let currentTask = null;

// Инициализация
window.onload = function() {
    initTelegramWebApp();
    loadTasks();
    updateUserData();
    loadUserProfile();
    initTheme();
};

// Инициализация Telegram WebApp
function initTelegramWebApp() {
    try {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
        Telegram.WebApp.enableClosingConfirmation();
        
        // Устанавливаем цвет тему Telegram
        Telegram.WebApp.setHeaderColor('#007aff');
        Telegram.WebApp.setBackgroundColor('#f8f9fa');
        
    } catch (error) {
        console.log('Telegram WebApp не доступен');
    }
}

// Загрузка профиля пользователя из Telegram
function loadUserProfile() {
    try {
        const user = Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            document.getElementById('user-name').textContent = 
                user.first_name + (user.last_name ? ' ' + user.last_name : '');
            
            document.getElementById('user-username').textContent = 
                user.username ? '@' + user.username : 'Без username';
            
            // Создаем аватар из первых букв имени
            const firstName = user.first_name || '';
            const lastName = user.last_name || '';
            const avatarText = (firstName.charAt(0) + (lastName ? lastName.charAt(0) : '')).toUpperCase();
            document.getElementById('user-avatar').textContent = avatarText;
        }
    } catch (error) {
        console.log('Не удалось загрузить данные пользователя');
    }
}

// Инициализация темы
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-icon').textContent = '☀️';
        Telegram.WebApp.setBackgroundColor('#1a202c');
    }
}

// Переключение темы
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
        Telegram.WebApp.setBackgroundColor('#f8f9fa');
    } else {
        body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
        Telegram.WebApp.setBackgroundColor('#1a202c');
    }
}

// Показываем задания
function loadTasks() {
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';
    
    tasks.forEach(task => {
        const taskHTML = `
            <div class="task-card" onclick="openTaskModal(${task.id})">
                <div class="task-header">
                    <div class="task-title">${task.title}</div>
                    <div class="task-reward">+${task.reward} ₽</div>
                </div>
                <div class="task-desc">${task.desc}</div>
                <div class="task-meta">
                    <span>⏱️ ${task.time}</span>
                    <span>🎯 ${task.difficulty}</span>
                </div>
            </div>
        `;
        container.innerHTML += taskHTML;
    });
}

// Обновляем данные пользователя
function updateUserData() {
    document.getElementById('user-balance').textContent = userData.balance + ' ₽';
    document.getElementById('completed-tasks').textContent = userData.completedTasks;
    document.getElementById('available-tasks').textContent = userData.availableTasks;
    document.getElementById('success-rate').textContent = 
        Math.round((userData.completedTasks / (userData.completedTasks + userData.availableTasks)) * 100) + '%';
    document.getElementById('ref-count').textContent = userData.refCount;
    document.getElementById('ref-earnings').textContent = userData.refEarnings + '₽';
}

// Открыть модальное окно задания
function openTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        currentTask = task;
        
        document.getElementById('modal-task-title').textContent = task.title;
        document.getElementById('modal-task-desc').textContent = task.desc;
        document.getElementById('modal-task-reward').textContent = '+' + task.reward + ' ₽';
        document.getElementById('modal-task-url').textContent = task.url;
        
        document.getElementById('task-modal').style.display = 'flex';
    }
}

// Закрыть модальное окно
function closeModal() {
    document.getElementById('task-modal').style.display = 'none';
    currentTask = null;
}

// Начать задание
function startTask() {
    if (currentTask) {
        // Открываем ссылку в браузере
        window.open(currentTask.url, '_blank');
        
        // Закрываем модальное окно
        closeModal();
        
        // Показываем уведомление
        showNotification('Задание начато! Вернитесь после выполнения.');
        
        // Обновляем статистику
        userData.completedTasks++;
        userData.balance += currentTask.reward;
        updateUserData();
    }
}

// Переключение вкладок
function showTab(tabName) {
    // Скрываем все вкладки
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Показываем выбранную вкладку
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Обновляем навигацию
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

// Вывод денег
function withdrawMoney() {
    if (userData.balance < 100) {
        showNotification('Минимальная сумма для вывода: 100 ₽');
        return;
    }
    
    showNotification(`Запрос на вывод ${userData.balance} ₽ отправлен! Ожидайте обработки.`);
}

// Копирование реферальной ссылки
function copyRefLink() {
    const refLink = document.getElementById('ref-link');
    refLink.select();
    document.execCommand('copy');
    showNotification('Ссылка скопирована в буфер обмена!');
}

// Применить фильтры
function applyFilters() {
    showNotification('Фильтры применены!');
    // Здесь будет логика фильтрации
}

// Показать уведомление
function showNotification(message) {
    try {
        Telegram.WebApp.showAlert(message);
    } catch (error) {
        alert(message);
    }
}

// Закрытие модального окна по клику вне его
document.getElementById('task-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Инициализация чипов
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});