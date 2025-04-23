#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool valid_key(string key);
void encrypt(string plaintext, string key);

int main(int argc, string argv[])
{
    if (argc != 2)
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }

    string key = argv[1];

    if (!valid_key(key))
    {
        printf("Key must contain 26 unique alphabetic characters.\n");
        return 1;
    }

    string plaintext = get_string("plaintext: ");
    printf("ciphertext: ");
    encrypt(plaintext, key);
    printf("\n");

    return 0;
}

bool valid_key(string key)
{
    if (strlen(key) != 26)
        return false;

    bool seen[26] = {false};

    for (int i = 0; i < 26; i++)
    {
        if (!isalpha(key[i]))
            return false;

        int index = toupper(key[i]) - 'A';

        if (seen[index])
            return false;

        seen[index] = true;
    }

    return true;
}

void encrypt(string plaintext, string key)
{
    for (int i = 0, len = strlen(plaintext); i < len; i++)
    {
        char c = plaintext[i];

        if (isupper(c))
        {
            int index = c - 'A';
            printf("%c", toupper(key[index]));
        }
        else if (islower(c))
        {
            int index = c - 'a';
            printf("%c", tolower(key[index]));
        }
        else
        {
            printf("%c", c);
        }
    }
}
