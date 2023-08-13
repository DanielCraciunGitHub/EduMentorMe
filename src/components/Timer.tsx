"use client"

import { useEffect, useRef, useState } from "react"
import { useTimer } from "react-timer-hook"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Timer() {
  const [hoursInput, setHours] = useState("")
  const [minutesInput, setMinutes] = useState("")
  const [secondsInput, setSeconds] = useState("")

  const [toggleText, setToggleText] = useState<"Start" | "Pause">("Start")
  const [CountdownColor, setCountDownColor] = useState<"text-red-500" | "">("")

  const alarmRef = useRef<HTMLAudioElement | undefined>()

  const { seconds, minutes, hours, isRunning, resume, pause, restart } =
    useTimer({
      autoStart: false,
      expiryTimestamp: new Date(),
      onExpire: () => {
        alarmRef.current?.play()
        setToggleText("Start")
        setCountDownColor("text-red-500")
      },
    })

  // Defines the alarm object instance and reference on component mount
  useEffect(() => {
    const alarm = new Audio("/timer-alarm.mp3")
    alarmRef.current = alarm

    return () => alarmRef.current?.remove()
  }, [])

  // changes the timer state whenever the hours, minutes or seconds input changes
  useEffect(() => {
    restart(getTimeStamp(), false)
  }, [hoursInput, minutesInput, secondsInput])

  // Makes sure the timer state is visible in the browser tab
  useEffect(() => {
    if (isRunning) {
      const formattedHours = String(hours).padStart(2, "0")
      const formattedMinutes = String(minutes).padStart(2, "0")
      const formattedSeconds = String(seconds).padStart(2, "0")

      document.title = `${formattedHours}:${formattedMinutes}:${formattedSeconds} | EduMentorMe`
    } else {
      document.title = "Study Timer | EduMentorMe"
    }
  }, [isRunning, seconds])

  const changeTime = (field: string, value: string): void => {
    if (!validateInput(field, value)) return

    if (field === "hours") {
      setHours(value)
    } else if (field === "minutes") {
      setMinutes(value)
    } else if (field === "seconds") {
      setSeconds(value)
    }
  }

  const validateInput = (field: string, value: string): boolean => {
    // The regex is used to limit the input to a max of two integers
    const isValid =
      ((field === "hours" && Number(value) < 24) ||
        (field !== "hours" && Number(value) < 60)) &&
      /^\d{0,2}$/.test(value)

    return isValid
  }

  const getTimeStamp = (): Date => {
    // Extracts raw seconds from stateful inputs then creates a timestamp
    // for those seconds in the future, used to display the correct timer UI.
    const totalSeconds =
      Number(hoursInput) * 3600 +
      Number(minutesInput) * 60 +
      Number(secondsInput)

    const newTimeStamp = new Date(Date.now() + totalSeconds * 1000)

    return newTimeStamp
  }

  const CountdownText = (): React.JSX.Element => (
    <div className={`text-6xl md:text-9xl ${CountdownColor}`}>
      <span>{String(hours).padStart(2, "0")}</span>:
      <span>{String(minutes).padStart(2, "0")}</span>:
      <span>{String(seconds).padStart(2, "0")}</span>
    </div>
  )

  const toggleTimer = (): void => {
    if (isRunning) {
      setToggleText("Start")
      pause()
    } else {
      setToggleText("Pause")
      resume()
    }
  }

  const resetTimer = (): void => {
    // resets timer state back to what the user sets
    restart(getTimeStamp(), false)

    // resets the audio state
    alarmRef.current?.pause()
    alarmRef.current!.currentTime = 0

    setToggleText("Start")
    setCountDownColor("")
  }

  const clearTimer = (): void => {
    if (!isRunning) {
      setHours("")
      setMinutes("")
      setSeconds("")
    }
  }

  return (
    <div className="space-y-10 text-center">
      <div
        className={isRunning || CountdownColor !== "" ? "hidden" : "visible"}
      >
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
      <CountdownText />
      <div className="space-x-5">
        <Button
          onClick={toggleTimer}
          className="focus:bg-orange-500 dark:focus:bg-orange-500"
        >
          {toggleText}
        </Button>
        <Button
          onClick={resetTimer}
          className="focus:bg-orange-500 dark:focus:bg-orange-500"
        >
          Reset
        </Button>
        <Button
          onClick={clearTimer}
          className="focus:bg-orange-500 dark:focus:bg-orange-500"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
