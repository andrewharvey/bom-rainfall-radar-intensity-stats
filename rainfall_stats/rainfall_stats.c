/*
    This program is designed to consume rainfall radar images from the Bureau of
    Meteorology. The images should be 512x512 size PNG files. eg.
    http://www.bom.gov.au/radar/IDR713.T.YYYMMDDHHMM.png
    where you replace YYYMMDDHHMM with the current time (not every minute exists
    and they tend to be a couple of minutes behind realtime).

    This file is licensed CC0 by Andrew Harvey <andrew.harvey4@gmail.com>

    To the extent possible under law, the person who associated CC0
    with this work has waived all copyright and related or neighboring
    rights to this work.
    http://creativecommons.org/publicdomain/zero/1.0/
*/

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

// OpenCV Includes
#include "core/core_c.h"
#include "imgproc/types_c.h"
#include "imgproc/imgproc_c.h"
#include "highgui/highgui_c.h"

// source BOM radar image
IplImage *src_image = 0;

// match the given RGB colour to a colour from the palette
int match_to_palette(uchar b, uchar g, uchar r);

// which pixel (in the 256*256 reduced size image) shall we start looking at
// (because the BOM copyright notice is at the top and blocks out the radar contents)
// please BOM, provide us the raw radar data so we don't need to do this silly RGB to value process!
#define YSTART 8

// which pixel to stop at, because of the black text at the bottom
#define YSTOP 249

// how many values do the reduced BOM radar images have?
#define NUM_COLOURS 16

int main( int argc, char** argv )
{
    if (argc < 2) {
        printf("Usage: %s [radar.png]\n", argv[0]);
        return EXIT_FAILURE;
    }

    // load the BOM radar image given as the 1st program argument as a full colour image
    src_image = cvLoadImage( argv[1], CV_LOAD_IMAGE_COLOR );

    // make sure it was loaded okay
    if( !src_image )
    {
        printf("Image was not loaded.\n");
        return EXIT_FAILURE;
    }

    // configuration is set based on these sizes
    assert (src_image->width == 512);
    assert (src_image->height == 512);

    // All the standard radar images from the BOM (256km 128km 64km) are
    // actually 2x larger than the data, so we can safely reduce the image size
    // and still get pixel level data.
    IplImage *reduced = cvCreateImage(
        cvSize(src_image->width / 2, src_image->height / 2),
        src_image->depth,
        src_image->nChannels);

    // reduce the image to half the size with no value interpolation
    cvResize(src_image, reduced, CV_INTER_NN);

    // now we have a half size image we can release the original
    cvReleaseImage(&src_image);

    // keep a count of each value in the image
    int occurrences[NUM_COLOURS+1] = {0};

    int x;
    int y;

    // for each pixel in the image
    for (y = YSTART; y <= YSTOP; y++) {
        // BGR image data
        uchar *p = (uchar*) (
            reduced->imageData + y * reduced->widthStep
        );
        for (x = 0; x < reduced->width; x++) {
            occurrences[match_to_palette(p[3*x+0], p[3*x+1], p[3*x+2])]++;
        }
    }

    // count total pixels available in radar image
    int totalPixels = (YSTOP - YSTART + 1) * reduced->width;

    int i;

    // print out comma separated values counting value occurrences
    for (i = 1; i < NUM_COLOURS; i++) {
        printf("%d", occurrences[i]);
        if (i != NUM_COLOURS-1)
            printf(",");
    }
    printf("\n");

    assert (totalPixels == ((YSTOP - YSTART + 1) * 256));

    // the last index counts colours not in our known palette
    // there shouldn't be any of these
    assert (occurrences[NUM_COLOURS] == 0);

    //following line was used to visually verify cvResize results
    //cvSaveImage("dst.png", reduced, NULL);

    cvReleaseImage(&reduced);

    return EXIT_SUCCESS;
}

// Given BGR (opposite order to RGB) values return the palette index for that BGR
int match_to_palette(uchar b, uchar g, uchar r) {
    if ((b == 0) && (g == 0) && (r == 0))
        return 0; // transparent
    else if ((b == 255) && (g == 245) && (r == 245))
        return 1; // light rain
    else if (b == 255 && g == 180 && r == 180)
        return 2;
    else if (b == 255 && g == 120 && r == 120)
       return 3;
    else if (b == 255 && g == 20 && r == 20)
       return 4;
    else if (b == 195 && g == 216 && r == 0)
       return 5;
    else if (b == 144 && g == 150 && r == 0)
        return 6;
    else if (b == 102 && g == 102 && r == 0)
        return 7;
    else if (b == 0 && g == 255 && r == 255)
        return 8;
    else if (b == 0 && g == 200 && r == 255)
       return 9;
    else if (b == 0 && g == 150 && r == 255)
        return 10;
    else if (b == 0 && g == 100 && r == 255)
        return 11;
    else if (b == 0 && g == 0 && r == 255)
        return 12;
    else if (b == 0 && g == 0 && r == 200)
        return 13;
    else if (b == 0 && g == 0 && r == 120)
        return 14;
    else if (b == 0 && g == 0 && r == 40)
        return 15; // heavy rain
    else
       return NUM_COLOURS;
}
