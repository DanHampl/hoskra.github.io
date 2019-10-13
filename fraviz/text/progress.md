# Audio visualizer docs

## Sage2 documentation http://sage2.sagecommons.org/instructions/
## Sage2 API https://bitbucket.org/sage2/sage2/wiki/SAGE2%20Application%20API

## To start developing

### start sage2

```cd sage2```
```node server.js -f config/default-cfg.json```

### state
*to ~/.bashrc*

``` alias state='echo "CPU `LC_ALL=C top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '"'"'{print 100 - $1}'"'"'`% RAM `free -m | awk '"'"'/Mem:/ { printf("%3.1f%%", $3/$2*100) }'"'"'` HDD `df -h / | awk '"'"'/\// {print $(NF-1)}'"'"'`"' ```

```state ```

### existing sage apps

```cd ~/sage2/public/uploads/apps/```


## What I have done

Sonic Visualiser - Ubuntu software

- Pane:
- Add spectorgram
- Add peak frequency spectogram
- Add melodic range spectogram

// pattern recognition in fourrier data?

Researched 'Car in Three.js' because i want Three.js to be used in my project

research of three.js for graphics

JS fractals? 
- https://www.youtube.com/watch?v=37t8o4MSME8
- https://www.youtube.com/watch?v=bIfNwgUVjV8&t=1s
- https://www.youtube.com/watch?v=E1B4UoSQMFw
- https://www.youtube.com/watch?v=kKT0v3qhIQY
- https://www.youtube.com/watch?v=E1B4UoSQMFw
