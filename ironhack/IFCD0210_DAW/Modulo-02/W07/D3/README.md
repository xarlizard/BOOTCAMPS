# INFO

Primer proyecto de la semana 7 en el curso de ironhack

## Tareas

For this lab, you will need to create two database tables and seed them with some sample data. The database data represents mock clients for a multi-city hospital.

### Employee Table

| employee_id | department  | name            | status  |
| ----------- | ----------- | --------------- | ------- |
| 356712      | cardiology  | Alonso Flores   | ON_CALL |
| 564134      | immunology  | Sam Ortega      | ON      |
| 761527      | cardiology  | German Ruiz     | OFF     |
| 166552      | pulmonary   | Maria Lin       | ON      |
| 156545      | orthopaedic | Paolo Rodriguez | ON_CALL |
| 172456      | psychiatric | John Paul Armes | OFF     |

Note that admitted_by is a foreign key to the employee table.

### Patient Table

| patient_id | name              | date_of_birth | admitted_by |
| ---------- | ----------------- | ------------- | ----------- |
| 1          | Jaime Jordan      | 1984-03-02    | 564134      |
| 2          | Marian Garcia     | 1972-01-12    | 564134      |
| 3          | Julia Dusterdieck | 1954-06-11    | 356712      |
| 4          | Steve McDuck      | 1931-11-10    | 761527      |
| 5          | Marian Garcia     | 1999-02-15    | 172456      |

### Specifications

1. Get all doctors: Create a route to get all doctors.
2. Get doctor by ID: Create a route to get a doctor by employee_id.
3. Get doctors by status: Create a route to get doctors by status.
4. Get doctors by department: Create a route to get doctors by department.
5. Get all patients: Create a route to get all patients.
6. Get patient by ID: Create a route to get a patient by patient_id.
7. Get patients by date of birth range: Create a route to get patients date of birth within a specified range.
8. Get patients by admitting doctor's department: Create a route to get patients by the department that their admitting doctor is in (For example, get all patients admitted by a doctor in cardiology).
9. Get all patients with a doctor whose status is OFF: Create a route to get all patients with a doctor whose status is OFF
