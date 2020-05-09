import { calcBMI, rangeBMI, rangeBMIColor, idealBMI, userBmiTip } from '../utils/equations'

it('should return 5', () => {
  const add = (a, b) => a + b

  expect(add(2, 3)).toEqual(5)
})

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
})