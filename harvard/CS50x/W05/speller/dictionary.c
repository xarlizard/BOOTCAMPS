// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

// Choose a large number of buckets for the hash table
const unsigned int N = 65536; // 2^16

// Hash table
node *table[N];

// Counter for the number of words in the dictionary
unsigned int word_count = 0;

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // Hash the word to get the bucket index
    unsigned int index = hash(word);

    // Traverse the linked list at that index
    node *cursor = table[index];
    while (cursor != NULL)
    {
        // Compare the word (case-insensitively)
        if (strcasecmp(word, cursor->word) == 0)
        {
            return true;
        }
        cursor = cursor->next;
    }

    return false;
}

// Hashes word to a number (djb2 algorithm)
unsigned int hash(const char *word)
{
    unsigned long hash = 5381;
    int c;

    while ((c = tolower(*word++)))
    {
        hash = ((hash << 5) + hash) + c; /* hash * 33 + c */
    }
    return hash % N;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // Open dictionary file
    FILE *file = fopen(dictionary, "r");
    if (file == NULL)
    {
        return false;
    }

    char word[LENGTH + 1];
    // Read each word from the file
    while (fscanf(file, "%s", word) != EOF)
    {
        // Create a new node
        node *new_node = malloc(sizeof(node));
        if (new_node == NULL)
        {
            fclose(file);
            unload();
            return false;
        }
        strcpy(new_node->word, word);
        new_node->next = NULL;

        // Hash the word to get the bucket index
        unsigned int index = hash(word);

        // Insert the new node at the beginning of the linked list
        new_node->next = table[index];
        table[index] = new_node;

        // Increment word count
        word_count++;
    }

    // Close the file
    fclose(file);
    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    return word_count;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    for (int i = 0; i < N; i++)
    {
        node *cursor = table[i];
        while (cursor != NULL)
        {
            node *tmp = cursor;
            cursor = cursor->next;
            free(tmp);
        }
        table[i] = NULL;
    }
    word_count = 0;
    return true;
}
