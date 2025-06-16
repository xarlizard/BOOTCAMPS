
public class main {

    // Task 1: Find difference between largest and smallest values in array
    public static int findDifference(int[] array) {
        if (array.length < 1) {
            throw new IllegalArgumentException("Array must have at least one element");
        }

        int min = array[0];
        int max = array[0];

        for (int num : array) {
            if (num < min) {
                min = num;
            }
            if (num > max) {
                max = num;
            }
        }

        return max - min;
    }

    // Task 2: Find smallest and second smallest elements
    public static void findTwoSmallest(int[] array) {
        if (array.length < 2) {
            throw new IllegalArgumentException("Array must have at least two elements");
        }

        int smallest = Integer.MAX_VALUE;
        int secondSmallest = Integer.MAX_VALUE;

        for (int num : array) {
            if (num < smallest) {
                secondSmallest = smallest;
                smallest = num;
            } else if (num < secondSmallest && num != smallest) {
                secondSmallest = num;
            }
        }

        System.out.println("Smallest: " + smallest);
        System.out.println("Second Smallest: " + secondSmallest);
    }

    // Task 3: Calculate mathematical expression
    public static double calculateExpression(double x, double y) {
        // x^2 + (4y/5 - x)^2
        double firstTerm = Math.pow(x, 2);
        double secondTerm = Math.pow((4 * y / 5) - x, 2);
        return firstTerm + secondTerm;
    }

    // Testing
    public static void main(String[] args) {
        // Test Task 1
        System.out.println("Testing Task 1:");
        int[] array1 = {5, 8, 2, 1, 9, 3, 7};
        System.out.println("Difference between max and min: " + findDifference(array1));

        // Test Task 2
        System.out.println("\nTesting Task 2:");
        int[] array2 = {7, 4, 9, 2, 5, 1, 3};
        findTwoSmallest(array2);

        // Test Task 3
        System.out.println("\nTesting Task 3:");
        double x = 2.0;
        double y = 3.0;
        System.out.println("Result of expression with x=" + x + " and y=" + y + ": " + calculateExpression(x, y));
    }
}
