/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/


/*=============== DAY COUNTER FOR CHRISTMAS ===============*/
const titleData = document.getElementById('title-data');
const numberData = document.getElementById('number-data');
const textData = document.getElementById('text-data');
const msgChristmas = document.getElementById('msg-chrismas');

const christmasCountdown = () => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();

    let nextChristmasYear = now.getFullYear();
    if (currentMonth === 12 && currentDay > 25) {
        nextChristmasYear += 1;
    }

    const nextChristmasDate = `Dec 25, ${nextChristmasYear} 00:00:00`;
    const ChristmasDay = new Date(nextChristmasDate);
    const timeLeft = ChristmasDay - now;

    const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);
    const hours = Math.floor(timeLeft / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(timeLeft / 1000 / 60) % 60;
    const seconds = Math.floor(timeLeft / 1000) % 60;

    updateCountdownDisplay(days, hours, minutes, seconds);
    handleSpecialMessages(currentMonth, currentDay);
};

const updateCountdownDisplay = (days, hours, minutes, seconds) => {
    numberData.innerHTML = days < 10 ? `0${days}` : days;
    textData.innerHTML = days === 1 ? 'Day' : 'Days';

    if (days === 0 && hours === 0) {
        numberData.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
        textData.innerHTML = minutes === 1 ? 'Minute' : 'Minutes';

        if (minutes === 0) {
            numberData.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
            textData.innerHTML = seconds === 1 ? 'Second' : 'Seconds';
        }
    }
};

const handleSpecialMessages = (currentMonth, currentDay) => {
    if (currentMonth === 12 && currentDay === 25) {
        titleData.style.display = 'none';
        msgChristmas.style.display = 'block';
        msgChristmas.innerHTML = 'Today is Dec 25, Merry Christmas';
    }

    if (currentMonth === 12 && currentDay === 26) {
        titleData.style.display = 'block';
        msgChristmas.style.display = 'none';
    }
};

setInterval(christmasCountdown, 1000);




