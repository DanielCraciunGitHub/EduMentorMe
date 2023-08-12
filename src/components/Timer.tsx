"use client"

import React, { useRef, useState } from "react"
import { useTimer } from "react-timer-hook"

import { Button } from "@/components/ui/button"

import { Input } from "./ui/input"

interface TimerProps {
  expiryTimestamp: Date
}

export function Timer({ expiryTimestamp }: TimerProps) {
  const [inputValue, setInputValue] = useState<string>("")
  const [timerText, setTimerText] = useState<"Start" | "Pause">("Start")
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    restart,
    totalSeconds,
  } = useTimer({
    autoStart: false,
    expiryTimestamp,
    onExpire: () => setTimerText("Start"),
  })

  const handleTimerButtonClick = () => {
    if (isRunning) {
      setTimerText("Start")
      pause()
    } else {
      if (totalSeconds > 0) {
        setTimerText("Pause")
        start()
      }
    }
  }

  const handleResetButtonClick = () => {
    const time = new Date()

    restart(time, false)
    setTimerText("Start")
    setInputValue("")
  }

  const formatTimeUI = (value: number) => {
    return value.toString().padStart(2, "0")
  }

  const changeTime = (value: string) => {
    const seconds = Number(value.substring(0, 2))
    const minutes = Number(value.substring(2, 4))
    const hours = Number(value.substring(4, 6))

    if (seconds > 59 || minutes > 59 || hours > 12) {
      return
    }
    const totalSeconds = hours * 3600 + minutes * 60 + seconds

    const newTime = new Date()
    newTime.setSeconds(newTime.getSeconds() + totalSeconds)

    setInputValue(value)
    restart(newTime, false)
  }
  return (
    <div className="text-center">
      <div
        className="text-[7rem] md:text-[11rem]"
        onClick={() => inputRef.current?.focus()}
      >
        <span>{formatTimeUI(hours)}</span>:<span>{formatTimeUI(minutes)}</span>:
        <span>{formatTimeUI(seconds)}</span>
      </div>
      <div className="mt-5 space-x-5">
        <Button onClick={handleTimerButtonClick}>{timerText}</Button>
        <Button onClick={handleResetButtonClick}>Reset</Button>
      </div>
      <Input
        type="text"
        ref={inputRef}
        maxLength={6}
        value={inputValue}
        onChange={(e) => changeTime(e.target.value)}
        className="opacity-0"
        onFocus={() => inputRef.current?.select()}
      />
    </div>
  )
}
