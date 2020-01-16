 /*
    
    Students Portfolio Repo 

    You should have already had created a Student Portfolio Repo for both Frontend and Backend.

    Start from the previous App.
    Today we're gonna work on joining and pagination.

    //BACKEND

    Your previously developed backend should have the following routes included, if not, develop them:

    GET students/:id/projects => returns a list of projects in which also the info from the students appears (use JOIN to retrieve those info)
    - Add Sort, Skip, Limit to route GET /students/:

    Client should have the possibility to call the route and set as query parameters sort, skip, limit. Skip and limit are numbers, sort is a string
    containing the field to sort in descending order. [EXTRA] Try to send also the preference for ascending or descending order.

    //FRONTEND

    You should have the following features in your frontend:

    - Show Students on a list (with pagination)
    - Show Projects on a list (with pagination)


    // EXTRA

    Replace PG with Sequelize for all the queries ;-)

    Create a new Table for LIKES and the API to add a Like to each project.
    Every user can add a single like to a project.
    
*/