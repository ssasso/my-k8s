# Zoo Pod Container

Talking animals.

ENV Vars:
* ANIMAL = can be one of the following (default = random from a limited list):
  * See: https://github.com/piuccio/cowsay/tree/master/cows
* SAY = What the animal will say (default = `Hello %IP%, I am %HOSTNAME%!`). Available replacements:
  * %HOSTNAME% = hostname
  * %IP% = visitor IP (or expanded from `X-Frowarded-For`)
  * %HTTPHOST% = HTTP Host header
  * %DATE% = current date
  * %TIME% = current time
  * %DATETIME% = current date and time

