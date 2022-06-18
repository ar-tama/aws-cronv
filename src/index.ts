import fs from "fs"
import { RulesParser } from "./lib/rules_parser"
import { ScheduleBuilder } from "./lib/schedule_builder"
import { Template } from "./lib/template"


function main(targetDate: string|undefined) {
  const json = fs.readFileSync("/dev/stdin", 'utf8')
  const events = JSON.parse(json)

  const rules = RulesParser.parse(events.Rules)
  const schedules = ScheduleBuilder.build(rules, targetDate)
  const template = Template.build(schedules)
  console.log(template)
}

main(process.argv[2])
