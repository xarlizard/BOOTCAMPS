package test;

import org.junit.jupiter.api.Test;
import classes.Teacher;

import static org.junit.jupiter.api.Assertions.*;

public class TeacherTest {

    @Test
    public void testTeacherCreation() {
        Teacher teacher = new Teacher("Ana", 3000.0);
        assertEquals("Ana", teacher.getName());
        assertEquals(3000.0, teacher.getSalary());
        assertNotNull(teacher.getTeacherId());
    }

    @Test
    public void testSetNameAndSalary() {
        Teacher teacher = new Teacher("Luis", 2500.0);
        teacher.setName("Carlos");
        teacher.setSalary(2700.0);

        assertEquals("Carlos", teacher.getName());
        assertEquals(2700.0, teacher.getSalary());
    }
}