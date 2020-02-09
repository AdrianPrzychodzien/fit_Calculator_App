import React, { useState } from 'react'
import { connect } from 'react-redux'

import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { setData, setDailyWeight } from '../redux/actions'


const validationSchema = yup.object({
  height: yup.number('It must be a number').required('Height is required').positive(),
  weight: yup.number('It must be a number').required('Weight is required').positive(),
  age: yup.number('It must be a number').required('Age is required').positive(),
  fat: yup.number('It must be a number').positive().max(70, 'Are you sure?')
})

const PersonalData = ({ userData, setData, setDailyWeight, navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Formik initialValues={{
        height: userData.height || '',
        weight: userData.weight || '',
        age: userData.age || '',
        fat: userData.fat || userData.fat || '',
        sex: userData.sex || 'Male',
        lifeActivity: userData.lifeActivity || 1,
      }}
        validationSchema={validationSchema}
        onSubmit={data => {
          setData({
            ...data,
          })

          setDailyWeight({
            date: new Date().toISOString().slice(0, 10),
            weight: data.weight
          })

          history.push('/')
        }}
      >
        {({ isSubmitting }) => (
          <>
            <p className="h3 text-center">Add your personal data</p>
            <hr />

            <Form className="w-100 d-flex flex-column justify-content-center">
              <div className="mx-auto my-3 w-50 d-flex">
                <FontAwesomeIcon className="mr-4 ml-2 text-primary" icon={faArrowsAltV} size="2x" />
                <MyTextField type="number" name="height" placeholder="Height (cm)" as={TextField} />
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <FontAwesomeIcon className="mr-3 text-primary" icon={faWeight} size="2x" />
                <MyTextField type="number" name="weight" placeholder="Weight (kg)" as={TextField} />
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <FontAwesomeIcon className="mr-3 ml-1 text-primary" icon={faBirthdayCake} size="2x" />
                <MyTextField type="number" name="age" placeholder="Age" as={TextField} />
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <FontAwesomeIcon className="mr-3 ml-1 text-primary" icon={faPercentage} size="2x" />
                <MyTextField type="number" name="fat" placeholder="Body fat %" as={TextField} />
                <BodyFatInfo />
              </div>

              <div className="mx-auto my-2 w-80 d-flex">
                <div>
                  <FontAwesomeIcon className="mr-2 text-primary" icon={faMale} size="2x" />
                  <MyRadio type="radio" name="sex" value="Male" label="Male" />
                </div>
                <div>
                  <FontAwesomeIcon className="mr-2 text-primary" icon={faFemale} size="2x" />
                  <MyRadio type="radio" name="sex" value="Female" label="Female" />
                </div>
              </div>

              <div className="mx-auto my-1 w-100 d-flex justify-content-center">
                <StarsInput fieldName={'lifeActivity'} />
              </div>

              <Button disabled={isSubmitting} type='submit'
                block className="d-flex justify-content-center my-3" color="primary"
              >
                Add data
                </Button>
            </Form>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({

})

const mapStateToProps = ({ data }) => ({
  userData: data
})

const mapDispatchToProps = dispatch => ({
  setData: data => dispatch(setData(data)),
  setDailyWeight: data => dispatch(setDailyWeight(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData)