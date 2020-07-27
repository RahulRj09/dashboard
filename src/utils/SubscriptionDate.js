const getTheExpDate = (date) => {
    let today = new Date();
    let curruntMonth = today.getMonth() + 1
    let curruntYear = today.getFullYear()
    let expDate = date.split('-')
    let expYear = expDate[0];
    let expMonth = expDate[0 + 1];

    let rMonths = (expMonth - curruntMonth) + ((expYear - curruntYear) * 12);

    let rMonthsInPercents = (rMonths * 100 / 12);
    let toReturn = rMonthsInPercents.toString().split('.')[0]
    return toReturn;
}

const dateFormat = (date) => {
    if (date != undefined) {
        let rawData = date.split('-');
        let toReturn = rawData[2].split('T')[0] + '-' + rawData[1] + '-' + rawData[0]
        return toReturn;

    }
}

export { getTheExpDate, dateFormat }