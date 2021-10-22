async function refreshQuote() {
    fetch("https://api.quotable.io/random")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            $(".quote-text").html(`"${data.content}"`);
            $(".quote-author").html(data.author);
        });
};

async function getTime() {
    fetch("https://worldtimeapi.org/api/ip")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            let nowTime = (data.datetime).split("T")[1];
            let hour = parseFloat(nowTime.split(":")[0]);
            console.log(hour);
            let minute = parseFloat(nowTime.split(":")[1]);
            console.log(minute);
            if (hour >= 0 && hour < 6) {
                changeTimeOfDay("night", "");
            } else if (hour >= 6 && hour < 12) {
                changeTimeOfDay("morning", "Good morning, ");
            } else if (hour >= 12 && hour < 18) {
                changeTimeOfDay("afternoon", "Good afternoon, ");
            } else {
                changeTimeOfDay("evening", "Good evening, ");
            };
            nowHour = hour.toString().padStart(2, "0");
            nowMinute = minute.toString().padStart(2, "0");
            $(".time-text").html(`${nowHour}:${nowMinute}`);
            $(".time-zone").html(data.abbreviation);
            $("#zone").html(data.timezone);
            $("#day-of-week").html(data.day_of_week);
            $("#day-of-year").html(data.day_of_year);
            $("#week-number").html(data.week_number);

        });
};

function changeTimeOfDay(timeOfDay, greeting) {
    $(".time-of-day").html(greeting);
    $("body").removeClass().addClass(timeOfDay);

}

async function getLocation() {
    fetch('https://api.ip2loc.com/4b8txyCFub8zpMlHT5QaRnQDxFLC4hPO/detect?include=city,country_alpha_2')
        .then(response => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            $(".location").html(`in ${data.city}, ${data.country_alpha_2}`);
        })
        .catch(error => {
            console.log(error)
        })
}

function updateTime() {
    setInterval(() => {
        getTime()
    }, 30000);
}

function expand() {
    const main = $(".main");
    if (main.hasClass("expanded")) {
        main.removeClass("expanded").addClass("unexpanded");
        $(".expand-text").html("more");
    } else {
        main.removeClass("unexpanded").addClass("expanded");
        $(".expand-text").html("less");

    };
}

$(".refresh-quote-icon").on("click", () => {
    refreshQuote();
});

$(".arrow-button").on("click", () => {
    expand();
})

$(refreshQuote());
$(getTime());
$(getLocation());
$(updateTime());