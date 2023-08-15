class Logger {
  static debug(...data: any[]) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[DEBUG]", ...data)
    }
  }

  static warn(message: string) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[WARNING]", message)
    }
  }

  static error(message: string) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[ERROR]", message)
    }
  }

  static tabulate(obj: object) {
    if (process.env.NODE_ENV !== "production") {
      console.table(obj)
    }
  }

  static time<T>(callback: (...args: any[]) => T, ...args: any[]) {
    if (process.env.NODE_ENV !== "production") {
      console.time("Time Taken")
      callback(...args)
      console.timeEnd("Time Taken")
    }
  }

  static clear = () => {
    console.clear()
  }
}

export { Logger }
