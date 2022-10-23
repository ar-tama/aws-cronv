import awsCronParser from "aws-cron-parser"
import { Rule } from "../src/lib/rules_parser"
import { ScheduleBuilder } from "../src/lib/schedule_builder"


describe("build", () => {
  const testData: Array<Rule> = [{
    name: "ruleA",
    schedule: awsCronParser.parse("10 1 * * ? *"),
  }, {
    name: "ruleB",
    schedule: awsCronParser.parse("00/30 * * * ? *")
  }]

  test("Build successfully", () => {
    const schedule = ScheduleBuilder.build(testData)
    // Every 30 minutes
    const bTimestamps = [...Array(47).keys()].map(i => 1640997000000 + (i * 1800000))
    expect(schedule).toEqual({
      ruleA: [1640999400000],
      ruleB: bTimestamps,
    })
  })
})

describe("withinTargetDay", () => {
  test("With same timestamp will be true", () => {
    const now = new Date()
    expect(ScheduleBuilder.withinTargetDay(now.getTime(), now.getTime())).toBeTruthy()
  })

  test("With 23:59 will be true", () => {
    const from = new Date("2022-06-01 00:00:00")
    const to = new Date("2022-06-01 23:59:59")
    expect(ScheduleBuilder.withinTargetDay(from.getTime(), to.getTime())).toBeTruthy()
  })

  test("With 1 day after will be false", () => {
    const from = new Date("2022-06-01 00:00:00")
    const to = new Date("2022-06-02 00:00:00")
    expect(ScheduleBuilder.withinTargetDay(from.getTime(), to.getTime())).toBeFalsy()
  })
})

