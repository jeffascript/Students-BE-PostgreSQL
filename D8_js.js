 /*
    
    Students Portfolio Repo

    You should have already had created a Student Portfolio Repo for both Frontend and Backend.

   Your app will be improved by connecting it to your local db enabling creation, read, update and deleting in a real database.

    Student should have this information:
    - _id --> you should define it as identity in the newly created table
    - name 
    - surname
    - email
    - dateOfBirth 

    //BACKEND

    Your previously developed backend should have the following routes included, if not, develop them:

    GET /students => returns the list of students
    GET /students/:id => returns a single student
    POST /students => create a new student
    PUT /students/:id => edit the student with the given id
    DELETE /students/:id => delete the student with the given id

    The persistence must be granted via Postgres

    [EXTRA] POST /checkEmail => check if another student has the same email. The parameter should be passed in the body
    It should not be possible to add a new student if another has the same email. 
    This route should contact students' table querying them by email, if length of resulting array is > 0 then check should fail.

    //FRONTEND

    You should have the following features in your frontend:

    - Add a new Student ([EXTRA]use CheckEmail before sending the post to the backend)
    - Show Students on a list
    - Every Student could be edit or deleted



    SELECT conname
FROM pg_constraint
WHERE conrelid = 'students'::regclass
  AND contype = 'u';
  
  
  ALTER TABLE students DROP CONSTRAINT students_email_key;

*/