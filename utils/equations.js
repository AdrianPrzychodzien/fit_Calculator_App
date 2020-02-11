import moment from 'moment'

//
// BMI equations
//
export const calcBMI = data => {
  const height = data.height / 100
  const result = (data.weight / (height * height)).toFixed(2)

  return result
}

export const rangeBMI = data => {
  let result
  if (data < 16) {
    result = 'Severe Thinness'
  } else if (16 < data && data <= 17) {
    result = 'Moderate Thinness'
  } else if (17 < data && data <= 18.5) {
    result = 'Mild Thinness'
  } else if (18.5 < data && data <= 25) {
    result = 'Normal Weight'
  } else if (25 < data && data <= 30) {
    result = 'Overweight'
  } else {
    result = 'Obese'
  }

  return result
}

export const rangeBMIColor = data => {
  let result
  if (data < 16) {
    result = 'purple'
  } else if (16 < data && data <= 17) {
    result = 'blue'
  } else if (17 < data && data <= 18.5) {
    result = 'lightblue'
  } else if (18.5 < data && data <= 25) {
    result = 'green'
  } else if (25 < data && data <= 30) {
    result = 'orange'
  } else {
    result = 'red'
  }

  return result
}

export const idealBMI = data => {
  const height = data.height / 100
  const resultMax = (25 * height * height).toFixed(1)
  const resultMin = (18.5 * height * height).toFixed(1)

  return [resultMin, resultMax]
}

export const userBmiTip = data => {
  const [normalBMIMin, normalBMIMax] = idealBMI(data)
  let userBmiTip, top, bottom

  if (rangeBMI(calcBMI(data)) === 'Normal Weight') {
    top = (normalBMIMax - data.weight).toFixed(1)
    bottom = (data.weight - normalBMIMin).toFixed(1)

    userBmiTip = `You are ${bottom}kg above and ${top}kg below limit`
  } else if (rangeBMI(calcBMI(data)) === 'Overweight' || rangeBMI(calcBMI(data)) === 'Obese') {
    bottom = data.weight - normalBMIMax

    userBmiTip = `You are ${bottom.toFixed(1)}kg above the upper limit`
  } else {
    top = normalBMIMin - data.weight

    userBmiTip = `You are ${top.toFixed(1)}kg under the lower limit`
  }

  return userBmiTip
}

//
// Heart Rate equations
//
export const maxHeartRate = data => {
  let result
  if (data.sex === 'Male') {
    result = 208 - (0.80 * data.age)
  } else if (data.sex === 'Female') {
    result = 201 - (0.63 * data.age)
  }

  return result
}

export const trainingHeartRate = max => {
  let resultMin = Math.round(max * 0.65)
  let resultMax = Math.round(max * 0.85)

  return [resultMin, resultMax]
}

//
// BMR & Resting Metabolic Age equations
//
export const MifflinStJeor = data => {
  let output = Math.round(restingMifflinStJeor(data) * activityLevel(data.lifeActivity))
  return output ? output : null
}

export const HarrisBenedict = data => {
  let output = Math.round(restingHarrisBenedict(data) * activityLevel(data.lifeActivity))
  return output ? output : null
}

export const KatchMcardle = data => {
  let output = Math.round(restingKatchMcardle(data) * activityLevel(data.lifeActivity))
  return output ? output : null
}

export const restingMifflinStJeor = data => {
  const { sex, weight, height, age } = data
  let result

  if (sex === 'Male') {
    result = (10 * weight) + (6.25 * height) - (5 * age) + 5
  } else if (sex === 'Female') {
    result = (10 * weight) + (6.25 * height) - (5 * age) - 161
  } else {
    console.log('Choose your sex')
    return
  }
  return Math.round(result)
}

export const restingHarrisBenedict = data => {
  let result
  if (data.sex === 'Male') {
    result = (13.397 * data.weight) + (4.799 * data.height) - (5.677 * data.age) + 88.362
  } else if (data.sex === 'Female') {
    result = (9.247 * data.weight) + (3.098 * data.height) - (4.330 * data.age) + 447.593
  } else {
    console.log('Choose your sex')
    return
  }

  return Math.round(result)
}

export const restingKatchMcardle = data => {
  const leanBodyMass = (data.weight * (100 - data.fat)) / 100

  const BMR = Math.round(370 + (21.6 * leanBodyMass))

  return BMR
}

// 
// Activity level equations
//
export const activityLevel = data => {
  let result
  switch (data) {
    case 1:
      result = 1.2
      break
    case 2:
      result = 1.375
      break
    case 3:
      result = 1.55
      break
    case 4:
      result = 1.725
      break
    case 5:
      result = 1.9
      break
    default:
      alert('Choose your activity level')
  }

  return result
}

export const activityLevelComment = data => {
  let result
  switch (data) {
    case 1:
      result = 'being Sedentary'
      break
    case 2:
      result = 'doing Light Exercise'
      break
    case 3:
      result = 'doing Moderate Exercise'
      break
    case 4:
      result = 'doing Heavy Exercise'
      break
    case 5:
      result = 'working out like an Athlete'
      break
    default:
      alert('Choose your activity level')
  }

  return result
}

//
// Body Fat equations
//
export const idealBodyFatPercentage = data => {
  const { sex, age } = data
  let result

  if (sex === 'Male') {
    if (age < 20) {
      result = 8.5
    } else if (20 < age && age <= 25) {
      result = 10.5
    } else if (25 < age && age <= 30) {
      result = 12.7
    } else if (30 < age && age <= 35) {
      result = 13.7
    } else if (35 < age && age <= 40) {
      result = 15.3
    } else if (40 < age && age <= 45) {
      result = 16.4
    } else if (45 < age && age <= 50) {
      result = 18.9
    } else if (50 < age && age <= 55) {
      result = 20.9
    } else {
      result = '21+'
    }
  }

  if (sex === 'Female') {
    if (age < 20) {
      result = 17.7
    } else if (20 < age && age <= 25) {
      result = 18.4
    } else if (25 < age && age <= 30) {
      result = 19.3
    } else if (30 < age && age <= 35) {
      result = 21.5
    } else if (35 < age && age <= 40) {
      result = 22.2
    } else if (40 < age && age <= 45) {
      result = 22.9
    } else if (45 < age && age <= 50) {
      result = 25.5
    } else if (50 < age && age <= 55) {
      result = 26.3
    } else {
      result = '27+'
    }
  }

  return result
}

export const bodyFatFormula = (fatData, userData) => {
  let { waist, neck, hip } = fatData
  let { sex, height } = userData

  let result

  if (sex === 'Male') {
    result = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
    // result = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76
  } else if (sex === "Female") {
    waist = 0.393700787 * waist
    neck = 0.393700787 * neck
    hip = 0.393700787 * waist
    height = 0.393700787 * waist
    result = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450
  }

  return Math.round(result)
}

//
// Macronutrients equations
//
export const ModerateCarb = data => {
  const protein = Math.round((data * 0.3) / 4)
  const carbs = Math.round((data * 0.35) / 4)
  const fats = Math.round((data * 0.35) / 9)

  return [protein, carbs, fats]
}

export const LowCarb = data => {
  const protein = Math.round((data * 0.4) / 4)
  const carbs = Math.round((data * 0.2) / 4)
  const fats = Math.round((data * 0.4) / 9)

  return [protein, carbs, fats]
}

export const HighCarb = data => {
  const protein = Math.round((data * 0.3) / 4)
  const carbs = Math.round((data * 0.5) / 4)
  const fats = Math.round((data * 0.2) / 9)

  return [protein, carbs, fats]
}

//
// Days equations
//
export const diffDays = (end) => {
  const oneDay = 24 * 60 * 60 * 1000
  const firstDate = new Date()
  const secondDate = new Date(end)

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))

  return diffDays
}

// Date Format to display in WeighTrackerData
export const myDateFormat = date => {
  let d = new Date(date)
  let currDay = d.getDay()
  let currDate = d.getDate()
  let currMonth = d.getMonth() + 1
  let currYear = d.getFullYear()
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return `${days[currDay]}, ${currDate}-${currMonth}-${currYear} `
}

//Return arrays of dates from date to date
export const getActualWeekDates = (startDate, stopDate) => {
  var dateArray = []
  var currentDate = moment(startDate)
  var finishDate = moment(stopDate)

  while (currentDate <= finishDate) {
    dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
    currentDate = moment(currentDate).add(1, 'days')
  }

  return dateArray
}

//Return arrays of average weight in specific range of days
export const displayAverageWeight = (dailyWeightArray, func) => {
  const actualMonday = moment().startOf('week').add(1, 'days')
  const actualSunday = moment().endOf('week').add(1, 'days')
  const lastMonday = moment().startOf('week').add(1, 'days').subtract(1, 'weeks')
  const lastSunday = moment().endOf('week').add(1, 'days').subtract(1, 'weeks')
  const beforeLastMonday = moment().startOf('week').add(1, 'days').subtract(2, 'weeks')
  const beforeLastSunday = moment().endOf('week').add(1, 'days').subtract(2, 'weeks')

  // Array of dates in actual, last and next week
  const thisWeekDates = func(actualMonday, actualSunday)
  const lastWeekDates = func(lastMonday, lastSunday)
  const beforeLastWeekDates = func(beforeLastMonday, beforeLastSunday)

  // Return array of weights that matches condition
  const listofWeights = (myObjects, condition) => {
    let list = myObjects.filter(item => {
      return condition.indexOf(item.date) !== -1
    })

    let output = list.map(item => parseFloat(item.weight))

    return output
  }

  const thisWeekWeights = listofWeights(dailyWeightArray, thisWeekDates)
  const lastWeekWeights = listofWeights(dailyWeightArray, lastWeekDates)
  const beforeLastWeekWeights = listofWeights(dailyWeightArray, beforeLastWeekDates)

  const averageWeight = array => {
    return array.length === 0
      ? 0 : (array.reduce((a, b) => a + b, 0) / array.length).toFixed(1)
  }

  const thisWeekAverage = averageWeight(thisWeekWeights)
  const lastWeekAverage = averageWeight(lastWeekWeights)
  const beforeLastWeekAverage = averageWeight(beforeLastWeekWeights)

  // thisWeek => actual week before Sunday
  return [
    thisWeekAverage || 'no data',
    lastWeekAverage || 'no data',
    beforeLastWeekAverage || 'no data'
  ]
}

export const loseOrGain = data => {
  const { weightGoal, dailyWeightArray } = data
  const firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null
  const lastItem = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null

  // Goal is to gain mass ? True : False
  return weightGoal > firstItem
    ? `gain ${(lastItem - firstItem).toFixed(1)}kg`
    : `lost ${(firstItem - lastItem).toFixed(1)}kg`
}

export const weightTrackerInfo = data => {
  const { weightGoal, dailyWeightArray } = data
  const lastItem = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null
  const firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null
  let result

  // How much to gain/lose ?
  // case => Gain weight
  if (weightGoal - firstItem > 0) {
    if (weightGoal - lastItem > 0) {
      result = `${(weightGoal - lastItem).toFixed(1)}kg to gain`
    }

    else if (weightGoal - lastItem <= 0) {
      result = 'you already achieved your goal! Congratulations!'
    }
    // case => Lose weight
  } else if (weightGoal - firstItem < 0) {
    if (lastItem - weightGoal > 0) {
      result = `${(lastItem - weightGoal).toFixed(1)}kg to lose`
    }

    else if (lastItem - weightGoal <= 0) {
      result = 'you already achieved your goal! Congratulations!'
    }
  } else {
    result = 'you already achieved your goal! Congratulations!'
  }

  return result
}

// % amount of weight and time progress in challenge
export const percentageProgress = (data, func) => {
  const { start, finish, dailyWeightArray, weightGoal } = data
  const firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null
  const lastItem = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null
  let kgLeftInGeneral
  let kgLeftFromToday
  let kgLeft

  let start_ = moment(start)
  let finish_ = moment(finish)
  const daysInGeneral = finish_.diff(start_, 'days')
  const daysLeftFromToday = func(finish)

  const daysLeft = Math.round((daysLeftFromToday / daysInGeneral) * 100)

  // Goal is to lose fat ? True : False
  kgLeftFromToday = firstItem > weightGoal
    ? lastItem - weightGoal : weightGoal - lastItem

  kgLeftInGeneral = firstItem > weightGoal
    ? firstItem - weightGoal : weightGoal - firstItem

  kgLeft = Math.round((kgLeftFromToday / kgLeftInGeneral) * 100)

  // If you want to lose fat and you gain weight instead of losing it
  if (firstItem > weightGoal && lastItem > firstItem)
    return [Math.abs(daysLeft - 100), kgLeft = 0]
  // If you want to gain weight and you lose weight 
  else if (weightGoal > firstItem && lastItem < firstItem)
    return [Math.abs(daysLeft - 100), kgLeft = 0]
  else
    return [Math.abs(daysLeft - 100), Math.abs(kgLeft - 100)]
}

// Array of objects that tells how fast you should 
// lose weight/gain weight to stay healthy
export const healthyProgress = data => {
  const { start, finish, dailyWeightArray, weightGoal } = data
  const firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null

  // Change weight by 1% of body mass per day
  const healthyChange = (firstItem / 100 / 7).toFixed(2)

  let healthyArray = []

  let finish_ = moment(finish)
  let howManyWeeks = finish_.diff(start, 'days') + 1

  for (let i = 0; i <= howManyWeeks; i++) {
    healthyArray.push({
      date: moment().startOf(start).add(i, 'days').format('YYYY-MM-DD'),
      ...(firstItem > weightGoal
        ? { weight: firstItem - (healthyChange * i) }
        : { weight: firstItem + (healthyChange * i) })
    })
  }

  return healthyArray
}


export const HealthTips = (data, func) => {
  const { finish, dailyWeightArray, weightGoal } = data
  const firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null
  const lastItem = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null

  let obj
  // let start_ = moment(start)
  // let finish_ = moment(finish)
  // const daysInGeneral = finish_.diff(start_, 'days')
  const daysLeftFromToday = func(finish)

  //  Gain weight or lose weight
  weightGoal - firstItem > 0
    ? obj = {
      info: `need to gain ${(weightGoal - lastItem).toFixed(1)}kg`,
      kgAmout: (weightGoal - lastItem).toFixed(1),
      days: daysLeftFromToday,
    }
    : obj = {
      info: `need to lose ${(lastItem - weightGoal).toFixed(1)}kg`,
      kgAmout: (lastItem - weightGoal).toFixed(1),
      days: daysLeftFromToday,
    }

  return obj
}

//
// Circumferences
//
const helperChange = (data, val) => {
  let arr = []
  for (let el in data) {
    let bodyPart = val
    arr.push(data[el][bodyPart])
  }

  const max = arr.reduce((a, b) => Math.max(a, b))
  const min = arr.reduce((a, b) => Math.min(a, b))
  const diff = max - min

  return [max, min, diff]
}

export const circumferencesChange = data => {
  const circums = ['waist', 'hips', 'neck', 'chest', 'shoulders', 'thighs', 'biceps']

  let output = circums.map(item => {
    const [max, min, diff] = helperChange(data, item)
    return {
      [item]: {
        max,
        min,
        diff
      }
    }
  })
  console.log(output)
  return output
}

export const biggestCircumChange = (arr, trend) => {
  const circums = ['waist', 'hips', 'neck', 'chest', 'shoulders', 'thighs', 'biceps']

  // array of name and difference
  let output = []
  for (let el in arr) {
    console.log(arr[el][circums[el]])
    output.push({
      name: circums[el],
      value: arr[el][circums[el]].diff
    })
  }

  // sorting frm largest to smallest
  trend === 'desc'
    ? output.sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0))
    : output.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))
  console.log(output)
  return output
}