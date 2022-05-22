const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
     return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents : [],
        timeOutEvents : []
    }
}

const createEmployeeRecords = (employeeRecords) => {
    const result = []
    for (const employee of employeeRecords) {
        result.push(createEmployeeRecord(employee));
    }
    return result;
}

const createTimeInEvent = (record, timeStamp) => {

    const timeObj = {
        type: "TimeIn",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeInEvents.push(timeObj)
    return record
}

const createTimeOutEvent = (record, timeStamp) => {

    const timeObj = {
        type: "TimeOut",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeOutEvents.push(timeObj)
    return record
}

const hoursWorkedOnDate = (record, date) => {
    const timeIn = record.timeInEvents.find(e => {
        return e.date === date
    }).hour
    const timeOut = record.timeOutEvents.find(e => {
        return e.date === date
    }).hour
    debugger
    return (timeOut - timeIn) / 100
}

const wagesEarnedOnDate = (record, date) => {
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

const allWagesFor = (record) => {
    let pay = 0;
    for (let i = 0; i < record.timeInEvents.length; i++) {
        let payDay = wagesEarnedOnDate(record, record.timeInEvents[i].date)
        pay += payDay
    }
    return pay
}

const findEmployeeByFirstName = (record, firstName) => {
    return record.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  const calculatePayroll = (arr) => {
    const totalPay = arr.reduce((acc, record) => {
        const totalPayForEmployee = allWagesFor(record)
        return acc + totalPayForEmployee
    }, 0)
    return totalPay
  }