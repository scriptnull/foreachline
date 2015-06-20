Online version - http://scriptnull.github.io/foreachline

### Install 
```bash 
npm install -g foreachline
```

### Usage 
If you are a javascript fan who loves to do all your tasks with javascript , then foreachline is for you. 

To use foreachline , you have to install it from npm and use the following command line.

```bash 
foreachline src.txt logic.js 
```
or 

```bash 
fel src.txt logic.js res.txt
```
Use ``foreachline`` or just ``fel`` .

#### Arguments 
- ``src.txt`` - Source file for data.
- ``logic.js`` - contains logic for mapping the data.
- ``res.txt`` [Optional] - Results will be written to ``res.txt`` if specified , else will be written back to ``src.txt``.

### What can you do ? 
 Transform data . Be it a silly to-do list or 50 lines of code , map them  the way you want. 
 
 Lets say you have the following source file ``src.txt``
 ```
Apple
Orange
Banana
 ```
 All you need to do is writing a JS file to map data on each line to new data. 
 
 while creating a JS file , you just need to know one thing . foreachline provides you 2 variables to operate on your data.They are ``line`` and ``lineNumber``
 
 Lets say you want to add lines numbers on each line of ``src.txt``
 Then ``logic.js`` would look like 
 ```javascript 
 line = lineNumber + "." + line ;
 ```
 and you will have 
 ```
1.Apple
2.Orange
3.Banana
```

 If you want to convert them to html list elements
```javascript
line = "<li>" + line + "</li>" ; 
```
and you will have 
```
<li>Apple</li>
<li>Orange</li>
<li>Banana</li>
```

If you want to create JavaScript objects 
```javasctipt 
line = { id : lineNumber , name : line };
```
and you will have 
```
{"id":1,"name":"Apple"}
{"id":2,"name":"Orange"}
{"id":3,"name":"Banana"}
```

and I can continue giving examples all night.


### Plans 
Yeah ! We made it to the [web browser](http://scriptnull.github.io/foreachline)  , as per the plan. Right now , there is no  major plans for foreachline. 

### Contributing 
Please visit the [project page](http://scriptnull.github.io/foreachline/#/contribute) to have idea about contibuting towards foreachline.

Whatever you have in your mind , lets discuss. [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/scriptnull/foreachline?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

### License 
This tool is licensed under the [MIT License](https://github.com/scriptnull/foreachline/blob/master/LICENSE). 
