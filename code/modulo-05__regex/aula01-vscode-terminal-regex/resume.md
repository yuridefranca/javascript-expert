### Matches with a "masked" CPF
```
^\d{3}.\d{3}.\d{3}-\d{2}$
```

<br>

### Matches "." or "-" | "[]" use this brackets means "OR" expression
```
[.-]
```

<br>

### Matches words on a csv
```
^(\w+),\s(\w+)$
```

<br>

### Matches with links on a Markdown file
```
\[(.*?)\]\(([http|https].*?)\)
```

<br>

### Matches with terminal files that contains "*.test.js" and are not inside node_modules folder
```bash
$ find . -wholename "**/*.test.js" -not -path "*node_modules**"
```

<br>

### Uses ipt to create an interative interface to select files
```bash
$ npm i -g ipt 
$ find . -wholename "**/*.js" -not -path "*node_modules**" | ipt
```

<br>

### Insert "use strict;" at the begining of js selected files
```bash
$ CONTENT="'use strict;'"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e 'ls/^/\'$CONTENT'\
/g' {file}
```

