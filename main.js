const days = document.querySelector('.js-days');
const hours = document.querySelector('.js-hours');
const minutes = document.querySelector('.js-mins');
const seconds = document.querySelector('.js-secs');

const targetDate = new Date("August 14 2026 00:00:00").getTime();


function timer() {
    const currentDate = new Date().getTime();
    const distance = targetDate - currentDate;
    
    const day = Math.floor(distance/1000/60/60/24);
    const hour = Math.floor(distance/1000/60/60) % 24;
    const min = Math.floor(distance/1000/60) % 60;
    const sec = Math.floor(distance/1000) %60;

    days.innerHTML = day.toString().padStart(2, '0');
    hours.innerHTML = hour.toString().padStart(2, '0');
    minutes.innerHTML = min.toString().padStart(2, '0');
    seconds.innerHTML = sec.toString().padStart(2, '0');

    if (distance <= 0) {
        clearInterval(countdown);
        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";
        return;

    }
}

const countdown = setInterval(timer, 1000);

