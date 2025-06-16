# INFO

Primer proyecto de la semana 5 en el curso de ironhack

## Tareas

    Create a Person class that has the following properties:
        id: an integer
        name: a string formatted as “firstName lastName”
        age: an integer
        occupation: a string

    The Person class should have the following methods:
        A constructor that takes in an integer id, a string name, an integer age and a string occupation as arguments and sets their respective properties.
        A setAge method that takes in an integer age and sets the age property, but throws an error if age is less than 0.
        An equals method that takes in a Person object and returns true if their properties are the same, excluding the id property.

    Create a PersonsList class that holds a list of Person objects.
        Create a findByName method that takes in a string name and returns the Person object with a name that matches exactly. The name parameter should be formatted as “firstName lastName”. This method should throw an exception if the name parameter is not properly formatted.
        Create a clone method that takes in a Person object and returns a new Person object with the same properties, except with a new id.
        Create a method that takes in a Person object as a parameter and uses the toString method to write the Person information to a file. This method should handle any errors as necessary.

Test Cases

    Test the setAge method to ensure that it throws an error if the age is less than 0.
    Test the findByName method to ensure that it properly finds and returns the correct Person object when given a properly formatted name.
    Test the findByName method to ensure that it throws an exception if the name parameter is not properly formatted.
    Test the clone method to ensure that it creates a new Person object with the same properties as the original, except with a new id
