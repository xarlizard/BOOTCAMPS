#include <cs50.h>
#include <math.h>
#include <stdio.h>

bool is_valid(long number);
string get_card_type(long number);

int main(void)
{
    long number;
    do
    {
        number = get_long("Number: ");
    }
    while (number < 1);

    if (is_valid(number))
    {
        printf("%s\n", get_card_type(number));
    }
    else
    {
        printf("INVALID\n");
    }
}

bool is_valid(long number)
{
    int sum = 0;
    bool second = false;

    while (number > 0)
    {
        int digit = number % 10;

        if (second)
        {
            digit *= 2;
            if (digit > 9)
                digit = digit / 10 + digit % 10;
        }

        sum += digit;
        number /= 10;
        second = !second;
    }

    return (sum % 10 == 0);
}

string get_card_type(long number)
{
    int length = 0;
    long start = number;

    while (start >= 100)
    {
        start /= 10;
        length++;
    }
    length += 2;

    int first_digit = start / 10;
    int first_two = start;

    if ((length == 15) && (first_two == 34 || first_two == 37))
        return "AMEX";
    else if ((length == 16) && (first_two >= 51 && first_two <= 55))
        return "MASTERCARD";
    else if ((length == 13 || length == 16) && (first_digit == 4))
        return "VISA";
    else
        return "INVALID";
}
