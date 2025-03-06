function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

export function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),



    ].join('-');
}

export function formatDateTime(input) {
    // console.log(input)
    return (
        padTo2Digits(input.getDate()) + "-" +
        padTo2Digits(input.getMonth() + 1) + "-" +
        input.getFullYear() + " " +

        padTo2Digits(input.getHours()) + ":" +
        padTo2Digits(input.getMinutes()) + ":" +
        padTo2Digits(input.getSeconds())



    )


}

function parseDate(str) {
    // console.log(str)
    if (str !== null) {



        var dateOnly = str.substring(0, 10);
        // console.log(dateOnly)
        var mdy = dateOnly.split('-');
        // console.log(mdy)
        // return new Date(mdy[2], mdy[0] - 1, mdy[1]); // y,d,m
        // return new Date(mdy[0] - 1, mdy[1], mdy[2]);
        var serverTime = mdy[2] + "-" + mdy[1] + "-" + mdy[0];
        // console.log("Server time :", serverTime)
        return new Date(serverTime);
    }
}

function datediff(fromdate, todate) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((todate - fromdate) / (1000 * 60 * 60 * 24));
}

export const CalculateDays = (fromdate, todate) => {
    // let difference = fromdate.getTime() - todate.getTime();
    // let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

    // console.log(fromdate)
    // console.log(todate)

    // let dt1 = parseDate(fromdate);

    // let dt2 = parseDate(todate);


    // let TotalDays = datediff(dt1, dt2);
    // if (TotalDays === 0) {
    //     TotalDays = 1;
    // }
    // return TotalDays;

    // https://riptutorial.com/javascript/example/5869/float-to-integer

    const dt1 = new Date(Date.parse(get_ServerDateTime(fromdate)));
    const dt2 = new Date(Date.parse(get_ServerDateTime(todate)));

    const millSec = Math.abs(dt2 - dt1)

    let days = Math.ceil((millSec / 36e5) / 24)

    // console.log("MillSec :", ((millSec / 36e5) / 24))
    // console.log("Days :", days)
    if (days === 0) {
        days = 1;
    }

    return days;

    //------------------------------

    // let days = Math.ceil((millSec / 36e5) / 24)
    // console.log("Days :", days)



    // if (days === 0) {
    //     days = 1;

    //     return days;
    // } else if (days >= 1) {
    //     console.log("days-x :", days)

    //     let daysFract = ((millSec / 36e5) / 24)
    //     let dayDecimal = parseFloat(parseFloat(daysFract).toFixed(2));
    //     console.log('dayDecimal', dayDecimal)




    //     let fract = daysFract.toString().split('.');
    //     console.log("fract :", fract)
    //     console.log("fract.length :", fract.length)
    //     if (fract.length >= 2) {
    //         let dayhour = parseFloat(dayDecimal.toString().substring(1, 4));
    //         console.log('dayhour :', dayhour)



    //         console.log("fract0 :", fract[0])
    //         let fract2 = parseFloat(fract[1].substring(0, 2));
    //         console.log("fract1 :", fract[1])
    //         console.log("fract2 :", fract2)
    //         if (dayhour > parseFloat('0.02')) {
    //             // days = Math.floor(dayDecimal);
    //             days += 1;
    //         }

    //     }
    //     return days;


}


export const ConvertToServerDate = (inputDate) => {
    var dateOnly = inputDate.substring(0, 10);

    var mdy = dateOnly.split('-');

    var serverDate = mdy[2] + "-" + mdy[1] + "-" + mdy[0];

    // return new Date(serverTime);
    return serverDate;
}

export function Get_Date(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    var hours = d.getHours();
    var mins = d.getMinutes();
    var sec = d.getSeconds();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        //                 alert(month);
        month = "0" + month;
    }
    //        var date = day + "-" + month + "-" + year;
    var dateTime = day + "-" + month + "-" + year + " " + hours + ":" + mins + ":" + sec;

    return dateTime;
}

export function Sql_Date(dateObject) {

    var date = dateObject;
    var d = new Date(date.split("/").reverse().join("-"));
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    var hours = d.getHours();
    var mins = d.getMinutes();
    var sec = d.getSeconds();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        //                 alert(month);
        month = "0" + month;
    }

    var newdate = year + "-" + month + "-" + day;




    return newdate;

}

export function get_ServerDateTime(stringDate) {

    let strArry = stringDate.split(" ");

    let dateX = strArry[0];
    let timeX = strArry[1];

    let dateArry = dateX.split("-")
    // console.log(dateArry)

    let day = dateArry[0]
    let month = dateArry[1]
    let year = dateArry[2]

    // console.log(day)
    // console.log(day)
    // console.log(year + "-" + month + "-" + day)
    var newdate = year + "-" + month + "-" + day + " " + timeX;
    return newdate;

}

export function convert_ServerDT_To_ShortDT(stringDate) {
    let strArry = stringDate.split(" ");

    let dateX = strArry[0];
    let timeX = strArry[1];

    let dateArry = dateX.split("-")
    // console.log(dateArry)

    let day = dateArry[2]
    let month = dateArry[1]
    let year = dateArry[0]


    var newdate = day + "-" + month + "-" + year + " " + timeX;
    return newdate;
}







export function get_ServerDate(stringDate) {



    let dateArry = stringDate.split("-")
    // console.log(dateArry)

    let day = dateArry[0]
    let month = dateArry[1]
    let year = dateArry[2]

    // console.log(day)
    // console.log(day)
    // console.log(year + "-" + month + "-" + day)
    var newdate = year + "-" + month + "-" + day
    return newdate;

}



export const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const strTime = `${hours}:${minutes} ${ampm}`;

    return strTime;
};

export const stringDateTimeToAMPM = (datetime) => {


    let dateArry = datetime.split(" ");

    // console.log(dateArry)
    let date = dateArry[0];
    let time = dateArry[1];
    // console.log((time))
    // console.log(typeof (time))
    let timeArry = time ? time.split(":") : "";
    // let timeArry = time.split(/[\s|:]/g);
    // let timeArry = time ? time.split(/[:]+/) : null;
    // console.log(timeArry)
    let hours = parseInt(timeArry[0]);
    let minutes = parseInt(timeArry[1]);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    // console.log(ampm)

    hours %= 12;
    hours = hours || 12;

    hours = hours < 10 ? `0${hours}` : hours;

    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const strDateTime_AMPM = `${date} ${hours}:${minutes} ${ampm}`;

    // console.log(strDateTime_AMPM)

    return strDateTime_AMPM


}




export function FormatToCurrency(amount) {


    return (new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(amount));

}

export function StringToCurrency(price) {
    // var newPrice = (price.replace(/[^0-9\\.]/g, ''));
    const newPrice = price.toLocaleString('en-IN', { maximumFractionDigits: 2 })
    return newPrice;
}




export const BaseURL = "http://localhost:8080/api";