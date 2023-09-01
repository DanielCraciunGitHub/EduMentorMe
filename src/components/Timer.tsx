"use client"

import { useEffect, useRef, useState } from "react"
import { useTimer } from "react-timer-hook"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type TimerInput = "hours" | "minutes" | "seconds"

type Time = {
  hours: string
  minutes: string
  seconds: string
}

interface TimerButtonFunctions {
  toggleTimer: () => void
  resetTimer: () => void
  clearTimer: () => void
}

export function Timer() {
  const [hoursInput, setHoursInput] = useState("")
  const [minutesInput, setMinutesInput] = useState("")
  const [secondsInput, setSecondsInput] = useState("")

  const [toggleText, setToggleText] = useState<"Start" | "Pause">("Start")
  const [timerColor, setTimerColor] = useState<"text-red-500" | "">("")

  const alarmRef = useRef<HTMLAudioElement | undefined>()

  const { seconds, minutes, hours, isRunning, resume, pause, restart } =
    useTimer({
      autoStart: false,
      expiryTimestamp: new Date(),
      onExpire: () => {
        alarmRef.current!.play()
        setToggleText("Start")
        setTimerColor("text-red-500")
      },
    })

  // Defines the alarm object instance and reference on component mount
  useEffect(() => {
    const alarm = new Audio("/timer-alarm.mp3")
    alarmRef.current = alarm

    return () => alarmRef.current!.remove()
  }, [])

  // changes the timer state whenever the hours, minutes or seconds input changes
  useEffect(() => {
    restart(
      createTimeStamp({
        hours: hoursInput,
        minutes: minutesInput,
        seconds: secondsInput,
      }),
      false
    )
  }, [hoursInput, minutesInput, secondsInput])

  // Makes sure the timer state is visible in the browser tab
  useEffect(() => {
    const updateDocumentTitle = ({ hours, minutes, seconds }: Time) => {
      if (isRunning) {
        const formattedHours = hours.padStart(2, "0")
        const formattedMinutes = minutes.padStart(2, "0")
        const formattedSeconds = seconds.padStart(2, "0")

        document.title = `${formattedHours}:${formattedMinutes}:${formattedSeconds} | EduMentorMe`
      } else {
        document.title = "Study Timer | EduMentorMe"
      }
    }
    updateDocumentTitle({
      hours: String(hours),
      minutes: String(minutes),
      seconds: String(seconds),
    })
  }, [isRunning, seconds])

  const changeTime = (field: TimerInput, value: string) => {
    const validateInput = (field: TimerInput, value: string) => {
      // The regex is used to limit the input to a max of two integers
      const isValid =
        (field === "hours" && Number(value) < 24) ||
        (field !== "hours" && Number(value) < 60)

      return isValid
    }

    if (!validateInput(field, value)) return

    if (field === "hours") {
      setHoursInput(value)
    } else if (field === "minutes") {
      setMinutesInput(value)
    } else if (field === "seconds") {
      setSecondsInput(value)
    }
  }

  const createTimeStamp = ({ hours, minutes, seconds }: Time): Date => {
    // Extracts raw seconds from stateful inputs then creates a timestamp
    // for those seconds in the future, used to display the correct timer UI.
    const totalSeconds =
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)

    const newTimeStamp = new Date(Date.now() + totalSeconds * 1000)

    return newTimeStamp
  }

  const FormattedCountdown = ({ hours, minutes, seconds }: Time) => (
    <div className={`text-6xl md:text-9xl ${timerColor}`}>
      <span>{hours.padStart(2, "0")}</span>:
      <span>{minutes.padStart(2, "0")}</span>:
      <span>{seconds.padStart(2, "0")}</span>
    </div>
  )

  const timerFunctions: TimerButtonFunctions = {
    toggleTimer: () => {
      if (isRunning) {
        setToggleText("Start")
        pause()
      } else {
        setToggleText("Pause")
        resume()
      }
    },
    resetTimer: () => {
      // resets timer state back to what the user set initially
      restart(
        createTimeStamp({
          hours: hoursInput,
          minutes: minutesInput,
          seconds: secondsInput,
        }),
        false
      )

      // resets the audio state
      alarmRef.current!.pause()
      alarmRef.current!.currentTime = 0

      setToggleText("Start")
      setTimerColor("")
    },
    clearTimer: () => {
      if (!isRunning) {
        setHoursInput("")
        setMinutesInput("")
        setSecondsInput("")
      }
    },
  }

  return (
    <div className="space-y-10 text-center">
      <div className={isRunning || timerColor !== "" ? "hidden" : "visible"}>
        <div className="flex justify-center">
          <div className="flex w-3/4 space-x-4 md:w-1/3">
            <Input
              key="hours"
              type="tel"
              value={hoursInput}
              onChange={(e) => changeTime("hours", e.target.value)}
              placeholder="hh"
              className="text-center text-xl"
            />
            <Input
              key="minutes"
              type="tel"
              value={minutesInput}
              onChange={(e) => changeTime("minutes", e.target.value)}
              placeholder="mm"
              className="text-center text-xl"
            />
            <Input
              key="seconds"
              type="tel"
              value={secondsInput}
              onChange={(e) => changeTime("seconds", e.target.value)}
              placeholder="ss"
              className="text-center text-xl"
            />
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-500">Max: 23:59:59</p>
      </div>
      <FormattedCountdown
        hours={String(hours)}
        minutes={String(minutes)}
        seconds={String(seconds)}
      />
      <div className="space-x-5">
        <Button
          onClick={timerFunctions.toggleTimer}
          className="focus:bg-orange-500 dark:focus:bg-orange-500"
        >
          {toggleText}
        </Button>
        <Button
          onClick={timerFunctions.resetTimer}
          className="focus:bg-orange-500 dark:focus:bg-orange-500"
        >
          Reset
        </Button>
        <Button
          onClick={timerFunctions.clearTimer}
          className="focus:bg-orange-500 dark:focus:bg-orange-500"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
