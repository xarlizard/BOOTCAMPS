from cs50 import get_string
import re


def main():
    text = get_string("Text: ")

    letters = 0
    words = 0
    sentences = 0

    for char in text:
        if char.isalpha():
            letters += 1
        elif char.isspace():
            words += 1
        elif char in ['.', '!', '?']:
            sentences += 1

    # Handle the case where the last word is not followed by a space
    if letters > 0:
        words += 1

    if words == 0:
        print("Before Grade 1")
        return

    L = (letters / words) * 100
    S = (sentences / words) * 100

    index = 0.0588 * L - 0.296 * S - 15.8
    grade = round(index)

    if grade < 1:
        print("Before Grade 1")
    elif grade >= 16:
        print("Grade 16+")
    else:
        print(f"Grade {grade}")


if __name__ == "__main__":
    main()
