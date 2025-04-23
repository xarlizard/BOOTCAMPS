from cs50 import get_string


def is_valid(number_str):
    """Checks if a credit card number is valid using Luhn's algorithm."""
    n = len(number_str)
    if not number_str.isdigit():
        return False

    sum_val = 0
    for i in range(n - 1, -1, -1):
        digit = int(number_str[i])
        if (n - 1 - i) % 2 == 1:
            digit *= 2
            if digit > 9:
                digit -= 9
        sum_val += digit
    return (sum_val % 10) == 0


def main():
    number_str = get_string("Number: ")

    if not is_valid(number_str):
        print("INVALID")
        return

    n = len(number_str)
    first_two = number_str[:2]
    first_digit = number_str[0]

    if (n == 15) and (first_two == "34" or first_two == "37"):
        print("AMEX")
    elif (n == 16) and (first_two in ["51", "52", "53", "54", "55"]):
        print("MASTERCARD")
    elif (n >= 13 and n <= 16) and (first_digit == "4"):
        print("VISA")
    else:
        print("INVALID")


if __name__ == "__main__":
    main()
