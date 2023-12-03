// -----------------Автоматична бескінечна зміна слайдів:

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {  // Приховати всі слайди
        slide.style.display = 'none';
    });
    slides[index].style.display = 'block'; // Показати один слайд
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % 4; // Змінити 4 на кількість слайдів
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Автоматична зміна слайдів кожні 5 секунд

showSlide(currentSlide); // Початкове відображення першого слайда


// ---------------------------------Валідація форми: 

function calculateTotal() {
    const checkInDate = document.getElementById("checkInDate").value; // заповнювані вікна форми
    const checkOutDate = document.getElementById("checkOutDate").value;
    const roomCount = parseInt(document.getElementById("roomCount").value, 10);
    const adultsCount = parseInt(document.getElementById("adultsCount").value, 10);
    const childrenCount = parseInt(document.getElementById("childrenCount").value, 10);
    const breakfastChecked = document.getElementById("breakfast").checked;
    const wifiChecked = document.getElementById("wifi").checked;
    const viewChecked = document.getElementById("view").checked;
    const baseCostPerNight = 1000; // вартість додаткових послуг
    const breakfastCostPerPerson = 50;
    const additionalServiceCost = 100;

    const totalNights = calculateNightDifference(checkInDate, checkOutDate); //вирахування діб
    const totalAdults = adultsCount * totalNights; 
    const totalChildren = childrenCount * totalNights;
    const totalCost = baseCostPerNight * roomCount * totalNights + //розрахунок загальної вартості
                      (breakfastChecked ? breakfastCostPerPerson * (totalAdults + totalChildren): 0) +
                      (wifiChecked ? additionalServiceCost : 0) +
                      (viewChecked ? additionalServiceCost : 0);

    // Виведення до модального вікна
    document.getElementById("bookingDetails").innerHTML =
        `Дата заїзду: ${checkInDate}<br>
         Дата виїзду: ${checkOutDate}<br>
         Кількість кімнат: ${roomCount}<br>
         Кількість дорослих: ${adultsCount}<br>
         Кількість дітей: ${childrenCount}<br>
         Додаткові послуги: ${breakfastChecked ? 'Сніданок, ' : ''}${wifiChecked ? 'WiFi, ' : ''}${viewChecked ? 'Вид з вікна' : ''}`;

    document.getElementById("totalCost").innerHTML = `Загальна вартість: ${totalCost} грн`;
    //виведення самого модального вікна
    document.getElementById("modal").style.display = "flex";
}

function calculateNightDifference(checkInDate, checkOutDate) { // Вирахування кількості діб
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const nightDifference = Math.round(Math.abs((startDate - endDate) / oneDay));
    return nightDifference;
}

function closeModal() { // Закрити модальне вікно
    document.getElementById("modal").style.display = "none";
}

function setMinDate() { //встановлення мінімальної дати заїзду (від сьогоднішньої)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkInDate').min = today;
    document.getElementById('checkOutDate').min = today;
}

function setDefaultCheckOutDate() { //встановлення мінімальної дати виїзду (від заїзду)
    const checkInDate = document.getElementById('checkInDate').value;
    const nextDay = new Date(new Date(checkInDate).getTime()+24*60*60*1000);
    const tomorrow = nextDay.toISOString().split('T')[0];
    document.getElementById('checkOutDate').min = tomorrow;
    document.getElementById('checkOutDate').value = tomorrow;
}

setMinDate();
setDefaultCheckOutDate();
