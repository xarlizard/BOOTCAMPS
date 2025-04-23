from cs50 import get_int


def main():
    while True:
        height = get_int("Height: ")
        if 1 <= height <= 8:
            break

    for i in range(1, height + 1):
        # Print left pyramid
        print(" " * (height - i), end="")
        print("#" * i, end="")

        # Print the gap
        print("  ", end="")

        # Print the right pyramid
        print("#" * i)


if __name__ == "__main__":
    main()
