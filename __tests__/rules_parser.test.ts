import { RulesParser } from '../src/lib/rules_parser'
import fs from 'fs'

describe('parse', () => {
  const file = fs.readFileSync("sample/input.json", "utf8")
  const events = JSON.parse(file)
  const parsedRules = RulesParser.parse(events.Rules)

  test('Rule length will be 5, excluded RuleF', () => {
    expect(parsedRules.length).toEqual(5)
    expect(parsedRules.map(rule => rule.name)).toEqual(["RuleA", "RuleB", "RuleC", "RuleD", "RuleE"])
  })

  test('RuleA will be parsed', () => {
    expect(parsedRules[0].schedule.minutes).toEqual([10])
    expect(parsedRules[0].schedule.hours).toEqual([19])
    // 1..31
    expect(parsedRules[0].schedule.daysOfMonth).toEqual([...Array(31).keys()].map(i => ++i))
    // 1..12
    expect(parsedRules[0].schedule.months).toEqual([...Array(12).keys()].map(i => ++i))
  })
})

describe('extractCronPattern', () => {
  test('Expression will remove cron()', () => {
    const expression = "cron(10 19 * * ? *)"
    const pattern = RulesParser.extractCronPattern(expression)
    expect(pattern).toEqual("10 19 * * ? *")
  })
})
