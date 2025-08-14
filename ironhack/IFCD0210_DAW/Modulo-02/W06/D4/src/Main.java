
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;

import classes.Course;
import classes.Student;
import classes.Teacher;

public class Main {

    private static final String BOLD = "\u001B[1m";
    private static final String UNDERLINE = "\u001B[4m";
    private static final String RED = "\u001B[31m";
    private static final String GREEN = "\u001B[32m";
    private static final String YELLOW = "\u001B[33m";
    private static final String CYAN = "\u001B[36m";
    private static final String RESET = "\u001B[0m";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Teacher> teachers = new ArrayList<>();
        List<Course> courses = new ArrayList<>();
        List<Student> students = new ArrayList<>();

        System.out.print("🏫 Enter the name of the school: ");
        String schoolName = scanner.nextLine();
        System.out.println(CYAN + "\n============================================================" + RESET);
        System.out.println(CYAN + "  " + schoolName.toUpperCase() + " - SCHOOL MANAGEMENT SYSTEM 📚" + RESET);
        System.out.println(CYAN + "============================================================" + RESET);
        System.out.println("Welcome! You can manage teachers, courses and students from this system.\n");
        System.out.println(GREEN + (BOLD + UNDERLINE + "AVAILABLE COMMANDS" + RESET) + RESET);
        System.out.println(" - " + BOLD + "ENROLL [STUDENT_ID] [COURSE_ID]" + RESET + "       -> Enroll student in a course");
        System.out.println(" - " + BOLD + "ASSIGN [TEACHER_ID] [COURSE_ID]" + RESET + "       -> Assign teacher to a course");
        System.out.println(" - " + BOLD + "SHOW COURSES" + RESET + "                          -> List all courses");
        System.out.println(" - " + BOLD + "SHOW COURSES [TEACHER_ID]" + RESET + "             -> List courses taught by a teacher");
        System.out.println(" - " + BOLD + "SHOW STUDENTS" + RESET + "                         -> List all students");
        System.out.println(" - " + BOLD + "SHOW STUDENTS [COURSE_ID]" + RESET + "             -> List students in a specific course");
        System.out.println(" - " + BOLD + "SHOW TEACHERS" + RESET + "                         -> List all teachers");
        System.out.println(" - " + BOLD + "SHOW MONEY EARNED" + RESET + "                     -> Show total money earned from courses");
        System.out.println(" - " + BOLD + "SHOW MONEY SPENT" + RESET + "                      -> Show total money spent on salaries");
        System.out.println(" - " + BOLD + "SHOW STATS" + RESET + "                            -> Display school statistics");
        System.out.println(" - " + BOLD + "SHOW PROFIT" + RESET + "                           -> Calculate school profit");
        System.out.println(" - " + BOLD + "LOOKUP COURSE [COURSE_ID]" + RESET + "             -> View details of a course");
        System.out.println(" - " + BOLD + "LOOKUP STUDENT [STUDENT_ID]" + RESET + "           -> View details of a student");
        System.out.println(" - " + BOLD + "LOOKUP TEACHER [TEACHER_ID]" + RESET + "           -> View details of a teacher");
        System.out.println(" - " + BOLD + "EXIT" + RESET + "                                  -> Exit the system");
        System.out.println("==============================\n");

        // Teachers
        int teacherCount = readIntMinimum(scanner, "Enter number of teachers to create: ", 1);
        for (int i = 0; i < teacherCount; i++) {
            System.out.println("\nEnter details for " + BOLD + "Teacher " + (i + 1) + RESET + ":");
            String name;
            do {
                System.out.print("👨🏻‍🏫 Name: ");
                name = scanner.nextLine();
                if (!isValidName(name)) {
                    System.out.println(RED + "Invalid name. Names should not contain numbers." + RESET);
                }
            } while (!isValidName(name));

            double salary = readDouble(scanner, "💰 Salary: ");
            teachers.add(new Teacher(name, salary));
        }

        // Courses
        int courseCount = readIntMinimum(scanner, "\nEnter number of courses to create: ", 1);
        for (int i = 0; i < courseCount; i++) {
            System.out.println("\nEnter details for " + BOLD + "Course " + (i + 1) + RESET + ":");
            System.out.print("📚 Name: ");
            String name = scanner.nextLine();
            double price = readDouble(scanner, "💶 Price: ");
            courses.add(new Course(name, price));
        }

        // Students
        int studentCount = readIntMinimum(scanner, "\nEnter number of students to create: ", 1);
        for (int i = 0; i < studentCount; i++) {
            System.out.println("\nEnter details for " + BOLD + "Student " + (i + 1) + RESET + ":");
            String name;
            do {
                System.out.print("👤 Name: ");
                name = scanner.nextLine();
                if (!isValidName(name)) {
                    System.out.println(RED + "Invalid name. Names should not contain numbers." + RESET);
                }
            } while (!isValidName(name));

            System.out.print("🏠 Address: ");
            String address = scanner.nextLine();

            String email;
            do {
                System.out.print("✉️ Email: ");
                email = scanner.nextLine();
                if (!isValidEmail(email)) {
                    System.out.println(RED + "Invalid email format. Please enter a valid email." + RESET);
                }
            } while (!isValidEmail(email));

            students.add(new Student(name, address, email));
        }

        // Commands
        System.out.println("\nYou can now enter commands [" + BOLD + "ENROLL-ASSIGN-SHOW-LOOKUP" + RESET + "]. Type 'EXIT' to quit.");
        while (true) {
            System.out.print("> ");
            String input = scanner.nextLine().trim();

            if (input.equalsIgnoreCase("EXIT")) {
                break;
            }

            String[] parts = input.split(" ");
            String command = parts[0].toUpperCase();

            switch (command) {
                case "ENROLL":
                    if (parts.length < 3) {
                        System.out.println(YELLOW + "Usage: ENROLL [STUDENT_ID] [COURSE_ID]" + RESET);
                        break;
                    }
                    Student student = students.stream()
                            .filter(s -> s.getStudentId().equals(parts[1]))
                            .findFirst().orElse(null);
                    Course course = courses.stream()
                            .filter(c -> c.getCourseId().equals(parts[2]))
                            .findFirst().orElse(null);
                    if (student != null && course != null) {
                        student.enroll(course);
                        System.out.println(GREEN + "✅ Student enrolled successfully." + RESET);
                    } else {
                        System.out.println(RED + "Student or Course not found." + RESET);
                    }
                    break;

                case "ASSIGN":
                    if (parts.length < 3) {
                        System.out.println(YELLOW + "Usage: ASSIGN [TEACHER_ID] [COURSE_ID]" + RESET);
                        break;
                    }
                    Teacher teacher = teachers.stream()
                            .filter(t -> t.getTeacherId().equals(parts[1]))
                            .findFirst().orElse(null);
                    course = courses.stream()
                            .filter(c -> c.getCourseId().equals(parts[2]))
                            .findFirst().orElse(null);
                    if (teacher != null && course != null) {
                        course.setTeacher(teacher);
                        System.out.println(GREEN + "✅ Teacher assigned successfully." + RESET);
                    } else {
                        System.out.println(RED + "Teacher or Course not found." + RESET);
                    }
                    break;

                case "SHOW":
                    if (parts.length < 2) {
                        System.out.println(YELLOW + "Usage: SHOW [COURSES|STUDENTS|TEACHERS|MONEY|STATS]" + RESET);
                        break;
                    }
                    switch (parts[1].toUpperCase()) {
                        case "COURSES":
                            if (parts.length > 2) {
                                String teacherId = parts[2];
                                courses.stream()
                                        .filter(c -> c.getTeacher() != null
                                        && c.getTeacher().getTeacherId().equals(teacherId))
                                        .forEach(System.out::println);
                            } else {
                                courses.forEach(System.out::println);
                            }
                            break;
                        case "STUDENTS":
                            if (parts.length > 2) {
                                String courseId = parts[2];
                                students.stream()
                                        .filter(s -> s.getCourse() != null
                                        && s.getCourse().getCourseId().equals(courseId))
                                        .forEach(System.out::println);
                            } else {
                                students.forEach(System.out::println);
                            }
                            break;
                        case "TEACHERS":
                            teachers.forEach(System.out::println);
                            break;
                        case "MONEY":
                            if (parts.length <= 2) {
                                System.out.println(YELLOW + "Usage: SHOW MONEY [EARNED|SPENT]" + RESET);
                                break;
                            }
                            if (parts.length > 3) {
                                System.out.println(RED + "Invalid command. Too many arguments." + RESET);
                                System.out.println(YELLOW + "Usage: SHOW MONEY [EARNED|SPENT]" + RESET);
                                break;
                            }
                            switch (parts[2].toUpperCase()) {
                                case "EARNED":
                                    double totalEarned = courses.stream()
                                            .mapToDouble(Course::getMoneyEarned)
                                            .sum();
                                    System.out.printf("💰 Total money earned: " + GREEN + totalEarned + RESET + "\n");
                                    break;
                                case "SPENT":
                                    double totalSpent = teachers.stream()
                                            .mapToDouble(Teacher::getSalary)
                                            .sum();
                                    System.out.printf("💸 Total money spent on salaries: " + RED + totalSpent + RESET + "\n");
                                    break;
                                default:
                                    System.out.println(RED + "Invalid option. Usage: SHOW MONEY [EARNED|SPENT]" + RESET);
                            }
                            break;
                        case "STATS":
                            System.out.println(CYAN + "\n=== School Statistics ===" + RESET);
                            System.out.println("👨🏻‍🏫 Number of Teachers: " + teachers.size());
                            System.out.println("📚 Number of Courses: " + courses.size());
                            System.out.println("👤 Number of Students: " + students.size());
                            System.out.println("-------------");

                            double totalEarned = courses.stream()
                                    .mapToDouble(Course::getMoneyEarned)
                                    .sum();
                            double totalSalaries = teachers.stream()
                                    .mapToDouble(Teacher::getSalary)
                                    .sum();

                            System.out.printf("💰 Total Revenue: $%.2f\n", totalEarned);
                            System.out.printf("💸 Total Salaries: $%.2f\n", totalSalaries);
                            System.out.printf("💶 Net Profit: $%.2f\n", totalEarned - totalSalaries);

                            long assignedCourses = courses.stream()
                                    .filter(c -> c.getTeacher() != null)
                                    .count();
                            System.out.printf("📈 Course Assignment Rate: %.1f%%\n\n",
                                    (courses.size() > 0 ? (assignedCourses * 100.0 / courses.size()) : 0));
                            break;
                        case "PROFIT":
                            double totalEarnedProfit = courses.stream().mapToDouble(Course::getMoneyEarned).sum();
                            double totalSalariesProfit = teachers.stream().mapToDouble(Teacher::getSalary).sum();
                            double profit = totalEarnedProfit - totalSalariesProfit;
                            System.out.printf("💶 Profit: $%.2f\n", profit);
                            break;
                        default:
                            System.out.println(RED + "Unknown SHOW target." + RESET);
                    }
                    break;

                case "LOOKUP":
                    if (parts.length < 3) {
                        System.out.println(YELLOW + "Usage: LOOKUP [COURSE|STUDENT|TEACHER] [ID]" + RESET);
                        break;
                    }
                    String type = parts[1].toUpperCase();
                    String id = parts[2];
                    switch (type) {
                        case "COURSE":
                            Optional<Course> foundCourse = courses.stream().filter(c -> c.getCourseId().equals(id))
                                    .findFirst();
                            if (foundCourse.isPresent()) {
                                System.out.println(foundCourse.get());
                            } else {
                                System.out.println(RED + "Course not found." + RESET);
                            }
                            break;
                        case "STUDENT":
                            Optional<Student> foundStudent = students.stream().filter(s -> s.getStudentId().equals(id))
                                    .findFirst();
                            if (foundStudent.isPresent()) {
                                System.out.println(foundStudent.get());
                            } else {
                                System.out.println(RED + "Student not found." + RESET);
                            }
                            break;
                        case "TEACHER":
                            Optional<Teacher> foundTeacher = teachers.stream().filter(t -> t.getTeacherId().equals(id))
                                    .findFirst();
                            if (foundTeacher.isPresent()) {
                                System.out.println(foundTeacher.get());
                            } else {
                                System.out.println(RED + "Teacher not found." + RESET);
                            }
                            break;
                        default:
                            System.out.println(RED + "Unknown LOOKUP type." + RESET);
                    }
                    break;
                default:
                    System.out.println(RED + "Unknown command." + RESET);
            }
        }
        System.out.println("Exiting system. Goodbye! 👋🏻");
        scanner.close();
    }

    private static boolean isValidName(String name) {
        return !name.matches(".*\\d.*");
    }

    private static boolean isValidEmail(String email) {
        return email.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");
    }

    private static int readIntMinimum(Scanner scanner, String message, int minimum) {
        int number = -1;
        while (true) {
            System.out.print(message);
            String input = scanner.nextLine();
            try {
                number = Integer.parseInt(input);
                if (number >= minimum) {
                    break;
                } else {
                    System.out.println(RED + "Please enter a number greater than or equal to " + minimum + "." + RESET);
                }
            } catch (NumberFormatException e) {
                System.out.println(RED + "Invalid input. Enter a numeric value." + RESET);
            }
        }
        return number;
    }

    private static double readDouble(Scanner scanner, String message) {
        double number = -1;
        while (true) {
            System.out.print(message);
            String input = scanner.nextLine();
            try {
                number = Double.parseDouble(input);
                if (number >= 0) {
                    break;
                } else {
                    System.out.println(RED + "Please enter a positive number." + RESET);
                }
            } catch (NumberFormatException e) {
                System.out.println(RED + "Invalid input. Enter a numeric value." + RESET);
            }
        }
        return number;
    }
}
