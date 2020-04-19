/* eslint-disable */
function RadnessUpdater() {}

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { func, object } from 'prop-types'

import { getHowRadItIs, makeItRad } from '@/dux/radness'

// Complex render variable computers can be defined as pure fns outside the component
function computeRadness(radLevel, radLevels) {
  return radLevels[radLevel]
}

export default function HeckaRad({ engageRad, radLevels }) {
  const dispatch = useDispatch()
  const howRadItIs = useSelector(getHowRadItIs)
  const [rad, setRad] = useState('pretty') // prefix useState setters with 'set'

  // --- Effects ------------------------------------------

  useEffect(() => {
    console.alert('Radness now at: ', computeRadness(rad, radLevels))
    dispatch(makeItRad)
  }, [rad, radLevels])

  // --- Handlers -----------------------------------------

  const handleRadnessUpdate = useCallback(
    (newRadness) => {
      setRad(newRadness)
      engageRad(newRadness)
    },
    [engageRad],
  )

  // --- Return -------------------------------------------

  const radDisplayLevel = computeRadness(rad, radLevels)
  return (
    <div>
      Radness {radDisplayLevel} achieved
      <RadnessUpdater rad={rad} updateRad={handleRadnessUpdate} />
    </div>
  )
}

HeckaRad.propTypes = {
  engageRad: func.isRequired,
  radLevels: object.isRequired,
}

/**
 * Order
 * 1. Props
 * 2. Redux State (useSelector)
 * 2. Component State (useState)
 * 3. Lifecycle (useEffect)
 * 4. Handler fns
 * 5. Render (return)
 *
 * Caveats:
 * - Try to define handlers that are specific to an effect inside that effect,
 *   this is a little bit of a paradigm shift because we used to define methods
 *   that would be called in 1-many lifecycle events!
 * - Try without allowing fn hoisting and see how many handlers need to be
 *   defined outside effects...
 */
