// script.js

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date-input');
    const datePicker = document.getElementById('date-picker');
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const datesContainer = document.getElementById('dates');

    let currentDate = new Date();
    let selectedDate = new Date();

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    for (let i = 0; i < months.length; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = months[i];
        monthSelect.appendChild(option);
    }

    for (let i = currentDate.getFullYear() - 100; i <= currentDate.getFullYear() + 100; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    monthSelect.value = currentDate.getMonth();
    yearSelect.value = currentDate.getFullYear();

    dateInput.addEventListener('click', () => {
        datePicker.style.display = datePicker.style.display === 'block' ? 'none' : 'block';
        renderCalendar();
    });

    monthSelect.addEventListener('change', renderCalendar);
    yearSelect.addEventListener('change', renderCalendar);

    function renderCalendar() {
        datesContainer.innerHTML = '';
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearSelect.value);
        currentDate.setFullYear(year, month, 1);

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const lastDayOfPrevMonth = new Date(year, month, 0);

        const firstDayIndex = firstDayOfMonth.getDay();
        const lastDayIndex = lastDayOfMonth.getDate();
        const prevLastDayIndex = lastDayOfPrevMonth.getDate();

        for (let i = firstDayIndex; i > 0; i--) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date');
            dateElement.textContent = prevLastDayIndex - i + 1;
            dateElement.style.color = '#ccc';
            datesContainer.appendChild(dateElement);
        }

        for (let i = 1; i <= lastDayIndex; i++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date');
            dateElement.textContent = i;

            if (i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                dateElement.classList.add('selected');
            }

            dateElement.addEventListener('click', () => {
                selectedDate = new Date(year, month, i);
                dateInput.value = selectedDate.toLocaleDateString();
                datePicker.style.display = 'none';
            });

            datesContainer.appendChild(dateElement);
        }

        const nextDays = 7 - (datesContainer.childElementCount % 7);
        for (let i = 1; i <= nextDays; i++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date');
            dateElement.textContent = i;
            dateElement.style.color = '#ccc';
            datesContainer.appendChild(dateElement);
        }
    }
});
