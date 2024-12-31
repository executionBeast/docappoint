export const timestampToHumanDate = (timestampToConvert) => {
    const humanDate = new Date(Number(timestampToConvert)).toString();
    console.log(`FUNCTION : timestampToHumandate(${timestampToConvert})=> ${humanDate}`)
    return humanDate;
}

export const humanDateToTimestamp = (humanDate)=>{
    // const humanDate = "Fri Dec 29 2024 08:25:00 GMT+0530 (India Standard Time)"
    const timestamp = new Date(humanDate).getTime();
    console.log(`humanDateToTimestamp(${humanDate}) => ${timestamp}`);
    return timestamp
}
