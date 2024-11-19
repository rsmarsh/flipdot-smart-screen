Flipdot controller web backend, for a Hanover display.

# Ramblings

The data to send to the display is first split up into columns for each 'pixel' column the display has, and then each column is split into two bytes for the top half / bottom half.

Things were appearing upside-down at first, so I've made a forked version of node-flipdot and imported that into this repo, so it now addresses the display in the order of column 1 top, column 1 bottom, column 2 top, column 2 bottom, and so on.
Each half of a column is first represented by a decimal number, so a maximum of 256.
This number is then converted into binary before it is sent to the display.

So at the decimal stage, if the data to be sent started off with with [240, 206, ...]

For column 1, the top half, since 240 = 11110000 in binary, it would display the following:

(where 'O' = on, and '.' = off)\
O\
O\
O\
O\
.\
.\
.\
.

and then the bottom half of the column

206 which = 11001110:\
O\
O\
.\
.\
O\
O\
O\
.

Note that it is backwards, the first byte is applied from the bottom of the column half and heading upwards

apparently for the final step it converts the binary into ASCII before being sent to the display,
but this doesn't need to be worried about at this stage, probably something to do with their specific limitations at the time
