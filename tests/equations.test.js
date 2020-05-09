import { calcBMI, rangeBMI, rangeBMIColor, idealBMI, userBmiTip } from '../utils/equations'
import { maxHeartRate, trainingHeartRate } from '../utils/equations'
import { restingMifflinStJeor } from '../utils/equations'

describe('util equations', () => {
  describe('BMI equations', () => {
    const user = {
      height: 190,
      weight: 100
    }
    it('calcBMI should return user BMI', () => {
      expect(calcBMI(user)).toBeGreaterThan(25)
    })

    it('rangeBMI should return string', () => {
      expect(typeof rangeBMI(calcBMI(user))).toBe('string')
    })

    it('rangeBMIColor should return red if input is greater than 30', () => {
      const number = 31

      expect(rangeBMIColor(number)).toBe('red')
    })

    it('idealBMI should return array', () => {
      expect(idealBMI(user).length).toBe(2)
    })

    it('userBmiTip return string', () => {
      expect(typeof userBmiTip(user)).toBe('string')
    })
  })

  describe('Heart rate equations', () => {
    const user = {
      height: 190,
      weight: 100,
      sex: "Male",
      age: 30
    }

    it('maxHeartRate should return positive number', () => {
      expect(maxHeartRate(user)).toBeGreaterThan(0)
    })

    it('trainingHeartRate should return array of numbers', () => {
      const result = trainingHeartRate(100)

      expect(typeof result[0] && typeof result[1]).toBe('number')
    })
  })

  describe('Metabolic age equations', () => {
    const user = {
      height: 190,
      weight: 100,
      sex: "Male",
      age: 30
    }

    it('restingMifflinStJeor should return number', () => {
      expect(typeof restingMifflinStJeor(user)).toBe('number')
    })
  })
})