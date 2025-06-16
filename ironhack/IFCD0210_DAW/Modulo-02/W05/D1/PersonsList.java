
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PersonsList {

    private final List<Person> persons;
    private static int nextId = 1;

    public PersonsList() {
        persons = new ArrayList<>();
    }

    public Person findByName(String name) {

        if (!name.matches("^[A-Za-z]+\\s[A-Za-z]+$")) {
            throw new IllegalArgumentException("Name must be formatted as 'firstName lastName'");
        }

        return persons.stream()
                .filter(p -> p.getName().equals(name))
                .findFirst()
                .orElse(null);
    }

    public Person clone(Person original) {
        return new Person(nextId++, original.getName(), original.getAge(), original.getOccupation());
    }

    public void writePersonToFile(Person person) {
        try (FileWriter writer = new FileWriter("person_" + person.getId() + ".txt")) {
            writer.write(person.toString());
        } catch (IOException e) {
            System.err.println("Error writing to file: " + e.getMessage());
        }
    }

    public void addPerson(Person person) {
        persons.add(person);
    }

    public List<Person> getPersons() {
        return new ArrayList<>(persons);
    }
}
