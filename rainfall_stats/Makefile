
CC=gcc
#CFLAGS=-Wall -O2 `pkg-config --cflags opencv`
#LDFLAGS=`pkg-config --libs opencv`

# pkg-config for opencv is broken. Debian bug #671376 so don't use it yet
CFLAGS=-Wall -O2 -I/usr/include/opencv2
LDFLAGS=-lopencv_core -lopencv_imgproc -lopencv_highgui

rainfall_stats : rainfall_stats.c
	$(CC) $(CFLAGS) $(LDFLAGS) -o $@ $<

clean :
	rm -f rainfall_stats
