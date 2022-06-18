import awsCronParser from "aws-cron-parser"
import { Rule } from "./rules_parser"

export interface Schedule {
  [key: string]: number[]
}

export class ScheduleBuilder {
  static build(rules: Array<Rule>, dateString: string = "2022-01-01T00:00:00+00:00"): Schedule {
    const currentDate = new Date(dateString)
    const baseTimestamp = currentDate.getTime()
    const schedule: { [key: string]: Set<number> } = {}
    while (true) {
      for (const rule of rules) {
        const next: Date | null = awsCronParser.next(rule.schedule, currentDate)
        if (!next) {
          continue
        }
        const timestamp = next.getTime()
        if (!schedule[rule.name]) {
          schedule[rule.name] = new Set()
        }
        if (this.withinTargetDay(baseTimestamp, timestamp)) {
          schedule[rule.name].add(timestamp)
        }
      }
      currentDate.setMinutes(currentDate.getMinutes() + 1)
      if (!this.withinTargetDay(baseTimestamp, currentDate.getTime())) {
        break
      }
    }
    const built: Schedule = {}
    for (const name in schedule) {
      built[name] = Array.from(schedule[name])
    }
    return built
  }

  static withinTargetDay(base: number, target: number) {
    return (((target - base) / 1000) < 86400)
  }
}
