
# 🎓 School Management System 🎓

This Java project simulates a school management system, allowing you to register courses, students, and teachers, as well as perform registration, assignment, and statistical queries.

---

## 📦 Project structure

```
src/
│
├── classes/
│   ├── Course.java
│   ├── Student.java
│   └── Teacher.java
│
├── test/
│   ├── CourseTest.java
│   ├── StudentTest.java
│   └── TeacherTest.java
│
│── Main.java
└── README.md
```

---

## 🛠️ Technologies used

- **Java**
- **JUnit**
- Input/output terminal (console mode)

---

## 🚀 How to run the project

1. Download the GitHub repository.
2. Open the project with a code editor, such as `IntelliJ`.
3. Open the `Main.java` file and start it with **Run**.

---

## 🧪 Unit Tests

The project includes **JUnit** tests to validate the behavior of the main classes.

To run them, make sure you have JUnit configured in your environment, such as `IntelliJ`.

Classes with tests:
- `CourseTest`: Validation of creation, instructor assignment, money entry, etc.
- `StudentTest`: Verification of course enrollment and course change.
- `TeacherTest`: Validation of instructor data.

---

## 🔵 Main features

### 🧩 Entity Management
- **👨🏻‍🏫 Teacher**: Name and salary.
- **📚 Course**: Name, price, assigned teacher, earnings.
- **👤 Student**: Name, address, email, course enrolled.

### 🧾 Available commands

- `ENROLL [STUDENT_ID] [COURSE_ID]`: Enroll student in a course.
- `ASSIGN [TEACHER_ID] [COURSE_ID]`: Assign teacher to a course.
- `SHOW COURSES`: List all courses.
- `SHOW COURSES [TEACHER_ID]`: List courses taught by a teacher.
- `SHOW STUDENTS`: List all students.
- `SHOW STUDENTS [COURSE_ID]`: List students in a specific course.
- `SHOW TEACHERS`: List all teachers.
- `SHOW MONEY EARNED`: Show total money earned from courses.
- `SHOW MONEY SPENT`: Show total money spent on salaries.
- `SHOW STATS`: Display school statistics.
- `SHOW PROFIT`: Calculate school profit.
- `LOOKUP COURSE [ID]`: View details of a course.
- `LOOKUP STUDENT [ID]`: View details of a student.
- `LOOKUP TEACHER [ID]`: View details of a teacher.
- `EXIT`: Exit the system.

---

## ▶️ Example of execution

```

🏫 Enter the name of the school: IRONHACK

============================================================
  IRONHACK - SCHOOL MANAGEMENT SYSTEM 📚
============================================================
Welcome! You can manage teachers, courses and students from this system.

AVAILABLE COMMANDS
 - ENROLL [STUDENT_ID] [COURSE_ID]       -> Enroll student in a course
 - ASSIGN [TEACHER_ID] [COURSE_ID]       -> Assign teacher to a course
 - SHOW COURSES                          -> List all courses
 - SHOW COURSES [TEACHER_ID]             -> List courses taught by a teacher
 - SHOW STUDENTS                         -> List all students
 - SHOW STUDENTS [COURSE_ID]             -> List students in a specific course
 - SHOW TEACHERS                         -> List all teachers
 - SHOW MONEY EARNED                     -> Show total money earned from courses
 - SHOW MONEY SPENT                      -> Show total money spent on salaries
 - SHOW STATS                            -> Display school statistics
 - SHOW PROFIT                           -> Calculate school profit
 - LOOKUP COURSE [COURSE_ID]             -> View details of a course
 - LOOKUP STUDENT [STUDENT_ID]           -> View details of a student
 - LOOKUP TEACHER [TEACHER_ID]           -> View details of a teacher
 - EXIT                                  -> Exit the system
==============================

Enter number of teachers to create: 1

Enter details for Teacher 1:
👨🏻‍🏫 Name: John Smith
💰 Salary: 2000

Enter number of courses to create: 1

Enter details for Course 1:
📚 Name: Web Development
💶 Price: 500

Enter number of students to create: 1

Enter details for Student 1:
👤 Name: Kevin Taylor
🏠 Address: Street Test, 22
✉️ Email: kevin@test.com

You can now enter commands [ENROLL-ASSIGN-SHOW-LOOKUP]. Type 'EXIT' to quit.
> 
```

---

## ✅ Validations

- Names can't contain numbers.
- Email must be in a valid format.
- Negative numbers aren't allowed.
- IDs are automatically generated for instructors, students, and courses.
- Incorrectly formatted entries are handled with friendly error messages.

---

## 📈 Metrics and Statistics

The `SHOW STATS` command includes:

- Total number of instructors, students, and courses.
- Total revenue.
- Salaries paid.
- Profitability (net profit).
- Percentage of courses with an assigned instructor.


---

## 👥 Contributions

 - [@979-Pao](https://github.com/979-Pao)
 - [@oneceroonedev](https://github.com/oneceroonedev)
 - [@Xarlizard](https://github.com/xarlizard)

