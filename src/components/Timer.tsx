"use client"

import { useEffect, useRef, useState } from "react"
import { useTimer } from "react-timer-hook"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Time {
  hours: number
  minutes: number
  seconds: number
}

export function Timer() {
  const [inputValue, setInputValue] = useState("")
  const [toggleText, setToggleText] = useState<"Start" | "Pause">("Start")
  const [CountdownColor, setCountDownColor] = useState<"text-red-500" | "">("")

  const alarmRef = useRef<HTMLAudioElement | undefined>()
  useEffect(() => {
    const alarm = new Audio("/timer-alarm.mp3")
    alarmRef.current = alarm

    return () => alarmRef.current?.remove()
  }, [])

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

  const changeTime = (value: string): void => {
    const validInput = validateInput(value)

    if (!validInput) return

    setInputValue(value)

    const newTimeStamp = createNewTimeStamp(validInput)

    restart(newTimeStamp, false)
  }

  const validateInput = (value: string): Time | undefined => {
    const hours = Number(value.substring(0, 2))
    const minutes = Number(value.substring(2, 4))
    const seconds = Number(value.substring(4, 6))

    const validInput =
      /^\d{0,6}$/.test(value) && hours < 24 && minutes < 60 && seconds < 60

    if (validInput) return { hours, minutes, seconds }
  }

  const createNewTimeStamp = ({ hours, minutes, seconds }: Time): Date => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds
    const newTimeStamp = new Date(Date.now() + totalSeconds * 1000)

    return newTimeStamp
  }

  const CountdownText = (): React.JSX.Element => (
    <div className={`text-6xl md:text-9xl ${CountdownColor}`}>
      <span>{formatCountdownUI(hours)}</span>:
      <span>{formatCountdownUI(minutes)}</span>:
      <span>{formatCountdownUI(seconds)}</span>
    </div>
  )

  const formatCountdownUI = (value: number): string => {
    return value.toString().padStart(2, "0")
  }

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
    const time = new Date()

    restart(time, false)

    alarmRef.current?.pause()
    alarmRef.current!.currentTime = 0

    setToggleText("Start")
    setInputValue("")
    setCountDownColor("")
  }

  return (
    <div className="space-y-10 text-center">
      <div
        className={isRunning || CountdownColor !== "" ? "hidden" : "visible"}
      >
        <Input
          value={inputValue}
          onChange={(e) => changeTime(e.target.value)}
          placeholder="hhmmss"
          className="text-center text-2xl"
        />
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
      </div>
    </div>
  )
}
