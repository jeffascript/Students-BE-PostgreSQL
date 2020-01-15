 /*
    
    Students Portfolio Repo

    You are creating a Postgres structure (Tables) to save the informations about Students and Projects.

    The student Table should have the current information

    - _id --> you should define it as identity in the newly created table
    - name 
    - surname
    - email
    - dateOfBirth 

    While the project Table should have the current information

    - _id --> you should define it as identity in the newly created table
    - Name
    - Description
    - Creation Date
    - RepoURL -> Code Repo URL (es.: GitHub / BitBucket project URL)
    - LiveURL -> URL of the "live" project
    - StudentID --> [EXTRA] This should be a Foreign Key to Students table

    Complete the following exercise:

    EX1) Create a query for creating the table Students as specified before
    EX2) Use the tool you prefer to connect to the DB and create the table Project
    EX3) Write a query to insert a new Student (Your name, your email, your surname, your date of birth)
    EX4) Write a query to insert a new Project (one of the previously created project, insert your student ID as studentid)
    EX5) Write another query to insert a second project
    EX6) Write a query to update the second project you entered, changing name and LiveURL
    EX7) Write a query to select all the projects, specifying the student email too
    EX8) Write a query to delete one of the two projects
    EX9) Write a query to insert a second students
    EX10) Write a query to delete the second student



    ANSWERS


CREATE TABLE students (
   id serial PRIMARY KEY,
   first_name VARCHAR (50),
   last_name VARCHAR (50),
   email VARCHAR (50) UNIQUE
)


INSERT INTO students(firstname,lastname,email,dob)
VALUES(‘Keff’, ‘emerald’ , ‘j@j.com’, ’01-01-1890’)


CREATE TABLE projects(
	_id SERIAL PRIMARY KEY,   
  StudentId int4 REFERENCES students(_id) ON DELETE CASCADE,
ProjectName varchar(500) NOT NULL,
	Description TEXT NOT NULL,
	CreatedAt DATE NOT NULL DEFAULT CURRENT_DATE,
  RepoURL TEXT,
	LiveURL TEXT
   
)


INSERT INTO projects(
	 StudentId, ProjectName, Description,  RepoURL, LiveURL)
	VALUES (1, 'new The story of db', 'new Let us talk about DB in strive', 'http://github.com/live', 'http://twitter.com/liveBlog')
	RETURNING *



INSERT INTO projects(
	 StudentId, ProjectName, Description  )
	VALUES (1, 'Old man new The story of db', 'Dang! new Let us talk about DB in strive' )
	RETURNING *



UPDATE projects
	SET RepoURL= 'ww.jgsiucg.com', ProjectName='Banger'
	WHERE _id=4

SELECT * FROM projects


—>

SELECT * FROM projects JOIN students on studentId=students._id

//then select the objProps u need from the projects && || students table

SELECT ProjectName, Description, RepoURL,LiveURL,email FROM projects JOIN students on studentId=students._id


DELETE FROM projects WHERE ProjectName='Old man new The story of db'


INSERT INTO students(firstname, lastname,email,dob)
	VALUES (‘Albert’, ‘Lincoln’, ‘a@lincoln.com’, '12-12-1976' )
	RETURNING *


INSERT INTO students(firstname,lastname,email,dob)
VALUES('RUNNAMI', 'JHIUHD' , 'jh@runnami.com', '10-09-1729')
RETURNING *



DELETE FROM students WHERE dob > '1890-01-01'

*/