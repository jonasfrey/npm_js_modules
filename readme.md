# how to create and publish a new module
## mkdir and cd 
```
mkdir my_npm_module

cd my_npm_module
```

## package init 
```
npm init
```


## ignore stuff 
now every file or folder containing ....npmignore.... is ignored
```
echo "*.npmignore.*" >> .npmignore
echo "*.npmignore" >> .npmignore
```

## check whats ignored 
```
npm pack
```
