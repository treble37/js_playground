console.log 'Hello World!'
coffee_and_coffeescript = -> "new javascript skills"
# console.log coffee_and_coffeescript()
cube = (num) -> Math.pow num,3
hi=(msg)->"hello #{msg}"
console.log hi "greeting"
#START:func
odd = (num) ->
  if typeof num is 'number'
    if num is Math.round num
      if num > 0
        num % 2 is 1
      else
        throw "#{num} is not positive"
    else
      throw "#{num} is not an integer"
  else
    throw "#{num} is not a number"
#END:func
console.log odd(2)

#START:func
setName = (name) -> @name = name
#END:func
#START:newContext
Dog = setName   # By convention, constructors are capitalized
dog1 = new Dog('Jimmy')
dog2 = new Dog('Jake')
console.log dog1.name   # 'Jimmy'
console.log dog2.name   # 'Jake'
#END:newContext

ringFireAlarm = (isDrill) -> isDrill = true unless isDrill?

refine = (wheat, chaff..., stop) ->
  console.log "The best: #{wheat}"
  console.log "The rest: #{chaff.join(', ')}"
  console.log "The stop: #{stop}"

refine("wheat","corn","barley","stop")
#coffeescript infers variable scope from assignments
#using @/this for context; context rules p. 23
#binding a function to current context with => p. 25
#existential operator shortcut ?=
#splat operator & expand arrays p29

#2.9 exercises p. 34
#ex1
clearArray = (arr) ->
  arr.splice 0, arr.length
  arr
#ex2
run = (func_obj,arg...) -> func_obj.call this, arg...

#ex7
xInContext = ->
  console.log @x
  xInContext.call what = {x: 'quantum entanglement'}

x = true
showAnswer = (x = x) ->
  console.log if x then 'It works!' else 'Nope.'
showAnswer()

#4.7 p. 72
root = global ? window
root.aphorism = 'Fool me 8 or more times, shame on me'
do restoreOldAphorism = ->
  aphorism = 'Fool me once, shame on you'
  console.log aphorism

console.log aphorism

Genie = ->
  Genie::wishesLeft = 3
Genie::grantWish = ->
  if @wishesLeft > 0
    console.log 'Your wish is granted!'
    @wishesLeft--

console.log Genie
##experiments

#START:stdin
stdin = process.openStdin()
stdin.setEncoding 'utf8'
#END:stdin

#START:onData
inputCallback = null
stdin.on 'data', (input) -> 
  m=input.trim()
  console.log "Input is: "+m
  process.exit()




