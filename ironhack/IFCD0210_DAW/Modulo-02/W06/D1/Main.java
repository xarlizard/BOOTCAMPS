
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static Map<String, Student> increaseGrades(Map<String, Student> students) {
        for (Student student : students.values()) {
            int currentGrade = student.getGrade();
            int newGrade = (int) Math.min(100, currentGrade * 1.1);
            student.setGrade(newGrade);
        }
        return students;
    }

    public static void main(String[] args) {

        Map<String, Student> studentMap = new HashMap<>();

        Student student1 = new Student("Ana García", 85);
        Student student2 = new Student("Carlos López", 78);
        Student student3 = new Student("María Rodríguez", 92);
        Student student4 = new Student("Juan Martínez", 88);

        studentMap.put(student1.getName(), student1);
        studentMap.put(student2.getName(), student2);
        studentMap.put(student3.getName(), student3);
        studentMap.put(student4.getName(), student4);

        System.out.println("Original Grades:");
        studentMap.forEach((name, student)
                -> System.out.println(name + ": " + student.getGrade()));

        studentMap = increaseGrades(studentMap);

        System.out.println("\nGrades after 10% increase:");
        studentMap.forEach((name, student)
                -> System.out.println(name + ": " + student.getGrade()));
    }
}
