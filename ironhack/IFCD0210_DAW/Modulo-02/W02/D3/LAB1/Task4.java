
public class Task4 {

    public static void main(String[] args) {

        System.out.println("Testing IntArrayList:");
        IntList arrayList = new IntArrayList();
        for (int i = 0; i < 15; i++) {
            arrayList.add(i);
        }
        for (int i = 0; i < 15; i++) {
            System.out.println("Element at " + i + ": " + arrayList.get(i));
        }

        System.out.println("\nTesting IntVector:");
        IntList vector = new IntVector();
        for (int i = 0; i < 25; i++) {
            vector.add(i * 2);
        }
        for (int i = 0; i < 25; i++) {
            System.out.println("Element at " + i + ": " + vector.get(i));
        }

        System.out.println("\nEfficiency Comparison:");
        System.out.println("\nIntArrayList (50% growth) is more efficient when:");
        System.out.println("- Memory is constrained");
        System.out.println("- The final size of the list is relatively predictable");
        System.out.println("- The growth of the list is gradual");
        System.out.println("- You want to minimize memory waste");

        System.out.println("\nIntVector (100% growth) is more efficient when:");
        System.out.println("- Memory is abundant");
        System.out.println("- The final size is unpredictable");
        System.out.println("- Rapid growth is expected");
        System.out.println("- Performance is more important than memory usage");
    }
}

interface IntList {

    void add(int number);

    int get(int id);
}

class IntArrayList implements IntList {

    private int[] numbers;
    private int size;

    public IntArrayList() {
        numbers = new int[10];
        size = 0;
    }

    @Override
    public void add(int number) {
        if (size == numbers.length) {

            int[] newArray = new int[(int) (numbers.length * 1.5)];

            System.arraycopy(numbers, 0, newArray, 0, numbers.length);
            numbers = newArray;
        }
        numbers[size++] = number;
    }

    @Override
    public int get(int id) {
        if (id < 0 || id >= size) {
            throw new IndexOutOfBoundsException("Index: " + id + ", Size: " + size);
        }
        return numbers[id];
    }
}

class IntVector implements IntList {

    private int[] numbers;
    private int size;

    public IntVector() {
        numbers = new int[20];
        size = 0;
    }

    @Override
    public void add(int number) {
        if (size == numbers.length) {

            int[] newArray = new int[numbers.length * 2];

            System.arraycopy(numbers, 0, newArray, 0, numbers.length);
            numbers = newArray;
        }
        numbers[size++] = number;
    }

    @Override
    public int get(int id) {
        if (id < 0 || id >= size) {
            throw new IndexOutOfBoundsException("Index: " + id + ", Size: " + size);
        }
        return numbers[id];
    }
}
