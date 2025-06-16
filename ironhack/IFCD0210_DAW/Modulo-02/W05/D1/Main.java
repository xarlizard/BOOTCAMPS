
public class Main {

    public static void main(String[] args) {
        testSetAge();
        testFindByName();
        testFindByNameInvalid();
        testClone();
        System.out.println("All tests passed successfully!");
    }

    private static void testSetAge() {
        System.out.println("Testing setAge method...");
        Person person = new Person(1, "John Doe", 30, "Developer");

        try {
            person.setAge(-1);
            System.out.println("Test failed: should have thrown exception for negative age");
            System.exit(1);
        } catch (IllegalArgumentException e) {
            System.out.println("Test passed: correctly threw exception for negative age");
        }
    }

    private static void testFindByName() {
        System.out.println("Testing findByName method with valid name...");
        PersonsList list = new PersonsList();
        Person person = new Person(1, "John Doe", 30, "Developer");
        list.addPerson(person);

        Person found = list.findByName("John Doe");
        if (found == null || !found.equals(person)) {
            System.out.println("Test failed: could not find person by name");
            System.exit(1);
        }
        System.out.println("Test passed: correctly found person by name");
    }

    private static void testFindByNameInvalid() {
        System.out.println("Testing findByName method with invalid name format...");
        PersonsList list = new PersonsList();

        try {
            list.findByName("JohnDoe");
            System.out.println("Test failed: should have thrown exception for invalid name format");
            System.exit(1);
        } catch (IllegalArgumentException e) {
            System.out.println("Test passed: correctly threw exception for invalid name format");
        }
    }

    private static void testClone() {
        System.out.println("Testing clone method...");
        PersonsList list = new PersonsList();
        Person original = new Person(1, "John Doe", 30, "Developer");
        Person cloned = list.clone(original);

        if (cloned.getId() == original.getId()) {
            System.out.println("Test failed: cloned person should have different ID");
            System.exit(1);
        }

        if (!cloned.getName().equals(original.getName())
                || cloned.getAge() != original.getAge()
                || !cloned.getOccupation().equals(original.getOccupation())) {
            System.out.println("Test failed: cloned person should have same properties except ID");
            System.exit(1);
        }

        System.out.println("Test passed: clone created with new ID but same properties");

        System.out.println("Testing file writing...");
        list.writePersonToFile(cloned);
        System.out.println("File writing test complete");
    }
}
