package test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import classes.Course;
import classes.Student;

import static org.junit.jupiter.api.Assertions.*;

public class StudentTest {

    private Student student;
    private Course course;

    @BeforeEach
    public void setUp() {
        student = new Student("John Smith", "Street Test 123", "john@test.com");
        course = new Course("Math", 100.0); // Create a sample course
    }

    @Test
    public void testStudentCreation() {
        assertNotNull(student.getStudentId()); // Verify that the ID isn't null
        assertEquals("John Smith", student.getName());
        assertEquals("Street Test 123", student.getAddress());
        assertEquals("john@test.com", student.getEmail());
    }

    @Test
    public void testEnrollInCourse() {
        student.enroll(course);

        assertEquals(course, student.getCourse()); // The course must be the one you signed up for
        assertEquals(100.0, course.getMoneyEarned(), 0.01); // The money earned from the course must be updated
    }

    @Test
    public void testEnrollInCourseWhenAlreadyEnrolled() {
        student.enroll(course); // Enroll the student in the first course
        Course newCourse = new Course("History", 50.0);
        student.enroll(newCourse); // Enroll the student in a new course

        assertEquals(newCourse, student.getCourse()); // The course must be the new one
        assertEquals(50.0, newCourse.getMoneyEarned(), 0.01); // The new course must have the money earned
    }
}
