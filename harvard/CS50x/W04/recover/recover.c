#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[])
{
    // Accept a single command-line argument
    if (argc != 2)
    {
        fprintf(stderr, "Usage: ./recover FILE\n");
        return 1;
    }

    // Open the memory card
    FILE *card = fopen(argv[1], "r");
    if (card == NULL)
    {
        fprintf(stderr, "Could not open %s.\n", argv[1]);
        return 1;
    }

    // Create a buffer for a block of data
    uint8_t buffer[512];

    // Counter for the number of JPEGs found
    int jpeg_count = 0;

    // Pointer to the currently open output file
    FILE *outfile = NULL;

    // While there's still data left to read from the memory card
    while (fread(buffer, 1, 512, card) == 512)
    {
        // Check for JPEG signature
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff &&
            (buffer[3] & 0xf0) == 0xe0)
        {
            // If we've already found a JPEG, close the previous file
            if (outfile != NULL)
            {
                fclose(outfile);
            }

            // Create a new filename
            char filename[8]; // ###.jpg\0
            sprintf(filename, "%03d.jpg", jpeg_count);

            // Open a new file for writing
            outfile = fopen(filename, "w");
            if (outfile == NULL)
            {
                fclose(card);
                fprintf(stderr, "Could not open %s for writing.\n", filename);
                return 1;
            }

            // Increment the JPEG count
            jpeg_count++;

            // Write the current block to the output file
            fwrite(buffer, 1, 512, outfile);
        }
        // If we are currently writing a JPEG, continue writing
        else if (outfile != NULL)
        {
            fwrite(buffer, 1, 512, outfile);
        }
    }

    // Close the last opened output file if any
    if (outfile != NULL)
    {
        fclose(outfile);
    }

    // Close the input card file
    fclose(card);

    return 0;
}
