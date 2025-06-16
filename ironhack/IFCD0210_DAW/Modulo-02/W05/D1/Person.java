
public class Person {

    private final int id;
    private final String name;
    private int age;
    private final String occupation;

    public Person(int id, String name, int age, String occupation) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.occupation = occupation;
    }

    public void setAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        this.age = age;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }

        Person person = (Person) obj;
        return age == person.age
                && name.equals(person.name)
                && occupation.equals(person.occupation);
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + age;
        result = 31 * result + occupation.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return String.format("Person[id=%d, name='%s', age=%d, occupation='%s']",
                id, name, age, occupation);
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getOccupation() {
        return occupation;
    }
}
