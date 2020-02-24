var difference = require('lodash.difference')
var latest = Object.keys(require('eslint/conf/eslint-all').rules)
var base = Object.keys(require('..').rules)
var latestReactRules = Object.keys(require('eslint-plugin-react').rules)
  .map(function(ruleName) {return 'react/' + ruleName})
var existingReactRules = Object.keys(require('../react').rules)

var replacements = require('eslint/conf/replacements.json').rules


var addedRules = difference(latest, base)
var removedRules = difference(base, latest)

var replacedRules = removedRules
  .filter(function (removed) {
    return removed in replacements
  })

removedRules = difference(removedRules, replacedRules)

var replacedRuleMapping = replacedRules.map(function (removed) {
  return {from: removed, to: replacements[removed]}
})

function printRules(rules) {
  if (!rules.length) {
    return '  None'
  }
  return '  ' + rules.join('\n  ')
}

console.log('New rules: \n%s', printRules(addedRules))
console.log('Removed rules: \n%s', printRules(removedRules))
console.log('Replaced rules: \n%s', printRules(
  replacedRuleMapping.map(function (repl) {
    return repl.from + ' => ' + repl.to
  })
))

console.log()

var addedReactRules = difference(latestReactRules, existingReactRules)
var removeReactRules = difference(existingReactRules, latestReactRules)
console.log('--- eslint-plugin-react ---')
console.log('New rules: \n%s', printRules(addedReactRules))
console.log('Removed rules: \n%s', printRules(removeReactRules))
