### Explaining RegEx
```
/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim
```
- ?<= extract data after this group
- \[contratante|contratado\] one or another (with the flag at the end of the expression to be case insensitive)
- :\s{1} search for a literal colon char followed by a space
- everything above is between parentheses to form a group and to get everything after this match

- (?!\s) negative look around, to ignore the "contratantes" at the end of the file
- .*\n get everything until the first \n
- .*? non greety, the "?" makes stop at first match to avoid get stuck in a loop

- $ indicates that the search stops at end of the line

- g global
- i insentitive
- m multiline   