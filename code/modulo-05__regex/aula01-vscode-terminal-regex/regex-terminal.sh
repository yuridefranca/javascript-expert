# a partir da pasta raiz
find . -wholename "**/*.test.js"
find . -wholename "**/*.test.js" -not -path "*node_modules**"
find . -wholename "**/*.js" -not -path "*node_modules**"

npm i -g ipt 
find . -wholename "**/*.js" -not -path "*node_modules**" | ipt