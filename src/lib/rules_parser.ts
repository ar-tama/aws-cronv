import awsCronParser from "aws-cron-parser"

type ParsedRule = (string | number)[]

interface AWSEvent {
  Rules: Array<{
    Name: string
    Arn: string
    State: string
    ScheduleExpression: string
    EventBusName: string
  }>
}

export interface Rule {
  name: string
  schedule: {
    minutes: ParsedRule
    hours: ParsedRule
    daysOfMonth: ParsedRule
    months: ParsedRule
    daysOfWeek: ParsedRule
    years: ParsedRule
  }
}

export class RulesParser {
  static parse(rules: AWSEvent["Rules"]) {
    const parsedRules: Rule[] = []
    for (const rule of rules) {
      if (rule.State == "DISABLED") {
        continue
      }
      const schedule = awsCronParser.parse(this.extractCronPattern(rule.ScheduleExpression))
      parsedRules.push({
        name: rule.Name,
        schedule: schedule,
      })
    }
    return parsedRules
  }

  static extractCronPattern(scheduleExpression: string) {
    return scheduleExpression.replace("cron(", "").replace(")", "")
  }
}
